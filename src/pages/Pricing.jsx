import React from 'react';
import { Check, Shield, Zap, Crown, Globe, HelpCircle } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    description: 'Perfect for small businesses just starting out.',
    features: ['Up to 50 Cheques / Month', 'Standard Templates', 'Local Database', 'Email Support'],
    icon: Zap,
    color: 'border-white/10',
    btnClass: 'bg-white/5 border border-white/10 hover:bg-white/10',
  },
  {
    name: 'Professional',
    price: '₹9,999',
    period: '/year',
    description: 'Advanced features for growing enterprises.',
    features: ['Unlimited Cheques', 'Custom Template Designer', 'Cloud Sync & Backup', 'Priority Support', 'Multi-user Access'],
    icon: Crown,
    popular: true,
    color: 'border-primary/50 shadow-2xl shadow-primary/20',
    btnClass: 'btn-primary',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Custom solutions for large scale operations.',
    features: ['API Access', 'White-labeling', 'Dedicated Account Manager', 'On-premise Deployment', '24/7 Phone Support'],
    icon: Globe,
    color: 'border-white/10',
    btnClass: 'bg-white/5 border border-white/10 hover:bg-white/10',
  },
];

export default function Pricing() {
  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold gradient-text">Plans & Pricing</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Choose the plan that fits your business needs. Upgrade or downgrade at any time.
          Secure your printing process with our premium solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <div key={i} className={`card flex flex-col p-8 relative overflow-hidden group hover:-translate-y-2 transition-all duration-500 border-2 ${plan.color}`}>
            {plan.popular && (
              <div className="absolute top-4 right-0 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-l-full uppercase tracking-widest">
                Most Popular
              </div>
            )}
            
            <div className="p-3 w-fit rounded-2xl bg-primary/10 mb-6 group-hover:scale-110 transition-transform">
              <plan.icon className="w-8 h-8 text-primary" />
            </div>

            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-4xl font-bold">{plan.price}</span>
              {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
            </div>
            <p className="text-sm text-muted-foreground mb-8">{plan.description}</p>

            <div className="space-y-4 flex-1 mb-8">
              {plan.features.map((feature, j) => (
                <div key={j} className="flex items-center gap-3 text-sm">
                  <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-green-500" />
                  </div>
                  {feature}
                </div>
              ))}
            </div>

            <button className={`w-full py-3 rounded-xl font-bold transition-all ${plan.btnClass}`}>
              {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
            </button>
          </div>
        ))}
      </div>

      <div className="card bg-primary/5 border-primary/10 flex flex-col md:flex-row items-center justify-between gap-6 p-10">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-xl font-bold">Need a custom plan?</h3>
          <p className="text-muted-foreground">We can build a plan tailored specifically to your organization's unique requirements.</p>
        </div>
        <button className="btn-primary px-8 whitespace-nowrap flex items-center gap-2">
          <HelpCircle className="w-5 h-5" /> Talk to an Expert
        </button>
      </div>
    </div>
  );
}
