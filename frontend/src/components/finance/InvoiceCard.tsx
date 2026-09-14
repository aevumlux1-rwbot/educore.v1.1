import { FileText, CreditCard, Eye, Download, RotateCcw } from 'lucide-react';
import { PaymentStatusBadge, type PaymentStatus } from './PaymentStatusBadge';
import { cn } from '@/lib/utils';

interface InvoiceCardProps {
  id: string;
  concept: string;
  amount: string;
  dueDate: string;
  status: PaymentStatus;
  student?: string;
  paidAmount?: string;
  paidDate?: string;
  category?: 'obligation' | 'payment' | 'receipt';
}

const actionMap: Partial<Record<PaymentStatus, { label: string; icon: any }>> = {
  pending: { label: 'Pay Now', icon: CreditCard },
  due_soon: { label: 'Pay Now', icon: CreditCard },
  overdue: { label: 'Pay Now', icon: CreditCard },
  partial: { label: 'Complete', icon: CreditCard },
  paid: { label: 'Receipt', icon: Download },
  validated: { label: 'Receipt', icon: Download },
  under_review: { label: 'Status', icon: Eye },
  rejected: { label: 'Retry', icon: RotateCcw },
};

export function InvoiceCard({ id, concept, amount, dueDate, status, student, paidAmount, paidDate, category }: InvoiceCardProps) {
  const action = actionMap[status];
  const isUrgent = status === 'overdue' || status === 'rejected';

  return (
    <div className={cn(
      'flex items-center gap-4 rounded-xl border bg-card px-4 py-3.5 transition-all hover:shadow-sm active:scale-[0.995]',
      isUrgent ? 'border-destructive/20 hover:border-destructive/30' : 'border-border hover:border-primary/10'
    )}>
      <div className={cn(
        'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
        isUrgent ? 'bg-destructive/10' : 'bg-muted'
      )}>
        <FileText className={cn('h-4 w-4', isUrgent ? 'text-destructive' : 'text-muted-foreground')} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{concept}</p>
        <p className="text-xs text-muted-foreground">
          {id} · {paidDate ? `Paid ${paidDate}` : `Due ${dueDate}`}{student && ` · ${student}`}
        </p>
        {status === 'partial' && paidAmount && (
          <p className="mt-0.5 text-xs text-info">Paid {paidAmount} of {amount}</p>
        )}
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <div className="text-right">
          <span className={cn('font-heading text-sm font-bold', isUrgent ? 'text-destructive' : 'text-foreground')}>{amount}</span>
        </div>
        <PaymentStatusBadge status={status} />
        {action && (
          <button className={cn(
            'hidden sm:flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all active:scale-95',
            ['pending', 'due_soon', 'overdue', 'partial'].includes(status)
              ? 'bg-primary text-primary-foreground hover:bg-primary/90'
              : status === 'rejected'
              ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
              : 'bg-muted text-foreground hover:bg-muted/80'
          )}>
            <action.icon className="h-3 w-3" />
            {action.label}
          </button>
        )}
      </div>
    </div>
  );
}
