import React, { useState } from 'react';
import { ShieldCheck, Mail, Lock, User, ArrowRight } from 'lucide-react';

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

import { useTranslation } from 'react-i18next';

export default function Auth({ onLogin }) {
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      if (isLogin) {
        const result = await window.electronAPI.login({
          email: data.email,
          password: data.password
        });
        
        if (result.success) {
          onLogin(result.user);
          toast.success(`${t('dashboard.welcome')}, ${result.user.fullName}!`);
        } else {
          toast.error(result.error);
        }
      } else {
        const result = await window.electronAPI.signup({
          fullName: data.fullName,
          email: data.email,
          password: data.password
        });
        
        if (result.success) {
          setIsLogin(true);
          toast.success('Account created! Please sign in.');
        } else {
          toast.error(result.error);
        }
      }
    } catch (error) {
      toast.error('Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full animate-pulse" />

      <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex mb-4">
            <img 
              src="/src/assets/logo.png" 
              alt="ChequePrint Pro Logo" 
              className="w-20 h-20 object-contain rounded-3xl shadow-2xl shadow-primary/30 animate-float"
            />
          </div>
          <h1 className="text-3xl font-bold tracking-tight gradient-text">ChequePrint Pro</h1>
          <p className="text-muted-foreground">{isLogin ? t('auth.login') : t('auth.signup')}</p>
        </div>

        <div className="card p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-medium">{t('auth.fullName')}</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input 
                    name="fullName"
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full form-input pl-10"
                    required
                  />
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('auth.email')}</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  name="email"
                  type="email" 
                  placeholder="name@company.com" 
                  className="w-full form-input pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">{t('auth.password')}</label>
                {isLogin && (
                  <button type="button" className="text-xs text-primary hover:underline">Forgot password?</button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  name="password"
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full form-input pl-10"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="btn-primary w-full py-3 flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : (isLogin ? t('auth.submit_login') : t('auth.submit_signup'))}
              {!isLoading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10" /></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">Or continue with</span></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="card py-2 flex items-center justify-center gap-2 hover:bg-secondary p-0">
              <GithubIcon /> Github
            </button>
            <button className="card py-2 flex items-center justify-center gap-2 hover:bg-secondary p-0">
              <GoogleIcon /> Google
            </button>
          </div>

          <div className="pt-4 text-center">
            <button 
              onClick={() => onLogin({ id: 'test', fullName: 'Test Admin', email: 'test@chequeprint.pro', role: 'Admin' })}
              className="text-[10px] font-bold text-muted-foreground hover:text-primary uppercase tracking-widest transition-colors"
            >
              Skip Sign In (Dev Mode)
            </button>
          </div>
        </div>

        <p className="text-center mt-8 text-sm text-muted-foreground">
          {isLogin ? t('auth.toggle_signup').split('?')[0] + '?' : t('auth.toggle_login').split('?')[0] + '?'} {' '}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary font-bold hover:underline"
          >
            {isLogin ? t('auth.submit_signup') : t('auth.submit_login')}
          </button>
        </p>
      </div>
    </div>
  );
}
