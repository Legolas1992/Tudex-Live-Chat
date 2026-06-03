## 2024-05-24 - Debounce External API Queries on Inputs
**Learning:** In this application, React components triggering API calls via `onChange` often lack debouncing. This causes excessive network requests and backend thrashing on every keystroke.
**Action:** Whenever adding or maintaining search/filtering text inputs that query external APIs, ensure a ~300ms debounce layer (e.g., via `setTimeout` and `useRef`) is applied to prevent backend thrashing.
