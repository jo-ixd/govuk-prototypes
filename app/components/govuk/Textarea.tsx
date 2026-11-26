import { useId } from "react";
import type { CommonProps, TextOrHtml } from "@/app/components/govuk/types";
import type { LabelProps } from "@/app/components/govuk/Label";
import type { HintProps } from "@/app/components/govuk/Hint";
import type { ErrorMessageProps } from "@/app/components/govuk/ErrorMessage";
import Label from "@/app/components/govuk/Label";
import Hint from "@/app/components/govuk/Hint";
import ErrorMessage from "@/app/components/govuk/ErrorMessage";
import { govukClasses } from "@/app/components/govuk/utils";

export type TextareaFormGroup = {
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

export type TextareaProps = CommonProps & {
  id?: string;
  name: string;
  rows?: number;
  value?: string;
  defaultValue?: string;
  spellCheck?: boolean;
  disabled?: boolean;
  describedBy?: string;
  label: FieldLabel;
  hint?: FieldHint;
  errorMessage?: FieldErrorMessage;
  formGroup?: TextareaFormGroup;
  autoComplete?: string;
};

function describedIds(...ids: (string | null)[]): string | null {
  const joined = ids.filter(Boolean).join(" ");
  return joined === "" ? null : joined;
}

export default function Textarea({
  id: idProp,
  name,
  rows = 5,
  value,
  defaultValue,
  spellCheck,
  disabled,
  describedBy,
  label,
  hint,
  errorMessage,
  formGroup,
  autoComplete,
  classes,
  attributes,
}: TextareaProps) {
  const autoId = useId();
  const id = idProp ?? (name || autoId);

  const describedByIds = describedIds(
    describedBy ?? null,
    hint ? `${id}-hint` : null,
    errorMessage ? `${id}-error` : null,
  );

  // React maps the camelCase props onto the lowercase HTML attributes, and
  // writes spellCheck as spellcheck="true"/"false", matching the njk output.
  return (
    <div
      className={govukClasses(
        "govuk-form-group",
        [
          errorMessage ? "govuk-form-group--error" : null,
          formGroup?.classes ?? null,
        ]
          .filter(Boolean)
          .join(" "),
      )}
      {...formGroup?.attributes}
    >
      <Label htmlFor={id} {...label} />
      {hint && <Hint id={`${id}-hint`} {...hint} />}
      {errorMessage && <ErrorMessage id={`${id}-error`} {...errorMessage} />}
      {formGroup?.beforeInput ? (
        formGroup.beforeInput.html ?? formGroup.beforeInput.text
      ) : null}
      <textarea
        className={govukClasses(
          "govuk-textarea",
          [
            errorMessage ? "govuk-textarea--error" : null,
            classes ?? null,
          ]
            .filter(Boolean)
            .join(" "),
        )}
        id={id}
        name={name}
        rows={rows}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        spellCheck={spellCheck}
        autoComplete={autoComplete}
        {...(describedByIds ? { "aria-describedby": describedByIds } : {})}
        {...attributes}
      />
      {formGroup?.afterInput ? (
        formGroup.afterInput.html ?? formGroup.afterInput.text
      ) : null}
    </div>
  );
}
