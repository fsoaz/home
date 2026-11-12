# Review notes

## Verified behavior

The mockup redesign and enhanced black hole animation passed local TypeScript/build and distribution smoke checks. One-off Chromium checks covered desktop/mobile appearance, bilingual interactions, project disclosure, all-project visibility, email reveal, changing/frozen animation frames, initial/live reduced motion, offscreen scheduling, and WebGL fallback/recovery. Language switching leaves one scene canvas and translates the animation control. Exact coverage is in [test evidence](test_evidence.md).

The scene is dynamically loaded. Rendering targets 30fps with capped drawing resolution and runs only while visible, active, motion-enabled, and unpaused. The static image remains available when animation cannot run. These implementation limits do not establish measured loading, battery, or sustained-frame-rate results on users' devices.

## Remaining limitations

- Broader browser/device coverage, full keyboard/assistive technology acceptance, text zoom, short-height layouts, hidden-tab behavior, and constrained-device performance remain unverified.
- The browser checks were temporary local scripts; there is no committed automated browser suite.
- Manual animation pause, expanded projects, and revealed email reset when language changes rebuild the page. Only language preference is saved in local storage.
- Google Fonts requires third-party requests; system fonts provide a fallback. Font delivery has not been changed based on profiling.
- Email reveal does not hide the address from determined bots. The downloadable résumé contains email and phone details. No contact backend or anti-spam service exists.
- Project metrics are résumé-reported claims with evaluation context. Direct project destinations remain omitted until supplied and verified.

## Deployment evidence

The repository has a GitHub Pages build/deploy workflow and a historical record of successful compiled asset delivery. The redesign/animation tasks performed local verification without deploying. Current production content was not checked for this documentation update.
