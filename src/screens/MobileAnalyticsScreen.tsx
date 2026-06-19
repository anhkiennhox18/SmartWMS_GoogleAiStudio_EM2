import React, { useState } from 'react';
import { Activity, AlertTriangle, Users, Zap, X, Smartphone } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { motion, AnimatePresence } from 'motion/react';

export function MobileAnalyticsScreen() {
  const { t } = useTranslation();
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [activeKpiModal, setActiveKpiModal] = useState<'progress' | 'staff' | 'sla' | null>(null);

  return (
    <>
      <div className="flex-1 flex flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-1 pb-28 pt-2 relative">
        {/* Header */}
        <header className="flex justify-end items-center shrink-0 mb-1 pl-1 pr-1 pb-1 mt-1">
          <span className="bg-slate-800 text-slate-300 py-1 px-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-slate-700/50">
            {t('analytics.today', 'HÔM NAY')}
          </span>
        </header>

        {/* 2-Column Mini Grid KPI */}
        <div className="grid grid-cols-2 gap-2 shrink-0">
          {/* Card 1 */}
          <div 
            onClick={() => setActiveKpiModal('progress')}
            className="p-2 bg-slate-900/60 border border-slate-800/80 rounded-xl flex flex-col gap-1 justify-between cursor-pointer active:scale-95 transition-all hover:bg-slate-900/80"
          >
            <div className="flex justify-between items-start">
              <span className="text-[9px] font-bold text-slate-500 uppercase">{t('analytics.kpi.shift_progress', 'SHIFT PROGRESS')}</span>
              <Activity className="w-3.5 h-3.5 text-blue-500" strokeWidth={2.5} />
            </div>
            <div>
              <div className="text-xl font-black text-blue-400 tracking-tight">12/15<span className="text-[12px] ml-1 text-blue-500/80">Wave</span></div>
              <div className="text-[8px] text-slate-500 truncate mt-0.5">{t('analytics.kpi.shift_progress_desc', 'Completed waves')}</div>
            </div>
          </div>
          
          {/* Card 2 */}
          <div 
            onClick={() => setActiveKpiModal('sla')}
            className="p-2 bg-slate-900/60 border border-slate-800/80 rounded-xl flex flex-col gap-1 justify-between cursor-pointer active:scale-95 transition-all hover:bg-slate-900/80"
          >
            <div className="flex justify-between items-start">
              <span className="text-[9px] font-bold text-slate-500 uppercase">{t('analytics.kpi.sla_alert', 'SLA ALERTS')}</span>
              <AlertTriangle className="w-3.5 h-3.5 text-rose-500" strokeWidth={2.5} />
            </div>
            <div>
              <div className="text-xl font-black text-rose-400 tracking-tight">3<span className="text-[12px] ml-1 text-rose-500/80">{t('analytics.kpi.orders', 'Orders')}</span></div>
              <div className="text-[8px] text-slate-500 truncate mt-0.5">{t('analytics.kpi.sla_alert_desc', 'Orders approaching deadline')}</div>
            </div>
          </div>

          {/* Card 3 */}
          <div 
            onClick={() => setActiveKpiModal('staff')}
            className="p-2 bg-slate-900/60 border border-slate-800/80 rounded-xl flex flex-col gap-1 justify-between cursor-pointer active:scale-95 transition-all hover:bg-slate-900/80"
          >
            <div className="flex justify-between items-start">
              <span className="text-[9px] font-bold text-slate-500 uppercase">{t('analytics.kpi.active_staff', 'ACTIVE STAFF')}</span>
              <Users className="w-3.5 h-3.5 text-emerald-500" strokeWidth={2.5} />
            </div>
            <div>
              <div className="text-xl font-black text-emerald-400 tracking-tight">8/10<span className="text-[12px] ml-1 text-emerald-500/80">Staff</span></div>
              <div className="text-[8px] text-slate-500 truncate mt-0.5">{t('analytics.kpi.active_staff_desc', 'Staff currently online')}</div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="p-2 bg-slate-900/60 border border-slate-800/80 rounded-xl flex flex-col gap-1 justify-between cursor-pointer active:scale-95 transition-all hover:bg-slate-900/80">
            <div className="flex justify-between items-start">
              <span className="text-[9px] font-bold text-slate-500 uppercase">{t('analytics.kpi.picking_speed', 'PICKING SPEED')}</span>
              <Zap className="w-3.5 h-3.5 text-amber-500" strokeWidth={2.5} />
            </div>
            <div>
              <div className="text-xl font-black text-amber-400 tracking-tight">45<span className="text-[12px] ml-1 text-amber-500/80">SKU/h</span></div>
              <div className="text-[8px] text-slate-500 truncate mt-0.5">{t('analytics.kpi.picking_speed_desc', 'Avg shift productivity')}</div>
            </div>
          </div>
        </div>

        {/* Mini Bar Chart Mockup */}
        <div className="w-full bg-slate-900/40 border border-slate-800/60 p-2 rounded-xl mt-2 flex flex-col shrink-0">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{t('analytics.chart.title', 'HOURLY OUTPUT (TODAY)')}</span>
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <div className="w-2 h-2 rounded-full bg-amber-400"></div>
            </div>
          </div>
          
          <div className="h-16 flex items-end justify-between gap-1 border-b border-slate-800/50 pb-1 px-1">
            {/* 08:00 */}
            <div className="flex-1 flex flex-col items-center justify-end h-full">
              <span className="text-[8px] font-bold font-mono text-slate-400 text-center mb-0.5">70</span>
              <div className="flex justify-center gap-[2px] w-full items-end flex-1">
                <div className="w-2 bg-blue-500 rounded-t-full" style={{ height: '40%' }}></div>
                <div className="w-2 bg-amber-400 rounded-t-full" style={{ height: '30%' }}></div>
              </div>
            </div>
            {/* 10:00 */}
            <div className="flex-1 flex flex-col items-center justify-end h-full">
              <span className="text-[8px] font-bold font-mono text-slate-400 text-center mb-0.5">130</span>
              <div className="flex justify-center gap-[2px] w-full items-end flex-1">
                <div className="w-2 bg-blue-500 rounded-t-full" style={{ height: '60%' }}></div>
                <div className="w-2 bg-amber-400 rounded-t-full" style={{ height: '70%' }}></div>
              </div>
            </div>
            {/* 12:00 */}
            <div className="flex-1 flex flex-col items-center justify-end h-full">
              <span className="text-[8px] font-bold font-mono text-slate-400 text-center mb-0.5">90</span>
              <div className="flex justify-center gap-[2px] w-full items-end flex-1">
                <div className="w-2 bg-blue-500 rounded-t-full" style={{ height: '50%' }}></div>
                <div className="w-2 bg-amber-400 rounded-t-full" style={{ height: '40%' }}></div>
              </div>
            </div>
            {/* 14:00 */}
            <div className="flex-1 flex flex-col items-center justify-end h-full">
              <span className="text-[8px] font-bold font-mono text-amber-400 text-center mb-0.5">165</span>
              <div className="flex justify-center gap-[2px] w-full items-end flex-1">
                <div className="w-2 bg-blue-500 rounded-t-full" style={{ height: '90%' }}></div>
                <div className="w-2 bg-amber-400 rounded-t-full" style={{ height: '75%' }}></div>
              </div>
            </div>
            {/* 16:00 */}
            <div className="flex-1 flex flex-col items-center justify-end h-full">
              <span className="text-[8px] font-bold font-mono text-slate-400 text-center mb-0.5">155</span>
              <div className="flex justify-center gap-[2px] w-full items-end flex-1">
                <div className="w-2 bg-blue-500 rounded-t-full" style={{ height: '70%' }}></div>
                <div className="w-2 bg-amber-400 rounded-t-full" style={{ height: '85%' }}></div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center text-slate-400 text-[9px] font-mono pt-1 px-1 mt-0.5 mb-1">
            <span className="flex-1 text-center">08:00</span>
            <span className="flex-1 text-center">10:00</span>
            <span className="flex-1 text-center">12:00</span>
            <span className="flex-1 text-center">14:00</span>
            <span className="flex-1 text-center">16:00</span>
          </div>
          <div className="text-[9px] text-slate-400 text-center px-1 py-1 bg-slate-950/40 rounded border border-slate-800/80">
            {t('analytics.chart.insight', '💡 Peak output: 14:00 reached 165 SKU')}
          </div>
        </div>

        {/* Zone Distribution Stack */}
        <div className="w-full bg-slate-900/40 border border-slate-800/60 p-2 rounded-xl mt-2 flex flex-col gap-2 shrink-0">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">{t('analytics.zones.title', 'ZONE COMPLETION PROGRESS')}</div>
          
          <div 
            onClick={() => setSelectedZone('ZoneA')}
            className="cursor-pointer active:scale-[0.99] transition-all"
          >
            <div className="flex justify-between items-end mb-1">
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-bold text-slate-400">{t('analytics.zones.zone_a', 'Zone A (Cool)')}</span>
                <span className="text-[9px] text-slate-500">(450/1000 SKU)</span>
              </div>
              <span className="text-[10px] font-black text-slate-200">45%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" style={{ width: '45%' }}></div>
            </div>
          </div>
          
          <div 
            onClick={() => setSelectedZone('ZoneB')}
            className="cursor-pointer active:scale-[0.99] transition-all"
          >
            <div className="flex justify-between items-end mb-1">
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-bold text-slate-400">{t('analytics.zones.zone_b', 'Zone B (Dry)')}</span>
                <span className="text-[9px] text-slate-500">(300/1000 SKU)</span>
              </div>
              <span className="text-[10px] font-black text-slate-200">30%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div className="h-full bg-gradient-to-r from-amber-500 to-orange-400 rounded-full" style={{ width: '30%' }}></div>
            </div>
          </div>
        </div>
        
      </div>

      <AnimatePresence>
        {selectedZone && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedZone(null)}
              className="absolute inset-0 bg-slate-950/60 z-40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute bottom-0 left-0 right-0 h-[280px] bg-slate-950/98 border-t border-slate-800 z-50 rounded-t-3xl p-5 flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
            >
              <div className="w-10 h-1 bg-slate-800 rounded-full mx-auto mb-4" />
              
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-sm font-black text-white px-1">
                  {selectedZone === 'ZoneA' ? 'CHI TIẾT VẬN HÀNH: KHU VỰC A (MÁT)' : 'CHI TIẾT VẬN HÀNH: KHU VỰC B (KHÔ)'}
                </h3>
                <button 
                  onClick={() => setSelectedZone(null)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white active:scale-95 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex flex-col gap-3 px-1 mt-1">
                <div className="flex items-start gap-3 bg-slate-900/50 p-3.5 rounded-2xl border border-slate-800/50">
                  <Users className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[11px] font-bold text-slate-300 mb-0.5">Nhân sự</div>
                    <div className="text-[10px] text-slate-500">3 Staff đang hoạt động (Kiên, Tuấn, Nam)</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 bg-slate-900/50 p-3.5 rounded-2xl border border-slate-800/50">
                  <Smartphone className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[11px] font-bold text-slate-300 mb-0.5">Thiết bị</div>
                    <div className="text-[10px] text-slate-500">3 Smartphone đang kết nối bình thường</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* SLA Modal */}
      <AnimatePresence>
        {activeKpiModal === 'sla' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute inset-0 bg-slate-950/95 z-50 p-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-6 mt-2">
                <h3 className="text-sm font-black text-rose-500 px-1 tracking-wider uppercase">🚨 CẢNH BÁO SLA</h3>
                <button 
                  onClick={() => setActiveKpiModal(null)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white active:scale-95 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-col gap-2 mt-3">
                <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800/80 p-3 rounded-xl relative overflow-hidden flex justify-between items-center">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-rose-500" />
                  <span className="font-sans font-black text-white pl-2">PICK-102</span>
                  <span className="text-[11px] text-rose-400 font-bold">Trễ 15 phút</span>
                </div>
                <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800/80 p-3 rounded-xl relative overflow-hidden flex justify-between items-center">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-rose-500" />
                  <span className="font-sans font-black text-white pl-2">PUT-009</span>
                  <span className="text-[11px] text-rose-400 font-bold">Trễ 30 phút</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Modal */}
      <AnimatePresence>
        {activeKpiModal === 'progress' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute inset-0 bg-slate-950/95 z-50 p-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-6 mt-2">
                <h3 className="text-sm font-black text-white px-1 tracking-wider">CHI TIẾT TIẾN ĐỘ CA</h3>
                <button 
                  onClick={() => setActiveKpiModal(null)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white active:scale-95 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-col gap-3">
                <div className="bg-slate-900/60 p-3 rounded-xl border border-emerald-500/30 flex flex-col gap-1">
                  <div className="text-emerald-400 font-mono text-[11px] font-bold">WAVE-001 - 100% (Đã hoàn thành)</div>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-xl border border-amber-500/30 flex flex-col gap-1">
                  <div className="text-amber-400 font-mono text-[11px] font-bold">WAVE-002 - 60% (Đang lấy hàng)</div>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-500/30 flex flex-col gap-1">
                  <div className="text-slate-400 font-mono text-[11px] font-bold">WAVE-003 - 0% (Chờ thực thi)</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Staff Modal */}
      <AnimatePresence>
        {activeKpiModal === 'staff' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute inset-0 bg-slate-950/95 z-50 p-4 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center mb-6 mt-2 shrink-0">
              <h3 className="text-sm font-black text-white px-1 tracking-wider">NHÂN SỰ ĐANG ONLINE (8/10)</h3>
              <button 
                onClick={() => setActiveKpiModal(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white active:scale-95 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col gap-3 flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/60 flex flex-col gap-1">
                <div className="text-slate-200 text-[11px] font-bold">Trần Anh Kiện - Manager <span className="text-slate-400 font-normal">(Đang điều phối)</span></div>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/60 flex flex-col gap-1">
                <div className="text-slate-200 text-[11px] font-bold">Nguyễn Văn Nam - Staff <span className="text-slate-400 font-normal">(Đang nhặt hàng WAVE-002)</span></div>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/60 flex flex-col gap-1">
                <div className="text-slate-200 text-[11px] font-bold">Lê Hoàng Tú - Staff <span className="text-slate-400 font-normal">(Đang cất hàng PUT-015)</span></div>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/60 flex flex-col gap-1">
                <div className="text-slate-200 text-[11px] font-bold">Phạm Minh Đạt - Staff <span className="text-slate-400 font-normal">(Đang kiểm kê Dãy 3)</span></div>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/60 flex flex-col gap-1">
                <div className="text-slate-200 text-[11px] font-bold">Hoàng Tuấn Anh - Staff <span className="text-slate-400 font-normal">(Chờ việc)</span></div>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/60 flex flex-col gap-1">
                <div className="text-slate-200 text-[11px] font-bold">Vũ Lê Bảo - Staff <span className="text-slate-400 font-normal">(Phân tích AI)</span></div>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/60 flex flex-col gap-1">
                <div className="text-slate-200 text-[11px] font-bold">Bùi Quốc Huy - Staff <span className="text-slate-400 font-normal">(Đang cất hàng PUT-016)</span></div>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/60 flex flex-col gap-1">
                <div className="text-slate-200 text-[11px] font-bold">Đặng Văn Khoa - Staff <span className="text-slate-400 font-normal">(Nghỉ giải lao)</span></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
