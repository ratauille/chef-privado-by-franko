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
- ⚠️ **Cloud Functions:** Verifica el plan y los permisos del proyecto antes de desplegarlas; publicar solo Hosting no activa `/api/lead` ni `/api/assistant/chat`.

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

### Despliegue de Cloud Functions (tras comprobar el plan y el proyecto)
```powershell
firebase deploy --only functions
```

El formulario y el chat necesitan Functions operativas. Si ambas rutas devuelven HTTP 500, revisa **Firebase Console → Build → Functions → Registros** o ejecuta `firebase functions:log --project chef-privado` antes de volver a desplegar. Tras el despliegue, una petición inválida a `/api/lead` debe recibir un error JSON del endpoint, no un HTML 500 del servidor.

Cuando `/api/lead` responda correctamente, despliega también `firebase deploy --only firestore:rules --project chef-privado`. Las reglas del repositorio cierran la escritura pública directa en `reservations`; el Admin SDK de la Function puede seguir creando leads. Comprueba primero el endpoint para mantener la captura automática durante el cambio.

Para Gemini, rota cualquier clave que hayas compartido y configura la nueva en el proyecto Firebase correcto mediante `firebase functions:secrets:set GEMINI_API_KEY --project chef-privado`. Las Functions `apiAssistantChat` y `onReservationCreated` declaran el acceso al secreto. Nunca pegues su valor en GitHub, `.env.example` o un comando compartido. Esta configuración requiere desplegar esas Functions para surtir efecto.

Si el endpoint de leads falla, los formularios muestran un enlace a WhatsApp con la solicitud preparada. El visitante debe pulsar **Enviar** en WhatsApp; abrir el enlace no registra una reserva en Firestore.

---

## SEO y catálogo de menús

- El catálogo de diez menús está disponible en `/menu`; muestra los precios por persona en MXN y permite filtrar por texto, cocina y rango de precio. Las consultas abren WhatsApp al teléfono oficial `+52 322 160 6843`.
- Los nombres, categorías, capacidad y precios del catálogo se mantienen en `src/components/MenuPage.tsx`. Actualiza allí los datos cuando cambie la oferta.
- El material recibido para el catálogo fue HTML, no un PDF. No hay enlace de descarga hasta que se proporcione un PDF real.
- Los títulos, descripciones, idioma, URL canónica, robots y datos para Open Graph/Twitter se definen en `src/lib/pageMetadata.ts` y se reflejan durante la navegación en `src/App.tsx`. `vite.config.ts` genera HTML específico para cada ruta en el build, para que los buscadores y las vistas previas sociales reciban esos metadatos al abrir directamente una URL.
- `index.html` contiene los metadatos iniciales, la imagen social y el JSON-LD `ProfessionalService` con datos de contacto y área de servicio. `public/robots.txt` y `public/sitemap.xml` describen el rastreo y las rutas públicas. El panel `/admin` queda marcado como `noindex`.
- El retrato del chef se sirve desde `public/assets/chef_franko_portrait.jpg` y aparece en `src/components/ChefBio.tsx` y `src/components/HomePage.tsx`.

Para generar y comprobar el HTML de las rutas, ejecuta `npm ci` y `npm run build`; revisa, por ejemplo, `dist/menu/index.html` y `dist/chef-franko/index.html`. Después del proceso normal aprobado de publicación en Firebase Hosting clásico (`firebase use chef-privado` y `firebase deploy --only hosting`), envía `https://chef4youbyfranko.com/sitemap.xml` en **Google Search Console → Sitemaps**.

---

## Registro de entrega segura (1 de octubre de 2026)

- Se comprobó que `.firebaserc` fija el alias predeterminado en `chef-privado` y que `firebase use` selecciona ese mismo proyecto. La API de Firebase identifica `projects/chef-privado/sites/chef-privado` como el `DEFAULT_SITE`; `firebase.json` contiene una sola configuración Hosting (`public: "dist"`) y no configura destinos para los otros sitios existentes. Un despliegue limitado a Hosting y fijado con `--project chef-privado` corresponde, por tanto, únicamente al sitio predeterminado `chef-privado`; no cambia DNS, Google Workspace, Functions, reglas de Firestore ni otros sitios.
- `npm audit` sigue reportando **11 vulnerabilidades transitivas (6 moderadas y 5 altas)** en el árbol de frontend, propagadas por Firebase `10.14.1` y sus dependencias (`undici` `6.19.7`, `@grpc/grpc-js` `1.9.16`). El arreglo automático que npm propone baja Firebase a `9.14.0` (cambio mayor y potencialmente incompatible); no se aplicó. Antes de actualizar, valida una versión compatible de Firebase y sus requisitos con el uso actual de Auth, Firestore y Functions, actualiza el lockfile y repite build/auditoría.
- Auditoría adicional tras instalar con el lockfile de `functions`: **19 vulnerabilidades transitivas (13 moderadas y 6 altas)** en las dependencias de Cloud Functions. No se ejecutó `npm audit fix` ni se cambiaron versiones; programa una actualización compatible revisando los cambios de Firebase Admin, Firebase Functions y Google APIs junto con el código y el CI.
- El único smoke test general encontrado (`test-chef.js`) imprime un mensaje; no hay script `test` de frontend. `functions/test-verification.mjs` escribe reservas y consulta el proyecto `chef-privado`, así que no se ejecuta contra producción como prueba. El workflow de CI compila frontend y Functions en PR/push a `master`.
- Aunque el proyecto y el sitio Hosting predeterminados están identificados, la política de publicación de este README exige publicar desde `master`. Este trabajo permanece en una rama de función y no se hizo deploy; publicar después de integrar los cambios siguiendo el flujo de PR hacia `master`.

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
