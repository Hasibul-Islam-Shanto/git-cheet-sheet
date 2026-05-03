# Project Rules for AI Agents

## Stack
- **Next.js 16** (App Router) — `app/` directory only, no `pages/` directory
- **React 19** — use the latest patterns; avoid legacy class components
- **TypeScript 5** — strict mode is on; all code must be fully typed, no `any`
- **Tailwind CSS v4** — configured via `@import "tailwindcss"` in `globals.css`; no `tailwind.config.*` file exists
- **Path alias** — use `@/` to import from the project root (e.g. `@/components/Hero`)

## Next.js 16 — Critical Differences
- Read `node_modules/next/dist/docs/` before writing any Next.js-specific code
- `"use client"` / `"use server"` directives are required where applicable
- Metadata is exported from layout/page files via `export const metadata`, not `<Head>`
- Image optimisation uses `next/image`; never use raw `<img>` tags
- Fonts are loaded via `next/font/google`, already set up in `app/layout.tsx`

## Project Structure
```
app/           → layouts, pages, global styles
components/    → reusable UI components (one component per file)
data/          → static data only (commands.ts)
types/         → shared TypeScript interfaces (index.ts)
public/        → static assets
```

## Code Style
- No code comments — code should be self-explanatory
- No default exports mixed with named exports in the same file
- Props interfaces are defined inline above the component, not in `types/index.ts` (unless shared across multiple components)
- Tailwind classes only — no inline `style={{}}` except for truly dynamic values
- Use CSS custom properties defined in `globals.css` (e.g. `text-(--accent)`, `bg-(--card)`) for theme colours

## Data & Types
- All command/section data lives in `data/commands.ts`
- All shared types live in `types/index.ts`
- Never hard-code content in components — pull from data files

## What to Avoid
- Do not install new dependencies without being asked
- Do not create new files unless strictly necessary
- Do not add `console.log` or debug statements
- Do not use `eslint-disable` comments
- Do not rename existing files or restructure folders without being asked
