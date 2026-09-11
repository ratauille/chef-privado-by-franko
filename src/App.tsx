import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ValueProposition } from './components/ValueProposition';
import { Experiences } from './components/Experiences';
import { ChefBio } from './components/ChefBio';
import { Testimonials } from './components/Testimonials';
import { ServicesBanner } from './components/ServicesBanner';
import { Footer } from './components/Footer';

// Lazy-loaded components for optimal bundle splitting
const AdminDashboard = lazy(() => import('./components/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const ArtGallery = lazy(() => import('./components/ArtGallery').then(m => ({ default: m.ArtGallery })));
const ReservationPage = lazy(() => import('./components/ReservationPage').then(m => ({ default: m.ReservationPage })));
const QuoteModal = lazy(() => import('./components/QuoteModal').then(m => ({ default: m.QuoteModal })));
const FrankoAIChatModal = lazy(() => import('./components/FrankoAIChatModal').then(m => ({ default: m.FrankoAIChatModal })));

const LoadingSpinner = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#0a0a0a] text-stone-400 space-y-4">
    <div className="w-10 h-10 border-2 border-stone-800 border-t-[#c5a059] rounded-full animate-spin" />
    <p className="text-xs font-mono uppercase tracking-widest text-stone-500">Cargando Experiencia...</p>
  </div>
);

export function App() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setPathname(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Route 1: /admin
  if (pathname === '/admin' || pathname.startsWith('/admin')) {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <AdminDashboard />
      </Suspense>
    );
  }

  // Route 2: /galeria
  if (pathname === '/galeria') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-stone-100 font-sans selection:bg-[#c5a059] selection:text-black">
        <Navbar
          currentPath={pathname}
          onNavigate={navigateTo}
          onOpenQuote={() => setQuoteOpen(true)}
          onOpenAI={() => setAiChatOpen(true)}
        />
        <main className="pt-4">
          <Suspense fallback={<LoadingSpinner />}>
            <ArtGallery isFullView onOpenQuote={() => setQuoteOpen(true)} />
          </Suspense>
        </main>
        <Footer onNavigate={navigateTo} />

        <Suspense fallback={null}>
          {quoteOpen && <QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />}
          {aiChatOpen && <FrankoAIChatModal isOpen={aiChatOpen} onClose={() => setAiChatOpen(false)} />}
        </Suspense>
      </div>
    );
  }

  // Route 3: /experiencias
  if (pathname === '/experiencias') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-stone-100 font-sans selection:bg-[#c5a059] selection:text-black">
        <Navbar
          currentPath={pathname}
          onNavigate={navigateTo}
          onOpenQuote={() => setQuoteOpen(true)}
          onOpenAI={() => setAiChatOpen(true)}
        />
        <main className="pt-4">
          <Experiences isFullView onOpenQuote={() => setQuoteOpen(true)} />
        </main>
        <Footer onNavigate={navigateTo} />

        <Suspense fallback={null}>
          {quoteOpen && <QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />}
          {aiChatOpen && <FrankoAIChatModal isOpen={aiChatOpen} onClose={() => setAiChatOpen(false)} />}
        </Suspense>
      </div>
    );
  }

  // Route 4: /chef-franko
  if (pathname === '/chef-franko') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-stone-100 font-sans selection:bg-[#c5a059] selection:text-black">
        <Navbar
          currentPath={pathname}
          onNavigate={navigateTo}
          onOpenQuote={() => setQuoteOpen(true)}
          onOpenAI={() => setAiChatOpen(true)}
        />
        <main className="pt-4">
          <ChefBio isFullView onOpenQuote={() => setQuoteOpen(true)} />
        </main>
        <Footer onNavigate={navigateTo} />

        <Suspense fallback={null}>
          {quoteOpen && <QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />}
          {aiChatOpen && <FrankoAIChatModal isOpen={aiChatOpen} onClose={() => setAiChatOpen(false)} />}
        </Suspense>
      </div>
    );
  }

  // Route 5: /reservar
  if (pathname === '/reservar') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-stone-100 font-sans selection:bg-[#c5a059] selection:text-black">
        <Navbar
          currentPath={pathname}
          onNavigate={navigateTo}
          onOpenQuote={() => setQuoteOpen(true)}
          onOpenAI={() => setAiChatOpen(true)}
        />
        <main>
          <Suspense fallback={<LoadingSpinner />}>
            <ReservationPage />
          </Suspense>
        </main>
        <Footer onNavigate={navigateTo} />

        <Suspense fallback={null}>
          {aiChatOpen && <FrankoAIChatModal isOpen={aiChatOpen} onClose={() => setAiChatOpen(false)} />}
        </Suspense>
      </div>
    );
  }

  // Route 6: / (Homepage SPA)
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-stone-100 font-sans selection:bg-[#c5a059] selection:text-black">
      <Navbar
        currentPath={pathname}
        onNavigate={navigateTo}
        onOpenQuote={() => setQuoteOpen(true)}
        onOpenAI={() => setAiChatOpen(true)}
      />
      <main>
        <Hero
          onOpenQuote={() => setQuoteOpen(true)}
          onOpenAI={() => setAiChatOpen(true)}
        />
        <ValueProposition onOpenQuote={() => setQuoteOpen(true)} />
        <ServicesBanner onOpenQuote={() => setQuoteOpen(true)} />
        <Experiences onOpenQuote={() => setQuoteOpen(true)} />
        <Suspense fallback={<LoadingSpinner />}>
          <ArtGallery onOpenQuote={() => setQuoteOpen(true)} />
        </Suspense>
        <ChefBio onOpenQuote={() => setQuoteOpen(true)} />
        <Testimonials />
      </main>
      <Footer onNavigate={navigateTo} />

      <Suspense fallback={null}>
        {quoteOpen && <QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />}
        {aiChatOpen && <FrankoAIChatModal isOpen={aiChatOpen} onClose={() => setAiChatOpen(false)} />}
      </Suspense>
    </div>
  );
}

export default App;
