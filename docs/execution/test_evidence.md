# Test evidence

## Completed

- `npm run build` passed after the initial implementation.
- `npm run build` passed after the email reveal change: TypeScript validation and Vite production bundling succeeded.
- Source inspection confirmed the page initially uses a reveal button rather than a visible address or mailto link.

These checks do not establish browser behavior or shader compilation. No automated browser tests or manual visual QA have been completed. Documentation-only updates did not require another build.

## Manual acceptance checklist — pending

- Open the dev server and production preview; check browser console and black hole rendering.
- Check narrow and wide layouts, content readability, and horizontal overflow.
- Switch English/Portuguese, reload, and confirm persistence, metadata, and labels.
- Navigate by keyboard, use the skip link, and expand project notes.
- Reveal email in both languages; verify link focus and mailto destination.
- Download the résumé and verify its contents; check GitHub and LinkedIn destinations.
- Start with reduced motion enabled and with WebGL unavailable; confirm static fallback.
- Scroll the scene offscreen or hide the tab; verify rendering pause/resume.
- Enable reduced motion during a session; verify animation stops.

## GitHub Pages fix

- GitHub API inspection confirmed Pages was serving `main` at `/` using a legacy branch build, without compiling TypeScript.
- Added a GitHub Actions build/deploy workflow and relative Vite asset paths; adjusted the résumé link to use the configured base.
- `npm run build` passed. Output inspection confirmed both referenced relative assets and the résumé exist in `dist/`.
- Live deployment remains pending pushing these changes and selecting GitHub Actions as the Pages source. Browser verification is still pending.
