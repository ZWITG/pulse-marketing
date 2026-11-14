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
- Sidebar says "Acme Corp workspace" (placeholder; the design skill forbids Acme).
- Dev server runs on :3000 (`npm run dev`); on Windows PowerShell there is no `&&`, `grep`, `tail` or `head`.

## Next
1. Finish restyling remaining pages; verify at 1440 and 390 widths.
2. Real backend: OAuth for Instagram/X/LinkedIn/TikTok, DB, job queue for scheduled posts (static export must be dropped for API routes).
3. Replace mock data and AI caption/reply stubs with real calls.
