import type { Metadata } from "next";
import { Suspense } from "react";
import BackLink from "@/app/components/govuk/BackLink";
import NameForm from "@/app/playground/example-service/name/NameForm";

export const metadata: Metadata = {
  title: "What is your name? - Renew a parking permit",
};

export default function NamePage() {
  return (
    <>
      <BackLink text="Back" href="/playground/example-service" />
      <Suspense fallback={null}>
        <NameForm />
      </Suspense>
    </>
  );
}
