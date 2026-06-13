// src/lib/accessibility/types.ts

export type TextScale = "normal" | "large" | "xlarge";
export type Contrast = "normal" | "high";

export interface AccessibilitySettings {
  textScale: TextScale;
  contrast: Contrast;
  reduceMotion: boolean;
  colorblindSafe: boolean;
  captionsDefault: boolean;
}

export const STORAGE_KEY = "heartloom:a11y";

export const DEFAULT_SETTINGS: AccessibilitySettings = {
  textScale: "normal",
  contrast: "normal",
  reduceMotion: false,
  colorblindSafe: false,
  captionsDefault: false,
};
