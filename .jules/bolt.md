## 2024-05-31 - [Mongoose Query Optimization]
**Learning:** Adding `.lean()` to Mongoose queries returns plain JavaScript objects, significantly reducing memory and CPU usage for read-only operations. In this application, read-only queries were returning full Mongoose documents needlessly.
**Action:** Always verify if a `.find()` operation needs to return full Mongoose documents. Use `.lean()` when documents are strictly meant for read-only serialization.

## 2026-06-22 - [Mongoose Sort Optimization]
**Learning:** When sorting Mongoose queries, ensure the sort parameters align perfectly with the trailing fields of the chosen compound index. Adding unindexed tie-breaker fields (like createdAt: -1) to a query sorted by a partially matched index triggers a slow, memory-intensive in-memory sort.
**Action:** Remove unindexed fields from the .sort() if an index is expected to handle the sorting efficiently.
