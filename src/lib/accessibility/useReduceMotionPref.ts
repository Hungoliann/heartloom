// src/lib/accessibility/useReduceMotionPref.ts
import { useEffect, useState } from "react";
import { useAccessibility } from "./useAccessibility";

export function useReduceMotionPref(): boolean {
  const { settings } = useAccessibility();
  const [osReduce, setOsReduce] = useState(false);

  useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setOsReduce(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setOsReduce(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return settings.reduceMotion || osReduce;
}
