import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Printer, 
  Files, 
  History, 
  LayoutTemplate, 
  Settings, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { icon: Printer, label: 'Print Cheque', path: '/print' },
  { icon: Files, label: 'Batch Print', path: '/batch' },
  { icon: History, label: 'History', path: '/history' },
  { icon: LayoutTemplate, label: 'Templates', path: '/templates' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export default function Sidebar() {
  return (
    <aside className="w-72 h-screen flex flex-col glass-morphism border-r border-white/5 z-50">
      <div className="p-8 flex items-center gap-3">
        <div className="gradient-bg p-2 rounded-xl shadow-lg shadow-primary/20">
          <ShieldCheck className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight">ChequePrint</h1>
          <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest leading-none">Pro Edition</span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 flex flex-col gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "sidebar-link group",
              isActive && "active"
            )}
          >
            <item.icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
            <span className="flex-1 font-medium">{item.label}</span>
            <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 transition-all duration-300 group-[.active]:opacity-50 group-[.active]:translate-x-0 group-hover:opacity-100 group-hover:translate-x-0" />
          </NavLink>
        ))}
      </nav>

      <div className="p-8 mt-auto">
        <div className="p-6 rounded-3xl bg-primary/5 border border-primary/20 group cursor-pointer overflow-hidden relative">
          <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-primary/10 blur-3xl transition-all duration-500 group-hover:bg-primary/20" />
          <h3 className="text-sm font-bold mb-1">Backup Vault</h3>
          <p className="text-xs text-muted-foreground mb-4">Cloud sync active</p>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full w-2/3 gradient-bg" />
          </div>
        </div>
      </div>
    </aside>
  );
}
