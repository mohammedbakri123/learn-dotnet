/* ============================================================
   Raff Backend Academy — Module 5 — Services, Dependency
   Injection, and Application Architecture
   Data: glossary, knowledge checks, lesson meta, assessment,
   widget datasets, and lesson content blocks.
   Loaded before the shared components and the page script.
   ============================================================ */

const STORAGE_KEY = "raff_aspnet_module_05_state";
const APP_MARKER = "raff-aspnet-module-05";

/* ---------------- glossary ---------------- */

const GLOSSARY = [
  {
    t: "Separation of concerns",
    c: "Architecture",
    l: "lesson-1",
    d: "Organizing code so that each part has one clear reason to change. HTTP handling, application use cases, and persistence are different concerns, even when one request touches all three."
  },
  {
    t: "Application service",
    c: "Architecture",
    l: "lesson-2",
    d: "A class that implements a meaningful use case by coordinating business rules, persistence, and other dependencies. It returns application-level data and outcomes, not HTTP responses."
  },
  {
    t: "Dependency injection",
    c: "DI fundamentals",
    l: "lesson-3",
    d: "A technique in which a component receives the dependencies it needs from outside instead of constructing them itself. In ASP.NET Core the built-in container supplies registered services through constructors."
  },
  {
    t: "Dependency inversion",
    c: "DI fundamentals",
    l: "lesson-3",
    d: "The principle that high-level policy should not depend directly on low-level implementation details. Both can depend on an abstraction, which lets details change without rewriting the policy."
  },
  {
    t: "Constructor injection",
    c: "DI fundamentals",
    l: "lesson-3",
    d: "Supplying a class's dependencies through its constructor. The container reads the constructor signature, resolves each parameter, and constructs the object graph."
  },
  {
    t: "Service registration",
    c: "DI fundamentals",
    l: "lesson-3",
    d: "Adding a service descriptor to IServiceCollection — for example AddScoped<IBookService, BookService>(). Registration describes how to create a service; it does not create one immediately."
  },
  {
    t: "Service resolution",
    c: "DI fundamentals",
    l: "lesson-3",
    d: "Asking an IServiceProvider for an instance of a registered service. Resolution can happen once at the composition root or indirectly when the container constructs another service."
  },
  {
    t: "IServiceCollection",
    c: "DI fundamentals",
    l: "lesson-3",
    d: "The collection of ServiceDescriptor registrations used to configure the built-in container. builder.Services is an IServiceCollection; the provider is created later from it."
  },
  {
    t: "Composition root",
    c: "DI fundamentals",
    l: "lesson-3",
    d: "The single place in an application where the object graph is configured and the container is built. In ASP.NET Core this is normally Program.cs."
  },
  {
    t: "Service locator",
    c: "DI fundamentals",
    l: "lesson-3",
    d: "Resolving dependencies from a container inside business code instead of having them injected. It hides dependencies and makes classes harder to test and reason about."
  },
  {
    t: "Transient",
    c: "Lifetimes",
    l: "lesson-4",
    d: "A lifetime in which the container generally creates a new instance each time the service is resolved. If a consumer resolves once and calls methods repeatedly, it still uses that same instance."
  },
  {
    t: "Scoped",
    c: "Lifetimes",
    l: "lesson-4",
    d: "A lifetime in which one instance is reused within a given DI scope. ASP.NET Core typically creates one scope per HTTP request, so scoped services usually live for that request."
  },
  {
    t: "Singleton",
    c: "Lifetimes",
    l: "lesson-4",
    d: "A lifetime in which one instance is reused for the lifetime of the root service provider, which normally means the application's lifetime. Registration does not make the service thread-safe."
  },
  {
    t: "Captive dependency",
    c: "Lifetimes",
    l: "lesson-5",
    d: "A longer-lived service that holds a shorter-lived dependency, keeping it alive beyond its intended scope. The classic example is a singleton holding a scoped DbContext."
  },
  {
    t: "Lifetime mismatch",
    c: "Lifetimes",
    l: "lesson-5",
    d: "A configuration where a service's effective lifetime is incompatible with a dependency's lifetime. Scope validation often reports it as a captive dependency error."
  },
  {
    t: "Root service provider",
    c: "Lifetimes",
    l: "lesson-4",
    d: "The IServiceProvider created when the application is built. Singleton services belong to it; resolving a scoped service directly from it is normally a mistake."
  },
  {
    t: "DI scope",
    c: "Lifetimes",
    l: "lesson-4",
    d: "A bounded resolution context that reuses scoped instances and disposes scoped IDisposable services when the scope ends. ASP.NET Core opens a scope per request."
  },
  {
    t: "IServiceScopeFactory",
    c: "Lifetimes",
    l: "lesson-5",
    d: "A singleton service that creates new IServiceScope instances. Singleton code such as a background worker uses it to resolve scoped services safely."
  },
  {
    t: "BackgroundService",
    c: "Lifetimes",
    l: "lesson-5",
    d: "A base class for long-running hosted services. It is registered as a singleton, so it must create a scope explicitly when it needs scoped dependencies."
  },
  {
    t: "IDbContextFactory",
    c: "EF Core & persistence",
    l: "lesson-5",
    d: "A factory that creates independent DbContext instances on demand. It is useful when singleton or background code needs one context per unit of work and explicit disposal."
  },
  {
    t: "DbContext",
    c: "EF Core & persistence",
    l: "lesson-5",
    d: "EF Core's unit-of-work and query gateway. AddDbContext normally registers it as scoped, and it is not thread-safe; separate concurrent operations need separate contexts."
  },
  {
    t: "Unit of Work",
    c: "Patterns",
    l: "lesson-6",
    d: "A pattern that tracks changes during a use case and commits them as one logical unit. EF Core's DbContext already provides this behavior through change tracking and SaveChangesAsync."
  },
  {
    t: "Repository pattern",
    c: "Patterns",
    l: "lesson-6",
    d: "An abstraction over data access that exposes domain-oriented operations. It can encapsulate meaningful queries or isolate persistence, but it is not mandatory in every application."
  },
  {
    t: "Generic repository",
    c: "Patterns",
    l: "lesson-6",
    d: "A reusable repository for any entity, usually exposing basic CRUD. It reduces repetition but can hide useful EF Core capabilities such as query composition, projections, and bulk operations."
  },
  {
    t: "Abstraction",
    c: "Architecture",
    l: "lesson-6",
    d: "A boundary that hides implementation details behind a contract. A useful abstraction has a concrete purpose; an unnecessary one adds indirection without reducing real complexity."
  },
  {
    t: "Result object",
    c: "Architecture",
    l: "lesson-2",
    d: "A return value that represents success and expected failures explicitly. It lets the caller handle outcomes with normal control flow instead of catching exceptions for predictable cases."
  }
];

/* ---------------- knowledge checks ---------------- */

const KNOWLEDGE_CHECKS = [
  {
    id: "kc-1-1",
    group: "lesson-1",
    prompt: "Which of these responsibilities belongs in the controller rather than an application service?",
    options: [
      "Checking whether a book still has reading entries",
      "Mapping a `NotFound` outcome to a 404 response",
      "Loading a book and deleting it as one use case",
      "Enforcing a unique index on the reading-entry table"
    ],
    correct: 1,
    explain: "Controllers own HTTP translation: reading the request, calling the use case, and mapping application outcomes to status codes. The existence check is a business rule; the unique index is a database constraint."
  },
  {
    id: "kc-1-2",
    group: "lesson-1",
    prompt: "Why should an application service normally not return `IActionResult`?",
    options: [
      "C# does not allow it outside a controller",
      "It couples the use case to HTTP details and makes the service harder to reuse and test",
      "`IActionResult` cannot be awaited",
      "It prevents dependency injection"
    ],
    correct: 1,
    explain: "A service that returns IActionResult knows about HTTP status codes and response formatting. Keeping HTTP out lets the same use case be called from a controller, a background worker, or a test without faking web types."
  },
  {
    id: "kc-1-3",
    group: "lesson-1",
    prompt: "A rule says a book cannot be deleted while reading entries exist. Where does the rule primarily belong?",
    options: [
      "In the controller action",
      "In an application service, with a database constraint as a backstop",
      "In a validation attribute on the DTO",
      "In middleware"
    ],
    correct: 1,
    explain: "The rule needs current data, so it is an application/business rule. The restricting foreign key is the structural backstop that still holds if two requests race. The controller translates the resulting outcome."
  },
  {
    id: "kc-1-4",
    group: "lesson-1",
    prompt: "Which is the best reason to introduce an application service?",
    options: [
      "The controller action is longer than ten lines",
      "A use case contains meaningful orchestration or business rules that deserve a name and a test",
      "Every action must delegate to a service",
      "To avoid writing interfaces"
    ],
    correct: 1,
    explain: "Length alone is a weak signal. A service earns its place when it names a real use case, owns rules or orchestration, and gives you a meaningful boundary to test. Tiny pass-through wrappers often add indirection without value."
  },

  {
    id: "kc-2-1",
    group: "lesson-2",
    prompt: "`Task<bool> DeleteBookAsync` returns `false`. What does `false` mean?",
    options: [
      "The book was not found",
      "The delete failed for any reason",
      "The contract is ambiguous: it could mean not found or another expected failure",
      "The database is offline"
    ],
    correct: 2,
    explain: "A Boolean has two states but a delete use case may have several expected outcomes. If the caller needs to return 404 for a missing book and 409 for dependent data, `false` cannot communicate the difference. The return type should express the contract."
  },
  {
    id: "kc-2-2",
    group: "lesson-2",
    prompt: "For a single-book lookup, what does `Task<BookDto?>` communicate when it returns `null`?",
    options: [
      "An unexpected exception occurred",
      "The requested book was not found, provided the contract documents that meaning",
      "The request failed validation",
      "The database is offline"
    ],
    correct: 1,
    explain: "A nullable result is a reasonable contract for a lookup: a book is either found or absent. The controller translates `null` to 404. It is less suitable when a use case has several distinguishable failure outcomes."
  },
  {
    id: "kc-2-3",
    group: "lesson-2",
    prompt: "Where should a service's `CancellationToken` come from?",
    options: [
      "Create a new CancellationTokenSource inside every service method",
      "Accept it from the caller and pass it to EF Core operations such as FirstOrDefaultAsync and SaveChangesAsync",
      "Ignore it because EF Core does not support cancellation",
      "Store it in a singleton so every request can use it"
    ],
    correct: 1,
    explain: "The action receives a cancellation token from the framework. Pass it down through the service to asynchronous I/O so a disconnected client can stop work. Do not create a fresh token source per method, and never share one through a singleton."
  },
  {
    id: "kc-2-4",
    group: "lesson-2",
    prompt: "Which statement about expected failures is most accurate?",
    options: [
      "They must always be exceptions",
      "They can be values or exceptions; choose one policy, document it, and translate at the HTTP boundary",
      "They should return 200 with an empty body",
      "They should be swallowed so the caller can retry"
    ],
    correct: 1,
    explain: "Both styles can work. Result values make expected outcomes explicit and compiler-checked; exceptions can be appropriate when a central handler owns the mapping. The important part is consistency and not hiding failures behind success-shaped values."
  },

  {
    id: "kc-3-1",
    group: "lesson-3",
    prompt: "What does `builder.Services.AddScoped<IBookService, BookService>()` do?",
    options: [
      "Creates a `BookService` immediately",
      "Registers a service descriptor; the container creates an instance when the service is resolved",
      "Resolves the service from the root provider",
      "Starts a background thread"
    ],
    correct: 1,
    explain: "Registration only adds a descriptor to IServiceCollection. The provider is built later, and instances are created when something requests the service — directly or because the container is constructing another service."
  },
  {
    id: "kc-3-2",
    group: "lesson-3",
    prompt: "How does constructor injection obtain a class's dependencies?",
    options: [
      "The class calls `new` inside its constructor",
      "The container reads the constructor signature and supplies registered services when constructing the object",
      "The controller reads them from HttpContext",
      "A static factory method looks them up by name"
    ],
    correct: 1,
    explain: "The container inspects the constructor, resolves each parameter from the service graph, and passes the instances in. This is why registering every dependency is part of making the object graph work."
  },
  {
    id: "kc-3-3",
    group: "lesson-3",
    prompt: "When is an interface likely unnecessary for a service?",
    options: [
      "When there is one implementation and no substitution, mocking, or testing seam is needed",
      "Whenever the class is sealed",
      "When the service uses EF Core",
      "When the service is scoped"
    ],
    correct: 0,
    explain: "Interfaces are valuable when they provide a real boundary: multiple implementations, a test seam, or a stable contract across modules. Registering a sealed concrete class directly can be simpler when no such need exists."
  },
  {
    id: "kc-3-4",
    group: "lesson-3",
    prompt: "Where is manually constructing dependencies with `new` most appropriate?",
    options: [
      "Inside every controller action",
      "At the composition root, or for simple value objects and entities",
      "Inside a singleton to create scoped services",
      "In any static helper that needs a database"
    ],
    correct: 1,
    explain: "The composition root owns object construction. `new` is also natural for simple objects that have no container-managed lifetime, such as DTOs, value objects, and entities. Manually constructing services bypasses scope and disposal."
  },

  {
    id: "kc-4-1",
    group: "lesson-4",
    prompt: "A service is registered as transient. It is resolved once and one of its methods is called three times. How many instances were created by those method calls?",
    options: [
      "Three",
      "One — transient controls resolution, not individual method calls",
      "Zero",
      "It depends on the HTTP status code"
    ],
    correct: 1,
    explain: "Transient means a new instance is generally created each time the service is resolved from the container. Calling methods on an instance you already hold does not resolve it again, so all three calls use the same object."
  },
  {
    id: "kc-4-2",
    group: "lesson-4",
    prompt: "A scoped service is resolved twice in scope A and twice in scope B. How many distinct instances exist?",
    options: [
      "One",
      "Two — one per scope",
      "Four",
      "Three"
    ],
    correct: 1,
    explain: "Scoped reuse is per DI scope, not global and not per resolution. Both resolutions in scope A share one instance; scope B has its own. In ASP.NET Core the scope usually corresponds to one request."
  },
  {
    id: "kc-4-3",
    group: "lesson-4",
    prompt: "How should singleton lifetime be described?",
    options: [
      "One instance per HTTP request",
      "One instance per DI scope",
      "One instance per root service provider, normally for the application's lifetime",
      "A new instance on every resolution"
    ],
    correct: 2,
    explain: "Singleton instances live with the root provider. The container creates the first one and reuses it. That says nothing about whether the service is safe to use concurrently — thread safety is the service's own responsibility."
  },
  {
    id: "kc-4-4",
    group: "lesson-4",
    prompt: "Does registering a service as a singleton make it thread-safe?",
    options: [
      "Yes, the container serializes all calls",
      "No — lifetime controls instance reuse, not concurrent access or internal state",
      "Only in ASP.NET Core",
      "Only if it uses BooksContext"
    ],
    correct: 1,
    explain: "DI manages lifetimes, not synchronization. A singleton shared by many requests must be designed for concurrent use: avoid mutable request-specific state, use thread-safe collections or synchronization where needed, and keep it stateless when possible."
  },
  {
    id: "kc-4-5",
    group: "lesson-4",
    prompt: "Which lifetime is the natural default for a request-scoped application service that depends on `BooksContext`?",
    options: [
      "Transient",
      "Scoped",
      "Singleton",
      "Any lifetime; the choice has no effect"
    ],
    correct: 1,
    explain: "A service that depends on a scoped DbContext should normally share that scope. Registering it as scoped makes it live and die with the request scope, matching the context's lifetime and disposal."
  },

  {
    id: "kc-5-1",
    group: "lesson-5",
    prompt: "`AddDbContext<BooksContext>()` normally registers the context with which lifetime?",
    options: [
      "Singleton",
      "Scoped",
      "Transient",
      "As a hosted service"
    ],
    correct: 1,
    explain: "The default DbContext registration is scoped. That fits the common request-oriented unit of work: one context per request scope, disposed when the scope ends. AddDbContextFactory is used when independent contexts are needed."
  },
  {
    id: "kc-5-2",
    group: "lesson-5",
    prompt: "A singleton service's constructor requires a scoped `BooksContext`. What is this pattern called?",
    options: [
      "A valid optimization",
      "A captive dependency — a lifetime mismatch",
      "A transient dependency",
      "A unit of work"
    ],
    correct: 1,
    explain: "The singleton is constructed from the root scope and keeps the context alive for the application's lifetime. The dependency is captive: it lives far longer than its intended scope, which can leak stale state and is unsafe under concurrent requests."
  },
  {
    id: "kc-5-3",
    group: "lesson-5",
    prompt: "What is the correct fix for a singleton `BackgroundService` that needs to query with `BooksContext`?",
    options: [
      "Inject `BooksContext` directly into the background service",
      "Create a scope with `IServiceScopeFactory`, resolve the context inside it, and dispose the scope after the unit of work",
      "Register `BooksContext` as a singleton",
      "Disable scope validation"
    ],
    correct: 1,
    explain: "The hosted service is a singleton, so it creates an explicit scope for each unit of work. Scoped services — including the DbContext — are resolved inside that scope and disposed with it. Making the context a singleton or disabling validation hides the bug instead of fixing it."
  },
  {
    id: "kc-5-4",
    group: "lesson-5",
    prompt: "When you create a `BooksContext` with `IDbContextFactory<BooksContext>`, who disposes it?",
    options: [
      "The factory disposes it automatically after each query",
      "You do — typically with `await using` or `using` around the unit of work",
      "The root provider disposes it at application shutdown",
      "Nobody; DbContext is not disposable"
    ],
    correct: 1,
    explain: "The factory creates a context outside the container's per-scope management. Your code owns its lifetime, so wrap it in `await using` (or `using`) and let it be disposed when the unit of work finishes."
  },
  {
    id: "kc-5-5",
    group: "lesson-5",
    prompt: "Why should one `DbContext` not run two queries concurrently?",
    options: [
      "It is registered as scoped",
      "It is not thread-safe and its change tracker is not designed for concurrent operations",
      "PostgreSQL forbids concurrent queries",
      "Dependency injection blocks it"
    ],
    correct: 1,
    explain: "A DbContext instance is not thread-safe. Awaiting two operations on the same instance at the same time can corrupt state or throw. If work must run in parallel, give each operation its own context — often through a factory."
  },

  {
    id: "kc-6-1",
    group: "lesson-6",
    prompt: "Which EF Core type already provides unit-of-work behavior?",
    options: [
      "DbSet<T>",
      "DbContext",
      "IQueryable<T>",
      "ILogger<T>"
    ],
    correct: 1,
    explain: "DbContext tracks changes and commits them with SaveChanges/SaveChangesAsync, which is the unit-of-work role. DbSet provides repository-like access to an entity set, but the context coordinates the unit of work."
  },
  {
    id: "kc-6-2",
    group: "lesson-6",
    prompt: "When can a focused repository abstraction be justified?",
    options: [
      "Always; every DbSet access must be wrapped",
      "When it encapsulates meaningful queries or isolates a persistence boundary for a concrete need",
      "Only in console applications",
      "When you want to hide every EF Core capability"
    ],
    correct: 1,
    explain: "A focused repository earns its keep when it names and centralizes real queries, supports a genuine substitution need, or isolates persistence for an architectural boundary. A mechanical wrapper around every DbSet usually adds little."
  },
  {
    id: "kc-6-3",
    group: "lesson-6",
    prompt: "What is a common cost of a generic repository?",
    options: [
      "It makes SQL execute faster",
      "It can hide query composition, projection, and EF-specific capabilities behind a lowest-common-denominator API",
      "It eliminates the need for DbContext",
      "It removes the need for dependency injection"
    ],
    correct: 1,
    explain: "A generic CRUD surface cannot expose every useful EF Core feature. Once a use case needs composition, projections, Include, AsNoTracking, or bulk updates, the generic abstraction either leaks those concepts or forces awkward escape hatches."
  },
  {
    id: "kc-6-4",
    group: "lesson-6",
    prompt: "What does adding a custom `IUnitOfWork` that only wraps `DbContext.SaveChangesAsync` usually provide?",
    options: [
      "Guaranteed distributed transactions",
      "Extra indirection unless it provides a concrete benefit; DbContext already commits a unit of work",
      "A requirement of EF Core",
      "A replacement for repositories"
    ],
    correct: 1,
    explain: "A pass-through unit of work does not add new transactional behavior. It can be justified when it coordinates multiple persistence mechanisms or defines a deliberate application boundary, but wrapping SaveChanges for its own sake mostly adds ceremony."
  },

  {
    id: "kc-7-1",
    group: "lesson-7",
    prompt: "What is the best first step in refactoring a controller action?",
    options: [
      "Create a generic repository interface",
      "Identify the use case and list the responsibilities currently in the action",
      "Move all code into a static helper",
      "Add a singleton cache for books"
    ],
    correct: 1,
    explain: "Refactoring starts with understanding, not with a pattern. List what the action does — binding, authorization, business rules, persistence, response mapping — then decide which responsibilities belong behind a service boundary."
  },
  {
    id: "kc-7-2",
    group: "lesson-7",
    prompt: "A `BookService` depends on `BooksContext`. Which lifetime should it normally use?",
    options: [
      "Singleton",
      "Scoped, matching the context's scope",
      "Transient with a static context",
      "No registration is needed"
    ],
    correct: 1,
    explain: "The service should share the request scope with its scoped dependency. Register it with AddScoped so it is constructed and disposed within the same scope as the DbContext."
  },
  {
    id: "kc-7-3",
    group: "lesson-7",
    prompt: "After the refactor, where should HTTP status selection live?",
    options: [
      "In the service, by returning IActionResult",
      "In the controller, translating service outcomes into HTTP responses",
      "In BooksContext",
      "In the DTO's validation attributes"
    ],
    correct: 1,
    explain: "The service should express application outcomes such as Deleted, NotFound, or HasReadingEntries. The controller owns the HTTP mapping: 204, 404, or 409. That keeps the use case transport-agnostic."
  },
  {
    id: "kc-7-4",
    group: "lesson-7",
    prompt: "The service checks for reading entries and returns a conflict, but another request inserts an entry immediately afterward. What remains the backstop?",
    options: [
      "Nothing; the check is always sufficient",
      "The database's restricting foreign key, whose failure must be translated without being swallowed",
      "Returning 200 with a warning",
      "Disabling the constraint during deletes"
    ],
    correct: 1,
    explain: "Application checks produce friendly outcomes; database constraints protect correctness under concurrency. Keep both, catch the expected constraint failure at a boundary, log it, and map it to 409 instead of hiding it."
  }
];

/* ---------------- lesson meta (search + navigation labels) ---------------- */

const LESSON_META = [
  {
    id: "lesson-1",
    label: "Separation of responsibilities",
    keywords: "separation of concerns controller service repository dbcontext responsibilities http use case architecture raff request flow why controllers should not contain everything why services should not return iactionresult dto entity",
    summary: "What belongs in the controller, what belongs in a service, and where the line between useful separation and unnecessary abstraction sits."
  },
  {
    id: "lesson-2",
    label: "Designing application services",
    keywords: "application service use case method naming constructor injection async task cancellationtoken missing resource exception result object bool nullable return contract delete book",
    summary: "Design service contracts around use cases, express outcomes honestly, and let the controller translate them into HTTP."
  },
  {
    id: "lesson-3",
    label: "Dependency injection fundamentals",
    keywords: "dependency injection di constructor injection interfaces iservicecollection registration resolution service provider container composition root new service locator dependency inversion",
    summary: "The path from registration to constructor injection, why the container exists, and when an interface is worth adding."
  },
  {
    id: "lesson-4",
    label: "Service lifetimes",
    keywords: "transient scoped singleton service lifetime di scope request scope root provider instance reuse thread safety lifetime simulator AddTransient AddScoped AddSingleton",
    summary: "Transient, scoped, and singleton explained through resolution behavior, scope boundaries, and the lifetime simulator."
  },
  {
    id: "lesson-5",
    label: "DbContext, captive dependencies & background work",
    keywords: "dbcontext lifetime scoped thread safety captive dependency lifetime mismatch scope validation iservicescopefactory backgroundservice idbcontextfactory dispose adddbcontext worker service",
    summary: "Why DbContext is scoped, how captive dependencies happen, and how singleton or background code gets a safe context."
  },
  {
    id: "lesson-6",
    label: "Repository & Unit of Work",
    keywords: "repository pattern unit of work generic repository persistence abstraction ef core dbset query composition projection testing tradeoffs when to use repository",
    summary: "What the patterns intend, what EF Core already provides, and how to decide whether an extra abstraction is justified."
  },
  {
    id: "lesson-7",
    label: "Raff refactoring challenge",
    keywords: "raff refactor delete book controller service contract registration injection missing book 404 409 cancellation lifetime repository decision test acceptance checklist hints solution",
    summary: "Refactor one Raff feature end to end: controller, service, DI registration, outcome mapping, lifetime, and tests."
  },
  {
    id: "lesson-assessment",
    label: "Final assessment",
    keywords: "assessment final module test questions review pass threshold retake score services dependency injection architecture",
    summary: "Fourteen questions across the module. The pass threshold defaults to 80% and each question links back to the lesson that owns it."
  }
];

/* ---------------- assessment ---------------- */

const ASSESSMENT_QUESTIONS = [
  {
    id: "as-1",
    topic: "Separation of concerns",
    lesson: "lesson-1",
    prompt: "A controller action checks whether a book has reading entries before deleting it. Which responsibility is it performing that a service should normally own?",
    options: [
      "HTTP response formatting",
      "An application/business rule that needs current data",
      "Route matching",
      "JSON serialization"
    ],
    correct: 1,
    explain: "Existence and dependency checks require current data and express a use-case rule. The controller should call the use case and translate its outcome; persistence and rule orchestration belong behind the service boundary."
  },
  {
    id: "as-2",
    topic: "Service contracts",
    lesson: "lesson-2",
    prompt: "Why is `Task<bool>` a weak contract for deleting a book?",
    options: [
      "Boolean cannot be awaited",
      "It cannot distinguish a missing book from dependent data or another expected failure",
      "It forces the service to return IActionResult",
      "It prevents cancellation"
    ],
    correct: 1,
    explain: "A delete use case may have several meaningful outcomes. A Boolean collapses them into true/false, so the controller cannot choose between 204, 404, and 409 without guessing."
  },
  {
    id: "as-3",
    topic: "Service contracts",
    lesson: "lesson-2",
    prompt: "What is the main advantage of a result object over a thrown exception for an expected 'book not found' case?",
    options: [
      "It is always faster",
      "The expected outcomes are part of the method signature and can be handled with normal control flow",
      "It removes the need for logging",
      "It makes the database optional"
    ],
    correct: 1,
    explain: "A result type documents expected failure modes and lets the compiler help the caller handle them. Exceptions can still be a valid policy, but expected outcomes should not be hidden or used for control flow without a deliberate convention."
  },
  {
    id: "as-4",
    topic: "DI fundamentals",
    lesson: "lesson-3",
    prompt: "What is the difference between service registration and service resolution?",
    options: [
      "They are the same operation",
      "Registration describes how to create a service; resolution asks the provider for an instance",
      "Registration creates the object; resolution disposes it",
      "Resolution happens only in Program.cs"
    ],
    correct: 1,
    explain: "`AddScoped<IBookService, BookService>()` adds a descriptor to IServiceCollection. The container creates instances later, when a consumer is constructed or code explicitly asks the provider for the service."
  },
  {
    id: "as-5",
    topic: "DI fundamentals",
    lesson: "lesson-3",
    prompt: "Which statement about interfaces is most accurate?",
    options: [
      "Every service must have one",
      "They are useful when they provide a real contract, substitution, or testing seam; otherwise a concrete registration can be simpler",
      "They are required for constructor injection",
      "They make EF Core queries faster"
    ],
    correct: 1,
    explain: "Constructor injection works with concrete types too. An interface is a design tool, not a DI requirement. Add it when it expresses a meaningful boundary or enables substitution, not as a reflex."
  },
  {
    id: "as-6",
    topic: "Lifetimes",
    lesson: "lesson-4",
    prompt: "A transient service is injected into a controller and used for three calls in one request. How many instances does the controller normally receive?",
    options: [
      "One, because transient only controls resolution; all three calls use the injected instance",
      "Three, one per method call",
      "Zero until the first call",
      "One per scope, regardless of registration"
    ],
    correct: 0,
    explain: "The container creates the transient when the controller is constructed. The controller holds that instance for the request and calls methods on it. Transient means new per resolution, not new per method invocation."
  },
  {
    id: "as-7",
    topic: "Lifetimes",
    lesson: "lesson-4",
    prompt: "Two scopes resolve the same scoped service. What should you observe?",
    options: [
      "The same instance in both scopes",
      "A different instance in each scope, reused within each scope",
      "A new instance on every resolution",
      "An exception, because scoped services cannot cross scopes"
    ],
    correct: 1,
    explain: "Scoped means one instance per DI scope. Each scope has its own cache of scoped instances, so the two scopes see different objects, while repeated resolutions inside one scope reuse the same one."
  },
  {
    id: "as-8",
    topic: "Lifetimes",
    lesson: "lesson-4",
    prompt: "Which statement about singleton services is true?",
    options: [
      "They are automatically thread-safe",
      "They are reused for the root provider's lifetime and must be designed for concurrent use if shared",
      "They are created once per request",
      "They cannot depend on any other service"
    ],
    correct: 1,
    explain: "Singleton controls reuse, not synchronization. A singleton shared by concurrent requests needs thread-safe state or no mutable state at all. DI will not protect it for you."
  },
  {
    id: "as-9",
    topic: "Captive dependencies",
    lesson: "lesson-5",
    prompt: "A singleton `BookCacheService` is constructed with a scoped `BooksContext`. What is the core problem?",
    options: [
      "The cache will be disposed too early",
      "The singleton keeps the context alive beyond its scope, creating a captive dependency and sharing a non-thread-safe object",
      "EF Core cannot be used in a singleton",
      "The context becomes transient"
    ],
    correct: 1,
    explain: "The singleton lives in the root provider and holds the scoped context for the application's lifetime. The context's intended scope is lost; requests can observe stale state, and concurrent use is unsafe."
  },
  {
    id: "as-10",
    topic: "Background work",
    lesson: "lesson-5",
    prompt: "Which pattern safely gives a `BackgroundService` access to scoped services?",
    options: [
      "Inject the scoped services directly into the hosted service",
      "Create a scope with `IServiceScopeFactory` for each unit of work and resolve inside it",
      "Register every dependency as a singleton",
      "Resolve from `app.Services` without a scope"
    ],
    correct: 1,
    explain: "A hosted service is itself a singleton. It creates an explicit scope per unit of work, resolves scoped dependencies from that scope, and disposes the scope when done. This also gives the DbContext a clear lifetime."
  },
  {
    id: "as-11",
    topic: "DbContext",
    lesson: "lesson-5",
    prompt: "Why is a single `DbContext` instance unsuitable for two concurrent operations?",
    options: [
      "It is registered as scoped",
      "It is not thread-safe and maintains change-tracking state per instance",
      "PostgreSQL rejects all parallel queries",
      "It cannot be disposed"
    ],
    correct: 1,
    explain: "DbContext is not designed for concurrent use. If operations must overlap, create independent contexts — for example with IDbContextFactory — so each unit of work has its own tracking state."
  },
  {
    id: "as-12",
    topic: "Repositories",
    lesson: "lesson-6",
    prompt: "Which is the strongest reason to add a focused book repository?",
    options: [
      "Every DbSet access must be wrapped by policy",
      "Several use cases share complex, domain-meaningful queries that benefit from one named abstraction",
      "Repositories make PostgreSQL faster",
      "EF Core requires a repository to use DI"
    ],
    correct: 1,
    explain: "A focused repository can centralize complex queries or isolate persistence for a real design need. It is not a mandatory layer, and wrapping every DbSet mechanically often hides useful EF Core features."
  },
  {
    id: "as-13",
    topic: "Unit of Work",
    lesson: "lesson-6",
    prompt: "What does `DbContext` already provide that overlaps with the Unit of Work pattern?",
    options: [
      "HTTP routing",
      "Change tracking and a single SaveChangesAsync commit for the tracked changes",
      "JSON serialization",
      "Authentication"
    ],
    correct: 1,
    explain: "The context tracks entity changes and commits them as one logical unit when SaveChangesAsync is called. An extra IUnitOfWork is only worthwhile when it adds real coordination or a deliberate boundary."
  },
  {
    id: "as-14",
    topic: "Raff architecture",
    lesson: "lesson-7",
    prompt: "In the refactored delete flow, which mapping is correct?",
    options: [
      "Service returns 404; controller returns 409",
      "Service returns an outcome such as Deleted/NotFound/HasReadingEntries; controller maps them to 204/404/409",
      "Service returns IActionResult; controller returns the same object",
      "Controller performs the delete; service only logs"
    ],
    correct: 1,
    explain: "The service owns the use case and returns application outcomes. The controller owns HTTP translation. That separation keeps the use case usable outside MVC and keeps status-code decisions in one place."
  }
];

/* ---------------- widget datasets ---------------- */

const RESPONSIBILITY_LAYERS = {
  controller: "Controller — HTTP boundary",
  service: "Application service — use case",
  data: "EF Core / database — persistence"
};

const RESPONSIBILITY_CASES = [
  {
    id: "rc-1",
    rule: "Choose 404 vs 204 for a delete result.",
    answer: "controller",
    why: "Status-code selection is HTTP translation. The controller maps an application outcome to the protocol."
  },
  {
    id: "rc-2",
    rule: "Check whether a book still has reading entries before deleting it.",
    answer: "service",
    why: "This rule needs current data and belongs to the delete use case. A restricting foreign key remains the concurrency backstop."
  },
  {
    id: "rc-3",
    rule: "Load the book, remove it, and call SaveChangesAsync as one unit.",
    answer: "service",
    why: "Orchestrating the use case is the application service's job. EF Core executes the persistence operations the service coordinates."
  },
  {
    id: "rc-4",
    rule: "Reject a request whose JSON body cannot be deserialized.",
    answer: "controller",
    why: "Model binding and the automatic 400 happen before the action. The controller's boundary owns the request contract."
  },
  {
    id: "rc-5",
    rule: "Enforce the unique index on (UserId, BookId).",
    answer: "data",
    why: "A unique index is a database constraint. It holds even when two requests race or code changes."
  },
  {
    id: "rc-6",
    rule: "Name the operation DeleteBookAsync and define its outcome type.",
    answer: "service",
    why: "The service contract names the use case and its expected outcomes. The controller consumes that contract."
  },
  {
    id: "rc-7",
    rule: "Translate a PostgreSQL foreign-key violation into 409 Conflict.",
    answer: "controller",
    why: "The database reports a constraint failure; the HTTP boundary translates it into a protocol response after logging it."
  },
  {
    id: "rc-8",
    rule: "Pass the request's CancellationToken to EF Core queries.",
    answer: "service",
    why: "The controller receives the token, but the service propagates it to the asynchronous persistence calls it orchestrates. No HTTP type is required."
  }
];

const LIFETIME_MODES = {
  transient: {
    label: "Transient",
    badge: "AddTransient",
    rule: "A new instance is generally created each time the service is resolved from the container.",
    note: "Resolving once and calling three methods still uses one instance. Transient is about resolution, not method calls.",
    use: "Lightweight, stateless helpers where per-resolution isolation is useful. Avoid it for expensive or stateful services unless the cost is deliberate."
  },
  scoped: {
    label: "Scoped",
    badge: "AddScoped",
    rule: "One instance is reused within a given DI scope. In a typical ASP.NET Core request, the scope corresponds to that request.",
    note: "Each new scope gets its own instance. Repeated resolutions inside the same scope reuse it.",
    use: "Request-bound work such as application services and DbContext. The instance is disposed when the scope ends."
  },
  singleton: {
    label: "Singleton",
    badge: "AddSingleton",
    rule: "A single instance is reused for the lifetime of the root service provider, which normally means the application.",
    note: "The first resolution creates the instance; later resolutions reuse it across every scope. Thread safety is your responsibility.",
    use: "Configuration, stateless shared services, caches with a deliberate concurrency design. Never capture a scoped dependency."
  }
};

const DEPENDENCY_GRAPHS = [
  {
    id: "graph-1",
    title: "A normal request graph",
    subtitle: "Controller → application service → DbContext",
    nodes: [
      { id: "controller", label: "BooksController", role: "controller", lifetime: "scoped" },
      { id: "service", label: "IBookService → BookService", role: "application service", lifetime: "scoped" },
      { id: "context", label: "BooksContext", role: "EF Core DbContext", lifetime: "scoped" }
    ],
    edges: [
      { from: "controller", to: "service", label: "constructor injection" },
      { from: "service", to: "context", label: "constructor injection" }
    ],
    question: "Is this lifetime graph safe for a normal web request?",
    options: [
      { text: "Yes — all three services share the request scope and are disposed together.", correct: true },
      { text: "No — the controller must be a singleton.", correct: false },
      { text: "No — the DbContext must be a singleton to avoid creating too many instances.", correct: false },
      { text: "Only if the service is transient.", correct: false }
    ],
    explain: "All three registrations are scoped. The controller and service are resolved in the request scope, and the DbContext shares that scope. The scope end disposes the context and any other scoped IDisposable services."
  },
  {
    id: "graph-2",
    title: "The captive cache",
    subtitle: "A singleton that holds a scoped DbContext",
    nodes: [
      { id: "cache", label: "BookCacheService", role: "singleton cache", lifetime: "singleton", risk: true },
      { id: "context", label: "BooksContext", role: "EF Core DbContext", lifetime: "scoped", risk: true }
    ],
    edges: [
      { from: "cache", to: "context", label: "constructor injection", unsafe: true }
    ],
    question: "What is wrong with this graph, and what is a safe correction?",
    options: [
      { text: "Make BooksContext a singleton so the cache can keep it safely.", correct: false },
      { text: "Make BookCacheService scoped if its work is request-bound; otherwise use IServiceScopeFactory or IDbContextFactory inside the singleton.", correct: true },
      { text: "Register BooksContext as transient; that removes the lifetime issue.", correct: false },
      { text: "Disable scope validation so the graph builds.", correct: false }
    ],
    explain: "The singleton is built from the root scope and captures the scoped context for the application's lifetime. Making the context a singleton or transient does not make it thread-safe, and disabling validation hides the design error. Use a scoped service for request-bound work, or create an explicit scope/context inside the singleton.",
    fix: {
      title: "Safe shapes",
      nodes: [
        { id: "cache", label: "BookCacheService (scoped) → BooksContext (scoped)", role: "request-bound option", lifetime: "scoped" },
        { id: "factory", label: "Singleton cache → IServiceScopeFactory / IDbContextFactory", role: "independent unit of work", lifetime: "singleton" }
      ],
      edges: []
    }
  },
  {
    id: "graph-3",
    title: "The background worker",
    subtitle: "A hosted singleton that needs a DbContext",
    nodes: [
      { id: "worker", label: "BookMaintenanceService : BackgroundService", role: "hosted singleton", lifetime: "singleton" },
      { id: "scopeFactory", label: "IServiceScopeFactory", role: "creates scopes", lifetime: "singleton" },
      { id: "scope", label: "IServiceScope (one unit of work)", role: "scope boundary", lifetime: "scoped" },
      { id: "context", label: "BooksContext", role: "EF Core DbContext", lifetime: "scoped" }
    ],
    edges: [
      { from: "worker", to: "scopeFactory", label: "constructor injection" },
      { from: "scopeFactory", to: "scope", label: "CreateScope()" },
      { from: "scope", to: "context", label: "resolve inside scope" }
    ],
    question: "How should the worker obtain BooksContext?",
    options: [
      { text: "Inject BooksContext directly into the hosted service.", correct: false },
      { text: "Inject IServiceScopeFactory, create a scope per unit of work, resolve BooksContext inside it, and dispose the scope.", correct: true },
      { text: "Resolve BooksContext from app.Services without a scope.", correct: false },
      { text: "Register BooksContext as a singleton and inject it.", correct: false }
    ],
    explain: "A BackgroundService is a singleton. Create a scope for each unit of work, resolve the scoped context inside it, await operations sequentially, pass the stopping token, and dispose the scope when the work ends."
  },
  {
    id: "graph-4",
    title: "The factory option",
    subtitle: "A singleton that creates independent contexts",
    nodes: [
      { id: "worker", label: "BookImportService", role: "singleton or scoped consumer", lifetime: "singleton" },
      { id: "factory", label: "IDbContextFactory<BooksContext>", role: "context factory", lifetime: "singleton" },
      { id: "context", label: "BooksContext (created per unit)", role: "independent context", lifetime: "disposed by caller" }
    ],
    edges: [
      { from: "worker", to: "factory", label: "constructor injection" },
      { from: "factory", to: "context", label: "CreateDbContextAsync()" }
    ],
    question: "Is this graph safe, and what is the caller's disposal responsibility?",
    options: [
      { text: "No — a factory cannot be used with DI.", correct: false },
      { text: "Yes — the factory creates independent contexts, and the caller disposes each one with await using/using.", correct: true },
      { text: "Yes — the factory disposes every context automatically after the first query.", correct: false },
      { text: "Only if the factory is registered as scoped.", correct: false }
    ],
    explain: "IDbContextFactory creates independent contexts on demand. It is useful for singleton or background code that needs a context per unit of work. The created context is not disposed by the caller's scope automatically, so wrap it in await using or using."
  }
];

/* ---------------- lesson content (structured blocks, rendered by content.js) ---------------- */

const MODULE_LESSONS = [
  {
    id: "lesson-1",
    badge: "L1",
    nav: "Separation of responsibilities",
    content: [
      {
        type: "html",
        html: `<span class="lesson-pill">L1 · Lesson</span><h1 class="lesson-h1">Separation of Responsibilities</h1><p class="lesson-lead">HTTP handling, application use cases, and persistence are different jobs. Learning where each one belongs is what keeps a controller from becoming the whole application.</p><div class="lesson-meta-bar"><span>🧠 4 knowledge checks</span><span>🧭 Responsibility lab</span><span>📐 Request-flow diagram</span></div>`
      },
      {
        type: "h2",
        html: "One action, several jobs"
      },
      {
        type: "p",
        html: `A controller action can look short and still contain a lot of responsibility. The following Raff action handles routing, loads an entity, applies a business rule, mutates the context, saves changes, and chooses an HTTP status — all in one method.`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">BooksController.cs — before</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-fragment">Illustrative fragment</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">[HttpDelete("{id:int}")]
public async Task&lt;IActionResult&gt; DeleteBook(int id, CancellationToken ct)
{
    var book = await _context.Books.FirstOrDefaultAsync(b =&gt; b.Id == id, ct);
    if (book is null) return NotFound();

    var hasEntries = await _context.ReadingEntries
        .AnyAsync(e =&gt; e.BookId == id, ct);

    if (hasEntries)
        return Conflict(new ProblemDetails { Title = "Book has reading entries." });

    _context.Books.Remove(book);
    await _context.SaveChangesAsync(ct);
    return NoContent();
}</code></pre><div class="code-expl">This is not “wrong” because it is long. It is a design problem because <strong>four different reasons to change</strong> are now coupled in one place: the HTTP contract, the delete rule, the persistence workflow, and the response mapping.</div></div>`
      },
      {
        type: "p",
        html: `The request is doing a great deal, but only one of those jobs is specifically about HTTP. If the same delete use case is needed from a background cleanup job, an integration test, or a future admin endpoint, the controller action cannot be reused without dragging HTTP along with it.`
      },
      {
        type: "h2",
        html: "The request flow"
      },
      {
        type: "p",
        html: `A common ASP.NET Core architecture gives each layer a narrow job:`
      },
      {
        type: "html",
        html: `<div class="diagram-container">
  <div class="diagram-title">HTTP request → controller → service → BooksContext → PostgreSQL</div>
  <div class="m4-stages">
    <div class="m4-stage"><div class="m4-stage-name">HTTP request</div><div class="m4-stage-desc">Kestrel, routing, model binding, validation</div></div>
    <div class="m4-stage"><div class="m4-stage-name">Controller</div><div class="m4-stage-desc">Reads the request, calls one use case, maps the outcome to HTTP</div></div>
    <div class="m4-stage"><div class="m4-stage-name">Application service</div><div class="m4-stage-desc">Orchestrates the use case and applies business rules</div></div>
    <div class="m4-stage"><div class="m4-stage-name">BooksContext</div><div class="m4-stage-desc">Tracks entities, builds SQL, saves the unit of work</div></div>
    <div class="m4-stage"><div class="m4-stage-name">PostgreSQL</div><div class="m4-stage-desc">Stores data and enforces relational constraints</div></div>
  </div>
</div>`
      },
      {
        type: "callout",
        kind: "info",
        title: "ℹ️ This is one common architecture, not a law",
        html: `A small API can keep simple CRUD in a controller and still be well designed. The point is not to add layers for their own sake. The point is to put a responsibility where it can be named, tested, reused, and changed without dragging unrelated concerns along.`
      },
      {
        type: "h2",
        html: "Who owns what"
      },
      {
        type: "html",
        html: `<div class="table-wrapper"><table><thead><tr><th>Layer</th><th>Owns</th><th>Should not normally own</th></tr></thead><tbody>
<tr><td><strong>Controller</strong></td><td>HTTP method and route, request parsing, authorization entry points, calling a use case, mapping outcomes to status codes and response bodies</td><td>Multi-step business rules, complex queries, transaction orchestration</td></tr>
<tr><td><strong>Application service</strong></td><td>A named use case: load what it needs, apply rules, call persistence, return an application-level result</td><td><code>IActionResult</code>, <code>HttpContext</code>, status codes, JSON serialization</td></tr>
<tr><td><strong>EF Core / <code>BooksContext</code></strong></td><td>Change tracking, query translation, SQL execution, unit-of-work commit</td><td>HTTP concerns, business decisions that belong to the use case</td></tr>
<tr><td><strong>PostgreSQL</strong></td><td>Durable storage, uniqueness, foreign keys, check constraints, transactions</td><td>User-facing messages and HTTP semantics</td></tr>
</tbody></table></div>`
      },
      {
        type: "p",
        html: `Notice that the service still uses EF Core. Separation of responsibilities does not mean hiding EF Core behind twenty interfaces. It means the controller stops deciding how the delete works, and the service stops deciding how the result is represented over HTTP.`
      },
      {
        type: "h2",
        html: "The same delete with a service boundary"
      },
      {
        type: "p",
        html: `A service names the use case and returns an application outcome. The controller is left with exactly the job it is good at: translating that outcome into HTTP.`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">DeleteBookResult.cs — the application outcome</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-fragment">Illustrative fragment</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">public enum DeleteBookOutcome
{
    Deleted,
    NotFound,
    HasReadingEntries
}

public sealed record DeleteBookResult(
    DeleteBookOutcome Outcome,
    int? EntryCount = null);</code></pre><div class="code-expl">The outcome type says what the use case can produce. It does not mention 404, 409, or any MVC type. Lesson 2 examines this contract design in more depth.</div></div>`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">BookService.cs — the use case</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-fragment">Illustrative fragment</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">public async Task&lt;DeleteBookResult&gt; DeleteAsync(
    int id,
    CancellationToken ct = default)
{
    var book = await _context.Books
        .FirstOrDefaultAsync(b =&gt; b.Id == id, ct);

    if (book is null)
        return new DeleteBookResult(DeleteBookOutcome.NotFound);

    var entryCount = await _context.ReadingEntries
        .CountAsync(e =&gt; e.BookId == id, ct);

    if (entryCount &gt; 0)
        return new DeleteBookResult(
            DeleteBookOutcome.HasReadingEntries,
            entryCount);

    _context.Books.Remove(book);
    await _context.SaveChangesAsync(ct);

    return new DeleteBookResult(DeleteBookOutcome.Deleted);
}</code></pre><div class="code-expl">The service owns the sequence and the rule. It can be called from MVC, a background worker, or a test without pretending to be an HTTP endpoint.</div></div>`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">BooksController.cs — the HTTP boundary</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-fragment">Illustrative fragment</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">[HttpDelete("{id:int}")]
public async Task&lt;IActionResult&gt; DeleteBook(
    int id,
    CancellationToken ct)
{
    var result = await _books.DeleteAsync(id, ct);

    return result.Outcome switch
    {
        DeleteBookOutcome.Deleted =&gt; NoContent(),
        DeleteBookOutcome.NotFound =&gt; NotFound(),
        DeleteBookOutcome.HasReadingEntries =&gt; Conflict(new ProblemDetails
        {
            Title = "Book has reading entries.",
            Detail = $"Remove the {result.EntryCount} reading entries first."
        }),
        _ =&gt; StatusCode(StatusCodes.Status500InternalServerError)
    };
}</code></pre><div class="code-expl">The controller is now a translation layer. It knows the HTTP contract; it does not know how the delete rule is implemented.</div></div>`
      },
      {
        type: "h2",
        html: "DTOs, entities, services, and controllers"
      },
      {
        type: "html",
        html: `<div class="table-wrapper"><table><thead><tr><th>Type</th><th>Purpose</th><th>Why it exists separately</th></tr></thead><tbody>
<tr><td><code>Book</code> entity</td><td>The persistence shape EF Core tracks</td><td>It contains database mapping and change-tracking state that should not become the public API contract.</td></tr>
<tr><td><code>BookDto</code></td><td>The read contract returned to clients</td><td>It controls exactly which fields are exposed and can be shaped with a projection.</td></tr>
<tr><td><code>CreateBookDto</code></td><td>The write contract accepted from clients</td><td>It carries validation attributes and prevents over-posting.</td></tr>
<tr><td><code>IBookService</code> / <code>BookService</code></td><td>The application use cases</td><td>It orchestrates rules and persistence without knowing HTTP.</td></tr>
<tr><td><code>BooksController</code></td><td>The HTTP boundary</td><td>It maps requests to use cases and outcomes to responses.</td></tr>
</tbody></table></div>`
      },
      {
        type: "callout",
        kind: "warning",
        title: "⚠️ The most common boundary mistake",
        html: `Returning a tracked entity directly from a controller-service call usually means the entity escapes the persistence boundary. It may serialize navigation properties, leak internal columns, or accidentally depend on the context still being alive. Return DTOs or projections from the application boundary instead.`
      },
      {
        type: "h2",
        html: "Why services should not return MVC types"
      },
      {
        type: "p",
        html: `An application service that returns <code>IActionResult</code> has to know about <code>NotFound()</code>, <code>Conflict()</code>, model binding errors, and content negotiation. That knowledge is not part of deleting a book. It also makes the service awkward to call from a Worker Service, a message handler, or a unit test that only cares about the outcome.`
      },
      {
        type: "p",
        html: `The same rule applies to <code>HttpContext</code>, <code>Request</code>, and response formatting. A cancellation token is different: it represents “this work is no longer needed” and is a normal asynchronous programming concern, not an HTTP-specific type. Passing it through a service is appropriate.`
      },
      {
        type: "callout",
        kind: "info",
        title: "ℹ️ A service can still use ASP.NET Core libraries",
        html: `The boundary is conceptual, not a project-file rule. A service may live in the same project and reference ASP.NET Core types for logging, options, or cancellation. What it should not do is <em>choose HTTP responses</em>. That decision belongs at the edge.`
      },
      {
        type: "h2",
        html: "Useful separation vs unnecessary abstraction"
      },
      {
        type: "p",
        html: `“Move it to a service” is not automatically an improvement. A one-line pass-through service can make a small codebase harder to follow. Use these questions before creating a boundary:`
      },
      {
        type: "list",
        ordered: false,
        items: [
          `<strong>Does it have a name?</strong> If you cannot describe it as a use case — “delete a book”, “check out a book”, “recalculate reading progress” — it may not deserve its own service yet.`,
          `<strong>Does it have rules or orchestration?</strong> A single <code>FindAsync</code> call is not a use case. A rule plus persistence plus outcome mapping usually is.`,
          `<strong>Will more than one caller use it?</strong> A background job, a second endpoint, or an integration test is a strong signal.`,
          `<strong>Does moving it reduce the cost of change?</strong> If the controller becomes clearer and the rule becomes testable, the boundary is earning its keep. If you added three files and no one can find the logic, it is not.`,
          `<strong>Is the abstraction real?</strong> An interface with one implementation and no substitution need may still be fine — but it is not automatically better than a concrete class.`
        ]
      },
      {
        type: "html",
        html: `<div class="simulator-widget" data-widget="responsibilities" id="w-responsibilities"><div class="simulator-header"><div class="simulator-title">🧭 Responsibility lab</div><div class="m4-mode-note" style="margin-top:0;">For each responsibility, choose the layer that should own it. The feedback explains the boundary.</div></div><div class="simulator-body"></div></div>`
      },
      {
        type: "h2",
        html: "Knowledge checks"
      },
      {
        type: "html",
        html: "<div class=\"kc-mount\" data-kc-group=\"lesson-1\"></div>"
      },
      {
        type: "html",
        html: `<div class="refs-block"><div class="refs-title">Official references</div><ul><li><a href="https://learn.microsoft.com/en-us/aspnet/core/mvc/controllers/actions" target="_blank" rel="noopener noreferrer">Controller actions in ASP.NET Core ↗</a></li><li><a href="https://learn.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection" target="_blank" rel="noopener noreferrer">Dependency injection in ASP.NET Core ↗</a></li><li><a href="https://learn.microsoft.com/en-us/dotnet/architecture/modern-web-apps-azure/architectural-principles" target="_blank" rel="noopener noreferrer">Architectural principles ↗</a></li></ul></div>`
      },
      {
        type: "html",
        html: `<div class="lesson-footer-nav"><button class="btn-complete-lesson" type="button" data-lesson="lesson-1">Mark Lesson 1 Complete ✓</button>
<button class="btn-primary" type="button" data-nav-target="lesson-2">Next: Designing application services →</button></div>`
      }
    ]
  },
  {
    id: "lesson-2",
    badge: "L2",
    nav: "Designing application services",
    content: [
      {
        type: "html",
        html: `<span class="lesson-pill">L2 · Lesson</span><h1 class="lesson-h1">Designing Application Services</h1><p class="lesson-lead">A service is not a bucket for “business logic”. It is a contract around a use case — and its return type should tell the truth about what can happen.</p><div class="lesson-meta-bar"><span>🧠 4 knowledge checks</span><span>🧩 Contract comparison</span><span>⏱️ Cancellation and async</span></div>`
      },
      {
        type: "h2",
        html: "What an application service is"
      },
      {
        type: "p",
        html: `An application service implements a use case. It coordinates the work the application must do: load the data the rule needs, apply the rule, ask EF Core to persist the change, and return a result that the calling boundary can understand. It is deliberately <em>application-specific</em>, not a generic utility class.`
      },
      {
        type: "p",
        html: `For Raff, useful service methods are things like:`
      },
      {
        type: "list",
        ordered: false,
        items: [
          `<code>GetBookByIdAsync(int id, CancellationToken)</code> — a query use case that returns a DTO or <code>null</code>.`,
          `<code>CreateBookAsync(CreateBookDto dto, CancellationToken)</code> — validate the application rules and persist a new book.`,
          `<code>DeleteBookAsync(int id, CancellationToken)</code> — apply the dependency rule, delete, and report the outcome.`,
          `<code>PatchReadingEntryAsync(int id, PatchReadingEntryDto dto, CancellationToken)</code> — the presence-aware update from Module 4.`
        ]
      },
      {
        type: "callout",
        kind: "info",
        title: "ℹ️ Method names are part of the design",
        html: `Use a verb that matches the use case and keep the resource in the name: <code>DeleteBookAsync</code>, not <code>ProcessDataAsync</code>. If a method needs “And” in its name, it may be doing too much — or it may genuinely be a multi-step use case. The name should make the intent obvious either way.`
      },
      {
        type: "h2",
        html: "Construct the service around the use case"
      },
      {
        type: "p",
        html: `A typical book service depends on <code>BooksContext</code> through constructor injection. The interface describes what callers can ask for; the implementation owns the sequence.`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">IBookService.cs</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-fragment">Illustrative contract</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">public interface IBookService
{
    Task&lt;BookDto?&gt; GetBookByIdAsync(
        int id,
        CancellationToken cancellationToken = default);

    Task&lt;DeleteBookResult&gt; DeleteBookAsync(
        int id,
        CancellationToken cancellationToken = default);
}</code></pre><div class="code-expl">This is an illustrative contract, not the only correct design. A smaller application might expose only the methods it actually uses.</div></div>`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">BookService.cs — query use case</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-fragment">Illustrative implementation</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">public sealed class BookService : IBookService
{
    private readonly BooksContext _context;

    public BookService(BooksContext context)
    {
        _context = context;
    }

    public async Task&lt;BookDto?&gt; GetBookByIdAsync(
        int id,
        CancellationToken cancellationToken = default)
    {
        return await _context.Books
            .AsNoTracking()
            .Where(b =&gt; b.Id == id)
            .Select(b =&gt; new BookDto(
                b.Id,
                b.Title,
                b.PublishedYear,
                b.Summary))
            .FirstOrDefaultAsync(cancellationToken);
    }
}</code></pre><div class="code-expl">The service returns application data — a DTO — rather than a tracked entity or an HTTP result. The projection keeps the query focused on the read contract.</div></div>`
      },
      {
        type: "h2",
        html: "Async, cancellation, and disposal"
      },
      {
        type: "p",
        html: `Application services that touch a database should be asynchronous and should accept a <code>CancellationToken</code>. The action already receives a token; pass it down. Do not create a new <code>CancellationTokenSource</code> inside every method, and do not store a token in a singleton.`
      },
      {
        type: "list",
        ordered: false,
        items: [
          `Give the token a default of <code>default</code> in the service contract so callers can omit it in tests and non-web code.`,
          `Pass it to every asynchronous EF Core call: <code>FirstOrDefaultAsync(ct)</code>, <code>ToListAsync(ct)</code>, <code>SaveChangesAsync(ct)</code>.`,
          `Await the operations. Do not call <code>.Result</code> or <code>.Wait()</code>.`,
          `If a failure is expected and recoverable, return an outcome; if it is unexpected, let it propagate to the boundary that logs and translates errors.`
        ]
      },
      {
        type: "callout",
        kind: "warning",
        title: "⚠️ Cancellation is cooperative",
        html: `Passing the token asks EF Core and the database provider to stop when possible. It is not a guarantee that a query stops instantly. Do not catch <code>OperationCanceledException</code> and turn it into a successful result; let cancellation remain cancellation.`
      },
      {
        type: "h2",
        html: "Choosing the return contract for delete"
      },
      {
        type: "p",
        html: `The delete use case has several possible outcomes, and the return type should expose the ones callers must handle. Consider three common choices:`
      },
      {
        type: "html",
        html: `<div class="table-wrapper"><table><thead><tr><th>Contract</th><th>What it communicates</th><th>Trade-off</th></tr></thead><tbody>
<tr><td><code>Task&lt;bool&gt;</code></td><td>“Something succeeded or failed.”</td><td>Simple, but cannot distinguish not found from a dependent-data conflict. Easy for a caller to ignore or misinterpret.</td></tr>
<tr><td><code>Task</code> plus a documented exception for a missing book</td><td>“Missing is exceptional; callers should catch this specific exception.”</td><td>Explicit in its own way, and a central exception handler can map it. Exceptions for expected flow can be noisy and are easier to catch too broadly.</td></tr>
<tr><td>A result type such as <code>DeleteBookResult</code></td><td>“These are the expected outcomes; the compiler can help you handle them.”</td><td>More code and a type to maintain, but the contract is honest and the controller's switch is exhaustive in intent.</td></tr>
</tbody></table></div>`
      },
      {
        type: "p",
        html: `There is no universal winner. A focused query can reasonably return <code>BookDto?</code> and use <code>null</code> for “not found”. A delete with two distinct expected failures is a strong candidate for a result type. The key is to choose deliberately and use the same policy consistently.`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">BookService.cs — delete use case</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-fragment">Illustrative implementation</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">public async Task&lt;DeleteBookResult&gt; DeleteBookAsync(
    int id,
    CancellationToken cancellationToken = default)
{
    var book = await _context.Books
        .FirstOrDefaultAsync(b =&gt; b.Id == id, cancellationToken);

    if (book is null)
        return new DeleteBookResult(DeleteBookOutcome.NotFound);

    var entryCount = await _context.ReadingEntries
        .CountAsync(e =&gt; e.BookId == id, cancellationToken);

    if (entryCount &gt; 0)
        return new DeleteBookResult(
            DeleteBookOutcome.HasReadingEntries,
            entryCount);

    _context.Books.Remove(book);
    await _context.SaveChangesAsync(cancellationToken);

    return new DeleteBookResult(DeleteBookOutcome.Deleted);
}</code></pre><div class="code-expl">The service does not hide the expected conflict behind <code>false</code>. It returns the information the controller needs to choose 204, 404, or 409.</div></div>`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">BooksController.cs — translate, do not decide</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-fragment">Illustrative controller</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">[HttpDelete("{id:int}")]
public async Task&lt;IActionResult&gt; DeleteBook(
    int id,
    CancellationToken cancellationToken)
{
    var result = await _books.DeleteBookAsync(id, cancellationToken);
    return result.Outcome switch
    {
        DeleteBookOutcome.Deleted =&gt; NoContent(),
        DeleteBookOutcome.NotFound =&gt; NotFound(),
        DeleteBookOutcome.HasReadingEntries =&gt; Conflict(new ProblemDetails
        {
            Title = "Book has reading entries.",
            Detail = $"Remove the {result.EntryCount} reading entries first."
        }),
        _ =&gt; StatusCode(StatusCodes.Status500InternalServerError)
    };
}</code></pre><div class="code-expl">The controller remains the only place that knows about HTTP status codes. The service can be reused without rewriting that knowledge.</div></div>`
      },
      {
        type: "h2",
        html: "Do not disguise failures as success"
      },
      {
        type: "p",
        html: `A service that returns an empty <code>BookDto</code> for a missing book, or a <code>true</code> for a delete that did not happen, forces the caller to guess. That is worse than an exception because the failure becomes invisible in normal control flow. If an operation can fail, model the failure in the contract.`
      },
      {
        type: "callout",
        kind: "success",
        title: "✅ Contract checklist",
        html: `<ul style="margin-bottom:0;"><li>Can the caller distinguish every expected outcome?</li><li>Does the return type avoid HTTP types?</li><li>Are async operations awaited and cancellation propagated?</li><li>Is the method named after the use case rather than a generic verb?</li><li>Does the controller — not the service — choose the status code?</li></ul>`
      },
      {
        type: "h2",
        html: "Knowledge checks"
      },
      {
        type: "html",
        html: "<div class=\"kc-mount\" data-kc-group=\"lesson-2\"></div>"
      },
      {
        type: "html",
        html: `<div class="refs-block"><div class="refs-title">Official references</div><ul><li><a href="https://learn.microsoft.com/en-us/dotnet/csharp/asynchronous-programming/async-scenarios" target="_blank" rel="noopener noreferrer">Asynchronous programming scenarios ↗</a></li><li><a href="https://learn.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection" target="_blank" rel="noopener noreferrer">Dependency injection in ASP.NET Core ↗</a></li><li><a href="https://learn.microsoft.com/en-us/ef/core/miscellaneous/async" target="_blank" rel="noopener noreferrer">Asynchronous programming with EF Core ↗</a></li></ul></div>`
      },
      {
        type: "html",
        html: `<div class="lesson-footer-nav"><button class="btn-secondary" type="button" data-nav-target="lesson-1">← Separation of responsibilities</button>
<button class="btn-complete-lesson" type="button" data-lesson="lesson-2">Mark Lesson 2 Complete ✓</button>
<button class="btn-primary" type="button" data-nav-target="lesson-3">Next: Dependency injection fundamentals →</button></div>`
      }
    ]
  },
  {
    id: "lesson-3",
    badge: "L3",
    nav: "Dependency injection fundamentals",
    content: [
      {
        type: "html",
        html: `<span class="lesson-pill">L3 · Lesson</span><h1 class="lesson-h1">Dependency Injection Fundamentals</h1><p class="lesson-lead">Dependency injection is not a framework trick. It is a way to stop classes from constructing their own collaborators — and a container that builds the graph for you.</p><div class="lesson-meta-bar"><span>🧠 4 knowledge checks</span><span>🔗 Registration → resolution</span><span>🧱 Object graph</span></div>`
      },
      {
        type: "h2",
        html: "What dependency injection is"
      },
      {
        type: "p",
        html: `A class has a <strong>dependency</strong> when it needs another object to do its job. <code>BookService</code> depends on <code>BooksContext</code>. <code>BooksController</code> depends on <code>IBookService</code>. Without dependency injection, each class creates its dependencies itself:`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">Manual construction — tightly coupled</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-anti-pattern">Avoid by default</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">public sealed class BooksController : ControllerBase
{
    private readonly BookService _books = new BookService(
        new BooksContext(new DbContextOptions&lt;BooksContext&gt;()));
}</code></pre><div class="code-expl">The controller now hardcodes the service and context construction. Configuration, connection strings, scopes, and disposal are all bypassed. This is the problem DI solves.</div></div>`
      },
      {
        type: "p",
        html: `With dependency injection, the class declares what it needs and receives it:`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">Constructor injection — the normal pattern</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-complete">Complete pattern</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">public sealed class BooksController : ControllerBase
{
    private readonly IBookService _books;

    public BooksController(IBookService books)
    {
        _books = books;
    }
}</code></pre><div class="code-expl">The controller does not know how <code>IBookService</code> is created or which implementation it receives. That is configured once at the composition root.</div></div>`
      },
      {
        type: "h2",
        html: "Dependency inversion in one paragraph"
      },
      {
        type: "p",
        html: `Dependency inversion is the design principle behind the pattern: high-level policy should not depend directly on low-level details. <code>BooksController</code> describes a use case; it should not depend on the concrete SQL implementation. Both the controller and the implementation can depend on the <code>IBookService</code> abstraction. This does not mean every class needs an interface — it means the direction of dependency should not force a high-level class to know low-level construction details.`
      },
      {
        type: "callout",
        kind: "info",
        title: "ℹ️ DI and dependency inversion are related, not identical",
        html: `Dependency injection is a technique for supplying objects. Dependency inversion is a design principle about which direction dependencies point. You can use a container without designing good abstractions, and you can invert a dependency without a container. The two work well together, but neither guarantees the other.`
      },
      {
        type: "h2",
        html: "The service, the implementation, and the registration"
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">IBookService.cs</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-fragment">Illustrative contract</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">public interface IBookService
{
    Task&lt;bool&gt; DeleteBookAsync(
        int id,
        CancellationToken cancellationToken = default);
}</code></pre><div class="code-expl">This contract is intentionally simple for the DI demonstration. Lesson 2 explains why a Boolean may be too weak for a real delete and how a result type improves it.</div></div>`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">BookService.cs</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-fragment">Illustrative implementation</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">public sealed class BookService : IBookService
{
    private readonly BooksContext _context;

    public BookService(BooksContext context)
    {
        _context = context;
    }

    public async Task&lt;bool&gt; DeleteBookAsync(
        int id,
        CancellationToken cancellationToken = default)
    {
        var book = await _context.Books
            .FirstOrDefaultAsync(b =&gt; b.Id == id, cancellationToken);

        if (book is null)
            return false;

        _context.Books.Remove(book);
        await _context.SaveChangesAsync(cancellationToken);
        return true;
    }
}</code></pre><div class="code-expl">The implementation is complete for this illustrative contract. In Raff's real delete flow, the service would also check reading entries and return a richer outcome.</div></div>`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">Program.cs — registration</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-complete">Complete registration</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">builder.Services.AddDbContext&lt;BooksContext&gt;(options =&gt;
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("Raff")));

builder.Services.AddScoped&lt;IBookService, BookService&gt;();

var app = builder.Build();</code></pre><div class="code-expl">Registration tells the container: “when someone asks for <code>IBookService</code> in a scope, construct <code>BookService</code> and resolve its constructor arguments too.”</div></div>`
      },
      {
        type: "h2",
        html: "Registration versus resolution"
      },
      {
        type: "p",
        html: `<code>builder.Services</code> is an <code>IServiceCollection</code>: a list of service descriptors. Adding a descriptor does not create an object. The provider is created by <code>builder.Build()</code>. Resolution happens later, either explicitly or because the container is constructing another service.`
      },
      {
        type: "html",
        html: `<div class="diagram-container">
  <div class="diagram-title">From registration to execution</div>
  <div class="m4-stages">
    <div class="m4-stage"><div class="m4-stage-name">1 · Register</div><div class="m4-stage-desc">builder.Services.AddScoped&lt;IBookService, BookService&gt;()</div></div>
    <div class="m4-stage"><div class="m4-stage-name">2 · Build</div><div class="m4-stage-desc">builder.Build() creates the root IServiceProvider</div></div>
    <div class="m4-stage"><div class="m4-stage-name">3 · Request</div><div class="m4-stage-desc">An HTTP request opens a DI scope</div></div>
    <div class="m4-stage"><div class="m4-stage-name">4 · Resolve</div><div class="m4-stage-desc">The controller asks for IBookService; the container constructs it and its dependencies</div></div>
    <div class="m4-stage"><div class="m4-stage-name">5 · Execute</div><div class="m4-stage-desc">The action calls the service method</div></div>
  </div>
</div>`
      },
      {
        type: "list",
        ordered: false,
        items: [
          `<strong>Registration</strong> is configuration. <code>AddScoped&lt;IBookService, BookService&gt;()</code> adds a <code>ServiceDescriptor</code>.`,
          `<strong>Resolution</strong> is requesting an instance. <code>provider.GetRequiredService&lt;IBookService&gt;()</code> performs it explicitly; constructor injection performs it implicitly.`,
          `<strong>The root provider</strong> is created at build time and owns singletons. A request scope is a child scope that owns scoped instances.`,
          `<strong>Invalid graphs</strong> — such as a singleton requiring a scoped service — may be reported when the provider validates scopes or when the service is resolved.`
        ]
      },
      {
        type: "h2",
        html: "Interfaces: useful, not mandatory"
      },
      {
        type: "p",
        html: `Interfaces are valuable when they represent a real boundary: multiple implementations, a test seam, a public contract across modules, or a dependency you genuinely want to replace. They are not required by DI. A sealed concrete class can be registered directly:`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">Concrete registration</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-complete">Complete pattern</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">builder.Services.AddScoped&lt;BookService&gt;();

// The controller can still receive it through constructor injection:
public BooksController(BookService books)
{
    _books = books;
}</code></pre><div class="code-expl">If there is one implementation and no substitution need, this can be simpler. Add an interface when it earns its keep, not as a reflex.</div></div>`
      },
      {
        type: "callout",
        kind: "warning",
        title: "⚠️ Do not turn the container into a service locator",
        html: `Resolving services with <code>serviceProvider.GetRequiredService&lt;T&gt;()</code> inside business code hides dependencies and makes testing harder. Prefer constructor injection. Explicit provider access is appropriate at infrastructure boundaries — a background worker creating a scope, a factory, or the composition root.`
      },
      {
        type: "h2",
        html: "When manual construction is fine"
      },
      {
        type: "list",
        ordered: false,
        items: [
          `<strong>DTOs, value objects, and entities</strong> have no container-managed lifetime. Creating them with <code>new</code> is normal.`,
          `<strong>Pure helpers</strong> with no dependencies can be static or instantiated directly; wrapping them in DI adds little.`,
          `<strong>Tests</strong> often construct the system under test and its fakes directly. That is a feature, not a violation.`,
          `<strong>The composition root</strong> is where the graph is assembled. That is the one place where construction knowledge belongs.`,
          `Manual construction becomes a problem when it bypasses a scope, duplicates configuration, or prevents the container from disposing a resource.`
        ]
      },
      {
        type: "callout",
        kind: "success",
        title: "✅ The path to remember",
        html: `<code>AddScoped&lt;IBookService, BookService&gt;()</code> registers a descriptor → <code>builder.Build()</code> creates the provider → the request opens a scope → the controller is constructed → the container resolves <code>IBookService</code> and <code>BooksContext</code> → the constructor receives them → the action calls the method.`
      },
      {
        type: "h2",
        html: "Knowledge checks"
      },
      {
        type: "html",
        html: "<div class=\"kc-mount\" data-kc-group=\"lesson-3\"></div>"
      },
      {
        type: "html",
        html: `<div class="refs-block"><div class="refs-title">Official references</div><ul><li><a href="https://learn.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection" target="_blank" rel="noopener noreferrer">Dependency injection in ASP.NET Core ↗</a></li><li><a href="https://learn.microsoft.com/en-us/dotnet/core/extensions/dependency-injection" target="_blank" rel="noopener noreferrer">Dependency injection in .NET ↗</a></li><li><a href="https://learn.microsoft.com/en-us/dotnet/architecture/modern-web-apps-azure/architectural-principles" target="_blank" rel="noopener noreferrer">Architectural principles ↗</a></li></ul></div>`
      },
      {
        type: "html",
        html: `<div class="lesson-footer-nav"><button class="btn-secondary" type="button" data-nav-target="lesson-2">← Designing application services</button>
<button class="btn-complete-lesson" type="button" data-lesson="lesson-3">Mark Lesson 3 Complete ✓</button>
<button class="btn-primary" type="button" data-nav-target="lesson-4">Next: Service lifetimes →</button></div>`
      }
    ]
  },
  {
    id: "lesson-4",
    badge: "L4",
    nav: "Service lifetimes",
    content: [
      {
        type: "html",
        html: `<span class="lesson-pill">L4 · Lesson</span><h1 class="lesson-h1">Service Lifetimes</h1><p class="lesson-lead">Transient, scoped, and singleton describe how often the container creates an instance. Choosing the wrong lifetime can leak memory, share state accidentally, or capture a scoped dependency inside a singleton.</p><div class="lesson-meta-bar"><span>🧠 5 knowledge checks</span><span>🔬 Lifetime simulator</span><span>⚠️ Captive dependency</span></div>`
      },
      {
        type: "h2",
        html: "Why lifetime is a design decision"
      },
      {
        type: "p",
        html: `A service lifetime answers two questions: <strong>how many instances exist</strong>, and <strong>who disposes them</strong>. The container owns disposal for services it creates. A transient service is created per resolution; a scoped service per DI scope; a singleton once for the provider's lifetime.`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">The three registrations</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-complete">Complete examples</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">builder.Services.AddTransient&lt;IReportBuilder, ReportBuilder&gt;();
builder.Services.AddScoped&lt;IBookService, BookService&gt;();
builder.Services.AddSingleton&lt;IBookCache, BookCache&gt;();</code></pre><div class="code-expl">The lifetime is part of the registration, not part of the class. The same implementation could be registered with a different lifetime, but that choice has consequences.</div></div>`
      },
      {
        type: "html",
        html: `<div class="table-wrapper"><table><thead><tr><th>Lifetime</th><th>Instance creation</th><th>Typical use</th><th>Watch out for</th></tr></thead><tbody>
<tr><td><code>Transient</code></td><td>A new instance every time the service is resolved.</td><td>Lightweight, stateless helpers; short-lived operations.</td><td>Many resolutions can create many objects; do not capture a transient in a longer-lived object if it holds expensive resources or per-request state.</td></tr>
<tr><td><code>Scoped</code></td><td>One instance per DI scope, shared by every resolution inside that scope.</td><td>Request-scoped work: a controller's collaborators, a <code>BooksContext</code>, a unit-of-work service.</td><td>Do not resolve a scoped service from the root provider or capture it in a singleton.</td></tr>
<tr><td><code>Singleton</code></td><td>One instance for the lifetime of the root provider — normally the application.</td><td>Configuration caches, stateless shared services, expensive thread-safe infrastructure.</td><td>Shared mutable state must be thread-safe; singleton does not mean “safe for concurrent use”.</td></tr>
</tbody></table></div>`
      },
      {
        type: "p",
        html: `In a normal ASP.NET Core request, the framework creates a DI scope around the request. That is why a scoped <code>BooksContext</code> can be shared by the controller and the services it calls during that request, and why it is disposed when the request ends.`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">What “per scope” means in code</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-fragment">Illustrative fragment</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">using var scope = app.Services.CreateScope();

var first = scope.ServiceProvider.GetRequiredService&lt;IBookService&gt;();
var second = scope.ServiceProvider.GetRequiredService&lt;IBookService&gt;();

// first and second are the same instance for a scoped registration.
// A new scope would produce a different instance.</code></pre><div class="code-expl"><code>app.Services</code> is the root provider. Creating a scope explicitly is how background workers and console hosts get a per-operation lifetime outside an HTTP request.</div></div>`
      },
      {
        type: "callout",
        kind: "info",
        title: "ℹ️ Scoped means “per scope”, not magically “per request”",
        html: `ASP.NET Core creates one scope per request in the normal hosting model, so “scoped = per request” is a useful shorthand. The precise rule is <strong>one instance per DI scope</strong>. A background worker that never creates a scope has no request scope at all — and resolving a scoped service from the root is an error.`
      },
      {
        type: "h2",
        html: "The lifetime simulator"
      },
      {
        type: "p",
        html: `Use the simulator to build intuition. Resolve the service several times inside one scope, then create a fresh scope and resolve again. Watch the instance labels, not just the counts.`
      },
      {
        type: "html",
        html: `<div class="simulator-widget" data-widget="lifetimes" id="w-lifetimes"><div class="simulator-header"><div class="simulator-title">🔬 Lifetime simulator</div><div class="m4-mode-note" style="margin-top:0;">Switch the registration, resolve repeatedly, and compare instances across scopes.</div></div><div class="simulator-body"></div></div>`
      },
      {
        type: "callout",
        kind: "info",
        title: "ℹ️ This is a teaching simulation",
        html: `The simulator models instance identity for each lifetime. It is not measuring real allocation, garbage collection, or the provider's internal caches. The labels are stable so you can compare resolutions; they are not production object identities.`
      },
      {
        type: "h2",
        html: "Choosing a lifetime"
      },
      {
        type: "list",
        ordered: false,
        items: [
          `<strong>Transient</strong> when the service is lightweight, stateless, and cheap to create; each consumer can safely get its own instance.`,
          `<strong>Scoped</strong> when the service holds per-operation state — most commonly EF Core's <code>DbContext</code> and application services that coordinate one request's work.`,
          `<strong>Singleton</strong> when one shared instance is genuinely intended: configuration, a cache whose concurrency you control, or thread-safe infrastructure.`,
          `<strong>Do not choose a lifetime to make a dependency error disappear.</strong> Changing a scoped service to singleton can turn a validation error into a correctness bug.`
        ]
      },
      {
        type: "callout",
        kind: "warning",
        title: "⚠️ Singleton is not a thread-safety guarantee",
        html: `A singleton is constructed once, but it can be used by many requests concurrently. If it contains mutable fields, a <code>List&lt;T&gt;</code>, a dictionary, or a <code>DbContext</code>, those members are shared. Either make the state thread-safe, avoid mutable shared state, or choose a different lifetime.`
      },
      {
        type: "h2",
        html: "Disposal and ownership"
      },
      {
        type: "p",
        html: `The container disposes services that implement <code>IDisposable</code> or <code>IAsyncDisposable</code> when their scope ends. That is another reason not to construct a scoped service manually and stash it somewhere: the container may not know about your instance, and nobody may dispose it.`
      },
      {
        type: "p",
        html: `Lesson 5 puts these rules together in the hardest common case: a singleton that needs data access.`
      },
      {
        type: "h2",
        html: "Knowledge checks"
      },
      {
        type: "html",
        html: "<div class=\"kc-mount\" data-kc-group=\"lesson-4\"></div>"
      },
      {
        type: "html",
        html: `<div class="refs-block"><div class="refs-title">Official references</div><ul><li><a href="https://learn.microsoft.com/en-us/dotnet/core/extensions/dependency-injection/service-lifetimes" target="_blank" rel="noopener noreferrer">Service lifetimes in .NET DI ↗</a></li><li><a href="https://learn.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection" target="_blank" rel="noopener noreferrer">Dependency injection in ASP.NET Core ↗</a></li><li><a href="https://learn.microsoft.com/en-us/dotnet/core/extensions/dependency-injection/guidelines" target="_blank" rel="noopener noreferrer">Dependency injection guidelines ↗</a></li></ul></div>`
      },
      {
        type: "html",
        html: `<div class="lesson-footer-nav"><button class="btn-secondary" type="button" data-nav-target="lesson-3">← Dependency injection fundamentals</button>
<button class="btn-complete-lesson" type="button" data-lesson="lesson-4">Mark Lesson 4 Complete ✓</button>
<button class="btn-primary" type="button" data-nav-target="lesson-5">Next: DbContext lifetime and background work →</button></div>`
      }
    ]
  },
  {
    id: "lesson-5",
    badge: "L5",
    nav: "DbContext lifetime and background work",
    content: [
      {
        type: "html",
        html: `<span class="lesson-pill">L5 · Lesson</span><h1 class="lesson-h1">DbContext Lifetime, Captive Dependencies, and Background Services</h1><p class="lesson-lead">One lifetime mistake causes a large share of production DI bugs: a singleton captures a scoped service. EF Core's <code>DbContext</code> makes that mistake especially expensive.</p><div class="lesson-meta-bar"><span>🧠 5 knowledge checks</span><span>🕸️ Dependency-graph exercise</span><span>🧵 Background workers</span></div>`
      },
      {
        type: "h2",
        html: "DbContext is a scoped unit of work"
      },
      {
        type: "p",
        html: `<code>AddDbContext&lt;BooksContext&gt;()</code> registers the context as <strong>scoped</strong> by default. That matches its design: a context tracks entities for one unit of work, translates queries, and saves changes. It is not thread-safe, and it is not intended to live for the whole application.`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">Program.cs — the normal registration</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-complete">Complete registration</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">builder.Services.AddDbContext&lt;BooksContext&gt;(options =&gt;
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("Raff")));</code></pre><div class="code-expl">Scoped by default: one context per DI scope. In a web request, that scope usually wraps the request.</div></div>`
      },
      {
        type: "p",
        html: `A scoped context works well when the controller, service, and repository all participate in the same request scope. It becomes dangerous when a longer-lived object holds onto it.`
      },
      {
        type: "h2",
        html: "The captive dependency"
      },
      {
        type: "p",
        html: `Imagine a singleton cache that loads book data. The obvious constructor injection is the wrong one:`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">BookCacheService.cs — captive dependency</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-anti-pattern">Anti-pattern</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">public sealed class BookCacheService
{
    private readonly BooksContext _context;

    public BookCacheService(BooksContext context)
    {
        _context = context; // ❌ scoped service captured by a singleton
    }
}

builder.Services.AddSingleton&lt;BookCacheService&gt;();</code></pre><div class="code-expl">The singleton lives for the application; the context is supposed to live for a scope. The singleton now holds the scoped instance far beyond the scope's lifetime — a <strong>captive dependency</strong>.</div></div>`
      },
      {
        type: "callout",
        kind: "warning",
        title: "⚠️ What the container may report",
        html: `With scope validation enabled — commonly in Development — the provider throws an <code>InvalidOperationException</code> such as “Cannot consume scoped service 'BooksContext' from singleton 'BookCacheService'.” If validation is disabled, the graph may be built and the bug appears later as disposed-context errors, stale tracked entities, or concurrency failures.`
      },
      {
        type: "p",
        html: `The name “captive” is literal: the longer-lived object captures the shorter-lived one. The fix is not to change the context to a singleton. The fix is to make the longer-lived object create or receive a context with the correct lifetime for each operation.`
      },
      {
        type: "h2",
        html: "Fix 1: create a scope per operation"
      },
      {
        type: "p",
        html: `A singleton can depend on <code>IServiceScopeFactory</code>, which is itself a singleton. For each operation, it creates a scope, resolves scoped services from that scope, and disposes the scope when done.`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">BookCacheService.cs — scope per operation</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-complete">Complete pattern</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">public sealed class BookCacheService
{
    private readonly IServiceScopeFactory _scopeFactory;

    public BookCacheService(IServiceScopeFactory scopeFactory)
    {
        _scopeFactory = scopeFactory;
    }

    public async Task&lt;BookDto?&gt; GetAsync(
        int id,
        CancellationToken cancellationToken = default)
    {
        await using var scope = _scopeFactory.CreateAsyncScope();
        var context = scope.ServiceProvider
            .GetRequiredService&lt;BooksContext&gt;();

        return await context.Books
            .AsNoTracking()
            .Where(b =&gt; b.Id == id)
            .Select(b =&gt; new BookDto(b.Id, b.Title, b.PublishedYear, b.Summary))
            .FirstOrDefaultAsync(cancellationToken);
    }
}</code></pre><div class="code-expl">The scope owns the context. The singleton owns no context at all — only the factory that can create a correctly scoped one. <code>CreateAsyncScope()</code> supports asynchronous disposal.</div></div>`
      },
      {
        type: "h2",
        html: "Fix 2: use IDbContextFactory"
      },
      {
        type: "p",
        html: `When the main need is “create a fresh context on demand”, <code>IDbContextFactory&lt;TContext&gt;</code> is a focused abstraction. Register it with <code>AddDbContextFactory</code>; the factory is safe for a singleton to depend on because it creates and returns a new context per call.`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">Program.cs — register the factory</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-complete">Complete registration</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">builder.Services.AddDbContextFactory&lt;BooksContext&gt;(options =&gt;
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("Raff")));</code></pre><div class="code-expl">This registers <code>IDbContextFactory&lt;BooksContext&gt;</code> as a singleton and also registers <code>BooksContext</code> as scoped for normal consumers. Use the factory when you need explicit, short-lived contexts.</div></div>`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">BookCacheService.cs — factory-created context</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-complete">Complete pattern</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">public sealed class BookCacheService
{
    private readonly IDbContextFactory&lt;BooksContext&gt; _factory;

    public BookCacheService(IDbContextFactory&lt;BooksContext&gt; factory)
    {
        _factory = factory;
    }

    public async Task&lt;BookDto?&gt; GetAsync(
        int id,
        CancellationToken cancellationToken = default)
    {
        await using var context = await _factory
            .CreateDbContextAsync(cancellationToken);

        return await context.Books
            .AsNoTracking()
            .Where(b =&gt; b.Id == id)
            .Select(b =&gt; new BookDto(b.Id, b.Title, b.PublishedYear, b.Summary))
            .FirstOrDefaultAsync(cancellationToken);
    }
}</code></pre><div class="code-expl">The context is created for this operation and disposed at the end of the method. The singleton never captures it.</div></div>`
      },
      {
        type: "h2",
        html: "Fix 3: move the work into a scoped operation"
      },
      {
        type: "p",
        html: `Sometimes the real mistake is not the injection — it is the lifetime of the object doing the work. If a cache needs a fresh context per lookup, maybe the cache itself should be scoped, or the data access should move into a scoped service that the singleton calls through a scope. Do not force a singleton shape onto work that is naturally per-operation.`
      },
      {
        type: "h2",
        html: "Background services are singletons"
      },
      {
        type: "p",
        html: `A <code>BackgroundService</code> is registered as a hosted service and is effectively a singleton. Constructor-injecting a scoped <code>BooksContext</code> or <code>IBookService</code> creates the same captive dependency. Create a scope inside <code>ExecuteAsync</code> for each unit of work.`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">OverdueReadingWorker.cs</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-complete">Complete illustrative worker</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">public sealed class OverdueReadingWorker : BackgroundService
{
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly ILogger&lt;OverdueReadingWorker&gt; _logger;

    public OverdueReadingWorker(
        IServiceScopeFactory scopeFactory,
        ILogger&lt;OverdueReadingWorker&gt; logger)
    {
        _scopeFactory = scopeFactory;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(
        CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                await using var scope = _scopeFactory.CreateAsyncScope();
                var service = scope.ServiceProvider
                    .GetRequiredService&lt;IReadingService&gt;();

                await service.MarkOverdueAsync(stoppingToken);
            }
            catch (OperationCanceledException)
                when (stoppingToken.IsCancellationRequested)
            {
                break;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Overdue reading sweep failed.");
            }

            await Task.Delay(TimeSpan.FromHours(6), stoppingToken);
        }
    }
}</code></pre><div class="code-expl">The worker survives for the application lifetime; each sweep gets a fresh scope and a fresh scoped service/context. This is the standard pattern, not a workaround.</div></div>`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">Program.cs — register the worker</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-complete">Complete registration</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">builder.Services.AddHostedService&lt;OverdueReadingWorker&gt;();</code></pre><div class="code-expl">Hosted services start with the host and stop when the host shuts down. They are not request-scoped.</div></div>`
      },
      {
        type: "callout",
        kind: "warning",
        title: "⚠️ Catch carefully in a long-running worker",
        html: `An unhandled exception in <code>ExecuteAsync</code> can stop the host, depending on the .NET version and hosting configuration. Catch per iteration, log the failure, and respect cancellation. Do not catch <code>OperationCanceledException</code> as a normal error when shutdown requested it.`
      },
      {
        type: "h2",
        html: "Dependency-graph exercise"
      },
      {
        type: "p",
        html: `Each scenario shows a lifetime graph. Decide whether it is safe, then choose the correction if it is not. Read the edges carefully: the problem is not always the service named in the error.`
      },
      {
        type: "html",
        html: `<div class="simulator-widget" data-widget="dependency-graph" id="w-dependency-graph"><div class="simulator-header"><div class="simulator-title">🕸️ Dependency-graph exercise</div><div class="m4-mode-note" style="margin-top:0;">Four graphs. Find the captive or unsafe edge and choose the smallest safe fix.</div></div><div class="simulator-body"></div></div>`
      },
      {
        type: "h2",
        html: "Knowledge checks"
      },
      {
        type: "html",
        html: "<div class=\"kc-mount\" data-kc-group=\"lesson-5\"></div>"
      },
      {
        type: "html",
        html: `<div class="refs-block"><div class="refs-title">Official references</div><ul><li><a href="https://learn.microsoft.com/en-us/ef/core/dbcontext-configuration/" target="_blank" rel="noopener noreferrer">DbContext configuration and lifetime ↗</a></li><li><a href="https://learn.microsoft.com/en-us/dotnet/core/extensions/workers" target="_blank" rel="noopener noreferrer">Worker Services in .NET ↗</a></li><li><a href="https://learn.microsoft.com/en-us/dotnet/core/extensions/dependency-injection/guidelines" target="_blank" rel="noopener noreferrer">Dependency injection guidelines ↗</a></li></ul></div>`
      },
      {
        type: "html",
        html: `<div class="lesson-footer-nav"><button class="btn-secondary" type="button" data-nav-target="lesson-4">← Service lifetimes</button>
<button class="btn-complete-lesson" type="button" data-lesson="lesson-5">Mark Lesson 5 Complete ✓</button>
<button class="btn-primary" type="button" data-nav-target="lesson-6">Next: Repositories and unit of work →</button></div>`
      }
    ]
  },
  {
    id: "lesson-6",
    badge: "L6",
    nav: "Repositories and unit of work",
    content: [
      {
        type: "html",
        html: `<span class="lesson-pill">L6 · Lesson</span><h1 class="lesson-h1">Repositories and Unit of Work</h1><p class="lesson-lead">A repository is a boundary around data access. It is useful when it simplifies the application — not when it hides the database behind a generic interface and makes every query harder.</p><div class="lesson-meta-bar"><span>🧠 4 knowledge checks</span><span>🧱 Focused repository</span><span>📦 Unit-of-work trade-offs</span></div>`
      },
      {
        type: "h2",
        html: "DbContext is already a repository and a unit of work"
      },
      {
        type: "p",
        html: `EF Core's <code>DbContext</code> exposes <code>DbSet&lt;T&gt;</code> query roots, tracks changes, and commits them with <code>SaveChangesAsync</code>. In that sense it already combines a repository-like query surface with a unit-of-work boundary. Adding another layer is a design choice, not a requirement.`
      },
      {
        type: "p",
        html: `For a small application, injecting <code>BooksContext</code> directly into an application service is often the clearest option. The service can use LINQ, projections, <code>Include</code>, and transactions without a wrapper getting in the way. The cost is that EF Core types appear in the service — which is usually acceptable in an ASP.NET Core application that is intentionally built on EF Core.`
      },
      {
        type: "h2",
        html: "What a focused repository adds"
      },
      {
        type: "p",
        html: `A focused repository names the data-access operations the application actually needs. It can centralize a query shape, make a persistence detail replaceable, or keep a complex data-access rule in one place.`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">IBookRepository.cs — focused, not generic</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-fragment">Illustrative contract</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">public interface IBookRepository
{
    Task&lt;BookDto?&gt; GetByIdAsync(
        int id,
        CancellationToken cancellationToken = default);

    Task&lt;int&gt; CountReadingEntriesAsync(
        int bookId,
        CancellationToken cancellationToken = default);

    void Remove(Book book);
}</code></pre><div class="code-expl">The interface speaks in application terms: a projected read, a count the delete rule needs, and a removal. It does not attempt to expose every EF Core operation.</div></div>`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">BookRepository.cs</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-fragment">Illustrative implementation</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">public sealed class BookRepository : IBookRepository
{
    private readonly BooksContext _context;

    public BookRepository(BooksContext context)
    {
        _context = context;
    }

    public Task&lt;BookDto?&gt; GetByIdAsync(
        int id,
        CancellationToken cancellationToken = default)
    {
        return _context.Books
            .AsNoTracking()
            .Where(b =&gt; b.Id == id)
            .Select(b =&gt; new BookDto(b.Id, b.Title, b.PublishedYear, b.Summary))
            .FirstOrDefaultAsync(cancellationToken);
    }

    public Task&lt;int&gt; CountReadingEntriesAsync(
        int bookId,
        CancellationToken cancellationToken = default)
    {
        return _context.ReadingEntries
            .CountAsync(e =&gt; e.BookId == bookId, cancellationToken);
    }

    public void Remove(Book book) =&gt; _context.Books.Remove(book);
}</code></pre><div class="code-expl">The repository is scoped because it depends on the scoped context. It does not call <code>SaveChangesAsync</code>; committing is the unit of work's job.</div></div>`
      },
      {
        type: "p",
        html: `The service can now depend on the repository for reads and removal, while still depending on the context — or a unit-of-work abstraction — to commit:`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">BookService.cs — repository plus commit</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-fragment">Illustrative fragment</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">public async Task&lt;DeleteBookResult&gt; DeleteBookAsync(
    int id,
    CancellationToken cancellationToken = default)
{
    var book = await _context.Books
        .FirstOrDefaultAsync(b =&gt; b.Id == id, cancellationToken);

    if (book is null)
        return new DeleteBookResult(DeleteBookOutcome.NotFound);

    var entryCount = await _books.CountReadingEntriesAsync(id, cancellationToken);
    if (entryCount &gt; 0)
        return new DeleteBookResult(
            DeleteBookOutcome.HasReadingEntries, entryCount);

    _books.Remove(book);
    await _context.SaveChangesAsync(cancellationToken);
    return new DeleteBookResult(DeleteBookOutcome.Deleted);
}</code></pre><div class="code-expl">Mixing a repository for some operations with the context for others can be a reasonable transition, but it can also be inconsistent. Decide which boundary the service is using and keep it coherent.</div></div>`
      },
      {
        type: "callout",
        kind: "info",
        title: "ℹ️ A focused repository does not make EF Core disappear",
        html: `The implementation still uses EF Core, and the service still depends on the context for the tracked entity and the commit. That is normal. If the goal is to remove every EF Core type from the application layer, use a full persistence abstraction consistently — and accept the extra mapping and query limitations it brings.`
      },
      {
        type: "h2",
        html: "Why generic repositories often hurt"
      },
      {
        type: "p",
        html: `A generic <code>IRepository&lt;T&gt;</code> with <code>GetAll</code>, <code>GetById</code>, <code>Add</code>, <code>Update</code>, and <code>Delete</code> looks tidy, but it usually creates new problems:`
      },
      {
        type: "list",
        ordered: false,
        items: [
          `<strong>Leaky queries.</strong> Callers need filtering, projection, includes, ordering, and pagination. The generic interface either omits them or leaks <code>IQueryable&lt;T&gt;</code>, which defeats the abstraction.`,
          `<strong>Anemic contracts.</strong> “Update” hides whether the entity is attached, whether concurrency is checked, and which fields may change.`,
          `<strong>One-size-fits-all lifetime and behavior.</strong> A book query and an audit-log write rarely share useful semantics.`,
          `<strong>False replaceability.</strong> Swapping a relational database for another store is rarely a drop-in change just because a generic interface exists.`,
          `<strong>More surface to test and maintain.</strong> The wrapper often becomes a second, less capable ORM.`
        ]
      },
      {
        type: "p",
        html: `A generic repository can be justified in a framework or a deliberately persistence-agnostic domain. In a normal ASP.NET Core + EF Core application, a focused repository or direct <code>DbContext</code> use is usually simpler and more honest.`
      },
      {
        type: "h2",
        html: "Unit of work: explicit or built in?"
      },
      {
        type: "p",
        html: `A unit of work groups changes that must be committed together. <code>DbContext.SaveChangesAsync</code> is already that commit boundary for the entities it tracks. You need an explicit unit-of-work abstraction when several repositories or data sources must participate in one transaction, or when the application layer must not see <code>DbContext</code> at all.`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">Explicit unit of work — only when it earns its keep</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-fragment">Illustrative contract</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">public interface IUnitOfWork
{
    Task&lt;int&gt; SaveChangesAsync(
        CancellationToken cancellationToken = default);
}

public sealed class EfUnitOfWork : IUnitOfWork
{
    private readonly BooksContext _context;

    public EfUnitOfWork(BooksContext context)
    {
        _context = context;
    }

    public Task&lt;int&gt; SaveChangesAsync(
        CancellationToken cancellationToken = default)
    {
        return _context.SaveChangesAsync(cancellationToken);
    }
}</code></pre><div class="code-expl">This abstraction is thin. It is useful when application services should not reference <code>DbContext</code>, or when the unit of work coordinates more than one repository. Otherwise it can be ceremony.</div></div>`
      },
      {
        type: "html",
        html: `<div class="table-wrapper"><table><thead><tr><th>Scenario</th><th>Reasonable default</th><th>Why</th></tr></thead><tbody>
<tr><td>Small Raff API, EF Core is the persistence choice</td><td>Inject <code>BooksContext</code> into application services</td><td>Fewest layers, full query expressiveness, one obvious unit of work.</td></tr>
<tr><td>A query shape is reused and complex</td><td>Focused repository method</td><td>Names the data need and keeps the query in one place.</td></tr>
<tr><td>Several repositories must commit one transaction</td><td>Explicit unit of work or a transaction boundary</td><td>The commit must coordinate more than one data-access object.</td></tr>
<tr><td>Domain must be persistence-agnostic</td><td>Repository interfaces plus mapping</td><td>The abstraction has a real architectural purpose, with real costs.</td></tr>
<tr><td>“We might replace the database someday”</td><td>Usually direct EF Core</td><td>Speculative replaceability rarely pays for the abstraction; a real migration will require real changes anyway.</td></tr>
</tbody></table></div>`
      },
      {
        type: "callout",
        kind: "success",
        title: "✅ Decision rule",
        html: `Add a repository when it makes the application code clearer or isolates a real boundary. Do not add one only because a tutorial says every entity needs a repository. The best abstraction is the one that removes more complexity than it introduces.`
      },
      {
        type: "h2",
        html: "Knowledge checks"
      },
      {
        type: "html",
        html: "<div class=\"kc-mount\" data-kc-group=\"lesson-6\"></div>"
      },
      {
        type: "html",
        html: `<div class="refs-block"><div class="refs-title">Official references</div><ul><li><a href="https://learn.microsoft.com/en-us/ef/core/dbcontext-configuration/" target="_blank" rel="noopener noreferrer">DbContext configuration and lifetime ↗</a></li><li><a href="https://learn.microsoft.com/en-us/ef/core/saving/transactions" target="_blank" rel="noopener noreferrer">Transactions in EF Core ↗</a></li><li><a href="https://learn.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/infrastructure-persistence-layer-design" target="_blank" rel="noopener noreferrer">Designing the infrastructure persistence layer ↗</a></li></ul></div>`
      },
      {
        type: "html",
        html: `<div class="lesson-footer-nav"><button class="btn-secondary" type="button" data-nav-target="lesson-5">← DbContext lifetime and background work</button>
<button class="btn-complete-lesson" type="button" data-lesson="lesson-6">Mark Lesson 6 Complete ✓</button>
<button class="btn-primary" type="button" data-nav-target="lesson-7">Next: Refactoring challenge →</button></div>`
      }
    ]
  },
  {
    id: "lesson-7",
    badge: "L7",
    nav: "Refactoring challenge",
    content: [
      {
        type: "html",
        html: `<span class="lesson-pill">L7 · Practice</span><h1 class="lesson-h1">Refactoring Challenge: From Controller Mess to Application Service</h1><p class="lesson-lead">This is the module's hands-on refactor. Start with a controller that works but owns too much, extract the use case, fix the lifetime and time dependencies, and verify the HTTP contract did not change.</p><div class="lesson-meta-bar"><span>🧠 4 knowledge checks</span><span>🧩 Progressive hints</span><span>✅ Complete solution + tests</span></div>`
      },
      {
        type: "h2",
        html: "The scenario"
      },
      {
        type: "p",
        html: `Raff has an endpoint that starts a reading entry for the current user. The existing action passes its happy-path test, but it reaches straight into <code>BooksContext</code>, owns the duplicate rule, reads the clock directly, and returns a tracked entity. Refactor it so the use case lives in an application service while the HTTP contract stays the same.`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">ReadingEntriesController.cs — starting point</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-anti-pattern">Refactor me</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">[HttpPost("{bookId:int}/reading-entries")]
public async Task&lt;IActionResult&gt; StartReading(
    int bookId,
    CancellationToken cancellationToken)
{
    var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
    if (string.IsNullOrWhiteSpace(userId))
        return Unauthorized();

    var book = await _context.Books
        .Include(b =&gt; b.ReadingEntries)
        .FirstOrDefaultAsync(b =&gt; b.Id == bookId, cancellationToken);

    if (book is null)
        return NotFound();

    if (book.ReadingEntries.Any(e =&gt; e.UserId == userId))
        return Conflict(new ProblemDetails
        {
            Title = "Reading entry already exists."
        });

    var entry = new ReadingEntry
    {
        BookId = bookId,
        UserId = userId,
        CurrentPage = 0,
        StartedAt = DateTime.UtcNow
    };

    _context.ReadingEntries.Add(entry);
    await _context.SaveChangesAsync(cancellationToken);

    return CreatedAtAction(
        nameof(GetEntry),
        new { id = entry.Id },
        entry);
}</code></pre><div class="code-expl">The action works for one request. It also owns persistence shape, the duplicate rule, time, and response mapping. The refactor should move the use case without changing the route, status codes, or response body shape clients already depend on.</div></div>`
      },
      {
        type: "callout",
        kind: "info",
        title: "ℹ️ What must not change",
        html: `The public contract: <code>POST /api/books/{bookId}/reading-entries</code>, 401 for an unauthenticated request, 404 for a missing book, 409 for a duplicate entry, and 201 with the created entry for success. Internal structure is free to change; observable behavior is not.`
      },
      {
        type: "h2",
        html: "Progressive hints"
      },
      {
        type: "html",
        html: `<details class="hint-details"><summary>Hint 1 — Name the use case and its outcomes</summary><div class="hint-body"><p>The use case is “start reading a book for a user”. Its expected outcomes are <strong>started</strong>, <strong>book not found</strong>, and <strong>already reading</strong>. Authentication failure remains an HTTP-boundary concern because it happens before the use case is called.</p><p>Create an <code>IReadingService</code> with one method:</p><pre><code class="language-cs">Task&lt;StartReadingResult&gt; StartReadingAsync(
    int bookId,
    string userId,
    CancellationToken cancellationToken = default);</code></pre><p>Use a result type rather than returning <code>bool</code> or an MVC result.</p></div></details>`
      },
      {
        type: "html",
        html: `<details class="hint-details"><summary>Hint 2 — Move the query and the rule</summary><div class="hint-body"><p>The service should check whether the book exists, check whether this user already has an entry, create the entity, save it, and return a DTO. The controller should extract the user id, call the service, and map outcomes to status codes.</p><p>Do not return the tracked <code>ReadingEntry</code> from the service. Project or map to a DTO so the response contract is explicit.</p></div></details>`
      },
      {
        type: "html",
        html: `<details class="hint-details"><summary>Hint 3 — Make time injectable and register the service</summary><div class="hint-body"><p>Replace <code>DateTime.UtcNow</code> with an injected <code>TimeProvider</code> so the service's time behavior can be tested deterministically. Register the service as scoped, because it depends on the scoped <code>BooksContext</code>.</p><pre><code class="language-cs">builder.Services.AddSingleton(TimeProvider.System);
builder.Services.AddScoped&lt;IReadingService, ReadingService&gt;();</code></pre></div></details>`
      },
      {
        type: "html",
        html: `<details class="hint-details"><summary>Hint 4 — Think about the race, then verify</summary><div class="hint-body"><p>A check-then-insert is not a concurrency guarantee. Two requests can both see “no entry” and both insert. Add a unique database index on <code>(BookId, UserId)</code> and translate a unique-constraint violation into the same 409 outcome.</p><p>Verify 201, 404, 409, and 401 with real HTTP requests. Use a real relational database for the constraint test — EF Core InMemory does not enforce unique indexes or relational constraints.</p></div></details>`
      },
      {
        type: "h2",
        html: "Complete solution"
      },
      {
        type: "p",
        html: `First define the result contract and the DTO. The result records the expected application outcomes; the DTO defines what the endpoint returns.`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">StartReadingResult.cs</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-complete">Complete solution</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">public enum StartReadingOutcome
{
    Started,
    BookNotFound,
    AlreadyReading
}

public sealed record StartReadingResult(
    StartReadingOutcome Outcome,
    ReadingEntryDto? Entry = null);

public sealed record ReadingEntryDto(
    int Id,
    int BookId,
    string UserId,
    int CurrentPage,
    DateTimeOffset StartedAt);</code></pre><div class="code-expl">The outcome does not mention HTTP. The DTO is the response contract, so the entity and its navigation properties do not escape the persistence boundary.</div></div>`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">IReadingService.cs</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-complete">Complete solution</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">public interface IReadingService
{
    Task&lt;StartReadingResult&gt; StartReadingAsync(
        int bookId,
        string userId,
        CancellationToken cancellationToken = default);
}</code></pre><div class="code-expl">The interface describes an application use case, not an HTTP operation. Authentication is already resolved by the controller before it calls this method.</div></div>`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">ReadingService.cs</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-complete">Complete solution</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">public sealed class ReadingService : IReadingService
{
    private readonly BooksContext _context;
    private readonly TimeProvider _clock;

    public ReadingService(BooksContext context, TimeProvider clock)
    {
        _context = context;
        _clock = clock;
    }

    public async Task&lt;StartReadingResult&gt; StartReadingAsync(
        int bookId,
        string userId,
        CancellationToken cancellationToken = default)
    {
        var bookExists = await _context.Books
            .AnyAsync(b =&gt; b.Id == bookId, cancellationToken);

        if (!bookExists)
            return new StartReadingResult(StartReadingOutcome.BookNotFound);

        var alreadyReading = await _context.ReadingEntries
            .AnyAsync(
                e =&gt; e.BookId == bookId &amp;&amp; e.UserId == userId,
                cancellationToken);

        if (alreadyReading)
            return new StartReadingResult(StartReadingOutcome.AlreadyReading);

        var entry = new ReadingEntry
        {
            BookId = bookId,
            UserId = userId,
            CurrentPage = 0,
            StartedAt = _clock.GetUtcNow()
        };

        _context.ReadingEntries.Add(entry);
        await _context.SaveChangesAsync(cancellationToken);

        var dto = new ReadingEntryDto(
            entry.Id,
            entry.BookId,
            entry.UserId,
            entry.CurrentPage,
            entry.StartedAt);

        return new StartReadingResult(StartReadingOutcome.Started, dto);
    }
}</code></pre><div class="code-expl">The service owns the use case. It uses a query for existence rather than loading every reading entry for the book, and it returns a DTO. The injected clock makes the timestamp deterministic in tests.</div></div>`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">ReadingEntriesController.cs — after</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-complete">Complete solution</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">[HttpPost("{bookId:int}/reading-entries")]
public async Task&lt;IActionResult&gt; StartReading(
    int bookId,
    CancellationToken cancellationToken)
{
    var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
    if (string.IsNullOrWhiteSpace(userId))
        return Unauthorized();

    var result = await _readings.StartReadingAsync(
        bookId, userId, cancellationToken);

    return result.Outcome switch
    {
        StartReadingOutcome.Started when result.Entry is not null =&gt;
            CreatedAtAction(
                nameof(GetEntry),
                new { id = result.Entry.Id },
                result.Entry),

        StartReadingOutcome.BookNotFound =&gt; NotFound(),

        StartReadingOutcome.AlreadyReading =&gt; Conflict(new ProblemDetails
        {
            Title = "Reading entry already exists."
        }),

        _ =&gt; StatusCode(StatusCodes.Status500InternalServerError)
    };
}</code></pre><div class="code-expl">The controller now owns identity extraction and HTTP mapping. It does not know how the duplicate rule is implemented, and it cannot accidentally return a tracked entity.</div></div>`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">Program.cs — registration</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-complete">Complete solution</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">builder.Services.AddSingleton(TimeProvider.System);
builder.Services.AddScoped&lt;IReadingService, ReadingService&gt;();</code></pre><div class="code-expl">Both lifetimes are deliberate. The clock is a stateless singleton; the reading service is scoped because it uses the scoped <code>BooksContext</code>.</div></div>`
      },
      {
        type: "h2",
        html: "Close the concurrency gap"
      },
      {
        type: "p",
        html: `The service's check is still a check-then-act. A unique index is the database-level guarantee. Add it to the model configuration and handle the violation:`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">BooksContext.cs — unique index</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-fragment">Illustrative fragment</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">modelBuilder.Entity&lt;ReadingEntry&gt;()
    .HasIndex(e =&gt; new { e.BookId, e.UserId })
    .IsUnique();</code></pre><div class="code-expl">The index prevents two entries for the same user and book even when two requests race. The service check still gives a friendly 409 in the common case; the constraint handles the race.</div></div>`
      },
      {
        type: "p",
        html: `For the race path, catch <code>DbUpdateException</code> when the provider reports a unique violation and return <code>AlreadyReading</code>. In PostgreSQL, the SQLSTATE for a unique violation is <code>23505</code>; inspect the provider's exception details rather than catching every database failure as a duplicate.`
      },
      {
        type: "h2",
        html: "Tests and verification"
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">BooksControllerTests.cs — mapping test with a fake</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-complete">Illustrative test</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">public sealed class FakeReadingService : IReadingService
{
    public StartReadingResult Result { get; set; } =
        new(StartReadingOutcome.BookNotFound);

    public Task&lt;StartReadingResult&gt; StartReadingAsync(
        int bookId,
        string userId,
        CancellationToken cancellationToken = default)
    {
        return Task.FromResult(Result);
    }
}

public sealed class ReadingEntriesControllerTests
{
    [Fact]
    public async Task StartReading_ReturnsConflict_WhenAlreadyReading()
    {
        var service = new FakeReadingService
        {
            Result = new StartReadingResult(StartReadingOutcome.AlreadyReading)
        };
        var controller = new ReadingEntriesController(service);

        var result = await controller.StartReading(7, CancellationToken.None);

        var conflict = Assert.IsType&lt;ConflictObjectResult&gt;(result);
        var problem = Assert.IsType&lt;ProblemDetails&gt;(conflict.Value);
        Assert.Equal("Reading entry already exists.", problem.Title);
    }
}</code></pre><div class="code-expl">This test checks the HTTP mapping in isolation. It does not prove the database rule; that needs an integration test against a relational database.</div></div>`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">raff-module-05.http — contract checks</span><span class="code-badge-group"><span class="code-lang-tag">http</span><span class="code-type-pill pill-complete">Illustrative requests</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-http">### Start reading — expect 201 Created
POST http://localhost:5000/api/books/1/reading-entries
Authorization: Bearer {{token}}

### Start again — expect 409 Conflict
POST http://localhost:5000/api/books/1/reading-entries
Authorization: Bearer {{token}}

### Missing book — expect 404 Not Found
POST http://localhost:5000/api/books/999999/reading-entries
Authorization: Bearer {{token}}

### No token — expect 401 Unauthorized
POST http://localhost:5000/api/books/1/reading-entries</code></pre><div class="code-expl">Use a real PostgreSQL database for these checks. Add an integration test that sends two concurrent requests and asserts only one 201 and one 409; that is what proves the unique index and race handling.</div></div>`
      },
      {
        type: "callout",
        kind: "success",
        title: "✅ Refactor review checklist",
        html: `<ul style="margin-bottom:0;"><li>Does the controller only extract identity and map outcomes?</li><li>Does the service own the rule and the persistence sequence?</li><li>Is time injected rather than read from a static?</li><li>Is the service scoped to match the context?</li><li>Is the response a DTO rather than a tracked entity?</li><li>Is the duplicate rule protected by a unique index, not only by a check?</li><li>Are 401/404/409/201 still identical from the client's perspective?</li></ul>`
      },
      {
        type: "h2",
        html: "Knowledge checks"
      },
      {
        type: "html",
        html: "<div class=\"kc-mount\" data-kc-group=\"lesson-7\"></div>"
      },
      {
        type: "html",
        html: `<div class="refs-block"><div class="refs-title">Official references</div><ul><li><a href="https://learn.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection" target="_blank" rel="noopener noreferrer">Dependency injection in ASP.NET Core ↗</a></li><li><a href="https://learn.microsoft.com/en-us/ef/core/modeling/indexes" target="_blank" rel="noopener noreferrer">Indexes and unique constraints in EF Core ↗</a></li><li><a href="https://learn.microsoft.com/en-us/dotnet/core/extensions/dependency-injection/service-lifetimes" target="_blank" rel="noopener noreferrer">Service lifetimes in .NET DI ↗</a></li></ul></div>`
      },
      {
        type: "html",
        html: `<div class="lesson-footer-nav"><button class="btn-secondary" type="button" data-nav-target="lesson-6">← Repositories and unit of work</button>
<button class="btn-complete-lesson" type="button" data-lesson="lesson-7">Mark Lesson 7 Complete ✓</button>
<button class="btn-primary" type="button" data-nav-target="lesson-assessment">Next: Final assessment →</button></div>`
      }
    ]
  },
  {
    id: "lesson-assessment",
    badge: "🎓",
    nav: "Final assessment",
    content: [
      {
        type: "html",
        html: `<span class="lesson-pill">🎓 Final assessment</span><h1 class="lesson-h1">Module assessment</h1><p class="lesson-lead">Fourteen questions across the module. The pass threshold defaults to 80% and can be set to 70% or 90% before you begin. Each result links back to the lesson that owns the topic.</p><div class="lesson-meta-bar"><span>🧠 14 questions</span><span>🎯 Configurable pass threshold</span><span>📊 Topic breakdown</span></div>`
      },
      {
        type: "html",
        html: `<div class="assessment-intro" id="assessment-intro">
  <div class="content-panel">
    <h3 style="margin-top:0;">📋 Before you begin</h3>
    <ul>
      <li>Questions cover Lessons 1–7. You can retake the assessment; your best score counts toward progress.</li>
      <li>The pass threshold defaults to 80% and can be set to 70% / 80% / 90%.</li>
      <li>The review after submission links every missed question back to the lesson that owns it.</li>
      <li>Answers and results are stored locally with your other progress and travel with it on export.</li>
    </ul>
    <div class="assessment-config-row">
      <label for="assessment-threshold">Pass threshold:</label>
      <select id="assessment-threshold" class="assessment-select">
        <option value="70">70%</option>
        <option value="80" selected>80%</option>
        <option value="90">90%</option>
      </select>
      <button class="btn-primary" id="btn-start-assessment" type="button">Start Assessment ▶</button>
    </div>
  </div>
</div>`
      },
      {
        type: "html",
        html: "<div class=\"assessment-questions\" id=\"assessment-questions\" hidden></div>"
      },
      {
        type: "html",
        html: `<div class="assessment-actions" id="assessment-actions" hidden>
  <button class="btn-primary" id="btn-submit-assessment" type="button">Submit Assessment</button>
  <button class="btn-secondary" id="btn-retry-assessment" type="button" hidden>Retake Assessment ↺</button>
</div>`
      },
      {
        type: "html",
        html: "<div class=\"assessment-results\" id=\"assessment-results\"></div>"
      },
      {
        type: "html",
        html: `<div class="lesson-footer-nav">
  <button class="btn-secondary" type="button" data-nav-target="lesson-7">← Refactoring challenge</button>
  <button class="btn-secondary" type="button" data-nav-target="lesson-1">Back to top ↑</button>
</div>`
      }
    ]
  }
];
