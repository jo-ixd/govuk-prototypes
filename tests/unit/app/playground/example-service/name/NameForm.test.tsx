import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NameForm from "@/app/playground/example-service/name/NameForm";

const pushMock = vi.hoisted(() => vi.fn());
const state = vi.hoisted(() => ({ params: new URLSearchParams("") }));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
  useSearchParams: () => state.params,
}));

beforeEach(() => {
  pushMock.mockClear();
  state.params = new URLSearchParams("");
});

describe("NameForm", () => {
  it("asks for the name with a page heading", () => {
    render(<NameForm />);
    expect(
      screen.getByRole("heading", { level: 1, name: "What is your name?" }),
    ).not.toBeNull();
    expect(screen.getByLabelText("What is your name?")).toHaveAttribute(
      "autocomplete",
      "name",
    );
  });

  it("shows an error summary and focuses it when the name is empty", async () => {
    const user = userEvent.setup();
    render(<NameForm />);
    await user.click(screen.getByRole("button", { name: "Continue" }));

    const summaryLink = screen.getByRole("link", {
      name: /Error:\s*Enter your name/,
    });
    expect(summaryLink).toHaveAttribute("href", "#name");
    expect(document.querySelector("#name-error")).toHaveClass("govuk-error-message");
    expect(document.activeElement?.textContent).toContain("There is a problem");
    expect(screen.getByLabelText("What is your name?")).toHaveClass(
      "govuk-input--error",
    );
  });

  it("continues to the date of birth page with the name", async () => {
    const user = userEvent.setup();
    render(<NameForm />);
    await user.type(screen.getByLabelText("What is your name?"), "Jo Smith");
    await user.click(screen.getByRole("button", { name: "Continue" }));

    expect(pushMock).toHaveBeenCalledWith(
      "/playground/example-service/date-of-birth?name=Jo%20Smith",
    );
  });

  it("trims whitespace around the name before continuing", async () => {
    const user = userEvent.setup();
    render(<NameForm />);
    await user.type(screen.getByLabelText("What is your name?"), "  Jo  ");
    await user.click(screen.getByRole("button", { name: "Continue" }));

    expect(pushMock).toHaveBeenCalledWith(
      "/playground/example-service/date-of-birth?name=Jo",
    );
  });

  it("carries an existing date of birth through to the next page", async () => {
    const user = userEvent.setup();
    state.params = new URLSearchParams("dob=27-3-2007");
    render(<NameForm />);
    await user.type(screen.getByLabelText("What is your name?"), "Jo");
    await user.click(screen.getByRole("button", { name: "Continue" }));

    expect(pushMock).toHaveBeenCalledWith(
      "/playground/example-service/date-of-birth?name=Jo&dob=27-3-2007",
    );
  });

  it("prefills the name when returning from check your answers", () => {
    state.params = new URLSearchParams("name=Jo");
    render(<NameForm />);
    expect(screen.getByLabelText("What is your name?")).toHaveValue("Jo");
  });
});
