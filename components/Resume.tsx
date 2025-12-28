
import React from 'react';

interface ResumeProps {
  isOpen: boolean;
  onClose: () => void;
}

const Resume: React.FC<ResumeProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-slate-950/95 backdrop-blur-xl animate-in fade-in duration-300 print:bg-white print:overflow-visible print:fixed print:inset-0 print:z-[200]">
      
      {/* Print-specific styles to ensure one-page fit */}
      <style>{`
        @media print {
          @page { margin: 0.4cm; size: letter; }
          body { -webkit-print-color-adjust: exact; }
          .no-print { display: none !important; }
          .print-container { 
            box-shadow: none !important; 
            margin: 0 !important; 
            padding: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
          }
          /* Compact Typography for single page fit */
          h1 { font-size: 24pt !important; margin-bottom: 2pt !important; line-height: 1 !important; }
          p.location { font-size: 10pt !important; margin-bottom: 4pt !important; }
          .contact-info { font-size: 9pt !important; margin-bottom: 8pt !important; }
          h2 { 
            font-size: 12pt !important; 
            margin-bottom: 4pt !important; 
            padding-bottom: 2pt !important; 
            margin-top: 8pt !important; 
            border-bottom-width: 1px !important;
          }
          h3 { font-size: 10pt !important; font-weight: bold !important; }
          .job-meta { font-size: 9pt !important; }
          .text-sm { font-size: 9pt !important; }
          .text-xs { font-size: 8pt !important; }
          ul li { font-size: 9pt !important; line-height: 1.2 !important; margin-bottom: 1pt !important; }
          section { margin-bottom: 4pt !important; }
          .mb-3, .mb-4, .mb-6 { margin-bottom: 4pt !important; }
          
          /* Hide scrollbars and extra chrome */
          ::-webkit-scrollbar { display: none; }
        }
      `}</style>

      <div className="min-h-screen w-full max-w-4xl mx-auto p-4 md:p-12 relative flex items-center justify-center print:p-0 print:block print:h-auto">
        
        {/* Actions - Hidden in Print */}
        <div className="fixed top-6 right-6 z-[110] flex gap-4 no-print">
            <button 
              onClick={onClose}
              className="flex items-center gap-2 bg-fuchsia-600 text-white px-6 py-3 font-display font-bold text-xs tracking-widest uppercase hover:bg-fuchsia-700 transition-colors shadow-[0_0_20px_rgba(192,38,211,0.5)] border border-fuchsia-600"
            >
              Close ✕
            </button>
        </div>

        {/* Document Sheet */}
        <div className="print-container bg-white text-slate-900 p-8 md:p-12 shadow-2xl animate-in slide-in-from-bottom-8 duration-500 max-w-[850px] w-full relative mt-16 md:mt-0 mb-16 print:mt-0 print:mb-0">
          
          {/* Header */}
          <header className="text-center border-b-2 border-slate-900 pb-4 mb-4 print:pb-2 print:mb-2">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 uppercase tracking-widest mb-1">Lori Battouk</h1>
            <p className="location text-slate-600 font-medium mb-3 text-lg">Aurora, Ontario</p>
            <div className="contact-info flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm font-bold text-slate-700">
              <span className="flex items-center gap-1">647-395-0688</span>
              <span className="hidden md:inline text-slate-300">|</span>
              <a href="mailto:lbattouk@gmail.com" className="hover:text-fuchsia-600 transition-colors flex items-center gap-1">lbattouk@gmail.com</a>
              <span className="hidden md:inline text-slate-300">|</span>
              <a href="https://linkedin.com/in/loribattouk" target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 transition-colors flex items-center gap-1">www.linkedin.com/in/LoriBattouk</a>
              <span className="hidden md:inline text-slate-300">|</span>
              <a href="https://github.com/LoriB14" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors flex items-center gap-1">https://github.com/LoriB14</a>
            </div>
          </header>

          {/* Education */}
          <section className="mb-6">
            <h2 className="text-lg font-bold uppercase border-b border-slate-300 mb-3 pb-1 tracking-wider text-slate-800">Education</h2>
            <div className="mb-2">
              <div className="flex flex-col md:flex-row justify-between md:items-baseline font-bold text-slate-900">
                <h3 className="text-base">York University, Lassonde School of Engineering</h3>
                <span className="text-sm text-slate-600 job-meta">Toronto, ON</span>
              </div>
              <div className="flex flex-col md:flex-row justify-between md:items-baseline text-slate-700 italic">
                <p className="text-sm md:text-base">B.A. Specialized Honours in Computer Science</p>
                <span className="text-sm job-meta">Sep 2024 – Present</span>
              </div>
            </div>
            <div>
              <div className="flex flex-col md:flex-row justify-between md:items-baseline font-bold text-slate-900">
                <h3 className="text-base">Google Data Analytics Professional Certificate</h3>
                <span className="text-sm text-slate-600 job-meta">Google</span>
              </div>
              <div className="flex flex-col md:flex-row justify-between md:items-baseline text-slate-700 italic">
                <p className="text-sm md:text-base">Professional Certificate in Data Analytics and Business Insights</p>
                <span className="text-sm job-meta">Nov 2025 – Present</span>
              </div>
            </div>
          </section>

          {/* Experience */}
          <section className="mb-6">
            <h2 className="text-lg font-bold uppercase border-b border-slate-300 mb-3 pb-1 tracking-wider text-slate-800">Experience</h2>
            
            <div className="mb-3">
              <div className="flex flex-col md:flex-row justify-between md:items-baseline font-bold text-slate-900">
                <h3 className="text-base">Administrative Assistant (IT and Systems Support)</h3>
                <span className="text-sm text-slate-600 job-meta">June 2022 – Present</span>
              </div>
              <div className="text-slate-700 italic mb-1 text-sm">The Wellness Group Aurora | Aurora, Ontario</div>
              <ul className="list-disc list-outside ml-5 text-sm text-slate-700 space-y-0.5">
                <li>Handled front-desk and office admin tasks while helping staff troubleshoot basic tech problems like software setup, printer issues, and Wi-Fi errors.</li>
                <li>Organized appointment schedules and patient data using Excel sheets and forms to reduce booking errors and save time for the team.</li>
                <li>Helped the clinic move from paper files to digital record-keeping, which made day-to-day operations faster and more organized.</li>
              </ul>
            </div>

            <div className="mb-3">
              <div className="flex flex-col md:flex-row justify-between md:items-baseline font-bold text-slate-900">
                <h3 className="text-base">Special Service Desk (Technical Support)</h3>
                <span className="text-sm text-slate-600 job-meta">June 2023 – Sept 2025</span>
              </div>
              <div className="text-slate-700 italic mb-1 text-sm">Home Depot Aurora | Aurora, Ontario</div>
              <ul className="list-disc list-outside ml-5 text-sm text-slate-700 space-y-0.5">
                <li>Assisted customers and coworkers with special orders, online requests, and checkout problems at the Special Services Desk.</li>
                <li>Resolved order system issues like missing data or pricing errors using internal tools and strong attention to detail.</li>
                <li>Worked closely with the management team to keep things running smoothly, especially during high-traffic hours, while maintaining strong customer service.</li>
              </ul>
            </div>
          </section>

          {/* Projects */}
          <section className="mb-6">
            <h2 className="text-lg font-bold uppercase border-b border-slate-300 mb-3 pb-1 tracking-wider text-slate-800">Projects</h2>
            
            <div className="mb-2">
              <div className="flex flex-col md:flex-row justify-between md:items-baseline font-bold text-slate-900">
                <h3 className="text-base">Station Parking Lot Tracker <span className="text-sm font-normal text-slate-500 mx-2">| Python, Flask, SQLite, HTML/CSS, JavaScript</span></h3>
              </div>
              <div className="text-xs text-slate-500 mb-0.5 italic">Sept 2025</div>
              <ul className="list-disc list-outside ml-5 text-sm text-slate-700 space-y-0.5">
                <li>Created a parking lot tracker app for GO Stations that uses existing lot numbers already displayed at each site.</li>
                <li>The app lets users check real-time parking availability by pulling info from existing data sources.</li>
                <li>Designed a simple dashboard to show open and occupied lots, helping users find spots faster.</li>
              </ul>
            </div>

            <div className="mb-2">
              <div className="flex flex-col md:flex-row justify-between md:items-baseline font-bold text-slate-900">
                <h3 className="text-base">PackPal – AI-Powered Travel Packing Assistant</h3>
              </div>
              <div className="text-sm font-normal text-slate-500 italic mb-0.5">Next.js, TypeScript, Tailwind CSS, NextAuth, Drizzle ORM, PostgreSQL, Gemini 2.5, Vercel, GoDaddy</div>
              <div className="text-xs text-slate-500 mb-0.5 italic">Oct 2025</div>
              <ul className="list-disc list-outside ml-5 text-sm text-slate-700 space-y-0.5">
                <li>Developed an AI-powered web app that creates smart packing lists using Gemini 2.5, based on weather, trip duration, and location.</li>
                <li>Implemented secure user authentication with NextAuth and a PostgreSQL database managed via Drizzle ORM.</li>
                <li>Integrated collaborative trip planning and real-time checklist sync using Next.js Server Actions.</li>
                <li>Deployed full-stack application on Vercel with a custom GoDaddy domain for live demo at NewHacks 2025.</li>
              </ul>
            </div>

            <div className="mb-2">
              <div className="flex flex-col md:flex-row justify-between md:items-baseline font-bold text-slate-900">
                <h3 className="text-base">6ixAssist – AI‑Powered Resource Finder <span className="text-sm font-normal text-slate-500 mx-2">| React, Tailwind CSS, Gemini API, OpenStreetMap, TypeScript</span></h3>
              </div>
              <div className="text-xs text-slate-500 mb-0.5 italic">Nov 2025</div>
              <ul className="list-disc list-outside ml-5 text-sm text-slate-700 space-y-0.5">
                <li>Won <strong>1st Place</strong> at ElleHacks Hackathon for the app concept and implementation.</li>
                <li>Built a web app to help people in Toronto find nearby food banks, shelters, and community resources by typing in natural‑language requests.</li>
                <li>Integrated Gemini API for natural language processing and OpenStreetMap API for geolocation and routing.</li>
                <li>Developed a responsive UI with Tailwind CSS and React, providing real‑time resource data.</li>
                <li>Implemented future features like real‑time updates and multi‑language support for broader accessibility.</li>
              </ul>
            </div>
          </section>

          {/* Technical Skills */}
          <section className="mb-6">
            <h2 className="text-lg font-bold uppercase border-b border-slate-300 mb-3 pb-1 tracking-wider text-slate-800">Technical Skills</h2>
            <div className="text-sm text-slate-700 space-y-1">
              <div className="flex flex-col md:flex-row gap-1 md:gap-4"><strong className="text-slate-900 min-w-[140px]">Languages:</strong> <span>Python, Java, C, HTML/CSS, JavaScript, SQL</span></div>
              <div className="flex flex-col md:flex-row gap-1 md:gap-4"><strong className="text-slate-900 min-w-[140px]">Developer Tools:</strong> <span>VS Code, Eclipse, Google Cloud Platform, Android Studio</span></div>
              <div className="flex flex-col md:flex-row gap-1 md:gap-4"><strong className="text-slate-900 min-w-[140px]">Technologies/Frameworks:</strong> <span>Linux, Jenkins, GitHub, JUnit, WordPress</span></div>
            </div>
          </section>

          {/* Leadership */}
          <section>
            <h2 className="text-lg font-bold uppercase border-b border-slate-300 mb-3 pb-1 tracking-wider text-slate-800">Leadership / Extracurricular</h2>
            <div className="mb-2">
              <div className="flex flex-col md:flex-row justify-between md:items-baseline font-bold text-slate-900">
                <h3 className="text-base">Homenetmen Toronto</h3>
                <span className="text-sm text-slate-600 job-meta">2020 – Present</span>
              </div>
              <div className="text-slate-700 italic mb-1 text-sm">Scout leader/General Member</div>
              <ul className="list-disc list-outside ml-5 text-sm text-slate-700 space-y-0.5">
                <li>Organized and led group activities and workshops; gained leadership, problem-solving, and teamwork skills.</li>
                <li>Developed communication and mentoring experience applicable to tech and group project environments.</li>
              </ul>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Resume;
