# Pulse Marketing: handoff for Claude Code

Marketing dashboard that connects social accounts, composes and schedules posts, drafts inbox replies and runs automation rules. Currently all mock data.

## State (2026-11-14)
- Stack: Next.js 16 (Turbopack), Tailwind v4, static export (`output: "export"`, trailingSlash). Routes live at `/dashboard/` etc.
- Pages: dashboard, accounts, calendar, compose, inbox, analytics, automations, settings.
- Data: `lib/mock-data.ts` (accounts, posts, inbox), `lib/store.ts` (localStorage posts). `prisma/schema.prisma` is unused groundwork (Prisma 8 CLI differs from the old `generate`/`db push` commands; check `npx prisma --help`).
- Desktop: `electron/main.js`, `npm run build:exe` -> `dist/Pulse Marketing Setup 0.1.0.exe`.
- Android: Capacitor; `android/` is gitignored and regenerated in CI (`.github/workflows/build-apk.yml`). No local Android SDK. APK comes from GitHub Actions artifact.
- Repo: https://github.com/ZWITG/pulse-marketing (gh logged in as ZWITG). Large pushes timed out over HTTP; keep dist/android out of git.

## Design
Following the design-taste-frontend skill, app-screen mode, style `accent-ladder`: DM Sans, raspberry accent #b8336a on small marks only, open-plane 230px sidebar, flat KPI strip, no gradients/shadows/emoji. Dashboard, inbox and sidebar are done; the other pages were being restyled to match. Direction saved in `C:\Users\zwivh\.taste-skill\direction.json`.

## Known issues
- Tailwind `@custom-variant`/`@theme` warnings under Turbopack are cosmetic for now, but check that dark mode actually works.
- Sidebar workspace is now "Fieldnote Studio" (sample name). All 8 pages are restyled; tsc and `npm run build` pass (2026-11-14).
- Turbopack dev server can go stale and stop serving new CSS (touching files does not help): kill the process on :3000 and restart `npm run dev`.
- Build modes: `PULSE_STATIC=1` (via `npm run build:web`) = static export for Electron/Capacitor/APK; plain `next build` = server build with API routes. Route handlers must be named `route.server.ts` so the static build ignores them. `/api/posts/` (GET, POST) stores to `~/.pulse-marketing/posts.json` (override with PULSE_DATA_DIR; kept outside the project because the dev watcher reloads the page on writes inside it; see `lib/db.server.ts`); the UI still uses localStorage and is not wired to it yet.
- APK workflow fixed 2026-11-14 (static build, runner's own Android SDK); the exe was rebuilt.
- Dev server runs on :3000 (`npm run dev`); on Windows PowerShell there is no `&&`, `grep`, `tail` or `head`.

## Real posting (2026-11-14)
Server build publishes to X (OAuth 1.0a keys) and LinkedIn (pasted token) from `lib/publishers.server.ts`; `/api/posts/` publishes now or queues; `scripts/scheduler.mjs` (`npm run scheduler`) calls `/api/publish-due/` each minute. Setup steps are in `SETUP-POSTING.md`; keys go in `.env.local`. Not yet tested against the live X/LinkedIn APIs (no keys). Instagram/TikTok/YouTube return "not supported yet". Static builds (Pages, exe, APK) keep posts in the browser only.

## Next
1. Add keys and test X and LinkedIn live; then Instagram, TikTok, YouTube publishers; a real DB; hosting for the server build.
3. Replace mock data and AI caption/reply stubs with real calls.
