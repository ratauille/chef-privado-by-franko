const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5173;
const rootDir = __dirname;
const htmlPath = path.join(rootDir, 'Chef4You by Franko Salgado _ Chef Privado & Catering de Lujo en Puerto Vallarta y Riviera Nayarit.html');
const adminHtmlPath = path.join(rootDir, 'admin.html');
const filesDir = path.join(rootDir, 'Chef4You by Franko Salgado _ Chef Privado & Catering de Lujo en Puerto Vallarta y Riviera Nayarit_files');

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain',
  '.descarga': 'application/javascript; charset=utf-8'
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
  console.log(`🚀 Servidor local iniciado exitosamente en todas las interfaces en el puerto ${PORT}`);
  console.log(`📌 Admin Panel: http://localhost:${PORT}/admin`);
  console.log(`📌 Admin Panel (IP): http://127.0.0.1:${PORT}/admin`);
});
