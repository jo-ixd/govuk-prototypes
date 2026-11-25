import { beforeEach, describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import GovukInit from "@/app/components/govuk/GovukInit";

const initAllMock = vi.hoisted(() => vi.fn());
const state = vi.hoisted(() => ({ path: "/" }));

vi.mock("govuk-frontend", () => ({
  initAll: initAllMock,
}));

vi.mock("next/navigation", () => ({
  usePathname: () => state.path,
}));

beforeEach(() => {
  initAllMock.mockClear();
  state.path = "/";
});

describe("GovukInit", () => {
  it("renders nothing", () => {
    const { container } = render(<GovukInit />);
    expect(container.innerHTML).toBe("");
  });

  it("runs the govuk enhancements once on mount", async () => {
    render(<GovukInit />);
    await vi.waitFor(() => expect(initAllMock).toHaveBeenCalledTimes(1));
  });

  it("re-runs the enhancements on every route change", async () => {
    const { rerender } = render(<GovukInit />);
    await vi.waitFor(() => expect(initAllMock).toHaveBeenCalledTimes(1));

    state.path = "/playground/components/accordion";
    rerender(<GovukInit />);
    await vi.waitFor(() => expect(initAllMock).toHaveBeenCalledTimes(2));
  });
});
