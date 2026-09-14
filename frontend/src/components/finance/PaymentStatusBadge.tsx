import { cn } from '@/lib/utils';

export type PaymentStatus = 'paid' | 'pending' | 'overdue' | 'due_soon' | 'partial' | 'validated' | 'under_review' | 'rejected';

const styles: Record<PaymentStatus, string> = {
  paid: 'bg-success/10 text-success',
  validated: 'bg-success/10 text-success',
  pending: 'bg-warning/10 text-warning',
  due_soon: 'bg-warning/10 text-warning',
  partial: 'bg-info/10 text-info',
  under_review: 'bg-info/10 text-info',
  overdue: 'bg-destructive/10 text-destructive',
  rejected: 'bg-destructive/10 text-destructive',
};

const labels: Record<PaymentStatus, string> = {
  paid: 'Paid',
  validated: 'Validated',
  pending: 'Pending',
  due_soon: 'Due Soon',
  partial: 'Partial',
  under_review: 'Under Review',
  overdue: 'Overdue',
  rejected: 'Rejected',
};

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
  className?: string;
}

export function PaymentStatusBadge({ status, className }: PaymentStatusBadgeProps) {
  return (
    <span className={cn('rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider', styles[status], className)}>
      {labels[status]}
    </span>
  );
}
