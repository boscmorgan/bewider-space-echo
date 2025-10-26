import { useEffect, useRef, useState } from "react";

const REST_SCALE = 0.55;
const ACTIVE_SCALE = 0.95;
const POINTER_ACTIVE_SCALE = 0.7;
const POINTER_REST_SCALE = 0.5;

const TEXT_INPUT_SELECTOR =
  "textarea, input[type='text'], input[type='search'], input[type='email'], input[type='password'], input[type='url'], input[type='tel'], input[type='number'], [contenteditable=''], [contenteditable='true'], [contenteditable='plaintext-only']";
const INTERACTIVE_SELECTOR =
  "button, [role='button'], [role='menuitem'], [role='option'], [role='tab'], [role='switch'], [role='link'], a, input[type='button'], input[type='submit'], input[type='reset'], label";

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
      circleRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`;
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
      }, 90);
    };

    const shouldBeam = (target: Element | null): boolean => {
      if (!target) {
        return false;
      }

      if (target.closest(TEXT_INPUT_SELECTOR)) {
        return true;
      }

      const editableAncestor = target.closest("[contenteditable]");
      if (editableAncestor && !(editableAncestor as HTMLElement).isContentEditable) {
        return false;
      }

      return Boolean(editableAncestor);
    };

    const shouldPointer = (target: Element | null): boolean => {
      if (!target) {
        return false;
      }

      if (target.closest(INTERACTIVE_SELECTOR)) {
        return true;
      }

      const roleButton = target.getAttribute("role");
      return roleButton === "button" || roleButton === "link";
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") {
        return;
      }

      let nextShape: "circle" | "beam" | "pointer" = "circle";

      const target = event.target as Element | null;

      if (shouldBeam(target)) {
        nextShape = "beam";
      } else if (shouldPointer(target)) {
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
        className="absolute h-12 w-12 rounded-full border border-white/70 bg-transparent opacity-80 transition-[transform,width,height,border-radius,background-color,opacity,border] duration-150 ease-out data-[shape=beam]:h-12 data-[shape=beam]:w-[3px] data-[shape=beam]:rounded-full data-[shape=beam]:border-transparent data-[shape=beam]:bg-white/80 data-[shape=beam]:opacity-100 data-[shape=pointer]:h-9 data-[shape=pointer]:w-9 data-[shape=pointer]:rounded-full data-[shape=pointer]:border-white/50 data-[shape=pointer]:bg-white/10 data-[shape=pointer]:opacity-90"
        style={{ left: "-120px", top: "-120px", transform: "translate(-50%, -50%) scale(0.6)" }}
      />
    </div>
  );
};

export default CursorAura;
