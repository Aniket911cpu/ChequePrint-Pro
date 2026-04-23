import { z } from 'zod';

export const chequeSchema = z.object({
  payee_name: z.string().min(1, 'Payee name is required'),
  amount: z.number().positive('Amount must be positive'),
  cheque_date: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Invalid date format (DD/MM/YYYY)'),
  cheque_number: z.string().optional(),
  account_ref: z.string().optional(),
  ifsc_code: z.string().optional(),
  narration: z.string().optional(),
  bank_code: z.string().min(1, 'Bank is required'),
  signature: z.string().optional(),
});

export const settingsSchema = z.object({
  default_bank: z.string(),
  auto_increment_cheque: z.string(),
  last_cheque_number: z.string(),
  date_format: z.string(),
  currency_symbol: z.string(),
  default_font: z.string(),
  default_font_size: z.string(),
  backup_path: z.string(),
});
