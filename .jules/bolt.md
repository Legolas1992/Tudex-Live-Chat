## 2024-05-31 - [Mongoose Query Optimization]
**Learning:** Adding `.lean()` to Mongoose queries returns plain JavaScript objects, significantly reducing memory and CPU usage for read-only operations. In this application, read-only queries were returning full Mongoose documents needlessly.
**Action:** Always verify if a `.find()` operation needs to return full Mongoose documents. Use `.lean()` when documents are strictly meant for read-only serialization.
## 2026-06-23 - [Compound Indexes for Filtering and Sorting]
**Learning:** When using MongoDB queries that combine an $in filter with a .sort(), an in-memory sort can become a major bottleneck if no index aligns with both the filter and sort fields.
**Action:** Always add a compound index matching the queried fields (e.g., { field1: 1, sortField: -1 }) to push the sort operation down to the database index level and prevent memory spikes.
