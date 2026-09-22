import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Calendar, MapPin, Menu, Star, X } from 'lucide-react';

interface HomePageProps {
  onOpenQuote: () => void;
  onNavigate: (path: string) => void;
}

const experiences = [
  {
    title: 'Private Villa Dinner',
    copy: 'A beautifully paced dinner created around your villa, your guests and the occasion.',
    image: '/assets/banquete_gala_frente_al_mar.jpg',
  },
  {
    title: 'The Mexican Table',
    copy: 'A contemporary journey through Mexican ingredients, memories and coastal character.',
    image: '/assets/cena_degustacion_5_tiempos.png',
  },
  {
    title: 'An Evening for Two',
    copy: 'An intimate culinary ritual for proposals, anniversaries and unhurried celebrations.',
    image: '/assets/IMG_1937.jpg',
  },
];

export const HomePage: React.FC<HomePageProps> = ({ onOpenQuote, onNavigate }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const go = (event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    event.preventDefault();
    setMenuOpen(false);
    onNavigate(path);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#f7f8f5] text-[#102f33] selection:bg-[#0e7778] selection:text-white">
      <header className="absolute inset-x-0 top-0 z-40 border-b border-white/20 text-white">
        <div className="mx-auto flex h-24 max-w-[1480px] items-center justify-between px-6 lg:px-12">
          <a href="/" onClick={(event) => go(event, '/')} className="font-serif text-2xl tracking-wide">
            Chef 4 You <span className="ml-1 font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-[#bfe0dc]">by Franko</span>
          </a>
          <nav className="hidden items-center gap-9 text-xs font-semibold uppercase tracking-[0.16em] lg:flex">
            <a href="/experiencias" onClick={(event) => go(event, '/experiencias')} className="transition-colors hover:text-[#bfe0dc]">Experiences</a>
            <a href="/chef-franko" onClick={(event) => go(event, '/chef-franko')} className="transition-colors hover:text-[#bfe0dc]">Chef Franko</a>
            <a href="/galeria" onClick={(event) => go(event, '/galeria')} className="transition-colors hover:text-[#bfe0dc]">Gallery</a>
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={onOpenQuote} className="hidden rounded-full border border-white/55 px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] transition hover:bg-white hover:text-[#124e52] sm:inline-flex">
              Request an experience
            </button>
            <button onClick={() => setMenuOpen((value) => !value)} className="rounded-full border border-white/40 p-2.5 lg:hidden" aria-label="Toggle navigation">
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="mx-4 rounded-2xl bg-[#0d4145]/95 p-6 shadow-2xl backdrop-blur-xl lg:hidden">
            <div className="space-y-4 text-sm uppercase tracking-[0.14em]">
              <a href="/experiencias" onClick={(event) => go(event, '/experiencias')} className="block">Experiences</a>
              <a href="/chef-franko" onClick={(event) => go(event, '/chef-franko')} className="block">Chef Franko</a>
              <a href="/galeria" onClick={(event) => go(event, '/galeria')} className="block">Gallery</a>
              <button onClick={() => { setMenuOpen(false); onOpenQuote(); }} className="w-full rounded-full bg-white px-5 py-3 font-bold text-[#124e52]">Request an experience</button>
            </div>
          </div>
        )}
      </header>

      <main>
        <section className="relative flex min-h-[94vh] items-end overflow-hidden bg-[#0d4145] text-white">
          <img src="/assets/chef_franko_team.webp" alt="Chef Franko hosting a private dining experience" className="absolute inset-0 h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,42,45,.92)_0%,rgba(7,42,45,.62)_48%,rgba(7,42,45,.18)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(6,34,37,.65)_0%,transparent_48%)]" />
          <motion.div className="relative mx-auto w-full max-w-[1480px] px-6 pb-16 pt-44 lg:px-12 lg:pb-24" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <p className="mb-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.26em] text-[#bfe0dc]"><span className="h-px w-10 bg-[#bfe0dc]" />Private chef · Puerto Vallarta</p>
            <h1 className="max-w-4xl font-serif text-5xl font-light leading-[0.98] sm:text-7xl lg:text-[96px]">
              The art of living,<br /><span className="italic text-[#cfe8e4]">served at your table.</span>
            </h1>
            <p className="mt-8 max-w-xl text-base font-light leading-8 text-white/78 sm:text-lg">
              Personal private dining for villas and destination stays in Puerto Vallarta, Punta Mita and Nuevo Nayarit.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button onClick={onOpenQuote} className="inline-flex items-center justify-center gap-3 rounded-full bg-[#f6f5ef] px-7 py-4 text-sm font-bold text-[#124e52] shadow-[0_18px_45px_rgba(0,0,0,.18)] transition hover:-translate-y-0.5">
                <Calendar className="h-4 w-4" /> Request your experience <ArrowRight className="h-4 w-4" />
              </button>
              <a href="/experiencias" onClick={(event) => go(event, '/experiencias')} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-7 py-4 text-sm font-semibold transition hover:bg-white/10">Explore the experiences</a>
            </div>
          </motion.div>
        </section>

        <section className="border-b border-[#153f42]/10 bg-[#eef3ef] px-6 py-6 lg:px-12">
          <div className="mx-auto flex max-w-[1480px] flex-col justify-between gap-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#315d60] sm:flex-row sm:items-center">
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[#0e7778]" />Puerto Vallarta · Punta Mita · Nuevo Nayarit</span>
            <span>Private villas · Celebrations · Destination dining</span>
          </div>
        </section>

        <section className="px-6 py-24 lg:px-12 lg:py-36">
          <div className="mx-auto max-w-[1480px]">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#0e7778]">Curated experiences</p>
                <h2 className="mt-5 max-w-4xl font-serif text-4xl font-light leading-[1.05] text-[#153f42] sm:text-6xl">A private restaurant appears wherever <span className="italic text-[#0e7778]">you choose to gather.</span></h2>
              </div>
              <p className="max-w-md leading-7 text-[#557174] lg:col-span-4">Every menu begins with a conversation. The food, rhythm and service are composed around the people at your table.</p>
            </div>
            <div className="mt-16 grid gap-7 lg:grid-cols-3">
              {experiences.map((experience, index) => (
                <motion.article key={experience.title} className="group overflow-hidden rounded-[2rem] bg-white shadow-[0_24px_70px_rgba(25,67,69,.10)]" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
                  <div className="h-80 overflow-hidden"><img src={experience.image} alt={experience.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /></div>
                  <div className="p-8">
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#0e7778]">0{index + 1} · Signature experience</p>
                    <h3 className="mt-4 font-serif text-3xl text-[#153f42]">{experience.title}</h3>
                    <p className="mt-4 min-h-20 leading-7 text-[#60787a]">{experience.copy}</p>
                    <button onClick={onOpenQuote} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#0e6f71]">Plan this experience <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></button>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#123f43] px-6 py-24 text-white lg:px-12 lg:py-32">
          <div className="mx-auto grid max-w-[1480px] gap-14 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5"><img src="/assets/chef_franko_brigada.jpg" alt="Chef Franko and his culinary team" className="h-[560px] w-full rounded-[2.25rem] object-cover shadow-2xl" /></div>
            <div className="lg:col-span-7 lg:pl-10">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#9ed3cf]">Chef Franko Salgado</p>
              <h2 className="mt-6 font-serif text-4xl font-light leading-[1.08] sm:text-6xl">Hospitality is not an extra.<br /><span className="italic text-[#bfe0dc]">It is the heart of the experience.</span></h2>
              <p className="mt-7 max-w-2xl text-lg font-light leading-8 text-white/72">Cooking inside a private villa asks for more than technique. It asks for discretion, intuition and the ability to make every guest feel genuinely cared for.</p>
              <a href="/chef-franko" onClick={(event) => go(event, '/chef-franko')} className="mt-9 inline-flex items-center gap-3 border-b border-[#9ed3cf]/70 pb-2 text-sm font-bold text-[#cfe8e4]">Discover Chef Franko's story <ArrowRight className="h-4 w-4" /></a>
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-24 text-center lg:px-12 lg:py-32">
          <div className="mx-auto max-w-4xl">
            <div className="flex justify-center gap-1 text-[#0e7778]">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="h-4 w-4 fill-current" />)}</div>
            <p className="mt-8 font-serif text-3xl font-light leading-snug text-[#153f42] sm:text-5xl">“It was truly an unforgettable experience. Every detail made the celebration feel completely personal.”</p>
            <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-[#668082]">Eva · Verified private birthday dinner</p>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#e5efeb] px-6 py-24 text-center lg:px-12 lg:py-32">
          <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#5eb3ad]/15 blur-3xl" />
          <div className="relative mx-auto max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#0e7778]">Your table awaits</p>
            <h2 className="mt-5 font-serif text-4xl font-light text-[#153f42] sm:text-6xl">Let us create an evening that belongs only to you.</h2>
            <button onClick={onOpenQuote} className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#0e6f71] px-8 py-4 text-sm font-bold text-white shadow-[0_18px_40px_rgba(14,111,113,.22)] transition hover:-translate-y-0.5">Request your private experience <ArrowRight className="h-4 w-4" /></button>
          </div>
        </section>
      </main>

      <footer className="bg-[#082f33] px-6 py-14 text-white/70 lg:px-12">
        <div className="mx-auto flex max-w-[1480px] flex-col justify-between gap-8 border-b border-white/10 pb-10 md:flex-row md:items-end">
          <div><p className="font-serif text-3xl text-white">Chef 4 You <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#9ed3cf]">by Franko</span></p><p className="mt-3 max-w-md text-sm leading-6">Private dining, thoughtfully hosted in Puerto Vallarta, Punta Mita and Nuevo Nayarit.</p></div>
          <div className="flex flex-wrap gap-6 text-xs font-semibold uppercase tracking-[0.14em]"><a href="/experiencias" onClick={(event) => go(event, '/experiencias')}>Experiences</a><a href="/chef-franko" onClick={(event) => go(event, '/chef-franko')}>Chef Franko</a><a href="/galeria" onClick={(event) => go(event, '/galeria')}>Gallery</a></div>
        </div>
        <div className="mx-auto mt-8 flex max-w-[1480px] flex-col justify-between gap-3 text-xs md:flex-row"><span>© {new Date().getFullYear()} Chef 4 You by Franko.</span><span>The Art of Living.</span></div>
      </footer>
    </div>
  );
};
