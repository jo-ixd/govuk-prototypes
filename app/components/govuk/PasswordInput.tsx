import { useId } from "react";
import type { CommonProps, TextOrHtml } from "@/app/components/govuk/types";
import type { LabelProps } from "@/app/components/govuk/Label";
import type { HintProps } from "@/app/components/govuk/Hint";
import type { ErrorMessageProps } from "@/app/components/govuk/ErrorMessage";
import Input from "@/app/components/govuk/Input";
import { govukClasses } from "@/app/components/govuk/utils";

export type PasswordInputFormGroup = {
  classes?: string;
  attributes?: Record<string, string | number | boolean>;
  beforeInput?: TextOrHtml;
  afterInput?: TextOrHtml;
};

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown
  ? Omit<T, K>
  : never;

export type FieldLabel = DistributiveOmit<LabelProps, "htmlFor">;
export type FieldHint = DistributiveOmit<HintProps, "id">;
export type FieldErrorMessage = DistributiveOmit<ErrorMessageProps, "id">;

export type PasswordInputProps = CommonProps & {
  id?: string;
  name: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  describedBy?: string;
  label: FieldLabel;
  hint?: FieldHint;
  errorMessage?: FieldErrorMessage;
  formGroup?: PasswordInputFormGroup;
  autocomplete?: string;
  showPasswordText?: string;
  hidePasswordText?: string;
  showPasswordAriaLabelText?: string;
  hidePasswordAriaLabelText?: string;
  passwordShownAnnouncementText?: string;
  passwordHiddenAnnouncementText?: string;
  button?: {
    classes?: string;
  };
};

// Renders translated text into `data-i18n.*` attributes, mirroring the
// govukI18nAttributes njk macro.
function i18nMessageAttributes(
  key: string,
  message?: string,
): Record<string, string> {
  return message ? { [`data-i18n.${key}`]: message } : {};
}

export default function PasswordInput({
  id: idProp,
  name,
  value,
  defaultValue,
  disabled,
  describedBy,
  label,
  hint,
  errorMessage,
  formGroup,
  autocomplete,
  showPasswordText,
  hidePasswordText,
  showPasswordAriaLabelText,
  hidePasswordAriaLabelText,
  passwordShownAnnouncementText,
  passwordHiddenAnnouncementText,
  button,
  classes,
  attributes,
}: PasswordInputProps) {
  const autoId = useId();
  const id = idProp ?? (name || autoId);

  const passwordAttributes: Record<string, string | number | boolean> = {
    "data-module": "govuk-password-input",
  };
  Object.assign(
    passwordAttributes,
    i18nMessageAttributes("show-password", showPasswordText),
  );
  Object.assign(
    passwordAttributes,
    i18nMessageAttributes("hide-password", hidePasswordText),
  );
  Object.assign(
    passwordAttributes,
    i18nMessageAttributes("show-password-aria-label", showPasswordAriaLabelText),
  );
  Object.assign(
    passwordAttributes,
    i18nMessageAttributes("hide-password-aria-label", hidePasswordAriaLabelText),
  );
  Object.assign(
    passwordAttributes,
    i18nMessageAttributes(
      "password-shown-announcement",
      passwordShownAnnouncementText,
    ),
  );
  Object.assign(
    passwordAttributes,
    i18nMessageAttributes(
      "password-hidden-announcement",
      passwordHiddenAnnouncementText,
    ),
  );

  return (
    <Input
      id={id}
      name={name}
      type="password"
      value={value}
      defaultValue={defaultValue}
      disabled={disabled}
      describedBy={describedBy}
      label={label}
      hint={hint}
      errorMessage={errorMessage}
      autocomplete={autocomplete ?? "current-password"}
      spellcheck={false}
      autocapitalize="none"
      classes={govukClasses(
        "govuk-password-input__input govuk-js-password-input-input",
        classes,
      )}
      inputWrapper={{ classes: "govuk-password-input__wrapper" }}
      formGroup={{
        classes: govukClasses("govuk-password-input", formGroup?.classes),
        attributes: { ...formGroup?.attributes, ...passwordAttributes },
        beforeInput: formGroup?.beforeInput,
        afterInput: {
          html: (
            <>
              <button
                type="button"
                className={govukClasses(
                  "govuk-button",
                  [
                    "govuk-button--secondary",
                    "govuk-password-input__toggle",
                    "govuk-js-password-input-toggle",
                    button?.classes ?? null,
                  ]
                    .filter(Boolean)
                    .join(" "),
                )}
                data-module="govuk-button"
                aria-controls={id}
                aria-label={showPasswordAriaLabelText ?? "Show password"}
                hidden
              >
                {showPasswordText ?? "Show"}
              </button>
              {formGroup?.afterInput
                ? formGroup.afterInput.html ?? formGroup.afterInput.text
                : null}
            </>
          ),
        },
      }}
      attributes={attributes}
    />
  );
}
