import { ipcMain, dialog } from 'electron';
import db from './database.js';
import fs from 'fs';
import { printCheque, printBatch, printTest } from './print.js';

// Settings Handlers
ipcMain.handle('settings:get', () => {
  const settings = db.prepare('SELECT * FROM app_settings').all();
  return settings.reduce((acc, { key, value }) => ({ ...acc, [key]: value }), {});
});

ipcMain.handle('settings:set', (event, key, value) => {
  return db.prepare('INSERT OR REPLACE INTO app_settings (key, value) VALUES (?, ?)').run(key, value);
});

// Database Handlers
ipcMain.handle('db:save', (event, record) => {
  const stmt = db.prepare(`
    INSERT INTO cheque_records (
      cheque_number, bank_code, payee_name, amount, amount_words, 
      cheque_date, account_ref, ifsc_code, narration, status, batch_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  return stmt.run(
    record.cheque_number, record.bank_code, record.payee_name, record.amount, record.amount_words,
    record.cheque_date, record.account_ref, record.ifsc_code, record.narration, record.status || 'printed', record.batch_id
  );
});

ipcMain.handle('db:query', (event, query) => {
  let sql = 'SELECT * FROM cheque_records';
  if (query) {
    // Add filtering logic if needed
  }
  return db.prepare(sql + ' ORDER BY printed_at DESC').all();
});

ipcMain.handle('db:getTemplates', () => {
  const templates = db.prepare('SELECT * FROM bank_templates').all();
  return templates.map(t => ({
    ...t,
    fields: db.prepare('SELECT * FROM template_fields WHERE template_id = ?').all(t.id)
  }));
});

ipcMain.handle('db:getCalibration', (event, templateId) => {
  return db.prepare('SELECT * FROM printer_calibration WHERE template_id = ?').all(templateId);
});

// File System Handlers
ipcMain.handle('dialog:openFile', async (event, filters) => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: filters || [
      { name: 'Data Files', extensions: ['csv', 'xlsx', 'xls'] }
    ]
  });
  if (canceled) return null;
  return filePaths[0];
});

ipcMain.handle('fs:readFile', (event, filePath) => {
  return fs.readFileSync(filePath, 'utf8');
});

ipcMain.handle('fs:readFileBinary', (event, filePath) => {
  return fs.readFileSync(filePath);
});

// Print Handlers
ipcMain.handle('print:cheque', (event, payload) => {
  return printCheque(payload);
});

ipcMain.handle('print:batch', (event, payload) => {
  return printBatch(payload);
});

ipcMain.handle('print:test', () => {
  return printTest();
});
