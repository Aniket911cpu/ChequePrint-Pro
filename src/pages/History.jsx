import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Download, Search, Filter, Ban, CheckCircle2, MoreVertical } from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export default function History() {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: records = [], isLoading, refetch } = useQuery({
    queryKey: ['cheque_records'],
    queryFn: () => window.electronAPI.dbQuery(),
  });

  const filteredRecords = records.filter(r => 
    r.payee_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.cheque_number?.includes(searchTerm)
  );

  const handleExport = async () => {
    try {
      await window.electronAPI.dbExport(filteredRecords);
      toast.success('Records exported successfully');
    } catch (error) {
      toast.error('Export failed');
    }
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold gradient-text">Print History</h2>
          <p className="text-muted-foreground">Audit trail of all issued cheques</p>
        </div>
        <button 
          onClick={handleExport}
          className="btn-primary flex items-center gap-2"
        >
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="card space-y-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text"
              placeholder="Search by payee or cheque number..."
              className="w-full form-input pl-11"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="card py-2 px-4 flex items-center gap-2 p-0 hover:bg-white/10">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>

        <div className="overflow-auto rounded-2xl border border-white/5 bg-black/20 min-h-[400px]">
          {isLoading ? (
            <div className="h-[400px] flex items-center justify-center text-muted-foreground">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredRecords.length === 0 ? (
            <div className="h-[400px] flex flex-col items-center justify-center text-muted-foreground text-center">
              <History className="w-12 h-12 mb-4 opacity-10" />
              <p>No records found</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-[#0c0c0e] text-xs font-bold text-muted-foreground uppercase tracking-widest border-b border-white/10">
                <tr>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Cheque #</th>
                  <th className="px-6 py-4">Payee</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4 text-muted-foreground">
                      {format(new Date(record.printed_at), 'dd MMM yyyy HH:mm')}
                    </td>
                    <td className="px-6 py-4 font-mono font-bold text-primary">
                      {record.cheque_number || 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium">{record.payee_name}</div>
                      <div className="text-[10px] text-muted-foreground uppercase">{record.bank_code}</div>
                    </td>
                    <td className="px-6 py-4 font-medium">₹{record.amount.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1.5 text-emerald-500 font-medium">
                        <CheckCircle2 className="w-4 h-4" /> Printed
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                        <MoreVertical className="w-4 h-4" />
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
  );
}
