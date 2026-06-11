## 2024-05-31 - [Mongoose Query Optimization]
**Learning:** Adding `.lean()` to Mongoose queries returns plain JavaScript objects, significantly reducing memory and CPU usage for read-only operations. In this application, read-only queries were returning full Mongoose documents needlessly.
**Action:** Always verify if a `.find()` operation needs to return full Mongoose documents. Use `.lean()` when documents are strictly meant for read-only serialization.
## 2024-06-03 - [Debouncing Heavy Local Filtering]
**Learning:** React components triggering heavy local filtering (e.g., multiple useMemo hooks dependent on a single text state) can cause excessive re-renders and backend/frontend thrashing when updated on every keystroke.
**Action:** Whenever adding or maintaining search/filtering text inputs, ensure a ~300ms debounce layer (using local state for input, setTimeout, and useRef) is applied to prevent these performance issues.
