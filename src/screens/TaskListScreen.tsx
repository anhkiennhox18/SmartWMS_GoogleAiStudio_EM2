import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from '../hooks/useTranslation';
import { Filter, Box, Truck, Search, MapPin, Clock, ScanBarcode, X } from 'lucide-react';

interface TaskListScreenProps {
  onStartPicking?: () => void;
  onStartPutaway?: () => void;
  onStartCounting?: () => void;
  onStartDamage?: () => void;
  isDamageCompleted?: boolean;
}

interface Task {
  id: string;
  type: 'pick' | 'put' | 'count' | 'ai_detect';
  location: string;
  locationDefault: string;
  priority: 'Khẩn cấp' | 'Thường';
  status: 'Pending' | 'InProgress' | 'Completed';
  timeValue: number;
  timeUnit: 'minutes' | 'hours';
  titleKey: string;
  idNumber: string;
}

export function TaskListScreen({ onStartPicking, onStartPutaway, onStartCounting, onStartDamage, isDamageCompleted }: TaskListScreenProps) {
  const { t } = useTranslation();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priority, setPriority] = useState<'All' | 'Khẩn cấp' | 'Thường'>('All');
  const [taskType, setTaskType] = useState<'All' | 'Lấy hàng' | 'Cất hàng' | 'Kiểm kê'>('All');

  const [allTasks, setAllTasks] = useState<Task[]>([
    { id: '1', type: 'pick', location: 'tasks.pick_location', locationDefault: 'Khu A (Mát) - 12 mặt hàng', priority: 'Thường', status: 'Pending', timeValue: 2, timeUnit: 'minutes', titleKey: 'tasks.types.pick', idNumber: '204' },
    { id: '2', type: 'put', location: 'tasks.put_location', locationDefault: 'Cửa nhập hàng C (Dock C) - 5 Pallet', priority: 'Thường', status: 'Pending', timeValue: 15, timeUnit: 'minutes', titleKey: 'tasks.types.put', idNumber: '015' },
    { id: '3', type: 'count', location: 'tasks.count_location', locationDefault: 'Dãy kệ 3 - Khu Khô', priority: 'Thường', status: 'Pending', timeValue: 1, timeUnit: 'hours', titleKey: 'tasks.types.count', idNumber: '01' },
    { id: '4', type: 'ai_detect', location: 'tasks.ai_detect_description', locationDefault: 'Inspect incident Pallet PAL-9042 - Quarantine Zone C', priority: 'Khẩn cấp', status: 'Pending', timeValue: 0, timeUnit: 'minutes', titleKey: 'tasks.types.ai_detect', idNumber: '' }
  ]);

  useEffect(() => {
    if (isDamageCompleted) {
      setAllTasks(prev => prev.map(t => t.type === 'ai_detect' ? { ...t, status: 'Completed' } : t));
    }
  }, [isDamageCompleted]);

  const filteredTasks = useMemo(() => {
    return allTasks.filter(task => {
      if (task.status === 'Completed') return false;
      if (priority !== 'All' && task.priority !== priority) return false;
      
      if (taskType !== 'All') {
        if (taskType === 'Lấy hàng' && task.type !== 'pick') return false;
        if (taskType === 'Cất hàng' && task.type !== 'put') return false;
        if (taskType === 'Kiểm kê' && task.type !== 'count') return false;
      }
      return true;
    });
  }, [allTasks, priority, taskType]);

  return (
    <>
      <div className="flex-1 flex flex-col overflow-hidden w-full relative">
        {/* Header area directly below the global header */}
        <div className="flex justify-between items-end shrink-0 mb-2 pl-4 pr-1 mt-1">
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest pb-1.5">
            {t('tasks.pending_count', { count: filteredTasks.length }, `${filteredTasks.length} PENDING TASKS`)}
          </div>
          <button 
            onClick={() => setIsFilterOpen(true)} 
            className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 active:scale-95 transition-transform"
          >
            <Filter className="w-4 h-4 text-slate-400" strokeWidth={2} />
          </button>
        </div>

        {/* Task Area */}
        <main className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex flex-col gap-2 pb-24 px-1">
          <AnimatePresence mode="popLayout">
            {filteredTasks.map((task) => {
              const typeConfig = {
                pick: { color: 'blue', Icon: Box, onStart: onStartPicking, btnText: 'tasks.actions.start', btnDefault: 'BẮT ĐẦU' },
                put: { color: 'emerald', Icon: Truck, onStart: onStartPutaway, btnText: 'tasks.actions.start', btnDefault: 'BẮT ĐẦU' },
                count: { color: 'amber', Icon: Search, onStart: onStartCounting, btnText: 'tasks.actions.continue', btnDefault: 'TIẾP TỤC' },
                ai_detect: { color: 'rose', Icon: ScanBarcode, onStart: onStartDamage, btnText: 'tasks.actions.enable_ai', btnDefault: 'KÍCH HOẠT AI VISION' },
              }[task.type];

              const classes = {
                blue: {
                  bar: "bg-blue-500",
                  iconWrap: "bg-blue-950/40 border-blue-900/30",
                  icon: "text-blue-400",
                  btn: "bg-blue-600 shadow-lg border-blue-500/30"
                },
                emerald: {
                  bar: "bg-emerald-500",
                  iconWrap: "bg-emerald-950/40 border-emerald-900/30",
                  icon: "text-emerald-400",
                  btn: "bg-emerald-600 shadow-lg border-emerald-500/30"
                },
                amber: {
                  bar: "bg-amber-500",
                  iconWrap: "bg-amber-950/40 border-amber-900/30",
                  icon: "text-amber-400",
                  btn: "bg-amber-600 shadow-lg border-amber-500/30"
                },
                rose: {
                  bar: "bg-rose-500",
                  iconWrap: "bg-rose-950/40 border-rose-900/30",
                  icon: "text-rose-400",
                  btn: "bg-rose-600 shadow-[0_4px_16px_rgba(225,29,72,0.3)] border-rose-500/30"
                }
              }[typeConfig.color as 'blue' | 'emerald' | 'amber' | 'rose'];

              return (
                <motion.div 
                  layout
                  key={task.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  className="bg-slate-900/80 backdrop-blur-md border border-slate-800/80 p-2.5 mb-2 rounded-2xl flex flex-col gap-2 shrink-0 relative overflow-hidden transition-all hover:border-slate-700 mx-1"
                >
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${classes.bar}`} />
                  <div className="flex justify-between items-start pl-2">
                    <div className="flex items-center gap-2.5 w-full pr-1">
                      <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${classes.iconWrap}`}>
                        <typeConfig.Icon className={`w-4.5 h-4.5 ${classes.icon}`} strokeWidth={2} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white text-sm font-mono font-black leading-tight drop-shadow-sm truncate">
                          {t(task.titleKey)}{task.idNumber && ` - ${task.idNumber}`}
                        </h3>
                        <div className="flex items-start gap-1 mt-0.5 text-slate-400 flex-1 w-full">
                          <MapPin className="w-2.5 h-2.5 shrink-0 mt-0.5" />
                          <p className="text-[10px] whitespace-normal break-words leading-relaxed text-slate-300">{t(task.location, task.locationDefault)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-1 pl-2">
                    {task.timeValue > 0 ? (
                      <div className="flex items-center gap-1 text-slate-500">
                         <Clock className="w-2.5 h-2.5" />
                         <span className="text-[9px]">
                           {task.timeUnit === 'minutes' 
                             ? t('tasks.received.minutes', { count: task.timeValue }, `${task.timeValue} phút trước`) 
                             : t('tasks.received.hours', { count: task.timeValue }, `${task.timeValue} giờ trước`)}
                         </span>
                      </div>
                    ) : (
                      <div />
                    )}
                    <button onClick={typeConfig.onStart} className={`py-1.5 px-4 active:scale-[0.98] transition-transform rounded-xl flex items-center justify-center text-[10px] font-bold text-white border ${classes.btn}`}>
                      {t(typeConfig.btnText, typeConfig.btnDefault)}
                    </button>
                  </div>

                  {task.type === 'count' && (
                    <div className="pl-2 mt-1">
                      <div className="h-1 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800/50">
                        <div className="h-full bg-amber-500" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </main>
      </div>

      <AnimatePresence>
        {isFilterOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-950/90 z-[100] flex flex-col justify-end p-4 animate-in slide-in-from-bottom duration-300"
          >
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 relative shadow-2xl flex flex-col gap-5">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-white font-black text-lg">{t('tasks.filter.title', 'Bộ lọc nhiệm vụ')}</h3>
                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="w-8 h-8 flex items-center justify-center bg-slate-800 rounded-full active:scale-95 transition-transform"
                >
                  <X className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-xs font-bold text-slate-400 tracking-wider">{t('tasks.filter.priority', 'ĐỘ ƯU TIÊN')}</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setPriority(priority === 'Khẩn cấp' ? 'All' : 'Khẩn cấp')} 
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-colors ${priority === 'Khẩn cấp' ? 'bg-blue-600 text-white border-blue-500' : 'bg-slate-800 text-slate-300 border-slate-700'}`}
                  >
                    {t('tasks.filter.urgent', 'Khẩn cấp')}
                  </button>
                  <button 
                    onClick={() => setPriority(priority === 'Thường' ? 'All' : 'Thường')} 
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-colors ${priority === 'Thường' ? 'bg-blue-600 text-white border-blue-500' : 'bg-slate-800 text-slate-300 border-slate-700'}`}
                  >
                    {t('tasks.filter.normal', 'Thường')}
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-xs font-bold text-slate-400 tracking-wider">{t('tasks.filter.type', 'LOẠI NHIỆM VỤ')}</span>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setTaskType(taskType === 'Lấy hàng' ? 'All' : 'Lấy hàng')} 
                    className={`py-2.5 rounded-xl text-xs font-bold border transition-colors ${taskType === 'Lấy hàng' ? 'bg-blue-600 text-white border-blue-500' : 'bg-slate-800 text-slate-300 border-slate-700'}`}
                  >
                    {t('tasks.filter.pick', 'Lấy hàng')}
                  </button>
                  <button 
                    onClick={() => setTaskType(taskType === 'Cất hàng' ? 'All' : 'Cất hàng')} 
                    className={`py-2.5 rounded-xl text-xs font-bold border transition-colors ${taskType === 'Cất hàng' ? 'bg-blue-600 text-white border-blue-500' : 'bg-slate-800 text-slate-300 border-slate-700'}`}
                  >
                    {t('tasks.filter.put', 'Cất hàng')}
                  </button>
                  <button 
                    onClick={() => setTaskType(taskType === 'Kiểm kê' ? 'All' : 'Kiểm kê')} 
                    className={`py-2.5 rounded-xl text-xs font-bold border col-span-2 transition-colors ${taskType === 'Kiểm kê' ? 'bg-blue-600 text-white border-blue-500' : 'bg-slate-800 text-slate-300 border-slate-700'}`}
                  >
                    {t('tasks.filter.count', 'Kiểm kê')}
                  </button>
                </div>
              </div>

              <div className="flex gap-3 mt-4 pt-4 border-t border-slate-800/80">
                <button 
                  onClick={() => {
                    setPriority('All');
                    setTaskType('All');
                  }} 
                  className="flex-1 py-3 bg-slate-800 text-white rounded-xl text-sm font-bold active:scale-95 transition-transform"
                >
                  {t('tasks.filter.clear', 'Xóa bộ lọc')}
                </button>
                <button 
                  onClick={() => setIsFilterOpen(false)} 
                  className="flex-[2] py-3 bg-emerald-600 text-white rounded-xl text-sm font-bold active:scale-95 transition-transform shadow-[0_4px_16px_rgba(16,185,129,0.3)]"
                >
                  {t('tasks.filter.apply', 'Áp dụng')}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


