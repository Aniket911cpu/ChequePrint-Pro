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
  LogOut,
  Sun,
  Moon,
  Users
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useTranslation } from 'react-i18next';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function Sidebar({ onLogout, user }) {
  const { t, i18n } = useTranslation();
  const [isDark, setIsDark] = React.useState(() => document.documentElement.classList.contains('dark'));

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const isAdmin = user?.role === 'Admin';

  const mainNav = [
    { icon: LayoutDashboard, label: t('common.dashboard'), path: '/dashboard' },
    { icon: Printer, label: t('common.print'), path: '/print' },
    { icon: Files, label: t('common.batch'), path: '/batch' },
    { icon: History, label: t('common.history'), path: '/history' },
  ];

  const adminNav = [
    { icon: LayoutTemplate, label: t('common.templates'), path: '/templates' },
    { icon: Server, label: t('common.systems'), path: '/systems' },
    { icon: Users, label: t('common.users'), path: '/admin/users' },
  ];

  return (
    <aside className="w-72 h-screen flex flex-col bg-card border-r border-border z-50 transition-all duration-300">
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
        <p className="px-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">{t('common.main_menu') || 'Main Menu'}</p>
        {mainNav.map((item) => (
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

        {isAdmin && (
          <>
            <p className="px-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-6 mb-2">{t('common.admin')}</p>
            {adminNav.map((item) => (
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
              </NavLink>
            ))}
          </>
        )}
      </nav>

      <div className="p-6 mt-auto space-y-3">
        <div className="flex items-center justify-between p-1 rounded-2xl bg-secondary/50 border border-border">
          <button 
            onClick={() => changeLanguage('en')}
            className={cn(
              "flex-1 py-1.5 text-[10px] font-black rounded-xl transition-all",
              i18n.language === 'en' ? "bg-background shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
            )}
          >
            EN
          </button>
          <button 
            onClick={() => changeLanguage('hi')}
            className={cn(
              "flex-1 py-1.5 text-[10px] font-black rounded-xl transition-all",
              i18n.language === 'hi' ? "bg-background shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
            )}
          >
            HI
          </button>
        </div>

        <div className="flex items-center justify-between p-2 rounded-2xl bg-secondary/50 border border-border">
          <span className="text-xs font-bold px-2 text-muted-foreground uppercase tracking-tighter">{t('common.theme') || 'Theme'}</span>
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-background shadow-sm hover:scale-110 transition-transform text-primary"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-destructive/10 hover:text-destructive text-muted-foreground font-medium text-sm"
        >
          <LogOut className="w-5 h-5" />
          {t('common.logout')}
        </button>
      </div>
    </aside>
  );
}
