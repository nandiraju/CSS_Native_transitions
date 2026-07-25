# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Vite dev server with HMR
npm run build    # tsc -b (type-check) then vite build → dist/
npm run lint     # oxlint (config in .oxlintrc.json)
npm run preview  # Serve the production build
```

There is no test suite.

## What this project is

A React 19 + TypeScript + Vite SPA that showcases native, CSS-only browser transition APIs (Baseline 2024–2026): the View Transitions API, `@starting-style` + `transition-behavior: allow-discrete`, the Popover API, and `<dialog>` top-layer animations. There is no router, no state library, and no animation library — demonstrating that these effects need none of them is the point of the repo. Don't add animation/transition dependencies.

## Architecture

**Navigation:** [App.tsx](src/App.tsx) holds a single `section` state string and switch-renders one of the components in [src/components/](src/components/) (Dashboard, SharedElementDemo, TopLayerDemo, DocsPanel, SettingsPanel). Sidebar buttons call `navigateWithTransition`, which wraps the state update in a view transition using the style picked in Settings.

**Transition registry:** [src/transitions.ts](src/transitions.ts) is the single source of truth — `TransitionType` union + `TRANSITIONS` record (name, html class, description) + localStorage persistence (`loadTransition`/`saveTransition`, with legacy-value migration). SettingsPanel is the only UI for choosing a transition; slides, cubes, and blinds come in four directional variants each. The blinds slat thickness is a separate persisted setting applied as the `--blinds-band` CSS var on `<html>` (the blinds mask animates a registered `@property --blinds-slat` ratio 0→1 against it). A new transition must be added in two places: the record there, and its class+keyframes in index.css.

**The core view-transition pattern** (used by App.tsx for navigation and the theme toggle):

1. Feature-detect: if `document.startViewTransition` is missing, set state directly and return (graceful fallback, no animation).
2. Add a transition-selecting class to `document.documentElement` (e.g. `cinema-transition`, `fade-transition`, `theme-change-transition`). Page navigations also add `content-transition`, which gives `.main-content` a `view-transition-name: main-content` so only the content area animates — the sidebar stays in the (unanimated) root snapshot. The theme toggle deliberately omits it so its circular reveal covers the whole viewport.
3. Call `startViewTransition(() => flushSync(() => setState(...)))` — `flushSync` from `react-dom` is required so React commits the DOM synchronously inside the transition callback.
4. Remove the class(es) in `transition.finished.finally(...)` so one demo's animation doesn't bleed into the next.

`startViewTransition` is called via `(document as any)` because the installed TS lib doesn't type it yet.

**Where the animations live:** all view-transition CSS is in [src/index.css](src/index.css), keyed off the html class: `html.<name>-transition::view-transition-old(main-content)` / `::view-transition-new(main-content)` pairs with `@keyframes` (page transitions target the `main-content` snapshot; only the theme reveal targets `root`). The cube transitions pivot around `--cube-depth-x` (half the content width, horizontal spins) and `--cube-depth-y` (half the height, vertical spins), defined on `:root` — keep `--sidebar-width` in sync if the layout changes.

**Coordinate-aware transitions:** click handlers call `setClickCoords` from [src/transitions.ts](src/transitions.ts), which writes `--click-x` / `--click-y` onto `document.documentElement`; the `clip-reveal` keyframes use them as the `circle()` origin. The clip-path resolves in the animated snapshot's own coordinate space, so content-scoped transitions pass the `.main-content` element as scope (coords made main-relative) while the root-scoped theme reveal uses raw viewport coords.

**Shared-element transitions:** anomaly data lives in [src/anomalies.ts](src/anomalies.ts), shared by Dashboard (thumbnails) and [SharedElementDemo.tsx](src/components/SharedElementDemo.tsx) (gallery + detail). Each item's image carries `view-transition-name: anomaly-<id>` (unique, always on) plus `view-transition-class: anomaly-media` — the class lets one `::view-transition-group(.anomaly-media)` rule in index.css tune every image morph, including cross-page flights (Dashboard thumbnail → gallery card → detail hero). Panel/title still use `active-card-bg`/`active-card-title`, applied *conditionally* via `clickedId` — two simultaneously visible elements must never share a `view-transition-name` or the transition aborts.

**Top-layer animations** ([TopLayerDemo.tsx](src/components/TopLayerDemo.tsx) + index.css): `<dialog>` and `[popover]` elements animate entry/exit purely in CSS using the base-state → `[open]`/`:popover-open` → `@starting-style` triad, with `transition-behavior: allow-discrete` (and `overlay` in the transition property list) so `display: none` can transition. `::backdrop` gets the same treatment.

**Theming:** light theme variables on `:root`, dark overrides on `html.dark`. All colors go through CSS custom properties (`--primary`, `--bg-main`, etc.). Components use inline styles referencing those variables; index.css holds only theme variables, glassmorphism utility classes (`.glass-panel`, `.glass-card`), layout, and all transition CSS.

**Reduced motion:** `prefers-reduced-motion` disables all view-transition animations (`::view-transition-*(*)`) in index.css — preserve this when adding transitions.

**Mobile (≤900px):** the sidebar becomes a fixed off-canvas drawer (`sidebarOpen` state in App.tsx, `.sidebar.open` + `.sidebar-backdrop` + `.mobile-topbar` in index.css). The media query zeroes `--sidebar-width` since the drawer overlays rather than occupies layout — this is what keeps the cube-depth math correct on mobile; don't hardcode 280px anywhere. Component grids use `minmax(min(100%, Xpx), 1fr)` so they collapse without horizontal overflow on narrow phones.

## Gotchas

- `::view-transition-group(main-content)` carries `overflow: clip` so animations never paint over the sidebar. Never move that clip (or any `overflow`/`filter`/`mask`) onto `::view-transition-image-pair(main-content)` — grouping properties flatten its `preserve-3d` and break the cube transition's 3D.

- [src/App.css](src/App.css) is dead code — nothing imports it (main.tsx imports only index.css). Don't add styles there.
- `viewTransitionName` in inline style objects needs an `as any` cast (not in React's CSSProperties types yet).
