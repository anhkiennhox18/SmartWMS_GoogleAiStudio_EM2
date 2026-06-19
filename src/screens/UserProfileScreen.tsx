import React from "react";
import { Cpu, History, HelpCircle, LogOut, Globe, ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "../hooks/useTranslation";

interface UserProfileScreenProps {
  onLogout: () => void;
  onNavigateToConfig: () => void;
}

export function UserProfileScreen({
  onLogout,
  onNavigateToConfig,
}: UserProfileScreenProps) {
  const { t, i18n } = useTranslation();

  return (
    <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex flex-col relative z-0 mt-2 px-1 pb-32">
      {/* User Identity Section */}
      <div className="flex flex-col items-center justify-center mt-6 mb-4">
        <div className="w-16 h-16 rounded-full border-2 border-blue-500/30 bg-blue-500/10 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.15)] mb-2 relative">
          <span className="text-xl font-bold text-blue-400">AK</span>
          <div className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-emerald-500 border-2 border-slate-950 rounded-full"></div>
        </div>
        <h2 className="text-sm font-black text-white tracking-wide">
          {t('profile.name', 'Trần Anh Kiện')}
        </h2>
        <p className="text-[10px] text-slate-400 mt-0.5">
          {t('profile.user.role', 'Warehouse Operator (Staff)')}
        </p>
        <div className="bg-slate-900 border border-slate-800/80 rounded-md px-2.5 py-1 mt-2.5">
          <span className="text-[9px] text-slate-300 font-medium">
            {t('profile.user.device', 'Device')}: PDA-04 | {t('profile.user.shift', 'Shift')}: 1 (Online)
          </span>
        </div>
      </div>

      {/* KPI Dashboard */}
      <div className="grid grid-cols-3 gap-1.5 bg-slate-900/60 border border-slate-800/80 p-2.5 rounded-xl my-3 shrink-0">
        <div className="flex flex-col items-center justify-center p-1">
          <span className="text-xs font-bold text-white">12/15</span>
          <span className="text-[8px] text-slate-500 uppercase font-semibold mt-0.5 text-center">
            {t("profile.kpi.picked_tasks", "ĐƠN ĐÃ NHẶT")}
          </span>
        </div>
        <div className="flex flex-col items-center justify-center p-1 border-x border-slate-800/60">
          <span className="text-xs font-bold text-white">4</span>
          <span className="text-[8px] text-slate-500 uppercase font-semibold mt-0.5 text-center">
            {t("profile.kpi.counted_bins", "VỊ TRÍ ĐÃ KIỂM")}
          </span>
        </div>
        <div className="flex flex-col items-center justify-center p-1">
          <span className="text-xs font-bold text-emerald-400 drop-shadow-[0_0_4px_rgba(52,211,153,0.5)]">
            94%
          </span>
          <span className="text-[8px] text-slate-500 uppercase font-semibold mt-0.5 text-center">
            {t("profile.kpi.efficiency", "HIỆU SUẤT CA TRỰC")}
          </span>
        </div>
      </div>

      {/* Account Options Menu Rows */}
      <div className="flex flex-col mb-4 bg-slate-900/20 border border-slate-800/50 rounded-xl overflow-hidden shrink-0">
        <div
          onClick={onNavigateToConfig}
          className="p-2.5 bg-slate-900/30 border-b border-slate-900/60 flex justify-between items-center text-[11px] text-slate-300 transition-all active:bg-slate-900/80 cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-medium">{t("profile.menu.hardware_sqlite", "Cấu hình phần cứng")}</span>
          </div>
        </div>

        <div className="p-2.5 bg-slate-900/30 border-b border-slate-900/60 flex justify-between items-center text-[11px] text-slate-300 transition-all active:bg-slate-900/80 cursor-pointer">
          <div className="flex items-center gap-2">
            <History className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-medium">{t("profile.menu.activity_log", "Nhật ký hoạt động ca trực")}</span>
          </div>
        </div>

        {/* Language Selection Row */}
        <div className="p-2.5 bg-slate-900/30 border-b border-slate-900/60 flex justify-between items-center text-[11px] text-slate-300 transition-all">
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-medium">{t("profile.menu.language", "System Language")}</span>
          </div>
          <div className="relative flex items-center">
            <select
              value={i18n.language.startsWith('vi') ? 'vi' : 'en'}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              className="appearance-none bg-slate-900 border border-slate-800 rounded-xl text-white text-[10px] font-medium pl-3 pr-7 py-1.5 outline-none focus:border-blue-500/50 cursor-pointer"
            >
              <option value="vi">Tiếng Việt</option>
              <option value="en">English</option>
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2.5 pointer-events-none" />
          </div>
        </div>

        <div className="p-2.5 bg-slate-900/30 flex justify-between items-center text-[11px] text-slate-300 transition-all active:bg-slate-900/80 cursor-pointer">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
            <span className="font-medium">{t("profile.menu.help_sop", "Trợ giúp & SOP")}</span>
          </div>
        </div>
      </div>

      {/* Sticky Logout Trigger */}
      <div className="mt-auto shrink-0 mb-1 pt-2">
        <button
          onClick={onLogout}
          className="w-full bg-slate-900/80 border border-rose-950 text-rose-400 py-2 rounded-xl text-xs font-bold tracking-wider uppercase active:scale-95 active:bg-rose-500/10 transition-colors text-center flex justify-center items-center gap-1.5 shadow-[0_4px_12px_rgba(244,63,94,0.05)]"
        >
          <LogOut className="w-3.5 h-3.5" />
          {t("common.logout", "ĐĂNG XUẤT")}
        </button>
      </div>
    </div>
  );
}
