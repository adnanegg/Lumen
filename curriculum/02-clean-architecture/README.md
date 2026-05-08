# Chapter 2: Clean Architecture

## Why Clean Architecture?

Clean Architecture ensures your **business logic is independent** of frameworks, databases, and UI. This means:

- You can swap PostgreSQL for MongoDB without touching business logic
- You can test business rules without a database
- You can change your API framework without rewriting your domain

## The Layers

```
┌─────────────────────────────────────────┐
│              Lumen.Api                  │  ← HTTP, Controllers, Middleware
│         (Presentation Layer)            │
├─────────────────────────────────────────┤
│          Lumen.Infrastructure           │  ← EF Core, Redis, SignalR, Email
│         (Infrastructure Layer)          │
├─────────────────────────────────────────┤
│          Lumen.Application              │  ← Use cases, CQRS, DTOs, Interfaces
│          (Application Layer)            │
├─────────────────────────────────────────┤
│            Lumen.Domain                 │  ← Entities, Value Objects, Events
│           (Domain Layer)                │
├─────────────────────────────────────────┤
│            Lumen.Shared                 │  ← Cross-cutting: Result types, Guards
│          (Shared Kernel)                │
└─────────────────────────────────────────┘
```

## The Dependency Rule

**Dependencies point INWARD. Always.**

```
Api → Application → Domain
Infrastructure → Application → Domain
                        ↓
                    Shared (used by all)
```

### What This Means in Practice

| Layer | Can Reference | Cannot Reference |
|---|---|---|
| **Domain** | Shared | Application, Infrastructure, Api |
| **Application** | Domain, Shared | Infrastructure, Api |
| **Infrastructure** | Domain, Application, Shared | Api |
| **Api** | Application, Infrastructure, Shared | — |

### ⚠️ Critical Rule

**Domain NEVER imports Infrastructure.**

The Domain defines *interfaces* (contracts). Infrastructure *implements* them.

```csharp
// ✅ In Lumen.Domain (or Application):
public interface IBookingRepository
{
    Task<Booking?> GetByIdAsync(Guid id);
    Task CreateAsync(Booking booking);
}

// ✅ In Lumen.Infrastructure:
public class PostgresBookingRepository : IBookingRepository
{
    private readonly AppDbContext _db;

    public async Task<Booking?> GetByIdAsync(Guid id)
        => await _db.Bookings.FindAsync(id);
}
```

## Layer Responsibilities

### Lumen.Domain

The **innermost layer**. Pure business logic.

Contains:
- **Entities** — Business objects with identity (Booking, Customer, Staff)
- **Value Objects** — Immutable objects without identity (Money, TimeSlot)
- **Domain Events** — Things that happened (BookingCreated, PaymentReceived)
- **Enums** — Business-specific enumerations (BookingStatus)

Rules:
- No framework dependencies
- No database awareness
- No HTTP awareness
- Must be pure and testable

### Lumen.Application

The **orchestration layer**. Coordinates use cases.

Contains:
- **Commands & Queries** (CQRS) — CreateBookingCommand, GetBookingsQuery
- **Handlers** — Business logic orchestration
- **DTOs** — Data transfer objects for API responses
- **Interfaces** — Contracts for repositories and services
- **Validators** — Input validation (Zod equivalent)

### Lumen.Infrastructure

The **implementation layer**. All external concerns.

Contains:
- **EF Core** — DbContext, migrations, repositories
- **Redis** — Cache implementations
- **SignalR** — Real-time hubs
- **Email** — SMTP implementations
- **Hangfire** — Background job configuration

### Lumen.Api

The **outermost layer**. HTTP surface.

Contains:
- **Controllers** — Route handlers
- **Middleware** — Request/response pipeline
- **Filters** — Cross-cutting HTTP concerns
- **Program.cs** — Application entry point

### Lumen.Shared

**Cross-cutting utilities** used by all layers.

Contains:
- **Result<T>** — Operation result type (no exceptions for flow control)
- **Guard clauses** — Input validation helpers
- **Constants** — Shared constants

## Lumen's Project References

This is how we enforce the dependency rule via `.csproj` references:

```
Lumen.Api.csproj
  → Lumen.Application
  → Lumen.Infrastructure
  → Lumen.Shared

Lumen.Application.csproj
  → Lumen.Domain
  → Lumen.Shared

Lumen.Infrastructure.csproj
  → Lumen.Domain
  → Lumen.Application
  → Lumen.Shared

Lumen.Domain.csproj
  → (nothing — it's the core)
```

## Key Concepts to Remember

1. **Dependencies point inward** — outer layers depend on inner layers, never the reverse
2. **Domain is pure** — no frameworks, no databases, just business rules
3. **Interfaces live in Application/Domain** — implementations live in Infrastructure
4. **DI wires everything** — at startup (Program.cs), we register implementations
5. **This enables testing** — mock Infrastructure, test Application logic in isolation

---

*Previous: [Chapter 1 — ASP.NET Core Basics](../01-aspnet-core-basics/README.md)*
*Next: [Chapter 3 — Entity Framework Core](../03-entity-framework/README.md) (coming with Phase 4)*
