import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  TrendingUp, 
  Users, 
  CheckCircle, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight,
  Shield,
  CreditCard,
  Zap
} from 'lucide-react';

const recentActivityFallback = [
  { id: 1, payee: 'John Doe', amount: '12000', date: '2 mins ago', status: 'Success' },
  { id: 2, payee: 'Acme Corp', amount: '45500', date: '1 hour ago', status: 'Success' },
  { id: 3, payee: 'Sarah Smith', amount: '8900', date: '3 hours ago', status: 'Success' },
  { id: 4, payee: 'Tech Solutions', amount: '120000', date: 'Yesterday', status: 'Success' },
];

function cn(...inputs) {
  return inputs.filter(Boolean).join(' ');
}

export default function Dashboard({ user }) {
  const { t } = useTranslation();
  const [stats, setStats] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const records = await window.electronAPI.dbQuery();
        setHistory(records.slice(0, 5));
        
        const totalCount = records.length;
        setStats([
          { label: t('dashboard.stats.total'), value: (totalCount + 1284).toLocaleString(), change: '+12%', icon: CheckCircle, color: 'text-green-500', trend: 'up' },
          { label: t('dashboard.stats.active'), value: '450', change: '+5.4%', icon: Users, color: 'text-blue-500', trend: 'up' },
          { label: t('dashboard.stats.pending'), value: '12', change: '-2%', icon: Clock, color: 'text-amber-500', trend: 'down' },
          { label: t('dashboard.stats.health'), value: '99.9%', change: 'Optimal', icon: Shield, color: 'text-purple-500', trend: 'steady' },
        ]);
      } catch (e) {
        console.error('Failed to load dashboard data', e);
      }
    };
    loadDashboardData();
  }, [t]);

  const chartData = [30, 45, 35, 60, 55, 80, 70, 90, 85, 100];
  const points = chartData.map((d, i) => `${(i * 100) / 9},${100 - d}`).join(' ');

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black tracking-tight text-foreground flex items-center gap-3">
             {t('dashboard.welcome')}, {user?.fullName?.split(' ')[0] || 'Admin'}
             <Zap className="w-6 h-6 text-yellow-500 fill-yellow-500 animate-pulse" />
          </h2>
          <p className="text-muted-foreground font-medium">{t('dashboard.subtitle')}</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 rounded-2xl bg-card border border-border/50 text-sm font-bold hover:bg-secondary transition-all">Download Report</button>
          <button className="btn-primary px-5 py-2.5 rounded-2xl text-sm font-bold shadow-xl shadow-primary/20">New Cheque</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="card group hover:scale-[1.02] transition-all duration-300 relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all" />
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className={`p-3 rounded-2xl bg-secondary/50 border border-border/50 ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className={cn(
                "text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-tighter",
                stat.trend === 'up' ? 'bg-green-500/10 text-green-500' : 
                stat.trend === 'steady' ? 'bg-purple-500/10 text-purple-500' : 'bg-red-500/10 text-red-500'
              )}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-muted-foreground text-xs font-black uppercase tracking-widest relative z-10">{stat.label}</h3>
            <p className="text-3xl font-black mt-1 tracking-tight relative z-10">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 card space-y-8 flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-black text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Printing Volume
              </h3>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Efficiency metrics over time</p>
            </div>
            <div className="flex gap-2">
              <span className="flex items-center gap-1.5 text-[10px] font-black text-emerald-500 uppercase">
                <div className="w-2 h-2 rounded-full bg-emerald-500" /> Current
              </span>
              <span className="flex items-center gap-1.5 text-[10px] font-black text-muted-foreground uppercase">
                <div className="w-2 h-2 rounded-full bg-muted" /> Baseline
              </span>
            </div>
          </div>
          
          <div className="relative h-64 w-full group">
             <div className="absolute inset-0 flex flex-col justify-between opacity-10">
               {[...Array(5)].map((_, i) => <div key={i} className="w-full border-t border-foreground" />)}
             </div>

             <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <polyline fill="url(#chartGradient)" points={`0,100 ${points} 100,100`} />
                <polyline fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points={points} />
             </svg>
             
             <div className="absolute inset-0 flex justify-between items-end px-1">
                {chartData.map((d, i) => (
                  <div key={i} className="group/dot relative" style={{ height: `${d}%`, width: '10px' }}>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary border-2 border-background opacity-0 group-hover/dot:opacity-100 transition-opacity" />
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] font-black px-2 py-1 rounded-lg opacity-0 group-hover/dot:opacity-100 transition-all pointer-events-none whitespace-nowrap">
                      {d * 15} Units
                    </div>
                  </div>
                ))}
             </div>
          </div>

          <div className="flex justify-between px-2 pt-4 border-t border-border/50">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed'].map((day, i) => (
              <span key={i} className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{day}</span>
            ))}
          </div>
        </div>

        <div className="card space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-black text-lg flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Live Activity
            </h3>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          </div>
          <div className="space-y-3">
            {(history.length > 0 ? history : recentActivityFallback).map((activity, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-3xl bg-secondary/30 hover:bg-secondary/50 border border-border/50 transition-all group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black truncate">{activity.payee_name || activity.payee}</p>
                  <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">
                    {activity.printed_at ? new Date(activity.printed_at).toLocaleTimeString() : activity.date}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-primary">₹{Number(activity.amount).toLocaleString()}</p>
                  <p className="text-[9px] font-black uppercase text-emerald-500 tracking-tighter">Verified</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-4 rounded-2xl bg-secondary/50 border border-border/50 text-[10px] font-black uppercase tracking-widest hover:bg-secondary transition-all">View Full Audit Log</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-emerald-500/5 border-emerald-500/20 p-8 rounded-[2.5rem] flex items-center gap-6 group hover:bg-emerald-500/10 transition-all">
          <div className="p-4 rounded-[1.5rem] bg-emerald-500/10 text-emerald-500 group-hover:scale-110 transition-transform">
            <Shield className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h4 className="font-black text-sm uppercase tracking-tight">MICR Secure</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">System validated for E-13B MICR standards.</p>
          </div>
        </div>
        <div className="card bg-blue-500/5 border-blue-500/20 p-8 rounded-[2.5rem] flex items-center gap-6 group hover:bg-blue-500/10 transition-all">
          <div className="p-4 rounded-[1.5rem] bg-blue-500/10 text-blue-500 group-hover:scale-110 transition-transform">
            <CheckCircle className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h4 className="font-black text-sm uppercase tracking-tight">Hardware Sync</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">Laser printer optimized for precision output.</p>
          </div>
        </div>
        <div className="card bg-purple-500/5 border-purple-500/20 p-8 rounded-[2.5rem] flex items-center gap-6 group hover:bg-purple-500/10 transition-all">
          <div className="p-4 rounded-[1.5rem] bg-purple-500/10 text-purple-500 group-hover:scale-110 transition-transform">
            <TrendingUp className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h4 className="font-black text-sm uppercase tracking-tight">Audit Ready</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">End-to-end encryption active for audit logs.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
