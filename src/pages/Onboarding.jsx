import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Printer, 
  Banknote, 
  ArrowRight, 
  CheckCircle2, 
  Smartphone,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  {
    title: "Welcome to Pro Printing",
    description: "Enterprise-grade cheque management system designed for speed, security, and precision.",
    icon: ShieldCheck,
    color: "bg-blue-500",
    image: "/src/assets/logo.png"
  },
  {
    title: "Realistic Templates",
    description: "Select from a wide range of realistic bank templates or design your own with the visual editor.",
    icon: Banknote,
    color: "bg-emerald-500",
    image: "/src/assets/cheque_sbi.png"
  },
  {
    title: "Hardware Precision",
    description: "Calibrate your laser printer with MICR toner for banking standards compliance.",
    icon: Printer,
    color: "bg-purple-500",
    image: "/src/assets/cheque_hdfc.png"
  }
];

export default function Onboarding({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(s => s + 1);
    } else {
      onComplete();
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep(s => s - 1);
    }
  };

  const step = steps[currentStep];

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-6">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 card p-0 overflow-hidden shadow-2xl">
        {/* Visual Panel */}
        <div className="bg-secondary/50 flex flex-col items-center justify-center p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full" />
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentStep}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              className="relative z-10 w-full flex justify-center"
            >
              <img 
                src={step.image} 
                alt="Preview" 
                className="max-h-[300px] object-contain rounded-2xl shadow-2xl"
              />
            </motion.div>
          </AnimatePresence>
          
          {/* Step Indicators */}
          <div className="flex gap-2 mt-12 relative z-10">
            {steps.map((_, i) => (
              <div 
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentStep ? 'w-8 bg-primary' : 'w-2 bg-muted'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content Panel */}
        <div className="p-12 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className={`w-12 h-12 rounded-2xl ${step.color} flex items-center justify-center text-white shadow-lg`}>
                <step.icon className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">{step.title}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between pt-12">
            <button 
              onClick={prev}
              disabled={currentStep === 0}
              className="p-3 rounded-xl hover:bg-secondary transition-colors disabled:opacity-0"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button 
              onClick={next}
              className="btn-primary flex items-center gap-2 py-3 px-8"
            >
              {currentStep === steps.length - 1 ? 'Get Started' : 'Next Step'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
