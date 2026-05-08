# Lumen

A production-grade, multi-tenant SaaS platform for appointment-based and operational service businesses.

## Architecture

```
Lumen/
├── apps/                    # Frontend applications
│   ├── marketing/           # Next.js — SEO, acquisition (port 3000)
│   ├── dashboard/           # Vite + React — Business operations (port 3002)
│   ├── booking-portal/      # Next.js — Public booking (port 3001)
│   └── platform-admin/      # Vite + React — Internal admin (port 3003)
├── packages/                # Shared frontend packages
│   ├── design-tokens/       # CSS variables, color, typography tokens
│   ├── eslint-config/       # Shared ESLint flat config
│   ├── typescript-config/   # Shared TypeScript configs
│   ├── shared-types/        # Cross-app TypeScript types
│   └── utils/               # Shared utility functions
├── backend/                 # ASP.NET Core 9 (Clean Architecture)
│   ├── src/
│   │   ├── Lumen.Api/
│   │   ├── Lumen.Application/
│   │   ├── Lumen.Domain/
│   │   ├── Lumen.Infrastructure/
│   │   └── Lumen.Shared/
│   └── tests/
├── curriculum/              # ASP.NET learning documentation
└── docs/                    # Project documentation
```

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, TailwindCSS v4 |
| Monorepo | pnpm workspaces + Turborepo |
| Marketing & Booking | Next.js 15 (App Router) |
| Dashboard & Admin | Vite 8 |
| Backend | ASP.NET Core 9, EF Core, PostgreSQL |
| Caching | Redis |
| Real-time | SignalR |

## Getting Started

### Prerequisites

- Node.js >= 20
- pnpm >= 10
- .NET 9 SDK
- Docker (for PostgreSQL + Redis)

### Setup

```bash
# Install frontend dependencies
pnpm install

# Start infrastructure
docker compose up -d

# Start all frontend apps
pnpm dev

# Build backend
dotnet build backend/Lumen.sln
```

## License

Proprietary — All rights reserved.
