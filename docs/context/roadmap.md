# Roadmap

## Implemented

- Bilingual static portfolio, résumé download, email reveal, and project engineering notes.
- Phase 1 quick wins: mobile navigation visibility, metadata contrast, project detail affordances, Portuguese résumé labeling, guarded language preference storage, and initial CSS custom properties.
- Phase 2 reliability work: language-switch focus restoration, persistent CSS artwork fallback on WebGL context loss, and production asset/link smoke checks in the Pages workflow.
- Phase 3 refinements: lazy-loaded Three.js scene chunk, demand-scheduled animation that responds to visibility and reduced-motion changes, and short/narrow viewport CSS adjustments.
- Phase 4 maintainability work: bilingual content and project data extracted to `src/content.ts`; page sections composed with reusable functions from `src/views.ts`.

## Pending verification

Browser acceptance remains outstanding. Inspect desktop/mobile rendering, viewport widths 320, 375, 768, 1024, and 1440px, short-height layouts, 200% text zoom, WebGL behavior, keyboard access, reduced motion, visibility pause/resume, language persistence, contact interactions, and résumé/external links. Profile loading on mobile with CPU throttling and reduced bandwidth before deciding whether to change font delivery or weights.

## Before public hosting

Review the downloadable résumé’s email and phone exposure and confirm career claims and contact destinations. Hosting provider and deployment publication decisions remain separate follow-up work.

## Optional future work

Verified project destinations and approved screenshots; a server-backed contact form if stronger address protection is desired. These additions are not implemented.
