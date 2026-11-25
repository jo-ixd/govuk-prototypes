"use client";

import type { ReactNode } from "react";

type ControlTextProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export function ControlText({ label, value, onChange }: ControlTextProps) {
  return (
    <div className="govuk-form-group playground-controls__field">
      <label className="govuk-label govuk-label--s" htmlFor={`control-${label}`}>
        {label}
      </label>
      <input
        className="govuk-input govuk-input--width-10"
        id={`control-${label}`}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

type ControlSelectProps = {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
};

export function ControlSelect({
  label,
  value,
  options,
  onChange,
}: ControlSelectProps) {
  return (
    <div className="govuk-form-group playground-controls__field">
      <label className="govuk-label govuk-label--s" htmlFor={`control-${label}`}>
        {label}
      </label>
      <select
        className="govuk-select"
        id={`control-${label}`}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

type ControlCheckboxProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export function ControlCheckbox({
  label,
  checked,
  onChange,
}: ControlCheckboxProps) {
  return (
    <div className="govuk-form-group playground-controls__field">
      <div className="govuk-checkboxes__item">
        <input
          className="govuk-checkboxes__input"
          id={`control-${label}`}
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
        />
        <label className="govuk-label govuk-checkboxes__label" htmlFor={`control-${label}`}>
          {label}
        </label>
      </div>
    </div>
  );
}

type ControlPanelProps = {
  title?: string;
  fields: ReactNode;
  preview: ReactNode;
  previewClasses?: string;
};

export function ControlPanel({
  title = "Playground",
  fields,
  preview,
  previewClasses,
}: ControlPanelProps) {
  return (
    <section className="playground-controls">
      <h3 className="govuk-heading-s">{title}</h3>
      <div className="playground-controls__grid">
        <div className="playground-controls__fields">{fields}</div>
        <div className={previewClasses ? `playground-preview ${previewClasses}` : "playground-preview"}>
          {preview}
        </div>
      </div>
    </section>
  );
}
