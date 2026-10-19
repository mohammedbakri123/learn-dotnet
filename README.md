# Raff Backend Academy

An interactive, static curriculum for learning modern .NET backend development — **ASP.NET Core Web APIs** and **Entity Framework Core** — through the codebase of [**Raff**](https://github.com/mohammedbakri123/Raff), a small book-tracking Web API.

Every lesson, knowledge check, lab, and assessment walks through real patterns from the reference project: controllers and DTO contracts, `BooksContext` change tracking, LINQ translation to PostgreSQL, relationship loading strategies, N+1 detection, and more.

> **Reference project:** [mohammedbakri123/Raff](https://github.com/mohammedbakri123/Raff) — an ASP.NET Core 10 + EF Core + PostgreSQL API. The curriculum is written against this codebase, so the code shown in lessons (controllers, services, `BooksContext`, migrations) maps directly to the Raff repository.

## Curriculum

| # | Module | What it covers |
|---|--------|----------------|
| 1 | **ASP.NET Core Web APIs** | HTTP semantics, routing and route constraints, controllers, model binding, DTO contracts, status codes, PUT vs PATCH, over-posting protection |
| 2 | **EF Core Internals & Querying** | DbContext lifetime, change tracking and entity states, `Update()` pitfalls, no-tracking queries, identity resolution, `SaveChangesAsync` semantics, deferred execution, client vs server evaluation, DTO projection, SQL inspection |
| 3 | **EF Core Relationships & Query Performance** | Navigation properties, loading strategies, N+1, cartesian fan-out, shadow foreign keys, relationship fix-up, `AsSplitQuery`, projections |

Each module is fully self-contained: lessons, interactive simulators, knowledge checks, a final assessment, and local progress tracking.

## Running locally

No build step — the site is plain HTML/CSS/JavaScript. Serve the repository root and open it in a browser:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

(Opening `index.html` directly from disk works too.)

## Features

- **Progress tracking** — lesson completions, quiz answers, and assessment scores are saved to `localStorage` per module.
- **Export / Import** — back up progress to a JSON file and move it between machines.
- **Search** — `Ctrl+K` searches lessons, topics, exercises, and glossary terms.
- **Glossary** — searchable terms with category filters on every module page.
- **Theming** — light/dark mode, remembered across pages.
- **Languages** — English (default) and Arabic with full RTL layout.

## Repository structure

```
learn-dotnet/
├── index.html              # Hub — module picker
├── data/                   # Module content: lessons, questions, glossary, search index
│   ├── modules.js          # Module registry (title, file, storage key)
│   └── module-0X.js        # Per-module content data
├── pages/                  # Module pages (module-0X.html) + bespoke page scripts
└── component/
    ├── core/               # Shared runtime: content shell, ui, search, glossary, progress, i18n
    └── styles/             # Design tokens, shell, components, RTL overrides
```

## Using it alongside Raff

The lessons are written so you can follow along in the reference API:

1. Clone [Raff](https://github.com/mohammedbakri123/Raff) next to this repository.
2. Follow the Raff README to configure the PostgreSQL connection string via user secrets.
3. Run the API with `dotnet run` and inspect the endpoints (Swagger/Scalar are mapped in development) while you work through the modules.
