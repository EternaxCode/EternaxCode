# 00. Project Overview

## Introduction
**EternaxCode** is a visually immersive homepage project built with Next.js. It features a high-performance 3D starfield background using React Three Fiber and a "Glassmorphism" UI aesthetic. The project is designed to be a portfolio or landing page that demonstrates modern web graphics and animation capabilities.

## Getting Started

### Prerequisites
- Node.js (Latest LTS recommended)
- `npm`

### Installation
```bash
npm install
```

### Running Locally
```bash
npm run dev
```
The application will start at `http://localhost:3000`.

## Directory Structure
- **`pages/`**: Next.js file-based routing.
  - `_app.tsx`: Global layout, theme transitions, and Starfield background initialization.
  - `index.tsx`: The main landing page with the viewport grid menu.
- **`components/`**: Reusable UI components.
  - `StarfieldCanvas.tsx`: The core 3D background component.
  - `GlassPane.tsx`: The base component for the glass UI effect.
  - `GlassHome.tsx`: The specific layout for the home screen.
- **`lib/`**: Utilities for math, colors, and 3D logic.
- **`hooks/`**: Custom hooks, largely for Frame loop management and 3D effects (`useStarfield`, `useFlare`).
- **`styles/`**: Global styles and module-specific CSS.
  - `globals.css`: Tailwind directives and base resets.
  - `glassPane.css`: Specific variable definitions for the glass effect.
