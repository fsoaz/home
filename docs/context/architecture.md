# Architecture

## Application structure

A static Vite application uses strict TypeScript and Three.js. `index.html` loads `src/main.ts` and preloads the decorative background. `src/main.ts` manages language state, metadata, rendering, project visibility, email reveal, and the scene lifecycle. Bilingual copy and project records live in `src/content.ts`; `src/views.ts` produces semantic page markup.

The opening contains the hero and project cards over a shared backdrop. Three featured cards use native details/summary; an `aria-expanded` button reveals the fourth project. The expertise anchor targets the technical skills block within the about section.

Language changes rebuild the page and dispose of the old scene. Local storage reads/writes are guarded, and focus returns to the language button. Scene pause state, project expansion, and revealed email are local to the rendered page and reset on a language change. Pending scene imports are cancelled logically so they cannot initialize against detached markup.

## Black hole rendering

`src/scene.ts` is a separate dynamically loaded Three.js chunk. Its fragment shader samples `public/event-horizon.webp`, displaces photographed plasma, and adds moving copper highlights around the accretion disk and event horizon. Star luminance varies gently; mouse movement adds eased parallax. This is an artistic effect, not a physical simulation.

CSS and the shader share the same image. The shader reads the source image dimensions and computed background size and position to match desktop `cover` sizing and the fixed 810px mobile image height. The CSS backdrop remains underneath the canvas. Both the résumé and shader texture use `import.meta.env.BASE_URL`; Vite rewrites the stylesheet and preload asset URLs for the configured relative base.

Rendering targets 30 frames per second, limits pixel ratio to 1.35, and budgets approximately two million drawing pixels. These are scheduling/resolution limits, not measured device performance guarantees. `ResizeObserver` updates drawing size and image alignment.

| State | Behavior |
| --- | --- |
| Texture ready, opening visible, document visible, motion allowed | Render animated frames. |
| Visitor pauses | Stop rendering and retain the current frame; show the resume label. |
| Opening offscreen or document hidden | Stop rendering; resume when active if other conditions allow. |
| Reduced motion | Hide the canvas and motion control; show the static backdrop. |
| WebGL initialization, texture loading, or dynamic import fails | Retain the static backdrop and hide the motion control. |
| WebGL context lost | Hide the canvas/control and show the static backdrop. |
| WebGL context restored | Resume if motion, visibility, and pause state allow. |
| Page rerendered for language change | Cancel pending work and dispose the previous scene before creating another. |

The frame callback also synchronizes the inactive state so a preference change can hide the canvas before media-query events settle. Animation time excludes inactive periods, preventing a large time jump on return. Cleanup cancels animation frames, disconnects observers, removes listeners, and disposes the texture, geometry, material, and renderer.

## Accessibility and external dependencies

The page includes semantic sections, native disclosure controls, visible focus styles, a skip link, document language updates, and an `aria-pressed` animation control. Responsive rendering has been checked in Chromium. Full keyboard, assistive technology, zoom, and cross-browser acceptance remain outstanding; see [test evidence](../execution/test_evidence.md).

Fonts load from Google Fonts with system fallbacks. Loading costs on mobile and throttled devices have not been profiled. Three.js is split into the dynamically imported scene bundle; this does not by itself establish a measured performance improvement.

## Build and hosting

`npm run build` checks TypeScript and produces `dist/`, including the public background and résumé. `npm run smoke:dist` verifies generated JavaScript/CSS references, public asset presence, internal anchors, and configured profile destination strings. It checks local files/source, not browser behavior or external availability.

The GitHub Pages workflow installs dependencies, builds, runs smoke checks, uploads `dist/`, and deploys on pushes to `main` or manual dispatch. Vite's relative base supports both a domain root and project Pages paths. Historical deployment checks and current local verification are recorded separately in [test evidence](../execution/test_evidence.md).

There are no server APIs, secrets, database connections, or required environment variables. Email reveal assembles a client-side address and replaces the button with a focused mailto link. The address remains extractable, and the public résumé contains contact details.
