import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScanBarcode, MapPin, CheckCircle2 } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface PutawayExecutionScreenProps {
  onComplete: () => void;
}

export function PutawayExecutionScreen({ onComplete }: PutawayExecutionScreenProps) {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [isScanning, setIsScanning] = useState(false);
  const [isBinScanned, setIsBinScanned] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setStep(2);
    }, 1500);
  };

  const handleScanBin = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setIsBinScanned(true);
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden w-full relative">
      <main className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex flex-col gap-3 mt-2 pb-2">
        {step >= 1 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/80 backdrop-blur-md border border-slate-800/80 p-3 rounded-2xl flex flex-col gap-2 shrink-0 relative overflow-hidden"
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-300">1</div>
              <h3 className="text-white text-xs font-bold uppercase tracking-wider">{t('putaway.step_1', 'BƯỚC 1')}</h3>
            </div>
            <div className="text-[11px] text-slate-300 font-semibold mb-1">
              {t('putaway.step_1_desc', 'Quét mã Pallet nhận hàng tại Cửa Dock C')}
            </div>
            
            {step === 1 && (
              <button 
                onClick={handleScan}
                disabled={isScanning}
                className="w-full py-2.5 mt-1 bg-emerald-600 active:scale-[0.98] transition-transform rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold text-white shadow-lg border border-emerald-500/30 disabled:opacity-50"
              >
                <ScanBarcode className="w-4 h-4 text-white" />
                {isScanning ? 'ĐANG QUÉT...' : t('putaway.actions.scan_pallet', 'BẤM ĐỂ QUÉT MÃ PALLET')}
              </button>
            )}
            
            {step > 1 && (
              <div className="flex items-center gap-1.5 text-emerald-400 mt-1 bg-emerald-950/30 p-1.5 rounded-lg border border-emerald-900/30">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold">Pallet PAL-9042 OK</span>
              </div>
            )}
          </motion.div>
        )}

        {step >= 2 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/80 backdrop-blur-md border border-slate-800/80 p-3 rounded-2xl flex flex-col gap-2 shrink-0 relative overflow-hidden"
          >
             <div className="flex items-center gap-2 mb-1">
              <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-300">2</div>
              <h3 className="text-white text-xs font-bold uppercase tracking-wider">{t('putaway.step_2', 'BƯỚC 2')}</h3>
            </div>
            
            <div className="text-[11px] text-slate-300 font-semibold text-center mb-1">
              {t('putaway.step_2_desc', 'Please move and put into the suggested Bin:')}
            </div>

            <div className="bg-slate-950/50 p-2.5 rounded-xl border border-slate-800/50 mt-1 flex flex-col items-center justify-center gap-1">
               <span className="text-[10px] text-slate-400 font-bold uppercase">{t('putaway.bin_label', 'KHU VỰC CẤT HÀNG')}</span>
               <span className="text-[22px] font-mono font-black text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.3)] tracking-wider">B2-M04-K01</span>
            </div>

            <button 
              onClick={!isBinScanned ? handleScanBin : onComplete}
              disabled={isScanning && step === 2}
              className={`w-full py-3 mt-2 active:scale-[0.98] transition-transform rounded-xl flex items-center justify-center gap-1.5 text-[11px] font-bold text-white shadow-lg border disabled:opacity-50 ${!isBinScanned ? 'bg-blue-600 border-blue-500/30' : 'bg-emerald-600 border-emerald-500/30'}`}
            >
              {!isBinScanned ? <ScanBarcode className="w-4 h-4 text-white" /> : <CheckCircle2 className="w-4 h-4 text-white" />}
              {isScanning && step === 2 ? 'ĐANG QUÉT...' : !isBinScanned ? t('putaway.actions.scan_bin', 'QUÉT MÃ VẠCH Ô KỆ ĐỂ XÁC NHẬN') : t('putaway.actions.confirm_putaway', 'XÁC NHẬN ĐÃ CẤT LÊN KỆ')}
            </button>
          </motion.div>
        )}
      </main>

      {/* Camera Mock Overlay */}
      <AnimatePresence>
        {isScanning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 w-full h-full bg-slate-950/90 z-[60] flex flex-col items-center justify-center rounded-2xl backdrop-blur-sm shrink-0"
          >
            <div className="w-48 h-48 border-2 border-dashed border-emerald-500 rounded-2xl relative flex items-center justify-center bg-slate-900/40 shrink-0">
              {/* Scanner Corners */}
              <div className="absolute top-[-2px] left-[-2px] w-6 h-6 border-t-4 border-l-4 border-emerald-400 rounded-tl-2xl"></div>
              <div className="absolute top-[-2px] right-[-2px] w-6 h-6 border-t-4 border-r-4 border-emerald-400 rounded-tr-2xl"></div>
              <div className="absolute bottom-[-2px] left-[-2px] w-6 h-6 border-b-4 border-l-4 border-emerald-400 rounded-bl-2xl"></div>
              <div className="absolute bottom-[-2px] right-[-2px] w-6 h-6 border-b-4 border-r-4 border-emerald-400 rounded-br-2xl"></div>
              
              {/* Red Laser */}
              <motion.div 
                className="absolute left-0 w-full h-0.5 bg-rose-500 shadow-[0_0_8px_#f43f5e]" 
                animate={{ top: ['5%', '95%', '5%'] }} 
                transition={{ repeat: Infinity, duration: 2, ease: 'linear' }} 
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
