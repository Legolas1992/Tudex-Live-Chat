## 2024-06-02 - Missing Debounce on API Calls
**Learning:** React components triggering API calls via `onChange` often lack debouncing, causing backend thrashing on every keystroke.
**Action:** Always wrap API calls triggered by text input `onChange` handlers with a ~300ms debounce layer using `setTimeout` and `useRef`.
