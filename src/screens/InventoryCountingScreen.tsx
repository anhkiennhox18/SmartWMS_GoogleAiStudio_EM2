import React, { useState, useEffect } from 'react';
import { CheckCircle2, ScanBarcode, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from '../hooks/useTranslation';

interface InventoryCountingScreenProps {
  onComplete: () => void;
}

export function InventoryCountingScreen({ onComplete }: InventoryCountingScreenProps) {
  const { t } = useTranslation();
  const [items, setItems] = useState({
    item1: { scanned: true, value: '' }, // Logitech default scanned based on prompts
    item2: { scanned: false, value: '' }
  });
  const [activeScanningProduct, setActiveScanningProduct] = useState<'item1' | 'item2' | null>(null);

  const [isBinVerified, setIsBinVerified] = useState(false);
  const [isScanningBin, setIsScanningBin] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (activeScanningProduct) {
      timer = setTimeout(() => {
        setItems(prev => ({
          ...prev,
          [activeScanningProduct]: { ...prev[activeScanningProduct], scanned: true }
        }));
        setActiveScanningProduct(null);
      }, 1500);
    }
    return () => clearTimeout(timer);
  }, [activeScanningProduct]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isScanningBin) {
      timer = setTimeout(() => {
        setIsBinVerified(true);
        setIsScanningBin(false);
      }, 1500);
    }
    return () => clearTimeout(timer);
  }, [isScanningBin]);

  const handleValueChange = (itemId: 'item1' | 'item2', value: string) => {
    setItems(prev => ({
      ...prev,
      [itemId]: { ...prev[itemId], value }
    }));
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden w-full relative">
      {/* Header */}
      <header className="flex flex-col mt-2 shrink-0">
        <h1 className="text-base font-black text-white">{t('counting.title', 'Thực thi Kiểm kho')}</h1>
        <div className="flex gap-2 items-center mt-0.5">
          <span className="text-amber-400 font-mono text-[11px] font-bold">COUNT-01</span>
          <span className="text-slate-500 text-[10px]">•</span>
          <span className="text-amber-400 font-mono text-[11px] font-bold">{t('counting.location_info', 'Dãy kệ 3 - Khu Khô')}</span>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="flex flex-col px-4 pt-2 pb-24 space-y-4 flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {/* Thanh xác nhận vị trí */}
        {!isBinVerified ? (
          <div 
            onClick={() => setIsScanningBin(true)}
            className="w-full bg-amber-500/10 border border-amber-500/30 text-amber-400 p-3 rounded-xl flex items-center gap-2 mb-4 cursor-pointer active:scale-[0.98] transition-all duration-150"
          >
            <ScanBarcode className="w-4 h-4 shrink-0" />
            <span className="font-semibold text-[11px]">{t('counting.status.awaiting_bin', 'Chờ quét mã vạch để xác nhận vị trí ô kệ')}</span>
          </div>
        ) : (
          <div className="w-full bg-emerald-500/95 text-white p-3 rounded-xl flex items-center gap-2 mb-4 shadow-lg">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span className="font-semibold text-[11px]">{t('counting.status.bin_verified', 'Vị trí ô kệ đã được quét xác nhận')}</span>
          </div>
        )}

        {/* Item List */}
        <div className="flex flex-col gap-2">
        
        {/* Item 1 */}
        <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl flex flex-col gap-2 shrink-0">
          <div className="flex justify-between items-center">
            <div className="text-xs font-semibold text-white truncate max-w-[150px]">Mice Logitech MX Master 3</div>
            {!items.item1.scanned ? (
              <button 
                onClick={() => setActiveScanningProduct('item1')}
                disabled={!isBinVerified}
                className={`flex items-center gap-1.5 px-2 py-1 rounded border active:scale-95 transition-all ${!isBinVerified ? 'opacity-40 pointer-events-none cursor-not-allowed bg-slate-800 text-slate-400 border-slate-700' : 'bg-blue-600/20 text-blue-400 border-blue-500/30'}`}
              >
                <ScanBarcode className="w-3.5 h-3.5" />
                <span className="text-[9px] font-bold uppercase tracking-wider">{!isBinVerified ? t('counting.status.locked', 'KHÓA - VUI LÒNG QUÉT Ô KỆ') : t('counting.status.awaiting_scan', 'CHỜ QUÉT SẢN PHẨM')}</span>
              </button>
            ) : (
              <div className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span className="text-[9px] font-bold uppercase tracking-wider">{t('counting.status.scanned', 'ĐÃ QUÉT')}</span>
              </div>
            )}
          </div>
          <div className="flex justify-end items-center mt-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-400 font-medium">{t('counting.actual_label', 'Thực tế:')}</span>
              <input 
                inputMode="numeric"
                type="number"
                disabled={!items.item1.scanned}
                value={items.item1.value}
                onChange={(e) => handleValueChange('item1', e.target.value)}
                placeholder="0"
                className="w-16 h-8 bg-slate-950 border border-slate-700 rounded-lg text-center text-white font-mono font-bold text-xs focus:outline-none focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
            </div>
          </div>
        </div>

        {/* Item 2 */}
        <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl flex flex-col gap-2 shrink-0">
          <div className="flex justify-between items-center">
            <div className="text-xs font-semibold text-white truncate max-w-[150px]">Keyboard Keychron K2</div>
            {!items.item2.scanned ? (
              <button 
                onClick={() => setActiveScanningProduct('item2')}
                disabled={!isBinVerified}
                className={`flex items-center gap-1.5 px-2 py-1 rounded border active:scale-95 transition-all ${!isBinVerified ? 'opacity-40 pointer-events-none cursor-not-allowed bg-slate-800 text-slate-400 border-slate-700' : 'bg-blue-600/20 text-blue-400 border-blue-500/30'}`}
              >
                <ScanBarcode className="w-3.5 h-3.5" />
                <span className="text-[9px] font-bold uppercase tracking-wider">{!isBinVerified ? t('counting.status.locked', 'KHÓA - VUI LÒNG QUÉT Ô KỆ') : t('counting.status.awaiting_scan', 'CHỜ QUÉT SẢN PHẨM')}</span>
              </button>
            ) : (
              <div className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span className="text-[9px] font-bold uppercase tracking-wider">{t('counting.status.scanned', 'ĐÃ QUÉT')}</span>
              </div>
            )}
          </div>
          <div className="flex justify-end items-center mt-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-400 font-medium">{t('counting.actual_label', 'Thực tế:')}</span>
              <input 
                inputMode="numeric"
                type="number"
                disabled={!items.item2.scanned}
                value={items.item2.value}
                onChange={(e) => handleValueChange('item2', e.target.value)}
                placeholder="0"
                className="w-16 h-8 bg-slate-950 border border-slate-700 rounded-lg text-center text-white font-mono font-bold text-xs focus:outline-none focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
      
      {/* Nút tác vụ */}
      <div className="shrink-0 pt-2 pb-1 bg-slate-950/80 backdrop-blur-md z-10">
        <button 
          onClick={onComplete}
          className="w-full bg-amber-600 active:scale-[0.98] transition-transform py-2.5 rounded-xl text-xs font-black text-white uppercase tracking-wider shadow-lg border border-amber-500/30"
        >
          {t('counting.actions.confirm_sync', 'XÁC NHẬN & ĐỒNG BỘ SỐ LIỆU')}
        </button>
      </div>

      <AnimatePresence>
        {activeScanningProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex flex-col pt-16 items-center bg-slate-950/95 backdrop-blur-sm px-4"
          >
            <button 
              onClick={() => setActiveScanningProduct(null)}
              className="absolute top-4 right-4 p-2 bg-slate-800 rounded-full text-slate-300 active:scale-95 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-white text-sm font-bold mb-8 uppercase tracking-wider">{t('scanner.product_title', 'QUÉT MÃ SẢN PHẨM...')}</h2>
            
            <div className="w-56 h-56 border-2 border-dashed border-blue-500 rounded-2xl relative flex items-center justify-center bg-slate-900/40 shrink-0 shadow-[0_0_30px_rgba(59,130,246,0.15)] overflow-hidden">
               {/* Scanner Corners */}
              <div className="absolute top-[-2px] left-[-2px] w-6 h-6 border-t-4 border-l-4 border-blue-400 rounded-tl-2xl z-10"></div>
              <div className="absolute top-[-2px] right-[-2px] w-6 h-6 border-t-4 border-r-4 border-blue-400 rounded-tr-2xl z-10"></div>
              <div className="absolute bottom-[-2px] left-[-2px] w-6 h-6 border-b-4 border-l-4 border-blue-400 rounded-bl-2xl z-10"></div>
              <div className="absolute bottom-[-2px] right-[-2px] w-6 h-6 border-b-4 border-r-4 border-blue-400 rounded-br-2xl z-10"></div>
              <motion.div
                className="w-full h-0.5 bg-red-500 shadow-[0_0_8px_#ef4444] z-10"
                animate={{ y: [-100, 100, -100] }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              />
            </div>
            <p className="text-slate-400 text-xs mt-8 font-medium">{t('scanner.product_hint', 'Đưa mã vạch sản phẩm vào khung hình để quét...')}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isScanningBin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex flex-col pt-16 items-center bg-slate-950/95 backdrop-blur-sm px-4"
          >
            <button 
              onClick={() => setIsScanningBin(false)}
              className="absolute top-4 right-4 p-2 bg-slate-800 rounded-full text-slate-300 active:scale-95 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-white text-sm font-bold mb-8 uppercase tracking-wider">{t('counting.scan_bin_title', 'QUÉT MÃ VẠCH Ô KỆ MỤC TIÊU...')}</h2>
            
            <div className="w-56 h-56 border-2 border-dashed border-amber-500 rounded-2xl relative flex items-center justify-center bg-slate-900/40 shrink-0 shadow-[0_0_30px_rgba(245,158,11,0.15)] overflow-hidden">
               {/* Scanner Corners */}
              <div className="absolute top-[-2px] left-[-2px] w-6 h-6 border-t-4 border-l-4 border-amber-400 rounded-tl-2xl z-10"></div>
              <div className="absolute top-[-2px] right-[-2px] w-6 h-6 border-t-4 border-r-4 border-amber-400 rounded-tr-2xl z-10"></div>
              <div className="absolute bottom-[-2px] left-[-2px] w-6 h-6 border-b-4 border-l-4 border-amber-400 rounded-bl-2xl z-10"></div>
              <div className="absolute bottom-[-2px] right-[-2px] w-6 h-6 border-b-4 border-r-4 border-amber-400 rounded-br-2xl z-10"></div>
              <motion.div
                className="w-full h-0.5 bg-red-500 shadow-[0_0_8px_#ef4444] z-10"
                animate={{ y: [-100, 100, -100] }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              />
            </div>
            <p className="text-slate-400 text-xs mt-8 font-medium">Scanner View</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
