import { ClerkProvider } from '@clerk/react';
import React, { Component, ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || '';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error('[Chef4You ErrorBoundary] Error no controlado:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0a0a0a] text-stone-100 flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="max-w-md w-full space-y-6 p-8 rounded-3xl bg-[#141312] border border-stone-800 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-[#1c1b18] border border-[#c5a059]/40 text-[#d8b96d] mx-auto flex items-center justify-center font-serif text-xl font-bold">
              C4Y
            </div>
            <h1 className="font-serif text-2xl font-light text-white">Chef4You by Franko Salgado</h1>
            <p className="text-stone-400 text-xs leading-relaxed font-light">
              Estamos actualizando la experiencia gastronómica. Por favor recarga la página o inténtalo nuevamente.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#9e7c33] text-stone-950 font-bold text-xs shadow-md hover:brightness-110 transition-all"
            >
              Recargar Página
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      {PUBLISHABLE_KEY ? (
        <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
          <App />
        </ClerkProvider>
      ) : (
        <App />
      )}
    </ErrorBoundary>
  </React.StrictMode>
);
