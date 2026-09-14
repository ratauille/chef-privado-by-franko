import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getMessaging, isSupported as isMessagingSupported } from 'firebase/messaging';
import { getAnalytics, isSupported as isAnalyticsSupported } from 'firebase/analytics';
import { initializeAppCheck, ReCaptchaEnterpriseProvider, ReCaptchaV3Provider } from 'firebase/app-check';

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

// Singleton initialization
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const auth = getAuth(app);

// App Check singleton initialization wrapper
export const initAppCheck = (recaptchaSiteKey?: string) => {
  const siteKey = recaptchaSiteKey || import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LcRcbUtAAAAALu9BaCB9Dagi6ejHwQm0IqEOu1n';
  
  if (import.meta.env.DEV || location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    // Enable App Check Debug Token in browser console for local development
    // @ts-ignore
    self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
    console.log('[AppCheck] Modo Debug Token activo para desarrollo local.');
  }

  try {
    return initializeAppCheck(app, {
      provider: new ReCaptchaEnterpriseProvider(siteKey),
      isTokenAutoRefreshEnabled: true,
    });
  } catch (e) {
    return initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(siteKey),
      isTokenAutoRefreshEnabled: true,
    });
  }
};

// Messaging singleton wrapper for browser push notifications
export const getFCM = async () => {
  if (await isMessagingSupported()) {
    return getMessaging(app);
  }
  return null;
};

// Analytics singleton wrapper
export const getFirebaseAnalytics = async () => {
  if (await isAnalyticsSupported()) {
    return getAnalytics(app);
  }
  return null;
};

export default app;
