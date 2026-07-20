import React from 'react';
import { MessageSquareCode, X, Send, Bot, RefreshCw, User } from 'lucide-react';
import { Language } from '../types';

interface AIAssistantProps {
  language: Language;
}

interface Message {
  sender: 'ai' | 'user';
  text: string;
}

export default function AIAssistant({ language }: AIAssistantProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [inputValue, setInputValue] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const chatEndRef = React.useRef<HTMLDivElement | null>(null);

  // Initialize with a warm greeting in the selected language
  React.useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          sender: 'ai',
          text: language === 'ar'
            ? 'مرحباً بك! أنا المساعد الذكي لموقع "برمجني" (Barmegny)، كيف يمكنني مساعدتك اليوم في اختيار الحلول المحاسبية، أنظمة الكاشير (POS)، أو منظومات ERP م. يوسف بلح؟'
            : 'Welcome! I am the Barmegny AI assistant. How can I help you navigate through our smart accounting softwares, cashier systems, or ERP programs today?'
        }
      ]);
    }
  }, [language, messages.length]);

  // Scroll to bottom on updates
  React.useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = { sender: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          language,
          history: messages.map(m => ({ role: m.sender === 'ai' ? 'model' : 'user', parts: [{ text: m.text }] }))
        })
      });

      const data = await response.json();
      if (data.reply) {
        setMessages(prev => [...prev, { sender: 'ai', text: data.reply }]);
      } else {
        throw new Error('Invalid response');
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: language === 'ar'
            ? 'معذرةً، حدث خطأ أثناء الاتصال بالخادم الذكي. يرجى مراجعة الاتصال أو مراسلة م. يوسف بلح مباشرة على الواتساب للحصول على استشارة سريعة.'
            : 'Apologies, we encountered a connection issue with our AI nodes. Please try again later or text Eng. Youssef Balah directly on WhatsApp!'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleShortcutClick = (prompt: string) => {
    handleSend(prompt);
  };

  const shortcutsAr = [
    'أريد نظام محاسبة متكامل لشركتي',
    'ما هي ميزات كاشير المطاعم POS؟',
    'كيف أبدأ بطلب مشروع مخصص؟',
    'أريد حلول ذكاء اصطناعي وأتمتة'
  ];

  const shortcutsEn = [
    'I need an ERP accounting system',
    'Tell me about Restaurant POS features',
    'How do I request a new custom project?',
    'What AI services are available?'
  ];

  const shortcuts = language === 'ar' ? shortcutsAr : shortcutsEn;

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer animate-bounce"
        title={language === 'ar' ? 'مساعد الذكاء الاصطناعي لبرمجني' : 'Barmegny AI Assistant'}
      >
        {isOpen ? <X size={24} /> : <MessageSquareCode size={24} />}
      </button>

      {/* Chat Window Frame */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-[350px] sm:w-[400px] h-[500px] bg-white dark:immersive-glass rounded-3xl border border-slate-200 dark:immersive-border shadow-2xl flex flex-col overflow-hidden animate-slideUp">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-white/10 flex items-center justify-center">
                <Bot size={20} className="text-amber-300" />
              </div>
              <div>
                <h4 className="text-sm font-bold">{language === 'ar' ? 'المساعد الذكي لـ برمجني' : 'Barmegny AI Copilot'}</h4>
                <span className="text-[9px] text-slate-200 uppercase tracking-widest">{language === 'ar' ? 'نشط الآن للخدمة' : 'Online & Ready'}</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded text-white/80 hover:text-white hover:bg-white/10 cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-950/20">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {/* AI Icon in bubble */}
                {msg.sender === 'ai' && (
                  <div className="h-7 w-7 rounded-full bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0">
                    <Bot size={14} />
                  </div>
                )}

                {/* Bubble message */}
                <div
                  className={`max-w-[75%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none shadow-lg shadow-blue-500/10'
                      : 'bg-white dark:bg-[#05070a]/60 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-white/10 rounded-tl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>

                {/* User avatar */}
                {msg.sender === 'user' && (
                  <div className="h-7 w-7 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 flex-shrink-0">
                    <User size={12} />
                  </div>
                )}
              </div>
            ))}

            {/* Loading placeholder bubble */}
            {loading && (
              <div className="flex gap-2 justify-start">
                <div className="h-7 w-7 rounded-full bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 flex-shrink-0 animate-spin">
                  <RefreshCw size={12} />
                </div>
                <div className="bg-white dark:bg-[#05070a]/60 p-3 rounded-2xl rounded-tl-none border border-slate-100 dark:border-white/10 shadow-sm text-xs text-slate-400">
                  {language === 'ar' ? 'جاري التفكير وصياغة الرد...' : 'Barmegny AI is typing...'}
                </div>
              </div>
            )}
            <div ref={chatEndRef}></div>
          </div>

          {/* Shortcuts panel */}
          {messages.length < 3 && (
            <div className="p-3 border-t border-slate-100 dark:border-white/10 bg-white dark:bg-transparent space-y-1.5">
              <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold block">
                {language === 'ar' ? 'أسئلة شائعة واقتراحات:' : 'Suggested Quick Prompts:'}
              </span>
              <div className="flex gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin">
                {shortcuts.map((shortcut, i) => (
                  <button
                    key={i}
                    onClick={() => handleShortcutClick(shortcut)}
                    className="flex-shrink-0 bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-600 dark:bg-[#05070a]/60 dark:text-slate-400 dark:hover:text-blue-400 dark:hover:bg-blue-950/20 px-2.5 py-1.5 rounded-lg border border-slate-200/50 dark:border-white/10 text-[10px] font-bold transition-all cursor-pointer"
                  >
                    {shortcut}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat Form footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputValue);
            }}
            className="p-3 bg-white dark:bg-transparent border-t border-slate-100 dark:border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={language === 'ar' ? 'اكتب استفسارك هنا...' : 'Ask about our ERP/POS software...'}
              className="flex-1 px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#05070a]/60 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || loading}
              className="h-8 w-8 rounded-xl bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-blue-500/20"
            >
              <Send size={14} />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
