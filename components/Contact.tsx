
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      const response = await fetch('https://formsubmit.co/lbattouk@gmail.com', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setStatus('sent');
        form.reset();
      } else {
        alert('Failed to send message. Please try again or email me directly.');
        setStatus('idle');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again or email me directly.');
      setStatus('idle');
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-6 mb-16">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black tracking-tighter uppercase text-white">Contact Me</h2>
        <div className="flex-grow h-[1px] bg-gradient-to-r from-fuchsia-600/50 to-transparent"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        <div className="space-y-12">
          <div>
            <h3 className="text-2xl sm:text-3xl font-display font-black text-white mb-6 uppercase tracking-tight">Get In Touch</h3>
            <p className="text-purple-100 leading-relaxed max-w-lg text-lg">
              Have a question, an opportunity, or just want to say hello? My inbox is always open. Feel free to reach out anytime.
            </p>
          </div>
          
          <div className="space-y-6">
            <a href="mailto:lbattouk@gmail.com" className="group flex items-center gap-6 cursor-pointer p-4 hover:bg-white/5 transition-colors border border-white/10">
              <div className="w-14 h-14 bg-slate-900 flex items-center justify-center group-hover:border-fuchsia-600 transition-all border border-white/20 text-2xl text-white">✉️</div>
              <div>
                <p className="text-[9px] font-bold text-white/60 uppercase tracking-[0.3em] mb-1">Direct Email</p>
                <p className="font-display font-bold text-white group-hover:text-fuchsia-500 transition-colors">lbattouk@gmail.com</p>
              </div>
            </a>
            <a href="https://www.linkedin.com/in/loribattouk/" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-6 cursor-pointer p-4 hover:bg-white/5 transition-colors border border-white/10">
              <div className="w-14 h-14 bg-slate-900 flex items-center justify-center group-hover:border-purple-500 transition-all border border-white/20 text-2xl text-white">🔗</div>
              <div>
                <p className="text-[9px] font-bold text-white/60 uppercase tracking-[0.3em] mb-1">LinkedIn</p>
                <p className="font-display font-bold text-white group-hover:text-purple-400 transition-colors">linkedin.com/in/loribattouk</p>
              </div>
            </a>
          </div>
        </div>

        <div className="bg-slate-900/50 p-6 sm:p-10 border border-white/10 relative backdrop-blur-sm">
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-fuchsia-600"></div>
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-purple-400"></div>
          
          {status === 'sent' ? (
            <div className="py-24 text-center">
              <h4 className="text-2xl font-display font-black text-white mb-12 uppercase">Message Received</h4>
              <button 
                onClick={() => setStatus('idle')}
                className="mt-12 text-[10px] font-black text-fuchsia-500 hover:text-white tracking-[0.4em] uppercase underline underline-offset-8 transition-all"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Hidden fields for FormSubmit configuration */}
              <input type="hidden" name="_subject" value="New Portfolio Contact Form Submission" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              
              <div className="space-y-2">
                <label className="text-[9px] font-bold text-white/60 uppercase tracking-[0.4em]">Full Name</label>
                <input required type="text" name="name" placeholder="NAME" className="w-full bg-slate-950 border border-white/10 focus:border-fuchsia-600 outline-none p-4 font-display text-xs tracking-widest text-white transition-all placeholder-white/30" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-bold text-white/60 uppercase tracking-[0.4em]">Email</label>
                <input required type="email" name="email" placeholder="EMAIL" className="w-full bg-slate-950 border border-white/10 focus:border-purple-500 outline-none p-4 font-display text-xs tracking-widest text-white transition-all placeholder-white/30" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-bold text-white/60 uppercase tracking-[0.4em]">Message</label>
                <textarea required rows={4} name="message" placeholder="MESSAGE..." className="w-full bg-slate-950 border border-white/10 focus:border-fuchsia-600 outline-none p-4 font-display text-xs tracking-widest text-white transition-all resize-none placeholder-white/30"></textarea>
              </div>
              
              <button type="submit" disabled={status === 'sending'} className="w-full bg-white text-slate-950 font-display font-black py-3 sm:py-5 uppercase tracking-[0.4em] hover:bg-fuchsia-600 hover:text-white transition-all text-sm">
                {status === 'sending' ? 'MESSAGE SENT' : 'SEND MESSAGE'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
