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
  students, subjects, grades, attendanceRecords, weeklySchedule, payments,
  notifications, feedItems, knowledgeItems,
  getStudentGrades, getStudentPayments, getSubjectAverage, calcMT
} from '@/data/mockData';
import {
  TrendingUp, CheckCircle, BookOpen, Wallet, Calendar, ClipboardList,
  Clock, FileText, MessageCircle, Bell, GraduationCap,
  Video, Link as LinkIcon, HelpCircle, Presentation, Sparkles, Download, Send
} from 'lucide-react';
import { cn } from '@/lib/utils';

const currentStudent = students[0]; // Amélia
const studentGrades = getStudentGrades('ALU-001');
const studentPayments = getStudentPayments('ALU-001');

export { StudentDashboard } from '@/pages/app/RoleDashboards';

/* ─── NOTAS ─── */
export function StudentGrades() {
  const [trimestre, setTrimestre] = useState<'1' | '2' | '3'>('2');
  const [openSubject, setOpenSubject] = useState<string | null>(null);

  const subjectAverages = subjects.map(sub => ({
    ...sub,
    average: getSubjectAverage('ALU-001', sub.id),
    mt: calcMT('ALU-001', sub.id, Number(trimestre)),
    grades: studentGrades.filter(g => g.subjectId === sub.id && g.trimestre === Number(trimestre)),
  })).filter(s => s.grades.length > 0);

  const active = openSubject ? subjectAverages.find(s => s.id === openSubject) : null;

  return (
    <PageContainer>
      <div className="mb-5">
        <h1 className="font-heading text-2xl font-bold text-foreground">As Minhas Notas</h1>
        <p className="mt-1 text-sm text-muted-foreground">Escala 0–20. Aprovação: MA ≥ 10.</p>
      </div>

      <div className="mb-4 flex items-center gap-2 max-w-xs">
        <Select value={trimestre} onValueChange={(v) => setTrimestre(v as '1' | '2' | '3')}>
          <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1º Trimestre</SelectItem>
            <SelectItem value="2">2º Trimestre</SelectItem>
            <SelectItem value="3">3º Trimestre</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatsCard label="Média" value={currentStudent.media.toFixed(1)} icon={TrendingUp} variant="primary" />
        <StatsCard label="Disciplinas" value={subjects.length} icon={BookOpen} />
        <StatsCard label="Avaliações" value={studentGrades.length} icon={ClipboardList} />
        <StatsCard label="Melhor" value="Inglês" icon={GraduationCap} />
      </div>

      <div className="space-y-2.5">
        {subjectAverages.map(sub => (
          <button
            key={sub.id}
            onClick={() => setOpenSubject(sub.id)}
            className="w-full text-left rounded-2xl border border-border bg-card p-4 hover:shadow-sm hover:border-primary/20 transition-all active:scale-[0.997]"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 min-w-0">
                <h3 className="font-heading text-sm font-semibold text-foreground truncate">{sub.name}</h3>
                {sub.tipo === 'extracurricular' && (
                  <span className="flex items-center gap-0.5 rounded-md bg-accent px-1.5 py-0.5 text-[10px] font-medium text-accent-foreground">
                    <Sparkles className="h-2.5 w-2.5" /> Extra
                  </span>
                )}
              </div>
              <div className="text-right shrink-0">
                <span className="font-heading text-xl font-bold text-foreground">{sub.mt ?? sub.average}</span>
                <span className="text-sm text-muted-foreground">/20</span>
              </div>
            </div>
            <div className="h-1.5 w-full rounded-full bg-muted">
              <div
                className={cn('h-1.5 rounded-full', (sub.mt ?? sub.average) >= 14 ? 'bg-success' : (sub.mt ?? sub.average) >= 10 ? 'bg-warning' : 'bg-destructive')}
                style={{ width: `${((sub.mt ?? sub.average) / 20) * 100}%` }}
              />
            </div>
            <p className="mt-2 text-[11px] text-muted-foreground">{sub.teacherName} · {sub.grades.length} avaliação(ões)</p>
          </button>
        ))}
      </div>

      <DetailSheet
        open={!!openSubject}
        onOpenChange={(o) => !o && setOpenSubject(null)}
        title={active?.name ?? ''}
        description={active ? `${active.teacherName} · ${active.code}` : ''}
      >
        {active && (
          <div className="space-y-4">
            <div className="rounded-xl bg-muted/40 p-4 text-center">
              <p className="text-[11px] text-muted-foreground">Média do trimestre</p>
              <p className="font-heading text-3xl font-bold text-foreground">{active.mt ?? active.average}<span className="text-base text-muted-foreground">/20</span></p>
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Avaliações</p>
              <div className="space-y-1.5">
                {active.grades.map(g => (
                  <div key={g.id} className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <StatusBadge label={g.tipo} variant={g.tipo === 'ACP' ? 'primary' : g.tipo === 'ACS2' ? 'info' : 'muted'} />
                      <span className="text-sm text-foreground truncate">{g.avaliacao}</span>
                    </div>
                    <span className="font-heading text-sm font-bold text-foreground">{g.nota}/{g.maxNota}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </DetailSheet>
    </PageContainer>
  );
}

/* ─── ASSIDUIDADE ─── */
export function StudentAttendance() {
  const records = attendanceRecords.filter(a => a.studentId === 'ALU-001');
  const presentCount = records.filter(r => r.status === 'presente').length;
  const absentCount = records.filter(r => r.status === 'falta').length;
  const lateCount = records.filter(r => r.status === 'atraso').length;
  const justifiedCount = records.filter(r => r.status === 'justificada').length;

  const statusVariant = (s: string) => s === 'presente' ? 'success' as const : s === 'falta' ? 'destructive' as const : s === 'atraso' ? 'warning' as const : 'info' as const;
  const statusLabel = (s: string) => s === 'presente' ? 'Presente' : s === 'falta' ? 'Falta' : s === 'atraso' ? 'Atraso' : 'Justificada';

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Assiduidade</h1>
        <p className="mt-1 text-sm text-muted-foreground">Registo de presenças por disciplina. Limiar crítico: 25% de faltas.</p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatsCard label="Taxa" value={`${currentStudent.taxaAssiduidade}%`} icon={CheckCircle} variant="primary" />
        <StatsCard label="Presenças" value={presentCount} icon={CheckCircle} />
        <StatsCard label="Faltas" value={absentCount} icon={Clock} />
        <StatsCard label="Atrasos" value={lateCount} icon={Clock} />
      </div>

      {absentCount > 0 && (
        <AlertCard title={`${absentCount} falta(s) registada(s)`} description="Contacte o director de turma se alguma falta necessitar de justificação." variant="warning" className="mb-4" />
      )}

      <SectionHeader title="Registos Recentes" className="mb-3" />
      <div className="space-y-1.5">
        {records.map(r => (
          <div key={r.id} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
            <div className="w-20 shrink-0">
              <p className="text-xs font-medium text-foreground">{new Date(r.date).toLocaleDateString('pt-PT', { month: 'short', day: 'numeric' })}</p>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground truncate">{r.disciplina}</p>
              {r.nota && <p className="text-xs text-muted-foreground">{r.nota}</p>}
            </div>
            <StatusBadge label={statusLabel(r.status)} variant={statusVariant(r.status)} dot />
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

/* ─── HORÁRIO ─── */
export function StudentSchedule() {
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Horário</h1>
        <p className="mt-1 text-sm text-muted-foreground">Horário semanal — 07:30 às 12:30.</p>
      </div>
      <ScheduleView schedule={weeklySchedule} showTeacher />
    </PageContainer>
  );
}

/* ─── AGENDA ─── */
export function StudentAgenda() {
  const upcoming = [
    { title: 'ACP — Matemática', date: 'Ter, 22 Abr', type: 'ACP' },
    { title: 'ACS2 — Química', date: 'Sex, 25 Abr', type: 'ACS2' },
    { title: 'ACS2 — Português', date: 'Ter, 15 Abr', type: 'ACS2' },
    { title: 'Visita de Estudo — Biologia', date: 'Sex, 18 Abr', type: 'evento' },
    { title: 'Pagamento de Propina', date: '30 Abr', type: 'pagamento' },
  ];

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Agenda</h1>
        <p className="mt-1 text-sm text-muted-foreground">Agenda pessoal e lembretes.</p>
      </div>

      <SectionHeader title="Próximos" className="mb-3" />
      <div className="space-y-1.5">
        {upcoming.map((item, i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:shadow-sm transition-all">
            <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.date}</p>
            </div>
            <StatusBadge label={item.type} variant={item.type === 'ACP' ? 'destructive' : item.type === 'pagamento' ? 'warning' : 'muted'} />
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

/* ─── CONTEÚDOS ─── */
export function StudentKnowledge() {
  const [filter, setFilter] = useState<string>('all');
  const [active, setActive] = useState<typeof knowledgeItems[number] | null>(null);
  const disciplinaNames = [...new Set(knowledgeItems.map(k => k.disciplina))];
  const filtered = filter === 'all' ? knowledgeItems : knowledgeItems.filter(k => k.disciplina === filter);

  const typeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'questionario': return <HelpCircle className="h-4 w-4" />;
      case 'apresentacao': return <Presentation className="h-4 w-4" />;
      case 'link': return <LinkIcon className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const handleAction = (item: typeof knowledgeItems[number]) => {
    if (item.type === 'video') toast.success('A abrir vídeo…');
    else if (item.type === 'link') toast.success('A abrir ligação externa…');
    else if (item.type === 'questionario') toast.success('A iniciar questionário…');
    else toast.success('A descarregar documento…');
  };

  return (
    <PageContainer>
      <div className="mb-5">
        <h1 className="font-heading text-2xl font-bold text-foreground">Conteúdos</h1>
        <p className="mt-1 text-sm text-muted-foreground">Materiais de aprendizagem e recursos.</p>
      </div>

      <div className="mb-4 max-w-xs">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="rounded-xl"><SelectValue placeholder="Filtrar disciplina" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as disciplinas</SelectItem>
            {disciplinaNames.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {filtered.map(item => (
          <button
            key={item.id}
            onClick={() => setActive(item)}
            className="text-left rounded-2xl border border-border bg-card p-4 hover:shadow-sm hover:border-primary/10 transition-all active:scale-[0.99]"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                {typeIcon(item.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                <div className="mt-2 flex items-center gap-2">
                  <StatusBadge label={item.disciplina} variant="primary" />
                  <span className="text-[10px] text-muted-foreground">{item.author}</span>
                  {item.size && <span className="text-[10px] text-muted-foreground">· {item.size}</span>}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <DetailSheet
        open={!!active}
        onOpenChange={(o) => !o && setActive(null)}
        title={active?.title ?? ''}
        description={active ? `${active.disciplina} · ${active.author}` : ''}
        footer={active && (
          <button onClick={() => { handleAction(active); setActive(null); }} className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
            {active.type === 'video' ? <><Video className="h-4 w-4" /> Reproduzir</> : active.type === 'link' ? <><LinkIcon className="h-4 w-4" /> Abrir ligação</> : active.type === 'questionario' ? <><HelpCircle className="h-4 w-4" /> Iniciar</> : <><Download className="h-4 w-4" /> Descarregar</>}
          </button>
        )}
      >
        {active && (
          <div className="space-y-3">
            <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground">
              {typeIcon(active.type)}
              <span className="ml-2 text-xs">{active.type === 'video' ? 'Pré-visualização do vídeo' : 'Pré-visualização'}</span>
            </div>
            <p className="text-sm text-foreground">{active.description}</p>
            {active.size && <p className="text-xs text-muted-foreground">Tamanho: {active.size}</p>}
          </div>
        )}
      </DetailSheet>
    </PageContainer>
  );
}

/* ─── ACTUALIZAÇÕES (FEED) ─── */
function FeedItemView({ item, onOpen }: { item: typeof feedItems[number]; onOpen: () => void }) {
  return (
    <button onClick={onOpen} className={cn('w-full text-left rounded-2xl border bg-card p-5 transition-all hover:shadow-sm', item.pinned ? 'border-primary/20 bg-primary/[0.02]' : 'border-border')}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-bold text-foreground">{item.author[0]}</div>
          <div>
            <p className="text-sm font-medium text-foreground">{item.author}</p>
            <p className="text-[10px] text-muted-foreground">{item.authorRole} · {new Date(item.timestamp).toLocaleDateString('pt-PT', { month: 'short', day: 'numeric' })}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          {item.pinned && <StatusBadge label="Fixo" variant="primary" />}
          <StatusBadge label={item.category === 'aviso' ? 'Aviso' : item.category === 'evento' ? 'Evento' : item.category === 'academico' ? 'Académico' : 'Geral'} variant={item.category === 'aviso' ? 'info' : item.category === 'evento' ? 'warning' : 'muted'} />
        </div>
      </div>
      <h3 className="font-heading text-sm font-semibold text-foreground mb-1">{item.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{item.content}</p>
    </button>
  );
}

/* ─── ACTUALIZAÇÕES ─── */
export function StudentFeed() {
  const [active, setActive] = useState<typeof feedItems[number] | null>(null);
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  return (
    <PageContainer>
      <div className="mb-5">
        <h1 className="font-heading text-2xl font-bold text-foreground">Actualizações</h1>
        <p className="mt-1 text-sm text-muted-foreground">Últimas novidades da escola.</p>
      </div>
      <div className="space-y-3">
        {feedItems.map(item => (
          <FeedItemView key={item.id} item={item} onOpen={() => setActive(item)} />
        ))}
      </div>
      <DetailSheet
        open={!!active}
        onOpenChange={(o) => !o && setActive(null)}
        title={active?.title ?? ''}
        description={active ? `${active.author} · ${active.authorRole}` : ''}
      >
        {active && (
          <div className="space-y-4">
            <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">{active.content}</p>
            <div className="flex items-center gap-2">
              <button onClick={() => { setLiked(p => ({ ...p, [active.id]: !p[active.id] })); toast.success(liked[active.id] ? 'Reacção removida' : 'Reagiu 👍'); }} className={cn('rounded-full border px-3 py-1.5 text-xs font-medium transition-colors', liked[active.id] ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-foreground hover:bg-muted')}>
                👍 Gosto
              </button>
              <button onClick={() => toast.success('Comentário enviado.')} className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted">💬 Comentar</button>
            </div>
            <div className="rounded-xl border border-border bg-muted/30 p-3 space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Comentários</p>
              <div className="text-xs text-foreground"><span className="font-medium">Joana M.</span> · Excelente notícia!</div>
              <div className="text-xs text-foreground"><span className="font-medium">Carlos S.</span> · A confirmar presença.</div>
            </div>
          </div>
        )}
      </DetailSheet>
    </PageContainer>
  );
}

/* ─── CHAT ─── */
export function StudentChat() {
  const conversations = [
    { id: 'c1', name: 'Prof. António Magaia', lastMessage: 'Excelente desempenho na ACS1!', time: '2h atrás', unread: 1 },
    { id: 'c2', name: 'Prof.ª Graça Machel', lastMessage: 'Não se esqueça do relatório #5', time: '1d atrás', unread: 0 },
    { id: 'c3', name: 'Prof. Ernesto Vilankulo', lastMessage: 'Detalhes da visita de estudo', time: '2d atrás', unread: 0 },
    { id: 'c4', name: 'Turma 11ª A', lastMessage: 'Alguém tem apontamentos de Quarta?', time: '3h atrás', unread: 3 },
  ];
  const [open, setOpen] = useState<typeof conversations[number] | null>(null);
  const [draft, setDraft] = useState('');
  const [thread, setThread] = useState<{ from: 'me' | 'them'; text: string }[]>([
    { from: 'them', text: 'Olá! Como posso ajudar?' },
  ]);
  const send = () => {
    if (!draft.trim()) return;
    setThread(t => [...t, { from: 'me', text: draft }]);
    setDraft('');
    toast.success('Mensagem enviada.');
  };

  return (
    <PageContainer>
      <div className="mb-5">
        <h1 className="font-heading text-2xl font-bold text-foreground">Chat</h1>
        <p className="mt-1 text-sm text-muted-foreground">Mensagens com professores e colegas.</p>
      </div>
      <div className="space-y-1.5">
        {conversations.map(c => (
          <button key={c.id} onClick={() => { setOpen(c); setThread([{ from: 'them', text: c.lastMessage }]); }} className="w-full flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:shadow-sm hover:border-primary/10 transition-all active:scale-[0.995]">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-heading text-sm font-bold text-primary">{c.name[0]}</div>
            <div className="flex-1 min-w-0 text-left">
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
      <DetailSheet
        open={!!open}
        onOpenChange={(o) => !o && setOpen(null)}
        title={open?.name ?? ''}
        description="Conversa"
        footer={
          <div className="flex items-center gap-2">
            <input value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Escrever mensagem…" className="flex-1 rounded-xl border border-input bg-background px-3 py-2 text-sm" />
            <button onClick={send} className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"><Send className="h-4 w-4" /></button>
          </div>
        }
      >
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
export function StudentNotifications() {
  const navigate = useNavigate();
  const [items, setItems] = useState(notifications);

  const typeIcon = (type: string) => {
    switch (type) {
      case 'nota': return <GraduationCap className="h-4 w-4 text-primary" />;
      case 'assiduidade': return <CheckCircle className="h-4 w-4 text-warning" />;
      case 'pagamento': return <Wallet className="h-4 w-4 text-destructive" />;
      case 'alerta': return <Clock className="h-4 w-4 text-warning" />;
      case 'mensagem': return <MessageCircle className="h-4 w-4 text-info" />;
      default: return <Bell className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const handleClick = (n: typeof notifications[number]) => {
    setItems(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x));
    if (n.type === 'nota') navigate('/app/student/grades');
    else if (n.type === 'assiduidade') navigate('/app/student/attendance');
    else if (n.type === 'pagamento') navigate('/app/student/finance');
    else if (n.type === 'mensagem') navigate('/app/student/chat');
  };

  return (
    <PageContainer>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Notificações</h1>
          <p className="mt-1 text-sm text-muted-foreground">Alertas e avisos.</p>
        </div>
        <button onClick={() => { setItems(prev => prev.map(x => ({ ...x, read: true }))); toast.success('Tudo marcado como lido.'); }} className="text-xs font-medium text-primary hover:underline">Marcar tudo como lido</button>
      </div>
      <div className="space-y-1.5">
        {items.map(n => (
          <button key={n.id} onClick={() => handleClick(n)} className={cn('w-full text-left flex items-start gap-3 rounded-xl border px-4 py-3 transition-all hover:shadow-sm', n.read ? 'border-border bg-card' : 'border-primary/20 bg-primary/[0.02]')}>
            <div className="mt-0.5 shrink-0">{typeIcon(n.type)}</div>
            <div className="flex-1 min-w-0">
              <p className={cn('text-sm', n.read ? 'text-foreground' : 'font-medium text-foreground')}>{n.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{n.message}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{new Date(n.timestamp).toLocaleDateString('pt-PT', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
            </div>
            {!n.read && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />}
          </button>
        ))}
      </div>
    </PageContainer>
  );
}

/* ─── FINANÇAS ─── */
export function StudentFinance() {
  const [payList, setPayList] = useState(studentPayments);
  const [active, setActive] = useState<typeof studentPayments[number] | null>(null);
  const pending = payList.filter(p => ['pendente', 'atrasado', 'parcial'].includes(p.status));
  const history = payList.filter(p => ['pago', 'validado', 'em_revisao'].includes(p.status));
  const totalDue = pending.reduce((s, p) => s + (p.amount - p.paidAmount), 0);
  const hasDebt = pending.some(p => p.status === 'atrasado');

  const statusVariant = (s: string) => s === 'pago' || s === 'validado' ? 'success' as const : s === 'atrasado' ? 'destructive' as const : s === 'parcial' ? 'warning' as const : s === 'em_revisao' ? 'info' as const : 'muted' as const;
  const statusLabel = (s: string) => s === 'pago' ? 'Pago' : s === 'validado' ? 'Validado' : s === 'atrasado' ? 'Atrasado' : s === 'parcial' ? 'Parcial' : s === 'em_revisao' ? 'Em revisão' : 'Pendente';

  const submitPayment = () => {
    if (!active) return;
    setPayList(prev => prev.map(p => p.id === active.id ? { ...p, status: 'em_revisao', paidAmount: p.amount, paidDate: new Date().toISOString().slice(0, 10), metodo: 'M-Pesa', referencia: 'REF-' + Math.random().toString(36).slice(2, 7).toUpperCase() } : p));
    toast.success('Pagamento submetido. A aguardar validação.');
    setActive(null);
  };

  return (
    <PageContainer>
      <div className="mb-5">
        <h1 className="font-heading text-2xl font-bold text-foreground">As Minhas Finanças</h1>
        <p className="mt-1 text-sm text-muted-foreground">Propinas, pagamentos e recibos.</p>
      </div>

      {hasDebt && (
        <AlertCard title="Pagamentos em atraso" description="Regularize a situação para evitar penalizações." variant="destructive" className="mb-4" />
      )}

      <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatsCard label="Total em Dívida" value={`${totalDue.toLocaleString('pt-PT')} MT`} icon={Wallet} variant="primary" />
        <StatsCard label="Em Atraso" value={`${pending.filter(p => p.status === 'atrasado').reduce((s, p) => s + p.amount, 0).toLocaleString('pt-PT')} MT`} icon={Clock} />
        <StatsCard label="Pago Este Ano" value={`${history.reduce((s, p) => s + p.paidAmount, 0).toLocaleString('pt-PT')} MT`} icon={CheckCircle} />
      </div>

      <SectionHeader title="Pendentes" className="mb-3" />
      <div className="space-y-1.5 mb-6">
        {pending.map(p => (
          <div key={p.id} className={cn('flex items-center gap-3 rounded-xl border bg-card px-4 py-3', p.status === 'atrasado' ? 'border-destructive/20' : 'border-border')}>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{p.conceito}</p>
              <p className="text-xs text-muted-foreground">Venc. {new Date(p.dueDate).toLocaleDateString('pt-PT', { month: 'short', day: 'numeric' })}</p>
            </div>
            <span className={cn('font-heading text-sm font-bold', p.status === 'atrasado' ? 'text-destructive' : 'text-foreground')}>{p.amount.toLocaleString('pt-PT')} MT</span>
            <button onClick={() => setActive(p)} className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors active:scale-95">
              Pagar
            </button>
          </div>
        ))}
        {pending.length === 0 && <p className="text-center text-sm text-muted-foreground py-6">Sem obrigações pendentes 🎉</p>}
      </div>

      <SectionHeader title="Histórico" className="mb-3" />
      <div className="space-y-1.5">
        {history.map(p => (
          <div key={p.id} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{p.conceito}</p>
              <p className="text-xs text-muted-foreground">{p.paidDate && new Date(p.paidDate).toLocaleDateString('pt-PT', { month: 'short', day: 'numeric' })} · {p.metodo}</p>
            </div>
            <span className="font-heading text-sm font-bold text-foreground">{p.paidAmount.toLocaleString('pt-PT')} MT</span>
            <StatusBadge label={statusLabel(p.status)} variant={statusVariant(p.status)} />
            {(p.status === 'pago' || p.status === 'validado') && (
              <button onClick={() => toast.success('A descarregar recibo PDF…')} className="rounded-lg bg-muted px-2 py-1 text-xs font-medium text-foreground hover:bg-muted/80"><Download className="h-3 w-3" /></button>
            )}
          </div>
        ))}
      </div>

      <DetailSheet
        open={!!active}
        onOpenChange={(o) => !o && setActive(null)}
        title="Efectuar pagamento"
        description={active?.conceito}
        footer={
          <button onClick={submitPayment} className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
            Confirmar pagamento de {active?.amount.toLocaleString('pt-PT')} MT
          </button>
        }
      >
        {active && (
          <div className="space-y-4">
            <div className="rounded-xl bg-muted/40 p-4">
              <div className="flex items-center justify-between text-sm"><span className="text-muted-foreground">Valor</span><span className="font-heading text-lg font-bold text-foreground">{active.amount.toLocaleString('pt-PT')} MT</span></div>
              <div className="flex items-center justify-between text-xs mt-1"><span className="text-muted-foreground">Vencimento</span><span className="text-foreground">{new Date(active.dueDate).toLocaleDateString('pt-PT')}</span></div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-foreground">Método de pagamento</label>
              <Select defaultValue="mpesa">
                <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="mpesa">M-Pesa</SelectItem>
                  <SelectItem value="emola">e-Mola</SelectItem>
                  <SelectItem value="transfer">Transferência bancária</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <input placeholder="Número de telefone" className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm" />
            <p className="text-[11px] text-muted-foreground">Receberá uma confirmação após validação pelo departamento financeiro.</p>
          </div>
        )}
      </DetailSheet>
    </PageContainer>
  );
}
