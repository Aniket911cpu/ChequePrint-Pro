import Papa from 'papaparse';
import * as XLSX from 'xlsx';

export async function importCSV(filePath) {
  const text = await window.electronAPI.readFile(filePath);
  return new Promise((resolve, reject) => {
    Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        resolve(results.data);
      },
      error: (error) => {
        reject(error);
      }
    });
  });
}

export async function importExcel(filePath) {
  const buffer = await window.electronAPI.readFileBinary(filePath);
  const workbook = XLSX.read(buffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  return XLSX.utils.sheet_to_json(worksheet);
}

export function validateBatchData(data, schema) {
  return data.map((row, index) => {
    const result = schema.safeParse(row);
    return {
      row: row,
      index: index,
      isValid: result.success,
      errors: result.success ? [] : result.error.errors
    };
  });
}
