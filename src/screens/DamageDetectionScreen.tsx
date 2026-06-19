import React, { useState, useEffect } from 'react';
import { Camera, AlertTriangle, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from '../hooks/useTranslation';

interface DamageDetectionScreenProps {
  onComplete: () => void;
}

export function DamageDetectionScreen({ onComplete }: DamageDetectionScreenProps) {
  const { t } = useTranslation();
  const [isScanning, setIsScanning] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [errorType, setErrorType] = useState(t('ai_vision.mock.defect_value', 'Móp méo bao bì carton'));
  const [damageScore, setDamageScore] = useState(8);
  
  useEffect(() => {
    // Simulate AI Scan
    const scanTimer = setTimeout(() => {
      setIsScanning(false);
    }, 3000);
    
    return () => {
      clearTimeout(scanTimer);
    };
  }, []);

  const handleSubmit = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      onComplete();
    }, 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-24 px-4 w-full relative">
      
      {/* Success Toast */}
      {showToast && (
        <div className="absolute top-16 inset-x-4 bg-emerald-950/95 border border-emerald-500/40 text-emerald-400 text-[10px] p-3 rounded-xl shadow-[0_10px_30px_rgba(16,185,129,0.3)] z-50 flex flex-col gap-0.5 animate-in fade-in slide-in-from-top-2 duration-200">
          <span className="font-bold text-emerald-400 text-xs tracking-wider uppercase">✓ {t('damage.toast.success_title', 'THÀNH CÔNG')}</span>
          <span className="text-slate-300">Đã lập ticket cách ly hàng lỗi ngầm thành công!</span>
        </div>
      )}

      <header className="shrink-0 pt-2">
        <h1 className="text-xl font-black text-white tracking-tight">AI Vision</h1>
        <p className="text-[11px] text-rose-400 mt-0.5 font-bold uppercase tracking-wider">{t('ai_vision.sub_title', 'PHÂN LOẠI HÀNG LỖI')}</p>
      </header>

      {/* Image Capture Area */}
      <div className="w-full h-44 bg-slate-950 border-2 border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center gap-2 relative overflow-hidden mt-4 shrink-0">
        
        {/* Overlay Text if scanning */}
        {isScanning && (
           <div className="z-10 flex flex-col items-center gap-1 p-2 rounded-xl">
             <Camera className="w-6 h-6 text-slate-500 animate-pulse" />
             <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest animate-pulse">AI Vision Scanning...</span>
           </div>
        )}

        {/* Red Scanner Line Effect */}
        {isScanning && (
          <motion.div 
            className="absolute left-0 w-full h-[2px] bg-rose-500 shadow-[0_0_10px_#f43f5e] z-20"
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        )}
      </div>

      {/* AI Assessment Card */}
      <AnimatePresence>
         {!isScanning && (
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="bg-slate-900 border border-slate-800 rounded-xl p-3 mt-4 flex flex-col gap-2 shrink-0 relative overflow-hidden"
           >
             {/* Decorative side accent */}
             <div className="absolute left-0 top-0 w-1 h-full bg-rose-600 shadow-[0_0_8px_rgba(225,29,72,0.5)]"></div>

             <div className="flex items-center gap-1.5 pl-1">
               <AlertTriangle className="w-4 h-4 text-rose-500" />
               <h3 className="text-white text-xs font-bold uppercase tracking-wider">{t('ai_vision.result.title', 'KẾT QUẢ PHÂN TÍCH')}</h3>
             </div>

             <div className="bg-slate-950/50 rounded-lg p-2 flex flex-col gap-2 mt-1 border border-slate-800/50">
               <div className="flex flex-col gap-1">
                 <span className="text-[10px] text-slate-400">{t('ai_vision.result.defect_type', 'Loại lỗi nhận diện:')}</span>
                 <input 
                   type="text" 
                   className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-[10px] rounded-lg px-2 py-1.5 outline-none focus:border-blue-500/50"
                   value={errorType}
                   onChange={(e) => setErrorType(e.target.value)}
                 />
               </div>
               <div className="flex flex-col gap-1">
                 <div className="flex justify-between items-center">
                   <span className="text-[10px] text-slate-400">{t('ai_vision.result.damage_level', 'Mức độ hư hại:')}</span>
                   <span className="text-xs text-rose-500 font-black">{damageScore}/10</span>
                 </div>
                 <input 
                   type="range" 
                   min="1" 
                   max="10" 
                   value={damageScore} 
                   onChange={(e) => setDamageScore(Number(e.target.value))}
                   className="w-full h-1.5 bg-slate-800 rounded-full appearance-none outline-none accent-rose-500 cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-rose-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-rose-500 [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer"
                 />
               </div>
             </div>

             <div className="flex flex-col gap-1 mt-2 mb-1">
               <span className="text-[10px] text-slate-400 uppercase font-bold px-1">{t('ai_vision.result.recommendation', 'HÀNH ĐỘNG KHUYẾN NGHỊ')}</span>
               <div className="w-full bg-slate-900/40 border border-slate-900 text-slate-500 text-[10px] rounded-lg px-2 py-1.5 italic select-none">
                 {t('ai_vision.result.recommendation_desc', 'Hệ thống sẽ tự động cách ly hàng hóa và điều phối nhân viên QC chuyên trách đến thu hồi sau khi biên bản được gửi.')}
               </div>
               <span className="text-[8px] text-slate-600 italic px-1">{t('ai_vision.result.footer_note', '*Nhân viên hiện trường không có quyền thay đổi luồng xử lý hàng hỏng')}</span>
             </div>

           </motion.div>
         )}
      </AnimatePresence>

      <div className="mt-4 pb-4 shrink-0 w-full mb-4">
        <button 
          onClick={handleSubmit}
          disabled={isScanning || showToast}
          className="w-full bg-rose-600 py-2.5 rounded-xl text-xs font-bold text-white tracking-wider uppercase active:scale-[0.98] transition-transform shadow-[0_0_15px_rgba(225,29,72,0.3)] disabled:opacity-50 disabled:active:scale-100"
        >
          {showToast ? t('ai_vision.actions.processing', 'ĐANG XỬ LÝ...') : t('ai_vision.actions.submit', 'GỬI BIÊN BẢN SỰ CỐ')}
        </button>
      </div>

    </div>
  );
}
