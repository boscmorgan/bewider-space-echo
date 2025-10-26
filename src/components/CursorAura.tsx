import { useEffect, useRef, useState } from "react";

const REST_SCALE = 0.55;
const ACTIVE_SCALE = 0.95;
const POINTER_ACTIVE_SCALE = 0.7;
const POINTER_REST_SCALE = 0.5;
const IDLE_TIMEOUT_MS = 110;

const pointerCursorValues = new Set([
  "pointer",
  "grab",
  "grabbing",
  "move",
  "crosshair",
  "col-resize",
  "row-resize",
  "n-resize",
  "s-resize",
  "e-resize",
  "w-resize",
  "ne-resize",
  "nw-resize",
  "se-resize",
  "sw-resize",
  "ns-resize",
  "ew-resize",
  "nesw-resize",
  "nwse-resize",
]);

const textInputTypes = new Set([
  "text",
  "search",
  "email",
  "password",
  "url",
  "tel",
  "number",
]);

const textualTags = new Set([
  "p",
  "span",
  "strong",
  "em",
  "li",
  "article",
  "section",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "blockquote",
  "time",
  "small",
]);

const CursorAura = () => {
  const [isVisible, setIsVisible] = useState(false);
  const circleRef = useRef<HTMLDivElement | null>(null);
  const [shape, setShape] = useState<"circle" | "beam" | "pointer">("circle");
  const shapeRef = useRef<"circle" | "beam" | "pointer">("circle");
  const frameRef = useRef<number>();
  const idleTimeoutRef = useRef<number>();
  const latestState = useRef({ x: -120, y: -120, scale: REST_SCALE });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    if (prefersReducedMotion.matches || !hasFinePointer.matches) {
      return () => undefined;
    }

    setIsVisible(true);

    const applyState = () => {
      frameRef.current = undefined;

      if (!circleRef.current) {
        return;
      }

      const { x, y, scale } = latestState.current;
      circleRef.current.style.left = `${x}px`;
      circleRef.current.style.top = `${y}px`;
      circleRef.current.style.transform = `translate3d(-50%, -50%, 0) scale(${scale})`;
    };

    const scheduleFrame = () => {
      if (frameRef.current !== undefined) {
        return;
      }

      frameRef.current = requestAnimationFrame(applyState);
    };

    const scheduleRest = () => {
      if (idleTimeoutRef.current !== undefined) {
        window.clearTimeout(idleTimeoutRef.current);
      }

      idleTimeoutRef.current = window.setTimeout(() => {
        latestState.current.scale =
          shapeRef.current === "beam" ? 1 : shapeRef.current === "pointer" ? POINTER_REST_SCALE : REST_SCALE;
        scheduleFrame();
      }, IDLE_TIMEOUT_MS);
    };

    const hasPointerIntent = (element: Element | null): boolean => {
      let current: Element | null = element;

      while (current) {
        const cursor = window.getComputedStyle(current).cursor;

        if (cursor === "text") {
          return false;
        }

        if (pointerCursorValues.has(cursor)) {
          return true;
        }

        current = current.parentElement;
      }

      return false;
    };

    const shouldBeam = (event: PointerEvent): boolean => {
      const target = event.target as Element | null;

      if (!target) {
        return false;
      }

      const editableAncestor = target.closest(
        "textarea, [contenteditable=''], [contenteditable='true'], [contenteditable='plaintext-only']",
      );
      if (editableAncestor) {
        return true;
      }

      const inputAncestor = target.closest("input");
      if (inputAncestor) {
        if (inputAncestor instanceof HTMLInputElement) {
          if (textInputTypes.has((inputAncestor.type || "text").toLowerCase())) {
            return true;
          }
          return false;
        }
      }

      if (target.closest("a, button, [role='button'], [role='link']")) {
        return false;
      }

      if (hasPointerIntent(target)) {
        return false;
      }

      if (target instanceof HTMLElement) {
        const computedCursor = window.getComputedStyle(target).cursor;
        if (computedCursor === "text" || computedCursor === "caret" || computedCursor === "vertical-text") {
          return true;
        }

        if (textualTags.has(target.tagName.toLowerCase())) {
          return true;
        }
      }

      const parentTextual = target.closest("p, span, article, section, li, blockquote, h1, h2, h3, h4, h5, h6");
      return Boolean(parentTextual);
    };

    const shouldPointer = (event: PointerEvent): boolean => {
      const target = event.target as Element | null;

      if (!target) {
        return false;
      }

      if (target.closest("button, [role='button'], [role='menuitem'], [role='option'], [role='tab'], [role='switch'], label")) {
        return true;
      }

      if (target.closest("a, [role='link']")) {
        return true;
      }

      if (hasPointerIntent(target)) {
        return true;
      }

      return false;
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") {
        return;
      }

      let nextShape: "circle" | "beam" | "pointer" = "circle";

      if (shouldBeam(event)) {
        nextShape = "beam";
      } else if (shouldPointer(event)) {
        nextShape = "pointer";
      }

      if (shapeRef.current !== nextShape) {
        shapeRef.current = nextShape;
        setShape(nextShape);
      }

      latestState.current.x = event.clientX;
      latestState.current.y = event.clientY;
      latestState.current.scale =
        nextShape === "beam" ? 1 : nextShape === "pointer" ? POINTER_ACTIVE_SCALE : ACTIVE_SCALE;
      scheduleFrame();
      scheduleRest();
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    scheduleFrame();

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);

      if (frameRef.current !== undefined) {
        cancelAnimationFrame(frameRef.current);
      }

      if (idleTimeoutRef.current !== undefined) {
        window.clearTimeout(idleTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className={`pointer-events-none fixed inset-0 z-[9999]${isVisible ? "" : " hidden"}`} aria-hidden="true">
      <div
        ref={circleRef}
        data-shape={shape}
        className="absolute h-12 w-12 rounded-full border border-white/60 bg-transparent opacity-80 transition-[transform,width,height,border-radius,background-color,opacity,box-shadow,border] duration-150 ease-linear will-change-transform data-[shape=beam]:h-12 data-[shape=beam]:w-[2px] data-[shape=beam]:rounded-full data-[shape=beam]:border-transparent data-[shape=beam]:bg-white/80 data-[shape=beam]:opacity-90 data-[shape=beam]:shadow-[0_0_12px_rgba(255,255,255,0.3)] data-[shape=pointer]:h-8 data-[shape=pointer]:w-8 data-[shape=pointer]:rounded-full data-[shape=pointer]:border-white/50 data-[shape=pointer]:bg-white/10 data-[shape=pointer]:opacity-85 data-[shape=pointer]:shadow-[0_0_10px_rgba(255,255,255,0.2)]"
        style={{ left: "-120px", top: "-120px", transform: `translate3d(-50%, -50%, 0) scale(${REST_SCALE})` }}
      />
    </div>
  );
};

export default CursorAura;
