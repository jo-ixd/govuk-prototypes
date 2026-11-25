import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import ErrorMessage from "@/app/components/govuk/ErrorMessage";

describe("ErrorMessage", () => {
  it("renders the text inside a govuk error message", () => {
    render(<ErrorMessage text="Enter your full name" />);
    const error = screen.getByText("Enter your full name");
    expect(error.tagName).toBe("P");
    expect(error).toHaveClass("govuk-error-message");
  });

  it("prefixes the message with a visually hidden Error label by default", () => {
    render(<ErrorMessage text="Enter your full name" />);
    const hidden = document.querySelector(".govuk-visually-hidden");
    expect(hidden).not.toBeNull();
    expect(hidden?.textContent).toBe("Error: ");
  });

  it("drops the visually hidden prefix when set to null", () => {
    render(<ErrorMessage text="Enter your full name" visuallyHiddenText={null} />);
    expect(document.querySelector(".govuk-visually-hidden")).toBeNull();
  });

  it("uses a custom visually hidden prefix", () => {
    render(
      <ErrorMessage text="Enter your full name" visuallyHiddenText="Problem" />,
    );
    const hidden = document.querySelector(".govuk-visually-hidden");
    expect(hidden?.textContent).toBe("Problem: ");
  });

  it("renders the given id so fields can reference it", () => {
    render(<ErrorMessage text="Enter your full name" id="name-error" />);
    expect(screen.getByText("Enter your full name")).toHaveAttribute(
      "id",
      "name-error",
    );
  });
});
