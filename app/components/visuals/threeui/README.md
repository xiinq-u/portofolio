Source: https://threeui.com/source-code/energy-orb.json

Registered source hashes are stored in source-manifest.json. The shader source and registered HTML/CSS remain byte-for-byte unchanged.

Next.js adaptations:
- GlobeCollection uses generated .source.ts string modules instead of Vite ?raw imports. Their exported strings preserve the HTML exactly.
- EnergyOrb dispatches energy-orb-frame synchronously after gl.drawArrays. Story copies that live buffer into its reflection before WebGL discards the drawing buffer; no second WebGL renderer or independent animation clock is used.
- Reduced motion freezes shader time and stops continuous frames. Resize and visibility changes request a fresh frame.
- Story imports scoped copies of the authored host/canvas layout rules; unrelated shared stylesheet fonts and components are not loaded.

Sizing: the authored sphere diameter is 62% of its square canvas. Story accounts for that inset. Requested responsive diameters are capped at 57dvh to keep the sphere between the 5% sky anchor and the 62% horizon on short screens. These constraints cannot all hold simultaneously with an uncapped 650px minimum on a typical laptop viewport.
