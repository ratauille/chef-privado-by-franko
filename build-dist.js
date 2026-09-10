const fs = require('fs');
const path = require('path');
const { getCleanHtml } = require('./clean-and-optimize-html');

const rootDir = __dirname;
const distDir = path.join(rootDir, 'dist');
const htmlPath = path.join(rootDir, 'Chef4You by Franko Salgado _ Chef Privado & Catering de Lujo en Puerto Vallarta y Riviera Nayarit.html');
const adminHtmlPath = path.join(rootDir, 'admin.html');
const filesDir = path.join(rootDir, 'Chef4You by Franko Salgado _ Chef Privado & Catering de Lujo en Puerto Vallarta y Riviera Nayarit_files');

console.log('📦 Limpiando y preparando directorio dist/ para Firebase Hosting...');

// 1. Clean dist directory completely before build
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

// 2. Build sanitized main landing page as dist/index.html
if (fs.existsSync(htmlPath)) {
  const cleanHtml = getCleanHtml(htmlPath);
  fs.writeFileSync(path.join(distDir, 'index.html'), cleanHtml, 'utf-8');
  console.log('  ✅ Generado dist/index.html optimizado y limpio');
}

// 3. Copy Admin Panel as dist/admin.html and dist/admin/index.html
if (fs.existsSync(adminHtmlPath)) {
  fs.copyFileSync(adminHtmlPath, path.join(distDir, 'admin.html'));
  
  const adminSubDir = path.join(distDir, 'admin');
  if (!fs.existsSync(adminSubDir)) {
    fs.mkdirSync(adminSubDir, { recursive: true });
  }
  fs.copyFileSync(adminHtmlPath, path.join(adminSubDir, 'index.html'));
  console.log('  ✅ Copiado dist/admin.html y dist/admin/index.html');
}

// 4. Copy static assets to dist/_files, dist/assets, and create dist/assets/video directory
function copyFolderRecursiveSync(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  if (fs.lstatSync(source).isDirectory()) {
    const files = fs.readdirSync(source);
    files.forEach((file) => {
      const curSource = path.join(source, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, path.join(target, file));
      } else {
        fs.copyFileSync(curSource, path.join(target, file));
      }
    });
  }
}

if (fs.existsSync(filesDir)) {
  copyFolderRecursiveSync(filesDir, path.join(distDir, 'Chef4You by Franko Salgado _ Chef Privado & Catering de Lujo en Puerto Vallarta y Riviera Nayarit_files'));
  copyFolderRecursiveSync(filesDir, path.join(distDir, 'assets'));
  console.log('  ✅ Copiados recursos estáticos a _files/ y assets/');
}

// Ensure dist/assets/video exists so video references don't fail missing directory checks
const videoDir = path.join(distDir, 'assets', 'video');
if (!fs.existsSync(videoDir)) {
  fs.mkdirSync(videoDir, { recursive: true });
}

console.log('🎉 Directorio dist/ compilado y listo de forma reproducible para Firebase Hosting!');
