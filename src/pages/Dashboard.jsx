import React from 'react';
import { 
  TrendingUp, 
  Users, 
  CheckCircle, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight,
  Shield,
  CreditCard
} from 'lucide-react';

const stats = [
  { label: 'Total Printed', value: '1,284', change: '+12%', icon: CheckCircle, color: 'text-green-500' },
  { label: 'Active Payees', value: '450', change: '+5.4%', icon: Users, color: 'text-blue-500' },
  { label: 'Pending Batch', value: '12', change: '-2%', icon: Clock, color: 'text-amber-500' },
  { label: 'System Health', value: '99.9%', change: 'Optimal', icon: Shield, color: 'text-purple-500' },
];

const recentActivity = [
  { id: 1, payee: 'John Doe', amount: '₹12,000.00', date: '2 mins ago', status: 'Success' },
  { id: 2, payee: 'Acme Corp', amount: '₹45,500.00', date: '1 hour ago', status: 'Success' },
  { id: 3, payee: 'Sarah Smith', amount: '₹8,900.00', date: '3 hours ago', status: 'Success' },
  { id: 4, payee: 'Tech Solutions', amount: '₹1,20,000.00', date: 'Yesterday', status: 'Success' },
];

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-bold gradient-text">Welcome back, Admin</h2>
        <p className="text-muted-foreground">Here is what's happening with your cheque printing system today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="card group hover:scale-[1.02] transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg bg-white/5 ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                stat.change.startsWith('+') ? 'bg-green-500/10 text-green-500' : 
                stat.change === 'Optimal' ? 'bg-purple-500/10 text-purple-500' : 'bg-red-500/10 text-red-500'
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-muted-foreground text-sm font-medium">{stat.label}</h3>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Area (Visual Placeholder) */}
        <div className="lg:col-span-2 card space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-bold flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Printing Volume
            </h3>
            <select className="bg-white/5 border border-white/10 rounded-lg text-xs px-2 py-1 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          
          <div className="h-[250px] w-full flex items-end gap-2 px-2">
            {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div 
                  className="w-full bg-primary/20 rounded-t-lg group-hover:bg-primary transition-all duration-300 relative"
                  style={{ height: `${h}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {h * 10}
                  </div>
                </div>
                <span className="text-[10px] text-muted-foreground uppercase font-bold">Day {i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card space-y-6">
          <h3 className="font-bold flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            Recent Activity
          </h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 transition-colors group cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <CreditCard className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate">{activity.payee}</p>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">{activity.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">{activity.amount}</p>
                  <p className="text-[10px] text-green-500 font-bold uppercase tracking-wider">{activity.status}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-2 text-xs font-bold text-primary hover:underline">View All History</button>
        </div>
      </div>

      {/* Compliance & Requirements (Research Results) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-green-500/5 border-green-500/20 flex gap-4 p-6">
          <div className="p-3 rounded-xl bg-green-500/10 h-fit">
            <Shield className="w-6 h-6 text-green-500" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-sm">MICR Compliant</h4>
            <p className="text-xs text-muted-foreground">System is configured for Magnetic Ink Character Recognition standards.</p>
          </div>
        </div>
        <div className="card bg-blue-500/5 border-blue-500/20 flex gap-4 p-6">
          <div className="p-3 rounded-xl bg-blue-500/10 h-fit">
            <CheckCircle className="w-6 h-6 text-blue-500" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-sm">Hardware Sync</h4>
            <p className="text-xs text-muted-foreground">Laser printer with MICR toner detected and optimized for high-precision output.</p>
          </div>
        </div>
        <div className="card bg-purple-500/5 border-purple-500/20 flex gap-4 p-6">
          <div className="p-3 rounded-xl bg-purple-500/10 h-fit">
            <TrendingUp className="w-6 h-6 text-purple-500" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-sm">Audit Ready</h4>
            <p className="text-xs text-muted-foreground">All printing activity is logged and encrypted for annual financial audits.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
