"use client";

import { useEffect, useRef, type DependencyList, type ReactNode } from "react";

type GovukPreviewProps = {
  // The inputs the preview is built from, in the same shape you would pass to
  // useEffect. The preview is rebuilt from scratch whenever they change.
  deps: DependencyList;
  children: ReactNode;
};

// GOV.UK's scripts restructure the DOM they enhance - the accordion swaps its
// heading spans for buttons and inserts an "Open all sections" control - so
// letting React reconcile over enhanced markup throws NotFoundError. Rebuild
// the preview from scratch whenever its inputs change instead, then re-run
// the govuk enhancements on the fresh markup, scoped to this preview so the
// rest of the page is not enhanced twice.
export default function GovukPreview({ deps, children }: GovukPreviewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInitialRun = useRef(true);

  useEffect(() => {
    // GovukInit enhances the whole page, this preview included, on the
    // first run - only the rebuilt markup needs enhancing again.
    if (isInitialRun.current) {
      isInitialRun.current = false;
      return;
    }

    const container = containerRef.current;
    if (container === null) {
      return;
    }

    import("govuk-frontend").then(({ initAll }) => {
      initAll({ scope: container });
    });
    // The caller rebuilds `deps` on every control change, so this runs after
    // each rebuild rather than on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  // Keying the container off the inputs makes React discard the enhanced DOM
  // wholesale rather than reconcile over it.
  return (
    <div key={JSON.stringify(deps)} ref={containerRef}>
      {children}
    </div>
  );
}
