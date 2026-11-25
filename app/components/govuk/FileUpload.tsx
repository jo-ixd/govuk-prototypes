import { useId } from "react";
import type { CommonProps, TextOrHtml } from "@/app/components/govuk/types";
import type { LabelProps } from "@/app/components/govuk/Label";
import type { HintProps } from "@/app/components/govuk/Hint";
import type { ErrorMessageProps } from "@/app/components/govuk/ErrorMessage";
import Label from "@/app/components/govuk/Label";
import Hint from "@/app/components/govuk/Hint";
import ErrorMessage from "@/app/components/govuk/ErrorMessage";
import { govukClasses } from "@/app/components/govuk/utils";

export type FileUploadFormGroup = {
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

export type FileUploadProps = CommonProps & {
  id?: string;
  name: string;
  disabled?: boolean;
  multiple?: boolean;
  describedBy?: string;
  label: FieldLabel;
  hint?: FieldHint;
  errorMessage?: FieldErrorMessage;
  formGroup?: FileUploadFormGroup;
  javascript?: boolean;
  chooseFilesButtonText?: string;
  dropInstructionText?: string;
  multipleFilesChosenText?: Record<string, string>;
  noFileChosenText?: string;
  enteredDropZoneText?: string;
  leftDropZoneText?: string;
  wrapperClasses?: string;
  wrapperAttributes?: Record<string, string | number | boolean>;
};

function describedIds(...ids: (string | null)[]): string | null {
  const joined = ids.filter(Boolean).join(" ");
  return joined === "" ? null : joined;
}

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

export default function FileUpload({
  id: idProp,
  name,
  disabled,
  multiple,
  describedBy,
  label,
  hint,
  errorMessage,
  formGroup,
  javascript,
  chooseFilesButtonText,
  dropInstructionText,
  multipleFilesChosenText,
  noFileChosenText,
  enteredDropZoneText,
  leftDropZoneText,
  wrapperClasses,
  wrapperAttributes,
  classes,
  attributes,
}: FileUploadProps) {
  const autoId = useId();
  const id = idProp ?? (name || autoId);

  const describedByIds = describedIds(
    describedBy ?? null,
    hint ? `${id}-hint` : null,
    errorMessage ? `${id}-error` : null,
  );

  const inputClasses = govukClasses(
    "govuk-file-upload",
    [classes ?? null, errorMessage ? "govuk-file-upload--error" : null]
      .filter(Boolean)
      .join(" "),
  );

  const inputElement = (
    <input
      className={inputClasses}
      id={id}
      name={name}
      type="file"
      disabled={disabled}
      multiple={multiple}
      aria-describedby={describedByIds ?? undefined}
      {...attributes}
    />
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
      {javascript ? (
        <div
          className={govukClasses("govuk-file-upload-wrapper", wrapperClasses)}
          data-module="govuk-file-upload"
          {...i18nMessageAttributes("choose-files-button", chooseFilesButtonText)}
          {...i18nMessageAttributes("no-file-chosen", noFileChosenText)}
          {...i18nMessagesAttributes(
            "multiple-files-chosen",
            multipleFilesChosenText,
          )}
          {...i18nMessageAttributes("drop-instruction", dropInstructionText)}
          {...i18nMessageAttributes("entered-drop-zone", enteredDropZoneText)}
          {...i18nMessageAttributes("left-drop-zone", leftDropZoneText)}
          {...wrapperAttributes}
        >
          {inputElement}
        </div>
      ) : (
        inputElement
      )}
      {formGroup?.afterInput ? (
        formGroup.afterInput.html ?? formGroup.afterInput.text
      ) : null}
    </div>
  );
}
