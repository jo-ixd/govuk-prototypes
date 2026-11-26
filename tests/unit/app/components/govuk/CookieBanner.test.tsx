import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import CookieBanner from "@/app/components/govuk/CookieBanner";

const messages = [
  {
    headingText: "Cookies on this service",
    text: "We use cookies to measure how the service is used.",
    actions: [
      { text: "Accept additional cookies", type: "submit" as const },
      { text: "Reject additional cookies", type: "submit" as const },
    ],
  },
];

describe("CookieBanner", () => {
  it("renders as a region labelled for screen readers", () => {
    render(<CookieBanner messages={messages} />);
    const banner = document.querySelector(".govuk-cookie-banner");
    expect(banner).toHaveAttribute("role", "region");
    expect(banner).toHaveAttribute("aria-label", "Cookie banner");
    expect(banner).toHaveAttribute("data-nosnippet", "true");
  });

  it("renders each message with a heading and body", () => {
    render(<CookieBanner messages={messages} />);
    expect(
      screen.getByRole("heading", { level: 2, name: "Cookies on this service" }),
    ).not.toBeNull();
    expect(
      screen.getByText("We use cookies to measure how the service is used."),
    ).not.toBeNull();
  });

  it("renders actions without an href as submit buttons", () => {
    render(<CookieBanner messages={messages} />);
    const accept = screen.getByRole("button", {
      name: "Accept additional cookies",
    });
    expect(accept.tagName).toBe("BUTTON");
    expect(accept).toHaveAttribute("type", "submit");
    expect(accept).toHaveAttribute("data-module", "govuk-button");
  });

  it("renders actions with an href as links", () => {
    render(
      <CookieBanner
        messages={[
          {
            text: "How we use cookies.",
            actions: [{ text: "View cookies", href: "/cookies" }],
          },
        ]}
      />,
    );
    const link = screen.getByRole("link", { name: "View cookies" });
    expect(link).toHaveAttribute("href", "/cookies");
    expect(link).toHaveClass("govuk-link");
  });

  it("renders an empty actions list as an empty button group like the njk macros", () => {
    render(<CookieBanner messages={[{ text: "Hello", actions: [] }]} />);
    const group = document.querySelector(".govuk-button-group");
    expect(group).not.toBeNull();
    expect(group?.children.length).toBe(0);
  });

  it("hides extra messages until JavaScript shows the right one", () => {
    render(
      <CookieBanner
        messages={[
          { text: "First", hidden: false },
          { text: "Second", hidden: true },
        ]}
      />,
    );
    const messageDivs = document.querySelectorAll(
      ".govuk-cookie-banner__message",
    );
    expect(messageDivs[0]).not.toHaveAttribute("hidden");
    expect(messageDivs[1]).toHaveAttribute("hidden");
  });

  it("supports a custom region label", () => {
    render(
      <CookieBanner messages={messages} ariaLabel="Cookies on GOV.UK" />,
    );
    expect(document.querySelector(".govuk-cookie-banner")).toHaveAttribute(
      "aria-label",
      "Cookies on GOV.UK",
    );
  });
});
