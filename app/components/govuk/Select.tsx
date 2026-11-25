import { useId } from "react";
import type { ReactNode } from "react";
import type { CommonProps, TextOrHtml } from "@/app/components/govuk/types";
import type { LabelProps } from "@/app/components/govuk/Label";
import type { HintProps } from "@/app/components/govuk/Hint";
import type { ErrorMessageProps } from "@/app/components/govuk/ErrorMessage";
import Label from "@/app/components/govuk/Label";
import Hint from "@/app/components/govuk/Hint";
import ErrorMessage from "@/app/components/govuk/ErrorMessage";
import { govukClasses } from "@/app/components/govuk/utils";

export type SelectItem = {
  value?: string | number;
  text?: string;
  html?: ReactNode;
  selected?: boolean;
  disabled?: boolean;
  attributes?: Record<string, string | number | boolean>;
};

export type SelectFormGroup = {
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

export type SelectProps = CommonProps & {
  id?: string;
  name: string;
  items: (SelectItem | null)[];
  value?: string;
  disabled?: boolean;
  describedBy?: string;
  label: FieldLabel;
  hint?: FieldHint;
  errorMessage?: FieldErrorMessage;
  formGroup?: SelectFormGroup;
};

function describedIds(...ids: (string | null)[]): string | null {
  const joined = ids.filter(Boolean).join(" ");
  return joined === "" ? null : joined;
}

export default function Select({
  id: idProp,
  name,
  items,
  value,
  disabled,
  describedBy,
  label,
  hint,
  errorMessage,
  formGroup,
  classes,
  attributes,
}: SelectProps) {
  const autoId = useId();
  const id = idProp ?? (name || autoId);
  const selectedValue = value ?? null;

  // Mirrors the njk logic: an item is selected when it says so, or when no
  // explicit `selected` flag was given and its effective value (value, or the
  // option text when value is omitted) matches the top-level `value` param.
  // Both sides are stringified so numeric item values can match too.
  const isSelected = (item: SelectItem): boolean => {
    if (item.selected === true) return true;
    if (item.selected === false) return false;
    const effectiveValue = item.value ?? item.text ?? null;
    return (
      selectedValue !== null &&
      effectiveValue !== null &&
      String(effectiveValue) === String(selectedValue)
    );
  };

  // React warns when `selected` is set on individual options, so the initially
  // selected option is passed as the select's defaultValue instead. When no
  // option matches, the browser default (first option) applies, exactly as in
  // the server-rendered njk output.
  const selectedItem = items.find(
    (item): item is SelectItem => item !== null && isSelected(item),
  );
  const selectedDefaultValue = selectedItem
    ? selectedItem.value ?? selectedItem.text ?? null
    : null;

  const describedByIds = describedIds(
    describedBy ?? null,
    hint ? `${id}-hint` : null,
    errorMessage ? `${id}-error` : null,
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
      {formGroup?.beforeInput ? (
        formGroup.beforeInput.html ?? formGroup.beforeInput.text
      ) : null}
      <select
        className={govukClasses(
          "govuk-select",
          [classes ?? null, errorMessage ? "govuk-select--error" : null]
            .filter(Boolean)
            .join(" "),
        )}
        id={id}
        name={name}
        disabled={disabled}
        aria-describedby={describedByIds ?? undefined}
        {...(selectedDefaultValue !== null
          ? { defaultValue: selectedDefaultValue }
          : {})}
        {...attributes}
      >
        {items.map(
          (item, index) =>
            item && (
              <option
                key={index}
                value={item.value}
                disabled={item.disabled}
                {...item.attributes}
              >
                {item.html ?? item.text}
              </option>
            ),
        )}
      </select>
      {formGroup?.afterInput ? (
        formGroup.afterInput.html ?? formGroup.afterInput.text
      ) : null}
    </div>
  );
}
