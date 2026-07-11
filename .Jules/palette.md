## 2024-10-27 - Icon-only buttons lacking ARIA labels
**Learning:** Found several key interaction buttons in App.jsx (like 'Eliminar', 'Descartar', 'Mejorar redacción con IA', and 'Enviar original') that only had visual icons/emojis and `title` attributes, making them inaccessible to screen readers.
**Action:** Always verify that icon-only buttons have descriptive `aria-label` attributes, especially in chat interfaces where interactions are frequent.

## 2024-10-27 - Modal dialogs missing accessible names
**Learning:** Found a full-screen story viewer modal (`role="dialog"`) that lacked an `aria-labelledby` or `aria-label`. Without this, screen readers cannot announce the purpose of the dialog when it opens.
**Action:** Always ensure that every element with `role="dialog"` has an accessible name, either via `aria-labelledby` pointing to a visible heading or an `aria-label` if no heading exists.
