import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function getCleanHtml(inputHtmlPath) {
  const rootDir = __dirname;
  const htmlPath = inputHtmlPath || path.join(rootDir, 'Chef4You by Franko Salgado _ Chef Privado & Catering de Lujo en Puerto Vallarta y Riviera Nayarit.html');
  const filesDirName = 'Chef4You by Franko Salgado _ Chef Privado & Catering de Lujo en Puerto Vallarta y Riviera Nayarit_files';

  if (!fs.existsSync(htmlPath)) {
    throw new Error(`Archivo fuente HTML no encontrado: ${htmlPath}`);
  }

  let html = fs.readFileSync(htmlPath, 'utf-8');

  // 1. Remove chrome-extension tags
  html = html.replace(/<link[^>]*chrome-extension:[^>]*>/g, '');
  html = html.replace(/<script[^>]*chrome-extension:[^>]*><\/script>/g, '');
  html = html.replace(/<img[^>]*chrome-extension:[^>]*>/g, '');

  // 2. Reemplazar enlaces antiguos a Netlify por el dominio de producción / anclas relativas
  html = html.replace(/https:\/\/chef4youbyfranko\.netlify\.app\/#hero/g, '#hero');
  html = html.replace(/https:\/\/chef4youbyfranko\.netlify\.app\/#experiencias/g, '#experiencias');
  html = html.replace(/https:\/\/chef4youbyfranko\.netlify\.app\/#banner-servicios/g, '#banner-servicios');
  html = html.replace(/https:\/\/chef4youbyfranko\.netlify\.app\/#chef-franko/g, '#chef-franko');
  html = html.replace(/https:\/\/chef4youbyfranko\.netlify\.app\/#cotizador/g, '#cotizador');
  html = html.replace(/https:\/\/chef4youbyfranko\.netlify\.app\/#testimonios/g, '#testimonios');
  html = html.replace(/https:\/\/chef4youbyfranko\.netlify\.app/g, 'https://chef4youbyfranko.com');

  // 3. Fix HTML entities y rutas relativas de assets
  html = html.replace(/Chef4You by Franko Salgado _ Chef Privado &amp; Catering de Lujo en Puerto Vallarta y Riviera Nayarit_files/g, filesDirName);

  // 4. Fix script & link references de Google Tag Manager / Ads
  html = html.replace(/src="\.\/Chef4You by Franko Salgado _ Chef Privado & Catering de Lujo en Puerto Vallarta y Riviera Nayarit_files\/js"/g, 'src="https://www.googletagmanager.com/gtag/js?id=G-X4T0SBCQVF"');
  html = html.replace(/src="\.\/Chef4You by Franko Salgado _ Chef Privado & Catering de Lujo en Puerto Vallarta y Riviera Nayarit_files\/js\(1\)"/g, 'src="https://www.googletagmanager.com/gtag/js?id=AW-18238345793"');

  return html;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  console.log('🧹 Probando sanitización de HTML en memoria...');
  const cleanHtml = getCleanHtml();
  console.log(`✅ HTML procesado correctamente (${cleanHtml.length} bytes). El archivo fuente NO fue sobreescrito.`);
}
