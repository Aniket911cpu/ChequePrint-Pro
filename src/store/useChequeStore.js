import { create } from 'zustand';

export const useChequeStore = create((set) => ({
  activeCheque: {
    payee_name: '',
    amount: '',
    cheque_date: new Date().toLocaleDateString('en-GB'), // DD/MM/YYYY
    cheque_number: '',
    account_ref: '',
    ifsc_code: '',
    narration: '',
    bank_code: '',
  },
  selectedTemplate: null,
  templates: [],
  setTemplates: (templates) => set({ templates }),
  setTemplate: (template) => set({ selectedTemplate: template }),
  updateCheque: (data) => set((state) => ({ 
    activeCheque: { ...state.activeCheque, ...data } 
  })),
  resetCheque: () => set({ 
    activeCheque: {
      payee_name: '',
      amount: '',
      cheque_date: new Date().toLocaleDateString('en-GB'),
      cheque_number: '',
      account_ref: '',
      ifsc_code: '',
      narration: '',
      bank_code: '',
    } 
  }),
}));

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
