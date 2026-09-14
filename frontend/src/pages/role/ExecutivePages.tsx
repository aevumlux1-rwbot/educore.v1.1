import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { PageContainer } from '@/components/layout/PageContainer';
import { SectionHeader } from '@/components/ui/section-header';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { StatusBadge } from '@/components/ui/status-badge';
import { AlertCard } from '@/components/dashboard/AlertCard';
import { QuickActionCard } from '@/components/dashboard/QuickActionCard';
import { DetailSheet } from '@/components/shared/DetailSheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { financeStats, students, classGroups, teachers } from '@/data/mockData';
import { Users, Wallet, GraduationCap, BarChart3, Shield, FileText, CheckCircle, AlertTriangle, TrendingUp, Clock } from 'lucide-react';

export function ExecutiveDashboard() {
  const navigate = useNavigate();
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Painel da Direcção</h1>
        <p className="mt-1 text-sm text-muted-foreground">Visão institucional e indicadores estratégicos.</p>
      </div>
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatsCard label="Alunos" value="176" icon={Users} variant="primary" />
        <StatsCard label="Receita" value={`${(financeStats.totalValidado / 1000).toFixed(0)}K MT`} icon={Wallet} />
        <StatsCard label="Retenção" value="94%" icon={GraduationCap} />
        <StatsCard label="Crescimento" value="+12%" icon={BarChart3} />
      </div>

      <div className="mb-6 space-y-2">
        <AlertCard title={`${students.filter(s => s.estado === 'em_risco').length} alunos em risco académico`} description="Requerem acompanhamento pela coordenação pedagógica." variant="warning" action="Ver Lista" onAction={() => navigate('/app/executive/academic')} />
        <AlertCard title={`${financeStats.totalAtrasado.toLocaleString('pt-PT')} MT em atraso`} description="Propinas por cobrar em 3 alunos." variant="destructive" action="Ver Finanças" onAction={() => navigate('/app/executive/finance')} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <button onClick={() => navigate('/app/executive/academic')} className="text-left rounded-2xl border border-border bg-card p-5 hover:shadow-sm hover:border-primary/10 transition-all active:scale-[0.997]">
          <SectionHeader title="Resumo Académico" />
          <div className="mt-3 space-y-2">
            {[
              { l: 'Turmas', v: classGroups.length },
              { l: 'Professores', v: teachers.length },
              { l: 'Média Geral', v: '12.4' },
              { l: 'Taxa de Aprovação', v: '78%' },
            ].map((r, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg px-3 py-2">
                <span className="text-sm text-foreground">{r.l}</span>
                <span className="font-heading text-sm font-bold text-foreground">{r.v}</span>
              </div>
            ))}
          </div>
        </button>

        <button onClick={() => navigate('/app/executive/finance')} className="text-left rounded-2xl border border-border bg-card p-5 hover:shadow-sm hover:border-primary/10 transition-all active:scale-[0.997]">
          <SectionHeader title="Resumo Financeiro" />
          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between rounded-lg px-3 py-2">
              <span className="text-sm text-foreground">Validado</span>
              <span className="font-heading text-sm font-bold text-success">{financeStats.totalValidado.toLocaleString('pt-PT')} MT</span>
            </div>
            <div className="flex items-center justify-between rounded-lg px-3 py-2">
              <span className="text-sm text-foreground">Pendente</span>
              <span className="font-heading text-sm font-bold text-warning">{financeStats.totalPendente.toLocaleString('pt-PT')} MT</span>
            </div>
            <div className="flex items-center justify-between rounded-lg px-3 py-2">
              <span className="text-sm text-foreground">Em Atraso</span>
              <span className="font-heading text-sm font-bold text-destructive">{financeStats.totalAtrasado.toLocaleString('pt-PT')} MT</span>
            </div>
            <div className="flex items-center justify-between rounded-lg px-3 py-2">
              <span className="text-sm text-foreground">Taxa de Cobrança</span>
              <span className="font-heading text-sm font-bold text-foreground">68%</span>
            </div>
          </div>
        </button>
      </div>

      <div className="mt-6">
        <SectionHeader title="Acções Rápidas" />
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <QuickActionCard icon={BarChart3} label="Relatórios" to="/app/executive/reports" />
          <QuickActionCard icon={Wallet} label="Finanças" to="/app/executive/finance" />
          <QuickActionCard icon={Users} label="Matrículas" to="/app/executive/enrollment" />
          <QuickActionCard icon={Shield} label="Auditoria" to="/app/executive/audit" />
        </div>
      </div>
    </PageContainer>
  );
}

export function ExecutiveFinance() {
  const navigate = useNavigate();
  const [active, setActive] = useState<{ label: string; value: string; description: string } | null>(null);
  const kpis = [
    { id: 'validado', label: 'Validado', value: `${financeStats.totalValidado.toLocaleString('pt-PT')} MT`, description: 'Total de pagamentos validados no exercício corrente.' },
    { id: 'pendente', label: 'Pendente', value: `${financeStats.totalPendente.toLocaleString('pt-PT')} MT`, description: 'Aguarda submissão e/ou validação.' },
    { id: 'atrasado', label: 'Em Atraso', value: `${financeStats.totalAtrasado.toLocaleString('pt-PT')} MT`, description: 'Propinas e multas vencidas.' },
    { id: 'cobranca', label: 'Taxa de Cobrança', value: '68%', description: 'Indicador de eficácia da cobrança no período.' },
  ];
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Visão Financeira</h1>
        <p className="mt-1 text-sm text-muted-foreground">Resumo financeiro de alto nível.</p>
      </div>
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {kpis.map((k, i) => (
          <button key={k.id} onClick={() => setActive(k)} className="text-left active:scale-[0.98] transition-transform">
            <StatsCard label={k.label} value={k.value} icon={i === 0 ? CheckCircle : i === 1 ? Clock : i === 2 ? AlertTriangle : TrendingUp} variant={i === 0 ? 'primary' : 'default'} />
          </button>
        ))}
      </div>
      <div className="rounded-2xl border border-border bg-card p-5">
        <SectionHeader title="Indicadores Financeiros" />
        <div className="mt-4 space-y-4">
          <div>
            <div className="flex justify-between mb-1"><span className="text-xs text-muted-foreground">Taxa de Cobrança</span><span className="text-xs font-medium text-foreground">68%</span></div>
            <div className="h-2 w-full rounded-full bg-muted"><div className="h-2 rounded-full bg-primary" style={{ width: '68%' }} /></div>
          </div>
          <div>
            <div className="flex justify-between mb-1"><span className="text-xs text-muted-foreground">Pagamento Pontual</span><span className="text-xs font-medium text-foreground">82%</span></div>
            <div className="h-2 w-full rounded-full bg-muted"><div className="h-2 rounded-full bg-success" style={{ width: '82%' }} /></div>
          </div>
        </div>
        <button onClick={() => navigate('/app/executive/reports')} className="mt-5 w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all">
          Ver relatório financeiro
        </button>
      </div>
      <DetailSheet open={!!active} onOpenChange={(o) => !o && setActive(null)} title={active?.label ?? ''} description={active?.description}
        footer={<button onClick={() => { setActive(null); navigate('/app/executive/reports'); }} className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Abrir relatório completo</button>}>
        {active && (
          <div className="space-y-3">
            <div className="rounded-xl bg-muted/40 p-4 text-center">
              <p className="text-[11px] text-muted-foreground">Indicador</p>
              <p className="font-heading text-3xl font-bold text-foreground">{active.value}</p>
            </div>
            <p className="text-sm text-foreground">{active.description}</p>
          </div>
        )}
      </DetailSheet>
    </PageContainer>
  );
}

export function ExecutiveAcademic() {
  const navigate = useNavigate();
  const [active, setActive] = useState<typeof classGroups[number] | null>(null);
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Visão Académica</h1>
        <p className="mt-1 text-sm text-muted-foreground">Desempenho académico institucional.</p>
      </div>
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatsCard label="Média Geral" value="12.4" icon={TrendingUp} variant="primary" />
        <StatsCard label="Aprovação" value="78%" icon={CheckCircle} />
        <StatsCard label="Excelentes" value={students.filter(s => s.estado === 'excelente').length} icon={GraduationCap} />
        <StatsCard label="Em Risco" value={students.filter(s => s.estado === 'em_risco').length} icon={AlertTriangle} />
      </div>
      <div className="rounded-2xl border border-border bg-card p-5">
        <SectionHeader title="Desempenho por Turma" />
        <div className="mt-3 space-y-2">
          {classGroups.map(c => (
            <button key={c.id} onClick={() => setActive(c)} className="w-full text-left flex items-center justify-between rounded-lg px-3 py-2 hover:bg-muted/30 transition-colors active:scale-[0.997]">
              <span className="text-sm font-medium text-foreground">{c.name}</span>
              <span className="text-xs text-muted-foreground">{c.studentCount} alunos · Dir.: {c.directorTurma}</span>
            </button>
          ))}
        </div>
      </div>
      <DetailSheet open={!!active} onOpenChange={(o) => !o && setActive(null)} title={active?.name ?? ''} description={active && `Director: ${active.directorTurma}`}
        footer={<button onClick={() => { setActive(null); navigate('/app/executive/reports'); }} className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Gerar relatório académico</button>}>
        {active && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {[
                { l: 'Alunos', v: active.studentCount },
                { l: 'Média', v: '13.2' },
                { l: 'Aprovação', v: '82%' },
                { l: 'Em Risco', v: '2' },
              ].map((s, i) => (
                <div key={i} className="rounded-xl bg-muted/40 p-3 text-center">
                  <p className="text-[10px] text-muted-foreground">{s.l}</p>
                  <p className="font-heading text-base font-bold text-foreground">{s.v}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </DetailSheet>
    </PageContainer>
  );
}

export function ExecutiveEnrollment() {
  const [active, setActive] = useState<typeof classGroups[number] | null>(null);
  return (
    <PageContainer>
      <div className="mb-6 flex items-start justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Matrículas</h1>
          <p className="mt-1 text-sm text-muted-foreground">Estatísticas e tendências de matrículas.</p>
        </div>
        <button onClick={() => toast.success('Distribuição de matrículas exportada.')} className="rounded-xl bg-primary px-3 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all">Exportar</button>
      </div>
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatsCard label="Total Matriculados" value="176" icon={Users} variant="primary" />
        <StatsCard label="Novos (mês)" value="3" icon={GraduationCap} />
        <StatsCard label="Taxa Retenção" value="94%" icon={TrendingUp} />
      </div>
      <div className="rounded-2xl border border-border bg-card p-5">
        <SectionHeader title="Distribuição por Classe" />
        <div className="mt-3 space-y-2">
          {classGroups.map(c => (
            <button key={c.id} onClick={() => setActive(c)} className="w-full text-left flex items-center justify-between rounded-lg px-3 py-2 hover:bg-muted/30 transition-colors active:scale-[0.997]">
              <span className="text-sm font-medium text-foreground">{c.name}</span>
              <StatusBadge label={`${c.studentCount} alunos`} variant="muted" />
            </button>
          ))}
        </div>
      </div>
      <DetailSheet open={!!active} onOpenChange={(o) => !o && setActive(null)} title={active?.name ?? ''} description="Distribuição de matrícula"
        footer={<button onClick={() => { toast.success('Lista de matrículas exportada.'); setActive(null); }} className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Exportar lista</button>}>
        {active && (
          <div className="space-y-3">
            <p className="text-sm text-foreground"><strong>{active.studentCount}</strong> alunos matriculados</p>
            <p className="text-sm text-muted-foreground">Director de turma: {active.directorTurma}</p>
          </div>
        )}
      </DetailSheet>
    </PageContainer>
  );
}

export function ExecutiveReports() {
  const [reports, setReports] = useState([
    { name: 'Relatório Institucional', period: '2025-2026', status: 'pronto' },
    { name: 'Indicadores de Desempenho', period: '2º Trimestre', status: 'pronto' },
    { name: 'Relatório Financeiro', period: 'Abril 2026', status: 'pronto' },
    { name: 'Análise de Retenção', period: 'Anual', status: 'pendente' },
  ]);
  const [active, setActive] = useState<number | null>(null);
  const r = active !== null ? reports[active] : null;

  const exportPdf = () => { toast.success('Relatório exportado com sucesso.'); setActive(null); };
  const generateNow = () => {
    if (active === null) return;
    setReports(prev => prev.map((x, i) => i === active ? { ...x, status: 'pronto' } : x));
    toast.success('Relatório gerado e disponível.');
    setActive(null);
  };

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Relatórios</h1>
        <p className="mt-1 text-sm text-muted-foreground">Relatórios estratégicos e analítica.</p>
      </div>
      <div className="space-y-1.5">
        {reports.map((r, i) => (
          <button key={i} onClick={() => setActive(i)} className="w-full text-left flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:shadow-sm transition-all active:scale-[0.997]">
            <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{r.name}</p>
              <p className="text-xs text-muted-foreground">{r.period}</p>
            </div>
            <StatusBadge label={r.status === 'pronto' ? 'Pronto' : 'Pendente'} variant={r.status === 'pronto' ? 'success' : 'muted'} />
          </button>
        ))}
      </div>
      <DetailSheet open={active !== null} onOpenChange={(o) => !o && setActive(null)} title={r?.name ?? ''} description={r ? `${r.period}` : ''}
        footer={r && (r.status === 'pronto' ? (
          <button onClick={exportPdf} className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Exportar PDF</button>
        ) : (
          <button onClick={generateNow} className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Gerar agora</button>
        ))}>
        {r && (
          <div className="space-y-3">
            <div className="rounded-xl bg-muted/40 p-4 space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Período</span><span className="font-medium text-foreground">{r.period}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Estado</span><StatusBadge label={r.status === 'pronto' ? 'Pronto' : 'Pendente'} variant={r.status === 'pronto' ? 'success' : 'muted'} /></div>
            </div>
            <ul className="space-y-1.5 text-sm text-foreground list-disc list-inside">
              <li>Total de alunos: 176</li>
              <li>Média geral: 12.4 / 20</li>
              <li>Receita validada: {financeStats.totalValidado.toLocaleString('pt-PT')} MT</li>
              <li>Em atraso: {financeStats.totalAtrasado.toLocaleString('pt-PT')} MT</li>
            </ul>
          </div>
        )}
      </DetailSheet>
    </PageContainer>
  );
}

export function ExecutiveAudit() {
  const allLogs = [
    { action: 'Validação de pagamento', user: 'Tesoureiro', time: '2h atrás', details: 'PAG-006 — 5.000 MT validado' },
    { action: 'Lançamento de notas', user: 'Prof. Magaia', time: '4h atrás', details: 'ACS1 Matemática — 11ª A' },
    { action: 'Admissão aprovada', user: 'Secretaria', time: '1d atrás', details: 'Bruno Nhanala — 11ª Classe' },
    { action: 'Relatório gerado', user: 'Sistema', time: '2d atrás', details: 'Relatório mensal de receitas' },
  ];
  const [search, setSearch] = useState('');
  const [userFilter, setUserFilter] = useState('all');
  const [active, setActive] = useState<typeof allLogs[number] | null>(null);
  const userOptions = ['all', ...Array.from(new Set(allLogs.map(l => l.user)))];
  const logs = allLogs.filter(l =>
    (userFilter === 'all' || l.user === userFilter) &&
    (search === '' || l.action.toLowerCase().includes(search.toLowerCase()) || l.details.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <PageContainer>
      <div className="mb-6 flex items-start justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Auditoria</h1>
          <p className="mt-1 text-sm text-muted-foreground">Registos de auditoria e conformidade.</p>
        </div>
        <button onClick={() => toast.success('Auditoria exportada com sucesso.')} className="rounded-xl bg-primary px-3 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all">Exportar auditoria</button>
      </div>
      <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-xl">
        <Input placeholder="Pesquisar acção…" value={search} onChange={e => setSearch(e.target.value)} className="rounded-xl" />
        <Select value={userFilter} onValueChange={setUserFilter}>
          <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
          <SelectContent>
            {userOptions.map(u => <SelectItem key={u} value={u}>{u === 'all' ? 'Todos os utilizadores' : u}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1.5">
        {logs.map((l, i) => (
          <button key={i} onClick={() => setActive(l)} className="w-full text-left flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:shadow-sm transition-all active:scale-[0.997]">
            <Shield className="h-4 w-4 text-muted-foreground shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{l.action}</p>
              <p className="text-xs text-muted-foreground">{l.user} · {l.time} · {l.details}</p>
            </div>
          </button>
        ))}
        {logs.length === 0 && <p className="text-center text-sm text-muted-foreground py-6">Sem registos para o filtro.</p>}
      </div>
      <DetailSheet open={!!active} onOpenChange={(o) => !o && setActive(null)} title={active?.action ?? ''} description={active ? `${active.user} · ${active.time}` : ''}>
        {active && (
          <div className="space-y-3 text-sm">
            <div className="rounded-xl bg-muted/40 p-4 space-y-1.5">
              <div className="flex justify-between"><span className="text-muted-foreground">Utilizador</span><span className="font-medium text-foreground">{active.user}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Quando</span><span className="font-medium text-foreground">{active.time}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Risco</span><StatusBadge label="Baixo" variant="success" /></div>
            </div>
            <p className="text-foreground">{active.details}</p>
          </div>
        )}
      </DetailSheet>
    </PageContainer>
  );
}
