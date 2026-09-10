import React, { useState } from 'react';
import { X, Sparkles, Send, Bot, User } from 'lucide-react';

interface FrankoAIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

export const FrankoAIChatModal: React.FC<FrankoAIChatModalProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: '¡Hola! Soy Franko AI, el asistente gastronómico de Chef Franko Salgado. ¿En qué puedo ayudarte hoy sobre nuestras cenas de autor, disponibilidad o banquetes en villa?',
    },
  ]);

  if (!isOpen) return null;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const userText = input.trim();
    if (!userText || loading) return;

    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText }),
      });

      const data = await res.json();
      const reply = data.reply || 'Gracias por escribirnos. Chef Franko se pondrá en contacto contigo a la brevedad.';

      setMessages(prev => [...prev, { sender: 'ai', text: reply }]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: 'Disculpa, tuve un problema de conexión. Por favor contáctanos directamente por WhatsApp para atenderte de inmediato.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white border border-stone-200 rounded-2xl shadow-2xl max-w-lg w-full h-[550px] flex flex-col overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-stone-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gold-100 border border-gold-300 flex items-center justify-center text-[#8c6a24]">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-white">Franko AI</h4>
              <p className="text-[11px] text-gold-300 font-mono">Asistente Gastronómico en Vivo</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1 rounded-full hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-stone-50">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 ${
                  m.sender === 'user' ? 'bg-black text-white' : 'bg-gold-100 text-[#8c6a24] border border-gold-300'
                }`}
              >
                {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`p-3 rounded-2xl max-w-[80%] text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-black text-white rounded-tr-none shadow-xs'
                    : 'bg-white text-stone-800 border border-stone-200 rounded-tl-none shadow-xs'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-stone-400 italic">
              <Sparkles className="w-3.5 h-3.5 text-[#8c6a24] animate-spin" />
              <span>Franko AI está escribiendo una respuesta...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-stone-200 flex items-center gap-2">
          <input
            type="text"
            placeholder="Pregunta sobre menús, maridajes o servicios..."
            value={input}
            onChange={e => setInput(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#8c6a24] text-xs outline-none"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="p-2.5 rounded-xl bg-black text-white hover:bg-stone-800 transition-colors disabled:opacity-40"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
