# hi-git — Git & GitHub Cheat Sheet

A fast, searchable Git & GitHub reference for developers. Every command with real examples, syntax highlighting, and an interactive visualizer.

Live at [git-sheet.hi-shanto.me](https://git-sheet.hi-shanto.me)

## Features

- **Search** — `Cmd/Ctrl + K` to instantly find any command
- **Bookmarks** — save commands for quick access, persisted in localStorage
- **Interactive Visualizer** — animated commit graph with a simulated terminal for branch, merge, reset, rebase, stash, and cherry-pick
- **Command descriptions** — inline "what it does / when to use it" modals
- **GitHub Workflow** — step-by-step Fork → PR → Merge guide
- **Quick Reference** table of the 20 most-used commands

## Stack

- [Next.js 16](https://nextjs.org) — App Router
- [React 19](https://react.dev)
- [TypeScript 5](https://www.typescriptlang.org) — strict mode
- [Tailwind CSS v4](https://tailwindcss.com)
- [Zustand](https://zustand-demo.pmnd.rs) — client state

## Project Structure

```
app/              → layouts, pages, metadata, OG image
components/       → UI components
  bookmarks/      → bookmark panel and trigger
  search/         → search bar and modal
  ui/             → shared primitives (copy, bookmark buttons, modals)
  visualizer/     → interactive git visualizer (tree, terminal, explainer)
data/             → static command data and visualizer scenarios
hooks/            → custom React hooks
lib/              → git simulator engine and search index
store/            → Zustand stores
types/            → shared TypeScript interfaces
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
