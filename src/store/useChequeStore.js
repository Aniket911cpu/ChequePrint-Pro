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
