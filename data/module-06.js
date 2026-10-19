/* ============================================================
   Raff Backend Academy — Module 6 — Authentication and
   Authorization in ASP.NET Core
   Data: glossary, knowledge checks, lesson meta, assessment,
   widget datasets, and lesson content blocks.
   Loaded before the shared components and the page script.

   Teaching contract:
   - Alice owns Book A (#42); Bob owns Book B (#77).
   - Claims in examples are illustrative. Real claim names and
     mappings depend on the configured authentication handler and
     token issuer. Raff's current user model is not assumed to be
     ASP.NET Core Identity.
   ============================================================ */

const STORAGE_KEY = "raff_aspnet_module_06_state";
const APP_MARKER = "raff-aspnet-module-06";

/* ---------------- glossary ---------------- */

const GLOSSARY = [
  {
    t: "Authentication",
    c: "Fundamentals",
    l: "lesson-1",
    d: "The process of establishing whether a request carries a valid identity under the configured authentication scheme. It answers “who is making this request, if anyone?” — not “what may they do?”."
  },
  {
    t: "Authorization",
    c: "Fundamentals",
    l: "lesson-1",
    d: "The process of deciding whether an authenticated identity — and sometimes a specific resource — satisfies the access rules required by an endpoint or operation."
  },
  {
    t: "Authentication scheme",
    c: "Fundamentals",
    l: "lesson-1",
    d: "A named authentication configuration and handler registered in the application, such as a JWT bearer scheme or a cookie scheme. The scheme defines how credentials are read, validated, and turned into a principal."
  },
  {
    t: "Credential",
    c: "Fundamentals",
    l: "lesson-3",
    d: "Evidence presented to prove an identity, such as a password, a cookie, or a bearer token. A credential is only meaningful to the component configured to validate it."
  },
  {
    t: "Challenge",
    c: "Fundamentals",
    l: "lesson-1",
    d: "The authentication scheme's response when a request needs a valid identity but does not have one. For a bearer-token API this commonly becomes a 401 response with a challenge header, but the exact result depends on the scheme and application."
  },
  {
    t: "Forbid",
    c: "Fundamentals",
    l: "lesson-1",
    d: "The authorization result when an authenticated identity is present but does not satisfy the endpoint's requirements. It commonly becomes 403 Forbidden, although an application may choose a different contract."
  },
  {
    t: "ASP.NET Core Identity",
    c: "Identity",
    l: "lesson-2",
    d: "A framework for user management and authentication-related services: users, password hashing, sign-in, roles, claims, and a configurable user store. It is not a JWT, a database table, or an authorization policy by itself."
  },
  {
    t: "IdentityUser",
    c: "Identity",
    l: "lesson-2",
    d: "The default user entity supplied by ASP.NET Core Identity. Applications can use it as-is or derive an application-specific type from it to add fields."
  },
  {
    t: "UserManager<TUser>",
    c: "Identity",
    l: "lesson-2",
    d: "The Identity service responsible for user-management operations: creating users, validating and updating them, managing passwords through the configured hasher, and persisting through the user store."
  },
  {
    t: "SignInManager<TUser>",
    c: "Identity",
    l: "lesson-2",
    d: "The Identity service that coordinates sign-in checks such as password verification and account status, then asks the configured authentication scheme to establish the sign-in."
  },
  {
    t: "User store",
    c: "Identity",
    l: "lesson-2",
    d: "The persistence abstraction Identity uses to load and save users, roles, and related data. An EF Core-backed store is common, but Identity itself is a set of services and contracts, not a particular table design."
  },
  {
    t: "Password hashing",
    c: "Identity",
    l: "lesson-2",
    d: "A one-way, deliberately expensive transformation used to store password verifiers instead of plaintext passwords. ASP.NET Core Identity provides the hashing and verification implementation; applications should not invent their own."
  },
  {
    t: "ClaimsPrincipal",
    c: "Claims",
    l: "lesson-5",
    d: "The .NET representation of an identity-bearing caller. HttpContext.User is a ClaimsPrincipal and can contain one or more ClaimsIdentity instances, each holding claims."
  },
  {
    t: "ClaimsIdentity",
    c: "Claims",
    l: "lesson-5",
    d: "A collection of claims plus an authentication type and authentication state. A principal can combine identities from different sources; authorization examines the claims and identities that actually exist."
  },
  {
    t: "Claim",
    c: "Claims",
    l: "lesson-5",
    d: "A statement about a subject, stored as a claim type and a value — for example sub=alice-123 or role=Reader. A claim is only trustworthy after the identity that carries it has been authenticated by a trusted component."
  },
  {
    t: "Claim type",
    c: "Claims",
    l: "lesson-5",
    d: "The name that identifies what a claim describes. Claim types are not universal across issuers and handlers; mapping configuration can change the type string your code observes."
  },
  {
    t: "Issuer",
    c: "Tokens",
    l: "lesson-4",
    d: "The authority that created and signed a token. An API validates the issuer to reject tokens minted by an authority it does not trust, even if the signature happens to be valid."
  },
  {
    t: "Audience",
    c: "Tokens",
    l: "lesson-4",
    d: "The intended recipient or resource of a token. An API validates the audience so a token issued for another API cannot be replayed against this one."
  },
  {
    t: "Bearer token",
    c: "Tokens",
    l: "lesson-3",
    d: "A credential that grants access to whoever presents it. Possession is the security boundary, so bearer tokens must be protected in transit and storage and must not be logged or shared."
  },
  {
    t: "JWT",
    c: "Tokens",
    l: "lesson-3",
    d: "JSON Web Token: a compact token format with header, payload, and signature segments. A typical signed JWT is readable by anyone and integrity-protected only when the signature is actually validated."
  },
  {
    t: "Base64URL",
    c: "Tokens",
    l: "lesson-3",
    d: "A URL-safe encoding used for JWT segments. It is an encoding, not encryption: decoding a segment reveals its JSON content."
  },
  {
    t: "Signature validation",
    c: "Tokens",
    l: "lesson-4",
    d: "The cryptographic check that a token was signed by a key trusted by the validator and that its bytes were not altered. Without this check, decoded claims are just unverified data."
  },
  {
    t: "Token validation",
    c: "Tokens",
    l: "lesson-4",
    d: "The full acceptance decision for a token: format, signature, issuer, audience, lifetime, and any configured algorithm or key constraints. Decoding a token is not validation."
  },
  {
    t: "Access token",
    c: "Standards",
    l: "lesson-3",
    d: "A credential presented to a protected resource or API to obtain access. In OAuth-based systems its intended audience and permitted actions are defined by the authorization arrangement."
  },
  {
    t: "Refresh token",
    c: "Standards",
    l: "lesson-3",
    d: "A longer-lived credential used to obtain new access tokens without asking the user to sign in again. Refresh tokens are sensitive and require careful storage, rotation, and revocation design."
  },
  {
    t: "ID token",
    c: "Standards",
    l: "lesson-3",
    d: "An OpenID Connect token that conveys identity information about the end user to the client application. It is not the credential an API should accept as an access token."
  },
  {
    t: "OAuth 2.0",
    c: "Standards",
    l: "lesson-3",
    d: "An authorization framework for obtaining access tokens for protected resources. It is not a token format and its access tokens are not universally JWTs."
  },
  {
    t: "OpenID Connect",
    c: "Standards",
    l: "lesson-3",
    d: "An identity layer built on OAuth 2.0 that adds authentication and an ID token describing the signed-in user. It does not replace the API's own authorization rules."
  },
  {
    t: "Authentication handler",
    c: "Authorization",
    l: "lesson-1",
    d: "The component behind an authentication scheme. It reads credentials, validates them, and produces AuthenticateResult, successful or failed. JwtBearerHandler is the handler behind JWT bearer authentication."
  },
  {
    t: "Authorization policy",
    c: "Authorization",
    l: "lesson-5",
    d: "A named collection of authorization requirements applied together. An endpoint can reference a policy instead of encoding every rule inline."
  },
  {
    t: "Authorization requirement",
    c: "Authorization",
    l: "lesson-5",
    d: "A condition an authorization policy needs to satisfy. Requirements are data; handlers contain the logic that decides whether the current context succeeds for a requirement."
  },
  {
    t: "Authorization handler",
    c: "Authorization",
    l: "lesson-5",
    d: "Code that evaluates one or more authorization requirements against a principal, and optionally a resource, calling Succeed or Fail on the authorization context."
  },
  {
    t: "IAuthorizationService",
    c: "Resource security",
    l: "lesson-6",
    d: "The ASP.NET Core service used to evaluate authorization imperatively, including resource-based checks: AuthorizeAsync(principal, resource, policy or requirement)."
  },
  {
    t: "Resource-based authorization",
    c: "Resource security",
    l: "lesson-6",
    d: "Authorization that depends on a specific loaded resource and its relationship to the principal — for example, whether Alice owns Book 42. It complements endpoint authorization; it does not replace it."
  },
  {
    t: "IDOR",
    c: "Resource security",
    l: "lesson-6",
    d: "Insecure Direct Object Reference: an access-control failure where a client can reach an object by changing an identifier because the server never checks the caller's relationship to that object."
  },
  {
    t: "BOLA",
    c: "Resource security",
    l: "lesson-6",
    d: "Broken Object Level Authorization: authorization that authenticates the caller but fails to enforce access rules at the level of each individual object. It is a common API security failure."
  },
  {
    t: "Ownership check",
    c: "Resource security",
    l: "lesson-6",
    d: "A decision that compares the authenticated principal's stable identifier with the ownership recorded on the resource. The comparison must use trusted server-side identity and trusted stored ownership, never a client-supplied owner id."
  }
];

/* ---------------- knowledge checks ---------------- */

const KNOWLEDGE_CHECKS = [
  {
    id: "kc-1-1",
    group: "lesson-1",
    prompt: "Alice presents a valid token and calls `DELETE /api/books/42`. Book 42 belongs to Bob. What has authentication established, and what still remains unresolved?",
    options: [
      "Authentication proved that Alice may delete any book; nothing remains.",
      "Authentication established a valid identity for Alice; authorization still has to decide whether that identity may modify Book 42.",
      "Authentication failed because Alice is not Bob.",
      "Authorization happened first, so authentication is irrelevant."
    ],
    correct: 1,
    explain: "Authentication answers whether the request has a valid identity. It does not grant permission. Bob's ownership of Book 42 is a resource-level authorization fact that must be checked separately."
  },
  {
    id: "kc-1-2",
    group: "lesson-1",
    prompt: "Which statement best distinguishes authentication from authorization?",
    options: [
      "Authentication decides what a user may do; authorization decides who the user is.",
      "Authentication establishes an identity; authorization evaluates whether that identity satisfies access rules.",
      "Both terms describe the same middleware.",
      "Authorization is only for administrators."
    ],
    correct: 1,
    explain: "A valid identity can still lack permission. Authentication produces the principal; authorization evaluates requirements against it, and sometimes against a resource as well."
  },
  {
    id: "kc-1-3",
    group: "lesson-1",
    prompt: "A protected API endpoint receives a request with no credentials. Under a conventional bearer-token configuration, what is the most likely outcome?",
    options: [
      "403 Forbidden, because no identity was supplied",
      "401 Unauthorized, produced as an authentication challenge",
      "500 Internal Server Error",
      "The endpoint runs anonymously"
    ],
    correct: 1,
    explain: "When a protected endpoint requires authentication and no valid identity is available, the authentication scheme is challenged. For an API this commonly maps to 401, although the final response depends on scheme and application configuration."
  },
  {
    id: "kc-1-4",
    group: "lesson-1",
    prompt: "Why might an API return 404 rather than 403 when Alice requests a book that belongs to Bob?",
    options: [
      "Because 404 is always required by HTTP.",
      "To avoid confirming that the resource exists to a caller who is not allowed to see it.",
      "Because authentication failed.",
      "Because the database could not find Alice's account."
    ],
    correct: 1,
    explain: "Both status codes can be defensible. Returning 404 for a resource the caller may not see avoids disclosing its existence. The right choice belongs to the API contract and should be applied consistently."
  },
  {
    id: "kc-1-5",
    group: "lesson-1",
    prompt: "Which ordering best matches a conventional protected request in ASP.NET Core?",
    options: [
      "Authorization → routing → authentication → endpoint",
      "Authentication → routing → authorization → endpoint",
      "Routing/endpoint selection → authentication → authorization → endpoint execution",
      "Endpoint execution → authorization → authentication"
    ],
    correct: 2,
    explain: "With endpoint routing, the endpoint and its metadata are selected first. Authentication middleware can then use the request's credentials, and authorization middleware evaluates the endpoint's requirements against the resulting principal."
  },

  {
    id: "kc-2-1",
    group: "lesson-2",
    prompt: "Which statement about ASP.NET Core Identity is accurate?",
    options: [
      "It is a database table named AspNetUsers.",
      "It is a JWT issuer that always produces standard JWTs.",
      "It is a set of user-management and authentication services that can use an EF Core-backed store.",
      "It is an authorization policy for administrators."
    ],
    correct: 2,
    explain: "Identity is a framework of services and contracts, including UserManager, SignInManager, password handling, and a user store. The EF Core schema is one possible persistence arrangement, not the definition of Identity."
  },
  {
    id: "kc-2-2",
    group: "lesson-2",
    prompt: "During registration, who should be responsible for turning a submitted password into a stored password verifier?",
    options: [
      "The controller, using a custom SHA-256 call",
      "Identity's configured password hasher, normally reached through the user-management service",
      "The browser, before sending the password",
      "The database server, using a SQL function invented for the project"
    ],
    correct: 1,
    explain: "Identity's password hashing facilities use a deliberate, salted, password-specific algorithm and support verification. Custom hashing is a common source of serious security defects and should not be invented in application code."
  },
  {
    id: "kc-2-3",
    group: "lesson-2",
    prompt: "A login request validates Alice's password successfully. What else must happen before future API requests are authenticated?",
    options: [
      "Nothing; the successful password check automatically authenticates every future request.",
      "The application must establish a session or issue a credential that the configured authentication scheme can validate on later requests.",
      "The API must disable authorization for Alice.",
      "The password must be stored in a cookie."
    ],
    correct: 1,
    explain: "Password verification happens during login. Future requests need a credential the API accepts — for example a cookie or bearer token. The login flow and the later authentication scheme are separate parts of the design."
  },
  {
    id: "kc-2-4",
    group: "lesson-2",
    prompt: "Which comparison between cookie authentication and bearer-token API authentication is most accurate?",
    options: [
      "Cookies are always safer because they are encrypted.",
      "Bearer tokens are always safer because they are JWTs.",
      "Cookies are normally managed by the browser and sent automatically to the matching origin; bearer tokens are explicitly attached to API requests and grant access to whoever possesses them.",
      "Cookies cannot be used with HTTPS."
    ],
    correct: 2,
    explain: "The mechanisms have different browser and storage threat models. Neither is automatically safer. A cookie is browser-managed and can be marked HttpOnly/Secure/SameSite; a bearer token is a possession credential that must be protected carefully by the client."
  },
  {
    id: "kc-2-5",
    group: "lesson-2",
    prompt: "Raff currently has a custom `User` entity and a `BooksContext`. What is the safest way to think about adopting Identity?",
    options: [
      "Identity will detect the existing entity and configure itself automatically.",
      "Adopting Identity requires deliberate model, context, service, and migration work; it is not a drop-in attribute.",
      "Identity cannot coexist with a custom user model in any form.",
      "Identity removes the need to think about ownership checks."
    ],
    correct: 1,
    explain: "Identity needs its user type and store integrated with the application's persistence. That can mean deriving from IdentityUser, adding Identity's schema, and planning migrations. Those are design decisions, not automatic behavior."
  },

  {
    id: "kc-3-1",
    group: "lesson-3",
    prompt: "An attacker decodes the payload of a signed JWT and reads the `role` claim. What does that prove about the token?",
    options: [
      "The token is valid and the role is trustworthy.",
      "The payload is readable, but reading it does not validate the signature or any other acceptance rule.",
      "The token is encrypted and cannot be changed.",
      "The API must accept the role because it is inside the token."
    ],
    correct: 1,
    explain: "JWT payloads are Base64URL-encoded JSON, not encrypted by default. Anyone can read them. Trust comes from full validation, especially signature, issuer, audience, and lifetime, under the API's configuration."
  },
  {
    id: "kc-3-2",
    group: "lesson-3",
    prompt: "Why does changing a claim in a signed JWT usually cause validation to fail?",
    options: [
      "The JSON becomes invalid automatically.",
      "The signature was produced over the original header and payload, so changing those bytes changes the data the signature is supposed to protect.",
      "Base64URL forbids edits.",
      "The issuer is contacted for every claim."
    ],
    correct: 1,
    explain: "A signature binds the signed bytes to a key. If an attacker edits the payload and keeps the old signature, a correctly configured validator detects the mismatch. This is why the signature must actually be checked."
  },
  {
    id: "kc-3-3",
    group: "lesson-3",
    prompt: "What is the difference between an access token and an ID token?",
    options: [
      "They are interchangeable names for the same JWT.",
      "An access token is presented to a protected resource; an ID token communicates user identity to the client in OpenID Connect.",
      "An ID token is only for APIs and an access token is only for browsers.",
      "Access tokens are always opaque and ID tokens are always encrypted."
    ],
    correct: 1,
    explain: "OAuth 2.0 access tokens are for accessing protected resources. OpenID Connect ID tokens tell the client who authenticated. An API should validate the credential intended for it, not accept an ID token as a substitute."
  },
  {
    id: "kc-3-4",
    group: "lesson-3",
    prompt: "A team calls `MapIdentityApi<TUser>()` and says, “We now have JWT bearer authentication.” What is wrong with that claim?",
    options: [
      "Nothing; Identity API endpoints always issue standard JWTs.",
      "Identity API bearer tokens are proprietary Identity tokens, not standard JWTs; validating them requires the Identity scheme rather than JWT bearer middleware.",
      "Identity API endpoints cannot issue any token.",
      "JWT bearer middleware automatically validates Identity cookies."
    ],
    correct: 1,
    explain: "The Identity API endpoints can issue bearer tokens that are not JWTs. They are validated by Identity's bearer scheme. If Raff needs standard JWT validation, it needs a token issuer and JWT bearer configuration appropriate to that issuer."
  },
  {
    id: "kc-3-5",
    group: "lesson-3",
    prompt: "Which statement describes OAuth 2.0 and OpenID Connect most accurately?",
    options: [
      "OAuth 2.0 defines a token format; OpenID Connect defines a database schema.",
      "OAuth 2.0 is an authorization framework for obtaining access tokens; OpenID Connect adds an identity layer with ID tokens.",
      "JWT competes with OAuth 2.0, so a system cannot use both.",
      "OpenID Connect removes the need for an API to validate audience."
    ],
    correct: 1,
    explain: "OAuth 2.0 is a framework, not a token format. OpenID Connect layers authentication and identity on top of it. An API still validates the access tokens it accepts, including issuer and audience."
  },

  {
    id: "kc-4-1",
    group: "lesson-4",
    prompt: "A token has a valid signature but was issued by an authority Raff does not trust. Which validation check should reject it?",
    options: [
      "Audience validation",
      "Issuer validation",
      "Lifetime validation",
      "JSON deserialization"
    ],
    correct: 1,
    explain: "Issuer validation ties acceptance to the expected authority. A valid signature only proves that some key signed the token; the API must also trust that issuer and its keys."
  },
  {
    id: "kc-4-2",
    group: "lesson-4",
    prompt: "What problem does audience validation solve?",
    options: [
      "It proves the user's password is correct.",
      "It prevents a token minted for another API from being accepted by this API.",
      "It encrypts the token payload.",
      "It ensures the user has the Administrator role."
    ],
    correct: 1,
    explain: "The audience identifies the intended resource. Checking it prevents a token issued for API B from being replayed successfully against API A, even when both trust the same issuer."
  },
  {
    id: "kc-4-3",
    group: "lesson-4",
    prompt: "Why must `UseAuthentication()` run before `UseAuthorization()` in a conventional ASP.NET Core pipeline?",
    options: [
      "Authorization needs the principal that authentication establishes; otherwise it evaluates the wrong identity or none at all.",
      "Authorization middleware changes the token.",
      "UseAuthentication performs database migrations.",
      "The order does not matter in any configuration."
    ],
    correct: 0,
    explain: "Authentication middleware populates HttpContext.User and records authentication results. Authorization middleware evaluates endpoint requirements against that principal. Reversing them can produce challenges or denials for the wrong reason."
  },
  {
    id: "kc-4-4",
    group: "lesson-4",
    prompt: "What is the difference between reading `User.FindFirstValue(...)` in a controller and manually decoding a token's payload?",
    options: [
      "They are equivalent because both produce JSON.",
      "The controller principal was produced by the configured authentication handler after validation; manual decoding may contain unvalidated claims.",
      "Manual decoding performs stronger signature validation.",
      "Controller claims are never mapped."
    ],
    correct: 1,
    explain: "The principal should reflect the authentication result under the configured scheme. Decoding a token yourself bypasses signature, issuer, audience, and lifetime checks unless you reimplement them correctly."
  },
  {
    id: "kc-4-5",
    group: "lesson-4",
    prompt: "A token's `exp` time is in the past. Which validation step rejects it, and what status is typical for an API?",
    options: [
      "Audience validation; 403",
      "Lifetime validation; an authentication failure commonly surfaces as 401",
      "Issuer validation; 500",
      "Authorization policy; 200"
    ],
    correct: 1,
    explain: "Expiration is part of lifetime validation. The bearer handler should fail authentication, and the endpoint challenge commonly maps to 401. Exact behavior still depends on configuration and endpoint metadata."
  },

  {
    id: "kc-5-1",
    group: "lesson-5",
    prompt: "Why is a role check such as `RequireRole(\"Administrator\")` not always a good model for every permission?",
    options: [
      "Roles cannot be represented as claims.",
      "Roles often describe a job function, while a specific permission may need finer-grained claims or resource rules that are not equivalent to one role.",
      "Role checks do not run on endpoints.",
      "Policies cannot contain roles."
    ],
    correct: 1,
    explain: "Roles are coarse-grained. A user may be an administrator without having every possible permission, or a non-admin may have one specific capability. Use roles where they express the rule, and policies or resource checks where they do not."
  },
  {
    id: "kc-5-2",
    group: "lesson-5",
    prompt: "In a `ClaimsPrincipal`, what is a claim?",
    options: [
      "A database transaction",
      "A type/value statement about a subject, such as a user identifier or role",
      "A JWT signature algorithm only",
      "A middleware ordering rule"
    ],
    correct: 1,
    explain: "A claim is a statement such as sub=alice-123 or role=Reader. It is only trustworthy when the identity carrying it came from an authenticated, trusted source under the application's configuration."
  },
  {
    id: "kc-5-3",
    group: "lesson-5",
    prompt: "A policy contains two requirements and an authenticated principal satisfies only one. What is the default outcome?",
    options: [
      "The policy succeeds because one requirement passed.",
      "The policy fails because authorization generally requires all requirements in the policy to succeed.",
      "The result is undefined.",
      "The user becomes an administrator."
    ],
    correct: 1,
    explain: "Requirements within a policy combine as AND by default. Multiple handlers for one requirement can represent alternatives, but satisfying one requirement does not automatically satisfy another requirement in the same policy."
  },
  {
    id: "kc-5-4",
    group: "lesson-5",
    prompt: "Which statement about claim types and mapping is safest?",
    options: [
      "Every provider emits `ClaimTypes.NameIdentifier` for a user id.",
      "Claim type names depend on the issuer and handler mapping; the application must verify what its configured scheme actually produces.",
      "Claim types are encrypted and cannot be inspected.",
      "A `sub` claim always appears with exactly that name after authentication."
    ],
    correct: 1,
    explain: "JWT claim mapping can translate short JWT names such as sub into legacy .NET claim URIs. The observed claim type depends on the handler and MapInboundClaims configuration. Inspect the real principal instead of assuming."
  },
  {
    id: "kc-5-5",
    group: "lesson-5",
    prompt: "What does an authorization handler do?",
    options: [
      "It authenticates the token.",
      "It evaluates a requirement against the authorization context and marks success or failure.",
      "It maps HTTP status codes to exceptions.",
      "It stores the user's password."
    ],
    correct: 1,
    explain: "A requirement expresses what must be true; a handler contains the logic that checks it against the principal and, for resource-based authorization, the resource. The handler does not replace authentication."
  },

  {
    id: "kc-6-1",
    group: "lesson-6",
    prompt: "Why does `[Authorize]` on `DELETE /api/books/{id}` not prevent Alice from deleting Bob's book?",
    options: [
      "Because `[Authorize]` disables authentication.",
      "Because `[Authorize]` establishes an endpoint-level requirement such as “authenticated”; it cannot by itself compare Alice with the stored owner of a row that has not been loaded.",
      "Because Book IDs are always public.",
      "Because Bob's token is automatically trusted."
    ],
    correct: 1,
    explain: "Endpoint authorization decides whether the caller may reach the action. Resource ownership is a separate decision about a specific object. The action or an authorization handler must load the resource and compare the authenticated user with its owner."
  },
  {
    id: "kc-6-2",
    group: "lesson-6",
    prompt: "The code calls `User.FindFirstValue(ClaimTypes.NameIdentifier)` and gets null. What is the most useful first step?",
    options: [
      "Trust a userId from the request body instead.",
      "Inspect the authenticated principal's actual claims and the configured claim mapping before choosing a claim type.",
      "Disable authentication.",
      "Change the endpoint to 500."
    ],
    correct: 1,
    explain: "Null can mean the claim was never issued, was mapped to a different type, or the request is not authenticated. Logging/inspecting claim types (not token values) and checking MapInboundClaims or the provider's claim configuration is the safe diagnostic path."
  },
  {
    id: "kc-6-3",
    group: "lesson-6",
    prompt: "Why might an ownership-filtered query return `null` for both a missing book and a book owned by someone else?",
    options: [
      "Because EF Core cannot compare strings.",
      "Because the query deliberately filters by both id and owner, and the endpoint intentionally treats both cases as 404 to avoid disclosing existence.",
      "Because the database deletes non-owned books.",
      "Because 404 is required by OAuth 2.0."
    ],
    correct: 1,
    explain: "Filtering by id and owner is a safe pattern. A null result then legitimately covers both cases. Many APIs choose the same 404 response for both to avoid revealing that another user's resource exists; another contract may choose a different response."
  },
  {
    id: "kc-6-4",
    group: "lesson-6",
    prompt: "What is the correct role of `IAuthorizationService` in a resource-based check?",
    options: [
      "It loads the entity from the database automatically.",
      "It evaluates a policy or requirement against the current principal and a specific resource, leaving the application to load the resource and act on the result.",
      "It replaces JWT signature validation.",
      "It issues the access token."
    ],
    correct: 1,
    explain: "The application loads the resource and invokes IAuthorizationService.AuthorizeAsync with the principal and resource. The service runs the configured handlers. The application then chooses the response contract."
  },
  {
    id: "kc-6-5",
    group: "lesson-6",
    prompt: "An update endpoint accepts `{ \"ownerId\": \"bob-123\", \"title\": \"...\" }` and uses the supplied ownerId to decide permission. Why is this unsafe?",
    options: [
      "Because JSON cannot carry identifiers.",
      "Because the client can lie; ownership must come from the validated principal and the server's stored resource, not from client-controlled data.",
      "Because ownerId must be an integer.",
      "Because PUT requests cannot be authenticated."
    ],
    correct: 1,
    explain: "A client can submit any ownerId it wants. Using it as proof of identity or ownership is an authorization bypass. The server must derive the caller from the validated principal and load the stored owner from the database."
  },
  {
    id: "kc-6-6",
    group: "lesson-6",
    prompt: "When is an ownership-filtered query preferable to loading a resource and calling `IAuthorizationService`?",
    options: [
      "When the operation simply needs “this object only if the caller owns it” and the endpoint wants a compact query with no need for a reusable policy decision.",
      "Never; resource authorization is always required for every endpoint.",
      "Only when the API has no authentication.",
      "When the database is PostgreSQL."
    ],
    correct: 0,
    explain: "Both strategies are valid. An ownership-filtered query is simple and efficient for direct CRUD. Resource-based authorization is useful when the decision is reusable, complex, or needs to be separated from the query. Some systems use both: filter for access, policy for the decision contract."
  },

  {
    id: "kc-7-1",
    group: "lesson-7",
    prompt: "A unit test creates a fake `ClaimsPrincipal` with an administrator role and calls a controller action directly. What does it prove?",
    options: [
      "That real JWT signature validation works.",
      "That the controller's authorization-related branching behaves as expected for that principal; it does not test token issuance or bearer validation.",
      "That the issuer and audience are correct.",
      "That the database ownership query is safe."
    ],
    correct: 1,
    explain: "A fake principal bypasses the authentication pipeline entirely. It is useful for testing controller or policy behavior, but real token validation requires an integration test that exercises the configured authentication handler."
  },
  {
    id: "kc-7-2",
    group: "lesson-7",
    prompt: "Which test best verifies that an expired token is rejected by the real bearer configuration?",
    options: [
      "A controller unit test with a principal containing an expired claim.",
      "An HTTP integration test that sends a token with a past exp value through the application's configured authentication pipeline.",
      "A test that decodes the token and checks the exp field.",
      "A test that mocks IAuthorizationService."
    ],
    correct: 1,
    explain: "Only the real pipeline exercises the configured token handler and validation parameters. Decoding checks data, not acceptance; a mocked principal bypasses authentication."
  },
  {
    id: "kc-7-3",
    group: "lesson-7",
    prompt: "Alice's valid token receives 403 from an endpoint, while a token with no signature receives 401. What is the most accurate diagnosis?",
    options: [
      "Both failures are authentication failures.",
      "The unsigned token failed authentication; Alice's identity is valid but her authorization requirements were not satisfied.",
      "Alice's token is expired.",
      "The API has no authorization middleware."
    ],
    correct: 1,
    explain: "401 typically indicates the request did not establish a valid identity. 403 typically indicates a valid identity that lacks permission. The exact mapping can vary, but the distinction should guide where you investigate."
  },
  {
    id: "kc-7-4",
    group: "lesson-7",
    prompt: "Which review finding is the most serious for a multi-user book API?",
    options: [
      "The endpoint returns 404 instead of 403 for another user's book.",
      "The update action filters by book id only and then trusts an ownerId supplied in the request body.",
      "The API uses ProblemDetails for errors.",
      "The controller has a CancellationToken parameter."
    ],
    correct: 1,
    explain: "Trusting client-supplied ownership enables a direct authorization bypass. Status-code choice may be a contract decision; this is a broken object-level authorization flaw."
  }
];

/* ---------------- lesson meta (search + navigation labels) ---------------- */

const LESSON_META = [
  {
    id: "lesson-1",
    label: "The authentication and authorization mental model",
    keywords: "authentication authorization identity principal request lifecycle 401 403 404 challenge forbid endpoint metadata middleware authentication scheme alice bob raff sequence diagram protected request",
    summary: "Separate identity from permission, trace a protected request, and identify the component responsible for each decision."
  },
  {
    id: "lesson-2",
    label: "Users, passwords, Identity, and login",
    keywords: "asp.net core identity identityuser usermanager signinmanager user store registration login password hashing cookie token account status raff user model migration dbcontext",
    summary: "What an identity system must do, how registration and login differ, and what adopting Identity would mean for Raff."
  },
  {
    id: "lesson-3",
    label: "Cookies, bearer tokens, JWT, OAuth 2.0, and OpenID Connect",
    keywords: "cookie bearer token authorization header jwt header payload signature base64url oauth 2.0 openid connect access token id token refresh token mapidentityapi proprietary identity token",
    summary: "Tell apart credentials, token formats, and standards, and learn what a JWT does and does not guarantee."
  },
  {
    id: "lesson-4",
    label: "JWT bearer authentication configuration",
    keywords: "jwt bearer addauthentication addjwtbearer authority audience issuer signature lifetime discovery metadata signing keys middleware order useauthentication useauthorization token validation debugging 401",
    summary: "Understand each validation check and configuration setting, then diagnose bearer-token failures systematically."
  },
  {
    id: "lesson-5",
    label: "Claims, roles, policies, and protected endpoints",
    keywords: "claimsprincipal claimsidentity claim type claim value authorize allowanonymous roles policies requirements handlers iauthorizationservice endpoint metadata permission",
    summary: "Move from principal inspection to endpoint rules, role checks, and reusable policy requirements."
  },
  {
    id: "lesson-6",
    label: "Resource-based authorization and ownership",
    keywords: "idor bola object level authorization ownership ownerid sub nameidentifier resource-based authorization iauthorizationservice handler query filtering 404 403 delete book alice bob bypass",
    summary: "Protect each object, derive identity safely, and implement update/delete rules that stop Alice from modifying Bob's books."
  },
  {
    id: "lesson-7",
    label: "Testing and debugging the security system",
    keywords: "testing authorization policies controllers integration tests real jwt validation webapplicationfactory mocked claimsprincipal token issuance validation pipeline database access security review diagnostic matrix",
    summary: "Verify behavior at each boundary, separate unit tests from real token-validation tests, and run a complete security review."
  },
  {
    id: "lesson-assessment",
    label: "Final assessment",
    keywords: "assessment final module test questions review pass threshold retake score authentication authorization jwt identity policy resource ownership",
    summary: "Sixteen applied questions across the module. The pass threshold defaults to 80% and each result links back to the lesson that owns it."
  }
];

/* ---------------- assessment ---------------- */

const ASSESSMENT_QUESTIONS = [
  {
    id: "as-1",
    topic: "Request lifecycle",
    lesson: "lesson-1",
    prompt: "Which sequence best describes a protected request in a conventional ASP.NET Core API?",
    options: [
      "Authorization → authentication → routing → endpoint",
      "Endpoint selection → authentication → authorization → endpoint execution",
      "Authentication → endpoint execution → authorization",
      "Routing → authorization → authentication → endpoint execution"
    ],
    correct: 1,
    explain: "With endpoint routing, the endpoint and its metadata are selected before authentication and authorization run. Authentication produces the principal; authorization evaluates the endpoint's requirements against it."
  },
  {
    id: "as-2",
    topic: "Authentication vs authorization",
    lesson: "lesson-1",
    prompt: "Alice has a valid token, but Book 42 belongs to Bob. Which statement is correct?",
    options: [
      "Authentication alone prevents Alice from modifying Book 42.",
      "Authentication establishes Alice's identity; authorization must still decide whether she may modify that specific book.",
      "Alice's valid token proves that she owns every book.",
      "The API should return 200 because Alice is authenticated."
    ],
    correct: 1,
    explain: "A valid identity is not a permission. Ownership of Book 42 is a resource-level authorization fact. Endpoint access and object access are different decisions."
  },
  {
    id: "as-3",
    topic: "Status codes",
    lesson: "lesson-1",
    prompt: "A request to a protected API endpoint has no valid credentials. What is the most typical response, and what does it represent?",
    options: [
      "403, meaning the identity is valid but forbidden",
      "401, produced by an authentication challenge",
      "404, meaning the endpoint does not exist",
      "204, meaning the request succeeded without a body"
    ],
    correct: 1,
    explain: "An API commonly challenges an unauthenticated request with 401. 403 is generally for an authenticated caller that lacks permission. The exact result still depends on scheme and application configuration."
  },
  {
    id: "as-4",
    topic: "Identity registration",
    lesson: "lesson-2",
    prompt: "Why should application code not implement its own password hashing when Identity is available?",
    options: [
      "Identity hashing is faster than all alternatives.",
      "Identity provides a designed, salted password-hashing and verification mechanism; custom schemes frequently introduce serious vulnerabilities.",
      "Passwords should be stored as plaintext for debugging.",
      "Hashing is only required for administrators."
    ],
    correct: 1,
    explain: "Password storage is security-critical. Use a well-reviewed implementation through the configured user manager. Do not invent hashing, and never store or log plaintext passwords."
  },
  {
    id: "as-5",
    topic: "Login",
    lesson: "lesson-2",
    prompt: "What is the key difference between verifying a password at login and authenticating a later API request?",
    options: [
      "There is no difference; both use the password on every request.",
      "Login checks the password once and establishes a credential/session; later requests are authenticated by a scheme such as a cookie or bearer token.",
      "Later requests do not need authentication if login succeeded once.",
      "Login is authorization; later requests are authentication."
    ],
    correct: 1,
    explain: "Password verification is part of the login flow. Future requests carry something the authentication handler can validate — a cookie or an access token — and that produces the principal used for authorization."
  },
  {
    id: "as-6",
    topic: "Cookies vs bearer tokens",
    lesson: "lesson-3",
    prompt: "Which statement about cookies and bearer tokens is most accurate?",
    options: [
      "JWTs are automatically safer than cookies because they are signed.",
      "Cookies are browser-managed and sent automatically to matching origins; bearer tokens are explicit possession credentials attached to API requests.",
      "Cookies cannot be marked HttpOnly.",
      "Bearer tokens are never stored by clients."
    ],
    correct: 1,
    explain: "The threats differ. Cookies can be protected with HttpOnly, Secure, and SameSite attributes. Bearer tokens grant access to whoever possesses them, so storage, transport, and logging require care. Neither is automatically safer."
  },
  {
    id: "as-7",
    topic: "JWT anatomy",
    lesson: "lesson-3",
    prompt: "What does it mean that a JWT is signed but not encrypted?",
    options: [
      "Nobody can read the payload.",
      "The payload is readable after Base64URL decoding, while the signature protects integrity and authenticity if it is validated.",
      "The signature hides the claims from the API.",
      "The token cannot expire."
    ],
    correct: 1,
    explain: "Base64URL is encoding, not encryption. A signed JWT is readable. The signature lets a validator detect tampering, but only if the validator uses the correct key and validation configuration."
  },
  {
    id: "as-8",
    topic: "Token validation",
    lesson: "lesson-4",
    prompt: "A token has a valid signature but the wrong issuer. Which check should reject it?",
    options: [
      "Audience validation",
      "Issuer validation",
      "Lifetime validation",
      "JSON casing"
    ],
    correct: 1,
    explain: "Even a correctly signed token must come from a trusted issuer. Issuer validation ensures the API only accepts tokens from the authority it is configured to trust."
  },
  {
    id: "as-9",
    topic: "Token validation",
    lesson: "lesson-4",
    prompt: "Why does an API validate the audience of an access token?",
    options: [
      "To confirm that the user typed the right password.",
      "To ensure the token was intended for this API rather than for a different resource.",
      "To encrypt the token payload.",
      "To assign a role automatically."
    ],
    correct: 1,
    explain: "Audience validation prevents a token minted for another API from being replayed against this one. It complements issuer, signature, and lifetime validation."
  },
  {
    id: "as-10",
    topic: "Identity API tokens",
    lesson: "lesson-3",
    prompt: "What is the most accurate description of bearer tokens issued by ASP.NET Core Identity API endpoints?",
    options: [
      "They are standard JWTs that any JWT library can validate by default.",
      "They are proprietary Identity tokens and are not the same as standard JWTs.",
      "They are refresh tokens only.",
      "They are cookies with a different name."
    ],
    correct: 1,
    explain: "Identity API endpoints can issue bearer tokens backed by Identity's own token infrastructure. They are not standard JWTs, so do not configure JWT bearer middleware expecting to validate them."
  },
  {
    id: "as-11",
    topic: "Policies",
    lesson: "lesson-5",
    prompt: "A policy has two requirements. A principal satisfies the first requirement but not the second. What happens by default?",
    options: [
      "The policy succeeds.",
      "The policy fails, because all requirements in the policy must succeed.",
      "The second requirement is ignored.",
      "The principal is authenticated again."
    ],
    correct: 1,
    explain: "Default policy evaluation combines requirements as AND. A handler can succeed its own requirement, but that does not satisfy other requirements in the same policy."
  },
  {
    id: "as-12",
    topic: "Claims",
    lesson: "lesson-5",
    prompt: "Why is it unsafe to assume that `ClaimTypes.NameIdentifier` always contains the user id?",
    options: [
      "The type is deprecated and never used.",
      "The claim type actually present depends on the issuer, handler, and claim mapping; inspect the configured principal rather than assuming.",
      "Claims cannot contain identifiers.",
      "Only cookies produce claims."
    ],
    correct: 1,
    explain: "Inbound claim mapping may translate a JWT sub claim into a legacy type. Different providers may also use different names. The application must verify what its authentication configuration produces."
  },
  {
    id: "as-13",
    topic: "Resource ownership",
    lesson: "lesson-6",
    prompt: "Which query most safely implements “delete this book only if Alice owns it”?",
    options: [
      "Load by id, then trust an `ownerId` from the request body.",
      "Load by id and compare its owner with the authenticated principal's stable user id.",
      "Load by title because titles are unique.",
      "Delete first, then check ownership in a background job."
    ],
    correct: 1,
    explain: "The server must derive identity from the validated principal and compare it with stored ownership. A client-supplied owner id is attacker-controlled and cannot be used as proof."
  },
  {
    id: "as-14",
    topic: "Resource-based authorization",
    lesson: "lesson-6",
    prompt: "What does `IAuthorizationService.AuthorizeAsync(User, book, \"BookOwner\")` do?",
    options: [
      "Loads the book from the database automatically.",
      "Evaluates the named policy against the current principal and the supplied book using the configured handlers.",
      "Issues a new JWT.",
      "Replaces the authentication middleware."
    ],
    correct: 1,
    explain: "The application loads the resource and passes it to IAuthorizationService. The service evaluates the policy and its requirements against the principal and resource. The caller then acts on the AuthorizationResult."
  },
  {
    id: "as-15",
    topic: "IDOR/BOLA",
    lesson: "lesson-6",
    prompt: "A client changes `/api/books/42` to `/api/books/77` and receives Bob's book even though the client belongs to Alice. What is the best description?",
    options: [
      "A JWT signature failure",
      "A broken object-level authorization (IDOR) failure",
      "A model-binding error",
      "A cookie expiration problem"
    ],
    correct: 1,
    explain: "The caller was authenticated but the server failed to verify access to the specific object identified by the URL. Changing an identifier must never bypass ownership or permission checks."
  },
  {
    id: "as-16",
    topic: "Testing",
    lesson: "lesson-7",
    prompt: "Which test actually exercises the application's configured JWT validation?",
    options: [
      "A controller test with a hand-built ClaimsPrincipal",
      "An HTTP integration test that sends a signed or malformed token through the real authentication pipeline",
      "A test that reads the JWT payload as JSON",
      "A test that mocks IAuthorizationService"
    ],
    correct: 1,
    explain: "Only the pipeline test exercises signature, issuer, audience, lifetime, and principal construction. Hand-built principals and payload inspection bypass the validation you are trying to verify."
  }
];

/* ---------------- widget datasets ---------------- */

const REQUEST_SIMULATOR = {
  callers: {
    alice: { label: "Alice", sub: "alice-123", role: "Reader", note: "Authenticated owner of Book A" },
    bob: { label: "Bob", sub: "bob-456", role: "Reader", note: "Authenticated owner of Book B" },
    carol: { label: "Carol", sub: "carol-789", role: "Administrator", note: "Authenticated administrator" }
  },
  credentials: {
    none: { label: "No Authorization header", state: "none", note: "No credential is supplied." },
    valid: { label: "Valid bearer token", state: "valid", note: "Signature, issuer, audience, and lifetime all pass." },
    expired: { label: "Expired bearer token", state: "expired", note: "The token is authentic but no longer valid." },
    invalid: { label: "Invalid signature", state: "invalid", note: "The token bytes do not match the signature." }
  },
  endpoints: {
    publicCatalog: {
      label: "GET /api/books — public catalog",
      method: "GET",
      path: "/api/books",
      rule: "anonymous",
      note: "Marked AllowAnonymous; no identity is required."
    },
    myShelf: {
      label: "GET /api/me/shelf — authenticated",
      method: "GET",
      path: "/api/me/shelf",
      rule: "authenticated",
      note: "Requires an authenticated user."
    },
    adminStats: {
      label: "GET /api/admin/stats — administrator",
      method: "GET",
      path: "/api/admin/stats",
      rule: "admin",
      note: "Requires the Administrator role."
    },
    deleteBook: {
      label: "DELETE /api/books/{id} — owner only",
      method: "DELETE",
      path: "/api/books/42",
      rule: "owner",
      note: "Requires authentication plus ownership of the selected book."
    }
  },
  book: {
    id: 42,
    title: "Book A",
    ownerId: "alice-123"
  }
};

const JWT_SAMPLE = {
  fictional: true,
  header: {
    alg: "RS256",
    typ: "JWT",
    kid: "raff-auth-2026-01"
  },
  payload: {
    iss: "https://identity.raff.example",
    aud: "raff-api",
    sub: "alice-123",
    name: "Alice",
    role: "Reader",
    iat: 1760000000,
    exp: 1760003600,
    jti: "fictional-token-0001"
  },
  tamperedPayload: {
    iss: "https://identity.raff.example",
    aud: "raff-api",
    sub: "alice-123",
    name: "Alice",
    role: "Administrator",
    iat: 1760000000,
    exp: 1760003600,
    jti: "fictional-token-0001"
  },
  segmentInfo: {
    header: {
      label: "Header",
      purpose: "Metadata for the validator: the token type, the signing algorithm identifier, and often a key id.",
      warning: "The algorithm identifier is metadata. A validator must enforce the algorithms and keys it accepts; it must not blindly trust attacker-selected algorithms."
    },
    payload: {
      label: "Payload",
      purpose: "Claims about the subject and the token: issuer, audience, subject, roles, timestamps, and application-specific values.",
      warning: "The payload is readable by anyone who has the token. It is not a secret container, and its values are not trusted until the token is validated."
    },
    signature: {
      label: "Signature",
      purpose: "A cryptographic value that binds the encoded header and payload to a signing key.",
      warning: "The signature only helps when the API validates it with the expected key, algorithm, issuer, and audience. Decoding never verifies this segment."
    }
  },
  claimInfo: {
    iss: "The authority that issued the token.",
    aud: "The intended API or resource.",
    sub: "The stable subject identifier for Alice.",
    name: "A display name; convenient but not a safe authorization key.",
    role: "An application role claim. Trust it only after validation.",
    iat: "When the token was issued.",
    exp: "When it stops being valid.",
    jti: "A unique token identifier, useful for tracing or revocation designs."
  }
};

const VALIDATION_SCENARIOS = [
  {
    id: "vs-valid",
    label: "Valid token for raff-api",
    token: "eyJhbGciOiJSUzI1NiJ9.fictional-valid-payload.signature",
    checks: { format: "pass", signature: "pass", issuer: "pass", audience: "pass", lifetime: "pass" },
    rejectAt: null,
    decision: "Authentication succeeds. Authorization is evaluated next; a valid identity can still receive 403.",
    explain: "Every configured check passes. The handler builds a ClaimsPrincipal and authorization proceeds."
  },
  {
    id: "vs-none",
    label: "No token supplied",
    token: "(no Authorization header)",
    checks: { format: "fail", signature: "skip", issuer: "skip", audience: "skip", lifetime: "skip" },
    rejectAt: "format",
    decision: "Authentication challenge; a protected API commonly returns 401.",
    explain: "There is no credential to process. A protected endpoint challenges the request rather than inventing an identity."
  },
  {
    id: "vs-malformed",
    label: "Malformed token",
    token: "abc.def",
    checks: { format: "fail", signature: "skip", issuer: "skip", audience: "skip", lifetime: "skip" },
    rejectAt: "format",
    decision: "Authentication fails; commonly 401.",
    explain: "A JWT must have the expected compact structure. The handler cannot validate a signature or claims from a string it cannot parse."
  },
  {
    id: "vs-signature",
    label: "Valid structure, invalid signature",
    token: "eyJhbGciOiJSUzI1NiJ9.tampered-payload.bad-signature",
    checks: { format: "pass", signature: "fail", issuer: "skip", audience: "skip", lifetime: "skip" },
    rejectAt: "signature",
    decision: "Authentication fails; commonly 401.",
    explain: "The signature does not verify against the trusted key. The token may decode, but it is not authentic and must not produce a trusted principal."
  },
  {
    id: "vs-issuer",
    label: "Signed by an untrusted issuer",
    token: "eyJhbGciOiJSUzI1NiJ9.untrusted-issuer-payload.signature",
    checks: { format: "pass", signature: "pass", issuer: "fail", audience: "skip", lifetime: "skip" },
    rejectAt: "issuer",
    decision: "Authentication fails; commonly 401.",
    explain: "The signature may be valid for the key used, but the token was not issued by the authority this API trusts. Issuer validation rejects it."
  },
  {
    id: "vs-audience",
    label: "Token issued for another API",
    token: "eyJhbGciOiJSUzI1NiJ9.other-api-payload.signature",
    checks: { format: "pass", signature: "pass", issuer: "pass", audience: "fail", lifetime: "skip" },
    rejectAt: "audience",
    decision: "Authentication fails; commonly 401.",
    explain: "The token is intended for a different resource. Accepting it here would allow cross-API token reuse."
  },
  {
    id: "vs-expired",
    label: "Authentic but expired token",
    token: "eyJhbGciOiJSUzI1NiJ9.expired-payload.signature",
    checks: { format: "pass", signature: "pass", issuer: "pass", audience: "pass", lifetime: "fail" },
    rejectAt: "lifetime",
    decision: "Authentication fails; commonly 401.",
    explain: "The token's validity window has ended. Lifetime validation rejects it even though the signature and issuer are genuine."
  },
  {
    id: "vs-role",
    label: "Valid token, insufficient role",
    token: "eyJhbGciOiJSUzI1NiJ9.valid-reader-payload.signature",
    checks: { format: "pass", signature: "pass", issuer: "pass", audience: "pass", lifetime: "pass" },
    rejectAt: null,
    decision: "Authentication succeeds. Authorization fails with 403 on an administrator-only endpoint.",
    explain: "Token validation is not permission. The principal is valid, but the endpoint's authorization requirement is not satisfied."
  }
];

const POLICY_MODES = {
  anonymous: "AllowAnonymous — public access",
  authenticated: "RequireAuthenticatedUser",
  adminRole: "RequireRole(\"Administrator\")",
  permission: "Policy requiring the reports:export claim",
  owner: "Authenticate, then check resource ownership"
};

const POLICY_ENDPOINTS = [
  {
    id: "pe-1",
    endpoint: "GET /api/books",
    need: "Anyone may browse the catalog, including anonymous visitors.",
    answer: "anonymous",
    why: "Public catalog reads are explicitly anonymous. AllowAnonymous bypasses endpoint authorization for this action; do not protect data that is intentionally public."
  },
  {
    id: "pe-2",
    endpoint: "POST /api/books",
    need: "Any signed-in user may add a book to their own shelf.",
    answer: "authenticated",
    why: "The endpoint needs a valid identity, but no administrator role or resource-specific rule is required before the action runs."
  },
  {
    id: "pe-3",
    endpoint: "GET /api/admin/stats",
    need: "Only users with the Administrator role may read operational statistics.",
    answer: "adminRole",
    why: "The rule is expressed as an application role. A role requirement fits this coarse-grained endpoint, while still relying on a validated principal."
  },
  {
    id: "pe-4",
    endpoint: "GET /api/reports/export",
    need: "Only users granted the reports:export permission may export data.",
    answer: "permission",
    why: "The capability is narrower than a job title. A claim-based policy expresses the permission directly and avoids granting every administrator every capability."
  },
  {
    id: "pe-5",
    endpoint: "DELETE /api/books/{id}",
    need: "A signed-in user may delete only a book they own.",
    answer: "owner",
    why: "Authentication is necessary but insufficient. The decision depends on the stored ownership of the specific book, so endpoint authorization must be combined with a resource-based check."
  },
  {
    id: "pe-6",
    endpoint: "PUT /api/books/{id}",
    need: "A signed-in user may edit only a book they own.",
    answer: "owner",
    why: "Like delete, edit is an object-level operation. The caller's identity must be compared with the resource's actual owner after the book is loaded."
  }
];

const OWNERSHIP_SIMULATOR = {
  callers: {
    alice: { label: "Alice", sub: "alice-123", note: "Owner of Book A" },
    bob: { label: "Bob", sub: "bob-456", note: "Owner of Book B" },
    anonymous: { label: "Anonymous visitor", sub: null, note: "No authenticated identity" }
  },
  books: {
    bookA: { label: "Book A (#42)", id: 42, ownerId: "alice-123", title: "Book A" },
    bookB: { label: "Book B (#77)", id: 77, ownerId: "bob-456", title: "Book B" }
  },
  operations: {
    read: {
      label: "GET — read book details",
      rule: "Any authenticated user may read book details in this example.",
      kind: "read"
    },
    update: {
      label: "PUT — update the book",
      rule: "Only the owner may update the book.",
      kind: "write"
    },
    delete: {
      label: "DELETE — delete the book",
      rule: "Only the owner may delete the book.",
      kind: "write"
    }
  }
};

/* ---------------- lesson content (structured blocks, rendered by content.js) ---------------- */

const MODULE_LESSONS = [
  {
    id: "lesson-1",
    badge: "L1",
    nav: "The complete mental model",
    content: [
      {
        type: "html",
        html: `<span class="lesson-pill">L1 · Lesson</span><h1 class="lesson-h1">Authentication and Authorization from First Principles</h1><p class="lesson-lead">Before learning attributes, tokens, or middleware, build the mental model: who is this request, what may it do, and which component makes each decision? We will trace the same request — Alice, Bob, and Book 42 — through the entire system.</p><div class="lesson-meta-bar"><span>🧠 5 knowledge checks</span><span>🧪 End-to-end request simulator</span><span>🧭 Sequence and component diagrams</span></div>`
      },
      {
        type: "html",
        html: `<div class="callout callout-info"><div class="callout-title">The running example</div><p style="margin-bottom:0;">Alice owns <strong>Book A (#42)</strong>. Bob owns <strong>Book B (#77)</strong>. Raff has public endpoints, endpoints for signed-in users, an administrator endpoint, and operations that may modify only a book the caller owns. Every lesson returns to this same system so that each new idea attaches to a familiar situation.</p></div>`
      },
      {
        type: "h2",
        html: "Part A — Why both concepts exist"
      },
      {
        type: "p",
        html: `Imagine Alice sends this request:`
      },
      {
        type: "code",
        lang: "http",
        filename: "The request that starts everything",
        code: `GET /api/books/42 HTTP/1.1
Host: api.raff.example
Authorization: Bearer <Alice's fictional access token>`
      },
      {
        type: "p",
        html: `The URL tells the server <em>which resource</em> Alice wants. It does not prove who Alice is, and it certainly does not prove that Alice may do whatever the endpoint allows. A book identifier is public information inside the API contract; possession of an identifier is not a permission.`
      },
      {
        type: "p",
        html: `The request has two separate questions to answer:`
      },
      {
        type: "html",
        html: `<div class="m6-two-col">
<div class="m6-concept-card"><div class="m6-concept-kicker">Question 1</div><h3>Authentication — “Is there a valid identity?”</h3><p>ASP.NET Core asks the configured authentication scheme to examine the request's credentials. For a bearer token, the JWT bearer handler extracts the token and applies its validation rules. If everything it requires passes, the handler produces an identity represented by a <code>ClaimsPrincipal</code>.</p><p style="margin-bottom:0;">Authentication does <strong>not</strong> decide whether Alice may delete a book. It decides whether the request carries an identity the application can trust.</p></div>
<div class="m6-concept-card"><div class="m6-concept-kicker">Question 2</div><h3>Authorization — “May this identity do this?”</h3><p>Authorization evaluates requirements against that identity and, when necessary, against a specific resource. “Must be authenticated”, “must be an administrator”, and “must own Book 42” are different requirements.</p><p style="margin-bottom:0;">Authorization does <strong>not</strong> create the identity. It consumes what authentication established — or rejects the request when no trusted identity exists.</p></div>
</div>`
      },
      {
        type: "html",
        html: `<div class="table-wrapper"><table><thead><tr><th>Question</th><th>Authentication</th><th>Authorization</th></tr></thead><tbody>
<tr><td>What is being decided?</td><td>Whether the request has a valid identity under the configured scheme</td><td>Whether that identity, and sometimes a resource, satisfies access rules</td></tr>
<tr><td>Main input</td><td>Credentials: cookie, bearer token, or another scheme's credential</td><td>A <code>ClaimsPrincipal</code>, endpoint requirements, policies, and optionally a resource</td></tr>
<tr><td>Main output</td><td>Success or failure, and a principal when successful</td><td>Allow, challenge, or forbid (often 200/401/403 at the HTTP boundary)</td></tr>
<tr><td>Typical failure</td><td>Missing, malformed, expired, wrongly signed, wrong issuer, or wrong audience token</td><td>Authenticated identity lacks a role, claim, policy requirement, or resource permission</td></tr>
<tr><td>Who owns it?</td><td>Authentication handler plus authentication middleware</td><td>Authorization middleware, policies, handlers, and application-level resource checks</td></tr>
<tr><td>Important limit</td><td>Does not grant permissions</td><td>Does not validate credentials or invent an identity</td></tr>
</tbody></table></div>`
      },
      {
        type: "callout",
        kind: "warning",
        title: "A valid identity is not a universal permission",
        html: `“Alice is authenticated” means the application trusts that the request represents Alice. It does not mean Alice may read every book, delete another user's data, or call an administrator endpoint. A system that stops after authentication has only answered half of the security question.`
      },
      {
        type: "h2",
        html: "Part B — The lifecycle of a protected request"
      },
      {
        type: "p",
        html: `The following sequence is a <strong>conventional</strong> ASP.NET Core flow with endpoint routing and a JWT bearer scheme. It is not a universal law. Middleware can be added, removed, reordered, or replaced; multiple authentication schemes can coexist; resource checks happen inside application code after endpoint authorization. Use the sequence to reason about responsibilities, not as a promise that every application has exactly these boxes.`
      },
      {
        type: "html",
        html: `<div class="diagram-container"><div class="diagram-title">Sequence diagram — Alice requests a protected book endpoint</div>
<div class="m6-sequence">
  <div class="m6-sequence-step"><span class="m6-seq-num">1</span><div><strong>Client creates the HTTP request.</strong><div class="m6-seq-desc">Alice's client attaches a bearer token to the <code>Authorization</code> header. The token is a credential, not a password.</div></div></div>
  <div class="m6-sequence-arrow">↓</div>
  <div class="m6-sequence-step"><span class="m6-seq-num">2</span><div><strong>The request reaches the ASP.NET Core application.</strong><div class="m6-seq-desc">Kestrel accepts the connection and the middleware pipeline begins processing the <code>HttpContext</code>.</div></div></div>
  <div class="m6-sequence-arrow">↓</div>
  <div class="m6-sequence-step"><span class="m6-seq-num">3</span><div><strong>Routing selects the endpoint and its metadata.</strong><div class="m6-seq-desc">The route template, HTTP method, <code>[Authorize]</code>, <code>[AllowAnonymous]</code>, and policy names become part of the selected endpoint's metadata.</div></div></div>
  <div class="m6-sequence-arrow">↓</div>
  <div class="m6-sequence-step"><span class="m6-seq-num">4</span><div><strong>Authentication middleware invokes the applicable scheme.</strong><div class="m6-seq-desc">With a configured default scheme, it asks the handler to authenticate the request. If the endpoint explicitly names schemes, the authorization system can also request a challenge from them.</div></div></div>
  <div class="m6-sequence-arrow">↓</div>
  <div class="m6-sequence-step"><span class="m6-seq-num">5</span><div><strong>The authentication handler examines available credentials.</strong><div class="m6-seq-desc">The JWT bearer handler looks for the expected <code>Authorization: Bearer</code> value and attempts to process it. Other schemes would look for cookies or different headers.</div></div></div>
  <div class="m6-sequence-arrow">↓</div>
  <div class="m6-sequence-step"><span class="m6-seq-num">6</span><div><strong>The handler validates the token according to its configuration.</strong><div class="m6-seq-desc">Signature, issuer, audience, lifetime, and other configured rules are evaluated. A failure produces an authentication failure, not a trusted principal.</div></div></div>
  <div class="m6-sequence-arrow">↓</div>
  <div class="m6-sequence-step"><span class="m6-seq-num">7</span><div><strong>Success produces a <code>ClaimsPrincipal</code>.</strong><div class="m6-seq-desc">The principal is stored on <code>HttpContext.User</code>. It contains one or more <code>ClaimsIdentity</code> objects. Controller code can read the same principal through its <code>User</code> property.</div></div></div>
  <div class="m6-sequence-arrow">↓</div>
  <div class="m6-sequence-step"><span class="m6-seq-num">8</span><div><strong>Authorization evaluates the endpoint's requirements.</strong><div class="m6-seq-desc">The authorization middleware checks metadata such as <code>[Authorize]</code>, roles, and policy names. A missing valid identity usually triggers a challenge; a valid identity that fails a requirement triggers a forbid.</div></div></div>
  <div class="m6-sequence-arrow">↓</div>
  <div class="m6-sequence-step"><span class="m6-seq-num">9</span><div><strong>If allowed, the endpoint executes.</strong><div class="m6-seq-desc">The controller action or minimal-API delegate runs. Endpoint authorization has only established that the request may reach this code.</div></div></div>
  <div class="m6-sequence-arrow">↓</div>
  <div class="m6-sequence-step"><span class="m6-seq-num">10</span><div><strong>The application performs any resource-level check.</strong><div class="m6-seq-desc">For “delete Book 42 only if Alice owns it”, the action loads or queries the book, compares trusted identity with stored ownership, and may call <code>IAuthorizationService</code>. This step is application logic, not magic performed by <code>[Authorize]</code>.</div></div></div>
  <div class="m6-sequence-arrow">↓</div>
  <div class="m6-sequence-step m6-seq-final"><span class="m6-seq-num">11</span><div><strong>The application returns a response.</strong><div class="m6-seq-desc">Success, challenge, forbid, or a deliberately hidden resource response is serialized. The HTTP contract decides the exact status code.</div></div></div>
</div>
<div class="legend-row"><span class="legend-item"><span class="legend-dot dot-fk"></span>Authentication boundary</span><span class="legend-item"><span class="legend-dot dot-nav"></span>Authorization decision</span><span class="legend-item"><span class="legend-dot dot-pk"></span>Application resource check</span></div></div>`
      },
      {
        type: "h3",
        html: "What changes in the difficult cases?"
      },
      {
        type: "html",
        html: `<div class="table-wrapper"><table><thead><tr><th>Request</th><th>What happens</th><th>Typical response</th></tr></thead><tbody>
<tr><td>Anonymous visitor calls <code>GET /api/books</code></td><td>Routing selects the public endpoint. Authentication may run but finds no credential. <code>[AllowAnonymous]</code> means authorization does not require an identity.</td><td>200 with public data, if the action succeeds</td></tr>
<tr><td>No token calls <code>GET /api/me/shelf</code></td><td>Authentication produces no valid principal; the endpoint requires one. Authorization challenges the request.</td><td>401, commonly with a <code>WWW-Authenticate</code> challenge</td></tr>
<tr><td>Invalid-signature token calls a protected endpoint</td><td>The handler cannot authenticate the token. A forged or altered token must not become a trusted principal.</td><td>401, not 200 with forged claims</td></tr>
<tr><td>Valid token, but no Administrator role, calls <code>GET /api/admin/stats</code></td><td>Authentication succeeds. The endpoint's role requirement fails.</td><td>403 Forbidden</td></tr>
<tr><td>Alice's valid token calls <code>DELETE /api/books/42</code>, but Book 42 belongs to Bob</td><td>Endpoint authentication and authorization may succeed. The application-level ownership check then fails.</td><td>403, or 404 if the API hides other users' resources</td></tr>
<tr><td>Alice's valid token calls <code>DELETE /api/books/42</code> and she owns it</td><td>All checks pass and the action performs the delete.</td><td>204 No Content, if that is the contract</td></tr>
</tbody></table></div>`
      },
      {
        type: "callout",
        kind: "info",
        title: "401, 403, and 404 are outcomes, not definitions",
        html: `<p><strong>401 Unauthorized</strong> is a challenge for a valid identity; the caller is not authenticated in a way the endpoint accepts. <strong>403 Forbidden</strong> generally means the identity is known but not allowed. <strong>404 Not Found</strong> can mean the resource is absent — or that the API deliberately refuses to disclose its existence.</p><p style="margin-bottom:0;">The exact status can depend on the scheme, the endpoint metadata, the authorization result, and the application's response policy. Do not reduce the whole model to “401 means login and 403 means role” without checking the contract.</p>`
      },
      {
        type: "h2",
        html: "Part C — The main components and their responsibilities"
      },
      {
        type: "p",
        html: `Each component has a narrow job. The confusion usually comes from asking one layer to do another layer's job.`
      },
      {
        type: "html",
        html: `<div class="table-wrapper"><table><thead><tr><th>Component</th><th>What it does</th><th>What it does not do</th></tr></thead><tbody>
<tr><td><strong>ASP.NET Core Identity</strong></td><td>Manages users, password hashing and verification, sign-in support, roles, claims, and a user store.</td><td>It is not a JWT, not a database table, and not an authorization policy. It does not automatically protect an endpoint.</td></tr>
<tr><td><strong>Authentication scheme and handler</strong></td><td>Defines how credentials are read and validated, and produces an authentication result and principal.</td><td>It does not decide whether a particular book belongs to the caller.</td></tr>
<tr><td><strong>JWT bearer authentication</strong></td><td>Validates a bearer token against configured issuer, audience, signature, and lifetime rules.</td><td>It does not check roles or policies automatically; those are authorization concerns.</td></tr>
<tr><td><strong>Claims and <code>ClaimsPrincipal</code></strong></td><td>Represent the authenticated identity and its statements.</td><td>A claim is not automatically true just because it exists in an unvalidated token.</td></tr>
<tr><td><strong>Authorization policy</strong></td><td>Groups requirements that an endpoint or resource operation needs.</td><td>It does not authenticate the caller or issue credentials.</td></tr>
<tr><td><strong>Authorization handler</strong></td><td>Evaluates a requirement against the principal and optional resource.</td><td>It does not load the database entity unless application code gives it one.</td></tr>
<tr><td><strong><code>IAuthorizationService</code></strong></td><td>Runs an authorization policy or requirement imperatively, including for a loaded resource.</td><td>It does not choose the HTTP response for you.</td></tr>
<tr><td><strong>Controller / application service</strong></td><td>Loads resources, performs ownership checks, coordinates business rules, and maps outcomes to HTTP.</td><td>It should not trust client-supplied identity or skip authorization because a route is “hard to guess”.</td></tr>
<tr><td><strong>Database</strong></td><td>Stores users, books, and ownership relationships; unique constraints provide concurrency backstops.</td><td>It does not know who Alice is unless the application asks the right query.</td></tr>
</tbody></table></div>`
      },
      {
        type: "html",
        html: `<div class="diagram-container"><div class="diagram-title">Component diagram — where each decision lives</div>
<div class="m6-component-grid">
  <div class="m6-component-card m6-comp-client"><div class="m6-comp-icon">💻</div><div class="m6-comp-title">Client</div><div class="m6-comp-desc">Sends credentials and API requests. It can lie about everything it supplies, so it is never the source of truth for identity or ownership.</div></div>
  <div class="m6-component-arrow">→</div>
  <div class="m6-component-card m6-comp-auth"><div class="m6-comp-icon">🪪</div><div class="m6-comp-title">Authentication</div><div class="m6-comp-desc">Scheme + handler. Validates the credential and creates <code>HttpContext.User</code>. JWT bearer is one scheme; cookies and Identity are others.</div></div>
  <div class="m6-component-arrow">→</div>
  <div class="m6-component-card m6-comp-authz"><div class="m6-comp-icon">🚦</div><div class="m6-comp-title">Authorization</div><div class="m6-comp-desc">Endpoint metadata, policies, requirements, and handlers. Decides whether this principal may reach the endpoint or perform the resource operation.</div></div>
  <div class="m6-component-arrow">→</div>
  <div class="m6-component-card m6-comp-app"><div class="m6-comp-icon">🧩</div><div class="m6-comp-title">Application</div><div class="m6-comp-desc">Controller or service. Loads the book, compares stored ownership with the trusted principal, applies business rules, and chooses the response.</div></div>
  <div class="m6-component-arrow">→</div>
  <div class="m6-component-card m6-comp-data"><div class="m6-comp-icon">🗄️</div><div class="m6-comp-title">Data store</div><div class="m6-comp-desc">Stores the actual owner relationship. The application must query it; the URL or request body cannot substitute for it.</div></div>
</div>
<div class="m6-note">Identity management sits beside this flow: it creates and verifies users during registration and login, while the API's authentication scheme validates the credential attached to later requests.</div></div>`
      },
      {
        type: "h2",
        html: "Trace it yourself"
      },
      {
        type: "p",
        html: `Use this exercise to check the mental model before touching configuration. For each request, name the first component that rejects it and the decision that has not yet been made.`
      },
      {
        type: "html",
        html: `<div class="exercise-card"><div class="exercise-header"><div><span class="exercise-badge exercise">Applied trace</span><span style="font-size:0.8rem;color:var(--text-muted);">No multiple choice — reason it through</span></div><span class="score-chip">Exercise</span></div><div class="exercise-body">
<p class="exercise-prompt">Request: Alice sends a token for <code>raff-api</code> from the trusted issuer. Its signature is valid, it is not expired, and it contains <code>role=Reader</code>. She calls <code>DELETE /api/books/42</code>. Book 42 belongs to Bob.</p>
<ol>
<li>Which component validates the signature and issuer?</li>
<li>What identity does the application trust after authentication?</li>
<li>Does <code>[Authorize]</code> alone know that Book 42 belongs to Bob?</li>
<li>Which status would you return, and what would you write in the response contract to justify it?</li>
</ol>
<details class="hint-details"><summary>Check your reasoning</summary><div class="hint-body"><p>1. The JWT bearer handler, configured with the expected authority and validation parameters. 2. Alice's principal, built from validated claims. 3. No — <code>[Authorize]</code> sees endpoint metadata and the principal, not an arbitrary database row. 4. A well-designed API might return 404 to avoid disclosing Bob's book, or 403 if it deliberately exposes that the resource exists. The important part is that ownership was checked against stored data, not inferred from authentication or the URL.</p></div></details>
</div></div>`
      },
      {
        type: "h2",
        html: "Interactive: end-to-end request simulator"
      },
      {
        type: "p",
        html: `Configure the caller, the credential, the endpoint, and the owner of the selected book. The simulator shows the conventional decision at each stage. It models a teaching configuration, not every possible application pipeline.`
      },
      {
        type: "html",
        html: `<div class="simulator-widget" data-widget="request-sim" id="w-request-sim"><div class="simulator-header"><div class="simulator-title">🔐 Request simulator</div><div class="m4-mode-note" style="margin-top:0;">Change one input at a time and predict the outcome before reading it.</div></div><div class="simulator-body"></div></div>`
      },
      {
        type: "callout",
        kind: "success",
        title: "✅ Lesson completion criterion",
        html: `You should now be able to trace a protected request from the HTTP request to the response and name the component responsible for each decision. If you cannot yet explain why a valid Alice cannot delete Bob's book, return to the sequence and component diagrams before continuing.`
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
        html: `<div class="refs-block"><div class="refs-title">Official references</div><ul><li><a href="https://learn.microsoft.com/en-us/aspnet/core/security/authentication/?view=aspnetcore-10.0" target="_blank" rel="noopener noreferrer">Authentication overview in ASP.NET Core ↗</a></li><li><a href="https://learn.microsoft.com/en-us/aspnet/core/security/authorization/?view=aspnetcore-10.0" target="_blank" rel="noopener noreferrer">Authorization overview in ASP.NET Core ↗</a></li><li><a href="https://learn.microsoft.com/en-us/aspnet/core/security/authorization/resource-based?view=aspnetcore-10.0" target="_blank" rel="noopener noreferrer">Resource-based authorization ↗</a></li></ul></div>`
      },
      {
        type: "html",
        html: `<div class="lesson-footer-nav"><span></span><button class="btn-complete-lesson" type="button" data-lesson="lesson-1">Mark Lesson 1 Complete ✓</button><button class="btn-primary" type="button" data-nav-target="lesson-2">Next: Users, passwords, and Identity →</button></div>`
      }
    ]
  },

  {
    id: "lesson-2",
    badge: "L2",
    nav: "Users, Identity, and login",
    content: [
      {
        type: "html",
        html: `<span class="lesson-pill">L2 · Lesson</span><h1 class="lesson-h1">Users, Passwords, ASP.NET Core Identity, and Login</h1><p class="lesson-lead">Registration and login are two different flows. One creates a user; the other verifies credentials and establishes a way for later requests to be authenticated. This lesson separates the responsibilities before showing how Raff might adopt Identity.</p><div class="lesson-meta-bar"><span>🧠 5 knowledge checks</span><span>🔑 Password-hashing boundaries</span><span>🍪 Cookie vs token session design</span></div>`
      },
      {
        type: "h2",
        html: "Part A — What an identity system must do"
      },
      {
        type: "p",
        html: `A book API does not need a full identity platform to start, but any system that supports accounts eventually needs answers to the same questions:`
      },
      {
        type: "list",
        ordered: false,
        items: [
          `<strong>Represent users.</strong> Store a stable user identity and the fields the application needs, such as a display name, status, and contact information.`,
          `<strong>Store account information.</strong> Persist users through a chosen store, with constraints that protect invariants such as unique normalized user names.`,
          `<strong>Verify credentials.</strong> Check submitted credentials without ever storing a plaintext password.`,
          `<strong>Support account management.</strong> Create, update, disable, lock, and manage users without scattering those rules across controllers.`,
          `<strong>Manage roles and claims where configured.</strong> Associate coarse-grained groups and finer-grained statements with a user when the design requires them.`,
          `<strong>Support security operations.</strong> Password reset, email confirmation, two-factor flows, lockout, and auditing are part of the identity system's responsibilities if the product uses them.`
        ]
      },
      {
        type: "p",
        html: `ASP.NET Core Identity is a framework that supplies many of these capabilities. It is best understood as a <strong>set of collaborating services and contracts</strong>, not as a single object:`
      },
      {
        type: "html",
        html: `<div class="table-wrapper"><table><thead><tr><th>Identity piece</th><th>Responsibility</th><th>Connection to the rest of Raff</th></tr></thead><tbody>
<tr><td><code>IdentityUser</code> or an application user type</td><td>The user entity: identifiers, normalized user name, password hash, security stamp, and optional application fields.</td><td>If Raff derives a custom type, it can hold application-specific properties, but the Identity base fields still need their persistence schema.</td></tr>
<tr><td><code>UserManager&lt;TUser&gt;</code></td><td>Creates and validates users, manages passwords through the configured hasher, and persists changes through the store.</td><td>The registration flow calls this rather than hashing or saving a password directly.</td></tr>
<tr><td><code>SignInManager&lt;TUser&gt;</code></td><td>Coordinates sign-in checks such as password verification and account status, then asks a scheme to establish the sign-in.</td><td>The login flow uses this for credential verification; it does not by itself choose your API token format.</td></tr>
<tr><td>User store</td><td>Loads and saves users and related records. An EF Core store is common.</td><td>Raff's existing <code>BooksContext</code> could be involved only after deliberate model and migration work.</td></tr>
<tr><td>Password hasher</td><td>Produces and verifies a password-specific, salted hash using a deliberately expensive algorithm.</td><td>Application code should never invent its own password hash or store plaintext passwords.</td></tr>
<tr><td>EF Core and the database</td><td>Persist users, roles, claims, and tokens when the EF Core store is chosen.</td><td>Identity's tables are not automatically created in an existing schema; migrations must be planned.</td></tr>
</tbody></table></div>`
      },
      {
        type: "callout",
        kind: "warning",
        title: "Identity is not a JWT, a table, or an authorization policy",
        html: `Identity can help you create a user and verify a password. It does not automatically make <code>GET /api/books/42</code> secure, issue a standard JWT, or decide that Alice owns Book 42. Those are separate concerns: authentication scheme, authorization policy, and application-level resource checks.`
      },
      {
        type: "h2",
        html: "Part B — Registration, step by step"
      },
      {
        type: "p",
        html: `Registration creates a new account. It is not the same as signing in, even when an application automatically signs the user in afterward.`
      },
      {
        type: "html",
        html: `<div class="m6-flow">
  <div class="m6-flow-step"><span class="m6-flow-num">1</span><div><div class="m6-flow-title">Client submits registration data</div><div class="m6-flow-desc">For example an email address, display name, and password. The password travels over HTTPS and must not be logged.</div></div></div>
  <div class="m6-flow-step"><span class="m6-flow-num">2</span><div><div class="m6-flow-title">ASP.NET Core binds and validates the request</div><div class="m6-flow-desc">Model binding turns JSON or form data into a request model. Data annotations and custom validation reject missing or malformed fields before the action runs.</div></div></div>
  <div class="m6-flow-step"><span class="m6-flow-num">3</span><div><div class="m6-flow-title">The application applies account and policy checks</div><div class="m6-flow-desc">Is this email allowed? Is the display name acceptable? Does the application require email confirmation? These are product rules, not password hashing.</div></div></div>
  <div class="m6-flow-step"><span class="m6-flow-num">4</span><div><div class="m6-flow-title">The user-management component validates Identity rules</div><div class="m6-flow-desc">Identity validates the user through its configured validators and password policy. Failures are returned as structured results, not ignored.</div></div></div>
  <div class="m6-flow-step"><span class="m6-flow-num">5</span><div><div class="m6-flow-title">The password is processed by the configured hasher</div><div class="m6-flow-desc">The plaintext password is transformed into a verifier and stored in the password-hash field. The application does not build its own cryptographic scheme.</div></div></div>
  <div class="m6-flow-step"><span class="m6-flow-num">6</span><div><div class="m6-flow-title">The user is persisted through the store</div><div class="m6-flow-desc">The EF Core store writes the user record. Unique indexes and normalized fields help prevent duplicate accounts under races.</div></div></div>
  <div class="m6-flow-step"><span class="m6-flow-num">7</span><div><div class="m6-flow-title">The application returns an appropriate response</div><div class="m6-flow-desc">Created, validation failure, conflict, or another contract-specific result. Do not return the password hash or sensitive account internals.</div></div></div>
</div>`
      },
      {
        type: "p",
        html: `A realistic registration action has an important shape: validate the <em>request</em>, ask the identity service to perform the <em>account operation</em>, then translate the outcome. The controller must not decide how to hash a password.`
      },
      {
        type: "code",
        lang: "cs",
        filename: "Registration flow — illustrative, Identity-shaped",
        pill: "Illustrative",
        code: `[HttpPost("/api/account/register")]
public async Task<IActionResult> Register(
    RegisterRequest request,
    CancellationToken cancellationToken)
{
    var existing = await _users.FindByEmailAsync(request.Email);
    if (existing is not null)
        return Conflict(new ProblemDetails
        {
            Title = "An account with that email already exists."
        });

    var user = new RaffUser
    {
        UserName = request.Email,
        Email = request.Email,
        DisplayName = request.DisplayName
    };

    var result = await _users.CreateAsync(user, request.Password);

    if (!result.Succeeded)
        return ValidationProblem(ToProblemDetails(result));

    return Created($"/api/users/{user.Id}", new
    {
        user.Id,
        user.DisplayName
    });
}`
      },
      {
        type: "p",
        html: `The line <code>_users.CreateAsync(user, request.Password)</code> is the boundary. Inside Identity, the user manager validates the user, applies the configured password policy, calls the password hasher, and persists through the store. The password itself should not appear in logs, responses, or a custom database column. The <code>FindByEmailAsync</code> pre-check gives a friendly conflict response, but a unique database constraint remains the concurrency backstop.`
      },
      {
        type: "callout",
        kind: "danger",
        title: "Never store or invent password security in application code",
        html: `Do not store plaintext passwords. Do not build a “simple SHA-256” scheme, do not encrypt passwords so they can be decrypted, and do not copy a hashing recipe from an unrelated tutorial. Use Identity's password facilities or another reviewed password-hashing implementation appropriate to your framework.`
      },
      {
        type: "h2",
        html: "Part C — Login, step by step"
      },
      {
        type: "p",
        html: `Login verifies credentials and then establishes an authenticated context for later requests. Those are related but distinct steps.`
      },
      {
        type: "html",
        html: `<div class="m6-flow">
  <div class="m6-flow-step"><span class="m6-flow-num">1</span><div><div class="m6-flow-title">Credentials are submitted</div><div class="m6-flow-desc">Email/user name and password, typically over HTTPS. The API must not echo the password back.</div></div></div>
  <div class="m6-flow-step"><span class="m6-flow-num">2</span><div><div class="m6-flow-title">The identity service verifies the password</div><div class="m6-flow-desc">A password verifier is recomputed and compared in a way designed to resist offline guessing. A wrong password produces a controlled failure, not a detailed account-existence oracle.</div></div></div>
  <div class="m6-flow-step"><span class="m6-flow-num">3</span><div><div class="m6-flow-title">Account status and sign-in policies are evaluated</div><div class="m6-flow-desc">Lockout, email confirmation, two-factor requirements, and disabled-account rules can affect whether sign-in is allowed.</div></div></div>
  <div class="m6-flow-step"><span class="m6-flow-num">4</span><div><div class="m6-flow-title">A successful check still does not authenticate future requests by itself</div><div class="m6-flow-desc">The server must establish a session or issue a credential. The password is not sent on every later API request.</div></div></div>
  <div class="m6-flow-step"><span class="m6-flow-num">5</span><div><div class="m6-flow-title">The configured scheme establishes the credential</div><div class="m6-flow-desc">Cookie authentication creates a protected cookie. A token-based API issues an access token (and possibly a refresh token). Which one is appropriate depends on the client and threat model.</div></div></div>
</div>`
      },
      {
        type: "code",
        lang: "cs",
        filename: "Login verification — illustrative Identity-shaped flow",
        pill: "Illustrative",
        code: `[HttpPost("/api/account/login")]
public async Task<IActionResult> Login(
    LoginRequest request,
    CancellationToken cancellationToken)
{
    var user = await _users.FindByEmailAsync(request.Email);
    if (user is null)
        return Unauthorized();

    var result = await _signIn.CheckPasswordSignInAsync(
        user,
        request.Password,
        lockoutOnFailure: true);

    if (!result.Succeeded)
        return Unauthorized();

    // The next step depends on the chosen scheme:
    // cookie sign-in, Identity bearer token, or a token from
    // a separate authorization server.
    return Ok(new { message = "Credentials accepted." });
}`
      },
      {
        type: "p",
        html: `The final comment is the important part. <code>CheckPasswordSignInAsync</code> verifies credentials and account policy; it does not by itself explain how the next request will be authenticated. If Raff chooses cookies, the login endpoint must sign the cookie in. If Raff chooses an external identity provider, the login flow may redirect the client through an authorization code flow instead of collecting a password itself. If Raff chooses Identity API bearer tokens, it must use the matching Identity token services and middleware — not a generic JWT validator by accident.`
      },
      {
        type: "html",
        html: `<div class="table-wrapper"><table><thead><tr><th>Aspect</th><th>Cookie-based authentication</th><th>Token-based API authentication</th></tr></thead><tbody>
<tr><td>Where the credential lives</td><td>A browser-managed cookie, normally HttpOnly and Secure</td><td>A token stored by the client and sent explicitly in the Authorization header</td></tr>
<tr><td>Who attaches it</td><td>The browser, automatically for matching requests</td><td>The client code or library</td></tr>
<tr><td>Common fit</td><td>A same-site web application with a browser session</td><td>Native apps, SPAs using an API, service-to-service calls, distributed systems</td></tr>
<tr><td>Key security concerns</td><td>CSRF, cookie scope, SameSite, secure transport, session revocation</td><td>Token storage, XSS exposure, token theft, revocation, audience validation</td></tr>
<tr><td>What a successful login must produce</td><td>A valid authentication cookie</td><td>An access token that the API's scheme accepts</td></tr>
</tbody></table></div>`
      },
      {
        type: "h2",
        html: "Part D — Identity in Raff: a design decision, not an automatic migration"
      },
      {
        type: "p",
        html: `Raff currently uses an application-specific user concept and a <code>BooksContext</code>. The curriculum does not assume that the existing <code>User</code> entity is an <code>IdentityUser</code>, that Identity tables already exist, or that a password hash column is present. Before adopting Identity, inspect the actual model and migrations.`
      },
      {
        type: "p",
        html: `There are two broad choices:`
      },
      {
        type: "html",
        html: `<div class="m6-two-col">
<div class="m6-concept-card"><div class="m6-concept-kicker">Option A</div><h3>Retain a custom user system</h3><p>Keep the existing user entity and implement authentication deliberately: a reviewed password hashing library, a chosen authentication scheme, account-management rules, and careful migration history.</p><p style="margin-bottom:0;"><strong>Trade-off:</strong> full control and no schema churn from Identity, but you own more security-sensitive code and account lifecycle behavior.</p></div>
<div class="m6-concept-card"><div class="m6-concept-kicker">Option B</div><h3>Adopt ASP.NET Core Identity</h3><p>Use Identity's user type or derive from it, integrate its store with the existing context, add its schema through migrations, and use <code>UserManager</code> and <code>SignInManager</code> in the authentication flow.</p><p style="margin-bottom:0;"><strong>Trade-off:</strong> mature user and password management, but deliberate model, context, migration, and endpoint work. It is not a drop-in attribute.</p></div>
</div>`
      },
      {
        type: "p",
        html: `If Raff adopts Identity, the work includes: deciding whether <code>RaffUser : IdentityUser</code> or a separate identity entity is appropriate; updating the context's inheritance and configuration; creating and reviewing migrations; planning how existing users are migrated or whether the application starts fresh; and aligning endpoints with the selected sign-in scheme. None of that is done by adding a package reference.`
      },
      {
        type: "callout",
        kind: "info",
        title: "Identity does not remove application authorization",
        html: `Even after Identity is configured, Alice deleting Bob's book remains an ownership problem. Identity helps you know that the caller is Alice; your application still has to load Book 42 and compare its owner with Alice's stable identifier.`
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
        html: `<div class="refs-block"><div class="refs-title">Official references</div><ul><li><a href="https://learn.microsoft.com/en-us/aspnet/core/security/authentication/identity?view=aspnetcore-10.0" target="_blank" rel="noopener noreferrer">Introduction to Identity on ASP.NET Core ↗</a></li><li><a href="https://learn.microsoft.com/en-us/aspnet/core/security/authentication/identity-api-authorization?view=aspnetcore-10.0" target="_blank" rel="noopener noreferrer">Use Identity to secure a Web API backend ↗</a></li><li><a href="https://learn.microsoft.com/en-us/aspnet/core/security/authentication/?view=aspnetcore-10.0" target="_blank" rel="noopener noreferrer">ASP.NET Core authentication overview ↗</a></li></ul></div>`
      },
      {
        type: "html",
        html: `<div class="lesson-footer-nav"><button class="btn-secondary" type="button" data-nav-target="lesson-1">← The mental model</button><button class="btn-complete-lesson" type="button" data-lesson="lesson-2">Mark Lesson 2 Complete ✓</button><button class="btn-primary" type="button" data-nav-target="lesson-3">Next: Tokens and standards →</button></div>`
      }
    ]
  },

  {
    id: "lesson-3",
    badge: "L3",
    nav: "Cookies, tokens, JWT, OAuth/OIDC",
    content: [
      {
        type: "html",
        html: `<span class="lesson-pill">L3 · Lesson</span><h1 class="lesson-h1">Cookies, Bearer Tokens, JWT, OAuth 2.0, and OpenID Connect</h1><p class="lesson-lead">These terms are often used as if they were synonyms. They are not. A cookie is a transport mechanism, a bearer token is a credential, JWT is a token format, and OAuth 2.0 and OpenID Connect are standards. Keeping those categories separate prevents most token confusion.</p><div class="lesson-meta-bar"><span>🧠 5 knowledge checks</span><span>🔍 JWT anatomy explorer</span><span>🧭 Standards diagram</span></div>`
      },
      {
        type: "h2",
        html: "Part A — Cookies and bearer tokens"
      },
      {
        type: "p",
        html: `A <strong>cookie</strong> is a browser-managed piece of state. The server can set it with attributes such as <code>HttpOnly</code>, <code>Secure</code>, and <code>SameSite</code>; the browser then sends it automatically to matching URLs. A <strong>bearer token</strong> is a credential that grants access to whoever presents it. In an API, it is commonly attached explicitly:`
      },
      {
        type: "code",
        lang: "http",
        filename: "Bearer credential in an API request",
        code: `GET /api/books/42 HTTP/1.1
Host: api.raff.example
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
Accept: application/json`
      },
      {
        type: "html",
        html: `<div class="table-wrapper"><table><thead><tr><th>Concern</th><th>Cookie authentication</th><th>Bearer-token authentication</th></tr></thead><tbody>
<tr><td>Browser behavior</td><td>Attaches the cookie automatically to matching requests</td><td>Does not attach an Authorization header automatically; client code must do it</td></tr>
<tr><td>Primary risk</td><td>CSRF when cookies are sent automatically; XSS can still affect the page</td><td>Token theft; any holder can use it; XSS can expose tokens stored in JavaScript-accessible storage</td></tr>
<tr><td>Revocation</td><td>Server-side session or security stamp can invalidate the cookie</td><td>Short lifetimes and refresh-token rotation reduce exposure; immediate revocation is harder for self-contained tokens</td></tr>
<tr><td>HTTPS</td><td>Essential; Secure cookies only travel over TLS</td><td>Essential; a bearer token observed in transit is a stolen credential</td></tr>
<tr><td>Logging</td><td>Do not log cookie values</td><td>Do not log Authorization headers or token strings</td></tr>
</tbody></table></div>`
      },
      {
        type: "callout",
        kind: "warning",
        title: "Do not claim that a JWT is automatically safer than a cookie",
        html: `They have different threat models. A signed JWT still grants access to whoever holds it. A cookie can be protected from JavaScript with <code>HttpOnly</code> and from cross-site requests with <code>SameSite</code>, but it needs CSRF defenses. The correct choice depends on the client, hosting model, and how much state the server is willing to keep.`
      },
      {
        type: "h2",
        html: "Part B — What a JWT actually is"
      },
      {
        type: "p",
        html: `A JWT is a compact string with three segments separated by dots:`
      },
      {
        type: "html",
        html: `<div class="m6-token-anatomy"><span class="m6-token-seg m6-token-header">header</span><span class="m6-token-dot">.</span><span class="m6-token-seg m6-token-payload">payload</span><span class="m6-token-dot">.</span><span class="m6-token-seg m6-token-signature">signature</span></div>
<div class="m6-token-caption">Each segment is Base64URL-encoded. The first two decode to JSON; the third is a cryptographic signature over the first two segments.</div>`
      },
      {
        type: "html",
        html: `<div class="m6-three-col">
<div class="m6-concept-card"><div class="m6-concept-kicker">Header</div><h3>How the token is described</h3><p>A typical header names the token type and signing algorithm:</p><pre class="m6-inline-json">{"alg":"RS256","typ":"JWT","kid":"raff-auth-2026-01"}</pre><p style="margin-bottom:0;">The <code>alg</code> value tells the validator what algorithm the issuer claims to have used. The validator must still enforce an acceptable algorithm and key; it must not let an attacker choose a weaker one.</p></div>
<div class="m6-concept-card"><div class="m6-concept-kicker">Payload</div><h3>What the token claims</h3><p>Claims may include issuer, audience, subject, roles, and timestamps:</p><pre class="m6-inline-json">{"iss":"https://identity.raff.example","aud":"raff-api","sub":"alice-123","role":"Reader","exp":1760003600}</pre><p style="margin-bottom:0;">Anyone holding the token can decode this. It is not encrypted by default.</p></div>
<div class="m6-concept-card"><div class="m6-concept-kicker">Signature</div><h3>What makes it tamper-evident</h3><p>The issuer signs the encoded header and payload. A validator uses a trusted key to check that the bytes were not altered.</p><p style="margin-bottom:0;">If the signature is not actually validated, the signature segment is just characters. Reading the payload proves nothing about authenticity.</p></div>
</div>`
      },
      {
        type: "p",
        html: `Base64URL is <strong>encoding</strong>, not encryption. It exists so the token can travel safely in URLs and headers; it is not a secrecy mechanism. A signed JWT is typically readable by anyone who possesses it. Confidentiality would require encryption (for example a JWE), which is a different design decision; a normal signed JWT does not provide it merely by being a JWT.`
      },
      {
        type: "p",
        html: `Suppose an attacker intercepts Alice's fictional token. What can they learn? They can read the header and payload: issuer, audience, subject, role, and expiration. What happens if they change <code>role</code> from <code>Reader</code> to <code>Administrator</code>? The payload changes, so the original signature no longer matches the original bytes. A correctly configured validator rejects the modified token at signature validation. But this protection depends on the validator actually checking the signature with the correct key and algorithm. Decoding the token and trusting the modified payload would be a critical mistake.`
      },
      {
        type: "html",
        html: `<div class="callout callout-danger"><div class="callout-title">The central distinction: decoding ≠ validation</div><p><strong>Decoding</strong> turns Base64URL text into readable JSON. Anyone can do it with no key. <strong>Validation</strong> answers whether the token is acceptable to this API: is the signature genuine under a trusted key, was it issued by the expected authority, is it intended for this audience, and is it valid now?</p><p style="margin-bottom:0;">A token that decodes successfully may still be forged, expired, intended for another service, or signed by the wrong issuer. Never authorize based on decoded claims alone.</p></div>`
      },
      {
        type: "h2",
        html: "Interactive: JWT anatomy explorer"
      },
      {
        type: "p",
        html: `The token in this explorer is fictional and generated for teaching. Inspect each segment, then tamper with the payload and observe the difference between decoding and validation. Never paste a real access token into a learning tool.`
      },
      {
        type: "html",
        html: `<div class="simulator-widget" data-widget="jwt-explorer" id="w-jwt-explorer"><div class="simulator-header"><div class="simulator-title">🔍 JWT anatomy explorer</div><div class="m4-mode-note" style="margin-top:0;">Select a segment, inspect its claims, and turn tampering on. The token is fabricated; no real credentials are involved.</div></div><div class="simulator-body"></div></div>`
      },
      {
        type: "h2",
        html: "Part C — OAuth 2.0 and OpenID Connect"
      },
      {
        type: "p",
        html: `OAuth 2.0 is an <strong>authorization framework</strong> for obtaining access tokens for protected resources. It defines roles and flows, not one universal token format. OpenID Connect (OIDC) adds an <strong>identity layer</strong> on top of OAuth 2.0, allowing a client to learn who the user is and to receive an ID token.`
      },
      {
        type: "html",
        html: `<div class="diagram-container"><div class="diagram-title">Conceptual flow — from sign-in to an API call</div>
<div class="m6-oauth-flow">
  <div class="m6-oauth-node"><div class="m6-oauth-icon">🧑</div><div class="m6-oauth-title">Alice</div><div class="m6-oauth-desc">The resource owner. She wants the client to access her Raff data.</div></div>
  <div class="m6-oauth-arrow">→</div>
  <div class="m6-oauth-node"><div class="m6-oauth-icon">📱</div><div class="m6-oauth-title">Client</div><div class="m6-oauth-desc">The application requesting access. It must be registered with the authorization server.</div></div>
  <div class="m6-oauth-arrow">→</div>
  <div class="m6-oauth-node m6-oauth-accent"><div class="m6-oauth-icon">🏛️</div><div class="m6-oauth-title">Identity provider / authorization server</div><div class="m6-oauth-desc">Authenticates Alice, applies consent and policy, and issues tokens.</div></div>
  <div class="m6-oauth-arrow">→</div>
  <div class="m6-oauth-node"><div class="m6-oauth-icon">🎟️</div><div class="m6-oauth-title">Access token</div><div class="m6-oauth-desc">Intended for the API. It may be a JWT or an opaque token, depending on the system.</div></div>
  <div class="m6-oauth-arrow">→</div>
  <div class="m6-oauth-node m6-oauth-accent"><div class="m6-oauth-icon">📚</div><div class="m6-oauth-title">Raff API</div><div class="m6-oauth-desc">Validates the token's signature/issuer/audience/lifetime and applies its own authorization rules.</div></div>
</div>
<div class="m6-note">The token issuer and the API have different jobs. The issuer authenticates Alice and mints tokens; the API validates the token and decides what Alice may do with Raff resources.</div></div>`
      },
      {
        type: "html",
        html: `<div class="table-wrapper"><table><thead><tr><th>Participant or artifact</th><th>Responsibility</th><th>Common misunderstanding</th></tr></thead><tbody>
<tr><td>Resource owner</td><td>The user who can grant access to their resources</td><td>The API is not the resource owner just because it stores the data</td></tr>
<tr><td>Client</td><td>The application requesting access; it has its own registration and constraints</td><td>A client is not the same thing as the user</td></tr>
<tr><td>Authorization server / identity provider</td><td>Authenticates the user, applies consent/policy, issues tokens, publishes metadata and keys</td><td>It does not enforce every application permission inside Raff</td></tr>
<tr><td>Access token</td><td>A credential for a protected resource; its audience and scope constrain use</td><td>It is not necessarily a JWT</td></tr>
<tr><td>ID token</td><td>An OIDC token that tells the client about the authenticated user</td><td>It is not automatically the right credential for an API</td></tr>
<tr><td>Refresh token</td><td>Obtains new access tokens without repeating interactive sign-in</td><td>It is not a replacement for an access token in API requests</td></tr>
<tr><td>Scopes</td><td>Requested, granted permissions or access categories in OAuth</td><td>A scope is not automatically a role or a guarantee that the API will allow a specific object operation</td></tr>
</tbody></table></div>`
      },
      {
        type: "p",
        html: `A JWT and OAuth 2.0 are not competing alternatives. A JWT can be the format of an OAuth access token, but OAuth does not require JWTs; opaque tokens are common. An API validates the access token according to the issuer's metadata and the API's configuration. For a standard JWT access token, the API checks the expected issuer, audience, signature, and lifetime. It then applies its own authorization rules.`
      },
      {
        type: "callout",
        kind: "info",
        title: "Issuer and API are not the same job",
        html: `Alice signs in at an identity provider. That provider issues a token for the Raff API. The Raff API does not authenticate Alice's password; it validates the token the provider issued. The API still decides whether Alice may delete Book 42.`
      },
      {
        type: "h2",
        html: "Part D — The ASP.NET Core Identity token distinction"
      },
      {
        type: "p",
        html: `ASP.NET Core Identity API endpoints can provide bearer-token authentication for clients. Those tokens are <strong>proprietary Identity tokens</strong>, not standard JWTs. The token is backed by Identity's own infrastructure, and the matching authentication configuration must be used. Calling <code>MapIdentityApi&lt;TUser&gt;()</code> is not a way to “turn on JWT issuance.”`
      },
      {
        type: "html",
        html: `<div class="table-wrapper"><table><thead><tr><th>Option</th><th>Intended use</th><th>Token format</th><th>Client considerations</th><th>Limitations</th></tr></thead><tbody>
<tr><td>Cookie authentication</td><td>Browser session for a same-site web app</td><td>Protected authentication cookie</td><td>Browser manages it automatically; needs CSRF protection and cookie attributes</td><td>Less natural for native clients and cross-origin APIs</td></tr>
<tr><td>Identity API bearer tokens</td><td>Identity-backed API endpoints in the same application</td><td>Proprietary Identity bearer token, not a JWT</td><td>Client stores and sends the Identity token; refresh flow is part of Identity's endpoints</td><td>Not validated by JWT bearer middleware; token contracts are Identity-specific</td></tr>
<tr><td>Standard JWT bearer authentication</td><td>API accepting tokens from a configured issuer</td><td>JWT signed by the issuer; may be opaque in other OAuth designs</td><td>Client obtains a token from the issuer and sends it as <code>Authorization: Bearer</code></td><td>Requires correct authority, audience, signing keys, validation rules, and issuer trust</td></tr>
</tbody></table></div>`
      },
      {
        type: "callout",
        kind: "success",
        title: "✅ Lesson completion criterion",
        html: `You should be able to say which kind of credential a request carries, what that credential is for, who issued it, and which component validates it. You should also be able to explain why decoding a JWT is not the same as accepting it.`
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
        html: `<div class="refs-block"><div class="refs-title">Official references</div><ul><li><a href="https://learn.microsoft.com/en-us/aspnet/core/security/authentication/configure-jwt-bearer-authentication?view=aspnetcore-10.0" target="_blank" rel="noopener noreferrer">Configure JWT bearer authentication in ASP.NET Core ↗</a></li><li><a href="https://learn.microsoft.com/en-us/aspnet/core/security/authentication/identity-api-authorization?view=aspnetcore-10.0" target="_blank" rel="noopener noreferrer">Identity API endpoints and bearer tokens ↗</a></li><li><a href="https://learn.microsoft.com/en-us/aspnet/core/security/authentication/?view=aspnetcore-10.0" target="_blank" rel="noopener noreferrer">Authentication overview ↗</a></li></ul></div>`
      },
      {
        type: "html",
        html: `<div class="lesson-footer-nav"><button class="btn-secondary" type="button" data-nav-target="lesson-2">← Identity and login</button><button class="btn-complete-lesson" type="button" data-lesson="lesson-3">Mark Lesson 3 Complete ✓</button><button class="btn-primary" type="button" data-nav-target="lesson-4">Next: Configuring JWT bearer authentication →</button></div>`
      }
    ]
  },
  {
    id: "lesson-4",
    badge: "L4",
    nav: "JWT bearer configuration",
    content: [
      {
        type: "html",
        html: `<span class="lesson-pill">L4 · Lesson</span><h1 class="lesson-h1">JWT Bearer Authentication, with Every Configuration Explained</h1><p class="lesson-lead">An API that accepts a bearer token must establish that the token is acceptable before trusting any claim inside it. This lesson explains each validation check, the roles of authority and audience, middleware ordering, and a systematic debugging process.</p><div class="lesson-meta-bar"><span>🧠 5 knowledge checks</span><span>🧪 Validation decision simulator</span><span>🛠️ Failure decision tree</span></div>`
      },
      {
        type: "h2",
        html: "Part A — Why an API validates tokens"
      },
      {
        type: "p",
        html: `A bearer token is presented by the caller. The API cannot assume the caller created it honestly. Before turning its claims into a trusted <code>ClaimsPrincipal</code>, the JWT bearer handler applies the validation rules in its configuration. Each check prevents a different failure.`
      },
      {
        type: "html",
        html: `<div class="table-wrapper"><table><thead><tr><th>Check</th><th>Question</th><th>Problem it prevents</th></tr></thead><tbody>
<tr><td><strong>Format and handling</strong></td><td>Can this token be parsed and processed by the selected scheme?</td><td>Malformed or wrong-kind credentials being treated as valid; an Identity token being handed to a JWT validator, for example</td></tr>
<tr><td><strong>Signature</strong></td><td>Was the token signed with a key trusted by this API, and were its bytes altered?</td><td>Forged tokens and payload tampering</td></tr>
<tr><td><strong>Issuer</strong></td><td>Was it issued by the expected authority?</td><td>A token signed by a different but cryptographically valid issuer</td></tr>
<tr><td><strong>Audience</strong></td><td>Was it intended for this API?</td><td>Replay of a token minted for another API</td></tr>
<tr><td><strong>Lifetime</strong></td><td>Is it valid now, including not-before and expiry rules?</td><td>Using old or not-yet-valid tokens outside their intended window</td></tr>
<tr><td><strong>Algorithm and key constraints</strong></td><td>Is the signing algorithm acceptable, and is the selected key appropriate?</td><td>Algorithm-substitution and key-confusion attacks when validation is configured carelessly</td></tr>
</tbody></table></div>`
      },
      {
        type: "p",
        html: `These checks are not interchangeable. A token can be correctly signed by an authority the API does not trust; it can be issued by the right authority but for another API; it can be genuine but expired. Each scenario must fail for its own reason.`
      },
      {
        type: "html",
        html: `<div class="m6-three-col">
<div class="m6-concept-card"><div class="m6-concept-kicker">Scenario 1</div><h3>Correct signature, wrong issuer</h3><p>Another identity provider signs a token with a valid key of its own. The signature may verify against that provider's key, but the API's trusted authority is different.</p><p style="margin-bottom:0;"><strong>Rejected by:</strong> issuer validation and the authority's key set.</p></div>
<div class="m6-concept-card"><div class="m6-concept-kicker">Scenario 2</div><h3>Genuine but expired</h3><p>The token was legitimately issued by the right authority and signed correctly, but its <code>exp</code> time has passed.</p><p style="margin-bottom:0;"><strong>Rejected by:</strong> lifetime validation.</p></div>
<div class="m6-concept-card"><div class="m6-concept-kicker">Scenario 3</div><h3>Intended for another API</h3><p>The token is genuine and current, but its audience is <code>reports-api</code>, not <code>raff-api</code>.</p><p style="margin-bottom:0;"><strong>Rejected by:</strong> audience validation.</p></div>
</div>`
      },
      {
        type: "h2",
        html: "Part B — Authentication scheme registration"
      },
      {
        type: "p",
        html: `The following is a compact example for an application that trusts a suitably configured authority and expects tokens addressed to a specific audience. It is a starting point, not a universal recipe for every issuer.`
      },
      {
        type: "code",
        lang: "cs",
        filename: "Program.cs — JWT bearer registration",
        pill: "Illustrative configuration",
        code: `builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority =
            builder.Configuration["Authentication:Authority"];

        options.Audience =
            builder.Configuration["Authentication:Audience"];
    });

builder.Services.AddAuthorization();`
      },
      {
        type: "list",
        ordered: true,
        items: [
          `<strong><code>AddAuthentication(JwtBearerDefaults.AuthenticationScheme)</code></strong> registers the authentication services and makes JWT bearer the default scheme. The default scheme is the one used when middleware or an endpoint does not explicitly request a different scheme. Without a default scheme, code that tries to authenticate without naming a scheme can fail.`,
          `<strong><code>AddJwtBearer(...)</code></strong> registers the JWT bearer authentication scheme and its handler, and configures how tokens are read and validated. It is not the same as an authorization policy; it happens earlier.`,
          `<strong><code>options.Authority</code></strong> identifies the trusted token issuer. In a typical OpenID Connect setup, the handler retrieves discovery metadata from the authority, including the issuer and the JSON Web Key Set (JWKS) used to verify signatures. The authority must match the token's actual issuer and be the authority you intend to trust.`,
          `<strong><code>options.Audience</code></strong> states which resource the token must be intended for. A token minted for another API may be genuine but must not be accepted here.`,
          `<strong><code>AddAuthorization()</code></strong> registers the authorization services used by authorization middleware, policies, and <code>IAuthorizationService</code>. It does not authenticate requests by itself.`
        ]
      },
      {
        type: "callout",
        kind: "warning",
        title: "These two values are not sufficient for every token design",
        html: `Some issuers use different metadata, token types, signing arrangements, or audience semantics. Some APIs accept tokens from multiple issuers. Some need additional validation parameters or custom handling. The example assumes conventional JWT access tokens from a trusted authority, not Identity API proprietary bearer tokens and not every possible OAuth deployment.`
      },
      {
        type: "p",
        html: `Authority-based configuration and direct signing-key configuration solve different problems. When an authority publishes discovery metadata and signing keys, <code>Authority</code> lets the handler obtain them and keeps key rotation manageable. Configuring a signing key directly can be appropriate in a controlled environment or a test, but it ties the API to a specific key and requires an explicit rotation process. Never hardcode a production key or secret in source code or commit it to the repository.`
      },
      {
        type: "h2",
        html: "Part C — Middleware order"
      },
      {
        type: "code",
        lang: "cs",
        filename: "Program.cs — conventional pipeline order",
        pill: "Illustrative fragment",
        code: `var app = builder.Build();

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();`
      },
      {
        type: "p",
        html: `<code>UseAuthentication()</code> adds middleware that asks the configured scheme to authenticate the request and stores the resulting principal on <code>HttpContext.User</code>. <code>UseAuthorization()</code> adds middleware that reads the selected endpoint's authorization metadata and evaluates it against that principal.`
      },
      {
        type: "code",
        lang: "cs",
        filename: "What the middleware order means in practice",
        pill: "Illustrative fragment",
        code: `// Correct order:
app.UseAuthentication();  // populate HttpContext.User
app.UseAuthorization();   // evaluate endpoint requirements

// Reversed:
app.UseAuthorization();   // sees no authenticated principal
app.UseAuthentication();  // authenticates too late for authorization`
      },
      {
        type: "p",
        html: `With the wrong order, authorization can evaluate an unauthenticated principal and issue a challenge even when a valid token was supplied. Another common mistake is placing authorization inside a branch that never runs for the endpoint, or mapping endpoints before the middleware. The symptom — everything returns 401 — can look like a token problem when the pipeline order is the actual cause.`
      },
      {
        type: "callout",
        kind: "info",
        title: "Order is necessary but not sufficient",
        html: `Correct ordering does not fix an untrusted issuer, a wrong audience, or a missing default scheme. It only ensures the authorization decision sees the result of authentication. Always diagnose the specific stage instead of changing order randomly.`
      },
      {
        type: "h2",
        html: "Part D — Claims after validation"
      },
      {
        type: "p",
        html: `After successful authentication, the principal is available in a controller through its <code>User</code> property and on <code>HttpContext.User</code>. It represents the identity produced by the configured handler.`
      },
      {
        type: "code",
        lang: "cs",
        filename: "Reading the validated principal",
        pill: "Illustrative fragment",
        code: `[HttpGet("/api/me")]
[Authorize]
public IActionResult GetCurrentUser()
{
    var name =
        User.FindFirstValue(JwtRegisteredClaimNames.Sub)
        ?? User.FindFirstValue(ClaimTypes.NameIdentifier);

    return Ok(new
    {
        IsAuthenticated = User.Identity?.IsAuthenticated == true,
        UserId = name
    });
}`
      },
      {
        type: "p",
        html: `The fallback in this example is diagnostic, not a universal claim contract. The actual claim type depends on whether inbound claim mapping is enabled and on what the issuer emits. Reading <code>User</code> is safe because it reflects the validated authentication result. Manually Base64-decoding a token from the request is not equivalent: it bypasses signature, issuer, audience, and lifetime checks.`
      },
      {
        type: "h2",
        html: "Part E — Debugging token failures"
      },
      {
        type: "p",
        html: `Use a stable decision process. Classify the failure before touching configuration.`
      },
      {
        type: "html",
        html: `<div class="m6-decision-tree">
  <div class="m6-decision-node m6-decision-start">Request fails</div>
  <div class="m6-decision-branch"><span>Is an Authorization header present?</span></div>
  <div class="m6-decision-options"><div class="m6-decision-option"><strong>No</strong><br>Likely no credential. Check client, proxy, and header forwarding. Expect a challenge on protected endpoints.</div><div class="m6-decision-option"><strong>Yes</strong><br>Continue to parsing and validation.</div></div>
  <div class="m6-decision-branch"><span>Does the handler recognize the scheme and parse the token?</span></div>
  <div class="m6-decision-options"><div class="m6-decision-option"><strong>Malformed</strong><br>Check the scheme name and token format. An Identity token sent to a JWT handler is the wrong credential type.</div><div class="m6-decision-option"><strong>Parses</strong><br>Continue to cryptographic and claim validation.</div></div>
  <div class="m6-decision-branch"><span>Which validation check fails?</span></div>
  <div class="m6-decision-options"><div class="m6-decision-option"><strong>Signature</strong><br>Wrong key, unknown key id, altered bytes, or algorithm mismatch.</div><div class="m6-decision-option"><strong>Issuer</strong><br>Authority configuration mismatch or token from an unexpected authority.</div><div class="m6-decision-option"><strong>Audience</strong><br>Token intended for another API.</div><div class="m6-decision-option"><strong>Lifetime</strong><br>Expired or not yet valid; check clock skew and token timestamps.</div></div>
  <div class="m6-decision-branch"><span>Authentication succeeds but request is denied</span></div>
  <div class="m6-decision-options"><div class="m6-decision-option"><strong>403</strong><br>Move to authorization: roles, policy claims, and resource ownership.</div><div class="m6-decision-option"><strong>404</strong><br>Could be an intentional resource-hiding contract; verify the application query and ownership rule.</div></div>
</div>`
      },
      {
        type: "p",
        html: `Diagnostics should record safe facts: the endpoint, the authentication scheme, whether an Authorization header was present (not its value), the validation failure category, the issuer/audience values only if they are not sensitive, and a correlation id. Do not log raw tokens, cookies, signing secrets, or full claims that may contain personal data. Never paste a production token into a public debugging tool.`
      },
      {
        type: "h2",
        html: "Interactive: validation decision simulator"
      },
      {
        type: "p",
        html: `Select a token condition and see which validation step rejects it, or why authentication succeeds but authorization may still fail. The simulator models a conventional API endpoint with a bearer scheme.`
      },
      {
        type: "html",
        html: `<div class="simulator-widget" data-widget="validation-sim" id="w-validation-sim"><div class="simulator-header"><div class="simulator-title">🧪 Validation decision simulator</div><div class="m4-mode-note" style="margin-top:0;">Predict the first failing check, then reveal the decision.</div></div><div class="simulator-body"></div></div>`
      },
      {
        type: "callout",
        kind: "success",
        title: "✅ Lesson completion criterion",
        html: `You should be able to explain the meaningful authentication settings, predict which check rejects a bad token, and investigate a bearer-token failure without randomly changing configuration.`
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
        html: `<div class="refs-block"><div class="refs-title">Official references</div><ul><li><a href="https://learn.microsoft.com/en-us/aspnet/core/security/authentication/configure-jwt-bearer-authentication?view=aspnetcore-10.0" target="_blank" rel="noopener noreferrer">Configure JWT bearer authentication ↗</a></li><li><a href="https://learn.microsoft.com/en-us/aspnet/core/security/authentication/?view=aspnetcore-10.0" target="_blank" rel="noopener noreferrer">ASP.NET Core authentication overview ↗</a></li><li><a href="https://learn.microsoft.com/en-us/aspnet/core/security/authorization/?view=aspnetcore-10.0" target="_blank" rel="noopener noreferrer">ASP.NET Core authorization overview ↗</a></li></ul></div>`
      },
      {
        type: "html",
        html: `<div class="lesson-footer-nav"><button class="btn-secondary" type="button" data-nav-target="lesson-3">← Tokens and standards</button><button class="btn-complete-lesson" type="button" data-lesson="lesson-4">Mark Lesson 4 Complete ✓</button><button class="btn-primary" type="button" data-nav-target="lesson-5">Next: Claims, roles, and policies →</button></div>`
      }
    ]
  },

  {
    id: "lesson-5",
    badge: "L5",
    nav: "Claims, roles, and policies",
    content: [
      {
        type: "html",
        html: `<span class="lesson-pill">L5 · Lesson</span><h1 class="lesson-h1">Claims, Roles, Authorization Policies, and Protected Endpoints</h1><p class="lesson-lead">Authorization operates on the principal produced by authentication. This lesson moves from the structure of that principal to endpoint protection, then to roles and reusable policy requirements. The goal is to design an access rule and explain exactly what evidence it uses.</p><div class="lesson-meta-bar"><span>🧠 5 knowledge checks</span><span>🎛️ Authorization policy lab</span><span>🧾 Principal anatomy</span></div>`
      },
      {
        type: "h2",
        html: "Part A — Understanding the principal"
      },
      {
        type: "p",
        html: `A <code>ClaimsPrincipal</code> represents the caller to the application. It can hold more than one <code>ClaimsIdentity</code>. Each identity contains claims and records whether it is authenticated.`
      },
      {
        type: "html",
        html: `<div class="m6-principal">
  <div class="m6-principal-title">ClaimsPrincipal — Alice's illustrative principal</div>
  <div class="m6-identity">
    <div class="m6-identity-head"><span class="m6-identity-badge">ClaimsIdentity</span><span class="m6-identity-auth">AuthenticationType: "Bearer" · IsAuthenticated: true</span></div>
    <div class="m6-claims">
      <div class="m6-claim"><span class="m6-claim-type">sub</span><span class="m6-claim-value">alice-123</span><span class="m6-claim-note">Stable subject identifier</span></div>
      <div class="m6-claim"><span class="m6-claim-type">role</span><span class="m6-claim-value">Reader</span><span class="m6-claim-note">Application role</span></div>
      <div class="m6-claim"><span class="m6-claim-type">permission</span><span class="m6-claim-value">books:read</span><span class="m6-claim-note">Fine-grained capability</span></div>
    </div>
  </div>
</div>
<div class="m6-note">Claim type names are illustrative. The configured issuer and handler decide which claims actually exist and how they are mapped.</div>`
      },
      {
        type: "list",
        ordered: false,
        items: [
          `<strong><code>ClaimsPrincipal</code></strong> is the caller representation. Controllers expose it as <code>User</code>; middleware stores it on <code>HttpContext.User</code>.`,
          `<strong><code>ClaimsIdentity</code></strong> groups claims and carries <code>IsAuthenticated</code>, which depends on the authentication type being non-empty. A principal can contain several identities; authorization checks the claims available across them.`,
          `<strong>Claim type</strong> is the name of the property being asserted, such as <code>sub</code>, <code>role</code>, or a URI-shaped claim type.`,
          `<strong>Claim value</strong> is the asserted value, such as <code>alice-123</code> or <code>Reader</code>.`,
          `<strong>Trust</strong> comes from the authentication scheme. A claim in an unvalidated token is attacker-controlled data, not a fact.`
        ]
      },
      {
        type: "callout",
        kind: "warning",
        title: "Claim names are not universal",
        html: `A JWT may contain <code>sub</code>, <code>role</code>, or a custom URI claim. Inbound claim mapping can change the type string your code sees. Do not build authorization around an assumed claim type until you have inspected the actual principal produced by your configured scheme.`
      },
      {
        type: "h2",
        html: "Part B — Endpoint protection"
      },
      {
        type: "p",
        html: `Endpoint metadata tells the authorization system what an endpoint requires. Attributes and endpoint conventions are declarative: they describe the requirement, while middleware enforces it.`
      },
      {
        type: "html",
        html: `<div class="table-wrapper"><table><thead><tr><th>Endpoint</th><th>Protection</th><th>Behavior</th></tr></thead><tbody>
<tr><td><code>GET /api/books</code></td><td><code>[AllowAnonymous]</code></td><td>Anyone may call it. Authorization metadata explicitly opts out for this endpoint; authentication may still run if configured globally.</td></tr>
<tr><td><code>GET /api/me/shelf</code></td><td><code>[Authorize]</code></td><td>Requires an authenticated user. No valid principal → challenge; valid principal → action runs.</td></tr>
<tr><td><code>GET /api/admin/stats</code></td><td><code>[Authorize(Roles = "Administrator")]</code></td><td>Requires an authenticated principal with the role claim that matches the configured role check.</td></tr>
<tr><td><code>GET /api/reports/export</code></td><td><code>[Authorize(Policy = "ReportsExport")]</code></td><td>Uses the <code>ReportsExport</code> policy, which may require a specific permission claim.</td></tr>
<tr><td><code>DELETE /api/books/{id}</code></td><td><code>[Authorize]</code> plus an ownership check</td><td>The attribute allows authenticated callers; the action or a resource authorization handler must still establish ownership of the specific book.</td></tr>
</tbody></table></div>`
      },
      {
        type: "code",
        lang: "cs",
        filename: "Endpoint protection examples",
        pill: "Illustrative",
        code: `[HttpGet("/api/books")]
[AllowAnonymous]
public async Task<ActionResult<IReadOnlyList<BookDto>>> GetBooks(
    CancellationToken cancellationToken)
{
    // Public catalog.
}

[HttpGet("/api/me/shelf")]
[Authorize]
public async Task<ActionResult<IReadOnlyList<BookDto>>> GetShelf(
    CancellationToken cancellationToken)
{
    // Only authenticated callers reach this action.
}

[HttpGet("/api/admin/stats")]
[Authorize(Roles = "Administrator")]
public async Task<IActionResult> GetStats(
    CancellationToken cancellationToken)
{
    // Role check happens before the action executes.
}

[HttpGet("/api/reports/export")]
[Authorize(Policy = "ReportsExport")]
public async Task<IActionResult> Export(
    CancellationToken cancellationToken)
{
    // Policy requirements are evaluated before the action.
}`
      },
      {
        type: "p",
        html: `The action body does not need to repeat “is the caller authenticated?” for these cases; the authorization middleware has already enforced the metadata by the time the action runs. It must still perform any resource-specific check that the metadata cannot express.`
      },
      {
        type: "callout",
        kind: "danger",
        title: "Default policy and explicit rules",
        html: `If the application configures a fallback or default policy, endpoints without <code>[AllowAnonymous]</code> may require authentication even without an explicit <code>[Authorize]</code>. Conversely, <code>[AllowAnonymous]</code> explicitly bypasses authorization for that endpoint. Know which global conventions your application installed; do not infer endpoint requirements from the presence or absence of one attribute alone.`
      },
      {
        type: "h2",
        html: "Part C — Roles and policies"
      },
      {
        type: "p",
        html: `A <strong>role</strong> is a coarse label attached to a user, commonly as a claim. <code>[Authorize(Roles = "Administrator")]</code> checks that the principal has the expected role claim under the configured role claim type. Roles are useful when the access rule really is “this job function” and when the set is stable.`
      },
      {
        type: "p",
        html: `A <strong>policy</strong> is a named grouping of requirements. A <strong>requirement</strong> is data describing what must be true. An <strong>authorization handler</strong> evaluates that requirement against the principal and optional resource. A policy may contain several requirements; by default, all must succeed.`
      },
      {
        type: "html",
        html: `<div class="m6-flow">
  <div class="m6-flow-step"><span class="m6-flow-num">1</span><div><div class="m6-flow-title">Endpoint names a policy</div><div class="m6-flow-desc"><code>[Authorize(Policy = "ReportsExport")]</code> places the policy name in endpoint metadata.</div></div></div>
  <div class="m6-flow-step"><span class="m6-flow-num">2</span><div><div class="m6-flow-title">Authorization service loads the policy</div><div class="m6-flow-desc">The policy combines its requirements. It may also include an authenticated-user requirement and custom requirements.</div></div></div>
  <div class="m6-flow-step"><span class="m6-flow-num">3</span><div><div class="m6-flow-title">Handlers evaluate requirements</div><div class="m6-flow-desc">Each registered handler receives the requirement, principal, and resource when present. It calls <code>context.Succeed(requirement)</code> or leaves the requirement unsatisfied.</div></div></div>
  <div class="m6-flow-step"><span class="m6-flow-num">4</span><div><div class="m6-flow-title">The policy decides</div><div class="m6-flow-desc">If every requirement has succeeded, the policy succeeds. If a requirement cannot be satisfied, the endpoint authorization result is a failure — commonly a challenge or forbid depending on identity state.</div></div></div>
</div>`
      },
      {
        type: "code",
        lang: "cs",
        filename: "A permission requirement and handler",
        pill: "Complete illustrative example",
        code: `public sealed class ReportsExportRequirement : IAuthorizationRequirement
{
}

public sealed class ReportsExportHandler
    : AuthorizationHandler<ReportsExportRequirement>
{
    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        ReportsExportRequirement requirement)
    {
        if (context.User.HasClaim(
                "permission", "reports:export"))
        {
            context.Succeed(requirement);
        }

        return Task.CompletedTask;
    }
}

// Registration
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("ReportsExport", policy =>
    {
        policy.RequireAuthenticatedUser();
        policy.AddRequirements(new ReportsExportRequirement());
    });
});

builder.Services.AddSingleton<
    IAuthorizationHandler,
    ReportsExportHandler>();`
      },
      {
        type: "p",
        html: `Read the handler as a policy decision, not a role check by another name. The requirement says “the caller must hold permission <code>reports:export</code>”. The handler looks for that claim on the validated principal. The policy also requires an authenticated user, so an anonymous principal cannot satisfy it by carrying a forged claim.`
      },
      {
        type: "p",
        html: `An endpoint requiring the Administrator role and an endpoint requiring the <code>reports:export</code> permission may overlap in practice, but they are not equivalent rules. A user might be an administrator without export permission, or have export permission without being an administrator. Model the rule the application actually needs.`
      },
      {
        type: "html",
        html: `<div class="m6-two-col">
<div class="m6-concept-card"><div class="m6-concept-kicker">Role-based</div><h3>“Is the caller an Administrator?”</h3><p>Simple, stable, and easy to reason about when job functions really are the access boundary.</p><p style="margin-bottom:0;">Weak when the application needs one capability from a non-admin or wants to grant capabilities independently of job titles.</p></div>
<div class="m6-concept-card"><div class="m6-concept-kicker">Policy-based</div><h3>“Does the caller have reports:export?”</h3><p>Names the actual capability and can combine requirements, custom logic, and resource data.</p><p style="margin-bottom:0;">More moving parts: a policy, requirement, and handler must stay coherent and testable.</p></div>
</div>`
      },
      {
        type: "callout",
        kind: "info",
        title: "Do not build a policy framework for its own sake",
        html: `Start with the access rule. Use roles when a role is the rule. Use a simple policy when a claim or small combination expresses it. Add a custom requirement and handler when the logic genuinely needs one. Endpoint attributes cannot inspect a database entity that has not been loaded; that is the next lesson.`
      },
      {
        type: "h2",
        html: "Interactive: authorization policy lab"
      },
      {
        type: "p",
        html: `For each endpoint, select the rule that fits the stated requirement. Some endpoints need endpoint authorization only; one needs a resource check. The feedback explains why the alternatives are weaker.`
      },
      {
        type: "html",
        html: `<div class="simulator-widget" data-widget="policy-lab" id="w-policy-lab"><div class="simulator-header"><div class="simulator-title">🎛️ Authorization policy lab</div><div class="m4-mode-note" style="margin-top:0;">Choose a rule for each endpoint, check your answers, then read the reasoning.</div></div><div class="simulator-body"></div></div>`
      },
      {
        type: "callout",
        kind: "success",
        title: "✅ Lesson completion criterion",
        html: `You should be able to design an endpoint access rule and explain the principal, claims, roles, policies, requirements, handlers, and resource data it depends on.`
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
        html: `<div class="refs-block"><div class="refs-title">Official references</div><ul><li><a href="https://learn.microsoft.com/en-us/aspnet/core/security/authorization/policies?view=aspnetcore-10.0" target="_blank" rel="noopener noreferrer">Policy-based authorization in ASP.NET Core ↗</a></li><li><a href="https://learn.microsoft.com/en-us/aspnet/core/security/authorization/claims?view=aspnetcore-10.0" target="_blank" rel="noopener noreferrer">Claims-based authorization ↗</a></li><li><a href="https://learn.microsoft.com/en-us/aspnet/core/security/authorization/roles?view=aspnetcore-10.0" target="_blank" rel="noopener noreferrer">Role-based authorization ↗</a></li></ul></div>`
      },
      {
        type: "html",
        html: `<div class="lesson-footer-nav"><button class="btn-secondary" type="button" data-nav-target="lesson-4">← JWT bearer configuration</button><button class="btn-complete-lesson" type="button" data-lesson="lesson-5">Mark Lesson 5 Complete ✓</button><button class="btn-primary" type="button" data-nav-target="lesson-6">Next: Resource ownership →</button></div>`
      }
    ]
  },

  {
    id: "lesson-6",
    badge: "L6",
    nav: "Resource ownership",
    content: [
      {
        type: "html",
        html: `<span class="lesson-pill">L6 · Lesson</span><h1 class="lesson-h1">Resource-Based Authorization and Ownership: Protecting Book 42</h1><p class="lesson-lead">This is the lesson that protects user data. Alice may be authenticated and may reach an endpoint, yet still must not modify Bob's book. We will derive identity safely, filter or authorize the actual resource, and close the IDOR/BOLA gap deliberately.</p><div class="lesson-meta-bar"><span>🧠 6 knowledge checks</span><span>🧪 Resource-ownership simulator</span><span>🛡️ IDOR/BOLA review</span></div>`
      },
      {
        type: "h2",
        html: "Part A — Why endpoint authorization is not sufficient"
      },
      {
        type: "code",
        lang: "http",
        filename: "The request that endpoint authorization cannot fully protect",
        code: `DELETE /api/books/42 HTTP/1.1
Host: api.raff.example
Authorization: Bearer <Alice's valid token>`
      },
      {
        type: "p",
        html: `The token validates as Alice. The endpoint has <code>[Authorize]</code>, so Alice is allowed to reach the action. But Book 42 belongs to Bob. Endpoint authorization knows that Alice is authenticated; it does not know, by itself, who owns the row with id 42.`
      },
      {
        type: "p",
        html: `This gap is an <strong>object-level authorization</strong> problem. A common name is <strong>IDOR</strong> (Insecure Direct Object Reference): a client changes an identifier — 42 to 77 — and reaches another user's data because the server never verifies the caller's relationship to that object. APIs call the broader failure <strong>BOLA</strong> (Broken Object Level Authorization).`
      },
      {
        type: "html",
        html: `<div class="m6-two-col">
<div class="m6-concept-card m6-danger-card"><div class="m6-concept-kicker">Vulnerable assumption</div><h3>“The URL says /42, so the caller must have permission.”</h3><p>A client can type any number. Guessing is not the security boundary. Obfuscating identifiers — UUIDs, hashes, or random strings — does not replace an ownership check; an attacker can still use an identifier obtained elsewhere.</p><p style="margin-bottom:0;"><strong>Required fix:</strong> derive the caller from the validated principal, load the actual resource, and compare stored ownership with that identity.</p></div>
<div class="m6-concept-card m6-success-card"><div class="m6-concept-kicker">Defensible assumption</div><h3>“The caller is Alice, and only rows she owns may be returned or modified.”</h3><p>The server treats the token's identity as the only trusted source of identity and the database's owner field as the only trusted source of ownership.</p><p style="margin-bottom:0;">The operation succeeds only when both align.</p></div>
</div>`
      },
      {
        type: "h2",
        html: "Part B — Deriving user identity safely"
      },
      {
        type: "p",
        html: `The current user's identifier comes from the authenticated principal. The safest approach is to use the claim your actual authentication configuration emits. The commonly seen call below is a starting point, not a universal guarantee:`
      },
      {
        type: "code",
        lang: "cs",
        filename: "Reading a user identifier from the principal",
        pill: "Illustrative fragment",
        code: `var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

if (string.IsNullOrWhiteSpace(userId))
{
    // The principal is incomplete or the claim mapping differs.
    return Forbid();
}`
      },
      {
        type: "p",
        html: `This code assumes that the authenticated principal contains <code>ClaimTypes.NameIdentifier</code>. With some JWT configurations, inbound claim mapping turns a short <code>sub</code> claim into that legacy type. With other configurations — especially when mapping is disabled — the principal may contain <code>sub</code> instead. ASP.NET Core Identity uses its own user-id claim conventions. The correct type depends on the scheme and issuer, so inspect the actual claims rather than assuming.`
      },
      {
        type: "code",
        lang: "cs",
        filename: "Using the raw subject claim when that is what the API configured",
        pill: "Illustrative fragment",
        code: `// Appropriate only when the configured handler emits and keeps "sub".
var userId = User.FindFirstValue(JwtRegisteredClaimNames.Sub);

if (string.IsNullOrWhiteSpace(userId))
{
    return Forbid();
}`
      },
      {
        type: "callout",
        kind: "danger",
        title: "Never trust client-supplied ownership or identity",
        html: `A request body may contain <code>ownerId</code>, <code>userId</code>, or a role. Those values are attacker-controlled. They may be useful as ordinary business data in a carefully validated contract, but they are never proof of who the caller is or what they own. If an endpoint uses a client-supplied owner id to authorize an operation, it has an authorization bypass.`
      },
      {
        type: "h2",
        html: "Part C — Ownership-filtered database queries"
      },
      {
        type: "p",
        html: `For direct CRUD, one of the simplest and strongest patterns is to query by both the resource id and the trusted owner id. If no row matches, the caller either named a missing book or a book they do not own.`
      },
      {
        type: "code",
        lang: "cs",
        filename: "BooksController — ownership-filtered delete",
        pill: "Illustrative complete flow",
        code: `[HttpDelete("/api/books/{id:int}")]
[Authorize]
public async Task<IActionResult> DeleteBook(
    int id,
    CancellationToken cancellationToken)
{
    var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

    if (string.IsNullOrWhiteSpace(userId))
        return Forbid();

    var book = await _context.Books
        .SingleOrDefaultAsync(
            b => b.Id == id && b.OwnerId == userId,
            cancellationToken);

    if (book is null)
        return NotFound();

    _context.Books.Remove(book);
    await _context.SaveChangesAsync(cancellationToken);

    return NoContent();
}`
      },
      {
        type: "list",
        ordered: false,
        items: [
          `The <code>[Authorize]</code> attribute establishes that an authenticated principal reached the action. It does not perform the ownership check.`,
          `The <code>userId</code> comes from <code>User</code>, the principal produced by authentication — never from a query string or request body.`,
          `The query contains both <code>b.Id == id</code> and <code>b.OwnerId == userId</code>. This assumes Raff's book entity has an owner foreign key of a compatible type. If <code>OwnerId</code> is an integer or GUID, adapt the comparison deliberately; do not cast blindly.`,
          `If the row is missing or belongs to someone else, <code>book</code> is <code>null</code>. Many APIs return 404 for both to avoid confirming that another user's resource exists.`,
          `The remove and save happen only after the ownership-filtered load. The database is still responsible for integrity constraints, but the access decision is already enforced.`
        ]
      },
      {
        type: "callout",
        kind: "info",
        title: "404 vs 403 is a contract decision",
        html: `Returning 404 for a non-owned resource protects existence. Returning 403 reveals that the resource exists but that the caller is forbidden. Both can be defensible. What is not defensible is returning 200 with Bob's data or performing the update because the caller was authenticated. Pick a contract and test it consistently.`
      },
      {
        type: "h2",
        html: "Part D — Resource-based authorization with IAuthorizationService"
      },
      {
        type: "p",
        html: `A database filter is not the only tool. Sometimes the action needs to load the resource first, inspect more than an owner id, or apply a reusable policy. ASP.NET Core provides resource-based authorization for exactly this situation.`
      },
      {
        type: "html",
        html: `<div class="m6-flow">
  <div class="m6-flow-step"><span class="m6-flow-num">1</span><div><div class="m6-flow-title">Obtain the authenticated principal</div><div class="m6-flow-desc">Use <code>User</code> from the controller or the current <code>HttpContext</code>. Do not trust a client-supplied identity.</div></div></div>
  <div class="m6-flow-step"><span class="m6-flow-num">2</span><div><div class="m6-flow-title">Load the target resource</div><div class="m6-flow-desc">Query the book by id. At this point, the application knows the stored owner. Loading the resource is the application's job; <code>[Authorize]</code> cannot do it.</div></div></div>
  <div class="m6-flow-step"><span class="m6-flow-num">3</span><div><div class="m6-flow-title">Choose the requirement or policy</div><div class="m6-flow-desc">For example, a <code>BookOwnerRequirement</code> or a named policy such as <code>CanEditBook</code>.</div></div></div>
  <div class="m6-flow-step"><span class="m6-flow-num">4</span><div><div class="m6-flow-title">Invoke resource-based authorization</div><div class="m6-flow-desc"><code>IAuthorizationService.AuthorizeAsync(User, book, requirement)</code> runs the configured handlers against the principal and the book.</div></div></div>
  <div class="m6-flow-step"><span class="m6-flow-num">5</span><div><div class="m6-flow-title">Continue only on success</div><div class="m6-flow-desc">If the result is not allowed, return the response your contract specifies. Do not proceed to mutate the entity.</div></div></div>
  <div class="m6-flow-step"><span class="m6-flow-num">6</span><div><div class="m6-flow-title">Apply business rules and save</div><div class="m6-flow-desc">Authorization and business rules are related but distinct. The owner may still be forbidden by another rule, such as “cannot delete a book with reading entries.”</div></div></div>
</div>`
      },
      {
        type: "code",
        lang: "cs",
        filename: "A single ownership requirement and handler",
        pill: "Complete illustrative example",
        code: `public sealed class BookOwnerRequirement
    : IAuthorizationRequirement
{
}

public sealed class BookOwnerHandler
    : AuthorizationHandler<BookOwnerRequirement, Book>
{
    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        BookOwnerRequirement requirement,
        Book book)
    {
        var userId =
            context.User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (!string.IsNullOrWhiteSpace(userId) &&
            string.Equals(userId, book.OwnerId, StringComparison.Ordinal))
        {
            context.Succeed(requirement);
        }

        return Task.CompletedTask;
    }
}`
      },
      {
        type: "code",
        lang: "cs",
        filename: "Controller — load, authorize, then act",
        pill: "Complete illustrative flow",
        code: `[HttpPut("/api/books/{id:int}")]
[Authorize]
public async Task<IActionResult> UpdateBook(
    int id,
    UpdateBookRequest request,
    [FromServices] IAuthorizationService authorization,
    CancellationToken cancellationToken)
{
    var book = await _context.Books
        .SingleOrDefaultAsync(b => b.Id == id, cancellationToken);

    if (book is null)
        return NotFound();

    var result = await authorization.AuthorizeAsync(
        User,
        book,
        new BookOwnerRequirement());

    if (!result.Succeeded)
        return NotFound(); // deliberately hide other users' books

    book.Title = request.Title;
    await _context.SaveChangesAsync(cancellationToken);

    return NoContent();
}`
      },
      {
        type: "p",
        html: `The handler uses the same validated principal and stored <code>OwnerId</code> comparison as the query-filter version, but separates the decision into a reusable component. The controller still chooses the response: here, 404 for a non-owned book. In a different contract it could return <code>Forbid()</code>.`
      },
      {
        type: "callout",
        kind: "info",
        title: "What the requirement, handler, and service each do",
        html: `<strong>Requirement:</strong> names the condition (“the principal must own this book”). <strong>Handler:</strong> evaluates that condition against the principal and the loaded book and calls <code>Succeed</code>. <strong>IAuthorizationService:</strong> runs the handler and returns an <code>AuthorizationResult</code>. None of them loads the entity for you, and none of them replaces authentication.`
      },
      {
        type: "h2",
        html: "Part E — The authorization bypass trap"
      },
      {
        type: "p",
        html: `Here is an intentionally insecure implementation. Read it as a bug, not a pattern.`
      },
      {
        type: "code",
        lang: "cs",
        filename: "Vulnerable update — never do this",
        pill: "Anti-pattern",
        code: `[HttpPut("/api/books/{id:int}")]
[Authorize]
public async Task<IActionResult> UpdateBook(
    int id,
    UpdateBookRequest request,
    CancellationToken cancellationToken)
{
    var book = await _context.Books
        .SingleOrDefaultAsync(b => b.Id == id, cancellationToken);

    if (book is null)
        return NotFound();

    // DANGER: request.OwnerId is controlled by the caller.
    if (book.OwnerId != request.OwnerId)
        return Forbid();

    book.Title = request.Title;
    await _context.SaveChangesAsync(cancellationToken);

    return NoContent();
}`
      },
      {
        type: "p",
        html: `Alice can send <code>{ "ownerId": "bob-456", "title": "..." }</code> against Book 42. If Book 42 belongs to Bob, the comparison succeeds — even though Alice is the caller. The check used attacker-controlled data as the source of truth. The fix is to compare the stored owner with <code>userId</code> from <code>User</code>, never with an owner id supplied by the client.`
      },
      {
        type: "h2",
        html: "Part F — Comparing safe implementation strategies"
      },
      {
        type: "html",
        html: `<div class="table-wrapper"><table><thead><tr><th>Strategy</th><th>How it works</th><th>Strengths</th><th>Trade-offs</th></tr></thead><tbody>
<tr><td>Ownership-filtered query</td><td>Query by id and trusted owner id; treat no row as not found</td><td>Compact, hard to forget, good for direct CRUD, database does the filtering</td><td>Decision is embedded in the query; reuse and complex policy logic are harder</td></tr>
<tr><td>Load + <code>IAuthorizationService</code></td><td>Load the resource, then run a requirement against principal and resource</td><td>Reusable policy, explicit decision, supports richer rules than owner equality</td><td>More moving parts; it is easy to forget to call the service or to act after a failed result</td></tr>
<tr><td>Both</td><td>Filter for access, then run a policy for a meaningful authorization contract</td><td>Defense in depth and clear separation between query and decision</td><td>Possible duplication; two places must stay consistent and tested</td></tr>
</tbody></table></div>`
      },
      {
        type: "p",
        html: `Neither strategy is universally superior. A small CRUD API may be clearest with ownership-filtered queries. A system with several resource types, reusable policies, or richer decisions may benefit from resource-based authorization. Some teams use both: the query prevents accidental exposure, while the policy expresses the rule explicitly and is tested independently.`
      },
      {
        type: "h2",
        html: "Interactive: resource-ownership simulator"
      },
      {
        type: "p",
        html: `Choose a caller, a book, and an operation. The simulator applies this lesson's example rules: reading requires authentication; update and delete require ownership. A non-owner write is intentionally hidden with 404.`
      },
      {
        type: "html",
        html: `<div class="simulator-widget" data-widget="ownership-sim" id="w-ownership-sim"><div class="simulator-header"><div class="simulator-title">🛡️ Resource-ownership simulator</div><div class="m4-mode-note" style="margin-top:0;">Predict the decision before revealing it. The 404 is a contract choice, not the only safe response.</div></div><div class="simulator-body"></div></div>`
      },
      {
        type: "callout",
        kind: "success",
        title: "✅ Lesson completion criterion",
        html: `You should be able to implement and explain a secure update or delete operation that prevents Alice from modifying Bob's book, and articulate the difference between endpoint authorization and object-level authorization.`
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
        html: `<div class="refs-block"><div class="refs-title">Official references</div><ul><li><a href="https://learn.microsoft.com/en-us/aspnet/core/security/authorization/resource-based?view=aspnetcore-10.0" target="_blank" rel="noopener noreferrer">Resource-based authorization in ASP.NET Core ↗</a></li><li><a href="https://learn.microsoft.com/en-us/aspnet/core/security/authorization/policies?view=aspnetcore-10.0" target="_blank" rel="noopener noreferrer">Policy-based authorization ↗</a></li><li><a href="https://learn.microsoft.com/en-us/aspnet/core/security/authorization/?view=aspnetcore-10.0" target="_blank" rel="noopener noreferrer">Authorization overview ↗</a></li></ul></div>`
      },
      {
        type: "html",
        html: `<div class="lesson-footer-nav"><button class="btn-secondary" type="button" data-nav-target="lesson-5">← Claims, roles, and policies</button><button class="btn-complete-lesson" type="button" data-lesson="lesson-6">Mark Lesson 6 Complete ✓</button><button class="btn-primary" type="button" data-nav-target="lesson-7">Next: Testing and debugging →</button></div>`
      }
    ]
  },
  {
    id: "lesson-7",
    badge: "L7",
    nav: "Testing and debugging",
    content: [
      {
        type: "html",
        html: `<span class="lesson-pill">L7 · Lesson</span><h1 class="lesson-h1">Testing, Debugging, and Reviewing Authentication and Authorization</h1><p class="lesson-lead">Security behavior must survive refactoring. This lesson separates tests that prove endpoint rules from tests that prove token validation, then turns the module into a practical review and debugging discipline.</p><div class="lesson-meta-bar"><span>🧠 4 knowledge checks</span><span>🧪 Test-boundary matrix</span><span>🔍 Review checklist</span></div>`
      },
      {
        type: "h2",
        html: "Part A — What authentication and authorization tests must prove"
      },
      {
        type: "p",
        html: `A test that only verifies “a request with a handler override reaches the action” does not prove that JWT validation works. Each layer answers a different question. Test the layer that owns the behavior, and use at least one realistic integration test for the boundary you actually deploy.`
      },
      {
        type: "html",
        html: `<div class="table-wrapper"><table><thead><tr><th>Test type</th><th>Question it answers</th><th>What it does not prove</th></tr></thead><tbody>
<tr><td>Unit test of a policy handler</td><td>Given this principal and resource, does the requirement succeed?</td><td>Whether the endpoint uses that policy; whether real tokens validate</td></tr>
<tr><td>Controller/action test with a mocked principal</td><td>Does this action enforce the expected resource rule and return the intended result?</td><td>JWT signature, issuer, audience, lifetime, or middleware order</td></tr>
<tr><td>Integration test with test authentication</td><td>Do endpoint metadata, middleware, policies, and action behavior combine correctly for a chosen identity?</td><td>That the production bearer handler validates real token bytes and metadata</td></tr>
<tr><td>Integration test invoking the real handler with test-issued tokens</td><td>Does the configured authentication pipeline accept/reject tokens based on the same rules production uses?</td><td>That the external issuer's live keys and discovery endpoints are reachable from production</td></tr>
<tr><td>End-to-end/staging test</td><td>Does the deployed authority, network path, configuration, and API work together?</td><td>Every edge case; these tests are usually slower and fewer</td></tr>
</tbody></table></div>`
      },
      {
        type: "callout",
        kind: "warning",
        title: "A mocked principal is not token validation",
        html: `Setting <code>HttpContext.User</code> or replacing the authentication scheme in a test factory bypasses the real bearer handler. That is useful for testing authorization behavior, but it cannot catch a wrong authority, unsupported algorithm, expired token, wrong audience, or broken middleware order. Keep it, and add a test where the real handler processes a token issued for the test environment.`
      },
      {
        type: "p",
        html: `For policy handlers, test both success and failure. A handler that succeeds for the owner but also succeeds for a non-owner is worse than no test at all. For resource-based authorization, include the missing-resource case and the case where the principal lacks the required identity claim.`
      },
      {
        type: "code",
        lang: "cs",
        filename: "Focused tests for a ownership policy",
        pill: "Illustrative xUnit-style tests",
        code: `[Fact]
public async Task Owner_succeeds_for_own_book()
{
    var user = Principal("alice-123");
    var book = new Book { Id = 42, OwnerId = "alice-123" };
    var result = await Authorize(user, book);
    Assert.True(result.Succeeded);
}

[Fact]
public async Task NonOwner_fails_for_someone_elses_book()
{
    var user = Principal("alice-123");
    var book = new Book { Id = 42, OwnerId = "bob-456" };
    var result = await Authorize(user, book);
    Assert.False(result.Succeeded);
}

[Fact]
public async Task MissingIdentity_fails_closed()
{
    var user = new ClaimsPrincipal(new ClaimsIdentity());
    var book = new Book { Id = 42, OwnerId = "alice-123" };
    var result = await Authorize(user, book);
    Assert.False(result.Succeeded);
}`
      },
      {
        type: "p",
        html: `The helper should invoke the real <code>BookOwnerHandler</code> or the real <code>IAuthorizationService</code> policy registration, depending on what you are testing. If the test constructs its own duplicate copy of the comparison logic, it can pass while production is broken. Tests should exercise the production decision path.`
      },
      {
        type: "h2",
        html: "Part B — Test matrix for Raff"
      },
      {
        type: "html",
        html: `<div class="m6-test-matrix">
  <div class="m6-test-row m6-test-head"><span>Scenario</span><span>Caller</span><span>Expected result</span><span>Why</span></div>
  <div class="m6-test-row"><span>Public catalog</span><span>Anonymous</span><span class="m6-expect-pass">200</span><span><code>[AllowAnonymous]</code></span></div>
  <div class="m6-test-row"><span>Own shelf</span><span>Anonymous</span><span class="m6-expect-deny">401 challenge</span><span>Protected endpoint, no credential</span></div>
  <div class="m6-test-row"><span>Own shelf</span><span>Alice</span><span class="m6-expect-pass">200, only Alice's books</span><span>Authenticated read with owner filtering</span></div>
  <div class="m6-test-row"><span>Update Book 42</span><span>Alice (owner)</span><span class="m6-expect-pass">204 success</span><span>Authenticated owner</span></div>
  <div class="m6-test-row"><span>Update Book 42</span><span>Bob (non-owner)</span><span class="m6-expect-deny">404 by contract</span><span>Object-level authorization fails; existence hidden</span></div>
  <div class="m6-test-row"><span>Delete Book 42</span><span>Anonymous</span><span class="m6-expect-deny">401 challenge</span><span>No authenticated principal</span></div>
  <div class="m6-test-row"><span>Admin stats</span><span>Bob (Reader)</span><span class="m6-expect-deny">403</span><span>Authenticated but lacks Administrator role</span></div>
  <div class="m6-test-row"><span>Admin stats</span><span>Carol (Administrator)</span><span class="m6-expect-pass">200</span><span>Role requirement satisfied</span></div>
</div>
<div class="m6-note">The 401/403/404 values assume the sample policies and an API contract that hides non-owned resources. The test should assert the contract your application actually defines — not blindly copy this table.</div>`
      },
      {
        type: "p",
        html: `For authenticated reads, assert the response content as well as the status. A 200 containing Bob's books when Alice calls her shelf is a data leak, even though the HTTP status looks correct. For writes, query the database afterward to prove that the non-owner's attempt changed nothing.`
      },
      {
        type: "code",
        lang: "cs",
        filename: "Integration test shape with a test identity",
        pill: "Illustrative fragment",
        code: `[Fact]
public async Task Bob_cannot_delete_alices_book()
{
    // Arrange: Alice's Book 42 exists; Bob's principal is supplied
    // through the test authentication setup.
    var client = factory.CreateClientWithUser("bob-456");

    // Act
    var response = await client.DeleteAsync("/api/books/42");

    // Assert: contract hides the non-owned resource.
    Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    Assert.True(await BookStillExists(42));
}`
      },
      {
        type: "p",
        html: `For the real-handler test, issue a token from a test authority or signing setup and configure the application under test to trust exactly that setup. Use a test-only key that is not a production secret. Exercise wrong issuer, wrong audience, expired token, and tampered payload as separate cases. Do not weaken validation just to make a test pass.`
      },
      {
        type: "h2",
        html: "Part C — Debugging authorization failures"
      },
      {
        type: "list",
        ordered: true,
        items: [
          `<strong>Classify the response.</strong> A challenge usually means authentication did not produce an acceptable identity. A forbid usually means an authenticated identity failed authorization. A 404 may be an ownership contract. Do not treat all three as “the token is broken.”`,
          `<strong>Check whether authentication ran.</strong> Confirm middleware order and that the endpoint's scheme is the one you expect. Log whether a credential was present, the selected scheme, and the validation failure category.`,
          `<strong>Inspect the validated principal safely.</strong> Record claim types and safe identifying values in development, not raw tokens. Confirm the claim type and value that the policy expects actually exist after mapping.`,
          `<strong>Check policy registration and endpoint metadata.</strong> A handler class that is not registered, a policy name typo, or a missing <code>AddAuthorization()</code> changes behavior. Confirm the endpoint is using the policy you think it is.`,
          `<strong>Check the resource path.</strong> For ownership failures, compare the trusted user id with the stored owner id. Check whether the action loaded the resource before or after authorization, and whether it accidentally acted after a failed result.`,
          `<strong>Reproduce with a test.</strong> Encode the failing identity, resource, and expected result as a test. This turns a one-off debugging session into a regression guard.`
        ]
      },
      {
        type: "callout",
        kind: "danger",
        title: "Never debug by disabling security",
        html: `Removing <code>[Authorize]</code>, turning off signature validation, trusting all issuers, or bypassing ownership checks “temporarily” creates a real vulnerability. Use a test configuration or a local authority with test keys instead. Production defaults should fail closed.`
      },
      {
        type: "h2",
        html: "Part D — Security review checklist"
      },
      {
        type: "html",
        html: `<div class="m6-review-grid">
  <div class="m6-review-card"><div class="m6-review-icon">🔐</div><h3>Credentials and transport</h3><ul><li>HTTPS enforced</li><li>Tokens not logged or placed in URLs</li><li>No secrets or signing keys in source control</li><li>Token lifetimes and refresh behavior intentional</li></ul></div>
  <div class="m6-review-card"><div class="m6-review-icon">🧾</div><h3>Authentication</h3><ul><li>Trusted authority and audience configured</li><li>Signature, issuer, audience, and lifetime validated</li><li>Correct middleware order</li><li>Wrong token type rejected</li></ul></div>
  <div class="m6-review-card"><div class="m6-review-icon">🛂</div><h3>Authorization</h3><ul><li>Endpoints have an intentional access rule</li><li>Policies/roles use validated claims</li><li>Duplicate or contradictory rules removed</li><li>Deny-by-default conventions understood</li></ul></div>
  <div class="m6-review-card"><div class="m6-review-icon">📚</div><h3>Resource access</h3><ul><li>Identity from <code>User</code>, not request body</li><li>Every object read/write checks ownership</li><li>Non-owned resources do not leak</li><li>Query and policy rules agree</li></ul></div>
  <div class="m6-review-card"><div class="m6-review-icon">🧪</div><h3>Tests</h3><ul><li>Anonymous, owner, non-owner, admin cases</li><li>Real-handler token validation test</li><li>Negative tests assert no mutation</li><li>Policy handlers tested directly</li></ul></div>
  <div class="m6-review-card"><div class="m6-review-icon">📈</div><h3>Operations</h3><ul><li>Safe authentication/authorization logs</li><li>Key and authority rotation planned</li><li>Alerts for repeated 401/403 patterns</li><li>Incident path for credential compromise</li></ul></div>
</div>`
      },
      {
        type: "h2",
        html: "Part E — Put it together"
      },
      {
        type: "p",
        html: `For the Raff books API, write a short threat model for Book 42. Identify who can read it, who can update it, who can delete it, and what evidence each decision uses. Then list the test cases that would fail if someone accidentally replaced the ownership check with <code>[Authorize]</code> alone. If your tests still pass, they do not cover the risk.`
      },
      {
        type: "callout",
        kind: "success",
        title: "✅ Lesson completion criterion",
        html: `You should be able to choose the right test layer for authentication versus authorization, assert that a non-owner cannot mutate a resource, diagnose a failure by stage, and review an endpoint against a security checklist.`
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
        html: `<div class="refs-block"><div class="refs-title">Official references</div><ul><li><a href="https://learn.microsoft.com/en-us/aspnet/core/test/integration-tests?view=aspnetcore-10.0" target="_blank" rel="noopener noreferrer">Integration tests in ASP.NET Core ↗</a></li><li><a href="https://learn.microsoft.com/en-us/aspnet/core/security/authentication/?view=aspnetcore-10.0" target="_blank" rel="noopener noreferrer">Authentication overview ↗</a></li><li><a href="https://learn.microsoft.com/en-us/aspnet/core/security/authorization/?view=aspnetcore-10.0" target="_blank" rel="noopener noreferrer">Authorization overview ↗</a></li></ul></div>`
      },
      {
        type: "html",
        html: `<div class="lesson-footer-nav"><button class="btn-secondary" type="button" data-nav-target="lesson-6">← Resource ownership</button><button class="btn-complete-lesson" type="button" data-lesson="lesson-7">Mark Lesson 7 Complete ✓</button><button class="btn-primary" type="button" data-nav-target="lesson-assessment">Next: Final assessment →</button></div>`
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
        html: `<span class="lesson-pill">🎓 Final assessment</span><h1 class="lesson-h1">Module assessment</h1><p class="lesson-lead">Sixteen questions across the module. The pass threshold defaults to 80% and can be set to 70% or 90% before you begin. Each result links back to the lesson that owns the topic.</p><div class="lesson-meta-bar"><span>🧠 16 questions</span><span>🎯 Configurable pass threshold</span><span>📊 Topic breakdown</span></div>`
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
  <button class="btn-secondary" type="button" data-nav-target="lesson-7">← Testing and debugging</button>
  <button class="btn-secondary" type="button" data-nav-target="lesson-1">Back to top ↑</button>
</div>`
      }
    ]
  }
];
