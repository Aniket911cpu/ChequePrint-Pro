import Database from 'better-sqlite3';
import path from 'path';
import { app } from 'electron';
import fs from 'fs';

const isDev = process.env.NODE_ENV === 'development';
const dbPath = isDev 
  ? path.join(process.cwd(), 'chequeprint.db') 
  : path.join(app.getPath('userData'), 'chequeprint.db');

const db = new Database(dbPath);
db.pragma('journal_mode = WAL');

export function initDatabase() {
  // Bank templates
  db.prepare(`
    CREATE TABLE IF NOT EXISTS bank_templates (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      bank_name   TEXT NOT NULL,
      bank_code   TEXT UNIQUE NOT NULL,
      width_mm    REAL NOT NULL,
      height_mm   REAL NOT NULL,
      orientation TEXT DEFAULT 'landscape' CHECK(orientation IN ('portrait','landscape')),
      created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
      is_custom   INTEGER DEFAULT 0
    )
  `).run();

  // Fields within each bank template
  db.prepare(`
    CREATE TABLE IF NOT EXISTS template_fields (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      template_id INTEGER NOT NULL REFERENCES bank_templates(id) ON DELETE CASCADE,
      field_name  TEXT NOT NULL,
      x_mm        REAL NOT NULL,
      y_mm        REAL NOT NULL,
      max_width_mm REAL,
      font_size   INTEGER DEFAULT 10,
      font_face   TEXT DEFAULT 'Arial',
      is_bold     INTEGER DEFAULT 0
    )
  `).run();

  // Printer calibration offsets
  db.prepare(`
    CREATE TABLE IF NOT EXISTS printer_calibration (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      template_id INTEGER NOT NULL REFERENCES bank_templates(id) ON DELETE CASCADE,
      printer_name TEXT NOT NULL,
      offset_x_mm REAL DEFAULT 0,
      offset_y_mm REAL DEFAULT 0,
      updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  // Cheque records
  db.prepare(`
    CREATE TABLE IF NOT EXISTS cheque_records (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      cheque_number TEXT,
      bank_code     TEXT NOT NULL,
      payee_name    TEXT NOT NULL,
      amount        REAL NOT NULL,
      amount_words  TEXT NOT NULL,
      cheque_date   TEXT NOT NULL,
      account_ref   TEXT,
      ifsc_code     TEXT,
      narration     TEXT,
      status        TEXT DEFAULT 'printed' CHECK(status IN ('printed','pending','cancelled')),
      cancel_reason TEXT,
      printed_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
      batch_id      TEXT
    )
  `).run();

  // Application settings
  db.prepare(`
    CREATE TABLE IF NOT EXISTS app_settings (
      key   TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )
  `).run();

  // Users table
  db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name  TEXT NOT NULL,
      email      TEXT UNIQUE NOT NULL,
      password   TEXT NOT NULL,
      role       TEXT DEFAULT 'Admin' CHECK(role IN ('Admin','Manager','Printer')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  seedDefaults();
}

function seedDefaults() {
  const settings = [
    ['default_bank', 'SBI'],
    ['auto_increment_cheque', '1'],
    ['last_cheque_number', '000001'],
    ['date_format', 'DD/MM/YYYY'],
    ['currency_symbol', '₹'],
    ['default_font', 'Arial'],
    ['default_font_size', '10'],
    ['backup_path', '']
  ];

  const insertSetting = db.prepare('INSERT OR IGNORE INTO app_settings (key, value) VALUES (?, ?)');
  for (const [key, value] of settings) {
    insertSetting.run(key, value);
  }
}

export default db;
