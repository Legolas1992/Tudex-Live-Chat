## 2026-06-07 - Missing Debouncing on Search Inputs Causes Backend Thrashing
**Learning:** React components triggering API calls via `onChange` in this application often lack debouncing.
**Action:** Whenever adding or maintaining search/filtering text inputs that query external APIs, ensure a ~300ms debounce layer (e.g., via `setTimeout` and `useRef`) is applied to prevent backend thrashing.
