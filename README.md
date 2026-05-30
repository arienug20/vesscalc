# VessCalc - Pressure Vessel & Heat Exchanger Quick Sizer

VessCalc adalah web-based engineering tool untuk preliminary sizing pressure vessel (ASME VIII Div. 1) dan shell & tube heat exchanger (TEMA). Semua komputasi berjalan client-side — tidak ada backend server.

## Tech Stack

- **Framework**: React 18 + Vite + TypeScript
- **State Management**: Zustand + IndexedDB
- **UI**: TailwindCSS
- **Testing**: Vitest (unit) + Playwright (E2E)
- **Package Manager**: pnpm

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test

# Run E2E tests
pnpm test:e2e
```

## Features

- **Pressure Vessel** (Partial)
  - Shell thickness calculation (UG-27)
  - Head thickness calculation (UG-32) - All 6 types
  - Nozzle reinforcement (UG-37)
  - Material library with ASME II Part D data

- **Heat Exchanger** (Coming soon)
  - Thermal design (Q=U·A·LMTD)
  - Film coefficients (Dittus-Boelter, Kern method)
  - Pressure drop calculations
  - TEMA type selection

## Usage

1. Open the app in browser
2. Select "Pressure Vessel" tab
3. Enter design conditions (pressure, temperature, material)
4. Click "Calculate"
5. View results for shell and head thickness

## Development Status

**Phase 1 - In Progress** (Sprint 1-2)
- [x] Project setup with React + Vite + TypeScript
- [x] TailwindCSS configuration
- [x] Zustand stores with IndexedDB
- [x] Core TypeScript interfaces
- [x] Material database (ASME II Part D)
- [x] Shell thickness calculation (UG-27)
- [x] Head thickness calculation (UG-32) - All 6 types
- [x] Nozzle reinforcement (UG-37)
- [x] Basic UI components
- [x] Initial vessel calculator UI
- [ ] Unit tests
- [ ] GitHub Actions CI
- [ ] Remaining vessel calculations

## License

MIT

## Contributing

Contributions welcome! Please see TODO.md for current priorities.