import type { ReactNode } from "react";
import type { CommonProps, TextOrHtml } from "@/app/components/govuk/types";
import { govukClasses } from "@/app/components/govuk/utils";

export type ButtonElement = "button" | "a" | "input";

export type ButtonProps = CommonProps &
  TextOrHtml & {
    id?: string;
    element?: ButtonElement;
    type?: "button" | "submit" | "reset";
    name?: string;
    value?: string;
    disabled?: boolean;
    href?: string;
    preventDoubleClick?: boolean;
    isStartButton?: boolean;
  };

function StartIcon() {
  return (
    <svg
      className="govuk-button__start-icon"
      xmlns="http://www.w3.org/2000/svg"
      width={17.5}
      height={19}
      viewBox="0 0 33 40"
      aria-hidden="true"
      focusable="false"
    >
      <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
    </svg>
  );
}

export default function Button({
  id,
  element,
  type = "submit",
  name,
  value,
  disabled,
  href,
  preventDoubleClick,
  isStartButton,
  classes,
  attributes,
  text,
  html,
}: ButtonProps) {
  const className =
    govukClasses("govuk-button", classes) +
    (isStartButton ? " govuk-button--start" : "");

  const content: ReactNode =
    html && isStartButton ? <span>{html}</span> : (html ?? text);

  if (isStartButton || href || element === "a") {
    return (
      <a
        href={href || "#"}
        role="button"
        draggable={false}
        id={id}
        className={className}
        data-module="govuk-button"
        {...attributes}
      >
        {content}
        {isStartButton && <StartIcon />}
      </a>
    );
  }

  if (element === "input") {
    return (
      <input
        type={type}
        value={value ?? text ?? (typeof html === "string" ? html : "")}
        name={name}
        id={id}
        className={className}
        {...(disabled ? { disabled: true, "aria-disabled": true } : {})}
        data-prevent-double-click={preventDoubleClick}
        data-module="govuk-button"
        {...attributes}
      />
    );
  }

  return (
    <button
      type={type}
      value={value}
      name={name}
      id={id}
      className={className}
      {...(disabled ? { disabled: true, "aria-disabled": true } : {})}
      data-prevent-double-click={preventDoubleClick}
      data-module="govuk-button"
      {...attributes}
    >
      {content}
      {isStartButton && <StartIcon />}
    </button>
  );
}
