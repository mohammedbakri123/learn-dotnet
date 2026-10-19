/* ============================================================
   Raff Backend Academy — Module 4 — Validation, PATCH & Error Handling
   Data: glossary, knowledge checks, lesson meta, assessment,
   widget datasets, and lesson content blocks.
   Loaded before the shared components and the page script.
   ============================================================ */

const STORAGE_KEY = "raff_aspnet_module_04_state";
const APP_MARKER = "raff-aspnet-module-04";

/* ---------------- glossary ---------------- */

const GLOSSARY = [
  {
    t: "Model binding",
    c: "Pipeline & binding",
    l: "lesson-1",
    d: `The pipeline stage that reads request data — a JSON body via System.Text.Json — into action parameters and DTOs. Conversion failures are recorded in ModelState.`
  },
  {
    t: "ModelState",
    c: "Pipeline & binding",
    l: "lesson-1",
    d: `Per-request dictionary of binding and validation results. Under [ApiController], any invalid entry triggers an automatic 400 before the action runs.`
  },
  {
    t: "ModelStateInvalidFilter",
    c: "Pipeline & binding",
    l: "lesson-1",
    d: `The filter added by [ApiController] that short-circuits requests whose ModelState is invalid, producing a ValidationProblemDetails 400.`
  },
  {
    t: "[ApiController]",
    c: "Pipeline & binding",
    l: "lesson-1",
    d: `Attribute enabling opinionated API behavior: automatic 400s, [FromBody] inference for complex parameters, and problem-details responses.`
  },
  {
    t: "System.Text.Json",
    c: "Pipeline & binding",
    l: "lesson-1",
    d: `The default JSON serializer. Web defaults include case-insensitive property matching and AllowReadingFromString for numbers.`
  },
  {
    t: "DataAnnotations",
    c: "Validation",
    l: "lesson-2",
    d: `The attribute family — [Required], [MaxLength], [Range], [RegularExpression] — executed by the validation stage against the bound DTO.`
  },
  {
    t: "[Required]",
    c: "Validation",
    l: "lesson-2",
    d: "Presence rule. Rejects null, empty strings, and whitespace-only strings (verified on .NET 10)."
  },
  {
    t: "[MaxLength] / [MinLength]",
    c: "Validation",
    l: "lesson-2",
    d: `Length-bound attributes. [MaxLength] treats null as valid, so pairing it with [Required] yields one message per problem.`
  },
  {
    t: "[StringLength]",
    c: "Validation",
    l: "lesson-2",
    d: `Combined length bounds. With MinimumLength greater than 0 it also rejects null — alongside [Required], that doubles the message for a missing value.`
  },
  {
    t: "[Range]",
    c: "Validation",
    l: "lesson-2",
    d: `Inclusive numeric bounds. Applies only to present, non-null values — pair with [Required] for nullable fields that are mandatory.`
  },
  {
    t: "[RegularExpression]",
    c: "Validation",
    l: "lesson-2",
    d: `Format check for present values; null passes. Anchors are the author’s responsibility: ^...$ when the whole value must match.`
  },
  {
    t: "IValidatableObject",
    c: "Validation",
    l: "lesson-2",
    d: `Interface for cross-field rules computed from the payload alone; runs after attribute validation and reports errors into ModelState.`
  },
  {
    t: "Implicit required inference",
    c: "Validation",
    l: "lesson-2",
    d: `MVC behavior treating null values of non-nullable reference types as required. Null-only — empty strings pass. Disabled via MvcOptions.SuppressImplicitRequiredAttributeForNonNullableReferenceTypes.`
  },
  {
    t: "ValidationProblemDetails",
    c: "Validation",
    l: "lesson-2",
    d: `The 400 response body for validation failures: problem-details members plus an errors dictionary keyed by property name.`
  },
  {
    t: "InvalidModelStateResponseFactory",
    c: "Errors & HTTP",
    l: "lesson-5",
    d: "ApiBehaviorOptions hook that customizes the automatic 400 body produced for invalid ModelState."
  },
  {
    t: "Business rule",
    c: "Rule layers",
    l: "lesson-3",
    d: `A rule that requires current data to evaluate — existence, duplicates, dependencies — implemented in the service layer, not in attributes.`
  },
  {
    t: "Unique index",
    c: "Rule layers",
    l: "lesson-3",
    d: `Database constraint rejecting duplicate values for a column or composite (UserId, BookId). The real duplicate guard under concurrency.`
  },
  {
    t: "Foreign key",
    c: "Rule layers",
    l: "lesson-3",
    d: `Relational constraint tying a row to an existing parent row; configured to restrict, cascade, or nullify on delete. The structural version of "must exist".`
  },
  {
    t: "CHECK constraint",
    c: "Rule layers",
    l: "lesson-3",
    d: `Database-enforced predicate (for example progress_percent BETWEEN 0 AND 100) that holds regardless of application code.`
  },
  {
    t: "DbUpdateException",
    c: "Rule layers",
    l: "lesson-3",
    d: `EF Core exception thrown when SaveChanges fails; its inner exception is provider-specific — PostgresException with SQLSTATE 23505 (unique) or 23503 (FK).`
  },
  {
    t: "PUT",
    c: "PATCH & updates",
    l: "lesson-4",
    d: "HTTP verb replacing the resource with the request representation: an omitted field means \"clear it\"."
  },
  {
    t: "PATCH",
    c: "PATCH & updates",
    l: "lesson-4",
    d: "HTTP verb (RFC 5789) applying a partial modification: an omitted field means \"leave it alone\"."
  },
  {
    t: "JSON Merge Patch",
    c: "PATCH & updates",
    l: "lesson-4",
    d: `RFC 7396. A partial document is applied to the target; a present member with value null removes that member. Handled over JsonObject.`
  },
  {
    t: "JSON Patch",
    c: "PATCH & updates",
    l: "lesson-4",
    d: `RFC 6902. Changes expressed as an operations array (add, remove, replace, test) addressed by JSON Pointer paths.`
  },
  {
    t: "Optional<T>",
    c: "PATCH & updates",
    l: "lesson-4",
    d: `Presence-tracking struct: IsSet distinguishes absent (false) from explicit null (true, Value null) from a value (true, Value present).`
  },
  {
    t: "JsonObject",
    c: "PATCH & updates",
    l: "lesson-4",
    d: `Mutable JSON DOM type. TryGetPropertyValue returns false for an absent member and true with a null node for an explicit null.`
  },
  {
    t: "ProblemDetails",
    c: "Errors & HTTP",
    l: "lesson-5",
    d: `The RFC 9457 error shape: type, title, status, detail, instance, plus extensions such as traceId and errors.`
  },
  {
    t: "IExceptionHandler",
    c: "Errors & HTTP",
    l: "lesson-5",
    d: `DI-registered exception handler. TryHandleAsync returning true stops the chain; false passes the exception to the next handler.`
  },
  {
    t: "UseExceptionHandler",
    c: "Errors & HTTP",
    l: "lesson-5",
    d: `Middleware that invokes the IExceptionHandler chain — with AddProblemDetails registered, the default produces the boring, safe 500.`
  },
  {
    t: "UseStatusCodePages",
    c: "Errors & HTTP",
    l: "lesson-5",
    d: `Middleware producing problem-details bodies for bare status codes (404 from routing, 415, and so on).`
  },
  {
    t: "409 Conflict",
    c: "Errors & HTTP",
    l: "lesson-5",
    d: `Status for operations that conflict with current state: duplicates, dependent data, stale concurrency tokens.`
  },
  {
    t: "415 Unsupported Media Type",
    c: "Errors & HTTP",
    l: "lesson-5",
    d: `Framework rejection of a request whose content type the endpoint cannot consume — produced before binding.`
  },
  {
    t: "traceId",
    c: "Errors & HTTP",
    l: "lesson-5",
    d: `Problem-details extension correlating a response with the server log entry. Added automatically; the client’s support lever.`
  },
  {
    t: "WebApplicationFactory<T>",
    c: "Testing",
    l: "lesson-7",
    d: `Boots the real app in memory for integration tests and exposes an HttpClient. Needs an accessible Program type (public partial class Program { }).`
  },
  {
    t: "Integration test",
    c: "Testing",
    l: "lesson-7",
    d: `A test speaking HTTP to the in-memory app, exercising routing, binding, validation filtering, serialization, and status mapping together.`
  },
  {
    t: "IClassFixture",
    c: "Testing",
    l: "lesson-7",
    d: `xUnit fixture sharing one expensive setup — typically the WebApplicationFactory — across a test class.`
  },
  {
    t: "Testcontainers",
    c: "Testing",
    l: "lesson-7",
    d: `Library that runs disposable real dependencies (such as PostgreSQL) in containers, so constraint behavior is tested against the real provider.`
  }
];

/* ---------------- knowledge checks ---------------- */

const KNOWLEDGE_CHECKS = [
  {
    id: "kc-1-1",
    group: "lesson-1",
    prompt: "With [ApiController] on the controller, when do validation attributes on a bound DTO run?",
    options: [
      "After the action method returns",
      "Between model binding and the action executing — and an invalid result short-circuits to a 400",
      "Only when the action manually reads ModelState",
      "At compile time, as warnings"
    ],
    correct: 1,
    explain: `Validation runs as part of the request pipeline: after binding, before the action. With [ApiController], the ModelStateInvalidFilter turns any invalid entry into an automatic 400 and the action never executes.`
  },
  {
    id: "kc-1-2",
    group: "lesson-1",
    prompt: "A JSON body is syntactically valid, but publishedYear is \"abc\". What happens under [ApiController]?",
    options: [
      "The action runs and the [Range] attribute rejects the value",
      "The property silently becomes 0 and the request succeeds",
      "Binding adds a conversion error to ModelState — the client gets a 400 before the action runs",
      "The framework returns a 500 because deserialization crashed"
    ],
    correct: 2,
    explain: `This is a binding failure detected by the JSON layer. The error is keyed by JSON path ($.publishedYear) with parser detail — verified on .NET 10 — and [ApiController] short-circuits the request with a 400.`
  },
  {
    id: "kc-1-3",
    group: "lesson-1",
    prompt: "Which failure is caught by model binding rather than by validation attributes?",
    options: [
      "A missing required title",
      "A title longer than 200 characters",
      "A truncated, malformed JSON body",
      "A year outside the allowed range"
    ],
    correct: 2,
    explain: `Malformed JSON never becomes an object, so the binding gate reports it — keyed by JSON path. The other three are perfectly readable payloads that violate rules, which is the validation gate's job.`
  },
  {
    id: "kc-1-4",
    group: "lesson-1",
    prompt: "Without [ApiController], what happens when ModelState contains invalid entries?",
    options: [
      "The framework still returns 400 automatically",
      `Nothing automatic — the action runs unless you check ModelState and return ValidationProblem yourself`,
      "The request is rejected with 500",
      "Model binding throws an exception"
    ],
    correct: 1,
    explain: `The automatic 400 comes from the ModelStateInvalidFilter, which [ApiController] adds. Without it — or with SuppressModelStateInvalidFilter — rejecting invalid input is your manual responsibility.`
  },
  {
    id: "kc-2-1",
    group: "lesson-2",
    prompt: "Which payload makes [Required] on a string Title fail — verified on .NET 10?",
    options: [
      "Only a missing title fails; whitespace always passes",
      "Only an explicit null fails; empty strings always pass",
      "A whitespace-only title (\"title\": \"   \") also fails — [Required] rejects null, empty, and whitespace",
      "None — [Required] only checks the declared type"
    ],
    correct: 2,
    explain: `RequiredAttribute treats null, empty, and whitespace-only strings as absent. Captured: a whitespace-only title produced exactly one message — "The Title field is required."`
  },
  {
    id: "kc-2-2",
    group: "lesson-2",
    prompt: `You want exactly one message when the title is missing, and one when it is too long. Which pairing achieves that?`,
    options: [
      "[Required] + [StringLength(200, MinimumLength = 1)]",
      "[Required] + [MaxLength(200)]",
      "[MaxLength(200)] alone",
      "[StringLength(200)] with no other attribute"
    ],
    correct: 1,
    explain: `With MinimumLength greater than 0, [StringLength] also rejects null — so a missing title produces two messages. [MaxLength] treats null as valid, leaving presence entirely to [Required]: one problem, one message.`
  },
  {
    id: "kc-2-3",
    group: "lesson-2",
    prompt: "For a positional record DTO, where do validation attributes belong?",
    options: [
      "On the generated properties using the [property:] attribute target",
      "Directly on the primary-constructor parameters",
      "Both placements behave identically",
      "Records cannot participate in validation"
    ],
    correct: 1,
    explain: `On current .NET, validation metadata placed on the generated property throws an InvalidOperationException at request time — the client sees a 500. Attributes on the parameters validate correctly: captured as a clean 400 with the required message.`
  },
  {
    id: "kc-2-4",
    group: "lesson-2",
    prompt: `Which statement about MVC's implicit required inference for non-nullable reference types is accurate?`,
    options: [
      "It rejects null, empty, and whitespace values just like [Required]",
      `It fails only when the value is null; empty strings pass — explicit [Required] is needed to reject them`,
      "It is disabled by default",
      "It applies to value types like int as well"
    ],
    correct: 1,
    explain: `Verified: a null!-initialized property with its JSON member omitted returned 400 "The Title field is required." — but a property that received "title": "" returned 200. The inference is null-only, so write [Required] when empty strings must be rejected.`
  },
  {
    id: "kc-3-1",
    group: "lesson-3",
    prompt: "Raff must reject an entry whose BookId does not exist. Where does that rule belong?",
    options: [
      "A custom DataAnnotation attribute",
      "IValidatableObject.Validate",
      "The service layer — the rule needs current database state",
      "A JSON converter"
    ],
    correct: 2,
    explain: `Payload-only rules go in the validation gate; rules that need data do not. The validation stage is a pure function of the request body, so an existence check is a business rule.`
  },
  {
    id: "kc-3-2",
    group: "lesson-3",
    prompt: `Two concurrent requests both pass the service's "already exists?" check and both attempt the insert. What actually prevents the duplicate?`,
    options: [
      "The service check, re-run on failure",
      "The unique index on (UserId, BookId) in the database",
      "A lock inside the controller",
      "The ModelState check"
    ],
    correct: 1,
    explain: `Application checks race; the database arbitrates. The unique index makes the second insert fail no matter how requests interleave — the 409 mapping is just the friendly face of that guarantee.`
  },
  {
    id: "kc-3-3",
    group: "lesson-3",
    prompt: "IValidatableObject is the right tool for…",
    options: [
      "Checking whether a foreign-key target exists",
      "Cross-field rules computable from the payload alone, like \"EndDate must be after StartDate\"",
      "Caching validation results across requests",
      "Translating database exceptions into status codes"
    ],
    correct: 1,
    explain: `It runs inside the validation gate, which must stay stateless and payload-only. Multi-field consistency qualifies; anything needing the database or the clock belongs to the business layer.`
  },
  {
    id: "kc-3-4",
    group: "lesson-3",
    prompt: "Which layer holds even if application code has a bug or bypasses the service layer entirely?",
    options: [
      "Model validation attributes",
      "The controller's switch statement",
      "Database constraints — unique indexes, foreign keys, NOT NULL, CHECK",
      "The HTTP client"
    ],
    correct: 2,
    explain: `That is the definition of a last line of defense: invariants live in the schema, and every code path — current, future, or direct SQL — is subject to them.`
  },
  {
    id: "kc-4-1",
    group: "lesson-4",
    prompt: "In a PUT request, a field is absent from the body. What does that mean?",
    options: [
      "Leave the stored field unchanged",
      "Clear the field — PUT carries the complete desired representation",
      "Return 400 — PUT requires every field",
      "The server decides field by field"
    ],
    correct: 1,
    explain: `PUT replaces the resource with the request representation: absence means "this field should not be present." PATCH is the verb where absence means "leave alone."`
  },
  {
    id: "kc-4-2",
    group: "lesson-4",
    prompt: "Why can a patch DTO with string? Note not distinguish {} from {\"note\": null}?",
    options: [
      "System.Text.Json refuses to deserialize nulls",
      `Model binding maps both an absent member and an explicit null to the property value null — presence information is not preserved`,
      "It can, as long as the property is nullable",
      "Because annotations strip null values"
    ],
    correct: 1,
    explain: `A nullable type carries a value or null, nothing more. The converter is not invoked for absent members, and the framework assigns default — identical to explicit null. Presence must come from elsewhere.`
  },
  {
    id: "kc-4-3",
    group: "lesson-4",
    prompt: "What does Optional<T>.IsSet add to the picture?",
    options: [
      "It makes the property required",
      `It distinguishes absence (IsSet false) from explicit null (IsSet true, Value null) from a value (IsSet true, Value present)`,
      "It compresses the JSON payload",
      "It removes the need for a converter"
    ],
    correct: 1,
    explain: `The struct needs one extra bit beyond nullability: whether the member was present at all. That third state is the entire reason the approach exists.`
  },
  {
    id: "kc-4-4",
    group: "lesson-4",
    prompt: "In RFC 7396 (JSON Merge Patch), how does a patch document remove a field?",
    options: [
      "By omitting the field",
      "By setting the field to null in the patch document",
      "With a special remove-operation object",
      "With a DELETE request to the field's path"
    ],
    correct: 1,
    explain: `Merge-patch semantics: present members are applied, and a present member whose value is null removes the target. Operation objects are the other protocol — RFC 6902 (JSON Patch).`
  },
  {
    id: "kc-4-5",
    group: "lesson-4",
    prompt: "What is the main risk of the JsonObject merge-patch approach?",
    options: [
      "It loses compile-time type safety and cannot express null",
      "It requires the Microsoft.AspNetCore.JsonPatch package",
      `Everything is manual: no attribute validation, and unguarded property handling can mutate fields you never meant to expose`,
      "It only works with EF Core 10"
    ],
    correct: 2,
    explain: `JsonObject bypasses the validation pipeline — every rule becomes hand-written code in the action, and allow-list discipline is entirely on you. That is why the module defaults to the Optional<T> approach for Raff.`
  },
  {
    id: "kc-5-1",
    group: "lesson-5",
    prompt: "For an expected \"book not found\" in a DELETE flow, which style does this module recommend?",
    options: [
      "Throw a NotFoundException from the service and handle it centrally",
      "Return a named outcome — for example DeleteOutcome.NotFound — that the controller maps to 404",
      "Return 200 with an error message in the body",
      "Return 500 to avoid revealing whether the book exists"
    ],
    correct: 1,
    explain: `Expected outcomes are values: visible in signatures, enforced by switch exhaustiveness, no exception overhead. Exceptions are reserved for truly exceptional conditions.`
  },
  {
    id: "kc-5-2",
    group: "lesson-5",
    prompt: "DELETE /api/books/42 is refused because reading entries reference the book. Best status?",
    options: [
      "400 Bad Request",
      "404 Not Found",
      "409 Conflict — the request conflicts with the current state",
      "500 Internal Server Error"
    ],
    correct: 2,
    explain: `The request is well-formed and the resource exists; the operation violates current-state constraints. That is the definition of 409.`
  },
  {
    id: "kc-5-3",
    group: "lesson-5",
    prompt: `The service's HasReadingEntries check can lose a race with a concurrent insert. What keeps the invariant true in that interleaving?`,
    options: [
      "Retrying the check in a loop",
      "The database's restricting foreign key — the delete itself fails even when the check raced past",
      "A longer timeout",
      "The [ApiController] filter"
    ],
    correct: 1,
    explain: `Constraints are the invariant; application checks are the polite interface. The FK turns the race into a DbUpdateException you translate into 409.`
  },
  {
    id: "kc-5-4",
    group: "lesson-5",
    prompt: `An unhandled exception occurs in Production with AddProblemDetails + UseExceptionHandler configured. What reaches the client?`,
    options: [
      "The full stack trace, to speed up support",
      "A 500 problem-details body with a generic title and a traceId — no exception detail",
      "A 404, to avoid alarming the client",
      "An empty 500 response"
    ],
    correct: 1,
    explain: `Captured on .NET 10: type rfc9110 section 15.6.1, title "An error occurred while processing your request.", status 500, traceId — nothing else. Debuggability flows through the traceId to the server log.`
  },
  {
    id: "kc-6-1",
    group: "lesson-6",
    prompt: "What is the purpose of AddProblemDetails + UseExceptionHandler() in Raff's baseline?",
    options: [
      "To log every request",
      `To turn unhandled exceptions into standardized ProblemDetails responses — including a generic 500 that leaks nothing`,
      "To disable model validation",
      "To enable JSON Patch support"
    ],
    correct: 1,
    explain: `The pairing gives the whole API one error shape and a principled default for unexpected failures — with no per-action try/catch.`
  },
  {
    id: "kc-6-2",
    group: "lesson-6",
    prompt: "A custom IExceptionHandler returns false from TryHandleAsync. What happens?",
    options: [
      "The exception is logged and swallowed",
      `Responsibility passes to the next registered handler; if none handles it, the default 500 problem-details response is produced`,
      "The request succeeds with 200",
      "The pipeline restarts from routing"
    ],
    correct: 1,
    explain: `Handlers form a chain: the first one that writes a response and returns true wins; false passes responsibility onward. That is how specific mappings coexist with the safe default.`
  },
  {
    id: "kc-6-3",
    group: "lesson-6",
    prompt: "Which of these must never appear in a Production 500 response body?",
    options: [
      "The HTTP status code",
      "A stable type URI",
      "Exception messages and stack traces",
      "A correlation traceId"
    ],
    correct: 2,
    explain: `Internal detail maps your system for attackers and changes without notice. The response carries a traceId; the log carries the details.`
  },
  {
    id: "kc-6-4",
    group: "lesson-6",
    prompt: "What is the traceId in a problem-details response for?",
    options: [
      "Rate limiting",
      "Correlating the client's report with the exact server log entry that handled the request",
      "Encrypting the payload",
      "Ordering validation errors"
    ],
    correct: 1,
    explain: `Support workflow: the client surfaces the traceId, you grep the logs, and you see the real exception — without it ever appearing on the wire.`
  },
  {
    id: "kc-7-1",
    group: "lesson-7",
    prompt: "Why does the API project add public partial class Program { }?",
    options: [
      "To define the application entry point twice",
      `Top-level statements generate an internal Program class; the partial declaration makes it visible so tests can use WebApplicationFactory<Program>`,
      "It registers the middleware pipeline",
      "It enables attribute routing"
    ],
    correct: 1,
    explain: `WebApplicationFactory needs the entry-point type by name. The partial declaration adds no behavior — it changes accessibility only.`
  },
  {
    id: "kc-7-2",
    group: "lesson-7",
    prompt: `Why should assertions on validation-error keys and messages be case-insensitive or substring-based rather than exact-match?`,
    options: [
      "Because dictionaries are unordered",
      `Because keys and framework messages can legitimately vary in casing and wording across versions — exact assertions break on upgrades while behavior is correct`,
      "Because xUnit requires it",
      "Because JSON has no case rules"
    ],
    correct: 1,
    explain: `Assert the contract — status, key presence, the rule's meaning — not the framework's phrasing. Exact-match message tests fail for the wrong reason at the next SDK update.`
  },
  {
    id: "kc-7-3",
    group: "lesson-7",
    prompt: "Why can't EF Core's in-memory provider test Raff's unique index and FK restriction behavior?",
    options: [
      "It is too slow for integration tests",
      `It does not enforce relational constraints — tests would pass there while Production rejects the same operations, giving false confidence`,
      "It cannot store strings",
      "It requires PostgreSQL credentials to start"
    ],
    correct: 1,
    explain: `The entire point of the constraint layer is real relational enforcement. Test it against the real provider — a local PostgreSQL instance or Testcontainers.`
  }
];

/* ---------------- lesson meta (search + navigation labels) ---------------- */

const LESSON_META = [
  {
    id: "lesson-1",
    label: "Request validation pipeline",
    keywords: `where request validation actually happens model binding modelstate automatic gates that stop input before your code runs. pipeline path takes from json kinds apicontroller what this does cover knowledge checks`,
    summary: `Model binding, ModelState, and the automatic 400 — the two gates that stop bad input before your code runs.`
  },
  {
    id: "lesson-2",
    label: "DTO validation attributes",
    keywords: `validation attributes that match your rules required stringlength range regularexpression what they actually enforce record pitfalls api. request contract written records positional parameters nullable annotations runtime keep error list clean hands design knowledge checks`,
    summary: `Required, StringLength, Range, RegularExpression — what they actually enforce, and the record pitfalls that 500 your API.`
  },
  {
    id: "lesson-3",
    label: "Three layers of rules",
    keywords: `request validation business rules database constraints rule belongs exactly layer. putting wrong apis become slow racy both. three layers jobs what where cross field that stay payload ivalidatableobject service layer last line defense placement drill knowledge checks`,
    summary: `A rule belongs to exactly one layer. Putting it in the wrong one is how APIs become slow, racy, or both.`
  },
  {
    id: "lesson-4",
    label: "PATCH done right",
    keywords: `patch partial updates without losing data nullable cannot express three approaches that raff should use. done right verbs contracts approach null means leave unchanged optional presence tracking jsonobject merge 7396 choosing hands reading entry knowledge checks`,
    summary: "Why a nullable DTO cannot express a patch, three approaches that can, and the one Raff should use."
  },
  {
    id: "lesson-5",
    label: "Result vs exception",
    keywords: `from service outcome http status expected failures values emergencies. delete flow that makes difference concrete. result exception controller translation layer raff ways race behind friendly check explicit outcomes exceptions trade drill predict knowledge checks`,
    summary: "Expected failures are values, not emergencies. The delete flow that makes the difference concrete."
  },
  {
    id: "lesson-6",
    label: "Centralized errors",
    keywords: `problemdetails error shape whole addproblemdetails useexceptionhandler custom iexceptionhandler disclosure boundary. centralized errors parsed once raff baseline three lines program.cs exception handlers domain exceptions unifying validation what disclose hide explorer knowledge checks`,
    summary: "AddProblemDetails, UseExceptionHandler, custom IExceptionHandler — and the disclosure boundary."
  },
  {
    id: "lesson-7",
    label: "Integration tests",
    keywords: `testing contract with webapplicationfactory behavior built lives pipeline test pieces. integration tests pieces making testable fixture over real databases knowledge checks`,
    summary: "The behavior you built lives in the pipeline — so test the pipeline, not the pieces."
  },
  {
    id: "capstone",
    label: "Capstone project",
    keywords: `capstone make raff predictable four stages that turn this module rules into actual behavior audit patch delete harden prove project stage create path reading entries battle test flow errors acceptance checklist`,
    summary: `Four stages that turn this module's rules into Raff's actual behavior — audit, patch, delete, harden, prove it.`
  },
  {
    id: "lesson-assessment",
    label: "Final assessment",
    keywords: "assessment final module test questions review pass threshold retake score",
    summary: `Fourteen questions across the whole module. The pass threshold is 80% — and a pass means the contract is understood, not that every question was easy. Each question maps to a lesson; the results view links back to any to`
  }
];

/* ---------------- assessment ---------------- */

const ASSESSMENT_QUESTIONS = [
  {
    id: "as-1",
    topic: "Pipeline & binding",
    lesson: "lesson-1",
    prompt: "A POST body is truncated mid-string. Which component rejects it, and what does the error look like?",
    options: [
      "Validation attributes; errors keyed by property name",
      `Model binding via the JSON layer; errors keyed by JSON path such as $.publishedYear, with parser detail`,
      "EF Core; a DbUpdateException",
      "The controller action; a manual check before the service call"
    ],
    correct: 1,
    explain: `Malformed JSON never materializes an object, so the binding gate reports it — keyed by JSON path, with line/position detail, captured as a 400 problem-details response.`
  },
  {
    id: "as-2",
    topic: "DTO validation",
    lesson: "lesson-2",
    prompt: `With [Required] and [StringLength(200, MinimumLength = 1)] on a missing title, how many messages come back?`,
    options: [
      "One, from [Required]",
      "Two — both attributes reject null, producing a doubled message",
      "Zero until the action runs",
      "One, from StringLength"
    ],
    correct: 1,
    explain: `Both attributes independently fail on null. The [Required] + [MaxLength] split exists precisely to keep one problem to one message.`
  },
  {
    id: "as-3",
    topic: "DTO validation",
    lesson: "lesson-2",
    prompt: `A non-nullable string property initializes to "" (no [Required]). The payload sends "title": "". With implicit required inference active, the request…`,
    options: [
      "fails with a required error",
      "binds and passes — the implicit check fails only on null, and empty strings are not null",
      "fails because empty strings are invalid JSON",
      "is rejected by the implicit [MaxLength]"
    ],
    correct: 1,
    explain: `Captured on .NET 10: the implicit inference is null-only. Empty and whitespace strings sail through — which is exactly why Raff writes [Required] explicitly.`
  },
  {
    id: "as-4",
    topic: "DTO validation",
    lesson: "lesson-2",
    prompt: `A record DTO places its attributes on generated properties via [property: ...]. When does the problem surface — and how?`,
    options: [
      "At compile time, as an error",
      `At request time as a 500: MVC throws InvalidOperationException because validation metadata must be associated with the constructor parameter`,
      "Never — the attributes are honored",
      "At publish time, as a warning"
    ],
    correct: 1,
    explain: `Captured: the request that triggers validation fails with the record-metadata exception. The fix is attributes on primary-constructor parameters, or a class DTO.`
  },
  {
    id: "as-5",
    topic: "Rule layers",
    lesson: "lesson-3",
    prompt: "\"The category must exist before this book is created\" belongs to which layer?",
    options: [
      "A DataAnnotation attribute on the DTO",
      "IValidatableObject on the DTO",
      "The service layer — the rule needs current database state",
      "A JSON converter"
    ],
    correct: 2,
    explain: `The validation gate is stateless and payload-only. Existence checks are business rules, and the database constraint is their backstop.`
  },
  {
    id: "as-6",
    topic: "Rule layers",
    lesson: "lesson-3",
    prompt: "What is the decisive test for placing a rule in request validation?",
    options: [
      "The rule is fast to compute",
      "The rule can be judged from the payload alone; anything needing database state is a business rule",
      "The rule uses a regular expression",
      "The rule was specified by the API team"
    ],
    correct: 1,
    explain: `Payload-only → validation gate (400, attributes). Needs state → service layer (404/409 outcomes). Must hold regardless of code → database constraint.`
  },
  {
    id: "as-7",
    topic: "PATCH & PUT",
    lesson: "lesson-4",
    prompt: "A PUT body omits the summary field. Per HTTP semantics, what should happen to the stored summary?",
    options: [
      "It stays unchanged",
      "It is cleared — PUT carries the complete desired representation",
      "The server returns 400 because PUT requires every field",
      "It depends on the DTO's validation attributes"
    ],
    correct: 1,
    explain: `PUT replaces the resource with the request representation; absence is intentional removal. PATCH is where absence means "leave alone" — mixing the two up is how APIs lose data.`
  },
  {
    id: "as-8",
    topic: "PATCH & PUT",
    lesson: "lesson-4",
    prompt: "With Optional<T> presence tracking, an explicit JSON null binds to…",
    options: [
      "IsSet false with a default value — indistinguishable from absence",
      "IsSet true with a null Value — distinguishable from absence",
      "A binding error",
      "IsSet true with a default value"
    ],
    correct: 1,
    explain: `Verified end-to-end: absent → IsSet false; explicit null → IsSet true, Value null; value → IsSet true, Value present. The third state is the whole point.`
  },
  {
    id: "as-9",
    topic: "PATCH & PUT",
    lesson: "lesson-4",
    prompt: "In RFC 7396 merge patch, how do you express \"remove this field\"?",
    options: [
      "Omit the field from the patch document",
      "Include the field with a null value",
      "Use {\"op\": \"remove\", \"path\": \"/field\"}",
      "Send the field as an empty string"
    ],
    correct: 1,
    explain: `Merge patch: present member + null removes the target. The op-object form belongs to the other protocol — RFC 6902 JSON Patch.`
  },
  {
    id: "as-10",
    topic: "Status codes",
    lesson: "lesson-5",
    prompt: `A service check for dependent rows can race with a concurrent insert. What guarantees correctness in every interleaving?`,
    options: [
      "Re-running the check with a shorter timeout",
      "The database's restricting foreign key — the delete itself fails when a dependency exists",
      "A lock inside the controller",
      "Returning 500 on the race"
    ],
    correct: 1,
    explain: `The service check produces the friendly 409; the FK produces the guarantee. Both exist, and they are not interchangeable.`
  },
  {
    id: "as-11",
    topic: "Status codes",
    lesson: "lesson-5",
    prompt: "Which pattern does the module recommend for expected domain failures like \"entry not found\"?",
    options: [
      "Throw an exception and catch it per action",
      "Return the outcome as a value and translate it in the controller with an exhaustive switch",
      "Log the failure and return 200",
      "Let the middleware invent a status"
    ],
    correct: 1,
    explain: `Expected failures are values: the signature documents them, the compiler enforces handling, and exceptions stay reserved for the unexpected.`
  },
  {
    id: "as-12",
    topic: "ProblemDetails",
    lesson: "lesson-6",
    prompt: "Which members does the captured Production 500 problem-details body contain?",
    options: [
      "type, title, status, traceId — no detail and no stack trace",
      "type, title, status, detail carrying the exception message",
      "A stack trace, to speed up support",
      "Nothing — the body is empty"
    ],
    correct: 0,
    explain: `The boring 500 is the correct 500: correlation via traceId, details in the server log, nothing internal on the wire.`
  },
  {
    id: "as-13",
    topic: "ProblemDetails",
    lesson: "lesson-6",
    prompt: "A custom IExceptionHandler returns false from TryHandleAsync. What happens?",
    options: [
      "The exception is logged and swallowed",
      `Responsibility passes to the next registered handler; if none handles it, the default 500 response is produced`,
      "The request succeeds with 200",
      "The pipeline restarts from routing"
    ],
    correct: 1,
    explain: `Handlers chain until one returns true. Declining is what lets a specific mapper coexist with the safe default.`
  },
  {
    id: "as-14",
    topic: "Testing",
    lesson: "lesson-7",
    prompt: `What does WebApplicationFactory<Program> let you test that a unit test on the controller class cannot?`,
    options: [
      "Faster execution",
      `The real pipeline end-to-end: routing, binding, validation filtering, serialization, and your status mappings together`,
      "Database performance",
      "C# compilation"
    ],
    correct: 1,
    explain: `The behaviors this module builds are pipeline behaviors. Calling the action directly skips the very stages that produce them — integration tests are the only faithful check.`
  }
];

/* ---------------- widget datasets ---------------- */

const WIDGET_META = {
  pipeline: {
    icon: "🛠️",
    title: "Pipeline simulator",
    desc: "Run requests through Raff and watch which gate stops each one."
  },
  playground: {
    icon: "🧪",
    title: "Validation playground",
    desc: "Edit the payload and the rules, then send — the output mirrors the real framework."
  },
  layers: {
    icon: "🧱",
    title: "Layer lab",
    desc: "Place each rule in the layer where it belongs."
  },
  patch: {
    icon: "🔀",
    title: "PATCH simulator",
    desc: "Three approaches, three requests. Watch what the stored note does."
  },
  errors: {
    icon: "🧭",
    title: "Error explorer",
    desc: "Six requests against Raff's hardened API. Predict, then reveal."
  }
};

const PIPELINE_STAGES = [
  "routing",
  "binding",
  "validation",
  "action"
];

const PIPELINE_STAGE_INFO = {
  routing: [
    "Routing",
    "Endpoint matched"
  ],
  binding: [
    "Model binding",
    "JSON → DTO"
  ],
  validation: [
    "Model validation",
    "Attributes + IValidatableObject"
  ],
  action: [
    "Controller action",
    "Your code runs"
  ]
};

const PIPELINE_SCENARIOS = [
  {
    label: "Valid create",
    request: `POST /api/books
{ "title": "Dune", "publishedYear": 1965 }`,
    stop: null,
    errorGate: "",
    body: {
      id: 42,
      title: "Dune",
      publishedYear: 1965,
      summary: null
    },
    status: 201,
    statusText: "201 Created",
    note: `Everything passes: routing matched, the body bound to the DTO, every attribute accepted it, and the action returned CreatedAtAction.`
  },
  {
    label: "Empty title",
    request: `POST /api/books
{ "title": "", "publishedYear": 1965 }`,
    stop: "validation",
    errorGate: "validation gate",
    errors: [
      "The Title field is required.",
      "The field Title must be a string with a minimum length of 1 and a maximum length of 200."
    ],
    status: 400,
    statusText: "400 Bad Request",
    note: `Readable payload — the validation gate rejects it. Two messages because this DTO uses [Required] + [StringLength(200, MinimumLength = 1)]; the [Required] + [MaxLength] combo yields just one.`
  },
  {
    label: "Whitespace-only title",
    request: `POST /api/books
{ "title": "   ", "publishedYear": 1965 }`,
    stop: "validation",
    errorGate: "validation gate",
    errors: [
      "The Title field is required."
    ],
    status: 400,
    statusText: "400 Bad Request",
    note: `[Required] treats whitespace-only strings as absent — verified on .NET 10. Only one message appears because StringLength alone would have passed the non-null string.`
  },
  {
    label: "Year is \"abc\"",
    request: `POST /api/books
{ "title": "Dune", "publishedYear": "abc" }`,
    stop: "binding",
    errorGate: "binding gate",
    errors: [
      "The dto field is required.",
      `The JSON value could not be converted to System.Int32. Path: $.publishedYear | LineNumber: 0 | BytePositionInLine: 37.`
    ],
    status: 400,
    statusText: "400 Bad Request",
    note: `The JSON layer cannot convert "abc" to an int, so the failure happens during binding — keyed by JSON path, with parser detail. Validation attributes never run.`
  },
  {
    label: "Truncated JSON",
    request: `POST /api/books
{ "title": "Dune", "publishedYear": 1965`,
    stop: "binding",
    errorGate: "binding gate",
    errors: [
      `'5' is an invalid end of a number. Expected a delimiter. Path: $.publishedYear | LineNumber: 0 | BytePositionInLine: 39.`
    ],
    status: 400,
    statusText: "400 Bad Request",
    note: `The body never becomes a DTO at all. This is the clearest illustration that binding and validation are different gates with different error shapes.`
  },
  {
    label: "Year 30000",
    request: `POST /api/books
{ "title": "Dune", "publishedYear": 30000 }`,
    stop: "validation",
    errorGate: "validation gate",
    errors: [
      "The field PublishedYear must be between 1 and 9999."
    ],
    status: 400,
    statusText: "400 Bad Request",
    note: "Binding succeeded (30000 is a fine int), and [Range] rejected the value. The action still never ran."
  }
];

const LAYER_LABELS = {
  validation: "Request validation",
  service: "Service layer",
  database: "Database constraint"
};

const LAYER_SCENARIOS = [
  {
    rule: "Title is at most 200 characters.",
    answer: "validation",
    why: "Judged from the payload alone — a validation attribute, 400 automatic."
  },
  {
    rule: "PublishedYear is between 1 and 9999.",
    answer: "validation",
    why: "Pure function of the payload — [Range] handles it in the validation gate."
  },
  {
    rule: "CategoryId must refer to an existing category.",
    answer: "service",
    why: "Needs current database state — a service-layer check, mapped to 404."
  },
  {
    rule: "A user cannot add the same book twice — even if two requests arrive at the same moment.",
    answer: "database",
    why: "Application checks race; the unique index on (UserId, BookId) is the guarantee."
  },
  {
    rule: "A reading goal's EndDate must be after its StartDate.",
    answer: "validation",
    why: "Cross-field but payload-only — IValidatableObject in the validation gate."
  },
  {
    rule: `A book cannot be deleted while reading entries reference it — even if a future code path forgets to check.`,
    answer: "database",
    why: `The restricting foreign key is the invariant; the service check is the friendly 409 in the common case.`
  }
];

const PATCH_MODES = {
  a: {
    label: "A · Nullable DTO (null = leave unchanged)",
    canClear: false,
    bound: {
      absent: "Note = null",
      null: "Note = null",
      value: "Note = \"chapter 5\""
    },
    exec: {
      absent: "if (dto.Note is not null) — skipped (cannot clear)",
      null: "if (dto.Note is not null) — skipped (cannot clear)",
      value: "book.Summary = dto.Note"
    }
  },
  b: {
    label: "B · Optional<T> presence tracking",
    canClear: true,
    bound: {
      absent: "IsSet = false",
      null: "IsSet = true, Value = null",
      value: "IsSet = true, Value = \"chapter 5\""
    },
    exec: {
      absent: "if (dto.Note.IsSet) — skipped",
      null: "entry.Note = dto.Note.Value; // clears",
      value: "entry.Note = dto.Note.Value;"
    }
  },
  c: {
    label: "C · JsonObject merge-patch (null removes)",
    canClear: true,
    bound: {
      absent: "TryGetPropertyValue → false",
      null: "TryGetPropertyValue → true, node = null",
      value: "TryGetPropertyValue → true, node = \"chapter 5\""
    },
    exec: {
      absent: "if (patch.TryGetPropertyValue(...)) — skipped",
      null: "entry.Note = summaryNode?.GetValue<string>(); // null clears",
      value: "entry.Note = summaryNode.GetValue<string>();"
    }
  }
};

const PATCH_REQUESTS = [
  {
    id: "absent",
    label: "{}",
    human: "Empty object — the client omits note."
  },
  {
    id: "null",
    label: "{ \"note\": null }",
    human: "Explicit null — the client wants the note cleared."
  },
  {
    id: "value",
    label: "{ \"note\": \"chapter 5\" }",
    human: "A new value — the client edits the note."
  }
];

const ERROR_SCENARIOS = [
  {
    label: "Empty title",
    request: `POST /api/books
Content-Type: application/json

{ "title": "", "publishedYear": 1965 }`,
    produced: "The validation gate — [Required] rejected the empty title before the action ran.",
    status: 400,
    body: {
      type: "https://tools.ietf.org/html/rfc9110#section-15.5.1",
      title: "One or more validation errors occurred.",
      status: 400,
      errors: {
        Title: [
          "The Title field is required."
        ]
      },
      traceId: "00-9d2c41ff-7b1e-00"
    }
  },
  {
    label: "Malformed body",
    request: `POST /api/books
Content-Type: application/json

{ "title": "Dune", "publishedYear": "abc" }`,
    produced: `The binding gate — the JSON layer could not convert "abc" to Int32. Keyed by JSON path, not property name.`,
    status: 400,
    body: {
      type: "https://tools.ietf.org/html/rfc9110#section-15.5.1",
      title: "One or more validation errors occurred.",
      status: 400,
      errors: {
        dto: [
          "The dto field is required."
        ],
        "$.publishedYear": [
          `The JSON value could not be converted to System.Int32. Path: $.publishedYear | LineNumber: 0 | BytePositionInLine: 37.`
        ]
      },
      traceId: "00-1f77b4aa-3e05-00"
    }
  },
  {
    label: "Unknown book",
    request: "GET /api/books/9999",
    produced: `Your action mapped the service's NotFound outcome. This is the framework shape for a bare 404 — type, title, status, traceId.`,
    status: 404,
    body: {
      type: "https://tools.ietf.org/html/rfc9110#section-15.5.5",
      title: "Not Found",
      status: 404,
      traceId: "00-52c8e10b-99d4-00"
    }
  },
  {
    label: "Delete with dependents",
    request: "DELETE /api/books/42",
    produced: `The DeleteOutcome.HasReadingEntries branch — a state conflict, not a malformed request. The FK restriction guarantees it even if the check races.`,
    status: 409,
    body: {
      type: "https://raff.example/problems/conflict",
      title: "The book has reading entries.",
      status: 409,
      detail: "Delete the reading entries first, or move them to another book.",
      traceId: "00-77aa31cd-0b42-00"
    }
  },
  {
    label: "Wrong content type",
    request: `POST /api/books
Content-Type: text/plain

Dune; 1965`,
    produced: `The framework refused the media type before binding even started — 415 is produced by the pipeline, not your code.`,
    status: 415,
    body: {
      type: "https://tools.ietf.org/html/rfc9110#section-15.5.16",
      title: "Unsupported Media Type",
      status: 415,
      traceId: "00-3b09fa71-55c8-00"
    }
  },
  {
    label: "Database down",
    request: `GET /api/books/1
(PostgreSQL unreachable)`,
    produced: `An unhandled exception in Production, translated by AddProblemDetails + UseExceptionHandler. No detail, no stack trace — the traceId links to the server log.`,
    status: 500,
    body: {
      type: "https://tools.ietf.org/html/rfc9110#section-15.6.1",
      title: "An error occurred while processing your request.",
      status: 500,
      traceId: "00-e4d2a8f3-11c7-00"
    }
  }
];

/* ---------------- lesson content (structured blocks, rendered by content.js) ---------------- */

const MODULE_LESSONS = [
  {
    id: "lesson-1",
    badge: "L1",
    nav: "Request validation pipeline",
    content: [
      {
        type: "html",
        html: `<span class="lesson-pill">L1 · Lesson</span><h1 class="lesson-h1">Where Request Validation Actually Happens</h1><p class="lesson-lead">Model binding, ModelState, and the automatic 400 — the two gates that stop bad input before your code runs.</p><div class="lesson-meta-bar"><span>⏱️ ~20 min</span><span>🧠 4 knowledge checks</span><span>🛠️ Pipeline simulator</span></div>`
      },
      {
        type: "h2",
        html: "The path a request takes"
      },
      {
        type: "p",
        html: `When a client sends JSON to a controller action, ASP.NET Core does not jump straight into your code. The request walks through a fixed pipeline, and <strong>two gates</strong> can reject it before your action method ever runs: <strong>model binding</strong> and <strong>model validation</strong>. Understanding what each gate can catch — and what it cannot — is the foundation for everything else in this module.`
      },
      {
        type: "html",
        html: `<div class="diagram-container">
  <div class="diagram-title">Raff request pipeline — where bad input is stopped</div>
  <div class="m4-stages">
    <div class="m4-stage"><div class="m4-stage-name">HTTP request</div><div class="m4-stage-desc">Kestrel accepts the connection and parses the HTTP message</div></div>
    <div class="m4-stage"><div class="m4-stage-name">Routing</div><div class="m4-stage-desc">Endpoint selection: which action matches this method + path?</div></div>
    <div class="m4-stage"><div class="m4-stage-name">Model binding</div><div class="m4-stage-desc">System.Text.Json reads the body into the DTO. Malformed JSON and type mismatches fail here</div></div>
    <div class="m4-stage"><div class="m4-stage-name">Model validation</div><div class="m4-stage-desc">Validation attributes and IValidatableObject run against the bound DTO</div></div>
    <div class="m4-stage"><div class="m4-stage-name">Action filters</div><div class="m4-stage-desc">With [ApiController], ModelStateInvalidFilter short-circuits invalid requests with 400</div></div>
    <div class="m4-stage"><div class="m4-stage-name">Controller action</div><div class="m4-stage-desc">Your code — reached only when binding and validation both passed</div></div>
    <div class="m4-stage"><div class="m4-stage-name">Service layer</div><div class="m4-stage-desc">Business rules that need data at hand (categories, duplicates)</div></div>
    <div class="m4-stage"><div class="m4-stage-name">EF Core → PostgreSQL</div><div class="m4-stage-desc">Persistence; database constraints act as the final safety net</div></div>
  </div>
</div>`
      },
      {
        type: "callout",
        kind: "info",
        title: "ℹ️ Order is a contract, not an implementation detail",
        html: `Each gate only sees requests that survived the previous one. A malformed body never reaches validation attributes, and an action method with invalid <code>ModelState</code> never runs under <code>[ApiController]</code>. That ordering is what makes failures predictable — and what this module teaches you to keep predictable.`
      },
      {
        type: "html",
        html: `<div class="table-wrapper"><table><thead><tr><th>Stage</th><th>What happens</th><th>Typical failure</th><th>What the client gets</th></tr></thead><tbody><tr><td>Routing</td><td>Matches HTTP method + URL to an action</td><td>No endpoint matches</td><td>404 (framework-level)</td></tr><tr><td>Model binding</td><td>Deserializes the JSON body into the DTO</td><td>Malformed JSON; value cannot convert (say, <code>"abc"</code> for an <code>int</code>)</td><td>400 with model errors — action never runs with <code>[ApiController]</code></td></tr><tr><td>Model validation</td><td>Runs <code>[Required]</code>, <code>[StringLength]</code>, <code>[Range]</code>, <code>IValidatableObject</code>…</td><td>Values violate the rule contract</td><td>400 <code>ValidationProblemDetails</code> — action never runs</td></tr><tr><td>Controller action</td><td>Your code, only on clean input</td><td>—</td><td>Your status codes: 201, 204, 404, 409…</td></tr><tr><td>Service + EF Core</td><td>Business rules and persistence</td><td>Missing rows, duplicates, FK conflicts</td><td>Statuses you map — Lessons 5 and 6</td></tr></tbody></table></div>`
      },
      {
        type: "h2",
        html: "Model binding: from JSON to a DTO"
      },
      {
        type: "p",
        html: `<strong>Model binding</strong> is the translation step: an HTTP request message on one side, a C# object on the other. For a JSON body, the <code>System.Text.Json</code> input formatter deserializes the payload into your DTO. Raff's create endpoint looks like this:`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">BooksController.cs</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-fragment">Fragment</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">public record CreateBookDto(
    string Title,
    int PublishedYear,
    string? Summary);

[ApiController]
[Route("api/books")]
public class BooksController : ControllerBase
{
    [HttpPost]
    public async Task&lt;ActionResult&lt;BookDto&gt;&gt; CreateBook(
        CreateBookDto dto,
        CancellationToken cancellationToken)
    {
        var book = await _books.CreateAsync(dto, cancellationToken);
        return CreatedAtAction(nameof(GetBook), new { id = book.Id }, book);
    }
}</code></pre><div class="code-expl">With <code>[ApiController]</code> on the controller, the complex-type parameter <code>CreateBookDto dto</code> is inferred as <code>[FromBody]</code> — no attribute needed.</div></div>`
      },
      {
        type: "p",
        html: "The binding behaviors worth knowing:"
      },
      {
        type: "list",
        ordered: false,
        items: [
          `<strong>Case-insensitive by default.</strong> ASP.NET Core web defaults configure <code>System.Text.Json</code> with <code>PropertyNameCaseInsensitive = true</code>, so <code>title</code> and <code>Title</code> both bind.`,
          `<strong>Quoted numbers are accepted.</strong> Web defaults also enable <code>NumberHandling = AllowReadingFromString</code>, so <code>"publishedYear": "1965"</code> binds to the <code>int</code> value 1965. This is a framework default, not something your DTO declares — don't rely on it as part of your public contract.`,
          `<strong>Missing members become default values.</strong> An omitted <code>title</code> leaves the property <code>null</code>; an omitted <code>int</code> becomes <code>0</code>. Binding itself does not fail. Saying nothing about a field is not, by itself, a binding error.`,
          `<strong>Conversion failures are binding errors.</strong> <code>"abc"</code> for an <code>int</code> property cannot deserialize. The JSON layer reports a conversion error keyed by JSON path — <code>$.publishedYear</code> — rather than by C# property name.`
        ]
      },
      {
        type: "callout",
        kind: "warning",
        title: "⚠️ Binding success does not mean valid input",
        html: `A payload can bind perfectly while being completely wrong per your rules — an empty title, a year of 30000, a summary longer than any column. Conversely, syntactically beautiful JSON can fail to bind because a single value is the wrong type. The two gates fail for different reasons and produce different error shapes; conflating them leads to confusing APIs.`
      },
      {
        type: "h2",
        html: "Two kinds of \"bad input\""
      },
      {
        type: "p",
        html: `Every rejected payload in this module falls into one of two buckets, and you can always tell them apart by <em>who detected it</em>:`
      },
      {
        type: "html",
        html: `<div class="table-wrapper"><table><thead><tr><th>Failure type</th><th>Example</th><th>Detected by</th><th>Error detail</th></tr></thead><tbody><tr><td>Body cannot be read</td><td>Truncated JSON; <code>"abc"</code> where an <code>int</code> is expected</td><td>Model binding (JSON layer)</td><td>Keyed by JSON path (<code>$.publishedYear</code>) with parser messages, line/position info</td></tr><tr><td>Body reads fine, rules violated</td><td><code>{"title": "", …}</code>; year 30000; 10 000-character summary</td><td>Model validation (attributes)</td><td>Keyed by property name (<code>Title</code>) with the attribute's message</td></tr></tbody></table></div>`
      },
      {
        type: "p",
        html: `Both cases produce a <code>400</code> under <code>[ApiController]</code>, but the error dictionaries come from different producers. The payloads below are representative output — captured from a minimal .NET 10 API configured like Raff's, with <code>[ApiController]</code> and a <code>CreateBookDto</code> using <code>[Required]</code>, <code>[StringLength]</code>, and <code>[Range]</code>:`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">400 — conversion failure (binding gate)</span><span class="code-badge-group"><span class="code-lang-tag">json</span><span class="code-type-pill pill-illustrative">Illustrative</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-json">{
  "type": "https://tools.ietf.org/html/rfc9110#section-15.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "errors": {
    "dto": [
      "The dto field is required."
    ],
    "$.publishedYear": [
      "The JSON value could not be converted to System.Int32. Path: $.publishedYear | LineNumber: 0 | BytePositionInLine: 37."
    ]
  },
  "traceId": "00-…-…-00"
}</code></pre><div class="code-expl">The conversion error is keyed by JSON path and carries parser detail. The extra <code>dto</code> entry appears because the parameter as a whole could not be materialized — that is a parameter-level binding failure, not a property validation rule.</div></div>`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">400 — validation failure (validation gate)</span><span class="code-badge-group"><span class="code-lang-tag">json</span><span class="code-type-pill pill-illustrative">Illustrative</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-json">{
  "type": "https://tools.ietf.org/html/rfc9110#section-15.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "errors": {
    "Title": [
      "The Title field is required.",
      "The field Title must be a string with a minimum length of 1 and a maximum length of 200."
    ]
  },
  "traceId": "00-…-…-00"
}</code></pre><div class="code-expl">Validation errors are keyed by C# property name. Two messages appear here because <code>[Required]</code> and <code>[StringLength(MinimumLength = 1)]</code> both reject null — Lesson 2 shows how to avoid doubled messages.</div></div>`
      },
      {
        type: "callout",
        kind: "info",
        title: "ℹ️ Version note",
        html: `Exact messages, keys, and the surrounding fields depend on your .NET version and serializer configuration. The shapes above were captured on .NET 10 with default web serialization settings. Treat them as the canonical <em>pattern</em>: binding failures carry JSON-path detail, validation failures carry property-name detail, and both arrive as a problem-details body with a <code>400</code>.`
      },
      {
        type: "h2",
        html: "[ApiController] and the automatic 400"
      },
      {
        type: "p",
        html: `The <code>[ApiController]</code> attribute is what turns <em>invalid <code>ModelState</code></em> into a <em>guaranteed <code>400</code> before your code runs</em>. Internally, the framework registers the <code>ModelStateInvalidFilter</code>, which inspects <code>ModelState</code> and short-circuits the request when any entry is invalid. The response body is a <code>ValidationProblemDetails</code> — the <code>errors</code> dictionary you saw above.`
      },
      {
        type: "p",
        html: `Without that attribute, nothing is automatic. The action executes and you must opt in to rejecting invalid input:`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">Manual ModelState check (when there is no [ApiController])</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-fragment">Fragment</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">[HttpPost]
public IActionResult CreateBook(CreateBookDto dto)
{
    if (!ModelState.IsValid)
    {
        // You are responsible for this branch — the framework will not do it for you.
        return ValidationProblem(ModelState);
    }

    // …
}</code></pre><div class="code-expl">If you suppress the automatic behavior on an <code>[ApiController]</code> via <code>ApiBehaviorOptions.SuppressModelStateInvalidFilter</code>, you re-enter this world and own the check again.</div></div>`
      },
      {
        type: "p",
        html: `For Raff, keep the automatic behavior and treat the action body as a clean-input zone: if your action is executing at all, binding and validation succeeded. That is a powerful simplifying assumption — use it, and don't re-validate the same attributes by hand inside the action.`
      },
      {
        type: "callout",
        kind: "info",
        title: "ℹ️ Customizing the automatic 400",
        html: `The shape of the automatic response is configurable through <code>ApiBehaviorOptions.InvalidModelStateResponseFactory</code> — Lesson 6 uses that hook to unify validation errors with the rest of Raff's error contract.`
      },
      {
        type: "h2",
        html: "What this pipeline does not cover"
      },
      {
        type: "p",
        html: `Model binding and validation only protect the <em>request contract</em>: types, presence, length, range. They cannot check whether a category exists, whether the user already has this book in their reading list, or whether a title duplicates a unique constraint. Those are <strong>business rules</strong> and <strong>database constraints</strong>, and they belong to later stages of the pipeline (Lesson 3 maps the boundaries). Keep the distinction sharp: if an input problem can be judged from the payload alone, it belongs to this lesson's gates; if it needs data or persistence, it belongs further down.`
      },
      {
        type: "html",
        html: `<div class="simulator-widget" data-widget="pipeline" id="w-pipeline"><div class="simulator-header"><div class="simulator-title">🛠️ Pipeline simulator</div><div class="m4-mode-note" style="margin-top:0;">Run requests through Raff and watch which gate stops each one.</div></div><div class="simulator-body"></div></div>`
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
        html: `<div class="refs-block"><div class="refs-title">Official references</div><ul><li><a href="https://learn.microsoft.com/aspnet/core/mvc/models/validation" target="_blank" rel="noopener noreferrer">Model validation in ASP.NET Core ↗</a></li><li><a href="https://learn.microsoft.com/aspnet/core/mvc/models/model-binding" target="_blank" rel="noopener noreferrer">Model binding in ASP.NET Core ↗</a></li><li><a href="https://learn.microsoft.com/aspnet/core/fundamentals/error-handling-api" target="_blank" rel="noopener noreferrer">Handle errors in ASP.NET Core web APIs ↗</a></li></ul></div>`
      },
      {
        type: "html",
        html: `<div class="lesson-footer-nav"><button class="btn-complete-lesson" type="button" data-lesson="lesson-1">Mark Lesson 1 Complete ✓</button>
<button class="btn-primary" type="button" data-nav-target="lesson-2">Next: DTO validation attributes →</button></div>`
      }
    ]
  },
  {
    id: "lesson-2",
    badge: "L2",
    nav: "DTO validation attributes",
    content: [
      {
        type: "html",
        html: `<span class="lesson-pill">L2 · Lesson</span><h1 class="lesson-h1">DTO Validation Attributes That Match Your Rules</h1><p class="lesson-lead">Required, StringLength, Range, RegularExpression — what they actually enforce, and the record pitfalls that 500 your API.</p><div class="lesson-meta-bar"><span>⏱️ ~25 min</span><span>🧠 4 knowledge checks</span><span>🛠️ Validation playground</span></div>`
      },
      {
        type: "h2",
        html: "The request contract, written in attributes"
      },
      {
        type: "p",
        html: `Data-annotation attributes on a DTO are more than documentation — the validation stage executes them for every request that reaches the validation gate. The rule of thumb: <strong>if you can judge it from the payload alone, encode it as an attribute</strong>. Everything that needs a database stays out (Lesson 3).`
      },
      {
        type: "html",
        html: `<div class="table-wrapper"><table><thead><tr><th>Attribute</th><th>Use it for</th><th>Default message</th><th>Watch out for</th></tr></thead><tbody><tr><td><code>[Required]</code></td><td>Field must be present and meaningful</td><td><code>The {Name} field is required.</code></td><td>Rejects null, empty strings, <em>and whitespace-only strings</em> (verified on .NET 10). That last one surprises people who expect <code>"   "</code> to pass.</td></tr><tr><td><code>[StringLength(max, MinimumLength = n)]</code></td><td>Length bounds with cited limits</td><td><code>The field {Name} must be a string with a minimum length of {n} and a maximum length of {max}.</code></td><td>Counts UTF-16 length. When <code>MinimumLength &gt; 0</code> it also rejects null — combined with <code>[Required]</code> that yields two messages for the same missing field.</td></tr><tr><td><code>[MaxLength(200)]</code> / <code>[MinLength(1)]</code></td><td>Cleaner length bounds</td><td><code>The field {Name} must be a string with a maximum length of {max}.</code></td><td><code>[MaxLength]</code> treats null as valid; pair it with <code>[Required]</code> for presence. That split produces one clear message per problem.</td></tr><tr><td><code>[Range(1, 9999)]</code></td><td>Numeric bounds, inclusive</td><td><code>The field {Name} must be between {min} and {max}.</code></td><td>Applies when a value is present. On <code>int? PublishedYear</code>, null passes — add <code>[Required]</code> if the field is mandatory.</td></tr><tr><td><code>[RegularExpression("^https://.+")]</code></td><td>Format checks that regex can express</td><td><code>The field {Name} must match the regular expression '{pattern}'.</code></td><td>Anchors are on you. Null passes — regex checks only run for present values.</td></tr></tbody></table></div>`
      },
      {
        type: "p",
        html: "A complete DTO for Raff's create endpoint:"
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">Contracts/CreateBookDto.cs</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-complete">Complete</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">using System.ComponentModel.DataAnnotations;

public class CreateBookDto
{
    [Required]
    [MaxLength(200)]
    public string Title { get; set; } = "";

    [Range(1, 9999)]
    public int PublishedYear { get; set; }

    [MaxLength(5000)]
    public string? Summary { get; set; }

    [RegularExpression("^https://.+")]
    public string? CoverUrl { get; set; }
}</code></pre><div class="code-expl">Class-based DTOs keep explicit properties, so every attribute's target is unambiguous. The <code>[Required] + [MaxLength]</code> split is deliberate — see "Keep the error list clean" below.</div></div>`
      },
      {
        type: "h2",
        html: "Records and positional parameters"
      },
      {
        type: "p",
        html: `Positional records are the concise way to write DTOs, and modern ASP.NET Core fully supports validating them — <strong>but the attributes must be associated with the primary-constructor parameters</strong>, not with the generated properties. Write them directly in the parameter list:`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">Recommended record form</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-fragment">Fragment</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">public record CreateBookDto(
    [Required, StringLength(200, MinimumLength = 1)] string Title,
    [Range(1, 9999)] int PublishedYear,
    [StringLength(5000)] string? Summary);</code></pre><div class="code-expl">Attributes on primary-constructor parameters are validated correctly — verified against a minimal .NET 10 API: a missing <code>title</code> returns a <code>400</code> with <code>{"Title": ["The Title field is required."]}</code>.</div></div>`
      },
      {
        type: "callout",
        kind: "danger",
        title: "🚫 Never use the property: target on record parameters",
        html: `If you write <code>[property: Required] string Title</code>, MVC throws at request time — not at build time. The captured .NET 10 exception is: <em>"Record type 'CreateBookDto' has validation metadata defined on property 'Title' … validation metadata must be associated with the constructor parameter."</em> The client gets a <code>500</code> for what should have been a <code>400</code>. Keep attributes on the parameter; when in doubt, use a class DTO where every attribute target is explicit.`
      },
      {
        type: "h2",
        html: "Nullable annotations are not runtime validation"
      },
      {
        type: "p",
        html: `Turning on nullable reference types gives you compiler warnings — valuable, but a compile-time feature. The runtime validation stage reads <em>metadata</em>, and the interaction between the two deserves precision:`
      },
      {
        type: "list",
        ordered: false,
        items: [
          `<strong>Implicit required for non-nullable reference types.</strong> MVC's validation treats a non-nullable reference-type property that is null as if it had <code>[Required]</code>. Verified on .NET 10: a property declared <code>string Title { get; set; } = null!;</code> with <code>title</code> omitted from the payload returns <code>400</code> — <code>The Title field is required.</code> — even without an explicit attribute. You can disable that inference with <code>MvcOptions.SuppressImplicitRequiredAttributeForNonNullableReferenceTypes</code>, but Raff keeps it and stays explicit anyway.`,
          `<strong>But the implicit check is narrower than [Required].</strong> It fails only for null. An empty string (and whitespace) passes it — verified: a bare DTO returned <code>200</code> with <code>"title": ""</code>. <code>[Required]</code> rejects empty and whitespace strings. If empty titles are invalid — they are in Raff — write <code>[Required]</code> and don't rely on the inference.`,
          `<strong>Nullable value types are optional by nature.</strong> <code>int?</code> accepts null, so nullability annotations alone never constrain a number. Bounds come from <code>[Range]</code>, which then applies only when a value is present.`,
          `<strong>Optional fields still need rules.</strong> <code>string? Summary</code> says "may be absent", not "anything goes". Length limits still belong on it — otherwise an unbounded string walks into your database layer.`
        ]
      },
      {
        type: "callout",
        kind: "success",
        title: "✅ The explicit rule works out to a simple style",
        html: `Decorate every field with what the contract actually requires: <code>[Required]</code> for presence, <code>[MaxLength]</code> for size, <code>[Range]</code> for numbers, <code>[RegularExpression]</code> for format. Treat compiler nullability as a design aid, not the contract.`
      },
      {
        type: "h2",
        html: "Keep the error list clean"
      },
      {
        type: "p",
        html: `Attribute combinations determine the messages a client sees. On .NET 10, <code>[Required]</code> plus <code>[StringLength(200, MinimumLength = 1)]</code> on a missing or empty title produces <em>two</em> messages for one problem:`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">One problem, two messages</span><span class="code-badge-group"><span class="code-lang-tag">json</span><span class="code-type-pill pill-illustrative">Illustrative</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-json">{ "Title": [
    "The Title field is required.",
    "The field Title must be a string with a minimum length of 1 and a maximum length of 200."
] }</code></pre><div class="code-expl">Both attributes independently reject null. The client now has to reconcile two sentences for one mistake.</div></div>`
      },
      {
        type: "p",
        html: `The split shown in the complete DTO — <code>[Required]</code> for presence plus <code>[MaxLength]</code> for size — yields exactly one message per problem, verified in the same capture session. When you want a minimum length, prefer <code>[Required]</code> + <code>[MinLength]</code> for the same reason.`
      },
      {
        type: "h2",
        html: "Hands-on: design the validation contract"
      },
      {
        type: "p",
        html: `Raff is adding an <code>AddReadingEntryDto</code> endpoint: a user adds a book to their reading list, optionally with a progress percentage and a private note. Encode this contract with attributes (or a record — your call):`
      },
      {
        type: "list",
        ordered: false,
        items: [
          "<code>BookId</code> — required positive integer",
          "<code>ProgressPercent</code> — optional integer, when provided must be 0–100",
          "<code>Note</code> — optional, max 2 000 characters",
          `Anything in the payload that cannot possibly satisfy these rules must fail with <code>400</code> <em>before</em> the action runs`
        ]
      },
      {
        type: "html",
        html: `<details class="hint-details solution-details"><summary>Show a model answer</summary><div class="hint-body"><div class="code-wrapper" style="margin-top:0.75rem;"><pre><code class="language-cs">public class AddReadingEntryDto
{
    [Range(1, int.MaxValue)]
    public int BookId { get; set; }

    [Range(0, 100)]
    public int? ProgressPercent { get; set; }

    [MaxLength(2000)]
    public string? Note { get; set; }
}</code></pre></div>
<ul style="margin-top:0.75rem;">
<li><strong>BookId</strong>: no <code>[Required]</code> needed — an <code>int</code> always has a value (0 when absent), so <code>[Range(1, int.MaxValue)]</code> covers both "absent" and "non-positive".</li>
<li><strong>ProgressPercent</strong>: <code>int?</code> lets absence pass; <code>[Range(0, 100)]</code> applies whenever a value is provided.</li>
<li><strong>Note</strong>: <code>[MaxLength]</code> passes null, and applies to any provided string.</li>
</ul></div></details>`
      },
      {
        type: "html",
        html: `<details class="hint-details solution-details"><summary>Review checklist before you move on</summary><div class="hint-body"><ul>
<li>Does every mandatory field have explicit presence validation (not implicit nullability)?</li>
<li>Do optional fields have size/range limits that still apply when present?</li>
<li>Does any single invalid value produce exactly one message?</li>
<li>Are all rules decidable from the payload alone? (If not, they belong in Lesson 3 territory.)</li>
</ul></div></details>`
      },
      {
        type: "html",
        html: `<div class="simulator-widget" data-widget="playground" id="w-playground"><div class="simulator-header"><div class="simulator-title">🧪 Validation playground</div><div class="m4-mode-note" style="margin-top:0;">Edit the payload and the rules, then send — the output mirrors the real framework.</div></div><div class="simulator-body"></div></div>`
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
        html: `<div class="refs-block"><div class="refs-title">Official references</div><ul><li><a href="https://learn.microsoft.com/aspnet/core/mvc/models/validation" target="_blank" rel="noopener noreferrer">Model validation in ASP.NET Core ↗</a></li><li><a href="https://learn.microsoft.com/dotnet/api/system.componentmodel.dataannotations" target="_blank" rel="noopener noreferrer">System.ComponentModel.DataAnnotations namespace ↗</a></li></ul></div>`
      },
      {
        type: "html",
        html: `<div class="lesson-footer-nav"><button class="btn-secondary" type="button" data-nav-target="lesson-1">← Request validation pipeline</button>
<button class="btn-complete-lesson" type="button" data-lesson="lesson-2">Mark Lesson 2 Complete ✓</button>
<button class="btn-primary" type="button" data-nav-target="lesson-3">Next: Three layers of rules →</button></div>`
      }
    ]
  },
  {
    id: "lesson-3",
    badge: "L3",
    nav: "Three layers of rules",
    content: [
      {
        type: "html",
        html: `<span class="lesson-pill">L3 · Lesson</span><h1 class="lesson-h1">Request Validation vs Business Rules vs Database Constraints</h1><p class="lesson-lead">A rule belongs to exactly one layer. Putting it in the wrong one is how APIs become slow, racy, or both.</p><div class="lesson-meta-bar"><span>⏱️ ~20 min</span><span>🧠 4 knowledge checks</span><span>🛠️ Layer lab</span></div>`
      },
      {
        type: "h2",
        html: "Three layers, three jobs"
      },
      {
        type: "p",
        html: `Raff's rules do not all live in the same place, and they should not. Each layer answers a different question with different tools, and each failure mode maps naturally onto a status code.`
      },
      {
        type: "html",
        html: `<div class="table-wrapper"><table><thead><tr><th>Layer</th><th>Answers the question</th><th>Tools</th><th>Failure surfaces as</th></tr></thead><tbody><tr><td>Request validation</td><td>Is the payload well-formed and internally consistent?</td><td>DataAnnotations, <code>IValidatableObject</code> (payload-only)</td><td>400 — automatically, before the action runs</td></tr><tr><td>Business rules</td><td>Is this operation allowed given the current state of the data?</td><td>Service-layer checks against the database</td><td>404, 409, or a domain result the controller maps</td></tr><tr><td>Database constraints</td><td>What must remain true no matter what application code does?</td><td>Unique indexes, foreign keys, NOT NULL, CHECK</td><td>A <code>DbUpdateException</code> you translate — the last line of defense</td></tr></tbody></table></div>`
      },
      {
        type: "p",
        html: `The mental test for placement: <strong>can the rule be judged from the payload alone?</strong> If yes, it is request validation. If it needs to know something about the world — does this category exist, is this user already listed — it is a business rule. If it is an invariant that must hold even under concurrency or future code paths, it also belongs in the database schema.`
      },
      {
        type: "h2",
        html: "What belongs where"
      },
      {
        type: "html",
        html: `<div class="table-wrapper"><table><thead><tr><th>Rule</th><th>Layer</th><th>Why</th></tr></thead><tbody><tr><td>Title ≤ 200 characters</td><td>Request validation</td><td>Pure function of the payload</td></tr><tr><td>PublishedYear between 1 and 9999</td><td>Request validation</td><td>Pure function of the payload</td></tr><tr><td>ProgressPercent, when provided, is 0–100</td><td>Request validation</td><td>Pure function of the payload</td></tr><tr><td>CategoryId refers to an existing category</td><td>Business rule</td><td>Needs a database lookup</td></tr><tr><td>A user cannot add the same book twice</td><td>Business rule + unique index</td><td>Needs state — and a race to defend against</td></tr><tr><td>A book with reading entries cannot be deleted</td><td>Business rule + FK</td><td>Needs state; the FK is the backstop</td></tr><tr><td>Summary ≤ 5 000 characters</td><td>Request validation</td><td>Pure function of the payload</td></tr></tbody></table></div>`
      },
      {
        type: "h2",
        html: "Cross-field rules that stay in the payload: IValidatableObject"
      },
      {
        type: "p",
        html: `Some rules involve several fields but still need nothing from the database — for example, "the goal's end date must be after its start date". <code>IValidatableObject</code> runs as part of the validation gate, after property-level attributes:`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">Contracts/CreateGoalDto.cs</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-complete">Complete</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">using System.ComponentModel.DataAnnotations;

public class CreateGoalDto : IValidatableObject
{
    [Range(1, 365)]
    public int TargetBooks { get; set; }

    public DateOnly StartDate { get; set; }

    public DateOnly EndDate { get; set; }

    public IEnumerable&lt;ValidationResult&gt; Validate(ValidationContext context)
    {
        if (EndDate &lt;= StartDate)
        {
            yield return new ValidationResult(
                "EndDate must be after StartDate.",
                new[] { nameof(EndDate) });
        }
    }
}</code></pre><div class="code-expl">Errors produced here land in <code>ModelState</code> like any attribute error, keyed by the member names you pass — and they flow through the same automatic 400. Object-level validation like this only runs if property-level attribute validation passed.</div></div>`
      },
      {
        type: "callout",
        kind: "danger",
        title: "🚫 Never query the database from a validation attribute or IValidatableObject",
        html: `The validation gate is designed to be a pure function of the payload: it runs on every request before any business logic, it has no result caching, and putting SQL there means every malformed request also pays for database round trips — plus you fight the framework for dependency access. If the rule needs data, it is a business rule. Full stop.`
      },
      {
        type: "h2",
        html: "Business rules: the service layer"
      },
      {
        type: "p",
        html: `Business rules live in the service layer, where a database context and the current state are available. A representative check from Raff's book creation flow:`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">Services/ReadingEntryService.cs</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-illustrative">Illustrative</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">public async Task&lt;CreateEntryOutcome&gt; AddAsync(
    AddReadingEntryDto dto, string userId, CancellationToken ct)
{
    var bookExists = await _db.Books
        .AnyAsync(b =&gt; b.Id == dto.BookId, ct);

    if (!bookExists)
    {
        // The controller maps this to 404 — Lesson 5 covers outcome mapping.
        return CreateEntryOutcome.BookNotFound;
    }

    // … insert the reading entry, then save
}</code></pre><div class="code-expl">Illustrative shape based on how Raff organizes services — the specifics of your own service signatures will differ. What matters: the check needs the database, so it happens here, not in an attribute.</div></div>`
      },
      {
        type: "p",
        html: `Notice the division of labor: the DTO already guaranteed <code>BookId</code> is a positive integer. The service answers the question the DTO cannot: does that book exist, for this user, right now?`
      },
      {
        type: "h2",
        html: "Database constraints: the last line of defense"
      },
      {
        type: "p",
        html: `Application checks have a blind spot: <strong>races</strong>. Consider "a user cannot add the same book twice". A service check queries, decides, then inserts — but between the query and the insert, another request can do the same. Both checks pass; both inserts execute; the duplicate exists. Only the database can adjudicate this reliably:`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">Data/AppDbContext.cs — unique index for reading entries</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-fragment">Fragment</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">modelBuilder.Entity&lt;ReadingEntry&gt;()
    .HasIndex(e =&gt; new { e.UserId, e.BookId })
    .IsUnique();</code></pre><div class="code-expl">This is the rule that survives concurrency, bugs in future code paths, and direct database access. The service-layer check still exists — it turns the common case into a friendly 409 without an exception — but the index is the truth.</div></div>`
      },
      {
        type: "list",
        ordered: false,
        items: [
          `<strong>Foreign keys</strong> guarantee that <code>CategoryId</code> values refer to real rows — the structural version of "category must exist".`,
          `<strong>NOT NULL</strong> constraints guarantee presence at the storage layer, independent of DTO shape.`,
          `<strong>CHECK constraints</strong> can enforce ranges where they matter most (say, <code>progress_percent BETWEEN 0 AND 100</code>) — belt and braces with <code>[Range]</code>.`,
          `<strong>Unique indexes</strong> are the canonical solution for "no duplicates" semantics — including composite keys like <code>(UserId, BookId)</code>.`
        ]
      },
      {
        type: "callout",
        kind: "info",
        title: "ℹ️ Translate the exception, don't leak it",
        html: `When a unique index fires, EF Core throws <code>DbUpdateException</code> (with a provider-specific inner exception — Npgsql surfaces SQLSTATE <code>23505</code> for unique violations). Leaving that unhandled produces a 500 for what is actually a client conflict. Lesson 5 shows how services and controllers translate it into <code>409 Conflict</code>.`
      },
      {
        type: "h2",
        html: "A placement drill"
      },
      {
        type: "p",
        html: `Before the lab, run each of these through the mental test — payload alone, state needed, or invariant:`
      },
      {
        type: "list",
        ordered: false,
        items: [
          "<em>\"A reading entry's note must be at most 2 000 characters.\"</em> — payload only → attribute.",
          `<em>"A user cannot follow the same user twice."</em> — needs state, and racing is possible → service check + unique index on <code>(FollowerId, FolloweeId)</code>.`,
          `<em>"A user's display name must match <code>^[a-zA-Z0-9_]{3,30}$</code>."</em> — payload only → <code>[RegularExpression]</code> (with anchors).`,
          `<em>"A reading goal's end date must be after its start date."</em> — payload only, cross-field → <code>IValidatableObject</code>.`,
          `<em>"Deleting a category must not orphan books."</em> — needs state → service rule plus FK configuration deciding the behavior (restrict, reassign, or cascade).`
        ]
      },
      {
        type: "html",
        html: `<div class="simulator-widget" data-widget="layers" id="w-layers"><div class="simulator-header"><div class="simulator-title">🧱 Layer lab</div><div class="m4-mode-note" style="margin-top:0;">Place each rule in the layer where it belongs.</div></div><div class="simulator-body"></div></div>`
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
        html: `<div class="refs-block"><div class="refs-title">Official references</div><ul><li><a href="https://learn.microsoft.com/aspnet/core/mvc/models/validation" target="_blank" rel="noopener noreferrer">Model validation in ASP.NET Core ↗</a></li><li><a href="https://learn.microsoft.com/ef/core/modeling/indexes" target="_blank" rel="noopener noreferrer">EF Core — Indexes ↗</a></li><li><a href="https://learn.microsoft.com/ef/core/modeling/relational/check-constraints" target="_blank" rel="noopener noreferrer">EF Core — Constraints ↗</a></li></ul></div>`
      },
      {
        type: "html",
        html: `<div class="lesson-footer-nav"><button class="btn-secondary" type="button" data-nav-target="lesson-2">← DTO validation attributes</button>
<button class="btn-complete-lesson" type="button" data-lesson="lesson-3">Mark Lesson 3 Complete ✓</button>
<button class="btn-primary" type="button" data-nav-target="lesson-4">Next: PATCH done right →</button></div>`
      }
    ]
  },
  {
    id: "lesson-4",
    badge: "L4",
    nav: "PATCH done right",
    content: [
      {
        type: "html",
        html: `<span class="lesson-pill">L4 · Lesson</span><h1 class="lesson-h1">PUT vs PATCH: Partial Updates Without Losing Data</h1><p class="lesson-lead">Why a nullable DTO cannot express a patch, three approaches that can, and the one Raff should use.</p><div class="lesson-meta-bar"><span>⏱️ ~30 min</span><span>🧠 5 knowledge checks</span><span>🛠️ PATCH simulator</span></div>`
      },
      {
        type: "h2",
        html: "Two verbs, two contracts"
      },
      {
        type: "p",
        html: `<code>PUT</code> and <code>PATCH</code> are not interchangeable. <code>PUT</code> replaces the resource with the representation in the request: <strong>an omitted field means "clear it"</strong>, because the body is the complete state you want the resource to have. <code>PATCH</code> (RFC 5789) modifies the resource: <strong>an omitted field means "leave it alone"</strong>.`
      },
      {
        type: "html",
        html: `<div class="table-wrapper"><table><thead><tr><th>Request</th><th>Meaning of omission</th><th>Meaning of explicit null</th><th>Fits when</th></tr></thead><tbody><tr><td><code>PUT /api/books/42</code> with a full body</td><td>Field absent from the body → cleared / reset to default</td><td>"Set this field to null" (if the field is nullable)</td><td>Clients hold the complete resource and want to replace it</td></tr><tr><td><code>PATCH /api/books/42</code> with a partial body</td><td>Field absent → unchanged</td><td>"Clear this field" (application-defined)</td><td>Clients want to change a few fields without reading the rest</td></tr></tbody></table></div>`
      },
      {
        type: "h2",
        html: "Why a nullable DTO cannot express PATCH"
      },
      {
        type: "p",
        html: `The natural first attempt — a patch DTO with nullable properties — <strong>cannot tell "absent" from "explicitly null"</strong>, because model binding maps both to <code>null</code>. Three requests, two distinct intents, one indistinguishable binding result:`
      },
      {
        type: "html",
        html: `<div class="table-wrapper"><table><thead><tr><th>Request body</th><th>Intent</th><th>Bound <code>string? Note</code></th></tr></thead><tbody><tr><td><code>{}</code></td><td>Leave <code>note</code> alone</td><td><code>null</code></td></tr><tr><td><code>{"note": null}</code></td><td>Clear <code>note</code></td><td><code>null</code></td></tr><tr><td><code>{"note": "chapter 5"}</code></td><td>Set <code>note</code></td><td><code>"chapter 5"</code></td></tr></tbody></table></div>`
      },
      {
        type: "callout",
        kind: "danger",
        title: "🚫 The deadly default",
        html: `If you "solve" this by treating null as "clear the field", then a client that omits a field — or a serialization bug that drops one — silently wipes stored data. If you instead treat null as "ignore", clients can never clear a field. Either choice silently loses one of the two intents. The presence information has to come from somewhere; the rest of this lesson adds it in three ways.`
      },
      {
        type: "h2",
        html: "Approach A — nullable DTO, null means \"leave unchanged\""
      },
      {
        type: "p",
        html: `The zero-infrastructure approach: a patch DTO where every property is nullable, and <code>null</code> is uniformly interpreted as "no change".`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">Approach A — PatchBookDto + action</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-fragment">Fragment</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">public class PatchBookDto
{
    [MaxLength(200)]
    public string? Title { get; set; }

    [MaxLength(5000)]
    public string? Summary { get; set; }
}

[HttpPatch("{id:int}")]
public async Task&lt;IActionResult&gt; PatchBook(
    int id, PatchBookDto dto, CancellationToken ct)
{
    var book = await _books.FindAsync(id, ct);
    if (book is null) return NotFound();

    if (dto.Title is not null) book.Title = dto.Title;
    if (dto.Summary is not null) book.Summary = dto.Summary;

    await _books.SaveAsync(book, ct);
    return NoContent();
}</code></pre><div class="code-expl">Simple, fully validated by attributes, no serialization customization. The cost: no way to ever clear a field via PATCH — clearing requires PUT or a dedicated endpoint.</div></div>`
      },
      {
        type: "p",
        html: `Approach A is legitimate when clearing simply does not exist in your domain (for instance, if "no summary" is impossible). For Raff, summaries and notes can definitely be emptied — so A is out as the general mechanism.`
      },
      {
        type: "h2",
        html: "Approach B — Optional<T> presence tracking"
      },
      {
        type: "p",
        html: `Wrap each patchable field in a small struct that records whether a value was supplied. Absent JSON → the struct stays <code>default</code> (<code>IsSet == false</code>); explicit null → <code>IsSet == true</code> with a null value; a real value → <code>IsSet == true</code> with that value. The presence information now survives binding.`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">Serialization/Optional.cs</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-complete">Complete</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">using System.Text.Json;
using System.Text.Json.Serialization;

public readonly struct Optional&lt;T&gt;
{
    public bool IsSet { get; }
    public T? Value { get; }

    private Optional(bool isSet, T? value)
    {
        IsSet = isSet;
        Value = value;
    }

    public static Optional&lt;T&gt; Unset =&gt; default;
    public static Optional&lt;T&gt; Of(T value) =&gt; new(true, value);
}

public class OptionalJsonConverterFactory : JsonConverterFactory
{
    public override bool CanConvert(Type typeToConvert) =&gt;
        typeToConvert.IsGenericType &amp;&amp;
        typeToConvert.GetGenericTypeDefinition() == typeof(Optional&lt;&gt;);

    public override JsonConverter CreateConverter(
        Type typeToConvert, JsonSerializerOptions options)
    {
        var valueType = typeToConvert.GetGenericArguments()[0];
        return (JsonConverter)Activator.CreateInstance(
            typeof(OptionalJsonConverter&lt;&gt;).MakeGenericType(valueType))!;
    }
}

public class OptionalJsonConverter&lt;T&gt; : JsonConverter&lt;Optional&lt;T&gt;&gt;
{
    public override bool HandleNull =&gt; true;

    public override Optional&lt;T&gt; Read(
        ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        if (reader.TokenType == JsonTokenType.Null)
        {
            return Optional&lt;T&gt;.Of(default!);
        }

        var value = JsonSerializer.Deserialize&lt;T&gt;(ref reader, options)!;
        return Optional&lt;T&gt;.Of(value);
    }

    public override void Write(
        Utf8JsonWriter writer, Optional&lt;T&gt; value, JsonSerializerOptions options)
    {
        if (!value.IsSet)
        {
            writer.WriteNullValue();
            return;
        }

        JsonSerializer.Serialize(writer, value.Value, options);
    }
}</code></pre><div class="code-expl">Verified end-to-end on .NET 10: <code>{}</code> → <code>IsSet == false</code>; <code>{"title": null}</code> → <code>IsSet == true, Value == null</code>; <code>{"title": "Dune"}</code> → <code>IsSet == true, Value == "Dune"</code>. The converter is only invoked for present properties, which is exactly why absence leaves <code>default</code>.</div></div>`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">Registration + usage</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-complete">Complete</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">// Program.cs — teach the input formatter about Optional&lt;T&gt;
builder.Services.AddControllers()
    .AddJsonOptions(options =&gt;
        options.JsonSerializerOptions.Converters.Add(
            new OptionalJsonConverterFactory()));

// The patch DTO: every field is Optional&lt;T&gt;
public class PatchBookDto
{
    public Optional&lt;string&gt; Title { get; init; }
    public Optional&lt;string?&gt; Summary { get; init; }
}

// The action reads intent explicitly
[HttpPatch("{id:int}")]
public async Task&lt;IActionResult&gt; PatchBook(
    int id, PatchBookDto dto, CancellationToken ct)
{
    var book = await _books.FindAsync(id, ct);
    if (book is null) return NotFound();

    if (dto.Title.IsSet)   book.Title = dto.Title.Value;
    if (dto.Summary.IsSet) book.Summary = dto.Summary.Value; // null clears

    await _books.SaveAsync(book, ct);
    return NoContent();
}</code></pre><div class="code-expl">Three intents, three branches through one uniform pattern: not set → skip; set with value → assign; set with null → assign null (clear).</div></div>`
      },
      {
        type: "callout",
        kind: "warning",
        title: "⚠️ Optional<T> is invisible to validation attributes",
        html: `<code>[MaxLength]</code> on an <code>Optional&lt;string&gt;</code> property sees the wrapper struct, not the string inside, and will not validate as you expect. Two honest options: write unwrap-aware attributes (a tiny custom attribute that checks <code>IsSet</code> and the inner value), or perform the few length/range checks in the action right after the presence branches. Pick one, keep it consistent, and test it — this is the main cost of Approach B.`
      },
      {
        type: "h2",
        html: "Approach C — JsonObject merge-patch (RFC 7396)"
      },
      {
        type: "p",
        html: `The JSON Merge Patch model abandons the DTO for the patch endpoint and works on the raw object graph: each present member is applied to the target; a member whose value is <code>null</code> <em>removes</em> that member. Presence is available because you are iterating actual JSON properties.`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">Approach C — merge-patch action</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-fragment">Fragment</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">[HttpPatch("{id:int}")]
public async Task&lt;IActionResult&gt; PatchBook(
    int id, JsonObject patch, CancellationToken ct)
{
    var book = await _books.FindAsync(id, ct);
    if (book is null) return NotFound();

    // Allow-list only the fields PATCH is permitted to touch.
    if (patch.TryGetPropertyValue("title", out var titleNode))
    {
        if (titleNode is null || titleNode.GetValue&lt;string&gt;() is not string title
            || title.Length is 0 or &gt; 200)
        {
            return ValidationProblem(new Dictionary&lt;string, string[]&gt;
            {
                ["title"] = new[] { "Title must be 1-200 characters when provided." }
            });
        }
        book.Title = title;
    }

    if (patch.TryGetPropertyValue("summary", out var summaryNode))
    {
        book.Summary = summaryNode?.GetValue&lt;string&gt;(); // null removes
    }

    await _books.SaveAsync(book, ct);
    return NoContent();
}</code></pre><div class="code-expl">Presence semantics verified on .NET 10: absent → <code>TryGetPropertyValue</code> false; explicit null → true with a null node. Note what you gave up: automatic model validation. Every rule is now hand-written here — Approach C concentrates risk in this method.</div></div>`
      },
      {
        type: "callout",
        kind: "danger",
        title: "🚫 Merge-patch is a protocol — respect it or drop it",
        html: `RFC 7396 semantics say unknown members are <em>added</em> to the target. Applied blindly to an entity, a client could set properties you never meant to expose. Always allow-list the fields PATCH may touch; never iterate and copy indiscriminately. If you want op-based patches instead, that is RFC 6902 (JSON Patch) — see below.`
      },
      {
        type: "h2",
        html: "Choosing for Raff"
      },
      {
        type: "html",
        html: `<div class="table-wrapper"><table><thead><tr><th>Criterion</th><th>A: nullable DTO</th><th>B: Optional&lt;T&gt;</th><th>C: JsonObject merge-patch</th></tr></thead><tbody><tr><td>Distinguishes absent / null / value</td><td>No</td><td>Yes</td><td>Yes</td></tr><tr><td>Can clear a field via explicit null</td><td>No</td><td>Yes</td><td>Yes</td></tr><tr><td>Automatic attribute validation</td><td>Yes</td><td>Not directly (unwrap-aware attributes needed)</td><td>No — manual checks</td></tr><tr><td>Custom serialization infrastructure</td><td>None</td><td>Converter + registration</td><td>None (framework type)</td></tr><tr><td>Risk concentration</td><td>Low</td><td>Low</td><td>High — all rules manual in the action</td></tr></tbody></table></div>`
      },
      {
        type: "p",
        html: `<strong>The Raff default: Approach B for user-editable resources</strong> (books, reading entries, notes) — it keeps the contract honest, preserves validation, and the converter is written once. Approach A is acceptable for surfaces where clearing does not exist. Approach C is a reasonable small-surface tool, but it trades away the safety of the validation pipeline; use it knowingly.`
      },
      {
        type: "callout",
        kind: "info",
        title: "ℹ️ What about JSON Patch (RFC 6902)?",
        html: `JSON Patch describes changes as an operations array — <code>[{"op": "replace", "path": "/title", "value": "Dune"}]</code> — and ASP.NET Core supports it via the <code>Microsoft.AspNetCore.JsonPatch</code> package. It is powerful (test operations, array edits) but brings JSON Pointer plumbing and its own security concerns; the Microsoft docs walk through the integration. Raff's partial updates are simple field edits, so merge semantics win on clarity.`
      },
      {
        type: "html",
        html: `<div class="simulator-widget" data-widget="patch" id="w-patch"><div class="simulator-header"><div class="simulator-title">🔀 PATCH simulator</div><div class="m4-mode-note" style="margin-top:0;">Three approaches, three requests. Watch what the stored note does.</div></div><div class="simulator-body"></div></div>`
      },
      {
        type: "h2",
        html: "Hands-on: PATCH a reading entry"
      },
      {
        type: "p",
        html: `Implement <code>PATCH /api/reading-entries/{id}</code> using Approach B. The contract: a client can update <code>ProgressPercent</code> (0–100 when present) and <code>Note</code> (max 2 000 characters when present; explicit null clears it). Absent fields must remain untouched. An unknown entry returns <code>404</code>. The DTO and converter from this lesson are already available to you.`
      },
      {
        type: "html",
        html: `<details class="hint-details"><summary>Show hint 1 — DTO shape</summary><div class="hint-body"><p>Two <code>Optional&lt;T&gt;</code> fields. Note that <code>ProgressPercent</code> is an <code>int</code> in the domain, so clearing it means setting a chosen sentinel or making the stored column nullable — decide deliberately and document it.</p></div></details>`
      },
      {
        type: "html",
        html: `<details class="hint-details"><summary>Show hint 2 — where the range check goes</summary><div class="hint-body"><p>Attributes cannot see through the wrapper. Check <code>IsSet</code> first, then validate the inner value, and return <code>ValidationProblem</code> with a property-keyed dictionary when it fails.</p></div></details>`
      },
      {
        type: "html",
        html: `<details class="hint-details solution-details"><summary>Show a worked solution</summary><div class="hint-body"><div class="code-wrapper" style="margin-top:0.75rem;"><pre><code class="language-cs">public class PatchReadingEntryDto
{
    public Optional&lt;int&gt; ProgressPercent { get; init; }
    public Optional&lt;string?&gt; Note { get; init; }
}

[HttpPatch("{id:int}")]
public async Task&lt;IActionResult&gt; PatchEntry(
    int id, PatchReadingEntryDto dto, CancellationToken ct)
{
    var entry = await _entries.FindAsync(id, ct);
    if (entry is null) return NotFound();

    if (dto.ProgressPercent.IsSet)
    {
        var percent = dto.ProgressPercent.Value;
        if (percent is &lt; 0 or &gt; 100)
        {
            return ValidationProblem(new Dictionary&lt;string, string[]&gt;
            {
                ["progressPercent"] = new[]
                {
                    "The field progressPercent must be between 0 and 100."
                }
            });
        }
        entry.ProgressPercent = percent;
    }

    if (dto.Note.IsSet)
    {
        var note = dto.Note.Value;
        if (note is { Length: &gt; 2000 })
        {
            return ValidationProblem(new Dictionary&lt;string, string[]&gt;
            {
                ["note"] = new[]
                {
                    "The field note must be a string with a maximum length of 2000."
                }
            });
        }
        entry.Note = note; // explicit null clears
    }

    await _entries.SaveAsync(entry, ct);
    return NoContent();
}</code></pre></div>
<ul style="margin-top:0.75rem;">
<li>Absent fields: <code>IsSet</code> is false — untouched, exactly the PATCH contract.</li>
<li>Explicit null for <code>note</code>: <code>IsSet</code> is true with a null value — cleared.</li>
<li>Validation runs on the unwrapped value, only when present — one message, one problem.</li>
<li><code>ProgressPercent</code> is a value type: "clear" is not expressible without a sentinel; documenting that decision is part of the contract.</li>
</ul></div></details>`
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
        html: `<div class="refs-block"><div class="refs-title">Official references</div><ul><li><a href="https://www.rfc-editor.org/rfc/rfc5789" target="_blank" rel="noopener noreferrer">RFC 5789 — PATCH method ↗</a></li><li><a href="https://www.rfc-editor.org/rfc/rfc7396" target="_blank" rel="noopener noreferrer">RFC 7396 — JSON Merge Patch ↗</a></li><li><a href="https://www.rfc-editor.org/rfc/rfc6902" target="_blank" rel="noopener noreferrer">RFC 6902 — JSON Patch ↗</a></li><li><a href="https://learn.microsoft.com/aspnet/core/web-api/jsonpatch" target="_blank" rel="noopener noreferrer">JSON Patch in ASP.NET Core web APIs ↗</a></li></ul></div>`
      },
      {
        type: "html",
        html: `<div class="lesson-footer-nav"><button class="btn-secondary" type="button" data-nav-target="lesson-3">← Three layers of rules</button>
<button class="btn-complete-lesson" type="button" data-lesson="lesson-4">Mark Lesson 4 Complete ✓</button>
<button class="btn-primary" type="button" data-nav-target="lesson-5">Next: Result vs exception →</button></div>`
      }
    ]
  },
  {
    id: "lesson-5",
    badge: "L5",
    nav: "Result vs exception",
    content: [
      {
        type: "html",
        html: `<span class="lesson-pill">L5 · Lesson</span><h1 class="lesson-h1">From Service Outcome to HTTP Status</h1><p class="lesson-lead">Expected failures are values, not emergencies. The delete flow that makes the difference concrete.</p><div class="lesson-meta-bar"><span>⏱️ ~25 min</span><span>🧠 4 knowledge checks</span></div>`
      },
      {
        type: "h2",
        html: "The controller is a translation layer"
      },
      {
        type: "p",
        html: `By the time a controller action runs, the payload is bound and validated (Lessons 1–2) and business rules have been applied in the service (Lesson 3). What remains is a mapping problem: a service produces an <em>outcome</em> — deleted, not found, blocked by a dependent resource, a bug — and the controller must translate it into an HTTP status the client can act on.`
      },
      {
        type: "h2",
        html: "Raff's status map"
      },
      {
        type: "html",
        html: `<div class="table-wrapper"><table><thead><tr><th>Situation</th><th>Status</th><th>Produced by</th></tr></thead><tbody><tr><td>Payload violates the request contract</td><td>400 Bad Request</td><td>Model validation + <code>[ApiController]</code> — automatic</td></tr><tr><td>Requested resource does not exist</td><td>404 Not Found</td><td>Your action, from a service outcome</td></tr><tr><td>Operation conflicts with current state (duplicate, dependent data)</td><td>409 Conflict</td><td>Your action or exception handler</td></tr><tr><td>Unsupported content type</td><td>415 Unsupported Media Type</td><td>Framework, before binding</td></tr><tr><td>Success: resource created</td><td>201 Created + <code>Location</code> header</td><td><code>CreatedAtAction</code></td></tr><tr><td>Success: action performed, no body to return</td><td>204 No Content</td><td><code>NoContent()</code></td></tr><tr><td>Bug, database down, unexpected state</td><td>500 Internal Server Error</td><td>Framework — translated to problem details by Lesson 6's middleware, never a raw stack trace</td></tr></tbody></table></div>`
      },
      {
        type: "h2",
        html: "Two ways for a service to say \"no\""
      },
      {
        type: "p",
        html: `Services signal failure either by <strong>returning an outcome</strong> or by <strong>throwing an exception</strong>. Both are used in real codebases; the skill is knowing which fits which failure. The delete flow that follows uses outcomes — the recommended default for expected domain events.`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">Services/BookService.cs — the outcome enum</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-fragment">Fragment</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">public enum DeleteOutcome
{
    Deleted,
    NotFound,
    HasReadingEntries
}</code></pre><div class="code-expl">An enum makes the set of expected failures part of the service's public signature: callers cannot claim they did not know "has entries" was possible.</div></div>`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">Services/BookService.cs — delete with two checks</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-complete">Complete</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">public async Task&lt;DeleteOutcome&gt; DeleteAsync(
    int id, CancellationToken cancellationToken)
{
    var book = await _db.Books
        .FirstOrDefaultAsync(b =&gt; b.Id == id, cancellationToken);

    if (book is null)
    {
        return DeleteOutcome.NotFound;
    }

    var hasEntries = await _db.ReadingEntries
        .AnyAsync(e =&gt; e.BookId == id, cancellationToken);

    if (hasEntries)
    {
        return DeleteOutcome.HasReadingEntries;
    }

    _db.Books.Remove(book);
    await _db.SaveChangesAsync(cancellationToken);
    return DeleteOutcome.Deleted;
}</code></pre><div class="code-expl">The happy path stays linear. No exception is in sight, because nothing here is exceptional — these are expected outcomes of a delete.</div></div>`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">Controllers/BooksController.cs — the translation switch</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-complete">Complete</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">[HttpDelete("{id:int}")]
public async Task&lt;IActionResult&gt; DeleteBook(
    int id, CancellationToken cancellationToken)
{
    var outcome = await _books.DeleteAsync(id, cancellationToken);

    return outcome switch
    {
        DeleteOutcome.Deleted =&gt; NoContent(),

        DeleteOutcome.NotFound =&gt; NotFound(),

        DeleteOutcome.HasReadingEntries =&gt; Conflict(new ProblemDetails
        {
            Title = "The book has reading entries.",
            Detail = "Delete the reading entries first, or move them to another book."
        }),

        _ =&gt; throw new InvalidOperationException(
            "Unhandled delete outcome: " + outcome)
    };
}</code></pre><div class="code-expl">The compiler forces a branch per enum member. Adding a future outcome — say <code>Archived</code> — produces a warning until you translate it. That is the enforcement advantage of outcomes over exceptions.</div></div>`
      },
      {
        type: "h2",
        html: "The race behind the friendly check"
      },
      {
        type: "p",
        html: `The <code>HasReadingEntries</code> check is a courtesy: it turns the common case into a clean 409 without an exception. But two requests can interleave — request A checks "no entries" while request B inserts an entry, and then A deletes the book. The service check loses. <strong>The foreign key constraint configured to restrict deletes is what actually protects the invariant</strong> (Lesson 3). When it fires, EF Core throws <code>DbUpdateException</code>, and Lesson 6 shows where to translate that centrally.`
      },
      {
        type: "h2",
        html: "Explicit outcomes vs exceptions — the trade"
      },
      {
        type: "html",
        html: `<div class="table-wrapper"><table><thead><tr><th>Criterion</th><th>Returned outcome</th><th>Exception</th></tr></thead><tbody><tr><td>Visibility</td><td>In the method signature — read it to know all outcomes</td><td>Invisible; discoverable only by reading the body or docs</td></tr><tr><td>Compiler enforcement</td><td><code>switch</code> exhaustiveness catches unhandled cases</td><td>Forgotten cases silently propagate (or crash)</td></tr><tr><td>Controller code</td><td>A <code>switch</code> expression per action</td><td>No try/catch per action when a middleware maps centrally</td></tr><tr><td>Producing site</td><td>Callers see the value and must branch</td><td>Any deep frame can throw; stack-based, harder to trace</td></tr><tr><td>Best for</td><td>Expected domain outcomes: not found, conflict, blocked</td><td>Truly exceptional: database unreachable, invariant bugs, unrecognized state</td></tr></tbody></table></div>`
      },
      {
        type: "callout",
        kind: "success",
        title: "✅ The rule this module adopts",
        html: `Expected failures are <strong>values</strong> — return them. Truly exceptional conditions are <strong>exceptions</strong> — let them bubble to the centralized handler (Lesson 6). Never throw to signal "not found" in a normal flow, and never swallow an exception to return a tidy result.`
      },
      {
        type: "callout",
        kind: "warning",
        title: "⚠️ Never convert surprises into silent outcomes",
        html: `Wrapping every exception into a success-or-failure result hides real bugs and destroys stack traces. If a failure is not a named member of your outcome enum, it is not an expected failure — let it throw.`
      },
      {
        type: "h2",
        html: "Drill: predict the status"
      },
      {
        type: "p",
        html: "For each request to Raff's books API, decide the status before revealing the answer:"
      },
      {
        type: "html",
        html: `<details class="hint-details solution-details"><summary>Show answers</summary><div class="hint-body"><ul>
<li><code>POST</code> with <code>{"title": "", "publishedYear": 1990}</code> → <strong>400</strong> — empty title fails <code>[Required]</code> at the validation gate.</li>
<li><code>POST</code> with a body of <code>{"title":</code> (truncated) → <strong>400</strong> — binding gate: the JSON parser never produced a DTO.</li>
<li><code>GET /api/books/9999</code> where 9999 does not exist → <strong>404</strong> — action maps the service's NotFound outcome.</li>
<li><code>DELETE /api/books/42</code> where entries reference the book → <strong>409</strong> — state conflict, not a malformed request.</li>
<li><code>DELETE /api/books/42</code> that succeeds → <strong>204</strong> — no body; the resource is gone.</li>
<li><code>POST /api/books</code> while the database is unreachable → <strong>500</strong> — exceptional; the client gets a generic problem-details body and a traceId, the log gets the stack trace.</li>
</ul></div></details>`
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
        html: `<div class="refs-block"><div class="refs-title">Official references</div><ul><li><a href="https://learn.microsoft.com/aspnet/core/fundamentals/error-handling-api" target="_blank" rel="noopener noreferrer">Handle errors in ASP.NET Core web APIs ↗</a></li><li><a href="https://www.rfc-editor.org/rfc/rfc9457" target="_blank" rel="noopener noreferrer">RFC 9457 — Problem Details for HTTP APIs ↗</a></li></ul></div>`
      },
      {
        type: "html",
        html: `<div class="lesson-footer-nav"><button class="btn-secondary" type="button" data-nav-target="lesson-4">← PATCH done right</button>
<button class="btn-complete-lesson" type="button" data-lesson="lesson-5">Mark Lesson 5 Complete ✓</button>
<button class="btn-primary" type="button" data-nav-target="lesson-6">Next: Centralized errors →</button></div>`
      }
    ]
  },
  {
    id: "lesson-6",
    badge: "L6",
    nav: "Centralized errors",
    content: [
      {
        type: "html",
        html: `<span class="lesson-pill">L6 · Lesson</span><h1 class="lesson-h1">ProblemDetails: One Error Shape for the Whole API</h1><p class="lesson-lead">AddProblemDetails, UseExceptionHandler, custom IExceptionHandler — and the disclosure boundary.</p><div class="lesson-meta-bar"><span>⏱️ ~30 min</span><span>🧠 4 knowledge checks</span><span>🛠️ Error explorer</span></div>`
      },
      {
        type: "h2",
        html: "One shape, parsed once"
      },
      {
        type: "p",
        html: `Clients should write error-handling code once. That requires every error — validation failures, domain conflicts, unhandled exceptions — to arrive in the same shape. ASP.NET Core's answer is <strong>ProblemDetails</strong>, standardized in RFC 9457: a small JSON vocabulary of <code>type</code>, <code>title</code>, <code>status</code>, <code>detail</code>, <code>instance</code>, plus extension members like <code>traceId</code> and validation <code>errors</code>.`
      },
      {
        type: "html",
        html: `<div class="table-wrapper"><table><thead><tr><th>Member</th><th>Meaning</th><th>Example from Raff</th></tr></thead><tbody><tr><td><code>type</code></td><td>Stable URI identifying the problem <em>class</em></td><td><code>https://tools.ietf.org/html/rfc9110#section-15.5.1</code> for validation</td></tr><tr><td><code>title</code></td><td>Short, human-readable summary</td><td>"One or more validation errors occurred."</td></tr><tr><td><code>status</code></td><td>The HTTP status code</td><td><code>400</code></td></tr><tr><td><code>detail</code></td><td>Specific explanation for <em>this</em> occurrence</td><td>Usually empty for validation; the <code>errors</code> dictionary carries the specifics</td></tr><tr><td><code>instance</code></td><td>Path of this occurrence</td><td><code>/api/books</code> — often omitted by default; add it if clients group by endpoint</td></tr><tr><td><code>traceId</code> (extension)</td><td>Correlation id linking response to server logs</td><td><code>00-a1b2c3…-00</code> — added automatically</td></tr><tr><td><code>errors</code> (extension)</td><td>Field-keyed validation messages</td><td><code>{"Title": ["The Title field is required."]}</code></td></tr></tbody></table></div>`
      },
      {
        type: "h2",
        html: "Raff's baseline: three lines in Program.cs"
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">Program.cs</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-complete">Complete</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddProblemDetails(); // standard problem-details objects for errors

var app = builder.Build();

app.UseExceptionHandler();   // unhandled exceptions → ProblemDetails responses
app.UseStatusCodePages();    // bare 4xx/5xx statuses → ProblemDetails responses

app.MapControllers();

app.Run();</code></pre><div class="code-expl">With <code>AddProblemDetails</code> registered, the parameterless <code>UseExceptionHandler()</code> uses the problem-details service. This pairing is the modern baseline on .NET 8+ — verified on .NET 10, where an unhandled exception in Production produced the captured payload below.</div></div>`
      },
      {
        type: "p",
        html: `An unhandled exception in Production, captured from a minimal .NET 10 API configured exactly like this:`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">500 — unhandled exception (Production)</span><span class="code-badge-group"><span class="code-lang-tag">json</span><span class="code-type-pill pill-illustrative">Illustrative</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-json">{
  "type": "https://tools.ietf.org/html/rfc9110#section-15.6.1",
  "title": "An error occurred while processing your request.",
  "status": 500,
  "traceId": "00-…-…-00"
}</code></pre><div class="code-expl">No <code>detail</code>, no stack trace, no exception message — by design. The client gets a correlation id; the server log gets the details.</div></div>`
      },
      {
        type: "callout",
        kind: "info",
        title: "ℹ️ Development shows more — and must stay in Development",
        html: `In the Development environment, the developer exception page returns the full stack trace and exception text. That is a debugging aid, not an API contract. The environment switch is the protection: ensure Production never enables developer exception pages, and treat any environment-specific error detail as a configuration risk to audit.`
      },
      {
        type: "h2",
        html: "Custom exception handlers for domain exceptions"
      },
      {
        type: "p",
        html: `Some failures are exceptional to the code but predictable to the domain — for example a unique-index violation translated to a conflict. <code>IExceptionHandler</code> (registered in DI, run by <code>UseExceptionHandler</code>) lets you map such exception types once, centrally:`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">Infrastructure/DomainConflictExceptionHandler.cs</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-complete">Complete</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">public sealed class DomainConflictExceptionHandler : IExceptionHandler
{
    private readonly ILogger&lt;DomainConflictExceptionHandler&gt; _logger;

    public DomainConflictExceptionHandler(
        ILogger&lt;DomainConflictExceptionHandler&gt; logger)
    {
        _logger = logger;
    }

    public async ValueTask&lt;bool&gt; TryHandleAsync(
        HttpContext httpContext,
        Exception exception,
        CancellationToken cancellationToken)
    {
        var mapper = httpContext.RequestServices
            .GetRequiredService&lt;IExceptionProblemMapper&gt;();

        if (!mapper.TryMap(exception, out var problem))
        {
            return false; // not mine — let the framework produce the default 500
        }

        _logger.LogWarning(exception, "Mapped exception on {Path}",
            httpContext.Request.Path);

        httpContext.Response.StatusCode = problem.Status ?? 500;
        await httpContext.Response.WriteAsJsonAsync(
            problem, cancellationToken);

        return true; // handled — stop the pipeline here
    }
}</code></pre><div class="code-expl">Registered with <code>builder.Services.AddExceptionHandler&lt;DomainConflictExceptionHandler&gt;();</code>. Handlers run in registration order; the first that returns <code>true</code> wins. Returning <code>false</code> passes the exception to the next handler, and ultimately to the default 500.</div></div>`
      },
      {
        type: "p",
        html: `A concrete mapper inside that service translates EF Core's provider-specific failure — PostgreSQL unique violation, SQLSTATE <code>23505</code> — into a 409:`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">Mapper excerpt</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-fragment">Fragment</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">if (exception is DbUpdateException
    &amp;&amp; exception.InnerException is PostgresException { SqlState: "23505" })
{
    problem = new ProblemDetails
    {
        Type = "https://raff.example/problems/duplicate",
        Title = "The resource already exists.",
        Status = StatusCodes.Status409Conflict,
        Detail = "A reading entry for this book already exists for this user."
    };
    return true;
}</code></pre><div class="code-expl">Illustrative mapping code — the exact types and messages depend on your service structure and Npgsql version. The invariant: provider details (SQLSTATE, constraint names) are translation inputs, never client-facing output.</div></div>`
      },
      {
        type: "h2",
        html: "Unifying validation errors"
      },
      {
        type: "p",
        html: `The automatic validation 400 is already a <code>ValidationProblemDetails</code>. When Raff needs to change that shape — adding a stable <code>type</code> URI, an <code>instance</code>, or extra fields — the hook is <code>ApiBehaviorOptions.InvalidModelStateResponseFactory</code>:`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">Program.cs — customized validation response</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-fragment">Fragment</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">builder.Services.Configure&lt;ApiBehaviorOptions&gt;(options =&gt;
{
    options.InvalidModelStateResponseFactory = context =&gt;
    {
        var problem = new ValidationProblemDetails(context.ModelState)
        {
            Type = "https://raff.example/problems/validation",
            Title = "One or more validation errors occurred.",
            Status = StatusCodes.Status400BadRequest,
            Instance = context.HttpContext.Request.Path
        };

        return new BadRequestObjectResult(problem)
        {
            ContentTypes = { "application/problem+json" }
        };
    };
});</code></pre><div class="code-expl">The factory receives the same <code>ModelState</code> the automatic path uses, so switching to it does not change which errors appear — only their envelope. <code>traceId</code> continues to be attached automatically.</div></div>`
      },
      {
        type: "h2",
        html: "What to disclose, what to hide"
      },
      {
        type: "html",
        html: `<div class="table-wrapper"><table><thead><tr><th>Always share</th><th>Never share</th><th>Where the hidden half goes</th></tr></thead><tbody><tr><td>HTTP status code</td><td>Stack traces</td><td>Server logs, keyed by <code>traceId</code></td></tr><tr><td>Stable <code>type</code> URI and <code>title</code></td><td>SQL text, table or constraint names</td><td>Exception message in the log entry</td></tr><tr><td>Safe, specific <code>detail</code> (what rule failed)</td><td>Connection strings, credentials</td><td>Nowhere — never logged in plaintext either</td></tr><tr><td>Validation <code>errors</code> dictionary</td><td>Internal type names, PII of other users</td><td>—</td></tr><tr><td><code>traceId</code> for support correlation</td><td>Environment internals (paths, versions)</td><td>Deployment metadata</td></tr></tbody></table></div>`
      },
      {
        type: "callout",
        kind: "danger",
        title: "🚫 The production 500 must stay boring",
        html: `The captured 500 payload contains three fields: type, title, status — plus traceId. Resist the urge to "help" clients with exception messages in production; they map internal structure for attackers. Debuggability comes from the traceId-to-log path, not from the response body.`
      },
      {
        type: "h2",
        html: "Error explorer"
      },
      {
        type: "p",
        html: `Six requests against Raff's configured API. Predict the status and shape for each, then run them in the explorer.`
      },
      {
        type: "html",
        html: `<div class="simulator-widget" data-widget="errors" id="w-errors"><div class="simulator-header"><div class="simulator-title">🧭 Error explorer</div><div class="m4-mode-note" style="margin-top:0;">Six requests against Raff's hardened API. Predict, then reveal.</div></div><div class="simulator-body"></div></div>`
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
        html: `<div class="refs-block"><div class="refs-title">Official references</div><ul><li><a href="https://learn.microsoft.com/aspnet/core/fundamentals/error-handling" target="_blank" rel="noopener noreferrer">Handle errors in ASP.NET Core ↗</a></li><li><a href="https://learn.microsoft.com/aspnet/core/fundamentals/error-handling-api" target="_blank" rel="noopener noreferrer">Handle errors in ASP.NET Core web APIs ↗</a></li><li><a href="https://www.rfc-editor.org/rfc/rfc9457" target="_blank" rel="noopener noreferrer">RFC 9457 — Problem Details for HTTP APIs ↗</a></li></ul></div>`
      },
      {
        type: "html",
        html: `<div class="lesson-footer-nav"><button class="btn-secondary" type="button" data-nav-target="lesson-5">← Result vs exception</button>
<button class="btn-complete-lesson" type="button" data-lesson="lesson-6">Mark Lesson 6 Complete ✓</button>
<button class="btn-primary" type="button" data-nav-target="lesson-7">Next: Integration tests →</button></div>`
      }
    ]
  },
  {
    id: "lesson-7",
    badge: "L7",
    nav: "Integration tests",
    content: [
      {
        type: "html",
        html: `<span class="lesson-pill">L7 · Lesson</span><h1 class="lesson-h1">Testing the Contract with WebApplicationFactory</h1><p class="lesson-lead">The behavior you built lives in the pipeline — so test the pipeline, not the pieces.</p><div class="lesson-meta-bar"><span>⏱️ ~25 min</span><span>🧠 3 knowledge checks</span></div>`
      },
      {
        type: "h2",
        html: "Test the pipeline, not the pieces"
      },
      {
        type: "p",
        html: `Everything this module built — binding failures, validation 400s, PATCH presence semantics, problem-details shapes — is <strong>pipeline behavior</strong>. A unit test on the DTO class validates attributes in isolation; a unit test on the controller calls the action directly and skips binding, <code>[ApiController]</code>, and serialization. The only way to test what clients actually experience is to run the real application and speak HTTP to it.`
      },
      {
        type: "p",
        html: `ASP.NET Core provides that capability through <code>WebApplicationFactory&lt;TEntryPoint&gt;</code>: it boots your app in memory — real middleware, real routing, real model binding — and hands you an <code>HttpClient</code> whose requests never touch a network socket.`
      },
      {
        type: "h2",
        html: "Making the app testable"
      },
      {
        type: "p",
        html: `When the API uses top-level statements, the generated <code>Program</code> class is internal. Expose it for the test assembly with a single partial declaration:`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">Program.cs — end of file</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-complete">Complete</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">// Enables WebApplicationFactory&lt;Program&gt; in the test project.
public partial class Program { }</code></pre><div class="code-expl">One line, no behavior. Without it, the test project cannot name the entry-point type and the factory will not compile.</div></div>`
      },
      {
        type: "h2",
        html: "A test fixture over the real API"
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">Tests/CreateBookValidationTests.cs</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-complete">Complete</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">using System.Net;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Testing;

public class CreateBookValidationTests
    : IClassFixture&lt;WebApplicationFactory&lt;Program&gt;&gt;
{
    private readonly HttpClient _client;

    public CreateBookValidationTests(WebApplicationFactory&lt;Program&gt; factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task CreateBook_WithEmptyTitle_Returns400WithRequiredError()
    {
        var response = await _client.PostAsJsonAsync("/api/books", new
        {
            Title = "",
            PublishedYear = 1990
        });

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);

        var problem = await response.Content
            .ReadFromJsonAsync&lt;ValidationProblemDetails&gt;();

        Assert.NotNull(problem);
        Assert.Contains("Title", problem!.Errors.Keys,
            StringComparer.OrdinalIgnoreCase);
        Assert.Contains(problem.Errors.Values.SelectMany(v =&gt; v),
            message =&gt; message.Contains("required",
                StringComparison.OrdinalIgnoreCase));
    }
}</code></pre><div class="code-expl"><code>IClassFixture</code> boots the app once per test class and shares the client. Error keys come back PascalCase (<code>Title</code>) because they mirror the C# property name — assert case-insensitively so a naming-policy tweak does not break a correct test.</div></div>`
      },
      {
        type: "p",
        html: `The same fixture pattern scales to the whole module's contract. Three tests that encode the subtle semantics — note how they mirror the published behavior, including the whitespace nuance captured in Lesson 2:`
      },
      {
        type: "html",
        html: `<div class="code-wrapper"><div class="code-header"><span class="code-filename">Tests — presence, malformed bodies, and the whitespace rule</span><span class="code-badge-group"><span class="code-lang-tag">cs</span><span class="code-type-pill pill-complete">Complete</span><button class="btn-copy" type="button" aria-label="Copy code">Copy</button></span></div><pre><code class="language-cs">[Theory]
[InlineData("")]
[InlineData("   ")]
public async Task CreateBook_WithBlankTitle_FailsRequired(string title)
{
    var response = await _client.PostAsJsonAsync("/api/books", new
    {
        Title = title,
        PublishedYear = 1990
    });

    Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
}

[Fact]
public async Task CreateBook_WithMalformedJson_Returns400()
{
    var content = new StringContent(
        "{\\"title\\":", System.Text.Encoding.UTF8, "application/json");

    var response = await _client.PostAsync("/api/books", content);

    Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
}

[Fact]
public async Task PatchBook_WithEmptyObject_LeavesSummaryUnchanged()
{
    // Explicit null / omission semantics are the contract — test them via HTTP,
    // not by constructing DTOs in memory.
    var response = await _client.PatchAsJsonAsync(
        "/api/books/1", new { });

    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
}

[Fact]
public async Task PatchBook_WithExplicitNullSummary_ClearsIt()
{
    var response = await _client.PatchAsJsonAsync(
        "/api/books/1", new { Summary = (string?)null });

    Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
}</code></pre><div class="code-expl">Both PATCH tests pass only if the presence-tracking implementation is correct: an empty object must skip every branch, while an explicit null must be distinguishable from absence. A bare nullable DTO would fail the pair — which is exactly why the contract is worth testing at this level.</div></div>`
      },
      {
        type: "h2",
        html: "Databases in integration tests"
      },
      {
        type: "list",
        ordered: false,
        items: [
          `<strong>Point the factory at a test database.</strong> Override configuration per environment (for example with <code>WithWebHostBuilder</code> and a test connection string) so tests run against disposable PostgreSQL data, never a development database.`,
          `<strong>Use the real provider for constraint tests.</strong> EF Core's in-memory provider does not enforce unique indexes or foreign keys — tests of Raff's duplicate guard or delete restriction would pass against InMemory while failing in production. Run those against real PostgreSQL (a local instance or Testcontainers).`,
          `<strong>Seeding beats manual setup.</strong> Insert the rows each test depends on through the same DbContext the app uses, then exercise HTTP for the behavior under test.`,
          `<strong>Assert status first, shape second, text last.</strong> Status codes and problem-details members are stable contract. Exact message strings are not: assert case-insensitively, or on a substring of the rule, so framework message improvements do not read as regressions.`
        ]
      },
      {
        type: "callout",
        kind: "warning",
        title: "⚠️ Never assert entire JSON bodies",
        html: `Full-body equality couples your tests to <code>traceId</code> randomness, field ordering, and framework message templates. Assert the specific members the contract promises: status, <code>type</code>, the <code>errors</code> keys, and a stable fragment of each message.`
      },
      {
        type: "callout",
        kind: "success",
        title: "✅ The regression net for Modules 1–3",
        html: `These tests double as living documentation: they are the executable form of Lessons 1–6. When a future refactor changes how binding reports a malformed number, or how PATCH treats null, the suite fails loudly before a client does.`
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
        html: `<div class="refs-block"><div class="refs-title">Official references</div><ul><li><a href="https://learn.microsoft.com/aspnet/core/test/integration-tests" target="_blank" rel="noopener noreferrer">Integration tests in ASP.NET Core ↗</a></li><li><a href="https://learn.microsoft.com/ef/core/testing/" target="_blank" rel="noopener noreferrer">EF Core — Testing with the in-memory provider (and its limits) ↗</a></li></ul></div>`
      },
      {
        type: "html",
        html: `<div class="lesson-footer-nav"><button class="btn-secondary" type="button" data-nav-target="lesson-6">← Centralized errors</button>
<button class="btn-complete-lesson" type="button" data-lesson="lesson-7">Mark Lesson 7 Complete ✓</button>
<button class="btn-primary" type="button" data-nav-target="capstone">Next: Capstone project →</button></div>`
      }
    ]
  },
  {
    id: "capstone",
    badge: "🏁",
    nav: "Capstone project",
    content: [
      {
        type: "html",
        html: `<span class="lesson-pill">🏁 Capstone project</span><h1 class="lesson-h1">Capstone — Make Raff's API Predictable</h1><p class="lesson-lead">Four stages that turn this module's rules into Raff's actual behavior — audit, patch, delete, harden, prove it.</p><div class="lesson-meta-bar"><span>⏱️ ~60–90 min</span><span>🛠️ Real code in Raff</span><span>✅ Acceptance checklist</span></div>`
      },
      {
        type: "p",
        html: `You have the tools; now apply them in order. Each stage produces a concrete artifact in Raff and is verifiable by sending requests. Work the stages in sequence — stage 3 depends on the presence semantics proven in stage 2, and stage 4 only makes sense once the behaviors exist.`
      },
      {
        type: "html",
        html: `<div class="diagram-container">
  <div class="diagram-title">Capstone stages</div>
  <div class="m4-stages">
    <div class="m4-stage"><div class="m4-stage-name">1 · Audit the create path</div><div class="m4-stage-desc">Lock down CreateBookDto and verify every 400 case against the running API</div></div>
    <div class="m4-stage"><div class="m4-stage-name">2 · PATCH reading entries</div><div class="m4-stage-desc">Optional&lt;T&gt; DTO, converter registration, and the omitted/null/value matrix</div></div>
    <div class="m4-stage"><div class="m4-stage-name">3 · Battle-test the delete flow</div><div class="m4-stage-desc">Outcome enum, 409 for dependent data, FK backstop translated centrally</div></div>
    <div class="m4-stage"><div class="m4-stage-name">4 · Harden errors + prove it</div><div class="m4-stage-desc">ProblemDetails baseline in Program.cs and the integration tests that pin the contract</div></div>
  </div>
</div>`
      },
      {
        type: "h3",
        html: "Stage 1 — Audit the create path"
      },
      {
        type: "p",
        html: "Deliverables:"
      },
      {
        type: "list",
        ordered: false,
        items: [
          `<code>CreateBookDto</code>: <code>[Required]</code> + <code>[MaxLength(200)]</code> on title; <code>[Range(1, 9999)]</code> on published year; <code>[MaxLength(5000)]</code> on summary; <code>[RegularExpression("^https://.+")]</code> on the optional cover URL.`,
          `A request log (spreadsheet, note file, anything) with the actual status + error keys your API returns for: missing title, empty title, whitespace-only title, year 30000, year "1965" as a string, malformed body.`,
          "Every 400 carries at most one message per invalid field."
        ]
      },
      {
        type: "html",
        html: `<details class="hint-details"><summary>Hint — instrument the audit quickly</summary><div class="hint-body"><p>An HTTP scratch file or a handful of <code>curl</code> calls is enough. Record the status <em>and</em> the <code>errors</code> keys — the keys tell you which gate rejected the request (property names → validation; <code>$.</code> paths → binding).</p></div></details>`
      },
      {
        type: "h2",
        html: "Stage 2 — PATCH reading entries"
      },
      {
        type: "p",
        html: "Deliverables:"
      },
      {
        type: "list",
        ordered: false,
        items: [
          `<code>Optional&lt;T&gt;</code> + converter factory (the verified code from Lesson 4), registered in <code>AddControllers().AddJsonOptions(...)</code>.`,
          `<code>PatchReadingEntryDto</code> with <code>Optional&lt;int&gt; ProgressPercent</code> and <code>Optional&lt;string?&gt; Note</code>.`,
          `Action: <code>404</code> for unknown id; <code>400</code> when a provided progress is outside 0–100; explicit null clears the note; omitted fields are untouched; success is <code>204</code>.`,
          `The three-request matrix executed by hand: <code>{}</code>, <code>{"note": null}</code>, <code>{"note": "chapter 5"}</code> — each verified against the stored row.`
        ]
      },
      {
        type: "html",
        html: `<details class="hint-details"><summary>Hint — keep validation honest</summary><div class="hint-body"><p>Attributes cannot see through <code>Optional&lt;T&gt;</code>. Keep the range and length checks small and local: check <code>IsSet</code>, then the unwrapped value, then return <code>ValidationProblem</code> with the property keyed lowercase to match your JSON naming. One place, one pattern.</p></div></details>`
      },
      {
        type: "h2",
        html: "Stage 3 — Battle-test the delete flow"
      },
      {
        type: "p",
        html: "Deliverables:"
      },
      {
        type: "list",
        ordered: false,
        items: [
          `<code>DeleteOutcome</code> enum + service method returning <code>Deleted</code>, <code>NotFound</code>, or <code>HasReadingEntries</code>.`,
          `Controller <code>switch</code> mapping outcomes to <code>204</code>, <code>404</code>, <code>409</code> — with an exhaustive default that throws.`,
          `The FK from reading entries to books configured to <strong>restrict</strong> deletes, so the database enforces the invariant the service checks.`,
          `The race path translated: <code>DbUpdateException</code> whose inner <code>PostgresException</code> has SQLSTATE <code>23503</code> (FK violation) or <code>23505</code> (unique violation) becomes a <code>409</code> — via the central handler, not scattered try/catch.`
        ]
      },
      {
        type: "html",
        html: `<details class="hint-details"><summary>Hint — prove the backstop exists</summary><div class="hint-body"><p>After wiring the restrict rule, temporarily bypass the service's <code>HasReadingEntries</code> check (or insert a dependent row from a second connection after the check) and confirm the delete fails with the FK error instead of orphaning rows. The point of the drill is witnessing the database win the race the service check loses.</p></div></details>`
      },
      {
        type: "h2",
        html: "Stage 4 — Harden errors and prove it"
      },
      {
        type: "p",
        html: "Deliverables:"
      },
      {
        type: "list",
        ordered: false,
        items: [
          `<code>AddProblemDetails()</code> + <code>UseExceptionHandler()</code> + <code>UseStatusCodePages()</code> in <code>Program.cs</code>.`,
          `<code>public partial class Program { }</code> and a test project with the fixture pattern from Lesson 7.`,
          `Tests covering: empty title → 400 with a <code>Title</code> error; malformed body → 400; PATCH empty object leaves a note unchanged; PATCH explicit null clears a note; delete with entries → 409; unknown book → 404 with problem-details members; the 500 path checked manually in Production configuration (generic body, <code>traceId</code> present, no detail).`,
          "<code>dotnet test</code> green."
        ]
      },
      {
        type: "html",
        html: `<details class="hint-details"><summary>Hint — the test list is the acceptance checklist</summary><div class="hint-body"><p>Write the test names first as a checklist, then implement. Every red test after that is precisely one missing behavior — which is a far better debugging loop than clicking through a REST client.</p></div></details>`
      },
      {
        type: "h2",
        html: "Acceptance checklist"
      },
      {
        type: "list",
        ordered: false,
        items: [
          `Every request in the module's status map returns the documented status — verified by execution, not intuition.`,
          `All error responses parse as problem details with <code>type</code>, <code>title</code>, <code>status</code>, and <code>traceId</code>; validation errors additionally carry the <code>errors</code> dictionary.`,
          `PATCH never loses data: omitted fields preserve stored values, explicit null clears, values assign — all three demonstrated.`,
          "No internal detail (stack traces, SQL, provider messages) appears in any Production-shaped response.",
          `The integration suite is green and includes at least one test per row of the status map you implemented.`
        ]
      },
      {
        type: "callout",
        kind: "success",
        title: "✅ You have completed Module 4",
        html: `Raff's API now fails predictably: the right status, one error shape, no lost data, no leaked internals — and a test suite that keeps it that way. The next module builds on this contract as the foundation for authentication and authorization.`
      },
      {
        type: "html",
        html: `<div class="refs-block"><div class="refs-title">Official references</div><ul><li><a href="https://learn.microsoft.com/aspnet/core/test/integration-tests" target="_blank" rel="noopener noreferrer">Integration tests in ASP.NET Core ↗</a></li><li><a href="https://learn.microsoft.com/aspnet/core/fundamentals/error-handling-api" target="_blank" rel="noopener noreferrer">Handle errors in ASP.NET Core web APIs ↗</a></li></ul></div>`
      },
      {
        type: "html",
        html: `<div class="lesson-footer-nav"><button class="btn-secondary" type="button" data-nav-target="lesson-7">← Integration tests</button>
<button class="btn-complete-lesson" type="button" data-lesson="capstone">Mark Capstone Complete ✓</button>
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
        html: `<span class="lesson-pill">🎓 Final assessment</span>
<h1 class="lesson-h1">Module assessment</h1>
<p class="lesson-lead">Fourteen questions across the whole module. The pass threshold is 80% — and a pass means the contract is understood, not that every question was easy. Each question maps to a lesson; the results view links back to any topic that needs another pass.</p>
<div class="lesson-meta-bar"><span>🧠 14 questions</span><span>🎯 Pass ≥ 80%</span><span>📊 Topic breakdown + lesson links</span></div>`
      },
      {
        type: "html",
        html: `<div class="assessment-intro" id="assessment-intro">
  <div class="content-panel">
    <h3 style="margin-top:0;">📋 Before you begin</h3>
    <ul>
      <li>Questions cover Lessons 1–7 and the capstone. You can retake the assessment as many times as you like — your best score is what counts for progress.</li>
      <li>The pass threshold defaults to 80% and can be set to 70% / 80% / 90% before you start.</li>
      <li>The review after submission links every missed question back to the lesson section that owns it.</li>
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
  <button class="btn-secondary" type="button" data-nav-target="capstone">← Capstone project</button>
  <button class="btn-secondary" type="button" data-nav-target="lesson-1">Back to top ↑</button>
</div>`
      }
    ]
  }
];
