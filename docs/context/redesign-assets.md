# Reference redesign assets

The November 2026 redesign follows the supplied `Engineering Beyond the Ordinary.png` mockup. Page text, navigation, controls, and project cards are HTML. The decorative space scene is an optimized 1672 × 941 WebP at `public/event-horizon.webp` (98,678 bytes, about 96 KiB), generated with the built-in imagegen tool using the mockup as the edit target.

Final generation prompt:

> Use case: precise-object-edit. Asset type: clean website background image, landscape 16:9. Edit target: the supplied website mockup. Remove ALL text, headings, buttons, navigation, logo, lines, project cards, borders, UI elements, and markers. Reconstruct only the cinematic space background underneath. Preserve the composition: dark near-black blue star field with faint nebula on the entire left half, a huge photorealistic black hole at upper right around 77% width and 36% height, luminous warm copper and cream accretion disk diagonally from lower left to upper right, blue planetary crescent across lower left, subtle dark cosmic clouds at bottom. Keep left half extremely dark and quiet for HTML text overlay. No text or UI whatsoever. This is the background to reproduce the mockup as a real website.

The three featured cards open native HTML details for project descriptions, reported metrics, and engineering notes. “View all projects” reveals the fourth project. Original career content, résumé, language persistence, and email reveal remain available. Navigation includes an expertise anchor on the technical skills block.


## Animation integration

The original WebP remains the static fallback and the shader texture. `index.html` preloads it; `src/style.css` controls the desktop cover crop and the 810px-high mobile crop. `src/scene.ts` derives matching image dimensions and offsets from those computed styles before applying localized plasma displacement and light modulation.

If replacing the image, update the preload, CSS URL, shader texture URL, and public-asset smoke check together. The shader's normalized black hole center (`0.770, 0.345`), horizon radius, and disk orientation are tuned to this composition; changing the photograph may require retuning them. Recheck alignment across desktop/mobile sizing and when extra project content changes the opening's height.

No additional image generation was used for the animation enhancement. Its motion is produced in the shader. See [architecture](architecture.md) for lifecycle and rendering limits, and [test evidence](../execution/test_evidence.md) for verified behavior.
