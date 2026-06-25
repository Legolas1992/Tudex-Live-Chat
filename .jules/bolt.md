## 2024-05-31 - [Mongoose Query Optimization]
**Learning:** Adding `.lean()` to Mongoose queries returns plain JavaScript objects, significantly reducing memory and CPU usage for read-only operations. In this application, read-only queries were returning full Mongoose documents needlessly.
**Action:** Always verify if a `.find()` operation needs to return full Mongoose documents. Use `.lean()` when documents are strictly meant for read-only serialization.

## 2024-06-25 - [Mongoose Compound Indexes for $in Queries]
**Learning:** When using MongoDB/Mongoose queries that combine an `$in` filter with a `.sort()`, missing a compound index matching both the filtered and sorted fields triggers slow, memory-intensive in-memory sorts.
**Action:** Always add a compound index (e.g., `{ field1: 1, sortField: -1 }`) when sorting after an `$in` query to ensure the database can use the index for both filtering and sorting.
