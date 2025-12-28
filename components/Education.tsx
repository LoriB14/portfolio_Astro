
import React from 'react';

const Education: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto">
       {/* Section Header */}
       <div className="flex items-end justify-between mb-20 border-b border-white/20 pb-8">
        <div>
           <h2 className="text-5xl md:text-7xl font-display font-black text-white mb-4 tracking-tighter uppercase">Education</h2>
           <p className="text-purple-300 text-sm md:text-lg font-bold tracking-[0.2em] uppercase">Academic & Professional</p>
        </div>
        <div className="hidden md:block text-right">
            <div className="text-sm text-white/80 font-mono">EST. 2024</div>
        </div>
      </div>

      <div className="space-y-16">
        {/* --- Block 1: University Education --- */}
        <div className="group relative bg-slate-900/60 border border-white/20 p-10 md:p-16 rounded-2xl backdrop-blur-sm transition-all duration-500 hover:border-fuchsia-600/60 hover:bg-slate-900/90">
            {/* Visual Corner Accents */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-white/30 group-hover:border-fuchsia-600 transition-colors rounded-tl-xl"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-white/30 group-hover:border-fuchsia-600 transition-colors rounded-br-xl"></div>

            {/* Card Header */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-12 gap-6">
                <div>
                    <h3 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 tracking-tight">York University — Lassonde School of Engineering</h3>
                    <p className="text-xl md:text-2xl text-white font-medium">BSc, Specialized Honours in Computer Science</p>
                </div>
                <div className="px-6 py-3 bg-fuchsia-600/20 border border-fuchsia-600/30 rounded text-fuchsia-400 text-sm md:text-base font-bold tracking-widest uppercase whitespace-nowrap shadow-[0_0_15px_rgba(192,38,211,0.2)]">
                    2024 — Present
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 mb-14">
                {/* Academic Summary */}
                <div className="space-y-8">
                    <p className="text-white leading-relaxed text-lg md:text-xl font-medium border-l-4 border-white/30 pl-6">
                        Second-year Computer Science student building a strong foundation in software development, algorithms, and modern web technologies.
                    </p>
                    <p className="text-white leading-relaxed text-lg md:text-xl font-medium border-l-4 border-white/30 pl-6">
                        My studies combine theory with hands-on projects across Java, JavaScript/React, low-level systems, and problem-solving focused coursework.
                    </p>
                </div>
                
                {/* Coursework List */}
                <div>
                    <h4 className="text-sm md:text-lg font-bold text-white uppercase tracking-widest mb-6 border-b border-white/20 pb-3">Relevant Coursework</h4>
                    <ul className="grid grid-cols-1 gap-y-4 text-base md:text-xl text-white">
                        {[
                            'Data Structures & Algorithms', 
                            'Object-Oriented Programming (Java)', 
                            'Web Development (HTML / CSS / JS / React)', 
                            'Discrete Mathematics', 
                            'Computer Organization', 
                            'Software Design & Architecture'
                        ].map((course) => (
                            <li key={course} className="flex items-center gap-4 group/item">
                                <span className="w-2.5 h-2.5 bg-fuchsia-600 rounded-full group-hover/item:scale-125 transition-transform"></span>
                                <span className="group-hover/item:text-fuchsia-400 transition-colors">{course}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Highlights Checklist */}
            <div className="bg-white/10 rounded-xl p-8 md:p-10 border border-white/10">
                <h4 className="text-sm md:text-lg font-bold text-white uppercase tracking-widest mb-6">Competencies Developed</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base md:text-xl text-white">
                    {[
                        'Built multiple web applications using React',
                        'Strong understanding of OOP principles',
                        'Experience collaborating with Git & GitHub',
                        'Solid debugging, testing, and problem-solving',
                        'Growing focus on UI/UX and polished interfaces'
                    ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                            <svg className="w-6 h-6 text-purple-400 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                            <span>{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* --- Block 2: Professional Certification --- */}
        <div className="group relative bg-slate-900/60 border border-white/20 p-10 md:p-14 rounded-2xl backdrop-blur-sm transition-all duration-500 hover:border-purple-500/60 hover:bg-slate-900/90">
             {/* Visual Corner Accents - Purple */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-white/30 group-hover:border-purple-500 transition-colors rounded-tl-xl"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-white/30 group-hover:border-purple-500 transition-colors rounded-br-xl"></div>

            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-8 gap-6">
                <h3 className="text-2xl md:text-4xl font-display font-bold text-white tracking-tight">Google Data Analytics Professional Certificate</h3>
                <div className="px-6 py-3 bg-purple-500/20 border border-purple-500/30 rounded text-purple-400 text-sm md:text-base font-bold tracking-widest uppercase whitespace-nowrap shadow-[0_0_15px_rgba(147,51,234,0.2)]">
                    2025 — Present
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
                {/* Description */}
                <div className="xl:col-span-1">
                     <p className="text-white leading-relaxed text-lg md:text-xl font-medium">
                        Currently completing the Google Data Analytics Professional Certificate, gaining practical experience in SQL, data cleaning, visualization, and real-world analytical workflows that complement my computer science background.
                    </p>
                </div>
                
                {/* Skills Gained */}
                <div className="xl:col-span-2">
                     <h4 className="text-sm md:text-lg font-bold text-white uppercase tracking-widest mb-6 border-b border-white/20 pb-3">Skills Gained</h4>
                     <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base md:text-xl text-white">
                        {[
                            'SQL & Relational Databases', 
                            'Data Cleaning & Transformation', 
                            'Data Visualization & Dashboards', 
                            'Excel Spreadsheets', 
                            'Introductory Python for Analysis', 
                            'Analytical Thinking'
                        ].map((skill) => (
                            <li key={skill} className="flex items-center gap-3 group/skill">
                                <svg className="w-5 h-5 text-purple-400 flex-shrink-0 group-hover/skill:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                <span className="group-hover/skill:text-purple-300 transition-colors">{skill}</span>
                            </li>
                        ))}
                     </ul>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
export default Education;
