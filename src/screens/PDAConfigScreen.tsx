import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scan, Mic, Thermometer, Database, RefreshCw, HardDrive, Wifi } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface PDAConfigScreenProps {
  onBack?: () => void;
}

export function PDAConfigScreen({ onBack }: PDAConfigScreenProps) {
  const { t } = useTranslation();
  const [isSyncing, setIsSyncing] = useState(false);
  const [queueItems, setQueueItems] = useState([
    { id: '1', order: 'PICK-204', sku: 'IPHONE15', qty: 2 },
    { id: '2', order: 'COUNT-01', sku: 'KEYCHRON-K2', qty: 1 }
  ]);
  const [showToast, setShowToast] = useState(false);

  const handleSync = () => {
    if (queueItems.length === 0) return;
    
    setIsSyncing(true);
    
    setTimeout(() => {
      setIsSyncing(false);
      setQueueItems([]);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1500);
  };

  return (
    <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex flex-col relative z-0 pb-24 mt-1">
      {/* Hardware Diagnostics Panel */}
      <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-2xl mb-3 mt-4 shrink-0">
        <h3 className="text-[10px] text-slate-500 font-black tracking-wider mb-2.5">
          {t('profile.hardware.title', 'TRẠNG THÁI THIẾT BỊ DI ĐỘNG')}
        </h3>
        
        <div className="flex flex-col gap-2.5">
          {/* Label 1 */}
          <div className="flex justify-between items-center bg-slate-950/40 p-2 rounded-xl border border-slate-800/50">
            <div className="flex items-center gap-1.5">
              <Scan className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-xs text-slate-300 font-medium tracking-tight">Camera máy quét (Camera Scanner)</span>
            </div>
            <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
              [ Trực tuyến - Sẵn sàng ]
            </span>
          </div>
          
          {/* Label 2 */}
          <div className="flex justify-between items-center bg-slate-950/40 p-2 rounded-xl border border-slate-800/50">
            <div className="flex items-center gap-1.5">
              <Mic className="w-3.5 h-3.5 text-blue-500" />
              <span className="text-xs text-slate-300 font-medium tracking-tight truncate max-w-[120px]">Microphone (Voice Assistant)</span>
            </div>
            <span className="text-[9px] font-bold text-blue-400 animate-pulse bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20 whitespace-nowrap">
              [ Đang lắng nghe... ]
            </span>
          </div>

          {/* Label 3 */}
          <div className="flex justify-between items-center bg-slate-950/40 p-2 rounded-xl border border-slate-800/50">
            <div className="flex items-center gap-1.5">
              <Wifi className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-xs text-slate-300 font-medium tracking-tight">Kết nối mạng (Wi-Fi/4G)</span>
            </div>
            <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
              [ Tốt - Đã kết nối ]
            </span>
          </div>
        </div>
      </div>

      {/* Offline Data Queue Manager */}
      <div className="flex-1 flex flex-col pt-1">
        <div className="flex items-center gap-1.5 mb-2 px-1">
           <Database className="w-3.5 h-3.5 text-slate-500" />
           <h3 className="text-[10px] text-slate-500 font-black tracking-wider pt-0.5">HÀNG ĐỢI NGOẠI TUYẾN (LOCAL SQLITE)</h3>
        </div>
        
        <div className="flex flex-col flex-1 gap-1.5">
          {queueItems.length > 0 ? (
             queueItems.map((item, index) => (
                <div key={item.id} className="p-2 bg-slate-950/60 border border-slate-800/40 rounded-xl mb-1.5 flex justify-between items-center text-[10px] text-slate-300 font-mono">
                  <div className="flex flex-col gap-0.5 truncate justify-center">
                    <span className="truncate">Mã đơn: <span className="text-white">{item.order}</span> | SKU: <span className="text-blue-400">{item.sku}</span> | SL: <span className="text-emerald-400">{item.qty}</span></span>
                  </div>
                  <span className="text-[8px] font-bold uppercase tracking-wider text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20 shrink-0 whitespace-nowrap ml-1">
                    [ Chờ đồng bộ ]
                  </span>
                </div>
             ))
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-900/30 border border-dashed border-slate-800 rounded-2xl mb-1.5">
               <HardDrive className="w-8 h-8 text-slate-700 mb-2" />
               <span className="text-xs text-slate-500 font-medium text-center relative max-w-[200px]">
                 Hàng đợi trống. Mọi dữ liệu đã được đồng bộ lên Cloud.
               </span>
            </div>
          )}
        </div>
      </div>

      {/* Force Sync Action Footer */}
      <div className="shrink-0 w-full mt-auto pt-2 pb-2">
        <button 
          onClick={handleSync}
          disabled={isSyncing || queueItems.length === 0}
          className={`w-full py-2.5 rounded-xl text-xs font-black text-white uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all outline-none ${queueItems.length > 0 ? 'bg-gradient-to-r from-emerald-600 to-teal-500 shadow-[0_0_15px_rgba(16,185,129,0.3)] active:scale-95' : 'bg-slate-800 border border-slate-700 text-slate-500 cursor-not-allowed'}`}
        >
          <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
          ĐỒNG BỘ LÊN CLOUD
        </button>
      </div>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="absolute bottom-16 left-4 right-4 bg-emerald-500/90 backdrop-blur-md rounded-xl p-3 shadow-[0_8px_30px_rgba(16,185,129,0.3)] border border-emerald-400/50 z-50 flex items-center justify-center"
          >
            <span className="text-white text-xs font-bold text-center">
              Đồng bộ thành công lên SQL Server!
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
