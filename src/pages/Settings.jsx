import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { settingsSchema } from '../lib/validation';
import { useSettingsStore } from '../store/useSettingsStore';
import { 
  Save, 
  Info, 
  Shield, 
  Database, 
  Bell, 
  User, 
  Lock, 
  Palette, 
  Globe,
  Camera,
  CheckCircle2,
  Trash2
} from 'lucide-react';
import toast from 'react-hot-toast';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function Settings() {
  const { settings, updateSetting } = useSettingsStore();
  const [activeTab, setActiveTab] = useState('general');
  const [avatar, setAvatar] = useState(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(settingsSchema),
    defaultValues: settings
  });

  const onSubmit = async (data) => {
    try {
      for (const [key, value] of Object.entries(data)) {
        await window.electronAPI.setSetting(key, value);
        updateSetting(key, value);
      }
      toast.success('Settings updated successfully');
    } catch (error) {
      toast.error('Failed to save settings');
    }
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Database },
    { id: 'account', label: 'Account', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-4xl font-black tracking-tight text-foreground">{settings.app_name || 'System Preferences'}</h2>
        <p className="text-muted-foreground font-medium mt-1">Configure your enterprise workspace and account settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-4 px-5 py-4 rounded-3xl transition-all duration-300 font-bold text-sm",
                activeTab === tab.id 
                  ? "bg-primary text-primary-foreground shadow-xl shadow-primary/20 scale-105" 
                  : "bg-card/50 text-muted-foreground hover:bg-card hover:text-foreground border border-border/50"
              )}
            >
              <tab.icon className={cn("w-5 h-5", activeTab === tab.id ? "animate-pulse" : "")} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-9">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {activeTab === 'general' && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                <div className="card space-y-8">
                  <div className="border-b border-border/50 pb-4">
                    <h3 className="text-lg font-bold">General Configuration</h3>
                    <p className="text-xs text-muted-foreground">Core application behavior and default values.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground px-1">Currency Symbol</label>
                      <input {...register('currency_symbol')} className="w-full form-input h-12 text-lg font-bold" placeholder="₹" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground px-1">Date Format</label>
                      <select {...register('date_format')} className="w-full form-input h-12 font-bold">
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>
                    <div className="col-span-full p-6 rounded-[2rem] bg-secondary/30 border border-border flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-bold text-sm">Auto-increment Cheque Numbers</p>
                        <p className="text-xs text-muted-foreground">Automatically suggest the next cheque number after printing.</p>
                      </div>
                      <input 
                        type="checkbox" 
                        {...register('auto_increment_cheque')} 
                        className="w-10 h-6 rounded-full appearance-none bg-muted checked:bg-primary transition-all relative after:content-[''] after:absolute after:top-1 after:left-1 after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-all checked:after:translate-x-4 cursor-pointer" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'account' && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                <div className="card space-y-10">
                  <div className="border-b border-border/50 pb-4">
                    <h3 className="text-lg font-bold">Profile Settings</h3>
                    <p className="text-xs text-muted-foreground">Manage your public presence and account details.</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-10 items-center">
                    <div className="relative group">
                      <div className="w-40 h-40 rounded-[3rem] bg-primary/10 border-4 border-card shadow-2xl flex items-center justify-center text-primary overflow-hidden transition-transform duration-500 group-hover:scale-105">
                        {avatar ? (
                          <img src={`file://${avatar}`} className="w-full h-full object-cover" alt="Profile" />
                        ) : (
                          <User className="w-16 h-16" />
                        )}
                      </div>
                      <button 
                        type="button"
                        onClick={async () => {
                          const path = await window.electronAPI.openFile([{ name: 'Images', extensions: ['png', 'jpg', 'jpeg'] }]);
                          if (path) setAvatar(path);
                        }}
                        className="absolute -bottom-2 -right-2 p-4 rounded-2xl bg-primary text-primary-foreground shadow-xl hover:scale-110 transition-all"
                      >
                        <Camera className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="flex-1 w-full space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Full Name</label>
                          <input className="w-full form-input h-12" defaultValue="Aniket K." />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Email Address</label>
                          <input className="w-full form-input h-12" defaultValue="aniket@example.com" disabled />
                        </div>
                      </div>
                      <div className="p-6 rounded-3xl bg-secondary/20 border border-border/50">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Security Level</p>
                        <div className="flex items-center gap-4">
                          <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                            <div className="h-full w-3/4 bg-emerald-500" />
                          </div>
                          <span className="text-xs font-black text-emerald-500 uppercase">Strong</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-border/50 space-y-6">
                    <h4 className="font-bold">Password Management</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Current Password</label>
                        <input type="password" placeholder="••••••••" className="w-full form-input h-12" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">New Password</label>
                        <input type="password" placeholder="••••••••" className="w-full form-input h-12" />
                      </div>
                    </div>
                    <button type="button" className="text-xs font-black uppercase tracking-widest text-primary hover:underline">Forgot Password?</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                <div className="card space-y-8">
                  <div className="border-b border-border/50 pb-4">
                    <h3 className="text-lg font-bold">Security & Data</h3>
                    <p className="text-xs text-muted-foreground">Manage your data backups and system logs.</p>
                  </div>

                  <div className="space-y-4">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Automated Backups</label>
                    <div className="p-6 rounded-[2rem] bg-secondary/30 border border-border flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500">
                          <Globe className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-bold text-sm">Cloud Sync</p>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Synchronize templates across devices</p>
                        </div>
                      </div>
                      <span className="bg-primary/10 text-primary text-[10px] font-black px-3 py-1 rounded-full uppercase">Enabled</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-4 pt-6">
               <button type="button" className="px-8 py-4 rounded-3xl font-bold text-sm text-muted-foreground hover:bg-card transition-all">
                 Discard Changes
               </button>
               <button type="submit" className="px-10 py-4 rounded-3xl bg-primary text-primary-foreground font-black text-sm shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
                 <Save className="w-5 h-5" /> Save Configuration
               </button>
            </div>
          </form>
        </div>
      </div>

      <div className="card bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 flex items-start gap-6 p-8 rounded-[3rem]">
        <div className="p-4 rounded-3xl bg-primary/20 text-primary">
          <Info className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h4 className="text-xl font-black tracking-tight italic">ChequePrint Pro <span className="text-primary text-sm not-italic opacity-60 ml-2">v1.2.4 Gold</span></h4>
          <p className="text-sm text-muted-foreground font-medium leading-relaxed">
            Your system is optimized for high-precision thermal and laser output. 
            All cryptographic modules are active and secure.
          </p>
          <div className="flex gap-4 pt-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-primary/60 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Hardware Verified
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-primary/60 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> FIPS 140-2 Compliant
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
