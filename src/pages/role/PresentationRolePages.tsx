import { useMemo, useState, type ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  BarChart3,
  Bell,
  BookOpen,
  Calendar,
  CheckCircle,
  ChevronRight,
  ClipboardCheck,
  ClipboardList,
  Clock,
  Download,
  FileText,
  FolderOpen,
  GraduationCap,
  Landmark,
  MessageCircle,
  Plus,
  Receipt,
  Search,
  Send,
  Shield,
  TrendingUp,
  UserCheck,
  Users,
  Wallet,
  type LucideIcon,
} from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { cn } from '@/lib/utils';

type Tone = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'primary';

const toneClasses: Record<Tone, string> = {
  default: 'bg-muted text-muted-foreground',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  danger: 'bg-destructive/10 text-destructive',
  info: 'bg-info/10 text-info',
  primary: 'bg-primary/10 text-primary',
};

function PageTitle({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

function DemoBanner() {
  return (
    <div className="mb-5 rounded-xl border border-info/20 bg-info/5 px-4 py-2.5 text-xs text-muted-foreground">
      Dados simulados para apresentação. As acções desta versão actualizam apenas o estado local da demonstração.
    </div>
  );
}

function MetricCard({ label, value, icon: Icon, tone = 'default' }: { label: string; value: string | number; icon: LucideIcon; tone?: Tone }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-center justify-between gap-3">
        <div className={cn('flex h-9 w-9 items-center justify-center rounded-xl', toneClasses[tone])}>
          <Icon className="h-4 w-4" />
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{label}</span>
      </div>
      <p className="mt-3 font-heading text-2xl font-bold text-foreground">{value}</p>
    </div>
  );
}

function StatusPill({ label, tone = 'default' }: { label: string; tone?: Tone }) {
  return <span className={cn('inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold', toneClasses[tone])}>{label}</span>;
}

function Section({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="font-heading text-sm font-semibold text-foreground">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function ActionLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
      {children}<ChevronRight className="h-3.5 w-3.5" />
    </Link>
  );
}

const students = [
  { id: 'ALU-001', name: 'Amélia Mondlane', className: '11ª A', average: 14.8, attendance: 92, status: 'Excelente' },
  { id: 'ALU-002', name: 'João Mucavele', className: '11ª A', average: 12.6, attendance: 89, status: 'Activo' },
  { id: 'ALU-003', name: 'Célia Tembe', className: '10ª B', average: 9.7, attendance: 81, status: 'Atenção' },
  { id: 'ALU-004', name: 'Marta Nhantumbo', className: '12ª A', average: 15.4, attendance: 96, status: 'Excelente' },
  { id: 'ALU-005', name: 'Bruno Mabote', className: '10ª A', average: 11.9, attendance: 87, status: 'Activo' },
  { id: 'ALU-006', name: 'Lídia Cossa', className: '12ª B', average: 8.9, attendance: 76, status: 'Em risco' },
];

const subjects = [
  { name: 'Português', teacher: 'Prof.ª Graça Machel', grade: 16, next: 'ACP · 18 Set' },
  { name: 'Matemática', teacher: 'Prof. António Magaia', grade: 15, next: 'ACS · 21 Set' },
  { name: 'Inglês', teacher: 'Prof. Ernesto Vilankulo', grade: 17, next: 'Oral · 23 Set' },
  { name: 'Biologia', teacher: 'Prof.ª Lina Matola', grade: 11, next: 'Relatório · 25 Set' },
  { name: 'Física', teacher: 'Prof. Paulo Macuácua', grade: 14, next: 'Teste · 27 Set' },
  { name: 'Química', teacher: 'Prof.ª Rosa Sitoe', grade: 13, next: 'Prática · 30 Set' },
];

const schedule = [
  { time: '07:30', subject: 'Português', room: 'Sala 11A' },
  { time: '08:20', subject: 'Matemática', room: 'Sala 11A' },
  { time: '09:20', subject: 'Física', room: 'Lab. 1' },
  { time: '10:10', subject: 'Intervalo', room: 'Pátio' },
  { time: '10:30', subject: 'Biologia', room: 'Lab. 2' },
  { time: '11:20', subject: 'Inglês', room: 'Sala 11A' },
];

const initialStudentPayments = [
  { id: 'PAY-001', label: 'Propina · Setembro', amount: 6500, due: '20 Set', status: 'Pendente' },
  { id: 'PAY-002', label: 'Material escolar', amount: 1800, due: '10 Set', status: 'Pago' },
  { id: 'PAY-003', label: 'Actividade extracurricular', amount: 2500, due: '30 Set', status: 'Pendente' },
];

const teacherClasses = [
  { name: '11ª A', students: 31, average: 13.8, attendance: 91 },
  { name: '11ª B', students: 29, average: 12.9, attendance: 88 },
  { name: '10ª A', students: 30, average: 12.4, attendance: 90 },
  { name: '12ª A', students: 28, average: 14.1, attendance: 93 },
];

const approvalsSeed = [
  { id: 'APR-001', type: 'Pauta de notas', owner: '11ª A · Matemática', requestedBy: 'Prof. António Magaia', status: 'Pendente' },
  { id: 'APR-002', type: 'Avaliação', owner: '10ª B · Física', requestedBy: 'Prof. Paulo Macuácua', status: 'Pendente' },
  { id: 'APR-003', type: 'Conteúdo', owner: '12ª A · Biologia', requestedBy: 'Prof.ª Lina Matola', status: 'Pendente' },
];

const financePaymentsSeed = [
  { id: 'FIN-101', student: 'Amélia Mondlane', concept: 'Propina · Setembro', amount: 6500, method: 'M-Pesa', status: 'Em revisão' },
  { id: 'FIN-102', student: 'João Mucavele', concept: 'Propina · Setembro', amount: 6500, method: 'Transferência', status: 'Validado' },
  { id: 'FIN-103', student: 'Célia Tembe', concept: 'Propina · Agosto', amount: 6500, method: 'Numerário', status: 'Atrasado' },
  { id: 'FIN-104', student: 'Marta Nhantumbo', concept: 'Material escolar', amount: 1800, method: 'M-Pesa', status: 'Em revisão' },
  { id: 'FIN-105', student: 'Bruno Mabote', concept: 'Propina · Setembro', amount: 6500, method: 'M-Pesa', status: 'Pendente' },
];

function NotificationsDemo({ title = 'Notificações' }: { title?: string }) {
  const [items, setItems] = useState([
    { id: 1, title: 'Novo aviso institucional', detail: 'Consulte a actualização publicada hoje.', read: false },
    { id: 2, title: 'Calendário actualizado', detail: 'Foi actualizada uma actividade no calendário.', read: false },
    { id: 3, title: 'Documento disponível', detail: 'Existe um novo documento para consulta.', read: true },
  ]);

  return (
    <PageContainer>
      <PageTitle
        title={title}
        subtitle="Centro de alertas do perfil actual."
        action={<button onClick={() => setItems((prev) => prev.map((item) => ({ ...item, read: true })))} className="text-xs font-semibold text-primary hover:underline">Marcar tudo como lido</button>}
      />
      <DemoBanner />
      <div className="space-y-2">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setItems((prev) => prev.map((entry) => entry.id === item.id ? { ...entry, read: true } : entry))}
            className={cn('w-full rounded-xl border p-4 text-left transition-colors', item.read ? 'border-border bg-card' : 'border-primary/25 bg-primary/[0.03]')}
          >
            <div className="flex items-start gap-3">
              <Bell className={cn('mt-0.5 h-4 w-4 shrink-0', item.read ? 'text-muted-foreground' : 'text-primary')} />
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{item.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{item.detail}</p>
              </div>
              {!item.read && <span className="mt-1 h-2 w-2 rounded-full bg-primary" />}
            </div>
          </button>
        ))}
      </div>
    </PageContainer>
  );
}

function ChatDemo({ title = 'Chat institucional' }: { title?: string }) {
  const [messages, setMessages] = useState([
    { id: 1, mine: false, text: 'Bom dia. A informação da próxima avaliação já está disponível.' },
    { id: 2, mine: true, text: 'Obrigado. Já consultei o calendário.' },
  ]);
  const [draft, setDraft] = useState('');

  const send = () => {
    if (!draft.trim()) return;
    setMessages((prev) => [...prev, { id: Date.now(), mine: true, text: draft.trim() }]);
    setDraft('');
  };

  return (
    <PageContainer>
      <PageTitle title={title} subtitle="Mensagens simuladas para demonstrar o fluxo de comunicação." />
      <DemoBanner />
      <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-border bg-card">
        <div className="border-b border-border px-5 py-4">
          <p className="text-sm font-semibold text-foreground">Canal de demonstração</p>
          <p className="text-xs text-muted-foreground">Comunicação institucional</p>
        </div>
        <div className="min-h-72 space-y-3 p-5">
          {messages.map((message) => (
            <div key={message.id} className={cn('flex', message.mine ? 'justify-end' : 'justify-start')}>
              <div className={cn('max-w-[80%] rounded-2xl px-4 py-2.5 text-sm', message.mine ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground')}>
                {message.text}
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 border-t border-border p-4">
          <input value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && send()} placeholder="Escrever mensagem…" className="min-w-0 flex-1 rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-ring/20" />
          <button type="button" onClick={send} className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground hover:bg-primary/90" aria-label="Enviar mensagem"><Send className="h-4 w-4" /></button>
        </div>
      </div>
    </PageContainer>
  );
}

function SimpleDirectory({ title, subtitle, rows }: { title: string; subtitle: string; rows: Array<{ title: string; meta: string; status?: string; tone?: Tone }> }) {
  const [search, setSearch] = useState('');
  const filtered = rows.filter((row) => `${row.title} ${row.meta}`.toLowerCase().includes(search.toLowerCase()));
  return (
    <PageContainer>
      <PageTitle title={title} subtitle={subtitle} />
      <div className="mb-4 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Pesquisar…" className="w-full rounded-xl border border-input bg-background py-2.5 pl-9 pr-3 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-ring/20" />
        </div>
      </div>
      <div className="space-y-2">
        {filtered.map((row) => (
          <div key={`${row.title}-${row.meta}`} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{row.title.slice(0, 2).toUpperCase()}</div>
            <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-foreground">{row.title}</p><p className="truncate text-xs text-muted-foreground">{row.meta}</p></div>
            {row.status && <StatusPill label={row.status} tone={row.tone} />}
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

function GenericReportPage({ title, subtitle }: { title: string; subtitle: string }) {
  const [generated, setGenerated] = useState(false);
  return (
    <PageContainer>
      <PageTitle title={title} subtitle={subtitle} action={<button onClick={() => setGenerated(true)} className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90">Gerar relatório</button>} />
      <DemoBanner />
      <div className="grid gap-4 lg:grid-cols-3">
        {[
          { label: 'Académico', date: 'Setembro 2026', icon: GraduationCap },
          { label: 'Assiduidade', date: 'Setembro 2026', icon: CheckCircle },
          { label: 'Financeiro', date: 'Setembro 2026', icon: Wallet },
        ].map((report) => (
          <div key={report.label} className="rounded-2xl border border-border bg-card p-5">
            <report.icon className="h-5 w-5 text-primary" />
            <p className="mt-4 text-sm font-semibold text-foreground">Relatório {report.label}</p>
            <p className="mt-1 text-xs text-muted-foreground">{report.date}</p>
            <button onClick={() => setGenerated(true)} className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"><Download className="h-3.5 w-3.5" />Pré-visualizar</button>
          </div>
        ))}
      </div>
      {generated && (
        <div className="mt-5 rounded-2xl border border-success/25 bg-success/5 p-5">
          <div className="flex items-start gap-3"><CheckCircle className="mt-0.5 h-5 w-5 text-success" /><div><p className="text-sm font-semibold text-foreground">Pré-visualização preparada</p><p className="mt-1 text-xs text-muted-foreground">Na versão de produção, este fluxo poderá exportar PDF/Excel e manter histórico de relatórios.</p></div></div>
        </div>
      )}
    </PageContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ALUNO
// ─────────────────────────────────────────────────────────────────────────────

export function StudentDashboard() {
  return (
    <PageContainer>
      <PageTitle title="O Meu Painel" subtitle="Bem-vinda, Amélia. Resumo académico e financeiro." />
      <DemoBanner />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard label="Média" value="14.8/20" icon={TrendingUp} tone="primary" />
        <MetricCard label="Assiduidade" value="92%" icon={CheckCircle} tone="success" />
        <MetricCard label="Disciplinas" value="6" icon={BookOpen} />
        <MetricCard label="A pagar" value="9.000 MT" icon={Wallet} tone="warning" />
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <Section title="Próximas avaliações" action={<ActionLink to="/app/student/grades">Ver notas</ActionLink>}>
          <div className="space-y-2">{subjects.slice(0, 3).map((subject) => <div key={subject.name} className="flex items-center justify-between rounded-xl border border-border px-3 py-3"><div><p className="text-sm font-medium text-foreground">{subject.name}</p><p className="text-xs text-muted-foreground">{subject.next}</p></div><StatusPill label={`${subject.grade}/20`} tone={subject.grade >= 14 ? 'success' : 'warning'} /></div>)}</div>
        </Section>
        <Section title="Acções rápidas">
          <div className="grid grid-cols-2 gap-2">
            <ActionLink to="/app/student/subjects">Disciplinas</ActionLink>
            <ActionLink to="/app/student/schedule">Horário</ActionLink>
            <ActionLink to="/app/student/finance">Finanças</ActionLink>
            <ActionLink to="/app/student/chat">Chat</ActionLink>
          </div>
        </Section>
      </div>
    </PageContainer>
  );
}

export function StudentSubjects() {
  return (
    <PageContainer>
      <PageTitle title="As Minhas Disciplinas" subtitle="Plano curricular e progresso por disciplina." />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject) => (
          <div key={subject.name} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-start justify-between gap-3"><BookOpen className="h-5 w-5 text-primary" /><StatusPill label={`${subject.grade}/20`} tone={subject.grade >= 14 ? 'success' : subject.grade >= 10 ? 'warning' : 'danger'} /></div>
            <p className="mt-4 font-heading text-base font-semibold text-foreground">{subject.name}</p>
            <p className="mt-1 text-xs text-muted-foreground">{subject.teacher}</p>
            <p className="mt-4 text-xs font-medium text-foreground">Próxima: {subject.next}</p>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

export function StudentGrades() {
  const [term, setTerm] = useState('2º Trimestre');
  return (
    <PageContainer>
      <PageTitle title="As Minhas Notas" subtitle="Avaliação em escala 0–20." action={<select value={term} onChange={(event) => setTerm(event.target.value)} className="rounded-xl border border-input bg-background px-3 py-2 text-xs text-foreground"><option>1º Trimestre</option><option>2º Trimestre</option><option>3º Trimestre</option></select>} />
      <DemoBanner />
      <div className="space-y-2">
        {subjects.map((subject) => (
          <div key={subject.name} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 font-heading text-base font-bold text-primary">{subject.grade}</div>
              <div className="min-w-0 flex-1"><p className="text-sm font-semibold text-foreground">{subject.name}</p><p className="text-xs text-muted-foreground">{subject.teacher} · {term}</p></div>
              <StatusPill label={subject.grade >= 14 ? 'Muito bom' : subject.grade >= 10 ? 'Aprovado' : 'Atenção'} tone={subject.grade >= 14 ? 'success' : subject.grade >= 10 ? 'info' : 'warning'} />
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

export function StudentAttendance() {
  const rows = [
    ['12 Set', 'Matemática', 'Presente'], ['12 Set', 'Português', 'Presente'], ['11 Set', 'Biologia', 'Atraso'], ['10 Set', 'Física', 'Presente'], ['09 Set', 'Inglês', 'Falta justificada'],
  ];
  return (
    <PageContainer>
      <PageTitle title="Assiduidade" subtitle="Registos recentes de presenças e faltas." />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4"><MetricCard label="Taxa" value="92%" icon={CheckCircle} tone="success" /><MetricCard label="Presenças" value="84" icon={UserCheck} /><MetricCard label="Faltas" value="5" icon={AlertTriangle} tone="warning" /><MetricCard label="Atrasos" value="2" icon={Clock} /></div>
      <div className="mt-5 space-y-2">{rows.map(([date, subject, status]) => <div key={`${date}-${subject}`} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3"><span className="w-16 text-xs text-muted-foreground">{date}</span><span className="flex-1 text-sm font-medium text-foreground">{subject}</span><StatusPill label={status} tone={status === 'Presente' ? 'success' : 'warning'} /></div>)}</div>
    </PageContainer>
  );
}

export function StudentSchedule() {
  return (
    <PageContainer>
      <PageTitle title="Horário" subtitle="Exemplo do horário lectivo diário." />
      <div className="space-y-2">{schedule.map((entry) => <div key={`${entry.time}-${entry.subject}`} className="flex items-center gap-4 rounded-xl border border-border bg-card px-4 py-3"><span className="w-14 font-heading text-xs font-bold text-primary">{entry.time}</span><div className="flex-1"><p className="text-sm font-semibold text-foreground">{entry.subject}</p><p className="text-xs text-muted-foreground">{entry.room}</p></div><Calendar className="h-4 w-4 text-muted-foreground" /></div>)}</div>
    </PageContainer>
  );
}

export function StudentFinance() {
  const [payments, setPayments] = useState(initialStudentPayments);
  const submit = (id: string) => setPayments((prev) => prev.map((item) => item.id === id ? { ...item, status: 'Em revisão' } : item));
  return (
    <PageContainer>
      <PageTitle title="Finanças" subtitle="Propinas e outras obrigações associadas ao aluno." />
      <DemoBanner />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3"><MetricCard label="Pendente" value="9.000 MT" icon={Wallet} tone="warning" /><MetricCard label="Pago" value="1.800 MT" icon={CheckCircle} tone="success" /><MetricCard label="Próximo vencimento" value="20 Set" icon={Calendar} /></div>
      <div className="mt-5 space-y-2">
        {payments.map((payment) => (
          <div key={payment.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
            <div className="min-w-0 flex-1"><p className="text-sm font-semibold text-foreground">{payment.label}</p><p className="text-xs text-muted-foreground">Vencimento: {payment.due}</p></div>
            <span className="font-heading text-sm font-bold text-foreground">{payment.amount.toLocaleString('pt-PT')} MT</span>
            <StatusPill label={payment.status} tone={payment.status === 'Pago' ? 'success' : payment.status === 'Em revisão' ? 'info' : 'warning'} />
            {payment.status === 'Pendente' && <button onClick={() => submit(payment.id)} className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90">Submeter pagamento</button>}
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

export function StudentChat() { return <ChatDemo title="Chat do aluno" />; }
export function StudentNotifications() { return <NotificationsDemo title="Notificações do aluno" />; }

// ─────────────────────────────────────────────────────────────────────────────
// ENCARREGADO
// ─────────────────────────────────────────────────────────────────────────────

export function GuardianDashboard() {
  return (
    <PageContainer>
      <PageTitle title="Painel do Encarregado" subtitle="Acompanhamento académico e financeiro dos educandos." />
      <DemoBanner />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4"><MetricCard label="Educandos" value="2" icon={Users} tone="primary" /><MetricCard label="Média" value="13.7" icon={TrendingUp} /><MetricCard label="Assiduidade" value="90%" icon={CheckCircle} tone="success" /><MetricCard label="Pendente" value="15.500 MT" icon={Wallet} tone="warning" /></div>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <Section title="Educandos" action={<ActionLink to="/app/guardian/students">Ver todos</ActionLink>}><div className="space-y-2">{students.slice(0, 2).map((student) => <div key={student.id} className="flex items-center justify-between rounded-xl border border-border px-3 py-3"><div><p className="text-sm font-semibold text-foreground">{student.name}</p><p className="text-xs text-muted-foreground">{student.className}</p></div><StatusPill label={`${student.average}/20`} tone="success" /></div>)}</div></Section>
        <Section title="Atenções"><div className="space-y-2"><div className="rounded-xl border border-warning/25 bg-warning/5 p-3"><p className="text-sm font-semibold text-foreground">Pagamento próximo do vencimento</p><p className="mt-1 text-xs text-muted-foreground">Propina de Setembro · 6.500 MT</p></div><div className="rounded-xl border border-info/25 bg-info/5 p-3"><p className="text-sm font-semibold text-foreground">Nova avaliação publicada</p><p className="mt-1 text-xs text-muted-foreground">Matemática · 15/20</p></div></div></Section>
      </div>
    </PageContainer>
  );
}

export function GuardianStudents() { return <SimpleDirectory title="Os Meus Educandos" subtitle="Perfis académicos associados ao encarregado." rows={students.slice(0, 2).map((student) => ({ title: student.name, meta: `${student.className} · Média ${student.average}/20 · Assiduidade ${student.attendance}%`, status: student.status, tone: 'success' as Tone }))} />; }

export function GuardianPerformance() {
  return (
    <PageContainer><PageTitle title="Desempenho" subtitle="Comparação de resultados recentes por disciplina." /><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{subjects.map((subject) => <div key={subject.name} className="rounded-2xl border border-border bg-card p-4"><p className="text-sm font-semibold text-foreground">{subject.name}</p><p className="mt-3 font-heading text-2xl font-bold text-foreground">{subject.grade}/20</p><div className="mt-3 h-2 rounded-full bg-muted"><div className={cn('h-2 rounded-full', subject.grade >= 14 ? 'bg-success' : 'bg-warning')} style={{ width: `${subject.grade * 5}%` }} /></div></div>)}</div></PageContainer>
  );
}

export function GuardianAttendance() { return <StudentAttendance />; }

export function GuardianPayments() {
  const [state, setState] = useState('Pendente');
  return (
    <PageContainer><PageTitle title="Pagamentos" subtitle="Obrigações dos educandos e submissão de comprovativos." /><DemoBanner /><div className="rounded-2xl border border-border bg-card p-5"><div className="flex flex-wrap items-center gap-3"><div className="flex-1"><p className="text-sm font-semibold text-foreground">Propina · Setembro · Amélia Mondlane</p><p className="text-xs text-muted-foreground">Vencimento 20 Set · Referência DEMO-2026</p></div><span className="font-heading text-lg font-bold text-foreground">6.500 MT</span><StatusPill label={state} tone={state === 'Em revisão' ? 'info' : 'warning'} /></div>{state === 'Pendente' && <button onClick={() => setState('Em revisão')} className="mt-4 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">Submeter comprovativo</button>}</div></PageContainer>
  );
}

export function GuardianChat() { return <ChatDemo title="Chat do encarregado" />; }
export function GuardianNotifications() { return <NotificationsDemo title="Notificações do encarregado" />; }

// ─────────────────────────────────────────────────────────────────────────────
// PROFESSOR
// ─────────────────────────────────────────────────────────────────────────────

export function TeacherDashboard() {
  return (
    <PageContainer><PageTitle title="Painel do Professor" subtitle="Turmas, avaliações e tarefas do dia." /><DemoBanner /><div className="grid grid-cols-2 gap-3 lg:grid-cols-4"><MetricCard label="Turmas" value="4" icon={Users} tone="primary" /><MetricCard label="Alunos" value="118" icon={GraduationCap} /><MetricCard label="Por lançar" value="12" icon={ClipboardList} tone="warning" /><MetricCard label="Aulas hoje" value="5" icon={Calendar} /></div><div className="mt-5 grid gap-4 lg:grid-cols-2"><Section title="Próximas aulas"><div className="space-y-2">{teacherClasses.slice(0, 3).map((item, index) => <div key={item.name} className="flex items-center justify-between rounded-xl border border-border px-3 py-3"><div><p className="text-sm font-semibold text-foreground">{index + 8}:00 · Matemática</p><p className="text-xs text-muted-foreground">{item.name} · {item.students} alunos</p></div><StatusPill label={index === 0 ? 'Próxima' : 'Hoje'} tone={index === 0 ? 'primary' : 'default'} /></div>)}</div></Section><Section title="Acções"><div className="grid grid-cols-2 gap-2"><ActionLink to="/app/teacher/classes">Turmas</ActionLink><ActionLink to="/app/teacher/attendance">Presenças</ActionLink><ActionLink to="/app/teacher/gradebook">Lançar notas</ActionLink><ActionLink to="/app/teacher/content">Conteúdos</ActionLink></div></Section></div></PageContainer>
  );
}

export function TeacherSchedule() { return <StudentSchedule />; }

export function TeacherClasses() { return <SimpleDirectory title="Turmas" subtitle="Turmas atribuídas ao professor nesta demonstração." rows={teacherClasses.map((item) => ({ title: item.name, meta: `${item.students} alunos · Média ${item.average} · Assiduidade ${item.attendance}%`, status: 'Activa', tone: 'success' as Tone }))} />; }

export function TeacherAttendance() {
  const [saved, setSaved] = useState(false);
  const [present, setPresent] = useState<Record<string, boolean>>(() => Object.fromEntries(students.slice(0, 5).map((student) => [student.id, true])));
  return (
    <PageContainer><PageTitle title="Presenças" subtitle="Registo rápido de assiduidade da turma 11ª A." action={<button onClick={() => setSaved(true)} className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">Guardar</button>} />{saved && <div className="mb-4 rounded-xl border border-success/20 bg-success/5 p-3 text-xs text-success">Presenças guardadas nesta sessão de demonstração.</div>}<div className="space-y-2">{students.slice(0, 5).map((student) => <div key={student.id} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3"><div className="flex-1"><p className="text-sm font-semibold text-foreground">{student.name}</p><p className="text-xs text-muted-foreground">{student.id}</p></div><button onClick={() => setPresent((prev) => ({ ...prev, [student.id]: !prev[student.id] }))} className={cn('rounded-lg px-3 py-1.5 text-xs font-semibold', present[student.id] ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive')}>{present[student.id] ? 'Presente' : 'Falta'}</button></div>)}</div></PageContainer>
  );
}

export function TeacherGradebook() {
  const [grades, setGrades] = useState<Record<string, string>>(() => Object.fromEntries(students.slice(0, 5).map((student, index) => [student.id, String(12 + index)])));
  const [saved, setSaved] = useState(false);
  return (
    <PageContainer><PageTitle title="Lançamento de Notas" subtitle="Matemática · 11ª A · ACP" action={<button onClick={() => setSaved(true)} className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">Guardar notas</button>} />{saved && <DemoBanner />}<div className="overflow-hidden rounded-2xl border border-border bg-card"><div className="divide-y divide-border">{students.slice(0, 5).map((student) => <div key={student.id} className="flex items-center gap-3 px-4 py-3"><div className="flex-1"><p className="text-sm font-semibold text-foreground">{student.name}</p><p className="text-xs text-muted-foreground">{student.id}</p></div><input type="number" min="0" max="20" value={grades[student.id]} onChange={(event) => { setSaved(false); setGrades((prev) => ({ ...prev, [student.id]: event.target.value })); }} className="w-20 rounded-lg border border-input bg-background px-2 py-1.5 text-center text-sm font-semibold" /><span className="text-xs text-muted-foreground">/20</span></div>)}</div></div></PageContainer>
  );
}

export function TeacherContent() {
  const [count, setCount] = useState(3);
  return <PageContainer><PageTitle title="Conteúdos" subtitle="Materiais partilhados com as turmas." action={<button onClick={() => setCount((value) => value + 1)} className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"><Plus className="h-3.5 w-3.5" />Novo conteúdo</button>} /><div className="grid gap-3 sm:grid-cols-2">{Array.from({ length: count }).map((_, index) => <div key={index} className="rounded-2xl border border-border bg-card p-4"><FileText className="h-5 w-5 text-primary" /><p className="mt-3 text-sm font-semibold text-foreground">Material de Matemática {index + 1}</p><p className="mt-1 text-xs text-muted-foreground">11ª A · Documento de demonstração</p></div>)}</div></PageContainer>;
}

export function TeacherChat() { return <ChatDemo title="Chat do professor" />; }
export function TeacherNotifications() { return <NotificationsDemo title="Notificações do professor" />; }

// ─────────────────────────────────────────────────────────────────────────────
// PEDAGOGIA
// ─────────────────────────────────────────────────────────────────────────────

export function PedagogyDashboard() {
  return <PageContainer><PageTitle title="Painel da Pedagogia" subtitle="Coordenação académica, qualidade e acompanhamento de risco." /><DemoBanner /><div className="grid grid-cols-2 gap-3 lg:grid-cols-4"><MetricCard label="Turmas" value="8" icon={Users} tone="primary" /><MetricCard label="Professores" value="24" icon={UserCheck} /><MetricCard label="Aprovações" value="3" icon={ClipboardCheck} tone="warning" /><MetricCard label="Em risco" value="4" icon={AlertTriangle} tone="danger" /></div><div className="mt-5 grid gap-4 lg:grid-cols-2"><Section title="Fila de aprovação" action={<ActionLink to="/app/pedagogy/approvals">Gerir</ActionLink>}><div className="space-y-2">{approvalsSeed.map((item) => <div key={item.id} className="rounded-xl border border-border px-3 py-3"><p className="text-sm font-semibold text-foreground">{item.type}</p><p className="text-xs text-muted-foreground">{item.owner} · {item.requestedBy}</p></div>)}</div></Section><Section title="Risco académico"><div className="space-y-2">{students.filter((student) => student.average < 10).map((student) => <div key={student.id} className="flex items-center justify-between rounded-xl border border-destructive/20 bg-destructive/[0.03] px-3 py-3"><div><p className="text-sm font-semibold text-foreground">{student.name}</p><p className="text-xs text-muted-foreground">{student.className} · Média {student.average}</p></div><StatusPill label="Em risco" tone="danger" /></div>)}</div></Section></div></PageContainer>;
}

export function PedagogyApprovals() {
  const [queue, setQueue] = useState(approvalsSeed);
  const decide = (id: string) => setQueue((prev) => prev.filter((item) => item.id !== id));
  return <PageContainer><PageTitle title="Aprovações" subtitle="Fluxos pedagógicos pendentes de decisão." /><DemoBanner /><div className="space-y-2">{queue.length === 0 && <div className="rounded-2xl border border-success/20 bg-success/5 p-8 text-center"><CheckCircle className="mx-auto h-8 w-8 text-success" /><p className="mt-2 text-sm font-semibold text-foreground">Sem itens pendentes</p></div>}{queue.map((item) => <div key={item.id} className="rounded-xl border border-border bg-card p-4"><div className="flex flex-wrap items-start gap-3"><div className="flex-1"><p className="text-sm font-semibold text-foreground">{item.type} · {item.owner}</p><p className="mt-1 text-xs text-muted-foreground">Submetido por {item.requestedBy}</p></div><StatusPill label="Pendente" tone="warning" /></div><div className="mt-3 flex gap-2"><button onClick={() => decide(item.id)} className="rounded-lg bg-success px-3 py-1.5 text-xs font-semibold text-success-foreground">Aprovar</button><button onClick={() => decide(item.id)} className="rounded-lg bg-destructive px-3 py-1.5 text-xs font-semibold text-destructive-foreground">Rejeitar</button></div></div>)}</div></PageContainer>;
}

export function PedagogyAnalytics() { return <PageContainer><PageTitle title="Analítica Pedagógica" subtitle="Indicadores académicos agregados da demonstração." /><div className="grid grid-cols-2 gap-3 lg:grid-cols-4"><MetricCard label="Média geral" value="12.9" icon={TrendingUp} tone="primary" /><MetricCard label="Aprovação" value="81%" icon={CheckCircle} tone="success" /><MetricCard label="Assiduidade" value="89%" icon={Calendar} /><MetricCard label="Risco" value="4" icon={AlertTriangle} tone="danger" /></div><div className="mt-5 rounded-2xl border border-border bg-card p-5"><p className="text-sm font-semibold text-foreground">Desempenho por turma</p><div className="mt-4 space-y-3">{teacherClasses.map((item) => <div key={item.name}><div className="mb-1 flex justify-between text-xs"><span className="text-foreground">{item.name}</span><span className="font-semibold text-muted-foreground">{item.average}/20</span></div><div className="h-2 rounded-full bg-muted"><div className="h-2 rounded-full bg-primary" style={{ width: `${item.average * 5}%` }} /></div></div>)}</div></div></PageContainer>; }

export function PedagogyClasses() { return <TeacherClasses />; }
export function PedagogyTeachers() { return <SimpleDirectory title="Professores" subtitle="Directório docente para acompanhamento pedagógico." rows={['António Magaia', 'Graça Machel', 'Ernesto Vilankulo', 'Lina Matola', 'Paulo Macuácua'].map((name, index) => ({ title: `Prof. ${name}`, meta: `${index + 3} turmas · ${20 + index * 3} aulas/mês`, status: 'Activo', tone: 'success' as Tone }))} />; }
export function PedagogyRisk() { return <SimpleDirectory title="Alunos em Risco" subtitle="Casos que requerem acompanhamento pedagógico." rows={students.filter((student) => student.average < 12).map((student) => ({ title: student.name, meta: `${student.className} · Média ${student.average}/20 · Assiduidade ${student.attendance}%`, status: student.average < 10 ? 'Crítico' : 'Atenção', tone: student.average < 10 ? 'danger' as Tone : 'warning' as Tone }))} />; }
export function PedagogyReports() { return <GenericReportPage title="Relatórios Pedagógicos" subtitle="Pré-visualização de relatórios académicos da demonstração." />; }
export function PedagogyNotifications() { return <NotificationsDemo title="Notificações da pedagogia" />; }

// ─────────────────────────────────────────────────────────────────────────────
// DIRECÇÃO
// ─────────────────────────────────────────────────────────────────────────────

export function ExecutiveDashboard() {
  return <PageContainer><PageTitle title="Painel da Direcção" subtitle="Visão institucional consolidada para apoio à decisão." /><DemoBanner /><div className="grid grid-cols-2 gap-3 lg:grid-cols-4"><MetricCard label="Alunos" value="176" icon={Users} tone="primary" /><MetricCard label="Cobrança" value="86%" icon={Wallet} tone="success" /><MetricCard label="Aprovação" value="81%" icon={GraduationCap} /><MetricCard label="Pendências" value="5" icon={AlertTriangle} tone="warning" /></div><div className="mt-5 grid gap-4 lg:grid-cols-2"><Section title="Resumo académico" action={<ActionLink to="/app/executive/academic">Detalhes</ActionLink>}><div className="space-y-3"><div className="flex justify-between text-sm"><span className="text-muted-foreground">Média geral</span><span className="font-semibold text-foreground">12.9/20</span></div><div className="flex justify-between text-sm"><span className="text-muted-foreground">Assiduidade</span><span className="font-semibold text-foreground">89%</span></div><div className="flex justify-between text-sm"><span className="text-muted-foreground">Alunos em risco</span><span className="font-semibold text-destructive">4</span></div></div></Section><Section title="Resumo financeiro" action={<ActionLink to="/app/executive/finance">Detalhes</ActionLink>}><div className="space-y-3"><div className="flex justify-between text-sm"><span className="text-muted-foreground">Recebido</span><span className="font-semibold text-success">812.400 MT</span></div><div className="flex justify-between text-sm"><span className="text-muted-foreground">Pendente</span><span className="font-semibold text-warning">94.500 MT</span></div><div className="flex justify-between text-sm"><span className="text-muted-foreground">Em atraso</span><span className="font-semibold text-destructive">31.000 MT</span></div></div></Section></div></PageContainer>;
}

export function ExecutiveApprovals() { return <PedagogyApprovals />; }
export function ExecutiveFinance() { return <PageContainer><PageTitle title="Visão Financeira" subtitle="Indicadores financeiros de alto nível." /><div className="grid grid-cols-2 gap-3 lg:grid-cols-4"><MetricCard label="Recebido" value="812K MT" icon={Wallet} tone="success" /><MetricCard label="Pendente" value="94K MT" icon={Clock} tone="warning" /><MetricCard label="Atrasado" value="31K MT" icon={AlertTriangle} tone="danger" /><MetricCard label="Cobrança" value="86%" icon={TrendingUp} tone="primary" /></div><div className="mt-5"><Section title="Evolução mensal"><div className="space-y-4">{[['Julho', 72], ['Agosto', 81], ['Setembro', 86]].map(([month, value]) => <div key={String(month)}><div className="mb-1 flex justify-between text-xs"><span>{month}</span><span>{value}%</span></div><div className="h-2 rounded-full bg-muted"><div className="h-2 rounded-full bg-primary" style={{ width: `${value}%` }} /></div></div>)}</div></Section></div></PageContainer>; }
export function ExecutiveAcademic() { return <PedagogyAnalytics />; }
export function ExecutiveEnrollment() { return <PageContainer><PageTitle title="Matrículas" subtitle="Indicadores de matrículas e distribuição por turmas." /><div className="grid grid-cols-2 gap-3 lg:grid-cols-4"><MetricCard label="Matriculados" value="176" icon={Users} tone="primary" /><MetricCard label="Novos" value="14" icon={UserCheck} /><MetricCard label="Renovações" value="148" icon={CheckCircle} tone="success" /><MetricCard label="Pendentes" value="14" icon={Clock} tone="warning" /></div><div className="mt-5"><Section title="Distribuição por turma"><div className="space-y-2">{teacherClasses.map((item) => <div key={item.name} className="flex items-center justify-between rounded-xl border border-border px-3 py-3"><span className="text-sm font-semibold text-foreground">{item.name}</span><StatusPill label={`${item.students} alunos`} tone="primary" /></div>)}</div></Section></div></PageContainer>; }
export function ExecutiveReports() { return <GenericReportPage title="Relatórios da Direcção" subtitle="Relatórios executivos e institucionais." />; }
export function ExecutiveAudit() { return <PageContainer><PageTitle title="Auditoria" subtitle="Rasto demonstrativo de acções administrativas." /><div className="space-y-2">{[['09:41', 'Finanças', 'Pagamento FIN-101 enviado para validação'], ['09:22', 'Secretaria', 'Matrícula ALU-176 actualizada'], ['08:55', 'Pedagogia', 'Pauta 11ª A aprovada'], ['08:31', 'Direcção', 'Relatório mensal consultado']].map(([time, area, action]) => <div key={`${time}-${action}`} className="flex items-start gap-3 rounded-xl border border-border bg-card px-4 py-3"><Shield className="mt-0.5 h-4 w-4 text-primary" /><div className="flex-1"><p className="text-sm font-semibold text-foreground">{area}</p><p className="text-xs text-muted-foreground">{action}</p></div><span className="text-xs text-muted-foreground">{time}</span></div>)}</div></PageContainer>; }
export function ExecutiveNotifications() { return <NotificationsDemo title="Notificações da direcção" />; }

// ─────────────────────────────────────────────────────────────────────────────
// SECRETARIA
// ─────────────────────────────────────────────────────────────────────────────

export function SecretaryDashboard() {
  return <PageContainer><PageTitle title="Painel da Secretaria" subtitle="Admissões, matrículas, alunos e documentação." /><DemoBanner /><div className="grid grid-cols-2 gap-3 lg:grid-cols-4"><MetricCard label="Alunos" value="176" icon={Users} tone="primary" /><MetricCard label="Admissões" value="14" icon={UserCheck} tone="warning" /><MetricCard label="Matrículas" value="176" icon={ClipboardList} /><MetricCard label="Documentos" value="342" icon={FolderOpen} /></div><div className="mt-5 grid gap-4 lg:grid-cols-2"><Section title="Admissões recentes" action={<ActionLink to="/app/secretary/admissions">Analisar</ActionLink>}><div className="space-y-2">{['Ana Manhiça', 'Bruno Nhanala', 'Célia Dzimba'].map((name, index) => <div key={name} className="flex items-center justify-between rounded-xl border border-border px-3 py-3"><div><p className="text-sm font-semibold text-foreground">{name}</p><p className="text-xs text-muted-foreground">Candidatura · {10 + index}ª classe</p></div><StatusPill label={index === 1 ? 'Aprovado' : 'Pendente'} tone={index === 1 ? 'success' : 'warning'} /></div>)}</div></Section><Section title="Acções rápidas"><div className="grid grid-cols-2 gap-2"><ActionLink to="/app/secretary/enrollments">Nova matrícula</ActionLink><ActionLink to="/app/secretary/students">Pesquisar aluno</ActionLink><ActionLink to="/app/secretary/documents">Documentos</ActionLink><ActionLink to="/app/secretary/classes">Turmas</ActionLink></div></Section></div></PageContainer>;
}

export function SecretaryAdmissions() {
  const [items, setItems] = useState([
    { id: 1, name: 'Ana Manhiça', grade: '10ª', status: 'Pendente' }, { id: 2, name: 'Bruno Nhanala', grade: '11ª', status: 'Aprovado' }, { id: 3, name: 'Célia Dzimba', grade: '10ª', status: 'Pendente' },
  ]);
  const decide = (id: number, status: string) => setItems((prev) => prev.map((item) => item.id === id ? { ...item, status } : item));
  return <PageContainer><PageTitle title="Admissões" subtitle="Processos de candidatura em análise." /><DemoBanner /><div className="space-y-2">{items.map((item) => <div key={item.id} className="rounded-xl border border-border bg-card p-4"><div className="flex items-center gap-3"><div className="flex-1"><p className="text-sm font-semibold text-foreground">{item.name}</p><p className="text-xs text-muted-foreground">Candidatura para {item.grade} classe</p></div><StatusPill label={item.status} tone={item.status === 'Aprovado' ? 'success' : item.status === 'Rejeitado' ? 'danger' : 'warning'} /></div>{item.status === 'Pendente' && <div className="mt-3 flex gap-2"><button onClick={() => decide(item.id, 'Aprovado')} className="rounded-lg bg-success px-3 py-1.5 text-xs font-semibold text-success-foreground">Aprovar</button><button onClick={() => decide(item.id, 'Rejeitado')} className="rounded-lg bg-destructive px-3 py-1.5 text-xs font-semibold text-destructive-foreground">Rejeitar</button></div>}</div>)}</div></PageContainer>;
}

export function SecretaryEnrollments() {
  const [list, setList] = useState(students.slice(0, 4));
  const [name, setName] = useState('');
  const add = () => {
    if (!name.trim()) return;
    setList((prev) => [...prev, { id: `ALU-${String(prev.length + 10).padStart(3, '0')}`, name: name.trim(), className: '10ª A', average: 0, attendance: 100, status: 'Novo' }]);
    setName('');
  };
  return <PageContainer><PageTitle title="Matrículas" subtitle="Registo demonstrativo de novos alunos." /><DemoBanner /><div className="mb-5 rounded-2xl border border-border bg-card p-5"><p className="text-sm font-semibold text-foreground">Nova matrícula</p><div className="mt-3 flex gap-2"><input value={name} onChange={(event) => setName(event.target.value)} placeholder="Nome do aluno" className="min-w-0 flex-1 rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary/50" /><button onClick={add} className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"><Plus className="h-3.5 w-3.5" />Adicionar</button></div></div><div className="space-y-2">{list.map((student) => <div key={student.id} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3"><div className="flex-1"><p className="text-sm font-semibold text-foreground">{student.name}</p><p className="text-xs text-muted-foreground">{student.className} · {student.id}</p></div><StatusPill label={student.status} tone={student.status === 'Novo' ? 'primary' : 'success'} /></div>)}</div></PageContainer>;
}

export function SecretaryStudents() { return <SimpleDirectory title="Alunos" subtitle="Directório escolar pesquisável para a apresentação." rows={students.map((student) => ({ title: student.name, meta: `${student.className} · ${student.id} · Média ${student.average}/20`, status: student.status, tone: student.status === 'Em risco' ? 'danger' as Tone : student.status === 'Atenção' ? 'warning' as Tone : 'success' as Tone }))} />; }
export function SecretaryDocuments() { return <PageContainer><PageTitle title="Documentos" subtitle="Emissão e consulta de documentos institucionais." /><div className="grid gap-3 sm:grid-cols-2">{['Declaração de frequência', 'Certificado de matrícula', 'Pauta de notas', 'Ficha de transferência'].map((name, index) => <button key={name} className="rounded-2xl border border-border bg-card p-5 text-left hover:border-primary/30"><FileText className="h-5 w-5 text-primary" /><p className="mt-3 text-sm font-semibold text-foreground">{name}</p><p className="mt-1 text-xs text-muted-foreground">{42 + index * 18} documentos emitidos</p><span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary"><Download className="h-3.5 w-3.5" />Pré-visualizar</span></button>)}</div></PageContainer>; }
export function SecretaryClasses() { return <TeacherClasses />; }
export function SecretaryNotifications() { return <NotificationsDemo title="Notificações da secretaria" />; }

// ─────────────────────────────────────────────────────────────────────────────
// FINANÇAS
// ─────────────────────────────────────────────────────────────────────────────

export function FinanceDashboard() {
  return <PageContainer><PageTitle title="Painel Financeiro" subtitle="Tesouraria, cobranças e validações." /><DemoBanner /><div className="grid grid-cols-2 gap-3 lg:grid-cols-4"><MetricCard label="Recebido" value="812K MT" icon={Wallet} tone="success" /><MetricCard label="A validar" value="2" icon={Clock} tone="warning" /><MetricCard label="Em atraso" value="31K MT" icon={AlertTriangle} tone="danger" /><MetricCard label="Cobrança" value="86%" icon={TrendingUp} tone="primary" /></div><div className="mt-5 grid gap-4 lg:grid-cols-2"><Section title="Pagamentos recentes" action={<ActionLink to="/app/finance/payments">Ver todos</ActionLink>}><div className="space-y-2">{financePaymentsSeed.slice(0, 3).map((payment) => <div key={payment.id} className="flex items-center justify-between gap-3 rounded-xl border border-border px-3 py-3"><div><p className="text-sm font-semibold text-foreground">{payment.student}</p><p className="text-xs text-muted-foreground">{payment.concept}</p></div><StatusPill label={payment.status} tone={payment.status === 'Validado' ? 'success' : payment.status === 'Atrasado' ? 'danger' : 'warning'} /></div>)}</div></Section><Section title="Acções rápidas"><div className="grid grid-cols-2 gap-2"><ActionLink to="/app/finance/validation">Validar</ActionLink><ActionLink to="/app/finance/invoices">Facturas</ActionLink><ActionLink to="/app/finance/receipts">Recibos</ActionLink><ActionLink to="/app/finance/reports">Relatórios</ActionLink></div></Section></div></PageContainer>;
}

export function FinancePayments() {
  const [filter, setFilter] = useState('Todos');
  const rows = useMemo(() => filter === 'Todos' ? financePaymentsSeed : financePaymentsSeed.filter((payment) => payment.status === filter), [filter]);
  return <PageContainer><PageTitle title="Pagamentos" subtitle="Acompanhamento das transacções da demonstração." action={<select value={filter} onChange={(event) => setFilter(event.target.value)} className="rounded-xl border border-input bg-background px-3 py-2 text-xs"><option>Todos</option><option>Em revisão</option><option>Validado</option><option>Atrasado</option><option>Pendente</option></select>} /><div className="space-y-2">{rows.map((payment) => <div key={payment.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card px-4 py-3"><div className="min-w-0 flex-1"><p className="text-sm font-semibold text-foreground">{payment.student}</p><p className="text-xs text-muted-foreground">{payment.concept} · {payment.method}</p></div><span className="font-heading text-sm font-bold text-foreground">{payment.amount.toLocaleString('pt-PT')} MT</span><StatusPill label={payment.status} tone={payment.status === 'Validado' ? 'success' : payment.status === 'Atrasado' ? 'danger' : payment.status === 'Em revisão' ? 'info' : 'warning'} /></div>)}</div></PageContainer>;
}

export function FinanceValidation() {
  const [queue, setQueue] = useState(financePaymentsSeed.filter((payment) => payment.status === 'Em revisão'));
  const decide = (id: string) => setQueue((prev) => prev.filter((payment) => payment.id !== id));
  return <PageContainer><PageTitle title="Validação de Pagamentos" subtitle="Confirmar ou rejeitar submissões pendentes." /><DemoBanner />{queue.length === 0 ? <div className="rounded-2xl border border-success/20 bg-success/5 p-8 text-center"><CheckCircle className="mx-auto h-8 w-8 text-success" /><p className="mt-2 text-sm font-semibold text-foreground">Tudo validado nesta sessão</p></div> : <div className="space-y-2">{queue.map((payment) => <div key={payment.id} className="rounded-xl border border-info/20 bg-card p-4"><div className="flex flex-wrap items-center gap-3"><div className="flex-1"><p className="text-sm font-semibold text-foreground">{payment.student} · {payment.concept}</p><p className="text-xs text-muted-foreground">{payment.method} · {payment.id}</p></div><span className="font-heading text-base font-bold text-foreground">{payment.amount.toLocaleString('pt-PT')} MT</span></div><div className="mt-3 flex gap-2"><button onClick={() => decide(payment.id)} className="rounded-lg bg-success px-3 py-1.5 text-xs font-semibold text-success-foreground">Validar</button><button onClick={() => decide(payment.id)} className="rounded-lg bg-destructive px-3 py-1.5 text-xs font-semibold text-destructive-foreground">Rejeitar</button></div></div>)}</div>}</PageContainer>;
}

export function FinanceInvoices() { return <PageContainer><PageTitle title="Facturas" subtitle="Facturas emitidas e estado de cobrança." /><div className="space-y-2">{financePaymentsSeed.slice(0, 4).map((payment, index) => <div key={payment.id} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3"><FileText className="h-4 w-4 text-primary" /><div className="flex-1"><p className="text-sm font-semibold text-foreground">FAC-2026-{String(index + 1).padStart(3, '0')}</p><p className="text-xs text-muted-foreground">{payment.student} · {payment.concept}</p></div><span className="font-heading text-sm font-bold text-foreground">{payment.amount.toLocaleString('pt-PT')} MT</span></div>)}</div></PageContainer>; }
export function FinanceDebtors() { return <SimpleDirectory title="Devedores" subtitle="Contas com valores vencidos ou pendentes." rows={students.slice(2, 6).map((student, index) => ({ title: student.name, meta: `${student.className} · Saldo ${(6500 + index * 2500).toLocaleString('pt-PT')} MT`, status: index < 2 ? 'Em atraso' : 'Pendente', tone: index < 2 ? 'danger' as Tone : 'warning' as Tone }))} />; }
export function FinanceReceipts() { return <PageContainer><PageTitle title="Recibos" subtitle="Comprovativos de pagamentos validados." /><div className="grid gap-3 sm:grid-cols-2">{financePaymentsSeed.filter((payment) => payment.status === 'Validado').concat(financePaymentsSeed.slice(0, 2)).map((payment, index) => <div key={`${payment.id}-${index}`} className="rounded-2xl border border-border bg-card p-5"><Receipt className="h-5 w-5 text-primary" /><p className="mt-3 text-sm font-semibold text-foreground">REC-2026-{String(index + 41).padStart(3, '0')}</p><p className="mt-1 text-xs text-muted-foreground">{payment.student} · {payment.concept}</p><p className="mt-3 font-heading text-lg font-bold text-foreground">{payment.amount.toLocaleString('pt-PT')} MT</p><button className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary"><Download className="h-3.5 w-3.5" />Pré-visualizar</button></div>)}</div></PageContainer>; }
export function FinanceTreasury() { return <PageContainer><PageTitle title="Tesouraria" subtitle="Resumo diário de entradas por método de pagamento." /><div className="grid grid-cols-2 gap-3 lg:grid-cols-4"><MetricCard label="Hoje" value="48.200 MT" icon={Wallet} tone="primary" /><MetricCard label="M-Pesa" value="21.700 MT" icon={Receipt} /><MetricCard label="Transferência" value="19.000 MT" icon={Landmark} /><MetricCard label="Numerário" value="7.500 MT" icon={Wallet} /></div><div className="mt-5"><Section title="Movimentos de hoje"><div className="space-y-2">{financePaymentsSeed.slice(0, 4).map((payment) => <div key={payment.id} className="flex items-center justify-between rounded-xl border border-border px-3 py-3"><div><p className="text-sm font-semibold text-foreground">{payment.method}</p><p className="text-xs text-muted-foreground">{payment.student}</p></div><span className="font-heading text-sm font-bold text-foreground">+{payment.amount.toLocaleString('pt-PT')} MT</span></div>)}</div></Section></div></PageContainer>; }
export function FinanceReports() { return <GenericReportPage title="Relatórios Financeiros" subtitle="Cobrança, tesouraria e obrigações financeiras." />; }
export function FinanceNotifications() { return <NotificationsDemo title="Notificações de finanças" />; }
