## 2024-05-18 - NoSQL Regex Injection in User Search
**Vulnerability:** User input from `req.query.q` was passed directly to MongoDB `$regex` operator without escaping in the `/api/users/search` endpoint.
**Learning:** MongoDB `$regex` operators are susceptible to Regular Expression Denial of Service (ReDoS) and NoSQL injection if user input contains unescaped regex metacharacters.
**Prevention:** Always escape user input using a robust regex escape utility (e.g., `string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')`) before passing it to MongoDB `$regex` operators.
