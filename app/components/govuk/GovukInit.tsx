"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function GovukInit() {
  const pathname = usePathname();

  useEffect(() => {
    // App Router layouts persist across client-side navigation, so a single
    // initAll() on mount leaves components on later pages unenhanced. Re-run
    // for every route: page content is always fresh DOM (safe to initialise),
    // and the only persistent data-module element - the service navigation
    // toggle - stays functional because every bound instance toggles the
    // shared DOM in lockstep from the same starting state.
    import("govuk-frontend").then(({ initAll }) => initAll());
  }, [pathname]);

  return null;
}
