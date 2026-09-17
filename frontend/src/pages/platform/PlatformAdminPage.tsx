import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, CheckCircle2, ExternalLink, Layers3, Plus, RotateCcw, Settings2, ShieldCheck } from 'lucide-react';
import { useTenant } from '@/contexts/TenantContext';
import type { TenantExperiencePreset, TenantModule } from '@/types/tenant';

const MODULE_LABELS: Record<TenantModule, string> = {
  student_registry: 'Alunos',
  admissions: 'Admissões',
  enrollment: 'Matrículas',
  academic: 'Académico',
  timetable: 'Horários',
  attendance: 'Assiduidade',
  assessments: 'Avaliações',
  gradebook: 'Notas',
  finance: 'Finanças',
  treasury: 'Tesouraria',
  documents: 'Documentos',
  communication: 'Comunicação',
  knowledge: 'Conteúdos',
  reporting: 'Relatórios',
  commerce: 'Loja',
};

const PRESET_LABELS: Record<TenantExperiencePreset, string> = {
  editorial: 'Editorial',
  institutional: 'Institucional',
  modern: 'Moderno',
};

export default function PlatformAdminPage() {
  const navigate = useNavigate();
  const { tenants, activeTenant, setActiveTenant, createTenant, updateTenant, setModuleEnabled, resetPreviewTenants } = useTenant();
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [primaryHsl, setPrimaryHsl] = useState('222 47% 18%');
  const [accentHsl, setAccentHsl] = useState('160 84% 32%');
  const [preset, setPreset] = useState<TenantExperiencePreset>('institutional');

  const activeCount = useMemo(() => tenants.filter((tenant) => tenant.status === 'active').length, [tenants]);

  const handleCreate = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim()) return;
    const tenant = createTenant({
      legalName: name.trim(),
      displayName: name.trim(),
      slug: slug.trim() || name,
      primaryHsl,
      accentHsl,
      experiencePreset: preset,
    });
    updateTenant(tenant.id, { status: 'active' });
    setName('');
    setSlug('');
  };

  const openTenant = (tenantId: string) => {
    setActiveTenant(tenantId);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-950">
      <header className="border-b border-slate-200 bg-slate-950 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10"><Layers3 className="h-5 w-5" /></div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">EduCore Platform</p>
              <h1 className="text-lg font-bold">Super Admin</h1>
            </div>
          </div>
          <div className="text-right text-xs text-slate-300">
            <p className="font-semibold text-white">Control Plane V1</p>
            <p>Tenant foundation</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 px-5 py-7 lg:px-8">
        <section className="grid gap-4 md:grid-cols-3">
          <Metric icon={Building2} label="Tenants" value={String(tenants.length)} />
          <Metric icon={CheckCircle2} label="Activos" value={String(activeCount)} />
          <Metric icon={ShieldCheck} label="Tenant actual" value={activeTenant.branding.shortName} />
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.45fr,0.8fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Instituições</p>
                <h2 className="mt-1 text-xl font-bold">Tenants EduCore</h2>
              </div>
              <button onClick={resetPreviewTenants} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50">
                <RotateCcw className="h-3.5 w-3.5" /> Reset preview
              </button>
            </div>

            <div className="space-y-3">
              {tenants.map((tenant) => (
                <article key={tenant.id} className={`rounded-2xl border p-4 ${tenant.id === activeTenant.id ? 'border-slate-950 bg-slate-50' : 'border-slate-200'}`}>
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white">
                        {tenant.branding.logo ? <img src={tenant.branding.logo} alt="" className="h-full w-full object-contain p-1" /> : <span className="text-sm font-black">{tenant.branding.shortName.slice(0, 2).toUpperCase()}</span>}
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="truncate font-bold">{tenant.branding.displayName}</h3>
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${tenant.status === 'active' ? 'bg-emerald-100 text-emerald-700' : tenant.status === 'suspended' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>{tenant.status}</span>
                        </div>
                        <p className="mt-1 text-xs text-slate-500">{tenant.slug} · {PRESET_LABELS[tenant.branding.experiencePreset]} · {tenant.enabledModules.length} módulos</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => openTenant(tenant.id)} className="inline-flex items-center gap-1.5 rounded-lg bg-slate-950 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800">
                        <ExternalLink className="h-3.5 w-3.5" /> Abrir tenant
                      </button>
                      <button
                        onClick={() => updateTenant(tenant.id, { status: tenant.status === 'active' ? 'suspended' : 'active' })}
                        className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold hover:bg-slate-50"
                      >
                        {tenant.status === 'active' ? 'Suspender' : 'Activar'}
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {(Object.keys(MODULE_LABELS) as TenantModule[]).map((module) => {
                      const enabled = tenant.enabledModules.includes(module);
                      return (
                        <button
                          key={module}
                          onClick={() => setModuleEnabled(tenant.id, module, !enabled)}
                          className={`rounded-full px-2.5 py-1 text-[10px] font-bold transition ${enabled ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-500'}`}
                        >
                          {MODULE_LABELS[module]}
                        </button>
                      );
                    })}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <form onSubmit={handleCreate} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-white"><Plus className="h-4 w-4" /></div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Onboarding</p>
                <h2 className="font-bold">Novo tenant</h2>
              </div>
            </div>

            <div className="space-y-4">
              <Field label="Nome da instituição"><input value={name} onChange={(e) => setName(e.target.value)} className="platform-input" placeholder="Ex.: Colégio Horizonte" /></Field>
              <Field label="Slug"><input value={slug} onChange={(e) => setSlug(e.target.value)} className="platform-input" placeholder="colegio-horizonte" /></Field>
              <Field label="Experiência visual">
                <select value={preset} onChange={(e) => setPreset(e.target.value as TenantExperiencePreset)} className="platform-input">
                  <option value="institutional">Institucional</option>
                  <option value="modern">Moderno</option>
                  <option value="editorial">Editorial</option>
                </select>
              </Field>
              <Field label="Primary HSL"><input value={primaryHsl} onChange={(e) => setPrimaryHsl(e.target.value)} className="platform-input" /></Field>
              <Field label="Accent HSL"><input value={accentHsl} onChange={(e) => setAccentHsl(e.target.value)} className="platform-input" /></Field>

              <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white hover:bg-slate-800">
                <Plus className="h-4 w-4" /> Criar tenant
              </button>
            </div>

            <div className="mt-5 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-3 text-xs leading-5 text-slate-600">
              Esta consola usa persistência local apenas nesta fase de MVP. A estrutura foi desenhada para ser substituída pela API da plataforma sem mudar o modelo de tenant.
            </div>
          </form>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <Settings2 className="mt-0.5 h-5 w-5 text-slate-700" />
            <div>
              <h2 className="font-bold">Princípio da plataforma</h2>
              <p className="mt-1 max-w-4xl text-sm leading-6 text-slate-600">Cada instituição usa o mesmo EduCore, mas pode ter branding, preset visual, módulos e papéis próprios. As diferenças não devem ser implementadas como forks por cliente.</p>
            </div>
          </div>
        </section>
      </main>

      <style>{`.platform-input{width:100%;border:1px solid #cbd5e1;border-radius:.75rem;background:#fff;padding:.7rem .8rem;font-size:.875rem;outline:none}.platform-input:focus{border-color:#0f172a;box-shadow:0 0 0 3px rgba(15,23,42,.08)}`}</style>
    </div>
  );
}

function Metric({ icon: Icon, label, value }: { icon: typeof Building2; label: string; value: string }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100"><Icon className="h-4 w-4" /></div><div><p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{label}</p><p className="mt-1 text-lg font-black">{value}</p></div></div></div>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">{label}</span>{children}</label>;
}
