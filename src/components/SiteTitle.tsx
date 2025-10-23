import { useMemo, useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

const TITLE = "BEWIDER";
const randomRotation = () => {
  const magnitude = 12 + Math.random() * 28;
  return (Math.random() > 0.5 ? 1 : -1) * magnitude;
};

const SiteTitle = () => {
  const letters = useMemo(() => TITLE.split(""), []);
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const rotationsRef = useRef<number[]>(letters.map(() => 0));

  const handlePointerMove = (index: number, event: ReactPointerEvent<HTMLSpanElement>) => {
    const span = spanRefs.current[index];
    if (!span) {
      return;
    }

    const rect = span.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = event.clientX - centerX;
    const dy = event.clientY - centerY;

    const angle = Math.atan2(dy, dx);
    const orbitAngle = angle + Math.PI / 2;
    const distance = Math.min(Math.hypot(dx, dy) * 0.12, 28);
    const translateX = Math.cos(orbitAngle) * distance;
    const translateY = Math.sin(orbitAngle) * distance;

    span.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${rotationsRef.current[index]}deg)`;
  };

  const resetLetter = (index: number) => {
    const span = spanRefs.current[index];
    if (!span) {
      return;
    }

    span.style.transform = "translate(0, 0) rotate(0deg)";
    rotationsRef.current[index] = 0;
  };

  return (
    <header className="absolute left-0 top-0 z-40 w-full">
      <div className="flex justify-start">
        <h1 className="px-2 pt-2 sm:px-4 sm:pt-4">
          <a
            href="/"
            className="group inline-flex select-none gap-[0.08em] text-[clamp(3.5rem,12vw,11rem)] font-extralight uppercase leading-none tracking-tight text-white/95 transition-colors duration-300 ease-out hover:text-white"
            aria-label="Bewider home"
          >
            {letters.map((letter, index) => (
              <span
                key={`${letter}-${index}`}
                ref={(element) => {
                  spanRefs.current[index] = element;
                }}
                onPointerEnter={() => {
                  rotationsRef.current[index] = randomRotation();
                }}
                onPointerMove={(event) => {
                  handlePointerMove(index, event);
                }}
                onPointerLeave={() => {
                  resetLetter(index);
                }}
                className="px-[0.08em] transition-transform duration-300 ease-out will-change-transform hover:text-white focus-visible:text-white focus-visible:outline-none"
              >
                {letter}
              </span>
            ))}
          </a>
        </h1>
      </div>
    </header>
  );
};

export default SiteTitle;
