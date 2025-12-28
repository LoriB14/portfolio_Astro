
import React, { useEffect, useState } from 'react';

interface IntroProps {
  onComplete: () => void;
}

const Intro: React.FC<IntroProps> = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(onComplete, 800);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !isExiting) handleEnter();
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isExiting]);

  return (
    <div className={`fixed inset-0 bg-[#020617] flex flex-col items-center justify-center z-[100] overflow-hidden transition-all duration-1000 ease-in-out ${isExiting ? 'opacity-0 scale-110 blur-xl pointer-events-none' : 'opacity-100 scale-100'}`}>
      
      {/* --- CREATIVE BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        {/* Center Reddish-Purple Glow */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-fuchsia-700/30 rounded-full blur-[130px] animate-[pulse_6s_infinite] transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}></div>

        {/* Animated Orbs */}
        <div className={`absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[100px] animate-[pulse_8s_infinite] transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[120px] animate-[pulse_10s_infinite] delay-1000 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}></div>
        
        {/* Cyber Grid Overlay */}
        <div className="absolute inset-0 cyber-grid opacity-20 bg-[size:40px_40px]"></div>
        
        {/* Vignette */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#020617]"></div>
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-20 flex flex-col items-center gap-12">
        
        {/* Main Identity Block with Floating Animation */}
        <div className={`text-center space-y-6 transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}>
          <div className="animate-float">
            <div className="relative inline-block">
              <h1 className="text-7xl md:text-9xl font-display font-black tracking-tighter text-white uppercase relative z-10 mix-blend-overlay">
                LORI BATTOUK
              </h1>
              {/* Updated Gradient to include Reddish-Purple (Fuchsia) */}
              <h1 className="absolute inset-0 text-7xl md:text-9xl font-display font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-fuchsia-500 to-white animate-text-shimmer bg-[length:200%_auto] z-20">
                LORI BATTOUK
              </h1>
            </div>
            
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="h-[1px] w-12 bg-fuchsia-500"></div>
              <p className="text-fuchsia-200 font-display text-sm md:text-lg tracking-[0.5em] uppercase font-bold text-glow-blue shadow-fuchsia-500/50">
                Computer Science @ York
              </p>
              <div className="h-[1px] w-12 bg-fuchsia-500"></div>
            </div>
          </div>
        </div>

        {/* Creative Enter Button */}
        <div className={`transition-all duration-1000 delay-300 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <button 
            onClick={handleEnter}
            className="group relative px-16 py-5 overflow-hidden"
          >
            {/* Hover Background Sweep - Matches Theme */}
            <div className="absolute inset-0 bg-fuchsia-700 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
            
            {/* Border Lines */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-white/20 group-hover:bg-white transition-colors"></div>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20 group-hover:bg-white transition-colors"></div>
            
            {/* Text */}
            <span className="relative z-10 font-display font-black text-lg text-white tracking-[0.4em] group-hover:text-white transition-colors duration-300">
              ENTER PORTFOLIO
            </span>

            {/* Tech Brackets */}
            <div className="absolute top-0 left-0 w-[2px] h-full bg-fuchsia-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>
            <div className="absolute top-0 right-0 w-[2px] h-full bg-fuchsia-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom"></div>
          </button>
        </div>

      </div>

      {/* --- FOOTER DECORATION --- */}
      <div className={`absolute bottom-8 left-0 w-full flex justify-between px-8 transition-opacity duration-1000 delay-700 ${isVisible ? 'opacity-50' : 'opacity-0'}`}>
         <div className="flex gap-2">
            <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
            <div className="w-1 h-1 bg-white rounded-full animate-pulse delay-75"></div>
            <div className="w-1 h-1 bg-white rounded-full animate-pulse delay-150"></div>
         </div>
         <div className="text-[10px] font-mono text-white/40 tracking-widest uppercase">
            v2.5 // ONLINE
         </div>
      </div>

      <style>{`
        @keyframes text-shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        .animate-text-shimmer {
          animation: text-shimmer 8s linear infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Intro;
