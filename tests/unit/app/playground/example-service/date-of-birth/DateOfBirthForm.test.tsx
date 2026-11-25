import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DateOfBirthForm from "@/app/playground/example-service/date-of-birth/DateOfBirthForm";

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

async function fillDob(
  user: ReturnType<typeof userEvent.setup>,
  day: string,
  month: string,
  year: string,
) {
  await user.type(screen.getByLabelText("Day"), day);
  await user.type(screen.getByLabelText("Month"), month);
  await user.type(screen.getByLabelText("Year"), year);
}

describe("DateOfBirthForm", () => {
  it("asks for the date of birth with a page heading and hint", () => {
    render(<DateOfBirthForm />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "What is your date of birth?",
      }),
    ).not.toBeNull();
    expect(screen.getByText("For example, 27 3 2007")).not.toBeNull();
  });

  it("shows an error summary and focuses it when any part is missing", async () => {
    const user = userEvent.setup();
    render(<DateOfBirthForm />);
    await user.type(screen.getByLabelText("Day"), "27");
    await user.click(screen.getByRole("button", { name: "Continue" }));

    const summaryLink = screen.getByRole("link", {
      name: /Error:\s*Enter your date of birth/,
    });
    expect(summaryLink).toHaveAttribute("href", "#date-of-birth");
    expect(document.activeElement?.textContent).toContain("There is a problem");
    expect(screen.getByLabelText("Day")).toHaveClass("govuk-input--error");
    expect(screen.getByLabelText("Month")).toHaveClass("govuk-input--error");
    expect(screen.getByLabelText("Year")).toHaveClass("govuk-input--error");
  });

  it("continues to check your answers with the joined date", async () => {
    const user = userEvent.setup();
    render(<DateOfBirthForm />);
    await fillDob(user, "27", "3", "2007");
    await user.click(screen.getByRole("button", { name: "Continue" }));

    expect(pushMock).toHaveBeenCalledWith(
      "/playground/example-service/check-answers?name=&dob=27-3-2007",
    );
  });

  it("keeps the name when continuing from a prefilled link", async () => {
    const user = userEvent.setup();
    state.params = new URLSearchParams("name=Jo");
    render(<DateOfBirthForm />);
    await fillDob(user, "27", "3", "2007");
    await user.click(screen.getByRole("button", { name: "Continue" }));

    expect(pushMock).toHaveBeenCalledWith(
      "/playground/example-service/check-answers?name=Jo&dob=27-3-2007",
    );
  });

  it("prefills each part when returning from check your answers", () => {
    state.params = new URLSearchParams("dob=27-3-2007");
    render(<DateOfBirthForm />);
    expect(screen.getByLabelText("Day")).toHaveValue("27");
    expect(screen.getByLabelText("Month")).toHaveValue("3");
    expect(screen.getByLabelText("Year")).toHaveValue("2007");
  });

  it("uses the bday autocomplete values for each part", () => {
    render(<DateOfBirthForm />);
    expect(screen.getByLabelText("Day")).toHaveAttribute("autocomplete", "bday-day");
    expect(screen.getByLabelText("Month")).toHaveAttribute(
      "autocomplete",
      "bday-month",
    );
    expect(screen.getByLabelText("Year")).toHaveAttribute("autocomplete", "bday-year");
  });
});
