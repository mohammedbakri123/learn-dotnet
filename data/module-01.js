/* ============================================================
   Raff Backend Academy — Module 1 — ASP.NET Core Web API
   Data module: glossary, questions, and module constants.
   Loaded before the shared components and the page script.
   ============================================================ */

const STORAGE_KEY = 'raff_aspnet_module_01_state';

const GLOSSARY_ITEMS_DATA = [
  {
    "term": "HTTP",
    "cat": "Protocol",
    "def": "Hypertext Transfer Protocol; a stateless, application-layer communication protocol governing the exchange of requests and responses between web clients and servers."
  },
  {
    "term": "REST",
    "cat": "Architecture",
    "def": "Representational State Transfer; an architectural style defined by Roy Fielding emphasizing resource-oriented URIs, statelessness, and standard HTTP methods as a uniform interface."
  },
  {
    "term": "Resource",
    "cat": "Architecture",
    "def": "Any conceptual entity or object addressable by an API URI (e.g. a book, author, or user in Raff), represented in formats like JSON."
  },
  {
    "term": "Route",
    "cat": "Framework",
    "def": "A URL pattern template mapped by ASP.NET Core's routing engine to an executable endpoint (such as a controller action)."
  },
  {
    "term": "Route Constraint",
    "cat": "Framework",
    "def": "A rule appended to a route token (such as {id:int}) that dictates whether a route matches an incoming URL, used for endpoint disambiguation rather than input validation."
  },
  {
    "term": "Controller",
    "cat": "Framework",
    "def": "A C# class inheriting from ControllerBase that serves as the entry point for HTTP requests, translating wire data into application commands."
  },
  {
    "term": "Action",
    "cat": "Framework",
    "def": "A public method on a controller class executed when an incoming HTTP request matches its route and HTTP method attributes."
  },
  {
    "term": "Middleware",
    "cat": "Framework",
    "def": "A software component in ASP.NET Core assembled into an application pipeline to handle requests and responses in a bidirectional pipeline."
  },
  {
    "term": "Model Binding",
    "cat": "Framework",
    "def": "The process by which ASP.NET Core extracts data from HTTP requests (route, query, body, headers) and converts them into strongly-typed C# action parameters."
  },
  {
    "term": "DTO",
    "cat": "Architecture",
    "def": "Data Transfer Object; an object designed specifically to transfer data across the API boundary, decoupling the public contract from internal database models."
  },
  {
    "term": "Entity",
    "cat": "Data",
    "def": "A C# class representing a database table row tracked by Entity Framework Core with primary keys and relational navigation properties."
  },
  {
    "term": "Serialization",
    "cat": "Data",
    "def": "The process of converting in-memory .NET objects into a text/wire stream format (such as JSON via System.Text.Json) for transmission over HTTP."
  },
  {
    "term": "Idempotency",
    "cat": "Protocol",
    "def": "The property of an HTTP method where making multiple identical requests has the same intended effect on server resource state as making a single request (e.g. GET, PUT, DELETE)."
  },
  {
    "term": "Safety",
    "cat": "Protocol",
    "def": "The property of an HTTP method where executing the request does not alter the resource state on the server (read-only, e.g. GET, HEAD)."
  },
  {
    "term": "Status Code",
    "cat": "Protocol",
    "def": "A standardized 3-digit integer returned in an HTTP response indicating the outcome of the request (e.g. 200, 201, 400, 404, 500)."
  },
  {
    "term": "PUT",
    "cat": "Protocol",
    "def": "An idempotent HTTP method intended for complete replacement of the target resource with the enclosed payload."
  },
  {
    "term": "PATCH",
    "cat": "Protocol",
    "def": "An HTTP method intended for applying partial modifications to a resource."
  },
  {
    "term": "Nullable Reference Type",
    "cat": "C#",
    "def": "A C# 8+ compile-time static analysis feature (e.g. string?) indicating whether a reference can be null, without creating a distinct runtime type."
  },
  {
    "term": "JSON Merge Patch",
    "cat": "Protocol",
    "def": "RFC 7396 standard (application/merge-patch+json) where omitted keys are kept, null values delete/clear fields, and provided values update fields."
  },
  {
    "term": "JSON Patch",
    "cat": "Protocol",
    "def": "RFC 6902 standard (application/json-patch+json) expressing modifications as an array of discrete operations (replace, remove, add, move, copy)."
  },
  {
    "term": "Over-posting",
    "cat": "Security",
    "def": "A vulnerability where clients send unexpected HTTP JSON fields that bind directly to database entity properties due to lack of DTO whitelisting."
  },
  {
    "term": "ProblemDetails",
    "cat": "Protocol",
    "def": "An RFC 7807 machine-readable specification for conveying error details in HTTP response bodies, automatically produced by [ApiController]."
  },
  {
    "term": "Endpoint Routing",
    "cat": "Framework",
    "def": "ASP.NET Core's routing subsystem that separates route matching (UseRouting) from endpoint dispatch (UseEndpoints / MapControllers)."
  },
  {
    "term": "Kestrel",
    "cat": "Framework",
    "def": "ASP.NET Core's cross-platform, high-performance web server responsible for handling TCP sockets and raw HTTP protocol parsing."
  }
];

const QUESTIONS_DB = {
    'qc-1-1': {
      correct: 1,
      topic: 'HTTP Lifecycle',
      exp: 'Correct! HTTP is stateless according to RFC 9110: each request must encapsulate all authorization headers, parameters, and context needed to satisfy it. The server retains no client session context by default.'
    },
    'qc-1-2': {
      correct: 1,
      topic: 'HTTP Lifecycle',
      exp: 'Correct! The request enters Kestrel from the network socket, passes through the middleware pipeline and routing delegates, model binding parses parameters, the controller action invokes the application service, which queries the database via EF Core.'
    },
    'qc-1-3': {
      correct: 0,
      topic: 'HTTP Lifecycle',
      exp: 'Correct! Having an IBookService abstraction is an application architectural design pattern to keep controllers thin and testable; ASP.NET Core does not mandate it (you could query DbContext in actions or use Minimal APIs).'
    },
    'qc-2-1': {
      correct: 1,
      topic: 'REST & Status Codes',
      exp: 'Correct! DELETE /api/books/42 with status 204 No Content is the standard RESTful pattern when removing a resource and returning no response body payload.'
    },
    'qc-2-2': {
      correct: 1,
      topic: 'REST & Status Codes',
      exp: 'Correct! POST is neither safe nor idempotent by definition in RFC 9110. Retrying an unacknowledged POST request can create duplicate resources unless custom idempotency keys are implemented.'
    },
    'qc-2-3': {
      correct: 2,
      topic: 'REST & Status Codes',
      exp: 'Correct! 409 Conflict communicates that the request could not be completed due to a conflict with the current state of the target resource (such as a duplicate unique constraint on an ISBN).'
    },
    'qc-2-4': {
      correct: 1,
      topic: 'REST & Status Codes',
      exp: 'Correct! HTTP PUT represents a complete replacement of the target resource. Any existing fields omitted from the request body are replaced with their defaults (null or 0) according to the new representation.'
    },
    'qc-3-1': {
      correct: 1,
      topic: 'Routing & Constraints',
      exp: 'Correct! Route constraints dictate whether an endpoint matches a URL, NOT input validation. Because "al-ayam" fails the :int constraint, the endpoint does not match at all, resulting in 404 Not Found.'
    },
    'qc-3-2': {
      correct: 1,
      topic: 'Routing & Constraints',
      exp: 'Correct! ASP.NET Core endpoint routing builds a route tree and computes candidate specificity. When two routes have identical precedence and parameter constraints, it throws AmbiguousMatchException resulting in an unhandled 500 server error.'
    },
    'qc-3-3': {
      correct: 2,
      topic: 'Routing & Constraints',
      exp: 'Correct! Translating service results into HTTP status codes (such as 201 Created with Location header) is purely an HTTP transport concern that belongs in the controller layer.'
    },
    'qc-4-1': {
      correct: 2,
      topic: 'Model Binding',
      exp: 'Correct! Query strings (?year=2024&category=fiction) represent optional modifiers, filters, and pagination parameters, mapped via [FromQuery].'
    },
    'qc-4-2': {
      correct: 1,
      topic: 'Model Binding',
      exp: 'Correct! ASP.NET Core allows only one [FromBody] parameter per action because the HTTP request body stream is forward-only by default and cannot be read twice.'
    },
    'qc-4-3': {
      correct: 1,
      topic: 'Model Binding',
      exp: 'Correct! The [ApiController] attribute configures an automatic ModelStateInvalidFilter. When model binding or type conversion fails, it immediately aborts and returns an RFC 7807 ProblemDetails 400 Bad Request.'
    },
    'qc-5-1': {
      correct: 1,
      topic: 'DTOs & Security',
      exp: 'Correct! Over-posting (mass assignment) occurs when clients send unexpected JSON properties that bind directly into database entity fields. DTOs act as a strict whitelist preventing unauthorized property mutations.'
    },
    'qc-5-2': {
      correct: 1,
      topic: 'DTOs & Security',
      exp: 'Correct! DTOs provide clean, one-way projections that break bi-directional EF Core navigation loops (Book -> Authors -> Books), preventing System.Text.Json cycle exceptions.'
    },
    'qc-5-3': {
      correct: 1,
      topic: 'DTOs & Security',
      exp: 'Correct! Create requests do not supply an ID (the database generates it), whereas read responses require an ID. Having separate DTOs accurately honors the distinct contracts of the two operations.'
    },
    'qc-6-1': {
      correct: 0,
      topic: 'Partial Updates & Nullability',
      exp: 'Correct! When the client sends {"summary": null}, dto.summary is null. The condition if (dto.summary is not null) evaluates to false, so the assignment is skipped and the old database summary is never cleared!'
    },
    'qc-6-2': {
      correct: 1,
      topic: 'Partial Updates & Nullability',
      exp: 'Correct! Standard JSON deserialization assigns C# null when a field is explicitly set to null AND when a field is omitted. Ordinary DTO properties have no presence tracking to distinguish between the two.'
    },
    'qc-6-3': {
      correct: 1,
      topic: 'Partial Updates & Nullability',
      exp: 'Correct! Calling context.Update(entity) sets EntityState.Modified on ALL properties. Any omitted fields default to null or 0, overwriting valid existing columns in PostgreSQL!'
    },
    'qc-6-4': {
      correct: 1,
      topic: 'Partial Updates & Nullability',
      exp: 'Correct! ASP.NET Core does not include automatic RFC 7396 (application/merge-patch+json) handling for arbitrary DTOs. Developers must use custom presence tracking (like Optional<T> or JsonElement) or specialized libraries.'
    },
    'qc-7-1': {
      topic: 'End-to-End Architecture',
      correct: 0,
      exp: 'Correct! CreatedAtAction satisfies REST standards by returning 201 Created and establishing the canonical Location header where the newly created resource can be fetched.'
    },
    'qc-7-2': {
      topic: 'End-to-End Architecture',
      correct: 1,
      exp: 'Correct! Services should remain independent of HTTP abstractions (no IActionResult or HttpContext). This allows them to be reused in background jobs, gRPC services, or unit tests without web mocking.'
    },
    'qc-7-3': {
      topic: 'End-to-End Architecture',
      correct: 1,
      exp: 'Correct! The ASP.NET Core Model Binding subsystem and System.Text.Json input formatters parse the HTTP request stream into strongly-typed C# objects before the controller action runs.'
    },
    // Final Assessment Questions (10 Questions)
    'qa-1': {
      prompt: 'A mobile client issues a GET /api/books/42 request. What component in the ASP.NET Core pipeline handles parsing the TCP socket into an HttpContext?',
      opts: [
        'Entity Framework Core DbContext',
        'Kestrel Web Server',
        'Endpoint Routing Middleware',
        'System.Text.Json Deserializer'
      ],
      correct: 1,
      topic: 'HTTP Lifecycle',
      exp: 'Kestrel is the high-performance web server responsible for managing network sockets and constructing the initial HttpContext.'
    },
    'qa-2': {
      prompt: 'Which HTTP method should be used when a client wants to replace the ENTIRE state of book #42 with a new complete representation?',
      opts: [
        'PATCH /api/books/42',
        'POST /api/books/42',
        'PUT /api/books/42',
        'GET /api/books/42?action=replace'
      ],
      correct: 2,
      topic: 'REST & Status Codes',
      exp: 'PUT is defined by RFC 9110 for complete replacement of a target resource representation.'
    },
    'qa-3': {
      prompt: 'A route template is defined as [HttpGet("{id:int}")]. A client sends GET /api/books/latest. If no other route matches, what HTTP status code does ASP.NET Core return, and why?',
      opts: [
        '400 Bad Request, because "latest" is not a valid integer.',
        '404 Not Found, because route constraints dictate endpoint matching, not validation; failing the constraint means no route matched.',
        '500 Internal Server Error, because a cast exception was thrown.',
        '200 OK with default ID = 0.'
      ],
      correct: 1,
      topic: 'Routing & Constraints',
      exp: 'Route constraints filter whether an endpoint matches. If no endpoint matches the URL, 404 Not Found is returned.'
    },
    'qa-4': {
      prompt: 'In an [ApiController], you define: public IActionResult Get([FromRoute] int id, [FromQuery] bool includeAuthors). If the client sends ?includeAuthors=maybe, what happens?',
      opts: [
        'The action executes with includeAuthors = false.',
        'ASP.NET Core automatically returns a 400 Bad Request with RFC 7807 ProblemDetails before the action runs.',
        'Kestrel terminates the TCP connection immediately.',
        'PostgreSQL returns a SQL syntax error.'
      ],
      correct: 1,
      topic: 'Model Binding',
      exp: '[ApiController] automatically verifies ModelState.IsValid. Type conversion failure generates an automatic 400 ProblemDetails response.'
    },
    'qa-5': {
      prompt: 'Why is returning EF Core entities directly from controller actions considered a dangerous security and architecture anti-pattern?',
      opts: [
        'It causes over-posting (mass assignment) vulnerabilities, circular reference crashes in JSON serialization, and leaks internal schema metadata.',
        'It prevents PostgreSQL from utilizing indexed B-tree queries.',
        'It disables SSL/TLS encryption for the response stream.',
        'It triggers an unhandled compiler syntax error.'
      ],
      correct: 0,
      topic: 'DTOs & Security',
      exp: 'Entities expose internal columns, allow malicious over-posting property updates, and cause circular navigation serialization loops.'
    },
    'qa-6': {
      prompt: 'In Raff\'s BookService, updating with: if (dto.summary is not null) book.Summary = dto.summary; causes what bug when the client sends {"title": "New Title", "summary": null}?',
      opts: [
        'The book title is not updated.',
        'The summary cannot be cleared or deleted in the database because the condition evaluates to false, silently leaving the old summary intact.',
        'PostgreSQL throws a foreign key violation.',
        'ASP.NET Core throws a NullReferenceException.'
      ],
      correct: 1,
      topic: 'Partial Updates & Nullability',
      exp: 'Because dto.summary is null, the check is false. The code ignores the client\'s explicit instruction to clear the summary!'
    },
    'qa-7': {
      prompt: 'How does C# 8+ Nullable Reference Types (string?) differ from runtime null values?',
      opts: [
        'string? compiles to a special boxed struct, while string is a class.',
        'Nullable Reference Types are compile-time compiler annotations that generate warnings; at runtime both are identical System.String references.',
        'string? cannot be deserialized by System.Text.Json.',
        'string? forces PostgreSQL columns to be marked NOT NULL.'
      ],
      correct: 1,
      topic: 'Partial Updates & Nullability',
      exp: 'Nullable Reference Types exist only for compiler flow analysis at build time. At runtime, both are System.String and can be null.'
    },
    'qa-8': {
      prompt: 'What happens if a developer maps a partial update DTO to a new Book entity instance and blindly calls _context.Books.Update(book) in EF Core?',
      opts: [
        'EF Core only updates properties that were non-default.',
        'EF Core marks all properties as Modified, overwriting unprovided fields with 0 or null and wiping out good database data.',
        'EF Core throws an InvalidOperationException unless all foreign keys are set.',
        'PostgreSQL converts the statement into an INSERT statement.'
      ],
      correct: 1,
      topic: 'Partial Updates & Nullability',
      exp: 'Update() marks all columns on the entity as Modified, overwriting unchanged database columns with unpopulated default/null values!'
    },
    'qa-9': {
      prompt: 'When a new book is created via POST /api/books, what is the REST-compliant status code and response header combination?',
      opts: [
        '200 OK with Content-Location header',
        '201 Created with Location header pointing to the new resource URI',
        '204 No Content with Set-Cookie header',
        '302 Found with Redirect header'
      ],
      correct: 1,
      topic: 'REST & Status Codes',
      exp: '201 Created with a Location header (e.g. Location: /api/books/42) is the standard RESTful contract.'
    },
    'qa-10': {
      prompt: 'Under RFC 7396 JSON Merge Patch semantics, how does the server distinguish between keeping an existing value vs deleting/clearing an existing value?',
      opts: [
        'Omitted properties are kept; properties explicitly set to null are removed/cleared.',
        'Omitted properties are deleted; null properties are kept.',
        'There is no distinction; null always means keep.',
        'JSON Merge Patch requires an array of "op": "remove" commands.'
      ],
      correct: 0,
      topic: 'Partial Updates & Nullability',
      exp: 'In RFC 7396, omitted keys mean "keep existing value", while explicit null values mean "remove/clear this value".'
    }
  };

/* ---------------------------------------------------------- */
/* Lesson content (extracted verbatim from the original page) */
/* ---------------------------------------------------------- */
const MODULE_LESSONS = [
  {
    id: "lesson-0",
    badge: "0",
    nav: "Overview & Welcome",
    content: `
  <div class="lesson-header-box">
    <div class="lesson-meta-bar">
      <span class="lesson-pill">Curriculum Overview</span>
      <span class="badge-time">Self-Paced Backend Mastery</span>
    </div>
    <h1 class="lesson-h1">ASP.NET Core Web API: Module 1</h1>
    <p class="lesson-lead">
      Welcome, Mohammed. This interactive book takes you deep beneath the surface of ASP.NET Core Web API. Grounded in your real-world project, <strong>Raff</strong> (an Arabic book-tracking API with C#, EF Core, and PostgreSQL), this module transforms practical CRUD familiarity into deep architectural mastery.
    </p>
  </div>

  <div class="content-body">
    <h2>1. About This Module</h2>
    <p>
      You have already built functional endpoints in <code>BookController.cs</code> and configured Entity Framework Core migrations. But as you transition from a Computer Science student to a professional junior .NET backend engineer, the differentiator is knowing <em>why</em> the framework behaves the way it does:
    </p>
    <ul>
      <li>What happens to bytes on the wire before your controller code ever executes?</li>
      <li>Why does <code>if (dto.summary is not null)</code> silently break when users attempt to clear book summaries?</li>
      <li>Why is returning database entities directly a critical security flaw and serialization trap?</li>
      <li>How does Endpoint Routing distinguish endpoints, and what causes <code>AmbiguousMatchException</code>?</li>
    </ul>

    <h2>2. Curriculum Roadmap</h2>
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Lesson</th>
            <th>Core Topics</th>
            <th>Practical Outcome</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Lesson 1</strong></td>
            <td>HTTP Fundamentals &amp; Request Lifecycle</td>
            <td>Trace requests from Kestrel through middleware, routing, controllers, services, and EF Core to PostgreSQL.</td>
          </tr>
          <tr>
            <td><strong>Lesson 2</strong></td>
            <td>REST Principles &amp; HTTP Methods</td>
            <td>Master resources, safe/idempotent semantics, and standard HTTP status codes (200, 201, 204, 400, 404, 409).</td>
          </tr>
          <tr>
            <td><strong>Lesson 3</strong></td>
            <td>Routing &amp; Controllers</td>
            <td>Understand attribute routing, why route constraints are not validators, and how endpoint ambiguity crashes.</td>
          </tr>
          <tr>
            <td><strong>Lesson 4</strong></td>
            <td>Model Binding &amp; Request Data</td>
            <td>Demystify <code>[FromRoute]</code>, <code>[FromQuery]</code>, <code>[FromBody]</code> inference and automatic 400 ProblemDetails.</td>
          </tr>
          <tr>
            <td><strong>Lesson 5</strong></td>
            <td>Entities, DTOs &amp; API Contracts</td>
            <td>Prevent over-posting, circular JSON crashes, and data leaks by designing clean, decoupled DTO contracts.</td>
          </tr>
          <tr>
            <td><strong>Lesson 6</strong></td>
            <td>PUT, PATCH, Nullability &amp; Partial Updates</td>
            <td>Solve the real bug in Raff's <code>UpdateBookAsync</code> and master omitted properties vs. explicit nulls.</td>
          </tr>
          <tr>
            <td><strong>Lesson 7</strong></td>
            <td>Putting the Concepts Together</td>
            <td>Build an end-to-end, architectural standard implementation of the Books API in Raff.</td>
          </tr>
          <tr>
            <td><strong>Assessment</strong></td>
            <td>Final Module Assessment</td>
            <td>Test your knowledge with 10 comprehensive questions (80% passing threshold) and diagnostic review.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>3. How to Use This Interactive Learning Book</h2>
    <div class="callout callout-note">
      <div class="callout-icon">🧭</div>
      <div class="callout-content">
        <div class="callout-title">Features At Your Fingertips</div>
        <ul>
          <li><strong>Zero Network Dependencies:</strong> This entire book is 100% self-contained. It requires no Node server, no internet connection, and no external CDN.</li>
          <li><strong>Persistent Progress:</strong> Your quiz scores, completed lessons, and assessment results are saved automatically in your browser's local storage.</li>
          <li><strong>Export &amp; Import:</strong> Use the sidebar controls to export your learning progress to a JSON file or restore it anytime.</li>
          <li><strong>Keyboard Search:</strong> Press <kbd class="kbd-shortcut">Ctrl+K</kbd> (or click Search in the header) anytime to search the lessons and glossary.</li>
          <li><strong>Interactive Playgrounds:</strong> Use the live request pipeline inspector, route matching simulator, and partial update tri-state playground throughout the lessons.</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="lesson-nav-footer">
    <div></div>
    <button class="btn-primary btn-next-lesson" data-target="lesson-1">
      Start Lesson 1: HTTP Fundamentals →
    </button>
  </div>
`
  },
  {
    id: "lesson-1",
    badge: "1",
    nav: "HTTP & Request Lifecycle",
    content: `
  <div class="lesson-header-box">
    <div class="lesson-meta-bar">
      <span class="lesson-pill">Lesson 1</span>
      <span class="badge-time">30 min read & exercise</span>
    </div>
    <h1 class="lesson-h1">HTTP Fundamentals & The ASP.NET Core Request Lifecycle</h1>
    <p class="lesson-lead">
      Before writing controller actions, you must understand the wire protocol beneath them. Trace how an HTTP request journeys from a client socket through Kestrel, middleware, routing, model binding, and EF Core to PostgreSQL.
    </p>
  </div>

  <div class="content-body">
    <h2>1. The HTTP Protocol: Client-Server Architecture</h2>
    <p>
      <strong>Hypertext Transfer Protocol (HTTP)</strong> is a stateless, application-layer protocol running over TCP or QUIC (in HTTP/3). In a RESTful backend like your <strong>Raff</strong> API, the client (a React web frontend, Flutter mobile app, or cURL script) initiates a connection, sends an HTTP request message, and waits for the server to reply with an HTTP response message.
    </p>

    <div class="callout callout-important">
      <div class="callout-icon">💡</div>
      <div class="callout-content">
        <div class="callout-title">Statelessness: What Does It Mean For Backend Design?</div>
        <p>
          HTTP is inherently <strong>stateless</strong>. The server retains no session state about the client between requests by default. Every request must contain all credentials, headers, and parameters required to understand and authorize the operation. If a client fetches a page of books from Raff, the next request for page two must supply its own pagination parameters and auth token.
        </p>
      </div>
    </div>

    <h3>Anatomy of an HTTP Request</h3>
    <p>
      Every HTTP request on the wire consists of three core segments:
    </p>
    <ol>
      <li><strong>Request Line:</strong> The HTTP method (verb), target URI path and query string, and HTTP version.</li>
      <li><strong>Headers:</strong> Key-value metadata providing context about the client, content format, authentication, and caching.</li>
      <li><strong>Body (Optional):</strong> The payload data (such as JSON or form data) being transmitted to the server.</li>
    </ol>

    <div class="code-container">
      <div class="code-header">
        <div class="code-badge-group">
          <span class="code-lang-tag">HTTP</span>
          <span class="code-filename">Request Wire Format</span>
          <span class="code-type-pill">Wire Protocol</span>
        </div>
        <button class="btn-copy-code" data-code="POST /api/books HTTP/1.1
Host: api.raff.local
Content-Type: application/json
Accept: application/json
Authorization: Bearer eyJhbGciOi...

{
  &quot;title&quot;: &quot;Makan fi Al-Qalb&quot;,
  &quot;publishedYear&quot;: 2023,
  &quot;summary&quot;: &quot;An acclaimed modern Arabic novel.&quot;,
  &quot;coverUrl&quot;: &quot;https://cdn.raff.local/covers/makan.jpg&quot;
}">Copy Wire Request</button>
      </div>
      <pre><code class="language-http">POST /api/books HTTP/1.1
Host: api.raff.local
Content-Type: application/json
Accept: application/json
Authorization: Bearer eyJhbGciOi...

{
  "title": "Makan fi Al-Qalb",
  "publishedYear": 2023,
  "summary": "An acclaimed modern Arabic novel.",
  "coverUrl": "https://cdn.raff.local/covers/makan.jpg"
}</code></pre>
      <div class="code-explanation">
        <strong>Key Lines:</strong> Line 1 specifies verb <code>POST</code> and endpoint path <code>/api/books</code>. <code>Content-Type: application/json</code> instructs ASP.NET Core's input formatters to parse the body using <code>System.Text.Json</code>.
      </div>
    </div>

    <h3>Anatomy of an HTTP Response</h3>
    <p>
      The response returns the result of the server execution:
    </p>

    <div class="code-container">
      <div class="code-header">
        <div class="code-badge-group">
          <span class="code-lang-tag">HTTP</span>
          <span class="code-filename">Response Wire Format</span>
          <span class="code-type-pill">Wire Protocol</span>
        </div>
        <button class="btn-copy-code" data-code="HTTP/1.1 201 Created
Location: /api/books/42
Content-Type: application/json; charset=utf-8
Date: Mon, 13 Oct 2026 18:30:00 GMT

{
  &quot;id&quot;: 42,
  &quot;title&quot;: &quot;Makan fi Al-Qalb&quot;,
  &quot;publishedYear&quot;: 2023,
  &quot;summary&quot;: &quot;An acclaimed modern Arabic novel.&quot;,
  &quot;coverUrl&quot;: &quot;https://cdn.raff.local/covers/makan.jpg&quot;,
  &quot;authors&quot;: []
}">Copy Wire Response</button>
      </div>
      <pre><code class="language-http">HTTP/1.1 201 Created
Location: /api/books/42
Content-Type: application/json; charset=utf-8
Date: Mon, 13 Oct 2026 18:30:00 GMT

{
  "id": 42,
  "title": "Makan fi Al-Qalb",
  "publishedYear": 2023,
  "summary": "An acclaimed modern Arabic novel.",
  "coverUrl": "https://cdn.raff.local/covers/makan.jpg",
  "authors": []
}</code></pre>
      <div class="code-explanation">
        <strong>Status Line:</strong> <code>201 Created</code> confirms resource creation. The <code>Location: /api/books/42</code> header specifies the canonical URI where the newly minted book can be fetched.
      </div>
    </div>

    <h2>2. Status Codes: Semantics of Success and Failure</h2>
    <p>
      HTTP status codes are standardized three-digit integers grouped into five ranges according to RFC 9110:
    </p>
    <ul>
      <li><span class="status-badge status-2xx">1xx (Informational)</span>: Request received, continuing process (e.g., <code>100 Continue</code>, <code>101 Switching Protocols</code> for WebSockets).</li>
      <li><span class="status-badge status-2xx">2xx (Success)</span>: The action requested by the client was received, understood, and accepted.</li>
      <li><span class="status-badge status-4xx">3xx (Redirection)</span>: Further action must be taken by the client to complete the request (e.g., <code>301 Moved Permanently</code>, <code>304 Not Modified</code>).</li>
      <li><span class="status-badge status-4xx">4xx (Client Error)</span>: The client appears to have erred (malformed syntax, missing authorization, resource doesn't exist).</li>
      <li><span class="status-badge status-5xx">5xx (Server Error)</span>: The server failed to fulfill an apparently valid request due to an unhandled crash or infrastructure outage.</li>
    </ul>

    <h2>3. The ASP.NET Core Request Lifecycle</h2>
    <p>
      How does a string of bytes arriving at your network card become a strongly-typed C# object inside your <code>BookController</code>? The diagram below visualizes this pipeline. Click any component in the diagram to inspect what happens under the hood.
    </p>

    <!-- Interactive Pipeline SVG Explorer -->
    <div class="simulator-widget">
      <div class="simulator-header">
        <span class="simulator-title">🔍 Interactive Architecture: ASP.NET Core Request Pipeline</span>
        <span class="code-type-pill">Click Any Stage To Inspect</span>
      </div>
      <div class="simulator-body">
        <div class="pipeline-svg-wrapper">
          <svg class="pipeline-svg" viewBox="0 0 880 180" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="gradKestrel" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#3b82f6"/>
                <stop offset="100%" stop-color="#1d4ed8"/>
              </linearGradient>
              <linearGradient id="gradMid" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#6366f1"/>
                <stop offset="100%" stop-color="#4338ca"/>
              </linearGradient>
              <linearGradient id="gradCtrl" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#8b5cf6"/>
                <stop offset="100%" stop-color="#6d28d9"/>
              </linearGradient>
              <linearGradient id="gradSvc" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#ec4899"/>
                <stop offset="100%" stop-color="#be185d"/>
              </linearGradient>
              <linearGradient id="gradEf" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#10b981"/>
                <stop offset="100%" stop-color="#047857"/>
              </linearGradient>
              <linearGradient id="gradPg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#0284c7"/>
                <stop offset="100%" stop-color="#0369a1"/>
              </linearGradient>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#64748b"/>
              </marker>
            </defs>

            <!-- Node 1: Client -->
            <g class="pipeline-node" data-node="client" transform="translate(10, 45)">
              <rect width="105" height="75" rx="8" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
              <text x="52" y="36" fill="#f8fafc" font-size="12" font-weight="700" text-anchor="middle">Client App</text>
              <text x="52" y="54" fill="#94a3b8" font-size="10" text-anchor="middle">(Web / Mobile)</text>
            </g>
            <line x1="115" y1="82" x2="140" y2="82" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)"/>

            <!-- Node 2: Kestrel -->
            <g class="pipeline-node" data-node="kestrel" transform="translate(145, 45)">
              <rect width="105" height="75" rx="8" fill="url(#gradKestrel)" stroke="#60a5fa" stroke-width="1.5"/>
              <text x="52" y="36" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle">Kestrel</text>
              <text x="52" y="54" fill="#bfdbfe" font-size="10" text-anchor="middle">Web Server</text>
            </g>
            <line x1="250" y1="82" x2="275" y2="82" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)"/>

            <!-- Node 3: Middleware -->
            <g class="pipeline-node selected" data-node="middleware" transform="translate(280, 45)">
              <rect width="120" height="75" rx="8" fill="url(#gradMid)" stroke="#818cf8" stroke-width="2"/>
              <text x="60" y="36" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle">Middleware</text>
              <text x="60" y="54" fill="#c7d2fe" font-size="10" text-anchor="middle">Pipeline & Routing</text>
            </g>
            <line x1="400" y1="82" x2="425" y2="82" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)"/>

            <!-- Node 4: Controller -->
            <g class="pipeline-node" data-node="controller" transform="translate(430, 45)">
              <rect width="120" height="75" rx="8" fill="url(#gradCtrl)" stroke="#c084fc" stroke-width="1.5"/>
              <text x="60" y="36" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle">Controller</text>
              <text x="60" y="54" fill="#e9d5ff" font-size="10" text-anchor="middle">BookController</text>
            </g>
            <line x1="550" y1="82" x2="575" y2="82" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)"/>

            <!-- Node 5: Service -->
            <g class="pipeline-node" data-node="service" transform="translate(580, 45)">
              <rect width="115" height="75" rx="8" fill="url(#gradSvc)" stroke="#f472b6" stroke-width="1.5"/>
              <text x="57" y="36" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle">Service Layer</text>
              <text x="57" y="54" fill="#fbcfe8" font-size="10" text-anchor="middle">BookService</text>
            </g>
            <line x1="695" y1="82" x2="720" y2="82" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)"/>

            <!-- Node 6: EF Core & DB -->
            <g class="pipeline-node" data-node="database" transform="translate(725, 45)">
              <rect width="145" height="75" rx="8" fill="url(#gradPg)" stroke="#38bdf8" stroke-width="1.5"/>
              <text x="72" y="36" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle">EF Core &amp; Postgres</text>
              <text x="72" y="54" fill="#bae6fd" font-size="10" text-anchor="middle">BooksContext</text>
            </g>
          </svg>
        </div>

        <!-- Inspector Output -->
        <div id="pipeline-inspector" class="pipeline-inspector-card">
          <div class="pipeline-inspector-title">
            <span>⚙️ Component: Middleware Pipeline &amp; Routing</span>
          </div>
          <p id="inspector-desc" class="inspector-value">
            A sequence of delegates assembled in <code>Program.cs</code>. Each middleware executes logic, passes control to the next via <code>next(context)</code>, and can inspect or modify the response on the way back out. <code>UseRouting()</code> matches incoming URLs to endpoints, while <code>UseAuthorization()</code> verifies permissions.
          </p>
          <div class="pipeline-inspector-grid">
            <div class="inspector-field">
              <div class="inspector-label">Input</div>
              <div id="inspector-input" class="inspector-value">Raw <code>HttpContext</code> created by Kestrel</div>
            </div>
            <div class="inspector-field">
              <div class="inspector-label">Primary Responsibility</div>
              <div id="inspector-duty" class="inspector-value">Cross-cutting concerns: exceptions, TLS redirect, CORS, auth, endpoint dispatch</div>
            </div>
            <div class="inspector-field">
              <div class="inspector-label">Raff Context</div>
              <div id="inspector-raff" class="inspector-value">Dispatches <code>POST /api/books</code> to <code>BookController.Add</code></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <h2>4. Architectural Layers vs. Framework Mandates</h2>
    <p>
      A common misconception among newer backend developers is confusing <strong>HTTP rules</strong>, <strong>ASP.NET Core framework behaviors</strong>, and <strong>application-specific design choices</strong>:
    </p>

    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Concept</th>
            <th>Category</th>
            <th>Who Enforces It?</th>
            <th>Example in Raff</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Status 201 Created</strong></td>
            <td>HTTP Protocol (RFC 9110)</td>
            <td>IETF Specification</td>
            <td>Contract indicates a new resource exists at <code>Location</code> header.</td>
          </tr>
          <tr>
            <td><strong>Middleware Pipeline</strong></td>
            <td>Framework Behavior</td>
            <td>ASP.NET Core Engine</td>
            <td>Requests pass through <code>UseRouting</code> and <code>UseAuthorization</code> delegates in <code>Program.cs</code>.</td>
          </tr>
          <tr>
            <td><strong>Controller vs. Service Layer</strong></td>
            <td>Application Architecture</td>
            <td>You (The Software Architect)</td>
            <td><code>BookController</code> delegating work to <code>IBookService</code> is a clean code choice, not a mandatory framework requirement.</td>
          </tr>
          <tr>
            <td><strong>Minimal APIs</strong></td>
            <td>Framework Option</td>
            <td>ASP.NET Core Alternative</td>
            <td>Could write <code>app.MapPost("/api/books", ...)</code> without controllers entirely.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="callout callout-tip">
      <div class="callout-icon">🎯</div>
      <div class="callout-content">
        <div class="callout-title">Why Decouple Controllers from Services in Raff?</div>
        <p>
          ASP.NET Core does not force you to create <code>IBookService</code>. You could inject <code>BooksContext</code> directly into <code>BookController</code>. However, keeping controllers thin means they focus strictly on <strong>HTTP translation</strong> (HTTP status codes, route params, request headers), while <code>BookService</code> encapsulates pure <strong>domain logic</strong> that can be unit-tested without mocking <code>HttpContext</code>.
        </p>
      </div>
    </div>

    <!-- Knowledge Check 1 -->
    <div class="exercise-card" id="qc-1-1">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">Knowledge Check 1.1</span>
          <span>HTTP Wire Protocol</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">
          A mobile client connects to Raff and sends a request. Which statement accurately describes HTTP protocol statelessness?
        </div>
        <div class="quiz-options" data-qid="qc-1-1">
          <div class="quiz-option" data-opt="0">
            <div class="option-indicator">A</div>
            <div class="option-text">The server retains database records in memory between requests so subsequent queries execute without disk I/O.</div>
          </div>
          <div class="quiz-option" data-opt="1">
            <div class="option-indicator">B</div>
            <div class="option-text">Every HTTP request is isolated; the server retains no client session context by default, so each request must supply all credentials and parameters needed.</div>
          </div>
          <div class="quiz-option" data-opt="2">
            <div class="option-indicator">C</div>
            <div class="option-text">The TCP socket is closed immediately before any response bytes can be returned, requiring UDP fallbacks.</div>
          </div>
          <div class="quiz-option" data-opt="3">
            <div class="option-indicator">D</div>
            <div class="option-text">ASP.NET Core automatically persists all request variables in a global static cache across all users.</div>
          </div>
        </div>
        <div class="exercise-footer">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-1-1">Submit Answer</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-1-1" style="display:none;">Retry</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-1-1"></div>
      </div>
    </div>

    <!-- Knowledge Check 2 -->
    <div class="exercise-card" id="qc-1-2">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">Knowledge Check 1.2</span>
          <span>Request Journey Sequence</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">
          When an HTTP request enters an ASP.NET Core application, in what chronological order does it traverse the backend components?
        </div>
        <div class="quiz-options" data-qid="qc-1-2">
          <div class="quiz-option" data-opt="0">
            <div class="option-indicator">A</div>
            <div class="option-text">PostgreSQL → Entity Framework Core → Controller Action → Kestrel → Middleware</div>
          </div>
          <div class="quiz-option" data-opt="1">
            <div class="option-indicator">B</div>
            <div class="option-text">Kestrel → Middleware Pipeline &amp; Routing → Model Binding &amp; Action Selection → Controller → Service Layer → EF Core &amp; Database</div>
          </div>
          <div class="quiz-option" data-opt="2">
            <div class="option-indicator">C</div>
            <div class="option-text">Service Layer → Kestrel → Routing Middleware → PostgreSQL → Controller Action</div>
          </div>
          <div class="quiz-option" data-opt="3">
            <div class="option-indicator">D</div>
            <div class="option-text">Routing Middleware → Kestrel → Controller Action → Model Binding → DbContext</div>
          </div>
        </div>
        <div class="exercise-footer">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-1-2">Submit Answer</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-1-2" style="display:none;">Retry</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-1-2"></div>
      </div>
    </div>

    <!-- Knowledge Check 3 -->
    <div class="exercise-card" id="qc-1-3">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">Knowledge Check 1.3</span>
          <span>Architecture vs Framework Mandates</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">
          Which of the following is an application-level architectural pattern rather than an immutable requirement of ASP.NET Core?
        </div>
        <div class="quiz-options" data-qid="qc-1-3">
          <div class="quiz-option" data-opt="0">
            <div class="option-indicator">A</div>
            <div class="option-text">Having a separate <code>BookService</code> class between the controller and Entity Framework Core.</div>
          </div>
          <div class="quiz-option" data-opt="1">
            <div class="option-indicator">B</div>
            <div class="option-text">Passing requests through the <code>HttpContext</code> pipeline.</div>
          </div>
          <div class="quiz-option" data-opt="2">
            <div class="option-indicator">C</div>
            <div class="option-text">Listening for incoming TCP connections on a server port with Kestrel or HTTP.sys.</div>
          </div>
          <div class="quiz-option" data-opt="3">
            <div class="option-indicator">D</div>
            <div class="option-text">Executing middleware in the order registered in <code>Program.cs</code>.</div>
          </div>
        </div>
        <div class="exercise-footer">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-1-3">Submit Answer</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-1-3" style="display:none;">Retry</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-1-3"></div>
      </div>
    </div>

  </div>

  <div class="lesson-nav-footer">
    <button class="btn-complete-lesson" data-lesson="lesson-1">
      <span class="complete-checkbox">✓</span> Mark Lesson 1 Complete
    </button>
    <button class="btn-primary btn-next-lesson" data-target="lesson-2">
      Next: REST &amp; HTTP Methods →
    </button>
  </div>
`
  },
  {
    id: "lesson-2",
    badge: "2",
    nav: "REST & HTTP Methods",
    content: `
  <div class="lesson-header-box">
    <div class="lesson-meta-bar">
      <span class="lesson-pill">Lesson 2</span>
      <span class="badge-time">35 min read & exercise</span>
    </div>
    <h1 class="lesson-h1">REST Principles &amp; HTTP Methods</h1>
    <p class="lesson-lead">
      Learn how REST models your backend as resources identified by nouns, understand the critical difference between safe and idempotent methods, and master standard HTTP status codes.
    </p>
  </div>

  <div class="content-body">
    <h2>1. Resources and Resource-Oriented URLs</h2>
    <p>
      In <strong>Representational State Transfer (REST)</strong>, your API exposes <em>resources</em>—things, not actions. In <strong>Raff</strong>, resources are books, authors, users, and reading progress entries.
    </p>
    <p>
      Resource URIs should be <strong>nouns</strong>, pluralized for collections, and hierarchical for sub-resources:
    </p>
    <ul>
      <li><code>GET /api/books</code> — The collection of books.</li>
      <li><code>GET /api/books/42</code> — The specific book with identifier <code>42</code>.</li>
      <li><code>POST /api/books</code> — Create a new book in the collection.</li>
      <li><code>PUT /api/books/42</code> — Completely replace the state of book <code>42</code>.</li>
      <li><code>PATCH /api/books/42</code> — Partially modify book <code>42</code>.</li>
      <li><code>DELETE /api/books/42</code> — Remove book <code>42</code>.</li>
      <li><code>GET /api/books/42/authors</code> — The sub-resource collection of authors associated with book <code>42</code>.</li>
    </ul>

    <div class="callout callout-warning">
      <div class="callout-icon">⚠️</div>
      <div class="callout-content">
        <div class="callout-title">Anti-Pattern: Verbs in URLs</div>
        <p>
          Avoid endpoints like <code>/api/books/getall</code>, <code>/api/books/create</code>, or <code>/api/books/delete/42</code>. In REST, the HTTP verb (<code>GET</code>, <code>POST</code>, <code>DELETE</code>) specifies the operation, while the URI specifies the resource.
        </p>
      </div>
    </div>

    <h2>2. Safe and Idempotent Methods</h2>
    <p>
      RFC 9110 establishes two essential technical properties for HTTP methods that every junior backend developer must understand:
    </p>

    <div class="callout callout-note">
      <div class="callout-icon">🛡️</div>
      <div class="callout-content">
        <div class="callout-title">Formal Definitions</div>
        <p>
          <strong>Safe:</strong> An HTTP method is <em>safe</em> if its semantics are read-only. Calling it must not alter server resource state (logging and caching side-effects are permissible). Clients can execute safe requests repeatedly without caution.
        </p>
        <p style="margin-top: 0.5rem;">
          <strong>Idempotent:</strong> An HTTP method is <em>idempotent</em> if making multiple identical requests has the same intended effect on the server as making a single request. If a network blip causes a client to retry an idempotent request, server state does not become corrupted.
        </p>
      </div>
    </div>

    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Method</th>
            <th>Primary Purpose</th>
            <th>Safe?</th>
            <th>Idempotent?</th>
            <th>Request Body?</th>
            <th>Typical Success Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>GET</code></td>
            <td>Retrieve resource representation</td>
            <td><strong style="color:var(--success);">Yes</strong></td>
            <td><strong style="color:var(--success);">Yes</strong></td>
            <td>No</td>
            <td><span class="status-badge status-2xx">200 OK</span></td>
          </tr>
          <tr>
            <td><code>POST</code></td>
            <td>Create new resource or trigger operation</td>
            <td><strong style="color:var(--danger);">No</strong></td>
            <td><strong style="color:var(--danger);">No</strong></td>
            <td>Yes</td>
            <td><span class="status-badge status-2xx">201 Created</span> / <code>200 OK</code></td>
          </tr>
          <tr>
            <td><code>PUT</code></td>
            <td>Full replacement of target resource</td>
            <td><strong style="color:var(--danger);">No</strong></td>
            <td><strong style="color:var(--success);">Yes</strong></td>
            <td>Yes (Full)</td>
            <td><span class="status-badge status-2xx">200 OK</span> / <code>204 No Content</code></td>
          </tr>
          <tr>
            <td><code>PATCH</code></td>
            <td>Partial modification of target resource</td>
            <td><strong style="color:var(--danger);">No</strong></td>
            <td><strong style="color:var(--warning);">Depends*</strong></td>
            <td>Yes (Delta)</td>
            <td><span class="status-badge status-2xx">200 OK</span> / <code>204 No Content</code></td>
          </tr>
          <tr>
            <td><code>DELETE</code></td>
            <td>Remove target resource</td>
            <td><strong style="color:var(--danger);">No</strong></td>
            <td><strong style="color:var(--success);">Yes</strong></td>
            <td>Optional</td>
            <td><span class="status-badge status-2xx">204 No Content</span> / <code>200 OK</code></td>
          </tr>
        </tbody>
      </table>
    </div>
    <p style="font-size:0.85rem; color:var(--text-muted); margin-top:-0.5rem;">
      * Note on PATCH idempotency: While JSON Merge Patch (RFC 7396) setting field values is idempotent, JSON Patch (RFC 6902) array operations (e.g. "append item") are not.
    </p>

    <h2>3. Full Replacement (PUT) vs. Partial Modification (PATCH)</h2>
    <p>
      The distinction between <code>PUT</code> and <code>PATCH</code> is one of the most frequently tested concepts in backend interviews:
    </p>
    <ul>
      <li>
        <strong>PUT /api/books/42:</strong> Represents a <em>complete replacement</em> of the resource. The client sends the complete representation of the book. Any existing properties omitted from the payload are replaced with their defaults (or null).
      </li>
      <li>
        <strong>PATCH /api/books/42:</strong> Represents a <em>partial modification</em>. The client sends only the properties that need changing. Untouched properties remain unchanged on the server.
      </li>
    </ul>

    <h2>4. Essential HTTP Status Codes For Web APIs</h2>
    <p>
      A great API uses status codes precisely to communicate outcome:
    </p>
    <ul>
      <li><span class="status-badge status-2xx">200 OK</span> — Standard success with response body (e.g. <code>GET /api/books/42</code>).</li>
      <li><span class="status-badge status-2xx">201 Created</span> — Resource created. Must include a <code>Location</code> header pointing to the new resource.</li>
      <li><span class="status-badge status-2xx">204 No Content</span> — Action succeeded, but there is no body to return (standard for <code>DELETE</code> or some <code>PUT</code> updates).</li>
      <li><span class="status-badge status-4xx">400 Bad Request</span> — Malformed JSON, failed model validation, or invalid parameter types.</li>
      <li><span class="status-badge status-4xx">401 Unauthorized</span> — Lacks valid authentication credentials (the user is unauthenticated).</li>
      <li><span class="status-badge status-4xx">403 Forbidden</span> — Client is authenticated, but lacks permission to access or modify this specific resource.</li>
      <li><span class="status-badge status-4xx">404 Not Found</span> — The requested URI does not match an existing resource.</li>
      <li><span class="status-badge status-4xx">409 Conflict</span> — Request conflicts with current server state (e.g., duplicate unique ISBN or concurrency version mismatch).</li>
      <li><span class="status-badge status-5xx">500 Internal Server Error</span> — An unhandled exception occurred on the server.</li>
    </ul>

    <div class="callout callout-important">
      <div class="callout-icon">🔍</div>
      <div class="callout-content">
        <div class="callout-title">Framework Behavior vs. API Conventions in Raff</div>
        <p>
          Let's look at your current <code>BookController.cs</code>:
        </p>
        <pre style="margin-top:0.5rem; padding:0.75rem;"><code class="language-csharp">[HttpPost]
public async Task&lt;IActionResult&gt; Add([FromBody] createBookDto dto)
{
    var book = await _bookService.CreateBookAsync(dto);
    return Ok(book); // &lt;-- Returns 200 OK!
}</code></pre>
        <p style="margin-top:0.5rem;">
          ASP.NET Core does not complain when you return <code>Ok(book)</code> from an <code>HttpPost</code> action. However, REST conventions dictate that when a resource is created, you should return <span class="status-badge status-2xx">201 Created</span> with a <code>Location</code> header via <code>CreatedAtAction</code>:
        </p>
        <pre style="margin-top:0.5rem; padding:0.75rem;"><code class="language-csharp">return CreatedAtAction(nameof(GetBook), new { id = book.Id }, book);</code></pre>
      </div>
    </div>

    <!-- Knowledge Check 2.1 -->
    <div class="exercise-card" id="qc-2-1">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">Scenario Exercise 2.1</span>
          <span>HTTP Method &amp; Status Code Selection</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">
          <strong>Scenario:</strong> A user clicks "Delete Book #42" in the Raff web client. The book exists and is successfully removed from the PostgreSQL database. The API does not need to return any book data in the response body. What is the most standard HTTP method and status code?
        </div>
        <div class="quiz-options" data-qid="qc-2-1">
          <div class="quiz-option" data-opt="0">
            <div class="option-indicator">A</div>
            <div class="option-text"><code>POST /api/books/delete/42</code> returning <code>200 OK</code></div>
          </div>
          <div class="quiz-option" data-opt="1">
            <div class="option-indicator">B</div>
            <div class="option-text"><code>DELETE /api/books/42</code> returning <code>204 No Content</code></div>
          </div>
          <div class="quiz-option" data-opt="2">
            <div class="option-indicator">C</div>
            <div class="option-text"><code>GET /api/books/42?action=remove</code> returning <code>200 OK</code></div>
          </div>
          <div class="quiz-option" data-opt="3">
            <div class="option-indicator">D</div>
            <div class="option-text"><code>PUT /api/books/42</code> returning <code>201 Created</code></div>
          </div>
        </div>
        <div class="exercise-footer">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-2-1">Submit Answer</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-2-1" style="display:none;">Retry</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-2-1"></div>
      </div>
    </div>

    <!-- Knowledge Check 2.2 -->
    <div class="exercise-card" id="qc-2-2">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">Scenario Exercise 2.2</span>
          <span>Safe vs Idempotent Semantics</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">
          A mobile client on a flaky network sends a <code>POST /api/books</code> request to create a book. The network times out before receiving the response, so the client retries the exact same <code>POST</code> request. What risk exists if the API endpoint is not designed with custom deduplication?
        </div>
        <div class="quiz-options" data-qid="qc-2-2">
          <div class="quiz-option" data-opt="0">
            <div class="option-indicator">A</div>
            <div class="option-text">No risk, because POST is an idempotent HTTP method by definition in RFC 9110.</div>
          </div>
          <div class="quiz-option" data-opt="1">
            <div class="option-indicator">B</div>
            <div class="option-text">The server may create two identical duplicate book records, because POST is neither safe nor idempotent.</div>
          </div>
          <div class="quiz-option" data-opt="2">
            <div class="option-indicator">C</div>
            <div class="option-text">ASP.NET Core automatically cancels the second request and returns 304 Not Modified.</div>
          </div>
          <div class="quiz-option" data-opt="3">
            <div class="option-indicator">D</div>
            <div class="option-text">PostgreSQL will automatically convert the second POST into a PUT request.</div>
          </div>
        </div>
        <div class="exercise-footer">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-2-2">Submit Answer</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-2-2" style="display:none;">Retry</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-2-2"></div>
      </div>
    </div>

    <!-- Knowledge Check 2.3 -->
    <div class="exercise-card" id="qc-2-3">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">Scenario Exercise 2.3</span>
          <span>Status Code Precision</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">
          A client attempts to create a new book with ISBN <code>978-0131101630</code>, but a book with that exact ISBN already exists in Raff's database table, violating a unique database constraint. Which HTTP status code should the API return?
        </div>
        <div class="quiz-options" data-qid="qc-2-3">
          <div class="quiz-option" data-opt="0">
            <div class="option-indicator">A</div>
            <div class="option-text"><code>404 Not Found</code></div>
          </div>
          <div class="quiz-option" data-opt="1">
            <div class="option-indicator">B</div>
            <div class="option-text"><code>500 Internal Server Error</code></div>
          </div>
          <div class="quiz-option" data-opt="2">
            <div class="option-indicator">C</div>
            <div class="option-text"><code>409 Conflict</code></div>
          </div>
          <div class="quiz-option" data-opt="3">
            <div class="option-indicator">D</div>
            <div class="option-text"><code>401 Unauthorized</code></div>
          </div>
        </div>
        <div class="exercise-footer">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-2-3">Submit Answer</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-2-3" style="display:none;">Retry</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-2-3"></div>
      </div>
    </div>

    <!-- Knowledge Check 2.4 -->
    <div class="exercise-card" id="qc-2-4">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">Scenario Exercise 2.4</span>
          <span>PUT vs PATCH Semantics</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">
          An existing book record in Raff has a title, summary, published year, and cover URL. A client issues a <code>PUT /api/books/42</code> request sending a JSON payload containing only <code>{"title": "Updated Title"}</code>. According to strict HTTP <code>PUT</code> semantics, what should happen to the other properties (summary, publishedYear, coverUrl)?
        </div>
        <div class="quiz-options" data-qid="qc-2-4">
          <div class="quiz-option" data-opt="0">
            <div class="option-indicator">A</div>
            <div class="option-text">They should remain completely untouched as they were before the request.</div>
          </div>
          <div class="quiz-option" data-opt="1">
            <div class="option-indicator">B</div>
            <div class="option-text">Because PUT is a full replacement, the omitted fields should be replaced with default/null values according to the new representation.</div>
          </div>
          <div class="quiz-option" data-opt="2">
            <div class="option-indicator">C</div>
            <div class="option-text">The server must delete the book from the database and recreate it with ID 1.</div>
          </div>
          <div class="quiz-option" data-opt="3">
            <div class="option-indicator">D</div>
            <div class="option-text">ASP.NET Core automatically converts PUT requests into PATCH requests.</div>
          </div>
        </div>
        <div class="exercise-footer">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-2-4">Submit Answer</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-2-4" style="display:none;">Retry</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-2-4"></div>
      </div>
    </div>

  </div>

  <div class="lesson-nav-footer">
    <button class="btn-complete-lesson" data-lesson="lesson-2">
      <span class="complete-checkbox">✓</span> Mark Lesson 2 Complete
    </button>
    <button class="btn-primary btn-next-lesson" data-target="lesson-3">
      Next: Routing &amp; Controllers →
    </button>
  </div>
`
  },
  {
    id: "lesson-3",
    badge: "3",
    nav: "Routing & Controllers",
    content: `
  <div class="lesson-header-box">
    <div class="lesson-meta-bar">
      <span class="lesson-pill">Lesson 3</span>
      <span class="badge-time">35 min read & exercise</span>
    </div>
    <h1 class="lesson-h1">ASP.NET Core Routing &amp; Controllers</h1>
    <p class="lesson-lead">
      Understand how Endpoint Routing matches incoming requests to controller actions, how route constraints really work, and why route ambiguity triggers <code>AmbiguousMatchException</code>.
    </p>
  </div>

  <div class="content-body">
    <h2>1. The Role of Controllers and ControllerBase</h2>
    <p>
      In ASP.NET Core Web APIs, a controller is a class that inherits from <code>ControllerBase</code> and is decorated with the <code>[ApiController]</code> attribute.
    </p>

    <div class="callout callout-note">
      <div class="callout-icon">💡</div>
      <div class="callout-content">
        <div class="callout-title">ControllerBase vs. Controller</div>
        <p>
          In ASP.NET Core, always inherit from <code>ControllerBase</code> for Web APIs. The <code>Controller</code> class inherits from <code>ControllerBase</code> and adds support for Razor Views (<code>View()</code>, <code>ViewData</code>), which is unnecessary bloat for JSON REST APIs.
        </p>
      </div>
    </div>

    <h3>What does the <code>[ApiController]</code> attribute do?</h3>
    <p>
      Applying <code>[ApiController]</code> to your controller class enables several opinionated API-focused behaviors:
    </p>
    <ul>
      <li><strong>Attribute routing requirement:</strong> Actions cannot be reached via traditional convention-based routes.</li>
      <li><strong>Automatic HTTP 400 responses:</strong> If model validation fails (e.g. invalid types or data annotations), ASP.NET Core automatically short-circuits and returns a <code>400 Bad Request</code> formatted as RFC 7807 <code>ProblemDetails</code> before your action code runs.</li>
      <li><strong>Binding source parameter inference:</strong> Automatically infers <code>[FromBody]</code> for complex classes, <code>[FromRoute]</code> for route parameters, and <code>[FromQuery]</code> for primitives.</li>
      <li><strong>Multipart/form-data request inference:</strong> Action parameters of type <code>IFormFile</code> are inferred as <code>[FromForm]</code>.</li>
    </ul>

    <h2>2. Attribute Routing and Route Templates</h2>
    <p>
      Look at the routing structure in your <code>BookController.cs</code>:
    </p>

    <div class="code-container">
      <div class="code-header">
        <div class="code-badge-group">
          <span class="code-lang-tag">C#</span>
          <span class="code-filename">Controllers/BookController.cs</span>
          <span class="code-type-pill">Controller Fragment</span>
        </div>
        <button class="btn-copy-code" data-code="using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route(&quot;api/[controller]&quot;)]
public class BookController : ControllerBase
{
    private readonly IBookService _bookService;

    public BookController(IBookService bookService)
    {
        _bookService = bookService;
    }

    [HttpGet]
    public async Task&lt;IActionResult&gt; GetBooks([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        var result = await _bookService.GetBooksAsync(page, pageSize);
        return Ok(result);
    }

    [HttpGet(&quot;{id:int}&quot;)]
    public async Task&lt;IActionResult&gt; GetBook([FromRoute] int id)
    {
        var book = await _bookService.GetBookByIdAsync(id);
        return Ok(book);
    }
}">Copy Controller</button>
      </div>
      <pre><code class="language-csharp">using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class BookController : ControllerBase
{
    private readonly IBookService _bookService;

    public BookController(IBookService bookService)
    {
        _bookService = bookService;
    }

    [HttpGet]
    public async Task&lt;IActionResult&gt; GetBooks([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        var result = await _bookService.GetBooksAsync(page, pageSize);
        return Ok(result);
    }

    [HttpGet("{id:int}")]
    public async Task&lt;IActionResult&gt; GetBook([FromRoute] int id)
    {
        var book = await _bookService.GetBookByIdAsync(id);
        return Ok(book);
    }
}</code></pre>
      <div class="code-explanation">
        <strong>Template Analysis:</strong> <code>[Route("api/[controller]")]</code> token replacement removes the "Controller" suffix from <code>BookController</code>, yielding base path <code>/api/book</code> (or <code>/api/books</code> if renamed <code>BooksController</code>). The action template <code>{id:int}</code> appends to this base.
      </div>
    </div>

    <h2>3. Route Constraints: Disambiguation vs. Validation</h2>
    <p>
      In <code>[HttpGet("{id:int}")]</code>, the <code>:int</code> token is a <strong>route constraint</strong>.
    </p>

    <div class="callout callout-danger">
      <div class="callout-icon">🚨</div>
      <div class="callout-content">
        <div class="callout-title">Crucial Insight: Route Constraints Are NOT Input Validators!</div>
        <p>
          A common beginner error is assuming route constraints validate client input. They do not! Route constraints are used by the <strong>Endpoint Routing engine</strong> to decide <em>whether an endpoint matches a URL</em>:
        </p>
        <ul style="margin-top: 0.5rem;">
          <li>
            If a route is configured as <code>[HttpGet("{id:int}")]</code> and a client requests <code>GET /api/books/great-gatsby</code>:
            <br>
            Routing tests the segment <code>great-gatsby</code> against the <code>int</code> constraint. It fails.
            <br>
            Because the constraint failed, the endpoint <strong>does not match</strong>. If no other endpoint matches, ASP.NET Core returns <span class="status-badge status-4xx">404 Not Found</span>!
          </li>
          <li>
            If the route was <code>[HttpGet("{id}")]</code> (unconstrained) with parameter <code>int id</code>:
            <br>
            The route <strong>matches</strong>. The action is selected. Then the Model Binder attempts to convert <code>"great-gatsby"</code> into an <code>int</code> and fails.
            <br>
            Because model binding failed on an <code>[ApiController]</code>, ASP.NET Core returns <span class="status-badge status-4xx">400 Bad Request</span> with a ProblemDetails validation error!
          </li>
        </ul>
      </div>
    </div>

    <h2>4. Ambiguous Routes and Action Selection</h2>
    <p>
      How does ASP.NET Core distinguish endpoints? During startup, the endpoint routing engine builds a tree of route templates and assigns each a <strong>precedence score</strong> based on specificity:
    </p>
    <ol>
      <li>Literals (e.g. <code>books/recent</code>) have higher precedence than parameters.</li>
      <li>Constrained parameters (e.g. <code>{id:int}</code>) have higher precedence than unconstrained parameters (<code>{id}</code>).</li>
      <li>Catch-all parameters (<code>{*path}</code>) have lowest precedence.</li>
    </ol>

    <p>
      What happens if two action methods have templates with <em>identical precedence</em>?
    </p>

    <div class="code-container">
      <div class="code-header">
        <div class="code-badge-group">
          <span class="code-lang-tag">C#</span>
          <span class="code-filename">Ambiguous Route Collision Example</span>
          <span class="code-type-pill">Anti-Pattern</span>
        </div>
      </div>
      <pre><code class="language-csharp">[HttpGet("{id:int}")]
public IActionResult GetById(int id) { ... }

[HttpGet("{bookId:int}")]
public IActionResult GetByBookId(int bookId) { ... }</code></pre>
      <div class="code-explanation">
        <strong>Runtime Crash:</strong> When a request like <code>GET /api/books/42</code> arrives, ASP.NET Core finds two candidate endpoints with identical templates. It cannot pick arbitrarily, so it throws <code>Microsoft.AspNetCore.Routing.Matching.AmbiguousMatchException</code> resulting in a <strong>500 Internal Server Error</strong>!
      </div>
    </div>

    <!-- Route Matching Interactive Exercise -->
    <div class="simulator-widget">
      <div class="simulator-header">
        <span class="simulator-title">🧪 Route Matching Simulator: Test URLs Against Raff Endpoints</span>
      </div>
      <div class="simulator-body">
        <p style="font-size:0.9rem; margin-bottom:1rem; color:var(--text-secondary);">
          Consider these three registered actions in <code>BooksController</code>:
        </p>
        <div class="code-container" style="margin:0.5rem 0 1.25rem;">
          <pre><code class="language-csharp">// Endpoint A
[HttpGet("featured")]
public IActionResult GetFeatured() { ... }

// Endpoint B
[HttpGet("{id:int}")]
public IActionResult GetById(int id) { ... }

// Endpoint C
[HttpGet("{slug}")]
public IActionResult GetBySlug(string slug) { ... }</code></pre>
        </div>

        <div style="display:flex; flex-direction:column; gap:0.75rem;">
          <label style="font-weight:600; font-size:0.85rem; color:var(--text-muted); text-transform:uppercase;">Select a test request URL to trace:</label>
          <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
            <button class="btn-secondary btn-test-route" data-url="/api/books/featured">GET /api/books/featured</button>
            <button class="btn-secondary btn-test-route" data-url="/api/books/101">GET /api/books/101</button>
            <button class="btn-secondary btn-test-route" data-url="/api/books/arabic-classics">GET /api/books/arabic-classics</button>
          </div>
          <div id="route-trace-box" style="margin-top:0.75rem; padding:1rem; border-radius:var(--radius-sm); background:var(--bg-secondary); border:1px solid var(--border-color); display:none;">
            <div id="route-trace-result" style="font-weight:700; color:var(--accent-light); margin-bottom:0.25rem;"></div>
            <div id="route-trace-reason" style="font-size:0.875rem; color:var(--text-secondary); line-height:1.5;"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Knowledge Check 3.1 -->
    <div class="exercise-card" id="qc-3-1">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">Knowledge Check 3.1</span>
          <span>Route Constraints vs. Validation</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">
          An action is routed with <code>[HttpGet("{id:int}")]</code>. A client sends <code>GET /api/books/al-ayam</code>. No other route matches this path. What status code is returned, and why?
        </div>
        <div class="quiz-options" data-qid="qc-3-1">
          <div class="quiz-option" data-opt="0">
            <div class="option-indicator">A</div>
            <div class="option-text"><code>400 Bad Request</code>, because "al-ayam" failed the integer validation rule.</div>
          </div>
          <div class="quiz-option" data-opt="1">
            <div class="option-indicator">B</div>
            <div class="option-text"><code>404 Not Found</code>, because route constraints dictate whether an endpoint matches; failing the constraint means no endpoint matched the URL.</div>
          </div>
          <div class="quiz-option" data-opt="2">
            <div class="option-indicator">C</div>
            <div class="option-text"><code>500 Internal Server Error</code>, because Kestrel throws a unhandled format exception.</div>
          </div>
          <div class="quiz-option" data-opt="3">
            <div class="option-indicator">D</div>
            <div class="option-text"><code>200 OK</code> with an ID parameter defaulted to 0.</div>
          </div>
        </div>
        <div class="exercise-footer">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-3-1">Submit Answer</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-3-1" style="display:none;">Retry</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-3-1"></div>
      </div>
    </div>

    <!-- Knowledge Check 3.2 -->
    <div class="exercise-card" id="qc-3-2">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">Knowledge Check 3.2</span>
          <span>Ambiguous Route Resolution</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">
          A developer in Raff accidentally adds two actions to the same controller:
          <br>
          1) <code>[HttpGet("{id:int}")]</code>
          <br>
          2) <code>[HttpGet("{bookId:int}")]</code>
          <br>
          What happens when a client sends <code>GET /api/books/5</code>?
        </div>
        <div class="quiz-options" data-qid="qc-3-2">
          <div class="quiz-option" data-opt="0">
            <div class="option-indicator">A</div>
            <div class="option-text">ASP.NET Core executes the first action defined alphabetically.</div>
          </div>
          <div class="quiz-option" data-opt="1">
            <div class="option-indicator">B</div>
            <div class="option-text">ASP.NET Core throws an <code>AmbiguousMatchException</code> because both endpoints have identical route precedence and template specificity.</div>
          </div>
          <div class="quiz-option" data-opt="2">
            <div class="option-indicator">C</div>
            <div class="option-text">Both actions run concurrently in parallel background threads.</div>
          </div>
          <div class="quiz-option" data-opt="3">
            <div class="option-indicator">D</div>
            <div class="option-text">ASP.NET Core returns 404 Not Found because it silences duplicate routes.</div>
          </div>
        </div>
        <div class="exercise-footer">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-3-2">Submit Answer</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-3-2" style="display:none;">Retry</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-3-2"></div>
      </div>
    </div>

    <!-- Knowledge Check 3.3 -->
    <div class="exercise-card" id="qc-3-3">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">Knowledge Check 3.3</span>
          <span>Controller vs. Service Responsibilities</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">
          Which of the following responsibilities belongs inside <code>BookController</code> rather than <code>BookService</code>?
        </div>
        <div class="quiz-options" data-qid="qc-3-3">
          <div class="quiz-option" data-opt="0">
            <div class="option-indicator">A</div>
            <div class="option-text">Calculating the mathematical total pages from page size and total count.</div>
          </div>
          <div class="quiz-option" data-opt="1">
            <div class="option-indicator">B</div>
            <div class="option-text">Calling <code>_context.Books.FindAsync(id)</code> to load database entities.</div>
          </div>
          <div class="quiz-option" data-opt="2">
            <div class="option-indicator">C</div>
            <div class="option-text">Translating service outcomes into HTTP status codes like <code>201 Created</code> with a <code>Location</code> header.</div>
          </div>
          <div class="quiz-option" data-opt="3">
            <div class="option-indicator">D</div>
            <div class="option-text">Validating that an author association does not already exist before associating it.</div>
          </div>
        </div>
        <div class="exercise-footer">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-3-3">Submit Answer</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-3-3" style="display:none;">Retry</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-3-3"></div>
      </div>
    </div>

  </div>

  <div class="lesson-nav-footer">
    <button class="btn-complete-lesson" data-lesson="lesson-3">
      <span class="complete-checkbox">✓</span> Mark Lesson 3 Complete
    </button>
    <button class="btn-primary btn-next-lesson" data-target="lesson-4">
      Next: Model Binding &amp; Request Data →
    </button>
  </div>
`
  },
  {
    id: "lesson-4",
    badge: "4",
    nav: "Model Binding & Request Data",
    content: `
  <div class="lesson-header-box">
    <div class="lesson-meta-bar">
      <span class="lesson-pill">Lesson 4</span>
      <span class="badge-time">30 min read & exercise</span>
    </div>
    <h1 class="lesson-h1">Model Binding &amp; Request Data</h1>
    <p class="lesson-lead">
      Discover how ASP.NET Core bridges the gap between raw HTTP text and strongly-typed C# parameters, how parameter inference works, and how JSON deserialization failures trigger automatic 400 ProblemDetails.
    </p>
  </div>

  <div class="content-body">
    <h2>1. The Model Binding Engine</h2>
    <p>
      When an HTTP request strikes an action method, ASP.NET Core's <strong>Model Binding engine</strong> interrogates the incoming HTTP message, extracts values from various locations, and converts them into strongly-typed .NET method parameters.
    </p>

    <h3>The Explicit Binding Source Attributes</h3>
    <p>
      ASP.NET Core provides dedicated attributes in <code>Microsoft.AspNetCore.Mvc</code> to specify exactly where each parameter must originate:
    </p>

    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Attribute</th>
            <th>Data Source</th>
            <th>Example in HTTP Wire Message</th>
            <th>Primary Use Case in Raff</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>[FromRoute]</code></td>
            <td>URL Route Data</td>
            <td><code>/api/books/<strong>42</strong></code></td>
            <td>Resource identifiers (e.g. <code>int id</code>)</td>
          </tr>
          <tr>
            <td><code>[FromQuery]</code></td>
            <td>URL Query String</td>
            <td><code>/api/books?<strong>page=2&amp;pageSize=10</strong></code></td>
            <td>Filtering, sorting, pagination, and projection flags</td>
          </tr>
          <tr>
            <td><code>[FromBody]</code></td>
            <td>Request Message Body</td>
            <td><code>{"title": "Al-Kutub", ...}</code></td>
            <td>Complex objects, DTOs, JSON payloads</td>
          </tr>
          <tr>
            <td><code>[FromHeader]</code></td>
            <td>HTTP Request Headers</td>
            <td><code>X-Tenant-Id: raff-sa</code></td>
            <td>Metadata, idempotency tokens, tenant IDs</td>
          </tr>
          <tr>
            <td><code>[FromForm]</code></td>
            <td>Form data / Multi-part</td>
            <td><code>Content-Type: multipart/form-data</code></td>
            <td>File uploads (e.g. <code>IFormFile coverImage</code>)</td>
          </tr>
          <tr>
            <td><code>[FromServices]</code></td>
            <td>DI Container</td>
            <td>Injected from <code>IServiceProvider</code></td>
            <td>Resolving services per-action instead of constructor</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>2. Parameter Inference Rules of <code>[ApiController]</code></h2>
    <p>
      When your controller has the <code>[ApiController]</code> attribute, ASP.NET Core applies automatic <strong>parameter inference rules</strong>:
    </p>
    <ul>
      <li><strong>Complex types:</strong> Any class or record (e.g., <code>createBookDto dto</code>) is inferred as <code>[FromBody]</code>.</li>
      <li><strong>Route parameters:</strong> Any simple type whose name matches a route template parameter (e.g. <code>int id</code> matching <code>"{id:int}"</code>) is inferred as <code>[FromRoute]</code>.</li>
      <li><strong>Other simple types:</strong> Any simple type (e.g. <code>int page</code>, <code>string? search</code>, <code>bool includeAuthors</code>) not in the route template is inferred as <code>[FromQuery]</code>.</li>
      <li><strong>IFormFile:</strong> Inferred as <code>[FromForm]</code>.</li>
    </ul>

    <div class="callout callout-important">
      <div class="callout-icon">⭐</div>
      <div class="callout-content">
        <div class="callout-title">Why Explicit Attributes Improve Code Clarity &amp; OpenAPI</div>
        <p>
          While inference works, explicitly adding <code>[FromRoute]</code>, <code>[FromQuery]</code>, and <code>[FromBody]</code> is standard professional practice:
        </p>
        <ol style="margin-top:0.5rem;">
          <li>It makes code self-documenting during peer reviews.</li>
          <li>It prevents accidental breaking changes if route templates change.</li>
          <li>It ensures OpenAPI / Swagger schemas accurately tag parameters in client SDK generation.</li>
          <li><strong>Crucial Body Rule:</strong> Only <em>one</em> parameter can be bound with <code>[FromBody]</code> per action, because the HTTP request stream is forward-only by default and cannot be read twice.</li>
        </ol>
      </div>
    </div>

    <h2>3. Anatomical Example: Deconstructing <code>GetBook</code></h2>
    <p>
      Examine this realistic action from Raff:
    </p>

    <div class="code-container">
      <div class="code-header">
        <div class="code-badge-group">
          <span class="code-lang-tag">C#</span>
          <span class="code-filename">Controllers/BookController.cs</span>
          <span class="code-type-pill">Action Signature</span>
        </div>
        <button class="btn-copy-code" data-code="[HttpGet(&quot;{id:int}&quot;)]
public async Task&lt;IActionResult&gt; GetBook(
    [FromRoute] int id,
    [FromQuery] bool includeAuthors = false)
{
    var book = await _bookService.GetBookByIdAsync(id, includeAuthors);
    return Ok(book);
}">Copy Action</button>
      </div>
      <pre><code class="language-csharp">[HttpGet("{id:int}")]
public async Task&lt;IActionResult&gt; GetBook(
    [FromRoute] int id,
    [FromQuery] bool includeAuthors = false)
{
    var book = await _bookService.GetBookByIdAsync(id, includeAuthors);
    return Ok(book);
}</code></pre>
      <div class="code-explanation">
        <strong>Trace:</strong> When a client sends <code>GET /api/books/42?includeAuthors=true</code>, the binding engine extracts <code>42</code> from the URL segment matching <code>{id:int}</code> and parses it into <code>int id</code>. It parses the query string <code>?includeAuthors=true</code> into boolean <code>true</code>.
      </div>
    </div>

    <h2>4. Query Strings vs. Route Parameters vs. Request Bodies</h2>
    <p>
      When designing REST APIs, how do you decide where a piece of information belongs?
    </p>
    <ul>
      <li><strong>Route Parameter (<code>/api/books/{id}</code>):</strong> Used for <em>resource identity</em>. Which specific book or author are you addressing?</li>
      <li><strong>Query String (<code>?page=1&amp;pageSize=10&amp;includeAuthors=true</code>):</strong> Used for <em>modifiers</em>: pagination, filtering, searching, sorting, and projection flags. They should always have sensible defaults.</li>
      <li><strong>Request Body:</strong> Used for <em>data payloads</em> being created or updated, or for complex filter criteria that exceed URL length limits (though standard GET requests should avoid request bodies).</li>
    </ul>

    <h2>5. JSON Deserialization &amp; What Happens When Types Fail</h2>
    <p>
      In ASP.NET Core, request bodies are deserialized using <code>System.Text.Json</code>. But what happens if incoming data cannot be converted to the expected type?
    </p>

    <div class="code-container">
      <div class="code-header">
        <div class="code-badge-group">
          <span class="code-lang-tag">HTTP</span>
          <span class="code-filename">Malformed Request</span>
          <span class="code-type-pill">Invalid Type</span>
        </div>
      </div>
      <pre><code class="language-http">GET /api/books/42?includeAuthors=yesterday HTTP/1.1
Host: api.raff.local</code></pre>
      <div class="code-explanation">
        <strong>Execution Path:</strong> The value provider tries to parse <code>"yesterday"</code> into a C# <code>bool</code>. It fails and records an error entry in <code>ModelState</code>.
      </div>
    </div>

    <p>
      Because <code>BookController</code> has the <code>[ApiController]</code> attribute, ASP.NET Core registers an automatic action filter (<code>ModelStateInvalidFilter</code>). When <code>ModelState.IsValid == false</code>, ASP.NET Core <strong>immediately short-circuits the pipeline</strong>:
    </p>
    <ol>
      <li>Your action method <code>GetBook</code> is <strong>never executed</strong>.</li>
      <li>The framework constructs an RFC 7807 <code>ProblemDetails</code> object detailing the invalid fields.</li>
      <li>The server returns a <span class="status-badge status-4xx">400 Bad Request</span> response:</li>
    </ol>

    <div class="code-container">
      <div class="code-header">
        <div class="code-badge-group">
          <span class="code-lang-tag">JSON</span>
          <span class="code-filename">Automatic ProblemDetails 400 Response</span>
          <span class="code-type-pill">RFC 7807</span>
        </div>
      </div>
      <pre><code class="language-json">{
  "type": "https://tools.ietf.org/html/rfc9110#section-15.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "errors": {
    "includeAuthors": [
      "The value 'yesterday' is not valid for Boolean."
    ]
  },
  "traceId": "00-84a27364b9981f4a-b94f6c469b61d33d-00"
}</code></pre>
    </div>

    <!-- Knowledge Check 4.1 -->
    <div class="exercise-card" id="qc-4-1">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">Knowledge Check 4.1</span>
          <span>Binding Source Selection</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">
          In Raff, you are implementing an endpoint to filter books by publishing year and category: <code>GET /api/books?year=2024&amp;category=fiction</code>. Which binding attribute is most appropriate for the <code>int? year</code> and <code>string? category</code> action parameters?
        </div>
        <div class="quiz-options" data-qid="qc-4-1">
          <div class="quiz-option" data-opt="0">
            <div class="option-indicator">A</div>
            <div class="option-text"><code>[FromBody]</code>, because they filter a collection of books.</div>
          </div>
          <div class="quiz-option" data-opt="1">
            <div class="option-indicator">B</div>
            <div class="option-text"><code>[FromRoute]</code>, because year and category are stored in the database.</div>
          </div>
          <div class="quiz-option" data-opt="2">
            <div class="option-indicator">C</div>
            <div class="option-text"><code>[FromQuery]</code>, because they represent optional modifiers passed via URL query string parameters.</div>
          </div>
          <div class="quiz-option" data-opt="3">
            <div class="option-indicator">D</div>
            <div class="option-text"><code>[FromHeader]</code>, because query parameters must be passed in HTTP headers.</div>
          </div>
        </div>
        <div class="exercise-footer">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-4-1">Submit Answer</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-4-1" style="display:none;">Retry</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-4-1"></div>
      </div>
    </div>

    <!-- Knowledge Check 4.2 -->
    <div class="exercise-card" id="qc-4-2">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">Knowledge Check 4.2</span>
          <span>Single Body Parameter Rule</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">
          A developer writes this controller action:
          <br>
          <code>public IActionResult Create([FromBody] BookDto book, [FromBody] AuthorDto author)</code>
          <br>
          What happens when a client sends a request to this endpoint in ASP.NET Core?
        </div>
        <div class="quiz-options" data-qid="qc-4-2">
          <div class="quiz-option" data-opt="0">
            <div class="option-indicator">A</div>
            <div class="option-text">ASP.NET Core automatically merges both objects from the JSON payload.</div>
          </div>
          <div class="quiz-option" data-opt="1">
            <div class="option-indicator">B</div>
            <div class="option-text">An exception is thrown or model binding fails because ASP.NET Core only supports a single <code>[FromBody]</code> parameter per action by default due to forward-only request stream reading.</div>
          </div>
          <div class="quiz-option" data-opt="2">
            <div class="option-indicator">C</div>
            <div class="option-text">The first parameter binds from the body, and the second binds from the query string automatically.</div>
          </div>
          <div class="quiz-option" data-opt="3">
            <div class="option-indicator">D</div>
            <div class="option-text">ASP.NET Core splits the HTTP body in half using byte count.</div>
          </div>
        </div>
        <div class="exercise-footer">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-4-2">Submit Answer</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-4-2" style="display:none;">Retry</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-4-2"></div>
      </div>
    </div>

    <!-- Knowledge Check 4.3 -->
    <div class="exercise-card" id="qc-4-3">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">Knowledge Check 4.3</span>
          <span>Automatic 400 ProblemDetails Behavior</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">
          If a client sends <code>publishedYear: "not-a-number"</code> to an action with <code>createBookDto dto</code> (where publishedYear is <code>int</code>) in an <code>[ApiController]</code> class, why does the action method code never execute?
        </div>
        <div class="quiz-options" data-qid="qc-4-3">
          <div class="quiz-option" data-opt="0">
            <div class="option-indicator">A</div>
            <div class="option-text">PostgreSQL intercepts the query before Kestrel receives it.</div>
          </div>
          <div class="quiz-option" data-opt="1">
            <div class="option-indicator">B</div>
            <div class="option-text">The <code>[ApiController]</code> attribute automatically registers an action filter that short-circuits the pipeline and returns 400 ProblemDetails when <code>ModelState.IsValid</code> is false.</div>
          </div>
          <div class="quiz-option" data-opt="2">
            <div class="option-indicator">C</div>
            <div class="option-text">The C# compiler throws a compile-time syntax error on the server.</div>
          </div>
          <div class="quiz-option" data-opt="3">
            <div class="option-indicator">D</div>
            <div class="option-text">The Kestrel web server terminates the TCP socket with a reset packet.</div>
          </div>
        </div>
        <div class="exercise-footer">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-4-3">Submit Answer</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-4-3" style="display:none;">Retry</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-4-3"></div>
      </div>
    </div>

  </div>

  <div class="lesson-nav-footer">
    <button class="btn-complete-lesson" data-lesson="lesson-4">
      <span class="complete-checkbox">✓</span> Mark Lesson 4 Complete
    </button>
    <button class="btn-primary btn-next-lesson" data-target="lesson-5">
      Next: Entities, DTOs &amp; API Contracts →
    </button>
  </div>
`
  },
  {
    id: "lesson-5",
    badge: "5",
    nav: "Entities, DTOs & Contracts",
    content: `
  <div class="lesson-header-box">
    <div class="lesson-meta-bar">
      <span class="lesson-pill">Lesson 5</span>
      <span class="badge-time">35 min read & exercise</span>
    </div>
    <h1 class="lesson-h1">Entities, DTOs, &amp; API Contracts</h1>
    <p class="lesson-lead">
      Understand why returning database entities directly can cause mass-assignment vulnerabilities, circular serialization crashes, and tight architectural coupling—and how to craft resilient DTO contracts.
    </p>
  </div>

  <div class="content-body">
    <h2>1. Entities vs. Data Transfer Objects (DTOs)</h2>
    <p>
      In your Raff codebase, you have database entities like <code>Book</code> and DTO records like <code>createBookDto</code> and <code>BookDto</code>. Let's define the fundamental distinction:
    </p>

    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Concept</th>
            <th>Primary Purpose</th>
            <th>Lifespan &amp; Scope</th>
            <th>Contains</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>EF Core Entity</strong> (e.g. <code>Book</code>)</td>
            <td>Represents database storage structure and relational persistence state.</td>
            <td>Internal to the data access / service layer; tracked by <code>DbContext</code>.</td>
            <td>Primary keys, foreign keys, navigation properties (<code>Authors</code>), database column types, audit timestamps.</td>
          </tr>
          <tr>
            <td><strong>DTO</strong> (e.g. <code>CreateBookDto</code>, <code>BookDto</code>)</td>
            <td>Represents the public API wire contract between client and server.</td>
            <td>External wire format; serialized to / from JSON over HTTP.</td>
            <td>Only the exact fields required for that specific client operation.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>2. The Four Deadly Sins of Returning Entities Directly</h2>
    <p>
      Many beginning developers ask: <em>"Why not just return <code>await context.Books.ToListAsync()</code> directly from the controller?"</em>
      <br>
      Here are the four reasons why doing so in production creates severe bugs and security vulnerabilities:
    </p>

    <div class="callout callout-danger">
      <div class="callout-icon">💣</div>
      <div class="callout-content">
        <div class="callout-title">1. Over-Posting / Mass Assignment Vulnerability</div>
        <p>
          If your action binds directly to an entity: <code>public IActionResult Create([FromBody] Book book)</code>, an attacker can submit:
        </p>
        <pre style="margin: 0.5rem 0; padding: 0.5rem;"><code class="language-json">{
  "title": "Innocent Book",
  "isDeleted": true,
  "tenantId": "victim-company",
  "approvedByAdmin": true
}</code></pre>
        <p>
          If the <code>Book</code> entity contains those properties, ASP.NET Core binds them directly! EF Core will save them to the database without your code realizing. DTOs act as a strict whitelist.
        </p>
      </div>
    </div>

    <div class="callout callout-danger">
      <div class="callout-icon">🔄</div>
      <div class="callout-content">
        <div class="callout-title">2. Circular Reference / Serialization Crash</div>
        <p>
          In Raff, a <code>Book</code> has a list of <code>Authors</code>, and an <code>Author</code> has a list of <code>Books</code>. When <code>System.Text.Json</code> attempts to serialize the entity, it attempts:
          <br>
          <code>Book → Author → Book → Author → ...</code>
          <br>
          The serializer throws <code>JsonException: A possible object cycle was detected</code> and the API returns a 500 error!
        </p>
      </div>
    </div>

    <div class="callout callout-warning">
      <div class="callout-icon">🔓</div>
      <div class="callout-content">
        <div class="callout-title">3. Accidental Exposure of Sensitive / Internal Data</div>
        <p>
          Entities often contain internal metadata: PostgreSQL concurrency tokens (<code>xmin</code>), password hashes, soft-delete flags, internal IDs, or user audit logs. Returning entities leaks this internal structure to the public internet.
        </p>
      </div>
    </div>

    <div class="callout callout-warning">
      <div class="callout-icon">⛓️</div>
      <div class="callout-content">
        <div class="callout-title">4. Tight Architectural Coupling</div>
        <p>
          If you rename a column in your PostgreSQL table or normalize a table into two, every mobile and web client consuming your API immediately breaks! DTOs decouple your public contract from your database schema.
        </p>
      </div>
    </div>

    <h2>3. The DTO Taxonomy in Modern C#</h2>
    <p>
      In modern .NET (C# 9+), <strong>C# positional records</strong> provide the cleanest, immutable syntax for DTO contracts. Let's design the DTO family for Raff:
    </p>

    <div class="code-container">
      <div class="code-header">
        <div class="code-badge-group">
          <span class="code-lang-tag">C#</span>
          <span class="code-filename">DTOs/BookDtos.cs</span>
          <span class="code-type-pill">Contract Definitions</span>
        </div>
        <button class="btn-copy-code" data-code="// Request DTO for creating a book (No ID because PostgreSQL generates it)
public record CreateBookDto(
    string Title,
    int PublishedYear,
    string? Summary,
    string? CoverUrl);

// Request DTO for updating a book
public record UpdateBookDto(
    string? Title,
    int? PublishedYear,
    string? Summary,
    string? CoverUrl);

// Response DTO tailored for read operations (Hides DB internals)
public record BookDto(
    int Id,
    string Title,
    int PublishedYear,
    string? Summary,
    string? CoverUrl,
    IReadOnlyList&lt;AuthorSummaryDto&gt; Authors);

public record AuthorSummaryDto(
    int Id,
    string Name);">Copy DTO Definitions</button>
      </div>
      <pre><code class="language-csharp">// Request DTO for creating a book (No ID because PostgreSQL generates it)
public record CreateBookDto(
    string Title,
    int PublishedYear,
    string? Summary,
    string? CoverUrl);

// Request DTO for updating a book
public record UpdateBookDto(
    string? Title,
    int? PublishedYear,
    string? Summary,
    string? CoverUrl);

// Response DTO tailored for read operations (Hides DB internals)
public record BookDto(
    int Id,
    string Title,
    int PublishedYear,
    string? Summary,
    string? CoverUrl,
    IReadOnlyList&lt;AuthorSummaryDto&gt; Authors);

public record AuthorSummaryDto(
    int Id,
    string Name);</code></pre>
      <div class="code-explanation">
        <strong>Design Insights:</strong> Notice that <code>CreateBookDto</code> does not contain an <code>Id</code> property because the database generates it via auto-increment sequence. <code>BookDto</code> returns a clean <code>AuthorSummaryDto</code> list, preventing circular navigation property loops.
      </div>
    </div>

    <h2>4. Mapping Strategies: Manual Mapping vs. Libraries</h2>
    <p>
      In your <code>BookService.cs</code>, you currently map using private helper methods:
    </p>

    <div class="code-container">
      <div class="code-header">
        <div class="code-badge-group">
          <span class="code-lang-tag">C#</span>
          <span class="code-filename">Services/BookService.cs</span>
          <span class="code-type-pill">Manual Mapping</span>
        </div>
      </div>
      <pre><code class="language-csharp">private BookDto Map(Book b)
{
    return new BookDto(
        b.Id,
        b.Title,
        b.PublishedYear,
        b.Summary,
        b.CoverUrl,
        b.Authors.Select(a =&gt; new AuthorSummaryDto(a.Id, a.Name)).ToList()
    );
}</code></pre>
      <div class="code-explanation">
        <strong>Trade-off Analysis:</strong>
        <br>
        <strong>Manual Mapping (Recommended for most apps):</strong> Explicit, 100% compile-time verified, zero reflection overhead, easy to step through in debugger.
        <br>
        <strong>Libraries (AutoMapper, Mapster):</strong> Reduces boilerplate in massive systems with hundreds of entities, but can hide mapping errors until runtime and introduce hidden reflection costs.
      </div>
    </div>

    <h2>5. Mapping Data vs. Validating Business Rules</h2>
    <p>
      Never confuse <strong>mapping</strong> with <strong>business validation</strong>:
    </p>
    <ul>
      <li><strong>Mapping:</strong> Translates data from one object shape to another (e.g. copying <code>dto.Title</code> into <code>book.Title</code>).</li>
      <li><strong>Business Validation:</strong> Verifies domain rules and invariants (e.g. <em>"Is publishedYear between 1800 and the current year?"</em>, <em>"Does this author actually exist in the database?"</em>, <em>"Does the user have permission to modify this book?"</em>).</li>
    </ul>

    <!-- Knowledge Check 5.1 -->
    <div class="exercise-card" id="qc-5-1">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">Knowledge Check 5.1</span>
          <span>Security Risks of Exposing Entities</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">
          What is the primary security vulnerability created by accepting an EF Core database entity directly as a parameter in a <code>[HttpPost]</code> action method?
        </div>
        <div class="quiz-options" data-qid="qc-5-1">
          <div class="quiz-option" data-opt="0">
            <div class="option-indicator">A</div>
            <div class="option-text">SQL injection through the route parameter.</div>
          </div>
          <div class="quiz-option" data-opt="1">
            <div class="option-indicator">B</div>
            <div class="option-text">Over-posting / Mass Assignment: an attacker can submit JSON fields corresponding to internal entity properties that were never intended to be client-editable.</div>
          </div>
          <div class="quiz-option" data-opt="2">
            <div class="option-indicator">C</div>
            <div class="option-text">Cross-Site Scripting (XSS) in the database transaction log.</div>
          </div>
          <div class="quiz-option" data-opt="3">
            <div class="option-indicator">D</div>
            <div class="option-text">Buffer overflow in the Kestrel socket reader.</div>
          </div>
        </div>
        <div class="exercise-footer">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-5-1">Submit Answer</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-5-1" style="display:none;">Retry</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-5-1"></div>
      </div>
    </div>

    <!-- Knowledge Check 5.2 -->
    <div class="exercise-card" id="qc-5-2">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">Knowledge Check 5.2</span>
          <span>Circular Reference Resolution</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">
          In Raff, a <code>Book</code> entity references a list of <code>Author</code> entities, and each <code>Author</code> references a list of <code>Book</code> entities. Why does returning a dedicated <code>BookDto</code> resolve JSON serialization crashes?
        </div>
        <div class="quiz-options" data-qid="qc-5-2">
          <div class="quiz-option" data-opt="0">
            <div class="option-indicator">A</div>
            <div class="option-text">DTOs disable JSON compression on the wire.</div>
          </div>
          <div class="quiz-option" data-opt="1">
            <div class="option-indicator">B</div>
            <div class="option-text">The DTO defines a flat or hierarchical structure that severs the bi-directional navigation loop, projecting only the necessary author fields without referencing the book collection again.</div>
          </div>
          <div class="quiz-option" data-opt="2">
            <div class="option-indicator">C</div>
            <div class="option-text">DTOs force ASP.NET Core to serialize data as XML instead of JSON.</div>
          </div>
          <div class="quiz-option" data-opt="3">
            <div class="option-indicator">D</div>
            <div class="option-text">Entity Framework automatically deletes the author relationship when a DTO is created.</div>
          </div>
        </div>
        <div class="exercise-footer">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-5-2">Submit Answer</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-5-2" style="display:none;">Retry</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-5-2"></div>
      </div>
    </div>

    <!-- Knowledge Check 5.3 -->
    <div class="exercise-card" id="qc-5-3">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">Knowledge Check 5.3</span>
          <span>DTO Contract Design</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">
          Why is it recommended to have separate <code>CreateBookDto</code> and <code>BookDto</code> classes rather than reusing a single class for both creating and reading books?
        </div>
        <div class="quiz-options" data-qid="qc-5-3">
          <div class="quiz-option" data-opt="0">
            <div class="option-indicator">A</div>
            <div class="option-text">Because C# does not allow the same class to be used in more than one controller method.</div>
          </div>
          <div class="quiz-option" data-opt="1">
            <div class="option-indicator">B</div>
            <div class="option-text">Because creating a book does not supply a database-generated ID, whereas reading a book requires an ID; having separate DTOs accurately reflects the distinct contracts of the two operations.</div>
          </div>
          <div class="quiz-option" data-opt="2">
            <div class="option-indicator">C</div>
            <div class="option-text">Because EF Core throws an exception if an input parameter has the word "Response" in it.</div>
          </div>
          <div class="quiz-option" data-opt="3">
            <div class="option-indicator">D</div>
            <div class="option-text">To prevent PostgreSQL from caching query plans.</div>
          </div>
        </div>
        <div class="exercise-footer">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-5-3">Submit Answer</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-5-3" style="display:none;">Retry</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-5-3"></div>
      </div>
    </div>

  </div>

  <div class="lesson-nav-footer">
    <button class="btn-complete-lesson" data-lesson="lesson-5">
      <span class="complete-checkbox">✓</span> Mark Lesson 5 Complete
    </button>
    <button class="btn-primary btn-next-lesson" data-target="lesson-6">
      Next: PUT, PATCH &amp; Partial Updates →
    </button>
  </div>
`
  },
  {
    id: "lesson-6",
    badge: "6",
    nav: "PUT, PATCH & Partial Updates",
    content: `
  <div class="lesson-header-box">
    <div class="lesson-meta-bar">
      <span class="lesson-pill">Lesson 6</span>
      <span class="badge-time">40 min read & interactive playground</span>
    </div>
    <h1 class="lesson-h1">PUT, PATCH, Nullability, &amp; Partial Updates</h1>
    <p class="lesson-lead">
      This is the critical challenge you encountered while building Raff: Why does <code>if (dto.summary is not null)</code> prevent users from clearing book summaries, why can ordinary C# DTOs not differentiate between omitted fields and explicit nulls, and how do senior engineers solve partial updates?
    </p>
  </div>

  <div class="content-body">
    <h2>1. The Real-World Dilemma in Raff</h2>
    <p>
      In your <code>Raff.Services.BookService.cs</code>, lines 120–137 currently read:
    </p>

    <div class="code-container">
      <div class="code-header">
        <div class="code-badge-group">
          <span class="code-lang-tag">C#</span>
          <span class="code-filename">Raff/Services/BookService.cs (Current Implementation)</span>
          <span class="code-type-pill">Live Project Code</span>
        </div>
      </div>
      <pre><code class="language-csharp">public async Task&lt;BookDto&gt; UpdateBookAsync(int id, updateBookDto dto)
{
    var book = await context.Books.FindAsync(id);
    if (book == null) throw new KeyNotFoundException($"Book with ID {id} not found.");

    if (dto.title is not null)
        book.Title = dto.title;

    if (dto.summary is not null)
        book.Summary = dto.summary;

    if (dto.CoverUrl is not null)
        book.CoverUrl = dto.CoverUrl;

    if (dto.publishedYear is not null)
        book.PublishedYear = dto.publishedYear;

    await context.SaveChangesAsync();
    return Map(book);
}</code></pre>
      <div class="code-explanation">
        <strong>The Subtle Bug:</strong> At first glance, this code looks sensible. But let's test what happens when a user wants to <em>delete</em> or <em>clear</em> a book's summary.
      </div>
    </div>

    <h2>2. The JSON Tri-State Problem</h2>
    <p>
      Suppose an existing book in your PostgreSQL database has:
    </p>

    <div class="code-container">
      <div class="code-header">
        <div class="code-badge-group">
          <span class="code-lang-tag">JSON</span>
          <span class="code-filename">Current Database State in PostgreSQL</span>
          <span class="code-type-pill">Existing Record</span>
        </div>
      </div>
      <pre><code class="language-json">{
  "id": 42,
  "title": "C# Basics",
  "summary": "An introduction to C#",
  "coverUrl": "https://cdn.raff.local/covers/csharp.jpg",
  "publishedYear": 2022
}</code></pre>
    </div>

    <p>
      Now consider the three distinct actions a frontend user might intend when updating this book:
    </p>

    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Intent</th>
            <th>Client Sends in JSON Payload</th>
            <th>Desired Database State</th>
            <th>What Happens With <code>if (dto.summary is not null)</code>?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>1. Update summary</strong></td>
            <td><code>{"summary": "An advanced deep-dive"}</code></td>
            <td>Summary becomes <code>"An advanced deep-dive"</code></td>
            <td><strong style="color:var(--success);">Works.</strong> Property is not null, so it updates.</td>
          </tr>
          <tr>
            <td><strong>2. Clear / delete summary</strong></td>
            <td><code>{"title": "C# Basics", "summary": null}</code></td>
            <td>Summary becomes <code>null</code> in database</td>
            <td><strong style="color:var(--danger);">FAILS SILENTLY!</strong> <code>dto.summary is not null</code> evaluates to <strong>false</strong>! The summary remains <code>"An introduction to C#"</code>. The client's command is ignored!</td>
          </tr>
          <tr>
            <td><strong>3. Leave summary untouched</strong></td>
            <td><code>{"title": "C# 12 in Depth"}</code> (omitted)</td>
            <td>Summary remains <code>"An introduction to C#"</code></td>
            <td><strong style="color:var(--success);">Works.</strong> Summary is omitted, but for the wrong reason.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="callout callout-danger">
      <div class="callout-icon">🚨</div>
      <div class="callout-content">
        <div class="callout-title">The Fundamental Cause: Ordinary C# DTOs Conflate Tri-States</div>
        <p>
          In an ordinary C# class or record:
        </p>
        <pre style="margin: 0.5rem 0; padding: 0.5rem;"><code class="language-csharp">public record updateBookDto
{
    public string? title { get; set; }
    public string? summary { get; set; }
}</code></pre>
        <p>
          When <code>System.Text.Json</code> deserializes the request:
        </p>
        <ul style="margin-top:0.5rem;">
          <li>If the JSON sends <code>{"summary": null}</code> → <code>dto.summary</code> is <code>null</code>.</li>
          <li>If the JSON completely <em>omits</em> <code>summary</code> → <code>dto.summary</code> is <em>also</em> <code>null</code>!</li>
        </ul>
        <p style="margin-top:0.5rem;">
          The C# runtime value is identical in both cases. An ordinary nullable DTO property <strong>cannot distinguish</strong> between <em>"the client omitted this property"</em> and <em>"the client intentionally set this property to null"</em>!
        </p>
      </div>
    </div>

    <h2>3. The Second Trap: Calling EF Core's <code>Update()</code></h2>
    <p>
      Some developers attempt to solve this by creating an entity from the DTO and calling <code>context.Books.Update(book)</code>:
    </p>

    <div class="code-container">
      <div class="code-header">
        <div class="code-badge-group">
          <span class="code-lang-tag">C#</span>
          <span class="code-filename">The Blind Update Trap</span>
          <span class="code-type-pill">Severe Bug</span>
        </div>
      </div>
      <pre><code class="language-csharp">// DANGEROUS ANTI-PATTERN:
var book = new Book { Id = id, Title = dto.title };
context.Books.Update(book); // Marks EVERY column as Modified!
await context.SaveChangesAsync();</code></pre>
      <div class="code-explanation">
        <strong>Catastrophic Consequence:</strong> In EF Core, calling <code>Update(entity)</code> sets the state of <strong>every single property</strong> on that entity to <code>EntityState.Modified</code>. Since <code>publishedYear</code> was omitted in <code>dto</code>, it defaults to <code>0</code>. EF Core sends an SQL update setting <code>published_year = 0</code> and <code>summary = NULL</code>, wiping out valid data in PostgreSQL!
      </div>
    </div>

    <h2>4. Nullable Reference Types (NRT) vs. Runtime Nulls</h2>
    <p>
      Do not confuse C# Nullable Reference Types (<code>string?</code>) with runtime behavior:
    </p>
    <ul>
      <li><strong>Nullable Reference Types (C# 8+):</strong> A <em>compile-time compiler annotation</em>. It produces compiler warnings to help prevent <code>NullReferenceException</code>. At runtime, both <code>string</code> and <code>string?</code> are compiled to identical <code>System.String</code> metadata.</li>
      <li><strong>Runtime Nulls:</strong> An actual null reference in memory. <code>System.Text.Json</code> deserializes JSON <code>null</code> to a C# <code>null</code> reference regardless of whether NRT is enabled.</li>
    </ul>

    <h2>5. The Four Architectural Approaches to Partial Updates</h2>
    <p>
      There is no single "magic" button in ASP.NET Core for partial updates. Senior backend engineers evaluate the trade-offs among four distinct approaches:
    </p>

    <h3>Approach A: Explicit Presence Tracking (Optional&lt;T&gt; Wrapper)</h3>
    <p>
      Wrap DTO properties in a generic structure that tracks whether the field was present in the JSON:
    </p>
    <div class="code-container">
      <div class="code-header">
        <div class="code-badge-group">
          <span class="code-lang-tag">C#</span>
          <span class="code-filename">Presence Tracking Wrapper</span>
          <span class="code-type-pill">Strongly Typed Pattern</span>
        </div>
      </div>
      <pre><code class="language-csharp">public readonly struct Optional&lt;T&gt;
{
    public bool IsSpecified { get; }
    public T? Value { get; }

    public Optional(T? value)
    {
        IsSpecified = true;
        Value = value;
    }
}

public class PatchBookDto
{
    public Optional&lt;string?&gt; Title { get; set; }
    public Optional&lt;string?&gt; Summary { get; set; }
}

// In BookService:
if (dto.Summary.IsSpecified)
{
    // If client sent "summary": null, Value is null and IsSpecified is true!
    // The summary is correctly cleared in the database!
    book.Summary = dto.Summary.Value;
}</code></pre>
      <div class="code-explanation">
        <strong>Trade-offs:</strong>
        <br>
        <strong>Pros:</strong> 100% strongly typed, clean service code, distinguishes omitted from null cleanly.
        <br>
        <strong>Cons:</strong> Requires writing or importing a custom <code>System.Text.Json.Serialization.JsonConverter</code> for <code>Optional&lt;T&gt;</code>.
      </div>
    </div>

    <h3>Approach B: JSON Merge Patch (RFC 7396)</h3>
    <p>
      RFC 7396 defines a standard media type: <code>application/merge-patch+json</code>.
    </p>
    <ul>
      <li>If a key is set to a value: update it.</li>
      <li>If a key is set to <code>null</code>: remove / clear it.</li>
      <li>If a key is omitted: leave existing value untouched.</li>
    </ul>

    <div class="callout callout-important">
      <div class="callout-icon">⚠️</div>
      <div class="callout-content">
        <div class="callout-title">Does ASP.NET Core Include Built-In RFC 7396 Support?</div>
        <p>
          <strong>No.</strong> ASP.NET Core does <em>not</em> automatically implement RFC 7396 JSON Merge Patch for arbitrary C# records or DTOs out of the box. To use JSON Merge Patch in ASP.NET Core, you must either inspect raw <code>JsonDocument</code> / <code>JsonElement</code> nodes directly, or use community libraries (such as Morcatko.AspNetCore.JsonMergePatch).
        </p>
      </div>
    </div>

    <h3>Approach C: JSON Patch (RFC 6902)</h3>
    <p>
      RFC 6902 defines <code>application/json-patch+json</code>. Instead of sending a partial document, the client sends an array of operations:
    </p>
    <div class="code-container">
      <div class="code-header">
        <div class="code-badge-group">
          <span class="code-lang-tag">JSON</span>
          <span class="code-filename">RFC 6902 Operations Array</span>
          <span class="code-type-pill">Wire Payload</span>
        </div>
      </div>
      <pre><code class="language-json">[
  { "op": "replace", "path": "/title", "value": "Advanced C#" },
  { "op": "replace", "path": "/summary", "value": null }
]</code></pre>
      <div class="code-explanation">
        <strong>Trade-offs:</strong>
        <br>
        <strong>Pros:</strong> Supported officially via <code>Microsoft.AspNetCore.JsonPatch</code> NuGet package and <code>patchDoc.ApplyTo(book)</code>.
        <br>
        <strong>Cons:</strong> Frontend developers dislike formatting requests as operation arrays; historically required Newtonsoft.Json.
      </div>
    </div>

    <h3>Approach D: Fine-Grained Sub-Resource / RPC Endpoints</h3>
    <p>
      Avoid partial update ambiguity entirely by exposing clear, intention-revealing endpoints:
    </p>
    <ul>
      <li><code>DELETE /api/books/42/summary</code> — Explicitly clears the summary.</li>
      <li><code>PUT /api/books/42/cover</code> — Sets or replaces the cover.</li>
      <li><code>PUT /api/books/42</code> — Full replacement (all fields required; omitted fields become null/default).</li>
    </ul>

    <!-- Interactive Partial Update Playground -->
    <div class="simulator-widget">
      <div class="simulator-header">
        <span class="simulator-title">🎮 Interactive Simulator: The Partial Update Dilemma</span>
      </div>
      <div class="simulator-body">
        <p style="font-size:0.9rem; margin-bottom:1rem; color:var(--text-secondary);">
          <strong>Initial Database Record for Book #42:</strong>
          <br>
          <code>{ title: "C# Basics", summary: "An introduction to C#", coverUrl: "cover.jpg", publishedYear: 2022 }</code>
        </p>

        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:1rem; margin-bottom:1.25rem;">
          <div>
            <label style="font-weight:600; font-size:0.8rem; color:var(--text-muted); text-transform:uppercase;">1. Choose Client Request Payload:</label>
            <select id="sim-payload-select" style="width:100%; margin-top:0.4rem; padding:0.6rem; border-radius:var(--radius-sm); background:var(--bg-secondary); color:var(--text-primary); border:1px solid var(--border-color); font-family:var(--font-mono); font-size:0.85rem;">
              <option value="explicit_null">{"title": "Advanced C#", "summary": null}</option>
              <option value="omitted">{"title": "Advanced C#"}</option>
              <option value="new_string">{"summary": "A deep dive into C#"}</option>
            </select>
          </div>
          <div>
            <label style="font-weight:600; font-size:0.8rem; color:var(--text-muted); text-transform:uppercase;">2. Choose Server Implementation:</label>
            <select id="sim-algo-select" style="width:100%; margin-top:0.4rem; padding:0.6rem; border-radius:var(--radius-sm); background:var(--bg-secondary); color:var(--text-primary); border:1px solid var(--border-color); font-size:0.85rem;">
              <option value="naive">Raff's Naive \`if (dto.summary is not null)\`</option>
              <option value="ef_update">EF Core \`context.Update(book)\` with partial entity</option>
              <option value="presence">Explicit Presence Tracking (\`Optional&lt;T&gt;\`)</option>
              <option value="full_put">Strict HTTP PUT (Full Replacement)</option>
            </select>
          </div>
        </div>

        <button class="btn-primary" id="btn-run-sim">Run Simulation</button>

        <div id="sim-result-box" style="margin-top:1.25rem; padding:1.25rem; border-radius:var(--radius-sm); background:var(--bg-secondary); border:1px solid var(--border-color); display:none;">
          <div style="font-weight:700; font-size:0.95rem; margin-bottom:0.5rem;" id="sim-result-title"></div>
          <div style="font-family:var(--font-mono); font-size:0.85rem; padding:0.75rem; background:var(--bg-code); border-radius:4px; margin-bottom:0.75rem;" id="sim-result-json"></div>
          <div style="font-size:0.875rem; color:var(--text-secondary); line-height:1.6;" id="sim-result-analysis"></div>
        </div>
      </div>
    </div>

    <!-- Knowledge Check 6.1 -->
    <div class="exercise-card" id="qc-6-1">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">Knowledge Check 6.1</span>
          <span>The Naive Null Check Flaw</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">
          In Raff's <code>UpdateBookAsync</code>, why does the check <code>if (dto.summary is not null) book.Summary = dto.summary;</code> fail when a client intentionally wants to delete an existing summary by sending <code>{"summary": null}</code>?
        </div>
        <div class="quiz-options" data-qid="qc-6-1">
          <div class="quiz-option" data-opt="0">
            <div class="option-indicator">A</div>
            <div class="option-text">Because <code>dto.summary</code> is null, the condition evaluates to false and the assignment is skipped, leaving the old database value intact.</div>
          </div>
          <div class="quiz-option" data-opt="1">
            <div class="option-indicator">B</div>
            <div class="option-text">Because PostgreSQL throws a table lock exception when saving null strings.</div>
          </div>
          <div class="quiz-option" data-opt="2">
            <div class="option-indicator">C</div>
            <div class="option-text">Because C# records cannot store null values under any circumstances.</div>
          </div>
          <div class="quiz-option" data-opt="3">
            <div class="option-indicator">D</div>
            <div class="option-text">Because ASP.NET Core converts JSON null into an empty string <code>""</code>.</div>
          </div>
        </div>
        <div class="exercise-footer">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-6-1">Submit Answer</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-6-1" style="display:none;">Retry</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-6-1"></div>
      </div>
    </div>

    <!-- Knowledge Check 6.2 -->
    <div class="exercise-card" id="qc-6-2">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">Knowledge Check 6.2</span>
          <span>Omitted vs Explicit Null Distinction</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">
          Why does an ordinary C# class with <code>public string? Summary { get; set; }</code> fail to distinguish whether a JSON request omitted <code>summary</code> or explicitly set <code>"summary": null</code>?
        </div>
        <div class="quiz-options" data-qid="qc-6-2">
          <div class="quiz-option" data-opt="0">
            <div class="option-indicator">A</div>
            <div class="option-text">Because C# compiler optimizations strip property names during build.</div>
          </div>
          <div class="quiz-option" data-opt="1">
            <div class="option-indicator">B</div>
            <div class="option-text">Because the JSON deserializer sets the C# reference to null in both cases, leaving no presence metadata on the object.</div>
          </div>
          <div class="quiz-option" data-opt="2">
            <div class="option-indicator">C</div>
            <div class="option-text">Because the HTTP protocol forbids omitting properties in JSON bodies.</div>
          </div>
          <div class="quiz-option" data-opt="3">
            <div class="option-indicator">D</div>
            <div class="option-text">Because Entity Framework Core requires all DTO properties to be non-nullable.</div>
          </div>
        </div>
        <div class="exercise-footer">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-6-2">Submit Answer</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-6-2" style="display:none;">Retry</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-6-2"></div>
      </div>
    </div>

    <!-- Knowledge Check 6.3 -->
    <div class="exercise-card" id="qc-6-3">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">Knowledge Check 6.3</span>
          <span>EF Core Update() Misconception</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">
          What happens if you instantiate a <code>new Book { Id = 42, Title = "New Title" }</code> from a partial DTO and call <code>context.Books.Update(book)</code> in EF Core?
        </div>
        <div class="quiz-options" data-qid="qc-6-3">
          <div class="quiz-option" data-opt="0">
            <div class="option-indicator">A</div>
            <div class="option-text">EF Core automatically fetches the database row, merges the title, and preserves all other columns.</div>
          </div>
          <div class="quiz-option" data-opt="1">
            <div class="option-indicator">B</div>
            <div class="option-text">EF Core marks every property as Modified, so unpopulated fields (default 0 for PublishedYear, null for Summary and CoverUrl) overwrite existing database data!</div>
          </div>
          <div class="quiz-option" data-opt="2">
            <div class="option-indicator">C</div>
            <div class="option-text">EF Core ignores the call unless all navigation properties are loaded.</div>
          </div>
          <div class="quiz-option" data-opt="3">
            <div class="option-indicator">D</div>
            <div class="option-text">PostgreSQL converts the query into a table truncate operation.</div>
          </div>
        </div>
        <div class="exercise-footer">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-6-3">Submit Answer</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-6-3" style="display:none;">Retry</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-6-3"></div>
      </div>
    </div>

    <!-- Knowledge Check 6.4 -->
    <div class="exercise-card" id="qc-6-4">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">Knowledge Check 6.4</span>
          <span>JSON Merge Patch Framework Support</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">
          Does ASP.NET Core provide automatic, out-of-the-box RFC 7396 (JSON Merge Patch) handling for an arbitrary C# record/DTO without additional code or packages?
        </div>
        <div class="quiz-options" data-qid="qc-6-4">
          <div class="quiz-option" data-opt="0">
            <div class="option-indicator">A</div>
            <div class="option-text">Yes, ASP.NET Core natively supports RFC 7396 on any class decorated with [FromBody].</div>
          </div>
          <div class="quiz-option" data-opt="1">
            <div class="option-indicator">B</div>
            <div class="option-text">No. ASP.NET Core does not natively implement presence tracking or RFC 7396 semantics for arbitrary DTOs; developers must implement presence tracking (e.g. Optional&lt;T&gt;, JsonElement) or use custom converters/libraries.</div>
          </div>
          <div class="quiz-option" data-opt="2">
            <div class="option-indicator">C</div>
            <div class="option-text">Yes, but only if running on Windows Server.</div>
          </div>
          <div class="quiz-option" data-opt="3">
            <div class="option-indicator">D</div>
            <div class="option-text">Yes, by enabling Kestrel's MergePatch HTTP flag in appsettings.json.</div>
          </div>
        </div>
        <div class="exercise-footer">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-6-4">Submit Answer</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-6-4" style="display:none;">Retry</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-6-4"></div>
      </div>
    </div>

  </div>

  <div class="lesson-nav-footer">
    <button class="btn-complete-lesson" data-lesson="lesson-6">
      <span class="complete-checkbox">✓</span> Mark Lesson 6 Complete
    </button>
    <button class="btn-primary btn-next-lesson" data-target="lesson-7">
      Next: Putting The Concepts Together →
    </button>
  </div>
`
  },
  {
    id: "lesson-7",
    badge: "7",
    nav: "Putting Concepts Together",
    content: `
  <div class="lesson-header-box">
    <div class="lesson-meta-bar">
      <span class="lesson-pill">Lesson 7</span>
      <span class="badge-time">30 min read & architectural review</span>
    </div>
    <h1 class="lesson-h1">Putting The Concepts Together</h1>
    <p class="lesson-lead">
      Connect every concept you've learned—HTTP requests, attribute routing, model binding, DTO contracts, service boundaries, EF Core persistence, and proper REST status codes—into a clean, cohesive architecture for Raff.
    </p>
  </div>

  <div class="content-body">
    <h2>1. The End-to-End Books Architecture</h2>
    <p>
      Let's examine how each layer in Raff works together with clean separation of concerns when a client creates a book:
    </p>

    <div class="code-container">
      <div class="code-header">
        <div class="code-badge-group">
          <span class="code-lang-tag">C#</span>
          <span class="code-filename">Domain/Entities/Book.cs</span>
          <span class="code-type-pill">Database Persistence Model</span>
        </div>
        <button class="btn-copy-code" data-code="namespace Raff.Models;

public class Book
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public int PublishedYear { get; set; }
    public string? Summary { get; set; }
    public string? CoverUrl { get; set; }

    // EF Core Navigation Property
    public List&lt;Author&gt; Authors { get; set; } = new();

    // Internal database metadata (Never exposed over HTTP)
    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
}">Copy Entity</button>
      </div>
      <pre><code class="language-csharp">namespace Raff.Models;

public class Book
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public int PublishedYear { get; set; }
    public string? Summary { get; set; }
    public string? CoverUrl { get; set; }

    // EF Core Navigation Property
    public List&lt;Author&gt; Authors { get; set; } = new();

    // Internal database metadata (Never exposed over HTTP)
    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
}</code></pre>
      <div class="code-explanation">
        <strong>Entity Role:</strong> Mapped to PostgreSQL table <code>books</code>. Tracks relational state, internal audit fields, and navigation links.
      </div>
    </div>

    <div class="code-container">
      <div class="code-header">
        <div class="code-badge-group">
          <span class="code-lang-tag">C#</span>
          <span class="code-filename">DTOs/books/BookDtos.cs</span>
          <span class="code-type-pill">Public Wire Contracts</span>
        </div>
        <button class="btn-copy-code" data-code="using System.ComponentModel.DataAnnotations;

namespace Raff.DTOs;

public record CreateBookRequest(
    [Required, MaxLength(200)] string Title,
    [Range(0, 2100)] int PublishedYear,
    [MaxLength(2000)] string? Summary,
    [Url] string? CoverUrl);

public record BookResponse(
    int Id,
    string Title,
    int PublishedYear,
    string? Summary,
    string? CoverUrl,
    IReadOnlyList&lt;AuthorSummaryResponse&gt; Authors);

public record AuthorSummaryResponse(
    int Id,
    string Name);">Copy DTOs</button>
      </div>
      <pre><code class="language-csharp">using System.ComponentModel.DataAnnotations;

namespace Raff.DTOs;

public record CreateBookRequest(
    [Required, MaxLength(200)] string Title,
    [Range(0, 2100)] int PublishedYear,
    [MaxLength(2000)] string? Summary,
    [Url] string? CoverUrl);

public record BookResponse(
    int Id,
    string Title,
    int PublishedYear,
    string? Summary,
    string? CoverUrl,
    IReadOnlyList&lt;AuthorSummaryResponse&gt; Authors);

public record AuthorSummaryResponse(
    int Id,
    string Name);</code></pre>
      <div class="code-explanation">
        <strong>DTO Role:</strong> Strict public contracts. Data annotations guard incoming request bounds. <code>BookResponse</code> decouples clients from EF Core navigation graphs.
      </div>
    </div>

    <div class="code-container">
      <div class="code-header">
        <div class="code-badge-group">
          <span class="code-lang-tag">C#</span>
          <span class="code-filename">Services/BookService.cs</span>
          <span class="code-type-pill">Business &amp; Persistence Layer</span>
        </div>
        <button class="btn-copy-code" data-code="namespace Raff.Services;

public class BookService(BooksContext context) : IBookService
{
    public async Task&lt;BookResponse&gt; CreateBookAsync(CreateBookRequest request)
    {
        // 1. Map DTO to Entity
        var entity = new Book
        {
            Title = request.Title,
            PublishedYear = request.PublishedYear,
            Summary = request.Summary,
            CoverUrl = request.CoverUrl
        };

        // 2. Persist to PostgreSQL
        context.Books.Add(entity);
        await context.SaveChangesAsync();

        // 3. Map Entity to Response DTO
        return MapToResponse(entity);
    }

    private static BookResponse MapToResponse(Book b) =&gt;
        new(b.Id, b.Title, b.PublishedYear, b.Summary, b.CoverUrl,
            b.Authors.Select(a =&gt; new AuthorSummaryResponse(a.Id, a.Name)).ToList());
}">Copy Service</button>
      </div>
      <pre><code class="language-csharp">namespace Raff.Services;

public class BookService(BooksContext context) : IBookService
{
    public async Task&lt;BookResponse&gt; CreateBookAsync(CreateBookRequest request)
    {
        // 1. Map DTO to Entity
        var entity = new Book
        {
            Title = request.Title,
            PublishedYear = request.PublishedYear,
            Summary = request.Summary,
            CoverUrl = request.CoverUrl
        };

        // 2. Persist to PostgreSQL
        context.Books.Add(entity);
        await context.SaveChangesAsync();

        // 3. Map Entity to Response DTO
        return MapToResponse(entity);
    }

    private static BookResponse MapToResponse(Book b) =&gt;
        new(b.Id, b.Title, b.PublishedYear, b.Summary, b.CoverUrl,
            b.Authors.Select(a =&gt; new AuthorSummaryResponse(a.Id, a.Name)).ToList());
}</code></pre>
      <div class="code-explanation">
        <strong>Service Role:</strong> Zero knowledge of HTTP. No references to <code>HttpContext</code>, status codes, or <code>IActionResult</code>. Completely unit-testable.
      </div>
    </div>

    <div class="code-container">
      <div class="code-header">
        <div class="code-badge-group">
          <span class="code-lang-tag">C#</span>
          <span class="code-filename">Controllers/BookController.cs</span>
          <span class="code-type-pill">HTTP Adapter Layer</span>
        </div>
        <button class="btn-copy-code" data-code="using Microsoft.AspNetCore.Mvc;
using Raff.DTOs;
using Raff.Services;

namespace Raff.Controllers;

[ApiController]
[Route(&quot;api/[controller]&quot;)]
public class BookController(IBookService bookService) : ControllerBase
{
    [HttpGet(&quot;{id:int}&quot;)]
    public async Task&lt;IActionResult&gt; GetBook([FromRoute] int id)
    {
        var book = await bookService.GetBookByIdAsync(id);
        return Ok(book);
    }

    [HttpPost]
    public async Task&lt;IActionResult&gt; Create([FromBody] CreateBookRequest request)
    {
        var created = await bookService.CreateBookAsync(request);

        // RESTful Best Practice: 201 Created + Location Header
        return CreatedAtAction(
            nameof(GetBook),
            new { id = created.Id },
            created);
    }
}">Copy Controller</button>
      </div>
      <pre><code class="language-csharp">using Microsoft.AspNetCore.Mvc;
using Raff.DTOs;
using Raff.Services;

namespace Raff.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BookController(IBookService bookService) : ControllerBase
{
    [HttpGet("{id:int}")]
    public async Task&lt;IActionResult&gt; GetBook([FromRoute] int id)
    {
        var book = await bookService.GetBookByIdAsync(id);
        return Ok(book);
    }

    [HttpPost]
    public async Task&lt;IActionResult&gt; Create([FromBody] CreateBookRequest request)
    {
        var created = await bookService.CreateBookAsync(request);

        // RESTful Best Practice: 201 Created + Location Header
        return CreatedAtAction(
            nameof(GetBook),
            new { id = created.Id },
            created);
    }
}</code></pre>
      <div class="code-explanation">
        <strong>Controller Role:</strong> Pure HTTP gateway. Translates incoming JSON to DTO, delegates to service, and issues standard HTTP responses: <code>CreatedAtAction</code> generates <code>201 Created</code> with <code>Location: /api/books/42</code>.
      </div>
    </div>

    <h2>2. Responsibility Matrix Summary</h2>
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Component</th>
            <th>Primary Concern</th>
            <th>Allowed Dependencies</th>
            <th>Prohibited Dependencies</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Controller</strong></td>
            <td>HTTP status codes, routing, model binding, headers</td>
            <td>Services, DTOs, <code>ControllerBase</code></td>
            <td>Direct EF Core DbContext calls, business validation logic</td>
          </tr>
          <tr>
            <td><strong>Application Service</strong></td>
            <td>Business logic, workflow orchestration, entity mapping</td>
            <td>EF Core DbContext, Repositories, Domain models</td>
            <td><code>HttpContext</code>, <code>IActionResult</code>, HTTP status codes</td>
          </tr>
          <tr>
            <td><strong>EF Core Entity</strong></td>
            <td>Relational database representation &amp; persistence state</td>
            <td>Domain annotations, relational navigation</td>
            <td>API DTOs, HTTP libraries, JSON serialization attributes</td>
          </tr>
          <tr>
            <td><strong>DTO</strong></td>
            <td>Wire contract &amp; input validation rules</td>
            <td>Basic validation attributes</td>
            <td>Database libraries, EF Core references</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>3. Roadmap: Preparing For Later Modules</h2>
    <p>
      Congratulations! You have mastered the core foundations of HTTP, routing, model binding, DTO contracts, and update semantics. These foundational principles set the stage for upcoming modules in our backend curriculum:
    </p>
    <ul>
      <li><strong>Module 2 — Validation &amp; Error Handling:</strong> FluentValidation pipelines, custom validators, and centralized <code>IExceptionHandler</code> middleware.</li>
      <li><strong>Module 3 — EF Core Deep-Dive:</strong> Change tracking mechanics, N+1 query prevention, projection via <code>Select()</code>, and PostgreSQL concurrency tokens (<code>xmin</code>).</li>
      <li><strong>Module 4 — Architecture &amp; Testing:</strong> Clean Architecture boundaries, repository patterns, integration testing with <code>WebApplicationFactory</code> and Testcontainers.</li>
      <li><strong>Module 5 — Authentication &amp; Security:</strong> JWT bearer authentication, role/claim policies, and rate limiting.</li>
    </ul>

    <!-- Knowledge Check 7.1 -->
    <div class="exercise-card" id="qc-7-1">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">Knowledge Check 7.1</span>
          <span>CreatedAtAction Semantics</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">
          Why is <code>CreatedAtAction(nameof(GetBook), new { id = created.Id }, created)</code> preferred over <code>Ok(created)</code> when creating a resource via <code>[HttpPost]</code>?
        </div>
        <div class="quiz-options" data-qid="qc-7-1">
          <div class="quiz-option" data-opt="0">
            <div class="option-indicator">A</div>
            <div class="option-text">Because <code>CreatedAtAction</code> automatically generates the standard HTTP 201 Created status code and populates the <code>Location</code> response header with the URL of the newly created resource.</div>
          </div>
          <div class="quiz-option" data-opt="1">
            <div class="option-indicator">B</div>
            <div class="option-text">Because <code>Ok(created)</code> is not supported by ASP.NET Core in Post actions.</div>
          </div>
          <div class="quiz-option" data-opt="2">
            <div class="option-indicator">C</div>
            <div class="option-text">Because it forces PostgreSQL to commit the transaction immediately.</div>
          </div>
          <div class="quiz-option" data-opt="3">
            <div class="option-indicator">D</div>
            <div class="option-text">Because it prevents client browsers from caching GET requests.</div>
          </div>
        </div>
        <div class="exercise-footer">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-7-1">Submit Answer</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-7-1" style="display:none;">Retry</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-7-1"></div>
      </div>
    </div>

    <!-- Knowledge Check 7.2 -->
    <div class="exercise-card" id="qc-7-2">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">Knowledge Check 7.2</span>
          <span>Architectural Boundary Hygiene</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">
          Why is it considered an architectural anti-pattern for a method in <code>BookService</code> to return an <code>IActionResult</code> (such as <code>NotFound()</code> or <code>Ok()</code>)?
        </div>
        <div class="quiz-options" data-qid="qc-7-2">
          <div class="quiz-option" data-opt="0">
            <div class="option-indicator">A</div>
            <div class="option-text">Because <code>IActionResult</code> can only be returned by synchronous methods.</div>
          </div>
          <div class="quiz-option" data-opt="1">
            <div class="option-indicator">B</div>
            <div class="option-text">Because it couples the application service to ASP.NET Core's web presentation layer, preventing the service from being reused in background workers, CLI tools, or gRPC endpoints, and making unit testing harder.</div>
          </div>
          <div class="quiz-option" data-opt="2">
            <div class="option-indicator">C</div>
            <div class="option-text">Because C# does not allow interfaces to declare methods returning <code>IActionResult</code>.</div>
          </div>
          <div class="quiz-option" data-opt="3">
            <div class="option-indicator">D</div>
            <div class="option-text">Because EF Core will refuse to execute LINQ queries inside methods returning <code>IActionResult</code>.</div>
          </div>
        </div>
        <div class="exercise-footer">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-7-2">Submit Answer</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-7-2" style="display:none;">Retry</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-7-2"></div>
      </div>
    </div>

    <!-- Knowledge Check 7.3 -->
    <div class="exercise-card" id="qc-7-3">
      <div class="exercise-header">
        <div class="exercise-title-group">
          <span class="exercise-badge">Knowledge Check 7.3</span>
          <span>End-to-End Flow Validation</span>
        </div>
      </div>
      <div class="exercise-body">
        <div class="exercise-prompt">
          In our end-to-end flow, who is strictly responsible for converting the client's raw JSON bytes into the strongly-typed <code>CreateBookRequest</code> C# record?
        </div>
        <div class="quiz-options" data-qid="qc-7-3">
          <div class="quiz-option" data-opt="0">
            <div class="option-indicator">A</div>
            <div class="option-text">The <code>BookService</code> class inside <code>CreateBookAsync</code>.</div>
          </div>
          <div class="quiz-option" data-opt="1">
            <div class="option-indicator">B</div>
            <div class="option-text">The ASP.NET Core Model Binding engine and its configured JSON input formatter (<code>System.Text.Json</code>).</div>
          </div>
          <div class="quiz-option" data-opt="2">
            <div class="option-indicator">C</div>
            <div class="option-text">PostgreSQL's native JSONB deserializer.</div>
          </div>
          <div class="quiz-option" data-opt="3">
            <div class="option-indicator">D</div>
            <div class="option-text">The EF Core <code>BooksContext</code> change tracker.</div>
          </div>
        </div>
        <div class="exercise-footer">
          <button class="btn-primary btn-submit-quiz" data-qid="qc-7-3">Submit Answer</button>
          <button class="btn-secondary btn-retry-quiz" data-qid="qc-7-3" style="display:none;">Retry</button>
        </div>
        <div class="quiz-feedback" id="feedback-qc-7-3"></div>
      </div>
    </div>

  </div>

  <div class="lesson-nav-footer">
    <button class="btn-complete-lesson" data-lesson="lesson-7">
      <span class="complete-checkbox">✓</span> Mark Lesson 7 Complete
    </button>
    <button class="btn-primary btn-next-lesson" data-target="assessment">
      Take Module 1 Final Assessment →
    </button>
  </div>
`
  },
  {
    id: "assessment",
    badge: "\u2605",
    nav: "Final Assessment (80%)",
    content: `
  <div class="lesson-header-box">
    <div class="lesson-meta-bar">
      <span class="lesson-pill">Final Evaluation</span>
      <span class="badge-time">Passing Score: 80%</span>
    </div>
    <h1 class="lesson-h1">Module 1 Completion Assessment</h1>
    <p class="lesson-lead">
      Test your deep comprehension of HTTP mechanics, ASP.NET Core routing, model binding, DTO contracts, and partial update semantics. Submit all 10 questions to receive your diagnostic scorecard and topic breakdown.
    </p>
  </div>

  <div class="content-body">
    <div id="assessment-container">
      <!-- 10 Comprehensive Assessment Questions will render here -->
    </div>

    <div style="margin-top: 2rem; display: flex; justify-content: center;">
      <button class="btn-primary" id="btn-submit-final-assessment" style="font-size: 1.05rem; padding: 0.8rem 2rem;">
        📊 Grade &amp; Complete Assessment
      </button>
    </div>

    <!-- Results Display -->
    <div id="assessment-results" style="display:none;"></div>
  </div>
`
  },
];

/* Search index (extracted from the original page) */
const SEARCH_INDEX = [
      { title: 'Overview & Introduction', id: 'lesson-0', snippet: 'Course map, prerequisites, and learning outcomes for Raff.' },
      { title: 'Lesson 1: HTTP Fundamentals', id: 'lesson-1', snippet: 'HTTP client-server model, statelessness, request/response anatomy, and status codes.' },
      { title: 'Lesson 1: ASP.NET Core Request Lifecycle', id: 'lesson-1', snippet: 'Kestrel, middleware pipeline, endpoint routing, controller actions, and EF Core to PostgreSQL.' },
      { title: 'Lesson 2: REST Principles & Resources', id: 'lesson-2', snippet: 'Resource-oriented URIs, nouns vs verbs, collections, and sub-resources.' },
      { title: 'Lesson 2: Safe & Idempotent Methods', id: 'lesson-2', snippet: 'RFC 9110 definitions, GET, POST, PUT, PATCH, DELETE comparison matrix.' },
      { title: 'Lesson 2: HTTP Status Codes', id: 'lesson-2', snippet: '200 OK, 201 Created with Location header, 204 No Content, 400, 401, 403, 404, 409, 500.' },
      { title: 'Lesson 3: ASP.NET Core Routing', id: 'lesson-3', snippet: 'Attribute routing, ControllerBase, [ApiController] features, and token substitution.' },
      { title: 'Lesson 3: Route Constraints & Ambiguity', id: 'lesson-3', snippet: 'Why route constraints are not validators, 404 vs 400, and AmbiguousMatchException crashes.' },
      { title: 'Lesson 3: Controller vs Service Separation', id: 'lesson-3', snippet: 'Keeping controllers thin, testability, and why services should never return IActionResult.' },
      { title: 'Lesson 4: Model Binding & Sources', id: 'lesson-4', snippet: '[FromRoute], [FromQuery], [FromBody], [FromHeader], and single request body rule.' },
      { title: 'Lesson 4: Automatic 400 ProblemDetails', id: 'lesson-4', snippet: 'ModelState.IsValid, JSON type conversion errors, and RFC 7807 responses.' },
      { title: 'Lesson 5: Entities vs DTOs', id: 'lesson-5', snippet: 'EF Core database entities vs API wire contracts and record definitions.' },
      { title: 'Lesson 5: Mass Assignment & Circular Loops', id: 'lesson-5', snippet: 'Preventing over-posting vulnerabilities and breaking JSON serialization cycles.' },
      { title: 'Lesson 6: The Partial Update Dilemma', id: 'lesson-6', snippet: 'The bug in if (dto.summary is not null), tri-state problem, and omitted vs explicit null.' },
      { title: 'Lesson 6: Approaches to Partial Updates', id: 'lesson-6', snippet: 'Optional<T> presence tracking, RFC 7396 JSON Merge Patch, RFC 6902 JSON Patch.' },
      { title: 'Lesson 6: The EF Core Update() Trap', id: 'lesson-6', snippet: 'Why calling Update() on partial entities overwrites valid database columns.' },
      { title: 'Lesson 7: End-to-End Books Architecture', id: 'lesson-7', snippet: 'Putting it all together: controller, DTO, service, EF Core, and CreatedAtAction.' },
      { title: 'Final Completion Assessment', id: 'assessment', snippet: 'Comprehensive 10-question evaluation with diagnostic score card.' }
    ];
