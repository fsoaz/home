# Francisco Micael — founder portfolio

The main website for Francisco Micael, founder of Black Hole Company. The founder portfolio replaces the previous engineering portfolio in this repository's root application.

Live address: https://fsoaz.github.io/home/ (updated by the existing deployment workflow after a push to `main`). This local change does not itself publish the site.

## Development

Requires Node.js 22+ and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000/home/ for Portuguese or http://localhost:3000/home/en/ for English. `/home` is the GitHub Pages base path.

## Checks and production

```sh
npm run check
npm run build
```

`check` runs route type generation, strict TypeScript and ESLint. `build` generates a static site in `out/`. The existing `.github/workflows/deploy.yml` installs, checks, builds and deploys that directory on pushes to `main`. No application server or `next start` is required for static hosting.

To preview the export with the same base path:

```sh
mkdir -p /tmp/founder-preview
ln -sfn "$PWD/out" /tmp/founder-preview/home
python3 -m http.server 3107 --directory /tmp/founder-preview
```

Open http://localhost:3107/home/.

## Editing

- `content/home.ts`: typed Portuguese and English content and links.
- `components/Profile.tsx` and its CSS Module: founder page and existing contact form.
- `components/ui/` and `styles/tokens.css`: adapted Black Hole Company components and design tokens.
- `app/(pt)/` and `app/en/`: static pages with localized document languages and metadata.
- `public/francisco-micael.png`: GitHub profile avatar, downloaded at the user's request. The profile currently uses a geometric identicon, not a photograph.

The contact form preserves the previous portfolio's Formspree endpoint and native browser validation. Submissions navigate to Formspree's response page. No new contact service was created. The upcoming product exposes only its name and a localized “Coming soon” label.

Locale links retain the section being read with JavaScript and remain ordinary navigation links without it. Reduced motion, visible keyboard focus, a skip link, and responsive layouts are included. The former separate `founder-profile/` draft has been integrated and removed.
