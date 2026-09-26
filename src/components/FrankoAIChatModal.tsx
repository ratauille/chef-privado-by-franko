import React, { useState, useEffect } from 'react';
import { X, Sparkles, Send, Bot, User } from 'lucide-react';
import { useLanguage } from '../lib/i18n';

interface FrankoAIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

export const FrankoAIChatModal: React.FC<FrankoAIChatModalProps> = ({ isOpen, onClose }) => {
  const { t, lang } = useLanguage();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: t.chat.greeting,
    },
  ]);

  // Update greeting when language changes if no conversation happened yet
  useEffect(() => {
    if (messages.length === 1 && messages[0].sender === 'ai') {
      setMessages([{ sender: 'ai', text: t.chat.greeting }]);
    }
  }, [lang, t.chat.greeting]);

  if (!isOpen) return null;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const userText = input.trim();
    if (!userText || loading) return;

    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInput('');
    setLoading(true);

    try {
      let recaptchaToken = '';
      if (typeof window !== 'undefined' && (window as any).grecaptcha?.enterprise) {
        try {
          recaptchaToken = await (window as any).grecaptcha.enterprise.execute(
            import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LcRcbUtAAAAALu9BaCB9Dagi6ejHwQm0IqEOu1n',
            { action: 'CHAT' }
          );
        } catch (err) {
          console.warn('[reCAPTCHA Enterprise] Notice in Chat:', err);
        }
      }

      const res = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(recaptchaToken ? { 'X-ReCaptcha-Token': recaptchaToken } : {}),
          'X-ReCaptcha-Action': 'CHAT',
        },
        body: JSON.stringify({ message: userText, recaptchaToken, lang }),
      });

      if (!res.ok) {
        throw new Error(`Error en el servidor: ${res.status}`);
      }

      const contentType = res.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        throw new Error('El servidor no devolvió JSON');
      }

      const data = await res.json();
      const reply =
        data.reply ||
        (lang === 'es'
          ? 'Gracias por tu consulta. El Chef Franko Salgado se comunicará contigo directamente.'
          : 'Thank you for your inquiry. Chef Franko Salgado will get back to you directly.');

      setMessages(prev => [...prev, { sender: 'ai', text: reply }]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: t.chat.errorMsg,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.chat.title}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
    >
      <div className="bg-[#141312] border border-stone-800 rounded-3xl shadow-2xl max-w-lg w-full h-[560px] flex flex-col overflow-hidden relative text-stone-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#0a0a0a] border-b border-stone-800 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1e1c18] border border-[#c5a059]/40 flex items-center justify-center text-[#d8b96d]">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-white">{t.chat.title}</h3>
              <p className="text-[11px] text-[#c5a059] font-mono">{t.chat.subtitle}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Cerrar chat"
            className="text-stone-400 hover:text-white p-2 rounded-full hover:bg-stone-900 border border-transparent hover:border-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-[#0e0d0c]">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0 ${
                  m.sender === 'user'
                    ? 'bg-[#c5a059] text-stone-950 font-bold'
                    : 'bg-[#181715] text-[#d8b96d] border border-[#c5a059]/40'
                }`}
              >
                {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`p-4 rounded-2xl max-w-[82%] text-xs leading-relaxed font-light ${
                  m.sender === 'user'
                    ? 'bg-[#c5a059] text-stone-950 font-medium rounded-tr-none shadow-md'
                    : 'bg-[#181715] text-stone-200 border border-stone-800 rounded-tl-none shadow-md'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-stone-400 italic">
              <Sparkles className="w-4 h-4 text-[#c5a059] animate-spin" />
              <span>{t.chat.loading}</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-4 bg-[#0a0a0a] border-t border-stone-800 flex items-center gap-2">
          <input
            type="text"
            placeholder={t.chat.placeholder}
            value={input}
            onChange={e => setInput(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl bg-[#1c1b18] border border-stone-700 focus:border-[#c5a059] text-white placeholder-stone-500 text-xs outline-none transition-colors"
          />
          <button
            type="submit"
            aria-label="Enviar mensaje"
            disabled={loading || !input.trim()}
            className="p-3 rounded-xl bg-gradient-to-r from-[#c5a059] via-[#d8b96d] to-[#9e7c33] text-stone-950 hover:brightness-110 transition-all disabled:opacity-40"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
