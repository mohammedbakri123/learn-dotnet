/* ============================================================
   Raff Backend Academy — Module 2 — EF Core Internals & Querying
   Data module: glossary, questions, and module constants.
   Loaded before the shared components and the page script.
   ============================================================ */

const STORAGE_KEY = 'raff_efcore_module_02_state';

const GLOSSARY_ITEMS_DATA = [{"term": "DbContext", "cat": "Core", "def": "The primary EF Core class representing a session with the database, combining the Unit of Work and Repository patterns to manage connections, query composition, change tracking, and persistence."}, {"term": "DbSet", "cat": "Core", "def": "Represents a collection of a specific entity type in the DbContext that can be queried, added to, or deleted from. Acts as an in-memory repository facade over a relational database table."}, {"term": "Unit of Work", "cat": "Architecture", "def": "A design pattern that maintains a list of business objects affected by a business transaction and coordinates writing out changes and resolving concurrency problems as a single atomic unit."}, {"term": "Entity State", "cat": "Change Tracking", "def": "An enum value (Detached, Unchanged, Added, Modified, Deleted) tracked by EF Core for each registered entity instance that dictates what SQL operation must be executed on SaveChangesAsync()."}, {"term": "Change Tracker", "cat": "Change Tracking", "def": "The internal EF Core subsystem responsible for monitoring entity states, recording property value changes, maintaining the identity map, and coordinating with the database provider during updates."}, {"term": "Snapshot Change Tracking", "cat": "Change Tracking", "def": "EF Core's default tracking mechanism where an original copy of an entity's property values is stored upon materialization. When DetectChanges() runs, current values are compared with original snapshots to discover modifications."}, {"term": "Added", "cat": "Entity State", "def": "The entity is tracked by the context but does not yet exist in the database. SaveChangesAsync() will generate an INSERT statement and assign generated keys."}, {"term": "Modified", "cat": "Entity State", "def": "The entity exists in the database and some or all of its property values have been changed. SaveChangesAsync() will generate an UPDATE statement targeting the modified columns."}, {"term": "Deleted", "cat": "Entity State", "def": "The entity exists in the database but is marked for removal. SaveChangesAsync() will generate a DELETE statement targeting its primary key."}, {"term": "Unchanged", "cat": "Entity State", "def": "The entity exists in the database and its current values match the snapshot stored when it was retrieved. SaveChangesAsync() generates no SQL for this entity."}, {"term": "Detached", "cat": "Entity State", "def": "The entity instance is not tracked by the DbContext. The context has no snapshot or state record for it, and SaveChangesAsync() ignores it."}, {"term": "SaveChangesAsync", "cat": "Core", "def": "The terminal asynchronous method that detects changes, opens an implicit transaction (if supported), executes generated SQL commands against the database provider, and resets entity states to Unchanged or Detached."}, {"term": "Tracking Query", "cat": "Querying", "def": "The default EF Core query mode where materialized entity instances are registered in the Change Tracker and an original value snapshot is retained in memory."}, {"term": "No-Tracking Query", "cat": "Querying", "def": "A query configured with AsNoTracking() where entity instances are materialized without being registered in the Change Tracker or retaining snapshots, optimizing performance for read-only operations."}, {"term": "Identity Resolution", "cat": "Change Tracking", "def": "The process ensuring that multiple query results representing the same database row (by primary key) reference the exact same C# object instance in memory."}, {"term": "LINQ", "cat": "Querying", "def": "Language Integrated Query; a declarative syntax in C# allowing developers to query collections, databases, and XML. EF Core translates LINQ expression trees into SQL."}, {"term": "IQueryable", "cat": "Querying", "def": "An interface representing an unexecuted query defined as an expression tree. Provides query composition capabilities evaluated by an underlying IQueryProvider (such as EF Core's Npgsql provider)."}, {"term": "IEnumerable", "cat": "Querying", "def": "An interface representing an in-memory sequence of elements. LINQ operations on IEnumerable execute immediately in C# memory (LINQ to Objects) rather than on the database server."}, {"term": "Expression Tree", "cat": "Querying", "def": "An in-memory tree data structure representing code logic as data rather than executable bytecode, allowing EF Core's query compiler to inspect, optimize, and translate C# lambdas into relational SQL."}, {"term": "Query Provider", "cat": "Architecture", "def": "The component (e.g. Npgsql.EntityFrameworkCore.PostgreSQL) implementing IQueryProvider that parses LINQ expression trees and translates them into database-specific SQL and parameter bindings."}, {"term": "Deferred Execution", "cat": "Querying", "def": "The behavior where a query expression is constructed without executing against the database until the results are enumerated by an async terminal method (e.g. ToListAsync()) or foreach loop."}, {"term": "Materialization", "cat": "Querying", "def": "The process where raw tabular database rows returned from a database driver are instantiated and populated into strongly typed C# entity or DTO objects."}, {"term": "Projection", "cat": "Querying", "def": "Using LINQ .Select() to transform query results into a specific shape (such as a DTO or anonymous type), allowing EF Core to fetch only the requested database columns."}, {"term": "Client Evaluation", "cat": "Querying", "def": "Executing C# expressions on the web server rather than translating them to SQL on the database engine. In modern EF Core, top-level filtering must translate to SQL; untranslatable expressions throw an exception unless explicitly isolated after materialization."}, {"term": "ToQueryString", "cat": "Diagnostics", "def": "An EF Core extension method on IQueryable that returns the exact generated SQL query string for inspection without executing the query against the database."}, {"term": "Npgsql", "cat": "Provider", "def": "The open-source .NET data provider for PostgreSQL. Npgsql.EntityFrameworkCore.PostgreSQL allows EF Core to communicate with PostgreSQL databases and translate LINQ to PostgreSQL SQL."}, {"term": "DbUpdateConcurrencyException", "cat": "Diagnostics", "def": "An exception thrown when SaveChangesAsync() expects to affect a specific number of rows (e.g. 1 row for an UPDATE or DELETE by ID) but 0 rows were affected, typically due to concurrent deletion or modification."}];

const QUESTIONS_DB = {"qc-1-1": {"topic": "EF Core Mental Model", "prompt": "In Raff, a developer mutates an entity property: `book.PublishedYear = 2026;`. Why does this line NOT immediately send an UPDATE query to the PostgreSQL database?", "opts": ["Because EF Core buffers all SQL queries in memory until the operating system socket buffer is flushed.", "Because mutating a C# property is an ordinary in-memory operation; EF Core only compares property snapshots and dispatches SQL when SaveChangesAsync() is called.", "Because Npgsql requires explicit transaction commits before any TCP socket packet can be transmitted.", "Because BooksContext only synchronizes with PostgreSQL when the HTTP request pipeline terminates."], "correct": 1, "exp": "Correct! EF Core is an Object-Relational Mapper that employs the Unit of Work pattern. Changing an in-memory C# object property does not trigger any network I/O. SQL is generated and transmitted to PostgreSQL only when SaveChangesAsync() is executed."}, "qc-1-2": {"topic": "EF Core Mental Model", "prompt": "What is the primary role of the database provider (such as Npgsql.EntityFrameworkCore.PostgreSQL) within the EF Core architecture?", "opts": ["It manages the in-memory ChangeTracker state and compares original property snapshots.", "It translates provider-agnostic LINQ expression trees into PostgreSQL-specific SQL dialect and handles low-level ADO.NET network communication.", "It automatically converts ASP.NET Core controller DTOs into database entities.", "It replaces the need for DbContext by offering a direct wrapper around PostgreSQL tables."], "correct": 1, "exp": "Correct! While EF Core provides the core querying pipeline and change tracker, the database provider (Npgsql) is responsible for translating LINQ expressions into provider-specific SQL (e.g. PostgreSQL syntax) and executing commands via ADO.NET."}, "qc-1-3": {"topic": "EF Core Mental Model", "prompt": "Which of the following best describes the difference between EF Core's query pathway and its modification pathway?", "opts": ["The query pathway translates LINQ expressions into SQL and materializes objects; the modification pathway relies on the change tracker snapshots to generate INSERT/UPDATE/DELETE statements.", "The query pathway uses ADO.NET, while the modification pathway bypasses SQL and writes directly to PostgreSQL shared memory.", "The query pathway requires explicit transactions, while the modification pathway runs without transactions.", "The query pathway is asynchronous, while the modification pathway is strictly synchronous."], "correct": 0, "exp": "Correct! For queries, EF Core parses LINQ into expression trees, translates them to SQL, and materializes results into C# objects. For updates, EF Core inspects the Change Tracker (comparing current values to snapshot originals) and generates DML commands when SaveChangesAsync() runs."}, "qc-1-4": {"topic": "EF Core Mental Model", "prompt": "Why is an EF Core entity in memory distinct from the corresponding database row in PostgreSQL?", "opts": ["An entity in memory can be garbage collected while the row exists, and in-memory changes have no database effect until SaveChangesAsync successfully commits.", "An entity in memory stores raw binary table blocks, whereas PostgreSQL stores JSON.", "In-memory entities only exist when a database transaction is active.", "They are actually identical; any memory pointer change immediately alters PostgreSQL storage via memory-mapped files."], "correct": 0, "exp": "Correct! An entity is simply a regular .NET object residing in the CLR heap. It is decoupled from the physical row in PostgreSQL until synchronization occurs via queries or SaveChangesAsync."}, "qc-2-1": {"topic": "DbContext Lifetime", "prompt": "Why does ASP.NET Core register `BooksContext` with a Scoped lifetime by default when using `AddDbContext<BooksContext>()`?", "opts": ["Because DbContext instances are expensive singletons that must be shared across the entire web server lifecycle.", "Because each incoming HTTP request represents a distinct Unit of Work that should have its own isolated change tracker, connection state, and cache.", "Because transient services cannot resolve database connection strings from IConfiguration.", "Because PostgreSQL drops client sockets if a connection remains open for more than one HTTP request."], "correct": 1, "exp": "Correct! In web applications, each HTTP request is a single unit of work. A scoped DbContext isolates change tracking, avoids memory bloat from long-lived tracked entities, and automatically disposes the context and its connection at the end of the request."}, "qc-2-2": {"topic": "DbContext Concurrency", "prompt": "What happens if a developer attempts to execute two parallel queries using `Task.WhenAll` on the same `BooksContext` instance (e.g. `Task.WhenAll(context.Books.ToListAsync(), context.Authors.ToListAsync())`)?", "opts": ["EF Core seamlessly queues the second query and runs both concurrently over multiplexed sockets.", "EF Core throws `InvalidOperationException: A second operation was started on this context instance before a previous operation completed`.", "PostgreSQL executes both queries in parallel and merges the result sets into a single tuple.", "The first query succeeds, but the second query silently returns empty results."], "correct": 1, "exp": "Correct! DbContext is fundamentally NOT thread-safe. EF Core detects concurrent usage on the same instance and immediately throws an InvalidOperationException to protect internal state and the underlying ADO.NET connection."}, "qc-2-3": {"topic": "DbContext Lifetime", "prompt": "In a background worker service (`BackgroundService`), why should you NOT inject a scoped `BooksContext` directly into the background service's singleton constructor?", "opts": ["Because EF Core will throw an exception during startup due to captive dependency (a singleton holding a scoped service).", "Because background services are forbidden from executing SQL queries.", "Because Npgsql requires an active HttpContext to parse connection strings.", "Because PostgreSQL will terminate the application after 60 seconds of inactivity."], "correct": 0, "exp": "Correct! Injecting a scoped DbContext into a singleton background service creates a 'captive dependency'. The context would never be disposed, its change tracker would grow indefinitely consuming unbounded memory, and concurrent execution in the worker would throw concurrency exceptions. Instead, create a scope using `IServiceScopeFactory`."}, "qc-2-4": {"topic": "DbContext Lifetime", "prompt": "What is the relationship between an active `BooksContext` instance and the underlying PostgreSQL database connection?", "opts": ["A DbContext opens a permanent TCP connection on creation and maintains it until the operating system process exits.", "A DbContext manages an underlying DbConnection (typically from an ADO.NET connection pool), opening it on demand for queries/saves and closing it when the operation or context completes.", "DbContext bypasses ADO.NET connections entirely and writes directly to named pipes.", "Each DbSet in a DbContext owns a separate physical database connection."], "correct": 1, "exp": "Correct! DbContext wraps an ADO.NET connection (managed by Npgsql's connection pool). It does not hold a connection open continuously; it opens the connection when executing queries or saving changes, and releases it back to the pool upon disposal."}, "qc-3-1": {"topic": "Entity States", "prompt": "A developer writes: `var book = new Book { Title = \"Raff Architecture\" }; context.Books.Add(book);`. What is the state of `context.Entry(book).State` immediately after this line?", "opts": ["Detached", "Unchanged", "Added", "Modified"], "correct": 2, "exp": "Correct! Calling `context.Books.Add(book)` attaches the entity to the context and sets its EntityState to `Added`. Upon `SaveChangesAsync()`, EF Core will issue an `INSERT` statement."}, "qc-3-2": {"topic": "Snapshot Change Tracking", "prompt": "How does EF Core's default snapshot change tracking determine which columns of a tracked entity must be included in an UPDATE statement?", "opts": ["It attaches runtime reflection proxies to every property getter and setter in C#.", "It records a snapshot copy of all property values when the entity is queried; on DetectChanges(), it compares current property values against the snapshot.", "It queries PostgreSQL to ask which columns have changed before saving.", "It marks every column in the table as modified whenever any property setter is invoked."], "correct": 1, "exp": "Correct! During materialization of a tracked query, EF Core takes a snapshot copy of the entity's scalar values. When `DetectChanges()` runs (explicitly or inside `SaveChangesAsync()`), EF Core diffs the current values against this snapshot. Only properties with differing values are marked as modified."}, "qc-3-3": {"topic": "Entity States", "prompt": "What happens to the `EntityState` of a tracked entity whose state was `Deleted` after `await context.SaveChangesAsync()` executes successfully?", "opts": ["It remains in the `Deleted` state in case the developer wants to undo the delete.", "It transitions to the `Detached` state because the row no longer exists in the database.", "It transitions to `Unchanged` with its primary key set to 0.", "It causes the DbContext to immediately throw an `InvalidOperationException`."], "correct": 1, "exp": "Correct! After the generated DELETE statement executes and commits successfully, EF Core detaches the entity (`EntityState.Detached`) because it no longer corresponds to a persisting row in the database."}, "qc-3-4": {"topic": "Update() Pitfalls", "prompt": "In Raff, why is calling `context.Books.Update(disconnectedBook)` dangerous if `disconnectedBook` was constructed from an incomplete JSON payload where `PublishedYear` was omitted (defaulting to 0)?", "opts": ["Because Update() automatically deletes the entity if any property is 0.", "Because Update() marks ALL mapped properties on the entity as `Modified`, overwriting `PublishedYear` in the database with 0 instead of keeping the existing database value.", "Because Update() requires an active database transaction lock before executing.", "Because Update() only works on entities that have an active navigation collection."], "correct": 1, "exp": "Correct! `Update()` attaches disconnected entities and marks EVERY property as modified. If your incoming DTO or model only had partial data, `Update()` will blind-write default or null values over existing database columns."}, "qc-4-1": {"topic": "No-Tracking Queries", "prompt": "Why is `context.Books.AsNoTracking().ToListAsync()` recommended for read-only GET endpoints in Raff?", "opts": ["Because it disables SQL encryption, making data transfer across the network instantaneous.", "Because EF Core does not allocate snapshot copies or register entities in the change tracker, significantly reducing memory consumption and CPU overhead.", "Because it forces PostgreSQL to bypass disk storage and read directly from RAM.", "Because it allows the client to modify database records without calling SaveChangesAsync."], "correct": 1, "exp": "Correct! When entities will only be serialized to JSON and sent to the client, tracking them is pure waste. `AsNoTracking()` bypasses the creation of change tracking snapshots and identity map entries, saving memory and garbage collection cycles."}, "qc-4-2": {"topic": "Identity Resolution", "prompt": "Suppose Book #42 was already loaded into `BooksContext` by an earlier operation. How does `await context.Books.FindAsync(42)` behave compared to `await context.Books.FirstOrDefaultAsync(b => b.Id == 42)`?", "opts": ["`FindAsync(42)` checks the local Change Tracker identity map first and returns the existing instance immediately without issuing SQL; `FirstOrDefaultAsync` always sends a query to PostgreSQL.", "Both methods always issue an identical SQL query across the network.", "`FindAsync(42)` requires an explicit primary key constraint in C#, while `FirstOrDefaultAsync` creates a new database table.", "`FirstOrDefaultAsync` returns null if the entity is already in memory."], "correct": 0, "exp": "Correct! `FindAsync(key)` is an optimized lookup that searches the DbContext's local tracked entities first. If found, it returns the in-memory object with zero database roundtrips. In contrast, `FirstOrDefaultAsync` always compiles and sends a SQL query to PostgreSQL."}, "qc-4-3": {"topic": "No-Tracking Identity Resolution", "prompt": "What is the specific purpose of `AsNoTrackingWithIdentityResolution()`?", "opts": ["It turns on full change tracking but disables SQL generation.", "It returns untracked entities for performance, but ensures that if the same database row appears multiple times within a single query result graph, only one C# instance is created.", "It guarantees that client updates are automatically committed to PostgreSQL without calling SaveChangesAsync.", "It verifies that all foreign keys in the database are indexed."], "correct": 1, "exp": "Correct! Plain `AsNoTracking()` may instantiate duplicate C# objects for the same row when complex entity graphs or joins are loaded. `AsNoTrackingWithIdentityResolution()` prevents duplicate object instances within the query result while still avoiding change tracking overhead."}, "qc-4-4": {"topic": "Tracking Trade-offs", "prompt": "A developer claims: 'We should use `AsNoTracking()` on every single query in our entire application without exception.' Why is this claim incorrect?", "opts": ["Because `AsNoTracking()` is deprecated in modern EF Core.", "Because when you retrieve an entity with `AsNoTracking()`, modifying its properties and calling `SaveChangesAsync()` will do nothing, because EF Core is not tracking the entity.", "Because PostgreSQL refuses connections that use `AsNoTracking()`.", "Because no-tracking queries cannot use LINQ `.Where()` filters."], "correct": 1, "exp": "Correct! If an endpoint's purpose is to query a record, modify a property, and persist the update, using `AsNoTracking()` completely breaks the change tracking workflow. `SaveChangesAsync()` will detect 0 changes."}, "qc-5-1": {"topic": "SaveChangesAsync Semantics", "prompt": "What does the integer return value of `await context.SaveChangesAsync()` represent?", "opts": ["The database primary key ID of the most recently inserted entity.", "A boolean flag where 1 means the targeted book was found and 0 means not found.", "The total number of state entries written to the database (rows affected by INSERT, UPDATE, and DELETE statements).", "The number of milliseconds PostgreSQL took to execute the transaction."], "correct": 2, "exp": "Correct! `SaveChangesAsync()` returns an `int` representing the total count of rows affected across all executed DML statements. It does NOT indicate whether a specific query found a record or return an entity ID."}, "qc-5-2": {"topic": "Concurrency Exceptions", "prompt": "When `SaveChangesAsync()` executes an UPDATE statement for an entity, what causes EF Core to throw a `DbUpdateConcurrencyException`?", "opts": ["PostgreSQL rejected the user's password.", "The UPDATE statement affected 0 rows (e.g. the row was deleted in PostgreSQL by another process after it was queried).", "The entity had more than 5 modified properties.", "A second DbContext was created on another machine."], "correct": 1, "exp": "Correct! EF Core expects an UPDATE or DELETE for a tracked entity with a specific primary key (or concurrency token) to affect exactly 1 row. If 0 rows are affected, EF Core recognizes that the underlying row no longer exists or has changed, and throws `DbUpdateConcurrencyException`."}, "qc-5-3": {"topic": "Transaction Boundary", "prompt": "If `SaveChangesAsync()` needs to insert 2 new books and update 1 existing book, how does EF Core manage database transactions by default?", "opts": ["Each statement is executed in an isolated, independent transaction that commits sequentially.", "EF Core wraps all operations in a single atomic transaction; if any single statement fails, the entire batch is rolled back.", "EF Core never uses transactions unless the developer calls `context.Database.BeginTransaction()`.", "PostgreSQL automatically commits each row every 10 milliseconds regardless of EF Core."], "correct": 1, "exp": "Correct! For relational providers supporting transactions (like Npgsql for PostgreSQL), `SaveChangesAsync()` automatically creates an implicit transaction wrapping the entire batch of generated operations, ensuring atomic all-or-nothing execution."}, "qc-5-4": {"topic": "Remove() Execution", "prompt": "A developer writes: `context.Books.Remove(book);`. Does this immediately delete the row from PostgreSQL?", "opts": ["Yes, Remove() executes an immediate SQL `DELETE` query over the network.", "No, Remove() merely transitions the entity state in the local Change Tracker to `Deleted`; the SQL `DELETE` is not sent until `SaveChangesAsync()` is awaited.", "Yes, but only if auto-commit is enabled in Npgsql.", "No, Remove() only removes the entity from in-memory C# lists and never touches the database."], "correct": 1, "exp": "Correct! `Remove(book)` is an in-memory state transition. It marks the entity as `EntityState.Deleted`. The actual `DELETE FROM \"Books\" WHERE \"Id\" = @p0` statement is only sent to PostgreSQL when `SaveChangesAsync()` is called."}, "qc-6-1": {"topic": "Deferred Execution", "prompt": "Examine this code:\n```csharp\nvar query = context.Books.Where(b => b.PublishedYear >= 2020);\nquery = query.OrderBy(b => b.Title);\n```\nHow many SQL queries have been sent to PostgreSQL after executing these two lines?", "opts": ["Two SQL queries (one for WHERE, one for ORDER BY).", "One SQL query combining both clauses.", "Zero SQL queries, because LINQ queries on `IQueryable` use deferred execution and are only executed when consumed by a terminal operator.", "It depends on whether Kestrel is running in Development mode."], "correct": 2, "exp": "Correct! `IQueryable` builds an expression tree. No network communication or database execution occurs during query composition. The query is only translated and sent to PostgreSQL when a terminal method like `ToListAsync()`, `FirstOrDefaultAsync()`, or `foreach` is invoked."}, "qc-6-2": {"topic": "Client vs Server Evaluation", "prompt": "Compare Pattern A and Pattern B:\n```csharp\n// Pattern A\nvar books = await context.Books\n    .Where(b => b.PublishedYear >= 2020)\n    .ToListAsync();\n\n// Pattern B\nvar allBooks = await context.Books.ToListAsync();\nvar books = allBooks.Where(b => b.PublishedYear >= 2020).ToList();\n```\nWhat is the critical performance difference?", "opts": ["Pattern A filters rows on the PostgreSQL server, returning only matching rows; Pattern B fetches ALL rows in the entire table into web server memory before filtering with LINQ-to-Objects.", "Pattern B is faster because memory filtering in C# is always faster than database indexes.", "Both patterns generate identical SQL queries on PostgreSQL.", "Pattern A causes an out-of-memory exception in PostgreSQL."], "correct": 0, "exp": "Correct! Pattern A translates the `.Where()` clause into a SQL `WHERE` clause executed by PostgreSQL, transmitting only matching rows. Pattern B executes `ToListAsync()` immediately, transferring the entire table over the network and materializing every row into RAM, which is an catastrophic anti-pattern for large datasets."}, "qc-6-3": {"topic": "Terminal Operators", "prompt": "Which of the following LINQ methods triggers immediate database query execution when called on an `IQueryable<Book>`?", "opts": ["`.Where(b => b.PublishedYear == 2025)`", "`.OrderBy(b => b.Title)`", "`.Select(b => b.Title)`", "`.CountAsync()`"], "correct": 3, "exp": "Correct! `.Where()`, `.OrderBy()`, and `.Select()` are query operators that compose expression trees and return `IQueryable<T>`. `.CountAsync()` is a terminal operator that executes a `SELECT COUNT(*)` query on PostgreSQL and returns an integer."}, "qc-6-4": {"topic": "AsEnumerable Boundary", "prompt": "What does calling `.AsEnumerable()` on an EF Core query chain accomplish?", "opts": ["It immediately executes the query and buffers all rows into a List.", "It switches the LINQ operator binding from `IQueryable` to `IEnumerable`, meaning subsequent LINQ operators in the chain will execute in-memory on the client as rows are streamed, rather than translating to SQL.", "It serializes the database table into a CSV file.", "It turns off database transactions."], "correct": 1, "exp": "Correct! `.AsEnumerable()` hides the `IQueryable` interface and exposes `IEnumerable`. It does not materialize the entire collection immediately, but any operators chained after `.AsEnumerable()` are evaluated by LINQ to Objects on the client instead of by the EF Core SQL translator."}, "qc-7-1": {"topic": "DTO Projection", "prompt": "Why does projecting a query directly into a scalar DTO (`.Select(b => new BookDto(b.Id, b.Title)).ToListAsync()`) improve application performance in Raff?", "opts": ["It enables PostgreSQL column compression.", "PostgreSQL only transmits the `Id` and `Title` columns across the network, and EF Core avoids allocating tracking snapshots or registering entities in the Change Tracker.", "It causes EF Core to bypass PostgreSQL and read from the browser's local storage.", "It allows the client to update the database without authentication."], "correct": 1, "exp": "Correct! DTO projections generate a SQL `SELECT \"b\".\"Id\", \"b\".\"Title\"` query, saving network bandwidth and I/O. Furthermore, because DTOs are not entity types registered in the model, EF Core skips change tracker registration and snapshot overhead."}, "qc-7-2": {"topic": "ToQueryString", "prompt": "What is the primary benefit of calling `.ToQueryString()` on an `IQueryable` during development?", "opts": ["It validates user input against SQL injection attacks.", "It returns the generated SQL string that EF Core would execute against PostgreSQL without actually sending any query to the database.", "It executes the query and outputs the results as a formatted HTML table.", "It creates an index in PostgreSQL for all columns in the query."], "correct": 1, "exp": "Correct! `ToQueryString()` allows developers to inspect the exact SQL generated by the provider (including parameters and joins) for debugging and query optimization without executing the query or touching the database."}, "qc-7-3": {"topic": "EF Core Logging", "prompt": "When configuring `DbContextOptionsBuilder` in Raff, what does `EnableSensitiveDataLogging()` do?", "opts": ["It encrypts all database logs before writing them to disk.", "It includes parameter values (such as user passwords or book titles) in the logged SQL commands instead of masking them as `@p0`.", "It disables all SQL logging to prevent leaks.", "It automatically deletes logs older than 7 days."], "correct": 1, "exp": "Correct! By default, EF Core logs parameter placeholders (like `@p0`) to prevent leaking confidential data into logs. `EnableSensitiveDataLogging()` instructs EF Core to print actual parameter values, which is invaluable during local development but must NEVER be enabled in production."}, "qc-7-4": {"topic": "Troubleshooting Translations", "prompt": "A developer writes: `context.Books.Where(b => CustomCsharpHelper(b.Title)).ToListAsync()`. What happens when this query is executed?", "opts": ["Npgsql automatically compiles the C# helper function into a PostgreSQL PL/pgSQL stored procedure.", "EF Core throws `InvalidOperationException: The LINQ expression ... could not be translated` because the query provider cannot translate arbitrary C# methods into SQL.", "PostgreSQL executes the query without the filter and ignores the helper method.", "The helper method is automatically executed in the browser."], "correct": 1, "exp": "Correct! EF Core cannot translate arbitrary C# methods into SQL. In modern EF Core, if a top-level `.Where()` expression cannot be translated to SQL by the database provider, an `InvalidOperationException` is thrown to prevent silent performance catastrophes."}, "qa-1": {"topic": "Entity States & Lifecycles", "prompt": "You instantiate a new `Book` object: `var book = new Book { Title = \"Mastering EF Core\" };`. Next, you call `context.Books.Add(book);`. Then you call `await context.SaveChangesAsync();`. What are the states of the entity at each stage?", "opts": ["Detached \u2192 Added \u2192 Unchanged", "Added \u2192 Modified \u2192 Unchanged", "Detached \u2192 Unchanged \u2192 Saved", "Detached \u2192 Added \u2192 Detached"], "correct": 0, "exp": "Correct! Initially, the object is a plain C# instance (`Detached`). `context.Books.Add(book)` registers it as `Added`. Upon successful completion of `SaveChangesAsync()`, the generated `INSERT` succeeds and EF Core transitions the entity to `Unchanged`."}, "qa-2": {"topic": "DbContext Thread Safety", "prompt": "A junior developer on the Raff project writes: `await Task.WhenAll(books.Select(b => ProcessBookAsync(b, context)));` where `ProcessBookAsync` modifies and saves each book using the shared `context` parameter. What will happen at runtime?", "opts": ["The books will be processed concurrently with high throughput across multiple CPU cores.", "EF Core will throw an `InvalidOperationException` because DbContext instances are not thread-safe and do not support concurrent operations.", "PostgreSQL will open multiple sub-transactions automatically and commit each book cleanly.", "The code will execute correctly, but only if Npgsql connection pooling is disabled."], "correct": 1, "exp": "Correct! DbContext is strictly single-threaded. Multiple tasks executing against the same DbContext instance concurrently will corrupt internal change tracker state and trigger `InvalidOperationException`."}, "qa-3": {"topic": "Identity Resolution & FindAsync", "prompt": "A service calls `var b1 = await context.Books.FindAsync(10);` followed immediately by `var b2 = await context.Books.FindAsync(10);`. How many network queries are sent to PostgreSQL, and what is `object.ReferenceEquals(b1, b2)`?", "opts": ["Two network queries; ReferenceEquals is false.", "One network query; ReferenceEquals is true because EF Core's identity map returns the exact same in-memory instance.", "Zero network queries; ReferenceEquals is false.", "One network query; ReferenceEquals is false."], "correct": 1, "exp": "Correct! The first `FindAsync(10)` sends 1 SQL query to PostgreSQL and stores the entity in the change tracker's identity map. The second `FindAsync(10)` finds Book #10 already tracked in memory, sending 0 additional network queries and returning the identical object reference (`ReferenceEquals` is true)."}, "qa-4": {"topic": "Update() vs Tracked Modification", "prompt": "In an API PUT endpoint, a developer deserializes an incomplete DTO where only `Title` is supplied. They create `var book = new Book { Id = id, Title = dto.Title };` and call `context.Books.Update(book); await context.SaveChangesAsync();`. What is the consequence in PostgreSQL?", "opts": ["Only the `Title` column is updated because EF Core inspects which properties were provided in the JSON.", "Every mapped column in the `Books` table for that row is updated, overwriting unsupplied fields (like `Summary` and `PublishedYear`) with null or C# default values.", "EF Core throws a validation error because `Update()` requires all foreign keys to be loaded.", "PostgreSQL rejects the query due to a syntax error in the generated MERGE statement."], "correct": 1, "exp": "Correct! Calling `Update()` on a disconnected entity forces EF Core to mark EVERY mapped property as `Modified`. Unset properties have C# default values (e.g. null, 0), which will overwrite existing database data."}, "qa-5": {"topic": "SaveChangesAsync Semantics", "prompt": "In Raff, `BookService.DeleteBookAsync(int id)` executes: `var book = new Book { Id = id }; context.Books.Remove(book); var count = await context.SaveChangesAsync();`. If row #id does NOT exist in PostgreSQL, what occurs?", "opts": ["`SaveChangesAsync()` returns 0, and the method continues normally.", "EF Core throws `DbUpdateConcurrencyException` because the DELETE statement affected 0 rows when 1 row was expected.", "PostgreSQL automatically inserts an empty row to satisfy the delete.", "`SaveChangesAsync()` returns -1 to indicate an HTTP 404 condition."], "correct": 1, "exp": "Correct! When EF Core issues a DELETE for a tracked entity, it expects exactly 1 row to be deleted. If 0 rows are affected (because the row was already deleted or never existed), EF Core throws `DbUpdateConcurrencyException`."}, "qa-6": {"topic": "No-Tracking Queries", "prompt": "When is `context.Books.AsNoTracking().ToListAsync()` NOT appropriate?", "opts": ["In a GET `/api/books` endpoint returning a paginated catalog.", "In a reporting query that calculates average book publication year.", "In a PATCH `/api/books/{id}` endpoint where you intend to modify the retrieved book entity and call `context.SaveChangesAsync()`.", "In an export endpoint streaming books to a CSV file."], "correct": 2, "exp": "Correct! If you query an entity with `AsNoTracking()`, the Change Tracker ignores it. Any property changes made to that entity in C# will NOT be saved when `SaveChangesAsync()` is called, making it completely unsuitable for update workflows."}, "qa-7": {"topic": "Deferred Execution & LINQ", "prompt": "What happens if a developer creates an `IQueryable` query and loops through it with `foreach (var book in query)` without calling an async terminal operator like `ToListAsync()`?", "opts": ["The query never executes at all.", "The query executes synchronously on the calling thread, blocking until rows arrive from PostgreSQL.", "EF Core automatically converts the synchronous foreach loop into an asynchronous background task.", "PostgreSQL terminates the connection because asynchronous sockets are mandatory."], "correct": 1, "exp": "Correct! A standard `foreach` loop over `IQueryable` invokes `IEnumerable.GetEnumerator()`, which executes the query synchronously and blocks the thread. In ASP.NET Core web applications, this wastes thread pool threads and should be replaced with `await foreach` or `await query.ToListAsync()`."}, "qa-8": {"topic": "Server vs Client Evaluation", "prompt": "A developer writes:\n```csharp\nvar books = await context.Books\n    .Where(b => b.Title.ToLower().Contains(keyword))\n    .ToListAsync();\n```\nUnder PostgreSQL / Npgsql, how is this query evaluated?", "opts": ["Npgsql translates `ToLower().Contains(...)` into PostgreSQL's `LOWER(\"b\".\"Title\") LIKE '%' || @p0 || '%'` and executes it on the PostgreSQL server.", "All books are loaded into C# memory and filtered using the String.Contains method.", "EF Core throws a translation exception because ToLower is not supported in LINQ.", "PostgreSQL uses full-text search indexes automatically."], "correct": 0, "exp": "Correct! Npgsql provides built-in translation for common string methods like `.ToLower()`, `.ToUpper()`, and `.Contains()`, translating them directly into equivalent PostgreSQL string SQL expressions on the server."}, "qa-9": {"topic": "DTO Projection", "prompt": "Consider this query:\n```csharp\nvar titles = await context.Books\n    .Select(b => b.Title)\n    .ToListAsync();\n```\nWhat is the tracking state of the resulting titles in `BooksContext`?", "opts": ["Each string title is tracked in the Change Tracker with `EntityState.Unchanged`.", "Strings are primitive values, not entity types; therefore, EF Core tracks nothing in the Change Tracker.", "The entire Book entity corresponding to each title is silently tracked in the background.", "EF Core throws an exception because projections must always include primary keys."], "correct": 1, "exp": "Correct! EF Core only tracks types configured as entities in the model. Projecting scalar primitives (or DTOs without entity instances) means zero entities are tracked, resulting in minimal memory overhead."}, "qa-10": {"topic": "SQL Inspection with ToQueryString", "prompt": "Why can `.ToQueryString()` NOT be called on a query that ends with `.ToListAsync()`?", "opts": ["Because `.ToListAsync()` returns a `Task<List<T>>`, which is an already executed collection, not an unexecuted `IQueryable` expression tree.", "Because ToQueryString is only available for SQLite databases.", "Because ToQueryString requires a synchronous database connection.", "Because ToQueryString can only be used on entity classes that have no navigation properties."], "correct": 0, "exp": "Correct! `ToQueryString()` is an extension method specifically on `IQueryable`. Once a terminal operator like `ToListAsync()` is called, the query has already been executed and materialized into a `List<T>`, so there is no longer an `IQueryable` expression tree to inspect."}, "qa-11": {"topic": "Snapshot Change Tracking", "prompt": "In Raff, a tracked book has `Title = \"Al-Ayyam\"`. The developer writes:\n```csharp\nbook.Title = \"New Title\";\nbook.Title = \"Al-Ayyam\";\nawait context.SaveChangesAsync();\n```\nWhat SQL statement is sent to PostgreSQL?", "opts": ["An UPDATE statement setting Title to \"Al-Ayyam\".", "An UPDATE statement setting Title to \"New Title\" followed by an UPDATE setting it back.", "Zero SQL statements, because when snapshot change detection runs, the current value matches the original snapshot value.", "A DELETE statement followed by an INSERT statement."], "correct": 2, "exp": "Correct! EF Core compares current property values against the original snapshot stored at query time. Because the current value (\"Al-Ayyam\") matches the original snapshot value (\"Al-Ayyam\"), EF Core detects no modifications and sends zero SQL statements."}, "qa-12": {"topic": "Transactions & Unit of Work", "prompt": "A service method executes `context.Books.Add(book1); context.Books.Add(book2); await context.SaveChangesAsync();`. If `book2` violates a unique constraint in PostgreSQL and throws a `DbUpdateException`, what happens to `book1`?", "opts": ["`book1` remains committed in PostgreSQL because it was executed first.", "Because `SaveChangesAsync()` wraps all operations in a single database transaction by default, the entire transaction is rolled back, and neither book is committed.", "PostgreSQL automatically fixes the unique constraint violation by generating a random key.", "EF Core detaches `book2` and retries `book1` automatically."], "correct": 1, "exp": "Correct! All operations batched within a single `SaveChangesAsync()` call execute inside an atomic database transaction. If any statement fails, the entire transaction is rolled back by PostgreSQL, ensuring data integrity."}};

const RAFF_SAMPLE_BOOKS = [
      { id: 1, title: "Muqaddimah", publishedYear: 1377, summary: "Ibn Khaldun's foundational work on sociology, historiography, and civilization.", coverUrl: "covers/muqaddimah.jpg" },
      { id: 2, title: "Hayy ibn Yaqdhan", publishedYear: 1185, summary: "Ibn Tufayl's philosophical narrative on empiricism, nature, and divine contemplation.", coverUrl: "covers/hayy.jpg" },
      { id: 3, title: "Kalila wa Dimna", publishedYear: 750, summary: "Ibn al-Muqaffa's timeless fables of moral wisdom and political allegory.", coverUrl: "covers/kalila.jpg" },
      { id: 4, title: "Al-Ayyam (The Days)", publishedYear: 1929, summary: "Taha Hussein's celebrated autobiography depicting childhood, blindness, and academic quest in Egypt.", coverUrl: "covers/days.jpg" },
      { id: 5, title: "Palace Walk", publishedYear: 1956, summary: "Naguib Mahfouz's Cairo Trilogy masterwork examining family, tradition, and political upheaval.", coverUrl: "covers/palace.jpg" },
      { id: 6, title: "Season of Migration to the North", publishedYear: 1966, summary: "Tayeb Salih's modern classic exploring post-colonial identity and cultural encounters.", coverUrl: "covers/migration.jpg" }
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
        <div class="lesson-badge-top">Module 2 • Architecture &amp; Data Access</div>
        <h1 class="lesson-title">EF Core Internals, Change Tracking &amp; Query Execution</h1>
        <p class="lesson-subtitle">Mastering the inner mechanics of Entity Framework Core 10 and Npgsql for the Raff Book Tracking API.</p>
        <div class="lesson-meta-bar">
          <span>🎯 Level: Advanced CS / Junior .NET Engineer</span>
          <span>⏱️ Pacing: Self-paced (7 Deep Lessons)</span>
          <span>🐘 Engine: EF Core 10 + Npgsql + PostgreSQL</span>
        </div>
      </div>

      <div class="callout callout-info">
        <div class="callout-title">📖 Context for Raff's Backend</div>
        <p>In Module 1, you mastered HTTP wire semantics, route templates, status codes, DTO contracts, and partial update challenges. In <strong>Raff</strong>, you already have a functional <code>BooksController</code>, a <code>BooksContext</code> derived from <code>DbContext</code>, and a <code>Book</code> entity mapped to PostgreSQL.</p>
        <p>Now, we move beneath the surface. You've reached section 1.9 of <em>Entity Framework Core in Action</em>. This module teaches you <strong>what EF Core actually does under the hood</strong>: how change tracking works, why <code>DbContext</code> is a Unit of Work, how LINQ expression trees translate into PostgreSQL SQL, and how to debug and optimize database interactions like a seasoned senior backend engineer.</p>
      </div>

      <h2>Module Roadmap</h2>
      <div class="roadmap-grid">
        <div class="roadmap-card">
          <div class="roadmap-num">01</div>
          <div class="roadmap-title">The EF Core Mental Model</div>
          <div class="roadmap-desc">Relational mapping, ORM abstraction boundaries, and the split between query and update pipelines.</div>
        </div>
        <div class="roadmap-card">
          <div class="roadmap-num">02</div>
          <div class="roadmap-title">DbContext &amp; Unit of Work</div>
          <div class="roadmap-desc">Lifetimes in ASP.NET Core DI, thread-safety rules, connection lifecycle, and disposal patterns.</div>
        </div>
        <div class="roadmap-card">
          <div class="roadmap-num">03</div>
          <div class="roadmap-title">Entity States &amp; Change Tracking</div>
          <div class="roadmap-desc">The 5 EntityStates, snapshot comparison, DetectChanges, DebugView, and the perils of <code>Update()</code>. Includes interactive simulator!</div>
        </div>
        <div class="roadmap-card">
          <div class="roadmap-num">04</div>
          <div class="roadmap-title">Tracking vs. No-Tracking</div>
          <div class="roadmap-desc">Read-only performance optimization with <code>AsNoTracking()</code>, Identity Resolution, and <code>FindAsync</code> memory lookup.</div>
        </div>
        <div class="roadmap-card">
          <div class="roadmap-num">05</div>
          <div class="roadmap-title">SaveChanges &amp; Generated SQL</div>
          <div class="roadmap-desc">State-to-SQL translation, return values, implicit transactions, and handling <code>DbUpdateConcurrencyException</code>.</div>
        </div>
        <div class="roadmap-card">
          <div class="roadmap-num">06</div>
          <div class="roadmap-title">LINQ &amp; Query Execution</div>
          <div class="roadmap-desc">Expression trees, deferred execution, terminal async operators, and client vs server evaluation. Includes interactive query playground!</div>
        </div>
        <div class="roadmap-card">
          <div class="roadmap-num">07</div>
          <div class="roadmap-title">Projection &amp; Debugging</div>
          <div class="roadmap-desc">DTO projections, <code>ToQueryString()</code>, EF Core logging with <code>LogTo</code>, and troubleshooting slow/failing queries.</div>
        </div>
      </div>

      <div style="margin-top: 2rem; text-align: center;">
        <button class="btn-primary" style="padding: 0.85rem 2rem; font-size: 1rem;" onclick="switchLesson('lesson-1')">🚀 Start Lesson 1: The EF Core Mental Model</button>
      </div>
    `
  },
  {
    id: "lesson-1",
    badge: "01",
    nav: "The EF Core Mental Model",
    content: `
      <div class="lesson-header-box">
        <div class="lesson-badge-top">Lesson 1</div>
        <h1 class="lesson-title">The EF Core Mental Model</h1>
        <p class="lesson-subtitle">Understanding what an ORM does, the separation of queries from updates, and how C# objects map to PostgreSQL.</p>
      </div>

      <h2>1. Beyond Raw SQL: What EF Core Actually Does</h2>
      <p>When working with relational databases in .NET, you could manually write ADO.NET code with <code>NpgsqlCommand</code>, bind SQL parameters by index, execute a <code>NpgsqlDataReader</code>, and write imperative while-loops to populate C# instances row-by-row. That approach gives raw speed but forces you to maintain brittle SQL strings, manually manage connection lifecycles, and hand-craft object-relational mapping logic.</p>
      <p><strong>Entity Framework Core (EF Core)</strong> is an Object-Relational Mapper (ORM). But unlike simplistic "Active Record" libraries, EF Core is a sophisticated compiler and state-management system that sits between your C# application code and the database driver.</p>

      <div class="diagram-container">
        <div class="diagram-title">Figure 2.1: The EF Core Architectural Pipeline in Raff</div>
        <svg viewBox="0 0 880 240" class="pipeline-svg" aria-label="EF Core Architecture Flow">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--accent)" />
            </marker>
          </defs>
          <!-- Nodes -->
          <g transform="translate(10, 80)">
            <rect width="140" height="80" rx="8" fill="var(--bg-card)" stroke="var(--border-color)" stroke-width="2"/>
            <text x="70" y="35" text-anchor="middle" fill="var(--text-primary)" font-weight="700" font-size="14">Application Code</text>
            <text x="70" y="58" text-anchor="middle" fill="var(--text-muted)" font-size="11">Raff Controllers &amp; Services</text>
          </g>
          <line x1="150" y1="120" x2="190" y2="120" stroke="var(--accent)" stroke-width="2" marker-end="url(#arrow)" />
          
          <g transform="translate(195, 55)">
            <rect width="180" height="130" rx="8" fill="var(--bg-card)" stroke="var(--accent)" stroke-width="2"/>
            <text x="90" y="30" text-anchor="middle" fill="var(--accent-light)" font-weight="700" font-size="14">BooksContext (DbContext)</text>
            <line x1="15" y1="45" x2="165" y2="45" stroke="var(--border-color)" stroke-width="1" />
            <rect x="15" y="55" width="150" height="28" rx="4" fill="var(--bg-code)" />
            <text x="90" y="74" text-anchor="middle" fill="var(--text-secondary)" font-size="11">DbSet&lt;Book&gt; Facade</text>
            <rect x="15" y="90" width="150" height="28" rx="4" fill="var(--bg-code)" />
            <text x="90" y="109" text-anchor="middle" fill="var(--warning)" font-size="11">ChangeTracker (Snapshots)</text>
          </g>
          <line x1="375" y1="120" x2="415" y2="120" stroke="var(--accent)" stroke-width="2" marker-end="url(#arrow)" />

          <g transform="translate(420, 70)">
            <rect width="180" height="100" rx="8" fill="var(--bg-card)" stroke="var(--border-color)" stroke-width="2"/>
            <text x="90" y="30" text-anchor="middle" fill="var(--text-primary)" font-weight="700" font-size="14">EF Core Core Engine</text>
            <text x="90" y="52" text-anchor="middle" fill="var(--text-muted)" font-size="11">LINQ Compiler &amp; SQL Model</text>
            <text x="90" y="72" text-anchor="middle" fill="var(--text-muted)" font-size="11">State Machine &amp; Batching</text>
          </g>
          <line x1="600" y1="120" x2="640" y2="120" stroke="var(--accent)" stroke-width="2" marker-end="url(#arrow)" />

          <g transform="translate(645, 80)">
            <rect width="105" height="80" rx="8" fill="var(--bg-card)" stroke="var(--border-color)" stroke-width="2"/>
            <text x="52" y="35" text-anchor="middle" fill="var(--text-primary)" font-weight="700" font-size="13">Npgsql</text>
            <text x="52" y="56" text-anchor="middle" fill="var(--text-muted)" font-size="10">PostgreSQL Provider</text>
          </g>
          <line x1="750" y1="120" x2="780" y2="120" stroke="var(--accent)" stroke-width="2" marker-end="url(#arrow)" />

          <g transform="translate(785, 80)">
            <rect width="85" height="80" rx="8" fill="var(--bg-code)" stroke="var(--success)" stroke-width="2"/>
            <text x="42" y="36" text-anchor="middle" fill="var(--success)" font-weight="700" font-size="14">PostgreSQL</text>
            <text x="42" y="58" text-anchor="middle" fill="var(--text-muted)" font-size="10">Database Disk</text>
          </g>
        </svg>
      </div>

      <h2>2. The Two Independent Pipelines: Queries vs. Updates</h2>
      <p>A crucial insight from section 1.9 of <em>Entity Framework Core in Action</em> is that EF Core operates two fundamentally distinct pathways:</p>
      
      <div class="grid-2">
        <div class="content-panel">
          <h3 style="color:var(--accent-light);">🔍 The Query Pipeline</h3>
          <p>When you write a LINQ query such as <code>context.Books.Where(b => b.PublishedYear >= 2020)</code>:</p>
          <ol>
            <li><strong>Expression Tree Construction:</strong> C# compiles the lambda into an expression tree (data structure).</li>
            <li><strong>Provider Translation:</strong> EF Core and Npgsql translate the expression tree into a PostgreSQL <code>SELECT</code> query.</li>
            <li><strong>Execution &amp; Materialization:</strong> The query executes over ADO.NET; raw rows are parsed and instantiated into strongly typed C# <code>Book</code> objects.</li>
            <li><strong>Tracking Snapshot:</strong> If tracking is enabled, EF Core saves a private snapshot copy of every property value in the <code>ChangeTracker</code>.</li>
          </ol>
        </div>
        <div class="content-panel">
          <h3 style="color:var(--warning);">💾 The Modification Pipeline</h3>
          <p>When you create, modify, or delete entities:</p>
          <ol>
            <li><strong>In-Memory Mutation:</strong> Setting <code>book.Title = "New Title"</code> only modifies C# memory on the heap. Zero SQL is sent.</li>
            <li><strong>Change Detection:</strong> During <code>SaveChangesAsync()</code>, EF Core compares current property values against the stored snapshot.</li>
            <li><strong>DML Generation:</strong> EF Core generates appropriate <code>INSERT</code>, <code>UPDATE</code>, or <code>DELETE</code> statements for modified properties.</li>
            <li><strong>Batch Execution:</strong> Statements are batched inside an atomic PostgreSQL transaction and executed.</li>
          </ol>
        </div>
      </div>

      <div class="callout callout-warning">
        <div class="callout-title">⚠️ The "Immediate Execution" Misconception</div>
        <p>A common beginner mistake is assuming that mutating a property like <code>book.Summary = "New summary";</code> immediately issues an <code>UPDATE</code> query across the network. <strong>It does not.</strong> In-memory entity objects are completely decoupled from PostgreSQL until you invoke <code>SaveChangesAsync()</code>.</p>
      </div>

      <h2>3. Code Example: Raff's Model Configuration</h2>
      <p>Here is how the <code>Book</code> entity and <code>BooksContext</code> are wired in Raff:</p>

      
    <div class="code-wrapper">
      <div class="code-header">
        <div class="code-badge-group">
          <span class="code-lang-tag">C#</span>
          <span class="code-filename">Models/Book.cs</span>
          <span class="code-type-pill pill-complete example">[Complete Example]</span>
        </div>
        <button class="btn-copy" aria-label="Copy code">📋 Copy</button>
      </div>
      <pre><code class="language-c#">
namespace Raff.Models;

public class Book
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Summary { get; set; }
    public int PublishedYear { get; set; }
    public string? CoverUrl { get; set; }
    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
}
</code></pre>
      <div class="code-expl">The core domain entity in Raff. Note the nullable reference types for Summary and CoverUrl.</div>
    </div>
    

      
    <div class="code-wrapper">
      <div class="code-header">
        <div class="code-badge-group">
          <span class="code-lang-tag">C#</span>
          <span class="code-filename">Data/BooksContext.cs</span>
          <span class="code-type-pill pill-complete example">[Complete Example]</span>
        </div>
        <button class="btn-copy" aria-label="Copy code">📋 Copy</button>
      </div>
      <pre><code class="language-c#">
using Microsoft.EntityFrameworkCore;
using Raff.Models;

namespace Raff.Data;

public class BooksContext : DbContext
{
    public BooksContext(DbContextOptions&lt;BooksContext&gt; options) : base(options)
    {
    }

    public DbSet&lt;Book&gt; Books =&gt; Set&lt;Book&gt;();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity&lt;Book&gt;(entity =&gt;
        {
            entity.HasKey(b =&gt; b.Id);
            entity.Property(b =&gt; b.Title).IsRequired().HasMaxLength(250);
            entity.Property(b =&gt; b.Summary).HasMaxLength(2000);
            entity.Property(b =&gt; b.CoverUrl).HasMaxLength(500);
        });
    }
}
</code></pre>
      <div class="code-expl">DbContext configuration utilizing Fluent API in OnModelCreating to specify relational column constraints.</div>
    </div>
    

      <h2>Lesson 1 Summary</h2>
      <ul>
        <li>EF Core is an ORM combining the <strong>Unit of Work</strong> pattern (<code>DbContext</code>) and the <strong>Repository</strong> pattern (<code>DbSet&lt;T&gt;</code>).</li>
        <li>The <strong>Query Pipeline</strong> parses LINQ into SQL and materializes objects; the <strong>Modification Pipeline</strong> inspects the <code>ChangeTracker</code> snapshots to generate SQL on <code>SaveChangesAsync()</code>.</li>
        <li>Mutating C# properties has zero immediate database effect.</li>
        <li>Database providers like <strong>Npgsql</strong> translate abstract LINQ operations into provider-specific PostgreSQL SQL dialect.</li>
      </ul>

      <h2>Knowledge Checks</h2>
      
    <div class="exercise-card" id="qc-1-1">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">Knowledge Check</span>
          <span style="font-weight:600; font-size:0.9rem;">EF Core Mental Model</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">In Raff, a developer mutates an entity property: \`book.PublishedYear = 2026;\`. Why does this line NOT immediately send an UPDATE query to the PostgreSQL database?</div>
        <div class="quiz-options" data-qid="qc-1-1">
          
        <div class="quiz-option" data-opt="0">
          <div class="option-indicator">A</div>
          <div class="option-text">Because EF Core buffers all SQL queries in memory until the operating system socket buffer is flushed.</div>
        </div>
        
        <div class="quiz-option" data-opt="1">
          <div class="option-indicator">B</div>
          <div class="option-text">Because mutating a C# property is an ordinary in-memory operation; EF Core only compares property snapshots and dispatches SQL when SaveChangesAsync() is called.</div>
        </div>
        
        <div class="quiz-option" data-opt="2">
          <div class="option-indicator">C</div>
          <div class="option-text">Because Npgsql requires explicit transaction commits before any TCP socket packet can be transmitted.</div>
        </div>
        
        <div class="quiz-option" data-opt="3">
          <div class="option-indicator">D</div>
          <div class="option-text">Because BooksContext only synchronizes with PostgreSQL when the HTTP request pipeline terminates.</div>
        </div>
        
        </div>
        <div class="exercise-actions">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-1-1">Submit Answer</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-1-1" style="display:none;">Retry</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-1-1"></div>
      </div>
    </div>
    
      
    <div class="exercise-card" id="qc-1-2">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">Knowledge Check</span>
          <span style="font-weight:600; font-size:0.9rem;">EF Core Mental Model</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">What is the primary role of the database provider (such as Npgsql.EntityFrameworkCore.PostgreSQL) within the EF Core architecture?</div>
        <div class="quiz-options" data-qid="qc-1-2">
          
        <div class="quiz-option" data-opt="0">
          <div class="option-indicator">A</div>
          <div class="option-text">It manages the in-memory ChangeTracker state and compares original property snapshots.</div>
        </div>
        
        <div class="quiz-option" data-opt="1">
          <div class="option-indicator">B</div>
          <div class="option-text">It translates provider-agnostic LINQ expression trees into PostgreSQL-specific SQL dialect and handles low-level ADO.NET network communication.</div>
        </div>
        
        <div class="quiz-option" data-opt="2">
          <div class="option-indicator">C</div>
          <div class="option-text">It automatically converts ASP.NET Core controller DTOs into database entities.</div>
        </div>
        
        <div class="quiz-option" data-opt="3">
          <div class="option-indicator">D</div>
          <div class="option-text">It replaces the need for DbContext by offering a direct wrapper around PostgreSQL tables.</div>
        </div>
        
        </div>
        <div class="exercise-actions">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-1-2">Submit Answer</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-1-2" style="display:none;">Retry</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-1-2"></div>
      </div>
    </div>
    
      
    <div class="exercise-card" id="qc-1-3">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">Knowledge Check</span>
          <span style="font-weight:600; font-size:0.9rem;">EF Core Mental Model</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">Which of the following best describes the difference between EF Core's query pathway and its modification pathway?</div>
        <div class="quiz-options" data-qid="qc-1-3">
          
        <div class="quiz-option" data-opt="0">
          <div class="option-indicator">A</div>
          <div class="option-text">The query pathway translates LINQ expressions into SQL and materializes objects; the modification pathway relies on the change tracker snapshots to generate INSERT/UPDATE/DELETE statements.</div>
        </div>
        
        <div class="quiz-option" data-opt="1">
          <div class="option-indicator">B</div>
          <div class="option-text">The query pathway uses ADO.NET, while the modification pathway bypasses SQL and writes directly to PostgreSQL shared memory.</div>
        </div>
        
        <div class="quiz-option" data-opt="2">
          <div class="option-indicator">C</div>
          <div class="option-text">The query pathway requires explicit transactions, while the modification pathway runs without transactions.</div>
        </div>
        
        <div class="quiz-option" data-opt="3">
          <div class="option-indicator">D</div>
          <div class="option-text">The query pathway is asynchronous, while the modification pathway is strictly synchronous.</div>
        </div>
        
        </div>
        <div class="exercise-actions">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-1-3">Submit Answer</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-1-3" style="display:none;">Retry</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-1-3"></div>
      </div>
    </div>
    
      
    <div class="exercise-card" id="qc-1-4">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">Knowledge Check</span>
          <span style="font-weight:600; font-size:0.9rem;">EF Core Mental Model</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">Why is an EF Core entity in memory distinct from the corresponding database row in PostgreSQL?</div>
        <div class="quiz-options" data-qid="qc-1-4">
          
        <div class="quiz-option" data-opt="0">
          <div class="option-indicator">A</div>
          <div class="option-text">An entity in memory can be garbage collected while the row exists, and in-memory changes have no database effect until SaveChangesAsync successfully commits.</div>
        </div>
        
        <div class="quiz-option" data-opt="1">
          <div class="option-indicator">B</div>
          <div class="option-text">An entity in memory stores raw binary table blocks, whereas PostgreSQL stores JSON.</div>
        </div>
        
        <div class="quiz-option" data-opt="2">
          <div class="option-indicator">C</div>
          <div class="option-text">In-memory entities only exist when a database transaction is active.</div>
        </div>
        
        <div class="quiz-option" data-opt="3">
          <div class="option-indicator">D</div>
          <div class="option-text">They are actually identical; any memory pointer change immediately alters PostgreSQL storage via memory-mapped files.</div>
        </div>
        
        </div>
        <div class="exercise-actions">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-1-4">Submit Answer</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-1-4" style="display:none;">Retry</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-1-4"></div>
      </div>
    </div>
    

      <div class="lesson-footer-nav">
        <button class="btn-secondary" disabled>← Previous Lesson</button>
        <button class="btn-complete-lesson" data-lesson="lesson-1">Mark Lesson 1 Complete ✓</button>
        <button class="btn-primary" onclick="switchLesson('lesson-2')">Next: DbContext &amp; Unit of Work →</button>
      </div>
    `
  },
  {
    id: "lesson-2",
    badge: "02",
    nav: "DbContext & Unit of Work",
    content: `
      <div class="lesson-header-box">
        <div class="lesson-badge-top">Lesson 2</div>
        <h1 class="lesson-title">DbContext, DbSet, and Unit of Work</h1>
        <p class="lesson-subtitle">Understanding context lifetimes in ASP.NET Core DI, thread-safety rules, connection pooling, and resource disposal.</p>
      </div>

      <h2>1. The Unit of Work Pattern</h2>
      <p>Martin Fowler defines a <strong>Unit of Work</strong> as an object that maintains a list of objects affected by a business transaction and coordinates the writing out of changes and the resolution of concurrency problems. In EF Core, <code>DbContext</code> is the implementation of this pattern.</p>
      
      <p>The standard lifecycle of a unit of work consists of five steps:</p>
      <div class="steps-container">
        <div class="step-item">
          <div class="step-num">1</div>
          <div class="step-text"><strong>Obtain Context:</strong> ASP.NET Core DI injects a scoped <code>BooksContext</code> into your controller or service.</div>
        </div>
        <div class="step-item">
          <div class="step-num">2</div>
          <div class="step-text"><strong>Query / Attach:</strong> Load entities into memory using <code>DbSet&lt;Book&gt;</code>. EF Core registers them in the <code>ChangeTracker</code>.</div>
        </div>
        <div class="step-item">
          <div class="step-num">3</div>
          <div class="step-text"><strong>Mutate In-Memory:</strong> Business logic updates properties, adds new records, or marks entities for deletion.</div>
        </div>
        <div class="step-item">
          <div class="step-num">4</div>
          <div class="step-text"><strong>Commit Unit of Work:</strong> <code>await context.SaveChangesAsync()</code> compiles all pending changes into an atomic transaction.</div>
        </div>
        <div class="step-item">
          <div class="step-num">5</div>
          <div class="step-text"><strong>Dispose:</strong> The HTTP request ends; ASP.NET Core's DI container disposes the context and releases the underlying connection back to Npgsql's pool.</div>
        </div>
      </div>

      <h2>2. Dependency Injection and Scoped Lifetime</h2>
      <p>In <code>Program.cs</code>, you configure your context with:</p>

      
    <div class="code-wrapper">
      <div class="code-header">
        <div class="code-badge-group">
          <span class="code-lang-tag">C#</span>
          <span class="code-filename">Program.cs</span>
          <span class="code-type-pill pill-complete example">[Complete Example]</span>
        </div>
        <button class="btn-copy" aria-label="Copy code">📋 Copy</button>
      </div>
      <pre><code class="language-c#">
builder.Services.AddDbContext&lt;BooksContext&gt;(options =&gt;
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});
</code></pre>
      <div class="code-expl">AddDbContext registers BooksContext with a Scoped lifetime in the Microsoft.Extensions.DependencyInjection container.</div>
    </div>
    

      <div class="callout callout-info">
        <div class="callout-title">💡 Why Scoped, Not Transient or Singleton?</div>
        <ul>
          <li><strong>Why not Singleton?</strong> A singleton DbContext would live for the entire life of the web server. Its <code>ChangeTracker</code> would retain every entity ever loaded, leaking gigabytes of RAM. Furthermore, because multiple HTTP requests arrive concurrently on different threads, a singleton context would constantly throw concurrency exceptions.</li>
          <li><strong>Why not Transient?</strong> If different services in the same HTTP request receive separate transient DbContext instances, they would each have their own independent change tracker. Changes made in one service would not be visible or coordinated with the other, destroying the Unit of Work guarantee.</li>
          <li><strong>Scoped is Just Right:</strong> Exactly one <code>BooksContext</code> exists per HTTP request, perfectly matching the unit of work boundaries.</li>
        </ul>
      </div>

      <h2>3. Thread-Safety: Why DbContext Cannot Be Shared</h2>
      <div class="callout callout-danger">
        <div class="callout-title">🚨 Hard Rule: DbContext is NOT Thread-Safe</div>
        <p>EF Core does not support multiple concurrent operations being run on the same context instance. If two threads (or two asynchronous tasks without <code>await</code>) attempt to access a single <code>BooksContext</code> instance simultaneously, EF Core will throw:</p>
        <code>System.InvalidOperationException: A second operation was started on this context instance before a previous operation completed. This is usually caused by different threads concurrently using the same instance of DbContext.</code>
      </div>

      <p>Consider this anti-pattern that junior developers frequently write when trying to "optimize" performance:</p>

      
    <div class="code-wrapper">
      <div class="code-header">
        <div class="code-badge-group">
          <span class="code-lang-tag">C#</span>
          <span class="code-filename">Services/BookService.cs</span>
          <span class="code-type-pill pill-anti-pattern">[Anti-Pattern]</span>
        </div>
        <button class="btn-copy" aria-label="Copy code">📋 Copy</button>
      </div>
      <pre><code class="language-c#">
// ❌ DANGEROUS ANTI-PATTERN: Running parallel tasks on the same DbContext instance
public async Task&lt;(List&lt;Book&gt;, int)&gt; GetDashboardDataAsync()
{
    // Both queries start concurrently on the same context instance!
    var booksTask = _context.Books.ToListAsync();
    var countTask = _context.Books.CountAsync();

    // Boom! System.InvalidOperationException thrown immediately
    await Task.WhenAll(booksTask, countTask);

    return (await booksTask, await countTask);
</code></pre>
      <div class="code-expl">Never use Task.WhenAll with operations on the same DbContext instance. DbContext and underlying ADO.NET connections cannot execute overlapping commands.</div>
    </div>
    

      <p>The correct, safe approach is either sequential asynchronous calls or injecting <code>IDbContextFactory&lt;BooksContext&gt;</code> if parallel contexts are genuinely required:</p>

      
    <div class="code-wrapper">
      <div class="code-header">
        <div class="code-badge-group">
          <span class="code-lang-tag">C#</span>
          <span class="code-filename">Services/BookService.cs</span>
          <span class="code-type-pill pill-complete example">[Complete Example]</span>
        </div>
        <button class="btn-copy" aria-label="Copy code">📋 Copy</button>
      </div>
      <pre><code class="language-c#">
// ✅ SAFE &amp; CORRECT: Sequential asynchronous execution
public async Task&lt;(List&lt;Book&gt;, int)&gt; GetDashboardDataAsync()
{
    var books = await _context.Books.ToListAsync();
    var count = await _context.Books.CountAsync();

    return (books, count);
}
</code></pre>
      <div class="code-expl">Each asynchronous operation completes fully before the next operation begins on the single context instance.</div>
    </div>
    

      <h2>4. Context vs. Connection vs. Database</h2>
      <p>Be careful to distinguish three distinct concepts:</p>
      <table class="concept-table">
        <thead>
          <tr>
            <th>Concept</th>
            <th>What it is</th>
            <th>Lifetime</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>BooksContext</strong></td>
            <td>C# Unit of Work object holding the ChangeTracker and model configuration.</td>
            <td>Scoped to the HTTP request (created on request begin, disposed on request end).</td>
          </tr>
          <tr>
            <td><strong>NpgsqlConnection</strong></td>
            <td>Underlying ADO.NET network socket connection to PostgreSQL.</td>
            <td>Managed by Npgsql's connection pool. Opened only when executing queries or saving changes; closed back to the pool immediately.</td>
          </tr>
          <tr>
            <td><strong>PostgreSQL Server</strong></td>
            <td>The independent relational database daemon storing data on persistent disk.</td>
            <td>Runs continuously as an OS service or container.</td>
          </tr>
        </tbody>
      </table>

      <h2>Lesson 2 Summary</h2>
      <ul>
        <li><code>DbContext</code> coordinates operations as an atomic <strong>Unit of Work</strong>.</li>
        <li>ASP.NET Core registers <code>DbContext</code> as <strong>Scoped</strong> to align with HTTP request boundaries.</li>
        <li><code>DbContext</code> is strictly <strong>not thread-safe</strong>. Parallel execution on the same instance triggers <code>InvalidOperationException</code>.</li>
        <li>Disposing the context cleans up tracking state and returns the underlying connection to the connection pool.</li>
      </ul>

      <h2>Knowledge Checks</h2>
      
    <div class="exercise-card" id="qc-2-1">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">Knowledge Check</span>
          <span style="font-weight:600; font-size:0.9rem;">DbContext Lifetime</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">Why does ASP.NET Core register \`BooksContext\` with a Scoped lifetime by default when using \`AddDbContext&lt;BooksContext&gt;()\`?</div>
        <div class="quiz-options" data-qid="qc-2-1">
          
        <div class="quiz-option" data-opt="0">
          <div class="option-indicator">A</div>
          <div class="option-text">Because DbContext instances are expensive singletons that must be shared across the entire web server lifecycle.</div>
        </div>
        
        <div class="quiz-option" data-opt="1">
          <div class="option-indicator">B</div>
          <div class="option-text">Because each incoming HTTP request represents a distinct Unit of Work that should have its own isolated change tracker, connection state, and cache.</div>
        </div>
        
        <div class="quiz-option" data-opt="2">
          <div class="option-indicator">C</div>
          <div class="option-text">Because transient services cannot resolve database connection strings from IConfiguration.</div>
        </div>
        
        <div class="quiz-option" data-opt="3">
          <div class="option-indicator">D</div>
          <div class="option-text">Because PostgreSQL drops client sockets if a connection remains open for more than one HTTP request.</div>
        </div>
        
        </div>
        <div class="exercise-actions">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-2-1">Submit Answer</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-2-1" style="display:none;">Retry</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-2-1"></div>
      </div>
    </div>
    
      
    <div class="exercise-card" id="qc-2-2">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">Knowledge Check</span>
          <span style="font-weight:600; font-size:0.9rem;">DbContext Concurrency</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">What happens if a developer attempts to execute two parallel queries using \`Task.WhenAll\` on the same \`BooksContext\` instance (e.g. \`Task.WhenAll(context.Books.ToListAsync(), context.Authors.ToListAsync())\`)?</div>
        <div class="quiz-options" data-qid="qc-2-2">
          
        <div class="quiz-option" data-opt="0">
          <div class="option-indicator">A</div>
          <div class="option-text">EF Core seamlessly queues the second query and runs both concurrently over multiplexed sockets.</div>
        </div>
        
        <div class="quiz-option" data-opt="1">
          <div class="option-indicator">B</div>
          <div class="option-text">EF Core throws \`InvalidOperationException: A second operation was started on this context instance before a previous operation completed\`.</div>
        </div>
        
        <div class="quiz-option" data-opt="2">
          <div class="option-indicator">C</div>
          <div class="option-text">PostgreSQL executes both queries in parallel and merges the result sets into a single tuple.</div>
        </div>
        
        <div class="quiz-option" data-opt="3">
          <div class="option-indicator">D</div>
          <div class="option-text">The first query succeeds, but the second query silently returns empty results.</div>
        </div>
        
        </div>
        <div class="exercise-actions">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-2-2">Submit Answer</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-2-2" style="display:none;">Retry</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-2-2"></div>
      </div>
    </div>
    
      
    <div class="exercise-card" id="qc-2-3">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">Knowledge Check</span>
          <span style="font-weight:600; font-size:0.9rem;">DbContext Lifetime</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">In a background worker service (\`BackgroundService\`), why should you NOT inject a scoped \`BooksContext\` directly into the background service's singleton constructor?</div>
        <div class="quiz-options" data-qid="qc-2-3">
          
        <div class="quiz-option" data-opt="0">
          <div class="option-indicator">A</div>
          <div class="option-text">Because EF Core will throw an exception during startup due to captive dependency (a singleton holding a scoped service).</div>
        </div>
        
        <div class="quiz-option" data-opt="1">
          <div class="option-indicator">B</div>
          <div class="option-text">Because background services are forbidden from executing SQL queries.</div>
        </div>
        
        <div class="quiz-option" data-opt="2">
          <div class="option-indicator">C</div>
          <div class="option-text">Because Npgsql requires an active HttpContext to parse connection strings.</div>
        </div>
        
        <div class="quiz-option" data-opt="3">
          <div class="option-indicator">D</div>
          <div class="option-text">Because PostgreSQL will terminate the application after 60 seconds of inactivity.</div>
        </div>
        
        </div>
        <div class="exercise-actions">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-2-3">Submit Answer</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-2-3" style="display:none;">Retry</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-2-3"></div>
      </div>
    </div>
    
      
    <div class="exercise-card" id="qc-2-4">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">Knowledge Check</span>
          <span style="font-weight:600; font-size:0.9rem;">DbContext Lifetime</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">What is the relationship between an active \`BooksContext\` instance and the underlying PostgreSQL database connection?</div>
        <div class="quiz-options" data-qid="qc-2-4">
          
        <div class="quiz-option" data-opt="0">
          <div class="option-indicator">A</div>
          <div class="option-text">A DbContext opens a permanent TCP connection on creation and maintains it until the operating system process exits.</div>
        </div>
        
        <div class="quiz-option" data-opt="1">
          <div class="option-indicator">B</div>
          <div class="option-text">A DbContext manages an underlying DbConnection (typically from an ADO.NET connection pool), opening it on demand for queries/saves and closing it when the operation or context completes.</div>
        </div>
        
        <div class="quiz-option" data-opt="2">
          <div class="option-indicator">C</div>
          <div class="option-text">DbContext bypasses ADO.NET connections entirely and writes directly to named pipes.</div>
        </div>
        
        <div class="quiz-option" data-opt="3">
          <div class="option-indicator">D</div>
          <div class="option-text">Each DbSet in a DbContext owns a separate physical database connection.</div>
        </div>
        
        </div>
        <div class="exercise-actions">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-2-4">Submit Answer</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-2-4" style="display:none;">Retry</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-2-4"></div>
      </div>
    </div>
    

      <div class="lesson-footer-nav">
        <button class="btn-secondary" onclick="switchLesson('lesson-1')">← Previous Lesson</button>
        <button class="btn-complete-lesson" data-lesson="lesson-2">Mark Lesson 2 Complete ✓</button>
        <button class="btn-primary" onclick="switchLesson('lesson-3')">Next: Entity States &amp; Change Tracker →</button>
      </div>
    `
  },
  {
    id: "lesson-3",
    badge: "03",
    nav: "Entity States & Tracking",
    content: `
      <div class="lesson-header-box">
        <div class="lesson-badge-top">Lesson 3 • Core Engine</div>
        <h1 class="lesson-title">Entity States and the Change Tracker</h1>
        <p class="lesson-subtitle">Mastering the 5 EntityStates, snapshot change detection, ChangeTracker.DebugView, and avoiding Update() pitfalls.</p>
      </div>

      <h2>1. The Five Principal Entity States</h2>
      <p>Every entity instance registered in a <code>DbContext</code> has an associated <code>EntityEntry</code> with an <code>EntityState</code> enum value:</p>

      <div class="states-grid">
        <div class="state-card border-detached">
          <div class="state-header"><span class="badge badge-detached">Detached</span></div>
          <div class="state-desc">The entity is not tracked by the context. It is a plain in-memory C# object. EF Core has no snapshot of its values, and <code>SaveChangesAsync()</code> completely ignores it.</div>
        </div>
        <div class="state-card border-unchanged">
          <div class="state-header"><span class="badge badge-unchanged">Unchanged</span></div>
          <div class="state-desc">The entity exists in PostgreSQL and was loaded by a query. Its current C# property values match the snapshot taken at query time. <code>SaveChangesAsync()</code> generates no SQL for it.</div>
        </div>
        <div class="state-card border-added">
          <div class="state-header"><span class="badge badge-added">Added</span></div>
          <div class="state-desc">The entity is tracked by the context but does not exist in the database yet. <code>SaveChangesAsync()</code> will generate an <code>INSERT</code> statement and assign any generated primary key.</div>
        </div>
        <div class="state-card border-modified">
          <div class="state-header"><span class="badge badge-modified">Modified</span></div>
          <div class="state-desc">The entity exists in PostgreSQL and one or more mapped properties have changed compared to the original snapshot. <code>SaveChangesAsync()</code> generates an <code>UPDATE</code> targeting the modified columns.</div>
        </div>
        <div class="state-card border-deleted">
          <div class="state-header"><span class="badge badge-deleted">Deleted</span></div>
          <div class="state-desc">The entity exists in PostgreSQL but has been marked for removal via <code>Remove()</code>. <code>SaveChangesAsync()</code> generates a <code>DELETE</code> statement.</div>
        </div>
      </div>

      <h2>2. Snapshot Change Tracking in Action</h2>
      <p>How does EF Core know that you changed a title from "Old Title" to "New Title"?</p>
      <p>When an entity is materialized from a tracking query, EF Core takes a private snapshot of all its scalar values. When <code>DetectChanges()</code> is called (which occurs automatically inside <code>SaveChangesAsync()</code>), EF Core iterates through all tracked entities and compares current object properties with the snapshot.</p>

      
    <div class="code-wrapper">
      <div class="code-header">
        <div class="code-badge-group">
          <span class="code-lang-tag">C#</span>
          <span class="code-filename">TrackingWalkthrough.cs</span>
          <span class="code-type-pill pill-complete example">[Complete Example]</span>
        </div>
        <button class="btn-copy" aria-label="Copy code">📋 Copy</button>
      </div>
      <pre><code class="language-c#">
// 1. Query entity: enters ChangeTracker as 'Unchanged' with snapshot taken
var book = await context.Books.FindAsync(42);
Console.WriteLine(context.Entry(book!).State); // Output: Unchanged

// 2. Mutate in C# memory
book!.Title = "Muqaddimah (Second Edition)";

// 3. Before DetectChanges runs, the ChangeTracker might still report Unchanged
// But calling DetectChanges explicitly forces the comparison:
context.ChangeTracker.DetectChanges();
Console.WriteLine(context.Entry(book).State); // Output: Modified
Console.WriteLine(context.Entry(book).Property(b =&gt; b.Title).IsModified); // Output: True
Console.WriteLine(context.Entry(book).Property(b =&gt; b.Summary).IsModified); // Output: False

// 4. Save changes
await context.SaveChangesAsync();

// 5. State resets to Unchanged because the database now matches C# memory!
Console.WriteLine(context.Entry(book).State); // Output: Unchanged
</code></pre>
      <div class="code-expl">Step-by-step demonstration of snapshot change tracking and state transitions before and after saving.</div>
    </div>
    

      <h2>3. Inspecting the Change Tracker Debug View</h2>
      <p>EF Core provides a built-in debugging tool called the <code>DebugView</code> on the Change Tracker. During local debugging, you can inspect:</p>

      
    <div class="code-wrapper">
      <div class="code-header">
        <div class="code-badge-group">
          <span class="code-lang-tag">C#</span>
          <span class="code-filename">DebugViewer.cs</span>
          <span class="code-type-pill pill-fragment">[Fragment]</span>
        </div>
        <button class="btn-copy" aria-label="Copy code">📋 Copy</button>
      </div>
      <pre><code class="language-c#">
// ShortView: Concise summary of all tracked entities and their states
Console.WriteLine(context.ChangeTracker.DebugView.ShortView);
// Example Output:
// Book {Id: 42} Modified

// LongView: Full breakdown of original vs current values for every property
Console.WriteLine(context.ChangeTracker.DebugView.LongView);
// Example Output:
// Book {Id: 42} Modified
//   Id: 42 PK
//   CoverUrl: 'cover.jpg'
//   PublishedYear: 2022
//   Summary: 'Classic text'
//   Title: 'Muqaddimah (Second Edition)' Originally 'Muqaddimah'
</code></pre>
      <div class="code-expl">ChangeTracker.DebugView provides human-readable diagnostics during debugging sessions.</div>
    </div>
    

      <h2>4. The Peril of \`context.Books.Update()\`</h2>
      <div class="callout callout-warning">
        <div class="callout-title">⚠️ Why Calling Update() is Often a Bug</div>
        <p>In disconnected scenarios (like an API receiving a DTO), developers often create a new entity instance and call <code>context.Books.Update(book)</code>. <strong>Beware:</strong> <code>Update()</code> marks <em>every single mapped property</em> on the entity as <code>Modified</code>! If your DTO omitted properties (like <code>CoverUrl</code> or <code>Summary</code>), C# will set them to <code>null</code> or <code>0</code>, and <code>Update()</code> will blindly overwrite valid database records with nulls!</p>
        <p>In contrast, loading the existing tracked entity and setting specific properties preserves unsupplied fields because snapshot change tracking only updates modified columns.</p>
      </div>

      <!-- INTERACTIVE SIMULATOR: Change Tracker Simulator -->
      <h2>5. Interactive Change-Tracker Simulator</h2>
      <p>Use this simulator to step through the entity state lifecycle. Watch how the EntityState, property snapshot, and generated PostgreSQL SQL change with each action.</p>

      <div class="simulator-box" id="tracker-simulator">
        <div class="simulator-header">
          <div class="simulator-title">⚡ Interactive Change-Tracker Simulator</div>
          <div class="simulator-controls">
            <button class="btn-sim" id="sim-btn-new">1. New Book (Detached)</button>
            <button class="btn-sim" id="sim-btn-add">2. context.Add()</button>
            <button class="btn-sim" id="sim-btn-query">3. Query Book (Unchanged)</button>
            <button class="btn-sim" id="sim-btn-mutate">4. Mutate Title</button>
            <button class="btn-sim" id="sim-btn-detect">5. DetectChanges()</button>
            <button class="btn-sim" id="sim-btn-remove">6. context.Remove()</button>
            <button class="btn-sim" id="sim-btn-save">7. SaveChangesAsync()</button>
            <button class="btn-sim btn-sim-reset" id="sim-btn-reset">↺ Reset</button>
          </div>
        </div>

        <div class="simulator-body">
          <div class="sim-grid">
            <div class="sim-panel">
              <div class="sim-panel-title">Tracked Entity State</div>
              <div class="sim-state-badge" id="sim-state-display">Detached</div>
              <div class="sim-prop-table-box">
                <table class="sim-table">
                  <thead>
                    <tr>
                      <th>Property</th>
                      <th>Snapshot (Original)</th>
                      <th>Current Value</th>
                      <th>IsModified</th>
                    </tr>
                  </thead>
                  <tbody id="sim-props-tbody">
                    <tr><td>Id</td><td>-</td><td>42</td><td>False</td></tr>
                    <tr><td>Title</td><td>-</td><td>"Raff Guide"</td><td>False</td></tr>
                    <tr><td>PublishedYear</td><td>-</td><td>2024</td><td>False</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="sim-panel">
              <div class="sim-panel-title">Pending Database Operation (PostgreSQL)</div>
              <div class="sim-sql-box" id="sim-sql-display">-- No pending database operation. Entity is Detached.</div>
              <div class="sim-commentary" id="sim-commentary">
                Click a button above to execute a simulated EF Core change tracking action.
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2>Lesson 3 Summary</h2>
      <ul>
        <li>The 5 <code>EntityState</code> values are <strong>Detached</strong>, <strong>Unchanged</strong>, <strong>Added</strong>, <strong>Modified</strong>, and <strong>Deleted</strong>.</li>
        <li><strong>Snapshot Change Tracking</strong> stores original values at materialization and compares them with current values during <code>DetectChanges()</code>.</li>
        <li>After <code>SaveChangesAsync()</code> succeeds, <code>Added</code> and <code>Modified</code> entities transition to <code>Unchanged</code>, while <code>Deleted</code> entities become <code>Detached</code>.</li>
        <li><code>Update()</code> marks all properties as modified; prefer mutating tracked entities loaded from queries.</li>
      </ul>

      <h2>Knowledge Checks</h2>
      
    <div class="exercise-card" id="qc-3-1">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">Knowledge Check</span>
          <span style="font-weight:600; font-size:0.9rem;">Entity States</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">A developer writes: \`var book = new Book { Title = "Raff Architecture" }; context.Books.Add(book);\`. What is the state of \`context.Entry(book).State\` immediately after this line?</div>
        <div class="quiz-options" data-qid="qc-3-1">
          
        <div class="quiz-option" data-opt="0">
          <div class="option-indicator">A</div>
          <div class="option-text">Detached</div>
        </div>
        
        <div class="quiz-option" data-opt="1">
          <div class="option-indicator">B</div>
          <div class="option-text">Unchanged</div>
        </div>
        
        <div class="quiz-option" data-opt="2">
          <div class="option-indicator">C</div>
          <div class="option-text">Added</div>
        </div>
        
        <div class="quiz-option" data-opt="3">
          <div class="option-indicator">D</div>
          <div class="option-text">Modified</div>
        </div>
        
        </div>
        <div class="exercise-actions">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-3-1">Submit Answer</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-3-1" style="display:none;">Retry</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-3-1"></div>
      </div>
    </div>
    
      
    <div class="exercise-card" id="qc-3-2">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">Knowledge Check</span>
          <span style="font-weight:600; font-size:0.9rem;">Snapshot Change Tracking</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">How does EF Core's default snapshot change tracking determine which columns of a tracked entity must be included in an UPDATE statement?</div>
        <div class="quiz-options" data-qid="qc-3-2">
          
        <div class="quiz-option" data-opt="0">
          <div class="option-indicator">A</div>
          <div class="option-text">It attaches runtime reflection proxies to every property getter and setter in C#.</div>
        </div>
        
        <div class="quiz-option" data-opt="1">
          <div class="option-indicator">B</div>
          <div class="option-text">It records a snapshot copy of all property values when the entity is queried; on DetectChanges(), it compares current property values against the snapshot.</div>
        </div>
        
        <div class="quiz-option" data-opt="2">
          <div class="option-indicator">C</div>
          <div class="option-text">It queries PostgreSQL to ask which columns have changed before saving.</div>
        </div>
        
        <div class="quiz-option" data-opt="3">
          <div class="option-indicator">D</div>
          <div class="option-text">It marks every column in the table as modified whenever any property setter is invoked.</div>
        </div>
        
        </div>
        <div class="exercise-actions">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-3-2">Submit Answer</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-3-2" style="display:none;">Retry</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-3-2"></div>
      </div>
    </div>
    
      
    <div class="exercise-card" id="qc-3-3">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">Knowledge Check</span>
          <span style="font-weight:600; font-size:0.9rem;">Entity States</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">What happens to the \`EntityState\` of a tracked entity whose state was \`Deleted\` after \`await context.SaveChangesAsync()\` executes successfully?</div>
        <div class="quiz-options" data-qid="qc-3-3">
          
        <div class="quiz-option" data-opt="0">
          <div class="option-indicator">A</div>
          <div class="option-text">It remains in the \`Deleted\` state in case the developer wants to undo the delete.</div>
        </div>
        
        <div class="quiz-option" data-opt="1">
          <div class="option-indicator">B</div>
          <div class="option-text">It transitions to the \`Detached\` state because the row no longer exists in the database.</div>
        </div>
        
        <div class="quiz-option" data-opt="2">
          <div class="option-indicator">C</div>
          <div class="option-text">It transitions to \`Unchanged\` with its primary key set to 0.</div>
        </div>
        
        <div class="quiz-option" data-opt="3">
          <div class="option-indicator">D</div>
          <div class="option-text">It causes the DbContext to immediately throw an \`InvalidOperationException\`.</div>
        </div>
        
        </div>
        <div class="exercise-actions">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-3-3">Submit Answer</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-3-3" style="display:none;">Retry</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-3-3"></div>
      </div>
    </div>
    
      
    <div class="exercise-card" id="qc-3-4">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">Knowledge Check</span>
          <span style="font-weight:600; font-size:0.9rem;">Update() Pitfalls</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">In Raff, why is calling \`context.Books.Update(disconnectedBook)\` dangerous if \`disconnectedBook\` was constructed from an incomplete JSON payload where \`PublishedYear\` was omitted (defaulting to 0)?</div>
        <div class="quiz-options" data-qid="qc-3-4">
          
        <div class="quiz-option" data-opt="0">
          <div class="option-indicator">A</div>
          <div class="option-text">Because Update() automatically deletes the entity if any property is 0.</div>
        </div>
        
        <div class="quiz-option" data-opt="1">
          <div class="option-indicator">B</div>
          <div class="option-text">Because Update() marks ALL mapped properties on the entity as \`Modified\`, overwriting \`PublishedYear\` in the database with 0 instead of keeping the existing database value.</div>
        </div>
        
        <div class="quiz-option" data-opt="2">
          <div class="option-indicator">C</div>
          <div class="option-text">Because Update() requires an active database transaction lock before executing.</div>
        </div>
        
        <div class="quiz-option" data-opt="3">
          <div class="option-indicator">D</div>
          <div class="option-text">Because Update() only works on entities that have an active navigation collection.</div>
        </div>
        
        </div>
        <div class="exercise-actions">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-3-4">Submit Answer</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-3-4" style="display:none;">Retry</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-3-4"></div>
      </div>
    </div>
    

      <div class="lesson-footer-nav">
        <button class="btn-secondary" onclick="switchLesson('lesson-2')">← Previous Lesson</button>
        <button class="btn-complete-lesson" data-lesson="lesson-3">Mark Lesson 3 Complete ✓</button>
        <button class="btn-primary" onclick="switchLesson('lesson-4')">Next: Tracking vs. No-Tracking →</button>
      </div>
    `
  },
  {
    id: "lesson-4",
    badge: "04",
    nav: "Tracking vs. No-Tracking",
    content: `
      <div class="lesson-header-box">
        <div class="lesson-badge-top">Lesson 4</div>
        <h1 class="lesson-title">Tracking, No-Tracking, and Entity Identity</h1>
        <p class="lesson-subtitle">Optimizing read-only performance with AsNoTracking(), understanding the Identity Map, and comparing FindAsync with FirstOrDefaultAsync.</p>
      </div>

      <h2>1. The Cost of Tracking Queries</h2>
      <p>By default, all queries returning entity types are <strong>tracking queries</strong>. For every entity materialized, EF Core must:</p>
      <ol>
        <li>Create the in-memory entity instance on the heap.</li>
        <li>Allocate an internal <code>EntityEntry</code> object inside the <code>ChangeTracker</code>.</li>
        <li>Allocate a <strong>snapshot array</strong> to store a duplicate copy of all original property values.</li>
        <li>Register the entity's primary key in the context's internal <strong>Identity Map</strong>.</li>
      </ol>
      <p>For a GET endpoint in Raff that returns 500 books to a client, all this tracking overhead is wasted if the endpoint simply serializes the books to JSON and finishes the HTTP request!</p>

      <h2>2. Disabling Tracking with \`AsNoTracking()\`</h2>
      <p>Using <code>.AsNoTracking()</code> tells EF Core to skip snapshot allocations and identity map registrations. Entities are materialized as plain detached C# objects:</p>

      
    <div class="code-wrapper">
      <div class="code-header">
        <div class="code-badge-group">
          <span class="code-lang-tag">C#</span>
          <span class="code-filename">Controllers/BooksController.cs</span>
          <span class="code-type-pill pill-complete example">[Complete Example]</span>
        </div>
        <button class="btn-copy" aria-label="Copy code">📋 Copy</button>
      </div>
      <pre><code class="language-c#">
[HttpGet]
public async Task&lt;ActionResult&lt;IEnumerable&lt;BookDto&gt;&gt;&gt; GetBooks()
{
    // High-performance read-only query
    var books = await _context.Books
        .AsNoTracking()
        .Select(b =&gt; new BookDto(b.Id, b.Title, b.PublishedYear))
        .ToListAsync();

    return Ok(books);
}
</code></pre>
      <div class="code-expl">AsNoTracking avoids registering entities in the Change Tracker, maximizing throughput for read endpoints.</div>
    </div>
    

      <h2>3. The Identity Map &amp; \`FindAsync()\` vs. \`FirstOrDefaultAsync()\`</h2>
      <p>One of the most important distinctions in EF Core is how <code>FindAsync()</code> operates compared to <code>FirstOrDefaultAsync()</code>:</p>

      <div class="grid-2">
        <div class="content-panel">
          <h3 style="color:var(--accent-light);">🔑 context.Books.FindAsync(id)</h3>
          <ul>
            <li>First checks the <strong>local ChangeTracker Identity Map</strong> in memory.</li>
            <li>If an entity with the specified primary key is already tracked, it returns that in-memory instance <strong>immediately with 0 database roundtrips</strong>!</li>
            <li>If not found in memory, it issues a parameterized SQL query: <code>SELECT ... WHERE "Id" = @p0 LIMIT 1</code>.</li>
            <li>Can only search by Primary Key.</li>
          </ul>
        </div>
        <div class="content-panel">
          <h3 style="color:var(--warning);">🌐 context.Books.FirstOrDefaultAsync(b => b.Id == id)</h3>
          <ul>
            <li><strong>Always compiles and executes a SQL query</strong> against PostgreSQL, even if the entity is already in memory!</li>
            <li>If the entity is already tracked, EF Core resolves the identity and updates the tracked instance with database values, but the network roundtrip still occurred.</li>
            <li>Allows arbitrary predicate expressions beyond primary keys.</li>
          </ul>
        </div>
      </div>

      <h2>4. \`AsNoTrackingWithIdentityResolution()\`</h2>
      <p>What happens when a query joins tables where the same entity appears multiple times (for instance, an Author with 5 Books)?</p>
      <ul>
        <li>With plain <code>AsNoTracking()</code>: EF Core will instantiate 5 separate duplicate <code>Author</code> objects in C# memory for each book!</li>
        <li>With <code>AsNoTrackingWithIdentityResolution()</code>: EF Core uses a lightweight temporary identity map during query materialization to ensure all 5 books point to the exact same <code>Author</code> instance in memory, while still avoiding change tracking.</li>
      </ul>

      <h2>Lesson 4 Summary</h2>
      <ul>
        <li>Tracking queries allocate snapshot arrays and register entities in the Identity Map.</li>
        <li><code>AsNoTracking()</code> bypasses tracking overhead, saving memory and CPU on read-only queries.</li>
        <li>Never use <code>AsNoTracking()</code> if you plan to modify the entity and call <code>SaveChangesAsync()</code>.</li>
        <li><code>FindAsync(id)</code> looks in the local change tracker first, avoiding network roundtrips for already tracked records.</li>
      </ul>

      <h2>Knowledge Checks</h2>
      
    <div class="exercise-card" id="qc-4-1">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">Knowledge Check</span>
          <span style="font-weight:600; font-size:0.9rem;">No-Tracking Queries</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">Why is \`context.Books.AsNoTracking().ToListAsync()\` recommended for read-only GET endpoints in Raff?</div>
        <div class="quiz-options" data-qid="qc-4-1">
          
        <div class="quiz-option" data-opt="0">
          <div class="option-indicator">A</div>
          <div class="option-text">Because it disables SQL encryption, making data transfer across the network instantaneous.</div>
        </div>
        
        <div class="quiz-option" data-opt="1">
          <div class="option-indicator">B</div>
          <div class="option-text">Because EF Core does not allocate snapshot copies or register entities in the change tracker, significantly reducing memory consumption and CPU overhead.</div>
        </div>
        
        <div class="quiz-option" data-opt="2">
          <div class="option-indicator">C</div>
          <div class="option-text">Because it forces PostgreSQL to bypass disk storage and read directly from RAM.</div>
        </div>
        
        <div class="quiz-option" data-opt="3">
          <div class="option-indicator">D</div>
          <div class="option-text">Because it allows the client to modify database records without calling SaveChangesAsync.</div>
        </div>
        
        </div>
        <div class="exercise-actions">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-4-1">Submit Answer</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-4-1" style="display:none;">Retry</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-4-1"></div>
      </div>
    </div>
    
      
    <div class="exercise-card" id="qc-4-2">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">Knowledge Check</span>
          <span style="font-weight:600; font-size:0.9rem;">Identity Resolution</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">Suppose Book #42 was already loaded into \`BooksContext\` by an earlier operation. How does \`await context.Books.FindAsync(42)\` behave compared to \`await context.Books.FirstOrDefaultAsync(b =&gt; b.Id == 42)\`?</div>
        <div class="quiz-options" data-qid="qc-4-2">
          
        <div class="quiz-option" data-opt="0">
          <div class="option-indicator">A</div>
          <div class="option-text">\`FindAsync(42)\` checks the local Change Tracker identity map first and returns the existing instance immediately without issuing SQL; \`FirstOrDefaultAsync\` always sends a query to PostgreSQL.</div>
        </div>
        
        <div class="quiz-option" data-opt="1">
          <div class="option-indicator">B</div>
          <div class="option-text">Both methods always issue an identical SQL query across the network.</div>
        </div>
        
        <div class="quiz-option" data-opt="2">
          <div class="option-indicator">C</div>
          <div class="option-text">\`FindAsync(42)\` requires an explicit primary key constraint in C#, while \`FirstOrDefaultAsync\` creates a new database table.</div>
        </div>
        
        <div class="quiz-option" data-opt="3">
          <div class="option-indicator">D</div>
          <div class="option-text">\`FirstOrDefaultAsync\` returns null if the entity is already in memory.</div>
        </div>
        
        </div>
        <div class="exercise-actions">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-4-2">Submit Answer</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-4-2" style="display:none;">Retry</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-4-2"></div>
      </div>
    </div>
    
      
    <div class="exercise-card" id="qc-4-3">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">Knowledge Check</span>
          <span style="font-weight:600; font-size:0.9rem;">No-Tracking Identity Resolution</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">What is the specific purpose of \`AsNoTrackingWithIdentityResolution()\`?</div>
        <div class="quiz-options" data-qid="qc-4-3">
          
        <div class="quiz-option" data-opt="0">
          <div class="option-indicator">A</div>
          <div class="option-text">It turns on full change tracking but disables SQL generation.</div>
        </div>
        
        <div class="quiz-option" data-opt="1">
          <div class="option-indicator">B</div>
          <div class="option-text">It returns untracked entities for performance, but ensures that if the same database row appears multiple times within a single query result graph, only one C# instance is created.</div>
        </div>
        
        <div class="quiz-option" data-opt="2">
          <div class="option-indicator">C</div>
          <div class="option-text">It guarantees that client updates are automatically committed to PostgreSQL without calling SaveChangesAsync.</div>
        </div>
        
        <div class="quiz-option" data-opt="3">
          <div class="option-indicator">D</div>
          <div class="option-text">It verifies that all foreign keys in the database are indexed.</div>
        </div>
        
        </div>
        <div class="exercise-actions">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-4-3">Submit Answer</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-4-3" style="display:none;">Retry</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-4-3"></div>
      </div>
    </div>
    
      
    <div class="exercise-card" id="qc-4-4">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">Knowledge Check</span>
          <span style="font-weight:600; font-size:0.9rem;">Tracking Trade-offs</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">A developer claims: 'We should use \`AsNoTracking()\` on every single query in our entire application without exception.' Why is this claim incorrect?</div>
        <div class="quiz-options" data-qid="qc-4-4">
          
        <div class="quiz-option" data-opt="0">
          <div class="option-indicator">A</div>
          <div class="option-text">Because \`AsNoTracking()\` is deprecated in modern EF Core.</div>
        </div>
        
        <div class="quiz-option" data-opt="1">
          <div class="option-indicator">B</div>
          <div class="option-text">Because when you retrieve an entity with \`AsNoTracking()\`, modifying its properties and calling \`SaveChangesAsync()\` will do nothing, because EF Core is not tracking the entity.</div>
        </div>
        
        <div class="quiz-option" data-opt="2">
          <div class="option-indicator">C</div>
          <div class="option-text">Because PostgreSQL refuses connections that use \`AsNoTracking()\`.</div>
        </div>
        
        <div class="quiz-option" data-opt="3">
          <div class="option-indicator">D</div>
          <div class="option-text">Because no-tracking queries cannot use LINQ \`.Where()\` filters.</div>
        </div>
        
        </div>
        <div class="exercise-actions">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-4-4">Submit Answer</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-4-4" style="display:none;">Retry</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-4-4"></div>
      </div>
    </div>
    

      <div class="lesson-footer-nav">
        <button class="btn-secondary" onclick="switchLesson('lesson-3')">← Previous Lesson</button>
        <button class="btn-complete-lesson" data-lesson="lesson-4">Mark Lesson 4 Complete ✓</button>
        <button class="btn-primary" onclick="switchLesson('lesson-5')">Next: SaveChanges &amp; Generated SQL →</button>
      </div>
    `
  },
  {
    id: "lesson-5",
    badge: "05",
    nav: "SaveChanges & Generated SQL",
    content: `
      <div class="lesson-header-box">
        <div class="lesson-badge-top">Lesson 5</div>
        <h1 class="lesson-title">SaveChanges, CRUD Transitions &amp; Generated SQL</h1>
        <p class="lesson-subtitle">Demystifying what happens when SaveChangesAsync executes, return value semantics, transactions, and concurrency exceptions.</p>
      </div>

      <h2>1. The Execution Boundary of SaveChangesAsync</h2>
      <p>Until you call <code>SaveChangesAsync()</code>, all additions, modifications, and removals exist purely in C# heap memory. When <code>SaveChangesAsync()</code> is invoked, EF Core executes the following sequence:</p>

      <div class="steps-container">
        <div class="step-item">
          <div class="step-num">1</div>
          <div class="step-text"><strong>Detect Changes:</strong> Compares current entity properties against original snapshots to identify modified properties.</div>
        </div>
        <div class="step-item">
          <div class="step-num">2</div>
          <div class="step-text"><strong>Generate SQL:</strong> Constructs parameterized SQL commands for all <code>Added</code>, <code>Modified</code>, and <code>Deleted</code> entities.</div>
        </div>
        <div class="step-item">
          <div class="step-num">3</div>
          <div class="step-text"><strong>Open Transaction:</strong> Starts an implicit database transaction on the connection (if one is not already open).</div>
        </div>
        <div class="step-item">
          <div class="step-num">4</div>
          <div class="step-text"><strong>Execute Batch:</strong> Sends the batch of commands across the network to PostgreSQL via Npgsql.</div>
        </div>
        <div class="step-item">
          <div class="step-num">5</div>
          <div class="step-text"><strong>Read Generated Keys:</strong> For <code>INSERT</code> statements, reads back database-generated keys (e.g. via PostgreSQL <code>RETURNING "Id"</code>) and populates the C# entity properties.</div>
        </div>
        <div class="step-item">
          <div class="step-num">6</div>
          <div class="step-text"><strong>Reset States:</strong> Commits the transaction and transitions <code>Added</code>/<code>Modified</code> entities to <code>Unchanged</code>, and <code>Deleted</code> entities to <code>Detached</code>.</div>
        </div>
      </div>

      <h2>2. What Does the Return Value Mean?</h2>
      <div class="callout callout-info">
        <div class="callout-title">💡 The Return Value is an Integer Count of Affected Rows</div>
        <p><code>int affectedRows = await context.SaveChangesAsync();</code></p>
        <p>The integer returned by <code>SaveChangesAsync()</code> is the <strong>total number of state entries written to the database</strong>. It does <em>not</em> return an ID, and it does <em>not</em> indicate whether an item was found during a prior query.</p>
        <p>If you modified 1 book and added 2 authors, <code>SaveChangesAsync()</code> returns <code>3</code>.</p>
      </div>

      <h2>3. Concurrency Exceptions: When 0 Rows Are Affected</h2>
      <p>When EF Core updates or deletes a tracked entity, it appends a predicate to ensure the row actually exists in the database:</p>
      <code>UPDATE "Books" SET "Title" = @p0 WHERE "Id" = @p1;</code>
      <p>EF Core expects this command to affect exactly 1 row. What happens if another user deleted book #42 from PostgreSQL ten seconds ago?</p>
      <p>The command affects <strong>0 rows</strong>. When EF Core detects that 0 rows were updated or deleted, it immediately throws:</p>
      <code>Microsoft.EntityFrameworkCore.DbUpdateConcurrencyException: Database operation expected to affect 1 row(s) but actually affected 0 row(s).</code>

      
    <div class="code-wrapper">
      <div class="code-header">
        <div class="code-badge-group">
          <span class="code-lang-tag">C#</span>
          <span class="code-filename">Services/BookService.cs</span>
          <span class="code-type-pill pill-complete example">[Complete Example]</span>
        </div>
        <button class="btn-copy" aria-label="Copy code">📋 Copy</button>
      </div>
      <pre><code class="language-c#">
public async Task&lt;bool&gt; UpdateBookTitleAsync(int id, string newTitle)
{
    var book = await _context.Books.FindAsync(id);
    if (book is null) return false;

    book.Title = newTitle;

    try
    {
        await _context.SaveChangesAsync();
        return true;
    }
    catch (DbUpdateConcurrencyException)
    {
        // Handle concurrent delete or concurrency token mismatch
        return false;
    }
}
</code></pre>
      <div class="code-expl">Proper exception handling around SaveChangesAsync for concurrency conflicts.</div>
    </div>
    

      <h2>4. Implicit Atomic Transactions</h2>
      <p>In relational providers like Npgsql for PostgreSQL, <code>SaveChangesAsync()</code> automatically wraps all generated SQL commands inside a single atomic transaction. If you insert 5 books and the 5th book violates a unique title constraint, PostgreSQL rolls back the entire transaction. None of the books are committed!</p>

      <h2>Lesson 5 Summary</h2>
      <ul>
        <li><code>SaveChangesAsync()</code> is the execution boundary where in-memory state transitions turn into SQL.</li>
        <li>The return value is the total count of rows affected across all operations.</li>
        <li>If an UPDATE or DELETE affects 0 rows, EF Core throws <code>DbUpdateConcurrencyException</code>.</li>
        <li>All operations in a single <code>SaveChangesAsync()</code> call execute within an atomic transaction.</li>
      </ul>

      <h2>Knowledge Checks</h2>
      
    <div class="exercise-card" id="qc-5-1">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">Knowledge Check</span>
          <span style="font-weight:600; font-size:0.9rem;">SaveChangesAsync Semantics</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">What does the integer return value of \`await context.SaveChangesAsync()\` represent?</div>
        <div class="quiz-options" data-qid="qc-5-1">
          
        <div class="quiz-option" data-opt="0">
          <div class="option-indicator">A</div>
          <div class="option-text">The database primary key ID of the most recently inserted entity.</div>
        </div>
        
        <div class="quiz-option" data-opt="1">
          <div class="option-indicator">B</div>
          <div class="option-text">A boolean flag where 1 means the targeted book was found and 0 means not found.</div>
        </div>
        
        <div class="quiz-option" data-opt="2">
          <div class="option-indicator">C</div>
          <div class="option-text">The total number of state entries written to the database (rows affected by INSERT, UPDATE, and DELETE statements).</div>
        </div>
        
        <div class="quiz-option" data-opt="3">
          <div class="option-indicator">D</div>
          <div class="option-text">The number of milliseconds PostgreSQL took to execute the transaction.</div>
        </div>
        
        </div>
        <div class="exercise-actions">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-5-1">Submit Answer</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-5-1" style="display:none;">Retry</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-5-1"></div>
      </div>
    </div>
    
      
    <div class="exercise-card" id="qc-5-2">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">Knowledge Check</span>
          <span style="font-weight:600; font-size:0.9rem;">Concurrency Exceptions</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">When \`SaveChangesAsync()\` executes an UPDATE statement for an entity, what causes EF Core to throw a \`DbUpdateConcurrencyException\`?</div>
        <div class="quiz-options" data-qid="qc-5-2">
          
        <div class="quiz-option" data-opt="0">
          <div class="option-indicator">A</div>
          <div class="option-text">PostgreSQL rejected the user's password.</div>
        </div>
        
        <div class="quiz-option" data-opt="1">
          <div class="option-indicator">B</div>
          <div class="option-text">The UPDATE statement affected 0 rows (e.g. the row was deleted in PostgreSQL by another process after it was queried).</div>
        </div>
        
        <div class="quiz-option" data-opt="2">
          <div class="option-indicator">C</div>
          <div class="option-text">The entity had more than 5 modified properties.</div>
        </div>
        
        <div class="quiz-option" data-opt="3">
          <div class="option-indicator">D</div>
          <div class="option-text">A second DbContext was created on another machine.</div>
        </div>
        
        </div>
        <div class="exercise-actions">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-5-2">Submit Answer</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-5-2" style="display:none;">Retry</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-5-2"></div>
      </div>
    </div>
    
      
    <div class="exercise-card" id="qc-5-3">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">Knowledge Check</span>
          <span style="font-weight:600; font-size:0.9rem;">Transaction Boundary</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">If \`SaveChangesAsync()\` needs to insert 2 new books and update 1 existing book, how does EF Core manage database transactions by default?</div>
        <div class="quiz-options" data-qid="qc-5-3">
          
        <div class="quiz-option" data-opt="0">
          <div class="option-indicator">A</div>
          <div class="option-text">Each statement is executed in an isolated, independent transaction that commits sequentially.</div>
        </div>
        
        <div class="quiz-option" data-opt="1">
          <div class="option-indicator">B</div>
          <div class="option-text">EF Core wraps all operations in a single atomic transaction; if any single statement fails, the entire batch is rolled back.</div>
        </div>
        
        <div class="quiz-option" data-opt="2">
          <div class="option-indicator">C</div>
          <div class="option-text">EF Core never uses transactions unless the developer calls \`context.Database.BeginTransaction()\`.</div>
        </div>
        
        <div class="quiz-option" data-opt="3">
          <div class="option-indicator">D</div>
          <div class="option-text">PostgreSQL automatically commits each row every 10 milliseconds regardless of EF Core.</div>
        </div>
        
        </div>
        <div class="exercise-actions">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-5-3">Submit Answer</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-5-3" style="display:none;">Retry</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-5-3"></div>
      </div>
    </div>
    
      
    <div class="exercise-card" id="qc-5-4">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">Knowledge Check</span>
          <span style="font-weight:600; font-size:0.9rem;">Remove() Execution</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">A developer writes: \`context.Books.Remove(book);\`. Does this immediately delete the row from PostgreSQL?</div>
        <div class="quiz-options" data-qid="qc-5-4">
          
        <div class="quiz-option" data-opt="0">
          <div class="option-indicator">A</div>
          <div class="option-text">Yes, Remove() executes an immediate SQL \`DELETE\` query over the network.</div>
        </div>
        
        <div class="quiz-option" data-opt="1">
          <div class="option-indicator">B</div>
          <div class="option-text">No, Remove() merely transitions the entity state in the local Change Tracker to \`Deleted\`; the SQL \`DELETE\` is not sent until \`SaveChangesAsync()\` is awaited.</div>
        </div>
        
        <div class="quiz-option" data-opt="2">
          <div class="option-indicator">C</div>
          <div class="option-text">Yes, but only if auto-commit is enabled in Npgsql.</div>
        </div>
        
        <div class="quiz-option" data-opt="3">
          <div class="option-indicator">D</div>
          <div class="option-text">No, Remove() only removes the entity from in-memory C# lists and never touches the database.</div>
        </div>
        
        </div>
        <div class="exercise-actions">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-5-4">Submit Answer</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-5-4" style="display:none;">Retry</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-5-4"></div>
      </div>
    </div>
    

      <div class="lesson-footer-nav">
        <button class="btn-secondary" onclick="switchLesson('lesson-4')">← Previous Lesson</button>
        <button class="btn-complete-lesson" data-lesson="lesson-5">Mark Lesson 5 Complete ✓</button>
        <button class="btn-primary" onclick="switchLesson('lesson-6')">Next: LINQ &amp; Query Execution →</button>
      </div>
    `
  },
  {
    id: "lesson-6",
    badge: "06",
    nav: "LINQ & Query Execution",
    content: `
      <div class="lesson-header-box">
        <div class="lesson-badge-top">Lesson 6 • Query Engine</div>
        <h1 class="lesson-title">LINQ, IQueryable, IEnumerable &amp; Query Execution</h1>
        <p class="lesson-subtitle">Understanding expression trees, deferred execution, terminal async operators, and avoiding the catastrophic client-evaluation anti-pattern.</p>
      </div>

      <h2>1. Query Composition vs. Query Execution</h2>
      <p>LINQ queries against a <code>DbSet&lt;T&gt;</code> are represented by the <code>IQueryable&lt;T&gt;</code> interface. An <code>IQueryable</code> is not a list of results; it is an <strong>expression tree</strong>—an abstract syntax tree representing the logic of your query.</p>

      
    <div class="code-wrapper">
      <div class="code-header">
        <div class="code-badge-group">
          <span class="code-lang-tag">C#</span>
          <span class="code-filename">QueryComposition.cs</span>
          <span class="code-type-pill pill-complete example">[Complete Example]</span>
        </div>
        <button class="btn-copy" aria-label="Copy code">📋 Copy</button>
      </div>
      <pre><code class="language-c#">
// At this point, ZERO SQL has been executed. No network packets have been sent.
var query = context.Books
    .Where(b =&gt; b.PublishedYear &gt;= 2020)
    .OrderBy(b =&gt; b.Title);

// Adding more filters dynamically: still ZERO database interaction!
if (!string.IsNullOrEmpty(keyword))
{
    query = query.Where(b =&gt; b.Title.Contains(keyword));
}

// TERMINAL OPERATOR: This triggers the SQL translation and network execution!
var books = await query.ToListAsync();
</code></pre>
      <div class="code-expl">Demonstrating deferred execution: queries are composed in memory as expression trees and executed only when consumed by an async terminal operator.</div>
    </div>
    

      <h2>2. Terminal Async Operators</h2>
      <p>Execution only occurs when a terminal operator consumes the <code>IQueryable</code>. Modern EF Core provides asynchronous counterparts for all execution triggers:</p>
      <table class="concept-table">
        <thead>
          <tr><th>Terminal Operator</th><th>Generated SQL Equivalent</th><th>Return Type</th></tr>
        </thead>
        <tbody>
          <tr><td><code>await query.ToListAsync()</code></td><td><code>SELECT ...</code></td><td><code>List&lt;T&gt;</code></td></tr>
          <tr><td><code>await query.FirstOrDefaultAsync()</code></td><td><code>SELECT ... LIMIT 1</code></td><td><code>T?</code></td></tr>
          <tr><td><code>await query.SingleAsync()</code></td><td><code>SELECT ... LIMIT 2</code> (checks exactly 1)</td><td><code>T</code></td></tr>
          <tr><td><code>await query.CountAsync()</code></td><td><code>SELECT COUNT(*) FROM ...</code></td><td><code>int</code></td></tr>
          <tr><td><code>await query.AnyAsync()</code></td><td><code>SELECT EXISTS(...)</code></td><td><code>bool</code></td></tr>
        </tbody>
      </table>

      <h2>3. The Disastrous Client-Side Evaluation Anti-Pattern</h2>
      <div class="callout callout-danger">
        <div class="callout-title">🚨 The Memory Disaster: Premature Materialization</div>
        <p>Examine the catastrophic difference between filtering on <code>IQueryable</code> vs. filtering after <code>ToListAsync()</code>:</p>
      </div>

      <div class="grid-2">
        <div class="content-panel">
          <h3 style="color:var(--success);">✅ Server-Side Evaluation (Fast &amp; Scalable)</h3>
          
    <div class="code-wrapper">
      <div class="code-header">
        <div class="code-badge-group">
          <span class="code-lang-tag">C#</span>
          <span class="code-filename">GoodQuery.cs</span>
          <span class="code-type-pill pill-fragment">[Fragment]</span>
        </div>
        <button class="btn-copy" aria-label="Copy code">📋 Copy</button>
      </div>
      <pre><code class="language-c#">
var books = await context.Books
    .Where(b =&gt; b.PublishedYear &gt;= 2020)
    .ToListAsync();
</code></pre>
      <div class="code-expl">WHERE clause translates to PostgreSQL: only matching rows traverse the network.</div>
    </div>
    
          <p><strong>PostgreSQL executes:</strong></p>
          <code>SELECT "b"."Id", "b"."Title", ... FROM "Books" AS "b" WHERE "b"."PublishedYear" &gt;= 2020;</code>
          <p>If the table has 1,000,000 rows and 50 match, only 50 rows are sent over the network.</p>
        </div>

        <div class="content-panel">
          <h3 style="color:var(--danger);">❌ Client-Side Materialization (Catastrophic)</h3>
          
    <div class="code-wrapper">
      <div class="code-header">
        <div class="code-badge-group">
          <span class="code-lang-tag">C#</span>
          <span class="code-filename">BadQuery.cs</span>
          <span class="code-type-pill pill-anti-pattern">[Anti-Pattern]</span>
        </div>
        <button class="btn-copy" aria-label="Copy code">📋 Copy</button>
      </div>
      <pre><code class="language-c#">
var allBooks = await context.Books.ToListAsync();
var books = allBooks
    .Where(b =&gt; b.PublishedYear &gt;= 2020)
    .ToList();
</code></pre>
      <div class="code-expl">Fetches ALL rows into web server memory before filtering with LINQ-to-Objects!</div>
    </div>
    
          <p><strong>PostgreSQL executes:</strong></p>
          <code>SELECT "b"."Id", "b"."Title", ... FROM "Books" AS "b";</code>
          <p>All 1,000,000 rows are transferred over the network, materialized into objects, and loaded into RAM. The server will experience massive GC pauses or run out of memory!</p>
        </div>
      </div>

      <!-- INTERACTIVE QUERY PIPELINE PLAYGROUND -->
      <h2>4. Interactive Query Pipeline Playground</h2>
      <p>Experiment with this live query-building playground using sample Arabic literature from the Raff database. Toggle filters, projections, and client-side boundaries to see how EF Core evaluates server vs. client operations and generates PostgreSQL SQL.</p>

      <div class="simulator-box" id="query-playground">
        <div class="simulator-header">
          <div class="simulator-title">🧪 Interactive LINQ Query Pipeline Playground</div>
          <div class="simulator-controls">
            <label style="color:var(--text-primary); font-size:0.85rem;">
              Filter Year:
              <select id="play-filter-year" class="sim-select">
                <option value="all">All Years</option>
                <option value="modern">&gt;= 1950</option>
                <option value="contemporary">&gt;= 2000</option>
                <option value="classic">&lt; 1950</option>
              </select>
            </label>
            <label style="color:var(--text-primary); font-size:0.85rem;">
              Order By:
              <select id="play-order-by" class="sim-select">
                <option value="title_asc">Title (Ascending)</option>
                <option value="year_desc">Year (Descending)</option>
              </select>
            </label>
            <label style="color:var(--text-primary); font-size:0.85rem;">
              Projection:
              <select id="play-projection" class="sim-select">
                <option value="all">All Columns (Full Entity)</option>
                <option value="dto">DTO (Id, Title, Year only)</option>
              </select>
            </label>
            <label style="color:var(--text-primary); font-size:0.85rem;">
              Client Memory Filter:
              <select id="play-client-filter" class="sim-select">
                <option value="none">None (Server Only)</option>
                <option value="client_search">In-Memory Search after ToListAsync</option>
              </select>
            </label>
            <button class="btn-primary" id="play-btn-run" style="padding:0.4rem 1rem;">▶ Execute Query</button>
          </div>
        </div>

        <div class="simulator-body">
          <div class="sim-grid">
            <div class="sim-panel">
              <div class="sim-panel-title">Pipeline Stages &amp; Evaluation Mode</div>
              <div id="play-pipeline-badges" style="display:flex; flex-wrap:wrap; gap:0.5rem; margin-bottom:1rem;">
                <span class="badge badge-server">Server: IQueryable.Where()</span>
                <span class="badge badge-server">Server: IQueryable.OrderBy()</span>
                <span class="badge badge-execution">Terminal: await ToListAsync()</span>
              </div>
              <div class="sim-panel-title">Generated PostgreSQL SQL (Simulated ToQueryString)</div>
              <div class="sim-sql-box" id="play-sql-box">SELECT "b"."Id", "b"."Title", "b"."PublishedYear", "b"."Summary", "b"."CoverUrl" FROM "Books" AS "b" ORDER BY "b"."Title";</div>
            </div>

            <div class="sim-panel">
              <div class="sim-panel-title">Materialized Result Table (<span id="play-result-count">6</span> rows)</div>
              <div class="sim-prop-table-box" style="max-height:220px; overflow-y:auto;">
                <table class="sim-table">
                  <thead>
                    <tr id="play-table-head">
                      <th>Id</th>
                      <th>Title</th>
                      <th>Year</th>
                      <th>Summary</th>
                    </tr>
                  </thead>
                  <tbody id="play-table-body">
                    <!-- Populated by JS -->
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2>Lesson 6 Summary</h2>
      <ul>
        <li><code>IQueryable&lt;T&gt;</code> represents unexecuted expression trees; queries are evaluated only when consumed by terminal async operators.</li>
        <li>Terminal operators include <code>ToListAsync()</code>, <code>FirstOrDefaultAsync()</code>, <code>CountAsync()</code>, and <code>AnyAsync()</code>.</li>
        <li>Never call <code>ToListAsync()</code> before applying filters or pagination; premature materialization pulls entire tables into RAM.</li>
        <li><code>AsEnumerable()</code> defines the boundary between server-side SQL translation and client-side LINQ-to-Objects evaluation.</li>
      </ul>

      <h2>Knowledge Checks</h2>
      
    <div class="exercise-card" id="qc-6-1">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">Knowledge Check</span>
          <span style="font-weight:600; font-size:0.9rem;">Deferred Execution</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">Examine this code:<br>\`\`\`csharp<br>var query = context.Books.Where(b =&gt; b.PublishedYear &gt;= 2020);<br>query = query.OrderBy(b =&gt; b.Title);<br>\`\`\`<br>How many SQL queries have been sent to PostgreSQL after executing these two lines?</div>
        <div class="quiz-options" data-qid="qc-6-1">
          
        <div class="quiz-option" data-opt="0">
          <div class="option-indicator">A</div>
          <div class="option-text">Two SQL queries (one for WHERE, one for ORDER BY).</div>
        </div>
        
        <div class="quiz-option" data-opt="1">
          <div class="option-indicator">B</div>
          <div class="option-text">One SQL query combining both clauses.</div>
        </div>
        
        <div class="quiz-option" data-opt="2">
          <div class="option-indicator">C</div>
          <div class="option-text">Zero SQL queries, because LINQ queries on \`IQueryable\` use deferred execution and are only executed when consumed by a terminal operator.</div>
        </div>
        
        <div class="quiz-option" data-opt="3">
          <div class="option-indicator">D</div>
          <div class="option-text">It depends on whether Kestrel is running in Development mode.</div>
        </div>
        
        </div>
        <div class="exercise-actions">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-6-1">Submit Answer</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-6-1" style="display:none;">Retry</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-6-1"></div>
      </div>
    </div>
    
      
    <div class="exercise-card" id="qc-6-2">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">Knowledge Check</span>
          <span style="font-weight:600; font-size:0.9rem;">Client vs Server Evaluation</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">Compare Pattern A and Pattern B:<br>\`\`\`csharp<br>// Pattern A<br>var books = await context.Books<br>    .Where(b =&gt; b.PublishedYear &gt;= 2020)<br>    .ToListAsync();<br><br>// Pattern B<br>var allBooks = await context.Books.ToListAsync();<br>var books = allBooks.Where(b =&gt; b.PublishedYear &gt;= 2020).ToList();<br>\`\`\`<br>What is the critical performance difference?</div>
        <div class="quiz-options" data-qid="qc-6-2">
          
        <div class="quiz-option" data-opt="0">
          <div class="option-indicator">A</div>
          <div class="option-text">Pattern A filters rows on the PostgreSQL server, returning only matching rows; Pattern B fetches ALL rows in the entire table into web server memory before filtering with LINQ-to-Objects.</div>
        </div>
        
        <div class="quiz-option" data-opt="1">
          <div class="option-indicator">B</div>
          <div class="option-text">Pattern B is faster because memory filtering in C# is always faster than database indexes.</div>
        </div>
        
        <div class="quiz-option" data-opt="2">
          <div class="option-indicator">C</div>
          <div class="option-text">Both patterns generate identical SQL queries on PostgreSQL.</div>
        </div>
        
        <div class="quiz-option" data-opt="3">
          <div class="option-indicator">D</div>
          <div class="option-text">Pattern A causes an out-of-memory exception in PostgreSQL.</div>
        </div>
        
        </div>
        <div class="exercise-actions">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-6-2">Submit Answer</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-6-2" style="display:none;">Retry</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-6-2"></div>
      </div>
    </div>
    
      
    <div class="exercise-card" id="qc-6-3">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">Knowledge Check</span>
          <span style="font-weight:600; font-size:0.9rem;">Terminal Operators</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">Which of the following LINQ methods triggers immediate database query execution when called on an \`IQueryable&lt;Book&gt;\`?</div>
        <div class="quiz-options" data-qid="qc-6-3">
          
        <div class="quiz-option" data-opt="0">
          <div class="option-indicator">A</div>
          <div class="option-text">\`.Where(b =&gt; b.PublishedYear == 2025)\`</div>
        </div>
        
        <div class="quiz-option" data-opt="1">
          <div class="option-indicator">B</div>
          <div class="option-text">\`.OrderBy(b =&gt; b.Title)\`</div>
        </div>
        
        <div class="quiz-option" data-opt="2">
          <div class="option-indicator">C</div>
          <div class="option-text">\`.Select(b =&gt; b.Title)\`</div>
        </div>
        
        <div class="quiz-option" data-opt="3">
          <div class="option-indicator">D</div>
          <div class="option-text">\`.CountAsync()\`</div>
        </div>
        
        </div>
        <div class="exercise-actions">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-6-3">Submit Answer</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-6-3" style="display:none;">Retry</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-6-3"></div>
      </div>
    </div>
    
      
    <div class="exercise-card" id="qc-6-4">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">Knowledge Check</span>
          <span style="font-weight:600; font-size:0.9rem;">AsEnumerable Boundary</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">What does calling \`.AsEnumerable()\` on an EF Core query chain accomplish?</div>
        <div class="quiz-options" data-qid="qc-6-4">
          
        <div class="quiz-option" data-opt="0">
          <div class="option-indicator">A</div>
          <div class="option-text">It immediately executes the query and buffers all rows into a List.</div>
        </div>
        
        <div class="quiz-option" data-opt="1">
          <div class="option-indicator">B</div>
          <div class="option-text">It switches the LINQ operator binding from \`IQueryable\` to \`IEnumerable\`, meaning subsequent LINQ operators in the chain will execute in-memory on the client as rows are streamed, rather than translating to SQL.</div>
        </div>
        
        <div class="quiz-option" data-opt="2">
          <div class="option-indicator">C</div>
          <div class="option-text">It serializes the database table into a CSV file.</div>
        </div>
        
        <div class="quiz-option" data-opt="3">
          <div class="option-indicator">D</div>
          <div class="option-text">It turns off database transactions.</div>
        </div>
        
        </div>
        <div class="exercise-actions">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-6-4">Submit Answer</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-6-4" style="display:none;">Retry</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-6-4"></div>
      </div>
    </div>
    

      <div class="lesson-footer-nav">
        <button class="btn-secondary" onclick="switchLesson('lesson-5')">← Previous Lesson</button>
        <button class="btn-complete-lesson" data-lesson="lesson-6">Mark Lesson 6 Complete ✓</button>
        <button class="btn-primary" onclick="switchLesson('lesson-7')">Next: Projection &amp; Debugging →</button>
      </div>
    `
  },
  {
    id: "lesson-7",
    badge: "07",
    nav: "Projection & Debugging",
    content: `
      <div class="lesson-header-box">
        <div class="lesson-badge-top">Lesson 7 • Practical Tooling</div>
        <h1 class="lesson-title">Projection, SQL Inspection &amp; Debugging</h1>
        <p class="lesson-subtitle">Using DTO projections to eliminate tracking, inspecting SQL with ToQueryString(), configuring EF Core logging, and diagnostic troubleshooting.</p>
      </div>

      <h2>1. Projecting Directly into DTOs</h2>
      <p>In Lesson 5 of Module 1, we learned that API contracts should not return raw EF Core entities. Beyond contract encapsulation, LINQ <strong>projection</strong> with <code>.Select()</code> provides massive database and memory performance benefits:</p>

      
    <div class="code-wrapper">
      <div class="code-header">
        <div class="code-badge-group">
          <span class="code-lang-tag">C#</span>
          <span class="code-filename">Services/BookService.cs</span>
          <span class="code-type-pill pill-complete example">[Complete Example]</span>
        </div>
        <button class="btn-copy" aria-label="Copy code">📋 Copy</button>
      </div>
      <pre><code class="language-c#">
public async Task&lt;List&lt;BookSummaryDto&gt;&gt; GetCatalogSummariesAsync()
{
    return await _context.Books
        .Where(b =&gt; b.PublishedYear &gt;= 2000)
        .OrderBy(b =&gt; b.Title)
        .Select(b =&gt; new BookSummaryDto(
            b.Id,
            b.Title,
            b.PublishedYear))
        .ToListAsync();
}
</code></pre>
      <div class="code-expl">Projecting into scalar DTOs generates targeted SELECT column queries and skips entity tracking completely.</div>
    </div>
    

      <div class="callout callout-info">
        <div class="callout-title">💡 Why DTO Projections are Faster Than AsNoTracking()</div>
        <ul>
          <li><strong>Column Narrowing:</strong> EF Core inspects the lambda inside <code>.Select()</code> and only includes the requested columns in the SQL <code>SELECT</code> clause (e.g. <code>SELECT "b"."Id", "b"."Title", "b"."PublishedYear"</code>). Large text columns like <code>Summary</code> or binary blobs are never transmitted over the network.</li>
          <li><strong>Zero Entity Tracking:</strong> Because <code>BookSummaryDto</code> is not an entity in your model, EF Core skips the change tracker and allocates no snapshot arrays.</li>
        </ul>
      </div>

      <h2>2. Inspecting Generated SQL with \`ToQueryString()\`</h2>
      <p>When optimizing queries or investigating performance, you should never guess what SQL EF Core produces. Use <code>.ToQueryString()</code> on any unexecuted <code>IQueryable</code>:</p>

      
    <div class="code-wrapper">
      <div class="code-header">
        <div class="code-badge-group">
          <span class="code-lang-tag">C#</span>
          <span class="code-filename">Diagnostics.cs</span>
          <span class="code-type-pill pill-complete example">[Complete Example]</span>
        </div>
        <button class="btn-copy" aria-label="Copy code">📋 Copy</button>
      </div>
      <pre><code class="language-c#">
var query = _context.Books
    .Where(b =&gt; b.PublishedYear &gt;= 2020 &amp;&amp; b.Title.StartsWith("Raff"))
    .OrderBy(b =&gt; b.Title)
    .Select(b =&gt; new { b.Id, b.Title });

// Inspect the exact PostgreSQL SQL that Npgsql would execute:
string sql = query.ToQueryString();
Console.WriteLine(sql);

// Output:
// SELECT "b"."Id", "b"."Title"
// FROM "Books" AS "b"
// WHERE "b"."PublishedYear" &gt;= 2020 AND "b"."Title" LIKE 'Raff%'
// ORDER BY "b"."Title"
</code></pre>
      <div class="code-expl">ToQueryString() allows inspecting generated SQL without executing queries or touching the database.</div>
    </div>
    

      <h2>3. Configuring EF Core Logging in ASP.NET Core</h2>
      <p>For local development, you can capture every generated SQL statement and execution time in the terminal:</p>

      
    <div class="code-wrapper">
      <div class="code-header">
        <div class="code-badge-group">
          <span class="code-lang-tag">C#</span>
          <span class="code-filename">Program.cs</span>
          <span class="code-type-pill pill-complete example">[Complete Example]</span>
        </div>
        <button class="btn-copy" aria-label="Copy code">📋 Copy</button>
      </div>
      <pre><code class="language-c#">
builder.Services.AddDbContext&lt;BooksContext&gt;(options =&gt;
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));

    if (builder.Environment.IsDevelopment())
    {
        // Log SQL queries to console
        options.LogTo(Console.WriteLine, LogLevel.Information);

        // Print actual parameter values (e.g. 'Raff Guide') instead of '@p0'
        options.EnableSensitiveDataLogging();

        // Include detailed exception call stacks from EF Core
        options.EnableDetailedErrors();
    }
});
</code></pre>
      <div class="code-expl">Configuring development logging with LogTo and EnableSensitiveDataLogging.</div>
    </div>
    

      <h2>4. Practical Debugging Matrix</h2>
      <table class="concept-table">
        <thead>
          <tr><th>Symptom</th><th>Underlying Cause</th><th>Diagnostic &amp; Fix</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Unexpected UPDATE statement on unchanged fields</strong></td>
            <td>Calling <code>context.Books.Update(entity)</code> on a disconnected object marks all mapped columns as modified.</td>
            <td>Inspect <code>context.Entry(entity).State</code>. Query the tracked entity and mutate specific properties rather than calling <code>Update()</code>.</td>
          </tr>
          <tr>
            <td><strong>InvalidOperationException: The LINQ expression could not be translated</strong></td>
            <td>Query includes a custom C# method or unsupported .NET method in a server-evaluated clause.</td>
            <td>Move the calculation into PostgreSQL-compatible LINQ primitives, or isolate client-side evaluation after <code>AsEnumerable()</code>.</td>
          </tr>
          <tr>
            <td><strong>High memory usage on GET endpoints</strong></td>
            <td>Query returns entity instances with tracking enabled for read-only requests.</td>
            <td>Apply <code>.AsNoTracking()</code> or project directly into DTOs using <code>.Select()</code>.</td>
          </tr>
          <tr>
            <td><strong>A second operation was started on this context instance...</strong></td>
            <td>Concurrent queries or unawaited tasks accessing the same scoped <code>DbContext</code> instance.</td>
            <td>Ensure all asynchronous calls are awaited sequentially. Do not use <code>Task.WhenAll</code> with the same context instance.</td>
          </tr>
        </tbody>
      </table>

      <h2>Lesson 7 Summary</h2>
      <ul>
        <li>Projecting into scalar DTOs with <code>.Select()</code> optimizes network bandwidth and bypasses entity tracking overhead.</li>
        <li>Use <code>.ToQueryString()</code> to verify generated SQL without executing queries.</li>
        <li>Enable <code>LogTo</code> and <code>EnableSensitiveDataLogging</code> during local development to inspect SQL and parameter bindings.</li>
        <li>Diagnose concurrency and translation issues by understanding EF Core's architecture.</li>
      </ul>

      <h2>Knowledge Checks</h2>
      
    <div class="exercise-card" id="qc-7-1">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">Knowledge Check</span>
          <span style="font-weight:600; font-size:0.9rem;">DTO Projection</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">Why does projecting a query directly into a scalar DTO (\`.Select(b =&gt; new BookDto(b.Id, b.Title)).ToListAsync()\`) improve application performance in Raff?</div>
        <div class="quiz-options" data-qid="qc-7-1">
          
        <div class="quiz-option" data-opt="0">
          <div class="option-indicator">A</div>
          <div class="option-text">It enables PostgreSQL column compression.</div>
        </div>
        
        <div class="quiz-option" data-opt="1">
          <div class="option-indicator">B</div>
          <div class="option-text">PostgreSQL only transmits the \`Id\` and \`Title\` columns across the network, and EF Core avoids allocating tracking snapshots or registering entities in the Change Tracker.</div>
        </div>
        
        <div class="quiz-option" data-opt="2">
          <div class="option-indicator">C</div>
          <div class="option-text">It causes EF Core to bypass PostgreSQL and read from the browser's local storage.</div>
        </div>
        
        <div class="quiz-option" data-opt="3">
          <div class="option-indicator">D</div>
          <div class="option-text">It allows the client to update the database without authentication.</div>
        </div>
        
        </div>
        <div class="exercise-actions">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-7-1">Submit Answer</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-7-1" style="display:none;">Retry</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-7-1"></div>
      </div>
    </div>
    
      
    <div class="exercise-card" id="qc-7-2">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">Knowledge Check</span>
          <span style="font-weight:600; font-size:0.9rem;">ToQueryString</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">What is the primary benefit of calling \`.ToQueryString()\` on an \`IQueryable\` during development?</div>
        <div class="quiz-options" data-qid="qc-7-2">
          
        <div class="quiz-option" data-opt="0">
          <div class="option-indicator">A</div>
          <div class="option-text">It validates user input against SQL injection attacks.</div>
        </div>
        
        <div class="quiz-option" data-opt="1">
          <div class="option-indicator">B</div>
          <div class="option-text">It returns the generated SQL string that EF Core would execute against PostgreSQL without actually sending any query to the database.</div>
        </div>
        
        <div class="quiz-option" data-opt="2">
          <div class="option-indicator">C</div>
          <div class="option-text">It executes the query and outputs the results as a formatted HTML table.</div>
        </div>
        
        <div class="quiz-option" data-opt="3">
          <div class="option-indicator">D</div>
          <div class="option-text">It creates an index in PostgreSQL for all columns in the query.</div>
        </div>
        
        </div>
        <div class="exercise-actions">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-7-2">Submit Answer</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-7-2" style="display:none;">Retry</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-7-2"></div>
      </div>
    </div>
    
      
    <div class="exercise-card" id="qc-7-3">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">Knowledge Check</span>
          <span style="font-weight:600; font-size:0.9rem;">EF Core Logging</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">When configuring \`DbContextOptionsBuilder\` in Raff, what does \`EnableSensitiveDataLogging()\` do?</div>
        <div class="quiz-options" data-qid="qc-7-3">
          
        <div class="quiz-option" data-opt="0">
          <div class="option-indicator">A</div>
          <div class="option-text">It encrypts all database logs before writing them to disk.</div>
        </div>
        
        <div class="quiz-option" data-opt="1">
          <div class="option-indicator">B</div>
          <div class="option-text">It includes parameter values (such as user passwords or book titles) in the logged SQL commands instead of masking them as \`@p0\`.</div>
        </div>
        
        <div class="quiz-option" data-opt="2">
          <div class="option-indicator">C</div>
          <div class="option-text">It disables all SQL logging to prevent leaks.</div>
        </div>
        
        <div class="quiz-option" data-opt="3">
          <div class="option-indicator">D</div>
          <div class="option-text">It automatically deletes logs older than 7 days.</div>
        </div>
        
        </div>
        <div class="exercise-actions">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-7-3">Submit Answer</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-7-3" style="display:none;">Retry</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-7-3"></div>
      </div>
    </div>
    
      
    <div class="exercise-card" id="qc-7-4">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">Knowledge Check</span>
          <span style="font-weight:600; font-size:0.9rem;">Troubleshooting Translations</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">A developer writes: \`context.Books.Where(b =&gt; CustomCsharpHelper(b.Title)).ToListAsync()\`. What happens when this query is executed?</div>
        <div class="quiz-options" data-qid="qc-7-4">
          
        <div class="quiz-option" data-opt="0">
          <div class="option-indicator">A</div>
          <div class="option-text">Npgsql automatically compiles the C# helper function into a PostgreSQL PL/pgSQL stored procedure.</div>
        </div>
        
        <div class="quiz-option" data-opt="1">
          <div class="option-indicator">B</div>
          <div class="option-text">EF Core throws \`InvalidOperationException: The LINQ expression ... could not be translated\` because the query provider cannot translate arbitrary C# methods into SQL.</div>
        </div>
        
        <div class="quiz-option" data-opt="2">
          <div class="option-indicator">C</div>
          <div class="option-text">PostgreSQL executes the query without the filter and ignores the helper method.</div>
        </div>
        
        <div class="quiz-option" data-opt="3">
          <div class="option-indicator">D</div>
          <div class="option-text">The helper method is automatically executed in the browser.</div>
        </div>
        
        </div>
        <div class="exercise-actions">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-7-4">Submit Answer</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-7-4" style="display:none;">Retry</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-7-4"></div>
      </div>
    </div>
    

      <div class="lesson-footer-nav">
        <button class="btn-secondary" onclick="switchLesson('lesson-6')">← Previous Lesson</button>
        <button class="btn-complete-lesson" data-lesson="lesson-7">Mark Lesson 7 Complete ✓</button>
        <button class="btn-primary" onclick="switchLesson('lesson-assessment')">Next: Final Module Assessment 🎓 →</button>
      </div>
    `
  },
  {
    id: "lesson-assessment",
    badge: "\ud83c\udf93",
    nav: "Final Module Assessment",
    content: `
      <div class="lesson-header-box">
        <div class="lesson-badge-top">Module 2 • Certification &amp; Mastery</div>
        <h1 class="lesson-title">Comprehensive Final Assessment</h1>
        <p class="lesson-subtitle">Demonstrate your understanding of EF Core internals, change tracking, DbContext lifetimes, LINQ execution, and diagnostics.</p>
        <div class="lesson-meta-bar">
          <span>📝 12 Deep Reasoning Scenarios</span>
          <span>🎯 Passing Score: <span id="assessment-threshold-label">80%</span> (Configurable)</span>
          <span>🏆 Diagnostic Topic Breakdown Included</span>
        </div>
      </div>

      <div class="callout callout-info" style="margin-bottom:2rem;">
        <div class="callout-title">📋 Assessment Instructions</div>
        <p>This assessment evaluates your practical reasoning as a junior .NET backend engineer. Answer each scenario carefully. When you submit your assessment, your score will be calculated and a detailed diagnostic breakdown of your strengths and review recommendations will be displayed.</p>
      </div>

      <div id="assessment-container">
        <!-- Rendered dynamically by JavaScript -->
      </div>

      <div style="margin-top: 2rem; text-align: center;">
        <button class="btn-primary" id="btn-submit-final-assessment" style="padding: 0.85rem 2.5rem; font-size: 1.1rem;">Submit Final Assessment</button>
      </div>

      <div id="assessment-results" style="display:none; margin-top:2.5rem;">
        <!-- Rendered after submission -->
      </div>
    `
  },
];

/* Search index (extracted from the original page) */
const SEARCH_INDEX = [
        { id: 'lesson-0', title: 'Module 2 Overview', snippet: 'Course outcomes, prerequisites, and learning roadmap for Raff.' },
        { id: 'lesson-1', title: 'Lesson 1: The EF Core Mental Model', snippet: 'Architecture, DbContext & DbSet roles, query vs update pipelines.' },
        { id: 'lesson-2', title: 'Lesson 2: DbContext, DbSet, and Unit of Work', snippet: 'Scoped lifetimes in DI, thread-safety, concurrency violations, and connection pooling.' },
        { id: 'lesson-3', title: 'Lesson 3: Entity States & Change Tracking', snippet: 'Detached, Unchanged, Added, Modified, Deleted, snapshot tracking, and DebugView.' },
        { id: 'lesson-4', title: 'Lesson 4: Tracking, No-Tracking, and Entity Identity', snippet: 'AsNoTracking performance, Identity Map, and FindAsync cache hits.' },
        { id: 'lesson-5', title: 'Lesson 5: SaveChanges, CRUD Transitions, and Generated SQL', snippet: 'DML generation, return values, DbUpdateConcurrencyException, and implicit transactions.' },
        { id: 'lesson-6', title: 'Lesson 6: LINQ, IQueryable, IEnumerable, and Query Execution', snippet: 'Expression trees, deferred execution, terminal async operators, and client vs server evaluation.' },
        { id: 'lesson-7', title: 'Lesson 7: Projection, SQL Inspection, and Debugging', snippet: 'DTO projections, ToQueryString(), EF Core logging with LogTo, and debugging matrix.' },
        { id: 'lesson-assessment', title: 'Final Module Assessment', snippet: '12 scenario-based evaluation questions covering all EF Core concepts.' }
      ];
