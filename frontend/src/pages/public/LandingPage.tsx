import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Building2,
  CheckCircle2,
  GraduationCap,
  HeartHandshake,
  Landmark,
  Laptop,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
  Users,
  Wallet,
} from 'lucide-react';
import { SchoolBrand } from '@/components/brand/SchoolBrand';
import campusMain from '@/assets/school/campus-main.jpg';
import facilityClassrooms from '@/assets/school/facility-classrooms.jpg';
import facilityComputerLab from '@/assets/school/facility-computer-lab.jpg';

const profiles = [
  { icon: GraduationCap, label: 'Aluno' },
  { icon: Users, label: 'Encarregado' },
  { icon: BookOpen, label: 'Professor' },
  { icon: Landmark, label: 'Pedagogia' },
  { icon: Building2, label: 'Direcção' },
  { icon: UserRoundCheck, label: 'Secretaria' },
  { icon: Wallet, label: 'Finanças' },
];

const portalAreas = [
  { icon: GraduationCap, title: 'Académico', copy: 'Avaliações, notas, assiduidade, horários, disciplinas e acompanhamento do percurso escolar.' },
  { icon: Wallet, title: 'Finanças', copy: 'Propinas, pagamentos, validações, recibos, facturas, devedores e tesouraria.' },
  { icon: MessageCircle, title: 'Comunicação', copy: 'Mensagens, avisos e notificações para a comunidade escolar.' },
  { icon: BookOpen, title: 'Conhecimento', copy: 'Materiais e conteúdos de apoio organizados para o trabalho académico.' },
  { icon: UserRoundCheck, title: 'Secretaria', copy: 'Admissões, matrículas, alunos, documentos e processos administrativos.' },
  { icon: ShieldCheck, title: 'Gestão', copy: 'Indicadores, aprovações, auditoria e visão institucional.' },
];

const facilities = [
  { image: campusMain, title: 'Campus', alt: 'Campus do Colégio Deus Connosco' },
  { image: facilityClassrooms, title: 'Salas de aula', alt: 'Salas do Colégio Deus Connosco' },
  { image: facilityComputerLab, title: 'Informática', alt: 'Laboratório de informática do Colégio Deus Connosco' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-3 md:px-8">
          <Link to="/" aria-label="Colégio Deus Connosco" className="shrink-0">
            <SchoolBrand imageClassName="h-14 md:h-16" />
          </Link>
          <nav className="hidden items-center gap-1 lg:flex">
            <a href="#escola" className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground">A Escola</a>
            <a href="#espacos" className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground">Espaços</a>
            <a href="#portal" className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground">Portal</a>
            <Link to="/apply" className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground">Candidatura</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/login" className="rounded-xl px-4 py-2 text-sm font-semibold hover:bg-muted">Entrar</Link>
            <Link to="/login" className="hidden items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 sm:inline-flex">
              Ver portal <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-border/70 bg-secondary/30">
          <div className="absolute inset-x-0 top-0 -z-10 h-96 bg-gradient-to-b from-primary/10 to-transparent" />
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[0.92fr,1.08fr] lg:py-24">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background px-3 py-1.5 text-xs font-semibold text-primary shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Colégio Deus Connosco · apresentação institucional
              </div>
              <h1 className="mt-6 font-heading text-5xl font-extrabold leading-[0.98] tracking-tight text-foreground md:text-6xl lg:text-7xl">
                Educar hoje.
                <span className="mt-1 block text-primary">Transformar amanhã.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground md:text-lg">
                Uma experiência escolar que aproxima aprendizagem, acompanhamento, comunidade e gestão — agora também ligada por um portal digital feito para os diferentes perfis da escola.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/login" className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-md transition hover:bg-primary/90">
                  Aceder à demonstração <ArrowRight className="h-4 w-4" />
                </Link>
                <a href="#escola" className="inline-flex items-center rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold shadow-sm transition hover:bg-muted">
                  Conhecer a experiência
                </a>
              </div>
              <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-muted-foreground">
                {['Identidade institucional', 'Espaços reais', '7 perfis de portal'].map((item) => (
                  <span key={item} className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" />{item}</span>
                ))}
              </div>
            </div>

            <div className="relative lg:pl-5">
              <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-primary/10 blur-3xl" />
              <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-2xl">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={campusMain} alt="Campus do Colégio Deus Connosco" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/70">Colégio Deus Connosco</p>
                    <p className="mt-2 font-heading text-2xl font-bold md:text-3xl">Uma escola com espaço para aprender, crescer e pertencer.</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 divide-x divide-border bg-card">
                  {['Aprender', 'Acompanhar', 'Conectar'].map((item) => (
                    <div key={item} className="px-3 py-4 text-center text-xs font-bold text-primary md:py-5 md:text-sm">{item}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-primary text-primary-foreground">
          <div className="mx-auto grid max-w-7xl gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['Aprendizagem', 'A experiência académica no centro da vida escolar.'],
              ['Acompanhamento', 'Famílias, professores e equipas ligadas ao percurso do aluno.'],
              ['Comunicação', 'Informação contextual para cada perfil da comunidade.'],
              ['Gestão', 'Processos escolares organizados numa experiência integrada.'],
            ].map(([title, copy]) => (
              <div key={title} className="bg-primary px-6 py-8 md:px-8">
                <p className="font-heading text-lg font-bold">{title}</p>
                <p className="mt-2 text-sm leading-6 text-primary-foreground/70">{copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="escola" className="px-5 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-12 lg:grid-cols-[0.85fr,1.15fr]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">A nossa escola</p>
                <h2 className="mt-3 max-w-xl font-heading text-4xl font-bold tracking-tight md:text-5xl">O espaço físico e o portal contam a mesma história.</h2>
                <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
                  Esta apresentação parte da identidade e dos espaços reais do Colégio Deus Connosco. A tecnologia aparece como extensão da experiência escolar — não como substituição da escola.
                </p>
                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <div className="rounded-2xl border border-border bg-card p-5">
                    <HeartHandshake className="h-6 w-6 text-primary" />
                    <h3 className="mt-4 font-heading font-bold">Comunidade próxima</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">Perfis diferentes partilham informação e acompanham o que importa.</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-card p-5">
                    <Laptop className="h-6 w-6 text-primary" />
                    <h3 className="mt-4 font-heading font-bold">Experiência digital</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">Um portal único organiza as rotinas académicas, financeiras e administrativas.</p>
                  </div>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <figure className="overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-lg sm:row-span-2">
                  <img src={facilityClassrooms} alt="Salas de aula do Colégio Deus Connosco" className="h-full min-h-[420px] w-full object-cover" />
                </figure>
                <figure className="overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-lg">
                  <img src={facilityComputerLab} alt="Laboratório de informática do Colégio Deus Connosco" className="aspect-[4/3] h-full w-full object-cover" />
                </figure>
                <div className="flex min-h-[200px] flex-col justify-between rounded-[1.75rem] bg-secondary p-6">
                  <SchoolBrand imageClassName="h-16" />
                  <p className="font-heading text-xl font-bold text-primary">Identidade, espaço e tecnologia numa apresentação coerente.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="espacos" className="border-y border-border bg-secondary/40 px-5 py-20 md:px-8 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Espaços reais</p>
                <h2 className="mt-3 font-heading text-4xl font-bold tracking-tight md:text-5xl">O Colégio Deus Connosco em foco.</h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-muted-foreground">Fotografia institucional usada como parte da narrativa, sem recorrer a imagens genéricas de outras escolas.</p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {facilities.map((facility) => (
                <figure key={facility.title} className="group overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-sm">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={facility.image} alt={facility.alt} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
                  </div>
                  <figcaption className="flex items-center justify-between px-5 py-4">
                    <span className="font-heading font-bold">{facility.title}</span>
                    <span className="h-2 w-2 rounded-full bg-accent" />
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="portal" className="bg-primary px-5 py-20 text-primary-foreground md:px-8 md:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[0.75fr,1.25fr]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Portal escolar</p>
                <h2 className="mt-3 font-heading text-4xl font-bold tracking-tight md:text-5xl">Uma experiência para cada responsabilidade.</h2>
                <p className="mt-5 text-base leading-7 text-primary-foreground/70">A demonstração permite entrar por função e percorrer fluxos reais do produto, com dashboards, páginas de detalhe e dados de apresentação.</p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {profiles.map((profile) => (
                    <span key={profile.label} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold">
                      <profile.icon className="h-4 w-4 text-accent" />{profile.label}
                    </span>
                  ))}
                </div>
                <Link to="/login" className="mt-9 inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-bold text-accent-foreground shadow-lg transition hover:brightness-105">
                  Explorar os 7 perfis <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {portalAreas.map((area) => (
                  <div key={area.title} className="rounded-2xl border border-white/15 bg-white/10 p-5">
                    <area.icon className="h-5 w-5 text-accent" />
                    <h3 className="mt-4 font-heading text-lg font-bold">{area.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-primary-foreground/70">{area.copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-20 md:px-8 md:py-24">
          <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] border border-border bg-card shadow-xl lg:grid-cols-2">
            <div className="relative min-h-[340px]">
              <img src={campusMain} alt="Colégio Deus Connosco" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-primary/40" />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-12">
              <SchoolBrand imageClassName="h-16 md:h-20" />
              <h2 className="mt-8 font-heading text-3xl font-bold tracking-tight md:text-4xl">Conheça a experiência digital do Colégio Deus Connosco.</h2>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">Entre na demonstração para navegar como aluno, encarregado, professor, pedagogia, direcção, secretaria ou finanças.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/login" className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground">Aceder ao portal <ArrowRight className="h-4 w-4" /></Link>
                <Link to="/apply" className="inline-flex items-center rounded-xl border border-border px-6 py-3 text-sm font-semibold hover:bg-muted">Candidatura</Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-primary/20 bg-primary px-5 py-10 text-primary-foreground md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <SchoolBrand imageClassName="h-14" className="rounded-xl bg-white p-2" />
          <div className="flex flex-wrap gap-5 text-xs text-primary-foreground/70">
            <a href="#escola" className="hover:text-white">A Escola</a>
            <a href="#espacos" className="hover:text-white">Espaços</a>
            <Link to="/login" className="hover:text-white">Portal</Link>
            <Link to="/apply" className="hover:text-white">Candidatura</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
