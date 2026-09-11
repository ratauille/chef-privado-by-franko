import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8080;
const rootDir = __dirname;
const distDir = path.join(rootDir, 'dist');

const getHtmlPath = () => {
  if (fs.existsSync(path.join(distDir, 'index.html'))) {
    return path.join(distDir, 'index.html');
  }
  return path.join(rootDir, 'Chef4You by Franko Salgado _ Chef Privado & Catering de Lujo en Puerto Vallarta y Riviera Nayarit.html');
};

const getAdminPath = () => {
  // /admin is rendered by the React SPA and switches to AdminDashboard.
  return getHtmlPath();
};

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain',
  '.descarga': 'application/javascript; charset=utf-8',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // 1. Handle Favicon
  if (pathname === '/favicon.ico') {
    const faviconCandidates = [
      path.join(distDir, 'favicon.ico'),
      path.join(rootDir, 'public', 'favicon.ico'),
      path.join(distDir, 'assets', 'logo.svg'),
      path.join(distDir, 'logo.svg')
    ];
    for (const favPath of faviconCandidates) {
      if (fs.existsSync(favPath) && fs.statSync(favPath).isFile()) {
        const ext = path.extname(favPath);
        res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'image/x-icon' });
        return fs.createReadStream(favPath).pipe(res);
      }
    }
    res.writeHead(204);
    return res.end();
  }

  // 2. Handle Admin Routes (/admin, /admin/, /admin.html)
  if (pathname === '/admin' || pathname === '/admin/' || pathname === '/admin.html') {
    const adminPath = getAdminPath();
    if (fs.existsSync(adminPath)) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      return fs.createReadStream(adminPath).pipe(res);
    }
  }

  // 3. Try serving static file from dist/ or rootDir
  let targetFilePath = path.join(distDir, pathname.startsWith('/') ? pathname.substring(1) : pathname);
  if (!fs.existsSync(targetFilePath) || !fs.statSync(targetFilePath).isFile()) {
    targetFilePath = path.join(rootDir, pathname.startsWith('/') ? pathname.substring(1) : pathname);
  }

  if (fs.existsSync(targetFilePath) && fs.statSync(targetFilePath).isFile()) {
    const ext = path.extname(targetFilePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    return fs.createReadStream(targetFilePath).pipe(res);
  }

  // 4. If request has a file extension (e.g. .js, .css, .jpg) and wasn't found -> 404
  const ext = path.extname(pathname);
  if (ext && ext !== '.html') {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('Archivo no encontrado');
  }

  // 5. SPA Fallback for HTML / page navigation routes (e.g. /, /experiencias, /cotizador)
  const mainHtml = getHtmlPath();
  if (fs.existsSync(mainHtml)) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return fs.createReadStream(mainHtml).pipe(res);
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Página no encontrada');
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor de producción iniciado exitosamente en el puerto ${PORT}`);
  console.log(`📌 Principal: http://localhost:${PORT}/`);
  console.log(`📌 Admin Panel: http://localhost:${PORT}/admin`);
});

process.on('SIGTERM', () => {
  console.log('⚠️ Recibida señal SIGTERM en el contenedor, cerrando servidor limpiamente...');
  server.close(() => {
    console.log('✅ Servidor cerrado correctamente.');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('⚠️ Recibida señal SIGINT, cerrando servidor...');
  server.close(() => {
    process.exit(0);
  });
});
