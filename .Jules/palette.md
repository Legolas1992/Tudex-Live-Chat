## 2024-10-27 - Icon-only buttons lacking ARIA labels
**Learning:** Found several key interaction buttons in App.jsx (like 'Eliminar', 'Descartar', 'Mejorar redacción con IA', and 'Enviar original') that only had visual icons/emojis and `title` attributes, making them inaccessible to screen readers.
**Action:** Always verify that icon-only buttons have descriptive `aria-label` attributes, especially in chat interfaces where interactions are frequent.
## 2024-10-27 - Dynamic button accessibility handling
**Learning:** Found elements that conditionally receive `role="button"` and `tabIndex=0` based on application state (e.g. grammar error detection) without corresponding conditional `aria-label` updates.
**Action:** Always ensure that when `role="button"` is conditionally applied to non-interactive elements, a descriptive `aria-label` is also conditionally applied to avoid missing context for screen readers.
