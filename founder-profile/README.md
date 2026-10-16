# Francisco Micael — founder portfolio

Independent local Next.js App Router project using React, strict TypeScript and CSS Modules. Portuguese is served at `/`; English at `/en`. Both pages are statically prerendered. No backend, contact service, environment variables, or deployment configuration is required.

## Run locally

Requires Node.js 20.9+ and npm.

```sh
cd founder-profile
npm ci
npm run dev
```

Open http://localhost:3000. From inside this directory, omit `cd founder-profile`.

## Verify and run production

```sh
npm run typecheck
npm run lint
npm run build
npm start
```

`npm start` serves the production build at http://localhost:3000. Stop the development server first, or select another port with `npm start -- --port 3100`.

## Content and assets

- `content/home.ts`: typed locale dictionaries and confirmed public links.
- `components/Profile.tsx` and its CSS Module: shared page composition.
- `styles/tokens.css` and `components/ui/`: tokens and adapted components copied from `black-hole-project`.
- `public/francisco-micael.png`: locally stored GitHub avatar from https://github.com/fsoaz.png?size=800, retrieved 2026-10-16 at the user's request. The current profile image is a geometric avatar, not a photographic portrait. It is displayed without cropping. To use a photo later, replace the asset and update the localized alt text and portrait styling as needed.

Copy is grounded in the existing portfolio and Black Hole Company's public introduction. No dated founder milestones are asserted. `quote-normalizer-web` has only its name and a localized “Coming soon” label; no product repository content was used. Contact links to the existing portfolio contact section; GitHub links to `fsoaz`.

Locale navigation retains the section being read when JavaScript is available and works as ordinary page links without JavaScript. Each language has its own document language and metadata. System fonts avoid remote font requests. Reduced motion, visible focus, a skip link, and semantic section headings are included.

The original portfolio and reference repositories are preserved. Deployment is outside this delivery.
