import { describe, expect, it } from "vitest";
import {
  buildHref,
  firstParam,
  formatDob,
  readAnswers,
  referenceNumber,
  type ServiceSearchParams,
} from "@/app/playground/example-service/_lib/params";

describe("firstParam", () => {
  it("returns an empty string for null", () => {
    expect(firstParam(null)).toBe("");
  });

  it("returns an empty string for an empty array", () => {
    expect(firstParam([])).toBe("");
  });

  it("returns the first value when a param repeats", () => {
    expect(firstParam(["Jo", "Ann"])).toBe("Jo");
  });

  it("returns a plain string value unchanged", () => {
    expect(firstParam("Jo")).toBe("Jo");
  });
});

describe("readAnswers", () => {
  it("reads name and dob from the params", () => {
    const params: ServiceSearchParams = { name: "Jo", dob: "27-3-2007" };
    expect(readAnswers(params)).toEqual({ name: "Jo", dob: "27-3-2007" });
  });

  it("falls back to empty answers when params are missing", () => {
    expect(readAnswers({})).toEqual({ name: "", dob: "" });
  });

  it("uses the first value when a param repeats", () => {
    const params: ServiceSearchParams = { name: ["Jo", "Ann"], dob: "1-1-2000" };
    expect(readAnswers(params)).toEqual({ name: "Jo", dob: "1-1-2000" });
  });
});

describe("buildHref", () => {
  it("returns the bare path when no answers are set", () => {
    expect(
      buildHref("/playground/example-service/name", { name: "", dob: "" }),
    ).toBe("/playground/example-service/name");
  });

  it("includes only the answers that are set", () => {
    expect(
      buildHref("/playground/example-service/name", {
        name: "Jo",
        dob: "",
      }),
    ).toBe("/playground/example-service/name?name=Jo");
  });

  it("joins name and dob answers", () => {
    expect(
      buildHref("/playground/example-service/check-answers", {
        name: "Jo",
        dob: "27-3-2007",
      }),
    ).toBe(
      "/playground/example-service/check-answers?name=Jo&dob=27-3-2007",
    );
  });

  it("encodes answers that are not URL safe", () => {
    expect(
      buildHref("/playground/example-service/name", {
        name: "Jo & Ann",
        dob: "27 3 2007",
      }),
    ).toBe(
      "/playground/example-service/name?name=Jo%20%26%20Ann&dob=27%203%202007",
    );
  });
});

describe("formatDob", () => {
  it("renders a placeholder for an empty date of birth", () => {
    expect(formatDob("")).toBe("-");
  });

  it("formats the date as day, full month name and year", () => {
    expect(formatDob("27-3-2007")).toBe("27 March 2007");
  });

  it("returns the raw value when it is not three dash separated parts", () => {
    expect(formatDob("27/3/2007")).toBe("27/3/2007");
  });

  it("returns the raw value when the parts are not numeric", () => {
    expect(formatDob("aa-bb-cccc")).toBe("aa-bb-cccc");
  });

  it("returns the raw value when the month is out of range", () => {
    expect(formatDob("27-0-2007")).toBe("27-0-2007");
    expect(formatDob("27-13-2007")).toBe("27-13-2007");
  });
});

describe("referenceNumber", () => {
  it("has the APP- prefix and six base 36 characters", () => {
    expect(referenceNumber("Jo", "27-3-2007")).toMatch(/^APP-[A-Z0-9]{6}$/);
  });

  it("is stable for the same answers", () => {
    expect(referenceNumber("Jo", "27-3-2007")).toBe(
      referenceNumber("Jo", "27-3-2007"),
    );
  });

  it("changes when the answers change", () => {
    expect(referenceNumber("Jo", "27-3-2007")).not.toBe(
      referenceNumber("Sam", "27-3-2007"),
    );
  });
});
