import { create } from 'zustand';

export const useSettingsStore = create((set) => ({
  settings: {
    default_bank: 'SBI',
    auto_increment_cheque: '1',
    last_cheque_number: '000001',
    date_format: 'DD/MM/YYYY',
    currency_symbol: '₹',
    default_font: 'Arial',
    default_font_size: '10',
    backup_path: '',
  },
  setSettings: (settings) => set({ settings }),
  updateSetting: (key, value) => set((state) => ({
    settings: { ...state.settings, [key]: value }
  })),
}));
