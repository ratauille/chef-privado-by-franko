import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8080;
const rootDir = __dirname;

const htmlPath = fs.existsSync(path.join(rootDir, 'dist', 'index.html'))
  ? path.join(rootDir, 'dist', 'index.html')
  : path.join(rootDir, 'Chef4You by Franko Salgado _ Chef Privado & Catering de Lujo en Puerto Vallarta y Riviera Nayarit.html');

const adminHtmlPath = fs.existsSync(path.join(rootDir, 'dist', 'admin.html'))
  ? path.join(rootDir, 'dist', 'admin.html')
  : path.join(rootDir, 'admin.html');

const filesDir = path.join(rootDir, 'Chef4You by Franko Salgado _ Chef Privado & Catering de Lujo en Puerto Vallarta y Riviera Nayarit_files');
const distDir = path.join(rootDir, 'dist');

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
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  let reqUrl = decodeURIComponent(req.url.split('?')[0]).toLowerCase();

  // Match /admin in any form (/admin, /admin/, /admin.html, etc.)
  if (reqUrl.includes('admin')) {
    if (fs.existsSync(adminHtmlPath)) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      return fs.createReadStream(adminHtmlPath).pipe(res);
    }
  }

  // Try serving directly from dist directory if present
  if (fs.existsSync(distDir)) {
    const distFilePath = path.join(distDir, reqUrl.startsWith('/') ? reqUrl.substring(1) : reqUrl);
    if (fs.existsSync(distFilePath) && fs.statSync(distFilePath).isFile()) {
      const ext = path.extname(distFilePath);
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
      return fs.createReadStream(distFilePath).pipe(res);
    }
  }

  // Asset matching in _files directory
  if (reqUrl.includes('_files/') || reqUrl.includes('index-')) {
    const filename = path.basename(reqUrl);
    const filePath = path.join(filesDir, filename);
    if (fs.existsSync(filePath)) {
      const ext = path.extname(filePath);
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/javascript; charset=utf-8' });
      return fs.createReadStream(filePath).pipe(res);
    }
  }

  // Default SPA fallback to main HTML
  if (fs.existsSync(htmlPath)) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return fs.createReadStream(htmlPath).pipe(res);
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Página no encontrada');
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor iniciado exitosamente en el puerto ${PORT}`);
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
