import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { PageContainer } from '@/components/layout/PageContainer';
import { SectionHeader } from '@/components/ui/section-header';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { StatusBadge } from '@/components/ui/status-badge';
import { AlertCard } from '@/components/dashboard/AlertCard';
import { DetailSheet } from '@/components/shared/DetailSheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { students, classGroups, teachers, attendanceRecords } from '@/data/mockData';
import { BarChart3, Users, CheckCircle, AlertTriangle, Calendar, FileText, BookOpen, UserCheck, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export function PedagogyDashboard() {
  const navigate = useNavigate();
  const [activeStudent, setActiveStudent] = useState<typeof students[number] | null>(null);
  const [activeClass, setActiveClass] = useState<typeof classGroups[number] | null>(null);
  const atRisk = students.filter(s => s.estado === 'em_risco');
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Coordenação Académica</h1>
        <p className="mt-1 text-sm text-muted-foreground">Visão geral das operações académicas e desempenho dos alunos.</p>
      </div>
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatsCard label="Alunos" value="176" icon={Users} variant="primary" />
        <StatsCard label="Assiduidade" value="84%" icon={CheckCircle} />
        <StatsCard label="Em Risco" value={atRisk.length} icon={AlertTriangle} />
        <StatsCard label="Professores" value={teachers.length} icon={UserCheck} />
      </div>

      <AlertCard title={`${atRisk.length} alunos em risco académico`} description="Alunos com média inferior a 10 ou assiduidade abaixo de 75%." variant="warning" action="Ver Lista" onAction={() => navigate('/app/pedagogy/risk')} className="mb-6" />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5">
          <SectionHeader title="Alunos em Risco" />
          <div className="mt-3 space-y-2">
            {atRisk.map(s => (
              <button key={s.id} onClick={() => setActiveStudent(s)} className="w-full text-left flex items-center gap-3 rounded-xl border border-warning/20 bg-warning/5 px-4 py-3 hover:shadow-sm transition-all active:scale-[0.997]">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-warning/10 text-xs font-bold text-warning">{s.avatar}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.classe}ª {s.turma} · Média: {s.media} · Assiduidade: {s.taxaAssiduidade}%</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <SectionHeader title="Turmas" />
          <div className="mt-3 space-y-2">
            {classGroups.map(c => (
              <button key={c.id} onClick={() => setActiveClass(c)} className="w-full text-left flex items-center justify-between rounded-xl border border-border px-4 py-3 hover:shadow-sm transition-all active:scale-[0.997]">
                <div>
                  <p className="text-sm font-medium text-foreground">{c.name}</p>
                  <p className="text-xs text-muted-foreground">Dir. Turma: {c.directorTurma}</p>
                </div>
                <StatusBadge label={`${c.studentCount} alunos`} variant="muted" />
              </button>
            ))}
          </div>
        </div>
      </div>
      <DetailSheet open={!!activeStudent} onOpenChange={(o) => !o && setActiveStudent(null)} title={activeStudent?.name ?? ''} description={activeStudent ? `${activeStudent.classe}ª ${activeStudent.turma} · ${activeStudent.id}` : ''}
        footer={<button onClick={() => { toast.success('Intervenção registada.'); setActiveStudent(null); }} className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Registar intervenção</button>}>
        {activeStudent && (
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl bg-muted/40 p-3 text-center"><p className="text-[10px] text-muted-foreground">Média</p><p className="font-heading text-base font-bold text-destructive">{activeStudent.media}</p></div>
              <div className="rounded-xl bg-muted/40 p-3 text-center"><p className="text-[10px] text-muted-foreground">Assiduidade</p><p className="font-heading text-base font-bold text-warning">{activeStudent.taxaAssiduidade}%</p></div>
            </div>
            <p className="text-muted-foreground">Aluno em risco académico. Recomendado contactar encarregado e activar plano de apoio.</p>
          </div>
        )}
      </DetailSheet>
      <DetailSheet open={!!activeClass} onOpenChange={(o) => !o && setActiveClass(null)} title={activeClass?.name ?? ''} description={activeClass && `Director: ${activeClass.directorTurma}`}
        footer={<button onClick={() => { setActiveClass(null); navigate('/app/pedagogy/schedule'); }} className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Ver horário</button>}>
        {activeClass && <p className="text-sm text-foreground">{activeClass.studentCount} alunos · 9 disciplinas curriculares</p>}
      </DetailSheet>
    </PageContainer>
  );
}

export function PedagogyAnalytics() {
  const [trimestre, setTrimestre] = useState('2');
  const [classFilter, setClassFilter] = useState('all');
  const classRanking = classGroups.map(c => ({ ...c, avg: 10 + Math.random() * 6 })).sort((a, b) => b.avg - a.avg);
  const filtered = classFilter === 'all' ? classRanking : classRanking.filter(c => c.id === classFilter);
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Analítica</h1>
        <p className="mt-1 text-sm text-muted-foreground">Tendências de desempenho e análise estatística.</p>
      </div>
      <div className="mb-4 flex flex-wrap gap-2 max-w-xl">
        <div className="w-40">
          <Select value={trimestre} onValueChange={setTrimestre}>
            <SelectTrigger className="rounded-xl h-9 text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1º Trimestre</SelectItem>
              <SelectItem value="2">2º Trimestre</SelectItem>
              <SelectItem value="3">3º Trimestre</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-44">
          <Select value={classFilter} onValueChange={setClassFilter}>
            <SelectTrigger className="rounded-xl h-9 text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as turmas</SelectItem>
              {classGroups.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatsCard label="Média Geral" value="12.4" icon={BarChart3} variant="primary" />
        <StatsCard label="Taxa Aprovação" value="78%" icon={CheckCircle} />
        <StatsCard label="Em Risco" value="3" icon={AlertTriangle} />
        <StatsCard label="Excelentes" value="2" icon={Users} />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5">
          <SectionHeader title="Ranking de Médias por Turma" />
          <div className="mt-3 space-y-2.5">
            {filtered.map(c => (
              <div key={c.id}>
                <div className="flex justify-between mb-1"><span className="text-xs font-medium text-foreground">{c.name}</span><span className="text-xs font-bold text-foreground">{c.avg.toFixed(1)}/20</span></div>
                <div className="h-2 w-full rounded-full bg-muted"><div className={cn('h-2 rounded-full', c.avg >= 14 ? 'bg-success' : c.avg >= 10 ? 'bg-warning' : 'bg-destructive')} style={{ width: `${(c.avg / 20) * 100}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <SectionHeader title="Distribuição de Risco" />
          <div className="mt-3 space-y-3">
            {[
              { l: 'Excelente', v: 2, c: 'bg-success' },
              { l: 'Bom', v: 3, c: 'bg-primary' },
              { l: 'Regular', v: 0, c: 'bg-warning' },
              { l: 'Em Risco', v: 3, c: 'bg-destructive' },
            ].map((d, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1"><span className="text-xs text-foreground">{d.l}</span><span className="text-xs font-bold text-foreground">{d.v}</span></div>
                <div className="h-2 w-full rounded-full bg-muted"><div className={cn('h-2 rounded-full', d.c)} style={{ width: `${(d.v / 8) * 100}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export function PedagogyClasses() {
  const navigate = useNavigate();
  const [active, setActive] = useState<typeof classGroups[number] | null>(null);
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Turmas</h1>
        <p className="mt-1 text-sm text-muted-foreground">Gestão de turmas e configurações.</p>
      </div>
      <div className="space-y-2">
        {classGroups.map(c => (
          <button key={c.id} onClick={() => setActive(c)} className="w-full text-left flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 hover:shadow-sm transition-all active:scale-[0.997]">
            <div>
              <p className="text-sm font-medium text-foreground">{c.name}</p>
              <p className="text-xs text-muted-foreground">Dir. Turma: {c.directorTurma} · {c.studentCount} alunos</p>
            </div>
            <StatusBadge label={c.classe + 'ª Classe'} variant="primary" />
          </button>
        ))}
      </div>
      <DetailSheet open={!!active} onOpenChange={(o) => !o && setActive(null)} title={active?.name ?? ''} description={active && `Director: ${active.directorTurma}`}
        footer={<div className="grid grid-cols-2 gap-2">
          <button onClick={() => { setActive(null); navigate('/app/pedagogy/schedule'); }} className="rounded-xl border border-border py-2 text-xs font-medium hover:bg-muted">Ver horário</button>
          <button onClick={() => { setActive(null); navigate('/app/pedagogy/attendance'); }} className="rounded-xl bg-primary py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90">Ver assiduidade</button>
        </div>}>
        {active && (
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-xl bg-muted/40 p-3 text-center"><p className="text-[10px] text-muted-foreground">Alunos</p><p className="font-heading text-base font-bold">{active.studentCount}</p></div>
              <div className="rounded-xl bg-muted/40 p-3 text-center"><p className="text-[10px] text-muted-foreground">Em Risco</p><p className="font-heading text-base font-bold text-warning">2</p></div>
              <div className="rounded-xl bg-muted/40 p-3 text-center"><p className="text-[10px] text-muted-foreground">Média</p><p className="font-heading text-base font-bold">13.1</p></div>
            </div>
          </div>
        )}
      </DetailSheet>
    </PageContainer>
  );
}

export function PedagogyTeachers() {
  const [active, setActive] = useState<typeof teachers[number] | null>(null);
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Professores</h1>
        <p className="mt-1 text-sm text-muted-foreground">Gestão e atribuições de professores.</p>
      </div>
      <div className="space-y-2">
        {teachers.map(t => (
          <button key={t.id} onClick={() => setActive(t)} className="w-full text-left flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:shadow-sm transition-all active:scale-[0.997]">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{t.name.split(' ').pop()?.[0]}</div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.departamento} · {t.numTurmas} turmas · {t.numAlunos} alunos</p>
            </div>
            <div className="flex gap-1">
              {t.disciplinas.map((d, i) => (
                <StatusBadge key={i} label={d} variant="muted" />
              ))}
            </div>
          </button>
        ))}
      </div>
      <DetailSheet open={!!active} onOpenChange={(o) => !o && setActive(null)} title={active?.name ?? ''} description={active?.departamento}
        footer={<button onClick={() => { toast.success('Convite de contacto enviado.'); setActive(null); }} className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Contactar</button>}>
        {active && (
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl bg-muted/40 p-3 text-center"><p className="text-[10px] text-muted-foreground">Turmas</p><p className="font-heading text-base font-bold">{active.numTurmas}</p></div>
              <div className="rounded-xl bg-muted/40 p-3 text-center"><p className="text-[10px] text-muted-foreground">Alunos</p><p className="font-heading text-base font-bold">{active.numAlunos}</p></div>
            </div>
            <p className="text-muted-foreground">Disciplinas: {active.disciplinas.join(', ')}</p>
          </div>
        )}
      </DetailSheet>
    </PageContainer>
  );
}

export function PedagogyAttendance() {
  const [classFilter, setClassFilter] = useState('all');
  const [active, setActive] = useState<typeof classGroups[number] | null>(null);
  const filtered = classFilter === 'all' ? classGroups : classGroups.filter(c => c.id === classFilter);
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Assiduidade</h1>
        <p className="mt-1 text-sm text-muted-foreground">Visão institucional de assiduidade.</p>
      </div>
      <div className="mb-4 max-w-xs">
        <Select value={classFilter} onValueChange={setClassFilter}>
          <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as turmas</SelectItem>
            {classGroups.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatsCard label="Taxa Geral" value="84%" icon={CheckCircle} variant="primary" />
        <StatsCard label="Faltas Hoje" value={attendanceRecords.filter(r => r.status === 'falta').length} icon={AlertTriangle} />
        <StatsCard label="Atrasos Hoje" value={attendanceRecords.filter(r => r.status === 'atraso').length} icon={Clock} />
        <StatsCard label="Justificadas" value={attendanceRecords.filter(r => r.status === 'justificada').length} icon={FileText} />
      </div>
      <div className="rounded-2xl border border-border bg-card p-5">
        <SectionHeader title="Faltas por Turma" />
        <div className="mt-3 space-y-2">
          {filtered.map(c => (
            <button key={c.id} onClick={() => setActive(c)} className="w-full text-left flex items-center justify-between rounded-lg px-3 py-2 hover:bg-muted/30 transition-colors active:scale-[0.997]">
              <span className="text-sm font-medium text-foreground">{c.name}</span>
              <span className="text-xs text-muted-foreground">{Math.floor(Math.random() * 5)} faltas hoje</span>
            </button>
          ))}
        </div>
      </div>
      <DetailSheet open={!!active} onOpenChange={(o) => !o && setActive(null)} title={active?.name ?? ''} description="Assiduidade detalhada"
        footer={<button onClick={() => { toast.success('Alerta de faltas gerado e enviado aos encarregados.'); setActive(null); }} className="w-full rounded-xl bg-warning py-2.5 text-sm font-semibold text-warning-foreground hover:bg-warning/90">Gerar alerta de faltas</button>}>
        {active && <p className="text-sm text-foreground">Turma {active.name} · {active.studentCount} alunos · Taxa estimada: 86%</p>}
      </DetailSheet>
    </PageContainer>
  );
}

export function PedagogySchedule() {
  const [active, setActive] = useState<typeof classGroups[number] | null>(null);
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Horário</h1>
        <p className="mt-1 text-sm text-muted-foreground">Gestão de horários académicos.</p>
      </div>
      <div className="rounded-2xl border border-border bg-card p-5">
        <SectionHeader title="Horários por Turma" />
        <div className="mt-3 space-y-2">
          {classGroups.map(c => (
            <button key={c.id} onClick={() => setActive(c)} className="w-full text-left flex items-center justify-between rounded-xl border border-border px-4 py-3 hover:shadow-sm transition-all active:scale-[0.997]">
              <div>
                <p className="text-sm font-medium text-foreground">{c.name}</p>
                <p className="text-xs text-muted-foreground">{c.studentCount} alunos · {c.directorTurma}</p>
              </div>
              <StatusBadge label="Ver Horário" variant="primary" />
            </button>
          ))}
        </div>
      </div>
      <DetailSheet open={!!active} onOpenChange={(o) => !o && setActive(null)} title={`Horário · ${active?.name ?? ''}`} description="Semana actual">
        {active && (
          <div className="space-y-1.5 text-sm">
            {['Segunda','Terça','Quarta','Quinta','Sexta'].map(d => (
              <div key={d} className="rounded-lg border border-border p-2.5">
                <p className="text-xs font-semibold text-foreground">{d}</p>
                <p className="text-[11px] text-muted-foreground">07:30 Mat · 08:15 Por · 09:15 Fis · 10:30 Bio · 11:30 Ing</p>
              </div>
            ))}
          </div>
        )}
      </DetailSheet>
    </PageContainer>
  );
}

export function PedagogyRisk() {
  const [active, setActive] = useState<typeof students[number] | null>(null);
  const [plan, setPlan] = useState('');
  const atRisk = students.filter(s => s.estado === 'em_risco');
  const submit = () => { toast.success('Intervenção registada.'); setActive(null); setPlan(''); };
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Gestão de Risco</h1>
        <p className="mt-1 text-sm text-muted-foreground">Alunos em risco académico (média &lt; 10 ou assiduidade &lt; 75%).</p>
      </div>
      <AlertCard title={`${atRisk.length} alunos requerem intervenção`} description="Estes alunos apresentam indicadores académicos preocupantes." variant="destructive" className="mb-6" />
      <div className="space-y-2">
        {atRisk.map(s => (
          <button key={s.id} onClick={() => setActive(s)} className="w-full text-left rounded-xl border border-destructive/20 bg-destructive/[0.02] p-4 hover:shadow-sm transition-all active:scale-[0.997]">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-sm font-bold text-destructive">{s.avatar}</div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{s.name}</p>
                <p className="text-xs text-muted-foreground">{s.classe}ª {s.turma} · {s.id}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-muted/50 p-2 text-center">
                <p className="text-[10px] text-muted-foreground">Média</p>
                <p className={cn('font-heading text-sm font-bold', s.media < 10 ? 'text-destructive' : 'text-warning')}>{s.media}</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-2 text-center">
                <p className="text-[10px] text-muted-foreground">Assiduidade</p>
                <p className={cn('font-heading text-sm font-bold', s.taxaAssiduidade < 75 ? 'text-destructive' : 'text-warning')}>{s.taxaAssiduidade}%</p>
              </div>
            </div>
          </button>
        ))}
      </div>
      <DetailSheet open={!!active} onOpenChange={(o) => !o && setActive(null)} title={active?.name ?? ''} description="Plano de intervenção"
        footer={<button onClick={submit} className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Registar intervenção</button>}>
        {active && (
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl bg-muted/40 p-3 text-center"><p className="text-[10px] text-muted-foreground">Média</p><p className="font-heading text-base font-bold text-destructive">{active.media}</p></div>
              <div className="rounded-xl bg-muted/40 p-3 text-center"><p className="text-[10px] text-muted-foreground">Assiduidade</p><p className="font-heading text-base font-bold text-warning">{active.taxaAssiduidade}%</p></div>
            </div>
            <div>
              <label className="block text-xs font-medium text-foreground mb-1">Plano de acção</label>
              <textarea value={plan} onChange={e => setPlan(e.target.value)} rows={4} placeholder="Descreva a intervenção…" className="w-full rounded-xl border border-input bg-background p-2 text-sm" />
            </div>
          </div>
        )}
      </DetailSheet>
    </PageContainer>
  );
}

export function PedagogyReports() {
  const [reports, setReports] = useState([
    { name: 'Relatório de Desempenho por Turma', period: '2º Trimestre 2026', status: 'pronto' },
    { name: 'Análise de Assiduidade', period: 'Abril 2026', status: 'pronto' },
    { name: 'Lista de Alunos em Risco', period: 'Actual', status: 'pronto' },
    { name: 'Relatório Anual Académico', period: '2025-2026', status: 'pendente' },
  ]);
  const [active, setActive] = useState<number | null>(null);
  const r = active !== null ? reports[active] : null;

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Relatórios</h1>
        <p className="mt-1 text-sm text-muted-foreground">Relatórios académicos e de desempenho.</p>
      </div>
      <div className="space-y-1.5">
        {reports.map((r, i) => (
          <button key={i} onClick={() => setActive(i)} className="w-full text-left flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:shadow-sm transition-all active:scale-[0.997]">
            <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{r.name}</p>
              <p className="text-xs text-muted-foreground">{r.period}</p>
            </div>
            <StatusBadge label={r.status === 'pronto' ? 'Pronto' : 'Pendente'} variant={r.status === 'pronto' ? 'success' : 'muted'} />
          </button>
        ))}
      </div>
      <DetailSheet open={active !== null} onOpenChange={(o) => !o && setActive(null)} title={r?.name ?? ''} description={r?.period}
        footer={r && (r.status === 'pronto'
          ? <button onClick={() => { toast.success('Relatório exportado com sucesso.'); setActive(null); }} className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Exportar PDF</button>
          : <button onClick={() => { setReports(prev => prev.map((x, i) => i === active ? { ...x, status: 'pronto' } : x)); toast.success('Relatório gerado.'); setActive(null); }} className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Gerar agora</button>
        )}>
        {r && <ul className="text-sm space-y-1.5 list-disc list-inside text-foreground"><li>Cobertura: {r.period}</li><li>Alunos analisados: 176</li><li>Estado: {r.status}</li></ul>}
      </DetailSheet>
    </PageContainer>
  );
}
