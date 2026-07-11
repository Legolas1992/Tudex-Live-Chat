## 2024-10-27 - Icon-only buttons lacking ARIA labels
**Learning:** Found several key interaction buttons in App.jsx (like 'Eliminar', 'Descartar', 'Mejorar redacción con IA', and 'Enviar original') that only had visual icons/emojis and `title` attributes, making them inaccessible to screen readers.
**Action:** Always verify that icon-only buttons have descriptive `aria-label` attributes, especially in chat interfaces where interactions are frequent.
## 2024-10-27 - Duplicate ARIA labels in JSX elements
**Learning:** Found that when adding new attributes like `aria-label`, it's possible to miss that the element already has one defined further down in its props, especially for long multiline definitions (e.g. color picker and theme buttons). Adding a second one will break the build with a Duplicate attribute error.
**Action:** Inspect the entire multi-line element definition to verify the attribute does not already exist before adding it.
