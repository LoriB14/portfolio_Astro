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

  // Dragging state
  const [position, setPosition] = useState<{x: number, y: number} | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{x: number, y: number} | null>(null);

  // Initialize position
  useEffect(() => {
    // Start at bottom right with some padding for the X button to be visible
    setPosition({ x: window.innerWidth - 400, y: window.innerHeight - 500 });
  }, []);

  // Scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle Dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !dragStartRef.current) return;
      
      const deltaX = e.clientX - dragStartRef.current.x;
      const deltaY = e.clientY - dragStartRef.current.y;
      
      setPosition(prev => {
        if (!prev) return null;
        return {
          x: prev.x + deltaX,
          y: prev.y + deltaY
        };
      });
      
      // Update ref for next delta
      dragStartRef.current = { x: e.clientX, y: e.clientY };
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
      dragStartRef.current = null;
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleDragStart = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

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
    <div className="fixed z-[60]" style={isOpen && position ? { left: position.x, top: position.y } : { bottom: 32, right: 32 }}>
      {isOpen ? (
        <div className="w-72 sm:w-80 md:w-96 bg-slate-950/90 backdrop-blur-xl border border-fuchsia-500/30 rounded-lg flex flex-col shadow-[0_0_40px_-5px_rgba(192,38,211,0.3)] overflow-hidden transition-shadow duration-300">
          {/* Header - Draggable */}
          <div 
            className="bg-slate-900/80 p-4 border-b border-fuchsia-600/30 flex justify-between items-center cursor-move select-none"
            onMouseDown={handleDragStart}
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-fuchsia-400 animate-pulse shadow-[0_0_10px_#e879f9]"></div>
              <span className="font-display font-bold text-[11px] tracking-[0.2em] text-fuchsia-100 uppercase drop-shadow-md">AI Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white transition-colors p-1">
              ✕
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="h-80 overflow-y-auto p-5 space-y-6 bg-transparent scrollbar-thin scrollbar-thumb-fuchsia-900 scrollbar-track-transparent">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 text-[11px] font-medium leading-relaxed rounded-md border ${
                  msg.role === 'user' 
                    ? 'bg-fuchsia-900/20 border-fuchsia-500/30 text-fuchsia-100' 
                    : 'bg-slate-900/50 border-slate-700 text-slate-300'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-900/50 p-4 rounded border border-slate-700 flex gap-1">
                  <div className="w-1.5 h-1.5 bg-fuchsia-400 animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-fuchsia-400 animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-fuchsia-400 animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-slate-900/80 border-t border-white/5 flex gap-2">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask a question..."
              className="flex-grow bg-slate-950/50 border border-white/10 focus:border-fuchsia-500 outline-none p-2 rounded text-[11px] font-sans text-white focus:shadow-[0_0_15px_rgba(192,38,211,0.2)] transition-all"
            />
            <button 
              onClick={handleSend}
              className="bg-fuchsia-700 hover:bg-fuchsia-600 text-white px-4 py-2 rounded font-bold text-[10px] tracking-widest transition-all shadow-lg"
            >
              SEND
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => {
             setIsOpen(true);
             // Ensure position is set when opening if it was null
             if (!position) setPosition({ x: window.innerWidth - 350, y: window.innerHeight - 500 });
          }}
          className="group relative w-12 h-12 sm:w-16 sm:h-16 bg-slate-950 border border-fuchsia-500/50 flex items-center justify-center shadow-[0_0_30px_rgba(192,38,211,0.3)] transition-all hover:scale-110 active:scale-95 rounded-full overflow-hidden"
        >
          <div className="absolute inset-0 bg-fuchsia-600 opacity-10 group-hover:opacity-20 transition-opacity animate-pulse"></div>
          <div className="relative z-10 text-lg sm:text-xl font-display font-black text-fuchsia-100 group-hover:text-white">AI</div>
        </button>
      )}
    </div>
  );
};

export default GeminiAssistant;
