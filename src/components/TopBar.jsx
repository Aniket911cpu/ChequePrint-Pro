import React from 'react';
import { useTranslation } from 'react-i18next';
import { Bell, Search, User as UserIcon } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function TopBar({ user }) {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="h-20 border-b border-border bg-background/50 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search for cheques, templates or help..." 
            className="w-full bg-secondary/50 border-none rounded-2xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Language Switcher */}
        <div className="flex items-center p-1 rounded-2xl bg-secondary/50 border border-border w-32">
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

        <div className="flex items-center gap-3">
          <button className="p-2.5 rounded-2xl bg-secondary/50 hover:bg-secondary transition-colors relative">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-background" />
          </button>
          
          <div className="h-8 w-px bg-border mx-2" />
          
          <div className="flex items-center gap-3 pl-2">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold">{user?.fullName || 'User'}</p>
              <p className="text-[10px] text-muted-foreground uppercase font-black tracking-tighter">{user?.role || 'Printer'}</p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-lg shadow-primary/10">
              <UserIcon className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
