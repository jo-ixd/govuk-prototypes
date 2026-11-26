import { beforeEach, describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import GovukPreview from "@/app/playground/_components/GovukPreview";

const initAllMock = vi.hoisted(() => vi.fn());

vi.mock("govuk-frontend", () => ({
  initAll: initAllMock,
}));

// Flushes the dynamic import inside the effect.
const flushEffects = () => new Promise((resolve) => setTimeout(resolve, 0));

beforeEach(() => {
  initAllMock.mockClear();
});

describe("GovukPreview", () => {
  it("leaves the first build to GovukInit, which enhances the whole page", async () => {
    render(
      <GovukPreview deps={["h2"]}>
        <p>First build</p>
      </GovukPreview>,
    );

    await flushEffects();

    expect(initAllMock).not.toHaveBeenCalled();
  });

  it("rebuilds the markup and enhances it again when the inputs change", async () => {
    const { container, rerender } = render(
      <GovukPreview deps={["h2"]}>
        <p>First build</p>
      </GovukPreview>,
    );
    await flushEffects();

    const firstParagraph = container.querySelector("p");

    rerender(
      <GovukPreview deps={["h3"]}>
        <p>Second build</p>
      </GovukPreview>,
    );
    await vi.waitFor(() => expect(initAllMock).toHaveBeenCalledTimes(1));

    // The preview is a brand new subtree, not a reconciliation of the old
    // enhanced one - that is what stops React throwing NotFoundError.
    expect(container.querySelector("p")).not.toBe(firstParagraph);
    expect(container.textContent).toContain("Second build");

    // The enhancement only runs against the rebuilt markup.
    expect(initAllMock).toHaveBeenCalledWith({ scope: container.firstChild });
  });

  it("keeps the current markup when the inputs have the same values", async () => {
    const { container, rerender } = render(
      <GovukPreview deps={["h2"]}>
        <p>Same build</p>
      </GovukPreview>,
    );
    await flushEffects();

    const paragraph = container.querySelector("p");

    // A fresh array with the same values must not rebuild the preview.
    rerender(
      <GovukPreview deps={["h2"]}>
        <p>Same build</p>
      </GovukPreview>,
    );
    await flushEffects();

    expect(initAllMock).not.toHaveBeenCalled();
    expect(container.querySelector("p")).toBe(paragraph);
  });
});
