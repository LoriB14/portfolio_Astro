
import React, { useRef, useEffect, useState } from 'react';
import { PROJECTS } from '../constants';
import { Project } from '../types';

interface ProjectsProps {
  onProjectStateChange?: (isOpen: boolean) => void;
}

const Projects: React.FC<ProjectsProps> = ({ onProjectStateChange }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isTechOpen, setIsTechOpen] = useState(true); // Default open for better visibility
  const [isAnimating, setIsAnimating] = useState(false);

  // --- SCROLL LOGIC FOR CAROUSEL ---
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const cardWidth = current.children[0]?.clientWidth || 300;
      const gap = 32;
      const scrollAmount = cardWidth + gap;
      
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedProject) {
        if (e.key === 'ArrowLeft') scroll('left');
        if (e.key === 'ArrowRight') scroll('right');
      } else {
        if (e.key === 'Escape') closeProject();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  // --- NAVIGATION LOGIC ---
  const openProject = (project: Project) => {
    setIsAnimating(true);
    setSelectedProject(project);
    setIsTechOpen(true);
    document.body.style.overflow = 'hidden'; // Lock body scroll
    if (onProjectStateChange) onProjectStateChange(true);
  };

  const closeProject = () => {
    setIsAnimating(false);
    if (onProjectStateChange) onProjectStateChange(false);
    setTimeout(() => {
        setSelectedProject(null);
        document.body.style.overflow = ''; // Unlock body scroll
    }, 300);
  };

  return (
    <div className="relative w-full py-10">
      
      {/* --- LIST VIEW --- */}
      <div className={`transition-all duration-500 ${selectedProject ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100 scale-100'}`}>
        {/* HEADER */}
        <div className="mb-16 border-l-4 border-fuchsia-600 pl-6">
            <h2 className="text-4xl font-display font-bold text-white mb-2 tracking-tight">Projects</h2>
            <p className="text-white/50 text-sm font-bold tracking-widest uppercase">Mission Archive</p>
        </div>

        {/* CAROUSEL WRAPPER */}
        <div className="relative group/carousel">
            
            {/* LEFT ARROW - Desktop Only */}
            <button 
            onClick={() => scroll('left')}
            className="hidden md:flex absolute -left-6 lg:-left-16 top-[calc(50%-16px)] -translate-y-1/2 z-20 w-12 h-24 bg-slate-950/80 border-l-2 border-y border-white/10 hover:border-fuchsia-600 hover:bg-fuchsia-600/10 backdrop-blur-md items-center justify-center text-white/40 hover:text-white transition-all duration-300 group/arrow clip-path-polygon"
            aria-label="Previous project"
            >
              <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent opacity-0 group-hover/arrow:opacity-100 transition-opacity"></div>
              <svg className="w-8 h-8 transition-transform group-hover/arrow:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7"></path></svg>
            </button>

            {/* SCROLL CONTAINER */}
            <div 
            ref={scrollRef}
            className="flex flex-col md:flex-row gap-8 md:overflow-x-auto snap-y md:snap-x snap-mandatory pb-8 no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
            {PROJECTS.map((project) => (
                <div 
                key={project.id}
                onClick={() => openProject(project)}
                className="snap-start flex-none w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] relative group cursor-pointer h-auto md:h-[520px] transition-all duration-200 active:scale-95"
                >
                    {/* --- FOCUS FRAME CORNERS --- */}
                    {/* Top Left */}
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-fuchsia-600 opacity-30 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:top-2 group-hover:left-2 group-hover:shadow-[0_0_10px_rgba(192,38,211,0.5)]"></div>
                    {/* Top Right */}
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-fuchsia-600 opacity-30 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:top-2 group-hover:right-2 group-hover:shadow-[0_0_10px_rgba(192,38,211,0.5)]"></div>
                    {/* Bottom Left */}
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-fuchsia-600 opacity-30 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:bottom-2 group-hover:left-2 group-hover:shadow-[0_0_10px_rgba(192,38,211,0.5)]"></div>
                    {/* Bottom Right */}
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-fuchsia-600 opacity-30 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:bottom-2 group-hover:right-2 group-hover:shadow-[0_0_10px_rgba(192,38,211,0.5)]"></div>

                    {/* --- CONTENT CONTAINER --- */}
                    <div className="h-full w-full p-6 flex flex-col transition-transform duration-300 group-hover:-translate-y-1">
                        
                        {/* IMAGE */}
                        <div className="w-full aspect-video mb-6 overflow-hidden rounded-sm bg-slate-900 border border-white/5 group-hover:border-white/10 transition-colors">
                             <img 
                               src={project.image} 
                               alt={project.title} 
                               className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${!project.demoUrl ? 'grayscale opacity-50' : ''}`}
                             />
                        </div>

                        {/* INFO */}
                        <div className="flex flex-col flex-grow items-start text-left">
                            <h3 className="text-3xl font-display font-bold text-white mb-2 tracking-tight group-hover:text-fuchsia-500 transition-colors">
                                {project.title}
                            </h3>
                            
                            <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2 font-medium">
                                {project.description}
                            </p>

                            <div className="mt-auto w-full">
                                <div className="text-xs font-mono text-slate-500 mb-6 uppercase tracking-wider">
                                    {project.tags.slice(0, 3).join(' · ')}
                                </div>

                                <div className="flex items-center gap-6 pt-4 w-full">
                                    {project.demoUrl ? (
                                        <span className="text-sm font-bold text-fuchsia-500 flex items-center gap-2 group/link">
                                            View Project
                                            <span className="transition-transform group-hover/link:translate-x-1">→</span>
                                        </span>
                                    ) : (
                                        <span className="text-sm font-bold text-slate-600 flex items-center gap-2 cursor-not-allowed">
                                            Private / NDA
                                            <span>🔒</span>
                                        </span>
                                    )}
                                    
                                    {project.repoUrl ? (
                                        <span className="text-xs font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest">
                                            Source Code
                                        </span>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            </div>

            {/* RIGHT ARROW - Desktop Only */}
            <button 
            onClick={() => scroll('right')}
            className="hidden md:flex absolute -right-6 lg:-right-16 top-[calc(50%-16px)] -translate-y-1/2 z-20 w-12 h-24 bg-slate-950/80 border-r-2 border-y border-white/10 hover:border-fuchsia-600 hover:bg-fuchsia-600/10 backdrop-blur-md items-center justify-center text-white/40 hover:text-white transition-all duration-300 group/arrow"
            aria-label="Next project"
            >
              <div className="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent opacity-0 group-hover/arrow:opacity-100 transition-opacity"></div>
              <svg className="w-8 h-8 transition-transform group-hover/arrow:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7"></path></svg>
            </button>
        </div>
      </div>

      {/* --- DETAILED PROJECT VIEW OVERLAY --- */}
      {selectedProject && (
        <div className={`fixed inset-0 z-[60] overflow-y-auto overflow-x-hidden bg-slate-950 transition-all duration-500 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}>
           
           {/* FIXED CLOSE BUTTON - TOP RIGHT */}
           <button 
             onClick={closeProject}
             className="fixed top-8 right-8 z-[70] flex items-center gap-3 bg-slate-900/80 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 hover:border-fuchsia-600 hover:bg-fuchsia-600/10 transition-all duration-300 group hover:shadow-[0_0_20px_rgba(192,38,211,0.4)]"
           >
             <span className="text-white font-bold tracking-widest text-sm group-hover:text-fuchsia-500 transition-colors">CLOSE</span>
             <span className="text-white/50 group-hover:text-white transition-colors text-lg">✕</span>
           </button>

           {/* CONTENT CONTAINER */}
           <div className="min-h-screen w-full max-w-7xl mx-auto px-6 py-24 md:py-32 flex flex-col">
              
              {/* HEADER AREA */}
              <div className="mb-12 animate-in slide-in-from-bottom-4 duration-700">
                  <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-4">{selectedProject.title}</h1>
                  <div className="flex items-center gap-4 text-lg md:text-xl font-bold">
                      <span className="text-fuchsia-600 tracking-wider uppercase">{selectedProject.category}</span>
                      <span className="w-2 h-2 bg-white/20 rounded-full"></span>
                      <span className="text-slate-300">{selectedProject.role}</span>
                  </div>
              </div>

              {/* PREVIEW IMAGE */}
              <div className="w-full aspect-video md:aspect-[21/9] bg-slate-900 rounded-xl overflow-hidden border border-white/10 mb-16 relative group hover:shadow-[0_0_40px_rgba(255,255,255,0.05)] transition-all duration-500 animate-in zoom-in-95 duration-700 delay-100">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title} 
                    className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 ${!selectedProject.demoUrl ? 'grayscale opacity-60' : ''}`}
                  />
                  {/* Subtle vignette frame */}
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl"></div>
              </div>

              {/* DETAILS GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24 animate-in slide-in-from-bottom-8 duration-700 delay-200">
                  
                  {/* LEFT COLUMN: DESCRIPTION */}
                  <div className="lg:col-span-2 space-y-12">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-6">Overview</h3>
                        <p className="text-xl text-slate-200 font-medium leading-relaxed">
                            {selectedProject.detailedDescription || selectedProject.description}
                        </p>
                      </div>
                      
                      {/* COLLAPSIBLE TECH BREAKDOWN */}
                      {selectedProject.technicalDetails && (
                          <div className="border border-white/10 rounded-xl overflow-hidden bg-white/5 hover:border-white/20 transition-colors hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                              <button 
                                onClick={() => setIsTechOpen(!isTechOpen)}
                                className="w-full flex items-center justify-start gap-5 p-8 hover:bg-white/5 transition-colors group text-left"
                              >
                                  {/* ARROW ICON FIRST */}
                                  <div className={`w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:border-fuchsia-600 group-hover:text-fuchsia-500 ${isTechOpen ? 'bg-white/10 text-white rotate-90' : 'text-white/50'}`}>
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                  </div>
                                  <span className="font-bold text-white text-lg group-hover:text-fuchsia-500 transition-colors">How it works</span>
                              </button>
                              
                              <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isTechOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                  <div className="p-8 pt-0 pl-[4.5rem] text-slate-300 leading-relaxed text-lg border-t border-transparent">
                                      <div className="h-[1px] w-full bg-white/10 mb-6"></div>
                                      {selectedProject.technicalDetails}
                                  </div>
                              </div>
                          </div>
                      )}
                  </div>

                  {/* RIGHT COLUMN: KEY INFO */}
                  <div className="space-y-12">
                      
                      {/* TECH STACK */}
                      <div>
                          <h4 className="text-sm font-bold text-fuchsia-600 uppercase tracking-widest mb-6 border-b border-white/10 pb-2">Tech Stack</h4>
                          <div className="flex flex-wrap gap-3">
                              {selectedProject.tags.map(tag => (
                                  <span key={tag} className="px-4 py-2 bg-slate-900 border border-white/10 rounded-lg text-sm font-bold text-slate-200 hover:border-fuchsia-600 hover:text-white transition-colors hover:shadow-[0_0_10px_rgba(192,38,211,0.3)]">
                                      {tag}
                                  </span>
                              ))}
                          </div>
                      </div>

                      {/* FEATURES LIST */}
                      {selectedProject.features && (
                         <div>
                            <h4 className="text-sm font-bold text-fuchsia-600 uppercase tracking-widest mb-6 border-b border-white/10 pb-2">Key Features</h4>
                            <ul className="space-y-4">
                                {selectedProject.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-4 text-base font-medium text-slate-300 group hover:text-white transition-colors">
                                        <span className="text-fuchsia-600 mt-1.5 text-xs">●</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                         </div>
                      )}

                      {/* ACTIONS */}
                      <div className="flex flex-col gap-5 pt-4">
                          {selectedProject.demoUrl ? (
                            <a href={selectedProject.demoUrl} className="w-full py-5 bg-white text-black font-black text-center rounded-lg hover:bg-fuchsia-600 hover:text-white transition-all uppercase tracking-widest text-sm shadow-lg hover:shadow-[0_0_20px_rgba(192,38,211,0.6)] transform hover:-translate-y-1">
                                Live Demo
                            </a>
                          ) : (
                            <button disabled className="w-full py-5 bg-slate-900 border border-white/10 text-white/40 font-black text-center rounded-lg cursor-not-allowed uppercase tracking-widest text-sm">
                                {selectedProject.category.includes('COMING SOON') ? 'IN DEVELOPMENT' : 'PRIVATE / CLASSIFIED'}
                            </button>
                          )}
                          
                          {selectedProject.repoUrl ? (
                            <a href={selectedProject.repoUrl} className="w-full py-5 bg-transparent border-2 border-white/20 text-white font-black text-center rounded-lg hover:bg-white/10 hover:border-white transition-all uppercase tracking-widest text-sm hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transform hover:-translate-y-1">
                                Source Code
                            </a>
                          ) : (
                            <button disabled className="w-full py-5 bg-transparent border border-white/5 text-white/20 font-black text-center rounded-lg cursor-not-allowed uppercase tracking-widest text-sm">
                                SOURCE LOCKED
                            </button>
                          )}
                      </div>

                  </div>
              </div>
           </div>
        </div>
      )}

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Projects;
