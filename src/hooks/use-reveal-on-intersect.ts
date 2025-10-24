import { useEffect, useRef } from "react";

interface RevealOptions {
  selector?: string;
}

export function useRevealOnIntersect<T extends HTMLElement>({ selector }: RevealOptions = {}) {
  const containerRef = useRef<T | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const targets = selector
      ? (Array.from(container.querySelectorAll(selector)) as HTMLElement[])
      : [container];

    if (!targets.length) {
      return;
    }

    if (typeof window.requestAnimationFrame === "function") {
      const frame = window.requestAnimationFrame(() => {
        targets.forEach((target) => target.classList.remove("opacity-0"));
      });

      return () => window.cancelAnimationFrame(frame);
    }

    targets.forEach((target) => target.classList.remove("opacity-0"));

    return () => undefined;
  }, [selector]);

  return containerRef;
}
