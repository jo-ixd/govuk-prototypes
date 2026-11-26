import { useId } from "react";
import type { CommonProps, TextOrHtml } from "@/app/components/govuk/types";
import type { LabelProps } from "@/app/components/govuk/Label";
import type { HintProps } from "@/app/components/govuk/Hint";
import type { ErrorMessageProps } from "@/app/components/govuk/ErrorMessage";
import Hint from "@/app/components/govuk/Hint";
import Textarea from "@/app/components/govuk/Textarea";
import { govukClasses } from "@/app/components/govuk/utils";

export type CharacterCountFormGroup = {
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

export type CharacterCountProps = CommonProps & {
  id?: string;
  name: string;
  rows?: number;
  value?: string;
  defaultValue?: string;
  maxlength?: number;
  maxwords?: number;
  threshold?: number;
  label: FieldLabel;
  hint?: FieldHint;
  errorMessage?: FieldErrorMessage;
  formGroup?: CharacterCountFormGroup;
  spellCheck?: boolean;
  countMessage?: {
    classes?: string;
  };
  textareaDescriptionText?: string;
  charactersUnderLimitText?: Record<string, string>;
  charactersAtLimitText?: string;
  charactersOverLimitText?: Record<string, string>;
  wordsUnderLimitText?: Record<string, string>;
  wordsAtLimitText?: string;
  wordsOverLimitText?: Record<string, string>;
};

// Renders translated text into `data-i18n.*` attributes, mirroring the
// govukI18nAttributes njk macro: a single message becomes `data-i18n.<key>`,
// pluralised messages become `data-i18n.<key>.<pluralRule>` per entry.
function i18nMessageAttributes(
  key: string,
  message?: string,
): Record<string, string> {
  return message ? { [`data-i18n.${key}`]: message } : {};
}

function i18nMessagesAttributes(
  key: string,
  messages?: Record<string, string>,
): Record<string, string> {
  if (!messages) return {};
  return Object.fromEntries(
    Object.entries(messages).map(([pluralRule, message]) => [
      `data-i18n.${key}.${pluralRule}`,
      message,
    ]),
  );
}

export default function CharacterCount({
  id: idProp,
  name,
  rows,
  value,
  defaultValue,
  maxlength,
  maxwords,
  threshold,
  label,
  hint,
  errorMessage,
  formGroup,
  spellCheck,
  countMessage,
  textareaDescriptionText,
  charactersUnderLimitText,
  charactersAtLimitText,
  charactersOverLimitText,
  wordsUnderLimitText,
  wordsAtLimitText,
  wordsOverLimitText,
  classes,
  attributes,
}: CharacterCountProps) {
  const autoId = useId();
  const id = idProp ?? (name || autoId);

  const maxlengthProp = maxlength ?? null;
  const maxwordsProp = maxwords ?? null;
  const thresholdProp = threshold ?? null;

  const hasNoLimit = !maxwordsProp && !maxlengthProp;
  const limit = maxwordsProp ?? maxlengthProp;

  // If the limit is set in JavaScript, we won't be able to interpolate the
  // message until JavaScript runs, so we only set a text if the maxlength or
  // maxwords options were provided.
  const textareaDescriptionTextProp =
    textareaDescriptionText ??
    `You can enter up to %{count} ${maxwordsProp ? "words" : "characters"}`;
  const countMessageText = hasNoLimit
    ? ""
    : textareaDescriptionTextProp.replace("%{count}", String(limit));

  const countAttributes: Record<string, string | number | boolean> = {
    "data-module": "govuk-character-count",
  };
  if (maxlengthProp !== null) countAttributes["data-maxlength"] = maxlengthProp;
  if (thresholdProp !== null) countAttributes["data-threshold"] = thresholdProp;
  if (maxwordsProp !== null) countAttributes["data-maxwords"] = maxwordsProp;

  // Without maxlength or maxwords we can't guess whether the component will
  // count words or characters, so the description is only handed to JavaScript
  // through this attribute when it was explicitly provided.
  if (hasNoLimit && textareaDescriptionText) {
    Object.assign(
      countAttributes,
      i18nMessagesAttributes("textarea-description", {
        other: textareaDescriptionText,
      }),
    );
  }

  Object.assign(
    countAttributes,
    i18nMessagesAttributes("characters-under-limit", charactersUnderLimitText),
  );
  Object.assign(
    countAttributes,
    i18nMessageAttributes("characters-at-limit", charactersAtLimitText),
  );
  Object.assign(
    countAttributes,
    i18nMessagesAttributes("characters-over-limit", charactersOverLimitText),
  );
  Object.assign(
    countAttributes,
    i18nMessagesAttributes("words-under-limit", wordsUnderLimitText),
  );
  Object.assign(
    countAttributes,
    i18nMessageAttributes("words-at-limit", wordsAtLimitText),
  );
  Object.assign(
    countAttributes,
    i18nMessagesAttributes("words-over-limit", wordsOverLimitText),
  );

  return (
    <Textarea
      id={id}
      name={name}
      rows={rows}
      value={value}
      defaultValue={defaultValue}
      spellCheck={spellCheck}
      label={label}
      hint={hint}
      errorMessage={errorMessage}
      describedBy={`${id}-info`}
      formGroup={{
        classes: govukClasses("govuk-character-count", formGroup?.classes),
        attributes: { ...formGroup?.attributes, ...countAttributes },
        beforeInput: formGroup?.beforeInput,
        afterInput: {
          html: (
            <>
              <Hint
                id={`${id}-info`}
                classes={govukClasses(
                  "govuk-character-count__message",
                  countMessage?.classes,
                )}
                text={countMessageText}
              />
              {formGroup?.afterInput
                ? formGroup.afterInput.html ?? formGroup.afterInput.text
                : null}
            </>
          ),
        },
      }}
      classes={govukClasses("govuk-js-character-count", classes)}
      attributes={attributes}
    />
  );
}
