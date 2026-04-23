import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { LayoutTemplate, Plus, ExternalLink, Settings2, Trash2 } from 'lucide-react';
import { bankTemplates } from '../data/bankTemplates';

export default function Templates() {
  const { data: dbTemplates = [] } = useQuery({
    queryKey: ['bank_templates'],
    queryFn: () => window.electronAPI.getTemplates(),
  });

  // Combine static and DB templates
  const allTemplates = [...bankTemplates, ...dbTemplates];

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold gradient-text">Bank Templates</h2>
          <p className="text-muted-foreground">Manage and calibrate cheque layouts</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Create Custom Template
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allTemplates.map((template) => (
          <div key={template.bank_code} className="card group hover:border-primary/50 transition-all flex flex-col gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-primary cursor-pointer" />
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <LayoutTemplate className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold">{template.bank_name}</h3>
                <p className="text-xs text-muted-foreground">{template.width_mm}mm x {template.height_mm}mm</p>
              </div>
            </div>

            <div className="flex-1 space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Fields configured</span>
                <span className="font-bold">{template.fields.length}</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-full gradient-bg opacity-50" />
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold transition-all flex items-center justify-center gap-2">
                <Settings2 className="w-3 h-3" /> Calibrate
              </button>
              <button className="p-2 rounded-xl bg-white/5 hover:bg-destructive/10 hover:text-destructive transition-all">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
