# Chef 4 You by Franko Salgado — Chef Privado & Catering de Lujo

Documentación técnica oficial, arquitectura de producción y guía de seguridad.

## 📌 Especificaciones del Proyecto de Producción

- **Repositorio de Producción:** [ratauille/chef-privado-by-franko](https://github.com/ratauille/chef-privado-by-franko)
- **Rama de Producción:** `master`
- **Proyecto Firebase:** `chef-privado`
- **Hosting Autorizado:** Firebase Hosting clásico (`public: "dist"`)
- **Dominio Principal:** [chef4youbyfranko.com](https://chef4youbyfranko.com)
- **Ruta Local Canónica:** `C:\Users\frank\OneDrive\Desktop\chef privado by frankosalgado`
- **Stack Técnico:** React 18, Vite, TypeScript, Tailwind CSS, Cloud Functions (Node 20), Clerk Auth, `@google/genai`
- **Teléfono Oficial de Contacto:** `+52 322 160 6843`

---

## 🛑 Repositorios y Servicios NO Autorizados

- ❌ **Repositorio antiguo:** `ratauille/chef-privado` (Desactivado / No usar)
- ❌ **Repositorio privado:** `ratauille/chefOs` (No usar)
- ❌ **Firebase App Hosting:** No habilitado / No usar
- ❌ **GitHub Pages:** Solo respaldo / No producción
- ❌ **Facturación Blaze / Cloud Run / Artifact Registry:** No requeridos

---

## 🛠️ Procedimiento de Compilación (Build)

### 1. Compilación del Frontend (React + Vite + TypeScript)
```powershell
npm ci
npm run build
```

### 2. Compilación de Cloud Functions (Backend)
```powershell
npm --prefix functions ci
npm --prefix functions run build
```

---

## 🚀 Procedimiento de Despliegue Manual (Firebase Hosting Clásico)

> [!IMPORTANT]
> El despliegue a producción se realiza exclusivamente mediante Firebase CLI hacia **Firebase Hosting clásico**, usando la rama `master`.

### Despliegue de Hosting (Estático)
```powershell
firebase use chef-privado
firebase deploy --only hosting
```

### Despliegue de Cloud Functions (Solamente con autorización de plan)
```powershell
firebase deploy --only functions
```

---

## 🔑 Variables de Entorno Requeridas (Por Nombre)

> [!WARNING]
> Nunca incluir valores reales ni credenciales secretas en el código fuente o repositorios versionados.

### Frontend (`.env`)
- `VITE_CLERK_PUBLISHABLE_KEY`
- `VITE_RECAPTCHA_SITE_KEY`
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`

### Cloud Functions (`functions/.env` / Secret Manager)
- `GEMINI_API_KEY`
- `RECAPTCHA_SITE_KEY`
- `GCLOUD_PROJECT`
- `CHEF_NOTIFICATION_EMAIL`
- `CHEF_WHATSAPP_NUMBER`
- `GOOGLE_CALENDAR_ID`
- `GOOGLE_CLIENT_EMAIL`
- `GOOGLE_PRIVATE_KEY`
