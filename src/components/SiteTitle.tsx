import { useMemo, useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

const TITLE = "BEWIDER";
const LEFT_GROUP_COUNT = 2;
const randomRotation = () => {
  const magnitude = 12 + Math.random() * 28;
  return (Math.random() > 0.5 ? 1 : -1) * magnitude;
};

const SiteTitle = () => {
  const letters = useMemo(() => TITLE.split(""), []);
  const leftGroup = letters.slice(0, LEFT_GROUP_COUNT);
  const rightGroup = letters.slice(LEFT_GROUP_COUNT);
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const rotationsRef = useRef<number[]>(letters.map(() => 0));

  const setRandomRotations = () => {
    rotationsRef.current = letters.map(() => randomRotation());
  };

  const resetLetters = () => {
    spanRefs.current.forEach((span) => {
      if (!span) {
        return;
      }

      span.style.transform = "translate(0, 0) rotate(0deg)";
    });
    rotationsRef.current = letters.map(() => 0);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    const pointerX = event.clientX;
    const pointerY = event.clientY;

    spanRefs.current.forEach((span, index) => {
      if (!span) {
        return;
      }

      const rect = span.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = pointerX - centerX;
      const dy = pointerY - centerY;

      const distance = Math.hypot(dx, dy);
      const influenceRadius = 320;
      if (distance > influenceRadius) {
        span.style.transform = "translate(0, 0) rotate(0deg)";
        return;
      }

      const strength = 1 - distance / influenceRadius;
      const orbitAngle = Math.atan2(dy, dx) + Math.PI / 2;
      const maxTranslate = 22;
      const translateDistance = strength * maxTranslate;
      const translateX = Math.cos(orbitAngle) * translateDistance;
      const translateY = Math.sin(orbitAngle) * translateDistance;
      const rotation = rotationsRef.current[index] * strength;

      span.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${rotation}deg)`;
    });
  };

  const handlePointerEnter = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    setRandomRotations();
    handlePointerMove(event);
  };

  return (
    <header className="absolute left-0 top-0 z-40 w-full">
      <div className="flex justify-start">
        <h1>
          <a
            href="/"
            className="group flex w-full max-w-[min(440px,90vw)] select-none items-baseline justify-between text-[clamp(2.5rem,7vw,6.5rem)] font-extralight uppercase leading-none tracking-tight text-white/95 [@media(hover:hover)]:transition-colors [@media(hover:hover)]:duration-300 [@media(hover:hover)]:ease-out [@media(hover:hover)]:hover:text-white"
            aria-label="Bewider home"
            onPointerEnter={handlePointerEnter}
            onPointerMove={handlePointerMove}
            onPointerLeave={resetLetters}
          >
            <span className="flex flex-1 justify-start gap-[0.04em]">
              {leftGroup.map((letter, groupIndex) => {
                const index = groupIndex;
                return (
                  <span
                    key={`${letter}-${index}`}
                    ref={(element) => {
                      spanRefs.current[index] = element;
                    }}
                    className="px-[0.02em] text-left [@media(hover:hover)]:transition-transform [@media(hover:hover)]:duration-300 [@media(hover:hover)]:ease-out will-change-transform [@media(hover:hover)]:hover:text-white focus-visible:text-white focus-visible:outline-none"
                  >
                    {letter}
                  </span>
                );
              })}
            </span>
            <span className="flex flex-1 justify-end gap-[0.04em]">
              {rightGroup.map((letter, groupIndex) => {
                const index = groupIndex + LEFT_GROUP_COUNT;
                return (
                  <span
                    key={`${letter}-${index}`}
                    ref={(element) => {
                      spanRefs.current[index] = element;
                    }}
                    className="px-[0.02em] text-right [@media(hover:hover)]:transition-transform [@media(hover:hover)]:duration-300 [@media(hover:hover)]:ease-out will-change-transform [@media(hover:hover)]:hover:text-white focus-visible:text-white focus-visible:outline-none"
                  >
                    {letter}
                  </span>
                );
              })}
            </span>
          </a>
        </h1>
      </div>
    </header>
  );
};

export default SiteTitle;
