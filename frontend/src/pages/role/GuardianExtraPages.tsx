import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { PageContainer } from '@/components/layout/PageContainer';
import { SectionHeader } from '@/components/ui/section-header';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { StatusBadge } from '@/components/ui/status-badge';
import { DetailSheet } from '@/components/shared/DetailSheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { students, assessmentsCalendar, grades, payments, attendanceRecords } from '@/data/mockData';
import type { AssessmentCalendarItem } from '@/data/mockData';
import { ArrowLeft, TrendingUp, CheckCircle, Wallet, Calendar, Clock, ChevronRight, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const linkedStudents = [students[0], students[3]];

/* ─── DETALHE DO EDUCANDO ─── */
export function GuardianStudentDetail() {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const s = students.find(x => x.id === studentId);

  if (!s) return <PageContainer><p className="text-sm text-muted-foreground">Educando não encontrado.</p></PageContainer>;

  const recentGrades = grades.filter(g => g.studentId === s.id).slice(0, 5);
  const sPayments = payments.filter(p => p.studentId === s.id);
  const due = sPayments.filter(p => ['pendente', 'atrasado', 'parcial'].includes(p.status)).reduce((acc, p) => acc + (p.amount - p.paidAmount), 0);
  const upcoming = assessmentsCalendar.filter(a => a.status !== 'concluida').slice(0, 3);
  const recentAtt = attendanceRecords.filter(a => a.studentId === s.id).slice(0, 4);

  return (
    <PageContainer>
      <button onClick={() => navigate('/app/guardian/students')} className="mb-4 flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"><ArrowLeft className="h-3.5 w-3.5" /> Educandos</button>

      <div className="mb-5 rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-transparent p-5">
        <div className="flex items-center gap-4">
          <div className={cn('flex h-14 w-14 items-center justify-center rounded-2xl font-heading text-lg font-bold', s.estado === 'excelente' ? 'bg-success/10 text-success' : s.estado === 'em_risco' ? 'bg-warning/10 text-warning' : 'bg-primary/10 text-primary')}>{s.avatar}</div>
          <div className="flex-1">
            <h1 className="font-heading text-xl font-bold text-foreground">{s.name}</h1>
            <p className="text-xs text-muted-foreground">{s.classe}ª {s.turma} · {s.id} · {s.email}</p>
          </div>
          <StatusBadge label={s.estado === 'excelente' ? 'Excelente' : s.estado === 'em_risco' ? 'Em Risco' : 'Activo'} variant={s.estado === 'excelente' ? 'success' : s.estado === 'em_risco' ? 'warning' : 'primary'} dot />
        </div>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatsCard label="Média" value={s.media.toFixed(1)} icon={TrendingUp} variant="primary" />
        <StatsCard label="Assiduidade" value={`${s.taxaAssiduidade}%`} icon={CheckCircle} />
        <StatsCard label="Dívida" value={`${due.toLocaleString('pt-PT')} MT`} icon={Wallet} />
        <StatsCard label="Comportamento" value="Bom" icon={CheckCircle} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-4">
          <SectionHeader title="Últimas Notas" />
          <div className="mt-3 space-y-1.5">
            {recentGrades.length === 0 && <p className="text-xs text-muted-foreground">Sem notas.</p>}
            {recentGrades.map(g => (
              <div key={g.id} className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
                <span className="text-xs text-foreground">{g.subjectName} — {g.tipo}</span>
                <span className="font-heading text-sm font-bold text-foreground">{g.nota}/{g.maxNota}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4">
          <SectionHeader title="Próximas Avaliações" />
          <div className="mt-3 space-y-1.5">
            {upcoming.map(a => (
              <div key={a.id} className="flex items-center gap-2 rounded-lg border border-border px-3 py-2">
                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">{a.subjectName} — {a.tipo}</p>
                  <p className="text-[10px] text-muted-foreground">{new Date(a.date).toLocaleDateString('pt-PT', { day: 'numeric', month: 'short' })}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4">
          <SectionHeader title="Assiduidade Recente" />
          <div className="mt-3 space-y-1.5">
            {recentAtt.map(a => (
              <div key={a.id} className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
                <span className="text-xs text-foreground">{a.disciplina} · {new Date(a.date).toLocaleDateString('pt-PT', { day: 'numeric', month: 'short' })}</span>
                <StatusBadge label={a.status === 'presente' ? 'Presente' : a.status === 'falta' ? 'Falta' : a.status === 'atraso' ? 'Atraso' : 'Justificada'} variant={a.status === 'presente' ? 'success' : a.status === 'falta' ? 'destructive' : a.status === 'atraso' ? 'warning' : 'info'} />
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4">
          <SectionHeader title="Resumo Financeiro" />
          <div className="mt-3 space-y-1.5">
            {sPayments.slice(0, 4).map(p => (
              <div key={p.id} className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
                <span className="text-xs text-foreground truncate">{p.conceito}</span>
                <span className="font-heading text-xs font-bold text-foreground">{p.amount.toLocaleString('pt-PT')} MT</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <button onClick={() => navigate('/app/guardian/performance')} className="rounded-xl border border-border bg-card py-2.5 text-xs font-medium text-foreground hover:bg-muted">Ver Notas</button>
        <button onClick={() => navigate('/app/guardian/finance')} className="rounded-xl border border-border bg-card py-2.5 text-xs font-medium text-foreground hover:bg-muted">Ver Propinas</button>
        <button onClick={() => navigate('/app/guardian/assessments-calendar')} className="rounded-xl border border-border bg-card py-2.5 text-xs font-medium text-foreground hover:bg-muted">Calendário</button>
        <button onClick={() => navigate('/app/guardian/chat')} className="rounded-xl bg-primary py-2.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-1.5"><MessageCircle className="h-3.5 w-3.5" />Enviar Mensagem</button>
      </div>
    </PageContainer>
  );
}

/* ─── CALENDÁRIO MULTI-EDUCANDO ─── */
export function GuardianAssessmentsCalendar() {
  const [student, setStudent] = useState<string>('all');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [active, setActive] = useState<AssessmentCalendarItem | null>(null);

  const filtered = useMemo(() => assessmentsCalendar.filter(a => {
    const studentMatch = student === 'all' ? a.studentIds.some(id => linkedStudents.find(s => s.id === id)) : a.studentIds.includes(student);
    const subjectMatch = subjectFilter === 'all' || a.subjectName === subjectFilter;
    return studentMatch && subjectMatch;
  }), [student, subjectFilter]);

  const subjectOptions = ['all', ...new Set(assessmentsCalendar.map(a => a.subjectName))];

  return (
    <PageContainer>
      <div className="mb-5">
        <h1 className="font-heading text-2xl font-bold text-foreground">Calendário de Avaliações</h1>
        <p className="mt-1 text-sm text-muted-foreground">Avaliações dos seus educandos.</p>
      </div>

      <div className="mb-4 flex flex-wrap gap-2 max-w-xl">
        <div className="w-44"><Select value={student} onValueChange={setStudent}><SelectTrigger className="rounded-xl h-9 text-xs"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">Todos os educandos</SelectItem>{linkedStudents.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}</SelectContent></Select></div>
        <div className="w-44"><Select value={subjectFilter} onValueChange={setSubjectFilter}><SelectTrigger className="rounded-xl h-9 text-xs"><SelectValue /></SelectTrigger><SelectContent>{subjectOptions.map(s => <SelectItem key={s} value={s}>{s === 'all' ? 'Todas as disciplinas' : s}</SelectItem>)}</SelectContent></Select></div>
      </div>

      <div className="space-y-1.5">
        {filtered.length === 0 && <p className="text-center text-xs text-muted-foreground py-6">Sem avaliações para o filtro.</p>}
        {filtered.map(a => {
          const studentNames = a.studentIds.map(id => linkedStudents.find(s => s.id === id)?.name).filter(Boolean).join(', ');
          return (
            <button key={a.id} onClick={() => setActive(a)} className="w-full text-left flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:shadow-sm transition-all active:scale-[0.997]">
              <div className="flex h-10 w-12 shrink-0 flex-col items-center justify-center rounded-lg bg-primary/5 text-primary">
                <span className="text-[9px] uppercase font-semibold">{new Date(a.date).toLocaleDateString('pt-PT', { month: 'short' })}</span>
                <span className="text-sm font-bold leading-none">{new Date(a.date).getDate()}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{a.subjectName} — {a.tipo}</p>
                <p className="text-[11px] text-muted-foreground truncate"><Clock className="h-3 w-3 inline mr-0.5" />{a.time} · {studentNames || a.turma}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          );
        })}
      </div>

      <DetailSheet open={!!active} onOpenChange={(o) => !o && setActive(null)} title={active?.title ?? ''} description={active ? `${active.subjectName} · ${active.turma}` : ''}
        footer={active && <button onClick={() => { toast.success('Recomendação enviada para acompanhamento.'); setActive(null); }} className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Acompanhar em casa</button>}>
        {active && (
          <div className="space-y-3 text-sm">
            <div className="rounded-xl bg-muted/40 p-3 space-y-1.5 text-xs">
              <div className="flex justify-between"><span className="text-muted-foreground">Data</span><span className="text-foreground">{new Date(active.date).toLocaleDateString('pt-PT', { weekday: 'long', day: 'numeric', month: 'long' })}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Hora</span><span className="text-foreground">{active.time}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Sala</span><span className="text-foreground">{active.room}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Professor</span><span className="text-foreground">{active.teacher}</span></div>
            </div>
            <p className="text-sm text-foreground"><strong>Matéria:</strong> {active.materia}</p>
            <p className="text-xs text-muted-foreground">Recomendamos acompanhar o estudo em casa nos dias anteriores e garantir descanso adequado.</p>
          </div>
        )}
      </DetailSheet>
    </PageContainer>
  );
}