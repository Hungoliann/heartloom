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

```tsx
import { AccessibleMedia } from "@/components/accessibility/AccessibleMedia";

<AccessibleMedia
  src="/media/story.mp4"
  poster="/media/story-poster.jpg"
  captions={[{ src: "/media/story.en.vtt", srcLang: "en", label: "English" }]}
  transcript={"Full transcript text here..."}
/>
```

Always provide a `.vtt` caption track and, where possible, a `transcript`.
