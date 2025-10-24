import { useEffect, useRef, useState } from "react";

const REST_SCALE = 0.6;
const ACTIVE_SCALE = 1.1;

const CursorAura = () => {
  const [isVisible, setIsVisible] = useState(false);
  const circleRef = useRef<HTMLDivElement | null>(null);
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
        latestState.current.scale = REST_SCALE;
        scheduleFrame();
      }, 180);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") {
        return;
      }

      latestState.current.x = event.clientX;
      latestState.current.y = event.clientY;
      latestState.current.scale = ACTIVE_SCALE;
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
    <div className={`pointer-events-none fixed inset-0 z-[5]${isVisible ? "" : " hidden"}`} aria-hidden="true">
      <div
        ref={circleRef}
        className="absolute h-12 w-12 rounded-full border border-white/70 opacity-80 transition-transform duration-500 ease-out"
        style={{ left: "-120px", top: "-120px", transform: "translate(-50%, -50%) scale(0.6)" }}
      />
    </div>
  );
};

export default CursorAura;
