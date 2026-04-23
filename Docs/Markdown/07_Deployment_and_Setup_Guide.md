# Deployment & Setup Guide
## ChequePrint Pro — Developer Build & Release

**Version:** 1.0.0

---

## 1. Development Environment Setup

### Prerequisites

| Tool | Version | Install |
|------|---------|---------|
| Node.js | 20 LTS | https://nodejs.org |
| npm | 10.x | Bundled with Node.js |
| Git | 2.40+ | https://git-scm.com |
| Windows Build Tools | Latest | `npm install -g windows-build-tools` (Windows only) |

### Clone & Install

```bash
git clone https://github.com/your-org/chequeprintpro.git
cd chequeprintpro
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
NODE_ENV=development
APP_VERSION=1.0.0
```

---

## 2. Project Scripts

```bash
# Start in development mode (Electron + Vite hot reload)
npm run dev

# Run unit tests
npm run test

# Run tests with coverage report
npm run test:coverage

# Lint code
npm run lint

# Build frontend (Vite)
npm run build

# Build Electron app for current OS
npm run build:electron

# Build installers for all platforms (requires macOS for DMG)
npm run dist:all
```

---

## 3. Build Process

### 3.1 Frontend Build (Vite)

```bash
npm run build
```

Output directory: `./build/`

### 3.2 Electron Package

```bash
npm run build:electron
```

Uses `electron-builder` with config from `electron-builder.config.js`.

Output directory: `./dist/`

| Platform | Output File |
|----------|------------|
| Windows | `dist/ChequePrintPro-Setup-1.0.0.exe` |
| macOS | `dist/ChequePrintPro-1.0.0.dmg` |
| Linux | `dist/ChequePrintPro-1.0.0.AppImage`, `dist/ChequePrintPro-1.0.0.deb` |

---

## 4. Code Signing

### Windows Code Signing

```bash
# Set environment variables for code signing
export CSC_LINK=./cert/certificate.p12
export CSC_KEY_PASSWORD=your_certificate_password

npm run dist:win
```

### macOS Code Signing

```bash
export APPLE_ID=your@email.com
export APPLE_ID_PASSWORD=your_app_specific_password
export APPLE_TEAM_ID=YOUR_TEAM_ID

npm run dist:mac
```

> **Note:** macOS builds require notarization via Apple's notarization service for distribution outside the App Store.

---

## 5. Release Checklist

Before every release:

- [ ] All unit tests passing (`npm run test`)
- [ ] Zero lint errors (`npm run lint`)
- [ ] Version number updated in `package.json`
- [ ] Changelog updated
- [ ] Bank templates verified against latest cheque leaf measurements
- [ ] E2E tests passing on Windows 10, Windows 11
- [ ] Installer size < 120 MB
- [ ] Code signed (Windows .exe, macOS .dmg)
- [ ] SHA-256 hash published alongside download

---

## 6. Database Migration

On version upgrades, the database schema may change. Migrations are run automatically on startup via the migration manager:

```javascript
// electron/db/migrate.js
const migrations = [
  {
    version: 1,
    up: `ALTER TABLE cheque_records ADD COLUMN batch_id TEXT;`
  },
  {
    version: 2,
    up: `CREATE INDEX IF NOT EXISTS idx_cheque_date ON cheque_records(cheque_date);`
  }
];
```

Migration version is tracked in `app_settings` table under key `db_version`.

---

## 7. Logging

Application logs are written to:
- **Windows:** `%APPDATA%\ChequePrintPro\logs\app.log`
- **macOS:** `~/Library/Logs/ChequePrintPro/app.log`
- **Linux:** `~/.config/ChequePrintPro/logs/app.log`

Log levels: `ERROR`, `WARN`, `INFO`, `DEBUG` (debug disabled in production builds).

Sensitive data (payee names, amounts) is **never logged**.

---

## 8. Known Issues & Workarounds

| Issue | Affected OS | Workaround |
|-------|-------------|-----------|
| Custom paper size silently ignored on some HP printers | Windows 10 | Register custom size via HP driver settings panel manually |
| AppImage requires FUSE on older Ubuntu | Ubuntu 18.04 | `sudo apt install fuse` |
| SQLite WAL lock on network drives | All | Always store database on local drive, not NAS/network path |
| macOS 14 (Sonoma) security quarantine | macOS 14 | `xattr -d com.apple.quarantine ChequePrintPro.app` |

