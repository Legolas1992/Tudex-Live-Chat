## 2024-05-24 - NoSQL Regex Injection in User Search
**Vulnerability:** Unescaped user input was being passed directly to MongoDB `$regex` operators in `/api/users/search`.
**Learning:** This codebase uses direct string queries mapped to MongoDB operators. Passing user input to `$regex` without escaping makes the application vulnerable to NoSQL Regex Injection, which can lead to data exfiltration or a Regular Expression Denial of Service (ReDoS) attack against the database.
**Prevention:** Always escape user input before passing it to MongoDB `$regex` operators using a robust regex escape utility (e.g., `string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')`).
