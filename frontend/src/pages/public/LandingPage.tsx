import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  Building2,
  GraduationCap,
  Landmark,
  MessageCircle,
  ShieldCheck,
  UserRoundCheck,
  Users,
  Wallet,
} from 'lucide-react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { SchoolBrand } from '@/components/brand/SchoolBrand';
import campusMain from '@/assets/school/campus-main.jpg';
import facilityClassrooms from '@/assets/school/facility-classrooms.jpg';
import facilityComputerLab from '@/assets/school/facility-computer-lab.jpg';

const ease = [0.2, 0.8, 0.2, 1] as const;

const roleExperiences = [
  {
    id: 'student',
    icon: GraduationCap,
    label: 'Aluno',
    eyebrow: 'Percurso individual',
    copy: 'Disciplinas, notas, assiduidade, horário, conteúdos, comunicação e informação financeira organizados para o aluno.',
    items: ['Disciplinas', 'Notas', 'Assiduidade', 'Horário'],
  },
  {
    id: 'guardian',
    icon: Users,
    label: 'Encarregado',
    eyebrow: 'Acompanhamento',
    copy: 'Informação académica, presenças, pagamentos, avisos e comunicação ligados aos educandos associados ao perfil.',
    items: ['Educandos', 'Desempenho', 'Presenças', 'Pagamentos'],
  },
  {
    id: 'teacher',
    icon: BookOpen,
    label: 'Professor',
    eyebrow: 'Trabalho pedagógico',
    copy: 'Turmas, presenças, avaliações, conteúdos e comunicação permanecem no contexto de trabalho do professor.',
    items: ['Turmas', 'Presenças', 'Avaliações', 'Conteúdos'],
  },
  {
    id: 'pedagogy',
    icon: Landmark,
    label: 'Pedagogia',
    eyebrow: 'Coordenação',
    copy: 'Indicadores, aprovações, turmas, professores, risco académico e relatórios reunidos para a coordenação pedagógica.',
    items: ['Indicadores', 'Aprovações', 'Risco académico', 'Relatórios'],
  },
  {
    id: 'executive',
    icon: Building2,
    label: 'Direcção',
    eyebrow: 'Visão institucional',
    copy: 'Académico, financeiro, matrículas, aprovações, relatórios e auditoria numa experiência orientada à gestão.',
    items: ['Académico', 'Financeiro', 'Matrículas', 'Auditoria'],
  },
  {
    id: 'secretary',
    icon: UserRoundCheck,
    label: 'Secretaria',
    eyebrow: 'Operação escolar',
    copy: 'Admissões, matrículas, alunos, documentos, turmas e regularidade organizados por tarefa e responsabilidade.',
    items: ['Admissões', 'Matrículas', 'Alunos', 'Documentos'],
  },
  {
    id: 'finance',
    icon: Wallet,
    label: 'Finanças',
    eyebrow: 'Operação financeira',
    copy: 'Pagamentos, validações, facturas, recibos, devedores, obrigações e tesouraria numa área dedicada.',
    items: ['Pagamentos', 'Validação', 'Facturas', 'Tesouraria'],
  },
];

const experiencePillars = [
  {
    number: '01',
    kicker: 'Aprender',
    title: 'O percurso académico fica mais próximo.',
    copy: 'Disciplinas, horários, avaliações, notas, assiduidade e conteúdos passam a estar organizados num único contexto digital.',
  },
  {
    number: '02',
    kicker: 'Acompanhar',
    title: 'Cada pessoa encontra o que precisa.',
    copy: 'Aluno, família, professor e equipas escolares acedem a informação coerente com a sua responsabilidade.',
  },
  {
    number: '03',
    kicker: 'Gerir',
    title: 'A operação escolar permanece ligada.',
    copy: 'Secretaria, pedagogia, direcção e finanças trabalham no mesmo ecossistema com áreas próprias e navegação dedicada.',
  },
];

function PortalPreview({ activeIndex }: { activeIndex: number }) {
  const active = roleExperiences[activeIndex];
  const Icon = active.icon;

  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/15 bg-[#fbf8f2] text-foreground shadow-[0_35px_90px_rgba(3,23,46,0.34)]">
      <div className="flex items-center justify-between border-b border-border/80 bg-white px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ef6b4b]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#efc24b]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#66a86f]" />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">Portal escolar</span>
      </div>

      <div className="grid min-h-[420px] md:grid-cols-[190px,1fr]">
        <aside className="hidden border-r border-white/10 bg-primary p-5 text-white md:block">
          <div className="inline-flex rounded-2xl bg-white p-2">
            <SchoolBrand variant="compact" imageClassName="h-11 w-11" />
          </div>
          <div className="mt-8 space-y-2">
            {active.items.map((item, index) => (
              <div
                key={item}
                className={`rounded-xl px-3 py-2.5 text-xs font-semibold ${index === 0 ? 'bg-white text-primary' : 'text-white/68'}`}
              >
                {item}
              </div>
            ))}
          </div>
        </aside>

        <div className="p-5 sm:p-7 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.24, ease }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/60">{active.eyebrow}</p>
                  <h3 className="mt-2 max-w-xl font-display text-3xl leading-tight text-primary sm:text-4xl">{active.label}</h3>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
              </div>

              <p className="mt-5 max-w-xl text-sm leading-6 text-muted-foreground">{active.copy}</p>

              <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
                {active.items.map((item, index) => (
                  <div key={item} className="bg-white p-4 sm:p-5">
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">0{index + 1}</span>
                    <p className="mt-7 font-heading text-sm font-bold text-primary">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-3 rounded-2xl bg-secondary px-4 py-3 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
                O conteúdo e a navegação adaptam-se à função escolhida no acesso.
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const heroRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [activeRole, setActiveRole] = useState(0);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, prefersReducedMotion ? 1 : 1.035]);
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', prefersReducedMotion ? '0%' : '3%']);
  const heroCopyY = useTransform(scrollYProgress, [0, 1], ['0%', prefersReducedMotion ? '0%' : '-3%']);
  const heroCopyOpacity = useTransform(scrollYProgress, [0, 0.76], [1, prefersReducedMotion ? 1 : 0.68]);

  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-[#fbf8f2]/96 backdrop-blur-xl">
        <div className="mx-auto flex min-h-[88px] max-w-[1500px] items-center justify-between gap-4 px-5 md:px-8 lg:px-12">
          <Link
            to="/"
            aria-label="Colégio Deus Connosco"
            className="shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
          >
            <SchoolBrand imageClassName="h-[62px] w-[62px] sm:h-[66px] sm:w-[66px]" />
          </Link>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Navegação principal">
            <a href="#escola" className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary">A Escola</a>
            <a href="#experiencia" className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary">Experiência</a>
            <a href="#portal" className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary">Portal</a>
          </nav>

          <Link
            to="/login"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-primary/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 sm:px-5"
          >
            Entrar no portal <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      <main>
        <section ref={heroRef} className="relative isolate overflow-hidden bg-[#fbf8f2]">
          <div className="mx-auto grid min-h-[calc(100svh-88px)] max-w-[1500px] lg:grid-cols-[0.82fr,1.18fr]">
            <motion.div
              style={{ y: heroCopyY, opacity: heroCopyOpacity }}
              className="relative z-20 flex flex-col justify-center px-7 py-14 md:px-10 md:py-20 lg:px-12 xl:px-16"
            >
              <div className="max-w-[620px]">
                <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.26em] text-primary">
                  <span className="h-[2px] w-9 bg-[hsl(var(--brand-orange))]" />
                  Colégio Deus Connosco
                </div>
                <h1 className="mt-8 font-display text-[clamp(3.8rem,6.5vw,7.5rem)] font-normal leading-[0.89] tracking-[-0.055em] text-primary">
                  A escola
                  <span className="block">começa aqui.</span>
                </h1>
                <p className="mt-8 max-w-lg text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
                  Um espaço escolar com identidade própria e um portal que acompanha o percurso académico, a comunicação e a gestão do dia a dia.
                </p>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    to="/login"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[hsl(var(--brand-orange))] px-6 py-3 text-sm font-extrabold text-primary shadow-lg shadow-orange-950/10 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
                  >
                    Entrar no portal <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href="#escola"
                    className="inline-flex min-h-12 items-center justify-center gap-2 border-b border-primary/25 px-2 py-3 text-sm font-bold text-primary transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
                  >
                    Conhecer a escola <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <a href="#escola" className="mt-14 hidden w-fit items-center gap-4 text-[10px] font-bold uppercase tracking-[0.24em] text-muted-foreground md:flex">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border"><ArrowDown className="h-4 w-4" /></span>
                Continuar
              </a>
            </motion.div>

            <div className="relative min-h-[58vh] overflow-hidden bg-primary lg:min-h-[calc(100svh-88px)]">
              <motion.img
                style={{ scale: heroScale, y: heroY }}
                src={campusMain}
                alt="Campus do Colégio Deus Connosco"
                fetchPriority="high"
                className="absolute inset-0 h-full w-full object-cover object-center saturate-[0.88] contrast-[1.02] will-change-transform"
              />
              <div className="absolute inset-0 bg-primary/16" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#fbf8f2]/46 via-transparent to-primary/8 lg:from-[#fbf8f2]/30" />
              <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-primary/78 via-primary/18 to-transparent" />
              <div className="pointer-events-none absolute left-0 top-0 h-full w-px bg-white/35" />
              <div className="pointer-events-none absolute -left-8 bottom-0 hidden h-[46%] w-16 rotate-[8deg] bg-[hsl(var(--brand-orange))]/92 lg:block" />

              <div className="absolute bottom-8 left-7 right-7 flex items-end justify-between gap-4 text-white md:bottom-11 md:left-10 md:right-10">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/70">O espaço escolar</p>
                  <p className="mt-2 max-w-md font-display text-2xl leading-tight md:text-4xl">Lugar, aprendizagem e continuidade.</p>
                </div>
                <span className="hidden h-16 w-16 items-center justify-center rounded-full border border-white/35 bg-black/10 text-xs font-bold backdrop-blur md:flex">01</span>
              </div>
            </div>
          </div>
        </section>

        <section id="escola" className="relative bg-primary text-white">
          <div className="mx-auto max-w-[1500px] px-6 py-20 md:px-10 md:py-28 lg:px-12">
            <div className="grid gap-14 lg:grid-cols-[0.72fr,1.28fr] lg:items-start">
              <div className="lg:sticky lg:top-28">
                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-orange-300">A escola por dentro</p>
                <h2 className="mt-6 max-w-lg font-display text-5xl leading-[0.94] tracking-[-0.045em] md:text-7xl">
                  Espaços que acompanham o dia escolar.
                </h2>
                <p className="mt-7 max-w-md text-base leading-7 text-white/72">
                  Salas, circulação e tecnologia fazem parte do mesmo ambiente onde a aprendizagem e o acompanhamento acontecem todos os dias.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <figure className="overflow-hidden rounded-[2rem] bg-white/5 md:col-span-2">
                  <img src={campusMain} alt="Campus do Colégio Deus Connosco" className="aspect-[2/1] max-h-[430px] w-full object-cover object-center" loading="lazy" />
                  <figcaption className="border-t border-white/10 px-6 py-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.23em] text-orange-200">Campus</p>
                    <p className="mt-2 font-display text-2xl">O ponto de partida da experiência escolar.</p>
                  </figcaption>
                </figure>

                <figure className="overflow-hidden rounded-[2rem] bg-white/5">
                  <img src={facilityClassrooms} alt="Espaço de aprendizagem do Colégio Deus Connosco" className="aspect-[4/3] w-full object-cover" loading="lazy" />
                  <figcaption className="p-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.21em] text-orange-200">Aprendizagem</p>
                    <p className="mt-2 font-heading text-lg font-bold">Espaços preparados para o percurso escolar.</p>
                  </figcaption>
                </figure>

                <figure className="overflow-hidden rounded-[2rem] bg-white/5">
                  <img src={facilityComputerLab} alt="Espaço de informática do Colégio Deus Connosco" className="aspect-[4/3] w-full object-cover" loading="lazy" />
                  <figcaption className="p-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.21em] text-orange-200">Tecnologia</p>
                    <p className="mt-2 font-heading text-lg font-bold">Ferramentas ligadas ao trabalho e ao acompanhamento.</p>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>

        <section id="experiencia" className="bg-[#fbf8f2] px-6 py-20 md:px-10 md:py-28 lg:px-12">
          <div className="mx-auto max-w-[1500px]">
            <div className="grid gap-8 lg:grid-cols-[0.92fr,1.08fr] lg:items-end">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[hsl(var(--brand-orange))]">Uma experiência contínua</p>
                <h2 className="mt-5 max-w-2xl font-display text-5xl leading-[0.95] tracking-[-0.045em] text-primary md:text-7xl">
                  Da escola ao portal, cada etapa permanece ligada.
                </h2>
              </div>
              <p className="max-w-xl text-base leading-7 text-muted-foreground lg:justify-self-end">
                O portal não substitui a escola. Organiza informação, tarefas e comunicação para que cada função acompanhe o que lhe diz respeito.
              </p>
            </div>

            <div className="mt-14 divide-y divide-border border-y border-border">
              {experiencePillars.map((item, index) => (
                <motion.article
                  key={item.number}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
                  whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.04, ease }}
                  className="grid gap-5 py-8 md:grid-cols-[120px,0.95fr,1.05fr] md:items-center md:py-12"
                >
                  <div className="flex items-center gap-4 md:block">
                    <span className="font-display text-4xl text-primary/20 md:text-5xl">{item.number}</span>
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[hsl(var(--brand-orange))] md:mt-2">{item.kicker}</p>
                  </div>
                  <h3 className="max-w-xl font-display text-3xl leading-tight text-primary md:text-4xl">{item.title}</h3>
                  <p className="max-w-xl text-sm leading-6 text-muted-foreground">{item.copy}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="portal" className="relative overflow-hidden bg-primary px-6 py-20 text-white md:px-10 md:py-28 lg:px-12">
          <div className="pointer-events-none absolute -right-24 top-24 h-96 w-24 rotate-[11deg] bg-white/8" />
          <div className="pointer-events-none absolute right-12 top-0 h-56 w-10 rotate-[11deg] bg-[hsl(var(--brand-orange))]/18" />
          <div className="mx-auto grid max-w-[1500px] gap-12 xl:grid-cols-[0.7fr,1.3fr] xl:items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-orange-300">O portal</p>
              <h2 className="mt-6 max-w-xl font-display text-5xl leading-[0.93] tracking-[-0.045em] md:text-7xl">
                Um acesso. Contextos diferentes para cada função.
              </h2>
              <p className="mt-7 max-w-xl text-base leading-7 text-white/72">
                O perfil é escolhido no login. A partir daí, cada pessoa entra na área adequada à sua responsabilidade.
              </p>

              <div className="mt-9 flex max-w-full gap-2 overflow-x-auto pb-2 xl:flex-wrap" role="tablist" aria-label="Perfis do portal">
                {roleExperiences.map((role, index) => (
                  <button
                    key={role.id}
                    type="button"
                    role="tab"
                    aria-selected={activeRole === index}
                    onClick={() => setActiveRole(index)}
                    className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold transition ${
                      activeRole === index
                        ? 'border-orange-300 bg-[hsl(var(--brand-orange))] text-primary'
                        : 'border-white/20 bg-white/5 text-white/75 hover:border-white/40 hover:bg-white/10'
                    }`}
                  >
                    <role.icon className="h-4 w-4" />
                    {role.label}
                  </button>
                ))}
              </div>

              <Link to="/login" className="mt-9 inline-flex min-h-12 items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-extrabold text-primary transition hover:-translate-y-0.5">
                Escolher acesso <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <PortalPreview activeIndex={activeRole} />
          </div>
        </section>

        <section className="bg-[#fbf8f2] px-6 py-20 md:px-10 md:py-28 lg:px-12">
          <div className="mx-auto max-w-[1500px]">
            <div className="relative overflow-hidden rounded-[2.25rem] bg-primary px-7 py-12 text-white md:px-12 md:py-16 lg:px-16">
              <div className="pointer-events-none absolute -right-12 -top-24 h-72 w-28 rotate-[12deg] bg-[hsl(var(--brand-orange))]/95" />
              <div className="pointer-events-none absolute right-16 top-0 h-full w-px bg-white/10" />
              <div className="relative grid gap-10 lg:grid-cols-[1fr,0.7fr] lg:items-end">
                <div className="max-w-3xl">
                  <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-orange-300">Portal escolar</p>
                  <h2 className="mt-6 font-display text-5xl leading-[0.94] tracking-[-0.04em] md:text-7xl">
                    A mesma identidade. Um acesso preparado para cada função.
                  </h2>
                  <p className="mt-7 max-w-xl text-base leading-7 text-white/75">
                    Entre no portal, escolha o seu perfil e continue para a área correspondente.
                  </p>
                  <Link to="/login" className="mt-9 inline-flex min-h-12 items-center gap-2 rounded-xl bg-[hsl(var(--brand-orange))] px-6 py-3 text-sm font-extrabold text-primary transition hover:-translate-y-0.5">
                    Entrar no portal <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="hidden justify-end lg:flex">
                  <div className="rounded-[2rem] bg-white p-5 shadow-2xl">
                    <SchoolBrand variant="compact" imageClassName="h-28 w-28" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-white px-6 py-9 md:px-10 lg:px-12">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <SchoolBrand imageClassName="h-[58px] w-[58px]" />
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-muted-foreground">
            <a href="#escola" className="hover:text-primary">A Escola</a>
            <a href="#experiencia" className="hover:text-primary">Experiência</a>
            <a href="#portal" className="hover:text-primary">Portal</a>
            <Link to="/login" className="hover:text-primary">Entrar</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
