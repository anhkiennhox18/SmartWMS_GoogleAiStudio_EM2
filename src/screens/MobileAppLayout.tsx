import React, { useState } from "react";
import {
  ClipboardList,
  ScanBarcode,
  BarChart3,
  LogOut,
  Wifi,
  Signal,
  RefreshCw,
  Bell,
  X,
  Globe,
  ChevronDown,
  Check,
  User,
  ChevronLeft,
} from "lucide-react";
import { useTranslation } from "../hooks/useTranslation";

// Import screens
import { TaskListScreen } from "./TaskListScreen";
import PickingExecutionScreen from "./PickingExecutionScreen";
import { MobileAnalyticsScreen } from "./MobileAnalyticsScreen";
import { MobileLoginScreen } from "./MobileLoginScreen";
import { PickingChecklistScreen } from "./PickingChecklistScreen";
import { PutawayExecutionScreen } from "./PutawayExecutionScreen";
import { InventoryCountingScreen } from "./InventoryCountingScreen";
import { DamageDetectionScreen } from "./DamageDetectionScreen";
import { PDAConfigScreen } from "./PDAConfigScreen";
import { UserProfileScreen } from "./UserProfileScreen";
import { SplashScreen } from "./SplashScreen";
import { motion, AnimatePresence } from "motion/react";
import { Mic } from "lucide-react";

export function MobileAppLayout() {
  const { t, i18n } = useTranslation();

  // Auth & Roles
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<"admin" | "staff" | null>(null);

  const [activeTab, setActiveTab] = useState<
    | "tasks"
    | "checklist"
    | "picking"
    | "putaway"
    | "counting"
    | "damage"
    | "analytics"
    | "pda_config"
    | "profile"
  >("tasks");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isDamageCompleted, setIsDamageCompleted] = useState(false);
  const [isAIAgentOpen, setIsAIAgentOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [hasNotifications, setHasNotifications] = useState(true);
  const [isNotiOpen, setIsNotiOpen] = useState(false);

  const isVi = i18n.language?.startsWith("vi");

  // Clock state
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  );

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAuthChecked = (hasToken: boolean) => {
    setIsSplashVisible(false);
    if (hasToken) {
      if (false) {
        // In a real app we would check email or roles
        setUserRole("admin");
        setActiveTab("analytics");
      } else {
        setUserRole("staff");
        setActiveTab("tasks");
      }
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  const handleLoginSuccess = (email: string) => {
    if (email === "admin@smartwms.com") {
      setUserRole("admin");
      setActiveTab("analytics");
    } else {
      setUserRole("staff");
      setActiveTab("tasks");
    }
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setActiveTab("tasks");
  };

  const handlePutawayComplete = () => {
    setActiveTab("tasks");
    setToastMessage(t('putaway.success_toast', 'Đã cất hàng lên kệ thành công!'));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleCountingComplete = () => {
    setActiveTab("tasks");
    setToastMessage(t('counting.success_toast', 'Đã gửi biên bản kiểm kho lên hệ thống Web thành công!'));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleDamageComplete = () => {
    setActiveTab("tasks");
    setIsDamageCompleted(true);
    setToastMessage(t('ai_vision.success_toast', 'Đã gửi biên bản sự cố lên hệ thống thành công!'));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  if (isSplashVisible) {
    return <SplashScreen onAuthChecked={handleAuthChecked} />;
  }

  if (!isLoggedIn) {
    return <MobileLoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  // Render the currently active screen
  const renderScreen = () => {
    switch (activeTab) {
      case "tasks":
        return (
          <TaskListScreen
            isDamageCompleted={isDamageCompleted}
            onStartPicking={() => setActiveTab("checklist")}
            onStartPutaway={() => setActiveTab("putaway")}
            onStartCounting={() => setActiveTab("counting")}
            onStartDamage={() => setActiveTab("damage")}
          />
        );
      case "checklist":
        return (
          <PickingChecklistScreen
            onGoToScan={() => setActiveTab("picking")}
            onBack={() => setActiveTab("tasks")}
          />
        );
      case "picking":
        return (
          <PickingExecutionScreen
            onCompleteWave={() => setActiveTab("analytics")}
            onReportDamage={() => setActiveTab("damage")}
          />
        );
      case "putaway":
        return <PutawayExecutionScreen onComplete={handlePutawayComplete} />;
      case "counting":
        return <InventoryCountingScreen onComplete={handleCountingComplete} />;
      case "damage":
        return <DamageDetectionScreen onComplete={handleDamageComplete} />;
      case "analytics":
        if (userRole !== "admin" && userRole !== "manager") {
          return (
            <TaskListScreen
              isDamageCompleted={isDamageCompleted}
              onStartPicking={() => setActiveTab("checklist")}
              onStartPutaway={() => setActiveTab("putaway")}
              onStartCounting={() => setActiveTab("counting")}
              onStartDamage={() => setActiveTab("damage")}
            />
          );
        }
        return <MobileAnalyticsScreen />;
      case "pda_config":
        return <PDAConfigScreen />;
      case "profile":
        return (
          <UserProfileScreen
            onLogout={handleLogout}
            onNavigateToConfig={() => setActiveTab("pda_config")}
          />
        );
      default:
        return (
          <TaskListScreen
            isDamageCompleted={isDamageCompleted}
            onStartPicking={() => setActiveTab("checklist")}
            onStartPutaway={() => setActiveTab("putaway")}
            onStartCounting={() => setActiveTab("counting")}
            onStartDamage={() => setActiveTab("damage")}
          />
        );
    }
  };

  return (
    <div className="absolute inset-0 w-full h-screen bg-[#090d16] flex items-center justify-center p-2 overflow-hidden select-none">
      {/* Device Hardware Mockup */}
      <div className="w-[310px] h-[620px] bg-black rounded-[44px] border-[8px] border-[#1e2330] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] flex flex-col relative overflow-hidden shrink-0">
        {/* Dynamic Island & Hardware details */}
        <div className="absolute top-[4px] left-1/2 transform -translate-x-1/2 w-16 h-1 bg-[#2a3042] rounded-full z-50"></div>
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-20 h-5 bg-black rounded-full z-50"></div>

        {/* Inner Screen Container */}
        <div className="w-full h-full bg-slate-950 flex flex-col pt-7 pb-1 px-3 rounded-[36px] overflow-hidden justify-between relative">
          {/* Realistic System Status Bar */}
          <div className="w-full h-5 px-5 flex justify-between items-center absolute top-0 left-0 z-50 bg-transparent select-none">
            <span className="text-[11px] font-semibold text-white tracking-tight">
              {currentTime}
            </span>
            <div className="flex items-center gap-1.5 opacity-90">
              <Signal className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
              <Wifi className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
              <div className="flex items-center">
                <div className="w-5 h-2.5 bg-transparent border border-white rounded-[3px] flex items-center p-[1px]">
                  <div className="bg-white w-[80%] h-full rounded-[1px]" />
                </div>
                <div className="w-[1.5px] h-1.5 bg-white/50 rounded-r-sm" />
              </div>
            </div>
          </div>

          {/* Global Header */}
          <header className={`flex ${
              ["picking", "checklist", "putaway", "counting", "damage"].includes(activeTab) ? "justify-start gap-2" : "justify-between"
            } items-center px-4 py-3 bg-slate-950 border-b border-slate-800/50 h-14 shrink-0 relative z-50`}>
            
            {["picking", "checklist", "putaway", "counting", "damage"].includes(activeTab) && (
              <button
                onClick={() => setActiveTab("tasks")}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-slate-900/80 border border-slate-800 active:bg-slate-800 active:scale-95 transition-all shrink-0 mr-1"
              >
                <ChevronLeft className="w-4 h-4 text-slate-300" />
              </button>
            )}

            <div className={`flex flex-col justify-center ${["picking", "checklist", "putaway", "counting", "damage"].includes(activeTab) ? "flex-1" : "w-full"}`}>
              {activeTab === "tasks" ? (
                <>
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{t("tasks.system_label", "HỆ THỐNG")}</span>
                  <h1 className="text-lg font-black text-white leading-none mt-0.5 tracking-tight">{t("tasks.today_tasks", "Nhiệm vụ hôm nay")}</h1>
                </>
              ) : activeTab === "analytics" ? (
                <>
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{t("analytics.label", "THỐNG KÊ")}</span>
                  <h1 className="text-lg font-black text-white leading-none mt-0.5 tracking-tight">{t("analytics.title", "Hiệu suất kho vận")}</h1>
                </>
              ) : activeTab === "profile" ? (
                <>
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{t("profile.label", "TÀI KHOẢN")}</span>
                  <h1 className="text-lg font-black text-white leading-none mt-0.5 tracking-tight">{t("profile.title", "Thông tin cá nhân")}</h1>
                </>
              ) : activeTab === "putaway" ? (
                <>
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{t("putaway.header_label", "MÃ LỆNH CẤT HÀNG")}</span>
                  <h1 className="text-lg font-black text-white leading-none mt-0.5 tracking-tight">PUT-015</h1>
                </>
              ) : activeTab === "counting" ? (
                <>
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{t("counting.header_label", "MÃ LỆNH KIỂM KHO")}</span>
                  <h1 className="text-lg font-black text-white leading-none mt-0.5 tracking-tight">COUNT-01</h1>
                </>
              ) : activeTab === "picking" || activeTab === "checklist" || activeTab === "damage" ? (
                <>
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{t('picking.wave_title', 'MÃ LỆNH NHẶT HÀNG')}</span>
                  <h1 className="text-lg font-black text-white leading-none mt-0.5 tracking-tight">WAVE-001</h1>
                </>
              ) : null}
            </div>
            <div className="flex items-center gap-3 relative z-50 ml-auto shrink-0">
              <div 
                className="relative cursor-pointer active:scale-95 transition-transform"
                onClick={() => setIsNotiOpen(!isNotiOpen)}
              >
                <Bell className="w-5 h-5 text-slate-400 stroke-[2px]" />
                {hasNotifications && (
                  <div className="absolute -top-1 -right-0.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-[1.5px] border-slate-950" />
                )}
              </div>
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-rose-500 shadow-[0_0_8px_#f43f5e]'}`}></div>
            </div>
          </header>

          <AnimatePresence>
            {isNotiOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-20 left-0 right-0 bg-slate-900 border-b border-slate-800 shadow-2xl z-40 max-h-[50%] overflow-y-auto"
              >
                <div className="p-4 flex flex-col gap-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Thông báo</span>
                    <button 
                      onClick={() => setIsNotiOpen(false)} 
                      className="w-6 h-6 flex items-center justify-center bg-slate-800 rounded-full active:scale-95 transition-transform"
                    >
                      <X className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  </div>
                  <div className="bg-slate-800/50 p-2.5 rounded-lg border border-slate-700/50">
                    <h4 className="text-[11px] font-bold text-emerald-400">Đơn hàng mới</h4>
                    <p className="text-[10px] text-slate-300 mt-1">WAVE-002 vừa được tạo và gán cho bạn.</p>
                  </div>
                  <div className="bg-slate-800/50 p-2.5 rounded-lg border border-slate-700/50">
                    <h4 className="text-[11px] font-bold text-rose-400">Cảnh báo tồn kho</h4>
                    <p className="text-[10px] text-slate-300 mt-1">Sản phẩm SKU-IP15PM sắp hết hàng tại Kệ C1.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main App Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden relative">
            {renderScreen()}
          </div>

          <AnimatePresence>
            {showToast && (
              <motion.div
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -60, opacity: 0 }}
                className="absolute top-16 left-3 right-3 bg-emerald-500/95 backdrop-blur-md text-white p-3 rounded-xl shadow-lg shadow-black/40 z-50 flex items-center gap-2 border border-emerald-400/30 whitespace-normal break-words text-xs font-bold"
              >
                {toastMessage}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Action Button - Global AI Agent Trigger */}
          <button
            onClick={() => setIsAIAgentOpen(!isAIAgentOpen)}
            className="absolute bottom-24 right-4 w-11 h-11 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-[0_4px_16px_rgba(59,130,246,0.5)] z-50 active:scale-95 transition-all animate-bounce"
          >
            <Mic className="w-5 h-5 text-white" strokeWidth={2.5} />
          </button>

          {/* Premium Bottom Tab Bar */}
          <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800/80 rounded-2xl mb-1 mt-1 flex justify-around items-center py-2 px-1 shrink-0 shadow-lg z-50 relative">
            <button
              onClick={() => setActiveTab("tasks")}
              className={`flex flex-col items-center gap-1 flex-1 py-1 ${activeTab === "tasks" ? "text-blue-500" : "text-slate-500"} active:scale-95 transition-all relative`}
            >
              <div className="relative">
                <ClipboardList
                  className={`w-5 h-5 ${activeTab === "tasks" ? "drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" : ""}`}
                  strokeWidth={activeTab === "tasks" ? 2.5 : 2}
                />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full border border-slate-900" />
              </div>
              <span
                className={`text-[9px] font-bold tracking-wider ${activeTab === "tasks" ? "opacity-100" : "opacity-70"}`}
              >
                {t("common.nav.tasks")}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("picking")}
              className={`flex flex-col items-center gap-1 flex-1 py-1 ${activeTab === "picking" || activeTab === "checklist" || activeTab === "putaway" || activeTab === "counting" || activeTab === "damage" ? "text-blue-500" : "text-slate-500"} active:scale-95 transition-all`}
            >
              <ScanBarcode
                className={`w-5 h-5 ${activeTab === "picking" || activeTab === "checklist" || activeTab === "putaway" || activeTab === "counting" || activeTab === "damage" ? "drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" : ""}`}
                strokeWidth={
                  activeTab === "picking" ||
                  activeTab === "checklist" ||
                  activeTab === "putaway" ||
                  activeTab === "counting" ||
                  activeTab === "damage"
                    ? 2.5
                    : 2
                }
              />
              <span
                className={`text-[9px] font-bold tracking-wider ${activeTab === "picking" || activeTab === "checklist" || activeTab === "putaway" || activeTab === "counting" || activeTab === "damage" ? "opacity-100" : "opacity-70"}`}
              >
                {t("common.nav.picking")}
              </span>
            </button>

            {(userRole === "admin" || userRole === "manager") && (
              <button
                onClick={() => setActiveTab("analytics")}
                className={`flex flex-col items-center gap-1 flex-1 py-1 ${activeTab === "analytics" ? "text-blue-500" : "text-slate-500"} active:scale-95 transition-all`}
              >
                <BarChart3
                  className={`w-5 h-5 ${activeTab === "analytics" ? "drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" : ""}`}
                  strokeWidth={activeTab === "analytics" ? 2.5 : 2}
                />
                <span
                  className={`text-[9px] font-bold tracking-wider ${activeTab === "analytics" ? "opacity-100" : "opacity-70"}`}
                >
                  {t("common.nav.analytics")}
                </span>
              </button>
            )}

            <button
              onClick={() => setActiveTab("profile")}
              className={`flex flex-col items-center gap-1 flex-1 py-1 ${activeTab === "profile" ? "text-blue-500" : "text-slate-500"} active:scale-95 transition-all`}
            >
              <User
                className={`w-5 h-5 ${activeTab === "profile" ? "drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" : ""}`}
                strokeWidth={activeTab === "profile" ? 2.5 : 2}
              />
              <span
                className={`text-[9px] font-bold tracking-wider ${activeTab === "profile" ? "opacity-100" : "opacity-70"}`}
              >
                {t("common.nav.profile")}
              </span>
            </button>
          </div>

          <AnimatePresence>
            {isAIAgentOpen && (
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute inset-x-0 bottom-0 bg-slate-950/98 border-t border-slate-800 rounded-t-[28px] p-4 z-50 flex flex-col justify-between h-[340px] shadow-[0_-10px_40px_rgba(0,0,0,0.8)]"
              >
                {/* Header Trợ lý */}
                <div className="flex justify-between items-center bg-slate-900/50 p-2.5 rounded-xl border border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee] animate-pulse"></div>
                    <span className="text-[11px] font-black text-cyan-400 tracking-wider">
                      🤖 SMARTWMS VIRTUAL AGENT
                    </span>
                  </div>
                  <button 
                    onClick={() => setIsAIAgentOpen(false)}
                    className="w-6 h-6 bg-slate-800 rounded-full flex items-center justify-center active:scale-95 transition-all outline-none"
                  >
                    <X className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                </div>

                {/* Hộp thoại gợi ý hành động ngữ cảnh */}
                <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl text-[11px] text-slate-300 leading-relaxed mt-2 flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden">
                  {activeTab === "picking" ? (
                    <p>Tôi nhận thấy bạn đang xử lý lệnh WAVE-001 tại Kệ C1. Bạn có muốn tôi định vị lộ trình ngắn nhất đến ô kệ tiếp theo không?</p>
                  ) : activeTab === "damage" ? (
                    <p>Đang chờ hình ảnh Computer Vision phân loại mức độ hư hại để tự động lập Restock Ticket.</p>
                  ) : (
                    <p>Chào bạn, tôi có thể giúp gì cho ca làm việc hiện tại của bạn?</p>
                  )}
                </div>

                {/* Khu vực Khẩu lệnh bằng giọng nói */}
                <div className="mt-3 flex gap-2 items-center">
                  <div className="flex-1 bg-slate-900 border border-slate-700/80 rounded-full h-10 px-4 flex items-center shadow-inner">
                    <span className="text-[11px] text-slate-500 italic">Nói hoặc nhập lệnh...</span>
                  </div>
                  {/* Dải sóng âm CSS */}
                  <div className="flex items-center gap-0.5 px-2 h-10 bg-cyan-900/20 rounded-full border border-cyan-800/40">
                    <div className="w-1 h-3 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-1 h-5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-1 h-4 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    <div className="w-1 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '450ms' }}></div>
                  </div>
                </div>
                
                {/* Home indicator placeholder inside sheet */}
                <div className="w-28 h-1 bg-white/20 rounded-full mx-auto mt-4 shrink-0"></div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Home Indicator */}
          <div className="w-28 h-1 bg-white/20 rounded-full mx-auto mt-1 mb-2 shrink-0"></div>
        </div>
      </div>
    </div>
  );
}
