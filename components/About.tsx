
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-6">
      <div className="flex items-center gap-4 sm:gap-8 mb-8 sm:mb-16">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black tracking-tighter uppercase text-white">About Me</h2>
        <div className="flex-grow h-[2px] bg-gradient-to-r from-fuchsia-600 to-transparent"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center">
        {/* Text Content */}
        <div className="space-y-4 sm:space-y-6 md:space-y-8 text-base sm:text-lg md:text-2xl text-white leading-relaxed font-medium">
            <p className="border-l-4 border-fuchsia-600 pl-3 sm:pl-4 md:pl-6">
              I'm a computer science student and emerging developer with a strong interest in building clean, modern, and user-friendly web experiences. I'm still learning, but I'm dedicated, curious, and constantly improving my skills through hands-on projects and real problem-solving.
            </p>
            <p>
              I enjoy exploring front-end development, UI/UX design, and the technologies behind modern web applications. Every project I work on is an opportunity to grow, experiment, and push myself to learn something new.
            </p>
            <p>
              Outside of school, I'm focused on building my portfolio, strengthening my technical foundation, and gaining experience that will help me become a well-rounded developer. My goal is to create meaningful digital experiences while continuously improving my skills.
            </p>
        </div>

        {/* Visual Element / Stats */}
        <div className="relative">
            <div className="bg-slate-900/50 border border-white/20 p-10 rounded-2xl backdrop-blur-sm relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                 {/* Decorative elements */}
                 <div className="absolute top-0 right-0 w-48 h-48 bg-fuchsia-600/10 blur-[60px] rounded-full pointer-events-none"></div>
                 <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-600/10 blur-[60px] rounded-full pointer-events-none"></div>
                 
                 <h3 className="text-3xl font-display font-bold text-white mb-8 uppercase tracking-widest border-b border-white/10 pb-4">Profile Progress</h3>
                 
                 <div className="space-y-8">
                    <div>
                        <div className="flex justify-between text-base font-bold text-white uppercase tracking-widest mb-3">
                            <span>Education Level</span>
                            <span className="text-fuchsia-500">Year 2</span>
                        </div>
                        <div className="h-3 bg-slate-800 rounded-full overflow-hidden border border-white/5">
                            <div className="h-full bg-gradient-to-r from-purple-800 to-fuchsia-500 w-[40%] shadow-[0_0_10px_rgba(192,38,211,0.5)]"></div>
                        </div>
                    </div>
                     <div>
                        <div className="flex justify-between text-base font-bold text-white uppercase tracking-widest mb-3">
                            <span>Technical Focus</span>
                            <span className="text-purple-400">Full Stack</span>
                        </div>
                        <div className="h-3 bg-slate-800 rounded-full overflow-hidden border border-white/5">
                             <div className="h-full bg-gradient-to-r from-indigo-800 to-purple-500 w-[75%] shadow-[0_0_10px_rgba(147,51,234,0.5)]"></div>
                        </div>
                    </div>
                 </div>

                 <div className="mt-10 grid grid-cols-2 gap-6">
                   <div className="bg-white/5 p-6 rounded-xl border border-white/10 text-center hover:bg-white/10 transition-colors">
                     <div className="text-4xl md:text-5xl font-display font-black text-white mb-2">4+</div>
                     <div className="text-xs uppercase tracking-[0.2em] text-white/80 font-bold">Projects Built</div>
                   </div>
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default About;
