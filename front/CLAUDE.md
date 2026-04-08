# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

demo (chargeBaseVip) — a Vue 2.7 + Vite 4 + TypeScript mobile H5 for the 同花顺 paid-member service (featured quotes, advisor live streams, popularity boards, courses). Container: `mobileweb-vaserviece-charge-base-vip-front-container`.

## Commands

```bash
pnpm install            # install (uses internal @atom / @king-fisher / @ths-m registries on miniapp.10jqka.com.cn)
pnpm run dev            # vite --mode dev      (server: 127.0.0.1:8080, /api proxied to 127.0.0.1:5000)
pnpm run testing        # vite build --mode test
pnpm run release        # vite build --mode release  (production build)
pnpm run lint           # eslint --fix
```

There is no test runner configured.

## Architecture

**Stack:** Vue 2.7 (Composition API + `<script setup>`-style via `unplugin-auto-import`), Vue Router 3, Vite 4, TypeScript, Less, axios. Mobile-only — `postcss-px-to-viewport` converts px → vw against a 375 design width (use the `no-vw` class to opt out).

**Auto-imports** — do NOT manually import these in `.vue`/`.ts` files:
- `vue` and `vue-router` APIs (`ref`, `computed`, `onMounted`, `useRoute`, …) — handled by `unplugin-auto-import`, types in `src/types/auto-imports.d.ts`.
- `@atom/atom-ui` components — auto-registered via `AtomResolver()` in `unplugin-vue-components`, types in `src/types/components.d.ts`.

**Path aliases** (`vite.config.ts`):
- `@`  → `src`
- `@c` → `src/components`
- `_t` → `src/utils/tools.ts`

**Global injection** (`src/main.ts`): event bus on `Vue.prototype.$eventBus`; filters `unitToRMB`, `mathFormatHandler`, `judgeIsNull`; directives `v-fontResize`, `v-redGreen`; `PageStatus` plugin. Two runtime-injected packages are consumed off `window`: `thsc-mbweb-charge_mobileRenewTip` (renewal tip) and `thsc-pcweb-scrm_AIAccompany` — they must be loaded by the host page before `main.ts` runs. Less files automatically get `@import "@/assets/style/common.less"` prepended.

**Routing** (`src/router/index.ts`): five pages — `/home` (FeaturedQuotes), `/quotes-service` (Home/投顾专栏), `/article-detail`, `/course/detail`, `/my/services`; everything else redirects to `/home`. `meta.hideFooterNav` hides the bottom nav; `beforeEach` calls `setTitle` and `androidCanBackProtocol` from `@/utils/system`.

**API layer** (`src/apis/`): `http.ts` exports a single `request` instance wrapping axios. Both `get`/`post` resolve with `response.data` and call `errorReport` from `@/utils/tools` whenever the response status field is non-zero. Note the status field is **not unified** — the wrapper probes `status_code`, `errorcode`, `errorCode`, `code` in that order, so when adding new endpoints don't assume a single key. `baseURL` comes from `VITE_API_BASE_URL`; `withCredentials: true`.

**Quotes / charts:** real-time market data uses `@ths-m/HXKline`; helpers live in `src/utils/hxkineDataSdk.ts`. Featured-quotes UI lives under `src/components/featured-quotes/` (dark-board, market-temp, popularity-board).

**Theming:** light theme is loaded in `main.ts` (`@/assets/style/theme/light.css`) plus `@atom/b2c-tokens`. A dark theme file exists but per README only light/day mode is currently supported.

**Build modes** drive `.env.{dev,test,release}`. `VITE_APP_BASE_URL` becomes Vite `base`; sourcemaps are full in dev/test and `'hidden'` in release. `@vitejs/plugin-legacy` targets `Android>44 / iOS>8 / Safari>8`. A custom `crossoriginPlugin` rewrites every `<link>`/`<script>` in `index.html` to add `crossorigin="anonymous"` (needed for the CDN host).

## Conventions worth knowing

- This is a **Vue 2.7** project — when generating components, use Composition API (`setup()` returning bindings) but stay on Vue 2 syntax (`Vue.extend`, options-style `props`/`emits` in `defineComponent`, no Vue 3-only APIs like `<script setup>` macros, `defineModel`, etc.).
- Sizes in CSS should be authored in `px` against a 375-wide design and let postcss convert. Add `no-vw` class on elements that must stay pixel-perfect (e.g. 1px borders).
- New API calls should go through `@/apis/http` so error reporting stays consistent.
