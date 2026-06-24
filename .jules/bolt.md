## 2024-05-31 - [Mongoose Query Optimization]
**Learning:** Adding `.lean()` to Mongoose queries returns plain JavaScript objects, significantly reducing memory and CPU usage for read-only operations. In this application, read-only queries were returning full Mongoose documents needlessly.
**Action:** Always verify if a `.find()` operation needs to return full Mongoose documents. Use `.lean()` when documents are strictly meant for read-only serialization.

## 2024-11-06 - [Mongoose Query Alignment with Indexes]
**Learning:** Adding unindexed tie-breaker fields (like createdAt: -1) to a Mongoose query that is otherwise sorted by a compound index triggers slow, memory-intensive in-memory sorts.
**Action:** Ensure that .sort() parameters align perfectly with the trailing fields of the chosen compound index to avoid breaking index utilization.
