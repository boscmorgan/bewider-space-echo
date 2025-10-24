import { render, act } from "@testing-library/react";
import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
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
  let observeMock: ReturnType<typeof vi.fn>;
  let unobserveMock: ReturnType<typeof vi.fn>;
  let disconnectMock: ReturnType<typeof vi.fn>;
  let observerCallback: IntersectionObserverCallback | undefined;
  let observerInstance: IntersectionObserver | undefined;

  beforeEach(() => {
    observeMock = vi.fn();
    unobserveMock = vi.fn();
    disconnectMock = vi.fn();
    observerCallback = undefined;
    observerInstance = undefined;

    class MockIntersectionObserver implements IntersectionObserver {
      readonly root: Element | Document | null = null;
      readonly rootMargin = "";
      readonly thresholds: ReadonlyArray<number> = [];

      constructor(callback: IntersectionObserverCallback) {
        observerCallback = callback;
        observerInstance = this;
      }

      observe = observeMock;
      unobserve = unobserveMock;
      disconnect = disconnectMock;
      takeRecords = vi.fn<[], IntersectionObserverEntry[]>(() => []);
    }

    vi.stubGlobal(
      "IntersectionObserver",
      MockIntersectionObserver as unknown as typeof IntersectionObserver,
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("reveals the element when it intersects", () => {
    const { getByTestId } = render(<TestComponent />);
    const target = getByTestId("target");

    expect(target).toHaveClass("opacity-0");
    expect(observerCallback).toBeDefined();
    expect(observerInstance).toBeDefined();

    act(() => {
      observerCallback?.(
        [
          {
            isIntersecting: true,
            intersectionRatio: 1,
            boundingClientRect: target.getBoundingClientRect(),
            intersectionRect: target.getBoundingClientRect(),
            rootBounds: null,
            target,
            time: Date.now(),
          } as IntersectionObserverEntry,
        ],
        observerInstance as IntersectionObserver,
      );
    });

    expect(target).not.toHaveClass("opacity-0");
    expect(target).toHaveClass("animate-blur-fade-in");
    expect(unobserveMock).toHaveBeenCalledWith(target);
  });
});
