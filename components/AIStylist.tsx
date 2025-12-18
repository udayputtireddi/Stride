
import React, { useState, useRef, useEffect } from 'react';
import { X, Sparkles, ArrowRight, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ChatMessage } from '../types';
import { getStylistResponse } from '../services/geminiService';

interface AIStylistProps {
  isOpen: boolean;
  onClose: () => void;
}

const INITIAL_GREETING: ChatMessage = {
  role: 'model',
  text: "I can help you find the perfect gear based on your skill level and playing style. What sport are you focusing on today?",
  suggestions: ["Best cricket bat for power", "Tennis rackets for control", "Soccer balls for training"]
};

const AIStylist: React.FC<AIStylistProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_GREETING]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen, isLoading]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const historyForService = [...messages, userMessage].map(m => ({ role: m.role, text: m.text }));
    
    const { text: aiText, products, suggestions } = await getStylistResponse(historyForService);
    
    setMessages(prev => [...prev, { 
      role: 'model', 
      text: aiText,
      recommendedProducts: products,
      suggestions: suggestions
    }]);
    setIsLoading(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[420px] shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out bg-[#F2FAD1]">
      {/* Background Gradient matching Brand Highlight (Volt) but lighter for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#27A9F5]/30 via-white/80 to-white pointer-events-none" />

      {/* Header */}
      <div className="pt-8 pb-4 px-6 z-10 flex items-center justify-center relative">
        <div className="flex items-center gap-2">
           <Sparkles className="w-5 h-5 text-black fill-black" />
           <span className="font-bold text-lg tracking-tight">StrideAI</span>
        </div>
        <button onClick={onClose} className="absolute left-6 p-2 hover:bg-black/5 rounded-full transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-grow overflow-y-auto p-4 space-y-6 pb-32 relative z-10 scrollbar-hide">
        {messages.map((msg, index) => (
          <div key={index} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-[fadeInUp_0.4s_ease-out]`}>
            
            {/* Text Bubble */}
            <div className={`max-w-[85%] px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed shadow-sm backdrop-blur-sm ${
                msg.role === 'user' 
                  ? 'bg-white text-black border border-white/50 rounded-br-sm' 
                  : 'bg-white/60 text-gray-900 border border-white/50 rounded-bl-sm'
              }`}>
              {msg.text}
            </div>

            {/* Product Recommendations Carousel */}
            {msg.role === 'model' && msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
              <div className="w-full mt-4 overflow-x-auto scrollbar-hide -mx-4 px-4">
                <div className="flex gap-3 pb-4 px-1">
                  {msg.recommendedProducts.map((product) => (
                    <Link 
                      key={product.id}
                      to={`/product/${product.id}`}
                      onClick={onClose}
                      className="min-w-[220px] w-[220px] bg-white rounded-2xl p-3 shadow-md hover:shadow-lg transition-all duration-300 flex-shrink-0 group block border border-white/50"
                    >
                      <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 mb-3 relative">
                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover mix-blend-multiply" />
                        <div className="absolute bottom-2 right-2 bg-black text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity transform scale-90 group-hover:scale-100">
                            <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                      <h4 className="font-bold text-sm truncate">{product.name}</h4>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-xs text-gray-500 font-medium">{product.category}</p>
                        <p className="font-bold text-sm text-black">${product.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                {/* Feedback */}
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1 px-1 font-medium">
                   <span>StrideAI is always learning</span>
                   <div className="flex gap-2 ml-2">
                      <button className="hover:scale-110 transition-transform"><ThumbsUp className="w-3.5 h-3.5" /></button>
                      <button className="hover:scale-110 transition-transform"><ThumbsDown className="w-3.5 h-3.5" /></button>
                   </div>
                </div>
              </div>
            )}
            
            {/* Suggested Follow-ups */}
            {msg.role === 'model' && msg.suggestions && msg.suggestions.length > 0 && (
                <div className="mt-4 w-full">
                    <div className="flex flex-col items-end gap-2">
                        {msg.suggestions.map((sug, i) => (
                            <button 
                                key={i} 
                                onClick={() => handleSend(sug)}
                                className="bg-white/80 border border-white hover:border-black/10 hover:bg-white text-right px-4 py-2.5 rounded-2xl text-sm font-medium transition-all shadow-sm backdrop-blur-sm active:scale-95"
                            >
                                {sug}
                            </button>
                        ))}
                    </div>
                </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
             <div className="bg-white/60 px-4 py-3 rounded-2xl rounded-bl-sm">
                <div className="flex space-x-1.5">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                </div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Floating Input Area */}
      <div className="absolute bottom-0 left-0 right-0 p-4 pt-12 bg-gradient-to-t from-[#fcfdf7] via-[#fcfdf7] to-transparent z-20">
        <form onSubmit={handleFormSubmit} className="relative w-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-full group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask StrideAI..."
            className="w-full pl-6 pr-14 py-4 bg-white border border-transparent group-hover:border-gray-200 rounded-full focus:outline-none focus:border-black focus:ring-0 transition-all text-base placeholder-gray-400 font-medium"
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-2 bottom-2 aspect-square bg-black text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all flex items-center justify-center"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIStylist;
