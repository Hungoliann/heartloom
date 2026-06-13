// src/lib/accessibility/useAccessibility.ts
import { useContext } from "react";
import { AccessibilityContext } from "./AccessibilityProvider";

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) {
    throw new Error(
      "useAccessibility must be used within an AccessibilityProvider"
    );
  }
  return ctx;
}
