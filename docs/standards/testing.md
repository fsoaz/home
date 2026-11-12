# Testing

## Build and distribution

After TypeScript, dependency, application, or public-asset changes, run:

```sh
npm run build
npm run smoke:dist
```

The build performs TypeScript checking and production bundling. The smoke check verifies generated JavaScript/CSS references, résumé/background files, internal anchors, and configured external destination strings. Neither executes shaders, checks external site availability, nor verifies usability.

## Browser verification

Use `npm run dev` for iteration or `npm run preview` after building to inspect production output. For visual or interaction changes, repeat the affected checks below and record results in [test evidence](../execution/test_evidence.md). Use both English and Portuguese where labels or layout change.

- Inspect desktop and mobile rendering, narrow and short viewports, 200% zoom, and horizontal overflow.
- Switch language and reload; confirm persistence, document language, metadata, and focus restoration.
- Navigate by keyboard, use the skip link, expand each card, and toggle all-project visibility.
- Reveal email and verify focus/mailto behavior; download the résumé and follow the configured profiles when testing those destinations.
- Confirm animated frames change, pause freezes the image, and resume restarts motion. Check mouse parallax without affecting content interaction.
- Test reduced motion initially and during a session; verify the static backdrop and hidden animation control. Restore the preference and check resumption.
- Scroll the opening offscreen and return; hide and restore the tab. Verify rendering actually stops, rather than merely becoming invisible.
- Test unavailable WebGL and context loss/restoration. Retain the `WEBGL_lose_context` extension reference before losing the context if using it to restore rendering.
- Switch language during scene initialization and while running; check for detached/duplicate canvases, errors, and stale listeners.
- Verify backdrop alignment after resizing and after revealing extra project content.

There is no committed browser automation framework. Previous one-off Chromium checks are evidence for the stated cases, not a repeatable CI suite or cross-browser certification. Performance changes require device/throttling measurements; a code-split bundle or frame cap alone is not a benchmark.

## Documentation-only changes

Review statements against the implementation, validate local Markdown links, and run `git diff --check`. An application rebuild is unnecessary. Keep historical evidence separate from current results, and do not promote a pending check to passed without performing it.
