import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
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
    copy: 'Disciplinas, notas, assiduidade, horário, conteúdos, comunicação e informação financeira organizada para o aluno.',
    items: ['Disciplinas', 'Notas', 'Assiduidade', 'Horário'],
  },
  {
    id: 'guardian',
    icon: Users,
    label: 'Encarregado',
    eyebrow: 'Acompanhamento',
    copy: 'Visão académica, presenças, pagamentos, avisos e comunicação ligada aos educandos associados ao perfil.',
    items: ['Educandos', 'Desempenho', 'Presenças', 'Pagamentos'],
  },
  {
    id: 'teacher',
    icon: BookOpen,
    label: 'Professor',
    eyebrow: 'Trabalho pedagógico',
    copy: 'O professor alterna entre turmas, presenças, lançamento de notas, conteúdos e comunicação sem sair do seu contexto.',
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
    copy: 'Académico, financeiro, matrículas, aprovações, relatórios e auditoria acessíveis numa experiência orientada à gestão.',
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
    copy: 'Pagamentos, validações, facturas, recibos, devedores, obrigações e tesouraria reunidos numa área dedicada.',
    items: ['Pagamentos', 'Validação', 'Facturas', 'Tesouraria'],
  },
];

const ecosystem = [
  {
    icon: GraduationCap,
    title: 'Académico',
    copy: 'Percurso escolar, avaliações, notas, assiduidade, horários e acompanhamento.',
  },
  {
    icon: Wallet,
    title: 'Finanças',
    copy: 'Pagamentos, validações, recibos, facturas, obrigações e tesouraria.',
  },
  {
    icon: MessageCircle,
    title: 'Comunicação & gestão',
    copy: 'Mensagens, notificações, processos administrativos, aprovações e visão institucional.',
  },
];

function PortalPreview({ activeIndex }: { activeIndex: number }) {
  const active = roleExperiences[activeIndex];
  const Icon = active.icon;

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-white/20 bg-[#f8f5ef] text-foreground shadow-2xl shadow-black/20">
      <div className="flex items-center justify-between border-b border-border/80 bg-white px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ef6b4b]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#efc24b]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#66a86f]" />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Portal escolar</span>
      </div>

      <div className="grid min-h-[430px] md:grid-cols-[180px,1fr]">
        <aside className="hidden border-r border-border/80 bg-primary p-5 text-white md:block">
          <SchoolBrand variant="compact" imageClassName="h-12 w-12 rounded-xl bg-white p-1.5" />
          <div className="mt-8 space-y-2">
            {active.items.map((item, index) => (
              <div
                key={item}
                className={`rounded-xl px-3 py-2.5 text-xs font-semibold ${index === 0 ? 'bg-white text-primary' : 'text-white/70'}`}
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
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease }}
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
                A navegação e os dados apresentados dependem da função que entrou no portal.
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

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, prefersReducedMotion ? 1 : 1.055]);
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', prefersReducedMotion ? '0%' : '7%']);
  const heroCopyY = useTransform(scrollYProgress, [0, 1], ['0%', prefersReducedMotion ? '0%' : '-5%']);
  const heroCopyOpacity = useTransform(scrollYProgress, [0, 0.72], [1, prefersReducedMotion ? 1 : 0.55]);

  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur-xl">
        <div className="mx-auto flex min-h-[82px] max-w-[1480px] items-center justify-between gap-4 px-5 md:px-8 lg:px-12">
          <Link to="/" aria-label="Colégio Deus Connosco" className="shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4">
            <SchoolBrand imageClassName="h-[58px] w-auto sm:h-[64px]" />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegação principal">
            <a href="#escola" className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary">A Escola</a>
            <a href="#experiencia" className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary">Experiência</a>
            <a href="#portal" className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary">Portal</a>
          </nav>

          <Link
            to="/login"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 sm:px-5"
          >
            Entrar no portal <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      <main>
        <section ref={heroRef} className="relative isolate min-h-[calc(100svh-82px)] overflow-hidden border-b border-border/70 bg-[#fbf8f2]">
          <div className="pointer-events-none absolute left-0 top-0 h-full w-[7px] bg-[hsl(var(--brand-orange))]" />
          <div className="pointer-events-none absolute right-[8%] top-0 hidden h-24 w-px bg-border lg:block" />

          <div className="mx-auto grid min-h-[calc(100svh-82px)] max-w-[1480px] items-stretch lg:grid-cols-[0.78fr,1.22fr]">
            <motion.div
              style={{ y: heroCopyY, opacity: heroCopyOpacity }}
              className="relative z-10 flex flex-col justify-center px-6 py-14 md:px-10 md:py-20 lg:px-12 xl:px-16"
            >
              <div className="max-w-[620px]">
                <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-primary">
                  <span className="h-[2px] w-8 bg-[hsl(var(--brand-orange))]" />
                  Colégio Deus Connosco
                </div>
                <h1 className="mt-7 font-display text-[clamp(3.4rem,6.7vw,7.7rem)] font-normal leading-[0.9] tracking-[-0.05em] text-primary">
                  A escola
                  <span className="block">começa aqui.</span>
                </h1>
                <p className="mt-7 max-w-lg text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
                  Conheça o ambiente do Colégio Deus Connosco e aceda ao portal que reúne as principais rotinas académicas, administrativas e de acompanhamento.
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
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

              <div className="mt-14 hidden items-center gap-4 text-[10px] font-bold uppercase tracking-[0.23em] text-muted-foreground md:flex">
                <span>Aprender</span><span className="h-px w-5 bg-border" /><span>Acompanhar</span><span className="h-px w-5 bg-border" /><span>Conectar</span>
              </div>
            </motion.div>

            <div className="relative min-h-[54vh] overflow-hidden lg:min-h-full">
              <motion.img
                style={{ scale: heroScale, y: heroY }}
                src={campusMain}
                alt="Campus do Colégio Deus Connosco"
                fetchPriority="high"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#fbf8f2] via-transparent to-transparent opacity-20 lg:opacity-60" />
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-primary/50 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4 text-white md:bottom-8 md:left-8 md:right-8">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/70">O espaço escolar</p>
                  <p className="mt-1 max-w-sm font-display text-2xl leading-tight md:text-3xl">Um ambiente real. Uma experiência digital contínua.</p>
                </div>
                <span className="hidden h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-black/10 text-xs font-bold backdrop-blur md:flex">01</span>
              </div>
            </div>
          </div>
        </section>

        <section id="escola" className="bg-primary text-white">
          <div className="mx-auto max-w-[1480px] px-6 py-20 md:px-10 md:py-28 lg:px-12">
            <div className="grid gap-12 lg:grid-cols-[0.72fr,1.28fr] lg:items-start">
              <div className="lg:sticky lg:top-28">
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-orange-300">A escola por dentro</p>
                <h2 className="mt-5 max-w-lg font-display text-5xl leading-[0.95] tracking-[-0.04em] md:text-6xl">
                  O espaço também ensina.
                </h2>
                <p className="mt-6 max-w-md text-base leading-7 text-white/70">
                  A fotografia do Colégio deixa de ser decoração e passa a orientar a narrativa: campus, salas e tecnologia aparecem como partes do mesmo percurso escolar.
                </p>
              </div>

              <div className="space-y-5">
                <figure className="relative overflow-hidden rounded-[1.8rem] bg-white/5">
                  <img src={campusMain} alt="Campus do Colégio Deus Connosco" className="aspect-[16/9] w-full object-cover object-center" loading="lazy" />
                  <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/70 to-transparent p-6 pt-20">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-orange-200">01 · Campus</p>
                      <p className="mt-2 font-display text-2xl">Espaço para aprender e acompanhar.</p>
                    </div>
                  </figcaption>
                </figure>

                <div className="grid gap-5 md:grid-cols-2">
                  <figure className="overflow-hidden rounded-[1.8rem] bg-white/5">
                    <img src={facilityClassrooms} alt="Salas do Colégio Deus Connosco" className="aspect-[4/3] w-full object-cover" loading="lazy" />
                    <figcaption className="p-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-200">02 · Sala</p>
                      <p className="mt-2 font-heading text-lg font-bold">Aprendizagem em contexto.</p>
                    </figcaption>
                  </figure>

                  <figure className="overflow-hidden rounded-[1.8rem] bg-white/5">
                    <img src={facilityComputerLab} alt="Espaço de informática do Colégio Deus Connosco" className="aspect-[4/3] w-full object-cover" loading="lazy" />
                    <figcaption className="p-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-200">03 · Tecnologia</p>
                      <p className="mt-2 font-heading text-lg font-bold">Ferramentas ligadas ao percurso escolar.</p>
                    </figcaption>
                  </figure>
                </div>

                <figure className="relative overflow-hidden rounded-[1.8rem] bg-white/5">
                  <img src={campusMain} alt="Área exterior do Colégio Deus Connosco" className="aspect-[16/8] w-full object-cover object-bottom" loading="lazy" />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6 pt-16">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-200">04 · Vida escolar</p>
                    <p className="mt-2 max-w-lg font-display text-2xl">Uma instituição é mais do que uma interface.</p>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>

        <section id="experiencia" className="bg-[#fbf8f2] px-6 py-20 md:px-10 md:py-28 lg:px-12">
          <div className="mx-auto max-w-[1480px]">
            <div className="grid gap-10 border-y border-border py-10 md:grid-cols-3 md:gap-0 md:py-14">
              {ecosystem.map((item, index) => (
                <div key={item.title} className={`md:px-8 ${index > 0 ? 'md:border-l md:border-border' : ''}`}>
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5 text-[hsl(var(--brand-orange))]" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">0{index + 1}</span>
                  </div>
                  <h2 className="mt-7 font-display text-3xl text-primary md:text-4xl">{item.title}</h2>
                  <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">{item.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="portal" className="relative overflow-hidden bg-primary px-6 py-20 text-white md:px-10 md:py-28 lg:px-12">
          <div className="pointer-events-none absolute -right-28 -top-20 h-80 w-80 rotate-12 border-[32px] border-orange-400/10" />
          <div className="mx-auto max-w-[1480px]">
            <div className="grid gap-12 lg:grid-cols-[0.7fr,1.3fr] lg:items-start">
              <div className="lg:sticky lg:top-28">
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-orange-300">O portal</p>
                <h2 className="mt-5 max-w-xl font-display text-5xl leading-[0.95] tracking-[-0.04em] md:text-6xl">
                  O mesmo colégio. Uma visão diferente para cada função.
                </h2>
                <p className="mt-6 max-w-lg text-base leading-7 text-white/70">
                  Cada área apresenta somente o que faz sentido para a responsabilidade de quem entrou, mantendo o percurso académico e operacional ligado.
                </p>

                <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Perfis do portal">
                  {roleExperiences.map((role, index) => {
                    const Icon = role.icon;
                    const selected = activeRole === index;
                    return (
                      <button
                        key={role.id}
                        type="button"
                        role="tab"
                        aria-selected={selected}
                        onClick={() => setActiveRole(index)}
                        className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 ${
                          selected
                            ? 'border-orange-300 bg-[hsl(var(--brand-orange))] text-primary'
                            : 'border-white/20 bg-white/5 text-white/70 hover:border-white/40 hover:text-white'
                        }`}
                      >
                        <Icon className="h-4 w-4" /> {role.label}
                      </button>
                    );
                  })}
                </div>

                <Link
                  to="/login"
                  className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-primary transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-primary"
                >
                  Entrar no portal <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <PortalPreview activeIndex={activeRole} />
            </div>
          </div>
        </section>

        <section className="bg-[#fbf8f2] px-6 py-20 md:px-10 md:py-28 lg:px-12">
          <div className="mx-auto max-w-[1480px] overflow-hidden rounded-[2rem] bg-[#0b2e59] text-white">
            <div className="grid lg:grid-cols-[1.1fr,0.9fr]">
              <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-orange-300">Continuidade digital</p>
                <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.02] md:text-6xl">
                  Da escola física ao portal, a identidade permanece a mesma.
                </h2>
                <p className="mt-6 max-w-xl text-base leading-7 text-white/70">
                  Entre para percorrer a experiência do Colégio Deus Connosco através dos diferentes perfis e módulos já disponíveis no produto.
                </p>
                <div className="mt-8">
                  <Link
                    to="/login"
                    className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-[hsl(var(--brand-orange))] px-6 py-3 text-sm font-extrabold text-primary transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 focus-visible:ring-offset-4 focus-visible:ring-offset-primary"
                  >
                    Entrar no portal <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="relative min-h-[360px] overflow-hidden lg:min-h-[520px]">
                <img src={campusMain} alt="Campus do Colégio Deus Connosco" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0b2e59] via-[#0b2e59]/10 to-transparent" />
                <div className="absolute bottom-8 right-8 hidden border-r-4 border-[hsl(var(--brand-orange))] pr-5 text-right lg:block">
                  <p className="font-display text-3xl">Colégio</p>
                  <p className="font-display text-3xl">Deus Connosco</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-[#fbf8f2] px-6 py-10 md:px-10 lg:px-12">
        <div className="mx-auto flex max-w-[1480px] flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <SchoolBrand imageClassName="h-[72px] w-auto" />
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-muted-foreground">
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
