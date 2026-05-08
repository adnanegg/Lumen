# Lumen — Project Context for AI Agents

## What Is This Project?

Lumen is a **multi-tenant SaaS platform** for appointment-based businesses (clinics, salons, gyms, etc.). It is primarily a **learning project** — the developer is using it to master ASP.NET Core, Clean Architecture, and production-grade frontend patterns through hands-on experimentation.

**This is NOT a startup MVP.** The goal is to simulate a real production codebase and deeply learn every pattern used. There is no rush to ship. Quality of understanding > speed of delivery.

## The Golden Rule

**The curriculum drives development.** Before implementing any concept (EF Core, multi-tenancy, CQRS, etc.), the corresponding curriculum chapter must be written FIRST, explaining the "why" before the "how." Code and curriculum move together.

## Active Development Scope

Only these surfaces are under active development:

| App | Tech | Purpose |
|---|---|---|
| `apps/dashboard` | Vite + React 19 | Business operations (main product) |
| `apps/booking-portal` | Next.js 15 | Public booking for end customers |
| `backend/` | ASP.NET Core 9 | API, business logic, data layer |

**Deferred (scaffolds exist, don't build):**
- `apps/marketing` — No product to market yet
- `apps/platform-admin` — No tenants to administrate yet

## Architecture

### Frontend Monorepo

```
apps/
  dashboard/          → Vite + React 19 (port 3002)
  booking-portal/     → Next.js 15 (port 3001)
packages/
  design-tokens/      → CSS variables via Tailwind v4 @theme
  eslint-config/      → Shared ESLint flat config (300-line limit, no-any)
  typescript-config/  → Shared tsconfigs (base, nextjs, vite-react)
  shared-types/       → Domain TypeScript types
  utils/              → Formatting, date, validation helpers
  ui/                 → Component library (built incrementally, NOT upfront)
```

Managed by **pnpm workspaces + Turborepo**.

### Backend (Clean Architecture)

```
backend/src/
  Lumen.Api/            → Controllers, middleware, HTTP surface
  Lumen.Application/    → Use cases, CQRS handlers, DTOs, interfaces
  Lumen.Domain/         → Entities, value objects, domain events (PURE)
  Lumen.Infrastructure/ → EF Core, Redis, SignalR implementations
  Lumen.Shared/         → Cross-cutting: Result types, guards
```

**Dependency rule:** Dependencies point INWARD. Domain never imports Infrastructure or Api.

### Design Tokens

All apps share a unified visual language via `@lumen/design-tokens`:
- Primary: deep sage green
- Accent: warm gold
- Neutral: warm gray
- Blue: restrained system blue
- Typography: Sora (headings), Manrope (body), JetBrains Mono (code)

## Strict Engineering Rules

These rules are NON-NEGOTIABLE. Every agent must follow them:

1. **300-line file limit** — No source file exceeds 300 lines. Refactor immediately.
2. **50-line function limit** — No function exceeds 50 lines.
3. **Max nesting depth: 3** — No deeply nested code.
4. **No `any`** — TypeScript `any` is forbidden. Use proper types.
5. **No hardcoded config** — URLs, keys, env-specific values must be injected.
6. **Dependencies point inward** — Domain never imports Infrastructure, Api, or frameworks.
7. **Validate at boundaries** — Input validation happens at API endpoints and controllers, not in domain logic.
8. **Consistent error handling** — Use the `Result<T>` pattern, not exceptions for flow control.
9. **Conventional commits** — All commits must follow conventional commit format (`feat:`, `fix:`, `chore:`, etc.)

## Development Approach

### Design System Strategy

Do NOT build components in isolation first. Build pages, then extract components as patterns emerge. Add extracted components to Storybook after they work in context.

### Multi-Tenancy

Multi-tenancy is a core learning objective. Every data query must be tenant-scoped. Tenant isolation is enforced at the infrastructure layer.

### Curriculum-Driven Development

The `curriculum/` folder contains chapter-by-chapter ASP.NET learning documentation. It is gitignored (personal learning notes).

**Workflow:**
1. Write the curriculum chapter explaining the concept
2. Implement the concept in code
3. Reference actual Lumen code in the chapter

### Learning Milestones (Phased)

Development follows learning milestones, not feature milestones:

1. ✅ Infrastructure (monorepo, tooling, project scaffolding)
2. First EF Core models + migrations (Services CRUD)
3. Authentication (ASP.NET Identity + JWT)
4. Multi-tenancy infrastructure
5. Dashboard pages (Services, Staff, Customers)
6. Booking engine (availability, slot calculation)
7. Booking portal (public booking flow)
8. Real-time (SignalR calendar updates)
9. Background jobs (reminders, notifications)
10. Payments integration

## Tech Stack Reference

### Frontend
- React 19, TypeScript (strict), Tailwind CSS v4
- TanStack Query v5 (server state), Zustand (client state)
- React Hook Form + Zod (forms/validation)
- TanStack Table v8 (tables), React Aria (accessibility/dates)
- Framer Motion (subtle animations), Vitest (testing)

### Backend
- ASP.NET Core 9, EF Core (PostgreSQL), Redis
- MediatR (CQRS), SignalR (real-time), Hangfire (background jobs)
- ASP.NET Identity + JWT (auth), xUnit (testing)

### Infrastructure
- pnpm + Turborepo (monorepo)
- Docker Compose (PostgreSQL 17 + Redis 7)
- Husky + lint-staged + commitlint (quality gates)

## Common Commands

```bash
pnpm dev                          # Start all frontend apps
pnpm build                        # Build all frontend apps
pnpm lint                         # Lint all packages
dotnet build backend/Lumen.sln    # Build .NET backend
dotnet run --project backend/src/Lumen.Api  # Run API
docker compose up -d              # Start PostgreSQL + Redis
```

## What NOT To Do

- Do NOT build marketing or platform-admin pages
- Do NOT build components in isolation before they're needed in a page
- Do NOT skip writing the curriculum chapter before implementing a concept
- Do NOT use `any` in TypeScript
- Do NOT put business logic in controllers or UI components
- Do NOT hardcode environment-specific values
- Do NOT create files exceeding 300 lines
