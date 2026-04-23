import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Printer, 
  Files, 
  History, 
  LayoutTemplate, 
  Settings, 
  ChevronRight,
  ShieldCheck,
  LayoutDashboard,
  CreditCard,
  Server,
  LogOut
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Printer, label: 'Print Cheque', path: '/print' },
  { icon: Files, label: 'Batch Print', path: '/batch' },
  { icon: History, label: 'History', path: '/history' },
  { icon: LayoutTemplate, label: 'Templates', path: '/templates' },
  { icon: Server, label: 'Systems', path: '/systems' },
  { icon: CreditCard, label: 'Plans & Pricing', path: '/pricing' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export default function Sidebar({ onLogout }) {
  return (
    <aside className="w-72 h-screen flex flex-col glass-morphism border-r border-white/5 z-50">
      <div className="p-8 flex items-center gap-4">
        <div className="relative group">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full group-hover:bg-primary/40 transition-all duration-500" />
          <img 
            src="/src/assets/logo.png" 
            alt="ChequePrint Pro Logo" 
            className="relative w-12 h-12 object-contain rounded-2xl shadow-xl shadow-primary/20"
          />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight">ChequePrint</h1>
            <span className="bg-primary/10 text-primary text-[8px] font-black px-1.5 py-0.5 rounded-md uppercase tracking-tighter">Pro</span>
          </div>
          <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest leading-none">Enterprise Edition</span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 flex flex-col gap-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "sidebar-link group py-2.5",
              isActive && "active"
            )}
          >
            <item.icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
            <span className="flex-1 font-medium">{item.label}</span>
            <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 transition-all duration-300 group-[.active]:opacity-50 group-[.active]:translate-x-0 group-hover:opacity-100 group-hover:translate-x-0" />
          </NavLink>
        ))}
      </nav>

      <div className="p-6 mt-auto space-y-4">
        <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 group cursor-pointer overflow-hidden relative">
          <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-primary/10 blur-3xl transition-all duration-500 group-hover:bg-primary/20" />
          <h3 className="text-xs font-bold mb-1">Backup Vault</h3>
          <p className="text-[10px] text-muted-foreground mb-3">Cloud sync active</p>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full w-2/3 gradient-bg" />
          </div>
        </div>

        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-red-500/10 hover:text-red-500 text-muted-foreground font-medium text-sm"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
