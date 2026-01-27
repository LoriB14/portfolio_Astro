
import React, { useState } from 'react';

interface NavbarProps {
  activeSection: string;
  isHidden?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection, isHidden = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'education', label: 'EDUCATION' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const resetToHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      window.location.hash = 'home';
    }, 500);
    setMobileMenuOpen(false);
  };

  return (
    <>
    <nav className={`fixed top-0 left-0 w-full z-50 px-4 sm:px-6 py-3 sm:py-6 flex justify-between items-center bg-slate-950/80 backdrop-blur-2xl border-b border-white/10 transition-transform duration-500 ease-in-out ${isHidden ? '-translate-y-32' : 'translate-y-0'}`}>
      <div className="flex items-center gap-3 sm:gap-5 group cursor-pointer" onClick={resetToHome}>
        <div className="relative">
          <div className="w-10 h-10 sm:w-16 sm:h-16 border-2 border-fuchsia-600 flex items-center justify-center transition-all group-hover:bg-fuchsia-600 group-hover:rotate-45 duration-500 group-hover:shadow-[0_0_15px_#c026d3]">
            <span className="font-display font-black text-white text-lg sm:text-2xl group-hover:-rotate-45 transition-transform">LB</span>
          </div>
        </div>
        <div className="hidden sm:block">
          <h1 className="font-display font-bold tracking-tighter text-xl sm:text-3xl leading-none uppercase text-white">Lori <span className="text-fuchsia-500 text-glow-fuchsia">Battouk</span></h1>
          <p className="text-[8px] sm:text-[10px] tracking-[0.3em] font-bold text-purple-300 uppercase mt-1">Computer Science @ York</p>
        </div>
      </div>

      <div className="hidden lg:flex gap-10">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className={`font-display text-[11px] tracking-[0.2em] font-bold transition-all hover:text-fuchsia-400 relative py-2 hover:shadow-[0_0_10px_rgba(192,38,211,0.2)] ${
              activeSection === item.id ? 'text-fuchsia-500' : 'text-white'
            }`}
          >
            {item.label}
            {activeSection === item.id && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-fuchsia-600 box-shadow-[0_0_10px_#c026d3]"></span>
            )}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4 sm:gap-8">
        {/* Desktop Contact Button */}
        <button 
          onClick={() => scrollTo('contact')}
          className="hidden lg:block bg-fuchsia-600 text-white px-8 py-3 font-display font-black text-[10px] tracking-[0.3em] uppercase hover:bg-white hover:text-fuchsia-600 transition-all border-2 border-fuchsia-600 shadow-[0_0_20px_rgba(192,38,211,0.5)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)]"
        >
          CONTACT
        </button>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
    </nav>
    
    {/* Mobile Menu Overlay */}
    {mobileMenuOpen && (
      <div className="lg:hidden fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-xl" onClick={() => setMobileMenuOpen(false)}>
        <div className="flex flex-col items-center justify-center h-full gap-6 px-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`font-display text-xl tracking-[0.3em] font-black transition-all hover:text-fuchsia-400 ${
                activeSection === item.id ? 'text-fuchsia-500' : 'text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    )}
    </>
  );
};

export default Navbar;
