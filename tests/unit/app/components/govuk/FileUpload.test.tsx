import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import FileUpload from "@/app/components/govuk/FileUpload";

describe("FileUpload", () => {
  it("renders a labelled file input inside a form group", () => {
    render(
      <FileUpload name="photo" label={{ text: "Upload a recent photo" }} />,
    );
    const input = screen.getByLabelText("Upload a recent photo");
    expect(input.tagName).toBe("INPUT");
    expect(input).toHaveAttribute("type", "file");
    expect(input).toHaveClass("govuk-file-upload");
    expect(input.parentElement).toHaveClass("govuk-form-group");
  });

  it("allows multiple files when asked", () => {
    render(
      <FileUpload name="photos" multiple label={{ text: "Upload photos" }} />,
    );
    expect(screen.getByLabelText("Upload photos")).toHaveAttribute("multiple");
  });

  it("wires hint and error into aria-describedby and applies the error classes", () => {
    render(
      <FileUpload
        name="photo"
        label={{ text: "Upload a photo" }}
        hint={{ text: "JPG or PNG, up to 5MB." }}
        errorMessage={{ text: "Select a photo" }}
      />,
    );
    const input = screen.getByLabelText("Upload a photo");
    expect(input).toHaveAttribute("aria-describedby", "photo-hint photo-error");
    expect(input).toHaveClass("govuk-file-upload--error");
    expect(input.parentElement).toHaveClass("govuk-form-group--error");
  });

  it("wraps the input in the dropzone module wrapper when javascript is on", () => {
    render(
      <FileUpload
        name="photo"
        label={{ text: "Upload a photo" }}
        javascript
        chooseFilesButtonText="Choose files"
        noFileChosenText="No file chosen"
      />,
    );
    const wrapper = document.querySelector(".govuk-file-upload-wrapper");
    expect(wrapper).not.toBeNull();
    expect(wrapper).toHaveAttribute("data-module", "govuk-file-upload");
    expect(wrapper).toHaveAttribute(
      "data-i18n.choose-files-button",
      "Choose files",
    );
    expect(wrapper).toHaveAttribute("data-i18n.no-file-chosen", "No file chosen");
  });

  it("leaves the input unwrapped when javascript is off", () => {
    render(<FileUpload name="photo" label={{ text: "Upload a photo" }} />);
    expect(document.querySelector(".govuk-file-upload-wrapper")).toBeNull();
  });
});
