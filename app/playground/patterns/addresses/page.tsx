import type { Metadata } from "next";
import BackLink from "@/app/components/govuk/BackLink";
import Button from "@/app/components/govuk/Button";
import Details from "@/app/components/govuk/Details";
import Fieldset from "@/app/components/govuk/Fieldset";
import Input from "@/app/components/govuk/Input";
import Select, { type SelectItem } from "@/app/components/govuk/Select";
import Textarea from "@/app/components/govuk/Textarea";
import Example from "@/app/playground/_components/Example";

export const metadata: Metadata = {
  title: "Addresses - GOV.UK Patterns",
};

function AddressFields({
  idPrefix,
  namePrefix,
}: {
  idPrefix: string;
  namePrefix: string;
}) {
  return (
    <>
      <Input
        id={`${idPrefix}-address-line-1`}
        name={`${namePrefix}Line1`}
        label={{ text: "Address line 1" }}
        autocomplete="address-line1"
      />
      <Input
        id={`${idPrefix}-address-line-2`}
        name={`${namePrefix}Line2`}
        label={{ text: "Address line 2 (optional)" }}
        autocomplete="address-line2"
      />
      <Input
        id={`${idPrefix}-town`}
        name={`${namePrefix}Town`}
        label={{ text: "Town or city" }}
        classes="govuk-!-width-two-thirds"
        autocomplete="address-level2"
      />
      <Input
        id={`${idPrefix}-county`}
        name={`${namePrefix}County`}
        label={{ text: "County (optional)" }}
        classes="govuk-!-width-two-thirds"
      />
      <Input
        id={`${idPrefix}-postcode`}
        name={`${namePrefix}Postcode`}
        label={{ text: "Postcode" }}
        classes="govuk-input--width-10"
        autocomplete="postal-code"
      />
    </>
  );
}

const foundAddresses: SelectItem[] = [
  { value: "", text: "Select an address" },
  { value: "1", text: "2 Monarch Court, Whitehall, London, SW1A 2AA" },
  { value: "2", text: "3 Monarch Court, Whitehall, London, SW1A 2AA" },
  { value: "3", text: "4 Monarch Court, Whitehall, London, SW1A 2AA" },
  { value: "4", text: "5 Monarch Court, Whitehall, London, SW1A 2AA" },
  { value: "5", text: "6 Monarch Court, Whitehall, London, SW1A 2AA" },
];

const countries: SelectItem[] = [
  { value: "", text: "Select a country" },
  { value: "fr", text: "France" },
  { value: "de", text: "Germany" },
  { value: "gr", text: "Greece" },
  { value: "ie", text: "Ireland" },
  { value: "it", text: "Italy" },
  { value: "nl", text: "Netherlands" },
  { value: "pt", text: "Portugal" },
  { value: "es", text: "Spain" },
  { value: "gb", text: "United Kingdom" },
  { value: "us", text: "United States" },
];

export default function AddressesPatternPage() {
  return (
    <>
      <BackLink text="Back to patterns" href="/playground/patterns" />
      <h1 className="govuk-heading-xl">Addresses</h1>
      <p className="govuk-body-l">
        Help users provide an address, for example when you need to send them
        something or arrange a visit.
      </p>

      <Example
        title="Address lookup"
        description="Use an address lookup to collect UK addresses where possible. It should be clear that the lookup only works for UK addresses, with a manual option for international addresses or addresses that are missing from the lookup."
      >
        <Input
          id="lookup-postcode"
          name="lookupPostcode"
          label={{ text: "Postcode" }}
          classes="govuk-input--width-10"
          autocomplete="postal-code"
        />
        <Button text="Find address" />
        <Details
          summaryText="Enter address manually"
          html={
            <Fieldset legend={{ text: "What is your address?" }}>
              <AddressFields idPrefix="manual" namePrefix="manualAddress" />
            </Fieldset>
          }
        />
        <Button text="Continue" />
      </Example>

      <Example
        title="Address lookup: select a found address"
        description="A static sequence showing what happens after the user enters a postcode and selects ‘Find address’. Matching addresses appear in a select, and users can also enter a street name or number to narrow the list down."
      >
        <Input
          id="lookup-postcode-found"
          name="lookupPostcodeFound"
          label={{ text: "Postcode" }}
          classes="govuk-input--width-10"
          defaultValue="SW1A 2AA"
          autocomplete="postal-code"
        />
        <Button text="Find address" />
        <p className="govuk-body-s">
          After selecting ‘Find address’, the user picks their address from the
          list of results:
        </p>
        <Select
          id="lookup-select-address"
          name="lookupAddress"
          label={{ text: "Select an address" }}
          items={foundAddresses}
        />
        <Button text="Continue" />
      </Example>

      <Example
        title="Multiple text inputs"
        description="A manual UK address form made of individual text inputs, using the autocomplete attribute on each field. Only make individual inputs mandatory if you really need the information – county is optional because it is not used to deliver post."
      >
        <Fieldset
          legend={{
            text: "What is your address?",
            classes: "govuk-fieldset__legend--l",
          }}
        >
          <AddressFields idPrefix="address" namePrefix="address" />
        </Fieldset>
        <Button text="Continue" />
      </Example>

      <Example
        title="Error messages"
        description="Each mandatory input gets its own specific error message when validation fails."
      >
        <Fieldset
          legend={{
            text: "What is your address?",
            classes: "govuk-fieldset__legend--l",
          }}
        >
          <Input
            id="error-address-line-1"
            name="errorAddressLine1"
            label={{ text: "Address line 1" }}
            errorMessage={{
              text: "Enter address line 1, typically the building and street",
            }}
            autocomplete="address-line1"
          />
          <Input
            id="error-address-line-2"
            name="errorAddressLine2"
            label={{ text: "Address line 2 (optional)" }}
            autocomplete="address-line2"
          />
          <Input
            id="error-town"
            name="errorTown"
            label={{ text: "Town or city" }}
            classes="govuk-!-width-two-thirds"
            errorMessage={{ text: "Enter town or city" }}
            autocomplete="address-level2"
          />
          <Input
            id="error-county"
            name="errorCounty"
            label={{ text: "County (optional)" }}
            classes="govuk-!-width-two-thirds"
          />
          <Input
            id="error-postcode"
            name="errorPostcode"
            label={{ text: "Postcode" }}
            classes="govuk-input--width-10"
            errorMessage={{ text: "Enter postcode" }}
            autocomplete="postal-code"
          />
        </Fieldset>
      </Example>

      <Example
        title="Postcode in the wrong format"
        description="Accept postcodes in upper or lower case, with or without spaces, and ignore punctuation like hyphens and full stops. Only show an error if the postcode entered is not a real one."
      >
        <Input
          id="postcode-invalid"
          name="postcodeInvalid"
          label={{ text: "Postcode" }}
          classes="govuk-input--width-10"
          defaultValue="Not a postcode"
          errorMessage={{ text: "Enter a full UK postcode" }}
          autocomplete="postal-code"
        />
      </Example>

      <Example
        title="International address"
        description="If you expect both UK and international addresses, let users select their country and enter the address manually in a textarea. A textarea accepts any address format and makes it easy to paste an address from the clipboard."
      >
        <Select
          id="address-country"
          name="addressCountry"
          label={{ text: "Country" }}
          items={countries}
        />
        <Textarea
          id="international-address"
          name="internationalAddress"
          label={{ text: "What is your address?" }}
          rows={5}
          autocomplete="street-address"
        />
        <Button text="Continue" />
      </Example>
    </>
  );
}
