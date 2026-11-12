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
