# Event Horizon — Francisco Soares

A bilingual portfolio for backend and applied AI hiring opportunities, built with Vite, strict TypeScript, and Three.js. The design follows the supplied “Engineering Beyond the Ordinary” mockup: a cinematic black hole backdrop, copper headline, compact navigation, and glass project cards.

## Run locally

Requires Node.js 22.12+ and npm.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. To check the production output:

```sh
npm run build
npm run smoke:dist
npm run preview
```

The build checks TypeScript and writes static assets to `dist/`. The smoke check verifies generated JavaScript/CSS references, public assets, navigation anchors, and configured profile destinations. It does not launch a browser. No environment variables, database, or backend are required.

## Experience

English is the default; the language switch saves the preference in local storage when available. The three featured projects are Condoasa, Enterprise RAG, and Acolher. Each card expands to show its description, reported metrics, and engineering notes. “View all projects” reveals Support Copilot. Navigation links to work, technical expertise, about, and contact.

The black hole animates the background image with flowing plasma, moving rim highlights, star shimmer, and eased mouse parallax. “Pause motion” / “Pausar animação” freezes the scene; the control also resumes it. Rendering pauses while the opening is offscreen or the document is hidden. Reduced motion, unavailable WebGL, or a lost WebGL context show the static backdrop. Context restoration can resume animation. The manual pause selection resets when changing language because the scene is recreated.

The résumé download is Portuguese in both languages. Contact uses email reveal, GitHub, and LinkedIn.

## Editing

| File | Responsibility |
| --- | --- |
| `src/main.ts` | Language selection, page rendering, scene lifecycle, project visibility, and email reveal. |
| `src/content.ts` | Bilingual content, project records, and skills. |
| `src/views.ts` | Semantic markup, navigation, expandable cards, and animation control labels. |
| `src/scene.ts` | Lazy-loaded Three.js shader, image alignment, animation scheduling, and cleanup. |
| `src/style.css` | Responsive layout, typography, focus styles, and static backdrop. |
| `public/event-horizon.webp` | Shared background for CSS and the shader; see [asset notes](docs/context/redesign-assets.md). |
| `public/francisco-soares-cv.pdf` | Downloadable Portuguese résumé. |

Career claims come from the supplied résumé; metrics are reported project results, not independently verified benchmarks. Google Fonts is an external runtime dependency with system font fallbacks.

## Verification and privacy

Production builds and smoke checks passed after the redesign and animation enhancement. Chromium checks covered desktop/mobile rendering, language persistence, expandable projects, email reveal, animation pause/resume, reduced motion, offscreen scheduling, and WebGL fallback/recovery. These were one-off browser checks, not a committed automated browser suite. Remaining checks include broader browser/device coverage, keyboard and zoom acceptance, hidden-tab scheduling, and mobile performance profiling. See [test evidence](docs/execution/test_evidence.md).

The revealed email remains extractable from client code. The résumé includes email and phone details. Email reveal discourages casual scraping; it does not provide access control.

## GitHub Pages

[The Pages workflow](.github/workflows/deploy-pages.yml) installs dependencies, builds, runs the smoke check, and deploys `dist/` on pushes to `main` or manual dispatch. In repository **Settings → Pages → Build and deployment**, use **GitHub Actions** as the source. Serving the repository root directly loads uncompiled TypeScript.

Vite uses relative asset URLs for project Pages paths such as `/home/`. The résumé and shader texture use Vite’s base URL. Earlier compiled asset delivery was verified on Pages; the redesign and animation work were checked locally and were not deployed during those tasks. Current production status has not been rechecked for this documentation update.

## Documentation

- [Product and scope](docs/context/product.md)
- [Architecture and animation lifecycle](docs/context/architecture.md)
- [Design asset provenance](docs/context/redesign-assets.md)
- [Roadmap and remaining verification](docs/context/roadmap.md)
- [Testing procedure](docs/standards/testing.md)
- [Current task](docs/execution/current_task.md) and [work log](docs/execution/work_log.md)
