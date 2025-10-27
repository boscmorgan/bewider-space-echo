import "@testing-library/jest-dom/vitest";

if (typeof window !== "undefined") {
  window.requestAnimationFrame = (callback: FrameRequestCallback) => {
    callback(0);
    return 0;
  };
  window.cancelAnimationFrame = () => undefined;
}
