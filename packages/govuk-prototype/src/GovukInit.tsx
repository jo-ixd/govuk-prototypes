"use client";

import { useEffect } from "react";

export default function GovukInit() {
  useEffect(() => {
    import("govuk-frontend").then(({ initAll }) => initAll());
  }, []);

  return null;
}
