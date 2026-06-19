import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Box, Signal, Wifi } from 'lucide-react';

interface SplashScreenProps {
  onAuthChecked: (hasToken: boolean) => void;
}

export function SplashScreen({ onAuthChecked }: SplashScreenProps) {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
  );
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const checkAuthToken = async () => {
      // Fake delay
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
            onAuthChecked(false); // Redirect to login
        }, 500); // Wait for transition
      }, 2000);
    };

    checkAuthToken();
  }, [onAuthChecked]);

  return (
    <div className="absolute inset-0 w-full h-screen bg-[#090d16] flex items-center justify-center p-2 overflow-hidden select-none z-50">
      <div className="w-[310px] h-[620px] bg-black rounded-[44px] border-[8px] border-[#1e2330] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] flex flex-col relative overflow-hidden shrink-0">
        {/* Dynamic Island */}
        <div className="absolute top-[4px] left-1/2 transform -translate-x-1/2 w-16 h-1 bg-[#2a3042] rounded-full z-50"></div>
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-20 h-5 bg-black rounded-full z-50"></div>

        <AnimatePresence>
          {isVisible && (
            <motion.div 
              initial={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="bg-slate-950 w-full h-full flex flex-col items-center justify-center relative overflow-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {/* System Status Bar */}
              <div className="absolute top-0 w-full h-12 flex justify-between items-center px-6 z-50 bg-transparent select-none pt-2">
                <span className="text-[11px] font-semibold text-white tracking-tight">{currentTime}</span>
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

              <div className="flex flex-col items-center justify-center flex-1 w-full">
                <div className="bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-3xl w-16 h-16 flex items-center justify-center text-white shadow-[0_0_25px_rgba(59,130,246,0.5)]">
                  <Box className="w-8 h-8" strokeWidth={2} />
                </div>
                <h1 className="text-xl font-black text-white tracking-widest mt-4">SmartWMS</h1>
                <p className="text-[9px] text-slate-500 uppercase font-medium tracking-widest mt-1 text-center">Intelligent Logistics Platform</p>
              </div>

              <div className="absolute bottom-8 flex flex-col items-center">
                <div className="animate-spin border-2 border-t-blue-500 border-r-transparent rounded-full w-4 h-4 mb-8"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
