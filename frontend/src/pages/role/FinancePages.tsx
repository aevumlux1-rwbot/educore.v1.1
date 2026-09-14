import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { PageContainer } from '@/components/layout/PageContainer';
import { SectionHeader } from '@/components/ui/section-header';
import { StatusBadge } from '@/components/ui/status-badge';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { AlertCard } from '@/components/dashboard/AlertCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ReceiptPreview } from '@/components/shared/ReceiptPreview';
import { ReportPreviewModal } from '@/components/shared/ReportPreviewModal';
import {
  payments as paymentsSeed, obligations, financeAccounts, financeStats
} from '@/data/mockData';
import {
  Wallet, CheckCircle, AlertTriangle, Clock, FileText, BarChart3,
  Receipt, TrendingUp, ArrowDownRight, ArrowUpRight, Download, ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

export { FinanceAdminDashboard as FinanceDashboard } from '@/pages/app/RoleDashboards';

/* ─── PAGAMENTOS ─── */
export function FinancePayments() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>('all');
  const filtered = paymentsSeed.filter(p => filter === 'all' ? true : p.status === filter);
  const sorted = [...filtered].sort((a, b) => {
    const order: Record<string, number> = { atrasado: 0, em_revisao: 1, parcial: 2, pendente: 3, rejeitado: 4, pago: 5, validado: 6 };
    return (order[a.status] ?? 9) - (order[b.status] ?? 9);
  });

  const statusLabel = (s: string) => s === 'pago' ? 'Pago' : s === 'validado' ? 'Validado' : s === 'atrasado' ? 'Atrasado' : s === 'em_revisao' ? 'Em Revisão' : s === 'parcial' ? 'Parcial' : s === 'rejeitado' ? 'Rejeitado' : 'Pendente';

  return (
    <PageContainer>
      <div className="mb-5">
        <h1 className="font-heading text-2xl font-bold text-foreground">Pagamentos</h1>
        <p className="mt-1 text-sm text-muted-foreground">Acompanhar e gerir todas as transacções.</p>
      </div>

      <div className="mb-4 max-w-xs">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os estados</SelectItem>
            <SelectItem value="atrasado">Atrasados</SelectItem>
            <SelectItem value="em_revisao">Em revisão</SelectItem>
            <SelectItem value="pendente">Pendentes</SelectItem>
            <SelectItem value="validado">Validados</SelectItem>
            <SelectItem value="rejeitado">Rejeitados</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatsCard label="Total" value={paymentsSeed.length} icon={FileText} variant="primary" />
        <StatsCard label="A Validar" value={financeStats.pendentesValidacao} icon={Clock} />
        <StatsCard label="Atrasados" value={paymentsSeed.filter(p => p.status === 'atrasado').length} icon={AlertTriangle} />
        <StatsCard label="Validados" value={paymentsSeed.filter(p => p.status === 'validado').length} icon={CheckCircle} />
      </div>

      <div className="space-y-1.5">
        {sorted.map(p => (
          <button key={p.id} onClick={() => navigate(`/app/finance/payments/${p.id}`)} className={cn('w-full text-left flex items-center gap-3 rounded-xl border bg-card px-4 py-3 hover:shadow-sm transition-all active:scale-[0.997]', p.status === 'atrasado' ? 'border-destructive/20' : 'border-border')}>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{p.studentName} — {p.conceito}</p>
              <p className="text-xs text-muted-foreground">
                Venc. {new Date(p.dueDate).toLocaleDateString('pt-PT', { month: 'short', day: 'numeric' })}
                {p.paidAmount > 0 && ` · Pago: ${p.paidAmount.toLocaleString('pt-PT')} MT`}
              </p>
            </div>
            <span className="font-heading text-sm font-bold text-foreground">{p.amount.toLocaleString('pt-PT')} MT</span>
            <StatusBadge label={statusLabel(p.status)} variant={p.status === 'pago' || p.status === 'validado' ? 'success' : p.status === 'atrasado' || p.status === 'rejeitado' ? 'destructive' : p.status === 'em_revisao' ? 'info' : p.status === 'parcial' ? 'warning' : 'muted'} />
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        ))}
        {sorted.length === 0 && <p className="text-center text-sm text-muted-foreground py-6">Sem pagamentos para este filtro.</p>}
      </div>
    </PageContainer>
  );
}

/* ─── VALIDAÇÃO ─── */
export function FinanceValidation() {
  const [list, setList] = useState(paymentsSeed.filter(p => p.status === 'em_revisao'));

  const decide = (id: string, decision: 'validar' | 'rejeitar') => {
    setList(prev => prev.filter(p => p.id !== id));
    toast.success(decision === 'validar' ? 'Pagamento validado.' : 'Pagamento rejeitado.');
  };
  const validateAll = () => {
    const n = list.length;
    setList([]);
    toast.success(`${n} pagamento(s) validado(s) em lote.`);
  };

  return (
    <PageContainer>
      <div className="mb-5">
        <h1 className="font-heading text-2xl font-bold text-foreground">Validação de Pagamentos</h1>
        <p className="mt-1 text-sm text-muted-foreground">Validar submissões pendentes.</p>
      </div>

      {list.length > 0 ? (
        <AlertCard title={`${list.length} pagamento(s) a aguardar`} description="Reveja, confirme ou rejeite as submissões." variant="info" action="Validar em lote" onAction={validateAll} className="mb-6" />
      ) : (
        <div className="rounded-2xl border border-border bg-card p-8 text-center mb-6">
          <CheckCircle className="mx-auto h-8 w-8 text-success mb-2" />
          <p className="text-sm font-medium text-foreground">Sem pagamentos a validar</p>
          <p className="text-xs text-muted-foreground mt-1">Tudo em dia 🎉</p>
        </div>
      )}

      <div className="space-y-2">
        {list.map(p => (
          <div key={p.id} className="rounded-xl border border-info/20 bg-info/[0.02] p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm font-medium text-foreground">{p.studentName} — {p.conceito}</p>
                <p className="text-xs text-muted-foreground">{p.referencia} · {p.metodo} · Submetido {p.paidDate && new Date(p.paidDate).toLocaleDateString('pt-PT', { month: 'short', day: 'numeric' })}</p>
              </div>
              <span className="font-heading text-base font-bold text-foreground">{p.paidAmount.toLocaleString('pt-PT')} MT</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => decide(p.id, 'validar')} className="rounded-lg bg-success px-3 py-1.5 text-xs font-medium text-success-foreground hover:bg-success/90 transition-colors active:scale-95">
                <CheckCircle className="h-3 w-3 inline mr-1" />Validar
              </button>
              <button onClick={() => decide(p.id, 'rejeitar')} className="rounded-lg bg-destructive px-3 py-1.5 text-xs font-medium text-destructive-foreground hover:bg-destructive/90 transition-colors active:scale-95">
                Rejeitar
              </button>
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
export function FinanceObligations() {
  const statusVariant = (s: string) => s === 'pago' ? 'success' as const : s === 'atrasado' ? 'destructive' as const : 'muted' as const;
  const statusLabel = (s: string) => s === 'pago' ? 'Pago' : s === 'atrasado' ? 'Atrasado' : 'Activo';
  const catLabel = (c: string) => c === 'propina' ? 'Propina' : c === 'multa' ? 'Multa' : c === 'matricula' ? 'Matrícula' : c === 'material' ? 'Material' : 'Actividade';

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Obrigações</h1>
        <p className="mt-1 text-sm text-muted-foreground">Gerir obrigações financeiras dos alunos.</p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatsCard label="Activas" value={obligations.filter(o => o.status === 'activo').length} icon={FileText} variant="primary" />
        <StatsCard label="Atrasadas" value={obligations.filter(o => o.status === 'atrasado').length} icon={AlertTriangle} />
        <StatsCard label="Pagas" value={obligations.filter(o => o.status === 'pago').length} icon={CheckCircle} />
        <StatsCard label="Valor Total" value={`${obligations.reduce((s, o) => s + o.amount, 0).toLocaleString('pt-PT')} MT`} icon={Wallet} />
      </div>

      <div className="space-y-1.5">
        {obligations.map(o => (
          <div key={o.id} className={cn('flex items-center gap-3 rounded-xl border bg-card px-4 py-3', o.status === 'atrasado' ? 'border-destructive/20' : 'border-border')}>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{o.conceito}</p>
              <p className="text-xs text-muted-foreground">{o.studentName} · {catLabel(o.categoria)} · Venc. {new Date(o.dueDate).toLocaleDateString('pt-PT', { month: 'short', day: 'numeric' })}</p>
            </div>
            <span className="font-heading text-sm font-bold text-foreground">{o.amount.toLocaleString('pt-PT')} MT</span>
            <StatusBadge label={statusLabel(o.status)} variant={statusVariant(o.status)} dot />
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

/* ─── CONTAS ─── */
export function FinanceAccounts() {
  const navigate = useNavigate();
  const statusVariant = (s: string) => s === 'quite' ? 'success' as const : s === 'inadimplente' ? 'destructive' as const : 'muted' as const;
  const statusLabel = (s: string) => s === 'quite' ? 'Quite' : s === 'inadimplente' ? 'Inadimplente' : 'Regular';

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Contas de Alunos</h1>
        <p className="mt-1 text-sm text-muted-foreground">Contas individuais dos alunos.</p>
      </div>

      <div className="space-y-2">
        {financeAccounts.map(a => (
          <button key={a.id} onClick={() => navigate(`/app/finance/debtors`)} className="w-full text-left rounded-xl border border-border bg-card p-4 hover:shadow-sm transition-all active:scale-[0.997]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted font-heading text-xs font-bold">{a.studentName.split(' ').map(n => n[0]).join('')}</div>
                <div>
                  <p className="text-sm font-medium text-foreground">{a.studentName}</p>
                  <p className="text-xs text-muted-foreground">{a.studentId}{a.ultimoPagamento && ` · Últ. pag.: ${new Date(a.ultimoPagamento).toLocaleDateString('pt-PT', { month: 'short', day: 'numeric' })}`}</p>
                </div>
              </div>
              <StatusBadge label={statusLabel(a.status)} variant={statusVariant(a.status)} dot />
            </div>
            <div className="grid grid-cols-3 gap-2 mt-3">
              <div className="rounded-lg bg-muted/50 p-2 text-center">
                <p className="text-[10px] text-muted-foreground">Devido</p>
                <p className="font-heading text-sm font-bold text-foreground">{a.totalDevido.toLocaleString('pt-PT')} MT</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-2 text-center">
                <p className="text-[10px] text-muted-foreground">Pago</p>
                <p className="font-heading text-sm font-bold text-success">{a.totalPago.toLocaleString('pt-PT')} MT</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-2 text-center">
                <p className="text-[10px] text-muted-foreground">Saldo</p>
                <p className={cn('font-heading text-sm font-bold', a.saldo > 0 ? 'text-warning' : 'text-success')}>{a.saldo.toLocaleString('pt-PT')} MT</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </PageContainer>
  );
}

/* ─── RECIBOS ─── */
export function FinanceReceipts() {
  const paidPayments = paymentsSeed.filter(p => ['pago', 'validado'].includes(p.status));
  const [active, setActive] = useState<typeof paidPayments[number] | null>(null);

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Recibos</h1>
        <p className="mt-1 text-sm text-muted-foreground">Gerar e gerir recibos de pagamento.</p>
      </div>

      <div className="space-y-1.5">
        {paidPayments.map(p => (
          <button key={p.id} onClick={() => setActive(p)} className="w-full text-left flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:shadow-sm transition-all active:scale-[0.997]">
            <Receipt className="h-4 w-4 text-muted-foreground shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{p.studentName} — {p.conceito}</p>
              <p className="text-xs text-muted-foreground">{p.referencia} · {p.metodo} · {p.paidDate && new Date(p.paidDate).toLocaleDateString('pt-PT', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
            </div>
            <span className="font-heading text-sm font-bold text-foreground">{p.paidAmount.toLocaleString('pt-PT')} MT</span>
            <span className="rounded-lg bg-muted px-2.5 py-1 text-xs font-medium text-foreground">
              <Download className="h-3 w-3 inline mr-1" />PDF
            </span>
          </button>
        ))}
      </div>

      {active && <ReceiptPreview open={!!active} onOpenChange={(o) => !o && setActive(null)} receipt={{ studentName: active.studentName, conceito: active.conceito, amount: active.paidAmount, metodo: active.metodo, referencia: active.referencia, date: active.paidDate }} />}
    </PageContainer>
  );
}

/* ─── MULTAS ─── */
export function FinancePenalties() {
  const overduePayments = paymentsSeed.filter(p => p.status === 'atrasado');

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Multas</h1>
        <p className="mt-1 text-sm text-muted-foreground">Gestão de multas e penalizações.</p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3">
        <StatsCard label="Itens em Atraso" value={overduePayments.length} icon={AlertTriangle} variant="primary" />
        <StatsCard label="Total em Atraso" value={`${financeStats.totalAtrasado.toLocaleString('pt-PT')} MT`} icon={Wallet} />
      </div>

      <div className="space-y-1.5">
        {overduePayments.map(p => (
          <div key={p.id} className="flex items-center gap-3 rounded-xl border border-destructive/20 bg-destructive/[0.02] px-4 py-3">
            <AlertTriangle className="h-4 w-4 text-destructive shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{p.studentName} — {p.conceito}</p>
              <p className="text-xs text-destructive">Venc. {new Date(p.dueDate).toLocaleDateString('pt-PT', { month: 'short', day: 'numeric' })} · {Math.max(0, Math.floor((Date.now() - new Date(p.dueDate).getTime()) / 86400000))} dias em atraso</p>
            </div>
            <span className="font-heading text-sm font-bold text-destructive">{p.amount.toLocaleString('pt-PT')} MT</span>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

/* ─── TESOURARIA ─── */
export function FinanceTreasury() {
  const totalInflow = paymentsSeed.filter(p => ['pago', 'validado'].includes(p.status)).reduce((s, p) => s + p.paidAmount, 0);
  const totalOutstanding = paymentsSeed.filter(p => ['pendente', 'atrasado', 'parcial'].includes(p.status)).reduce((s, p) => s + (p.amount - p.paidAmount), 0);

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Tesouraria</h1>
        <p className="mt-1 text-sm text-muted-foreground">Fluxo de caixa e operações de tesouraria.</p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatsCard label="Total Entrada" value={`${totalInflow.toLocaleString('pt-PT')} MT`} icon={ArrowDownRight} variant="primary" trend="+12% vs mês anterior" trendUp />
        <StatsCard label="Pendente" value={`${totalOutstanding.toLocaleString('pt-PT')} MT`} icon={Clock} />
        <StatsCard label="Em Atraso" value={`${financeStats.totalAtrasado.toLocaleString('pt-PT')} MT`} icon={AlertTriangle} />
        <StatsCard label="Taxa de Cobrança" value="68%" icon={TrendingUp} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5">
          <SectionHeader title="Resumo Mensal" />
          <div className="mt-4 space-y-3">
            {[
              { month: 'Abril 2026', inflow: 20000, outflow: 0 },
              { month: 'Março 2026', inflow: 37500, outflow: 1200 },
              { month: 'Fevereiro 2026', inflow: 5000, outflow: 800 },
              { month: 'Janeiro 2026', inflow: 15000, outflow: 500 },
            ].map((m, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-muted/30 transition-colors">
                <span className="text-sm font-medium text-foreground">{m.month}</span>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 text-xs font-medium text-success"><ArrowDownRight className="h-3 w-3" />{m.inflow.toLocaleString('pt-PT')} MT</span>
                  {m.outflow > 0 && <span className="flex items-center gap-1 text-xs font-medium text-destructive"><ArrowUpRight className="h-3 w-3" />{m.outflow.toLocaleString('pt-PT')} MT</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <SectionHeader title="Indicadores" />
          <div className="mt-4 space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-xs text-muted-foreground">Taxa de Cobrança</span>
                <span className="text-xs font-medium text-foreground">68%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted"><div className="h-2 rounded-full bg-primary" style={{ width: '68%' }} /></div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-xs text-muted-foreground">Pagamento Pontual</span>
                <span className="text-xs font-medium text-foreground">82%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted"><div className="h-2 rounded-full bg-success" style={{ width: '82%' }} /></div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-xs text-muted-foreground">Taxa de Inadimplência</span>
                <span className="text-xs font-medium text-foreground">8%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted"><div className="h-2 rounded-full bg-destructive" style={{ width: '8%' }} /></div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

/* ─── RELATÓRIOS ─── */
export function FinanceReports() {
  const reports: { name: string; period: string; generated: string; status: 'pronto' | 'pendente' }[] = [
    { name: 'Relatório Mensal de Receitas', period: 'Abril 2026', generated: 'Automático', status: 'pronto' },
    { name: 'Relatório de Contas em Atraso', period: '1º Trimestre 2026', generated: 'Manual', status: 'pronto' },
    { name: 'Resumo de Cobranças', period: 'Março 2026', generated: 'Automático', status: 'pronto' },
    { name: 'Extractos de Conta', period: '2º Trimestre', generated: 'A pedido', status: 'pendente' },
    { name: 'Resumo Financeiro Anual', period: '2025-2026', generated: 'Agendado', status: 'pendente' },
  ];
  const [active, setActive] = useState<typeof reports[number] | null>(null);

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Relatórios</h1>
        <p className="mt-1 text-sm text-muted-foreground">Relatórios e analítica financeira.</p>
      </div>

      <div className="space-y-1.5">
        {reports.map((r, i) => (
          <button key={i} onClick={() => setActive(r)} className="w-full text-left flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:shadow-sm transition-all active:scale-[0.997]">
            <BarChart3 className="h-4 w-4 text-muted-foreground shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{r.name}</p>
              <p className="text-xs text-muted-foreground">{r.period} · {r.generated}</p>
            </div>
            <StatusBadge label={r.status === 'pronto' ? 'Pronto' : 'Pendente'} variant={r.status === 'pronto' ? 'success' : 'muted'} />
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        ))}
      </div>

      <ReportPreviewModal open={!!active} onOpenChange={(o) => !o && setActive(null)} title={active?.name ?? ''} period={active?.period} withExcel>
        <ul className="text-xs text-foreground space-y-1.5 list-disc list-inside">
          <li>Total validado: {financeStats.totalValidado.toLocaleString('pt-PT')} MT</li>
          <li>Em atraso: {financeStats.totalAtrasado.toLocaleString('pt-PT')} MT</li>
          <li>Pendentes de validação: {financeStats.pendentesValidacao}</li>
          <li>Alunos inadimplentes: {financeStats.alunosInadimplentes}</li>
        </ul>
      </ReportPreviewModal>
    </PageContainer>
  );
}
