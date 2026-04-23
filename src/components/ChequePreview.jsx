import React from 'react';
import { useChequeStore } from '../store/useChequeStore';
import { bankTemplates } from '../data/bankTemplates';
import { numberToIndianWords } from '../lib/numberToWords';

export default function ChequePreview() {
  const { activeCheque } = useChequeStore();
  const template = bankTemplates.find(t => t.bank_code === activeCheque.bank_code);

  if (!template) {
    return (
      <div className="card h-[300px] flex flex-col items-center justify-center text-center border-dashed border-2 border-white/10">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
          <div className="w-8 h-[2px] bg-white/20 rotate-45" />
          <div className="w-8 h-[2px] bg-white/20 -rotate-45 absolute" />
        </div>
        <p className="text-muted-foreground font-medium">Select a bank to view preview</p>
        <p className="text-[10px] text-muted-foreground/50 mt-2">REAL-TIME POSITIONING ENABLED</p>
      </div>
    );
  }

  // Scale factor for preview (mm to pixels)
  // Cheque is roughly 200mm, so 4x = 800px max width for container
  const scale = 3.5; 
  const width = template.width_mm * scale;
  const height = template.height_mm * scale;

  const splitDate = (dateStr) => {
    if (!dateStr || !dateStr.includes('/')) return { dd: '', mm: '', yyyy: '' };
    const [dd, mm, yyyy] = dateStr.split('/');
    return { dd, mm, yyyy };
  };

  const dateParts = splitDate(activeCheque.cheque_date);
  const amountWords = activeCheque.amount 
    ? numberToIndianWords(Number(activeCheque.amount)) 
    : '';

  const [sigUrl, setSigUrl] = React.useState('');

  React.useEffect(() => {
    const loadSignature = async () => {
      if (activeCheque.signature) {
        try {
          const buffer = await window.electronAPI.readFileBinary(activeCheque.signature);
          const blob = new Blob([buffer]);
          const url = URL.createObjectURL(blob);
          setSigUrl(url);
        } catch (e) {
          console.error('Failed to load signature', e);
        }
      } else {
        setSigUrl('');
      }
    };
    loadSignature();
  }, [activeCheque.signature]);

  const getFieldValue = (fieldName) => {
    switch (fieldName) {
      case 'payee': return activeCheque.payee_name;
      case 'amount_num': return activeCheque.amount ? `₹ ${activeCheque.amount.toLocaleString('en-IN')}/-` : '';
      case 'amount_words': return amountWords ? `${amountWords} Only` : '';
      case 'date_dd': return dateParts.dd;
      case 'date_mm': return dateParts.mm;
      case 'date_yyyy': return dateParts.yyyy;
      case 'signature': return sigUrl;
      default: return '';
    }
  };

  const getBgImage = () => {
    if (activeCheque.bank_code === 'SBI') return '/src/assets/cheque_sbi.png';
    if (activeCheque.bank_code === 'HDFC') return '/src/assets/cheque_hdfc.png';
    return ''; // Fallback to blank
  };

  return (
    <div className="relative overflow-auto p-8 flex justify-center bg-muted/50 rounded-[2.5rem] border border-border shadow-inner">
      <div 
        className="relative bg-white text-black shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-sm transition-all duration-500 overflow-hidden border border-black/5"
        style={{ 
          width: `${width}px`, 
          height: `${height}px`,
          backgroundImage: `url(${getBgImage()})`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {!getBgImage() && (
          <div className="absolute inset-0 opacity-5" style={{ 
            backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)',
            backgroundSize: '10px 10px'
          }} />
        )}

        {/* Bank Name fallback if no image */}
        {!getBgImage() && (
          <div className="absolute top-4 left-6 text-sm font-bold uppercase tracking-tight opacity-20">
            {template.bank_name}
          </div>
        )}

        {/* Fields */}
        {template.fields.map((field, idx) => {
          const value = getFieldValue(field.field_name);
          
          if (field.field_name === 'signature' && value) {
            return (
              <img 
                key={idx}
                src={value}
                alt="Signature"
                className="absolute mix-blend-multiply transition-all duration-300 pointer-events-none"
                style={{
                  left: `${field.x_mm * scale}px`,
                  top: `${field.y_mm * scale}px`,
                  width: field.max_width_mm ? `${field.max_width_mm * scale}px` : '100px',
                  height: 'auto',
                }}
              />
            );
          }

          const isDate = field.field_name.startsWith('date_');
          
          return (
            <div
              key={idx}
              className={`absolute transition-all duration-300 pointer-events-none ${isDate ? 'font-mono tracking-[0.4em]' : 'font-serif'}`}
              style={{
                left: `${field.x_mm * scale}px`,
                top: `${field.y_mm * scale}px`,
                maxWidth: field.max_width_mm ? `${field.max_width_mm * scale}px` : 'none',
                fontSize: `${field.font_size * 1.3}px`, 
                fontWeight: field.is_bold ? '700' : '500',
                color: value ? '#1a1a1a' : 'rgba(0,0,0,0.05)',
                letterSpacing: isDate ? '0.5em' : 'normal',
                transform: value ? 'none' : 'translateY(2px)',
                opacity: value ? 1 : 0.5
              }}
            >
              {value || (getBgImage() ? '' : field.field_name)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
