# Product Requirements Document (PRD)
## ChequePrint Pro — Cheque Printing Software for India

**Version:** 1.0  
**Date:** April 2026  
**Product Owner:** —  
**Status:** Draft

---

## 1. Executive Summary

ChequePrint Pro is a desktop application designed for Indian individuals, small businesses, accountants, and bank staff who need to print cheques accurately on physical cheque leaves. The product eliminates manual handwriting of cheques, reduces errors, and maintains a digital record of all cheques issued.

---

## 2. Problem Statement

### Current Pain Points
- Manual cheque writing is slow (3–5 minutes per cheque) and error-prone.
- Corrections/overwriting on a cheque leaf make it invalid — wasted cheques cost money.
- No digital trail of issued cheques.
- Existing software (e.g., ChequeMan, ChequePulse) lacks support for all Indian banks, has outdated UIs, or requires complex setup.
- Consumer inkjet printers (Canon PIXMA, HP DeskJet) need precise offset calibration that most tools do not support intuitively.

### Target Users
| User Type | Description | Pain Level |
|-----------|-------------|-----------|
| Small Business Owner | Issues 20–50 cheques/month | High |
| Accountant/CA | Manages multiple client accounts | High |
| Individual | Issues 2–5 cheques/month | Medium |
| Bank Branch Staff | High volume batch printing | Very High |

---

## 3. Goals & Success Metrics

### Goals
1. Enable users to print a cheque in under 60 seconds after initial setup.
2. Support all 15+ major Indian banks out of the box.
3. Reduce cheque errors to near zero through auto-generated amount-in-words and validation.
4. Work with any standard inkjet/laser printer without special hardware.

### Success Metrics
| Metric | Target |
|--------|--------|
| Time to print first cheque (after setup) | < 60 seconds |
| Bank templates supported at launch | ≥ 15 |
| Print alignment accuracy | ± 1 mm |
| Error rate (invalid cheques due to software) | < 0.1% |
| User satisfaction score (survey) | > 4.2 / 5.0 |

---

## 4. Functional Requirements

### 4.1 Must Have (P0)
- [ ] Support for SBI, HDFC, ICICI, Axis, PNB, BoB, Kotak, Canara templates
- [ ] Data entry form with all mandatory cheque fields
- [ ] Auto amount-in-words generation (Indian locale: lakhs/crores)
- [ ] Live preview canvas before printing
- [ ] Direct print to OS printer with custom paper size
- [ ] Global offset calibration per bank × printer combination
- [ ] Local SQLite record database
- [ ] Works fully offline

### 4.2 Should Have (P1)
- [ ] Batch print from CSV/Excel import
- [ ] Printer calibration wizard
- [ ] Custom bank template creator
- [ ] Cheque record export as CSV
- [ ] Stale cheque warning (> 3 months old date)
- [ ] Auto-increment cheque number
- [ ] Windows installer (NSIS)

### 4.3 Nice to Have (P2)
- [ ] macOS and Linux installers
- [ ] Database backup and restore
- [ ] Dark mode UI
- [ ] Multi-language support (Hindi)
- [ ] PDF cheque preview export
- [ ] MICR font support for cheque number printing

---

## 5. Non-Functional Requirements

| Category | Requirement |
|----------|-------------|
| **Performance** | Application starts in < 3 seconds; print dispatch < 2 seconds |
| **Offline** | 100% offline — no internet connection required after install |
| **Privacy** | All data stored locally; no telemetry, no cloud sync |
| **Security** | Database backup encrypted with AES-256 |
| **Compatibility** | Windows 10/11 (primary), macOS 12+ (secondary), Ubuntu 20.04+ |
| **Accessibility** | WCAG AA keyboard navigation, minimum 14px fonts |
| **Reliability** | No data loss on unexpected crash (SQLite journaling) |

---

## 6. User Stories

### Epic 1: Cheque Data Entry
- **US-001:** As a user, I want to select my bank so that the correct cheque template is loaded.
- **US-002:** As a user, I want to enter the payee name so that it prints in the correct position.
- **US-003:** As a user, I want to enter the amount in numbers so that the amount-in-words is auto-generated.
- **US-004:** As a user, I want to pick the date using a calendar so that I don't make date format errors.
- **US-005:** As a user, I want to see a live preview so that I can confirm the layout before printing.

### Epic 2: Printing
- **US-006:** As a user, I want to click one button to print so that the process is fast.
- **US-007:** As a user, I want to run a calibration wizard so that my printer offset is saved.
- **US-008:** As a user, I want to print a test page on plain paper so that I can verify alignment without wasting a cheque.
- **US-009:** As a user, I want to set custom offset (X/Y in mm) so that I can fine-tune alignment.

### Epic 3: Batch Operations
- **US-010:** As an accountant, I want to import cheque data from Excel so that I can print many cheques without re-entering data.
- **US-011:** As a user, I want to review imported cheques before printing so that I can catch errors.
- **US-012:** As a user, I want to select specific cheques from a batch so that I can skip ones I don't need.

### Epic 4: Records Management
- **US-013:** As a user, I want all printed cheques saved automatically so that I have a record.
- **US-014:** As a user, I want to search records by payee or date so that I can find a specific cheque.
- **US-015:** As a user, I want to export records as CSV so that I can use them in accounting software.
- **US-016:** As a user, I want to mark a cheque as cancelled so that I know not to use it.

### Epic 5: Settings & Configuration
- **US-017:** As a user, I want to set a default bank so that I don't have to select it every time.
- **US-018:** As a user, I want to configure the default font so that the print style matches my preference.
- **US-019:** As a user, I want to backup my database so that I don't lose records.
- **US-020:** As a user, I want to create a custom bank template so that I can use any unlisted bank.

---

## 7. Out of Scope (v1.0)

- Online/cloud cheque printing
- MICR encoding (Magnetic Ink Character Recognition) for cheque numbers
- Bank account integration (balance checks, transaction sync)
- Mobile application (Android/iOS)
- Multi-user / team collaboration features
- Digital cheque signing
- ECS/NACH mandate printing

---

## 8. Assumptions & Constraints

### Assumptions
- Users have a working printer installed and configured on their OS.
- Users have physical cheque leaves from their bank.
- Cheque dimensions for each bank are accurately measured and coded into templates.

### Constraints
- Cannot guarantee 100% alignment for all printer models without calibration (hardware variation).
- Stale cheque validation is based on 3-month RBI guideline — users may override with a warning.
- MICR printing requires special magnetic ink and compatible printer — not supported in v1.0.

---

## 9. Acceptance Criteria

| Feature | Acceptance Criteria |
|---------|---------------------|
| Bank Templates | All 15 banks loadable; template fields render in correct positions on preview |
| Amount in Words | Correct output for all values from ₹1 to ₹9,99,99,999; includes "Only" suffix |
| Print Accuracy | After calibration, field positions within ±1.5 mm of template spec |
| Batch Import | Imports up to 500 rows from CSV in < 5 seconds; errors flagged per row |
| Records DB | All printed cheques appear in records within 1 second of printing |
| Offline Mode | All features functional with no active internet connection |
| Installer | Windows installer completes in < 2 minutes on standard hardware |

---

## 10. Risks & Mitigations

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Cheque dimensions vary between bank branches | Medium | High | Allow per-template calibration offset |
| OS print API differs between Windows versions | Low | Medium | Electron's print API abstracts OS differences |
| User prints on wrong printer | Medium | High | Prominent printer selector in print dialog |
| SQLite database corruption | Low | High | WAL journaling + auto-backup before each print |
| Bank cheque format changes | Low | High | Community-contributed template updates |

