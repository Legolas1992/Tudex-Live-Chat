## 2024-10-27 - Icon-only buttons lacking ARIA labels
**Learning:** Found several key interaction buttons in App.jsx (like 'Eliminar', 'Descartar', 'Mejorar redacción con IA', and 'Enviar original') that only had visual icons/emojis and `title` attributes, making them inaccessible to screen readers.
**Action:** Always verify that icon-only buttons have descriptive `aria-label` attributes, especially in chat interfaces where interactions are frequent.

## 2024-10-27 - Inconsistent iconography on dismissal actions
**Learning:** Found several close/dismiss buttons using hardcoded emojis (❌, ✕) instead of the standard vector `<CloseIcon />` from the application's icon library. Emojis can render differently across operating systems and screen readers, leading to inconsistent UX and accessibility issues compared to SVG icons.
**Action:** Replace hardcoded text emojis with standardized SVG icon components (`<CloseIcon />`) across all UI elements for consistent rendering and accessibility.
