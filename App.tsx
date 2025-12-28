
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import GeminiAssistant from './components/GeminiAssistant';
import Contact from './components/Contact';
import Intro from './components/Intro';
import Resume from './components/Resume';

const App: React.FC = () => {
  const [isBooted, setIsBooted] = useState(false);
  // Default to true so we bypass the "Locked" game briefing state
  const [accessGranted, setAccessGranted] = useState(true);
  const [gameActive, setGameActive] = useState(false); // Track if game is running to hide UI
  const [activeSection, setActiveSection] = useState('home');
  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    if (!accessGranted) return;

    const handleScroll = () => {
      // Updated order for scroll tracking
      const sections = ['home', 'about', 'projects', 'education', 'skills', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPos >= element.offsetTop && scrollPos < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [accessGranted]);

  useEffect(() => {
    if (isResumeOpen) {
      document.body.style.overflow = 'hidden';
    } else if (!gameActive && !isProjectOpen) {
      document.body.style.overflow = '';
    }
  }, [isResumeOpen, gameActive, isProjectOpen]);

  if (!isBooted) {
    return <Intro onComplete={() => setIsBooted(true)} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white cyber-grid animate-in fade-in duration-1000">
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent pointer-events-none"></div>
      
      {/* Resume Overlay */}
      <Resume isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

      {/* Navbar is only visible after access is granted AND game is NOT active */}
      {accessGranted && !gameActive && (
        <div className="animate-in slide-in-from-top duration-1000">
          <Navbar activeSection={activeSection} isHidden={isProjectOpen || isResumeOpen} />
        </div>
      )}
      
      <main className="relative z-10">
        <section id="home">
          <Hero 
            isLocked={!accessGranted} 
            onUnlock={() => setAccessGranted(true)} 
            onGameStatusChange={setGameActive}
          />
        </section>
        
        {/* Content sections are hidden/unmounted until access is granted */}
        {accessGranted && (
          <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
            <section id="about" className="py-32 px-6 max-w-7xl mx-auto">
              <About />
            </section>

            <section id="projects" className="py-32 px-6 max-w-7xl mx-auto">
              <Projects onProjectStateChange={setIsProjectOpen} />
            </section>
            
            <section id="education" className="py-32 px-6 max-w-7xl mx-auto">
              <Education />
            </section>

            <section id="skills" className="py-32 px-6 max-w-7xl mx-auto">
              <Skills />
            </section>

            <section id="contact" className="py-32 px-6 max-w-7xl mx-auto">
              <Contact />
            </section>
          </div>
        )}
      </main>

      {accessGranted && (
        <>
          <footer className="py-12 px-6 border-t border-white/10 bg-slate-950/80 backdrop-blur-md relative z-10 animate-in fade-in duration-1000">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 border border-fuchsia-600 flex items-center justify-center">
                  <span className="font-bold text-fuchsia-600">LB</span>
                </div>
                <span className="font-display font-bold tracking-tighter text-xl text-white">LORI <span className="text-fuchsia-500">BATTOUK</span></span>
              </div>
              <p className="text-purple-200 text-[10px] font-bold tracking-widest uppercase">Software Engineer | Built with React & Tailwind</p>
              <div className="flex gap-8 items-center">
                <a href="https://github.com/LoriB14" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-fuchsia-500 transition-colors uppercase text-[10px] font-black tracking-widest hover:shadow-[0_0_10px_rgba(192,38,211,0.5)]">GITHUB</a>
                <a href="https://www.linkedin.com/in/loribattouk/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-fuchsia-500 transition-colors uppercase text-[10px] font-black tracking-widest hover:shadow-[0_0_10px_rgba(192,38,211,0.5)]">LINKEDIN</a>
                <button 
                  onClick={() => setIsResumeOpen(true)}
                  className="text-white/60 hover:text-fuchsia-500 transition-colors uppercase text-[10px] font-black tracking-widest hover:shadow-[0_0_10px_rgba(192,38,211,0.5)]"
                >
                  RESUME
                </button>
              </div>
            </div>
          </footer>
          <GeminiAssistant />
        </>
      )}
    </div>
  );
};

export default App;
