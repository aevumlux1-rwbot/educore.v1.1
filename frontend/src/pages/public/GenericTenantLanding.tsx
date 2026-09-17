import { ArrowRight, Building2, CheckCircle2, GraduationCap, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTenant } from '@/contexts/TenantContext';
import { SchoolBrand } from '@/components/brand/SchoolBrand';

export default function GenericTenantLanding() {
  const { activeTenant } = useTenant();
  const { branding, publicExperience } = activeTenant;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-background/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <SchoolBrand />
          <div className="flex items-center gap-3">
            {publicExperience.applicationsEnabled && <Link to="/apply" className="hidden text-sm font-semibold text-muted-foreground hover:text-foreground sm:inline">Candidaturas</Link>}
            <Link to="/login" className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground">Entrar no portal <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: `radial-gradient(circle at 18% 22%, hsl(${branding.accentHsl}) 0, transparent 34%), radial-gradient(circle at 82% 68%, hsl(${branding.primaryHsl}) 0, transparent 28%)` }} />
          <div className="relative mx-auto grid min-h-[72vh] max-w-7xl items-center gap-10 px-5 py-16 lg:grid-cols-[1.12fr,.88fr] lg:px-8 lg:py-24">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.24em]" style={{ color: `hsl(${branding.accentHsl})` }}>{branding.descriptor ?? 'Instituição de Ensino'}</p>
              <h1 className="mt-5 max-w-4xl font-heading text-5xl font-black leading-[0.96] tracking-[-0.05em] text-primary sm:text-6xl lg:text-7xl">{branding.displayName}</h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">Uma experiência escolar ligada ao EduCore, com acesso diferenciado para alunos, famílias, professores e equipas administrativas.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/login" className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-extrabold text-primary-foreground">Aceder ao portal <ArrowRight className="h-4 w-4" /></Link>
                {publicExperience.applicationsEnabled && <Link to="/apply" className="inline-flex items-center rounded-xl border border-border bg-card px-5 py-3 text-sm font-bold text-foreground">Iniciar candidatura</Link>}
              </div>
            </div>

            <div className="rounded-[2rem] border border-border bg-card p-6 shadow-xl shadow-primary/5 sm:p-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10"><Building2 className="h-7 w-7 text-primary" /></div>
              <h2 className="mt-6 font-heading text-2xl font-bold text-primary">Portal escolar integrado</h2>
              <div className="mt-5 space-y-4">
                <Benefit icon={GraduationCap} title="Experiências por função" text="Cada perfil vê apenas o contexto e as operações adequadas ao seu papel." />
                <Benefit icon={ShieldCheck} title="Gestão institucional" text="Módulos e permissões podem ser configurados por instituição." />
                <Benefit icon={CheckCircle2} title="Continuidade operacional" text="A mesma plataforma liga experiência pública, portal e ERP interno." />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-card">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <span>{branding.displayName}</span>
          {publicExperience.poweredByEduCore && <span className="font-semibold">Powered by EduCore</span>}
        </div>
      </footer>
    </div>
  );
}

function Benefit({ icon: Icon, title, text }: { icon: typeof GraduationCap; title: string; text: string }) {
  return <div className="flex gap-3"><div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary"><Icon className="h-4 w-4 text-primary" /></div><div><p className="text-sm font-bold text-foreground">{title}</p><p className="mt-1 text-xs leading-5 text-muted-foreground">{text}</p></div></div>;
}
