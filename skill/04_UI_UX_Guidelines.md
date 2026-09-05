# 04. UI/UX Guidelines

## Design Philosophy
EternaxCode follows a **"Futuristic Glass"** aesthetic. The key elements are transparency, blur (backdrop-filter), and a deep 3D background that provides depth.

## The "Glass" System
The project uses a sophisticated CSS variable system for the glass effect, controlled in `_app.tsx` and `styles/glassPane.css`.

### Usage
Use the `<GlassPane />` or `<MenuPane />` components. These components automatically subscribe to the CSS variables defined in global scope.

### CSS Variables (`styles/glassPane.css`)
- `--glass-blur`: Controls the `backdrop-filter: blur()`. Current defaults defined in `uiConstants.ts`.
- `--glass-bg-o`: Background opacity.
- `--glass-border-o`: Border opacity.

### Theme Transition
The theme color changes based on the route.
- **Home (`/`)**: Default Cyan/Blue theme.
- **About (`/about`)**: defined in `UI.THEME.about`
- **Product (`/product`)**: defined in `UI.THEME.product`
- **Contact (`/contact`)**: defined in `UI.THEME.contact`

The transitions are handled by Framer Motion in `_app.tsx` and the `starfieldBackground` global controller.

## Animations
### Page Transitions
Pages fade in/out using `AnimatePresence` in `_app.tsx`.
- Duration: 0.35s
- Easing: `easeOut`

### Micro-interactions
- **Hover**: Glass panes increase blur and opacity on hover.
- **Click**: Menu panes scale down slightly.

## 3D Starfield
The background is a custom Point Cloud system rendered via React Three Fiber.
- **Stars**: ~8000 points generated in a sphere.
- **Movement**: Camera flies through the field (Wormhole effect).
- **Responsiveness**: Star density and camera FOV adjust based on device performance (implied by hook logic).

## Pixel-Art Theme (Game pages)
Projects with `type: 'game'` in `lib/worksData.ts` are rendered by `components/GameDetail.tsx` instead of the glass case-study layout.
- **Styles**: `styles/pixelGame.module.css` — chunky 4px borders, hard drop shadows, CRT scanlines, stepped (`steps()`) animations.
- **Fonts**: `Galmuri11` (Korean bitmap font, SIL OFL, loaded from jsDelivr in the module) for Korean/body text and `Press Start 2P` (Google Fonts, loaded in `_document.tsx`) for HUD/labels.
- **Sprites**: defined as character grids in `lib/pixelSprites.ts` and rendered as crisp SVG by `components/PixelSprite.tsx`. Add a sprite there and reference it by key from the game data.
- **Thumbnail**: `public/works/bbang-eonjeon.png` is a 1200×630 title-screen composition built from the same sprites.

## Project Status
`WorkProjectBase.status` (`live` | `in-development` | `discontinued`) drives the status badge on work cards and the notice banner on case-study pages. Discontinued projects (e.g. Econalk) keep their case study as an archive, with the live link removed and the thumbnail greyed out.
