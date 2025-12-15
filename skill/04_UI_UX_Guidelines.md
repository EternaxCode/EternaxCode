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
