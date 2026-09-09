const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const htmlPath = path.join(rootDir, 'Chef4You by Franko Salgado _ Chef Privado & Catering de Lujo en Puerto Vallarta y Riviera Nayarit.html');
const filesDirName = 'Chef4You by Franko Salgado _ Chef Privado & Catering de Lujo en Puerto Vallarta y Riviera Nayarit_files';

console.log('🧹 Limpiando y optimizando HTML...');

let html = fs.readFileSync(htmlPath, 'utf-8');

// 1. Remove chrome-extension tags completely
html = html.replace(/<link[^>]*chrome-extension:[^>]*>/g, '');
html = html.replace(/<script[^>]*chrome-extension:[^>]*><\/script>/g, '');
html = html.replace(/<img[^>]*chrome-extension:[^>]*>/g, '');

// 2. Fix HTML entities in asset paths
html = html.replace(/Chef4You by Franko Salgado _ Chef Privado &amp; Catering de Lujo en Puerto Vallarta y Riviera Nayarit_files/g, filesDirName);

// 3. Fix script & link references
html = html.replace(/src="\.\/Chef4You by Franko Salgado _ Chef Privado & Catering de Lujo en Puerto Vallarta y Riviera Nayarit_files\/js"/g, 'src="https://www.googletagmanager.com/gtag/js?id=G-X4T0SBCQVF"');
html = html.replace(/src="\.\/Chef4You by Franko Salgado _ Chef Privado & Catering de Lujo en Puerto Vallarta y Riviera Nayarit_files\/js\(1\)"/g, 'src="https://www.googletagmanager.com/gtag/js?id=AW-18238345793"');

// Save cleaned HTML back
fs.writeFileSync(htmlPath, html, 'utf-8');
console.log('✅ HTML limpiado e higienizado correctamente.');
