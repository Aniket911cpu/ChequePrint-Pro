import { BrowserWindow } from 'electron';
import path from 'path';

export async function printCheque({ chequeData, template, offsets }) {
  const html = buildPrintHTML(chequeData, template, offsets);
  const win = new BrowserWindow({ show: false, webPreferences: { nodeIntegration: true, contextIsolation: false } });
  
  await win.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(html)}`);
  
  return new Promise((resolve, reject) => {
    win.webContents.print({
      silent: false,
      printBackground: true,
      deviceName: '', // Default printer
      pageSize: {
        width: template.width_mm * 1000, // micro-microns? Electron docs say microns or defined sizes
        height: template.height_mm * 1000
      }
    }, (success, failureReason) => {
      win.close();
      if (success) resolve();
      else reject(new Error(failureReason));
    });
  });
}

export async function printBatch({ batchData, template, offsets }) {
  // Simple implementation: sequential printing
  // In a real app, you might want to combine them into one multi-page PDF/print job
  for (const chequeData of batchData) {
    await printCheque({ chequeData, template, offsets });
  }
}

export async function printTest() {
  // Print a calibration page
  const testTemplate = {
    bank_name: 'Test calibration',
    width_mm: 200,
    height_mm: 100,
    fields: [
      { field_name: 'test_mark', x_mm: 10, y_mm: 10, font_size: 10, is_bold: 1 }
    ]
  };
  const testData = { test_mark: 'CORNER MARK (10mm, 10mm)' };
  return printCheque({ chequeData: testData, template: testTemplate, offsets: { x: 0, y: 0 } });
}

function buildPrintHTML(chequeData, template, offsets) {
  const { width_mm, height_mm } = template;
  
  return `
<!DOCTYPE html>
<html>
<head>
<style>
  @page {
    size: ${width_mm}mm ${height_mm}mm;
    margin: 0;
  }
  body {
    margin: 0;
    padding: 0;
    width: ${width_mm}mm;
    height: ${height_mm}mm;
    position: relative;
    overflow: hidden;
    font-family: Arial, sans-serif;
  }
  .field {
    position: absolute;
    white-space: nowrap;
  }
</style>
</head>
<body>
  ${generateFieldHTML(chequeData, template, offsets)}
</body>
</html>`;
}

function generateFieldHTML(fields, template, offsets) {
  return template.fields.map((field) => {
    const value = fields[field.field_name] || '';
    const x = field.x_mm + (offsets?.x_mm || 0);
    const y = field.y_mm + (offsets?.y_mm || 0);
    
    if (field.field_name === 'signature' && value) {
      return `<img src="file://${value}" class="field" style="
        left: ${x}mm;
        top: ${y}mm;
        width: ${field.max_width_mm || 40}mm;
        height: auto;
      " />`;
    }

    return `<div class="field" style="
      left: ${x}mm;
      top: ${y}mm;
      font-size: ${field.font_size}pt;
      font-weight: ${field.is_bold ? 'bold' : 'normal'};
      max-width: ${field.max_width_mm ? field.max_width_mm + 'mm' : 'auto'};
    ">${escapeHTML(String(value))}</div>`;
  }).join('\n');
}

function escapeHTML(str) {
  return str.replace(/[&<>"']/g, function(m) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[m];
  });
}
