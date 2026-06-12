## 2024-05-31 - [Fix NoSQL Injection in authentication]
**Vulnerability:** The Express middleware `authenticateUser` and Socket.IO `io.use` did not enforce that the auth token from user input (query param, header, or socket auth block) was a string. An attacker could pass a NoSQL payload (e.g., `?api_key[$ne]=1`), resulting in `token` becoming an object, bypassing truthy checks and risking NoSQL injection during `Session.findOne({ token })`.
**Learning:** In Node.js + MongoDB architectures, always cast unvalidated request properties (like `req.query`, `req.headers`, `socket.handshake`) to a primitive (e.g. String) before passing them to the database driver, to prevent Object Type Confusion/NoSQL injection.
**Prevention:** Strictly type check or cast the incoming parameters (`String(req.query.api_key)`) as part of a global validation strategy before using them in MongoDB operations.

## 2024-06-25 - [Fix Hardcoded Default Credentials]
**Vulnerability:** The backend contained a hardcoded fallback password (`admin123`) for the `admin` user within the initialization fallback logic. If `API_KEY` was improperly configured or exposed, an attacker could potentially use the default `admin` and `admin123` credentials to gain administrative access.
**Learning:** Hardcoded credentials should never be committed to source code or used as fallbacks for privileged accounts, even in fallback code paths designed for local testing, because they frequently make their way into production setups.
**Prevention:** Always initialize fallback accounts or administrative users with strong, securely generated random passwords (e.g., using `crypto.randomBytes`) instead of static string values.
