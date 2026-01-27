
import React from 'react';
import { SKILL_GROUPS } from '../constants';

const Icons: Record<string, React.ReactNode> = {
  CODE: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  LAYOUT: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
    </svg>
  ),
  SERVER: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 01-2 2v4a2 2 0 012 2h14a2 2 0 012-2v-4a2 2 0 01-2-2m-2-4h.01M17 16h.01" />
    </svg>
  ),
  TERMINAL: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )
};

const Skills: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-6">
        <div>
           <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black text-white mb-2 tracking-tighter uppercase">Technical Skills</h2>
           <p className="text-purple-200 text-xs font-bold tracking-[0.2em] uppercase">Systems · Architecture · Design</p>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
        {SKILL_GROUPS.map((group, index) => (
          <div 
            key={group.category} 
            className="group relative bg-[#020617] p-10 hover:bg-[#050b24] transition-colors duration-500"
          >
            {/* Hover Accent Line */}
            <div className="absolute top-0 left-0 w-[2px] h-0 bg-fuchsia-600 group-hover:h-full transition-all duration-300"></div>

            {/* Visual Anchor & Title */}
            <div className="flex items-start justify-between mb-8">
               <div className="flex flex-col">
                  <h3 className="text-xl font-display font-bold text-white mb-1 tracking-tight group-hover:text-fuchsia-500 transition-colors">
                    {group.category}
                  </h3>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                    {group.description}
                  </p>
               </div>
               <div className="text-fuchsia-600 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                  {Icons[group.icon]}
               </div>
            </div>
            
            {/* Skill List */}
            <ul className="space-y-4">
              {group.items.map((skill) => (
                <li 
                  key={skill.name} 
                  className="flex items-center group/item cursor-default"
                >
                  <span className="w-1.5 h-1.5 bg-white/10 rounded-full mr-4 group-hover/item:bg-fuchsia-600 transition-colors"></span>
                  <span className="text-base text-slate-300 font-medium group-hover/item:text-white transition-colors">
                    {skill.name}
                  </span>
                  
                  {/* Micro-descriptor tooltip style */}
                  {skill.desc && (
                    <span className="ml-3 text-[10px] font-mono text-purple-400 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300 uppercase tracking-wider">
                      // {skill.desc}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
