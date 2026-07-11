## 2024-05-31 - [Mongoose Query Optimization]
**Learning:** Adding `.lean()` to Mongoose queries returns plain JavaScript objects, significantly reducing memory and CPU usage for read-only operations. In this application, read-only queries were returning full Mongoose documents needlessly.
**Action:** Always verify if a `.find()` operation needs to return full Mongoose documents. Use `.lean()` when documents are strictly meant for read-only serialization.
## 2024-06-16 - [Lazy Loading Off-screen Media]
**Learning:** In the Tapchat frontend, rendering long lists of chat messages or resources containing `<img>`, `<video>`, and `<audio>` tags causes the browser to eagerly download all off-screen media assets immediately upon render. This behavior aggressively consumes bandwidth and delays the initial rendering of the chat view.
**Action:** Always apply `loading="lazy"` to `<img>` tags and `preload="none"` to `<video>` and `<audio>` tags when rendering long lists of media. This defers the network request until the element approaches the viewport, significantly improving initial load performance and saving memory.
