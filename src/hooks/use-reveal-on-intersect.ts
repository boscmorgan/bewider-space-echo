import { useEffect, useRef } from "react";

interface RevealOptions {
  selector?: string;
  threshold?: number;
  rootMargin?: string;
  animateClass?: string;
}

export function useRevealOnIntersect<T extends HTMLElement>(
  { selector, threshold = 0.1, rootMargin = "0px", animateClass = "animate-blur-fade-in" }: RevealOptions = {},
) {
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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const target = entry.target as HTMLElement;
          target.classList.remove("opacity-0");
          if (animateClass) {
            target.classList.add(animateClass);
          }
          observer.unobserve(target);
        });
      },
      { threshold, rootMargin },
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, [selector, threshold, rootMargin, animateClass]);

  return containerRef;
}
