## 2024-05-31 - [Fix NoSQL Injection in authentication]
**Vulnerability:** The Express middleware `authenticateUser` and Socket.IO `io.use` did not enforce that the auth token from user input (query param, header, or socket auth block) was a string. An attacker could pass a NoSQL payload (e.g., `?api_key[$ne]=1`), resulting in `token` becoming an object, bypassing truthy checks and risking NoSQL injection during `Session.findOne({ token })`.
**Learning:** In Node.js + MongoDB architectures, always cast unvalidated request properties (like `req.query`, `req.headers`, `socket.handshake`) to a primitive (e.g. String) before passing them to the database driver, to prevent Object Type Confusion/NoSQL injection.
**Prevention:** Strictly type check or cast the incoming parameters (`String(req.query.api_key)`) as part of a global validation strategy before using them in MongoDB operations.

## 2024-06-03 - [Fix Hardcoded Administrative Credentials]
**Vulnerability:** The Express authentication and socket.io connection middlewares were using a hardcoded password string (`'admin123'`) to create a default `admin` user if authentication succeeded using a legacy `API_KEY` but the admin user did not exist in the database.
**Learning:** Default, hardcoded credentials are a major vulnerability that often slip into fallback/bootstrap paths. An attacker who gains access or figures out the legacy access could potentially compromise the system further if the default password is never changed.
**Prevention:** Never use hardcoded static strings for fallback or administrative account passwords. Always generate secure random passwords (e.g., `crypto.randomBytes(16).toString('hex')`) during user initialization if they are auto-created, requiring manual reset if access is truly needed via the UI.

## 2024-06-14 - [Fix Object Type Confusion DoS in Crypto Module]
**Vulnerability:** The unvalidated `password` property from user input (e.g., `req.body.password`) was passed directly into the native Node.js `crypto.pbkdf2Sync` method. An attacker could pass a NoSQL payload object instead of a string, causing a `TypeError` in the native module and crashing the node process, resulting in a Denial of Service (DoS).
**Learning:** Native Node.js modules like `crypto` often lack the graceful error handling or implicit casting found in some higher-level frameworks. Feeding them unexpected object types (especially from unvalidated Express request payloads) can cause synchronous crashes that take down the entire server.
**Prevention:** Always explicitly cast unvalidated user input properties to primitives (e.g., `String(password)`) before passing them to native Node.js methods like `crypto`.

## 2024-06-25 - [Fix SSRF vulnerability in media fetching]
**Vulnerability:** The WhatsApp adapter endpoint accepted a `mediaUrl` parameter from the user and passed it directly to `whatsapp-web.js`'s `MessageMedia.fromUrl` without validation. This created a Server-Side Request Forgery (SSRF) vulnerability where an attacker could coerce the backend into making GET requests to internal services, loopback addresses, or cloud metadata endpoints.
**Learning:** External libraries that fetch URLs on behalf of users (like media fetchers or link preview generators) must never be blindly trusted with unvalidated input.
**Prevention:** Always parse user-supplied URLs and explicitly validate that the protocol is safe (`http:` or `https:`) and the hostname does not resolve to restricted internal network addresses (e.g., `127.0.0.1`, `169.254.169.254`, `10.x.x.x`) before executing HTTP requests.
