import { render, act } from "@testing-library/react";
import { describe, expect, it } from "vitest";
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
    const { getByTestId } = render(<TestComponent />);

    await act(async () => {});

    expect(getByTestId("target")).not.toHaveClass("opacity-0");
  });
});
