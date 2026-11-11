# Architecture

Static Vite application using strict TypeScript and Three.js. `index.html` loads `src/main.ts`, which renders the page from bilingual local content and installs language and email reveal handlers. Language changes rebuild the page and dispose the previous scene. Local storage persists the language preference.

`src/scene.ts` renders a stylized black hole through a fragment shader on a fullscreen plane; this is an artistic effect, not a physical simulation. It responds to pointer movement, caps pixel ratio at 1.5, resizes with its container, and skips rendering when offscreen or the document is hidden. Cleanup releases geometry, material, renderer, observers, and pointer listener.

Reduced motion at initialization or WebGL creation failure leaves the CSS static space fallback visible. Enabling reduced motion during a running session pauses rendering; it does not replace the existing canvas with the fallback.

The page uses semantic sections, native details/summary controls, visible focus states, and a skip link. Responsive styles adapt navigation and project layout. Fonts load from Google Fonts with system fallbacks.

Build output is `dist/`, including the public résumé. There are no server APIs, secrets, database connections, or environment variables. Email reveal assembles a client-side address and replaces the button with a focused mailto link. This is scraping friction only, not a privacy boundary.
