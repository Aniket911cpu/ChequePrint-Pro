import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { settingsSchema } from '../lib/validation';
import { useSettingsStore } from '../store/useSettingsStore';
import { Save, Info, Shield, Database, Bell } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Settings() {
  const { settings, updateSetting } = useSettingsStore();
  
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
      toast.success('Settings saved successfully');
    } catch (error) {
      toast.error('Failed to save settings');
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8">
      <div>
        <h2 className="text-3xl font-bold gradient-text">Settings</h2>
        <p className="text-muted-foreground">Application preferences and configuration</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-1">
            <div className="flex items-center gap-2 font-bold mb-2">
              <Database className="w-4 h-4 text-primary" />
              General Configuration
            </div>
            <p className="text-xs text-muted-foreground">Core application behavior and default values for printing.</p>
          </div>

          <div className="md:col-span-2 card grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Currency Symbol</label>
              <input {...register('currency_symbol')} className="w-full form-input" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Date Format</label>
              <select {...register('date_format')} className="w-full form-input">
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
            <div className="flex items-center gap-3 pt-4">
              <input type="checkbox" {...register('auto_increment_cheque')} className="w-4 h-4 rounded border-white/10 bg-white/5 text-primary focus:ring-primary" />
              <label className="text-sm font-medium">Auto-increment Cheque #</label>
            </div>
          </div>

          <div className="md:col-span-1 space-y-1">
            <div className="flex items-center gap-2 font-bold mb-2">
              <Shield className="w-4 h-4 text-primary" />
              Security & Backup
            </div>
            <p className="text-xs text-muted-foreground">Data safety and export settings.</p>
          </div>

          <div className="md:col-span-2 card space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Local Backup Path</label>
              <div className="flex gap-2">
                <input {...register('backup_path')} className="flex-1 form-input" disabled />
                <button type="button" className="card py-2 px-4 text-xs p-0 hover:bg-white/10">Browse</button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-8">
          <button type="submit" className="btn-primary flex items-center gap-2 px-8">
            <Save className="w-5 h-5" /> Save All Changes
          </button>
        </div>
      </form>

      <div className="card bg-primary/5 border-primary/10 flex items-start gap-4">
        <Info className="w-6 h-6 text-primary shrink-0" />
        <div className="space-y-1">
          <h4 className="font-bold">About ChequePrint Pro</h4>
          <p className="text-sm text-muted-foreground">Version 1.0.0 (Build 2026.04.1) — Licensed to Enterprise User. All printing engines are configured for high-precision thermal and laser output.</p>
        </div>
      </div>
    </div>
  );
}
