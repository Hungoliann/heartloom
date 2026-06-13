# Accessibility Toggle Panel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a floating accessibility panel that lets visitors toggle larger text, high-contrast mode, reduced motion, a colorblind-safe palette, and captions-by-default, with preferences persisted in localStorage.

**Architecture:** A client-side React Context provider (mounted in the root layout) holds the settings, persists them to localStorage, and reflects each as a `data-a11y-*` attribute on `<html>`. CSS in `src/index.css` overrides the existing brand CSS variables under those attribute selectors, so changes cascade site-wide with almost no per-component edits. Framer Motion's `MotionConfig` and a `useReduceMotionPref` hook handle JS-driven animation; a no-flash inline script applies saved settings before first paint.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind v4, shadcn/ui (Sheet, Switch, RadioGroup, Label), Framer Motion, GSAP.

> **Testing note:** This repo has no test runner and no lint script (see `CLAUDE.md`). Each task therefore verifies with `pnpm typecheck` and explicit manual browser checks instead of automated tests. Run all commands from the repo root `c:\Users\hungl\heartloom`.

---

### Task 1: Settings types and constants

**Files:**
- Create: `src/lib/accessibility/types.ts`

- [ ] **Step 1: Create the types file**

```ts
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
```

- [ ] **Step 2: Verify it typechecks**

Run: `pnpm typecheck`
Expected: PASS (no errors).

- [ ] **Step 3: Commit**

```bash
git add src/lib/accessibility/types.ts
git commit -m "feat(a11y): add accessibility settings types"
```

---

### Task 2: Storage helpers and no-flash script

**Files:**
- Create: `src/lib/accessibility/storage.ts`
- Create: `src/lib/accessibility/no-flash-script.ts`

The storage module owns the single source of truth for how a settings object maps onto
`data-a11y-*` attributes. The no-flash script repeats that mapping in raw JS because it runs
before React hydrates and cannot import modules.

- [ ] **Step 1: Create the storage helpers**

```ts
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
```

- [ ] **Step 2: Create the no-flash script**

```ts
// src/lib/accessibility/no-flash-script.ts

// Raw JS string executed in <body> before React hydrates, so saved settings
// apply before first paint (no flash of unstyled/animated content). Keep the
// attribute mapping in sync with applyAttributes() in storage.ts.
export const NO_FLASH_SCRIPT = `
(function () {
  try {
    var KEY = "heartloom:a11y";
    var raw = window.localStorage.getItem(KEY);
    var s = raw ? JSON.parse(raw) : {};
    var prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var el = document.documentElement;
    el.setAttribute("data-a11y-text", s.textScale || "normal");
    el.setAttribute("data-a11y-contrast", s.contrast || "normal");
    var reduce = s.reduceMotion != null ? s.reduceMotion : prefersReduced;
    el.setAttribute("data-a11y-motion", reduce ? "reduce" : "ok");
    el.setAttribute("data-a11y-cb", s.colorblindSafe ? "on" : "off");
  } catch (e) {}
})();
`;
```

- [ ] **Step 3: Verify it typechecks**

Run: `pnpm typecheck`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/lib/accessibility/storage.ts src/lib/accessibility/no-flash-script.ts
git commit -m "feat(a11y): add settings storage and no-flash script"
```

---

### Task 3: Provider and hooks

**Files:**
- Create: `src/lib/accessibility/AccessibilityProvider.tsx`
- Create: `src/lib/accessibility/useAccessibility.ts`
- Create: `src/lib/accessibility/useReduceMotionPref.ts`

- [ ] **Step 1: Create the context + provider**

The provider wraps children in Framer Motion's `MotionConfig` so the `reduceMotion` setting
governs every `motion.*` component automatically.

```tsx
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
```

- [ ] **Step 2: Create the consumer hook**

```ts
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
```

- [ ] **Step 3: Create the reduced-motion hook**

Combines the stored setting with the live OS media query, for non-Framer animations
(e.g. the GSAP tree) that need a plain boolean.

```ts
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
```

- [ ] **Step 4: Verify it typechecks**

Run: `pnpm typecheck`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/accessibility/AccessibilityProvider.tsx src/lib/accessibility/useAccessibility.ts src/lib/accessibility/useReduceMotionPref.ts
git commit -m "feat(a11y): add provider and hooks"
```

---

### Task 4: CSS attribute-driven overrides

**Files:**
- Modify: `src/index.css` (append a new block after the existing `@layer utilities { ... }` block, at end of file)

- [ ] **Step 1: Append the accessibility CSS**

Add this to the very end of `src/index.css`:

```css
/* ── Accessibility settings (driven by data-a11y-* on <html>) ───────────── */

/* Larger text — zoom scales fixed-px layouts uniformly */
:root[data-a11y-text="large"] {
  zoom: 1.15;
}
:root[data-a11y-text="xlarge"] {
  zoom: 1.3;
}

/* High-contrast — override brand vars + shadcn hsl tokens toward WCAG AA */
:root[data-a11y-contrast="high"] {
  --parchment: #ffffff;
  --parchment-2: #f2f2f2;
  --card-white: #ffffff;
  --charcoal: #000000;
  --muted-text: #1a1a1a;
  --border-warm: #595959;
  --brand-amber: #8a3d00;

  --background: 0 0% 100%;
  --foreground: 0 0% 0%;
  --card: 0 0% 100%;
  --card-foreground: 0 0% 0%;
  --muted-foreground: 0 0% 12%;
  --border: 0 0% 35%;
  --popover: 0 0% 100%;
  --popover-foreground: 0 0% 0%;
}

/* Colorblind-safe — distinguishable orange/teal pair + always-underline links */
:root[data-a11y-cb="on"] {
  --brand-amber: #9a3b00;
  --brand-sage: #1f6f78;
  --brand-sage-30: #1f6f7833;
}
:root[data-a11y-cb="on"] a {
  text-decoration: underline;
}

/* Reduce motion — kill keyframes + near-zero transitions */
:root[data-a11y-motion="reduce"] *,
:root[data-a11y-motion="reduce"] *::before,
:root[data-a11y-motion="reduce"] *::after {
  animation-duration: 0.001ms !important;
  animation-iteration-count: 1 !important;
  transition-duration: 0.001ms !important;
  scroll-behavior: auto !important;
}
:root[data-a11y-motion="reduce"] .float-a,
:root[data-a11y-motion="reduce"] .float-b,
:root[data-a11y-motion="reduce"] .float-c {
  animation: none !important;
}
```

- [ ] **Step 2: Verify the build still compiles CSS**

Run: `pnpm typecheck`
Expected: PASS (CSS isn't typechecked, but this confirms nothing else broke).

Manual: temporarily add `data-a11y-contrast="high"` to the `<html>` tag in devtools on a
running `pnpm dev` server and confirm the page turns high-contrast. (No code change — just
eyeball, then remove the manual attribute.)

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "feat(a11y): add attribute-driven CSS overrides"
```

---

### Task 5: Wire the provider and no-flash script into the layout

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Update the root layout**

Replace the entire contents of `src/app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import type { ReactNode } from "react";
import "./globals.css";
import { AccessibilityProvider } from "@/lib/accessibility/AccessibilityProvider";
import { NO_FLASH_SCRIPT } from "@/lib/accessibility/no-flash-script";

export const metadata: Metadata = {
  title: "Heartloom.",
  description: "Preserve your words and wisdom.",
  icons: {
    icon: [
      {
        url: "/favicon.svg?v=6",
        type: "image/svg+xml",
        sizes: "64x64",
      },
    ],
    shortcut: "/favicon.svg?v=6",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  const content = (
    <AccessibilityProvider>{children}</AccessibilityProvider>
  );

  return (
    <html lang="en">
      <body>
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH_SCRIPT }} />
        {clerkPublishableKey ? (
          <ClerkProvider publishableKey={clerkPublishableKey}>
            {content}
          </ClerkProvider>
        ) : (
          content
        )}
      </body>
    </html>
  );
}
```

> Note: the `AccessibilityWidget` is added to this file in Task 6, Step 2. The widget is intentionally not mounted yet.

- [ ] **Step 2: Verify it typechecks and runs**

Run: `pnpm typecheck`
Expected: PASS.

Manual: `pnpm dev`, open the site, confirm it renders normally and devtools shows
`data-a11y-text="normal"` etc. on `<html>`.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat(a11y): mount provider and no-flash script in layout"
```

---

### Task 6: Accessibility widget (floating button + panel) and mount it

**Files:**
- Create: `src/components/accessibility/AccessibilityWidget.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create the widget**

```tsx
// src/components/accessibility/AccessibilityWidget.tsx
"use client";

import { useState } from "react";
import { Accessibility } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAccessibility } from "@/lib/accessibility/useAccessibility";
import type { TextScale } from "@/lib/accessibility/types";

export function AccessibilityWidget() {
  const { settings, setSetting, reset } = useAccessibility();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Accessibility settings"
          className="fixed bottom-5 left-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--brand-amber)] text-[color:var(--parchment)] shadow-lg ring-offset-2 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand-amber)]"
        >
          <Accessibility className="h-6 w-6" aria-hidden="true" />
        </button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-[88vw] max-w-sm overflow-y-auto bg-[color:var(--parchment)] text-[color:var(--charcoal)]"
      >
        <SheetHeader>
          <SheetTitle className="font-serif text-[color:var(--charcoal)]">
            Accessibility
          </SheetTitle>
          <SheetDescription className="text-[color:var(--muted-text)]">
            Adjust the site to your needs. Your choices are saved on this device.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 flex flex-col gap-6">
          {/* Text size */}
          <fieldset className="flex flex-col gap-3">
            <legend className="font-sans text-sm font-semibold">Text size</legend>
            <RadioGroup
              value={settings.textScale}
              onValueChange={(v) => setSetting("textScale", v as TextScale)}
              className="gap-2"
            >
              {(
                [
                  ["normal", "Normal"],
                  ["large", "Large"],
                  ["xlarge", "Extra large"],
                ] as [TextScale, string][]
              ).map(([value, label]) => (
                <div key={value} className="flex items-center gap-2">
                  <RadioGroupItem value={value} id={`text-${value}`} />
                  <Label htmlFor={`text-${value}`} className="cursor-pointer">
                    {label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </fieldset>

          {/* Switch rows */}
          <ToggleRow
            id="contrast"
            label="High contrast"
            description="Stronger colors and borders for easier reading."
            checked={settings.contrast === "high"}
            onChange={(c) => setSetting("contrast", c ? "high" : "normal")}
          />
          <ToggleRow
            id="motion"
            label="Reduce motion"
            description="Minimize animations and movement."
            checked={settings.reduceMotion}
            onChange={(c) => setSetting("reduceMotion", c)}
          />
          <ToggleRow
            id="cb"
            label="Colorblind-safe"
            description="Adjust colors and underline links."
            checked={settings.colorblindSafe}
            onChange={(c) => setSetting("colorblindSafe", c)}
          />
          <ToggleRow
            id="captions"
            label="Captions by default"
            description="Show captions on videos automatically."
            checked={settings.captionsDefault}
            onChange={(c) => setSetting("captionsDefault", c)}
          />

          <button
            type="button"
            onClick={reset}
            className="mt-2 self-start rounded-full border border-[color:var(--border-warm)] px-4 py-2 font-sans text-sm font-medium text-[color:var(--muted-text)] transition-colors hover:bg-[color:var(--parchment-2)]"
          >
            Reset to defaults
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function ToggleRow({
  id,
  label,
  description,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex flex-col">
        <Label htmlFor={id} className="cursor-pointer font-semibold">
          {label}
        </Label>
        <span className="font-sans text-xs text-[color:var(--muted-text)]">
          {description}
        </span>
      </div>
      <Switch id={id} checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
```

- [ ] **Step 2: Mount the widget in the layout**

In `src/app/layout.tsx`, add the import and render the widget inside the provider.

Change the import block to add:

```tsx
import { AccessibilityWidget } from "@/components/accessibility/AccessibilityWidget";
```

Change the `content` constant to:

```tsx
  const content = (
    <AccessibilityProvider>
      {children}
      <AccessibilityWidget />
    </AccessibilityProvider>
  );
```

- [ ] **Step 3: Verify it typechecks and works end-to-end**

Run: `pnpm typecheck`
Expected: PASS.

Manual on `pnpm dev`:
- The floating button appears bottom-left on every page.
- Clicking opens the panel; each toggle visibly changes the site (text size, contrast,
  colorblind palette, links underline).
- Reload the page — choices persist with no visible flash.
- Open the panel and operate every control with the keyboard only (Tab/Enter/Space/Esc).

- [ ] **Step 4: Commit**

```bash
git add src/components/accessibility/AccessibilityWidget.tsx src/app/layout.tsx
git commit -m "feat(a11y): add accessibility widget and mount it"
```

---

### Task 7: Reduce-motion support for the GSAP tree

**Files:**
- Modify: `src/components/GrowingTree.tsx`

`GrowingTree` is scroll-pinned via GSAP `ScrollTrigger`. Under reduced motion it should render
the fully-grown tree with all labels visible and skip the pin/scrub entirely.

- [ ] **Step 1: Add the hook import**

At the top of `src/components/GrowingTree.tsx`, after the existing imports, add:

```tsx
import { useReduceMotionPref } from "@/lib/accessibility/useReduceMotionPref";
```

- [ ] **Step 2: Read the preference and branch the effect**

Inside `export function GrowingTree() {`, add right after the existing `mobileCardTopOffsets`
declaration:

```tsx
  const reduceMotion = useReduceMotionPref();
```

Then change the effect's dependency array from `[]` to `[reduceMotion]`, and insert the
reduced-motion branch immediately after the `mobileCards` is defined and `dpr/aspect/scale`
are set up — specifically, place it directly **before** the existing
`gsap.set(labelRefs.current.filter(Boolean), { opacity: 0, y: 14 });` line:

```tsx
    if (reduceMotion) {
      progressRef.current = 1;
      resizeCanvas(); // draws the fully-grown tree at the current size
      gsap.set(labelRefs.current.filter(Boolean), { opacity: 1, y: 0 });
      if (headingRef.current) gsap.set(headingRef.current, { opacity: 1, y: 0 });
      mobileCards.forEach((card) => gsap.set(card, { opacity: 1, y: 0 }));
      const ro = new ResizeObserver(() => resizeCanvas());
      ro.observe(canvas);
      return () => ro.disconnect();
    }
```

This returns before any `ScrollTrigger` is created, so the section is not pinned. (`resizeCanvas`
and the refs are already defined above this point in the effect body.)

- [ ] **Step 3: Verify it typechecks**

Run: `pnpm typecheck`
Expected: PASS.

Manual on `pnpm dev`:
- With Reduce motion OFF: the tree grows on scroll as before.
- Turn Reduce motion ON in the panel: the tree section is no longer pinned, shows the
  fully-grown tree with all six feature labels and the heading visible immediately, and the
  page scrolls normally past it.

- [ ] **Step 4: Commit**

```bash
git add src/components/GrowingTree.tsx
git commit -m "feat(a11y): respect reduce-motion in GrowingTree"
```

---

### Task 8: Captioned media component + usage doc

**Files:**
- Create: `src/components/accessibility/AccessibleMedia.tsx`
- Create: `docs/accessibility.md`

This is the captions "infrastructure": a reusable captioned `<video>` with a transcript
disclosure that respects the `captionsDefault` setting. No marketing page uses it yet.

- [ ] **Step 1: Create the component**

```tsx
// src/components/accessibility/AccessibleMedia.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useAccessibility } from "@/lib/accessibility/useAccessibility";

export interface CaptionTrack {
  src: string; // .vtt file
  srcLang: string; // e.g. "en"
  label: string; // e.g. "English"
  default?: boolean;
}

export interface AccessibleMediaProps {
  src: string;
  poster?: string;
  captions?: CaptionTrack[];
  /** Plain-text transcript shown in a collapsible region. */
  transcript?: string;
  className?: string;
}

export function AccessibleMedia({
  src,
  poster,
  captions = [],
  transcript,
  className,
}: AccessibleMediaProps) {
  const { settings } = useAccessibility();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showTranscript, setShowTranscript] = useState(false);

  // Force captions on when the user prefers them by default.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !settings.captionsDefault) return;
    const tracks = video.textTracks;
    for (let i = 0; i < tracks.length; i++) {
      if (tracks[i].kind === "captions" || tracks[i].kind === "subtitles") {
        tracks[i].mode = "showing";
      }
    }
  }, [settings.captionsDefault]);

  return (
    <figure className={className}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        controls
        className="w-full rounded-2xl"
      >
        {captions.map((c) => (
          <track
            key={c.srcLang}
            kind="captions"
            src={c.src}
            srcLang={c.srcLang}
            label={c.label}
            default={settings.captionsDefault || c.default}
          />
        ))}
      </video>

      {transcript && (
        <div className="mt-3">
          <button
            type="button"
            onClick={() => setShowTranscript((v) => !v)}
            aria-expanded={showTranscript}
            className="font-sans text-sm font-medium text-[color:var(--brand-amber)] underline"
          >
            {showTranscript ? "Hide transcript" : "Show transcript"}
          </button>
          {showTranscript && (
            <div className="mt-2 max-h-64 overflow-y-auto whitespace-pre-line rounded-xl bg-[color:var(--parchment-2)] p-4 font-sans text-sm leading-relaxed text-[color:var(--muted-text)]">
              {transcript}
            </div>
          )}
        </div>
      )}
    </figure>
  );
}
```

- [ ] **Step 2: Create the usage doc**

```markdown
<!-- docs/accessibility.md -->
# Accessibility

The site has a built-in accessibility panel (floating button, bottom-left) backed by
`AccessibilityProvider`. Settings persist per-device in localStorage under `heartloom:a11y`.

## Settings

| Setting          | Effect                                                             |
|------------------|-------------------------------------------------------------------|
| Text size        | `zoom` scaling on `<html>` (normal / 1.15 / 1.3)                   |
| High contrast    | Overrides brand + shadcn color tokens toward WCAG AA              |
| Reduce motion    | Framer `MotionConfig` + CSS + GSAP tree renders fully-grown       |
| Colorblind-safe  | Distinguishable orange/teal palette, links underlined             |
| Captions default | `AccessibleMedia` shows captions automatically                    |

Settings are reflected as `data-a11y-*` attributes on `<html>` and styled in
`src/index.css`. A no-flash inline script (`src/lib/accessibility/no-flash-script.ts`)
applies saved settings before first paint.

## Adding video or audio

Use `AccessibleMedia` so media inherits the captions preference:

\`\`\`tsx
import { AccessibleMedia } from "@/components/accessibility/AccessibleMedia";

<AccessibleMedia
  src="/media/story.mp4"
  poster="/media/story-poster.jpg"
  captions={[{ src: "/media/story.en.vtt", srcLang: "en", label: "English" }]}
  transcript={"Full transcript text here..."}
/>
\`\`\`

Always provide a `.vtt` caption track and, where possible, a `transcript`.
```

- [ ] **Step 3: Verify it typechecks**

Run: `pnpm typecheck`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/components/accessibility/AccessibleMedia.tsx docs/accessibility.md
git commit -m "feat(a11y): add captioned media component and docs"
```

---

### Task 9: Final verification

**Files:** none (verification only)

- [ ] **Step 1: Typecheck**

Run: `pnpm typecheck`
Expected: PASS, no errors.

- [ ] **Step 2: Production build**

Run: `pnpm build`
Expected: build completes successfully.

- [ ] **Step 3: Full manual pass on `pnpm dev`**

Confirm, on at least the home page (`/`) and one inner page (`/faq`):
- Floating button visible bottom-left; panel opens/closes; Escape closes it.
- Each setting works: text size scales, high-contrast applies, colorblind palette + link
  underlines apply, reduce-motion stops the Framer animations and the floating cards and
  renders the tree fully-grown.
- Settings persist across reload with no flash.
- The panel is fully keyboard-operable and the trigger has an accessible name.

- [ ] **Step 4: Commit any final fixes (if needed)**

```bash
git add -A
git commit -m "fix(a11y): final verification adjustments"
```
```
