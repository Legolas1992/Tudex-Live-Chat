## 2024-06-06 - Initial Analysis
**Learning:** React components triggering API calls via onChange in this application lack debouncing, leading to backend thrashing.
**Action:** Always add a ~300ms debounce layer (via setTimeout and useRef) to text inputs that query external APIs.
