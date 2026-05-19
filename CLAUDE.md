# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # start dev server
pnpm build        # production build
pnpm typecheck    # TypeScript check (no emit)
```

Package manager is **pnpm** (see `.npmrc`). There is no test runner and no lint script configured.

## Architecture

**Next.js 15 App Router** with React 19 and TypeScript.

### Page / Screen split

Every route in `src/app/` is a thin shell that imports from `src/screens/`:

```
src/app/about/page.tsx   →  import from src/screens/about.tsx
src/app/letters/page.tsx →  import from src/screens/Letters.tsx
...
```

All real UI logic lives in `src/screens/`. The `page.tsx` files only re-export the screen component.

### UI components

`src/components/ui/` contains a full shadcn/ui library. When adding UI, pull from there first rather than writing from scratch. Shared layout components (`Navbar`, `PageFooter`) live in `src/components/layout/`.

### Styling

Tailwind CSS v4 with a CSS-first config. The design token definitions are all in `src/index.css` (imported via `src/app/globals.css`), declared under `@theme inline {}`. Brand-specific CSS custom properties (`--parchment`, `--charcoal`, `--brand-amber`, `--border-warm`, etc.) are defined in `:root` in the same file — prefer these over hardcoded hex values.

Fonts: `font-sans` → DM Sans, `font-serif` → Playfair Display. Headings default to serif via the `@layer base` rule.

### Auth & Waitlist

Clerk (`@clerk/nextjs`) handles auth. The `ClerkProvider` in `src/app/layout.tsx` is conditionally mounted — if `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is absent the app still renders without auth. The waitlist flow in `src/screens/waitlist.tsx` stores `onWaitlist: true` in Clerk's `unsafeMetadata`.

### Contact API

`src/app/api/contact/route.ts` is the only API route. It calls `src/lib/contact-mailer.js` which validates input, builds an HTML email, and sends it via Resend (`RESEND_API_KEY` env var). `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL` env vars override the defaults.

### 3D / Animation

`src/components/Hero3D.tsx` and `src/components/GrowingTree.tsx` use `@react-three/fiber` + `@react-three/drei` (Three.js). Animations elsewhere use Framer Motion.

## Environment variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Enables Clerk auth/waitlist |
| `CLERK_SECRET_KEY` | Clerk server-side |
| `RESEND_API_KEY` | Contact form email delivery |
| `CONTACT_TO_EMAIL` | Override recipient (default: `heartloomllc@gmail.com`) |
| `CONTACT_FROM_EMAIL` | Override sender (default: Resend onboarding address) |
