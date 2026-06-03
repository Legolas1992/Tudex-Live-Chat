## 2026-06-03 - Un-debounced Search API Calls
**Learning:** React components triggering API calls via onChange in this application often lack debouncing. This leads to backend thrashing.
**Action:** Whenever adding or maintaining search/filtering text inputs that query external APIs, ensure a ~300ms debounce layer is applied.
