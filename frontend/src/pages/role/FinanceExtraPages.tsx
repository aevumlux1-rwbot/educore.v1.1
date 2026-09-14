import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { PageContainer } from '@/components/layout/PageContainer';
import { SectionHeader } from '@/components/ui/section-header';
import { StatusBadge } from '@/components/ui/status-badge';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { InvoicePreview } from '@/components/shared/InvoicePreview';
import { ReceiptPreview } from '@/components/shared/ReceiptPreview';
import { ReportPreviewModal } from '@/components/shared/ReportPreviewModal';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { invoices, debtors, payments, financeStats } from '@/data/mockData';
import type { Invoice, Debtor } from '@/data/mockData';
import { ArrowLeft, Bell, AlertTriangle, Wallet, CheckCircle, FileText, Receipt as ReceiptIcon, Send, ChevronRight } from 'lucide-react';

/* ─── DETALHE DE PAGAMENTO ─── */
export function FinancePaymentDetail() {
  const { paymentId } = useParams();
  const navigate = useNavigate();
  const [p, setP] = useState(payments.find(x => x.id === paymentId));
  const [receiptOpen, setReceiptOpen] = useState(false);

  if (!p) return <PageContainer><p className="text-sm text-muted-foreground">Pagamento não encontrado.</p></PageContainer>;

  const confirm = () => { setP({ ...p, status: 'validado' }); toast.success('Pagamento confirmado.'); };
  const reject = () => { setP({ ...p, status: 'rejeitado' }); toast.success('Pagamento rejeitado.'); };

  return (
    <PageContainer>
      <button onClick={() => navigate('/app/finance/payments')} className="mb-4 flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"><ArrowLeft className="h-3.5 w-3.5" /> Pagamentos</button>

      <div className="mb-5 rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-transparent p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="font-heading text-xl font-bold text-foreground">{p.conceito}</h1>
            <p className="text-xs text-muted-foreground">{p.studentName} · {p.referencia ?? 'Sem referência'}</p>
          </div>
          <span className="font-heading text-2xl font-bold text-foreground">{p.amount.toLocaleString('pt-PT')} MT</span>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 mb-4 space-y-1.5 text-xs">
        <div className="flex justify-between"><span className="text-muted-foreground">Aluno</span><span className="text-foreground">{p.studentName} ({p.studentId})</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Método</span><span className="text-foreground">{p.metodo ?? '—'}</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Vencimento</span><span className="text-foreground">{new Date(p.dueDate).toLocaleDateString('pt-PT')}</span></div>
        {p.paidDate && <div className="flex justify-between"><span className="text-muted-foreground">Pago em</span><span className="text-foreground">{new Date(p.paidDate).toLocaleDateString('pt-PT')}</span></div>}
        <div className="flex justify-between"><span className="text-muted-foreground">Estado</span><StatusBadge label={p.status} variant={p.status === 'validado' || p.status === 'pago' ? 'success' : p.status === 'atrasado' || p.status === 'rejeitado' ? 'destructive' : p.status === 'em_revisao' ? 'info' : 'muted'} /></div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 mb-4">
        <SectionHeader title="Comprovativo" />
        <div className="mt-3 aspect-video rounded-xl bg-muted/40 flex items-center justify-center text-xs text-muted-foreground">Pré-visualização do comprovativo</div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <button onClick={reject} className="rounded-xl border border-destructive/40 bg-destructive/5 py-2.5 text-xs font-semibold text-destructive hover:bg-destructive/10">Rejeitar</button>
        <button onClick={confirm} className="rounded-xl bg-success py-2.5 text-xs font-semibold text-success-foreground hover:bg-success/90">Confirmar</button>
        <button onClick={() => setReceiptOpen(true)} disabled={p.status !== 'validado' && p.status !== 'pago'} className="rounded-xl border border-border bg-card py-2.5 text-xs font-medium text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed">Emitir Recibo</button>
        <button onClick={() => navigate('/app/finance/invoices')} className="rounded-xl border border-border bg-card py-2.5 text-xs font-medium text-foreground hover:bg-muted">Ver Factura</button>
      </div>

      <ReceiptPreview open={receiptOpen} onOpenChange={setReceiptOpen} receipt={{ studentName: p.studentName, conceito: p.conceito, amount: p.amount, metodo: p.metodo, referencia: p.referencia, date: p.paidDate }} />
    </PageContainer>
  );
}

/* ─── FACTURAS ─── */
export function FinanceInvoices() {
  const [filter, setFilter] = useState('all');
  const [active, setActive] = useState<Invoice | null>(null);
  const filtered = invoices.filter(i => filter === 'all' || i.status === filter);

  return (
    <PageContainer>
      <div className="mb-5">
        <h1 className="font-heading text-2xl font-bold text-foreground">Facturas</h1>
        <p className="mt-1 text-sm text-muted-foreground">Emissão e consulta de facturas.</p>
      </div>

      <div className="mb-4 max-w-xs">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="emitida">Emitidas</SelectItem>
            <SelectItem value="paga">Pagas</SelectItem>
            <SelectItem value="vencida">Vencidas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        {filtered.map(inv => (
          <button key={inv.id} onClick={() => setActive(inv)} className="w-full text-left flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:shadow-sm transition-all active:scale-[0.997]">
            <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{inv.number} — {inv.studentName}</p>
              <p className="text-[11px] text-muted-foreground">Venc. {new Date(inv.dueDate).toLocaleDateString('pt-PT')} · {inv.turma}</p>
            </div>
            <span className="font-heading text-sm font-bold text-foreground">{inv.total.toLocaleString('pt-PT')} MT</span>
            <StatusBadge label={inv.status === 'paga' ? 'Paga' : inv.status === 'vencida' ? 'Vencida' : inv.status === 'cancelada' ? 'Cancelada' : 'Emitida'} variant={inv.status === 'paga' ? 'success' : inv.status === 'vencida' ? 'destructive' : 'info'} />
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        ))}
      </div>

      {active && <InvoicePreview open={!!active} onOpenChange={(o) => !o && setActive(null)} invoice={active} />}
    </PageContainer>
  );
}

export function FinanceInvoiceDetail() {
  const { invoiceId } = useParams();
  const navigate = useNavigate();
  const inv = invoices.find(i => i.id === invoiceId);
  const [open, setOpen] = useState(true);

  if (!inv) return <PageContainer><p className="text-sm text-muted-foreground">Factura não encontrada.</p></PageContainer>;

  return (
    <PageContainer>
      <button onClick={() => navigate('/app/finance/invoices')} className="mb-4 flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"><ArrowLeft className="h-3.5 w-3.5" /> Facturas</button>
      <button onClick={() => setOpen(true)} className="w-full rounded-xl border border-border bg-card py-3 text-sm font-medium text-foreground hover:bg-muted">Abrir factura {inv.number}</button>
      <InvoicePreview open={open} onOpenChange={(o) => { setOpen(o); if (!o) navigate('/app/finance/invoices'); }} invoice={inv} />
    </PageContainer>
  );
}

/* ─── DEVEDORES ─── */
export function FinanceDebtors() {
  const [search, setSearch] = useState('');
  const [active, setActive] = useState<Debtor | null>(null);
  const filtered = debtors.filter(d => search === '' || d.studentName.toLowerCase().includes(search.toLowerCase()) || d.turma.toLowerCase().includes(search.toLowerCase()));
  const total = debtors.reduce((s, d) => s + d.totalDebt, 0);

  const sendReminder = (d: Debtor) => { toast.success(`Lembrete enviado a ${d.guardianName}.`); };

  return (
    <PageContainer>
      <div className="mb-5">
        <h1 className="font-heading text-2xl font-bold text-foreground">Devedores</h1>
        <p className="mt-1 text-sm text-muted-foreground">Alunos com obrigações por liquidar.</p>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatsCard label="Total Devedores" value={debtors.length} icon={AlertTriangle} variant="primary" />
        <StatsCard label="Dívida Total" value={`${total.toLocaleString('pt-PT')} MT`} icon={Wallet} />
        <StatsCard label="Críticos" value={debtors.filter(d => d.status === 'critico').length} icon={AlertTriangle} />
      </div>

      <div className="mb-4 max-w-md">
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Pesquisar aluno ou turma…" className="rounded-xl" />
      </div>

      <div className="space-y-1.5">
        {filtered.length === 0 && <p className="text-center text-xs text-muted-foreground py-6">Sem devedores para o filtro.</p>}
        {filtered.map(d => (
          <button key={d.studentId} onClick={() => setActive(d)} className={cn('w-full text-left flex items-center gap-3 rounded-xl border bg-card px-4 py-3 hover:shadow-sm transition-all active:scale-[0.997]', d.status === 'critico' ? 'border-destructive/30' : 'border-border')}>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{d.studentName}</p>
              <p className="text-[11px] text-muted-foreground">{d.turma} · {d.guardianName} · {d.monthsLate} {d.monthsLate === 1 ? 'mês' : 'meses'} em atraso</p>
            </div>
            <span className={cn('font-heading text-sm font-bold', d.status === 'critico' ? 'text-destructive' : 'text-foreground')}>{d.totalDebt.toLocaleString('pt-PT')} MT</span>
            <StatusBadge label={d.status === 'critico' ? 'Crítico' : d.status === 'atraso' ? 'Atraso' : 'Recente'} variant={d.status === 'critico' ? 'destructive' : d.status === 'atraso' ? 'warning' : 'info'} dot />
          </button>
        ))}
      </div>

      {active && (
        <DebtorDetailSheet debtor={active} onClose={() => setActive(null)} onReminder={() => { sendReminder(active); setActive(null); }} onRegisterPayment={() => { toast.success('Pagamento registado (demo).'); setActive(null); }} />
      )}
    </PageContainer>
  );
}

function DebtorDetailSheet({ debtor, onClose, onReminder, onRegisterPayment }: { debtor: Debtor; onClose: () => void; onReminder: () => void; onRegisterPayment: () => void }) {
  const [statement, setStatement] = useState(false);
  const debtorPayments = payments.filter(p => p.studentId === debtor.studentId);
  const obligations = debtorPayments.filter(p => ['pendente', 'atrasado', 'parcial'].includes(p.status));
  const paid = debtorPayments.filter(p => ['pago', 'validado'].includes(p.status));

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/40" onClick={onClose} />
      <div className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-background border-l border-border flex flex-col">
        <div className="border-b border-border p-5">
          <h2 className="font-heading text-base font-semibold text-foreground">{debtor.studentName}</h2>
          <p className="text-xs text-muted-foreground">{debtor.turma} · {debtor.guardianName} · {debtor.guardianPhone}</p>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <div className="rounded-xl bg-destructive/5 border border-destructive/20 p-4 text-center">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Dívida total</p>
            <p className="font-heading text-2xl font-bold text-destructive">{debtor.totalDebt.toLocaleString('pt-PT')} MT</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Obrigações pendentes</p>
            <div className="space-y-1.5">
              {obligations.map(p => (
                <div key={p.id} className="flex items-center justify-between rounded-lg border border-border px-3 py-2 text-xs">
                  <span className="text-foreground">{p.conceito}</span>
                  <span className="font-semibold text-foreground">{p.amount.toLocaleString('pt-PT')} MT</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Recibos pagos</p>
            <div className="space-y-1.5">
              {paid.length === 0 && <p className="text-xs text-muted-foreground">Sem pagamentos registados.</p>}
              {paid.map(p => (
                <div key={p.id} className="flex items-center justify-between rounded-lg border border-border px-3 py-2 text-xs">
                  <span className="text-foreground">{p.conceito}</span>
                  <span className="font-semibold text-success">{p.paidAmount.toLocaleString('pt-PT')} MT</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-border p-4 bg-muted/20 grid grid-cols-3 gap-2">
          <button onClick={onReminder} className="rounded-xl border border-border bg-card py-2 text-[11px] font-medium text-foreground hover:bg-muted flex items-center justify-center gap-1"><Send className="h-3 w-3" />Lembrete</button>
          <button onClick={onRegisterPayment} className="rounded-xl border border-border bg-card py-2 text-[11px] font-medium text-foreground hover:bg-muted">Registar</button>
          <button onClick={() => setStatement(true)} className="rounded-xl bg-primary py-2 text-[11px] font-semibold text-primary-foreground hover:bg-primary/90">Extracto</button>
        </div>
      </div>
      <ReportPreviewModal open={statement} onOpenChange={setStatement} title="Extracto de Conta" period={debtor.studentName} withExcel>
        <table className="w-full text-xs">
          <thead><tr className="border-b border-border text-left text-muted-foreground"><th className="py-1.5 font-medium">Conceito</th><th className="py-1.5 font-medium text-right">Valor</th><th className="py-1.5 font-medium">Estado</th></tr></thead>
          <tbody>
            {debtorPayments.map(p => (
              <tr key={p.id} className="border-b border-border/50">
                <td className="py-1.5 text-foreground">{p.conceito}</td>
                <td className="py-1.5 text-right text-foreground font-medium">{p.amount.toLocaleString('pt-PT')} MT</td>
                <td className="py-1.5"><StatusBadge label={p.status} variant={['pago','validado'].includes(p.status) ? 'success' : p.status === 'atrasado' ? 'destructive' : 'muted'} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </ReportPreviewModal>
    </>
  );
}

/* ─── NOTIFICAÇÕES FINANÇAS ─── */
export function FinanceNotifications() {
  const navigate = useNavigate();
  const [items, setItems] = useState([
    { title: `${financeStats.pendentesValidacao} pagamento(s) a validar`, message: 'Submissões aguardam validação financeira.', type: 'alerta', time: '1h atrás', read: false, route: '/app/finance/validation' },
    { title: 'Devedores críticos', message: `${debtors.filter(d => d.status === 'critico').length} aluno(s) com 3+ meses em atraso.`, type: 'alerta', time: '5h atrás', read: false, route: '/app/finance/debtors' },
    { title: 'Factura emitida', message: 'FT 2026/0145 disponível para envio.', type: 'info', time: '1d atrás', read: true, route: '/app/finance/invoices' },
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