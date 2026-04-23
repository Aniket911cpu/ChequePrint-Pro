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

  const [printers, setPrinters] = React.useState([]);

  React.useEffect(() => {
    const fetchPrinters = async () => {
      const list = await window.electronAPI.getPrinters();
      setPrinters(list);
    };
    fetchPrinters();
  }, []);

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
        offsets: { x_mm: 0, y_mm: 0 },
        printerName: data.target_printer
      });
      
      toast.success('Cheque sent to printer successfully!');
    } catch (error) {
      toast.error('Printing failed: ' + error.message);
    }
  };

  const splitDate = (dateStr) => {
    const [dd, mm, yyyy] = dateStr.split('/');
    return { date_dd: dd, date_mm: mm, date_yyyy: yyyy };
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8 pb-12">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary">
            <Printer className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-widest">Hardware Mode</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight">{t('print.title')}</h2>
          <p className="text-muted-foreground text-sm">{t('print.subtitle')}</p>
        </div>
        <button 
          onClick={() => { reset(); resetCheque(); }}
          className="flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest"
        >
          <RotateCcw className="w-4 h-4" /> {t('print.form.reset')}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Form */}
        <div className="card space-y-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2 space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{t('print.form.template')}</label>
                <select 
                  {...register('bank_code')}
                  className="w-full form-input h-11"
                >
                  <option value="">Select a bank layout...</option>
                  {bankTemplates.map(bank => (
                    <option key={bank.bank_code} value={bank.bank_code}>{bank.bank_name} - Standard</option>
                  ))}
                </select>
                {errors.bank_code && <p className="text-[10px] text-destructive font-bold uppercase">{errors.bank_code.message}</p>}
              </div>

              <div className="col-span-2 space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{t('print.form.printer')}</label>
                <select 
                  {...register('target_printer')}
                  className="w-full form-input h-11"
                >
                  <option value="">Default System Printer</option>
                  {printers.map(p => (
                    <option key={p.name} value={p.name}>{p.name} {p.isDefault ? '(Default)' : ''}</option>
                  ))}
                </select>
              </div>

              <div className="col-span-2 space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{t('print.form.payee')}</label>
                <input 
                  {...register('payee_name')}
                  placeholder="ACME Corporation Ltd."
                  className="w-full form-input h-11 font-serif"
                />
                {errors.payee_name && <p className="text-[10px] text-destructive font-bold uppercase">{errors.payee_name.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{t('print.form.amount')}</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">₹</span>
                  <input 
                    {...register('amount', { valueAsNumber: true })}
                    type="number"
                    placeholder="0.00"
                    className="w-full form-input h-11 pl-8 font-bold"
                  />
                </div>
                {errors.amount && <p className="text-[10px] text-destructive font-bold uppercase">{errors.amount.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{t('print.form.date')}</label>
                <input 
                  {...register('cheque_date')}
                  placeholder="DD/MM/YYYY"
                  className="w-full form-input h-11 font-mono tracking-widest"
                />
                {errors.cheque_date && <p className="text-[10px] text-destructive font-bold uppercase">{errors.cheque_date.message}</p>}
              </div>

              <div className="col-span-2 p-5 rounded-2xl bg-secondary/30 border border-border">
                <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest block mb-2">{t('print.form.words')}</label>
                <p className="text-sm font-bold italic text-primary min-h-[1.25rem]">
                  {amountInWords ? `${amountInWords} Only` : 'Waiting for amount...'}
                </p>
              </div>

              <div className="col-span-2 space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{t('print.form.signature')}</label>
                <div className="flex gap-4 items-center p-4 rounded-xl border border-dashed border-border bg-muted/20">
                  <button 
                    type="button"
                    onClick={async () => {
                      const path = await window.electronAPI.openFile([
                        { name: 'Images', extensions: ['png', 'jpg', 'jpeg'] }
                      ]);
                      if (path) setValue('signature', path);
                    }}
                    className="btn-primary py-2 px-4 text-xs bg-white text-black border border-border shadow-sm hover:bg-muted"
                  >
                    {watch('signature') ? 'Update File' : 'Choose Signature'}
                  </button>
                  <div className="flex-1 min-w-0">
                    {watch('signature') ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span className="text-[10px] font-bold text-muted-foreground truncate uppercase tracking-tighter">
                          {watch('signature').split('\\').pop()}
                        </span>
                        <button 
                          type="button"
                          onClick={() => setValue('signature', '')}
                          className="text-[10px] text-destructive font-bold uppercase hover:underline ml-auto"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">No signature selected (Will print blank signatory line)</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 flex gap-4">
              <button type="submit" className="btn-primary flex-1 h-12 gap-3">
                <Printer className="w-5 h-5" /> 
                <span className="uppercase tracking-widest text-xs font-black">{t('print.form.submit')}</span>
              </button>
              <button type="button" className="card p-0 px-6 h-12 flex items-center justify-center gap-2 hover:bg-secondary transition-all">
                <Save className="w-5 h-5" />
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
