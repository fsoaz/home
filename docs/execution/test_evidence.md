# Test evidence

## Completed checks

- `npm run build` passed after the initial implementation and subsequent application changes. It runs TypeScript validation and Vite production bundling.
- `npm run smoke:dist` passed after the asset validation script was added and after the content/view modules were extracted. It checks built JS/CSS asset delivery, résumé presence, internal section anchors, and configured external destinations.
- The production build emits a small main bundle and a separate Three.js scene chunk. This confirms code splitting in the build output, not runtime loading or performance gains on a device.
- Source review confirmed language switching retains the session preference if local storage access throws, and restores focus to the language button after rerender.

## Manual browser acceptance — pending

- Open the dev server and production preview; check browser console and shader rendering/fallback.
- Check widths 320, 375, 768, 1024, and 1440px, short-height layouts, 200% text zoom, content readability, and horizontal overflow.
- Switch English/Portuguese, reload, and confirm persistence, metadata, and labels.
- Navigate by keyboard, use the skip link, and expand project notes.
- Reveal email in both languages; verify link focus and mailto destination.
- Download the résumé and verify its contents; check GitHub and LinkedIn destinations.
- Start with reduced motion enabled and with WebGL unavailable; confirm static fallback.
- Scroll the scene offscreen or hide the tab; verify rendering pause/resume.
- Enable reduced motion during a session; verify animation stops.
- Profile mobile loading with JavaScript CPU throttling and reduced bandwidth before changing font or scene delivery further.

## GitHub Pages deployment

GitHub Pages was found serving the uncompiled Vite entry through legacy branch publishing. A GitHub Actions build/deploy workflow, relative asset paths, and base-aware résumé URL were added. Pages was switched to workflow publishing and workflow run 43058218521 was dispatched. Live verification after redeployment confirmed compiled relative HTML asset paths and HTTP 200 responses with appropriate content types for JavaScript and CSS. Browser rendering has not been verified. The current local smoke check runs in the Pages workflow after `npm run build`.

## Mockup redesign — November 2026

- `npm run build`: TypeScript checking and Vite production build pass.
- `npm run smoke:dist`: JavaScript, CSS, résumé, space background, navigation anchors, and external destinations verified.
- Chromium desktop screenshot at 1672 × 941 visually reviewed against the supplied mockup.
- Chromium layouts at 320, 390, 768, and 1024 px in Portuguese: no horizontal overflow. English mobile rendering and the mobile project section also visually reviewed.
- Browser interactions passed: native project details open, “View all projects” reveals Support Copilot, language toggle changes the document language and persists on reload, and email reveal creates a working mailto link.
- No browser page errors during those checks. Browser QA used a temporary local Vite server; no deployment was performed.
- Full-page Chromium capture omitted some offscreen blurred cards; a separate viewport capture confirmed all three cards render correctly when scrolled into view.

## Black hole animation enhancement — November 2026

- Replaced the unused procedural scene with a photo-based WebGL shader: flowing disk filaments, moving rim highlights, subtle star shimmer, and eased pointer parallax. The source image and CSS crop remain aligned on desktop and mobile.
- Chromium screenshot comparisons confirm running frames change and paused frames remain identical.
- Initial and live reduced-motion preferences show the static backdrop and hide animation controls. A frame-level inactive check handles preference changes before media-query events settle.
- Instrumented WebGL draw calls stop while the opening is offscreen and resume on return.
- Language switching releases the old scene, leaves one canvas, and translates pause/resume labels.
- Mobile rendering checked at 390 × 844; no horizontal overflow. Desktop checked at 1672 × 941.
- WebGL context loss reveals the static background; restoration resumes rendering. A browser launched with WebGL disabled retains the working static page without animation controls.
- No shader or page runtime errors in these checks. `npm run build`, `npm run smoke:dist`, and `git diff --check` pass.
