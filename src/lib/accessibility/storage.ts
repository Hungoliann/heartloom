// src/lib/accessibility/storage.ts
import {
  AccessibilitySettings,
  DEFAULT_SETTINGS,
  STORAGE_KEY,
} from "./types";

export function loadSettings(): AccessibilitySettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return withOsDefaults(DEFAULT_SETTINGS);
    const parsed = JSON.parse(raw) as Partial<AccessibilitySettings>;
    // Merge so missing/old keys fall back to defaults.
    return { ...DEFAULT_SETTINGS, ...parsed };
  } catch {
    return withOsDefaults(DEFAULT_SETTINGS);
  }
}

function withOsDefaults(base: AccessibilitySettings): AccessibilitySettings {
  if (typeof window === "undefined" || !window.matchMedia) return base;
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  return { ...base, reduceMotion: prefersReduced };
}

export function saveSettings(settings: AccessibilitySettings): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Ignore quota / privacy-mode write failures.
  }
}

/** Reflect settings onto the <html> element as data-a11y-* attributes. */
export function applyAttributes(settings: AccessibilitySettings): void {
  if (typeof document === "undefined") return;
  const el = document.documentElement;
  el.setAttribute("data-a11y-text", settings.textScale);
  el.setAttribute("data-a11y-contrast", settings.contrast);
  el.setAttribute("data-a11y-motion", settings.reduceMotion ? "reduce" : "ok");
  el.setAttribute("data-a11y-cb", settings.colorblindSafe ? "on" : "off");
}
