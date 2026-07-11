## 2024-10-27 - Icon-only buttons lacking ARIA labels
**Learning:** Found several key interaction buttons in App.jsx (like 'Eliminar', 'Descartar', 'Mejorar redacción con IA', and 'Enviar original') that only had visual icons/emojis and `title` attributes, making them inaccessible to screen readers.
**Action:** Always verify that icon-only buttons have descriptive `aria-label` attributes, especially in chat interfaces where interactions are frequent.

## 2026-07-11 - Bottom navigation lacking ARIA labels
**Learning:** Found the primary bottom navigation buttons (Chats, Estados, Cercanos, Muro, Alertas) in App.jsx only had visual SVG icons and text descriptions, but were lacking explicit `aria-label` attributes for clear screen reader identification.
**Action:** Always verify that main navigation buttons have descriptive `aria-label` attributes to ensure robust accessibility for core UI workflows.
