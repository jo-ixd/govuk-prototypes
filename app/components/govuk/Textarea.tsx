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
  spellcheck?: boolean;
  disabled?: boolean;
  describedBy?: string;
  label: FieldLabel;
  hint?: FieldHint;
  errorMessage?: FieldErrorMessage;
  formGroup?: TextareaFormGroup;
  autocomplete?: string;
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
  spellcheck,
  disabled,
  describedBy,
  label,
  hint,
  errorMessage,
  formGroup,
  autocomplete,
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

  // React 19's server renderer writes lesser-known props verbatim, so HTML
  // attributes are passed as lowercase keys — including spellcheck as a
  // string, matching the njk output of spellcheck="true"/"false".
  const fieldAttributes: Record<string, string | number | boolean> = {};
  const spellcheckProp = spellcheck ?? null;
  if (spellcheckProp !== null) fieldAttributes.spellcheck = String(spellcheckProp);
  if (autocomplete) fieldAttributes.autocomplete = autocomplete;

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
        aria-describedby={describedByIds ?? undefined}
        {...fieldAttributes}
        {...attributes}
      />
      {formGroup?.afterInput ? (
        formGroup.afterInput.html ?? formGroup.afterInput.text
      ) : null}
    </div>
  );
}
