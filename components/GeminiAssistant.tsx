
import React, { useState, useRef, useEffect } from 'react';
import { getGeminiResponse } from '../services/geminiService';

const GeminiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: "Hello. I am Lori's AI Assistant. Ask me anything about her studies or skills." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const response = await getGeminiResponse(userMsg);
    setMessages(prev => [...prev, { role: 'ai', text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[60]">
      {isOpen ? (
        <div className="w-80 md:w-96 bg-slate-950 border border-white/10 rounded-none flex flex-col shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden">
          {/* Header */}
          <div className="bg-slate-900 p-5 border-b border-fuchsia-600/30 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-fuchsia-600 animate-ping"></div>
              <span className="font-display font-bold text-[10px] tracking-[0.3em] text-white uppercase">Lori's AI Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white transition-colors">
              ✕
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="h-80 overflow-y-auto p-5 space-y-6 bg-slate-950 scrollbar-thin">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 text-[11px] font-medium leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-white text-slate-950 font-bold' 
                    : 'bg-slate-900 text-slate-300 border-l-2 border-fuchsia-600'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-900 p-4 border-l-2 border-purple-400 text-purple-400 flex gap-1">
                  <div className="w-1.5 h-1.5 bg-purple-400 animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-purple-400 animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-purple-400 animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-5 bg-slate-900 border-t border-white/5 flex gap-3">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="ASK ABOUT ME..."
              className="flex-grow bg-slate-950 border border-white/10 focus:border-fuchsia-600 outline-none p-3 text-[10px] font-display tracking-widest text-white"
            />
            <button 
              onClick={handleSend}
              className="bg-white text-slate-950 px-4 py-2 font-black text-[10px] tracking-widest hover:bg-fuchsia-600 hover:text-white transition-all"
            >
              SEND
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="group relative w-20 h-20 bg-slate-950 border-2 border-fuchsia-600 flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95 overflow-hidden"
        >
          <div className="absolute inset-0 bg-fuchsia-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
          <div className="relative z-10 text-2xl font-display font-black text-white">AI</div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-purple-400"></div>
        </button>
      )}
    </div>
  );
};

export default GeminiAssistant;
