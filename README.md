# Event Horizon — Francisco Soares

A local-first portfolio for backend and applied AI hiring opportunities. Built with Vite, TypeScript, and Three.js, with English/Portuguese content and a shader-based black hole opening.

## Run locally

Requires Node.js 22.12+ and npm.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. To build and inspect the production output:

```sh
npm run build
npm run preview
```

The build checks TypeScript and writes static assets to `dist/`. No environment variables, database, or backend are required. Hosting has not been configured.

## Editing

- `src/main.ts`: bilingual content, project summaries, page markup, and interaction handlers.
- `src/scene.ts`: Three.js shader, pointer movement, resizing, visibility handling, and cleanup.
- `src/style.css`: responsive layout, typography, focus states, and static space fallback.
- `public/francisco-soares-cv.pdf`: downloadable Portuguese résumé.

English is the default. The language preference is saved in browser local storage. Career claims come from the supplied résumé; project metrics are reported results, not independently verified benchmarks. Google Fonts is an external runtime dependency with local fallback fonts.

## Privacy and verification

The contact address is assembled and revealed after clicking “Show email” / “Mostrar e-mail”. This discourages casual scraping; it is not access control. The address remains extractable from client code, and the public résumé includes email and phone details.

The production build passed after implementation and the email reveal change. Browser rendering, shader execution, mobile behavior, and accessibility still require manual verification. See [test evidence](docs/execution/test_evidence.md) and [architecture](docs/context/architecture.md).

## GitHub Pages

The Pages workflow builds and deploys `dist/` on pushes to `main`, or manually through Actions. In repository **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source. Do not serve the repository root directly: its entry point loads TypeScript that requires compilation.

Vite uses relative asset URLs so the site works at `/home/`. The résumé link uses Vite’s base URL as well. Push the workflow and configuration changes before running the deployment.
