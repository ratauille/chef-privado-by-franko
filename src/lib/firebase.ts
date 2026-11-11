import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import type { AppCheck } from 'firebase/app-check';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyD9tVah09y2Zh_tJQobgBwU4TrTjaFUPbM',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'chef-privado.firebaseapp.com',
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || 'https://chef-privado-default-rtdb.firebaseio.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'chef-privado',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'chef-privado.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '697324356635',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:697324356635:web:381e0c1e5f1dc94a1324be',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-8KSD33KG1G',
};

// Singleton initialization (loaded on demand when AdminDashboard is opened)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const auth = getAuth(app);

let appCheckInstance: AppCheck | null = null;

// App Check singleton initialization wrapper (lazy-loads firebase/app-check on demand)
export const initAppCheck = async (recaptchaSiteKey?: string): Promise<AppCheck> => {
  if (appCheckInstance) return appCheckInstance;
  const { initializeAppCheck, ReCaptchaEnterpriseProvider, ReCaptchaV3Provider } = await import('firebase/app-check');
  const siteKey = recaptchaSiteKey || import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6Leo8bYtAAAAAAUiuv6Fuyf2OePRM1KQodNFBvGC';

  if (import.meta.env.DEV || location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    // Enable App Check Debug Token in browser console for local development
    // @ts-ignore
    self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
    console.log('[AppCheck] Modo Debug Token activo para desarrollo local.');
  }

  try {
    appCheckInstance = initializeAppCheck(app, {
      provider: new ReCaptchaEnterpriseProvider(siteKey),
      isTokenAutoRefreshEnabled: true,
    });
  } catch (e) {
    appCheckInstance = initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(siteKey),
      isTokenAutoRefreshEnabled: true,
    });
  }
  return appCheckInstance;
};

export const getAppCheckToken = async (): Promise<string> => {
  const { getToken } = await import('firebase/app-check');
  const instance = appCheckInstance || (await initAppCheck());
  const result = await getToken(instance, false);
  if (!result.token) throw new Error('No se obtuvo un token App Check válido.');
  return result.token;
};

// Messaging singleton wrapper for browser push notifications (lazy-loads firebase/messaging on demand)
export const getFCM = async () => {
  const { getMessaging, isSupported: isMessagingSupported } = await import('firebase/messaging');
  if (await isMessagingSupported()) {
    return getMessaging(app);
  }
  return null;
};

// Analytics singleton wrapper (lazy-loads firebase/analytics on demand)
export const getFirebaseAnalytics = async () => {
  const { getAnalytics, isSupported: isAnalyticsSupported } = await import('firebase/analytics');
  if (await isAnalyticsSupported()) {
    return getAnalytics(app);
  }
  return null;
};

export default app;
