import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Sparkles } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { MenuPage } from './components/MenuPage';
import { LanguageProvider, useLanguage } from './lib/i18n';
import { pageMetadata, siteUrl } from './lib/pageMetadata';

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  if (typeof document === 'undefined') return;
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

// Lazy-loaded components for optimal bundle splitting and fast mobile LCP
const Experiences = lazy(() => import('./components/Experiences').then(m => ({ default: m.Experiences })));
const ChefBio = lazy(() => import('./components/ChefBio').then(m => ({ default: m.ChefBio })));
const Footer = lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));
const AdminDashboard = lazy(() => import('./components/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const ArtGallery = lazy(() => import('./components/ArtGallery').then(m => ({ default: m.ArtGallery })));
const ReservationPage = lazy(() => import('./components/ReservationPage').then(m => ({ default: m.ReservationPage })));
const QuoteModal = lazy(() => import('./components/QuoteModal').then(m => ({ default: m.QuoteModal })));
const FrankoAIChatModal = lazy(() => import('./components/FrankoAIChatModal').then(m => ({ default: m.FrankoAIChatModal })));

const LoadingSpinner = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#0a0a0a] text-stone-400 space-y-4">
    <div className="w-10 h-10 border-2 border-stone-800 border-t-[#c5a059] rounded-full animate-spin" />
    <p className="text-xs font-mono uppercase tracking-widest text-stone-500">Chef 4 You by Franko...</p>
  </div>
);

const normalizePathname = (path: string) => {
  const normalized = path.replace(/\/+$/, '');
  return normalized || '/';
};

const FloatingFrankoAIButton: React.FC<{ onClick: () => void; hidden?: boolean }> = ({ onClick, hidden }) => {
  const { lang } = useLanguage();
  return (
    <button
      id="franko-ai-trigger"
      type="button"
      onClick={onClick}
      aria-label={lang === 'en' ? 'Open Franko AI Assistant' : 'Abrir asistente Franko AI'}
      tabIndex={hidden ? -1 : 0}
      aria-hidden={hidden ? 'true' : undefined}
      className={`fixed bottom-[calc(5.75rem+env(safe-area-inset-bottom,0px))] right-[calc(1.25rem+env(safe-area-inset-right,0px))] z-40 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#c5a059] via-[#d8b96d] to-[#9e7c33] px-4 py-3.5 text-xs font-bold uppercase tracking-wider text-stone-950 shadow-[0_12px_32px_rgba(0,0,0,0.45)] transition-transform hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a059] focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950 ${
        hidden ? 'invisible pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <Sparkles className="w-4 h-4 shrink-0" />
      <span>Franko AI</span>
    </button>
  );
};

interface AppProps {
  initialPath?: string;
}

function AppContent({ initialPath }: AppProps) {
  const { lang } = useLanguage();
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [pathname, setPathname] = useState(
    normalizePathname(initialPath ?? (typeof window !== 'undefined' ? window.location.pathname : '/'))
  );

  useEffect(() => {
    const handlePopState = () => setPathname(normalizePathname(window.location.pathname));
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const page = pageMetadata[pathname] ?? (pathname === '/' ? pageMetadata['/'] : {
      title: 'Página no disponible | Chef4You by Franko',
      description: 'La página solicitada no está disponible en Chef4You by Franko.',
      noIndex: true,
    });
    if (!page) return;
    const canonicalUrl = `${siteUrl}${pathname === '/' ? '/' : `${pathname}/`}`;

    document.title = page.title;
    if (page.lang) document.documentElement.lang = page.lang;
    setMeta('name', 'description', page.description);
    setMeta('name', 'robots', page.noIndex ? 'noindex, nofollow' : 'index, follow');
    setMeta('property', 'og:title', page.title);
    setMeta('property', 'og:description', page.description);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('name', 'twitter:title', page.title);
    setMeta('name', 'twitter:description', page.description);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
  }, [pathname]);

  const navigateTo = (path: string) => {
    const normalizedPath = normalizePathname(path);
    window.history.pushState({}, '', normalizedPath);
    setPathname(normalizedPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenQuoteFromAI = () => {
    setAiChatOpen(false);
    setQuoteOpen(true);
  };

  const skipLink = (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[#c5a059] focus:text-black focus:font-bold focus:rounded-md focus:shadow-lg focus:outline-none"
    >
      {lang === 'en' ? 'Skip to main content' : 'Saltar al contenido principal'}
    </a>
  );

  const globalOverlays = (
    <>
      <FloatingFrankoAIButton hidden={aiChatOpen} onClick={() => setAiChatOpen(true)} />
      <Suspense fallback={null}>
        {quoteOpen && <QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />}
        {aiChatOpen && (
          <FrankoAIChatModal
            isOpen={aiChatOpen}
            onClose={() => setAiChatOpen(false)}
            onOpenQuote={handleOpenQuoteFromAI}
          />
        )}
      </Suspense>
    </>
  );

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
        {skipLink}
        <Navbar
          currentPath={pathname}
          onNavigate={navigateTo}
          onOpenQuote={() => setQuoteOpen(true)}
          onOpenAI={() => setAiChatOpen(true)}
        />
        <main id="main-content" tabIndex={-1} className="pt-4 outline-none">
          <Suspense fallback={<LoadingSpinner />}>
            <ArtGallery isFullView onOpenQuote={() => setQuoteOpen(true)} />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer onNavigate={navigateTo} />
        </Suspense>
        {globalOverlays}
      </div>
    );
  }

  // Route 3: /experiencias
  if (pathname === '/experiencias') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-stone-100 font-sans selection:bg-[#c5a059] selection:text-black">
        {skipLink}
        <Navbar
          currentPath={pathname}
          onNavigate={navigateTo}
          onOpenQuote={() => setQuoteOpen(true)}
          onOpenAI={() => setAiChatOpen(true)}
        />
        <main id="main-content" tabIndex={-1} className="pt-4 outline-none">
          <Suspense fallback={<LoadingSpinner />}>
            <Experiences isFullView onOpenQuote={() => setQuoteOpen(true)} />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer onNavigate={navigateTo} />
        </Suspense>
        {globalOverlays}
      </div>
    );
  }

  // Route 4: /chef-franko
  if (pathname === '/chef-franko') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-stone-100 font-sans selection:bg-[#c5a059] selection:text-black">
        {skipLink}
        <Navbar
          currentPath={pathname}
          onNavigate={navigateTo}
          onOpenQuote={() => setQuoteOpen(true)}
          onOpenAI={() => setAiChatOpen(true)}
        />
        <main id="main-content" tabIndex={-1} className="pt-4 outline-none">
          <Suspense fallback={<LoadingSpinner />}>
            <ChefBio isFullView onOpenQuote={() => setQuoteOpen(true)} />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer onNavigate={navigateTo} />
        </Suspense>
        {globalOverlays}
      </div>
    );
  }

  // Route 5: /menu
  if (pathname === '/menu') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-stone-100 font-sans selection:bg-[#c5a059] selection:text-black">
        {skipLink}
        <Navbar
          currentPath={pathname}
          onNavigate={navigateTo}
          onOpenQuote={() => setQuoteOpen(true)}
          onOpenAI={() => setAiChatOpen(true)}
        />
        <main id="main-content" tabIndex={-1} className="outline-none">
          <MenuPage />
        </main>
        <Suspense fallback={null}>
          <Footer onNavigate={navigateTo} />
        </Suspense>
        {globalOverlays}
      </div>
    );
  }

  // Route 6: /reservar
  if (pathname === '/reservar') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-stone-100 font-sans selection:bg-[#c5a059] selection:text-black">
        {skipLink}
        <Navbar
          currentPath={pathname}
          onNavigate={navigateTo}
          onOpenQuote={() => setQuoteOpen(true)}
          onOpenAI={() => setAiChatOpen(true)}
        />
        <main id="main-content" tabIndex={-1} className="outline-none">
          <Suspense fallback={<LoadingSpinner />}>
            <ReservationPage />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer onNavigate={navigateTo} />
        </Suspense>
        {globalOverlays}
      </div>
    );
  }

  // Route 7: 404 / Página no disponible (evita que rutas no publicadas como /privacy muestren Inicio o el borrador)
  if (pathname !== '/') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-stone-100 font-sans selection:bg-[#c5a059] selection:text-black">
        {skipLink}
        <Navbar
          currentPath={pathname}
          onNavigate={navigateTo}
          onOpenQuote={() => setQuoteOpen(true)}
          onOpenAI={() => setAiChatOpen(true)}
        />
        <main id="main-content" tabIndex={-1} className="py-24 px-4 text-center outline-none">
          <div className="max-w-md mx-auto space-y-6">
            <span className="text-[#c5a059] text-xs font-mono uppercase tracking-[0.2em]">404 · Error</span>
            <h1 className="font-serif text-4xl sm:text-5xl font-light text-white">
              {lang === 'en' ? 'Page Not Found' : 'Página no disponible'}
            </h1>
            <p className="text-stone-400 text-sm leading-relaxed">
              {lang === 'en'
                ? 'The requested page is currently unavailable or does not exist.'
                : 'La página solicitada no está disponible o no existe en este momento.'}
            </p>
            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
              <button
                type="button"
                onClick={() => navigateTo('/')}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#9e7c33] text-stone-950 font-bold text-sm shadow-md hover:brightness-110 transition-all"
              >
                {lang === 'en' ? 'Back to Home' : 'Volver al Inicio'}
              </button>
              <button
                type="button"
                onClick={() => navigateTo('/menu')}
                className="px-6 py-3 rounded-xl bg-stone-900 border border-stone-700 text-stone-300 text-sm hover:text-white transition-colors"
              >
                {lang === 'en' ? 'View Menus' : 'Ver Menús'}
              </button>
            </div>
          </div>
        </main>
        <Suspense fallback={null}>
          <Footer onNavigate={navigateTo} />
        </Suspense>
        {globalOverlays}
      </div>
    );
  }

  // Route 8: / (Homepage SPA)
  return (
    <>
      <HomePage
        onOpenQuote={() => setQuoteOpen(true)}
        onOpenAI={() => setAiChatOpen(true)}
        onNavigate={navigateTo}
      />
      {globalOverlays}
    </>
  );
}

export function App({ initialPath }: AppProps) {
  return (
    <LanguageProvider>
      <AppContent initialPath={initialPath} />
    </LanguageProvider>
  );
}

export default App;
