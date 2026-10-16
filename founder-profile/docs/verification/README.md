# Verification — 2026-10-16

The visitor can read the founder profile in Portuguese or English, explore ventures, and reach the existing contact page or GitHub profile. Content is local and static; there is no API or new contact form.

- TypeScript, ESLint, and production build passed. Both `/` and `/en` are prerendered.
- Development server returned HTTP 200. Production startup was verified with `npm start -- --port 3107`.
- Chromium checked both languages at 360, 390, 768, 1024 and 1440 px. Full-page screenshots were reviewed at all ten combinations; two representative captures are retained here.
- No horizontal overflow, broken profile images, or browser page errors in the matrix. Localized document languages and titles are present; exactly one h1 per page.
- Keyboard skip link focuses main. Focus styling is a gold, offset outline. Sticky language navigation remains reachable while reading; switching languages preserves the ventures anchor in both directions. Plain language links also work with JavaScript disabled.
- Reduced-motion emulation records a 0.00001s entrance animation. Global styles disable smooth scrolling and transitions under reduced motion.
- External company, portfolio, and GitHub destinations returned HTTP 200. Contact targets the existing portfolio's `#contact` section, confirmed in its source.
- Compared against Black Hole Company's stored full-page reference (`clearer-landing/page-pt-BR-1280.png`), tokens and UI component styles: same black/ivory/gold palette, serif headlines, monospace labels, fluid gutters, numbered headings and outlined CTA treatment.
- Content review: the upcoming product has only a name and localized coming-soon label. No source from its repository was copied or read. No product details appear in metadata.
- The GitHub asset is an identicon, used as explicitly requested; it is not described as a photograph.

The first browser check caught language selection returning to the intro after scrolling the header into view. A sticky header and section scroll offsets fixed it; the complete matrix passed afterward.

Next.js's experimental TypeScript CLI intermittently failed to parse `--showConfig` in this environment. The documented `useTypeScriptCli: false` setting uses the installed TypeScript 5 compiler API instead; build type validation remains enabled.

See `results.json` for browser measurements and link destinations. Browser automation used the existing reference repository's Playwright installation; no browser testing dependency was added to this static portfolio.
