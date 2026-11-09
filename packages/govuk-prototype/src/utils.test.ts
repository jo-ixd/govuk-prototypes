import { describe, expect, it } from "vitest";
import { govukClasses } from "./utils";

describe("govukClasses", () => {
  it("combines the base class with extra classes", () => {
    expect(govukClasses("govuk-accordion", "custom-class")).toBe(
      "govuk-accordion custom-class",
    );
  });

  it("returns only the base class when no extra classes are given", () => {
    expect(govukClasses("govuk-details")).toBe("govuk-details");
  });
});
