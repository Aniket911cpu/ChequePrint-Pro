# User Manual
## ChequePrint Pro — Complete User Guide

**Version:** 1.0.0  
**Supported OS:** Windows 10/11, macOS 12+, Ubuntu 20.04+

---

## Table of Contents
1. Installation
2. First-Time Setup
3. Printing Your First Cheque
4. Calibrating Your Printer
5. Batch Cheque Printing
6. Managing Cheque Records
7. Creating Custom Bank Templates
8. Settings & Configuration
9. Backup & Restore
10. Troubleshooting
11. Frequently Asked Questions

---

## 1. Installation

### Windows
1. Download `ChequePrintPro-Setup-1.0.0.exe` from the official website.
2. Double-click the installer file.
3. If Windows Defender SmartScreen appears, click **More info** → **Run anyway**.
4. Follow the on-screen installer steps. Installation takes approximately 1–2 minutes.
5. Launch the application from the Desktop shortcut or Start Menu.

### macOS
1. Download `ChequePrintPro-1.0.0.dmg`.
2. Open the DMG file and drag **ChequePrint Pro** to your **Applications** folder.
3. On first launch, right-click the app → **Open** (required once due to macOS Gatekeeper).

### Linux (Ubuntu/Debian)
1. Download `ChequePrintPro-1.0.0.AppImage`.
2. Right-click the file → **Properties** → **Permissions** → Enable "Allow executing as program".
3. Double-click to run.

---

## 2. First-Time Setup

On first launch, ChequePrint Pro will:
1. Create a local database in your user data folder.
2. Load all pre-configured bank templates.
3. Open the **Welcome Wizard** to guide you through initial configuration.

### Welcome Wizard Steps
**Step 1: Select Your Primary Bank**
- Choose your most frequently used bank from the dropdown list.
- This becomes your default bank on the main form.

**Step 2: Set Printer Preferences**
- Select your printer from the list of installed printers.
- The selected printer will be used for all print jobs.

**Step 3: Run Calibration (Recommended)**
- Click **Start Calibration** to run the printer alignment wizard.
- See Section 4 for detailed calibration steps.

**Step 4: Finish**
- Click **Get Started** to open the main application.

---

## 3. Printing Your First Cheque

### Step 1: Open the New Cheque Form
- Click **📝 New Cheque** in the left sidebar.

### Step 2: Select Your Bank
- Click the **Bank** dropdown at the top of the form.
- Select your bank (e.g., "HDFC Bank").
- The live preview on the right will update to show your bank's cheque template.

### Step 3: Fill in Cheque Details

| Field | Description | Example |
|-------|-------------|---------|
| **Pay To** | Full name of the payee | "Rajesh Kumar" |
| **Amount (₹)** | Amount in numbers | 25000 |
| **Amount in Words** | Auto-generated — verify it | "Twenty Five Thousand Only" |
| **Date** | Cheque date | 15/04/2026 |
| **Cheque No.** | Optional reference | 000101 |
| **Narration** | Internal note (not printed) | "Rent April 2026" |

> **Tip:** The **Amount in Words** field is automatically filled when you type in the **Amount** field. Always verify it before printing.

### Step 4: Verify the Preview
- The right panel shows a live preview of your cheque.
- Each field appears in its exact print position.
- If any field looks misaligned, go to **Settings > Calibration** to adjust offsets.

### Step 5: Load Cheque Leaf
- Open your printer's paper tray/rear feed slot.
- Place your blank cheque leaf **print side up**, aligned to the left guide.
- Close the tray or confirm the cheque is in position.

### Step 6: Print
- Click the green **🖨️ Print Cheque** button.
- Select your printer from the print dialog (if not already selected).
- Click **Print**.
- The cheque will print and the record will be saved automatically.

### Step 7: Verify the Output
- Hold the printed cheque against light or compare with the preview.
- If offsets are incorrect, see Section 4 (Calibration).

---

## 4. Calibrating Your Printer

Calibration ensures the printed text lands exactly in the right fields on your physical cheque leaf. **Do this once per bank per printer.**

### Step 1: Open Calibration Wizard
- Click **🖨️ Calibrate** in the left sidebar.
- Select your bank and printer.
- Click **Start Calibration**.

### Step 2: Print Test Page
- Click **Print Test Page**.
- This prints a grid with crosshair markers on plain A4 paper.
- **Do not use a cheque leaf for this step — use plain A4 paper.**

### Step 3: Measure Offset
- Take a blank cheque leaf and place it over the printed test page.
- Align the cheque leaf to the top-left corner of the paper.
- Hold both sheets up to a light source (window or lamp).
- Observe where the crosshair markers fall relative to the cheque's printed guidelines.
- Measure the horizontal (X) and vertical (Y) difference in millimetres using a ruler.

### Step 4: Enter Offset Values
- Return to the Calibration Wizard.
- Enter the measured offset:
  - **X Offset (mm):** Positive = shift right, Negative = shift left
  - **Y Offset (mm):** Positive = shift down, Negative = shift up
- Click **Apply & Save**.

### Step 5: Test Print
- Print one cheque on a real cheque leaf to verify alignment.
- Repeat Step 4 with fine adjustments if needed (usually ±0.5 mm refinements).

> **Typical offset range for Canon PIXMA MG2500:** X: -2mm to +2mm, Y: -1mm to +3mm

---

## 5. Batch Cheque Printing

### Prepare Your Data File

Create a CSV or Excel file with these columns:

```
payee_name, amount, date, cheque_number, narration
Rajesh Kumar, 25000, 15/04/2026, 000101, Office Rent
Sharma Traders, 150000, 15/04/2026, 000102, Material Purchase
```

- **Required columns:** `payee_name`, `amount`, `date`
- **Optional columns:** `cheque_number`, `narration`, `account_ref`
- Date format must be `DD/MM/YYYY`
- Amount must be numeric (no currency symbol, no commas)

### Import & Print

1. Click **📦 Batch Print** in the sidebar.
2. Click **Import File** and select your CSV or Excel file.
3. The application will validate all rows and show a table with:
   - Green rows: Valid, ready to print.
   - Red rows: Errors found — hover to see the error message.
4. Fix errors in your source file and re-import, or uncheck invalid rows.
5. Verify the total: number of cheques and total amount displayed at the top.
6. Load the corresponding number of blank cheque leaves in your printer.
7. Click **Print All Selected** to begin batch printing.

> **Warning:** Batch printing prints each cheque individually. Do NOT add multiple cheque leaves at once — load them one by one when prompted, or use a printer with a sheet feeder.

---

## 6. Managing Cheque Records

### View Records
- Click **📋 Records** in the sidebar.
- All printed cheques are listed with date, payee, amount, and status.

### Search & Filter
- Use the **Search** bar to find by payee name or cheque number.
- Use the **Bank** filter to view only a specific bank's cheques.
- Use the **Date Range** filter for date-based queries.
- Use the **Status** filter to view Printed, Pending, or Cancelled cheques.

### Cancel a Cheque
1. Find the cheque in the records list.
2. Click the **⋮ menu** → **Cancel Cheque**.
3. Enter the reason for cancellation.
4. Click **Confirm Cancel**.
- The cheque status changes to **Cancelled** and the reason is recorded.

### Export Records
1. Apply any desired filters.
2. Click **Export to CSV**.
3. Choose a save location.
4. The exported file contains all visible records in CSV format.

---

## 7. Creating Custom Bank Templates

If your bank is not in the built-in list:

1. Click **🏦 Banks** → **Add Custom Bank**.
2. Enter:
   - Bank Name
   - Cheque paper width (mm) and height (mm) — measure your cheque leaf with a ruler
   - Orientation (Landscape recommended)
3. Click **Design Template**.
4. In the template designer:
   - A blank canvas appears at your specified paper size.
   - Drag field labels (Payee, Amount, Date) to their correct positions.
   - Use the ruler guides to align precisely.
   - Test with a sample print on plain paper.
5. Click **Save Template**.

> **Tip:** Take a high-resolution photo of your blank cheque leaf and upload it as a reference image in the template designer to use as a visual guide.

---

## 8. Settings & Configuration

Access via **⚙️ Settings** in the sidebar.

| Setting | Description |
|---------|-------------|
| Default Bank | Pre-selects a bank on the New Cheque form |
| Default Printer | Pre-selects printer for all print jobs |
| Auto-Increment Cheque No. | Automatically numbers cheques sequentially |
| Starting Cheque Number | Sets the starting number for auto-increment |
| Date Format | DD/MM/YYYY or DD-MM-YYYY |
| Currency Symbol | ₹ (Rupee) or Rs. |
| Default Font | Arial, Times New Roman, or Courier New |
| Default Font Size | 8pt to 14pt (recommended: 10–11pt) |

---

## 9. Backup & Restore

### Create Backup
1. Go to **⚙️ Settings** → **Database** tab.
2. Click **Create Backup**.
3. Choose a save location (USB drive, cloud storage folder, etc.).
4. The backup file is saved as `chequeprintpro-backup-YYYYMMDD.db`.

### Restore Backup
1. Go to **⚙️ Settings** → **Database** tab.
2. Click **Restore from Backup**.
3. Select your backup `.db` file.
4. Confirm the restore — this will overwrite your current database.
5. The application will restart automatically.

> **Recommendation:** Create a backup at least once a week, especially before major batch print operations.

---

## 10. Troubleshooting

### Problem: Cheque prints in the wrong position
**Solution:** Run the Calibration Wizard (Section 4). Adjust X/Y offsets by ±0.5 mm increments until alignment is correct.

### Problem: Printer not listed in the dropdown
**Solution:** Ensure your printer is installed and set up in your OS. On Windows, check **Settings > Printers & Scanners**.

### Problem: Custom paper size not accepted by printer
**Solution:** Some printers require the custom paper size to be registered in the printer driver:
- Windows: **Printers & Scanners** → **Printer Properties** → **Preferences** → **Advanced** → **Paper Size** → **New**.
- Enter the exact cheque dimensions.

### Problem: Amount in words is incorrect
**Solution:** ChequePrint Pro uses the Indian number system (lakhs/crores). If you see unexpected results, ensure you entered a plain number without commas or currency symbols (e.g., enter `125000`, not `1,25,000`).

### Problem: Application won't start
**Solution:**
- Windows: Right-click the application and choose **Run as Administrator**.
- macOS: Check System Preferences > Privacy & Security > allow the app.
- Linux: Ensure AppImage has execute permission (`chmod +x ChequePrintPro.AppImage`).

### Problem: Database error on startup
**Solution:** Go to your user data folder and delete `chequeprintpro.db` (this will erase all records). Restore from backup if available.
- Windows data folder: `C:\Users\<YourName>\AppData\Roaming\ChequePrintPro\`
- macOS: `~/Library/Application Support/ChequePrintPro/`
- Linux: `~/.config/ChequePrintPro/`

---

## 11. Frequently Asked Questions

**Q: Is my cheque data stored online or shared with anyone?**  
A: No. All data is stored locally on your computer only. ChequePrint Pro does not require an internet connection and does not transmit any data.

**Q: Can I use this with any printer?**  
A: Yes, it works with any printer that supports custom paper sizes — inkjet and laser. Most consumer inkjet printers (Canon PIXMA, HP DeskJet, Epson EcoTank) are supported.

**Q: What is the maximum amount I can print?**  
A: ₹9,99,99,999 (Nine Crore Ninety Nine Lakh Ninety Nine Thousand Nine Hundred and Ninety Nine). Cheques above this amount are typically not accepted by Indian banks.

**Q: Can I print a post-dated cheque?**  
A: Yes. Simply enter a future date in the Date field. The software will accept any date within 12 months in the future.

**Q: The amount in words doesn't fit on the line. What do I do?**  
A: For very long amounts, reduce the font size for the "Amount in Words" field in **Settings > Font Size**. Alternatively, adjust the field position in the bank template editor.

**Q: My cheque leaf is a different size than the template. What do I do?**  
A: Cheque dimensions can vary slightly between branches and between old and new cheque books. Use the **Calibration Wizard** to set custom offsets that compensate for the size difference, or create a **Custom Template** with the exact dimensions of your cheque leaf.

**Q: Can I print the MICR code (numbers at the bottom of the cheque)?**  
A: MICR printing requires special magnetic ink and MICR-compatible printers. This feature is not available in v1.0. The MICR line is pre-printed on your cheque leaf by the bank.

