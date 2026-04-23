# ChequePrint Pro
## Cheque Printing Software for India — Complete Documentation Package

---

## About This Package

This documentation package contains everything needed to understand, build, and use ChequePrint Pro — a desktop application for printing cheques on physical cheque leaves using any standard inkjet or laser printer.

---

## Document Index

| File | Description |
|------|-------------|
| `01_AI_Creation_Prompt.md` | **Master AI Prompt** — Complete prompt to build the software from scratch using an AI coding assistant |
| `02_Technical_Documentation.md` | System architecture, database schema, module reference, print engine, IPC API |
| `03_Product_Requirements_Document.md` | PRD with user stories, acceptance criteria, risks, and feature prioritization |
| `04_API_Module_Reference.md` | All module APIs with TypeScript signatures and examples |
| `05_User_Manual.md` | End-user guide: installation, printing, calibration, batch printing, records |
| `06_Test_Plan.md` | Unit tests, integration tests, E2E checklist, UAT plan |
| `07_Deployment_and_Setup_Guide.md` | Developer build setup, CI/CD, code signing, release checklist |
| `08_Changelog.md` | Version history and roadmap |
| `09_License.md` | MIT license and third-party library attributions |

---

## Quick Start for AI Assistants

To build this software using an AI coding assistant (Claude, GPT-4, Gemini, etc.):

1. Open `01_AI_Creation_Prompt.md`
2. Copy the entire content
3. Paste into the AI assistant as your initial prompt
4. For specific modules, reference `04_API_Module_Reference.md`
5. For database schema, reference `02_Technical_Documentation.md` Section 2

---

## Software Summary

**ChequePrint Pro** is a cross-platform Electron desktop application that:
- Supports 15+ major Indian banks with pre-configured cheque templates
- Auto-generates amount-in-words in Indian locale (lakhs, crores)
- Provides a live WYSIWYG preview before printing
- Includes a printer calibration wizard for precise alignment
- Supports batch printing from CSV/Excel
- Maintains a complete local SQLite record of all printed cheques
- Works 100% offline with no internet requirement
- Targets Canon PIXMA MG2500 and similar inkjet printers

---

## Target Stack

| Layer | Technology |
|-------|-----------|
| Shell | Electron.js v28+ |
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS v3 |
| State | Zustand |
| Database | SQLite (better-sqlite3) |
| Validation | Zod |
| Import | PapaParse + xlsx.js |

