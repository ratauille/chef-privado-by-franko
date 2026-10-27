import React, { useState, useEffect, useRef } from 'react';
import { X, Sparkles, Send, Bot, User, Calendar, MessageCircle } from 'lucide-react';
import { useLanguage, Language } from '../lib/i18n';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { ensureRecaptchaToken, preloadRecaptchaEnterprise } from '../lib/leadApi';
import { chefWhatsAppUrl } from '../lib/leadFallback';

interface FrankoAIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuote?: () => void;
}

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

const QUICK_PROMPTS: Record<Language, string[]> = {
  es: [
    '¿Qué experiencias y menús ofrecen?',
    '¿En qué zonas de Vallarta y Nayarit dan servicio?',
    '¿Se adaptan a alergias o menús veganos?',
    '¿Cómo funciona el servicio en mi villa?',
  ],
  en: [
    'What dining experiences and menus do you offer?',
    'Which areas in Vallarta & Nayarit do you serve?',
    'Do you accommodate allergies or vegan guests?',
    'How does private villa service work?',
  ],
};

function buildLocalFrankoReply(query: string, lang: Language): string {
  const q = query.toLowerCase();

  if (lang === 'en') {
    if (/(price|cost|rate|how much|budget|quote|package|tarifa|precio|costo|cuanto)/.test(q)) {
      return "Every experience with Chef Franko Salgado is custom-designed around your guest count, villa location, and menu style (from 5-course author tasting menus to contemporary Mexican tables or group celebrations). As a reference, bespoke private dining experiences start around $120–$260 USD per guest depending on the menu and wine pairing. Tap 'Request Quote' below or message us on WhatsApp with your date and guest count for an exact proposal.";
    }
    if (/(where|location|area|zone|punta mita|sayulita|vallarta|nayarit|villa|yacht|yate)/.test(q)) {
      return 'Chef Franko Salgado and his culinary brigade serve private villas, oceanfront residences, penthouses, and luxury yachts across Puerto Vallarta (Marina, Romantic Zone, Conchas Chinas, Mismaloya), Nuevo Nayarit / Nuevo Vallarta, Bucerías, Punta Mita, Litibú, and Sayulita.';
    }
    if (/(allerg|vegan|vegetarian|gluten|celiac|kosher|diet|kid|child|alergia|vegano|sin gluten)/.test(q)) {
      return 'Absolutely. Every tasting menu is crafted from scratch for your table. We seamlessly accommodate gluten-free (celiac), dairy-free, nut/shellfish allergies, vegan, vegetarian, and children’s menus without compromising culinary artistry.';
    }
    if (/(menu|experience|course|dish|food|dinner|romantic|wedding|class|cooking|platillo|cena)/.test(q)) {
      return 'Our signature experiences include:\n• 5 & 6-Course Author Tasting Menus (e.g., King Crab Crème Brûlée, Beef Tenderloin with Smoked Onion Purée)\n• The Contemporary Mexican Table\n• Romantic Sunset Dinner for Two\n• Family & Group Villa Celebrations\n• Interactive Chef’s Table & Cooking Masterclasses.\nAll services include ingredient procurement, preparation, table presentation, and full kitchen cleanup.';
    }
    if (/(who|franko|chef|background|cordon bleu|four seasons|story|experience)/.test(q)) {
      return 'Chef Franko Salgado was trained in classical French technique at Le Cordon Bleu Paris and led luxury resort kitchens including Four Seasons. He founded Chef 4 You to bring five-star gastronomy and warm, discreet hospitality directly into private residences.';
    }
    return 'Thank you for your question! Chef Franko Salgado designs bespoke private dining experiences in Puerto Vallarta, Punta Mita, Nuevo Nayarit, and Sayulita—including 5-course tasting menus, contemporary Mexican cuisine, romantic evenings, and villa celebrations (including ingredient sourcing, table service, and full cleanup). Would you like to request a custom quote for your date or continue directly on WhatsApp?';
  }

  // Español
  if (/(precio|costo|cuanto|cuánto|tarifa|cotiza|presupuesto|paquete|valor|cost)/.test(q)) {
    return 'Cada experiencia con el Chef Franko Salgado se diseña a medida según el número de comensales, la ubicación de tu villa y el menú elegido (desde cenas degustación de 5 y 6 tiempos hasta mesa mexicana contemporánea o banquetes). Como referencia orientativa, las experiencias privadas parten desde ~$120 a $260 USD por comensal según los tiempos e ingredientes. Puedes tocar el botón "Cotizar Experiencia" aquí abajo o escribirnos por WhatsApp con tu fecha y número de invitados para darte tu cotización exacta.';
  }
  if (/(donde|dónde|zona|ubicaci|cobertura|punta mita|sayulita|vallarta|nayarit|villa|yate|domicilio)/.test(q)) {
    return 'El Chef Franko Salgado y su brigada atienden directamente en villas privadas, residencias, penthouses y yates en todo Puerto Vallarta (Marina, Zona Romántica, Conchas Chinas, Mismaloya), Nuevo Nayarit / Nuevo Vallarta, Bucerías, Punta Mita, Litibú y Sayulita.';
  }
  if (/(alergia|vegano|vegetariano|gluten|celiaco|celíaco|dieta|niño|infantil|marisco|restricci)/.test(q)) {
    return 'Por supuesto. Todos nuestros menús son 100 % personalizados. Adaptamos cada tiempo para alergias alimentarias (mariscos, frutos secos, lactosa), opciones sin gluten (celíacos), menús veganos/vegetarianos y menús especiales para niños.';
  }
  if (/(menu|menú|experiencia|platillo|plato|tiempo|cena|romántica|romantica|boda|clase|servicio)/.test(q)) {
    return 'Nuestras experiencias insignia incluyen:\n• Cena Degustación de Autor (5 o 6 tiempos, como Crème Brûlée de Cangrejo Real y Belli con Puré de Cebolla Tatemada)\n• Mesa Mexicana Contemporánea\n• Velada Romántica para Dos\n• Celebraciones Familiares y Grupales en Villa\n• Chef’s Table interactivo y Clases Magistrales.\nEl servicio incluye selección de ingredientes frescos del Pacífico, preparación en tu villa, servicio en mesa y limpieza total de la cocina al finalizar.';
  }
  if (/(quien|quién|franko|chef|trayectoria|cordon bleu|four seasons|historia|biografia)/.test(q)) {
    return 'El Chef Franko Salgado cuenta con formación clásica en Le Cordon Bleu París y trayectoria liderando cocinas de resorts de cinco estrellas como Four Seasons. Con Chef 4 You traslada los estándares de un restaurante de alta cocina y hospitalidad discreta a la intimidad de tu residencia o villa.';
  }

  return '¡Con gusto te oriento! En Chef 4 You by Franko Salgado creamos experiencias gastronómicas privadas en Puerto Vallarta, Punta Mita, Nuevo Nayarit y Sayulita: cenas degustación de 5 y 6 tiempos, mesa mexicana contemporánea, veladas románticas y celebraciones en villa (incluyendo compras, preparación en vivo, montaje y limpieza completa). ¿Te gustaría cotizar tu fecha en el formulario o continuar directamente por WhatsApp con el Chef Franko?';
}

export const FrankoAIChatModal: React.FC<FrankoAIChatModalProps> = ({
  isOpen,
  onClose,
  onOpenQuote,
}) => {
  const { t, lang, setLang } = useLanguage();
  const containerRef = useFocusTrap({ isOpen, onClose });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastQuestion, setLastQuestion] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: t.chat.greeting,
    },
  ]);

  useEffect(() => {
    if (isOpen) {
      preloadRecaptchaEnterprise();
    }
  }, [isOpen]);

  // Update greeting when language changes if no conversation happened yet
  useEffect(() => {
    if (messages.length === 1 && messages[0].sender === 'ai') {
      setMessages([{ sender: 'ai', text: t.chat.greeting }]);
    }
  }, [lang, t.chat.greeting]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  if (!isOpen) return null;

  const sendQuestion = async (rawQuestion: string) => {
    const userText = rawQuestion.trim();
    if (!userText || loading) return;

    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInput('');
    setLastQuestion(userText);
    setLoading(true);

    try {
      const recaptchaToken = await ensureRecaptchaToken('CHAT');
      const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
      const timer = controller ? setTimeout(() => controller.abort(), 8500) : null;

      try {
        const res = await fetch('/api/assistant/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(recaptchaToken ? { 'X-ReCaptcha-Token': recaptchaToken } : {}),
            'X-ReCaptcha-Action': 'CHAT',
          },
          body: JSON.stringify({
            message: userText,
            recaptchaToken,
            lang,
            language: lang,
          }),
          signal: controller?.signal,
        });

        const contentType = res.headers.get('content-type') || '';
        if (res.ok && contentType.includes('application/json')) {
          const data = await res.json();
          if (data?.reply && typeof data.reply === 'string') {
            setMessages(prev => [...prev, { sender: 'ai', text: data.reply }]);
            return;
          }
        }
      } finally {
        if (timer) clearTimeout(timer);
      }

      // Smart bilingual culinary fallback if cloud endpoint is unavailable or blocked
      const fallbackReply = buildLocalFrankoReply(userText, lang);
      setMessages(prev => [...prev, { sender: 'ai', text: fallbackReply }]);
    } catch {
      const fallbackReply = buildLocalFrankoReply(userText, lang);
      setMessages(prev => [...prev, { sender: 'ai', text: fallbackReply }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendQuestion(input);
  };

  const contextualWaHref = chefWhatsAppUrl(
    lang === 'en'
      ? `Hello Chef Franko, I have a question from Franko AI: ${lastQuestion || 'I would like to plan a private dining experience.'}`
      : `Hola Chef Franko, tengo una consulta desde Franko AI: ${lastQuestion || 'Me gustaría cotizar una experiencia de chef privado.'}`
  );

  return (
    <div
      ref={containerRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-labelledby="chat-modal-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md outline-none"
    >
      <div className="bg-[#141312] border border-stone-800 rounded-3xl shadow-2xl max-w-lg w-full h-[85vh] max-h-[620px] flex flex-col overflow-hidden relative text-stone-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#0a0a0a] border-b border-stone-800 p-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1e1c18] border border-[#c5a059]/40 flex items-center justify-center text-[#d8b96d] shrink-0">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 id="chat-modal-title" className="font-serif font-bold text-base text-white">{t.chat.title}</h2>
              <p className="text-[11px] text-[#c5a059] font-mono">{t.chat.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center p-0.5 rounded-full bg-[#181715] border border-stone-800 text-[10px] font-mono">
              <button
                type="button"
                onClick={() => setLang('es')}
                aria-label="Cambiar idioma a Español"
                className={`px-2 py-0.5 rounded-full transition-colors ${
                  lang === 'es' ? 'bg-[#c5a059] text-stone-950 font-bold' : 'text-stone-400 hover:text-white'
                }`}
              >
                ES
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                aria-label="Switch language to English"
                className={`px-2 py-0.5 rounded-full transition-colors ${
                  lang === 'en' ? 'bg-[#c5a059] text-stone-950 font-bold' : 'text-stone-400 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label={lang === 'en' ? 'Close chat' : 'Cerrar chat'}
              className="text-stone-400 hover:text-white p-2 rounded-full hover:bg-stone-900 border border-transparent hover:border-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat Messages Body */}
        <div role="log" aria-live="polite" aria-atomic="false" aria-label={lang === 'en' ? 'Conversation history' : 'Historial del chat'} className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-[#0e0d0c]">
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
                className={`p-3.5 sm:p-4 rounded-2xl max-w-[84%] text-xs leading-relaxed font-light whitespace-pre-line ${
                  m.sender === 'user'
                    ? 'bg-[#c5a059] text-stone-950 font-medium rounded-tr-none shadow-md'
                    : 'bg-[#181715] text-stone-200 border border-stone-800 rounded-tl-none shadow-md'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {/* Quick prompts when conversation starts */}
          {messages.length === 1 && !loading && (
            <div className="pt-1 flex flex-wrap gap-2">
              {QUICK_PROMPTS[lang].map(promptText => (
                <button
                  key={promptText}
                  type="button"
                  onClick={() => sendQuestion(promptText)}
                  className="text-left text-[11px] px-3 py-2 rounded-xl bg-[#181715] hover:bg-[#22201c] text-[#d8b96d] border border-[#c5a059]/30 transition-colors"
                >
                  {promptText}
                </button>
              ))}
            </div>
          )}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-stone-400 italic">
              <Sparkles className="w-4 h-4 text-[#c5a059] animate-spin" />
              <span>{t.chat.loading}</span>
            </div>
          )}

          {/* Direct conversion actions */}
          {!loading && (
            <div className="pt-2 flex flex-wrap items-center gap-2">
              {onOpenQuote && (
                <button
                  type="button"
                  onClick={onOpenQuote}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#c5a059]/15 border border-[#c5a059]/50 px-3.5 py-2 text-[11px] font-semibold text-[#d8b96d] hover:bg-[#c5a059] hover:text-stone-950 transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Request Quote' : 'Cotizar Experiencia'}</span>
                </button>
              )}
              <a
                href={contextualWaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#25D366]/15 border border-[#25D366]/50 px-3.5 py-2 text-[11px] font-semibold text-[#4ade80] hover:bg-[#25D366] hover:text-white transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Chat on WhatsApp' : 'Continuar por WhatsApp'}</span>
              </a>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3.5 sm:p-4 bg-[#0a0a0a] border-t border-stone-800 flex items-center gap-2">
          <label htmlFor="franko-ai-chat-input" className="sr-only">
            {t.chat.placeholder}
          </label>
          <input
            id="franko-ai-chat-input"
            type="text"
            aria-label={t.chat.placeholder}
            placeholder={t.chat.placeholder}
            value={input}
            onChange={e => setInput(e.target.value)}
            maxLength={500}
            className="flex-1 px-4 py-3 rounded-xl bg-[#1c1b18] border border-stone-700 focus:border-[#c5a059] text-white placeholder-stone-500 text-xs outline-none transition-colors"
          />
          <button
            type="submit"
            aria-label={lang === 'en' ? 'Send message' : 'Enviar mensaje'}
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
