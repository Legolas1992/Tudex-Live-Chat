## 2024-05-31 - [Mongoose Query Optimization]
**Learning:** Adding `.lean()` to Mongoose queries returns plain JavaScript objects, significantly reducing memory and CPU usage for read-only operations. In this application, read-only queries were returning full Mongoose documents needlessly.
**Action:** Always verify if a `.find()` operation needs to return full Mongoose documents. Use `.lean()` when documents are strictly meant for read-only serialization.
## 2024-06-13 - [Mongoose Query Types in Middleware]
**Learning:** Never apply `.lean()` to Mongoose queries that populate global context objects like `req.user` or `req.session` in authentication middleware. It causes type inconsistencies (returning a POJO instead of a Mongoose Document) which breaks downstream routes that rely on Mongoose methods (like `.save()`) or virtual properties.
**Action:** Only use `.lean()` when the retrieved data is guaranteed to be read-only and directly serialized into a response (e.g., fetching a list of items for the UI).
