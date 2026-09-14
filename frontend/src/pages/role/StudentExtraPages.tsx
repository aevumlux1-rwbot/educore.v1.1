import { useMemo, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { SectionHeader } from '@/components/ui/section-header';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { StatusBadge } from '@/components/ui/status-badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AssessmentDetailModal } from '@/components/shared/AssessmentDetailModal';
import { subjects, assessmentsCalendar, knowledgeItems, getSubjectAverage, calcMT, students, grades, getSubjectKnowledge } from '@/data/mockData';
import type { AssessmentCalendarItem } from '@/data/mockData';
import { BookOpen, TrendingUp, GraduationCap, AlertTriangle, Calendar, Clock, Sparkles, ChevronRight, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const STUDENT_ID = 'ALU-001';
const current = students[0];

/* ─── DISCIPLINAS / PLANO CURRICULAR ─── */
export function StudentSubjects() {
  const navigate = useNavigate();
  const [trimestre, setTrimestre] = useState<'1' | '2' | '3'>('2');
  const [estado, setEstado] = useState<string>('all');

  const rows = subjects.map(s => {
    const avg = getSubjectAverage(STUDENT_ID, s.id);
    const mt = calcMT(STUDENT_ID, s.id, Number(trimestre));
    const value = mt ?? avg;
    const status: 'excelente' | 'em_dia' | 'atencao' = value >= 14 ? 'excelente' : value >= 10 ? 'em_dia' : 'atencao';
    const n = grades.filter(g => g.studentId === STUDENT_ID && g.subjectId === s.id).length;
    const next = assessmentsCalendar.find(a => a.subjectId === s.id && a.status !== 'concluida');
    return { ...s, value, status, evals: n, next };
  });
  const filtered = estado === 'all' ? rows : rows.filter(r => r.status === estado);

  const valid = rows.filter(r => r.value > 0);
  const general = valid.length ? (valid.reduce((a, r) => a + r.value, 0) / valid.length).toFixed(1) : '—';
  const best = [...valid].sort((a, b) => b.value - a.value)[0];
  const worst = [...valid].sort((a, b) => a.value - b.value)[0];

  return (
    <PageContainer>
      <div className="mb-5">
        <h1 className="font-heading text-2xl font-bold text-foreground">As Minhas Disciplinas</h1>
        <p className="mt-1 text-sm text-muted-foreground">{current.classe}ª {current.turma} · Ano Lectivo 2025/2026 · Plano Curricular</p>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatsCard label="Disciplinas" value={subjects.length} icon={BookOpen} variant="primary" />
        <StatsCard label="Média Geral" value={general} icon={TrendingUp} />
        <StatsCard label="Melhor" value={best?.name ?? '—'} icon={GraduationCap} />
        <StatsCard label="Atenção" value={worst && worst.value < 10 ? worst.name : '—'} icon={AlertTriangle} />
      </div>

      <div className="mb-4 flex flex-wrap gap-2 max-w-xl">
        <div className="w-40"><Select value={trimestre} onValueChange={(v) => setTrimestre(v as '1' | '2' | '3')}><SelectTrigger className="rounded-xl h-9 text-xs"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="1">1º Trimestre</SelectItem><SelectItem value="2">2º Trimestre</SelectItem><SelectItem value="3">3º Trimestre</SelectItem></SelectContent></Select></div>
        <div className="w-44"><Select value={estado} onValueChange={setEstado}><SelectTrigger className="rounded-xl h-9 text-xs"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">Todos os estados</SelectItem><SelectItem value="excelente">Excelente</SelectItem><SelectItem value="em_dia">Em dia</SelectItem><SelectItem value="atencao">Atenção</SelectItem></SelectContent></Select></div>
      </div>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        {filtered.map(s => (
          <button key={s.id} onClick={() => navigate(`/app/student/subjects/${s.id}`)} className="text-left rounded-2xl border border-border bg-card p-4 hover:shadow-sm hover:border-primary/20 transition-all active:scale-[0.997]">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="min-w-0">
                <h3 className="font-heading text-sm font-semibold text-foreground truncate">{s.name}</h3>
                <p className="text-xs text-muted-foreground">{s.code} · {s.teacherName}</p>
              </div>
              {s.tipo === 'extracurricular' && <span className="flex items-center gap-0.5 rounded-md bg-accent px-1.5 py-0.5 text-[10px] font-medium text-accent-foreground"><Sparkles className="h-2.5 w-2.5" /> Extra</span>}
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-heading text-2xl font-bold text-foreground">{s.value > 0 ? s.value : '—'}<span className="text-sm text-muted-foreground">/20</span></span>
              <StatusBadge label={s.status === 'excelente' ? 'Excelente' : s.status === 'em_dia' ? 'Em dia' : 'Atenção'} variant={s.status === 'excelente' ? 'success' : s.status === 'em_dia' ? 'primary' : 'destructive'} dot />
            </div>
            <div className="h-1.5 w-full rounded-full bg-muted">
              <div className={cn('h-1.5 rounded-full', s.value >= 14 ? 'bg-success' : s.value >= 10 ? 'bg-warning' : 'bg-destructive')} style={{ width: `${(s.value / 20) * 100}%` }} />
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
              <span>{s.evals} avaliação(ões)</span>
              {s.next && <span className="text-foreground font-medium">Próx.: {new Date(s.next.date).toLocaleDateString('pt-PT', { day: 'numeric', month: 'short' })}</span>}
            </div>
          </button>
        ))}
      </div>
    </PageContainer>
  );
}

/* ─── DETALHE DA DISCIPLINA ─── */
export function StudentSubjectDetail() {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const subject = subjects.find(s => s.id === subjectId);
  const [active, setActive] = useState<AssessmentCalendarItem | null>(null);

  if (!subject) {
    return <PageContainer><p className="text-sm text-muted-foreground">Disciplina não encontrada.</p></PageContainer>;
  }

  const avg = getSubjectAverage(STUDENT_ID, subject.id);
  const mt = calcMT(STUDENT_ID, subject.id, 2);
  const value = mt ?? avg;
  const subjectGrades = grades.filter(g => g.studentId === STUDENT_ID && g.subjectId === subject.id);
  const subjectAssessments = assessmentsCalendar.filter(a => a.subjectId === subject.id);
  const upcoming = subjectAssessments.filter(a => a.status !== 'concluida');
  const past = subjectAssessments.filter(a => a.status === 'concluida');
  const materials = getSubjectKnowledge(subject.name);

  return (
    <PageContainer>
      <button onClick={() => navigate('/app/student/subjects')} className="mb-4 flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"><ArrowLeft className="h-3.5 w-3.5" /> Disciplinas</button>

      <div className="mb-5 rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-transparent p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">{subject.name}</h1>
            <p className="text-sm text-muted-foreground">{subject.code} · {subject.teacherName}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Média</p>
            <p className="font-heading text-3xl font-bold text-foreground">{value || '—'}<span className="text-base text-muted-foreground">/20</span></p>
          </div>
        </div>
      </div>

      <div className="mb-5 grid grid-cols-1 gap-3 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-4">
          <SectionHeader title="Avaliações Recentes" />
          <div className="mt-3 space-y-1.5">
            {subjectGrades.length === 0 && <p className="text-xs text-muted-foreground">Sem notas registadas.</p>}
            {subjectGrades.map(g => (
              <div key={g.id} className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
                <div className="min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">{g.avaliacao}</p>
                  <p className="text-[10px] text-muted-foreground">{g.tipo} · {new Date(g.date).toLocaleDateString('pt-PT')}</p>
                </div>
                <span className="font-heading text-sm font-bold text-foreground">{g.nota}/{g.maxNota}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4">
          <SectionHeader title="Próximas Avaliações" />
          <div className="mt-3 space-y-1.5">
            {upcoming.length === 0 && <p className="text-xs text-muted-foreground">Sem avaliações marcadas.</p>}
            {upcoming.map(a => (
              <button key={a.id} onClick={() => setActive(a)} className="w-full text-left flex items-center gap-2 rounded-lg border border-border px-3 py-2 hover:shadow-sm transition-all active:scale-[0.997]">
                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">{a.title}</p>
                  <p className="text-[10px] text-muted-foreground">{new Date(a.date).toLocaleDateString('pt-PT', { day: 'numeric', month: 'short' })} · {a.time} · {a.room}</p>
                </div>
                <StatusBadge label={a.tipo} variant={a.tipo === 'ACP' ? 'destructive' : 'primary'} />
              </button>
            ))}
          </div>
        </div>
      </div>

      <SectionHeader title="Conteúdos e Materiais" className="mb-3" />
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 mb-5">
        {materials.length === 0 && <p className="text-xs text-muted-foreground">Sem materiais publicados.</p>}
        {materials.map(m => (
          <button key={m.id} onClick={() => navigate(`/app/student/knowledge?subject=${encodeURIComponent(subject.name)}`)} className="text-left rounded-xl border border-border bg-card p-3 hover:shadow-sm transition-all active:scale-[0.997]">
            <p className="text-sm font-medium text-foreground">{m.title}</p>
            <p className="text-xs text-muted-foreground line-clamp-1">{m.description}</p>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <button onClick={() => navigate(`/app/student/knowledge?subject=${encodeURIComponent(subject.name)}`)} className="rounded-xl border border-border bg-card py-3 text-sm font-medium text-foreground hover:bg-muted">Abrir Knowledge Space</button>
        <button onClick={() => navigate('/app/student/assessments-calendar')} className="rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Calendário de Avaliações</button>
      </div>

      <AssessmentDetailModal open={!!active} onOpenChange={(o) => !o && setActive(null)} assessment={active} />
      {past.length > 0 && <p className="mt-5 text-[10px] uppercase tracking-wider text-muted-foreground">{past.length} avaliação(ões) já realizada(s)</p>}
    </PageContainer>
  );
}

/* ─── CALENDÁRIO DE AVALIAÇÕES ─── */
export function StudentAssessmentsCalendar() {
  const [searchParams] = useSearchParams();
  const [subjectFilter, setSubjectFilter] = useState(searchParams.get('subject') ?? 'all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [active, setActive] = useState<AssessmentCalendarItem | null>(null);

  const filtered = useMemo(() => assessmentsCalendar.filter(a =>
    (subjectFilter === 'all' || a.subjectName === subjectFilter) &&
    (typeFilter === 'all' || a.tipo === typeFilter)
  ), [subjectFilter, typeFilter]);

  const grouped = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    const next: AssessmentCalendarItem[] = [];
    const todayList: AssessmentCalendarItem[] = [];
    const done: AssessmentCalendarItem[] = [];
    filtered.forEach(a => {
      if (a.status === 'concluida') done.push(a);
      else if (a.date === today) todayList.push(a);
      else if (a.date >= today) next.push(a);
      else done.push(a);
    });
    return { next: next.sort((a, b) => a.date.localeCompare(b.date)), todayList, done };
  }, [filtered]);

  const subjectOptions = ['all', ...new Set(assessmentsCalendar.map(a => a.subjectName))];

  return (
    <PageContainer>
      <div className="mb-5">
        <h1 className="font-heading text-2xl font-bold text-foreground">Calendário de Avaliações</h1>
        <p className="mt-1 text-sm text-muted-foreground">Próximas avaliações, hoje e histórico.</p>
      </div>

      <div className="mb-4 flex flex-wrap gap-2 max-w-xl">
        <div className="w-44"><Select value={subjectFilter} onValueChange={setSubjectFilter}><SelectTrigger className="rounded-xl h-9 text-xs"><SelectValue /></SelectTrigger><SelectContent>{subjectOptions.map(s => <SelectItem key={s} value={s}>{s === 'all' ? 'Todas as disciplinas' : s}</SelectItem>)}</SelectContent></Select></div>
        <div className="w-36"><Select value={typeFilter} onValueChange={setTypeFilter}><SelectTrigger className="rounded-xl h-9 text-xs"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">Todos os tipos</SelectItem><SelectItem value="ACS1">ACS1</SelectItem><SelectItem value="ACS2">ACS2</SelectItem><SelectItem value="ACP">ACP</SelectItem><SelectItem value="Trabalho">Trabalho</SelectItem><SelectItem value="Exame">Exame</SelectItem></SelectContent></Select></div>
      </div>

      <Section title="Hoje" items={grouped.todayList} onPick={setActive} emptyMessage="Sem avaliações hoje." />
      <Section title="Próximas" items={grouped.next} onPick={setActive} emptyMessage="Sem avaliações futuras." />
      <Section title="Concluídas" items={grouped.done} onPick={setActive} emptyMessage="Sem avaliações concluídas." />

      <AssessmentDetailModal open={!!active} onOpenChange={(o) => !o && setActive(null)} assessment={active} />
    </PageContainer>
  );
}

function Section({ title, items, onPick, emptyMessage }: { title: string; items: AssessmentCalendarItem[]; onPick: (a: AssessmentCalendarItem) => void; emptyMessage: string }) {
  return (
    <div className="mb-5">
      <SectionHeader title={title} className="mb-2" />
      <div className="space-y-1.5">
        {items.length === 0 ? <p className="text-xs text-muted-foreground">{emptyMessage}</p> : items.map(a => (
          <button key={a.id} onClick={() => onPick(a)} className="w-full text-left flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:shadow-sm transition-all active:scale-[0.997]">
            <div className="flex h-10 w-12 shrink-0 flex-col items-center justify-center rounded-lg bg-primary/5 text-primary">
              <span className="text-[9px] uppercase font-semibold">{new Date(a.date).toLocaleDateString('pt-PT', { month: 'short' })}</span>
              <span className="text-sm font-bold leading-none">{new Date(a.date).getDate()}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{a.title}</p>
              <p className="text-[11px] text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />{a.time} · {a.room} · {a.teacher.replace('Prof. ', '').replace('Prof.ª ', '')}</p>
            </div>
            <StatusBadge label={a.tipo} variant={a.tipo === 'ACP' ? 'destructive' : a.tipo === 'ACS2' ? 'info' : 'muted'} />
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        ))}
      </div>
    </div>
  );
}