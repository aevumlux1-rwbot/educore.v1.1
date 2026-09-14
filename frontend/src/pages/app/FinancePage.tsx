import { useState, useEffect } from 'react';
import { Wallet, TrendingUp, AlertTriangle, CheckCircle, Receipt, CreditCard, FileText, Download, Clock, XCircle, ArrowUpRight, ArrowDownLeft, ChevronRight } from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { SectionHeader } from '@/components/ui/section-header';
import { InvoiceCard } from '@/components/finance/InvoiceCard';
import { CategoryPill } from '@/components/knowledge/CategoryPill';
import { EmptyState } from '@/components/states/EmptyState';
import { LoadingState } from '@/components/states/LoadingState';
import { PaymentStatusBadge, type PaymentStatus } from '@/components/finance/PaymentStatusBadge';
import { cn } from '@/lib/utils';

const tabs = ['Overview', 'Obligations', 'Payments', 'Receipts'];

interface FinanceItem {
  id: string;
  concept: string;
  amount: string;
  dueDate: string;
  status: PaymentStatus;
  student?: string;
  paidAmount?: string;
  paidDate?: string;
  category: 'obligation' | 'payment' | 'receipt';
}

const financeItems: FinanceItem[] = [
  { id: 'OBL-2025-001', concept: 'Tuition Fee — Term 2', amount: '$2,400', dueDate: 'Jul 15, 2025', status: 'pending', category: 'obligation' },
  { id: 'OBL-2025-002', concept: 'Lab Fee — Chemistry', amount: '$150', dueDate: 'Jun 30, 2025', status: 'due_soon', category: 'obligation' },
  { id: 'OBL-2024-018', concept: 'Library Fine', amount: '$25', dueDate: 'Jun 1, 2025', status: 'overdue', category: 'obligation' },
  { id: 'OBL-2025-003', concept: 'Sports Equipment Rental', amount: '$80', dueDate: 'Aug 1, 2025', status: 'pending', category: 'obligation' },
  { id: 'OBL-2025-004', concept: 'Field Trip — Biology', amount: '$60', dueDate: 'Jul 5, 2025', status: 'partial', paidAmount: '$30', category: 'obligation' },
  { id: 'OBL-2025-005', concept: 'Exam Re-sit Fee', amount: '$45', dueDate: 'Jul 20, 2025', status: 'under_review', category: 'obligation' },
  { id: 'OBL-2025-006', concept: 'Technology Fee', amount: '$120', dueDate: 'Jul 10, 2025', status: 'rejected', category: 'obligation' },
  { id: 'PAY-2025-011', concept: 'Tuition Fee — Term 1', amount: '$2,400', dueDate: 'Jan 15, 2025', status: 'validated', paidDate: 'Jan 12, 2025', category: 'payment' },
  { id: 'PAY-2024-042', concept: 'Registration Fee', amount: '$350', dueDate: 'Dec 1, 2024', status: 'validated', paidDate: 'Nov 28, 2024', category: 'payment' },
  { id: 'PAY-2025-012', concept: 'Lab Fee — Physics', amount: '$150', dueDate: 'Feb 15, 2025', status: 'paid', paidDate: 'Feb 10, 2025', category: 'payment' },
  { id: 'PAY-2025-013', concept: 'Student Activity Fee', amount: '$200', dueDate: 'Mar 1, 2025', status: 'validated', paidDate: 'Feb 28, 2025', category: 'payment' },
];

const timelineEvents = [
  { date: 'Jun 30, 2025', label: 'Lab Fee — Chemistry due', type: 'upcoming' as const, amount: '$150' },
  { date: 'Jun 1, 2025', label: 'Library Fine overdue', type: 'overdue' as const, amount: '$25' },
  { date: 'Feb 28, 2025', label: 'Student Activity Fee paid', type: 'paid' as const, amount: '$200' },
  { date: 'Feb 10, 2025', label: 'Lab Fee — Physics paid', type: 'paid' as const, amount: '$150' },
  { date: 'Jan 12, 2025', label: 'Tuition Fee — Term 1 paid', type: 'paid' as const, amount: '$2,400' },
  { date: 'Nov 28, 2024', label: 'Registration Fee paid', type: 'paid' as const, amount: '$350' },
];

const timelineDotColor = {
  upcoming: 'bg-warning',
  overdue: 'bg-destructive',
  paid: 'bg-success',
};

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, [activeTab]);

  const obligations = financeItems.filter(i => i.category === 'obligation');
  const payments = financeItems.filter(i => i.category === 'payment');
  const receipts = financeItems.filter(i => ['validated'].includes(i.status));

  const urgentItems = obligations.filter(o => o.status === 'overdue' || o.status === 'rejected');
  const activeObligations = obligations.filter(o => !['paid', 'validated'].includes(o.status));

  const filteredObligations = statusFilter === 'all'
    ? obligations
    : obligations.filter(o => o.status === statusFilter);

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Finance</h1>
        <p className="mt-1 text-sm text-muted-foreground">Obligations, payments, validation status, and receipts.</p>
      </div>

      <div className="mb-6 flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {tabs.map((tab) => (
          <CategoryPill key={tab} label={tab} active={activeTab === tab} onClick={() => setActiveTab(tab)} />
        ))}
      </div>

      {loading ? (
        <LoadingState variant="detail" />
      ) : (
        <>
          {activeTab === 'Overview' && (
            <div className="space-y-6">
              {/* Current Account */}
              <div className="rounded-2xl bg-surface-dark p-5">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-surface-dark-foreground/40">Current Account Balance</p>
                    <p className="mt-1.5 font-heading text-3xl font-bold text-surface-dark-foreground">-$2,880<span className="text-lg">.00</span></p>
                    <p className="mt-1 text-xs text-surface-dark-foreground/50">7 active obligations · 4 payments completed</p>
                  </div>
                  <button className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors active:scale-[0.97]">
                    <CreditCard className="mr-1.5 inline h-4 w-4" />Make Payment
                  </button>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-4 border-t border-surface-dark-foreground/10 pt-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/15">
                      <ArrowDownLeft className="h-3.5 w-3.5 text-success" />
                    </div>
                    <div>
                      <p className="text-[10px] text-surface-dark-foreground/40">Last payment</p>
                      <p className="text-sm font-semibold text-surface-dark-foreground">$200 <span className="font-normal text-surface-dark-foreground/50">· Feb 28</span></p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-warning/15">
                      <ArrowUpRight className="h-3.5 w-3.5 text-warning" />
                    </div>
                    <div>
                      <p className="text-[10px] text-surface-dark-foreground/40">Next due</p>
                      <p className="text-sm font-semibold text-surface-dark-foreground">$150 <span className="font-normal text-surface-dark-foreground/50">· Jun 30</span></p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary stats */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-2xl border border-border bg-card p-4 transition-all hover:shadow-sm">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted"><Wallet className="h-4 w-4 text-muted-foreground" /></div>
                  <p className="mt-3 font-heading text-xl font-bold text-foreground">$2,880</p>
                  <p className="text-xs text-muted-foreground">Total Due</p>
                </div>
                <div className="rounded-2xl border border-border bg-card p-4 transition-all hover:shadow-sm">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/10"><CheckCircle className="h-4 w-4 text-success" /></div>
                  <p className="mt-3 font-heading text-xl font-bold text-foreground">$3,100</p>
                  <p className="text-xs text-success">Total Paid</p>
                </div>
                <div className="rounded-2xl border border-border bg-card p-4 transition-all hover:shadow-sm">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-destructive/10"><AlertTriangle className="h-4 w-4 text-destructive" /></div>
                  <p className="mt-3 font-heading text-xl font-bold text-destructive">$25</p>
                  <p className="text-xs text-destructive">Overdue</p>
                </div>
                <div className="rounded-2xl border border-border bg-card p-4 transition-all hover:shadow-sm">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-warning/10"><Clock className="h-4 w-4 text-warning" /></div>
                  <p className="mt-3 font-heading text-xl font-bold text-foreground">$2,855</p>
                  <p className="text-xs text-warning">Pending</p>
                </div>
              </div>

              {/* Urgent alerts */}
              {urgentItems.length > 0 && (
                <div className="space-y-2">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-destructive">Requires Immediate Attention</p>
                  {obligations.filter(o => o.status === 'overdue').map(o => (
                    <div key={o.id} className="flex items-center gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-3.5 transition-all hover:border-destructive/30">
                      <AlertTriangle className="h-4 w-4 text-destructive shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{o.concept}</p>
                        <p className="text-xs text-muted-foreground">{o.amount} overdue since {o.dueDate}</p>
                      </div>
                      <button className="shrink-0 rounded-lg bg-destructive px-3 py-1.5 text-xs font-medium text-destructive-foreground hover:bg-destructive/90 transition-colors active:scale-95">Pay Now</button>
                    </div>
                  ))}
                  {obligations.filter(o => o.status === 'rejected').map(o => (
                    <div key={o.id} className="flex items-center gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-3.5 transition-all hover:border-destructive/30">
                      <XCircle className="h-4 w-4 text-destructive shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{o.concept}</p>
                        <p className="text-xs text-muted-foreground">Payment rejected — please retry</p>
                      </div>
                      <button className="shrink-0 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors active:scale-95">Retry</button>
                    </div>
                  ))}
                </div>
              )}

              {/* Active Obligations */}
              <div>
                <SectionHeader title="Active Obligations" subtitle={`${activeObligations.length} items pending`} action={
                  <button onClick={() => setActiveTab('Obligations')} className="flex items-center gap-0.5 text-xs font-medium text-primary hover:underline">
                    View All <ChevronRight className="h-3 w-3" />
                  </button>
                } />
                <div className="mt-3 space-y-2">
                  {activeObligations.slice(0, 4).map((o) => (
                    <InvoiceCard key={o.id} {...o} />
                  ))}
                </div>
              </div>

              {/* Recent Payments */}
              <div>
                <SectionHeader title="Recent Payments" subtitle={`${payments.length} completed`} action={
                  <button onClick={() => setActiveTab('Payments')} className="flex items-center gap-0.5 text-xs font-medium text-primary hover:underline">
                    View All <ChevronRight className="h-3 w-3" />
                  </button>
                } />
                <div className="mt-3 space-y-2">
                  {payments.slice(0, 3).map((o) => (
                    <InvoiceCard key={o.id} {...o} />
                  ))}
                </div>
              </div>

              {/* Transaction Timeline */}
              <div className="rounded-2xl border border-border bg-card p-5">
                <SectionHeader title="Transaction Timeline" subtitle="Chronological history" />
                <div className="mt-4 space-y-0">
                  {timelineEvents.map((ev, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className={cn('h-2.5 w-2.5 rounded-full mt-1', timelineDotColor[ev.type])} />
                        {i < timelineEvents.length - 1 && <div className="w-px flex-1 bg-border" />}
                      </div>
                      <div className="pb-4 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-sm font-medium text-foreground">{ev.label}</p>
                            <p className="text-xs text-muted-foreground">{ev.date}</p>
                          </div>
                          <span className={cn(
                            'font-heading text-sm font-bold',
                            ev.type === 'paid' ? 'text-success' : ev.type === 'overdue' ? 'text-destructive' : 'text-foreground'
                          )}>
                            {ev.type === 'paid' ? '-' : ''}{ev.amount}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Obligations' && (
            <div className="space-y-4">
              <div className="flex gap-2 flex-wrap">
                {['all', 'pending', 'due_soon', 'overdue', 'partial', 'under_review', 'rejected'].map(s => (
                  <CategoryPill key={s} label={s === 'all' ? 'All' : s.replace(/_/g, ' ')} active={statusFilter === s} onClick={() => setStatusFilter(s)} />
                ))}
              </div>
              <div className="space-y-2">
                {filteredObligations.map(o => <InvoiceCard key={o.id} {...o} />)}
                {filteredObligations.length === 0 && (
                  <EmptyState title="No obligations found" description="No items match the selected filter." />
                )}
              </div>
            </div>
          )}

          {activeTab === 'Payments' && (
            <div className="space-y-2">
              {payments.length > 0 ? (
                payments.map(o => <InvoiceCard key={o.id} {...o} />)
              ) : (
                <EmptyState icon={CreditCard} title="No payments yet" description="Your completed payments will appear here." />
              )}
            </div>
          )}

          {activeTab === 'Receipts' && (
            <div className="space-y-3">
              {receipts.length > 0 ? (
                receipts.map(o => (
                  <div key={o.id} className="flex items-center gap-4 rounded-xl border border-border bg-card px-4 py-3.5 transition-all hover:shadow-sm hover:border-primary/10">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10"><Receipt className="h-4 w-4 text-success" /></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{o.concept}</p>
                      <p className="text-xs text-muted-foreground">{o.id} · Validated {o.paidDate}</p>
                    </div>
                    <span className="font-heading text-sm font-bold text-foreground">{o.amount}</span>
                    <button className="flex items-center gap-1 rounded-lg bg-muted px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted/80 transition-colors active:scale-95">
                      <Download className="h-3 w-3" /> PDF
                    </button>
                  </div>
                ))
              ) : (
                <EmptyState icon={Receipt} title="No receipts available" description="Validated payment receipts will appear here." />
              )}
            </div>
          )}
        </>
      )}
    </PageContainer>
  );
}
