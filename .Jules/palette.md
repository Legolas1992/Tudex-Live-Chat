## 2024-10-27 - Icon-only buttons lacking ARIA labels
**Learning:** Found several key interaction buttons in App.jsx (like 'Eliminar', 'Descartar', 'Mejorar redacción con IA', and 'Enviar original') that only had visual icons/emojis and `title` attributes, making them inaccessible to screen readers.
**Action:** Always verify that icon-only buttons have descriptive `aria-label` attributes, especially in chat interfaces where interactions are frequent.

## 2024-11-20 - Ensure that ARIA labels reflect missing titles in interactive components
**Learning:** Found several missing ARIA labels on button, icon, and specific interactive elements. It's crucial that interactive icons and non-standard HTML button elements have a properly set `aria-label` to be accessible, reflecting context like 'Cerrar', 'Descartar versión sugerida', and 'Análisis de Sentimiento'.
**Action:** When evaluating accessibility, search for interactive elements (`button`, `a`, elements with `role="button"`) and icons with a `title` but missing an `aria-label` attribute.
