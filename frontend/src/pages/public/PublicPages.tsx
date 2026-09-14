import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { Brand } from '@/components/shared/Brand';

const navItems = [
  { to: '/features', label: 'Funcionalidades' },
  { to: '/contact', label: 'Contacto' },
  { to: '/apply', label: 'Candidatar-se' },
];

export function PublicNav() {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border/60 bg-background/80 backdrop-blur-md px-4 py-3 md:px-12">
      <Brand to="/" size="sm" />
      <nav className="hidden md:flex items-center gap-1">
        {navItems.map(n => (
          <Link key={n.to} to={n.to} className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            {n.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        <Link to="/login" className="rounded-xl px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted transition-colors">Entrar</Link>
        <Link to="/apply" className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground hover:bg-primary-deep transition-colors">
          Começar <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </header>
  );
}

export function PublicFooter() {
  return (
    <footer className="border-t border-border bg-secondary/40 px-4 py-10 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 text-center md:flex-row md:items-center md:justify-between md:text-left">
        <div className="flex items-center justify-center gap-3 md:justify-start">
          <Brand size="sm" />
          <span className="text-xs text-muted-foreground">© 2026 Colégio Deus Connosco</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
          <Link to="/features" className="hover:text-foreground">Funcionalidades</Link>
          <Link to="/contact" className="hover:text-foreground">Contacto</Link>
          <Link to="/apply" className="hover:text-foreground">Candidatura</Link>
          <Link to="/apply/status" className="hover:text-foreground">Estado</Link>
        </div>
      </div>
    </footer>
  );
}

/* ========= /features ========= */
export function FeaturesPage() {
  const personas = [
    { icon: '🎓', title: 'Aluno', items: ['Notas em tempo real', 'Horário e agenda', 'Conteúdos por disciplina', 'Pagamentos e recibos'] },
    { icon: '👨‍👩‍👧', title: 'Encarregado', items: ['Acompanhar educandos', 'Pagamentos e dívidas', 'Comunicação directa', 'Documentos académicos'] },
    { icon: '📚', title: 'Professor', items: ['Lançamento de notas', 'Marcação de presenças', 'Gestão de turmas', 'Publicação de conteúdos'] },
    { icon: '📊', title: 'Pedagogia', items: ['Analítica académica', 'Alunos em risco', 'Relatórios de turma', 'Coordenação de equipa'] },
    { icon: '🏛️', title: 'Direcção', items: ['Indicadores institucionais', 'Auditoria e conformidade', 'Visão financeira', 'Decisões estratégicas'] },
    { icon: '💰', title: 'Finanças', items: ['Validação de pagamentos', 'Tesouraria', 'Recibos e multas', 'Relatórios de cobrança'] },
  ];
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PublicNav />
      <main className="flex-1 px-4 py-10 md:px-12 md:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Uma plataforma. Todos os perfis.</h1>
            <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">O Portal do Colégio Deus Connosco organiza experiências dedicadas para alunos, famílias, professores e equipas administrativas num único sistema.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {personas.map(p => (
              <div key={p.title} className="rounded-2xl border border-border bg-card p-5 hover:shadow-md transition-all">
                <div className="text-3xl mb-2">{p.icon}</div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-3">{p.title}</h3>
                <ul className="space-y-1.5">
                  {p.items.map(i => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-primary shrink-0" /> {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/apply" className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
              Iniciar candidatura <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}

/* ========= /contact ========= */
export function ContactPage() {
  const [sent, setSent] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    toast.success('Mensagem de demonstração enviada.');
  };
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PublicNav />
      <main className="flex-1 px-4 py-10 md:px-12 md:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Falar connosco</h1>
            <p className="mt-2 text-sm text-muted-foreground">Demonstração do fluxo de contacto institucional do Colégio Deus Connosco.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Instituição', value: 'Colégio Deus Connosco' },
              { label: 'Instagram', value: '@colegio_deus_connosco.mz' },
              { label: 'Campanha', value: 'Inscrições 2027' },
            ].map(c => (
              <div key={c.label} className="rounded-xl border border-border bg-card p-4">
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{c.label}</p>
                <p className="mt-1 text-sm font-medium text-foreground">{c.value}</p>
              </div>
            ))}
          </div>
          <form onSubmit={submit} className="rounded-2xl border border-border bg-card p-5 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input required placeholder="Nome" className="rounded-xl border border-input bg-background px-3 py-2 text-sm" />
              <input required type="email" placeholder="Email" className="rounded-xl border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <input placeholder="Escola / Instituição" className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm" />
            <textarea required rows={4} placeholder="Como podemos ajudar?" className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm" />
            <button type="submit" disabled={sent} className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-60">
              {sent ? 'Enviado ✓' : 'Enviar mensagem'}
            </button>
          </form>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}

/* ========= /apply ========= */
export function ApplyPage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      const ref = 'CAND-' + Math.random().toString(36).slice(2, 7).toUpperCase();
      toast.success(`Candidatura submetida. Referência: ${ref}`);
      navigate('/apply/status?ref=' + ref);
    }, 600);
  };
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PublicNav />
      <main className="flex-1 px-4 py-10 md:px-12 md:py-16">
        <div className="mx-auto max-w-2xl">
          <div className="mb-6">
            <h1 className="font-heading text-3xl font-bold text-foreground">Candidatura</h1>
            <p className="mt-1 text-sm text-muted-foreground">Preencha os dados para demonstrar o fluxo digital de candidatura.</p>
          </div>
          <form onSubmit={submit} className="rounded-2xl border border-border bg-card p-5 space-y-4">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Candidato(a)</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input required placeholder="Nome completo" className="rounded-xl border border-input bg-background px-3 py-2 text-sm" />
                <input required type="date" placeholder="Data de nascimento" className="rounded-xl border border-input bg-background px-3 py-2 text-sm" />
                <select required className="rounded-xl border border-input bg-background px-3 py-2 text-sm">
                  <option value="">Classe pretendida</option>
                  {Array.from({length: 12}).map((_, i) => <option key={i+1} value={i+1}>{i+1}ª Classe</option>)}
                </select>
                <input required placeholder="Escola anterior" className="rounded-xl border border-input bg-background px-3 py-2 text-sm" />
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Encarregado(a) de Educação</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input required placeholder="Nome do encarregado" className="rounded-xl border border-input bg-background px-3 py-2 text-sm" />
                <input required type="tel" placeholder="Telefone" className="rounded-xl border border-input bg-background px-3 py-2 text-sm" />
                <input required type="email" placeholder="Email" className="sm:col-span-2 rounded-xl border border-input bg-background px-3 py-2 text-sm" />
              </div>
            </div>
            <textarea rows={3} placeholder="Observações (opcional)" className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm" />
            <button type="submit" disabled={submitting} className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-60">
              {submitting ? 'A submeter…' : 'Submeter candidatura'}
            </button>
            <p className="text-center text-xs text-muted-foreground">
              Já tem candidatura? <Link to="/apply/status" className="font-medium text-primary hover:underline">Consultar estado</Link>
            </p>
          </form>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}

/* ========= /apply/status ========= */
export function ApplyStatusPage() {
  const params = new URLSearchParams(window.location.search);
  const initialRef = params.get('ref') || '';
  const [ref, setRef] = useState(initialRef);
  const [result, setResult] = useState<null | { ref: string; status: 'em_analise' | 'aprovada' | 'pendente_documentos'; etapa: number }>(initialRef ? { ref: initialRef, status: 'em_analise', etapa: 2 } : null);

  const consult = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ref.trim()) return;
    setResult({ ref: ref.toUpperCase(), status: 'em_analise', etapa: 2 });
    toast.success('Estado consultado.');
  };

  const steps = ['Submetida', 'Em análise', 'Entrevista', 'Decisão final'];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PublicNav />
      <main className="flex-1 px-4 py-10 md:px-12 md:py-16">
        <div className="mx-auto max-w-2xl">
          <div className="mb-6">
            <h1 className="font-heading text-3xl font-bold text-foreground">Estado da candidatura</h1>
            <p className="mt-1 text-sm text-muted-foreground">Consulte o progresso da sua candidatura.</p>
          </div>
          <form onSubmit={consult} className="rounded-2xl border border-border bg-card p-5 space-y-3 mb-4">
            <input value={ref} onChange={e => setRef(e.target.value)} placeholder="Referência (ex: CAND-A1B2C)" className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm" />
            <button type="submit" className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">Consultar</button>
          </form>
          {result && (
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Referência</p>
                  <p className="font-heading text-lg font-bold text-foreground">{result.ref}</p>
                </div>
                <span className="rounded-full bg-info/10 px-3 py-1 text-xs font-medium text-info">Em análise</span>
              </div>
              <div className="space-y-3">
                {steps.map((s, i) => (
                  <div key={s} className="flex items-center gap-3">
                    <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${i < result.etapa ? 'bg-success text-success-foreground' : i === result.etapa ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>{i + 1}</div>
                    <span className={`text-sm ${i <= result.etapa ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>{s}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-muted-foreground">Estado simulado para demonstração do fluxo de candidatura.</p>
            </div>
          )}
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
