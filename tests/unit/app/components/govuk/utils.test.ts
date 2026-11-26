import { describe, expect, it } from "vitest";
import { govukClasses } from "@/app/components/govuk/utils";

describe("govukClasses", () => {
  it("returns the base classes unchanged when none are passed", () => {
    expect(govukClasses("govuk-input")).toBe("govuk-input");
  });

  it("appends custom classes after the base classes", () => {
    expect(govukClasses("govuk-input", "app-input--narrow")).toBe(
      "govuk-input app-input--narrow",
    );
  });

  it("treats empty custom classes as absent", () => {
    expect(govukClasses("govuk-input", "")).toBe("govuk-input");
  });

  it("keeps multiple custom classes in the given order", () => {
    expect(govukClasses("govuk-label", "a b")).toBe("govuk-label a b");
  });
});
