## 2024-06-02 - [CRITICAL] NoSQL Injection / ReDoS in User Search
**Vulnerability:** The `/api/users/search` endpoint used unsanitized user input (`req.query.q`) directly inside a MongoDB `$regex` query operator without escaping special characters.
**Learning:** This could lead to NoSQL Injection and Regular Expression Denial of Service (ReDoS) by allowing attackers to pass malicious regex strings like `.*` or computationally expensive regexes (`^(a+)+$`) that crash or hang the database engine.
**Prevention:** Always escape user input when passing it to MongoDBs `$regex` operator using a regex escape utility like `string.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")`.
