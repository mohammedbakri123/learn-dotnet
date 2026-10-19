/* ============================================================
   Raff Backend Academy — Module 3 — EF Core Relationships & Query Performance
   Data module: glossary, questions, and module constants.
   Loaded before the shared components and the page script.
   ============================================================ */

/* ============================================================
   Module 3 — EF Core Relationships & Query Performance
   Data: glossary + knowledge checks
   ============================================================ */

const STORAGE_KEY = "raff_efcore_module_03_state";
const APP_MARKER = "raff-efcore-module-03";
const TOTAL_LESSONS = 7;

const GLOSSARY = [
  { t: "Relationship", c: "Modeling", l: "lesson-1",
    d: "In EF Core, the description of how two entity types are connected — how many instances of one relate to instances of the other. Relationships are modeled in C# with navigations and (usually) configured with keys; the database enforces the relational version with foreign keys." },
  { t: "Principal entity", c: "Modeling", l: "lesson-1",
    d: "The entity in a relationship that the other side references. In a one-to-many, the \"one\" side is the principal; in Raff, `Category` is the principal of `Book`s, and each `Book` holds the FK pointing at it." },
  { t: "Dependent entity", c: "Modeling", l: "lesson-1",
    d: "The entity whose key is not sufficient on its own — it contains the foreign key referencing the principal. In Raff, `Book` is the dependent of `Category`; every join row in `book_authors` is a dependent of both `Book` and `Author`." },
  { t: "Principal key", c: "Keys & FKs", l: "lesson-1",
    d: "The property (or set of properties) on the principal entity that the foreign key references. Almost always it is the principal's primary key — `categories.Id` in Raff's Category→Book relationship." },
  { t: "Updatable view", c: "Modeling", l: "lesson-1",
    d: "A convenient mental model EF Core 7+ documentation uses: the model shows navigations (how objects relate) while the database has only foreign keys (how rows relate). Relationship configuration connects the two views." },
  { t: "Required relationship", c: "Modeling", l: "lesson-1",
    d: "A relationship whose foreign key is non-nullable: every dependent must reference an existing principal. Deleting a referenced principal is restricted by default; in Raff, `ReadingEntry.UserId` and `ReadingEntry.BookId` are required FKs." },
  { t: "Optional relationship", c: "Modeling", l: "lesson-1",
    d: "A relationship whose foreign key is nullable: a dependent may exist with no related principal. Raff's `Book → Category` is optional — `books.CategoryId` is a nullable shadow FK, and `book.Category` can be null." },
  { t: "One-to-one", c: "Modeling", l: "lesson-2",
    d: "A relationship where each instance of each type relates to at most one instance of the other. Implemented with a foreign key in the dependent entity plus a unique constraint, since many rows may otherwise share the same FK value." },
  { t: "One-to-many", c: "Modeling", l: "lesson-2",
    d: "A relationship where one principal relates to many dependents (each dependent to exactly one principal). The most common relational shape: the \"many\" table (or the dependent) carries the FK. Example: `Category` → `Book`." },
  { t: "Many-to-many", c: "Modeling", l: "lesson-2",
    d: "A relationship where instances on each side relate to many on the other. Modeled in the database with a join table holding two FKs; in EF Core 5+ the join entity is created implicitly and addressed with skip navigations (`Book.Authors`, `Author.Books` in Raff)." },
  { t: "Join entity", c: "Modeling", l: "lesson-2",
    d: "The entity type representing rows of a join table. It can be implicit (EF-generated, addressable as `Dictionary<string, object>` in Raff's scaffolded code) or explicit when it needs payload properties such as `AuthorOrder` or `ContributionRole`." },
  { t: "Join table", c: "Modeling", l: "lesson-2",
    d: "The database table storing a many-to-many: one row per pairing, with FKs to both sides. Raff's is `book_authors` with composite primary key (`book_id`, `author_id`)." },
  { t: "Payload (join entity payload)", c: "Modeling", l: "lesson-2",
    d: "Extra columns on a join table beyond the two FKs — e.g. the order of authors on a book. When a join needs a payload, model it as an explicit entity type so the extra data has a home." },
  { t: "Primary key", c: "Keys & FKs", l: "lesson-1",
    d: "The property(s) that uniquely identify an entity type. EF Core discovers a property named `Id` or `<TypeName>Id` by convention; otherwise map one with `HasKey`. In the database it becomes the table's primary key." },
  { t: "Composite key", c: "Keys & FKs", l: "lesson-2",
    d: "A primary (or alternate) key made of two or more properties. Raff's `book_authors` join entity uses the composite key (`book_id`, `author_id`) so a pair can appear only once." },
  { t: "Foreign key", c: "Keys & FKs", l: "lesson-1",
    d: "The property(s) on the dependent entity holding the value of the principal key. In the database it is a column (or columns) with a constraint referencing the principal table — enforcing that referenced rows exist and governing delete behavior." },
  { t: "Shadow property", c: "Keys & FKs", l: "lesson-1",
    d: "A property that exists in the EF Core model (and maps to a column) but has no CLR property on the entity class. Access it through the model or `EF.Property<T>(entity, \"Name\")`." },
  { t: "Shadow foreign key", c: "Keys & FKs", l: "lesson-1",
    d: "A foreign key that is a shadow property because the entity class has no FK property. Raff's `Book.Category` navigation has a shadow FK `CategoryId` — visible in the migration, invisible in the C# class." },
  { t: "Unique index", c: "Keys & FKs", l: "lesson-2",
    d: "A database index rejecting duplicate values — the mechanism that makes one-to-one and business rules like \"one reading entry per user per book\" enforceable. Raff's migration creates the unique index `unique_user_book` on (`UserId`, `BookId`)." },
  { t: "Navigation property", c: "Navigations", l: "lesson-3",
    d: "A property on an entity type referencing one related entity (reference navigation) or a collection of them (collection navigation). Navigations are C#-side views of relationship state; they can be empty or null even when related rows exist in the database." },
  { t: "Reference navigation", c: "Navigations", l: "lesson-1",
    d: "A navigation holding a single related entity, or null when optional and absent. Examples: `Book.Category`, `ReadingEntry.Book`, `ReadingEntry.User`." },
  { t: "Collection navigation", c: "Navigations", l: "lesson-1",
    d: "A navigation holding many related entities, typically `ICollection<T>`. Examples: `Book.Authors`, `Book.ReadingEntries`, `User.ReadingEntries`. Initialized to an empty collection by the scaffolder — empty does not mean \"none in the database\", only \"none loaded\"." },
  { t: "Inverse navigation", c: "Navigations", l: "lesson-3",
    d: "The navigation on the other side of a relationship: `Author.Books` is the inverse of `Book.Authors`; `Category` has no inverse for `Book.Category` in Raff, which is perfectly legal." },
  { t: "Skip navigation", c: "Navigations", l: "lesson-2",
    d: "A navigation that skips over the join entity of a many-to-many (or the implicit join), referencing the far side directly. `Book.Authors` and `Author.Books` in Raff are skip navigations backed by `book_authors`." },
  { t: "Fix-up", c: "Navigations", l: "lesson-3",
    d: "EF Core's process of synchronizing navigations, foreign keys, and tracked entities so the in-memory object graph is consistent — populating inverse navigations, setting FKs from navigations and vice versa. Runs as part of `DetectChanges`." },
  { t: "DetectChanges", c: "Navigations", l: "lesson-3",
    d: "The change tracker scan that finds modifications (including navigation and FK changes) and performs fix-up. Triggered automatically by `SaveChanges`/`SaveChangesAsync` and by many queries; call `ChangeTracker.DetectChanges()` explicitly to observe it step by step." },
  { t: "Eager loading", c: "Loading", l: "lesson-4",
    d: "Loading related data together with the main query via `Include` / `ThenInclude`. Deterministic query counts (one query by default), at the cost of always fetching the included data." },
  { t: "Include", c: "Loading", l: "lesson-4",
    d: "The method directing EF Core to load a navigation with the main query — `context.Books.Include(b => b.Authors)` — translated to SQL joins. It is a query-shaping instruction, not a client-side operation." },
  { t: "ThenInclude", c: "Loading", l: "lesson-4",
    d: "Lineage of `Include` for loading a navigation of an already-included navigation: `Include(e => e.Book).ThenInclude(b => b.Category)`. Always applies to the last navigation included in the chain." },
  { t: "Filtered include", c: "Loading", l: "lesson-4",
    d: "An `Include` with a `Where` that limits which related rows this query loads, e.g. only FINISHED reading entries. The filter governs this query's loading only — fix-up from other loads can add more, and counts reflect loaded items, not the whole table." },
  { t: "Explicit loading", c: "Loading", l: "lesson-4",
    d: "Loading related data on demand after the parent is loaded, through the tracked entry: `context.Entry(book).Collection(b => b.Authors).LoadAsync()` (or `.Reference(...)`, or `.Query()` for a filtered/projected load)." },
  { t: "Lazy loading", c: "Loading", l: "lesson-4",
    d: "Loading related data automatically on first navigation access. Opt-in in EF Core (proxies + `UseLazyLoadingProxies()` + virtual navigations), hidden by design, and a classic source of N+1 queries. Raff does not enable it." },
  { t: "Lazy-loading proxies", c: "Loading", l: "lesson-4",
    d: "Runtime-generated subclasses overriding virtual navigations so access triggers a query. Require the `Microsoft.EntityFrameworkCore.Proxies` package, `UseLazyLoadingProxies()`, non-sealed entity types, and a tracked entity." },
  { t: "N+1 query problem", c: "Performance", l: "lesson-5",
    d: "One query fetches N parents, then one additional query runs per parent to load related data — 1+N queries whose count scales with the first query's row count. The exact overhead varies with configuration, tracking, fix-up, and prior loads; the pattern is what you detect." },
  { t: "Projection", c: "Performance", l: "lesson-6",
    d: "A LINQ `Select` translating to SQL that returns exactly the chosen columns/expressions. EF Core materializes the projected shape (anonymous type, record, DTO) with no entity tracking — the primary tool for read-only endpoints." },
  { t: "DTO (Data Transfer Object)", c: "Performance", l: "lesson-6",
    d: "A type defining the shape of data crossing an API boundary, decoupled from persistence entities. DTOs prevent schema coupling, serialization cycles, and accidental exposure of sensitive fields such as `User.PasswordHash`." },
  { t: "Over-fetching", c: "Performance", l: "lesson-6",
    d: "Retrieving more columns or rows than the endpoint needs — full entities for a list card, or includes whose data is never used. Costs bandwidth, memory, tracking overhead, and materialization time." },
  { t: "Cartesian explosion", c: "Performance", l: "lesson-7",
    d: "Row multiplication when a single query joins multiple sibling collections: parents × rows-of-collection-A × rows-of-collection-B. Books with 3 authors and 2 entries produce 6 rows per book in one query." },
  { t: "Split query", c: "Performance", l: "lesson-7",
    d: "`AsSplitQuery()` runs one SQL statement per collection navigation instead of one joined statement, keeping row counts linear (parents + children-A + children-B) at the cost of more round trips and — without an explicit transaction — weaker read-time consistency across statements." },
  { t: "Tracking (change tracking)", c: "Querying", l: "lesson-7",
    d: "The change tracker stores a snapshot of each loaded entity, identity-resolves instances, and detects modifications for `SaveChanges`. Necessary for updates, pure overhead for read-only responses." },
  { t: "No-tracking", c: "Querying", l: "lesson-6",
    d: "`AsNoTracking()` materializes entities without snapshots or change detection — cheaper reads, but no fix-up across query results and no ability to save modifications. Raff's `BookService.GetBooksAsync` uses it." },
  { t: "Identity resolution", c: "Querying", l: "lesson-7",
    d: "Ensuring one CLR instance per entity key within a context. Tracked queries do it via the change tracker; `AsNoTrackingWithIdentityResolution()` does it for read-only queries at a modest cost." },
  { t: "Round trip", c: "Performance", l: "lesson-5",
    d: "One request-response exchange with the database. Query count — not just query complexity — dominates performance on high-latency links, which is why N+1 is so damaging." },
  { t: "Compiled query", c: "Performance", l: "lesson-7",
    d: "A query pre-compiled with `EF.CompileAsyncQuery` to skip per-execution translation overhead. An advanced optimization for proven hot paths — never the first tool for a slow endpoint." },
  { t: "Query plan", c: "Performance", l: "lesson-7",
    d: "The database's execution strategy for a SQL statement (join order, indexes, scans). EF Core's responsibility ends at translation; investigating plans (e.g. PostgreSQL `EXPLAIN ANALYZE`) is a separate step when queries are already well-shaped." }
];

const KNOWLEDGE_CHECKS = [
  /* ================= Lesson 1 (5) ================= */
  { id: "kc-1-1", group: "lesson-1",
    prompt: "What is a relationship in the EF Core model?",
    options: [
      "A database constraint that stops you from deleting rows",
      "The description of how two entity types are connected — how many instances of one relate to instances of the other",
      "A C# attribute placed on primary keys",
      "A foreign key column in the database table"
    ],
    correct: 1,
    explain: "Relationships are model-level concepts describing cardinality and participation between entity types. The database enforces the relational counterpart (foreign keys, constraints), but the relationship itself is part of how you describe the model." },

  { id: "kc-1-2", group: "lesson-1",
    prompt: "In Raff's many-to-many between `Book` and `Author`, which table physically holds the foreign keys?",
    options: [
      "`books` — it holds `AuthorId`",
      "`authors` — it holds `BookId`",
      "`book_authors` — the join table holds both `book_id` and `author_id`",
      "Nowhere: EF Core stores many-to-many relationships only in memory"
    ],
    correct: 2,
    explain: "The join table `book_authors` contains the two FKs (and the composite primary key `(book_id, author_id)`). Each join row is a dependent referencing both `books` and `authors` as principals." },

  { id: "kc-1-3", group: "lesson-1",
    prompt: "What is the principal key in a relationship?",
    options: [
      "The property on the principal entity that the foreign key references — typically its primary key",
      "The column that uniquely identifies a row in the join table",
      "The C# property marked with `[Key]` on the dependent entity",
      "The generated value the database uses for the join table"
    ],
    correct: 0,
    explain: "The principal key lives on the principal entity (`categories.Id` in Raff's Category→Book relationship). The FK on the dependent side stores copies of those values to declare which principal each dependent belongs to." },

  { id: "kc-1-4", group: "lesson-1",
    prompt: "Which of these is a **reference navigation**?",
    options: [
      "`Book.Authors`",
      "`User.ReadingEntries`",
      "`ReadingEntry.Book`",
      "`book_authors`"
    ],
    correct: 2,
    explain: "A reference navigation holds a single related entity (or null). `ReadingEntry.Book` is one; `Book.Authors` and `User.ReadingEntries` are collection navigations, and `book_authors` is a table, not a navigation at all." },

  { id: "kc-1-5", group: "lesson-1",
    prompt: "A relationship is **optional** when…",
    options: [
      "the navigation property is declared `virtual`",
      "the foreign key is nullable — a dependent can exist without a related principal",
      "the dependent entity has no primary key",
      "EF Core could not infer it by convention"
    ],
    correct: 1,
    explain: "Optionality follows FK nullability. Raff's `books.CategoryId` is a nullable shadow FK, so `Book → Category` is optional: a book may have no category, and `book.Category` may be null. Required FKs (like `ReadingEntries.BookId`) make the relationship required." },

  /* ================= Lesson 2 (8) ================= */
  { id: "kc-2-1", group: "lesson-2",
    prompt: "Raff's `Book` has `public Category? Category { get; set; }` and no `CategoryId` property. What does EF Core do by convention?",
    options: [
      "It throws at model-building time until you add a `CategoryId` property",
      "It stores the relationship only in memory",
      "It creates a shadow foreign key property `CategoryId` in the model and maps it to a nullable `CategoryId` column",
      "It silently creates a many-to-many between `Book` and `Category`"
    ],
    correct: 2,
    explain: "A reference navigation to another entity type without an FK property in the class produces a shadow FK named `<Navigation>Id` — `CategoryId`. The migration shows the resulting nullable column and its FK constraint." },

  { id: "kc-2-2", group: "lesson-2",
    prompt: "Which Fluent API call correctly configures a **required one-to-many** where the dependent (`Book`) has a real property `PublisherId` and the principal (`Publisher`) has a collection `Books`?",
    options: [
      "`HasOne(b => b.Publisher).WithMany(p => p.Books).HasForeignKey(b => b.PublisherId).IsRequired()`",
      "`HasMany(b => b.Books).WithOne(p => p.Publisher).HasPrincipalKey(b => b.Id)`",
      "`HasOne(b => b.Publisher).WithMany().IsRequired(false)`",
      "`HasKey(b => b.PublisherId)`"
    ],
    correct: 0,
    explain: "`HasOne` starts from the dependent's reference navigation, `WithMany` names the inverse collection, `HasForeignKey` selects the FK property, and `IsRequired()` makes it non-nullable. Without `HasForeignKey`, EF would create a shadow FK following naming conventions." },

  { id: "kc-2-3", group: "lesson-2",
    prompt: "Why does a one-to-one relationship need a unique index on the dependent's foreign key?",
    options: [
      "For performance only — it is optional",
      "Because without uniqueness, many dependents could reference the same principal, which is a one-to-many, not a one-to-one",
      "Because EF Core cannot track entities without one",
      "Because the principal's primary key is not unique otherwise"
    ],
    correct: 1,
    explain: "The FK alone only constrains where references point, not how many dependents may point at the same principal. Uniqueness is what turns \"many dependents may share this principal\" into \"at most one\". EF Core creates this unique index automatically for one-to-one; configuring a plain FK + unique constraint manually is how you get the same shape." },

  { id: "kc-2-4", group: "lesson-2",
    prompt: "In EF Core 5+, a **many-to-many with no payload** is configured by…",
    options: [
      "creating a CLR class for the join entity and two one-to-many relationships — the only supported way",
      "calling `HasMany(...).WithMany(...)` (or relying on convention with two collection navigations) — EF creates the join entity implicitly",
      "adding a `[ManyToMany]` attribute to both entity classes",
      "storing a comma-separated list of ids in one column"
    ],
    correct: 1,
    explain: "EF Core 5+ creates and manages the join entity automatically when the model has two collection navigations pointing at each other (like Raff's `Book.Authors` / `Author.Books`), or via explicit `HasMany().WithMany()`. An explicit CLR join entity is only needed when the join carries payload data — or when you prefer it." },

  { id: "kc-2-5", group: "lesson-2",
    prompt: "When does a many-to-many relationship need an **explicit join entity** (a CLR class)?",
    options: [
      "Always — implicit joins are not supported in EF Core",
      "Never — payload data can be attached to either endpoint",
      "When the join itself carries data, like the order of authors on a book (`AuthorOrder`) or a per-pairing role",
      "Only when both entities use composite primary keys"
    ],
    correct: 2,
    explain: "If a pairing needs its own columns beyond the two FKs, that data needs a home — the join entity. Model it as a real class (with two one-to-many relationships or `UsingEntity` with a payload configuration) and address it directly in queries." },

  { id: "kc-2-6", group: "lesson-2",
    prompt: "Raff's `ReadingEntry` has a non-nullable `BookId` and a `Book` navigation. What does **required** mean for delete behavior by default?",
    options: [
      "Deleting a book cascades and deletes all its reading entries automatically",
      "Deleting a book that has reading entries is restricted — the delete fails until the entries are handled",
      "Deleting a book silently sets the entries' `BookId` to null",
      "Delete behavior is unrelated to nullability"
    ],
    correct: 1,
    explain: "For required relationships, the default delete behavior is `Restrict` (or `NoAction`): the database refuses to delete a principal that still has dependents. Nullable (optional) FKs default to `ClientSetNull` for tracked entities. Nothing is set to null on a non-nullable column — so you must delete or reassign the dependents first." },

  { id: "kc-2-7", group: "lesson-2",
    prompt: "Which statement about the shadow FK in Raff's `Book → Category` relationship is correct?",
    options: [
      "Because it is a shadow property, it does not exist in the database column set",
      "It exists in the model and the database, but has no CLR property — you can reach it via `EF.Property<int?>(book, \"CategoryId\")`",
      "It only exists after calling `SaveChanges()` for the first time",
      "Shadow properties are read-only and can never be queried"
    ],
    correct: 1,
    explain: "Shadow properties are full model citizens: they map to real columns (`books.CategoryId` in the migration) and can be used in queries and projections via `EF.Property<int?>`. They simply have no C# property on the class." },

  { id: "kc-2-8", group: "lesson-2",
    prompt: "In Raff's scaffolded `BooksContext`, the many-to-many to the join table is configured with `UsingEntity<Dictionary<string, object>>`. What does this signify?",
    options: [
      "The join entity is anonymous and has no configurable payload in this scaffolded configuration",
      "The join table does not exist in the database",
      "Author rows are stored as JSON in the books table",
      "The relationship is actually one-to-many"
    ],
    correct: 0,
    explain: "`Dictionary<string, object>` is how the scaffolder represents the implicit join entity when echoing the model back in code. It can be configured (rename keys/columns, index, etc.) — but when you need typed payload properties, you replace it with a real join class." },

  /* ================= Lesson 3 (5) ================= */
  { id: "kc-3-1", group: "lesson-3",
    prompt: "You load a book without any `Include`. What is `book.Authors` at that moment?",
    options: [
      "`null`, so accessing it throws a `NullReferenceException`",
      "An empty collection — the scaffolder initialized it, and \"empty\" means \"not loaded\", not \"none in the database\"",
      "A lazy proxy that immediately queries the database",
      "It contains every author in the database"
    ],
    correct: 1,
    explain: "Collection navigations are initialized to empty collections (`= new List<Author>()`), so they are never null. But an empty navigation carries no information about the database — it only says nothing was loaded or fixed up. Use an explicit load or projection if you need the data." },

  { id: "kc-3-2", group: "lesson-3",
    prompt: "When does EF Core **sync** a foreign key assigned through a navigation (fix-up) for a tracked entity?",
    options: [
      "Immediately, at the exact moment of assignment",
      "Only during `SaveChangesAsync()` — never earlier",
      "At `DetectChanges()` — which `SaveChanges` and many queries trigger automatically, or you can call manually",
      "Never — navigations and FKs are independent values"
    ],
    correct: 2,
    explain: "Assignments change C# object state. Fix-up — synchronizing navigations, FKs, and inverse navigations — happens when `DetectChanges` runs, which `SaveChanges` does automatically before generating SQL. Calling `ChangeTracker.DetectChanges()` explicitly is how you observe the sync step by step." },

  { id: "kc-3-3", group: "lesson-3",
    prompt: "`Author.Books` is what kind of navigation relative to `Book.Authors` in Raff?",
    options: [
      "A skip navigation with no relationship to `Book.Authors`",
      "The inverse navigation — the other side of the same many-to-many relationship",
      "A shadow property",
      "A reference navigation"
    ],
    correct: 1,
    explain: "Inverse navigations are the two ends of one relationship: `Book.Authors` and `Author.Books` are each other's inverse through the `book_authors` join. Fix-up keeps them synchronized for tracked entities." },

  { id: "kc-3-4", group: "lesson-3",
    prompt: "With `AsNoTracking()`, how do navigations get populated?",
    options: [
      "The same fix-up rules apply as with tracking",
      "Exactly as directed by the query (`Include`, filtered include, or projection) — no fix-up, no lazy loading, no cross-query synchronization",
      "EF Core automatically includes all navigations",
      "Navigations become `null` for no-tracking queries"
    ],
    correct: 1,
    explain: "No-tracking queries materialize entities without a tracker, so there is no fix-up and no shared identity. What the query includes is what you get; collection navigations remain empty until an include or explicit shaping populates them. This is fine for read-only mapping — just don't expect graph consistency." },

  { id: "kc-3-5", group: "lesson-3",
    prompt: "Why is `IsLoaded` on a collection navigation not always a reliable \"the data is complete\" signal?",
    options: [
      "Because collections can be populated by fix-up from other queries, so \"loaded\" does not guarantee \"complete for the database\"",
      "Because `IsLoaded` only exists for reference navigations",
      "Because it always returns `false` for skip navigations",
      "Because it reports whether the entity is attached to a different context"
    ],
    correct: 0,
    explain: "Fix-up merges entities loaded by any query into tracked navigations. A skip navigation can contain a subset of related rows yet still not be fully \"loaded\" in the sense of a single complete fetch. For guaranteed completeness, issue one query that loads exactly what the code needs (include, filtered include, or projection)." },

  /* ================= Lesson 4 (5) ================= */
  { id: "kc-4-1", group: "lesson-4",
    prompt: "A read-only list endpoint needs specific fields from books and their categories. Which strategy is usually best first?",
    options: [
      "Lazy loading, so fields are fetched only when serialization touches them",
      "Tracking entity query with `Include`, then map to DTOs in memory",
      "Projection with `Select` — exact columns, no tracking, no over-fetching",
      "Explicit loading with `Entry(...).Reference(...).LoadAsync()` inside the mapper"
    ],
    correct: 2,
    explain: "For read-only contracts, projection computes only the requested columns and skips the change tracker entirely. Includes and explicit loading bring entire entities (all columns, tracked) that the endpoint does not need — sometimes justified when later code genuinely needs entity objects, but not as a default." },

  { id: "kc-4-2", group: "lesson-4",
    prompt: "You write `Include(b => b.ReadingEntries.Where(e => e.Status == ReadingStatus.FINISHED))`. What is the correct caveat?",
    options: [
      "The filter is permanent — the navigation will never contain other entries in any query",
      "The filter applies to this query's loading only; later fix-up can add other entries, and any `Count` on the navigation counts loaded items, not the table",
      "The filter is ignored by EF Core and all entries are loaded",
      "The filter also filters the parent books"
    ],
    correct: 1,
    explain: "Filtered includes shape what this query loads. Because tracked entities fix-up together, other loads can add entries later; and counting a navigation counts what is loaded — not the database. If the count is business data, compute it in the database with a projection." },

  { id: "kc-4-3", group: "lesson-4",
    prompt: "Which loading strategy requires the `Microsoft.EntityFrameworkCore.Proxies` package, `UseLazyLoadingProxies()`, and `virtual` navigations?",
    options: [
      "Eager loading",
      "Explicit loading",
      "Lazy loading (proxy-based)",
      "Projection"
    ],
    correct: 2,
    explain: "Proxy-based lazy loading intercepts navigation access through generated subclasses, which requires overridable (`virtual`) navigations and the proxies package with its opt-in configuration. Raff's navigations are virtual, but the package and opt-in call are absent — so lazy loading is off." },

  { id: "kc-4-4", group: "lesson-4",
    prompt: "Which call performs **explicit loading** of a collection for an already-tracked entity?",
    options: [
      "`context.Books.Include(b => b.Authors)`",
      "`context.Entry(book).Collection(b => b.Authors).LoadAsync()`",
      "`context.Books.AsNoTracking().Select(b => b.Authors)`",
      "`book.Authors.Count`"
    ],
    correct: 1,
    explain: "Explicit loading operates through `Entry(...)`: `.Collection(...)` or `.Reference(...)` followed by `.LoadAsync()`, optionally replaced by `.Query()` for filtered or projected loads. `Include` is eager loading; `book.Authors.Count` on an untracked/empty navigation returns 0 without touching the database." },

  { id: "kc-4-5", group: "lesson-4",
    prompt: "What is the main risk of `Include`-ing **two sibling collections** on the same entity in one query?",
    options: [
      "EF Core refuses to compile the query",
      "The join multiplies rows (parent × collection A × collection B), inflating the result set and network payload",
      "The second Include silently replaces the first one",
      "It disables change tracking automatically"
    ],
    correct: 1,
    explain: "Sibling collection joins produce a Cartesian-style fan-out: every parent row is repeated for each combination of children. Entities are de-duplicated in memory, but the database and network pay for every row. `AsSplitQuery()` is the standard mitigation." },

  /* ================= Lesson 5 (5) ================= */
  { id: "kc-5-1", group: "lesson-5",
    prompt: "What is the N+1 query problem?",
    options: [
      "A single query joining N tables",
      "One query to fetch N parents, then one additional query per parent to load related data",
      "N queries that are run in parallel",
      "A query that returns N+1 columns"
    ],
    correct: 1,
    explain: "The \"1\" is the parents query; the \"N\" are the per-parent related-data queries. Cost grows linearly with the number of parents returned — which is exactly what does not happen when the whole need is expressed in one query." },

  { id: "kc-5-2", group: "lesson-5",
    prompt: "The endpoint needs each book's author **count** and title, nothing else. What is the best query?",
    options: [
      "Load books with `Include(b => b.Authors)` and count in C#",
      "Load books, then lazy-load each `Authors` collection and count",
      "`Select(b => new { b.Id, b.Title, b.Authors.Count })` — the database computes the count in one query",
      "Query `book_authors` for every book id in a loop"
    ],
    correct: 2,
    explain: "When only a scalar is needed, projection with a database-side `Count` fetches no author entities and runs one query. Includes and lazy/explicit loading materialize author entities just to count them — strictly more work for the same number." },

  { id: "kc-5-3", group: "lesson-5",
    prompt: "For N books, exactly how many extra queries will lazy loading add?",
    options: [
      "Always exactly N",
      "Always N×2",
      "It depends on configuration, tracking, fix-up, and prior loads — not guaranteed to be N; the pattern, not a universal number, is what you detect",
      "Zero — lazy loading never queries"
    ],
    correct: 2,
    explain: "Without lazy loading there are no extra queries (just missing data). Tracked entities whose navigations were already populated need none. N is the ceiling shape of the worst case, not a guaranteed count. Lesson 5's simulator states this assumption explicitly." },

  { id: "kc-5-4", group: "lesson-5",
    prompt: "What is explicit loading inside a loop over 50 books?",
    options: [
      "A performance recommendation from the EF Core team",
      "The N+1 problem written by hand — 1 query plus up to 50 load queries instead of one shaped query",
      "The same cost as a single Include because it is batched automatically",
      "Impossible — explicit loading cannot run in a loop"
    ],
    correct: 1,
    explain: "Explicit loading is not a fix for N+1; used per item it recreates it. The fix is structural: include or project the data in the main query, or load it in bulk with one filtered query (for example `WHERE BookId IN (...)`)." },

  { id: "kc-5-5", group: "lesson-5",
    prompt: "What does N+1 look like in the EF Core SQL log?",
    options: [
      "One giant query with many joins",
      "Dozens of near-identical statements differing only in a parameter value, per request",
      "A warning line printed once per entity type",
      "Nothing — N+1 is invisible in logs"
    ],
    correct: 1,
    explain: "The signature is repetition: the same SELECT executed once per parent with a different FK parameter. A 50-row list endpoint running 51 commands is a red flag; structured logging or the SQL log makes it visible in development." },

  /* ================= Lesson 6 (5) ================= */
  { id: "kc-6-1", group: "lesson-6",
    prompt: "What does a projection give a read-only endpoint?",
    options: [
      "The same data as a tracked entity query, but renamed",
      "Exactly the columns and computed expressions the contract needs, assembled without change tracking",
      "A cached copy of the entity in the second-level cache",
      "Automatic JSON serialization of navigations"
    ],
    correct: 1,
    explain: "Projection shapes SQL to the contract: chosen columns, computed values (counts, conditionals, flattened lists), no snapshots, no identity map. It is the cheapest correct answer for read-only data and removes entire classes of bugs (over-fetching, cycles, secrets like `PasswordHash`)." },

  { id: "kc-6-2", group: "lesson-6",
    prompt: "Inside a `Select`, what does `b.Authors.Select(a => a.Name).ToList()` do?",
    options: [
      "Throws `NotSupportedException` — collections cannot be projected",
      "Runs one query per book — the N+1 pattern in disguise",
      "Is translated into SQL (a join or correlated query) and produces a `List<string>` in the single query",
      "Only works when the entity is not tracked"
    ],
    correct: 2,
    explain: "EF Core supports projecting a collection navigation into a list within the outer projection; it composes into the same SQL statement. Exactly one query runs for the page. Iterating in a client loop instead — materializing books, then touching `b.Authors` per book — is what would recreate N+1." },

  { id: "kc-6-3", group: "lesson-6",
    prompt: "A DTO constructor needs `List<string>` author names **and** `List<string>` entry notes in one projection. What happens?",
    options: [
      "EF Core translates it happily into a single query",
      "EF Core cannot compose two sibling collection flattenings into one query — split into two queries and assemble, or redesign the contract",
      "It works only with `AsSplitQuery()` on the same statement",
      "It works only after enabling lazy loading"
    ],
    correct: 1,
    explain: "A single projection with multiple collection navigations cannot be translated. Assemble from two queries keyed by book id, express one side as a count instead of a list, or expose a sub-endpoint. `AsSplitQuery` applies to `Include` scenarios, not to a single-constructor projection." },

  { id: "kc-6-4", group: "lesson-6",
    prompt: "Why should API endpoints not return entities directly?",
    options: [
      "Entities are slower to serialize because EF Core encrypts them",
      "Entities couple the API contract to the schema, can serialize relationship cycles, and can leak fields like `User.PasswordHash`",
      "ASP.NET Core forbids returning entity types",
      "Entities cannot be serialized to JSON at all"
    ],
    correct: 1,
    explain: "Contract/schema coupling means schema changes break clients; relationship cycles blow up naive serializers (`Book → Authors → Books → …`); and every column — including `PasswordHash` — becomes exposed by default. DTOs/projections prevent all three." },

  { id: "kc-6-5", group: "lesson-6",
    prompt: "You need entity objects (not DTOs) for a read-only in-memory transformation. Which is the lighter query?",
    options: [
      "A regular tracked query",
      "`AsNoTracking()` — entities without snapshots or change detection",
      "Lazy loading enabled just for this query",
      "Materialized view"
    ],
    correct: 1,
    explain: "`AsNoTracking()` materializes the entities the shape needs without paying for snapshots and change detection. Remember the trade-offs: no fix-up across queries and modifications cannot be saved — acceptable for read-only transformations, and what Raff's BookService already does." },

  /* ================= Lesson 7 (5) ================= */
  { id: "kc-7-1", group: "lesson-7",
    prompt: "10 books, each with 5 authors and 4 reading entries. `Include` both sibling collections in one query. How many rows does the single SQL statement return (before de-duplication)?",
    options: [
      "19",
      "100",
      "200",
      "10"
    ],
    correct: 2,
    explain: "Rows = books × authors × entries = 10 × 5 × 4 = 200. Each book appears once per (author, entry) pair while EF Core de-duplicates entities in memory — but the database produced and the network carried 200 rows." },

  { id: "kc-7-2", group: "lesson-7",
    prompt: "The main trade-off of `AsSplitQuery()` is…",
    options: [
      "It silently drops one of the collections",
      "More round trips (one statement per collection) and — without an explicit transaction — weaker consistency guarantees across the statements",
      "It forces lazy loading to be enabled",
      "It disables change tracking permanently"
    ],
    correct: 1,
    explain: "Split queries keep row counts linear by issuing several statements. The cost is additional round trips and, by default, no transaction wrapping them — concurrent writes between statements can yield a graph that never existed at one instant. Wrap in a serializable transaction if strict consistency is required." },

  { id: "kc-7-3", group: "lesson-7",
    prompt: "How can a team make split queries the default behavior for every query?",
    options: [
      "Add `[SplitQuery]` to every entity class",
      "Configure `UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery)` (e.g. on the provider options), opting individual queries back with `AsSingleQuery()`",
      "Set `AsSplitQuery()` in a static field and reuse it",
      "It cannot be configured globally"
    ],
    correct: 1,
    explain: "The splitting behavior is configurable at the context/provider level. Teams that prefer it globally opt out per-query with `.AsSingleQuery()` where a join is cheaper — and teams with the opposite preference do the reverse. There is no universally right default; measure real shapes." },

  { id: "kc-7-4", group: "lesson-7",
    prompt: "What does `AsNoTrackingWithIdentityResolution()` provide?",
    options: [
      "Full change tracking with better performance",
      "One CLR instance per entity key (deduplication) **without** snapshot tracking",
      "Automatic lazy loading for no-tracking queries",
      "Server-side result caching"
    ],
    correct: 1,
    explain: "It runs identity resolution for read-only queries: if the same author appears in two books' collections, both reference the same instance — while still skipping snapshot allocation and change detection. Use it when reference identity matters in memory but you never save the results." },

  { id: "kc-7-5", group: "lesson-7",
    prompt: "A list endpoint is slow. What is the correct first step?",
    options: [
      "Add compiled queries for every query in the service",
      "Add `AsSplitQuery()` everywhere",
      "Check the query shape first: project only what is needed, fix N+1, control row multiplication — and only then evaluate advanced tools with evidence",
      "Enable lazy loading so unused data is skipped"
    ],
    correct: 2,
    explain: "Most slow-endpoint causes are shape problems. Projection and N+1 removal eliminate the majority; row multiplication and read-path weight come next. Compiled queries and raw SQL are escalations that need proof the simple fixes were insufficient — they are not the opening move." }
];
/* ============================================================
   Module 3 — Data part 2: lab, assessment, explorer, fix-up,
   search metadata
   ============================================================ */

const LESSON_META = [
  { id: "lesson-0", label: "Overview & Outcomes",
    keywords: "roadmap outcomes objectives verified facts legend classification",
    summary: "Module map, learning objectives, how every Raff schema fact was verified against the repository, and the complete/fragment/anti-pattern labeling legend." },
  { id: "lesson-1", label: "How Relationships Work",
    keywords: "relationship principal dependent foreign key primary key navigation reference collection required optional erd explore",
    summary: "The two views (objects vs tables), keys and roles, existing data versus loaded data, required vs optional — with the Relationship Explorer." },
  { id: "lesson-2", label: "Relationship Types & Config",
    keywords: "convention fluent api annotation one-to-one one-to-many many-to-many join entity join table payload unsing usingentity shadow foreign key unique index",
    summary: "The three relationship types in the model, by convention and with the Fluent API, including Raff's real M:N join table and an explicit join entity with payload." },
  { id: "lesson-3", label: "Navigations & Fix-Up",
    keywords: "navigation fix-up detectchanges detect changes change tracker inverse skip navigation isloaded assign",
    summary: "Where navigations come from, what fix-up synchronizes and when, and the interactive Fix-Up Playground that steps through an assignment to SaveChanges." },
  { id: "lesson-4", label: "Loading Related Data",
    keywords: "eager include theninclude filtered include explicit loading lazy proxies useLazyLoadingProxies decision lab",
    summary: "Eager, explicit, and lazy loading compared, with the six-scenario Loading Strategy Decision Lab." },
  { id: "lesson-5", label: "The N+1 Query Problem",
    keywords: "n+1 query problem simulator round trips lazy loop detection logging EnableSensitiveDataLogging",
    summary: "One query per parent, why the exact count varies, fixes, detection techniques — and an interactive query-timeline simulator." },
  { id: "lesson-6", label: "DTO Projections",
    keywords: "dto projection select flatten passwordhash over-fetching records asnotracking author names count",
    summary: "Why entities are the wrong shape for APIs and how Select() expresses the contract in SQL — including the multiple-collections limitation." },
  { id: "lesson-7", label: "Cartesian Explosion & Tuning",
    keywords: "cartesian explosion fan-out split query assplitquery single query identity resolution AsNoTrackingWithIdentityResolution compiled query indexes tuning plan",
    summary: "Row multiplication from sibling joins, AsSplitQuery and its caveats, tracking choices, the Cartesian Explosion Calculator, and the tuning checklist." },
  { id: "lesson-challenge", label: "Challenge: Design the Query",
    keywords: "challenge exercise bookcarddto endpoint design projection hints solution",
    summary: "Design the single-query implementation behind a read-only endpoint returning BookCardDto, with progressive hints and a full solution." },
  { id: "lesson-assessment", label: "Final Module Assessment",
    keywords: "assessment final test questions score threshold review",
    summary: "14 questions (12 multiple-choice + 2 applied scenarios) across all lessons, with configurable pass threshold and weak-topic review links." }
];

/* ---------- Loading Strategy Decision Lab ---------- */

const LAB_OPTIONS = ["Eager (Include)", "Explicit loading", "Lazy loading", "Projection (Select)"];

const LAB_SCENARIOS = [
  { id: "lab-1",
    scenario: "GET /api/books returns id, title, author names, and category name for the full list. Read-only; nothing is updated after loading.",
    answer: 3, alt: [],
    feedback: "Projection. One SELECT returns exactly the four values — the author names are flattened and the category name comes from a null-conditional. Includes would fetch complete Author and Category entities that the contract never exposes." },
  { id: "lab-2",
    scenario: "GET /api/books/{id}/edit loads the book for an upcoming update. A ?history=true query parameter — usually absent — optionally requires the book's reading history in the same response.",
    answer: 1, alt: [0],
    feedback: "Explicit loading. The second query runs only when the flag is on, after the tracked book exists. Eager loading is also defensible if you check the flag while building the query (conditional Include) — but for conditionally-needed data on an already-tracked entity, explicit loading is the designed fit." },
  { id: "lab-3",
    scenario: "Book detail read: title, published year, category name (or null), and the count of reading entries. No entity is needed after serialization.",
    answer: 3, alt: [],
    feedback: "Projection. All four values are expressible in one Select: the category via b.Category != null ? b.Category.Name : null and the count via b.ReadingEntries.Count — computed by the database." },
  { id: "lab-4",
    scenario: "Paginated book cards: title, the list of author names, and the number of reading entries, one page at a time. Read-only.",
    answer: 3, alt: [],
    feedback: "Projection. b.Authors.Select(a => a.Name).ToList() and b.ReadingEntries.Count compose into the same single query as Skip/Take — this is exactly the challenge DTO (BookCardDto)." },
  { id: "lab-5",
    scenario: "A background import service holds a tracked book it just updated. After saving, it writes an audit note that needs the category name — but only when the book was first published before 1950.",
    answer: 1, alt: [],
    feedback: "Explicit loading. The category is needed rarely and only after a condition on an already-tracked entity: Entry(book).Reference(b => b.Category).LoadAsync() pulls it only when required. Eager loading would pay the cost for every import; lazy loading would hide the I/O inside the audit branch." },
  { id: "lab-6",
    scenario: "A long-lived context in an interactive prototype script walks a tiny graph of books, authors, and entries, touching navigations in unpredictable patterns. The team has explicitly accepted hidden database I/O to prototype quickly.",
    answer: 2, alt: [],
    feedback: "Lazy loading — the one scenario where it is defensible: small data, non-API interactive exploration, accepted trade-off. The same choice inside an ASP.NET Core request path is a red flag: hidden I/O produces unpredictable query counts that logs and load tests cannot reason about." }
];

/* ---------- Final Assessment ---------- */

const ASSESSMENT_QUESTIONS = [
  { id: "as-1", lesson: "lesson-1",
    prompt: "Raff's Book class has no `CategoryId` property, yet the migration created a `books.CategoryId` column. Which statement explains this?",
    options: [
      "The migration added a column by hand that the model knows nothing about",
      "EF Core created a shadow foreign key named after the navigation (`CategoryId`) and mapped it to that column",
      "`CategoryId` exists only when lazy loading is enabled",
      "The column belongs to the Category table, not books"
    ],
    correct: 1,
    explain: "A reference navigation without an FK property produces a shadow FK: model + database column with no CLR property. Access it in queries via `EF.Property<int?>(b, \"CategoryId\")`." },

  { id: "as-2", lesson: "lesson-1",
    prompt: "Which Raff relationship is a required one-to-many?",
    options: [
      "Category → Book (books.CategoryId is nullable)",
      "ReadingEntry → Book (ReadingEntries.BookId is non-nullable, inverse Book.ReadingEntries exists)",
      "Book ↔ Author (through book_authors)",
      "User → ReadingEntry where entries may have no user"
    ],
    correct: 1,
    explain: "Non-nullable `ReadingEntries.BookId` with the inverse collection `Book.ReadingEntries` makes ReadingEntry→Book required one-to-many. The Category→Book pair is optional (nullable FK), and Book↔Author is many-to-many." },

  { id: "as-3", lesson: "lesson-2",
    prompt: "Which Fluent API call configures Raff's many-to-many between Book and Author through their skip navigations?",
    options: [
      "`.HasMany(b => b.Authors).WithMany(a => a.Books)`",
      "`.HasOne(b => b.Author).WithMany()`",
      "`.HasMany(b => b.Authors).WithOne()`",
      "`.HasKey(b => b.Authors)`"
    ],
    correct: 0,
    explain: "`WithMany(a => a.Books)` connects both collection navigations; EF Core manages the implicit join entity behind `book_authors`. (Raff's scaffolded context expresses the same model with `UsingEntity<Dictionary<string, object>>`.)" },

  { id: "as-4", lesson: "lesson-2",
    prompt: "Why does EF Core create a unique index for a one-to-one foreign key?",
    options: [
      "Purely to speed up joins",
      "Without uniqueness, many dependents could reference the same principal — a one-to-many shape",
      "Because FK columns cannot be indexed any other way",
      "Because principal keys are not unique by themselves"
    ],
    correct: 1,
    explain: "The FK alone constrains where references point; uniqueness constrains how many dependents may share one principal. That is what distinguishes one-to-one from one-to-many." },

  { id: "as-5", lesson: "lesson-3",
    prompt: "Both a book and an author are tracked. After `book.Authors.Add(author)`, and before any `DetectChanges`, what is in `author.Books`?",
    options: [
      "It already contains the book — inverse collections sync immediately",
      "Still empty — inverse synchronization happens as part of fix-up at DetectChanges",
      "It throws InvalidOperationException until SaveChanges runs",
      "It contains every book by that author from the database"
    ],
    correct: 1,
    explain: "Assignment mutates the client object graph; fix-up (which syncs the inverse and recognizes the join entity) runs at `DetectChanges` — `SaveChangesAsync` triggers it automatically, or call `ChangeTracker.DetectChanges()` to observe it." },

  { id: "as-6", lesson: "lesson-6",
    prompt: "An endpoint loads full Book entities with `Include(b => b.Authors)` and maps them to a two-field DTO. Traces show wide rows and tracking overhead. The contract will not change. What is the best fix?",
    options: [
      "Enable lazy loading and read the fields on demand",
      "Replace the entity query with a projection selecting only the two fields, dropping the Include",
      "Cache the endpoint response in memory",
      "Replace the Include with explicit loading inside a loop"
    ],
    correct: 1,
    explain: "Projection removes both problems at once: only the contract's columns are fetched and no entities are tracked. The Include becomes unnecessary because the authors are not in the DTO." },

  { id: "as-7", lesson: "lesson-4",
    prompt: "In Raff (no lazy-loading proxies), a developer relies on accessing `book.ReadingEntries` to trigger loading. What actually happens, and what is the robust design?",
    options: [
      "Lazy loading works because navigations are virtual",
      "The access returns the in-memory collection (often empty) with no query — silent missing data; the endpoint's query should include or project what it needs",
      "It throws NullReferenceException",
      "EF Core logs a warning and loads the collection anyway"
    ],
    correct: 1,
    explain: "Virtual navigations are only half of proxy-based lazy loading; without the proxies package and opt-in, access executes no SQL and returns empty-by-default collections. The robust design shapes the data in the query (`Include`/projection)." },

  { id: "as-8", lesson: "lesson-5",
    prompt: "A request's log shows 1 SELECT on books followed by 50 near-identical SELECTs on `book_authors`. What is this and what is the first fix?",
    options: [
      "Cartesian explosion — add AsSplitQuery",
      "N+1 from per-book related-data access — restructure the query to include or project the authors in the main query",
      "A plan-cache miss — add compiled queries",
      "Expected behavior — add AsNoTracking to remove the extra queries"
    ],
    correct: 1,
    explain: "Repeated near-identical statements are the N+1 signature. The fix is structural: `Include` when entities are needed, projection when scalars suffice. `AsNoTracking` lightens reads but does not remove per-item queries." },

  { id: "as-9", lesson: "lesson-5",
    prompt: "Why is the claim \"N books always produce exactly N extra queries\" wrong?",
    options: [
      "EF Core batches the queries automatically",
      "The count depends on lazy-loading configuration, what is already tracked and fixed-up, and prior loads — the pattern is reliable, the number is not",
      "Databases cache identical queries and skip duplicates",
      "The claim is right — it is always exactly N+1"
    ],
    correct: 1,
    explain: "Without lazy loading there are zero extra queries; tracked entities with populated navigations need none. Worst case is one per parent per unloaded collection; detection focuses on the pattern, and the simulator states its assumptions." },

  { id: "as-10", lesson: "lesson-6",
    prompt: "Which query returns each book's title and its authors' names without materializing any Author entities?",
    options: [
      "`context.Books.Include(b => b.Authors)`",
      "`context.Books.Select(b => new { b.Title, Names = b.Authors.Select(a => a.Name).ToList() })`",
      "`context.Books.Select(b => new { b.Title, b.Authors })`",
      "`context.Authors.Include(a => a.Books)`"
    ],
    correct: 1,
    explain: "The second query projects a flattened list of names in one SQL statement and never materializes Author entities. Option C also materializes authors; options A and D fetch full entities." },

  { id: "as-11", lesson: "lesson-7",
    prompt: "100 books, each with 4 authors and 3 reading entries. Both sibling collections are Included in one query. How many rows does the SQL statement return before de-duplication?",
    options: ["700", "1200", "100", "2400"],
    correct: 1,
    explain: "100 × 4 × 3 = 1200 rows. Every book's columns repeat once per (author, entry) combination; EF Core de-duplicates entities in memory while the database and network pay for 1200 rows." },

  { id: "as-12", lesson: "lesson-7",
    prompt: "When is `AsSplitQuery()` most defensible?",
    options: [
      "Always — it is faster in every workload",
      "When multiple large sibling collections would fan out a single query, and the team accepts extra round trips plus the default cross-statement consistency caveat",
      "When a single projection constructor needs two collection flattenings",
      "When change tracking must be disabled"
    ],
    correct: 1,
    explain: "Split queries fix row multiplication at the cost of more statements (and, without an explicit transaction, weaker consistency across them). They do not help the projection limitation (C) and have nothing to do with tracking (D)." },

  { id: "as-13", lesson: "lesson-4",
    prompt: "Applied scenario: an endpoint must return 50 books, each with its full ReadingEntry entities, for an in-memory transformation that reads several entity properties. Read-only — nothing is saved. Which query is best?",
    options: [
      "Lazy-load each collection in a loop after listing the books",
      "A tracked query with a single-query Include of ReadingEntries",
      "`AsNoTracking()` with an Include of ReadingEntries and `AsSplitQuery()`",
      "A projection returning only entry counts"
    ],
    correct: 2,
    explain: "Entities are genuinely required (so not projection, D), and nothing is updated (so no tracking — eliminates B and its snapshot cost). The collection is the only sibling included, but with 50 books the split keeps the row count linear: books + entries instead of books × entries. The trade-off to acknowledge: extra round trips and the documented split-query consistency caveat." },

  { id: "as-14", lesson: "lesson-6",
    prompt: "Applied scenario: a developer writes one projection whose constructor takes `List<string>` author names and `List<string>` entry notes via `b.Authors.Select(...).ToList()` and `b.ReadingEntries.Select(...).ToList()`. EF Core cannot translate it. What is the best resolution?",
    options: [
      "Add a third collection parameter so EF sees them together",
      "Apply AsSplitQuery() to the same projection statement",
      "Run two queries (author names and entry notes) keyed by book id and assemble the DTOs — or redesign the contract around counts or a sub-endpoint",
      "Enable lazy loading so the lists fill after materialization"
    ],
    correct: 2,
    explain: "EF Core cannot flatten two sibling collections in a single projection constructor. Two keyed queries assembled server-side produce the same DTO; matching the challenge's contract (counts, or one list) is often the better design. AsSplitQuery applies to Include graphs, not single-constructor projections." }
];

/* ---------- Relationship Explorer ---------- */

const EXPLORER_OPTIONS = [
  { key: "one-to-one", label: "One-to-One" },
  { key: "one-to-many", label: "One-to-Many" },
  { key: "many-to-many", label: "Many-to-Many" }
];

const EXPLORER_DATA = {
  "one-to-one-required": {
    relationLabel: "1 → 1 (required)",
    cardinality: { left: "1", right: "1" },
    optionality: "required",
    left: { name: "User", role: "Principal", props: [
      { t: "Id", k: "pk" }, { t: "Username", k: "prop" }, { t: "Email", k: "prop" }, { t: "Profile", k: "nav" }
    ]},
    right: { name: "UserProfile", role: "Dependent", props: [
      { t: "Id", k: "pk" }, { t: "UserId", k: "fk" }, { t: "Bio", k: "prop" }, { t: "AvatarUrl", k: "prop" }, { t: "User", k: "nav" }
    ]},
    relational: [
      "`userprofiles.UserId` is a non-nullable FK column referencing `users.Id`.",
      "A **unique index** on `UserId` makes the relationship one-to-one: a user can have at most one profile.",
      "SQL join: `INNER JOIN users ON users.Id = userprofiles.UserId`.",
      "Deleting a user that still has a profile is restricted by default (required relationship)."
    ],
    ef: "modelBuilder.Entity<UserProfile>()            // dependent\n    .HasOne(p => p.User)\n    .WithOne(u => u.Profile)\n    .HasForeignKey<UserProfile>(p => p.UserId) // unique index\n    .IsRequired();",
    note: "Illustrative pair — Raff does not currently have a UserProfile. The defining traits are on the dependent side: non-nullable unique FK. Required is the default when the FK property is non-nullable."
  },
  "one-to-one-optional": {
    relationLabel: "1 → 0..1 (optional)",
    cardinality: { left: "1", right: "1" },
    optionality: "optional",
    left: { name: "User", role: "Principal", props: [
      { t: "Id", k: "pk" }, { t: "Username", k: "prop" }, { t: "Profile?", k: "nav" }
    ]},
    right: { name: "UserProfile", role: "Dependent", props: [
      { t: "Id", k: "pk" }, { t: "UserId?", k: "fk" }, { t: "Bio", k: "prop" }, { t: "User?", k: "nav" }
    ]},
    relational: [
      "`userprofiles.UserId` is a **nullable** FK column with a unique index.",
      "A user may have no profile (`NULL`), or one profile — never more.",
      "SQL join: `LEFT JOIN userprofiles ON ...` keeps users without profiles in the result.",
      "Set-null or restricted delete behavior applies depending on configuration; client-side tracked deletes default to setting the FK null."
    ],
    ef: "modelBuilder.Entity<UserProfile>()\n    .HasOne(p => p.User)\n    .WithOne(u => u.Profile)\n    .HasForeignKey<UserProfile>(p => p.UserId)\n    .IsRequired(false);               // nullable → optional",
    note: "Illustrative pair. Nullability of the FK is the switch between optional and required — the unique index stays in both cases."
  },
  "one-to-many-required": {
    relationLabel: "1 → N (required)",
    cardinality: { left: "1", right: "N" },
    optionality: "required",
    left: { name: "User", role: "Principal", props: [
      { t: "Id", k: "pk" }, { t: "Username", k: "prop" }, { t: "ReadingEntries", k: "nav" }
    ]},
    right: { name: "ReadingEntry", role: "Dependent", props: [
      { t: "Id", k: "pk" }, { t: "UserId", k: "fk" }, { t: "BookId", k: "fk" }, { t: "Rating", k: "prop" }, { t: "User", k: "nav" }
    ]},
    relational: [
      "`readingentries.UserId` is a non-nullable FK column referencing `users.Id`.",
      "Every entry belongs to exactly one user; the column can never be NULL.",
      "SQL join: `INNER JOIN users ON users.Id = readingentries.UserId`.",
      "Deleting a user who still has entries is restricted by default — handle the dependents first."
    ],
    ef: "modelBuilder.Entity<ReadingEntry>()\n    .HasOne(r => r.User)\n    .WithMany(u => u.ReadingEntries)\n    .HasForeignKey(r => r.UserId)\n    .IsRequired();",
    note: "Real Raff relationship (verified in the model and migrations): ReadingEntry.UserId is non-nullable with the inverse collection User.ReadingEntries. Convention configures it with no Fluent API needed."
  },
  "one-to-many-optional": {
    relationLabel: "1 → 0..N (optional)",
    cardinality: { left: "1", right: "N" },
    optionality: "optional",
    left: { name: "Category", role: "Principal", props: [
      { t: "Id", k: "pk" }, { t: "Name", k: "prop" }
    ]},
    right: { name: "Book", role: "Dependent", props: [
      { t: "Id", k: "pk" }, { t: "Title", k: "prop" }, { t: "PublishedYear?", k: "prop" }, { t: "Category?", k: "nav" }, { t: "CategoryId?", k: "shadowfk" }
    ]},
    relational: [
      "`books.CategoryId` is a **nullable** FK column referencing `categories.Id` — created as a shadow property.",
      "A book may reference no category; `book.Category` can be null.",
      "SQL join: `LEFT JOIN categories ON categories.Id = books.CategoryId`.",
      "Filtering on `b.Category.Name` silently drops uncategorized books — guard with null checks when that matters."
    ],
    ef: "modelBuilder.Entity<Book>()\n    .HasOne(b => b.Category)\n    .WithMany()                      // no inverse collection\n    .HasForeignKey(\"CategoryId\")     // shadow FK\n    .IsRequired(false);              // nullable → optional",
    note: "Raff's real configuration, verified against migration 20261011201657_AddCategoryToBooks: nullable CategoryId column and FK constraint, with no Books collection on Category. An inverse navigation is optional even for one-to-many."
  },
  "many-to-many": {
    relationLabel: "M ↔ N",
    cardinality: { left: "M", right: "N" },
    optionality: "none",
    left: { name: "Book", role: "Principal (to the join)", props: [
      { t: "Id", k: "pk" }, { t: "Title", k: "prop" }, { t: "Authors", k: "nav" }
    ]},
    right: { name: "Author", role: "Principal (to the join)", props: [
      { t: "Id", k: "pk" }, { t: "Name", k: "prop" }, { t: "Books", k: "nav" }
    ]},
    relational: [
      "Join table `book_authors` holds FK columns `book_id` and `author_id`.",
      "Composite primary key (`book_id`, `author_id`): the same pair can exist at most once.",
      "Every join row is required with respect to both sides, but either side may have **zero** related rows overall — an author with no books is valid.",
      "Migrations create indexes on both FK columns."
    ],
    ef: "modelBuilder.Entity<Book>()\n    .HasMany(b => b.Authors)\n    .WithMany(a => a.Books);\n// EF creates the implicit join entity:\n//   \"BookAuthor\" → table \"book_authors\"\n//   composite PK (book_id, author_id)",
    note: "Real Raff relationship: books ↔ authors via book_authors, configured in the scaffolded context with UsingEntity<Dictionary<string, object>> — the same model written out explicitly. Optionality is not a setting here: it would describe the join rows, which are always required references."
  }
};

/* ---------- Fix-Up Playground (Lesson 3) ---------- */

const FIXUP_STEPS = [
  { code: "var book = await ctx.Books.SingleAsync(b => b.Id == 7);",
    story: "The context materializes <strong>Book #7</strong> and begins tracking it. No related data was requested: <code>Authors</code> is an empty collection and <code>Category</code> is null.",
    tracked: [
      { name: "Book #7", state: "Unchanged", note: "materialized from the query" }
    ],
    navs: { bookAuthors: "[] — empty (nothing loaded)", authorBooks: "(author not loaded yet)", bookCategory: "null" },
    shadow: "CategoryId: null (in the model; no CLR property)" },
  { code: "var author = await ctx.Authors.SingleAsync(a => a.Id == 3);",
    story: "<strong>Author #3</strong> is tracked. Nothing connects it to Book #7 yet — there is no FK between books and authors; any link would live as a row in <code>book_authors</code>.",
    tracked: [
      { name: "Book #7", state: "Unchanged", note: "" },
      { name: "Author #3", state: "Unchanged", note: "materialized from the query" }
    ],
    navs: { bookAuthors: "[] — still empty", authorBooks: "[] — still empty", bookCategory: "null" },
    shadow: "CategoryId: null" },
  { code: "book.Authors.Add(author);",
    story: "Client-side mutation only: the object graph changed, but the change tracker has not scanned yet. <code>author.Books</code> is still empty — the inverse syncs later. No SQL has run.",
    tracked: [
      { name: "Book #7", state: "Unchanged", note: "tracker unaware of the change so far" },
      { name: "Author #3", state: "Unchanged", note: "" }
    ],
    navs: { bookAuthors: "[Author #3] — client-side list", authorBooks: "[] — not synced yet", bookCategory: "null" },
    shadow: "CategoryId: null" },
  { code: "ctx.ChangeTracker.DetectChanges();",
    story: "Fix-up runs: the inverse navigation synchronizes (<code>author.Books</code> now contains Book #7) and the tracker recognizes a new pairing, creating the join-row entry in the <strong>Added</strong> state. Still no SQL.",
    tracked: [
      { name: "Book #7", state: "Unchanged", note: "" },
      { name: "Author #3", state: "Unchanged", note: "" },
      { name: "book_authors (7, 3)", state: "Added", note: "implicit join entity entry" }
    ],
    navs: { bookAuthors: "[Author #3]", authorBooks: "[Book #7] — inverse synced", bookCategory: "null" },
    shadow: "CategoryId: null" },
  { code: "var cat = await ctx.Categories.SingleAsync(c => c.Id == 2);",
    story: "<strong>Category #2</strong> is loaded and tracked. The book's <code>Category</code> navigation is still null — loading an entity does not relate it to anything.",
    tracked: [
      { name: "Book #7", state: "Unchanged", note: "" },
      { name: "Author #3", state: "Unchanged", note: "" },
      { name: "Category #2", state: "Unchanged", note: "materialized from the query" },
      { name: "book_authors (7, 3)", state: "Added", note: "" }
    ],
    navs: { bookAuthors: "[Author #3]", authorBooks: "[Book #7]", bookCategory: "null — still unrelated" },
    shadow: "CategoryId: null" },
  { code: "book.Category = cat;",
    story: "A reference-navigation assignment, again client-side. Category has no inverse collection in Raff, so there is nothing to sync on that side; the shadow FK is still null until the next DetectChanges.",
    tracked: [
      { name: "Book #7", state: "Unchanged", note: "tracker has not scanned yet" },
      { name: "Author #3", state: "Unchanged", note: "" },
      { name: "Category #2", state: "Unchanged", note: "" },
      { name: "book_authors (7, 3)", state: "Added", note: "" }
    ],
    navs: { bookAuthors: "[Author #3]", authorBooks: "[Book #7]", bookCategory: "Category #2 — client-side assignment" },
    shadow: "CategoryId: null — not synchronized yet" },
  { code: "ctx.ChangeTracker.DetectChanges();",
    story: "Fix-up now synchronizes the FK from the navigation: the Book entry's shadow <code>CategoryId</code> becomes <strong>2</strong>, and the entity's state flips to <strong>Modified</strong>.",
    tracked: [
      { name: "Book #7", state: "Modified", note: "CategoryId changed" },
      { name: "Author #3", state: "Unchanged", note: "" },
      { name: "Category #2", state: "Unchanged", note: "" },
      { name: "book_authors (7, 3)", state: "Added", note: "" }
    ],
    navs: { bookAuthors: "[Author #3]", authorBooks: "[Book #7]", bookCategory: "Category #2" },
    shadow: "CategoryId: 2 — set by fix-up" },
  { code: "await ctx.SaveChangesAsync();",
    story: "SaveChanges runs DetectChanges automatically, then generates and executes SQL: <code>INSERT INTO book_authors (book_id, author_id) VALUES (7, 3)</code> and <code>UPDATE books SET CategoryId = 2 WHERE Id = 7</code>. Until this moment, the database knew nothing about any of it.",
    tracked: [
      { name: "Book #7", state: "Unchanged", note: "saved; back to Unchanged" },
      { name: "Author #3", state: "Unchanged", note: "" },
      { name: "Category #2", state: "Unchanged", note: "" },
      { name: "book_authors (7, 3)", state: "Unchanged", note: "inserted" }
    ],
    navs: { bookAuthors: "[Author #3]", authorBooks: "[Book #7]", bookCategory: "Category #2" },
    shadow: "CategoryId: 2 — persisted",
    verdict: "Navigations and foreign keys are synchronized by fix-up at DetectChanges — SaveChanges does it for you; SQL executes only at SaveChanges. Assignment alone never touches the database." }
];

/* ---------------------------------------------------------- */
/* Lesson content (extracted verbatim from the original page) */
/* ---------------------------------------------------------- */
const MODULE_LESSONS = [
  {
    id: "lesson-0",
    badge: "00",
    nav: "Overview & Outcomes",
    content: `
      <div class="lesson-header-box">
        <div class="lesson-badge-top">Module 3 • Data Modeling &amp; Query Performance</div>
        <h1 class="lesson-title">Relationships, Loading Strategies &amp; Query Performance</h1>
        <p class="lesson-subtitle">Model relationships the way a senior backend engineer does, load related data deliberately, and eliminate N+1 queries from the Raff API.</p>
        <div class="lesson-meta-bar">
          <span>🎯 Level: 4th-year CS / Junior .NET Engineer</span>
          <span>⏱️ Pacing: Self-paced (7 lessons + challenge)</span>
          <span>🐘 Engine: EF Core 10 + Npgsql + PostgreSQL</span>
        </div>
      </div>

      <div class="callout callout-info">
        <div class="callout-title">📖 Where this module fits</div>
        <p>In <strong>Module 1</strong> you built the HTTP layer of Raff: controllers, route templates, status codes, and DTO contracts. In <strong>Module 2</strong> you went under the hood of EF Core: the change tracker, entity states, <code>DbContext</code> lifetimes, LINQ translation, and generated SQL.</p>
        <p>This module connects the two worlds. Real APIs are not sets of isolated tables — they are <strong>graphs of related data</strong>. A book has authors, a category groups books, users create reading entries. You will learn how to model those relationships, how EF Core decides when related rows travel across the network, and how naïve loading choices turn a fast endpoint into a slow one.</p>
      </div>

      <h2>Module Roadmap</h2>
      <div class="roadmap-grid">
        <div class="roadmap-card">
          <div class="roadmap-num">01</div>
          <div class="roadmap-title">How Relationships Work</div>
          <div class="roadmap-desc">Primary and foreign keys, principal and dependent entities, reference and collection navigations, required vs. optional. Includes the Interactive Relationship Explorer.</div>
        </div>
        <div class="roadmap-card">
          <div class="roadmap-num">02</div>
          <div class="roadmap-title">Relationship Types &amp; Configuration</div>
          <div class="roadmap-desc">One-to-many, one-to-one, and many-to-many. Conventions, data annotations, Fluent API, join tables, skip navigations, and explicit join entities.</div>
        </div>
        <div class="roadmap-card">
          <div class="roadmap-num">03</div>
          <div class="roadmap-title">Navigations &amp; Relationship Fix-Up</div>
          <div class="roadmap-desc">How the change tracker keeps foreign keys and navigation properties in sync, and why "the navigation exists" does not mean "the data was loaded". Includes a step-through playground.</div>
        </div>
        <div class="roadmap-card">
          <div class="roadmap-num">04</div>
          <div class="roadmap-title">Loading Related Data</div>
          <div class="roadmap-desc">Eager, explicit, and lazy loading. <code>Include</code> and <code>ThenInclude</code>, filtered includes, proxy requirements, and the Loading Strategy Decision Lab.</div>
        </div>
        <div class="roadmap-card">
          <div class="roadmap-num">05</div>
          <div class="roadmap-title">The N+1 Query Problem</div>
          <div class="roadmap-desc">How one logical operation becomes N+1 database round trips, how to recognize it in logs, and how to fix it. Includes the N+1 Simulator.</div>
        </div>
        <div class="roadmap-card">
          <div class="roadmap-num">06</div>
          <div class="roadmap-title">Efficient Queries &amp; DTO Projections</div>
          <div class="roadmap-desc">Project only what the endpoint needs, paginate deliberately, count in the database, and inspect SQL with <code>ToQueryString()</code>.</div>
        </div>
        <div class="roadmap-card">
          <div class="roadmap-num">07</div>
          <div class="roadmap-title">Single vs. Split Queries</div>
          <div class="roadmap-desc">Join fan-out, cartesian explosion with sibling collections, <code>AsSplitQuery()</code>, and the real trade-offs. Includes a row-multiplication calculator.</div>
        </div>
        <div class="roadmap-card">
          <div class="roadmap-num">08</div>
          <div class="roadmap-title">Raff Project Challenge</div>
          <div class="roadmap-desc">Design and implement a real paginated endpoint for Raff with a DTO projection, then verify the SQL. Progressive hints included.</div>
        </div>
      </div>

      <h2>Learning Objectives</h2>
      <p>By the end of this module you should be able to:</p>
      <ol>
        <li>Explain how relational relationships map to EF Core entity models.</li>
        <li>Distinguish primary keys, foreign keys, principal entities, dependent entities, and navigation properties.</li>
        <li>Model one-to-many, one-to-one, and many-to-many relationships.</li>
        <li>Reason about required and optional relationships and their database consequences.</li>
        <li>Configure relationships using conventions, data annotations where applicable, and the Fluent API.</li>
        <li>Explain join tables, skip navigations, and when an explicit join entity is worth writing.</li>
        <li>Load related data with eager, explicit, and lazy loading — and justify each choice.</li>
        <li>Use <code>Include</code> and <code>ThenInclude</code> correctly.</li>
        <li>Explain how relationship fix-up interacts with tracked entities.</li>
        <li>Identify the N+1 query problem and explain why it occurs.</li>
        <li>Choose between entity loading and projection into DTOs.</li>
        <li>Recognize excessive data retrieval and cartesian explosion.</li>
        <li>Explain the trade-offs between single queries and split queries.</li>
        <li>Inspect generated SQL and use query logging to investigate performance.</li>
        <li>Make reasonable loading and projection decisions for a real ASP.NET Core API.</li>
      </ol>

      <div class="callout callout-success">
        <div class="callout-title">✅ Verified facts about your Raff project</div>
        <p>Your source files were inspected before writing this module (<code>Data/Models/*.cs</code>, <code>Data/BooksContext.cs</code>, <code>Data/Migrations/*</code>, <code>Services/BookService.cs</code>, <code>Controllers/BookController.cs</code>, <code>shared/pagination.cs</code>). Examples labeled <strong>"Raff"</strong> come from that code. Examples labeled <strong>"illustrative"</strong> are teaching models that do <em>not</em> exist in your project yet. Concretely, the current Raff model is:</p>
        <ul>
          <li><code>Book</code> has a <code>Category? Category</code> reference navigation. There is <strong>no <code>CategoryId</code> CLR property</strong> and no <code>Books</code> collection on <code>Category</code> — EF Core maintains a <strong>shadow foreign key</strong> named <code>CategoryId</code> in the <code>books</code> table.</li>
          <li>Because the shadow FK is <strong>nullable</strong> (the relationship is optional), <code>books.CategoryId</code> is created as <code>nullable: true</code> in migration <code>20261011201657_AddCategoryToBooks</code>.</li>
          <li><code>Book</code> ↔ <code>Author</code> is many-to-many through the <code>book_authors</code> join table (<code>book_id</code>, <code>author_id</code>, composite primary key). Both sides declare skip navigations (<code>Book.Authors</code>, <code>Author.Books</code>).</li>
          <li><code>ReadingEntry</code> has non-nullable <code>UserId</code> / <code>BookId</code> FKs with required relationships to <code>User</code> and <code>Book</code>, plus the inverse collections <code>User.ReadingEntries</code> and <code>Book.ReadingEntries</code>. A unique index (<code>UserId</code>, <code>BookId</code>) prevents duplicate entries.</li>
          <li>All collection navigations are <code>virtual</code> and initialized to <code>new List&lt;...&gt;()</code> — when not loaded they are <strong>empty, not null</strong>.</li>
          <li><strong>Lazy loading is not enabled in Raff</strong>: there is no <code>Microsoft.EntityFrameworkCore.Proxies</code> package and no <code>UseLazyLoadingProxies()</code> call. Accessing <code>book.Authors</code> therefore does not query the database.</li>
          <li><code>BookService.GetBooksAsync</code> already uses <code>AsNoTracking()</code>, <code>Include(b =&gt; b.Authors)</code>, <code>Skip</code>/<code>Take</code> pagination, and a separate <code>CountAsync()</code>.</li>
        </ul>
      </div>

      <h2>How to read this module</h2>
      <table class="concept-table">
        <thead>
          <tr><th>Label</th><th>Meaning</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><span class="code-type-pill pill-complete">Complete Example</span></td>
            <td>A full, compilable method or class in context. You can copy it into a scratch project.</td>
          </tr>
          <tr>
            <td><span class="code-type-pill pill-fragment">Fragment</span></td>
            <td>Part of a larger method; useful for the specific behavior being taught, not compilable on its own.</td>
          </tr>
          <tr>
            <td><span class="code-type-pill pill-anti-pattern">Anti-Pattern</span></td>
            <td>Deliberately problematic code shown to teach you what to avoid.</td>
          </tr>
          <tr>
            <td><span class="code-type-pill pill-illustrative">Illustrative</span></td>
            <td>A teaching model that is not part of your current Raff schema.</td>
          </tr>
        </tbody>
      </table>

      <div class="callout callout-warning">
        <div class="callout-title">⚠️ Simulations vs. real execution</div>
        <p>This module contains an N+1 simulator, a cartesian explosion calculator, and a fix-up playground. They are <strong>educational models implemented in JavaScript</strong>, not EF Core or PostgreSQL. They illustrate documented behavior with simplified assumptions (stated next to each tool); real query counts and result sizes always depend on your configuration, data, provider version, and tracking state.</p>
      </div>

      <h2>Prerequisites check</h2>
      <ul>
        <li>You can already write LINQ queries against <code>BooksContext</code> and read the generated SQL (Module 2).</li>
        <li>You know the five entity states (<code>Detached</code>, <code>Unchanged</code>, <code>Added</code>, <code>Modified</code>, <code>Deleted</code>) and what <code>SaveChangesAsync()</code> does.</li>
        <li>You know what <code>AsNoTracking()</code> changes about identity and fix-up.</li>
      </ul>
      <p>If any of those feel shaky, skim the corresponding Module 2 lesson first — the concepts are referenced constantly from here on.</p>

      <div class="lesson-footer-nav">
        <span></span>
        <button class="btn-primary" data-nav-target="lesson-1" type="button">Start Lesson 1: How Relationships Work →</button>
      </div>
    `
  },
  {
    id: "lesson-1",
    badge: "01",
    nav: "How Relationships Work",
    content: `
      <div class="lesson-header-box">
        <div class="lesson-badge-top">Lesson 1</div>
        <h1 class="lesson-title">How EF Core Relationships Work</h1>
        <p class="lesson-subtitle">One relationship, two views: a foreign key in the relational world and a navigation property in your C# object graph.</p>
      </div>

      <h2>1. Two views of the same relationship</h2>
      <p>A relationship between two entities exists in your database <strong>and</strong> in your C# model. The two views describe the same fact using different vocabularies:</p>

      <table class="concept-table">
        <thead>
          <tr><th>Relational view (PostgreSQL)</th><th>Object view (C# / EF Core)</th></tr>
        </thead>
        <tbody>
          <tr><td>A <strong>foreign-key column</strong> stores the value that links the two tables, e.g. <code>books.CategoryId</code>.</td><td>A <strong>navigation property</strong> gives you an object reference, e.g. <code>book.Category</code>.</td></tr>
          <tr><td>The constraint <code>FK_books_Categories_CategoryId</code> guarantees the value exists in the referenced table's primary key.</td><td>The relationship is declared once in the model (by convention or explicitly) and EF Core keeps both sides synchronized.</td></tr>
          <tr><td>You follow the link with a <code>JOIN</code>.</td><td>You follow the link with <code>book.Category.Name</code> — <em>if</em> the related data is available in memory (Lesson 4).</td></tr>
        </tbody>
      </table>

      <p>An <strong>ORM's job</strong> is to translate between these two worlds: given your LINQ query, generate the JOINs the relational world requires; given materialized rows, populate the object graph your C# code expects. EF Core does this translation through the <strong>model</strong> — the metadata describing every entity, key, and relationship. That model is built once, when the context is first used, from conventions plus any configuration you add.</p>

      <h2>2. Keys and roles: primary, foreign, principal, dependent</h2>
      <p>Four terms appear in every EF Core relationship discussion. Nail them down now:</p>

      <div class="steps-container">
        <div class="step-item">
          <div class="step-num">1</div>
          <div class="step-text"><strong>Primary key (PK):</strong> the column(s) that uniquely identify a row. In Raff every entity has an <code>int Id</code>, configured with <code>UseIdentityAlwaysColumn()</code> (a PostgreSQL <code>GENERATED ALWAYS AS IDENTITY</code> column).</div>
        </div>
        <div class="step-item">
          <div class="step-num">2</div>
          <div class="step-text"><strong>Foreign key (FK):</strong> a column in one table whose value must match a primary key (or alternate key) in another table. The FK is what makes the relationship <em>real</em> in the database — the constraint is enforced by PostgreSQL.</div>
        </div>
        <div class="step-item">
          <div class="step-num">3</div>
          <div class="step-text"><strong>Principal entity:</strong> the entity whose key is being referenced — the <em>"one"</em> side. Example: <code>Category</code> in the <code>Book → Category</code> relationship.</div>
        </div>
        <div class="step-item">
          <div class="step-num">4</div>
          <div class="step-text"><strong>Dependent entity:</strong> the entity that carries the FK — the side that "points at" the principal. Example: <code>Book</code>, because <code>books.CategoryId</code> lives in the books table.</div>
        </div>
      </div>

      <div class="callout callout-info">
        <div class="callout-title">💡 Memory hook</div>
        <p>The <strong>dependent</strong> entity <em>depends on</em> the principal existing: you can't insert a <code>Book</code> that references <code>CategoryId = 99</code> if no category 99 exists. The FK always lives on the dependent side; the principal is the entity being pointed at.</p>
      </div>

      <h2>3. Navigation properties: reference and collection</h2>
      <p>Navigation properties are C# members that let you traverse the relationship as an object reference instead of a key lookup. EF Core recognizes two shapes:</p>

      <ul>
        <li><strong>Reference navigation</strong> — points to a single related entity: <code>public Category? Category { get; set; }</code>. Use it when a book has (at most) one category.</li>
        <li><strong>Collection navigation</strong> — points to many related entities: <code>public ICollection&lt;Book&gt; Books { get; }</code> or <code>public ICollection&lt;ReadingEntry&gt; ReadingEntries { get; set; }</code>. Use it when one principal owns many dependents.</li>
        <li><strong>Inverse navigation</strong> — the pair partner on the other end. <code>Book.Category</code> and <code>Category.Books</code> are inverses of each other. Two navigations pointing at the same relationship are its two ends.</li>
      </ul>

      <p>Two important facts that many developers get wrong:</p>
      <ul>
        <li><strong>Relationships do not require navigations on both ends.</strong> Your Raff model is proof: <code>Book</code> declares <code>Category? Category</code>, but <code>Category</code> declares <em>no</em> collection of books. EF Core still discovers a full one-to-many relationship, still creates the FK, and still enforces it. The inverse navigation is optional metadata, not a requirement.</li>
        <li><strong>Navigations are model metadata, not loaded data.</strong> The property exists on every <code>Book</code> instance the moment the class compiles. Whether it <em>contains</em> a category in memory after you run a query is a completely separate question (Section 6 and Lesson 4).</li>
      </ul>

      <h2>4. A concrete relationship: Category and Book in Raff</h2>
      <p>Here is the actual shape of your <code>Category</code> and <code>Book</code> entities (abridged where noted). Read every comment — they map each property to its role.</p>

      <div class="code-wrapper">
        <div class="code-header">
          <div class="code-badge-group">
            <span class="code-lang-tag">C#</span>
            <span class="code-filename">Data/Models/Categoty.cs (Raff)</span>
            <span class="code-type-pill pill-fragment">Fragment</span>
          </div>
          <button class="btn-copy" type="button" aria-label="Copy code">📋 Copy</button>
        </div>
        <pre><code class="language-c#">
public class Category
{
    public int Id { get; set; }                    // PK: principal entity's key

    public required string Name { get; set; }      // required property (C# + NOT NULL)
}
</code></pre>
        <div class="code-expl">Note what is missing: there is no <code>ICollection&lt;Book&gt; Books</code> here. The relationship is still fully functional — the inverse navigation is optional. (Also note the file is named <code>Categoty.cs</code> in your repo; typos in filenames don't affect EF Core.)</div>
      </div>

      <div class="code-wrapper">
        <div class="code-header">
          <div class="code-badge-group">
            <span class="code-lang-tag">C#</span>
            <span class="code-filename">Data/Models/Book.cs (Raff, abridged)</span>
            <span class="code-type-pill pill-fragment">Fragment</span>
          </div>
          <button class="btn-copy" type="button" aria-label="Copy code">📋 Copy</button>
        </div>
        <pre><code class="language-c#">
public partial class Book
{
    public int Id { get; set; }                    // PK

    public string Title { get; set; } = null!;
    public int? PublishedYear { get; set; }
    public string? Summary { get; set; }
    public string? CoverUrl { get; set; }

    // Reference navigation: zero or one Category per Book.
    // There is NO CategoryId property in this class and NO inverse
    // collection on Category — EF Core keeps a SHADOW foreign key
    // named "CategoryId" in the books table instead.
    public Category? Category { get; set; }

    // Collection navigation: one Book has many ReadingEntries.
    public virtual ICollection&lt;ReadingEntry&gt; ReadingEntries { get; set; }
        = new List&lt;ReadingEntry&gt;();

    // Collection navigation (skip navigation, Lesson 2): many Authors.
    public virtual ICollection&lt;Author&gt; Authors { get; set; }
        = new List&lt;Author&gt;();
}
</code></pre>
        <div class="code-expl">Three relationships are visible here: Book→Category (optional many-to-one), Book→ReadingEntry (one-to-many), and Book↔Author (many-to-many via the <code>book_authors</code> join table).</div>
      </div>

      <h2>5. Required vs. optional — and what really decides it</h2>
      <p>Every relationship is either <strong>required</strong> (a dependent must reference a principal) or <strong>optional</strong> (it may reference nothing). The deciding signal is the <strong>nullability of the foreign key</strong>:</p>

      <table class="concept-table">
        <thead>
          <tr><th>FK state</th><th>Relationship</th><th>Database consequence</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><code>int CategoryId</code> (non-nullable)</td>
            <td><strong>Required</strong></td>
            <td><code>books.CategoryId</code> is <code>NOT NULL</code>. Every book row must reference a real category. Deleting a referenced category is restricted (or cascades, depending on delete behavior).</td>
          </tr>
          <tr>
            <td><code>int? CategoryId</code> (nullable)</td>
            <td><strong>Optional</strong></td>
            <td><code>books.CategoryId</code> is <code>NULL</code>-able. A "category-less" book is valid; a book row can exist with no relationship target.</td>
          </tr>
        </tbody>
      </table>

      <p>In Raff, the FK is a <em>shadow</em> property — it exists only in EF's model, not in your C# class. When a shadow FK is involved, EF Core infers nullability from the <strong>navigation</strong>: because <code>Category?</code> is nullable (and nullable reference types are enabled in your project), EF Core creates a <strong>nullable shadow FK</strong> and an <strong>optional</strong> relationship. The migration proves it:</p>

      <div class="code-wrapper">
        <div class="code-header">
          <div class="code-badge-group">
            <span class="code-lang-tag">C#</span>
            <span class="code-filename">Data/Migrations/20261011201657_AddCategoryToBooks.cs (Raff)</span>
            <span class="code-type-pill pill-fragment">Fragment</span>
          </div>
          <button class="btn-copy" type="button" aria-label="Copy code">📋 Copy</button>
        </div>
        <pre><code class="language-c#">
migrationBuilder.AddColumn&lt;int&gt;(
    name: "CategoryId",
    table: "books",
    type: "integer",
    nullable: true);                     // ← optional relationship

migrationBuilder.CreateIndex(
    name: "IX_books_CategoryId",         // ← EF indexes FKs by convention
    table: "books",
    column: "CategoryId");

migrationBuilder.AddForeignKey(
    name: "FK_books_Categories_CategoryId",
    table: "books",
    column: "CategoryId",
    principalTable: "Categories",
    principalColumn: "Id");
</code></pre>
        <div class="code-expl">The FK column, its index, and the constraint are all database-level facts. EF Core created them because of the relationship it discovered in the model.</div>
      </div>

      <h3>Modeling the optional relationship with an explicit FK</h3>
      <p>Many teams prefer a visible CLR property over a shadow property, because the FK becomes usable in LINQ projections, DTO mapping, and update code. The equivalent explicit model would be:</p>

      <div class="code-wrapper">
        <div class="code-header">
          <div class="code-badge-group">
            <span class="code-lang-tag">C#</span>
            <span class="code-filename">Illustrative variant of Raff's Book</span>
            <span class="code-type-pill pill-illustrative">Illustrative</span>
          </div>
          <button class="btn-copy" type="button" aria-label="Copy code">📋 Copy</button>
        </div>
        <pre><code class="language-c#">
public class Book
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;

    public int? CategoryId { get; set; }        // nullable FK    → OPTIONAL
    public Category? Category { get; set; }     // nullable nav   → OPTIONAL
}
</code></pre>
        <div class="code-expl">Same relationship, same optionality — but now your C# code can read <code>book.CategoryId</code> directly instead of going through <code>context.Entry(book).Property("CategoryId")</code>. You would add this property to <code>Book</code> and let a migration adopt it; the database column already exists.</div>
      </div>

      <p>Making the relationship <strong>required</strong> means flipping both declarations — <code>int CategoryId</code> and <code>Category Category</code> — and generating a migration that makes the column <code>NOT NULL</code>. If existing rows contain <code>NULL</code> values, the migration will fail until you backfill them; that's PostgreSQL enforcing your decision, which is exactly what you want.</p>

      <div class="callout callout-danger">
        <div class="callout-title">🚨 A nullable navigation does NOT prove the database allows NULL</div>
        <p>Never infer the relationship's database shape from C# declarations alone. Three things can disagree:</p>
        <ul>
          <li>Your intent ("categories are always required").</li>
          <li>What your model <em>declares</em> (nullable FK + nullable nav = optional by convention).</li>
          <li>What the database <em>enforces</em> (the actual constraint, created by your migrations).</li>
        </ul>
        <p>The only trustworthy source of truth is the model configuration, and ultimately the generated SQL/schema. A non-nullable navigation property without a matching non-nullable FK column is a configuration bug waiting to surface. This is why teams verify with <code>dotnet ef migrations script</code>, inspect the Fluent configuration in <code>OnModelCreating</code>, and read migrations in review.</p>
      </div>

      <h2>6. The relationship diagram</h2>
      <div class="diagram-container">
        <div class="diagram-title">Category (1) ───── (many) Book — Raff's actual optional relationship</div>
        <svg viewBox="0 0 860 260" role="img" aria-label="Entity relationship diagram: Categories table on the left connected to books table on the right by a one-to-many relationship. The foreign key CategoryId lives in the books table and is nullable.">
          <!-- Categories box -->
          <rect class="erd-rect" x="30" y="70" width="300" height="88" rx="8"></rect>
          <path class="erd-head" d="M30 78 a8 8 0 0 1 8-8 h284 a8 8 0 0 1 8 8 v28 h-300 z"></path>
          <text class="erd-name" x="44" y="97">Categories (principal)</text>
          <text class="erd-prop" x="44" y="133">Id</text>
          <text class="erd-pk" x="316" y="133" text-anchor="end">PK</text>
          <text class="erd-prop" x="44" y="155">Name</text>
          <text class="erd-role" x="316" y="155" text-anchor="end">NOT NULL</text>
          <text class="erd-label" x="180" y="185" text-anchor="middle">Role: the "one" side being referenced</text>

          <!-- Books box -->
          <rect class="erd-rect" x="530" y="50" width="300" height="114" rx="8"></rect>
          <path class="erd-head" d="M530 58 a8 8 0 0 1 8-8 h284 a8 8 0 0 1 8 8 v28 h-300 z"></path>
          <text class="erd-name" x="544" y="77">books (dependent)</text>
          <rect class="erd-fk-col" x="531" y="105" width="298" height="25" rx="0"></rect>
          <text class="erd-prop" x="544" y="121">Id</text>
          <text class="erd-pk" x="816" y="121" text-anchor="end">PK</text>
          <text class="erd-prop" x="544" y="147">CategoryId</text>
          <text class="erd-fk" x="816" y="147" text-anchor="end">FK · NULLABLE</text>
          <text class="erd-prop" x="544" y="169">Title</text>
          <text class="erd-role" x="816" y="169" text-anchor="end">NOT NULL</text>
          <text class="erd-label" x="680" y="193" text-anchor="middle">Role: the "many" side holding the FK</text>

          <!-- Connector -->
          <line class="erd-line" x1="330" y1="114" x2="530" y2="114"></line>
          <line class="erd-line" x1="330" y1="104" x2="330" y2="124"></line>
          <line class="erd-line" x1="516" y1="100" x2="530" y2="114"></line>
          <line class="erd-line" x1="516" y1="128" x2="530" y2="114"></line>
          <text class="erd-card" x="352" y="106">1</text>
          <text class="erd-card" x="492" y="106" text-anchor="end">N</text>
          <text class="erd-label" x="430" y="140" text-anchor="middle">FK constraint: books.CategoryId → Categories.Id</text>
          <text class="erd-note" x="430" y="228" text-anchor="middle">C# side: Book.Category (reference navigation) — no inverse collection exists on Category</text>
        </svg>
        <div class="legend-row">
          <span class="legend-item"><span class="legend-dot dot-pk"></span> Primary key</span>
          <span class="legend-item"><span class="legend-dot dot-fk"></span> Foreign key</span>
          <span class="legend-item"><span class="legend-dot dot-nav"></span> Navigation property (model-only)</span>
        </div>
      </div>

      <p>Read the diagram in both directions:</p>
      <ul>
        <li><strong>Relationally:</strong> the <code>books</code> table has a nullable <code>CategoryId</code> column with an index and a foreign-key constraint to <code>Categories.Id</code>. A category can exist with zero books. A book can exist with no category.</li>
        <li><strong>In C#:</strong> <code>book.Category</code> gives you the related <code>Category</code> object when it is tracked or loaded; <code>book.CategoryId</code> does not exist because the FK is a shadow property.</li>
      </ul>

      <div class="callout callout-warning">
        <div class="callout-title">⚠️ The existence of a navigation does not mean the data was queried</div>
        <p>After <code>await context.Books.ToListAsync()</code>, every <code>Book</code> has a <code>Category</code> property — but it will be <code>null</code> unless the category was loaded. The property exists in the <em>model</em>; the reference in the <em>object graph</em> only appears when EF Core has the related row in memory (loaded by this query, loaded earlier in the same context, or fetched by lazy loading if you enabled it — Raff has not).</p>
      </div>

      <h2>7. Interactive Relationship Explorer</h2>
      <p>Use the explorer below to compare the three relationship shapes. It shows: the entities and their properties, which side carries the FK, the cardinality markers, the relational representation, and how the relationship would be configured in EF Core. The one-to-many and many-to-many models come from Raff (names match your schema); the one-to-one model is a clearly marked illustrative example.</p>

      <div class="explorer-box" id="rel-explorer">
        <div class="explorer-header">
          <div class="explorer-title">🧭 Relationship Explorer — educational model, not a live EF Core runtime</div>
          <div class="explorer-controls">
            <div class="explorer-control-group">
              <span class="explorer-control-label" id="explorer-type-label">Relationship type</span>
              <div class="chip-group" id="explorer-type-btns" role="group" aria-labelledby="explorer-type-label">
                <button class="chip-btn" data-type="one-to-many" type="button" aria-pressed="false">One-to-many</button>
                <button class="chip-btn" data-type="one-to-one" type="button" aria-pressed="false">One-to-one</button>
                <button class="chip-btn" data-type="many-to-many" type="button" aria-pressed="false">Many-to-many</button>
              </div>
            </div>
            <div class="explorer-control-group">
              <span class="explorer-control-label" id="explorer-optionality-label">Required or optional reference</span>
              <div class="chip-group" id="explorer-optionality" role="group" aria-labelledby="explorer-optionality-label">
                <button class="chip-btn" data-mode="required" type="button" aria-pressed="false">Required</button>
                <button class="chip-btn" data-mode="optional" type="button" aria-pressed="false">Optional</button>
              </div>
            </div>
          </div>
        </div>
        <div class="explorer-body">
          <div class="explorer-svg-wrap" id="explorer-svg-host" aria-live="polite"></div>
          <div class="legend-row">
            <span class="legend-item"><span class="legend-dot dot-pk"></span> Primary key</span>
            <span class="legend-item"><span class="legend-dot dot-fk"></span> Foreign key</span>
            <span class="legend-item"><span class="legend-dot dot-nav"></span> Navigation property</span>
          </div>
          <div class="explorer-grid">
            <div class="explorer-panel">
              <div class="explorer-panel-title">Relational representation</div>
              <div id="explorer-relational"></div>
            </div>
            <div class="explorer-panel">
              <div class="explorer-panel-title">EF Core model &amp; configuration</div>
              <div id="explorer-ef"></div>
            </div>
          </div>
          <div class="explorer-note" id="explorer-note"></div>
        </div>
      </div>

      <h2>Lesson 1 Summary</h2>
      <ul>
        <li>Every relationship has a <strong>principal</strong> (the "one" side, referenced) and a <strong>dependent</strong> (the side holding the FK).</li>
        <li><strong>Reference navigations</strong> point to one entity; <strong>collection navigations</strong> point to many. Inverse navigations are optional on either end.</li>
        <li><strong>Required vs. optional</strong> is decided by FK nullability — which, for shadow FKs like Raff's <code>CategoryId</code>, is inferred from navigation nullability under nullable reference types.</li>
        <li>Navigate the graph in C#, but remember: <strong>navigations in the model ≠ data in memory</strong>.</li>
        <li>Trust the model configuration and generated schema, not C# declarations alone, when reasoning about database behavior.</li>
      </ul>

      <h2>Knowledge Checks</h2>
      <div class="kc-mount" data-kc-group="lesson-1"></div>

      <div class="refs-block">
        <div class="refs-title">Official references for this lesson</div>
        <ul>
          <li><a href="https://learn.microsoft.com/en-us/ef/core/modeling/relationships/" target="_blank" rel="noopener noreferrer">EF Core — Introduction to relationships</a></li>
          <li><a href="https://learn.microsoft.com/en-us/ef/core/modeling/relationships/navigations" target="_blank" rel="noopener noreferrer">EF Core — Relationship navigations</a></li>
          <li><a href="https://learn.microsoft.com/en-us/ef/core/modeling/relationships/one-to-many" target="_blank" rel="noopener noreferrer">EF Core — One-to-many relationships</a></li>
        </ul>
      </div>

      <div class="lesson-footer-nav">
        <button class="btn-secondary" data-nav-target="lesson-0" type="button">← Overview</button>
        <button class="btn-complete-lesson" data-lesson="lesson-1" type="button">Mark Lesson 1 Complete ✓</button>
        <button class="btn-primary" data-nav-target="lesson-2" type="button">Next: Relationship Types →</button>
      </div>
    `
  },
  {
    id: "lesson-2",
    badge: "02",
    nav: "Relationship Types & Config",
    content: `
      <div class="lesson-header-box">
        <div class="lesson-badge-top">Lesson 2</div>
        <h1 class="lesson-title">Relationship Types and Configuration</h1>
        <p class="lesson-subtitle">One-to-many, one-to-one, and many-to-many — discovered by convention, refined with the Fluent API.</p>
      </div>

      <p>EF Core models exactly three relationship shapes. Everything else is a variation of these three:</p>

      <table class="concept-table">
        <thead>
          <tr><th>Type</th><th>Cardinality</th><th>Raff example</th><th>Where the FK lives</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>One-to-many</strong></td>
            <td>1 → N</td>
            <td><code>Category</code> → <code>Book</code> (optional in Raff)</td>
            <td>On the "many" side (<code>books.CategoryId</code>)</td>
          </tr>
          <tr>
            <td><strong>One-to-one</strong></td>
            <td>1 ↔ 1</td>
            <td>Not in Raff yet — illustrative <code>User</code> / <code>UserProfile</code></td>
            <td>On the dependent side, <em>plus a unique constraint</em> to stop it becoming one-to-many</td>
          </tr>
          <tr>
            <td><strong>Many-to-many</strong></td>
            <td>N ↔ M</td>
            <td><code>Book</code> ↔ <code>Author</code> via <code>book_authors</code></td>
            <td>Nowhere — a <strong>join table</strong> holds two FKs</td>
          </tr>
        </tbody>
      </table>

      <h2>A. One-to-many</h2>
      <p>The most common shape in Raff. One <code>Category</code> can classify many <code>Book</code> rows; each book references at most one category. You already saw the model in Lesson 1 — now review how it was <em>discovered</em> and how you would configure it explicitly.</p>

      <h3>How convention discovered Raff's relationship</h3>
      <div class="steps-container">
        <div class="step-item">
          <div class="step-num">1</div>
          <div class="step-text">EF Core scans the model for <strong>navigations</strong>. It finds <code>Book.Category</code> — a reference navigation to a type that is a known entity.</div>
        </div>
        <div class="step-item">
          <div class="step-num">2</div>
          <div class="step-text">It looks for an FK property named <code>CategoryId</code>, <code>CategoryID</code>, <code>Category_Id</code>, or … nothing. No CLR property matches. EF Core therefore creates a <strong>shadow property</strong> named <code>CategoryId</code> on the <code>Book</code> entity.</div>
        </div>
        <div class="step-item">
          <div class="step-num">3</div>
          <div class="step-text">It looks for an inverse navigation on <code>Category</code> (a collection of <code>Book</code>). It finds none — that's fine. The relationship is created with a single navigation.</div>
        </div>
        <div class="step-item">
          <div class="step-num">4</div>
          <div class="step-text">Because the navigation is nullable under nullable reference types (<code>Category?</code>), the shadow FK is made nullable and the relationship is <strong>optional</strong>. A migration then creates the column, index, and FK constraint you saw earlier.</div>
        </div>
      </div>

      <div class="callout callout-info">
        <div class="callout-title">💡 Shadow properties are real — just invisible</div>
        <p>A shadow property participates in queries, updates, and migrations exactly like a CLR property. You can read and write it through the API: <code>context.Entry(book).Property("CategoryId").CurrentValue</code>. But it never appears in your C# code, and you can't project it with <code>b.CategoryId</code> in LINQ. In projections you can use <code>EF.Property&lt;int?&gt;(b, "CategoryId")</code>, or simply project through the navigation (<code>b.Category != null ? b.Category.Name : null</code>) as the challenge in Lesson 8 does.</p>
      </div>

      <div class="code-wrapper">
        <div class="code-header">
          <div class="code-badge-group">
            <span class="code-lang-tag">C#</span>
            <span class="code-filename">Program.cs or Data/DependencyInjection.cs (Raff-compatible, optional)</span>
            <span class="code-type-pill pill-fragment">Fragment</span>
          </div>
          <button class="btn-copy" type="button" aria-label="Copy code">📋 Copy</button>
        </div>
        <pre><code class="language-c#">
// This relationship is discovered by convention, so Raff doesn't need
// this code — but this is what explicitly configuring it would look like.
modelBuilder.Entity&lt;Book&gt;()
    .HasOne(b =&gt; b.Category)        // Book "has one" Category  (start from the dependent)
    .WithMany()                     // Category has no inverse collection navigation
    .HasForeignKey("CategoryId")    // the (shadow) FK is books.CategoryId
    .IsRequired(false);             // nullable FK → optional relationship
</code></pre>
        <div class="code-expl">The four calls read as a sentence: "A Book has one Category; the Category side can have many Books (here: no collection declared); the FK is CategoryId; the relationship is optional."</div>
      </div>

      <p>The required variant — for comparison — would add the inverse collection and drop the nullable FK:</p>

      <div class="code-wrapper">
        <div class="code-header">
          <div class="code-badge-group">
            <span class="code-lang-tag">C#</span>
            <span class="code-filename">Required one-to-many variant (illustrative)</span>
            <span class="code-type-pill pill-illustrative">Illustrative</span>
          </div>
          <button class="btn-copy" type="button" aria-label="Copy code">📋 Copy</button>
        </div>
        <pre><code class="language-c#">
// Model side (illustrative variant — not Raff's current code)
public class Category
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public ICollection&lt;Book&gt; Books { get; } = new List&lt;Book&gt;();  // inverse collection
}

public class Book
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public int CategoryId { get; set; }                  // non-nullable FK → REQUIRED
    public Category Category { get; set; } = null!;      // non-nullable navigation
}

// Fluent configuration for the required version
modelBuilder.Entity&lt;Book&gt;()
    .HasOne(b =&gt; b.Category)
    .WithMany(c =&gt; c.Books)          // now pointing at the inverse collection
    .HasForeignKey(b =&gt; b.CategoryId)
    .IsRequired();                   // books.CategoryId becomes NOT NULL
</code></pre>
        <div class="code-expl">Same relationship type, stricter rules: every book must reference a category, enforced by PostgreSQL, and <code>Category.Books</code> lets you traverse the relationship from the principal side.</div>
      </div>

      <h3>Data annotations: usable, but less expressive</h3>
      <p>For simple cases you can influence relationships with attributes. Data annotations are convenient and discoverable; the Fluent API is more powerful and keeps configuration in one place. Most EF Core teams use annotations for validation (<code>[Required]</code>, <code>[MaxLength]</code>) and the Fluent API for relationships.</p>

      <div class="code-wrapper">
        <div class="code-header">
          <div class="code-badge-group">
            <span class="code-lang-tag">C#</span>
            <span class="code-filename">Annotation-based configuration (illustrative)</span>
            <span class="code-type-pill pill-illustrative">Illustrative</span>
          </div>
          <button class="btn-copy" type="button" aria-label="Copy code">📋 Copy</button>
        </div>
        <pre><code class="language-c#">
public class Book
{
    public int Id { get; set; }

    [ForeignKey(nameof(Category))]      // tells EF "this FK pairs with the Category nav"
    public int CategoryId { get; set; }

    public Category? Category { get; set; }
}

public class Author
{
    public int Id { get; set; }

    // [InverseProperty] disambiguates when a single entity pair has
    // more than one relationship (e.g. two Author references on Book).
    [InverseProperty(nameof(BookReview.Author))]
    public ICollection&lt;BookReview&gt; Reviews { get; } = new List&lt;BookReview&gt;();
}
</code></pre>
        <div class="code-expl">Annotations cannot express everything the Fluent API can (composite FKs, alternate keys, delete behavior, join-entity configuration), so this module configures relationships with the Fluent API and reserves annotations for validation.</div>
      </div>

      <h2>B. One-to-one</h2>
      <p>A one-to-one relationship says: one <code>User</code> has exactly zero-or-one <code>UserProfile</code>. Relationally, this is <strong>still implemented with a foreign key</strong> — a one-to-one is just a one-to-many that the database is forced to keep unique.</p>

      <h3>Choosing the dependent side</h3>
      <p>Unlike one-to-many (where the "many" side must hold the FK), either side of a one-to-one can be the dependent. Choose based on meaning:</p>
      <ul>
        <li>Put the FK where NULLs are acceptable or where rows are optional — e.g. <code>UserProfile.UserId</code>. Then a user can exist without a profile.</li>
        <li>A profile, by contrast, makes no sense without its user — so making <code>UserProfile</code> the dependent also expresses that nicely.</li>
      </ul>

      <div class="code-wrapper">
        <div class="code-header">
          <div class="code-badge-group">
            <span class="code-lang-tag">C#</span>
            <span class="code-filename">One-to-one model (illustrative — not part of Raff today)</span>
            <span class="code-type-pill pill-illustrative">Illustrative</span>
          </div>
          <button class="btn-copy" type="button" aria-label="Copy code">📋 Copy</button>
        </div>
        <pre><code class="language-c#">
public class User
{
    public int Id { get; set; }
    public string Username { get; set; } = null!;

    // Reference navigation, "zero or one" from the user's perspective.
    public UserProfile? Profile { get; set; }
}

public class UserProfile
{
    public int Id { get; set; }
    public string Bio { get; set; } = null!;

    public int UserId { get; set; }              // FK lives on the dependent…
    public User User { get; set; } = null!;      // …with its inverse reference navigation
}

// Configuration: name the dependent and its FK explicitly.
modelBuilder.Entity&lt;UserProfile&gt;()
    .HasOne(p =&gt; p.User)                     // UserProfile has one User
    .WithOne(u =&gt; u.Profile)                 // User has one Profile
    .HasForeignKey&lt;UserProfile&gt;(p =&gt; p.UserId) // the FK is UserProfile.UserId
    .IsRequired();                           // required 1:1; use IsRequired(false) for optional
</code></pre>
        <div class="code-expl">EF Core will create a <strong>unique index</strong> on <code>UserProfile.UserId</code>. That uniqueness constraint is what turns "many users could point at me" into a true one-to-one, enforced by the database.</div>
      </div>

      <div class="callout callout-warning">
        <div class="callout-title">⚠️ Why the unique constraint matters</div>
        <p>Without uniqueness on the FK column, the schema would happily allow two <code>UserProfile</code> rows pointing at the same user — silently degrading your one-to-one into a one-to-many. A one-to-one relationship is therefore <strong>two facts</strong>: a foreign-key constraint <em>and</em> a uniqueness guarantee on the dependent side. If you ever write the relationship manually in SQL, you must add both.</p>
        <p>Why configure one-to-one explicitly more often than one-to-many? EF's conventions can usually guess which side is dependent when both navigations exist, but they may pick <em>your</em> side differently than you intended, especially when the FK property has a non-obvious name. Naming the dependent and the FK removes all doubt.</p>
      </div>

      <h2>C. Many-to-many</h2>
      <p>A book can have multiple authors; an author can write multiple books. Neither table can hold the FK — a single column cannot store a list. Relational databases solve this with a <strong>join table</strong> (also called a junction, link, or bridge table) holding one FK per side:</p>

      <div class="diagram-container">
        <div class="diagram-title">Books ← book_authors → Authors — the relational shape of Raff's many-to-many</div>
        <svg viewBox="0 0 860 300" role="img" aria-label="Many-to-many diagram: books and authors tables are connected through the book_authors join table which contains a foreign key to each side and a composite primary key.">
          <!-- books -->
          <rect class="erd-rect" x="20" y="40" width="230" height="114" rx="8"></rect>
          <path class="erd-head" d="M20 48 a8 8 0 0 1 8-8 h214 a8 8 0 0 1 8 8 v28 h-230 z"></path>
          <text class="erd-name" x="34" y="67">books</text>
          <text class="erd-prop" x="34" y="111">Id</text>
          <text class="erd-pk" x="236" y="111" text-anchor="end">PK</text>
          <text class="erd-prop" x="34" y="137">Title</text>
          <text class="erd-nav" x="236" y="137" text-anchor="end">NAV: Authors</text>

          <!-- book_authors -->
          <rect class="erd-rect" x="315" y="30" width="230" height="140" rx="8" style="stroke: var(--accent);"></rect>
          <path class="erd-head" d="M315 38 a8 8 0 0 1 8-8 h214 a8 8 0 0 1 8 8 v28 h-230 z"></path>
          <text class="erd-name" x="329" y="57">book_authors (join table)</text>
          <text class="erd-prop" x="329" y="101">book_id</text>
          <text class="erd-fk" x="531" y="101" text-anchor="end">FK + PK</text>
          <text class="erd-prop" x="329" y="127">author_id</text>
          <text class="erd-fk" x="531" y="127" text-anchor="end">FK + PK</text>
          <text class="erd-label" x="430" y="152" text-anchor="middle">composite primary key (book_id, author_id)</text>

          <!-- authors -->
          <rect class="erd-rect" x="610" y="40" width="230" height="114" rx="8"></rect>
          <path class="erd-head" d="M610 48 a8 8 0 0 1 8-8 h214 a8 8 0 0 1 8 8 v28 h-230 z"></path>
          <text class="erd-name" x="624" y="67">authors</text>
          <text class="erd-prop" x="624" y="111">Id</text>
          <text class="erd-pk" x="826" y="111" text-anchor="end">PK</text>
          <text class="erd-prop" x="624" y="137">Name</text>
          <text class="erd-nav" x="826" y="137" text-anchor="end">NAV: Books</text>

          <!-- connectors -->
          <line class="erd-line" x1="250" y1="100" x2="315" y2="100"></line>
          <text class="erd-card" x="268" y="92">1</text>
          <text class="erd-card" x="296" y="92" text-anchor="end">N</text>
          <line class="erd-line" x1="545" y1="100" x2="610" y2="100"></line>
          <text class="erd-card" x="562" y="92">N</text>
          <text class="erd-card" x="598" y="92" text-anchor="end">1</text>
          <text class="erd-label" x="430" y="216" text-anchor="middle">Each join row is one (book, author) pair. The composite PK prevents duplicate pairs; the two FKs make both sides required.</text>
          <text class="erd-note" x="430" y="248" text-anchor="middle">C# side: Book.Authors and Author.Books are SKIP navigations — they let you traverse the pair without exposing the join entity.</text>
        </svg>
      </div>

      <h3>Skip navigations: the object-oriented shortcut</h3>
      <p>Your two entity classes declare collections that jump <em>across</em> the join table:</p>

      <div class="code-wrapper">
        <div class="code-header">
          <div class="code-badge-group">
            <span class="code-lang-tag">C#</span>
            <span class="code-filename">Data/Models/Book.cs and Author.cs (Raff, abridged)</span>
            <span class="code-type-pill pill-fragment">Fragment</span>
          </div>
          <button class="btn-copy" type="button" aria-label="Copy code">📋 Copy</button>
        </div>
        <pre><code class="language-c#">
public partial class Book
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;

    // SKIP navigation: Book.Authors exposes Authors directly,
    // skipping over the book_authors join entity.
    public virtual ICollection&lt;Author&gt; Authors { get; set; }
        = new List&lt;Author&gt;();
}

public partial class Author
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string? AvatarUrl { get; set; }

    // The inverse skip navigation.
    public virtual ICollection&lt;Book&gt; Books { get; set; }
        = new List&lt;Book&gt;();
}
</code></pre>
        <div class="code-expl">These are called <strong>skip navigations</strong> because your code navigates from Book to Author (and back) while EF Core transparently manages the <code>book_authors</code> rows in between.</div>
      </div>

      <div class="callout callout-warning">
        <div class="callout-title">⚠️ "Join table" and "skip navigation" are different kinds of things</div>
        <p>A <strong>join table</strong> is a relational database concept: a physical table with two FK columns that materializes an N:M relationship. A <strong>skip navigation</strong> is an EF Core model concept: a C# collection that lets you skip over the join entity in code. A join table always exists relationally; skip navigations are one way (not the only way) to model it in EF Core. Do not mix the vocabularies up in conversation or code review.</p>
      </div>

      <h3>Implicit join entity — what Raff actually uses</h3>
      <p>EF Core 5+ can manage the join table for you. When the join table has no payload columns beyond the two FKs, the join entity can stay <strong>implicit</strong>: there is no <code>BookAuthor</code> class in your solution, and no <code>DbSet&lt;BookAuthor&gt;</code> to query. This is exactly Raff's situation. <code>BooksContext.OnModelCreating</code> contains the scaffolded configuration:</p>

      <div class="code-wrapper">
        <div class="code-header">
          <div class="code-badge-group">
            <span class="code-lang-tag">C#</span>
            <span class="code-filename">Data/BooksContext.cs (Raff, abridged — OnDelete calls elided)</span>
            <span class="code-type-pill pill-fragment">Fragment</span>
          </div>
          <button class="btn-copy" type="button" aria-label="Copy code">📋 Copy</button>
        </div>
        <pre><code class="language-c#">
modelBuilder.Entity&lt;Book&gt;(entity =&gt;
{
    entity.HasKey(e =&gt; e.Id).HasName("books_pkey");
    entity.ToTable("books");

    // ...

    entity.HasMany(d =&gt; d.Authors)          // Book has many Authors
        .WithMany(p =&gt; p.Books)             // Author has many Books
        .UsingEntity&lt;Dictionary&lt;string, object&gt;&gt;(
            "BookAuthor",                    // the join entity type (shared-type, no CLR class)
            r =&gt; r.HasOne&lt;Author&gt;().WithMany()
                .HasForeignKey("AuthorId")
                .HasConstraintName("book_authors_author_id_fkey"),
            l =&gt; l.HasOne&lt;Book&gt;().WithMany()
                .HasForeignKey("BookId")
                .HasConstraintName("book_authors_book_id_fkey"),
            j =&gt;
            {
                j.HasKey("BookId", "AuthorId").HasName("book_authors_pkey");
                j.ToTable("book_authors");
                j.IndexerProperty&lt;int&gt;("BookId").HasColumnName("book_id");
                j.IndexerProperty&lt;int&gt;("AuthorId").HasColumnName("author_id");
            });
});
</code></pre>
        <div class="code-expl">This verbose form is what <code>dotnet ef dbcontext scaffold</code> generates when it reverse-engineers an existing database. The join entity is a "shared-type entity type" stored as a dictionary in the model — you never write <code>List&lt;Dictionary&lt;string, object&gt;&gt;</code> in business code; <code>UsingEntity</code> does the bookkeeping.</div>
      </div>

      <h3>Explicit join entity — when the association itself carries data</h3>
      <p>The moment the <em>relationship itself</em> has attributes — author ordering, contribution role, date the author was linked — the join table needs payload columns, and a dictionary is no longer a good fit. Define a real class. This is illustrative: Raff's <code>book_authors</code> currently has only the two FK columns.</p>

      <div class="code-wrapper">
        <div class="code-header">
          <div class="code-badge-group">
            <span class="code-lang-tag">C#</span>
            <span class="code-filename">Explicit join entity with payload (illustrative)</span>
            <span class="code-type-pill pill-illustrative">Illustrative</span>
          </div>
          <button class="btn-copy" type="button" aria-label="Copy code">📋 Copy</button>
        </div>
        <pre><code class="language-c#">
public class BookAuthor             // the association itself, with its own data
{
    public int BookId { get; set; }
    public Book Book { get; set; } = null!;

    public int AuthorId { get; set; }
    public Author Author { get; set; } = null!;

    public int AuthorOrder { get; set; }              // 1 = first-listed author
    public string? ContributionRole { get; set; }     // "translator", "editor", …
    public DateTime DateAdded { get; set; }
}

// Configuration — the join entity is now a first-class CLR type.
modelBuilder.Entity&lt;Book&gt;()
    .HasMany(b =&gt; b.Authors)
    .WithMany(a =&gt; a.Books)
    .UsingEntity&lt;BookAuthor&gt;(
        j =&gt; j.HasOne(ba =&gt; ba.Author).WithMany().HasForeignKey(ba =&gt; ba.AuthorId),
        j =&gt; j.HasOne(ba =&gt; ba.Book).WithMany().HasForeignKey(ba =&gt; ba.BookId),
        j =&gt;
        {
            j.HasKey(ba =&gt; new { ba.BookId, ba.AuthorId });   // composite PK
            j.ToTable("book_authors");
        });
</code></pre>
        <div class="code-expl">Key point: even with an explicit join class, <code>Book.Authors</code> remains a skip navigation, and EF Core still inserts/removes join rows for you when you add or remove from the collections. The class simply makes the join entity usable in LINQ (e.g., ordering authors by <code>AuthorOrder</code>).</div>
      </div>

      <p>There is a second, heavier option: drop skip navigations entirely and model the join row as a normal entity with its own <code>DbSet</code> (<code>context.BookAuthors</code>), navigating <code>Book → BookAuthor → Author</code> explicitly. That gives maximum control (you can query the association history directly, refactor it like any table) at the cost of verbosity at every call site. For Raff, skip navigations are the right default; choose the explicit-CLR-class variant only when the association grows data of its own, and the <code>DbSet</code> variant only when the association is a first-class business concept.</p>

      <div class="callout callout-info">
        <div class="callout-title">💡 Do you always need a hand-written join class?</div>
        <p>No. The implicit join entity (or the <code>UsingEntity&lt;BookAuthor&gt;</code> overload with a payload-free class) is the normal choice. Reach for a payload-bearing join entity when you find yourself wanting to store an attribute <em>about the pairing</em>, or when you must query "which join rows exist and when were they created" directly. "Many-to-many" does not imply "write your own join class".</p>
      </div>

      <h2>The Fluent API relationship vocabulary</h2>
      <table class="table-scroll concept-table">
        <thead>
          <tr><th>Method</th><th>Question it answers</th><th>Used for</th></tr>
        </thead>
        <tbody>
          <tr><td><code>HasOne(nav)</code></td><td>"Starting from this entity, what is the single related entity?"</td><td>Reference side of 1:N and 1:1; start of configuration.</td></tr>
          <tr><td><code>HasMany(nav)</code></td><td>"Starting from this entity, what is the related collection?"</td><td>Collection side; start of configuration for M:N.</td></tr>
          <tr><td><code>WithOne(nav)</code></td><td>"The other side has a single entity — and here is its navigation (or nothing)."</td><td>1:1 configuration.</td></tr>
          <tr><td><code>WithMany(nav)</code></td><td>"The other side has a collection — and here is its navigation (or nothing)."</td><td>1:N configuration; M:N with <code>UsingEntity</code>.</td></tr>
          <tr><td><code>HasForeignKey(...)</code></td><td>"Which property (or shadow property) stores the FK?"</td><td>Every relationship that has an FK column (1:1 and 1:N).</td></tr>
          <tr><td><code>HasPrincipalKey(...)</code></td><td>"The principal side is referenced by an alternate key, not the PK."</td><td>Rare; e.g. FK to a unique non-PK column.</td></tr>
          <tr><td><code>IsRequired(bool)</code></td><td>"Must the dependent reference a principal?"</td><td>Explicitly marking required/optional when conventions are ambiguous.</td></tr>
          <tr><td><code>UsingEntity&lt;T&gt;(...)</code></td><td>"Use this entity type (or dictionary) as the M:N join entity."</td><td>Many-to-many with implicit, dictionary, or explicit join entity.</td></tr>
          <tr><td><code>OnDelete(DeleteBehavior...)</code></td><td>"What happens to dependents when the principal is deleted?"</td><td>Cascade / restrict / set null / client-side behavior. (Delete behavior is a separate topic — out of scope for this module.)</td></tr>
        </tbody>
      </table>

      <h2>Relationship Exercises</h2>
      <p>These exercises ask you to make the same decisions you make in real code review: which entity gets the FK, who is principal, required or optional, which relationship type fits, and what the join table looks like. Feedback appears after you submit; you can retry any question.</p>
      <div class="kc-mount" data-kc-group="lesson-2"></div>

      <h2>Lesson 2 Summary</h2>
      <ul>
        <li><strong>One-to-many</strong>: FK goes on the "many" side; EF discovers it from a reference navigation even when no FK property and no inverse collection exist (Raff's case).</li>
        <li><strong>One-to-one</strong>: FK goes on the dependent side and requires a <strong>unique constraint</strong>; configure explicitly to control which side is dependent.</li>
        <li><strong>Many-to-many</strong>: a join table holds two FKs with a composite PK. Skip navigations expose the pair directly; the join entity can be implicit (Raff), an explicit class with payload, or a full entity with its own <code>DbSet</code>.</li>
        <li>The Fluent API reads like a sentence: <code>HasOne → WithMany → HasForeignKey</code>; <code>UsingEntity</code> wires join entities.</li>
        <li>Evaluating relationship configuration means asking: which side is dependent, is the FK nullable, is uniqueness enforced, and does the join carry data?</li>
      </ul>

      <div class="refs-block">
        <div class="refs-title">Official references for this lesson</div>
        <ul>
          <li><a href="https://learn.microsoft.com/en-us/ef/core/modeling/relationships/" target="_blank" rel="noopener noreferrer">EF Core — Introduction to relationships</a></li>
          <li><a href="https://learn.microsoft.com/en-us/ef/core/modeling/relationships/one-to-many" target="_blank" rel="noopener noreferrer">EF Core — One-to-many relationships</a></li>
          <li><a href="https://learn.microsoft.com/en-us/ef/core/modeling/relationships/one-to-one" target="_blank" rel="noopener noreferrer">EF Core — One-to-one relationships</a></li>
          <li><a href="https://learn.microsoft.com/en-us/ef/core/modeling/relationships/many-to-many" target="_blank" rel="noopener noreferrer">EF Core — Many-to-many relationships</a></li>
        </ul>
      </div>

      <div class="lesson-footer-nav">
        <button class="btn-secondary" data-nav-target="lesson-1" type="button">← Lesson 1</button>
        <button class="btn-complete-lesson" data-lesson="lesson-2" type="button">Mark Lesson 2 Complete ✓</button>
        <button class="btn-primary" data-nav-target="lesson-3" type="button">Next: Navigations &amp; Fix-Up →</button>
      </div>
    `
  },
  {
    id: "lesson-3",
    badge: "03",
    nav: "Navigations & Fix-Up",
    content: `
      <div class="lesson-header-box">
        <div class="lesson-badge-top">Lesson 3</div>
        <h1 class="lesson-title">Navigation Properties and Relationship Fix-Up</h1>
        <p class="lesson-subtitle">How EF Core keeps foreign keys and navigation properties synchronized — and why that changes what your navigations contain.</p>
      </div>

      <h2>1. What navigations are for</h2>
      <p>A foreign key is a number; a navigation is an object. In business code you almost always want the object:</p>

      <div class="code-wrapper">
        <div class="code-header">
          <div class="code-badge-group">
            <span class="code-lang-tag">C#</span>
            <span class="code-filename">Why navigations exist</span>
            <span class="code-type-pill pill-fragment">Fragment</span>
          </div>
          <button class="btn-copy" type="button" aria-label="Copy code">📋 Copy</button>
        </div>
        <pre><code class="language-c#">
// FK style (idiomatic SQL thinking): you must know the key and fetch again
var authorNames = authorIds.Select(id =&gt; context.Authors.Find(id)!.Name);

// Navigation style (idiomatic EF Core): you traverse the object graph
var authorNames = book.Authors.Select(a =&gt; a.Name);

// Better still for reads — let the database do it in one query (Lesson 6):
var dto = await context.Books
    .Where(b =&gt; b.Id == id)
    .Select(b =&gt; new { b.Title, AuthorNames = b.Authors.Select(a =&gt; a.Name).ToList() })
    .SingleAsync();
</code></pre>
        <div class="code-expl">Navigations are convenient, but "traverse the object graph" only works if the graph was populated. The rest of this lesson is about when and how that happens — and doesn't.</div>
      </div>

      <p>Every relationship has two ends, and either end may declare a navigation:</p>
      <ul>
        <li><strong>Reference navigation</strong>: a single related entity — <code>Book.Category</code>, <code>ReadingEntry.Book</code>, <code>ReadingEntry.User</code>.</li>
        <li><strong>Collection navigation</strong>: a set of related entities — <code>Book.ReadingEntries</code>, <code>User.ReadingEntries</code>, <code>Book.Authors</code>.</li>
        <li>Each navigation has a paired <strong>FK property</strong> (CLR or shadow). For <code>ReadingEntry.Book</code> the FK is the real property <code>ReadingEntry.BookId</code>; for <code>Book.Category</code> it's the shadow property <code>CategoryId</code>.</li>
      </ul>

      <h2>2. Keeping FK and navigation in sync</h2>
      <p>If FK and navigation could drift apart, your object graph would lie. EF Core prevents that with two-way synchronization:</p>

      <table class="concept-table">
        <thead>
          <tr><th>You change…</th><th>EF Core updates…</th><th>When</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>The <strong>navigation</strong> (<code>entry.Book = book7</code>)</td>
            <td>The <strong>FK</strong> (<code>entry.BookId = 7</code>)</td>
            <td>At the next <code>DetectChanges()</code> — which runs automatically inside <code>SaveChangesAsync()</code> and before queries execute.</td>
          </tr>
          <tr>
            <td>The <strong>FK</strong> (<code>entry.BookId = 7</code>)</td>
            <td>The <strong>navigation</strong> — set to the tracked <code>Book</code> #7 if present, otherwise <code>null</code></td>
            <td>At the next <code>DetectChanges()</code>.</td>
          </tr>
          <tr>
            <td>Membership of a <strong>collection</strong> (<code>book.Authors.Add(author)</code>, <code>.Remove(...)</code>)</td>
            <td>FK values of the affected dependents (and the join rows for skip navigations)</td>
            <td>At the next <code>DetectChanges()</code>; <code>SaveChangesAsync()</code> then writes INSERT/DELETE statements.</td>
          </tr>
        </tbody>
      </table>

      <div class="callout callout-info">
        <div class="callout-title">💡 Why "at DetectChanges" and not "immediately"?</div>
        <p><code>Book</code> and <code>ReadingEntry</code> are plain classes — assigning <code>entry.Book = book7</code> runs ordinary C# and EF Core is not notified. The change tracker discovers the change the next time it compares current values against its snapshot (Module 2). Change-tracking proxies (Lesson 4C) and <code>INotifyPropertyChanged</code> entities can make this immediate, but the default model is snapshot-based. Practically: as long as you call <code>SaveChangesAsync()</code> before relying on synchronized values, you're fine.</p>
      </div>

      <h2>3. Relationship fix-up defined</h2>
      <p>Fix-up is EF Core's automatic wiring of navigation properties among <strong>tracked</strong> entities:</p>
      <div class="callout callout-success">
        <div class="callout-title">✅ Definition</div>
        <p><strong>Relationship fix-up</strong> is the process by which EF Core sets navigation properties on entities it tracks so that the in-memory object graph matches the FK values, both when entities are materialized from a query and when entities are attached, added, or modified. It is transitive: adding one entity to the change tracker can populate navigations on <em>other</em>, previously tracked entities.</p>
      </div>

      <p>Two consequences you should internalize:</p>
      <ol>
        <li><strong>A navigation can become populated by a completely different query than the one that loaded the entity.</strong> Load a <code>Book</code> now; load categories later; if the category with matching shadow FK arrives in the second query, EF Core sets <code>book.Category</code> — even though your book query never mentioned categories.</li>
        <li><strong>A collection navigation is only as complete as the data in memory.</strong> <code>book.ReadingEntries</code> reflects the entries EF Core has seen (loaded via Include, or fixed up from other queries) — not necessarily all entries that exist in the database.</li>
      </ol>

      <h2>4. Three separate questions about every navigation</h2>
      <table class="concept-table">
        <thead>
          <tr><th>Question</th><th>Determined by</th><th>How to check</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Does the navigation exist in the model?</strong></td>
            <td>Your entity classes + configuration. Compile-time fact.</td>
            <td>It's there in the source; <code>dotnet ef dbcontext info</code> or the model debug view.</td>
          </tr>
          <tr>
            <td><strong>Does it hold a value right now?</strong></td>
            <td>Change tracking state: what this context has loaded or attached, and fix-up.</td>
            <td><code>book.Category</code> is null or not; <code>book.Authors.Count</code>; inspect with a debugger.</td>
          </tr>
          <tr>
            <td><strong>Was the related data loaded from the database?</strong></td>
            <td>The loading strategy you chose (Include, explicit load, lazy loading, or nothing).</td>
            <td><code>context.Entry(book).Collection(b =&gt; b.Authors).IsLoaded</code> / <code>.Reference(b =&gt; b.Category).IsLoaded</code>; check which SQL ran in the logs.</td>
          </tr>
        </tbody>
      </table>

      <p>The third question is the one that bites in production: <strong>no exception, no query, no data</strong>. In Raff — where lazy loading is not configured — accessing <code>book.Authors</code> after a plain query returns an empty list (remember: the collection is initialized to <code>new List&lt;Author&gt;()</code>, never null). Your code silently computes the wrong answer instead of crashing. That failure mode is exactly why the loading lessons that follow matter so much.</p>

      <h2>5. Fix-Up Playground</h2>
      <p>Step through a small scenario with a fresh <code>BooksContext</code>. The playground shows which entities are tracked, what their FK values are, and — crucially — how navigation properties change as new entities enter the change tracker. Every step states what code is running; nothing here executes EF Core or SQL (it is a simplified educational model of documented fix-up behavior).</p>

      <div class="simulator-box" id="fixup-playground">
        <div class="simulator-header">
          <div class="simulator-title">🎮 Fix-Up Playground — watch navigations wire themselves</div>
          <div class="simulator-controls">
            <button class="btn-sim primary" id="fixup-next" type="button">▶ Apply next step</button>
            <button class="btn-sim" id="fixup-reset" type="button">↺ Reset</button>
            <span class="explorer-control-label" id="fixup-step-label">Step 0 of 8</span>
          </div>
          <div class="fixup-progress" id="fixup-progress" aria-hidden="true"></div>
        </div>
        <div class="simulator-body">
          <div class="fixup-story" id="fixup-story">Initial state: a fresh <code>BooksContext</code>. Nothing is tracked yet. Book #7, Author #3, Category #2, and the pairing (Book #7 — Author #3) all exist in the database, but EF Core has not read any of them.</div>
          <div class="fixup-state-grid">
            <div class="fixup-panel">
              <div class="fixup-panel-title">Tracked entities (change tracker)</div>
              <div id="fixup-tracked"></div>
            </div>
            <div class="fixup-panel">
              <div class="fixup-panel-title">Navigation values right now</div>
              <div id="fixup-navs"></div>
            </div>
          </div>
          <div class="sim-verdict" id="fixup-verdict">Press "Apply next step" to run the first query.</div>
          <p class="assumption-list" style="margin-top:1rem;">Simulation assumptions: entities behave as EF Core documents them — fix-up runs among <em>tracked</em> entities when they are materialized or attached; FK→navigation and navigation→FK synchronization happens during <code>DetectChanges()</code>, which the playground applies explicitly after each mutating step; the database contains the rows described above and nothing else. Real <code>DetectChanges</code> timing, identity resolution, and no-tracking behavior involve more cases than this playground models — notably, queries issued with <code>AsNoTracking()</code> do not participate in fix-up beyond their own result set.</p>
        </div>
      </div>

      <h2>6. Fix-up with no-tracking queries</h2>
      <p>Fix-up depends on the change tracker, so it has a boundary:</p>
      <ul>
        <li>With a <strong>tracking</strong> query, the entity and everything included stays in the context. Later queries can fix up its navigations.</li>
        <li>With an <strong><code>AsNoTracking()</code></strong> query, entities are not tracked. Navigations are populated only from that query's own result set (including data brought in by <code>Include</code>) — later queries against the same context cannot connect to these instances, because the context doesn't know they exist.</li>
      </ul>
      <p>Raff already relies on this: <code>BookService.GetBooksAsync</code> uses <code>AsNoTracking()</code> with <code>Include(b =&gt; b.Authors)</code>, maps to DTOs immediately, and discards the entities. Nothing later in that request depends on fix-up — a correct design for a read-only list endpoint.</p>

      <div class="callout callout-warning">
        <div class="callout-title">⚠️ Surprise data in navigations</div>
        <p>Because fix-up is transitive, a navigation's contents can differ depending on what the same <code>DbContext</code> instance has already loaded. Two identical queries against the same context can produce different in-memory graphs: run <code>Books.Where(b =&gt; b.Id == 42)</code> twice, and the second result may carry a <code>Category</code> the first one lacked — if something else loaded category 3 in between. This is correct behavior (the graph is being kept accurate), but it means "<em>what's in my navigation?</em>" is answered by tracking state, not by the SQL of the query that produced the entity. Be explicit about loading (Lesson 4) instead of relying on ambient state.</p>
      </div>

      <h2>Knowledge Checks</h2>
      <div class="kc-mount" data-kc-group="lesson-3"></div>

      <h2>Lesson 3 Summary</h2>
      <ul>
        <li>Navigations give object-graph access; the FK remains the relational truth. EF Core keeps them synchronized.</li>
        <li>Navigation→FK and FK→navigation sync happens at <code>DetectChanges()</code> — automatic inside <code>SaveChangesAsync()</code> and before queries.</li>
        <li><strong>Fix-up</strong> automatically wires navigations among tracked entities, potentially populating a navigation using a different query than the one that loaded the entity.</li>
        <li>Always distinguish: navigation exists in the model / holds a value in memory / was loaded from the database. Only the third means your data is complete.</li>
        <li><code>AsNoTracking()</code> entities do not participate in cross-query fix-up.</li>
      </ul>

      <div class="refs-block">
        <div class="refs-title">Official references for this lesson</div>
        <ul>
          <li><a href="https://learn.microsoft.com/en-us/ef/core/modeling/relationships/navigations" target="_blank" rel="noopener noreferrer">EF Core — Relationship navigations</a></li>
          <li><a href="https://learn.microsoft.com/en-us/ef/core/change-tracking/relationship-changes" target="_blank" rel="noopener noreferrer">EF Core — Changing foreign keys and navigations</a></li>
        </ul>
      </div>

      <div class="lesson-footer-nav">
        <button class="btn-secondary" data-nav-target="lesson-2" type="button">← Lesson 2</button>
        <button class="btn-complete-lesson" data-lesson="lesson-3" type="button">Mark Lesson 3 Complete ✓</button>
        <button class="btn-primary" data-nav-target="lesson-4" type="button">Next: Loading Related Data →</button>
      </div>
    `
  },
  {
    id: "lesson-4",
    badge: "04",
    nav: "Loading Related Data",
    content: `
      <div class="lesson-header-box">
        <div class="lesson-badge-top">Lesson 4</div>
        <h1 class="lesson-title">Loading Related Data</h1>
        <p class="lesson-subtitle">Eager, explicit, and lazy loading — three deliberate strategies, each with a place, each with a failure mode.</p>
      </div>

      <p>Lesson 3 established the core rule: a navigation holds data only if something put it there. This lesson is about the "something". Before choosing a strategy, answer three questions about the endpoint you are building:</p>
      <ol>
        <li><strong>Does the response need the related data at all?</strong> (If not: don't load it. If you only need a count: see Lesson 6.)</li>
        <li><strong>Does it need it always, or only sometimes?</strong> (Always → load with the first query; sometimes → load on demand.)</li>
        <li><strong>How much of it — two fields or the whole entity graph?</strong> (A few fields → projection; full entities → include or explicit).</li>
      </ol>

      <h2>A. Eager loading — request related data with the first query</h2>
      <p>Eager loading tells EF Core to fetch related data as part of the initial query. You request it with <code>Include</code>:</p>

      <div class="code-wrapper">
        <div class="code-header">
          <div class="code-badge-group">
            <span class="code-lang-tag">C#</span>
            <span class="code-filename">Eager loading a collection (Raff-style)</span>
            <span class="code-type-pill pill-fragment">Fragment</span>
          </div>
          <button class="btn-copy" type="button" aria-label="Copy code">📋 Copy</button>
        </div>
        <pre><code class="language-c#">
var books = await context.Books
    .Include(b =&gt; b.Authors)      // load Authors together with Books
    .ToListAsync();
</code></pre>
        <div class="code-expl"><code>Include</code> is not a client-side operation — it changes the SQL that will be generated (typically a JOIN in a single query by default). All loaded <code>Book</code> entities come back with their <code>Authors</code> collections populated.</div>
      </div>

      <p>Reference navigations are included the same way:</p>

      <div class="code-wrapper">
        <div class="code-header">
          <div class="code-badge-group">
            <span class="code-lang-tag">C#</span>
            <span class="code-filename">Eager loading a reference navigation</span>
            <span class="code-type-pill pill-fragment">Fragment</span>
          </div>
          <button class="btn-copy" type="button" aria-label="Copy code">📋 Copy</button>
        </div>
        <pre><code class="language-c#">
var books = await context.Books
    .Include(b =&gt; b.Category)     // reference navigation (Category?)
    .ToListAsync();
</code></pre>
        <div class="code-expl">Because Raff's Category relationship is optional, the SQL uses a LEFT JOIN and <code>book.Category</code> is null for books with no category — matching the nullable FK.</div>
      </div>

      <h3>Nested data with <code>ThenInclude</code></h3>
      <p>To load a relationship of a relationship, chain <code>ThenInclude</code> after the included navigation. This is a real path in Raff: <code>ReadingEntry → Book → Category</code>:</p>

      <div class="code-wrapper">
        <div class="code-header">
          <div class="code-badge-group">
            <span class="code-lang-tag">C#</span>
            <span class="code-filename">Two-level eager loading (Raff-style)</span>
            <span class="code-type-pill pill-fragment">Fragment</span>
          </div>
          <button class="btn-copy" type="button" aria-label="Copy code">📋 Copy</button>
        </div>
        <pre><code class="language-c#">
var entries = await context.ReadingEntries
    .Include(e =&gt; e.Book)              // level 1: the entry's book
        .ThenInclude(b =&gt; b.Category)  // level 2: the book's category
    .ToListAsync();
</code></pre>
        <div class="code-expl"><code>ThenInclude</code> always applies to the <em>last</em> navigation included. Note the pattern matches the types: after <code>Include(e =&gt; e.Book)</code> a <code>ThenInclude</code> is offered on <code>Book</code>.</div>
      </div>

      <p>Multiple sibling collections are loaded by repeating <code>Include</code> — and that's where performance danger lives (Lesson 7):</p>

      <div class="code-wrapper">
        <div class="code-header">
          <div class="code-badge-group">
            <span class="code-lang-tag">C#</span>
            <span class="code-filename">Two sibling collections (Raff-style)</span>
            <span class="code-type-pill pill-fragment">Fragment</span>
          </div>
          <button class="btn-copy" type="button" aria-label="Copy code">📋 Copy</button>
        </div>
        <pre><code class="language-c#">
var books = await context.Books
    .Include(b =&gt; b.Authors)         // collection 1
    .Include(b =&gt; b.ReadingEntries)  // collection 2 — sibling, not nested
    .ToListAsync();
</code></pre>
        <div class="code-expl">Two <em>sibling</em> collections on the same entity produce a join fan-out in a single query: rows multiply (authors × entries per book). Lesson 7 quantifies it and shows <code>AsSplitQuery()</code>.</div>
      </div>

      <h3>Filtered includes</h3>
      <p><code>Include</code> accepts a <code>Where</code> to load only some related rows:</p>

      <div class="code-wrapper">
        <div class="code-header">
          <div class="code-badge-group">
            <span class="code-lang-tag">C#</span>
            <span class="code-filename">Filtered Include (Raff-style)</span>
            <span class="code-type-pill pill-fragment">Fragment</span>
          </div>
          <button class="btn-copy" type="button" aria-label="Copy code">📋 Copy</button>
        </div>
        <pre><code class="language-c#">
var books = await context.Books
    .Include(b =&gt; b.ReadingEntries
        .Where(e =&gt; e.Status == ReadingStatus.FINISHED))
    .ToListAsync();
</code></pre>
        <div class="code-expl">Only FINISHED entries are loaded into the <code>ReadingEntries</code> navigation. (EF Core only allows <code>Where</code> on the last navigation in the include chain, and the filter applies to the loaded data — not to the parent rows.)</div>
      </div>

      <div class="callout callout-warning">
        <div class="callout-title">⚠️ A filtered navigation is not a filtered truth</div>
        <p>Two caveats matter in practice:</p>
        <ul>
          <li><strong>The filter applies to what this query loads — it is not a permanent constraint on the navigation.</strong> Because of tracking and fix-up (Lesson 3), if the same context later loads other entries for these books (another query, another Include), those entities get fixed up into the same navigation and will appear alongside the filtered ones. The navigation then contains "entries loaded by any means", not "entries matching the filter".</li>
          <li><strong>Do not read a filtered navigation as the complete truth about the database.</strong> <code>book.ReadingEntries.Count</code> after a filtered include counts <em>loaded</em> entries, not entries in the table. If the business meaning is "count of finished entries", make the database compute it (Lesson 6) instead of counting a partially loaded collection.</li>
        </ul>
        <p>Filtered includes are genuinely useful — for display scenarios where you show, e.g., the three most recent related rows. They are dangerous when relied upon for business logic.</p>
      </div>

      <h2>B. Explicit loading — fetch related data after the fact</h2>
      <p>Explicit loading retrieves related data <em>after</em> the parent entity has already been materialized. The API lives on <code>DbContext.Entry(...)</code>:</p>

      <div class="code-wrapper">
        <div class="code-header">
          <div class="code-badge-group">
            <span class="code-lang-tag">C#</span>
            <span class="code-filename">Explicit loading (Raff-style)</span>
            <span class="code-type-pill pill-fragment">Fragment</span>
          </div>
          <button class="btn-copy" type="button" aria-label="Copy code">📋 Copy</button>
        </div>
        <pre><code class="language-c#">
var book = await context.Books
    .SingleAsync(b =&gt; b.Id == id);            // Query 1: just the book

await context.Entry(book)                      // the tracked entry
    .Collection(b =&gt; b.Authors)                // target a collection…
    .LoadAsync();                              // Query 2: that book's authors

// -- or a reference navigation --
await context.Entry(book)
    .Reference(b =&gt; b.Category)
    .LoadAsync();

// -- filtered explicit load through Query() --
var finished = await context.Entry(book)
    .Collection(b =&gt; b.ReadingEntries)
    .Query()                                   // an IQueryable over the navigation
    .Where(e =&gt; e.Status == ReadingStatus.FINISHED)
    .ToListAsync();
</code></pre>
        <div class="code-expl">Explicit loading is built around the change tracker: it operates on entities tracked by the context. <code>Entry(entity)</code> exposes <code>Collection</code> / <code>Reference</code> navigations, and <code>Query()</code> hands you an <code>IQueryable</code> so the extra query can be filtered and even projected.</div>
      </div>

      <p>When is explicit loading the right tool?</p>
      <ul>
        <li>You already have the entity (it was loaded for its own sake, or fixed up from another query) and the related data is needed only <strong>conditionally</strong> — e.g., a detail panel the user may or may not expand.</li>
        <li>You want to load <em>part</em> of a collection (with <code>Query()</code>) rather than everything.</li>
        <li>You are in code that received an entity, not a query — a service method, a domain operation — and cannot restructure the original query.</li>
      </ul>

      <div class="code-wrapper">
        <div class="code-header">
          <div class="code-badge-group">
            <span class="code-lang-tag">C#</span>
            <span class="code-filename">services (anti-pattern)</span>
            <span class="code-type-pill pill-anti-pattern">Anti-Pattern</span>
          </div>
          <button class="btn-copy" type="button" aria-label="Copy code">📋 Copy</button>
        </div>
        <pre><code class="language-c#">
// ❌ DANGEROUS: explicit loading inside a loop = hand-written N+1
var books = await context.Books.Take(50).ToListAsync();   // Query 1

foreach (var book in books)
{
    await context.Entry(book)
        .Collection(b =&gt; b.Authors)
        .LoadAsync();          // + 1 query PER BOOK (2..51)
}
</code></pre>
        <div class="code-expl">This is exactly the N+1 pattern of Lesson 5, just written by hand instead of by lazy loading. The fix is not "load more carefully inside the loop" — it is to restructure so all needed data comes back with the parent query (Include or projection), or to load in bulk with a single filtered query.</div>
      </div>

      <div class="callout callout-info">
        <div class="callout-title">💡 Checking whether a navigation is loaded</div>
        <p><code>context.Entry(book).Collection(b =&gt; b.Authors).IsLoaded</code> tells you whether EF Core considers the collection loaded for this tracked entity. It answers the third question from Lesson 3. Note that "loaded" does not guarantee "complete" for skip navigations and collections populated via fix-up — prefer explicit loading calls in code paths where the value of <code>IsLoaded</code> is obvious.</p>
      </div>

      <h2>C. Lazy loading — fetch on first access</h2>
      <p>With lazy loading, accessing a navigation triggers a database query automatically. It is <strong>not enabled by default</strong> — EF Core requires you to opt in, and proxy-based lazy loading has concrete requirements:</p>

      <div class="grid-2">
        <div class="content-panel">
          <h4 style="margin-top:0;">Requirements (proxy-based)</h4>
          <ul style="margin-bottom:0;">
            <li>The <code>Microsoft.EntityFrameworkCore.Proxies</code> package.</li>
            <li><code>optionsBuilder.UseLazyLoadingProxies()</code> in your context configuration.</li>
            <li>Entity types must be <strong>non-sealed</strong> with <strong>overridable (<code>virtual</code>) navigations</strong> — the proxy overrides them.</li>
            <li>The entity must be tracked by a context (proxies route the query through it).</li>
          </ul>
        </div>
        <div class="content-panel">
          <h4 style="margin-top:0;">Where Raff stands today</h4>
          <ul style="margin-bottom:0;">
            <li>Navigations are already <code>virtual</code> (the scaffolder emits them that way) — so the model is <em>compatible</em>.</li>
            <li>But there is <strong>no Proxies package reference</strong> and no <code>UseLazyLoadingProxies()</code> call, so lazy loading is <strong>off</strong> in Raff.</li>
            <li>Accessing <code>book.Authors</code> today returns the in-memory collection (often empty) and executes no SQL.</li>
          </ul>
        </div>
      </div>

      <div class="code-wrapper">
        <div class="code-header">
          <div class="code-badge-group">
            <span class="code-lang-tag">C#</span>
            <span class="code-filename">Enabling lazy-loading proxies (illustrative — Raff does not do this)</span>
            <span class="code-type-pill pill-illustrative">Illustrative</span>
          </div>
          <button class="btn-copy" type="button" aria-label="Copy code">📋 Copy</button>
        </div>
        <pre><code class="language-c#">
// 1) Add package: Microsoft.EntityFrameworkCore.Proxies
// 2) Opt in during context registration:
builder.Services.AddDbContext&lt;BooksContext&gt;(options =&gt;
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
           .UseLazyLoadingProxies());

// 3) Navigations must be virtual and entities non-sealed:
public class Book                    // not sealed
{
    public int Id { get; set; }
    public int? PublishedYear { get; set; }
    public virtual Category? Category { get; set; }             // virtual ✓
    public virtual ICollection&lt;Author&gt; Authors { get; set; }    // virtual ✓
        = new List&lt;Author&gt;();
}
</code></pre>
        <div class="code-expl">A non-proxy alternative exists (<code>ILazyLoader</code> injected into the entity), but it couples entities to EF Core types. Proxy-based lazy loading is the mainstream option.</div>
      </div>

      <h3>Why lazy loading is a loaded gun in an API</h3>
      <ul>
        <li><strong>Hidden database access during property access.</strong> <code>book.Authors.Count</code> looks like a memory read; it can be a network round trip. Nothing in the call site reveals the cost.</li>
        <li><strong>Unexpected query execution.</strong> Queries can fire in loops, in view/after-query code, or in places (filtering, ordering, string formatting) where you thought no I/O could happen. LINQ-to-Objects over a lazily loaded collection silently queries mid-enumeration.</li>
        <li><strong>N+1 by accident.</strong> Iterating a list of 50 books and touching an author property runs up to 50 extra queries — the subject of Lesson 5.</li>
        <li><strong>Serialization explosions.</strong> A serializer walking your object graph (or a DTO mapper copying navigation values) triggers queries for every object, and JSON serialization can also blow up on cycles (Book → Authors → Books → …) unless cycles are ignored or DTOs are used.</li>
        <li><strong>Unpredictable performance.</strong> Query counts depend on code paths, making load testing and capacity planning unreliable.</li>
      </ul>

      <div class="callout callout-info">
        <div class="callout-title">💡 Where lazy loading can be defensible</div>
        <p>Lazy loading is not "wrong everywhere". It can be reasonable in short-lived, desktop-style, or interactive scenarios where data volumes are small, the context lives long enough to benefit, and the team accepts the hidden I/O. In an ASP.NET Core request/response API like Raff, the mainstream guidance is: prefer eager loading or projection for known needs, explicit loading for conditional needs, and leave lazy loading off. If it is ever enabled, do it intentionally, with DTO responses and logging that can prove query counts.</p>
      </div>

      <h2>Comparing the strategies</h2>
      <table class="table-scroll concept-table">
        <thead>
          <tr><th>Strategy</th><th>When the query runs</th><th>Strengths</th><th>Failure mode</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Eager</strong> (<code>Include</code>)</td>
            <td>With the parent query; fixed query count (1 by default).</td>
            <td>Deterministic; the whole graph is there; good when the contract always needs it.</td>
            <td>Over-fetching; join fan-out with sibling collections (Lesson 7).</td>
          </tr>
          <tr>
            <td><strong>Explicit</strong></td>
            <td>On demand, after the parent was loaded.</td>
            <td>Fine-grained control; may load only when a condition holds; supports filtered loads via <code>Query()</code>.</td>
            <td>Easy to place inside loops → N+1; cost is invisible at a distance.</td>
          </tr>
          <tr>
            <td><strong>Lazy</strong></td>
            <td>On first navigation access, invisibly.</td>
            <td>Convenient for unpredictable access patterns; smallest initial query.</td>
            <td>Hidden I/O; N+1; serialization hazards; unpredictable performance.</td>
          </tr>
          <tr>
            <td><strong>Projection</strong> (<code>Select</code>)</td>
            <td>With the main query, as part of one SQL statement.</td>
            <td>Exact shape and columns; scalar values and aggregates for free; no entity tracking overhead.</td>
            <td>Not a fit when you need tracked entities for updates, or when the contract genuinely needs entities in multiple code paths.</td>
          </tr>
        </tbody>
      </table>

      <div class="callout callout-warning">
        <div class="callout-title">⚠️ No universally best strategy</div>
        <p>Every strategy above has a scenario where it is clearly right and a scenario where it is clearly wrong. The engineering skill is not memorizing "always use Include" or "always project" — it is stating the requirement (which data, always or conditionally, how much), then picking the cheapest strategy that satisfies it.</p>
      </div>

      <h2>Loading Strategy Decision Lab</h2>
      <p>Six realistic scenarios. Choose the strategy you would use first, then check your answers. Several scenarios have a defensible second choice — the feedback says so explicitly and explains the trade-off.</p>

      <div class="simulator-box" id="loading-lab">
        <div class="simulator-header">
          <div class="simulator-title">🧪 Loading Strategy Decision Lab</div>
          <div class="simulator-controls">
            <button class="btn-sim primary" id="lab-check" type="button">✓ Check answers</button>
            <button class="btn-sim" id="lab-reset" type="button">↺ Clear selections</button>
            <span class="explorer-control-label" id="lab-score-label">0 of 6 checked</span>
          </div>
        </div>
        <div class="simulator-body">
          <div class="table-scroll">
            <table class="lab-table" id="lab-table">
              <thead>
                <tr>
                  <th style="width:44%;">Scenario</th>
                  <th style="width:30%;">Your choice</th>
                  <th style="width:26%;">Result</th>
                </tr>
              </thead>
              <tbody id="lab-tbody">
                <!-- rows rendered by JavaScript -->
              </tbody>
            </table>
          </div>
          <div class="sim-verdict" id="lab-verdict">Pick a strategy for each scenario, then press "Check answers".</div>
        </div>
      </div>

      <h2>Knowledge Checks</h2>
      <div class="kc-mount" data-kc-group="lesson-4"></div>

      <h2>Lesson 4 Summary</h2>
      <ul>
        <li><strong>Eager loading</strong> (<code>Include</code> / <code>ThenInclude</code>) fetches related data as part of the initial query — deterministic query counts, risk of over-fetching and join fan-out.</li>
        <li><strong>Explicit loading</strong> (<code>Entry(...).Collection().LoadAsync()</code>) loads on demand for tracked entities; powerful for conditional needs, dangerous inside loops.</li>
        <li><strong>Lazy loading</strong> is opt-in (proxies + <code>virtual</code> navigations), hidden by design, and a common cause of N+1 and serialization surprises; Raff intentionally does not enable it.</li>
        <li><strong>Filtered includes</strong> limit what a query loads — they do not make a navigation a permanently filtered view of the database.</li>
        <li>State the requirement first, then pick the strategy; projection is often the correct answer for read-only API contracts.</li>
      </ul>

      <div class="refs-block">
        <div class="refs-title">Official references for this lesson</div>
        <ul>
          <li><a href="https://learn.microsoft.com/en-us/ef/core/querying/related-data/" target="_blank" rel="noopener noreferrer">EF Core — Loading related data</a></li>
          <li><a href="https://learn.microsoft.com/en-us/ef/core/querying/related-data/eager" target="_blank" rel="noopener noreferrer">EF Core — Eager loading of related data</a></li>
          <li><a href="https://learn.microsoft.com/en-us/ef/core/querying/related-data/explicit" target="_blank" rel="noopener noreferrer">EF Core — Explicit loading of related data</a></li>
          <li><a href="https://learn.microsoft.com/en-us/ef/core/querying/related-data/lazy" target="_blank" rel="noopener noreferrer">EF Core — Lazy loading of related data</a></li>
        </ul>
      </div>

      <div class="lesson-footer-nav">
        <button class="btn-secondary" data-nav-target="lesson-3" type="button">← Lesson 3</button>
        <button class="btn-complete-lesson" data-lesson="lesson-4" type="button">Mark Lesson 4 Complete ✓</button>
        <button class="btn-primary" data-nav-target="lesson-5" type="button">Next: The N+1 Problem →</button>
      </div>
    `
  },
  {
    id: "lesson-5",
    badge: "05",
    nav: "The N+1 Query Problem",
    content: `
      <div class="lesson-header-box">
        <div class="lesson-badge-top">Lesson 5</div>
        <h1 class="lesson-title">The N+1 Query Problem</h1>
        <p class="lesson-subtitle">One innocent-looking loop, N hidden round trips, and how senior engineers detect and eliminate it.</p>
      </div>

      <h2>1. What N+1 means</h2>
      <p>The N+1 problem occurs when an application runs <strong>one query to fetch a collection of parents, and then an additional query for each parent</strong> to fetch related data — 1 + N queries in total for N parents. It is the single most common ORM performance defect, and it usually hides behind code that looks like ordinary C#.</p>

      <div class="code-wrapper">
        <div class="code-header">
          <div class="code-badge-group">
            <span class="code-lang-tag">C#</span>
            <span class="code-filename">The classic N+1 shape (lazy loading enabled)</span>
            <span class="code-type-pill pill-anti-pattern">Anti-Pattern</span>
          </div>
          <button class="btn-copy" type="button" aria-label="Copy code">📋 Copy</button>
        </div>
        <pre><code class="language-c#">
// This code assumes lazy-loading proxies are enabled.
var books = await context.Books.ToListAsync();   // Query 1: SELECT … FROM books

foreach (var book in books)
{
    // For each book whose Authors have not already been loaded,
    // accessing the navigation may trigger one more query.
    Console.WriteLine(book.Authors.Count);
}
</code></pre>
        <div class="code-expl">The loop is pure C# — no visible database call, no <code>await</code> on a query. That is exactly why N+1 escapes code review: the cost lives inside a property accessor installed by a proxy.</div>
      </div>

      <p>What the database may see (in the simplified worst case):</p>

      <div class="code-wrapper">
        <div class="code-header">
          <div class="code-badge-group">
            <span class="code-lang-tag">SQL</span>
            <span class="code-filename">Conceptual query pattern — N+1</span>
            <span class="code-type-pill pill-pseudocode">Conceptual</span>
          </div>
          <button class="btn-copy" type="button" aria-label="Copy code">📋 Copy</button>
        </div>
        <pre><code class="language-sql">
-- Query 1
SELECT b."Id", b."Title", … FROM "books" AS b;

-- Query 2 (for book 1)
SELECT a."Id", a."Name", … FROM "book_authors" AS ba
JOIN "authors" AS a ON a."Id" = ba."author_id"
WHERE ba."book_id" = 1;

-- Query 3 (for book 2)
SELECT … WHERE ba."book_id" = 2;

-- … up to Query N+1
</code></pre>
        <div class="code-expl">The repeated SELECTs differ only by the FK parameter. That "identical SQL with a different parameter" pattern is the signature to search for in logs.</div>
      </div>

      <div class="callout callout-warning">
        <div class="callout-title">⚠️ The exact query count is not universal</div>
        <p>Do not memorize "N books = exactly N+1 queries". The real count depends on:</p>
        <ul>
          <li><strong>Configuration:</strong> without lazy loading, no extra queries fire at all (you get silently incomplete data instead). With eager loading, the collection may already be loaded and the accessor does nothing.</li>
          <li><strong>Tracking and fix-up:</strong> books whose authors were already loaded by any earlier query in the same context need no new query — fix-up may have populated the navigation.</li>
          <li><strong>Data and identity:</strong> repeated authors or shared parents can cause multiple navigation accesses to hit the same cached entity.</li>
        </ul>
        <p>What <em>is</em> universal: the <em>pattern</em> — one query per iteration per unloaded collection — and the direction of the cost, which grows linearly with the number of rows returned by the first query.</p>
      </div>

      <h2>2. Fix #1 — eager load when you need the related entities</h2>
      <div class="code-wrapper">
        <div class="code-header">
          <div class="code-badge-group">
            <span class="code-lang-tag">C#</span>
            <span class="code-filename">Eager alternative</span>
            <span class="code-type-pill pill-fragment">Fragment</span>
          </div>
          <button class="btn-copy" type="button" aria-label="Copy code">📋 Copy</button>
        </div>
        <pre><code class="language-c#">
var books = await context.Books
    .Include(b =&gt; b.Authors)          // one query (by default) brings everything
    .ToListAsync();

foreach (var book in books)
{
    Console.WriteLine(book.Authors.Count);   // in-memory the whole way — no extra SQL
}
</code></pre>
        <div class="code-expl">The loop is now guaranteed to touch memory only. The trade-off: every book carries all of its author rows, whether you use them or not, and sibling collections can multiply result rows (Lesson 7).</div>
      </div>

      <h2>3. Fix #2 — project when you only need a scalar</h2>
      <p>If the requirement is a count, loading author entities to count them is wasted work. Let the database compute it:</p>

      <div class="code-wrapper">
        <div class="code-header">
          <div class="code-badge-group">
            <span class="code-lang-tag">C#</span>
            <span class="code-filename">Projection with a count (complete example)</span>
            <span class="code-type-pill pill-complete">Complete Example</span>
          </div>
          <button class="btn-copy" type="button" aria-label="Copy code">📋 Copy</button>
        </div>
        <pre><code class="language-c#">
public record BookAuthorCountDto(int Id, string Title, int AuthorCount);

public async Task&lt;List&lt;BookAuthorCountDto&gt;&gt; GetBookAuthorCountsAsync()
{
    return await context.Books
        .Select(b =&gt; new BookAuthorCountDto(
            b.Id,
            b.Title,
            b.Authors.Count))            // COUNT happens in PostgreSQL
        .ToListAsync();
}
</code></pre>
        <div class="code-expl">One query, N DTO rows, zero author entities in memory. The database computes <code>COUNT</code> per book (the provider typically translates this to a correlated subquery or a GROUP BY join). Neither the entity graph nor the tracking layer ever sees the authors.</div>
      </div>

      <h2>4. Recognizing the problem in the wild</h2>
      <p>Three detection techniques, from cheapest to most rigorous:</p>
      <div class="steps-container">
        <div class="step-item">
          <div class="step-num">1</div>
          <div class="step-text"><strong>Read the SQL log.</strong> Configure <code>LogTo</code> (Module 2) in development. N+1 looks like dozens of near-identical statements in the log for one HTTP request. With <code>EnableSensitiveDataLogging()</code> (development only!) you can see the differing parameter values.</div>
        </div>
        <div class="step-item">
          <div class="step-num">2</div>
          <div class="step-text"><strong>Count commands per request.</strong> Structured logging or a diagnostic listener can count executed commands. A GET endpoint over a 50-row list should not require 51 commands.</div>
        </div>
        <div class="step-item">
          <div class="step-num">3</div>
          <div class="step-text"><strong>Read the code for loops over materialized entities.</strong> <code>foreach (var x in entities)</code> followed by navigation access, <code>Entry(...).LoadAsync()</code>, or any method that queries per item is the structural signature — even before you measure it.</div>
        </div>
      </div>

      <div class="code-wrapper">
        <div class="code-header">
          <div class="code-badge-group">
            <span class="code-lang-tag">C#</span>
            <span class="code-filename">Data/DependencyInjection.cs — development logging (Raff-compatible)</span>
            <span class="code-type-pill pill-fragment">Fragment</span>
          </div>
          <button class="btn-copy" type="button" aria-label="Copy code">📋 Copy</button>
        </div>
        <pre><code class="language-c#">
services.AddDbContext&lt;BooksContext&gt;(options =&gt;
    options.UseNpgsql(configuration.GetConnectionString("DefaultConnection"))
           .LogTo(Console.WriteLine, LogLevel.Information)   // dev only
           .EnableSensitiveDataLogging());                    // dev only — logs parameters
</code></pre>
        <div class="code-expl">Sensitive data logging writes parameter values into logs. It must never be enabled in production — it can leak user data into log files.</div>
      </div>

      <h2>5. N+1 Simulator</h2>
      <p>Compare three approaches over the same data set: <strong>lazy access</strong>, <strong>eager include</strong>, and <strong>projection with a database-side count</strong>. This is a conceptual simulation of documented behavior with stated assumptions — it performs no EF Core or PostgreSQL execution.</p>

      <div class="simulator-box" id="n1-simulator">
        <div class="simulator-header">
          <div class="simulator-title">🧪 N+1 Simulator — query timeline and cost comparison</div>
          <div class="simulator-controls">
            <div class="explorer-control-group">
              <span class="explorer-control-label" id="n1-count-label">Books</span>
              <div class="chip-group" id="n1-count-btns" role="group" aria-labelledby="n1-count-label">
                <button class="chip-btn" data-count="5" type="button">5</button>
                <button class="chip-btn" data-count="10" type="button">10</button>
                <button class="chip-btn" data-count="20" type="button">20</button>
                <button class="chip-btn" data-count="50" type="button">50</button>
              </div>
            </div>
            <div class="explorer-control-group">
              <span class="explorer-control-label" id="n1-approach-label">Approach</span>
              <div class="chip-group" id="n1-approach-btns" role="group" aria-labelledby="n1-approach-label">
                <button class="chip-btn" data-approach="lazy" type="button">Lazy access</button>
                <button class="chip-btn" data-approach="eager" type="button">Eager Include</button>
                <button class="chip-btn" data-approach="projection" type="button">Projection count</button>
              </div>
            </div>
            <button class="btn-sim primary" id="n1-run" type="button">▶ Run simulation</button>
          </div>
        </div>
        <div class="simulator-body">
          <div class="n1-timeline" id="n1-timeline">
            <em style="color:var(--text-muted); font-size:0.85rem;">Press "Run simulation" to see the conceptual timeline of database commands the approach would issue.</em>
          </div>
          <div class="metric-grid" id="n1-metrics">
            <div class="metric-card"><div class="metric-value" id="n1-m-commands">—</div><div class="metric-label">DB commands</div><div class="metric-sub">conceptual round trips</div></div>
            <div class="metric-card"><div class="metric-value" id="n1-m-rows">—</div><div class="metric-label">Rows returned</div><div class="metric-sub">total across commands</div></div>
            <div class="metric-card"><div class="metric-value" id="n1-m-entities">—</div><div class="metric-label">Entity materialization</div><div class="metric-sub">what EF Core builds</div></div>
            <div class="metric-card"><div class="metric-value" id="n1-m-work">—</div><div class="metric-label">DB work per query</div><div class="metric-sub">simplified</div></div>
          </div>
          <div class="sim-verdict" id="n1-verdict">Choose a book count and an approach, then run the simulation.</div>
          <div class="content-panel" style="margin-top:1rem;">
            <div class="explorer-panel-title" style="color:var(--text-muted);">Simulation assumptions (read these)</div>
            <ul class="assumption-list">
              <li>Fresh <code>BooksContext</code>, no relevant data already loaded, tracking enabled, and lazy-loading proxies enabled for the "Lazy access" approach.</li>
              <li>Every book has exactly <strong>3 authors</strong>, and author rows are distinct — the counts scale linearly with the book count by construction.</li>
              <li>"Lazy": 1 query for books + up to 1 query per book for its authors (best case shown; real counts can be lower when fix-up or prior loads already populated navigations, and are identical in form but not guaranteed in number).</li>
              <li>"Eager": 1 query (single-query include) whose result set contains one row per (book, author) pair — book columns repeat per row. EF Core de-duplicates entities in memory, but the wire payload and row count are the join size.</li>
              <li>"Projection": 1 query returning one row per book; the count is computed by the database. Rows shown are result-set rows, not internal intermediate rows.</li>
              <li>The simulator is an educational model, not a benchmark. Real cost also includes query planning, indexes, latency, and payload column widths, and a single round trip is not automatically the fastest option in every environment.</li>
            </ul>
          </div>
        </div>
      </div>

      <h2>Knowledge Checks</h2>
      <div class="kc-mount" data-kc-group="lesson-5"></div>

      <h2>Lesson 5 Summary</h2>
      <ul>
        <li>N+1 = one query for the parents plus one query per parent for related data; it scales with the number of rows the first query returns.</li>
        <li>The exact count depends on configuration (lazy loading, tracking, fix-up, prior loads) — the pattern, not the number, is what you detect.</li>
        <li><strong>Fix by restructuring the query:</strong> <code>Include</code> when the related entities are needed, projection when a scalar (like a count) is needed.</li>
        <li>Detect it in logs as repeated near-identical SQL; detect it in code as navigation access or explicit loads inside loops.</li>
        <li>Explicit loading is not a fix for N+1 — it is one of its causes when used per item.</li>
      </ul>

      <div class="refs-block">
        <div class="refs-title">Official references for this lesson</div>
        <ul>
          <li><a href="https://learn.microsoft.com/en-us/ef/core/performance/efficient-querying" target="_blank" rel="noopener noreferrer">EF Core — Efficient querying</a></li>
          <li><a href="https://learn.microsoft.com/en-us/ef/core/querying/related-data/" target="_blank" rel="noopener noreferrer">EF Core — Loading related data</a></li>
          <li><a href="https://learn.microsoft.com/en-us/ef/core/logging-events-diagnostics/" target="_blank" rel="noopener noreferrer">EF Core — Logging, events, and diagnostics</a></li>
        </ul>
      </div>

      <div class="lesson-footer-nav">
        <button class="btn-secondary" data-nav-target="lesson-4" type="button">← Lesson 4</button>
        <button class="btn-complete-lesson" data-lesson="lesson-5" type="button">Mark Lesson 5 Complete ✓</button>
        <button class="btn-primary" data-nav-target="lesson-6" type="button">Next: DTO Projections →</button>
      </div>
    `
  },
  {
    id: "lesson-6",
    badge: "06",
    nav: "DTO Projections",
    content: `
      <div class="lesson-header-box">
        <div class="lesson-badge-top">Lesson 6</div>
        <h1 class="lesson-title">DTO Projections and Performance</h1>
        <p class="lesson-subtitle">Why entities are the wrong shape for API responses — and how Select() gives you exactly the data you need, computed where it is cheapest.</p>
      </div>

      <h2>1. The problem with returning entities</h2>
      <p>Lessons 4 and 5 kept hammering one theme: the cost of a query is proportional to what you ask for. Entities ask for everything. A <code>Book</code> entity drags along:</p>
      <ul>
        <li><strong>The whole row</strong> — every column, including ones the endpoint does not need (Raff's <code>Summary</code> and <code>CoverUrl</code> are not cheap text fields you want in a list response by accident).</li>
        <li><strong>Tracking overhead</strong> — the change tracker allocates a <code>DbContext</code>-scoped entry per entity, does identity resolution, and keeps snapshots for update detection. For a read-only GET, that is pure cost.</li>
        <li><strong>The relationship problem</strong> — navigations are either unloaded (incomplete data, Lesson 3) or included (over-fetching, Lesson 4) or serialized into cycles (<code>Book → Authors → Books → …</code>).</li>
        <li><strong>Coupling</strong> — the day you rename a database column, or introduce a property that must never be exposed (like <code>User.PasswordHash</code>!), the API contract changes with your schema. <code>PasswordHash</code> in an entity returned from a controller is a security incident waiting for a PR.</li>
      </ul>

      <div class="callout callout-warning">
        <div class="callout-title">⚠️ Raff's own schemas show the fix</div>
        <p>Raff already keeps request/response shapes separate from persistence models — look at the DTO classes in <code>Dtos/</code> used by the services and controllers. This lesson explains <em>why</em> that separation exists and how to make the database do more of the work that produced those shapes.</p>
      </div>

      <h2>2. What a projection is</h2>
      <p>A projection is a LINQ <code>Select</code> that translates to a SQL <code>SELECT</code> of exactly the requested columns and expressions. EF Core materializes the projected type directly — no intermediate entity.</p>

      <div class="code-wrapper">
        <div class="code-header">
          <div class="code-badge-group">
            <span class="code-lang-tag">C#</span>
            <span class="code-filename">Anonymous projection — the quickest win</span>
            <span class="code-type-pill pill-fragment">Fragment</span>
          </div>
          <button class="btn-copy" type="button" aria-label="Copy code">📋 Copy</button>
        </div>
        <pre><code class="language-c#">
var result = await context.Books
    .Select(b =&gt; new
    {
        b.Id,
        b.Title,
        b.PublishedYear,
        CategoryName = b.Category != null ? b.Category.Name : null,
        AuthorCount = b.Authors.Count
    })
    .ToListAsync();
</code></pre>
        <div class="code-expl">One query. The database computes the conditional category name and the author count. The response carries four scalars per book — no <code>Book</code>, <code>Category</code>, or <code>Author</code> entities anywhere.</div>
      </div>

      <div class="code-wrapper">
        <div class="code-header">
          <div class="code-badge-group">
            <span class="code-lang-tag">C#</span>
            <span class="code-filename">Named records instead of anonymous types (API-friendly)</span>
            <span class="code-type-pill pill-complete">Complete Example</span>
          </div>
          <button class="btn-copy" type="button" aria-label="Copy code">📋 Copy</button>
        </div>
        <pre><code class="language-c#">
public record BookListItemDto(
    int Id,
    string Title,
    int? PublishedYear,
    string? CategoryName,
    int AuthorCount);

// in a service:
public async Task&lt;List&lt;BookListItemDto&gt;&gt; GetListAsync(CancellationToken ct)
{
    return await context.Books
        .OrderBy(b =&gt; b.Title)
        .Select(b =&gt; new BookListItemDto(
            b.Id,
            b.Title,
            b.PublishedYear,
            b.Category != null ? b.Category.Name : null,
            b.Authors.Count))
        .ToListAsync(ct);
}
</code></pre>
        <div class="code-expl">A record DTO keeps the contract explicit and testable. Note how the projection is built with constructor syntax — legal because EF Core translates the constructor call into SQL columns.</div>
      </div>

      <h2>3. Projecting relationships into flat shapes</h2>
      <p>The expensive part of relationship responses is often the collection. A projection can flatten it so the JSON is a simple list of names — and the database still does it in one query:</p>

      <div class="code-wrapper">
        <div class="code-header">
          <div class="code-badge-group">
            <span class="code-lang-tag">C#</span>
            <span class="code-filename">Flattening a collection into a list of strings</span>
            <span class="code-type-pill pill-complete">Complete Example</span>
          </div>
          <button class="btn-copy" type="button" aria-label="Copy code">📋 Copy</button>
        </div>
        <pre><code class="language-c#">
public record BookCardDto(
    int Id,
    string Title,
    List&lt;string&gt; AuthorNames,
    string? CategoryName,
    int ReadingEntryCount);

public async Task&lt;List&lt;BookCardDto&gt;&gt; GetCardsAsync(CancellationToken ct)
{
    return await context.Books
        .OrderBy(b =&gt; b.Id)
        .Select(b =&gt; new BookCardDto(
            b.Id,
            b.Title,
            b.Authors.Select(a =&gt; a.Name).ToList(),   // flattened in one query
            b.Category != null ? b.Category.Name : null,
            b.ReadingEntries.Count))
        .ToListAsync(ct);
}
</code></pre>
        <div class="code-expl">EF Core supports projecting a collection navigation to a list inside a single query (a join or correlated query under the hood). The consumer gets <code>["Ursula K. Le Guin", "…"]</code> instead of full author objects with ids, avatars, and their own navigations.</div>
      </div>

      <div class="callout callout-warning">
        <div class="callout-title">⚠️ The multiple-collections limitation</div>
        <p>EF Core cannot compose a projection that flattens <strong>two sibling collections</strong> of the same entity into one query (the error mentions a constructor containing multiple collections / multiple collection navigations). A DTO like <code>(Book, List&lt;string&gt; AuthorNames, List&lt;string&gt; EntryNotes)</code> is not expressible in a single LINQ statement. Workarounds:</p>
        <ul>
          <li>Split into two queries and assemble server-side (one for authors, one for entries, keyed by book id).</li>
          <li><code>AsSplitQuery()</code> only helps when both collections appear as <code>Include</code>s, not inside a single projection constructor.</li>
          <li>Redesign the contract: counts instead of lists (like <code>ReadingEntryCount</code> above), or a dedicated sub-endpoint for the heavy collection.</li>
        </ul>
      </div>

      <h2>4. Projection vs tracking: what you give up</h2>
      <table class="table-scroll concept-table">
        <thead>
          <tr><th>Concern</th><th>Entity query</th><th>Projection</th></tr>
        </thead>
        <tbody>
          <tr><td>Columns fetched</td><td>All entity columns</td><td>Only the selected expressions</td></tr>
          <tr><td>Change tracking</td><td>Every entity tracked and identity-resolved</td><td>Projected results are not tracked — no tracker overhead</td></tr>
          <tr><td>Update capability</td><td>Entities can be modified and saved</td><td>Results are read-only by design (great for APIs, useless for updates)</td></tr>
          <tr><td>Relationship completeness</td><td>Depends on Include/fix-up/lazy settings</td><td>Exactly what the query projects — nothing hidden</td></tr>
          <tr><td>SQL shape</td><td>Rows shaped like tables, joined as directed</td><td>Rows shaped like the DTO; aggregates computed in the database</td></tr>
        </tbody>
      </table>

      <p>If you genuinely need tracked entities for a read-only page (for example, a complex workflow method that will later modify some of them), the polite version is <code>AsNoTracking()</code> — entities, but without snapshot overhead:</p>

      <div class="code-wrapper">
        <div class="code-header">
          <div class="code-badge-group">
            <span class="code-lang-tag">C#</span>
            <span class="code-filename">No-tracking entity query</span>
            <span class="code-type-pill pill-fragment">Fragment</span>
          </div>
          <button class="btn-copy" type="button" aria-label="Copy code">📋 Copy</button>
        </div>
        <pre><code class="language-c#">
var books = await context.Books
    .AsNoTracking()
    .Include(b =&gt; b.Authors)
    .ToListAsync();
</code></pre>
        <div class="code-expl">Raff's <code>BookService.GetBooksAsync</code> already does this: <code>AsNoTracking</code> + <code>Include(b =&gt; b.Authors)</code> + <code>Skip/Take</code>. Remember from Lesson 3: no-tracking means no fix-up and no identity resolution — each book's author instances are separate objects, which is fine for read-only mapping.</div>
      </div>

      <h2>5. Choosing what the database computes</h2>
      <p>A useful heuristic for list endpoints: <strong>counts belong to the database, lists belong to the response, entities belong to write paths.</strong></p>
      <ul>
        <li><em>"How many authors does this book have?"</em> → <code>b.Authors.Count</code> inside the projection (SQL aggregate).</li>
        <li><em>"What are the author names?"</em> → <code>b.Authors.Select(a =&gt; a.Name).ToList()</code> inside the projection (one query, join under the hood).</li>
        <li><em>"Give me the book and I will update it."</em> → load the tracked entity; projections cannot be saved back.</li>
      </ul>

      <h2>Knowledge Checks</h2>
      <div class="kc-mount" data-kc-group="lesson-6"></div>

      <h2>Lesson 6 Summary</h2>
      <ul>
        <li>Entities are persistence shapes; API responses are contract shapes. Projections bridge them with a SQL <code>SELECT</code> limited to the contract.</li>
        <li>Projections skip the change tracker, ignore-fetch nothing, and can flatten collections or compute counts inside the database.</li>
        <li>Use records/named DTOs for contract stability — and never return entities carrying secrets like <code>PasswordHash</code>.</li>
        <li>EF Core cannot flatten two sibling collections of one entity in a single projection; split the query or redesign the contract.</li>
        <li>For read-only entity needs, <code>AsNoTracking()</code> (as Raff does) is the lighter alternative.</li>
      </ul>

      <div class="refs-block">
        <div class="refs-title">Official references for this lesson</div>
        <ul>
          <li><a href="https://learn.microsoft.com/en-us/ef/core/performance/efficient-querying" target="_blank" rel="noopener noreferrer">EF Core — Efficient querying (projecting to DTOs, no-tracking)</a></li>
          <li><a href="https://learn.microsoft.com/en-us/ef/core/querying/data-transfer-objects" target="_blank" rel="noopener noreferrer">EF Core — Data Transfer Objects and projections</a></li>
        </ul>
      </div>

      <div class="lesson-footer-nav">
        <button class="btn-secondary" data-nav-target="lesson-5" type="button">← Lesson 5</button>
        <button class="btn-complete-lesson" data-lesson="lesson-6" type="button">Mark Lesson 6 Complete ✓</button>
        <button class="btn-primary" data-nav-target="lesson-7" type="button">Next: Cartesian Explosion →</button>
      </div>
    `
  },
  {
    id: "lesson-7",
    badge: "07",
    nav: "Single vs. Split Queries",
    content: `
      <div class="lesson-header-box">
        <div class="lesson-badge-top">Lesson 7</div>
        <h1 class="lesson-title">Cartesian Explosion, Split Queries, and Tuning</h1>
        <p class="lesson-subtitle">When one query with two Includes becomes a row bomb — and the practical toolkit for keeping query counts and row counts under control.</p>
      </div>

      <h2>1. The fan-out: what a JOIN does to rows</h2>
      <p>Each <code>Include</code> of a collection adds a JOIN that multiplies rows. Include <strong>two sibling collections</strong> on the same entity and the multiplication compounds: one row per (parent × child-A × child-B) combination.</p>

      <div class="code-wrapper">
        <div class="code-header">
          <div class="code-badge-group">
            <span class="code-lang-tag">C#</span>
            <span class="code-filename">The dangerous query (Raff-style)</span>
            <span class="code-type-pill pill-anti-pattern">Anti-Pattern</span>
          </div>
          <button class="btn-copy" type="button" aria-label="Copy code">📋 Copy</button>
        </div>
        <pre><code class="language-c#">
var books = await context.Books
    .Include(b =&gt; b.Authors)          // join #1: 3 author rows per book
    .Include(b =&gt; b.ReadingEntries)   // join #2: 2 entry rows per book
    .ToListAsync();
</code></pre>
        <div class="code-expl">With 50 books, 3 authors each, and 2 reading entries each, the single-query result set is <strong>50 × 3 × 2 = 300 rows</strong>. Every book's columns are repeated in each of those rows; EF Core de-duplicates entities in memory, but the database did the cross-product work and the network carried it.</div>
      </div>

      <p>Watch what happens to the numbers as the collections grow — and compare the single-query row count with a split-query strategy (one query per collection):</p>

      <div class="simulator-box" id="cartesian-calc">
        <div class="simulator-header">
          <div class="simulator-title">🧮 Cartesian Explosion Calculator</div>
          <div class="simulator-controls">
            <button class="btn-sim" id="calc-reset" type="button">↺ Reset</button>
          </div>
        </div>
        <div class="simulator-body">
          <div class="calc-grid">
            <div class="calc-control">
              <label class="calc-label" for="calc-books">Books <span id="calc-books-val">50</span></label>
              <input class="calc-range" id="calc-books" type="range" min="1" max="200" value="50" step="1">
            </div>
            <div class="calc-control">
              <label class="calc-label" for="calc-authors">Authors per book <span id="calc-authors-val">3</span></label>
              <input class="calc-range" id="calc-authors" type="range" min="1" max="10" value="3" step="1">
            </div>
            <div class="calc-control">
              <label class="calc-label" for="calc-entries">Reading entries per book <span id="calc-entries-val">2</span></label>
              <input class="calc-range" id="calc-entries" type="range" min="1" max="10" value="2" step="1">
            </div>
          </div>
          <div class="metric-grid">
            <div class="metric-card"><div class="metric-value" id="calc-single-rows">—</div><div class="metric-label">Rows — single query</div><div class="metric-sub">books × authors × entries</div></div>
            <div class="metric-card"><div class="metric-value" id="calc-split-rows">—</div><div class="metric-label">Rows — split queries</div><div class="metric-sub">books + authors + entries</div></div>
            <div class="metric-card"><div class="metric-value" id="calc-ratio">—</div><div class="metric-label">Fan-out ratio</div><div class="metric-sub">single ÷ split rows</div></div>
          </div>
          <div class="sim-verdict" id="calc-verdict">Adjust the sliders to see how the row counts diverge.</div>
        </div>
      </div>

      <h2>2. <code>AsSplitQuery()</code> — one query per collection</h2>
      <p>Split queries execute one SQL statement per collection navigation instead of one giant JOIN. The row counts divide back into linear totals.</p>

      <div class="code-wrapper">
        <div class="code-header">
          <div class="code-badge-group">
            <span class="code-lang-tag">C#</span>
            <span class="code-filename">Split query (Raff-style)</span>
            <span class="code-type-pill pill-fragment">Fragment</span>
          </div>
          <button class="btn-copy" type="button" aria-label="Copy code">📋 Copy</button>
        </div>
        <pre><code class="language-c#">
var books = await context.Books
    .Include(b =&gt; b.Authors)
    .Include(b =&gt; b.ReadingEntries)
    .AsSplitQuery()                   // 3 statements instead of 1
    .ToListAsync();
</code></pre>
        <div class="code-expl">EF Core guarantees consistent fix-up: the queries are correlated so every book gets exactly its own authors and entries. You trade one round trip for several — usually a win when collections are large, a loss when small.</div>
      </div>

      <div class="code-wrapper">
        <div class="code-header">
          <div class="code-badge-group">
            <span class="code-lang-tag">C#</span>
            <span class="code-filename">Global configuration — opt every query in by default</span>
            <span class="code-type-pill pill-fragment">Fragment</span>
          </div>
          <button class="btn-copy" type="button" aria-label="Copy code">📋 Copy</button>
        </div>
        <pre><code class="language-c#">
options.UseNpgsql(connectionString, npgsql =&gt;
    npgsql.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery));
</code></pre>
        <div class="code-expl">Teams that prefer split-by-default configure it globally and opt back into single queries with <code>.AsSingleQuery()</code> where joins are cheaper. There is no universally correct default — measure the actual shapes.</div>
      </div>

      <div class="callout callout-warning">
        <div class="callout-title">⚠️ The caveats of split queries</div>
        <ul>
          <li><strong>Data consistency:</strong> by default the multiple SQL statements are <em>not</em> wrapped in a transaction, so concurrent writes between the statements can produce a graph that never existed at a single instant. EF Core documents wrapping split queries in a serializable transaction if strict consistency is required (at a cost).</li>
          <li><strong>More round trips:</strong> on high-latency connections, several small queries can be slower than one wide one.</li>
          <li><strong>Not a cure for pagination:</strong> without <code>Take</code>/<code>Skip</code> on the primary query, split or not, you still load all parents. Paginate first (Lesson 5 in Module 2), include second.</li>
        </ul>
      </div>

      <h2>3. Tracking, identity resolution, and read pathways</h2>
      <div class="code-wrapper">
        <div class="code-header">
          <div class="code-badge-group">
            <span class="code-lang-tag">C#</span>
            <span class="code-filename">Three read-path levels (Raff-style)</span>
            <span class="code-type-pill pill-fragment">Fragment</span>
          </div>
          <button class="btn-copy" type="button" aria-label="Copy code">📋 Copy</button>
        </div>
        <pre><code class="language-c#">
// 1. Full tracking — needed when you will modify and save
var tracked = await context.Books.Include(b =&gt; b.Authors).ToListAsync();

// 2. No tracking — read-only, single instance per row, no identity map
var readOnly = await context.Books.AsNoTracking().Include(b =&gt; b.Authors).ToListAsync();

// 3. No tracking with identity resolution — dedupe shared references, no snapshots
var resolved = await context.Books
    .AsNoTrackingWithIdentityResolution()
    .Include(b =&gt; b.Authors)
    .ToListAsync();
</code></pre>
        <div class="code-expl">Level 1 pays the most (snapshot + change detection). Level 2 is cheapest but can materialize the same author twice if it appears in two books' collections — fine for mapping to DTOs, wrong if code compares instance identity. Level 3 pays a middle cost to guarantee one instance per entity while skipping snapshots.</div>
      </div>

      <h2>4. The tuning checklist</h2>
      <p>Performance work on queries is a loop: measure, change one thing, measure again. The ordered checklist for Raff-style APIs:</p>
      <div class="steps-container">
        <div class="step-item">
          <div class="step-num">1</div>
          <div class="step-text"><strong>Shape first.</strong> Project what the contract needs (Lesson 6). Most "slow endpoint" tickets die here: fewer columns, no tracking, no fan-out.</div>
        </div>
        <div class="step-item">
          <div class="step-num">2</div>
          <div class="step-text"><strong>Fix N+1 by restructuring</strong> (Lesson 5) — never by micro-optimizing the loop.</div>
        </div>
        <div class="step-item">
          <div class="step-num">3</div>
          <div class="step-text"><strong>Control row multiplication</strong>: split queries or redesign, and confirm the FK indexes you already rely on (Raff's migrations create the foreign-key and <code>unique_user_book</code> indexes for you).</div>
        </div>
        <div class="step-item">
          <div class="step-num">4</div>
          <div class="step-text"><strong>Lighten reads:</strong> <code>AsNoTracking</code> (already done in Raff's BookService), filtered includes only with eyes open (Lesson 4).</div>
        </div>
        <div class="step-item">
          <div class="step-num">5</div>
          <div class="step-text"><strong>Escalate to advanced tools only with evidence:</strong> compiled queries (<code>EF.CompileAsyncQuery</code>) and raw SQL for hot paths that remain proven bottlenecks after the above. Do not begin here.</div>
        </div>
      </div>

      <div class="callout callout-info">
        <div class="callout-title">💡 Where the real bottleneck usually lives</div>
        <p>Query shape is the first thing to check, but not the only possible cause of a slow endpoint. If the checklist above shows a clean, single, projected query and the endpoint is still slow, look at: missing indexes on the actual predicate columns, network latency to the database, serialization cost, and the database's own query plan (PostgreSQL <code>EXPLAIN ANALYZE</code>). EF Core's job ends at translating the LINQ; what PostgreSQL does with it is a second, separate investigation.</p>
      </div>

      <h2>Knowledge Checks</h2>
      <div class="kc-mount" data-kc-group="lesson-7"></div>

      <h2>Lesson 7 Summary</h2>
      <ul>
        <li>Two sibling collection includes multiply rows (parents × children-A × children-B); EF Core de-duplicates in memory but pays the fetch.</li>
        <li><code>AsSplitQuery()</code> loads each collection with its own statement: fewer rows, more round trips, and a documented consistency caveat without an explicit transaction.</li>
        <li>Choose tracking deliberately: full tracking for writes, <code>AsNoTracking</code> for read-only mapping, <code>AsNoTrackingWithIdentityResolution</code> when identity matters in memory.</li>
        <li>Tune in order: shape → N+1 → row multiplication → read-path weight → advanced tools only with evidence.</li>
        <li>Indexes and query plans are PostgreSQL's domain — EF Core translation is only half the story.</li>
      </ul>

      <div class="refs-block">
        <div class="refs-title">Official references for this lesson</div>
        <ul>
          <li><a href="https://learn.microsoft.com/en-us/ef/core/querying/single-split-queries" target="_blank" rel="noopener noreferrer">EF Core — Single vs. split queries</a></li>
          <li><a href="https://learn.microsoft.com/en-us/ef/core/performance/efficient-querying" target="_blank" rel="noopener noreferrer">EF Core — Efficient querying (no-tracking, identity resolution)</a></li>
        </ul>
      </div>

      <div class="lesson-footer-nav">
        <button class="btn-secondary" data-nav-target="lesson-6" type="button">← Lesson 6</button>
        <button class="btn-complete-lesson" data-lesson="lesson-7" type="button">Mark Lesson 7 Complete ✓</button>
        <button class="btn-primary" data-nav-target="lesson-challenge" type="button">Next: Challenge →</button>
      </div>
    `
  },
  {
    id: "lesson-challenge",
    badge: "08",
    nav: "Raff Project Challenge",
    content: `
      <div class="lesson-header-box">
        <div class="lesson-badge-top">Hands-On Challenge</div>
        <h1 class="lesson-title">Design the Query Behind an Endpoint</h1>
        <p class="lesson-subtitle">A read-only list endpoint must return the exact shape below with a fixed number of database commands. Design it.</p>
      </div>

      <div class="callout callout-info">
        <div class="callout-title">🎯 The requirement</div>
        <p>The endpoint must return a page of books, ordered by <code>Title</code>, with: each book's id, title, its authors' names as a list of strings, its category name as a string (or null), and the number of its reading entries. No entity should be serialized; the response only ever contains the DTO.</p>
      </div>

      <div class="code-wrapper">
        <div class="code-header">
          <div class="code-badge-group">
            <span class="code-lang-tag">C#</span>
            <span class="code-filename">Required response shape (given)</span>
            <span class="code-type-pill pill-complete">Given</span>
          </div>
          <button class="btn-copy" type="button" aria-label="Copy code">📋 Copy</button>
        </div>
        <pre><code class="language-c#">
public record BookCardDto(
    int Id,
    string Title,
    List&lt;string&gt; AuthorNames,
    string? CategoryName,
    int ReadingEntryCount);
</code></pre>
      </div>

      <h3>Guided checklist</h3>
      <ul>
        <li>Which loading strategy applies to a read-only contract — entities or projection? Why?</li>
        <li>Where do the author names come from, and does flattening them add queries? (Lesson 6 says no — show it.)</li>
        <li>How do the nullable category and the reading-entry count get into the DTO without loading entities?</li>
        <li>Ordering: where should <code>OrderBy</code> sit relative to <code>Select</code>? Does it change the SQL?</li>
        <li>What does the query plan for query count look like (how many commands)?</li>
      </ul>

      <details class="hint-details">
        <summary>💡 Hint 1 — Start from the target shape</summary>
        <p>Write the <code>Select</code> first, then order. Reversing those rarely breaks anything, but shaping first makes the query count obvious: the projection is one LINQ statement, so it is one SQL statement.</p>
      </details>
      <details class="hint-details">
        <summary>💡 Hint 2 — Flattening authors</summary>
        <p><code>b.Authors.Select(a =&gt; a.Name).ToList()</code> inside the projection is supported; EF Core translates it into a join (or correlated query) rather than one query per book. If you instead iterate in a loop after materializing, you have re-created N+1.</p>
      </details>
      <details class="hint-details">
        <summary>💡 Hint 3 — Nullable category and count</summary>
        <p>Use a conditional: <code>b.Category != null ? b.Category.Name : null</code>. The count is <code>b.ReadingEntries.Count</code>, computed by the database. Neither requires an <code>Include</code>.</p>
      </details>

      <details class="solution-details">
        <summary>✅ Solution — one projection query, one command</summary>
        <div class="code-wrapper">
          <div class="code-header">
            <div class="code-badge-group">
              <span class="code-lang-tag">C#</span>
              <span class="code-filename">BookService — solution (Raff-style)</span>
              <span class="code-type-pill pill-complete">Solution</span>
            </div>
            <button class="btn-copy" type="button" aria-label="Copy code">📋 Copy</button>
          </div>
          <pre><code class="language-c#">
public async Task&lt;List&lt;BookCardDto&gt;&gt; GetCardsAsync(CancellationToken ct = default)
{
    return await context.Books
        .OrderBy(b =&gt; b.Title)
        .Select(b =&gt; new BookCardDto(
            b.Id,
            b.Title,
            b.Authors.Select(a =&gt; a.Name).ToList(),
            b.Category != null ? b.Category.Name : null,
            b.ReadingEntries.Count))
        .ToListAsync(ct);
}
</code></pre>
        </div>
        <p><strong>Why it satisfies the requirement:</strong> a single <code>SELECT</code> returning one row per book with exactly five DTO members; the join for author names, the category lookup, and the two counts are all computed in the database; no <code>Book</code>/<code>Author</code>/<code>Category</code> entities are materialized or tracked, so serialization cannot leak schema or cycle. Add <code>Skip/Take</code> before <code>Select</code> (with <code>OrderBy</code>) to paginate — the shape stays identical.</p>
      </details>

      <div class="callout callout-warning">
        <div class="callout-title">⚠️ Stretch goals (optional)</div>
        <ul>
          <li>Modify the solution to paginate with a <code>PagedResult&lt;BookCardDto&gt;</code> matching Raff's shared pagination helper, keeping the total count as a separate cheap <code>CountAsync</code>.</li>
          <li>Prepare a second endpoint DTO that includes the leader of each reading group — a scenario that <em>cannot</em> be expressed as one projection (two sibling collections); describe the two-query workaround.</li>
        </ul>
      </div>

      <div class="lesson-footer-nav">
        <button class="btn-secondary" data-nav-target="lesson-7" type="button">← Lesson 7</button>
        <button class="btn-primary" data-nav-target="lesson-assessment" type="button">Next: Assessment →</button>
      </div>
    `
  },
  {
    id: "lesson-assessment",
    badge: "\ud83c\udf93",
    nav: "Final Module Assessment",
    content: `
      <div class="lesson-header-box">
        <div class="lesson-badge-top">Module Assessment</div>
        <h1 class="lesson-title">Final Assessment</h1>
        <p class="lesson-subtitle">12 multiple-choice questions plus 2 applied scenarios, drawn from all seven lessons. Pass mark is configurable below.</p>
      </div>

      <div class="assessment-intro" id="assessment-intro">
        <div class="content-panel">
          <h3 style="margin-top:0;">📋 Before you begin</h3>
          <ul>
            <li>Questions cover Lessons 1–7. You can retake the assessment as many times as you like — the best score is kept.</li>
            <li>The two applied scenarios present code-shaped situations; there is one best answer each, explained afterwards.</li>
            <li>The pass threshold defaults to 80% and can be set to 70% / 80% / 90% before starting.</li>
            <li>Your answers and results are stored locally with your other progress and can be exported from the sidebar.</li>
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
      </div>

      <div class="assessment-questions" id="assessment-questions" hidden></div>

      <div class="assessment-actions" id="assessment-actions" hidden>
        <button class="btn-primary" id="btn-submit-assessment" type="button">Submit Assessment</button>
        <button class="btn-secondary" id="btn-retry-assessment" type="button" hidden>Retake Assessment ↺</button>
      </div>

      <div class="assessment-results" id="assessment-results"></div>

      <div class="lesson-footer-nav">
        <button class="btn-secondary" data-nav-target="lesson-challenge" type="button">← Challenge</button>
        <button class="btn-secondary" data-nav-target="lesson-0" type="button">Back to Overview ↑</button>
      </div>
    `
  },
];
