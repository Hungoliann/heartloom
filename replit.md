# Heartloom

Legacy companion app that helps families preserve memories, future letters, and end-of-life logistics — framed around love and legacy, not loss.

## Run & Operate

- `pnpm --filter @workspace/heartloom run dev` — run the Heartloom frontend (port auto-assigned)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string, `SESSION_SECRET` — session signing

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind CSS, framer-motion, gsap + ScrollTrigger, wouter
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle for API), Vite (frontend)

## Where things live

- `artifacts/heartloom/` — React + Vite frontend (main product)
- `artifacts/heartloom/src/components/GrowingTree.tsx` — Scroll-animated SVG tree (GSAP ScrollTrigger)
- `artifacts/heartloom/src/pages/home.tsx` — Landing page
- `artifacts/api-server/` — Express API server
- `lib/api-spec/openapi.yaml` — OpenAPI source of truth
- `lib/db/src/schema/` — Drizzle ORM schema

## Architecture decisions

- Tree animation uses GSAP ScrollTrigger pinning — the section pins for 4000px of scroll travel while the tree grows
- **GrowingTree uses Canvas 2D** (not SVG) for the tree rendering — this enables true tapered strokes (lineWidth varies per segment along each Bezier curve), which gives the professionally-illustrated look impossible with uniform SVG strokes
- Each branch is drawn as a series of tiny line segments via `cubicTaper` / `quadTaper` helpers; `lineWidth` interpolates from wStart → wEnd along the path
- Leaf clusters use organic Bezier leaf shapes with midrib veins; composited from 12 leaves per cluster, scaled by `r` parameter
- Feature labels are in the DOM, animated via GSAP opacity/y in the ScrollTrigger `onUpdate` callback keyed to scroll progress thresholds
- Bark uses a horizontal `createLinearGradient` across the stroke width for cylindrical shading: near-black edges, warm amber highlight at centre

## Product

- Future Letters: write messages delivered on future milestone dates
- Memory Vault: capture stories, photos, audio recordings
- Document Vault: wills, trusts, DNRs organized and accessible
- Legacy Concierge: guided walkthrough of end-of-life logistics
- Life Timeline: life story told chapter by chapter
- Family Sharing: share the legacy with loved ones

## User preferences

- Warm amber (#D27F14) and sage (#9CAF88) brand colors throughout
- No clinical white or funeral imagery — warm, love-focused language
- Tree section is the hero feature display: scroll-animated growing tree with feature labels

## Gotchas

- GrowingTree uses `path[class]` selector to find animatable paths — paths without a class are decorative and should not have dasharray set
- Leaf `gs-leaf` class elements use `scale: 0` → `scale: 1` GSAP animation; the `transformOrigin` is set on the `<g>` element
- Always run `pnpm install --filter @workspace/heartloom` after extracting from zip before starting the workflow

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
