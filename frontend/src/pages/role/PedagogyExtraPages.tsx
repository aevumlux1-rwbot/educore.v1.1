import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { PageContainer } from '@/components/layout/PageContainer';
import { SectionHeader } from '@/components/ui/section-header';
import { StatusBadge } from '@/components/ui/status-badge';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { AlertCard } from '@/components/dashboard/AlertCard';
import { ApprovalDecisionSheet } from '@/components/shared/ApprovalDecisionSheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { approvals as approvalsSeed, assessmentsCalendar, classGroups } from '@/data/mockData';
import type { Approval, AssessmentCalendarItem } from '@/data/mockData';
import { DetailSheet } from '@/components/shared/DetailSheet';
import { Bell, Calendar, AlertTriangle, ChevronRight, ClipboardList } from 'lucide-react';

/* ─── APROVAÇÕES PEDAGÓGICAS ─── */
export function PedagogyApprovals() {
  const [list, setList] = useState(approvalsSeed.filter(a => a.scope === 'pedagogia'));
  const [active, setActive] = useState<Approval | null>(null);

  const onDecide = (id: string, decision: 'aprovado' | 'rejeitado') => {
    setList(prev => prev.map(a => a.id === id ? { ...a, status: decision } : a));
    setActive(null);
  };

  const byCat = (cat: Approval['category']) => list.filter(a => a.category === cat);

  return (
    <PageContainer>
      <div className="mb-5">
        <h1 className="font-heading text-2xl font-bold text-foreground">Aprovações Pedagógicas</h1>
        <p className="mt-1 text-sm text-muted-foreground">Reveja e decida sobre solicitações dos professores e secretaria.</p>
      </div>

      <Tabs defaultValue="nota">
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="nota">Notas <span className="ml-1.5 text-[10px] text-muted-foreground">({byCat('nota').length})</span></TabsTrigger>
          <TabsTrigger value="conteudo">Conteúdos <span className="ml-1.5 text-[10px] text-muted-foreground">({byCat('conteudo').length})</span></TabsTrigger>
          <TabsTrigger value="avaliacao">Avaliações <span className="ml-1.5 text-[10px] text-muted-foreground">({byCat('avaliacao').length})</span></TabsTrigger>
          <TabsTrigger value="horario">Horários <span className="ml-1.5 text-[10px] text-muted-foreground">({byCat('horario').length})</span></TabsTrigger>
        </TabsList>
        {(['nota', 'conteudo', 'avaliacao', 'horario'] as Approval['category'][]).map(cat => (
          <TabsContent key={cat} value={cat}>
            <ApprovalList items={byCat(cat)} onPick={setActive} />
          </TabsContent>
        ))}
      </Tabs>

      <ApprovalDecisionSheet approval={active} open={!!active} onOpenChange={(o) => !o && setActive(null)} onDecide={onDecide} />
    </PageContainer>
  );
}

function ApprovalList({ items, onPick }: { items: Approval[]; onPick: (a: Approval) => void }) {
  if (items.length === 0) return <p className="text-center text-xs text-muted-foreground py-6">Sem pendentes.</p>;
  return (
    <div className="space-y-1.5">
      {items.map(a => (
        <button key={a.id} onClick={() => onPick(a)} className="w-full text-left flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:shadow-sm transition-all active:scale-[0.997]">
          <ClipboardList className="h-4 w-4 text-muted-foreground shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{a.title}</p>
            <p className="text-[11px] text-muted-foreground">{a.origin} · {new Date(a.submittedAt).toLocaleDateString('pt-PT')}</p>
          </div>
          <StatusBadge label={a.priority === 'alta' ? 'Alta' : a.priority === 'media' ? 'Média' : 'Baixa'} variant={a.priority === 'alta' ? 'destructive' : a.priority === 'media' ? 'warning' : 'muted'} />
          <StatusBadge label={a.status === 'pendente' ? 'Pendente' : a.status === 'aprovado' ? 'Aprovado' : 'Rejeitado'} variant={a.status === 'pendente' ? 'info' : a.status === 'aprovado' ? 'success' : 'destructive'} />
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>
      ))}
    </div>
  );
}

/* ─── CALENDÁRIO ACADÉMICO ─── */
export function PedagogyAssessmentsCalendar() {
  const [turma, setTurma] = useState('all');
  const [active, setActive] = useState<AssessmentCalendarItem | null>(null);

  const filtered = useMemo(() => turma === 'all' ? assessmentsCalendar : assessmentsCalendar.filter(a => a.turma === turma), [turma]);

  const conflicts = useMemo(() => {
    const byDate = new Map<string, AssessmentCalendarItem[]>();
    assessmentsCalendar.forEach(a => {
      const list = byDate.get(a.date) ?? [];
      list.push(a);
      byDate.set(a.date, list);
    });
    return Array.from(byDate.entries()).filter(([, list]) => list.filter(a => a.tipo === 'ACP').length > 1);
  }, []);

  return (
    <PageContainer>
      <div className="mb-5">
        <h1 className="font-heading text-2xl font-bold text-foreground">Calendário Académico</h1>
        <p className="mt-1 text-sm text-muted-foreground">Visão de avaliações por turma e disciplina.</p>
      </div>

      {conflicts.length > 0 && (
        <AlertCard
          title={`${conflicts.length} conflito(s) de calendário`}
          description="Existem dias com múltiplas ACP — considere redistribuir para evitar sobrecarga."
          variant="warning"
          className="mb-4"
        />
      )}

      <div className="mb-4 max-w-xs">
        <Select value={turma} onValueChange={setTurma}>
          <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as turmas</SelectItem>
            {classGroups.map(c => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5 mb-5">
        {filtered.length === 0 && <p className="text-center text-xs text-muted-foreground py-6">Sem avaliações.</p>}
        {filtered.map(a => (
          <button key={a.id} onClick={() => setActive(a)} className="w-full text-left flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:shadow-sm transition-all active:scale-[0.997]">
            <div className="flex h-10 w-12 shrink-0 flex-col items-center justify-center rounded-lg bg-primary/5 text-primary">
              <span className="text-[9px] uppercase font-semibold">{new Date(a.date).toLocaleDateString('pt-PT', { month: 'short' })}</span>
              <span className="text-sm font-bold leading-none">{new Date(a.date).getDate()}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{a.title}</p>
              <p className="text-[11px] text-muted-foreground">{a.teacher} · {a.turma}</p>
            </div>
            <StatusBadge label={a.tipo} variant={a.tipo === 'ACP' ? 'destructive' : 'primary'} />
          </button>
        ))}
      </div>

      {conflicts.length > 0 && (
        <>
          <SectionHeader title="Conflitos detectados" className="mb-2" />
          <div className="space-y-1.5">
            {conflicts.map(([date, list]) => (
              <div key={date} className="rounded-xl border border-warning/30 bg-warning/5 px-4 py-3">
                <div className="flex items-center gap-2 mb-1"><AlertTriangle className="h-3.5 w-3.5 text-warning" /><p className="text-sm font-medium text-foreground">{new Date(date).toLocaleDateString('pt-PT', { weekday: 'long', day: 'numeric', month: 'long' })}</p></div>
                <p className="text-xs text-muted-foreground">{list.length} avaliações ({list.filter(a => a.tipo === 'ACP').length} ACP)</p>
              </div>
            ))}
          </div>
        </>
      )}

      <DetailSheet open={!!active} onOpenChange={(o) => !o && setActive(null)} title={active?.title ?? ''} description={active ? `${active.turma} · ${active.teacher}` : ''}
        footer={active && (
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => { toast.success('Avaliação reagendada (demo).'); setActive(null); }} className="rounded-xl border border-border py-2 text-xs font-medium hover:bg-muted">Reagendar</button>
            <button onClick={() => { toast.success('Avaliação aprovada.'); setActive(null); }} className="rounded-xl bg-success py-2 text-xs font-semibold text-success-foreground hover:bg-success/90">Aprovar</button>
          </div>
        )}>
        {active && (
          <div className="space-y-2 text-sm">
            <div className="rounded-xl bg-muted/40 p-3 space-y-1 text-xs">
              <div className="flex justify-between"><span className="text-muted-foreground">Disciplina</span><span className="text-foreground">{active.subjectName}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Data</span><span className="text-foreground">{new Date(active.date).toLocaleDateString('pt-PT')}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Hora</span><span className="text-foreground">{active.time}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Sala</span><span className="text-foreground">{active.room}</span></div>
            </div>
            <p className="text-xs text-muted-foreground"><strong>Matéria:</strong> {active.materia}</p>
          </div>
        )}
      </DetailSheet>
    </PageContainer>
  );
}

/* ─── NOTIFICAÇÕES ─── */
export function PedagogyNotifications() {
  const [items, setItems] = useState([
    { title: '3 lançamentos de notas pendentes', message: 'Professores aguardam aprovação para publicação.', type: 'alerta', time: '1h atrás', read: false, route: '/app/pedagogy/approvals' },
    { title: 'Conflito de calendário detectado', message: '2 ACP marcadas para 22 de Abril.', type: 'aviso', time: '3h atrás', read: false, route: '/app/pedagogy/assessments-calendar' },
    { title: 'Aluna Fátima entrou em risco crítico', message: 'Média actual: 7.2/20. Intervenção sugerida.', type: 'alerta', time: '1d atrás', read: true, route: '/app/pedagogy/risk' },
    { title: 'Relatório do 2º Trimestre disponível', message: 'Relatório agregado pronto para revisão.', type: 'info', time: '2d atrás', read: true, route: '/app/pedagogy/reports' },
  ]);
  const navigate = useNavigate();

  const handle = (i: number) => {
    setItems(prev => prev.map((x, k) => k === i ? { ...x, read: true } : x));
    navigate(items[i].route);
  };

  return (
    <PageContainer>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Notificações</h1>
          <p className="mt-1 text-sm text-muted-foreground">{items.filter(i => !i.read).length} por ler.</p>
        </div>
        <button onClick={() => { setItems(prev => prev.map(x => ({ ...x, read: true }))); toast.success('Tudo marcado como lido.'); }} className="text-xs font-medium text-primary hover:underline">Marcar tudo como lido</button>
      </div>
      <div className="space-y-1.5">
        {items.map((n, i) => (
          <button key={i} onClick={() => handle(i)} className={cn('w-full text-left flex items-start gap-3 rounded-xl border px-4 py-3 hover:shadow-sm transition-all active:scale-[0.997]', n.read ? 'border-border bg-card' : 'border-primary/20 bg-primary/[0.02]')}>
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