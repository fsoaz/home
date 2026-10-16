# Replacement verification — 2026-10-16

The founder portfolio now replaces the repository-root website. The independent draft is removed. Existing GitHub Pages settings, dependency versions, deployment workflow, favicon, and Formspree destination are retained.

- `npm run check` passed (route generation, strict TypeScript, ESLint).
- `npm run build` passed and produced a static `out/` including Portuguese and English pages, sitemap and robots.
- Chromium checked the actual static export under `/home/` and `/home/en/` at 360, 390, 768, 1024 and 1440 px. No horizontal overflow, broken profile images or page errors.
- Keyboard skip navigation, locale switching with retained section, and JavaScript-disabled language links passed.
- Reduced motion remains enabled in the viewport matrix.
- Existing contact form validation blocked an empty submission. A filled submission reached the same Formspree URL with the expected fields using an intercepted request; no real message was sent.
- Canonical links, language alternates, and favicon paths were checked in exported HTML for both locales.
- Representative desktop and mobile captures and all viewport measurements are retained here.

No commit, push, or deployment was performed. The existing workflow will publish the root export when the changes are pushed to main.
