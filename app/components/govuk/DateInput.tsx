import { useId } from "react";
import type { HTMLAttributes } from "react";
import type { CommonProps, TextOrHtml } from "@/app/components/govuk/types";
import type { FieldsetLegend } from "@/app/components/govuk/Fieldset";
import type { HintProps } from "@/app/components/govuk/Hint";
import type { ErrorMessageProps } from "@/app/components/govuk/ErrorMessage";
import Fieldset from "@/app/components/govuk/Fieldset";
import Hint from "@/app/components/govuk/Hint";
import ErrorMessage from "@/app/components/govuk/ErrorMessage";
import Label from "@/app/components/govuk/Label";
import { govukClasses } from "@/app/components/govuk/utils";

export type DateInputItem = {
  id?: string;
  name?: string;
  label?: string;
  value?: string | number;
  error?: boolean;
  inputmode?: HTMLAttributes<HTMLInputElement>["inputMode"];
  autocomplete?: string;
  pattern?: string;
  classes?: string;
  attributes?: Record<string, string | number | boolean>;
};

export type DateInputFieldset = {
  describedBy?: string;
  legend?: FieldsetLegend;
  classes?: string;
  attributes?: Record<string, string | number | boolean>;
};

export type DateInputFormGroup = {
  classes?: string;
  attributes?: Record<string, string | number | boolean>;
  beforeInputs?: TextOrHtml;
  afterInputs?: TextOrHtml;
};

export type DateInputProps = CommonProps & {
  id?: string;
  namePrefix?: string;
  items?: DateInputItem[];
  day?: DateInputItem;
  month?: DateInputItem;
  year?: DateInputItem;
  values?: Record<string, string | number>;
  fieldset?: DateInputFieldset | null;
  hint?: HintProps | null;
  errorMessage?: ErrorMessageProps | null;
  formGroup?: DateInputFormGroup;
};

const itemHasErrorState = (item: DateInputItem) =>
  Boolean(
    item.error || (item.classes && item.classes.includes("govuk-input--error")),
  );

const capitalize = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

export default function DateInput({
  id,
  namePrefix,
  items,
  day,
  month,
  year,
  values,
  fieldset,
  hint,
  errorMessage,
  formGroup,
  classes,
  attributes,
}: DateInputProps) {
  const autoId = useId();
  const componentId = id ?? autoId;

  const dayItem = day ?? {
    name: "day",
    value: values?.day,
    classes: "govuk-input--width-2",
  };
  const monthItem = month ?? {
    name: "month",
    value: values?.month,
    classes: "govuk-input--width-2",
  };
  const yearItem = year ?? {
    name: "year",
    value: values?.year,
    classes: "govuk-input--width-4",
  };
  const dateItems =
    items && items.length > 0 ? items : [dayItem, monthItem, yearItem];

  const anyItemHasError = dateItems.some(itemHasErrorState);

  // A record of other elements that we need to associate with the fieldset
  // using aria-describedby – for example hints or error messages.
  const describedParts: string[] = [];
  if (fieldset?.describedBy) describedParts.push(fieldset.describedBy);
  if (hint) describedParts.push(`${componentId}-hint`);
  if (errorMessage) describedParts.push(`${componentId}-error`);
  const fieldsetDescription = describedParts.join(" ");

  const renderDateItem = (item: DateInputItem, index: number) => {
    let itemName: string | null = item.name ?? null;
    let itemValue: string | number | null = item.value ?? null;
    let itemWidth: 2 | 4 = 2;

    if (
      item === dayItem ||
      (itemName && (itemName === "day" || itemName === dayItem.name))
    ) {
      itemValue = item.value ?? dayItem.value ?? null;
      itemName = itemName ?? "day";
    } else if (
      item === monthItem ||
      (itemName && (itemName === "month" || itemName === monthItem.name))
    ) {
      itemValue = item.value ?? monthItem.value ?? null;
      itemName = itemName ?? "month";
    } else if (
      item === yearItem ||
      (itemName && (itemName === "year" || itemName === yearItem.name))
    ) {
      itemValue = item.value ?? yearItem.value ?? null;
      itemName = itemName ?? "year";
      itemWidth = 4;
    }

    const resolvedName = itemName ?? "";
    const prefixedName = namePrefix
      ? `${namePrefix}-${resolvedName}`
      : resolvedName;
    const value = itemValue ?? (values ? values[prefixedName] : null) ?? null;

    const hasErrorClass = Boolean(
      item.classes && item.classes.includes("govuk-input--error"),
    );
    const hasWidthClass = Boolean(
      item.classes && item.classes.includes("govuk-input--width-"),
    );
    const classParts: string[] = [];
    if (
      !hasErrorClass &&
      (itemHasErrorState(item) ||
        (item.error !== false && errorMessage && !anyItemHasError))
    ) {
      classParts.push("govuk-input--error");
    }
    if (!hasWidthClass) {
      classParts.push(`govuk-input--width-${itemWidth}`);
    }
    if (item.classes) classParts.push(item.classes);

    const itemId = item.id ?? `${componentId}-${resolvedName}`;
    const labelText = item.label ?? capitalize(resolvedName);

    return (
      <div className="govuk-date-input__item" key={index}>
        <div className="govuk-form-group">
          <Label
            text={labelText}
            classes="govuk-date-input__label"
            htmlFor={itemId}
          />
          <input
            className={govukClasses(
              "govuk-input govuk-date-input__input",
              classParts.join(" "),
            )}
            id={itemId}
            name={prefixedName}
            type="text"
            {...(value !== null ? { defaultValue: String(value) } : {})}
            inputMode={item.inputmode ?? "numeric"}
            autoComplete={item.autocomplete}
            pattern={item.pattern}
            {...item.attributes}
          />
        </div>
      </div>
    );
  };

  const inner = (
    <>
      {hint ? <Hint {...hint} id={`${componentId}-hint`} /> : null}
      {errorMessage ? (
        <ErrorMessage {...errorMessage} id={`${componentId}-error`} />
      ) : null}
      <div
        className={govukClasses("govuk-date-input", classes)}
        {...attributes}
        id={componentId}
      >
        {formGroup?.beforeInputs ? (
          <>{formGroup.beforeInputs.html ?? formGroup.beforeInputs.text}</>
        ) : null}
        {dateItems.map((item, index) => renderDateItem(item, index))}
        {formGroup?.afterInputs ? (
          <>{formGroup.afterInputs.html ?? formGroup.afterInputs.text}</>
        ) : null}
      </div>
    </>
  );

  return (
    <div
      className={govukClasses(
        errorMessage
          ? "govuk-form-group govuk-form-group--error"
          : "govuk-form-group",
        formGroup?.classes,
      )}
      {...formGroup?.attributes}
    >
      {fieldset ? (
        // The fieldset role is overridden to 'group' because otherwise JAWS
        // does not announce the description for a fieldset comprised of text
        // inputs, but adding the role to the fieldset always makes the output
        // overly verbose for radio buttons or checkboxes.
        <Fieldset
          role="group"
          describedBy={fieldsetDescription}
          legend={fieldset.legend}
          classes={fieldset.classes}
          attributes={fieldset.attributes}
        >
          {inner}
        </Fieldset>
      ) : (
        inner
      )}
    </div>
  );
}
