import { Fragment } from "react";
import type { ReactNode } from "react";
import type { CommonProps, TextOrHtml } from "@/app/components/govuk/types";
import type { FieldsetLegend } from "@/app/components/govuk/Fieldset";
import type { HintProps } from "@/app/components/govuk/Hint";
import type { ErrorMessageProps } from "@/app/components/govuk/ErrorMessage";
import Fieldset from "@/app/components/govuk/Fieldset";
import Hint from "@/app/components/govuk/Hint";
import ErrorMessage from "@/app/components/govuk/ErrorMessage";
import Label from "@/app/components/govuk/Label";
import { govukClasses } from "@/app/components/govuk/utils";

export type CheckboxesItemLabel = {
  classes?: string;
  attributes?: Record<string, string | number | boolean>;
};

export type CheckboxesItem = {
  text?: string;
  html?: ReactNode;
  id?: string;
  name?: string;
  value?: string;
  label?: CheckboxesItemLabel;
  hint?: HintProps;
  divider?: string;
  checked?: boolean;
  conditional?: TextOrHtml;
  behaviour?: string;
  disabled?: boolean;
  attributes?: Record<string, string | number | boolean>;
};

export type CheckboxesFieldset = {
  describedBy?: string;
  legend?: FieldsetLegend;
  classes?: string;
  attributes?: Record<string, string | number | boolean>;
};

export type CheckboxesFormGroup = {
  classes?: string;
  attributes?: Record<string, string | number | boolean>;
  beforeInputs?: TextOrHtml;
  afterInputs?: TextOrHtml;
};

export type CheckboxesProps = CommonProps & {
  describedBy?: string;
  fieldset?: CheckboxesFieldset | null;
  hint?: HintProps | null;
  errorMessage?: ErrorMessageProps | null;
  formGroup?: CheckboxesFormGroup;
  idPrefix?: string;
  name: string;
  items: CheckboxesItem[];
  values?: string[];
};

export default function Checkboxes({
  describedBy,
  fieldset,
  hint,
  errorMessage,
  formGroup,
  idPrefix,
  name,
  items,
  values,
  classes,
  attributes,
}: CheckboxesProps) {
  // If an id 'prefix' is not passed, fall back to using the name attribute
  // instead. We need this for error messages and hints as well.
  const prefix = idPrefix ?? name;
  const hasFieldset = Boolean(fieldset);

  // A record of other elements that we need to associate with the fieldset
  // using aria-describedby – for example hints or error messages.
  const describedParts: string[] = [];
  const initialDescribedBy = fieldset?.describedBy ?? describedBy ?? null;
  if (initialDescribedBy) describedParts.push(initialDescribedBy);
  if (hint) describedParts.push(`${prefix}-hint`);
  if (errorMessage) describedParts.push(`${prefix}-error`);
  const groupDescribedBy = describedParts.join(" ");

  const renderCheckboxItem = (item: CheckboxesItem, index: number) => {
    const itemIndex = index + 1;

    if (!item) {
      return null;
    }

    if (item.divider) {
      return (
        <div key={itemIndex} className="govuk-checkboxes__divider">
          {item.divider}
        </div>
      );
    }

    // The first id should not have a number suffix so it's easy to link to
    // from the error summary component.
    const itemId =
      item.id ?? `${prefix}${itemIndex > 1 ? `-${itemIndex}` : ""}`;
    const itemName = item.name ?? name;
    const conditionalId = `conditional-${itemId}`;
    const conditionalContent = item.conditional
      ? item.conditional.html ?? item.conditional.text
      : null;
    const hasHint = Boolean(item.hint && (item.hint.html ?? item.hint.text));
    const isChecked = item.checked ?? Boolean(
      values && item.value && values.includes(item.value),
    );

    // Without a fieldset the group hint and error ids are associated with
    // each input instead of with the fieldset.
    const itemDescribedParts: string[] = [];
    if (!hasFieldset && groupDescribedBy) {
      itemDescribedParts.push(groupDescribedBy);
    }
    if (hasHint) itemDescribedParts.push(`${itemId}-item-hint`);
    const itemDescribedBy = itemDescribedParts.join(" ");

    return (
      <Fragment key={itemIndex}>
        <div className="govuk-checkboxes__item">
          <input
            className="govuk-checkboxes__input"
            id={itemId}
            name={itemName}
            type="checkbox"
            value={item.value}
            defaultChecked={isChecked}
            disabled={item.disabled}
            {...(conditionalContent
              ? { "data-aria-controls": conditionalId }
              : {})}
            {...(item.behaviour ? { "data-behaviour": item.behaviour } : {})}
            {...(itemDescribedBy ? { "aria-describedby": itemDescribedBy } : {})}
            {...item.attributes}
          />
          <Label
            {...(item.html ? { html: item.html } : { text: item.text ?? "" })}
            {...item.label}
            htmlFor={itemId}
            classes={govukClasses(
              "govuk-checkboxes__label",
              item.label?.classes,
            )}
          />
          {item.hint && hasHint ? (
            <Hint
              {...item.hint}
              id={`${itemId}-item-hint`}
              classes={govukClasses(
                "govuk-checkboxes__hint",
                item.hint.classes,
              )}
            />
          ) : null}
        </div>
        {conditionalContent ? (
          <div
            className={
              isChecked
                ? "govuk-checkboxes__conditional"
                : "govuk-checkboxes__conditional govuk-checkboxes__conditional--hidden"
            }
            id={conditionalId}
          >
            {conditionalContent}
          </div>
        ) : null}
      </Fragment>
    );
  };

  const inner = (
    <>
      {hint ? <Hint {...hint} id={`${prefix}-hint`} /> : null}
      {errorMessage ? (
        <ErrorMessage {...errorMessage} id={`${prefix}-error`} />
      ) : null}
      <div
        className={govukClasses("govuk-checkboxes", classes)}
        {...attributes}
        data-module="govuk-checkboxes"
      >
        {formGroup?.beforeInputs ? (
          <>{formGroup.beforeInputs.html ?? formGroup.beforeInputs.text}</>
        ) : null}
        {items.map((item, index) => renderCheckboxItem(item, index))}
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
      {hasFieldset && fieldset ? (
        <Fieldset
          describedBy={groupDescribedBy}
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
