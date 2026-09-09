const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const distDir = path.join(rootDir, 'dist');
const htmlPath = path.join(rootDir, 'Chef4You by Franko Salgado _ Chef Privado & Catering de Lujo en Puerto Vallarta y Riviera Nayarit.html');
const adminHtmlPath = path.join(rootDir, 'admin.html');
const filesDir = path.join(rootDir, 'Chef4You by Franko Salgado _ Chef Privado & Catering de Lujo en Puerto Vallarta y Riviera Nayarit_files');

console.log('📦 Preparando directorio dist/ para Firebase Hosting...');

// Create dist directory
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// 1. Copy main landing page as index.html
if (fs.existsSync(htmlPath)) {
  fs.copyFileSync(htmlPath, path.join(distDir, 'index.html'));
  console.log('  ✅ Copiado index.html');
}

// 2. Copy Admin Panel as admin.html
if (fs.existsSync(adminHtmlPath)) {
  fs.copyFileSync(adminHtmlPath, path.join(distDir, 'admin.html'));
  
  // Also create dist/admin/index.html for clean /admin routing
  const adminSubDir = path.join(distDir, 'admin');
  if (!fs.existsSync(adminSubDir)) {
    fs.mkdirSync(adminSubDir, { recursive: true });
  }
  fs.copyFileSync(adminHtmlPath, path.join(adminSubDir, 'index.html'));
  console.log('  ✅ Copiado admin.html y admin/index.html');
}

// 3. Copy static assets to dist/_files and dist/assets
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

console.log('🎉 Directorio dist/ compilado y listo para despliegue en Firebase Hosting!');
