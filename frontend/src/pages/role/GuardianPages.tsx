import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { PageContainer } from '@/components/layout/PageContainer';
import { SectionHeader } from '@/components/ui/section-header';
import { ScheduleView } from '@/components/academic/ScheduleView';
import { StatusBadge } from '@/components/ui/status-badge';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { AlertCard } from '@/components/dashboard/AlertCard';
import { DetailSheet } from '@/components/shared/DetailSheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  students, weeklySchedule, payments, attendanceRecords, grades, getSubjectAverage, subjects
} from '@/data/mockData';
import {
  Users, TrendingUp, CheckCircle, Wallet, Clock, FileText,
  MessageCircle, Bell, GraduationCap, Download, Send
} from 'lucide-react';
import { cn } from '@/lib/utils';

const linkedStudents = [students[0], students[3]]; // Amélia, João
const studentPayments = payments.filter(p => ['ALU-001', 'ALU-004'].includes(p.studentId));

export { GuardianDashboard } from '@/pages/app/RoleDashboards';

/* ─── EDUCANDOS ─── */
export function GuardianStudents() {
  const navigate = useNavigate();
  const [active, setActive] = useState<typeof linkedStudents[number] | null>(null);
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Os Meus Educandos</h1>
        <p className="mt-1 text-sm text-muted-foreground">Acompanhe o progresso académico dos seus educandos.</p>
      </div>

      <div className="space-y-4">
        {linkedStudents.map(s => {
          const studentGrades = grades.filter(g => g.studentId === s.id);
          const recentGrades = studentGrades.slice(0, 3);
          const sPayments = payments.filter(p => p.studentId === s.id && ['pendente', 'atrasado'].includes(p.status));
          const totalDue = sPayments.reduce((sum, p) => sum + (p.amount - p.paidAmount), 0);

          return (
            <button key={s.id} onClick={() => setActive(s)} className="w-full text-left rounded-2xl border border-border bg-card p-5 hover:shadow-sm hover:border-primary/10 transition-all active:scale-[0.997]">
              <div className="flex items-center gap-4 mb-4">
                <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl font-heading text-base font-bold', s.estado === 'excelente' ? 'bg-success/10 text-success' : s.estado === 'em_risco' ? 'bg-warning/10 text-warning' : 'bg-primary/10 text-primary')}>
                  {s.avatar}
                </div>
                <div className="flex-1">
                  <p className="font-heading text-base font-semibold text-foreground">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.classe}ª {s.turma} · {s.id}</p>
                </div>
                <StatusBadge label={s.estado === 'excelente' ? 'Excelente' : s.estado === 'em_risco' ? 'Em Risco' : 'Activo'} variant={s.estado === 'excelente' ? 'success' : s.estado === 'em_risco' ? 'warning' : 'primary'} dot />
              </div>

              <div className="grid grid-cols-4 gap-3 mb-4">
                <div className="text-center">
                  <p className="font-heading text-lg font-bold text-foreground">{s.media.toFixed(1)}</p>
                  <p className="text-[10px] text-muted-foreground">Média</p>
                </div>
                <div className="text-center">
                  <p className="font-heading text-lg font-bold text-foreground">{s.taxaAssiduidade}%</p>
                  <p className="text-[10px] text-muted-foreground">Assiduidade</p>
                </div>
                <div className="text-center">
                  <p className="font-heading text-lg font-bold text-foreground">{studentGrades.length}</p>
                  <p className="text-[10px] text-muted-foreground">Notas</p>
                </div>
                <div className="text-center">
                  <p className={cn('font-heading text-lg font-bold', totalDue > 0 ? 'text-warning' : 'text-success')}>{totalDue.toLocaleString('pt-PT')} MT</p>
                  <p className="text-[10px] text-muted-foreground">Dívida</p>
                </div>
              </div>

              {recentGrades.length > 0 && (
                <div className="space-y-1">
                  {recentGrades.map(g => (
                    <div key={g.id} className="flex items-center justify-between rounded-lg px-3 py-2 bg-muted/30">
                      <span className="text-xs text-foreground">{g.subjectName} — {g.avaliacao}</span>
                      <span className="font-heading text-xs font-bold text-foreground">{g.nota}/{g.maxNota}</span>
                    </div>
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>
      <DetailSheet open={!!active} onOpenChange={(o) => !o && setActive(null)} title={active?.name ?? ''} description={active && `${active.classe}ª ${active.turma} · ${active.id}`}
        footer={<div className="grid grid-cols-2 gap-2">
          <button onClick={() => { setActive(null); navigate('/app/guardian/performance'); }} className="rounded-xl border border-border py-2 text-xs font-medium hover:bg-muted">Ver desempenho</button>
          <button onClick={() => { setActive(null); navigate('/app/guardian/finance'); }} className="rounded-xl bg-primary py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90">Ver finanças</button>
        </div>}>
        {active && (
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl bg-muted/40 p-3 text-center"><p className="text-[10px] text-muted-foreground">Média</p><p className="font-heading text-base font-bold">{active.media}</p></div>
              <div className="rounded-xl bg-muted/40 p-3 text-center"><p className="text-[10px] text-muted-foreground">Assiduidade</p><p className="font-heading text-base font-bold">{active.taxaAssiduidade}%</p></div>
            </div>
          </div>
        )}
      </DetailSheet>
    </PageContainer>
  );
}

/* ─── DESEMPENHO ─── */
export function GuardianPerformance() {
  const [activeId, setActiveId] = useState(linkedStudents[0].id);
  const s = linkedStudents.find(st => st.id === activeId)!;
  const [activeSubject, setActiveSubject] = useState<{ name: string; average: number } | null>(null);
  const subjectAverages = subjects.map(sub => ({
    name: sub.name,
    average: getSubjectAverage(s.id, sub.id),
  })).filter(sa => sa.average > 0);

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Desempenho</h1>
        <p className="mt-1 text-sm text-muted-foreground">Análise do desempenho de {s.name}.</p>
      </div>
      <div className="mb-4 max-w-xs">
        <Select value={activeId} onValueChange={setActiveId}>
          <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
          <SelectContent>
            {linkedStudents.map(e => <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatsCard label="Média" value={s.media.toFixed(1)} icon={TrendingUp} variant="primary" />
        <StatsCard label="Assiduidade" value={`${s.taxaAssiduidade}%`} icon={CheckCircle} />
        <StatsCard label="Melhor" value="Inglês" icon={GraduationCap} />
        <StatsCard label="Mais Fraca" value="Biologia" icon={Clock} trend="Apoio necessário" />
      </div>

      <SectionHeader title="Médias por Disciplina" className="mb-3" />
      <div className="space-y-2">
        {subjectAverages.map((sub, i) => (
          <button key={i} onClick={() => setActiveSubject(sub)} className="w-full text-left rounded-xl border border-border bg-card px-4 py-3 hover:shadow-sm transition-all active:scale-[0.997]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">{sub.name}</span>
              <span className="font-heading text-sm font-bold text-foreground">{sub.average}/20</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-muted">
              <div className={cn('h-1.5 rounded-full', sub.average >= 14 ? 'bg-success' : sub.average >= 10 ? 'bg-warning' : 'bg-destructive')} style={{ width: `${(sub.average / 20) * 100}%` }} />
            </div>
          </button>
        ))}
      </div>
      <DetailSheet open={!!activeSubject} onOpenChange={(o) => !o && setActiveSubject(null)} title={activeSubject?.name ?? ''} description={`Média: ${activeSubject?.average}/20`}>
        {activeSubject && <p className="text-sm text-muted-foreground">Detalhe das avaliações desta disciplina será disponibilizado pelo professor responsável.</p>}
      </DetailSheet>
    </PageContainer>
  );
}

/* ─── ASSIDUIDADE ─── */
export function GuardianAttendance() {
  const [activeId, setActiveId] = useState(linkedStudents[0].id);
  const s = linkedStudents.find(x => x.id === activeId)!;
  const [recordsState, setRecordsState] = useState(attendanceRecords);
  const records = recordsState.filter(a => a.studentId === s.id);
  const [active, setActive] = useState<typeof attendanceRecords[number] | null>(null);
  const statusVariant = (st: string) => st === 'presente' ? 'success' as const : st === 'falta' ? 'destructive' as const : st === 'atraso' ? 'warning' as const : 'info' as const;
  const statusLabel = (st: string) => st === 'presente' ? 'Presente' : st === 'falta' ? 'Falta' : st === 'atraso' ? 'Atraso' : 'Justificada';
  const justify = () => {
    if (!active) return;
    setRecordsState(prev => prev.map(r => r.id === active.id ? { ...r, status: 'justificada' } : r));
    toast.success('Justificação submetida.');
    setActive(null);
  };

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Assiduidade</h1>
        <p className="mt-1 text-sm text-muted-foreground">Registos de assiduidade de {s.name}.</p>
      </div>
      <div className="mb-4 max-w-xs">
        <Select value={activeId} onValueChange={setActiveId}>
          <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
          <SelectContent>
            {linkedStudents.map(e => <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatsCard label="Taxa" value={`${s.taxaAssiduidade}%`} icon={CheckCircle} variant="primary" />
        <StatsCard label="Presenças" value={records.filter(r => r.status === 'presente').length} icon={CheckCircle} />
        <StatsCard label="Faltas" value={records.filter(r => r.status === 'falta').length} icon={Clock} />
        <StatsCard label="Atrasos" value={records.filter(r => r.status === 'atraso').length} icon={Clock} />
      </div>

      <SectionHeader title="Registos Recentes" className="mb-3" />
      <div className="space-y-1.5">
        {records.map(r => (
          <button key={r.id} onClick={() => setActive(r)} className="w-full text-left flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:shadow-sm transition-all active:scale-[0.997]">
            <div className="w-20 shrink-0">
              <p className="text-xs font-medium text-foreground">{new Date(r.date).toLocaleDateString('pt-PT', { month: 'short', day: 'numeric' })}</p>
            </div>
            <div className="flex-1">
              <p className="text-sm text-foreground">{r.disciplina}</p>
              {r.nota && <p className="text-xs text-muted-foreground">{r.nota}</p>}
            </div>
            <StatusBadge label={statusLabel(r.status)} variant={statusVariant(r.status)} dot />
          </button>
        ))}
      </div>
      <DetailSheet open={!!active} onOpenChange={(o) => !o && setActive(null)} title={active?.disciplina ?? ''} description={active && new Date(active.date).toLocaleDateString('pt-PT', { weekday: 'long', day: 'numeric', month: 'long' })}
        footer={active?.status === 'falta' && <button onClick={justify} className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Justificar falta</button>}>
        {active && (
          <div className="space-y-3 text-sm">
            <div className="rounded-xl bg-muted/40 p-4 flex items-center justify-between">
              <span className="text-muted-foreground">Estado</span>
              <StatusBadge label={statusLabel(active.status)} variant={statusVariant(active.status)} dot />
            </div>
            {active.nota && <p className="text-foreground">{active.nota}</p>}
          </div>
        )}
      </DetailSheet>
    </PageContainer>
  );
}

/* ─── HORÁRIO ─── */
export function GuardianSchedule() {
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Horário</h1>
        <p className="mt-1 text-sm text-muted-foreground">Horário de {linkedStudents[0].name}.</p>
      </div>
      <ScheduleView schedule={weeklySchedule} showTeacher />
    </PageContainer>
  );
}

/* ─── FINANÇAS ─── */
export function GuardianFinance() {
  const navigate = useNavigate();
  const pending = studentPayments.filter(p => ['pendente', 'atrasado', 'parcial'].includes(p.status));
  const totalDue = pending.reduce((s, p) => s + (p.amount - p.paidAmount), 0);
  const statusVariant = (s: string) => s === 'atrasado' ? 'destructive' as const : s === 'parcial' ? 'warning' as const : 'muted' as const;
  const statusLabel = (s: string) => s === 'atrasado' ? 'Atrasado' : s === 'parcial' ? 'Parcial' : 'Pendente';

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Finanças</h1>
        <p className="mt-1 text-sm text-muted-foreground">Visão financeira e obrigações pendentes.</p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatsCard label="Total em Dívida" value={`${totalDue.toLocaleString('pt-PT')} MT`} icon={Wallet} variant="primary" />
        <StatsCard label="Em Atraso" value={`${pending.filter(p => p.status === 'atrasado').reduce((s, p) => s + p.amount, 0).toLocaleString('pt-PT')} MT`} icon={Clock} />
        <StatsCard label="Educandos" value={linkedStudents.length} icon={Users} />
      </div>

      {pending.some(p => p.status === 'atrasado') && (
        <AlertCard title="Pagamentos em atraso" description="Algumas propinas estão vencidas. Regularize a situação." variant="destructive" className="mb-4" />
      )}

      <SectionHeader title="Obrigações Pendentes" className="mb-3" />
      <div className="space-y-1.5">
        {pending.map(p => (
          <div key={p.id} className={cn('flex items-center gap-3 rounded-xl border bg-card px-4 py-3', p.status === 'atrasado' ? 'border-destructive/20' : 'border-border')}>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{p.conceito}</p>
              <p className="text-xs text-muted-foreground">{p.studentName} · Venc. {new Date(p.dueDate).toLocaleDateString('pt-PT', { month: 'short', day: 'numeric' })}</p>
            </div>
            <span className={cn('font-heading text-sm font-bold', p.status === 'atrasado' ? 'text-destructive' : 'text-foreground')}>{p.amount.toLocaleString('pt-PT')} MT</span>
            <StatusBadge label={statusLabel(p.status)} variant={statusVariant(p.status)} />
            <button onClick={() => navigate('/app/guardian/payments')} className="rounded-lg bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground hover:bg-primary/90 active:scale-95">Pagar</button>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

/* ─── PAGAMENTOS ─── */
export function GuardianPayments() {
  const [list, setList] = useState(studentPayments);
  const [active, setActive] = useState<typeof studentPayments[number] | null>(null);
  const allPayments = [...studentPayments].sort((a, b) => (b.paidDate || b.dueDate).localeCompare(a.paidDate || a.dueDate));
  const statusVariant = (s: string) => s === 'pago' || s === 'validado' ? 'success' as const : s === 'atrasado' ? 'destructive' as const : s === 'em_revisao' ? 'info' as const : s === 'rejeitado' ? 'destructive' as const : 'muted' as const;
  const statusLabel = (s: string) => s === 'pago' ? 'Pago' : s === 'validado' ? 'Validado' : s === 'atrasado' ? 'Atrasado' : s === 'em_revisao' ? 'Em Revisão' : s === 'rejeitado' ? 'Rejeitado' : s === 'parcial' ? 'Parcial' : 'Pendente';
  const submitPayment = () => {
    if (!active) return;
    setList(prev => prev.map(p => p.id === active.id ? { ...p, status: 'em_revisao', paidAmount: p.amount, paidDate: new Date().toISOString().slice(0, 10) } : p));
    toast.success('Pagamento submetido. A aguardar validação.');
    setActive(null);
  };

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Pagamentos</h1>
        <p className="mt-1 text-sm text-muted-foreground">Efectuar e acompanhar pagamentos.</p>
      </div>

      <div className="space-y-1.5">
        {list.map(p => (
          <button key={p.id} onClick={() => setActive(p)} className="w-full text-left flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:shadow-sm transition-all active:scale-[0.997]">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{p.conceito}</p>
              <p className="text-xs text-muted-foreground">
                {p.studentName} · {p.paidDate ? `Pago ${new Date(p.paidDate).toLocaleDateString('pt-PT', { month: 'short', day: 'numeric' })}` : `Venc. ${new Date(p.dueDate).toLocaleDateString('pt-PT', { month: 'short', day: 'numeric' })}`}
                {p.referencia && ` · ${p.referencia}`}
              </p>
            </div>
            <span className="font-heading text-sm font-bold text-foreground">{p.amount.toLocaleString('pt-PT')} MT</span>
            <StatusBadge label={statusLabel(p.status)} variant={statusVariant(p.status)} />
          </button>
        ))}
      </div>
      <DetailSheet open={!!active} onOpenChange={(o) => !o && setActive(null)} title={active?.conceito ?? ''} description={active && `${active.studentName}`}
        footer={active && (
          ['pendente', 'atrasado', 'parcial'].includes(active.status)
            ? <button onClick={submitPayment} className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Pagar agora ({active.amount.toLocaleString('pt-PT')} MT)</button>
            : <button onClick={() => { toast.success('Recibo descarregado.'); setActive(null); }} className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Ver recibo</button>
        )}>
        {active && (
          <div className="space-y-2 text-sm">
            <div className="rounded-xl bg-muted/40 p-4 space-y-1.5">
              <div className="flex justify-between"><span className="text-muted-foreground">Valor</span><span className="font-heading font-bold text-foreground">{active.amount.toLocaleString('pt-PT')} MT</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Vencimento</span><span className="font-medium text-foreground">{new Date(active.dueDate).toLocaleDateString('pt-PT')}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Estado</span><StatusBadge label={statusLabel(active.status)} variant={statusVariant(active.status)} /></div>
            </div>
          </div>
        )}
      </DetailSheet>
    </PageContainer>
  );
}

/* ─── DOCUMENTOS ─── */
export function GuardianDocuments() {
  const [active, setActive] = useState<{ name: string; student: string; date: string; type: string } | null>(null);
  const docs = [
    { name: 'Pauta — 1º Trimestre', student: 'Amélia Mondlane', date: 'Jan 2026', type: 'pauta' },
    { name: 'Certificado de Matrícula', student: 'Amélia Mondlane', date: 'Set 2025', type: 'certificado' },
    { name: 'Pauta — 1º Trimestre', student: 'João Sitoe', date: 'Jan 2026', type: 'pauta' },
    { name: 'Ficha Médica', student: 'Amélia Mondlane', date: 'Ago 2025', type: 'ficha' },
    { name: 'Certificado de Matrícula', student: 'João Sitoe', date: 'Set 2025', type: 'certificado' },
  ];

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Documentos</h1>
        <p className="mt-1 text-sm text-muted-foreground">Documentos académicos e certificados.</p>
      </div>
      <div className="space-y-1.5">
        {docs.map((d, i) => (
          <button key={i} onClick={() => setActive(d)} className="w-full text-left flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:shadow-sm transition-all active:scale-[0.997]">
            <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{d.name}</p>
              <p className="text-xs text-muted-foreground">{d.student} · {d.date}</p>
            </div>
            <Download className="h-4 w-4 text-muted-foreground" />
          </button>
        ))}
      </div>
      <DetailSheet open={!!active} onOpenChange={(o) => !o && setActive(null)} title={active?.name ?? ''} description={active && `${active.student} · ${active.date}`}
        footer={<button onClick={() => { toast.success('Documento descarregado.'); setActive(null); }} className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Descarregar PDF</button>}>
        {active && (
          <div className="space-y-3">
            <div className="aspect-video rounded-xl bg-muted/40 flex items-center justify-center text-muted-foreground text-xs">Pré-visualização</div>
            <p className="text-sm text-muted-foreground">Tipo: {active.type}</p>
          </div>
        )}
      </DetailSheet>
    </PageContainer>
  );
}

/* ─── CHAT ─── */
export function GuardianChat() {
  const conversations = [
    { name: 'Prof. António Magaia', lastMessage: 'Amélia está a ir bem em Matemática', time: '2h atrás', unread: 1 },
    { name: 'Prof. Ernesto Vilankulo', lastMessage: 'Biologia requer mais atenção', time: '1d atrás', unread: 0 },
    { name: 'Secretaria', lastMessage: 'Pedido de documento processado', time: '3d atrás', unread: 0 },
  ];
  const [open, setOpen] = useState<typeof conversations[number] | null>(null);
  const [draft, setDraft] = useState('');
  const [thread, setThread] = useState<{ from: 'me' | 'them'; text: string }[]>([]);
  const send = () => {
    if (!draft.trim()) return;
    setThread(t => [...t, { from: 'me', text: draft }]);
    setDraft('');
    toast.success('Mensagem enviada.');
  };

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Chat</h1>
        <p className="mt-1 text-sm text-muted-foreground">Comunicar com professores e funcionários.</p>
      </div>
      <div className="space-y-1.5">
        {conversations.map((c, i) => (
          <button key={i} onClick={() => { setOpen(c); setThread([{ from: 'them', text: c.lastMessage }, { from: 'them', text: 'Está disponível para uma conversa?' }]); }} className="w-full text-left flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:shadow-sm hover:border-primary/10 transition-all active:scale-[0.995]">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-heading text-sm font-bold text-primary">{c.name[0]}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{c.name}</p>
              <p className="text-xs text-muted-foreground truncate">{c.lastMessage}</p>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <span className="text-[10px] text-muted-foreground">{c.time}</span>
              {c.unread > 0 && <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">{c.unread}</span>}
            </div>
          </button>
        ))}
      </div>
      <DetailSheet open={!!open} onOpenChange={(o) => !o && setOpen(null)} title={open?.name ?? ''} description="Conversa"
        footer={<div className="flex items-center gap-2">
          <input value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Escrever mensagem…" className="flex-1 rounded-xl border border-input bg-background px-3 py-2 text-sm" />
          <button onClick={send} className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"><Send className="h-4 w-4" /></button>
        </div>}>
        <div className="space-y-2">
          {thread.map((m, i) => (
            <div key={i} className={cn('max-w-[80%] rounded-2xl px-3 py-2 text-sm', m.from === 'me' ? 'ml-auto bg-primary text-primary-foreground' : 'bg-muted text-foreground')}>{m.text}</div>
          ))}
        </div>
      </DetailSheet>
    </PageContainer>
  );
}

/* ─── NOTIFICAÇÕES ─── */
export function GuardianNotifications() {
  const navigate = useNavigate();
  const [items, setItems] = useState([
    { title: 'Nova Nota: Matemática', message: 'Amélia Mondlane obteve 16/20 na ACS1.', type: 'nota', time: '2h atrás', read: false },
    { title: 'Falta Registada', message: 'Amélia faltou a Biologia no dia 9 de Abril.', type: 'assiduidade', time: '5d atrás', read: false },
    { title: 'Pagamento em Atraso', message: 'Multa de 500 MT está vencida.', type: 'pagamento', time: '1 sem. atrás', read: true },
    { title: 'Autorização para Visita', message: 'Visita de Biologia no dia 18 de Abril requer autorização.', type: 'alerta', time: '3d atrás', read: true },
  ]);
  const handleClick = (i: number) => {
    setItems(prev => prev.map((x, k) => k === i ? { ...x, read: true } : x));
    const n = items[i];
    if (n.type === 'nota') navigate('/app/guardian/performance');
    else if (n.type === 'assiduidade') navigate('/app/guardian/attendance');
    else if (n.type === 'pagamento') navigate('/app/guardian/finance');
  };
  const unread = items.filter(i => !i.read).length;

  return (
    <PageContainer>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Notificações</h1>
          <p className="mt-1 text-sm text-muted-foreground">{unread} por ler.</p>
        </div>
        {unread > 0 && <button onClick={() => { setItems(prev => prev.map(x => ({ ...x, read: true }))); toast.success('Tudo marcado como lido.'); }} className="text-xs font-medium text-primary hover:underline">Marcar tudo como lido</button>}
      </div>
      <div className="space-y-1.5">
        {items.map((n, i) => (
          <button key={i} onClick={() => handleClick(i)} className={cn('w-full text-left flex items-start gap-3 rounded-xl border px-4 py-3 hover:shadow-sm transition-all active:scale-[0.997]', n.read ? 'border-border bg-card' : 'border-primary/20 bg-primary/[0.02]')}>
            <Bell className={cn('h-4 w-4 mt-0.5 shrink-0', n.read ? 'text-muted-foreground' : 'text-primary')} />
            <div className="flex-1 min-w-0">
              <p className={cn('text-sm', n.read ? 'text-foreground' : 'font-medium text-foreground')}>{n.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{n.message}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{n.time}</p>
            </div>
            {!n.read && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />}
          </button>
        ))}
      </div>
    </PageContainer>
  );
}
