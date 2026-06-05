## 2024-11-20 - Add search debounce
**Learning:** React components triggering API calls via onChange in this application often lack debouncing, leading to API thrashing and performance degradation on the backend.
**Action:** Always ensure a ~300ms debounce layer (e.g., via setTimeout and useRef) is applied to search/filtering text inputs that query external APIs.
