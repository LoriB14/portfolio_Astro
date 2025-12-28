
import React from 'react';

interface NavbarProps {
  activeSection: string;
  isHidden?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection, isHidden = false }) => {
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
  };

  const resetToHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      window.location.hash = 'home';
    }, 500);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center bg-slate-950/80 backdrop-blur-2xl border-b border-white/10 transition-transform duration-500 ease-in-out ${isHidden ? '-translate-y-32' : 'translate-y-0'}`}>
      <div className="flex items-center gap-4 group cursor-pointer" onClick={resetToHome}>
        <div className="relative">
          <div className="w-12 h-12 border-2 border-fuchsia-600 flex items-center justify-center transition-all group-hover:bg-fuchsia-600 group-hover:rotate-45 duration-500 group-hover:shadow-[0_0_15px_#c026d3]">
            <span className="font-display font-black text-white text-xl group-hover:-rotate-45 transition-transform">LB</span>
          </div>
        </div>
        <div className="hidden sm:block">
          <h1 className="font-display font-bold tracking-tighter text-2xl leading-none uppercase text-white">Lori <span className="text-fuchsia-500 text-glow-fuchsia">Battouk</span></h1>
          <p className="text-[9px] tracking-[0.3em] font-bold text-purple-300 uppercase mt-1">Computer Science @ York</p>
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

      <div className="flex items-center gap-8">
        <button 
          onClick={() => scrollTo('contact')}
          className="bg-fuchsia-600 text-white px-8 py-3 font-display font-black text-[10px] tracking-[0.3em] uppercase hover:bg-white hover:text-fuchsia-600 transition-all border-2 border-fuchsia-600 shadow-[0_0_20px_rgba(192,38,211,0.5)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)]"
        >
          CONTACT
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
