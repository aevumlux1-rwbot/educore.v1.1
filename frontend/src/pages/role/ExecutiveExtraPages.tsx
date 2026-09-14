import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { PageContainer } from '@/components/layout/PageContainer';
import { StatusBadge } from '@/components/ui/status-badge';
import { ApprovalDecisionSheet } from '@/components/shared/ApprovalDecisionSheet';
import { approvals as approvalsSeed } from '@/data/mockData';
import type { Approval } from '@/data/mockData';
import { Bell, Crown, ChevronRight } from 'lucide-react';

export function ExecutiveApprovals() {
  const [list, setList] = useState(approvalsSeed.filter(a => a.scope === 'direccao'));
  const [active, setActive] = useState<Approval | null>(null);

  const onDecide = (id: string, decision: 'aprovado' | 'rejeitado') => {
    setList(prev => prev.map(a => a.id === id ? { ...a, status: decision } : a));
    setActive(null);
  };

  return (
    <PageContainer>
      <div className="mb-5">
        <h1 className="font-heading text-2xl font-bold text-foreground">Aprovações Executivas</h1>
        <p className="mt-1 text-sm text-muted-foreground">Decisões superiores e questões institucionais.</p>
      </div>

      <div className="space-y-1.5">
        {list.length === 0 && <p className="text-center text-xs text-muted-foreground py-6">Sem decisões pendentes.</p>}
        {list.map(a => (
          <button key={a.id} onClick={() => setActive(a)} className="w-full text-left flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:shadow-sm transition-all active:scale-[0.997]">
            <Crown className="h-4 w-4 text-muted-foreground shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{a.title}</p>
              <p className="text-[11px] text-muted-foreground">{a.origin} · {new Date(a.submittedAt).toLocaleDateString('pt-PT')}{a.impact ? ` · Impacto ${a.impact}` : ''}</p>
            </div>
            <StatusBadge label={a.priority === 'alta' ? 'Alta' : a.priority === 'media' ? 'Média' : 'Baixa'} variant={a.priority === 'alta' ? 'destructive' : a.priority === 'media' ? 'warning' : 'muted'} />
            <StatusBadge label={a.status === 'pendente' ? 'Pendente' : a.status === 'aprovado' ? 'Aprovado' : 'Rejeitado'} variant={a.status === 'pendente' ? 'info' : a.status === 'aprovado' ? 'success' : 'destructive'} />
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        ))}
      </div>

      <ApprovalDecisionSheet approval={active} open={!!active} onOpenChange={(o) => !o && setActive(null)} onDecide={onDecide} />
    </PageContainer>
  );
}

export function ExecutiveNotifications() {
  const navigate = useNavigate();
  const [items, setItems] = useState([
    { title: 'Pedido financeiro aguarda decisão', message: 'Isenção parcial de propina submetida pelas Finanças.', type: 'alerta', time: '2h atrás', read: false, route: '/app/executive/approvals' },
    { title: 'Relatório institucional pronto', message: 'O relatório do 2º Trimestre está disponível.', type: 'info', time: '1d atrás', read: false, route: '/app/executive/reports' },
    { title: 'Inadimplência acima da meta', message: 'Taxa actual: 8% — meta 5%.', type: 'aviso', time: '2d atrás', read: true, route: '/app/executive/finance' },
  ]);

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