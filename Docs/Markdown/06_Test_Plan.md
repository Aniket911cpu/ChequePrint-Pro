# Test Plan & QA Document
## ChequePrint Pro — Quality Assurance

**Version:** 1.0.0  
**Testing Scope:** Unit Tests, Integration Tests, End-to-End Tests, UAT

---

## 1. Test Scope

| Area | Included |
|------|----------|
| Number-to-words conversion | ✅ Yes |
| Zod validation schemas | ✅ Yes |
| SQLite database operations | ✅ Yes |
| CSV/Excel import parsing | ✅ Yes |
| Print HTML generation | ✅ Yes |
| Electron IPC handlers | ✅ Yes |
| UI component rendering | ✅ Yes |
| End-to-end print flow | ✅ Yes |
| Printer hardware integration | ⚠️ Manual only |
| Multi-OS compatibility | ⚠️ Manual only |

---

## 2. Unit Tests

### 2.1 numberToWords Module

```javascript
// __tests__/numberToWords.test.js
describe('numberToIndianWords', () => {
  test('zero', () => expect(numberToIndianWords(0)).toBe('Zero Only'));
  test('single digit', () => expect(numberToIndianWords(5)).toBe('Five Only'));
  test('teens', () => expect(numberToIndianWords(15)).toBe('Fifteen Only'));
  test('tens', () => expect(numberToIndianWords(70)).toBe('Seventy Only'));
  test('hundreds', () => expect(numberToIndianWords(500)).toBe('Five Hundred Only'));
  test('thousands', () => expect(numberToIndianWords(5000)).toBe('Five Thousand Only'));
  test('thousands with remainder', () =>
    expect(numberToIndianWords(75050)).toBe('Seventy Five Thousand And Fifty Only'));
  test('lakhs', () =>
    expect(numberToIndianWords(100000)).toBe('One Lakh Only'));
  test('lakhs with thousands', () =>
    expect(numberToIndianWords(125000)).toBe('One Lakh Twenty Five Thousand Only'));
  test('crores', () =>
    expect(numberToIndianWords(10000000)).toBe('One Crore Only'));
  test('crores with lakhs and thousands', () =>
    expect(numberToIndianWords(15250000)).toBe('One Crore Fifty Two Lakh Fifty Thousand Only'));
  test('max amount', () =>
    expect(numberToIndianWords(999999999)).toBe(
      'Ninety Nine Crore Ninety Nine Lakh Ninety Nine Thousand Nine Hundred And Ninety Nine Only'
    ));
});
```

### 2.2 Validation Schema

```javascript
// __tests__/validation.test.js
describe('chequeSchema', () => {
  const validData = {
    payee_name: 'Rajesh Kumar',
    amount: 25000,
    cheque_date: '15/04/2026',
    bank_code: 'HDFC'
  };

  test('valid cheque passes', () => {
    expect(() => validateCheque(validData)).not.toThrow();
  });

  test('empty payee fails', () => {
    expect(() => validateCheque({ ...validData, payee_name: '' })).toThrow();
  });

  test('zero amount fails', () => {
    expect(() => validateCheque({ ...validData, amount: 0 })).toThrow();
  });

  test('amount over limit fails', () => {
    expect(() => validateCheque({ ...validData, amount: 1000000000 })).toThrow();
  });

  test('wrong date format fails', () => {
    expect(() => validateCheque({ ...validData, cheque_date: '2026-04-15' })).toThrow();
  });

  test('stale date (>3 months ago) fails', () => {
    expect(() => validateCheque({ ...validData, cheque_date: '01/01/2025' })).toThrow();
  });

  test('future date passes', () => {
    expect(() => validateCheque({ ...validData, cheque_date: '15/06/2026' })).not.toThrow();
  });

  test('valid IFSC passes', () => {
    const data = { ...validData, ifsc_code: 'HDFC0001234' };
    expect(() => validateCheque(data)).not.toThrow();
  });

  test('invalid IFSC fails', () => {
    const data = { ...validData, ifsc_code: 'INVALID123' };
    expect(() => validateCheque(data)).toThrow();
  });

  test('payee name over 80 chars fails', () => {
    const data = { ...validData, payee_name: 'A'.repeat(81) };
    expect(() => validateCheque(data)).toThrow();
  });
});
```

### 2.3 CSV Import

```javascript
// __tests__/csvImport.test.js
describe('validateRows', () => {
  test('valid row passes', () => {
    const rows = [{ payee_name: 'Test', amount: '5000', date: '15/04/2026' }];
    const result = validateRows(rows);
    expect(result[0].valid).toBe(true);
  });

  test('missing payee_name flagged', () => {
    const rows = [{ amount: '5000', date: '15/04/2026' }];
    const result = validateRows(rows);
    expect(result[0].valid).toBe(false);
    expect(result[0].errors).toContain('payee_name is required');
  });

  test('non-numeric amount flagged', () => {
    const rows = [{ payee_name: 'Test', amount: 'abc', date: '15/04/2026' }];
    const result = validateRows(rows);
    expect(result[0].valid).toBe(false);
  });

  test('wrong date format flagged', () => {
    const rows = [{ payee_name: 'Test', amount: '5000', date: '2026-04-15' }];
    const result = validateRows(rows);
    expect(result[0].valid).toBe(false);
  });
});
```

---

## 3. Integration Tests

### 3.1 Database Integration

```javascript
// __tests__/db.integration.test.js
describe('SQLite Operations', () => {
  let db;

  beforeAll(() => {
    db = initTestDatabase(':memory:'); // In-memory SQLite for tests
  });

  test('saves cheque record successfully', async () => {
    const result = await saveRecord(db, {
      bank_code: 'SBI',
      payee_name: 'Test Payee',
      amount: 10000,
      amount_words: 'Ten Thousand Only',
      cheque_date: '15/04/2026',
      status: 'printed'
    });
    expect(result.success).toBe(true);
    expect(result.id).toBeGreaterThan(0);
  });

  test('queries records by payee name', async () => {
    const result = await queryRecords(db, { payee: 'Test Payee' });
    expect(result.records.length).toBeGreaterThan(0);
    expect(result.records[0].payee_name).toBe('Test Payee');
  });

  test('cancels a record', async () => {
    const { id } = await saveRecord(db, { /* ... */ });
    await cancelRecord(db, id, 'Wrong amount entered');
    const { records } = await queryRecords(db, {});
    const record = records.find(r => r.id === id);
    expect(record.status).toBe('cancelled');
    expect(record.cancel_reason).toBe('Wrong amount entered');
  });
});
```

---

## 4. End-to-End Test Checklist

### 4.1 Manual E2E Test Cases

| Test ID | Scenario | Steps | Expected Result | Pass/Fail |
|---------|----------|-------|-----------------|-----------|
| E2E-001 | Print single SBI cheque | 1. Select SBI, 2. Fill form, 3. Click Print | Cheque prints; record saved | — |
| E2E-002 | Print single HDFC cheque | Same as above with HDFC | Cheque prints in correct positions | — |
| E2E-003 | Batch print 5 cheques from CSV | Import CSV with 5 valid rows, print all | All 5 cheques print; 5 records saved | — |
| E2E-004 | Calibration wizard | Complete all 4 steps | Offset saved; subsequent print uses offset | — |
| E2E-005 | Cancel a cheque record | Find record, cancel with reason | Status changes to Cancelled | — |
| E2E-006 | Export records to CSV | Filter by date, export | CSV file created with correct data | — |
| E2E-007 | Custom template creation | Add new bank, design template, print | Print uses custom template positions | — |
| E2E-008 | Import with errors | Import CSV with 2 valid rows + 1 invalid | Invalid row flagged; 2 valid rows printable | — |
| E2E-009 | Stale cheque warning | Enter date 4 months ago | Warning shown; print blocked or confirmed | — |
| E2E-010 | Settings persistence | Change default bank, restart app | Default bank still selected after restart | — |

---

## 5. Printer Hardware Test Matrix

Test on these printer models with Canon PIXMA MG2500 as primary target:

| Printer | OS | Status | Notes |
|---------|-----|--------|-------|
| Canon PIXMA MG2500 | Windows 10 | 🎯 Primary | Full test required |
| Canon PIXMA MG2500 | Windows 11 | ✅ Required | |
| HP DeskJet 2700 | Windows 10 | ✅ Required | |
| Epson L3250 | Windows 10 | ✅ Required | |
| Canon PIXMA MG2500 | macOS 12 | ⚠️ Secondary | |
| Generic PCL Laser | Windows 10 | ⚠️ Secondary | |

For each printer, verify:
- [ ] Custom paper size (cheque dimensions) accepted
- [ ] Calibration offset applied correctly
- [ ] Text not clipped at edges
- [ ] Print quality sufficient at 300 DPI

---

## 6. Performance Test Cases

| Test | Method | Target | Acceptable |
|------|--------|--------|------------|
| App cold start | Timer from launch to UI ready | < 2 sec | < 3 sec |
| Records query (10,000 rows) | Stopwatch | < 200ms | < 500ms |
| CSV import (500 rows) | Stopwatch | < 1 sec | < 3 sec |
| Print job dispatch | Timer to print start | < 1.5 sec | < 2 sec |
| Preview render on field change | Frame timer | < 30ms | < 50ms |
| Installer size | File size check | < 90 MB | < 120 MB |

---

## 7. Security Test Cases

| Test | Expected Result |
|------|-----------------|
| No outgoing network connections | Verified via network monitor |
| SQLite file not readable without app | File not plain text (WAL journaling) |
| Backup file AES encryption | Backup cannot be opened without password |
| No logging of sensitive data (amounts, payees) to console | Verified |
| Input sanitization (XSS in payee name) | HTML escaped in print document |

---

## 8. UAT (User Acceptance Testing) Checklist

Test with 5 target users (2 small business owners, 2 accountants, 1 individual):

- [ ] User can install without IT support
- [ ] User can print first cheque in < 5 minutes (no calibration)
- [ ] Calibration wizard understood and completed independently
- [ ] Batch import from their existing Excel file works
- [ ] Records search returns expected results
- [ ] User rates overall experience ≥ 4/5

