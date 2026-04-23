import React from 'react';
import { useChequeStore } from '../store/useChequeStore';
import { bankTemplates } from '../data/bankTemplates';
import { numberToIndianWords } from '../lib/numberToWords';

export default function ChequePreview() {
  const { activeCheque } = useChequeStore();
  const template = bankTemplates.find(t => t.bank_code === activeCheque.bank_code);
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

  const getBgTexture = () => {
    if (activeCheque.bank_code === 'ICICI') return '/src/assets/texture_beige.png';
    return '/src/assets/texture_blue.png';
  };

  const getBankLogo = () => {
    if (activeCheque.bank_code === 'SBI') return '/src/assets/logo_sbi.png';
    if (activeCheque.bank_code === 'HDFC') return '/src/assets/logo_hdfc.png';
    if (activeCheque.bank_code === 'ICICI') return '/src/assets/logo_icici.png';
    return '';
  };

  const getBankColor = () => {
    if (activeCheque.bank_code === 'SBI') return 'text-[#2563eb]';
    if (activeCheque.bank_code === 'HDFC') return 'text-[#1e293b]';
    if (activeCheque.bank_code === 'ICICI') return 'text-[#9a3412]';
    return 'text-black';
  };

  return (
    <div className="relative overflow-auto p-12 flex justify-center bg-muted/30 rounded-[3rem] border border-border/50 shadow-2xl">
      <div 
        className="relative bg-white text-black shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] rounded-sm transition-all duration-700 overflow-hidden border border-black/10"
        style={{ 
          width: `${width}px`, 
          height: `${height}px`,
          backgroundImage: `url(${getBgTexture()})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Bank Identity Section */}
        <div className="absolute top-4 left-6 flex items-center gap-4 group">
          {getBankLogo() && (
            <img 
              src={getBankLogo()} 
              alt="Bank Logo" 
              className="w-10 h-10 object-contain drop-shadow-sm transition-transform duration-500 group-hover:scale-110" 
            />
          )}
          <div>
            <h4 className={`text-sm font-black uppercase tracking-tighter leading-tight ${getBankColor()}`}>
              {template.bank_name}
            </h4>
            <p className="text-[8px] font-bold text-black/40 uppercase tracking-[0.2em]">ChequePrint Pro System</p>
          </div>
        </div>

        {/* Date Boxes Mockup (Common in realistic cheques) */}
        <div className="absolute top-4 right-6 flex gap-1">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-6 h-8 border border-black/20 flex items-center justify-center font-mono text-xs">
              {/* Box container */}
            </div>
          ))}
        </div>

        {/* Fields */}
        {template.fields.map((field, idx) => {
          const value = getFieldValue(field.field_name);
          
          if (field.field_name === 'signature' && value) {
            return (
              <img 
                key={idx}
                src={value}
                alt="Signature"
                className="absolute mix-blend-multiply transition-all duration-500 pointer-events-none"
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
                fontSize: `${field.font_size * 1.4}px`, 
                fontWeight: field.is_bold ? '700' : '500',
                color: value ? '#000' : 'rgba(0,0,0,0.03)',
                letterSpacing: isDate ? '0.6em' : 'normal',
                transform: value ? 'none' : 'translateY(1px)',
                opacity: value ? 1 : 0.5
              }}
            >
              {value || (isDate ? '0' : field.field_name)}
            </div>
          );
        })}

        {/* Decorative elements (Realistic bottom MICR area) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 w-full px-12">
          <div className="flex justify-between w-full opacity-40">
             <div className="w-32 border-b border-black/20 text-[6px] text-center uppercase font-bold">Authorized Signatory</div>
             <div className="w-32 border-b border-black/20 text-[6px] text-center uppercase font-bold">Please sign above</div>
          </div>
          <div className="font-mono text-xs tracking-[0.5em] opacity-30">
            " 000000 " 000000000 |: 000000 |' 00
          </div>
        </div>
      </div>
    </div>
  );
}
