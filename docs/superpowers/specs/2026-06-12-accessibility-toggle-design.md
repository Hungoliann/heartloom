# Accessibility Toggle Panel — Design

**Date:** 2026-06-12
**Status:** Approved (design), pending implementation plan

## Goal

Make the Heartloom marketing site usable by visitors with visual, color-vision, and
hearing-related needs, with a user-controlled panel to turn each accommodation on and off.
Preferences persist across visits for anonymous (logged-out) visitors.

## Scope

In scope:

- A floating accessibility button that opens a settings panel.
- Five user-toggleable settings: larger text, high-contrast mode, reduce motion,
  colorblind-safe palette, and "captions on by default".
- A reusable captioned-media component (captions "infrastructure"). The marketing pages
  have no audio/video today, so it ships ready-to-use but unwired.
- Site-wide application of the visual settings with minimal per-component edits, by
  overriding existing brand CSS variables.

Out of scope:

- Converting the codebase from fixed-px to rem sizing.
- A full captioning/transcription pipeline or media uploads.
- Server-side / cross-device sync (no Clerk persistence). localStorage only.
- A general dark-mode toggle (the `.dark` theme already in `index.css` is not wired here).

## Architecture

React Context provider mounted in the root layout, reflecting settings as `data-*`
attributes on the `<html>` element, with CSS overrides driven by those attributes.

Rationale: every screen already styles itself through brand CSS variables
(`--charcoal`, `--brand-amber`, `--parchment`, `--muted-text`, `--border-warm`, etc.,
defined in `src/index.css`). Overriding those variables under attribute selectors cascades
site-wide without touching individual screens. This avoids a vanilla-JS class toggler
(which integrates poorly with the Framer Motion / Three.js JS animations) and third-party
overlay widgets (heavy, off-brand, and widely criticized for harming real accessibility).

## State model

`AccessibilitySettings`:

| Field            | Type                                | Default                              |
|------------------|-------------------------------------|--------------------------------------|
| `textScale`      | `"normal" \| "large" \| "xlarge"`   | `"normal"`                           |
| `contrast`       | `"normal" \| "high"`                | `"normal"`                           |
| `reduceMotion`   | `boolean`                           | OS `prefers-reduced-motion` at init  |
| `colorblindSafe` | `boolean`                           | `false`                              |
| `captionsDefault`| `boolean`                           | `false`                              |

- Persisted to `localStorage` under a single key (`heartloom:a11y`).
- `useAccessibility()` hook exposes `{ settings, setSetting, reset }`.
- Provider writes each setting to an attribute on `document.documentElement`:
  `data-a11y-text`, `data-a11y-contrast`, `data-a11y-motion`, `data-a11y-cb`.
  (`captionsDefault` is read directly by media components, not via attribute.)

## How each setting applies

- **Larger text** — root-level CSS `zoom` (`normal` = 1, `large` = 1.15, `xlarge` = 1.3).
  `zoom` is used instead of root `font-size` because most of the site uses fixed-px Tailwind
  utilities (`text-[15px]`) that don't respond to rem scaling; `zoom` scales everything
  uniformly and is supported in all current major browsers.
- **High-contrast** — under `[data-a11y-contrast="high"]`, override brand vars toward
  near-black text on white cards with stronger borders, targeting WCAG AA contrast.
- **Reduce motion** — global CSS under `[data-a11y-motion="reduce"]` disables the
  `float-a/b/c` keyframe animations and zeroes transition/animation durations; plus a
  `useReducedMotion()` hook (combining the stored setting with the OS media query) that the
  Framer Motion components and the `Hero3D` / `GrowingTree` R3F canvases consult to skip
  their animation loops.
- **Colorblind-safe** — under `[data-a11y-cb="on"]`, swap the amber/sage brand pair for a
  more distinguishable palette and force-underline links, so meaning never depends on color
  alone.

## Captions infrastructure

`<AccessibleMedia>` — wraps a native `<video>` with:

- a `<track kind="captions">` slot (caption file passed via props),
- a collapsible transcript region,
- captions shown by default when `captionsDefault` is enabled.

Ships unused (no media on the marketing pages yet) with a short usage doc.

## UI

- Floating circular button, fixed **bottom-left** (avoids any future bottom-right chat/CTA),
  using an accessibility icon, with an `aria-label`.
- Opens a shadcn **`Sheet`** panel (`src/components/ui/sheet.tsx`) containing:
  - text size — `radio-group` (Normal / Large / Extra large),
  - high-contrast — `switch`,
  - reduce motion — `switch`,
  - colorblind-safe — `switch`,
  - captions by default — `switch`,
  - a **Reset** button.
- Keyboard-accessible: focus trapping (Sheet built-in), visible focus rings, Escape closes.

## No-flash (FOUC) handling

A small inline script in the layout `<head>` reads `localStorage` and sets the `data-a11y-*`
attributes on `<html>` before first paint, mirroring the `next-themes` pattern.

## Files

New:

- `src/lib/accessibility/types.ts` — settings type + defaults + storage key.
- `src/lib/accessibility/storage.ts` — read/write/parse localStorage helpers.
- `src/lib/accessibility/AccessibilityProvider.tsx` — context, state, attribute sync.
- `src/lib/accessibility/useAccessibility.ts` — consumer hook.
- `src/lib/accessibility/useReducedMotion.ts` — stored setting + OS media query.
- `src/components/accessibility/AccessibilityWidget.tsx` — floating button + Sheet panel.
- `src/components/accessibility/AccessibleMedia.tsx` — captioned media component.
- `docs/accessibility.md` — short usage doc for `AccessibleMedia` and the settings.

Changed:

- `src/index.css` — attribute-driven variable overrides, `zoom` scale, reduce-motion rules,
  colorblind palette.
- `src/app/layout.tsx` — mount provider + widget, add no-flash inline script.
- `src/components/Hero3D.tsx`, `src/components/GrowingTree.tsx` — consult `useReducedMotion()`
  to pause animation when motion is reduced.

## Testing / verification

No test runner is configured in this repo. Verification is manual:

- `pnpm typecheck` passes.
- `pnpm build` succeeds.
- Manual: each toggle visibly changes the site, persists across reload, applies before paint
  (no flash), and the panel is operable by keyboard alone.
