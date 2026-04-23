# Changelog
## ChequePrint Pro

All notable changes to this project are documented here.
Format: [Version] — Date — Summary

---

## [1.0.0] — April 2026 — Initial Release

### Added
- Support for 15 Indian bank cheque templates (SBI, HDFC, ICICI, Axis, PNB, BoB, Kotak, Canara, Union, IndusInd, Yes, IDBI, Federal, South Indian, Bank of India)
- Cheque data entry form with real-time validation
- Auto-generation of amount in words (Indian locale: lakhs/crores)
- Live WYSIWYG cheque preview canvas
- Direct print to OS printer with custom paper size support
- Printer calibration wizard with X/Y offset correction
- Batch cheque printing via CSV/Excel import
- Local SQLite cheque records database
- Cheque cancellation with reason tracking
- CSV export of records
- Custom bank template creator with drag-and-drop field positioning
- Application settings panel
- Database backup and restore
- Windows NSIS installer
- macOS DMG installer
- Linux AppImage

### Fixed
- N/A (Initial release)

### Known Issues
- MICR printing not supported (planned for v1.1)
- Network-mapped drives unsupported for database storage
- Custom paper size registration manual on some HP printer models

---

## [Planned] v1.1.0 — July 2026

### Planned
- Hindi language support
- MICR font for cheque number field (magnetic ink)
- PDF preview export
- Dark mode UI
- Multi-account support
- Auto-backup scheduler
- Cloud backup (optional, opt-in)

