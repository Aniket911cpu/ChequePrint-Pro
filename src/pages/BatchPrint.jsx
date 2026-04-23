import React, { useState } from 'react';
import { Upload, FileSpreadsheet, Printer, AlertTriangle, CheckCircle2, Trash2 } from 'lucide-react';
import { importCSV, importExcel, validateBatchData } from '../lib/csvImport';
import { chequeSchema } from '../lib/validation';
import { bankTemplates } from '../data/bankTemplates';
import toast from 'react-hot-toast';

export default function BatchPrint() {
  const [data, setData] = useState([]);
  const [selectedBank, setSelectedBank] = useState('');
  const [isPrinting, setIsPrinting] = useState(false);

  const handleFileUpload = async () => {
    try {
      const filePath = await window.electronAPI.openFile();
      if (!filePath) return;

      toast.loading('Importing data...', { id: 'import' });
      
      let rows = [];
      if (filePath.endsWith('.csv')) {
        rows = await importCSV(filePath);
      } else {
        rows = await importExcel(filePath);
      }

      const validatedData = validateBatchData(rows, chequeSchema);
      setData(validatedData);
      toast.success(`Imported ${rows.length} rows`, { id: 'import' });
    } catch (error) {
      toast.error('Import failed: ' + error.message, { id: 'import' });
    }
  };

  const handlePrintBatch = async () => {
    if (!selectedBank) {
      toast.error('Please select a bank template');
      return;
    }
    
    const validRows = data.filter(d => d.isValid).map(d => d.row);
    if (validRows.length === 0) {
      toast.error('No valid rows to print');
      return;
    }

    setIsPrinting(true);
    const template = bankTemplates.find(t => t.bank_code === selectedBank);

    try {
      await window.electronAPI.printBatch({
        batchData: validRows,
        template,
        offsets: { x_mm: 0, y_mm: 0 }
      });
      toast.success(`Successfully printed ${validRows.length} cheques`);
    } catch (error) {
      toast.error('Batch printing failed: ' + error.message);
    } finally {
      setIsPrinting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8">
      <div>
        <h2 className="text-3xl font-bold gradient-text">Batch Print</h2>
        <p className="text-muted-foreground">Import and print multiple cheques at once</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card lg:col-span-1 space-y-6">
          <h3 className="text-lg font-bold">Step 1: Configure</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Bank Template</label>
              <select 
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
                className="w-full form-input"
              >
                <option value="">Select a bank...</option>
                {bankTemplates.map(bank => (
                  <option key={bank.bank_code} value={bank.bank_code}>{bank.bank_name}</option>
                ))}
              </select>
            </div>
            
            <button 
              onClick={handleFileUpload}
              className="w-full card border-dashed border-2 flex flex-col items-center gap-3 py-10 hover:bg-white/5 transition-all text-muted-foreground hover:text-foreground group"
            >
              <div className="p-3 rounded-full bg-white/5 transition-transform group-hover:scale-110">
                <FileSpreadsheet className="w-8 h-8" />
              </div>
              <span className="text-sm font-medium">Import CSV or Excel</span>
            </button>
          </div>

          <div className="pt-6 border-t border-white/5">
            <button 
              disabled={data.length === 0 || isPrinting}
              onClick={handlePrintBatch}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:scale-100"
            >
              <Printer className="w-5 h-5" /> {isPrinting ? 'Printing...' : 'Start Batch Print'}
            </button>
          </div>
        </div>

        <div className="card md:col-span-2 flex flex-col gap-4">
          <div className="flex justify-between items-center px-2">
            <h3 className="text-lg font-bold">Imported Data Preview</h3>
            <span className="text-xs font-bold text-muted-foreground uppercase">{data.length} records loaded</span>
          </div>

          <div className="flex-1 overflow-auto rounded-xl border border-white/5 bg-black/20">
            {data.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground py-20">
                <Upload className="w-12 h-12 mb-4 opacity-10" />
                <p>No data imported yet</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-[#0c0c0e] text-xs font-bold text-muted-foreground uppercase tracking-widest border-b border-white/10">
                  <tr>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Payee</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {data.map((row, idx) => (
                    <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3">
                        {row.isValid ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-amber-500" title={row.errors.map(e => e.message).join(', ')} />
                        )}
                      </td>
                      <td className="px-4 py-3 font-medium">{row.row.payee_name}</td>
                      <td className="px-4 py-3 text-muted-foreground">₹{row.row.amount}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.row.cheque_date}</td>
                      <td className="px-4 py-3 text-right">
                        <button 
                          onClick={() => setData(data.filter((_, i) => i !== idx))}
                          className="p-1 hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
