import fs from 'node:fs';
import path from 'node:path';

const html = fs.readFileSync('dist/index.html', 'utf-8');
const regex = /(?:src|href)=["']([^"']+)["']/g;
let match;
let missing = 0;
let checked = 0;

console.log('🔍 Auditando assets en dist/index.html...');

while ((match = regex.exec(html)) !== null) {
  const url = match[1];
  if (!url.startsWith('http') && !url.startsWith('data:') && !url.startsWith('#') && !url.startsWith('mailto:') && !url.startsWith('tel:')) {
    checked++;
    const cleanPath = url.startsWith('/') ? url.substring(1) : url;
    const localPath = path.join('dist', decodeURIComponent(cleanPath));
    if (!fs.existsSync(localPath)) {
      console.log('❌ Asset no encontrado:', url, '->', localPath);
      missing++;
    }
  }
}

if (missing === 0) {
  console.log(`✅ ¡AUDITORÍA EXITOSA! Los ${checked} assets (imágenes, fuentes, JS, CSS) existen en dist/ sin ningún problema.`);
} else {
  console.log(`⚠️ Se encontraron ${missing} de ${checked} assets faltantes.`);
}
