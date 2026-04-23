import React, { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { chequeSchema } from '../lib/validation';
import { useChequeStore } from '../store/useChequeStore';
import { numberToIndianWords } from '../lib/numberToWords';
import { bankTemplates } from '../data/bankTemplates';
import ChequePreview from '../components/ChequePreview';
import { Printer, Save, RotateCcw } from 'lucide-react';
import toast from 'react-hot-toast';

export default function PrintCheque() {
  const { activeCheque, updateCheque, resetCheque } = useChequeStore();
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    control,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(chequeSchema),
    defaultValues: activeCheque
  });

  // Subscription-based watch — fires only when values actually change, no re-render loop
  useEffect(() => {
    const subscription = watch((data) => {
      updateCheque(data);
    });
    return () => subscription.unsubscribe();
  }, [watch, updateCheque]);

  // Stable reactive read for the amount field only
  const amount = useWatch({ control, name: 'amount' });
  const amountInWords = amount ? numberToIndianWords(Number(amount)) : '';

  const onSubmit = async (data) => {
    try {
      // Save to database
      await window.electronAPI.dbSave({
        ...data,
        amount_words: amountInWords,
        status: 'printed'
      });
      
      // Trigger print
      const template = bankTemplates.find(t => t.bank_code === data.bank_code);
      await window.electronAPI.printCheque({
        chequeData: {
          ...data,
          ...splitDate(data.cheque_date),
          amount_words: amountInWords
        },
        template,
        offsets: { x_mm: 0, y_mm: 0 } // Default
      });
      
      toast.success('Cheque printed and saved successfully!');
    } catch (error) {
      toast.error('Printing failed: ' + error.message);
    }
  };

  const splitDate = (dateStr) => {
    const [dd, mm, yyyy] = dateStr.split('/');
    return { date_dd: dd, date_mm: mm, date_yyyy: yyyy };
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold gradient-text">Print Cheque</h2>
          <p className="text-muted-foreground">Standard single leaf printing mode</p>
        </div>
        <button 
          onClick={() => { reset(); resetCheque(); }}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <RotateCcw className="w-4 h-4" /> Reset Form
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="card space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-2">
              <label className="text-sm font-medium">Select Bank</label>
              <select 
                {...register('bank_code')}
                className="w-full form-input bg-white/5"
              >
                <option value="">Select a bank template...</option>
                {bankTemplates.map(bank => (
                  <option key={bank.bank_code} value={bank.bank_code}>{bank.bank_name}</option>
                ))}
              </select>
              {errors.bank_code && <p className="text-xs text-destructive">{errors.bank_code.message}</p>}
            </div>

            <div className="col-span-2 space-y-2">
              <label className="text-sm font-medium">Payee Name</label>
              <input 
                {...register('payee_name')}
                placeholder="Enter payee name..."
                className="w-full form-input"
              />
              {errors.payee_name && <p className="text-xs text-destructive">{errors.payee_name.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Amount (Numbers)</label>
              <input 
                {...register('amount', { valueAsNumber: true })}
                type="number"
                placeholder="0.00"
                className="w-full form-input"
              />
              {errors.amount && <p className="text-xs text-destructive">{errors.amount.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Date (DD/MM/YYYY)</label>
              <input 
                {...register('cheque_date')}
                placeholder="DD/MM/YYYY"
                className="w-full form-input"
              />
              {errors.cheque_date && <p className="text-xs text-destructive">{errors.cheque_date.message}</p>}
            </div>

            <div className="col-span-2 p-4 rounded-2xl bg-white/5 border border-white/10">
              <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Amount in Words</label>
              <p className="text-sm font-medium italic min-h-[1.5rem]">{amountInWords}</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Cheque Number</label>
              <input 
                {...register('cheque_number')}
                placeholder="000000"
                className="w-full form-input"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Account Ref / Narration</label>
              <input 
                {...register('narration')}
                placeholder="Reference..."
                className="w-full form-input"
              />
            </div>

            <div className="col-span-2 space-y-2">
              <label className="text-sm font-medium">Digital Signature (Optional)</label>
              <div className="flex gap-4 items-center">
                <button 
                  type="button"
                  onClick={async () => {
                    const path = await window.electronAPI.openFile([
                      { name: 'Images', extensions: ['png', 'jpg', 'jpeg'] }
                    ]);
                    if (path) setValue('signature', path);
                  }}
                  className="card py-2 px-4 text-xs font-bold bg-white/5 hover:bg-white/10 p-0 border-dashed border border-white/20"
                >
                  {watch('signature') ? 'Change Signature' : 'Upload Signature'}
                </button>
                {watch('signature') && (
                  <span className="text-[10px] text-green-500 font-bold uppercase truncate max-w-[200px]">
                    {watch('signature').split('\\').pop()}
                  </span>
                )}
                {watch('signature') && (
                  <button 
                    type="button"
                    onClick={() => setValue('signature', '')}
                    className="text-[10px] text-destructive font-bold uppercase hover:underline"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>

            <div className="col-span-2 pt-4 flex gap-4">
              <button type="submit" className="btn-primary flex-1 flex items-center justify-center gap-2">
                <Printer className="w-5 h-5" /> Print Cheque
              </button>
              <button type="button" className="card py-2 px-6 flex items-center justify-center gap-2 p-0 hover:bg-white/10 active:scale-95 transition-all">
                <Save className="w-5 h-5" /> Draft
              </button>
            </div>
          </form>
        </div>

        {/* Preview Area */}
        <div className="flex flex-col gap-4">
          <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest px-2">Live Canvas Preview</label>
          <ChequePreview />
        </div>
      </div>
    </div>
  );
}
