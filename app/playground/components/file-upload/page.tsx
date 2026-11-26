import type { Metadata } from "next";
import BackLink from "@/app/components/govuk/BackLink";
import FileUpload from "@/app/components/govuk/FileUpload";
import Example from "@/app/playground/_components/Example";
import FileUploadPlayground from "@/app/playground/components/file-upload/FileUploadPlayground";

export const metadata: Metadata = {
  title: "File upload - GOV.UK Playground",
};

export default function FileUploadPage() {
  return (
    <>
      <BackLink text="Back to playground" href="/playground" />
      <h1 className="govuk-heading-xl">File upload</h1>
      <p className="govuk-body-l">
        File uploads let users select one or more files to submit.
      </p>

      <Example title="Default" description="A basic file input with a label.">
        <FileUpload label={{ text: "Upload a file" }} name="file-upload-1" />
      </Example>

      <Example
        title="With hint text"
        description="A hint below the label, linked with aria-describedby."
      >
        <FileUpload
          id="file-upload-2"
          name="file-upload-2"
          label={{ text: "Upload your photo" }}
          hint={{
            text: "Your photo may be in your Pictures, Photos, Downloads or Desktop folder. Or in an app like iPhoto.",
          }}
        />
      </Example>

      <Example
        title="With error message and hint"
        description="Hint and error combined; the input gets the error style."
      >
        <FileUpload
          id="file-upload-3"
          name="file-upload-3"
          label={{ text: "Upload a file" }}
          hint={{
            text: "Your photo may be in your Pictures, Photos, Downloads or Desktop folder. Or in an app like iPhoto.",
          }}
          errorMessage={{ text: "Error message goes here" }}
        />
      </Example>

      <Example
        title="With label as page heading"
        description="The label doubles as the page heading."
      >
        <FileUpload
          id="file-upload-heading"
          name="file-upload-heading"
          label={{
            text: "Upload a file",
            classes: "govuk-label--l",
            isPageHeading: true,
          }}
        />
      </Example>

      <Example
        title="Enhanced with JavaScript"
        description="With javascript enabled the input is wrapped in a drop zone container that govuk-frontend enhances into a styled choose-file button."
      >
        <FileUpload
          id="file-upload-enhanced"
          name="file-upload-enhanced"
          label={{ text: "Upload a file" }}
          javascript
        />
      </Example>

      <Example
        title="Enhanced with multiple files"
        description="Allowing several files to be picked at once."
      >
        <FileUpload
          id="file-upload-multiple"
          name="file-upload-multiple"
          label={{ text: "Upload files" }}
          javascript
          multiple
        />
      </Example>

      <FileUploadPlayground />
    </>
  );
}
