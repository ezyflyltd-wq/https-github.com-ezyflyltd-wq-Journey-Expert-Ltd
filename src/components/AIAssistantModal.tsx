import React, { useState } from 'react';
import {
  Bot,
  User,
  Send,
  X,
  Plane,
  GraduationCap,
  FileCheck2,
} from 'lucide-react';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  sources?: string[];
  timestamp: string;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({ isOpen, onClose }) => {
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: `Hello! I am your **Journey Expert Ltd. (JEL) AI Assistant**. 

How can I assist you today?
- ✈️ **Flights**: Compare Sabre, Amadeus & Galileo live fares from Dhaka (DAC)
- 🛂 **Visa Guidance**: Document requirements for UK, Canada, Schengen & Saudi Arabia
- 🎓 **Study Abroad**: University course matching & IELTS scholarship guidance
- 🕋 **Umrah & Packages**: Executive 5-star packages in Makkah & Madinah`,
      sources: ['JEL Knowledge Base v2.4', 'Multi-GDS Live Engine'],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: query }),
      });

      const data = await res.json();

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.reply || 'Apologies, I could not retrieve information at the moment.',
        sources: data.sources || ['JEL AI Gateway (Gemini 3.6 Flash)'],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('Error querying AI assistant:', err);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: 'I am currently experiencing network latency. Here is standard guidance: For flight & visa inquiries, please contact our 24/7 hotline at +880 1926-400400 or office at +880 2 9830404.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#093F31]/60 backdrop-blur-md p-3 sm:p-4">
      <div className="bg-white border border-[#ECECEC] rounded-3xl max-w-2xl w-full h-[620px] max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-[#111111]">
        {/* Modal Header */}
        <div className="bg-[#093F31] px-6 py-4 border-b border-[#0B6B53] flex items-center justify-between text-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 p-0.5 border border-[#C7A44D]/40 flex items-center justify-center">
              <Bot className="w-6 h-6 text-[#C7A44D]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-extrabold text-white text-base font-serif">JEL AI Travel Assistant</h3>
                <span className="bg-[#C7A44D] text-[#093F31] text-[10px] font-black px-2 py-0.5 rounded-full">
                  Gemini 3.6
                </span>
              </div>
              <p className="text-[11px] text-emerald-200/80 font-medium">Sabre • Amadeus • Visa Rules • Study Abroad</p>
            </div>
          </div>

          <button aria-label="Close AI assistant" onClick={onClose} className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="bg-[#F8FAF9] px-4 py-2.5 border-b border-[#ECECEC] flex items-center space-x-2 overflow-x-auto text-[11px] text-[#111111]">
          <span className="text-[#666666] shrink-0 font-bold">Quick Ask:</span>
          <button
            onClick={() => handleSendMessage('What are the UK Student Visa bank statement requirements for Bangladeshi passport holders?')}
            className="shrink-0 bg-white hover:bg-[#0B6B53] hover:text-white border border-[#ECECEC] text-[#111111] px-3 py-1 rounded-xl transition-all flex items-center space-x-1 font-semibold"
          >
            <FileCheck2 className="w-3.5 h-3.5 text-[#0B6B53]" />
            <span>UK Student Visa Checklist</span>
          </button>

          <button
            onClick={() => handleSendMessage('Compare Biman vs Emirates flight baggage rules to London Heathrow')}
            className="shrink-0 bg-white hover:bg-[#0B6B53] hover:text-white border border-[#ECECEC] text-[#111111] px-3 py-1 rounded-xl transition-all flex items-center space-x-1 font-semibold"
          >
            <Plane className="w-3.5 h-3.5 text-[#C7A44D]" />
            <span>Flight Baggage Rules</span>
          </button>

          <button
            onClick={() => handleSendMessage('Recommend top universities in Canada for MSc Computer Science under $25k tuition')}
            className="shrink-0 bg-white hover:bg-[#0B6B53] hover:text-white border border-[#ECECEC] text-[#111111] px-3 py-1 rounded-xl transition-all flex items-center space-x-1 font-semibold"
          >
            <GraduationCap className="w-3.5 h-3.5 text-[#0B6B53]" />
            <span>Canada MSc CS Universities</span>
          </button>
        </div>

        {/* Message Thread Body */}
        <div className="flex-grow p-4 sm:p-6 overflow-y-auto space-y-4 text-xs">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-xl bg-[#093F31] flex items-center justify-center shrink-0 shadow-sm">
                  <Bot className="w-4 h-4 text-[#C7A44D]" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-4 space-y-2 ${
                  msg.sender === 'user'
                    ? 'bg-[#0B6B53] text-white font-medium rounded-tr-none'
                    : 'bg-[#F8FAF9] border border-[#ECECEC] text-[#111111] rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-line leading-relaxed">{msg.text}</div>

                {msg.sources && (
                  <div className="pt-2 border-t border-[#ECECEC] flex flex-wrap items-center gap-1.5 text-[10px] text-[#666666]">
                    <span className="font-bold">Sources:</span>
                    {msg.sources.map((s, i) => (
                      <span key={i} className="bg-white px-2 py-0.5 rounded border border-[#ECECEC] text-[#093F31] font-semibold">
                        {s}
                      </span>
                    ))}
                  </div>
                )}

                <div className="text-[9px] text-right opacity-60 mt-1">{msg.timestamp}</div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-[#0B6B53] flex items-center justify-center shrink-0 text-white font-bold shadow-sm">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center space-x-3 text-[#666666] text-xs">
              <div className="w-8 h-8 rounded-xl bg-[#093F31] flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-[#C7A44D] animate-spin" />
              </div>
              <div className="bg-[#F8FAF9] border border-[#ECECEC] px-4 py-2.5 rounded-2xl text-[#111111] font-semibold animate-pulse">
                Analyzing request via Gemini 3.6 Flash & Multi-GDS databases...
              </div>
            </div>
          )}
        </div>

        {/* Input Footer */}
        <div className="p-4 bg-[#F8FAF9] border-t border-[#ECECEC]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center space-x-2"
          >
            <label htmlFor="ai-assistant-query" className="sr-only">Ask the AI travel assistant</label>
            <input
              id="ai-assistant-query"
              name="query"
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask anything about flights, hotels, visa, or study abroad..."
              className="flex-grow bg-white border border-[#ECECEC] rounded-2xl px-4 py-3 text-xs text-[#111111] placeholder-[#666666] font-semibold focus:outline-none focus:border-[#0B6B53]"
            />
            <button
              type="submit"
              aria-label={loading ? 'Sending message' : 'Send message'}
              disabled={loading}
              className="p-3 bg-[#0B6B53] hover:bg-[#093F31] text-white font-bold rounded-2xl transition-all shadow-md disabled:opacity-50"
            >
              <Send className="w-4 h-4 text-[#C7A44D]" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
