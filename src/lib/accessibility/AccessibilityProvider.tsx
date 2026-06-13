// src/lib/accessibility/AccessibilityProvider.tsx
"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { MotionConfig } from "framer-motion";
import { AccessibilitySettings, DEFAULT_SETTINGS } from "./types";
import { applyAttributes, loadSettings, saveSettings } from "./storage";

interface AccessibilityContextValue {
  settings: AccessibilitySettings;
  setSetting: <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => void;
  reset: () => void;
}

export const AccessibilityContext =
  createContext<AccessibilityContextValue | null>(null);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(DEFAULT_SETTINGS);

  // Hydrate from localStorage after mount (avoids SSR/client mismatch).
  useEffect(() => {
    setSettings(loadSettings());
  }, []);

  // Persist + reflect to <html> whenever settings change.
  useEffect(() => {
    saveSettings(settings);
    applyAttributes(settings);
  }, [settings]);

  const setSetting = useCallback(
    <K extends keyof AccessibilitySettings>(
      key: K,
      value: AccessibilitySettings[K]
    ) => {
      setSettings((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const reset = useCallback(() => setSettings(DEFAULT_SETTINGS), []);

  const value = useMemo(
    () => ({ settings, setSetting, reset }),
    [settings, setSetting, reset]
  );

  return (
    <AccessibilityContext.Provider value={value}>
      <MotionConfig reducedMotion={settings.reduceMotion ? "always" : "user"}>
        {children}
      </MotionConfig>
    </AccessibilityContext.Provider>
  );
}
