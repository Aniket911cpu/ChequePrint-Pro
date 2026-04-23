import React from 'react';
import { 
  Database, 
  Shield, 
  Activity, 
  Server, 
  Search,
  ChevronRight,
  HardDrive,
  Cpu,
  Network
} from 'lucide-react';

const systems = [
  { 
    name: 'Core Database', 
    status: 'Healthy', 
    uptime: '99.9%', 
    load: '12%', 
    icon: Database,
    description: 'Main SQLite storage for cheque records and templates.'
  },
  { 
    name: 'Print Engine', 
    status: 'Active', 
    uptime: '100%', 
    load: '5%', 
    icon: Cpu,
    description: 'PDF generation and hardware communication layer.'
  },
  { 
    name: 'Cloud Sync', 
    status: 'Syncing', 
    uptime: '98.5%', 
    load: '45%', 
    icon: Network,
    description: 'Real-time backup and multi-device synchronization.'
  },
  { 
    name: 'Security Shield', 
    status: 'Active', 
    uptime: '100%', 
    load: '2%', 
    icon: Shield,
    description: 'Encryption and user access control management.'
  },
];

const logs = [
  { time: '10:45:22', event: 'Database backup completed', system: 'Cloud Sync', status: 'info' },
  { time: '10:42:10', event: 'New bank template added: SBI Rev 2', system: 'Print Engine', status: 'success' },
  { time: '10:30:05', event: 'Unauthorized access attempt blocked', system: 'Security', status: 'warning' },
  { time: '09:15:40', event: 'System maintenance scheduled for 02:00', system: 'Core', status: 'info' },
];

export default function Systems() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold gradient-text">System Architecture</h2>
          <p className="text-muted-foreground">Monitor and manage the core infrastructure of ChequePrint Pro.</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input placeholder="Search systems..." className="form-input pl-10 text-xs w-64" />
          </div>
          <button className="btn-primary py-2 text-xs">Run Diagnostic</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {systems.map((sys, i) => (
          <div key={i} className="card p-6 flex gap-6 group hover:border-primary/30 transition-all">
            <div className="p-4 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors h-fit">
              <sys.icon className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">{sys.name}</h3>
                  <p className="text-xs text-muted-foreground">{sys.description}</p>
                </div>
                <div className="flex flex-col items-end">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest ${
                    sys.status === 'Healthy' || sys.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'
                  }`}>
                    {sys.status}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Uptime</p>
                  <p className="text-sm font-bold">{sys.uptime}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Current Load</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: sys.load }} />
                    </div>
                    <span className="text-xs font-bold">{sys.load}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card space-y-6">
        <div className="flex items-center gap-2 font-bold text-lg">
          <Activity className="w-5 h-5 text-primary" />
          Infrastructure Logs
        </div>
        <div className="space-y-2">
          {logs.map((log, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
              <span className="text-xs font-mono text-muted-foreground">{log.time}</span>
              <span className={`w-2 h-2 rounded-full ${
                log.status === 'success' ? 'bg-green-500' : log.status === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
              }`} />
              <span className="text-xs font-bold w-32 uppercase tracking-tighter text-muted-foreground">[{log.system}]</span>
              <p className="text-sm flex-1">{log.event}</p>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
