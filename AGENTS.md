# AGENTS.md — Lumen Project Instructions

## Identity

Lumen is a multi-tenant SaaS scheduling platform. This is a learning project — the developer is mastering ASP.NET Core and modern frontend architecture. Quality of understanding matters more than speed.

## Active Scope

Build ONLY for: `apps/dashboard`, `apps/booking-portal`, and `backend/`.
Do NOT build: `apps/marketing`, `apps/platform-admin`.

## Architecture Rules

- Monorepo: pnpm workspaces + Turborepo
- Frontend: React 19, TypeScript strict, Tailwind CSS v4
- Backend: ASP.NET Core 9, Clean Architecture (Api → Application → Domain ← Infrastructure)
- Dependencies point inward. Domain NEVER imports Infrastructure or Api.
- Multi-tenant: every data operation must be tenant-scoped.

## Code Rules

- Max 300 lines per file. Refactor immediately if exceeded.
- Max 50 lines per function.
- Max nesting depth: 3.
- No TypeScript `any`. Ever.
- No hardcoded URLs, API keys, or environment-specific values.
- Use `Result<T>` for error handling, not exceptions for control flow.
- Use conventional commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`.

## Design System

- Shared tokens in `packages/design-tokens/` (Tailwind v4 `@theme` syntax)
- Colors: sage green primary, warm gold accent, warm gray neutrals
- Fonts: Sora (headings), Manrope (body), JetBrains Mono (code)
- Do NOT build UI components in isolation. Build them inside pages, then extract when patterns repeat.

## Curriculum

The `curriculum/` folder contains ASP.NET learning docs. It is gitignored.
**Critical rule:** Write the curriculum chapter BEFORE implementing the concept in code.

## Project Structure

```
Lumen/
├── apps/dashboard/           # Vite + React (port 3002)
├── apps/booking-portal/      # Next.js 15 (port 3001)
├── packages/design-tokens/   # CSS tokens
├── packages/shared-types/    # Domain types
├── packages/utils/           # Shared utilities
├── packages/eslint-config/   # ESLint rules
├── packages/typescript-config/ # Shared tsconfigs
├── backend/src/Lumen.Api/
├── backend/src/Lumen.Application/
├── backend/src/Lumen.Domain/
├── backend/src/Lumen.Infrastructure/
├── backend/src/Lumen.Shared/
├── backend/tests/
├── curriculum/               # Learning docs (gitignored)
└── docker-compose.yml        # PostgreSQL + Redis
```

## Commands

```bash
pnpm dev          # All frontend apps
pnpm build        # Build all
dotnet build backend/Lumen.sln
docker compose up -d
```
