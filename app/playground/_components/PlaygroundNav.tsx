"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { govukClasses } from "@/app/components/govuk/utils";

type PlaygroundNavItem = {
  text: string;
  href: string;
  match: "exact" | "prefix";
};

const NAV_ITEMS: PlaygroundNavItem[] = [
  { text: "Components", href: "/playground", match: "exact" },
  { text: "Patterns", href: "/playground/patterns", match: "prefix" },
];

export default function PlaygroundNav() {
  const pathname = usePathname();

  return (
    <>
      {NAV_ITEMS.map((item) => {
        const isActive =
          item.match === "exact"
            ? pathname === item.href
            : pathname.startsWith(`${item.href}/`) ||
              pathname === item.href;

        return (
          <li
            key={item.href}
            className={govukClasses(
              "govuk-service-navigation__item",
              isActive ? "govuk-service-navigation__item--active" : "",
            )}
          >
            <Link
              className="govuk-service-navigation__link"
              href={item.href}
              {...(isActive ? { "aria-current": "true" as const } : {})}
            >
              {isActive ? (
                <strong className="govuk-service-navigation__active-fallback">
                  {item.text}
                </strong>
              ) : (
                item.text
              )}
            </Link>
          </li>
        );
      })}
    </>
  );
}
