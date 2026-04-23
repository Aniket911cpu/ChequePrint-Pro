import React from 'react';
import { useTranslation } from 'react-i18next';
import { Bell, Search, User as UserIcon, Globe, Lock, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function TopBar({ user, onLogout }) {
  const { i18n, t } = useTranslation();
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const [avatar, setAvatar] = React.useState(null);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi (हिन्दी)' },
    { code: 'mr', name: 'Marathi (मराठी)' },
    { code: 'gu', name: 'Gujarati (ગુજરાતી)' },
    { code: 'ta', name: 'Tamil (தமிழ்)' },
    { code: 'te', name: 'Telugu (తెలుగు)' },
    { code: 'kn', name: 'Kannada (ಕನ್ನಡ)' },
    { code: 'ml', name: 'Malayalam (മലയാളം)' },
    { code: 'bn', name: 'Bengali (বাংলা)' },
    { code: 'pa', name: 'Punjabi (ਪੰਜਾਬੀ)' },
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleUpdateAvatar = async () => {
    const path = await window.electronAPI.openFile([
      { name: 'Images', extensions: ['png', 'jpg', 'jpeg'] }
    ]);
    if (path) {
      setAvatar(path);
      toast.success('Avatar updated successfully');
    }
    setIsProfileOpen(false);
  };

  const handleChangePassword = () => {
    toast('Change Password module coming soon...', { icon: '🔑' });
    setIsProfileOpen(false);
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
        {/* Language Switcher Dropdown */}
        <div className="relative group">
          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary pointer-events-none z-10" />
          <select 
            value={i18n.language}
            onChange={(e) => changeLanguage(e.target.value)}
            className="appearance-none bg-secondary/50 border border-border rounded-2xl py-2 pl-9 pr-10 text-xs font-bold focus:ring-2 focus:ring-primary/20 transition-all outline-none cursor-pointer hover:bg-secondary"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code} className="bg-background text-foreground">
                {lang.name}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
            <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2.5 rounded-2xl bg-secondary/50 hover:bg-secondary transition-colors relative">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-background" />
          </button>
          
          <div className="h-8 w-px bg-border mx-2" />
          
          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 pl-2 hover:bg-secondary/50 p-1 rounded-2xl transition-all"
            >
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold">{user?.fullName || 'User'}</p>
                <p className="text-[10px] text-muted-foreground uppercase font-black tracking-tighter">{user?.role || 'Printer'}</p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-lg shadow-primary/10 overflow-hidden">
                {avatar ? (
                  <img src={`file://${avatar}`} className="w-full h-full object-cover" alt="Avatar" />
                ) : (
                  <UserIcon className="w-5 h-5" />
                )}
              </div>
            </button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                <div className="absolute right-0 mt-3 w-56 bg-card border border-border rounded-3xl shadow-2xl z-50 py-3 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-5 py-3 border-b border-border/50 mb-2">
                    <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">Account Settings</p>
                  </div>
                  
                  <button 
                    onClick={handleUpdateAvatar}
                    className="w-full px-5 py-2.5 text-sm flex items-center gap-3 hover:bg-secondary transition-colors group"
                  >
                    <div className="p-1.5 rounded-xl bg-blue-500/10 text-blue-500 group-hover:scale-110 transition-transform">
                      <UserIcon className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-muted-foreground group-hover:text-foreground">Update Avatar</span>
                  </button>

                  <button 
                    onClick={handleChangePassword}
                    className="w-full px-5 py-2.5 text-sm flex items-center gap-3 hover:bg-secondary transition-colors group"
                  >
                    <div className="p-1.5 rounded-xl bg-amber-500/10 text-amber-500 group-hover:scale-110 transition-transform">
                      <Lock className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-muted-foreground group-hover:text-foreground">Change Password</span>
                  </button>

                  <div className="h-px bg-border/50 my-2" />

                  <button 
                    onClick={() => { onLogout(); setIsProfileOpen(false); }}
                    className="w-full px-5 py-2.5 text-sm flex items-center gap-3 hover:bg-destructive/10 text-destructive transition-colors group"
                  >
                    <div className="p-1.5 rounded-xl bg-destructive/10 group-hover:scale-110 transition-transform">
                      <LogOut className="w-4 h-4" />
                    </div>
                    <span className="font-bold">Sign Out</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
