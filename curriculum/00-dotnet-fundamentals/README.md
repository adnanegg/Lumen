# Chapter 0: .NET Fundamentals

## What is .NET?

.NET is a **free, open-source, cross-platform development platform** maintained by Microsoft. It's the foundation that powers our Lumen backend.

Think of .NET as an ecosystem consisting of:

1. **CLR (Common Language Runtime)** — The virtual machine that executes your code
2. **BCL (Base Class Library)** — Built-in libraries (collections, IO, networking, etc.)
3. **SDK (Software Development Kit)** — The toolchain (`dotnet` CLI, compilers, etc.)

## .NET vs .NET Framework vs .NET Core

| | .NET Framework | .NET Core | .NET 5+ |
|---|---|---|---|
| Platform | Windows only | Cross-platform | Cross-platform |
| Status | Legacy (maintenance only) | Evolved into .NET 5+ | **Current** |
| Open Source | Partially | Yes | Yes |

**Key takeaway:** When we say ".NET 9" (what Lumen uses), we mean the modern, cross-platform version. The old ".NET Framework" is legacy.

## The `dotnet` CLI

The primary tool for .NET development. Here's what we used to scaffold Lumen:

```bash
# Create a new solution (a container for multiple projects)
dotnet new sln -n Lumen -o backend

# Create a Web API project
dotnet new webapi -n Lumen.Api -o backend/src/Lumen.Api

# Create a class library (no HTTP, just code)
dotnet new classlib -n Lumen.Domain -o backend/src/Lumen.Domain

# Add a project to the solution
dotnet sln backend/Lumen.sln add backend/src/Lumen.Api/Lumen.Api.csproj

# Add a project reference (dependency)
dotnet add backend/src/Lumen.Api reference backend/src/Lumen.Application
```

## Project Structure

Every .NET project has a `.csproj` file — this is its manifest (like `package.json` in Node.js):

```xml
<Project Sdk="Microsoft.NET.Sdk.Web">
  <PropertyGroup>
    <TargetFramework>net9.0</TargetFramework>
  </PropertyGroup>

  <!-- Dependencies on other projects -->
  <ItemGroup>
    <ProjectReference Include="..\Lumen.Application\Lumen.Application.csproj" />
  </ItemGroup>
</Project>
```

## Solutions vs Projects

| Concept | Node.js Equivalent | Purpose |
|---|---|---|
| **Solution** (`.sln`) | `pnpm-workspace.yaml` | Groups multiple projects together |
| **Project** (`.csproj`) | `package.json` | A single buildable unit |

## Building & Running

```bash
# Build the entire solution
dotnet build backend/Lumen.sln

# Run a specific project
dotnet run --project backend/src/Lumen.Api

# Run tests
dotnet test backend/Lumen.sln
```

## Key Concepts to Remember

1. **.NET is the runtime** — it compiles C# into IL (Intermediate Language), then JIT-compiles to native code
2. **The SDK includes everything** — compiler, runtime, CLI, package manager (NuGet)
3. **NuGet** is the package manager (like npm for .NET)
4. **A solution groups projects** — Lumen has 7 projects in one solution
5. **Projects reference each other** — this is how we enforce architectural layers

---

*Next: [Chapter 1 — ASP.NET Core Basics](../01-aspnet-core-basics/README.md)*
