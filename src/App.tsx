import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesBanner } from './components/ServicesBanner';
import { Experiences } from './components/Experiences';
import { ChefBio } from './components/ChefBio';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { FrankoAIChatModal } from './components/FrankoAIChatModal';
import { AdminDashboard } from './components/AdminDashboard';

export function App() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  if (pathname === '/admin' || pathname.startsWith('/admin')) {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen bg-white text-stone-900 font-sans">
      <Navbar
        onOpenQuote={() => setQuoteOpen(true)}
        onOpenAI={() => setAiChatOpen(true)}
      />
      <main>
        <Hero
          onOpenQuote={() => setQuoteOpen(true)}
          onOpenAI={() => setAiChatOpen(true)}
        />
        <ServicesBanner onOpenQuote={() => setQuoteOpen(true)} />
        <Experiences onOpenQuote={() => setQuoteOpen(true)} />
        <ChefBio />
        <Testimonials />
      </main>
      <Footer />

      <QuoteModal
        isOpen={quoteOpen}
        onClose={() => setQuoteOpen(false)}
      />
      <FrankoAIChatModal
        isOpen={aiChatOpen}
        onClose={() => setAiChatOpen(false)}
      />
    </div>
  );
}

export default App;
