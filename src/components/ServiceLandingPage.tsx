import { useLanguage } from '../lib/i18n';
import { canonicalUrl, getLocalizedPath } from '../lib/pageMetadata';
import { servicePages } from '../lib/servicePages';

export function ServiceLandingPage({ page }: { page: (typeof servicePages)[number] }) {
  const { lang } = useLanguage();
  const [title, intro] = page[lang];
  const details = lang === 'en' ? page.enDetails : page.esDetails;
  const href = (route: string) => new URL(canonicalUrl(getLocalizedPath(route, lang))).pathname;

  return (
    <article className="mx-auto w-full max-w-5xl space-y-12 px-5 py-16 sm:px-8 sm:py-24">
      <header className="space-y-5">
        <p className="text-xs font-bold uppercase tracking-widest text-[#17545a]">Chef4You by Franko</p>
        <h1 className="font-serif text-4xl font-light text-[#082f33] sm:text-6xl">{title}</h1>
        <p className="max-w-2xl text-lg leading-relaxed text-[#4a6466]">{intro}</p>
        <a href={href('/reservar')} className="inline-block rounded-lg bg-[#0c5157] px-6 py-3 font-semibold text-white">
          {lang === 'en' ? 'Request a proposal' : 'Solicitar una propuesta'}
        </a>
      </header>
      <div className="grid gap-8 md:grid-cols-2">
        {details.map(([heading, copy]) => (
          <section key={heading} className="space-y-3 rounded-2xl border border-[#d8e7e4] bg-white p-6">
            <h2 className="font-serif text-2xl text-[#082f33]">{heading}</h2>
            <p className="leading-relaxed text-[#4a6466]">{copy}</p>
          </section>
        ))}
      </div>
      <div className="flex flex-wrap gap-6">
        <a href={href('/menu')} className="text-[#17545a] underline">{lang === 'en' ? 'Explore private chef menus' : 'Explorar menús de chef privado'}</a>
        <a href={href('/experiencias')} className="text-[#17545a] underline">{lang === 'en' ? 'Explore all experiences' : 'Explorar todas las experiencias'}</a>
      </div>
    </article>
  );
}
