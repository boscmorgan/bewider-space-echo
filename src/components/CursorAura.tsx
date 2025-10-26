import { useEffect, useRef, useState } from "react";

const REST_SCALE = 0.6;
const ACTIVE_SCALE = 1.05;
const POINTER_ACTIVE_SCALE = 0.72;
const POINTER_REST_SCALE = 0.52;

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
      }, 110);
    };

    const TEXT_INPUT_SELECTOR =
      "textarea, [contenteditable='true'], [contenteditable='plaintext-only'], input[type='text'], input[type='search'], input[type='email'], input[type='password'], input[type='url'], input[type='tel'], input:not([type])";
    const INTERACTIVE_SELECTOR =
      "button, a[href], [role='button'], [role='link'], [role='menuitem'], [role='option'], [role='tab'], [role='switch'], label, summary";

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") {
        return;
      }

      const target = event.target as Element | null;
      let nextShape: "circle" | "beam" | "pointer" = "circle";

      if (target?.closest(TEXT_INPUT_SELECTOR)) {
        nextShape = "beam";
      } else if (target?.closest(INTERACTIVE_SELECTOR)) {
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
        className="absolute h-12 w-12 rounded-full border border-white/70 bg-transparent opacity-80 transition-[transform,width,height,border-radius,background-color,opacity,box-shadow,border] duration-150 ease-out will-change-transform data-[shape=beam]:h-12 data-[shape=beam]:w-[3px] data-[shape=beam]:rounded-full data-[shape=beam]:border-transparent data-[shape=beam]:bg-white/90 data-[shape=beam]:opacity-100 data-[shape=beam]:shadow-[0_0_12px_rgba(255,255,255,0.28)] data-[shape=pointer]:h-9 data-[shape=pointer]:w-9 data-[shape=pointer]:rounded-full data-[shape=pointer]:border-white/60 data-[shape=pointer]:bg-white/10 data-[shape=pointer]:opacity-90 data-[shape=pointer]:shadow-[0_0_12px_rgba(255,255,255,0.22)]"
        style={{ left: "-120px", top: "-120px", transform: "translate(-50%, -50%) scale(0.6)" }}
      />
    </div>
  );
};

export default CursorAura;
