# Changelog — ChequePrint Pro

## [1.0.1] - 2026-04-23

### Added
- **Expanded Bank Library**: Added 11 new bank templates (Axis, BOI, YES, Canara, CITI, HSBC, Union, Central, IDBI, South Indian, IndusInd).
- **Multi-Printer Calibration**: Implemented per-printer X/Y offset support in the print engine and UI.
- **Regional Language Support**: Added support for 10 regional languages (EN, HI, MR, GU, TA, TE, KN, ML, BN, PA).
- **Global TopBar**: New header component with search, notifications, user profile, and language dropdown.
- **Localization Dropdown**: Replaced toggle with a stylized dropdown for language selection.

### Fixed
- **Rules of Hooks Violation**: Fixed crash in `ChequePreview.jsx` caused by conditional hook calls.
- **ReferenceErrors**: 
  - Fixed `t is not defined` in `PrintCheque.jsx`.
  - Fixed `BrowserWindow is not defined` in `ipcHandlers.js` for printer enumeration.
- **Infinite Recursion**: Fixed `History` component trying to render itself instead of the icon.
- **Missing Data**: Added mock infrastructure logs to `Systems.jsx` to prevent crash.
- **Icon Imports**: Resolved multiple missing `lucide-react` icon imports across all pages.
- **Vite/PostCSS Config**: Updated `postcss.config.js` and dependencies for Tailwind v4 compatibility.

### Changed
- **Navigation Layout**: Moved language switcher from Sidebar to TopBar.
- **Store Architecture**: Split `useChequeStore` and `useSettingsStore` into separate files for better modularity.
- **Dependency Downgrade**: Reverted Vite to v6 for better compatibility with current React plugins.

---
*Precision Printing. Secure Banking.*
