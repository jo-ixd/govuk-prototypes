import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Pagination from "@/app/components/govuk/Pagination";

describe("Pagination", () => {
  it("renders numbered items and marks the current page", () => {
    render(
      <Pagination
        items={[
          { number: 1, href: "/page/1" },
          { number: 2, href: "/page/2", current: true },
        ]}
      />,
    );
    const nav = document.querySelector("nav");
    expect(nav).toHaveClass("govuk-pagination");
    expect(nav).toHaveAttribute("aria-label", "Pagination");

    const currentLink = screen.getByRole("link", { name: "Page 2" });
    expect(currentLink).toHaveAttribute("href", "/page/2");
    expect(currentLink).toHaveAttribute("aria-current", "page");
    expect(currentLink.parentElement).toHaveClass("govuk-pagination__item--current");

    const firstLink = screen.getByRole("link", { name: "Page 1" });
    expect(firstLink.hasAttribute("aria-current")).toBe(false);
  });

  it("renders an ellipsis item", () => {
    render(
      <Pagination
        items={[{ number: 1, href: "/1" }, { ellipsis: true }, { number: 4, href: "/4" }]}
      />,
    );
    const ellipsisItem = document.querySelector(
      ".govuk-pagination__item--ellipsis",
    );
    expect(ellipsisItem?.textContent).toBe("⋯");
  });

  it("skips empty item objects entirely", () => {
    render(
      <Pagination
        items={[{ number: 1, href: "/1" }, {}, { number: 3, href: "/3" }]}
      />,
    );
    expect(document.querySelectorAll(".govuk-pagination__item").length).toBe(2);
  });

  it("renders previous and next links with visual context", () => {
    render(
      <Pagination
        previous={{ text: "Previous", href: "/1" }}
        next={{ text: "Next", href: "/3" }}
      />,
    );
    const previous = screen.getByRole("link", { name: "Previous" });
    const next = screen.getByRole("link", { name: "Next" });
    expect(previous).toHaveAttribute("rel", "prev");
    expect(previous.querySelector(".govuk-pagination__icon--prev")).not.toBeNull();
    expect(next).toHaveAttribute("rel", "next");
    expect(next.querySelector(".govuk-pagination__icon--next")).not.toBeNull();
  });

  it("switches to the block level layout when only previous and next are used", () => {
    render(
      <Pagination
        previous={{ labelText: "Applications", href: "/1" }}
        next={{ href: "/3" }}
      />,
    );
    expect(document.querySelector("nav")).toHaveClass(
      "govuk-pagination--block",
    );
    const previous = document.querySelector<HTMLAnchorElement>(
      ".govuk-pagination__prev a",
    );
    expect(previous?.querySelector(".govuk-pagination__link-title")).not.toBeNull();
    expect(
      previous?.querySelector(".govuk-pagination__link-label"),
    ).toHaveTextContent("Applications");
  });

  it("falls back to the default previous and next titles", () => {
    render(
      <Pagination previous={{ href: "/1" }} next={{ href: "/3" }} />,
    );
    const previous = document.querySelector<HTMLAnchorElement>(
      ".govuk-pagination__prev a",
    );
    const next = document.querySelector<HTMLAnchorElement>(
      ".govuk-pagination__next a",
    );
    expect(previous?.textContent).toContain("Previous");
    expect(previous?.querySelector(".govuk-visually-hidden")?.textContent).toBe(
      " page",
    );
    expect(next?.textContent).toContain("Next");
    // Without a label the previous title carries the decorated styling itself.
    expect(previous?.querySelector(".govuk-pagination__link-title")).toHaveClass(
      "govuk-pagination__link-title--decorated",
    );
  });
});
