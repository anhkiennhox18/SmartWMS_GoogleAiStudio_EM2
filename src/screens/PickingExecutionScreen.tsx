import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScanBarcode, CheckCircle2, Box, PackageCheck, Package, Volume2, Vibrate, Cloud, AlertTriangle, RefreshCw, Image as ImageIcon, Zap } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const PickPathMap = ({ targetAisle }: { targetAisle: string }) => {
  const { t } = useTranslation();
  
  const aisles = [
    { id: 'A01', key: 'aisle_1' },
    { id: 'A02', key: 'aisle_2' },
    { id: 'A03', key: 'aisle_3' }
  ];

  return (
    <div className="relative w-full h-16 bg-slate-950 rounded-xl border border-slate-800/50 flex items-center justify-center p-2 gap-2 overflow-hidden">
      {aisles.map(aisle => {
        const isTarget = aisle.id === targetAisle;
        return (
          <div key={aisle.id} className="flex flex-col gap-1 items-center w-1/3 relative">
            {isTarget && (
              <motion.div 
                animate={{ opacity: [0.3, 1, 0.3] }} 
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute top-0 w-[110%] h-12 bg-blue-500/20 shadow-[0_0_8px_rgba(59,130,246,0.3)] border border-blue-400/50 rounded-sm z-10 flex items-center justify-center"
              >
                <span className="text-blue-400 font-bold text-[9px] drop-shadow-[0_0_2px_rgba(96,165,250,0.8)] px-1 text-center leading-tight">
                  {t('picking.grid.target_bin')}
                </span>
              </motion.div>
            )}
            <div className={`w-full h-10 rounded-md flex items-center justify-center z-0 transition-colors ${isTarget ? 'bg-transparent' : 'bg-slate-950 border border-slate-800 shadow-inner'}`}>
              {!isTarget && (
                <span className="text-[9px] text-slate-500 font-bold">{t(`picking.grid.${aisle.key}` as any)}</span>
              )}
            </div>
            <span className={`text-[7px] font-bold uppercase ${isTarget ? 'text-blue-500 z-20' : 'text-slate-600'}`}>
              {t(`picking.grid.${aisle.key}` as any)}
            </span>
          </div>
        );
      })}
    </div>
  );
};


interface PickingExecutionScreenProps {
  onCompleteWave?: () => void;
  onReportDamage?: () => void;
}

export default function PickingExecutionScreen({ onCompleteWave, onReportDamage }: PickingExecutionScreenProps) {
  const { t } = useTranslation();
  
  // Local State Management
  const [scannedCount, setScannedCount] = useState(3);
  const targetCount = 10;
  
  const [imageError, setImageError] = useState(false);
  const [pickingStep, setPickingStep] = useState<'SCAN_BIN' | 'SCAN_PRODUCT'>('SCAN_BIN');
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'success'>('idle');
  const [isFlashOn, setIsFlashOn] = useState(false);

  const isComplete = scannedCount >= targetCount;

  // Scan Logic Simulator
  const handleSmartScan = () => {
    if (scanState !== 'idle' || isComplete) return;

    setScanState('scanning');
    
    // Simulate scanner
    setTimeout(() => {
      setScanState('success');
      
      // Auto reset after success
      setTimeout(() => {
        setScanState('idle');
        if (pickingStep === 'SCAN_BIN') {
          setPickingStep('SCAN_PRODUCT');
        } else {
          setScannedCount((prev) => prev + 1);
          setPickingStep('SCAN_BIN');
        }
      }, 2000);
    }, 1000);
  };

  return (
    <>
      <main className="flex-1 flex flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] relative z-0 pb-20 pt-2">
        {/* Progress Bar */}
        <div className="w-full mb-3 shrink-0 px-1">
          <div className="flex justify-between mb-1.5 items-center">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{t('picking.progress_title', 'Tiến độ danh mục')}</span>
            <span className="text-[11px] text-white font-black">
              {t('picking.progress_label', { current: scannedCount, total: targetCount, percent: Math.round((scannedCount / targetCount) * 100) }, `${scannedCount}/${targetCount} Items - ${Math.round((scannedCount / targetCount) * 100)}%`)}
            </span>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden relative">
            <motion.div
              className={`absolute top-0 left-0 h-full transition-colors duration-300 ${isComplete ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-blue-400 shadow-[0_0_8px_#60a5fa]'}`}
              initial={{ width: 0 }}
              animate={{ width: `${(scannedCount / targetCount) * 100}%` }}
              transition={{ type: 'spring', bounce: 0, duration: 0.6 }}
            />
          </div>
        </div>

        {/* Target Location Card */}
        <div className="w-full bg-slate-900 border border-amber-500/40 rounded-2xl pt-3 pb-2.5 px-4 mb-2 flex flex-col items-center justify-center text-center shadow-[0_4px_20px_rgba(245,158,11,0.05)] shrink-0">
          <span className="text-amber-500/80 text-[10px] font-black uppercase tracking-widest mb-1">{t('picking.target_title')}</span>
          <h2 className="text-amber-400 font-black text-2xl tracking-wider animate-pulse leading-none mb-2 mt-1">C1 - A01 - N02</h2>
          <div className="px-3 py-1.5 bg-amber-500/10 rounded-md w-full text-center border border-amber-400/20 mt-1">
            <span className="text-amber-500 font-bold text-[10px] italic truncate block">{t('picking.zone_info')}</span>
          </div>
        </div>

        {/* Mini Pick-path Grid Map */}
        <div className="w-full bg-slate-900/60 border border-slate-800/80 rounded-2xl p-2.5 mb-2 flex flex-col gap-1.5 shrink-0">
          <h4 className="text-[9px] font-black text-slate-500 tracking-wider uppercase">{t('picking.grid.title')}</h4>
          <PickPathMap targetAisle="A01" />
          <p className="text-[9px] text-blue-400 font-medium italic">
            "{t('picking.grid.direction')}"
          </p>
        </div>

        {/* Product Card */}
        <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl mb-2 flex flex-col gap-2 shrink-0 shadow-lg">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-slate-800 rounded-lg overflow-hidden flex items-center justify-center border border-slate-700">
              {!imageError ? (
                <img 
                  src="https://via.placeholder.com/150/000000/FFFFFF/?text=Image" 
                  alt="Product"
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <Package className="w-6 h-6 text-slate-500" />
              )}
            </div>
            <div className="flex-1 overflow-hidden flex flex-col">
              <h3 className="text-slate-200 font-bold text-xs truncate leading-tight">{t('picking.product.name')}</h3>
              <p className="text-blue-400 font-mono text-[10px] mt-0.5 font-bold">{t('picking.product.sku')}</p>
              <span className="text-slate-400 text-[9px] mt-1 pr-2 uppercase font-medium">{t('picking.product.uom')}</span>
            </div>
            <div className="text-right shrink-0">
              <div className="text-3xl font-black text-white tabular-nums leading-none drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] flex items-end justify-end">
                {scannedCount}<span className="text-base text-slate-500 font-bold border-l border-transparent drop-shadow-none leading-tight pb-0.5">/{targetCount}</span>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {scanState === 'success' && (
            <div className="absolute bottom-[200px] inset-x-4 bg-emerald-900 border border-emerald-500 text-emerald-200 text-[11px] p-3 rounded-xl flex items-center gap-2 shadow-2xl animate-in fade-in slide-in-from-bottom-5 z-50">
              <span className="font-bold">{t('picking.success_msg')}</span>
            </div>
          )}
        </AnimatePresence>
        
        {/* Camera Scanner Overlay */}
        <AnimatePresence>
          {scanState === 'scanning' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 w-full h-full bg-slate-950/90 z-[60] flex flex-col items-center justify-center rounded-2xl backdrop-blur-sm shrink-0"
            >
              <div className="w-48 h-48 border-2 border-dashed border-blue-500 rounded-2xl relative flex items-center justify-center bg-slate-900/40 shrink-0">
                {/* Flashlight Button */}
                <button 
                  onClick={() => setIsFlashOn(!isFlashOn)}
                  className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-950/60 backdrop-blur-md flex items-center justify-center border border-slate-700/50 active:scale-95 transition-all z-10 ${isFlashOn ? 'text-amber-400 shadow-[0_0_8px_#f59e0b]' : 'text-slate-400'}`}
                >
                  <Zap className="w-4 h-4" />
                </button>

                {/* Scanner Corners */}
                <div className="absolute top-[-2px] left-[-2px] w-6 h-6 border-t-4 border-l-4 border-blue-400 rounded-tl-2xl"></div>
                <div className="absolute top-[-2px] right-[-2px] w-6 h-6 border-t-4 border-r-4 border-blue-400 rounded-tr-2xl"></div>
                <div className="absolute bottom-[-2px] left-[-2px] w-6 h-6 border-b-4 border-l-4 border-blue-400 rounded-bl-2xl"></div>
                <div className="absolute bottom-[-2px] right-[-2px] w-6 h-6 border-b-4 border-r-4 border-blue-400 rounded-br-2xl"></div>
                
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
      </main>

      <footer className="shrink-0 w-full mt-auto flex flex-col z-10 pb-4 gap-1.5 focus:outline-none">
        <div className="flex justify-start">
          <button 
            onClick={onReportDamage}
            className="border border-rose-900/60 bg-rose-950/20 text-rose-400 text-[10px] py-1 px-2.5 rounded-lg flex items-center gap-1 mt-1 active:scale-95 transition-all"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            {t('picking.actions.report_issue')}
          </button>
        </div>
        {!isComplete ? (
          <>
            <div className="w-full bg-slate-900/40 backdrop-blur-md rounded-t-xl border-t border-x border-slate-800/80 mb-[-8px] pt-1.5 pb-2 px-2 flex justify-center z-10 relative">
              <span className="text-[10px] text-slate-300 font-medium italic text-center">
                {pickingStep === 'SCAN_BIN' ? t('picking.instructions.step_1') : t('picking.instructions.step_2')}
              </span>
            </div>
            {(() => {
              let btnClass = 'bg-blue-600 border-blue-500/30';
              let btnText = pickingStep === 'SCAN_BIN' ? t('picking.actions.scan_bin', 'QUÉT MÃ VỊ TRÍ Ô KỆ') : t('picking.actions.scan_product', 'QUÉT MÃ SẢN PHẨM');

              if (scanState === 'scanning') {
                btnClass = 'bg-amber-600 animate-pulse border-amber-500/30';
                btnText = t('picking.scanning_status', 'ĐANG QUÉT...');
              } else if (scanState === 'success') {
                btnClass = 'bg-emerald-600 border-emerald-500/30';
                btnText = t('picking.scan_successful', 'QUÉT THÀNH CÔNG');
              }

              return (
                <button
                  onClick={handleSmartScan}
                  disabled={scanState !== 'idle'}
                  className={`w-full py-2.5 active:scale-[0.98] transition-all rounded-xl flex flex-col items-center justify-center gap-1.5 outline-none shadow-lg border disabled:opacity-90 z-20 relative ${btnClass}`}
                >
                  {scanState === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={2.5} />
                  ) : (
                    <ScanBarcode className="w-5 h-5 text-white" strokeWidth={2.5} />
                  )}
                  <span className="text-xs font-black text-white uppercase tracking-wider shadow-sm">
                    {btnText}
                  </span>
                </button>
              );
            })()}
          </>
        ) : (
          <motion.button 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={onCompleteWave}
            className="w-full py-2.5 bg-emerald-600 active:scale-[0.98] transition-transform rounded-xl flex flex-col items-center justify-center gap-1.5 outline-none shadow-lg border border-emerald-500/30"
          >
            <PackageCheck className="w-5 h-5 text-white" strokeWidth={2.5} />
            <span className="text-xs font-black text-white uppercase tracking-wider shadow-sm">
              {t('picking.complete_order')}
            </span>
          </motion.button>
        )}
      </footer>
    </>
  );
}
