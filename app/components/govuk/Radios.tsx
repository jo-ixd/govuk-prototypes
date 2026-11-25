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

export type RadiosItemLabel = {
  classes?: string;
  attributes?: Record<string, string | number | boolean>;
};

export type RadiosItem = {
  text?: string;
  html?: ReactNode;
  id?: string;
  value?: string;
  label?: RadiosItemLabel;
  hint?: HintProps;
  divider?: string;
  checked?: boolean;
  conditional?: TextOrHtml;
  disabled?: boolean;
  attributes?: Record<string, string | number | boolean>;
};

export type RadiosFieldset = {
  describedBy?: string;
  legend?: FieldsetLegend;
  classes?: string;
  attributes?: Record<string, string | number | boolean>;
};

export type RadiosFormGroup = {
  classes?: string;
  attributes?: Record<string, string | number | boolean>;
  beforeInputs?: TextOrHtml;
  afterInputs?: TextOrHtml;
};

export type RadiosProps = CommonProps & {
  fieldset?: RadiosFieldset | null;
  hint?: HintProps | null;
  errorMessage?: ErrorMessageProps | null;
  formGroup?: RadiosFormGroup;
  idPrefix?: string;
  name: string;
  items: RadiosItem[];
  value?: string;
  describedBy?: string;
};

export default function Radios({
  fieldset,
  hint,
  errorMessage,
  formGroup,
  idPrefix,
  name,
  items,
  value,
  describedBy,
  classes,
  attributes,
}: RadiosProps) {
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
  const fieldsetDescription = describedParts.join(" ");

  const renderRadioItem = (item: RadiosItem, index: number) => {
    const itemIndex = index + 1;

    if (!item) {
      return null;
    }

    if (item.divider) {
      return (
        <div key={itemIndex} className="govuk-radios__divider">
          {item.divider}
        </div>
      );
    }

    // The first id should not have a number suffix so it's easy to link to
    // from the error summary component.
    const itemId =
      item.id ?? `${prefix}${itemIndex > 1 ? `-${itemIndex}` : ""}`;
    const conditionalId = `conditional-${itemId}`;
    const conditionalContent = item.conditional
      ? item.conditional.html ?? item.conditional.text
      : null;
    const hasHint = Boolean(item.hint && (item.hint.html ?? item.hint.text));
    const isChecked = item.checked ?? Boolean(value && item.value === value);

    return (
      <Fragment key={itemIndex}>
        <div className="govuk-radios__item">
          <input
            className="govuk-radios__input"
            id={itemId}
            name={name}
            type="radio"
            value={item.value}
            defaultChecked={isChecked}
            disabled={item.disabled}
            {...(conditionalContent
              ? { "data-aria-controls": conditionalId }
              : {})}
            {...(hasHint ? { "aria-describedby": `${itemId}-item-hint` } : {})}
            {...item.attributes}
          />
          <Label
            {...(item.html ? { html: item.html } : { text: item.text ?? "" })}
            {...item.label}
            htmlFor={itemId}
            classes={govukClasses("govuk-radios__label", item.label?.classes)}
          />
          {item.hint && hasHint ? (
            <Hint
              {...item.hint}
              id={`${itemId}-item-hint`}
              classes={govukClasses("govuk-radios__hint", item.hint.classes)}
            />
          ) : null}
        </div>
        {conditionalContent ? (
          <div
            className={
              isChecked
                ? "govuk-radios__conditional"
                : "govuk-radios__conditional govuk-radios__conditional--hidden"
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
        className={govukClasses("govuk-radios", classes)}
        {...attributes}
        data-module="govuk-radios"
      >
        {formGroup?.beforeInputs ? (
          <>{formGroup.beforeInputs.html ?? formGroup.beforeInputs.text}</>
        ) : null}
        {items.map((item, index) => renderRadioItem(item, index))}
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
