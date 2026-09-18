# Francisco Micael — Portfolio

Personal portfolio for Francisco Micael, a Backend & AI Engineer based in Brazil.

**Live site:** [fsoaz.github.io/home](https://fsoaz.github.io/home/)

## Overview

The site presents selected engineering work through a cinematic black-and-gold interface. A custom WebGL shader renders the hero’s central black hole, including gravitational ray bending, an accretion disk, photon-ring behavior, Doppler beaming, mouse parallax, and scroll-driven camera movement.

The portfolio is fully static and does not fetch GitHub data or expose API routes at runtime.

### Features

- English and Brazilian Portuguese content
- Browser-language detection and persisted locale preference
- Responsive, keyboard-accessible navigation
- Project case studies with local imagery and repository links
- Adaptive WebGL quality with offscreen pausing
- Reduced-motion, low-power, and unsupported-WebGL fallbacks
- Static metadata, Open Graph image, sitemap, and robots file
- Automated deployment to GitHub Pages

## Technology

- Next.js 16 with the App Router
- React 19 and TypeScript
- Raw WebGL and GLSL
- Plain CSS
- ESLint

## Local development

Requirements:

- Node.js 22 or later
- npm

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Because the project uses the `/home` base path, open:

```text
http://localhost:3000/home/
```

Opening `http://localhost:3000/` directly returns a 404 by design.

## Available commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run typecheck` | Run TypeScript without emitting files |
| `npm run lint` | Run ESLint |
| `npm run check` | Run type checking and linting |
| `npm run build` | Create the production static export |

The production export is written to `out/`.

## Project structure

```text
app/
  content.ts       Typed bilingual content and project data
  globals.css      Visual system and responsive layout
  layout.tsx       Metadata and document shell
  page.tsx         Main route
components/
  BlackHole.tsx    WebGL renderer and GLSL shader
  Mark.tsx         FM orbital identity mark
  Portfolio.tsx    Page sections and client interactions
public/
  projects/        Local project artwork
.github/workflows/
  deploy.yml       GitHub Pages build and deployment
```

Portfolio copy, capabilities, project descriptions, and repository links are centralized in [`app/content.ts`](app/content.ts). Contact links and the page composition live in [`components/Portfolio.tsx`](components/Portfolio.tsx).

## Static export and deployment

The Next.js configuration uses:

- `output: "export"`
- `basePath: "/home"`
- `assetPrefix: "/home"`
- trailing slashes
- unoptimized local images for static hosting

Pushes to `main` trigger the GitHub Actions workflow, which:

1. Installs dependencies with `npm ci`.
2. Runs TypeScript and ESLint checks.
3. Builds the static export.
4. Adds `out/.nojekyll`.
5. Uploads and deploys the GitHub Pages artifact.

The repository’s Pages source must be set to **GitHub Actions**.

## Contact

- Email: [fmsoaz@gmail.com](mailto:fmsoaz@gmail.com)
- GitHub: [@fsoaz](https://github.com/fsoaz)
