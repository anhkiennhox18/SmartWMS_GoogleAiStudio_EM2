import React, { useState } from 'react';
import { Box, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface MobileLoginScreenProps {
  onLoginSuccess: (email: string) => void;
}

export function MobileLoginScreen({ onLoginSuccess }: MobileLoginScreenProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('staff@smartwms.com');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleLogin = () => {
    if (!email || !password) return;
    
    setIsLoading(true);
    // Simulate API call and loading state
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(email);
    }, 1000);
  };

  const setDemoCredentials = (role: 'staff' | 'admin') => {
    if (role === 'staff') {
      setEmail('staff@smartwms.com');
      setPassword('123456');
    } else {
      setEmail('admin@smartwms.com');
      setPassword('123456');
    }
  };

  return (
    <div className="absolute inset-0 w-full h-screen bg-[#090d16] flex items-center justify-center p-2 overflow-hidden select-none z-50">
      <div className="w-[310px] h-[620px] bg-black rounded-[44px] border-[8px] border-[#1e2330] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] flex flex-col relative overflow-hidden shrink-0">
        
        {/* Dynamic Island & Hardware details */}
        <div className="absolute top-[4px] left-1/2 transform -translate-x-1/2 w-16 h-1 bg-[#2a3042] rounded-full z-50"></div>
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-20 h-5 bg-black rounded-full z-50"></div>

        {/* Inner Screen Container */}
        <div className="w-full h-full bg-slate-950 flex flex-col pt-12 pb-4 px-4 rounded-[40px] overflow-hidden justify-between relative">
          
          <div className="flex-1 flex flex-col pt-6">
            {/* Brand Header */}
            <div className="flex flex-col items-center mt-2 mb-6 shrink-0">
              <div className="w-14 h-14 bg-blue-600/20 border border-blue-500/30 rounded-2xl flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(37,99,235,0.2)]">
                <Box className="w-7 h-7 text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" strokeWidth={2.5} />
              </div>
              <h1 className="text-lg font-black text-white tracking-tight leading-none mb-1.5">{t('auth.title')}</h1>
              <p className="text-[9px] text-slate-500 font-medium tracking-wide uppercase">{t('auth.subtitle')}</p>
            </div>

            {/* Quick Login Presets */}
            <div className="flex gap-2 mb-4 shrink-0 justify-center">
              <button
                onClick={() => setDemoCredentials('staff')}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${
                  email === 'staff@smartwms.com'
                    ? 'border-blue-500/50 bg-blue-500/10 text-blue-400'
                    : 'border-slate-800 bg-slate-900/45 text-slate-400'
                }`}
              >
                Nhân viên (Staff)
              </button>
              <button
                onClick={() => setDemoCredentials('admin')}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${
                  email === 'admin@smartwms.com'
                    ? 'border-blue-500/50 bg-blue-500/10 text-blue-400'
                    : 'border-slate-800 bg-slate-900/45 text-slate-400'
                }`}
              >
                Quản lý (Admin)
              </button>
            </div>

            {/* Form Inputs Section */}
            <div className="flex flex-col gap-2.5 shrink-0">
              {/* Email Input */}
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold text-slate-400 ml-1 uppercase tracking-wider">{t('auth.email_label')}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-3.5 w-3.5 text-slate-500" strokeWidth={2} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-900/60 border border-slate-800 text-slate-200 text-xs rounded-xl pl-9 pr-3 py-2.5 outline-none focus:border-blue-500/50 focus:bg-slate-900 transition-colors placeholder:text-slate-600 font-medium"
                    placeholder={t('auth.email_placeholder')}
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold text-slate-400 ml-1 uppercase tracking-wider">{t('auth.password_label')}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-3.5 w-3.5 text-slate-500" strokeWidth={2} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-900/60 border border-slate-800 text-slate-200 text-xs rounded-xl pl-9 pr-10 py-2.5 outline-none focus:border-blue-500/50 focus:bg-slate-900 transition-colors placeholder:text-slate-600 font-medium tracking-normal"
                    placeholder={t('auth.password_placeholder')}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center active:scale-95 transition-transform"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-3.5 w-3.5 text-slate-400" strokeWidth={2} />
                    ) : (
                      <Eye className="h-3.5 w-3.5 text-slate-400" strokeWidth={2} />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot Password */}
              <div className="flex justify-between items-center w-full mt-1 h-5">
                <div 
                  className="flex items-center gap-2 cursor-pointer select-none group h-full"
                  onClick={() => setRememberMe(!rememberMe)}
                >
                  <div className="w-3.5 h-3.5 border border-slate-700 rounded bg-slate-900 flex items-center justify-center shrink-0 transition-all group-hover:border-blue-500/50">
                    {rememberMe && <div className="w-2 h-2 bg-blue-500 rounded-[1px] shadow-[0_0_8px_rgba(59,130,246,0.6)]" />}
                  </div>
                  <span className="text-[9px] font-bold text-slate-400 leading-none select-none">{t('auth.remember_me')}</span>
                </div>
                
                <button 
                  type="button" 
                  className="text-[9px] font-bold text-blue-400 hover:text-blue-300 transition-colors active:scale-95 leading-none h-full flex items-center"
                >
                  {t('auth.forgot_password')}
                </button>
              </div>

              {/* Action Button */}
              <button
                onClick={handleLogin}
                disabled={isLoading || !email || !password}
                className={`w-full py-3 rounded-xl text-xs font-black text-white uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 mt-3
                  ${(!email || !password) 
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed shadow-none' 
                    : 'bg-blue-600 active:scale-[0.98] border border-blue-500/50 hover:bg-blue-500'}
                `}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" strokeWidth={2.5} />
                    <span>{t('auth.loading')}</span>
                  </>
                ) : (
                  <span>{t('auth.submit_button')}</span>
                )}
              </button>
            </div>
          </div>

          {/* Home Indicator */}
          <div className="w-28 h-1 bg-white/20 rounded-full mx-auto mt-2 shrink-0"></div>
        </div>
      </div>
    </div>
  );
}
