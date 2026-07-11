## 2024-05-31 - [Mongoose Query Optimization]
**Learning:** Adding `.lean()` to Mongoose queries returns plain JavaScript objects, significantly reducing memory and CPU usage for read-only operations. In this application, read-only queries were returning full Mongoose documents needlessly.
**Action:** Always verify if a `.find()` operation needs to return full Mongoose documents. Use `.lean()` when documents are strictly meant for read-only serialization.

## 2024-06-17 - [Isolated Search Input Rendering]
**Learning:** In large React components (like the main `App` layout), placing un-debounced local state for text inputs directly in the parent causes full re-renders on every keystroke, leading to input lag.
**Action:** Extract text input fields that hold rapidly changing local state into isolated child components. Let the child manage the keystroke state and only propagate the debounced value back to the parent to significantly reduce React's rendering overhead.
