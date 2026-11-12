# Test evidence

The results below were recorded during the implementation, redesign, and animation tasks. The documentation update reviewed them against the current source; it did not rerun application checks or inspect current production state.

## Build and source checks — passed

- `npm run build`: strict TypeScript validation and Vite production bundling passed after the redesign and animation changes.
- `npm run smoke:dist`: generated JavaScript/CSS references, résumé/background presence, internal anchors (`work`, `expertise`, `about`, `contact`), and configured GitHub/LinkedIn destination strings passed.
- Build output contains a separate dynamically imported Three.js scene chunk. This confirms code splitting, not measured performance gains on a device.
- `git diff --check` passed after the application changes.
- Source review confirmed guarded language storage, language-button focus restoration, cancellation of stale scene imports, and disposal of graphics resources, observers, and listeners on rerender.

The smoke script checks local file presence and source strings. It does not make HTTP requests to external profiles or exercise browser controls.

## Mockup redesign — Chromium checks passed

One-off local browser checks used a temporary Vite development server:

- A 1672 × 941 desktop screenshot was visually compared with the supplied mockup.
- Portuguese layouts at widths 320, 390, 768, and 1024px had no horizontal overflow. English mobile rendering and the mobile project section were also visually reviewed.
- Native project details opened. “View all projects” revealed Support Copilot.
- Language switching updated document language and persisted across reloads.
- Email reveal produced a visible mailto link.
- No page runtime errors occurred during those interaction checks.

A full-page Chromium capture omitted some offscreen blurred cards. A separate viewport capture confirmed all three cards rendered correctly when scrolled into view. This capture limitation is not a missing-card result.

## Black hole enhancement — Chromium checks passed

- Running-frame screenshot comparisons changed; paused-frame comparisons remained identical.
- Initial and live reduced-motion preferences showed the static backdrop and hid animation controls. Returning to normal motion resumed animation.
- Instrumented WebGL draw calls stopped while the opening was offscreen and resumed on return.
- Language switching left one canvas and translated pause/resume labels.
- Animated desktop rendering was checked at 1672 × 941 and Portuguese mobile rendering at 390 × 844, with no mobile horizontal overflow.
- WebGL context loss revealed the static backdrop and hid the control. Restoration resumed animation.
- A browser launched with WebGL disabled retained the static page without animation controls.
- No shader compilation or page runtime errors occurred in the successful animation checks.

These were temporary browser scripts, not a committed automated suite. Frame changes demonstrate motion; they do not measure sustained frame rate, GPU cost, or battery usage. The document-hidden scheduling path is implemented but was not separately exercised by these tests.

## Remaining acceptance and profiling

- Full keyboard flow, skip link, focus visibility, disclosure controls, animation control, and screen reader behavior.
- Short-height layouts, 200% text zoom, and readability beyond the sampled viewport sizes.
- Firefox, Safari, and physical mobile devices.
- Hidden-tab pause/resume, distinct from the completed offscreen test.
- Actual résumé download and content review; following the GitHub/LinkedIn destinations. Local file/destination checks have passed, but those end-to-end actions were not recorded.
- Rapid language changes during texture/module loading and detailed graphics-resource profiling beyond the single-canvas check and source review.
- Mobile loading with constrained bandwidth and CPU/GPU resources; font delivery costs and sustained animation performance.
- Browser rendering of the latest build at the deployed Pages path.

Use the procedure in [testing guidance](../standards/testing.md) when repeating checks. Record actual browser, viewport, and outcomes; do not infer coverage from source inspection alone.

## Historical GitHub Pages deployment

Before the mockup redesign, Pages was found serving the uncompiled Vite entry through legacy branch publishing. A GitHub Actions build/deploy workflow, relative asset paths, and base-aware résumé URL were added. Pages was switched to workflow publishing and workflow run `43058218521` was dispatched.

The earlier record reports compiled relative HTML asset paths and HTTP 200 responses with appropriate content types for JavaScript and CSS after redeployment. That verifies asset delivery for that deployment; it does not verify current production content or browser rendering of the later redesign/animation.

The redesign and animation tasks performed local verification and did not deploy. The Pages workflow currently runs `npm run build` and `npm run smoke:dist` before uploading `dist/`.

## Documentation update

Reviewed README and documentation against application source, package scripts, asset files, and the Pages workflow. Validated local Markdown links and ran `git diff --check`. No application changes, application test reruns, or deployments were part of this update.
