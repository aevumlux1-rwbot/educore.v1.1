import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Heart, Menu, Play, ShieldCheck, Sparkles, UsersRound } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTenant } from '@/contexts/TenantContext';
import { PASCOA_HERO } from '@/tenants/colegio-pascoa/media/pascoa_hero';
import { PASCOA_COMMUNITY } from '@/tenants/colegio-pascoa/media/pascoa_community';
import { PASCOA_CAMPUS } from '@/tenants/colegio-pascoa/media/pascoa_campus';
import { PASCOA_VIDEO } from '@/tenants/colegio-pascoa/media/pascoa_video';

const HERO = PASCOA_HERO;
const COMMUNITY = PASCOA_COMMUNITY;
const CAMPUS = PASCOA_CAMPUS;
const VIDEO = PASCOA_VIDEO;

const values = [
  { icon: BookOpen, title: 'Ensino com propósito', copy: 'Aprendizagem acompanhada com atenção ao percurso de cada aluno.' },
  { icon: UsersRound, title: 'Comunidade presente', copy: 'Escola, alunos e famílias ligados ao mesmo caminho educativo.' },
  { icon: Heart, title: 'Valores para a vida', copy: 'Conhecimento, responsabilidade, respeito e crescimento em conjunto.' },
];

const journeys = [
  { number: '01', title: 'Aprender', copy: 'Conhecimento com contexto, acompanhamento e espaço para descobrir.' },
  { number: '02', title: 'Explorar', copy: 'A escola também acontece nos projectos, actividades e experiências partilhadas.' },
  { number: '03', title: 'Crescer', copy: 'Cada etapa liga competências, autonomia e participação na comunidade.' },
];

export default function PascoaLanding() {
  const { activeTenant } = useTenant();
  const reduceMotion = useReducedMotion();

  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 22 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-80px' },
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fffdf7] text-[#123b31]" style={{ '--pascoa-red': '#e30620', '--pascoa-yellow': '#f8ac00', '--pascoa-green': '#009f68' } as React.CSSProperties}>
      <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-white/92 backdrop-blur-xl">
        <div className="mx-auto flex h-[78px] max-w-[1440px] items-center justify-between px-5 sm:px-7 lg:px-10 xl:px-14">
          <a href="#top" className="flex items-center gap-3" aria-label="Colégio Páscoa - início">
            <img src={activeTenant.branding.logo} alt="Logótipo do Colégio Páscoa" className="h-14 w-14 rounded-full object-contain" />
            <div className="leading-tight">
              <strong className="block text-[17px] font-extrabold tracking-[-0.02em] text-[#08784f]">Colégio Páscoa</strong>
              <span className="block text-[11px] font-semibold text-[#47645c]">Educar para Transformar</span>
            </div>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-semibold text-[#37574f] lg:flex" aria-label="Navegação principal">
            <a href="#escola" className="transition hover:text-[#008f5d]">A Escola</a>
            <a href="#experiencia" className="transition hover:text-[#008f5d]">Experiência</a>
            <a href="#vida" className="transition hover:text-[#008f5d]">Vida Escolar</a>
            <a href="#portal" className="transition hover:text-[#008f5d]">Portal</a>
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/login" className="hidden min-h-11 items-center gap-2 rounded-full bg-[#009f68] px-5 text-sm font-extrabold text-white shadow-[0_10px_30px_rgba(0,159,104,.18)] transition hover:-translate-y-0.5 hover:bg-[#008c5c] sm:inline-flex">
              Entrar no portal <ArrowRight className="h-4 w-4" />
            </Link>
            <button type="button" className="grid h-11 w-11 place-items-center rounded-full border border-black/10 lg:hidden" aria-label="Abrir menu">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="relative isolate overflow-hidden bg-white">
          <div className="pointer-events-none absolute -left-36 top-32 h-72 w-72 rounded-full border-[54px] border-[#f8ac00]/15" />
          <div className="pointer-events-none absolute left-[43%] top-0 h-full w-40 -skew-x-[10deg] bg-[#009f68]/[0.035]" />
          <div className="mx-auto grid min-h-[680px] max-w-[1440px] items-center gap-12 px-5 py-12 sm:px-7 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:py-16 xl:px-14">
            <motion.div {...reveal} className="relative z-10 max-w-[620px]">
              <div className="mb-7 flex items-center gap-3">
                <span className="h-[3px] w-9 rounded-full bg-[#f8ac00]" />
                <span className="text-[11px] font-black uppercase tracking-[0.22em] text-[#009f68]">Colégio Páscoa</span>
              </div>
              <h1 className="text-[clamp(3.3rem,7.2vw,7.2rem)] font-black leading-[0.84] tracking-[-0.065em] text-[#0e3a30]">
                Educar para
                <span className="mt-1 block text-[#e30620]">Transformar.</span>
              </h1>
              <p className="mt-7 max-w-xl text-base leading-7 text-[#526d65] sm:text-lg sm:leading-8">
                Uma experiência escolar feita de aprendizagem, acompanhamento e comunidade — dentro e fora da sala de aula.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#escola" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#08784f] px-6 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#066c46]">
                  Conhecer a escola <ArrowRight className="h-4 w-4" />
                </a>
                <a href="https://www.instagram.com/colegiopascoa" target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#0b6d4b]/25 bg-white px-6 text-sm font-extrabold text-[#0b6d4b] transition hover:border-[#0b6d4b]/45 hover:bg-[#f6fbf8]">
                  Ver vida escolar
                </a>
              </div>

              <div className="mt-10 grid max-w-xl grid-cols-1 gap-4 border-t border-[#143b31]/10 pt-6 sm:grid-cols-3">
                {values.map(({ icon: Icon, title }) => (
                  <div key={title} className="flex items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#eff8f3] text-[#08784f]"><Icon className="h-[18px] w-[18px]" /></span>
                    <span className="text-xs font-extrabold leading-4 text-[#36574e]">{title}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...reveal} className="relative min-h-[470px] lg:min-h-[600px]">
              <div className="absolute inset-[4%_0_0_8%] overflow-hidden rounded-[3.2rem_1.8rem_4.6rem_2.4rem] bg-[#dff4e8] shadow-[0_35px_90px_rgba(15,78,58,.16)]">
                <img src={HERO} alt="Comunidade escolar do Colégio Páscoa" className="h-full w-full object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#052e24]/38 via-transparent to-transparent" />
              </div>
              <div className="absolute -left-4 top-[18%] h-[66%] w-[32px] rotate-[4deg] rounded-full bg-[#009f68] shadow-lg sm:w-[42px]" />
              <div className="absolute left-8 top-[15%] h-[69%] w-[17px] rotate-[7deg] rounded-full bg-[#f8ac00] sm:w-[23px]" />
              <div className="absolute -bottom-3 right-[7%] w-[78%] rounded-[2rem] border border-white/60 bg-white/94 p-5 shadow-[0_18px_60px_rgba(18,59,49,.18)] backdrop-blur md:w-[62%]">
                <div className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#f8ac00] text-xl font-black text-white">“</span>
                  <div>
                    <p className="text-base font-extrabold leading-6 text-[#163e34]">Hoje aprendemos. Amanhã transformamos.</p>
                    <span className="mt-2 block text-xs font-semibold text-[#668078]">Uma escola feita de pessoas e experiências.</span>
                  </div>
                </div>
              </div>
              <span className="absolute right-5 top-4 h-20 w-20 rounded-full border-[15px] border-[#e30620]/85 sm:h-28 sm:w-28 sm:border-[20px]" />
            </motion.div>
          </div>
        </section>

        <section id="escola" className="relative overflow-hidden border-y border-black/[0.05] bg-[#f5fbf7] py-20 lg:py-28">
          <div className="mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-7 lg:grid-cols-[1.06fr_.94fr] lg:items-center lg:px-10 xl:px-14">
            <motion.div {...reveal} className="relative min-h-[500px]">
              <div className="absolute inset-[0_7%_8%_0] overflow-hidden rounded-[2.8rem_5.5rem_2.8rem_2.8rem] shadow-[0_26px_70px_rgba(15,70,53,.14)]">
                <img src={CAMPUS} alt="Alunos no campus do Colégio Páscoa" className="h-full w-full object-cover" />
              </div>
              <div className="absolute bottom-0 right-0 w-[46%] overflow-hidden rounded-[50%_50%_2rem_50%] border-[8px] border-[#f5fbf7] bg-white shadow-xl">
                <img src={COMMUNITY} alt="Momento da comunidade escolar" className="aspect-square w-full object-cover" />
              </div>
              <p className="absolute left-6 top-7 max-w-[170px] rotate-[-4deg] text-2xl font-black leading-7 tracking-[-0.04em] text-white drop-shadow-lg sm:text-3xl">Um lugar para crescer.</p>
            </motion.div>

            <motion.div {...reveal}>
              <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-[#e30620]"><span className="h-[2px] w-8 bg-[#e30620]" /> Sobre a escola</div>
              <h2 className="mt-5 max-w-2xl text-4xl font-black leading-[1.03] tracking-[-0.045em] text-[#0d4b3d] sm:text-5xl lg:text-6xl">Mais que uma escola, uma comunidade.</h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-[#60766f] sm:text-lg sm:leading-8">
                O Colégio Páscoa reúne aprendizagem, cuidado e participação num ambiente onde cada percurso pode ser acompanhado de forma próxima.
              </p>
              <div className="mt-9 space-y-6">
                {values.map(({ icon: Icon, title, copy }, index) => (
                  <div key={title} className="grid grid-cols-[52px_1fr] gap-4 border-b border-[#0e4638]/10 pb-6 last:border-none">
                    <span className={`grid h-12 w-12 place-items-center rounded-2xl ${index === 1 ? 'bg-[#fff5d7] text-[#c78100]' : index === 2 ? 'bg-[#fff0f1] text-[#d90820]' : 'bg-[#e9f7ef] text-[#08784f]'}`}><Icon className="h-5 w-5" /></span>
                    <div><h3 className="text-base font-extrabold text-[#123f34]">{title}</h3><p className="mt-1 text-sm leading-6 text-[#6a7d77]">{copy}</p></div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section id="experiencia" className="relative overflow-hidden bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-7 lg:px-10 xl:px-14">
            <motion.div {...reveal} className="max-w-4xl">
              <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-[#009f68]"><span className="h-[2px] w-8 bg-[#009f68]" /> Experiência escolar</div>
              <h2 className="mt-5 text-4xl font-black tracking-[-0.045em] text-[#0e3a30] sm:text-5xl lg:text-6xl">Aprender. Explorar. Crescer.</h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#61776f]">Uma sequência contínua, dentro e fora da sala de aula, que liga conhecimento, participação e autonomia.</p>
            </motion.div>

            <div className="relative mt-14 lg:mt-20">
              <div className="absolute left-[18px] top-0 hidden h-full w-px bg-[#0f4b3c]/10 lg:block" />
              {journeys.map((item, index) => (
                <motion.article {...reveal} key={item.number} className="relative grid gap-5 border-t border-[#143c32]/10 py-8 lg:grid-cols-[100px_1fr_1.1fr] lg:items-center lg:py-10">
                  <div className="relative z-10 flex items-center gap-3 lg:block">
                    <span className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-xs font-black text-white ${index === 0 ? 'bg-[#009f68]' : index === 1 ? 'bg-[#f8ac00]' : 'bg-[#e30620]'}`}>{item.number}</span>
                  </div>
                  <div><h3 className="text-3xl font-black tracking-[-0.035em] text-[#113e33]">{item.title}</h3><p className="mt-2 max-w-xl text-sm leading-6 text-[#6c817a] sm:text-base sm:leading-7">{item.copy}</p></div>
                  <div className="relative h-[180px] overflow-hidden rounded-[2rem] lg:h-[210px]">
                    <img src={index === 1 ? COMMUNITY : index === 2 ? CAMPUS : HERO} alt="Vida escolar no Colégio Páscoa" className="h-full w-full object-cover transition duration-700 hover:scale-[1.03]" />
                    <div className={`absolute inset-y-0 left-0 w-3 ${index === 0 ? 'bg-[#009f68]' : index === 1 ? 'bg-[#f8ac00]' : 'bg-[#e30620]'}`} />
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="vida" className="relative overflow-hidden bg-[#0a5a42] py-20 text-white lg:py-28">
          <div className="absolute -right-28 -top-28 h-72 w-72 rounded-full border-[46px] border-[#f8ac00]/25" />
          <div className="absolute -bottom-28 left-[45%] h-64 w-64 rounded-full border-[42px] border-[#e30620]/25" />
          <div className="mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-7 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:px-10 xl:px-14">
            <motion.div {...reveal}>
              <div className="text-[11px] font-black uppercase tracking-[0.2em] text-[#ffd26b]">Dentro do Colégio</div>
              <h2 className="mt-5 text-4xl font-black leading-[1.03] tracking-[-0.045em] sm:text-5xl lg:text-6xl">A aprendizagem também ganha movimento.</h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-white/72 sm:text-lg sm:leading-8">Projectos, apresentações e experiências partilhadas fazem parte da memória escolar e ajudam a tornar o conhecimento concreto.</p>
              <div className="mt-8 flex items-center gap-3 text-sm font-bold text-white/78"><Sparkles className="h-5 w-5 text-[#ffd26b]" /> Momentos reais da comunidade escolar</div>
            </motion.div>

            <motion.div {...reveal} className="relative mx-auto w-full max-w-[780px]">
              <div className="grid gap-4 sm:grid-cols-[.75fr_1.25fr] sm:items-end">
                <div className="overflow-hidden rounded-[2.4rem] bg-black/20 shadow-2xl">
                  <video src={VIDEO} poster={COMMUNITY} controls muted playsInline preload="metadata" className="aspect-[9/16] max-h-[520px] w-full object-cover" aria-label="Vídeo de actividade educativa do Colégio Páscoa" />
                </div>
                <div className="relative overflow-hidden rounded-[2.8rem] bg-white/10 p-1 shadow-2xl">
                  <img src={HERO} alt="Comunidade do Colégio Páscoa" className="aspect-[4/3] w-full rounded-[2.55rem] object-cover" />
                  <div className="absolute bottom-7 left-7 right-7 rounded-2xl bg-[#fffdf7]/94 p-5 text-[#123b31] backdrop-blur">
                    <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-[#e30620] text-white"><Play className="h-4 w-4 fill-current" /></span><div><p className="text-sm font-extrabold">Vida escolar em contexto</p><p className="mt-1 text-xs text-[#6e817b]">Um olhar para projectos, espaço e comunidade.</p></div></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="portal" className="relative overflow-hidden bg-[#fffdf7] py-20 lg:py-28">
          <div className="mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-7 lg:grid-cols-[1fr_1fr] lg:items-center lg:px-10 xl:px-14">
            <motion.div {...reveal}>
              <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-[#e30620]"><span className="h-[2px] w-8 bg-[#e30620]" /> Portal escolar</div>
              <h2 className="mt-5 max-w-2xl text-4xl font-black leading-[1.03] tracking-[-0.045em] text-[#0d4b3d] sm:text-5xl lg:text-6xl">A escola continua para além do portão.</h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-[#61776f] sm:text-lg sm:leading-8">Informação académica, acompanhamento, comunicação e operações do dia a dia num único ambiente, com acesso adequado a cada função.</p>
              <Link to="/login" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#e30620] px-6 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#c90019]">Entrar no portal <ArrowRight className="h-4 w-4" /></Link>
              <div className="mt-8 flex items-center gap-3 text-xs font-bold text-[#70847e]"><ShieldCheck className="h-5 w-5 text-[#08784f]" /> Experiência do Colégio Páscoa, suportada pela plataforma EduCore.</div>
            </motion.div>

            <motion.div {...reveal} className="relative">
              <div className="rounded-[2.7rem] bg-[#123e33] p-4 shadow-[0_30px_80px_rgba(18,62,51,.24)] sm:p-6">
                <div className="rounded-[2rem] bg-white p-5 sm:p-7">
                  <div className="flex items-center justify-between border-b border-black/[0.06] pb-5"><div className="flex items-center gap-3"><img src={activeTenant.branding.logo} alt="" className="h-11 w-11 rounded-full object-contain" /><div><p className="text-sm font-extrabold text-[#123e33]">Portal escolar</p><p className="text-xs text-[#82928d]">Colégio Páscoa</p></div></div><span className="h-9 w-9 rounded-full bg-[#eef7f2]" /></div>
                  <div className="grid gap-4 py-6 sm:grid-cols-2"><div className="rounded-2xl bg-[#f2f8f4] p-5"><p className="text-xs font-bold text-[#72867f]">Percurso académico</p><p className="mt-3 text-2xl font-black text-[#0d513f]">Notas & avaliações</p></div><div className="rounded-2xl bg-[#fff4dc] p-5"><p className="text-xs font-bold text-[#8b7a52]">Dia escolar</p><p className="mt-3 text-2xl font-black text-[#8a5f00]">Horário & faltas</p></div></div>
                  <div className="space-y-3">{['Aluno', 'Encarregado', 'Professor', 'Pedagogia', 'Direcção', 'Secretaria', 'Finanças'].map((role, index) => <div key={role} className="flex items-center justify-between rounded-xl border border-black/[0.06] px-4 py-3"><span className="text-sm font-bold text-[#34564d]">{role}</span><span className={`h-2.5 w-2.5 rounded-full ${index % 3 === 0 ? 'bg-[#009f68]' : index % 3 === 1 ? 'bg-[#f8ac00]' : 'bg-[#e30620]'}`} /></div>)}</div>
                </div>
              </div>
              <div className="absolute -bottom-7 -left-7 h-24 w-24 rounded-full bg-[#f8ac00] opacity-90" />
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full border-[20px] border-[#e30620]/90" />
            </motion.div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#e30620] py-16 text-white lg:py-20">
          <div className="absolute -left-20 top-1/2 h-52 w-52 -translate-y-1/2 rounded-full border-[32px] border-[#f8ac00]/35" />
          <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-5 sm:px-7 lg:flex-row lg:items-center lg:justify-between lg:px-10 xl:px-14">
            <div><p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#ffe5a7]">Colégio Páscoa</p><h2 className="mt-3 text-4xl font-black tracking-[-0.045em] sm:text-5xl">Educar para Transformar.</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-white/76 sm:text-base">Uma escola feita de pessoas, aprendizagem e oportunidades para crescer.</p></div>
            <div className="flex flex-col gap-3 sm:flex-row"><a href="https://www.instagram.com/colegiopascoa" target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-extrabold text-[#b80b1c]">Conhecer a escola</a><Link to="/login" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/40 px-6 text-sm font-extrabold text-white">Portal <ArrowRight className="h-4 w-4" /></Link></div>
          </div>
        </section>
      </main>

      <footer className="bg-white">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-10 sm:px-7 lg:grid-cols-[1fr_auto] lg:items-center lg:px-10 xl:px-14">
          <div className="flex items-center gap-3"><img src={activeTenant.branding.logo} alt="Logótipo do Colégio Páscoa" className="h-12 w-12 rounded-full object-contain" /><div><p className="text-sm font-extrabold text-[#08784f]">Colégio Páscoa</p><p className="text-xs text-[#788b85]">Educar para Transformar</p></div></div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-bold text-[#647a73]"><a href="#escola">A Escola</a><a href="#vida">Vida Escolar</a><a href="#portal">Portal</a><a href="https://www.instagram.com/colegiopascoa" target="_blank" rel="noreferrer">Instagram</a><span className="text-[#9aa7a3]">Powered by <strong className="text-[#23473d]">EduCore</strong></span></div>
        </div>
      </footer>
    </div>
  );
}
