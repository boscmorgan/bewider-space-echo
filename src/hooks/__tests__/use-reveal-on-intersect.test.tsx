import { render, act } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useRevealOnIntersect } from "../use-reveal-on-intersect";

function TestComponent() {
  const containerRef = useRevealOnIntersect<HTMLDivElement>();

  return (
    <div data-testid="target" ref={containerRef} className="opacity-0">
      Content
    </div>
  );
}

describe("useRevealOnIntersect", () => {
  it("removes the initial opacity class after mount", async () => {
    const originalRequestAnimationFrame = window.requestAnimationFrame;
    // Force the fallback branch that removes the class immediately.
    window.requestAnimationFrame = undefined as unknown as typeof window.requestAnimationFrame;

    try {
      const { getByTestId } = render(<TestComponent />);

      await act(async () => {
        await Promise.resolve();
      });

      expect(getByTestId("target")).not.toHaveClass("opacity-0");
    } finally {
      window.requestAnimationFrame = originalRequestAnimationFrame;
    }
  });

  it("removes the opacity class after the scheduled frame and cancels on unmount", () => {
    const originalRequestAnimationFrame = window.requestAnimationFrame;
    const originalCancelAnimationFrame = window.cancelAnimationFrame;

    let frameCallback: FrameRequestCallback | undefined;
    const frameId = 42;
    const requestAnimationFrameMock = vi
      .fn<(callback: FrameRequestCallback) => number>()
      .mockImplementation((callback) => {
        frameCallback = callback;
        return frameId;
      });
    const cancelAnimationFrameMock = vi.fn<(handle: number) => void>();

    window.requestAnimationFrame =
      requestAnimationFrameMock as unknown as typeof window.requestAnimationFrame;
    window.cancelAnimationFrame =
      cancelAnimationFrameMock as unknown as typeof window.cancelAnimationFrame;

    try {
      const { getByTestId, unmount } = render(<TestComponent />);
      const target = getByTestId("target");

      expect(target).toHaveClass("opacity-0");
      expect(requestAnimationFrameMock).toHaveBeenCalledTimes(1);
      expect(frameCallback).toBeDefined();

      act(() => {
        frameCallback?.(0);
      });

      expect(target).not.toHaveClass("opacity-0");

      unmount();

      expect(cancelAnimationFrameMock).toHaveBeenCalledWith(frameId);
    } finally {
      window.requestAnimationFrame = originalRequestAnimationFrame;
      window.cancelAnimationFrame = originalCancelAnimationFrame;
    }
  });
});
