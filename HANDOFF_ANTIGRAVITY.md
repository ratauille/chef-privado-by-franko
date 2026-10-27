# Handoff de prerenderizado — Chef 4 You by Franko

## Arquitectura actual

- React 18 + Vite 6.4.3 + TypeScript.
- Firebase Hosting publica `dist/` mediante `firebase.json`.
- La navegación pública se resuelve en `src/App.tsx` con `window.location.pathname`; no se usa React Router.
- Las rutas públicas son `/`, `/galeria`, `/experiencias`, `/chef-franko` y `/reservar`.
- `/admin` permanece como ruta cliente privada y no se prerenderiza.
- Los formularios siguen usando `submitLead`, reCAPTCHA, Firebase Functions y sus fallbacks existentes.

## Archivos modificados por este trabajo

- `package.json`: el script `build` ahora ejecuta el prerender después de `vite build`.
- `src/App.tsx`: acepta `initialPath` y evita leer `window` durante el render de servidor.
- `src/main.tsx`: usa `hydrateRoot` cuando encuentra HTML prerenderizado y `createRoot` como fallback.
- `src/entry-server.tsx`: entrada SSR temporal basada en `renderToPipeableStream`.
- `scripts/prerender.mjs`: genera HTML estático y metadatos individuales para las cinco rutas.
- `firebase.json`: rewrites exactos para servir las cuatro rutas internas prerenderizadas antes del wildcard.
- `src/components/ArtGallery.tsx`: título principal de la ruta como H1.
- `src/components/Experiences.tsx`: título principal de la ruta como H1.
- `src/components/ChefBio.tsx`: título principal de la ruta como H1.
- `HANDOFF_ANTIGRAVITY.md`: este documento.

Los demás cambios que ya estaban en el árbol de trabajo se conservaron. No se modificaron backend, Functions, Firestore, formularios, imágenes, DNS ni secretos; `firebase.json` solo recibió los rewrites exactos indicados arriba y no se desplegó.

## Trabajo completado

- Prerender de la portada funcionando.
- Prerender de las cinco rutas públicas funcionando.
- HTML generado en:
  - `dist/index.html`
  - `dist/galeria/index.html`
  - `dist/experiencias/index.html`
  - `dist/chef-franko/index.html`
  - `dist/reservar/index.html`
- Cada documento contiene un H1, contenido visible y una canonical única.
- Cada ruta tiene título, descripción, `og:title`, `og:description` y `og:url` específicos.
- Se conserva la imagen social existente.
- Se mantienen `robots.txt` y `sitemap.xml` dentro de `dist`.
- Se mantienen las imágenes WebP y JPG existentes.
- No se generó JSON-LD.
- No se incluye `/admin` en el prerender ni en el sitemap.
- La salida SSR temporal se crea dentro de `node_modules` y se elimina al finalizar.

## Trabajo pendiente

- Ejecutar una revisión real en Chrome de las cinco rutas y comprobar hidratación en consola.
- Verificar en el emulador o en Firebase Hosting que los rewrites exactos sirven los directorios `dist/<ruta>/index.html` antes del rewrite global.
- Confirmar que el formulario de `/reservar` conserva reCAPTCHA, envío a `/api/lead` y fallback en navegador.
- Los rewrites explícitos ya fueron añadidos; falta validarlos con el emulador o Hosting. `vite preview` aplica su propio fallback SPA y no prueba esta resolución.
- No se ha hecho commit, push ni deploy.

## Errores encontrados y resolución

1. El primer build SSR chocó con los `manualChunks` de `vite.config.ts` y módulos Firebase externalizados. Se resolvió usando una configuración Vite SSR aislada dentro de `scripts/prerender.mjs`, sin cambiar el bundle cliente.
2. El bundle SSR temporal no podía resolver `react` cuando se generaba fuera del proyecto. Se movió a `node_modules/.chef4you-prerender-*`, ignorado y eliminado al terminar.
3. La primera validación mostró que tres rutas tenían H2 como encabezado principal. Se cambiaron solo las etiquetas a H1, conservando clases y contenido.
4. `git diff --check` sigue mostrando un espacio final preexistente en `index.html.bak`; no fue modificado.

## Comandos de validación ejecutados

```text
npm.cmd run build
node audit-assets.js
git diff --check
```

Validación final:

- Build y prerender: correctos.
- Cinco rutas: HTML estático generado.
- Cinco H1: presentes, uno por documento.
- Canonical: una por documento, sin `localhost`.
- Root vacío: no presente.
- Fallback `LoadingSpinner`: no presente en los HTML prerenderizados.
- `audit-assets.js`: correcto; 20 assets encontrados.
- Referencias de assets en los cinco HTML: 27 únicas, 0 faltantes.
- Artefactos SSR temporales restantes: ninguno.

## Próximos pasos exactos para Antigravity

1. Revisar `HANDOFF_ANTIGRAVITY.md` y `git diff` sin descartar cambios locales.
2. Ejecutar `npm.cmd run build`.
3. Ejecutar `npm.cmd run preview -- --host 127.0.0.1`.
4. Abrir en Chrome y revisar `/`, `/galeria`, `/experiencias`, `/chef-franko` y `/reservar`.
5. Confirmar en DevTools que no haya errores de hidratación ni páginas vacías; la validación sin navegador confirmó `hydrateRoot` y HTML no vacío.
6. Probar la apertura y envío controlado del formulario de reservas sin alterar datos reales.
7. Validar en Firebase Hosting que las cinco rutas sirven sus HTML estáticos; `vite preview` no es suficiente por su fallback SPA.
8. Solicitar autorización separada antes de cualquier `firebase deploy --only hosting --project chef-privado`.
