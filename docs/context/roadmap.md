# Roadmap

## Implemented

- Bilingual portfolio with guarded language persistence, metadata updates, and language-button focus restoration.
- Mockup-based layout: cinematic background, copper headline, branded navigation, and responsive glass project cards.
- Three featured projects with native expandable details; “View all projects” reveals Support Copilot.
- Expertise navigation, career history, skills, education, Portuguese résumé download, and email/profile contact controls.
- Lazy-loaded black hole animation with flowing plasma, moving rim highlights, star shimmer, and eased mouse parallax.
- Bilingual pause/resume, reduced-motion fallback, visibility-based scheduling, WebGL context recovery, and scene cleanup on language changes.
- Frame-rate and drawing-resolution limits, a compressed shared backdrop, and separate content/view modules.
- Production asset/link smoke checks and GitHub Pages build/deploy workflow.

## Verified locally

Production build, smoke checks, and source whitespace checks passed after application changes. Chromium checks covered desktop rendering, responsive layouts at 320, 390, 768, and 1024px, bilingual interactions, project expansion, and email reveal. Animation checks covered changing versus frozen frames, initial/live reduced motion, offscreen rendering suspension, language recreation, mobile rendering, and unavailable/lost/restored WebGL.

These results come from one-off checks. See [test evidence](../execution/test_evidence.md) for exact scope and limitations.

## Remaining verification

- Full keyboard flow, skip link, screen reader behavior, and animation-control accessibility.
- Short-height layouts, 200% text zoom, and readability beyond the sampled viewport sizes.
- Firefox, Safari, and physical mobile device coverage.
- Hidden-tab pause/resume; offscreen scheduling has already been tested.
- Actual résumé download/content review and external profile navigation; the smoke check only verifies local presence and destination strings.
- Mobile loading, CPU/GPU cost, sustained frame rate, and constrained-network profiling before adjusting font or scene delivery.

## Hosting follow-up

A Pages workflow and an earlier verified deployment are recorded. The redesign and enhanced animation tasks did not deploy their changes; current production state has not been checked in this documentation update. After publishing, verify the compiled assets, backdrop, résumé, and browser behavior at the actual Pages path.

## Optional future work

Verified project destinations and approved screenshots; persistent manual pause preference across language switches; a contact backend if one is requested. These are not implemented.
