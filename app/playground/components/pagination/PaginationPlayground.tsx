"use client";

import { useState } from "react";
import type { PaginationItem } from "@/app/components/govuk/Pagination";
import Pagination from "@/app/components/govuk/Pagination";
import {
  ControlCheckbox,
  ControlPanel,
  ControlText,
} from "@/app/playground/_components/Controls";

const TOTAL_PAGES = 40;

function buildItems(current: number): PaginationItem[] {
  const pages = new Set([1, 2, current - 1, current, current + 1, TOTAL_PAGES]);
  const sorted = [...pages]
    .filter((page) => page >= 1 && page <= TOTAL_PAGES)
    .sort((a, b) => a - b);

  const items: PaginationItem[] = [];
  let last: number | null = null;
  for (const page of sorted) {
    if (last !== null && page - last > 1) {
      items.push({ ellipsis: true });
    }
    items.push({ number: page, href: `/page/${page}`, current: page === current });
    last = page;
  }
  return items;
}

export default function PaginationPlayground() {
  const [landmarkLabel, setLandmarkLabel] = useState("Pagination");
  const [currentPageValue, setCurrentPageValue] = useState("10");
  const [showPrevious, setShowPrevious] = useState(true);
  const [showNext, setShowNext] = useState(true);
  const [blockLevelOnly, setBlockLevelOnly] = useState(false);
  const [previousLabelText, setPreviousLabelText] = useState("");

  const current = Number(currentPageValue) || 1;

  return (
    <ControlPanel
      fields={
        <>
          <ControlText
            label="Landmark label"
            value={landmarkLabel}
            onChange={setLandmarkLabel}
          />
          <ControlText
            label="Current page"
            value={currentPageValue}
            onChange={setCurrentPageValue}
          />
          <ControlCheckbox
            label="Show previous link"
            checked={showPrevious}
            onChange={setShowPrevious}
          />
          <ControlCheckbox
            label="Show next link"
            checked={showNext}
            onChange={setShowNext}
          />
          <ControlCheckbox
            label="Previous and next only (block level)"
            checked={blockLevelOnly}
            onChange={setBlockLevelOnly}
          />
          <ControlText
            label="Previous link label"
            value={previousLabelText}
            onChange={setPreviousLabelText}
          />
        </>
      }
      preview={
        <Pagination
          landmarkLabel={landmarkLabel}
          previous={
            showPrevious && current > 1
              ? {
                  href: `/page/${current - 1}`,
                  labelText: previousLabelText || undefined,
                }
              : undefined
          }
          next={
            showNext && current < TOTAL_PAGES
              ? { href: `/page/${current + 1}` }
              : undefined
          }
          items={blockLevelOnly ? undefined : buildItems(current)}
        />
      }
    />
  );
}
