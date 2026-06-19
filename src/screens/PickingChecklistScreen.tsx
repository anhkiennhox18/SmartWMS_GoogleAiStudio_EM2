import React, { useState, useEffect } from 'react';
import { Signal, Wifi, CheckCircle2, Scan, Clock } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface PickingChecklistScreenProps {
  onGoToScan: () => void;
  onBack: () => void;
}

export function PickingChecklistScreen({ onGoToScan, onBack }: PickingChecklistScreenProps) {
  const { t } = useTranslation();

  return (
    <div className="w-full h-full flex flex-col pt-2 pb-3 px-3 overflow-hidden justify-between relative bg-slate-950">
      
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Wave Summary Header */}
        <div className="flex flex-col mt-0 shrink-0 mb-3 px-1">
          <div className="flex justify-between items-end mt-1">
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">{t('mobile.checklist.progress')} <span className="text-white font-black">1/3</span> {t('mobile.checklist.items')}</p>
            <span className="text-[11px] text-white font-black">33%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden relative">
            <div className="absolute top-0 left-0 h-full bg-blue-500 shadow-[0_0_8px_#60a5fa] transition-all duration-500" style={{ width: '33%' }} />
          </div>
        </div>

        {/* Items Checklist Area */}
        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex flex-col gap-2 pb-20 px-1">
          
          {/* Done Item */}
          <div className="p-2.5 bg-slate-900/50 border border-slate-800/60 rounded-xl flex justify-between items-center opacity-80 shrink-0 gap-2">
            <div className="flex flex-col gap-1 flex-1 min-w-0">
              <h3 className="text-xs text-white font-semibold truncate max-w-[140px]">iPhone 15 Pro Max 256GB</h3>
              <p className="text-[10px] text-amber-400 font-mono">C1-A01-N02</p>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <span className="text-xs font-black text-white">10<span className="text-slate-500 text-[10px]">/10</span></span>
              <div className="flex items-center gap-1 bg-emerald-500/20 px-1.5 py-0.5 rounded text-emerald-400 border border-emerald-500/30">
                <CheckCircle2 className="w-2.5 h-2.5 shrink-0" />
                <span className="text-[7px] font-bold uppercase whitespace-nowrap">{t('mobile.checklist.done')}</span>
              </div>
            </div>
          </div>

          {/* In Progress Item */}
          <div 
            className="p-2.5 bg-slate-900/80 border border-blue-500/30 rounded-xl flex justify-between items-center cursor-pointer active:scale-[0.98] transition-transform shrink-0 gap-2"
            onClick={onGoToScan}
          >
            <div className="flex flex-col gap-1 flex-1 min-w-0">
              <h3 className="text-xs text-white font-semibold truncate max-w-[140px]">Samsung Galaxy S24 Ultra</h3>
              <p className="text-[10px] text-amber-400 font-mono">B2-M04-K01</p>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <span className="text-xs font-black text-white">3<span className="text-slate-500 text-[10px]">/5</span></span>
              <div className="flex items-center gap-1 bg-blue-500/20 px-1.5 py-0.5 rounded text-blue-400 border border-blue-500/30">
                <Scan className="w-2.5 h-2.5 animate-pulse shrink-0" />
                <span className="text-[7px] font-bold uppercase whitespace-nowrap">{t('mobile.checklist.scan')}</span>
              </div>
            </div>
          </div>

          {/* Pending Item */}
          <div className="p-2.5 bg-slate-900/50 border border-slate-800/60 rounded-xl flex justify-between items-center shrink-0 gap-2">
            <div className="flex flex-col gap-1 flex-1 min-w-0">
              <h3 className="text-xs text-white font-semibold truncate max-w-[140px]">iPad Pro M4 11"</h3>
              <p className="text-[10px] text-amber-400 font-mono">A1-D02-J05</p>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <span className="text-xs font-black text-white">0<span className="text-slate-500 text-[10px]">/2</span></span>
              <div className="flex items-center gap-1 bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 border border-slate-700">
                <Clock className="w-2.5 h-2.5 shrink-0" />
                <span className="text-[7px] font-bold uppercase whitespace-nowrap">{t('mobile.checklist.pending')}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Sticky Action Footer */}
      <div className="shrink-0 flex flex-col pt-2 pb-14">
        <button 
          onClick={onGoToScan}
          className="w-full py-2.5 bg-blue-600 rounded-xl text-xs font-black text-white tracking-wider uppercase active:scale-[0.98] transition-transform shadow-lg border border-blue-500/50"
        >
          {t('picking.scan_bin', 'BẮT ĐẦU')}
        </button>
      </div>

    </div>
  );
}
