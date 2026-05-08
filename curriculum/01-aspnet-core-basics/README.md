# Chapter 1: ASP.NET Core Basics

## What is ASP.NET Core?

ASP.NET Core is a **web framework built on top of .NET**. It handles HTTP requests, routing, middleware, dependency injection, and more.

If .NET is the engine, ASP.NET Core is the car built around it.

## The Request Pipeline

Every HTTP request in ASP.NET Core flows through a **middleware pipeline**:

```
Request → [Middleware 1] → [Middleware 2] → [Middleware N] → Endpoint → Response
```

Each middleware can:
- **Process the request** (logging, auth, etc.)
- **Short-circuit** (return early, e.g., for unauthorized requests)
- **Pass to next** middleware in the chain

### Example: Lumen's `Program.cs`

```csharp
var builder = WebApplication.CreateBuilder(args);

// 1. REGISTER SERVICES (Dependency Injection container)
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// 2. CONFIGURE MIDDLEWARE PIPELINE (order matters!)
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

// 3. RUN
app.Run();
```

## Dependency Injection (DI)

ASP.NET Core has **built-in DI**. This is central to Clean Architecture.

### The Pattern

Instead of creating dependencies directly:
```csharp
// ❌ Bad: tightly coupled
public class BookingService
{
    private readonly PostgresBookingRepo _repo = new PostgresBookingRepo();
}
```

Inject them through the constructor:
```csharp
// ✅ Good: depends on abstraction
public class BookingService
{
    private readonly IBookingRepository _repo;

    public BookingService(IBookingRepository repo)
    {
        _repo = repo;
    }
}
```

### Registration

Services are registered in `Program.cs`:
```csharp
// Transient: new instance every time
builder.Services.AddTransient<IEmailSender, SmtpEmailSender>();

// Scoped: one instance per HTTP request
builder.Services.AddScoped<IBookingRepository, PostgresBookingRepo>();

// Singleton: one instance for the entire application lifetime
builder.Services.AddSingleton<ICacheService, RedisCacheService>();
```

### Service Lifetimes Cheat Sheet

| Lifetime | Created | Destroyed | Use For |
|---|---|---|---|
| **Transient** | Every injection | After use | Lightweight, stateless |
| **Scoped** | Once per request | End of request | DB contexts, repos |
| **Singleton** | Once (ever) | App shutdown | Caches, config |

## Configuration

ASP.NET Core uses a layered configuration system:

```
appsettings.json          ← base config
appsettings.Development.json  ← overrides for dev
Environment variables     ← overrides everything
User secrets              ← sensitive data (dev only)
```

Access configuration:
```csharp
// In Program.cs
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// Via Options pattern (preferred)
builder.Services.Configure<SmtpSettings>(
    builder.Configuration.GetSection("Smtp"));
```

## Environments

ASP.NET Core supports multiple environments out of the box:

- `Development` — local dev, detailed errors
- `Staging` — pre-production testing
- `Production` — live, optimized

Set via `ASPNETCORE_ENVIRONMENT` environment variable.

## Key Concepts to Remember

1. **Middleware order matters** — auth must come before authorization
2. **DI is first-class** — everything flows through the container
3. **Configuration is layered** — env-specific files override base
4. **Program.cs is the entry point** — registers services and configures the pipeline
5. **Controllers handle HTTP** — they map routes to actions

---

*Previous: [Chapter 0 — .NET Fundamentals](../00-dotnet-fundamentals/README.md)*
*Next: [Chapter 2 — Clean Architecture](../02-clean-architecture/README.md)*
