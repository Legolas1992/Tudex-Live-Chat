## 2024-05-31 - [Mongoose Query Optimization]
**Learning:** Adding `.lean()` to Mongoose queries returns plain JavaScript objects, significantly reducing memory and CPU usage for read-only operations. In this application, read-only queries were returning full Mongoose documents needlessly.
**Action:** Always verify if a `.find()` operation needs to return full Mongoose documents. Use `.lean()` when documents are strictly meant for read-only serialization.

## 2026-06-24 - [Mongoose Query Optimization]
**Learning:** When using MongoDB/Mongoose queries that combine an $in filter with a .sort(), omitting a compound index matching both the filtered and sorted fields causes slow, memory-intensive in-memory sorts.
**Action:** Always add a compound index (e.g., { field1: 1, sortField: -1 }) to align perfectly with the fields used in $in and .sort() operations.
