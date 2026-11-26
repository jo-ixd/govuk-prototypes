import { useId } from "react";
import type { CommonProps, TextOrHtml } from "@/app/components/govuk/types";
import type { LabelProps } from "@/app/components/govuk/Label";
import type { HintProps } from "@/app/components/govuk/Hint";
import type { ErrorMessageProps } from "@/app/components/govuk/ErrorMessage";
import Label from "@/app/components/govuk/Label";
import Hint from "@/app/components/govuk/Hint";
import ErrorMessage from "@/app/components/govuk/ErrorMessage";
import { govukClasses } from "@/app/components/govuk/utils";

export type InputAffix = TextOrHtml & CommonProps;

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown
  ? Omit<T, K>
  : never;

export type FieldLabel = DistributiveOmit<LabelProps, "htmlFor">;
export type FieldHint = DistributiveOmit<HintProps, "id">;
export type FieldErrorMessage = DistributiveOmit<ErrorMessageProps, "id">;

export type InputFormGroup = {
  classes?: string;
  attributes?: Record<string, string | number | boolean>;
  beforeInput?: TextOrHtml;
  afterInput?: TextOrHtml;
};

export type InputProps = CommonProps & {
  id?: string;
  name: string;
  type?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  describedBy?: string;
  label: FieldLabel;
  hint?: FieldHint;
  errorMessage?: FieldErrorMessage;
  prefix?: InputAffix;
  suffix?: InputAffix;
  formGroup?: InputFormGroup;
  inputWrapper?: CommonProps;
  autoComplete?: string;
  autoCapitalize?: string;
  pattern?: string;
  inputMode?:
    | "none"
    | "text"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | "search";
  spellCheck?: boolean;
  placeholder?: string;
};

function describedIds(...ids: (string | null)[]): string | null {
  const joined = ids.filter(Boolean).join(" ");
  return joined === "" ? null : joined;
}

function affixContent(affix: InputAffix) {
  return affix.html ?? affix.text;
}

export default function Input({
  id: idProp,
  name,
  type = "text",
  value,
  defaultValue,
  disabled,
  describedBy,
  label,
  hint,
  errorMessage,
  prefix,
  suffix,
  formGroup,
  inputWrapper,
  autoComplete,
  autoCapitalize,
  pattern,
  inputMode,
  spellCheck,
  placeholder,
  classes,
  attributes,
}: InputProps) {
  const autoId = useId();
  const id = idProp ?? (name || autoId);

  const describedByIds = describedIds(
    describedBy ?? null,
    hint ? `${id}-hint` : null,
    errorMessage ? `${id}-error` : null,
  );

  const hasPrefix = Boolean(prefix && affixContent(prefix));
  const hasSuffix = Boolean(suffix && affixContent(suffix));
  const hasBeforeInput = Boolean(
    formGroup?.beforeInput &&
      (formGroup.beforeInput.html ?? formGroup.beforeInput.text),
  );
  const hasAfterInput = Boolean(
    formGroup?.afterInput &&
      (formGroup.afterInput.html ?? formGroup.afterInput.text),
  );
  const hasWrapper = hasPrefix || hasSuffix || hasBeforeInput || hasAfterInput;

  const inputClasses = govukClasses(
    "govuk-input",
    [classes ?? null, errorMessage ? "govuk-input--error" : null]
      .filter(Boolean)
      .join(" "),
  );

  // React maps the camelCase props onto the lowercase HTML attributes, and
  // writes spellCheck as spellcheck="true"/"false", matching the njk output.
  const inputElement = (
    <input
      className={inputClasses}
      id={id}
      name={name}
      type={type}
      value={value}
      defaultValue={defaultValue}
      disabled={disabled}
      autoComplete={autoComplete}
      autoCapitalize={autoCapitalize}
      pattern={pattern}
      inputMode={inputMode}
      spellCheck={spellCheck}
      placeholder={placeholder}
      aria-describedby={describedByIds ?? undefined}
      {...attributes}
    />
  );

  const renderAffix = (affixType: "prefix" | "suffix", affix: InputAffix) => (
    <div
      className={govukClasses(`govuk-input__${affixType}`, affix.classes)}
      aria-hidden="true"
      {...affix.attributes}
    >
      {affixContent(affix)}
    </div>
  );

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
      {hasWrapper ? (
        <div
          className={govukClasses("govuk-input__wrapper", inputWrapper?.classes)}
          {...inputWrapper?.attributes}
        >
          {hasBeforeInput && formGroup?.beforeInput
            ? formGroup.beforeInput.html ?? formGroup.beforeInput.text
            : null}
          {hasPrefix && prefix ? renderAffix("prefix", prefix) : null}
          {inputElement}
          {hasSuffix && suffix ? renderAffix("suffix", suffix) : null}
          {hasAfterInput && formGroup?.afterInput
            ? formGroup.afterInput.html ?? formGroup.afterInput.text
            : null}
        </div>
      ) : (
        inputElement
      )}
    </div>
  );
}
