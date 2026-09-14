import { useNavigate } from 'react-router-dom';
import { Wallet, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface FinanceSummaryCardProps {
  totalDue: string;
  paid: string;
  overdue: string;
  pending: string;
}

export function FinanceSummaryCard({ totalDue, paid, overdue, pending }: FinanceSummaryCardProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate('/app/finance')}
      className="rounded-2xl border border-border bg-card p-5 transition-all hover:shadow-sm hover:border-primary/10 cursor-pointer active:scale-[0.99]"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-warning/10">
            <Wallet className="h-4 w-4 text-warning" />
          </div>
          <h3 className="font-heading text-sm font-semibold text-foreground">Financial Summary</h3>
        </div>
        <span className="text-xs font-medium text-primary">View →</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-muted/50 p-3">
          <p className="text-xs text-muted-foreground">Total Due</p>
          <p className="mt-1 font-heading text-lg font-bold text-foreground">{totalDue}</p>
        </div>
        <div className="rounded-xl bg-success/5 p-3">
          <div className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3 text-success" />
            <p className="text-xs text-success">Paid</p>
          </div>
          <p className="mt-1 font-heading text-lg font-bold text-foreground">{paid}</p>
        </div>
        <div className="rounded-xl bg-destructive/5 p-3">
          <div className="flex items-center gap-1">
            <AlertTriangle className="h-3 w-3 text-destructive" />
            <p className="text-xs text-destructive">Overdue</p>
          </div>
          <p className="mt-1 font-heading text-lg font-bold text-foreground">{overdue}</p>
        </div>
        <div className="rounded-xl bg-warning/5 p-3">
          <div className="flex items-center gap-1">
            <TrendingUp className="h-3 w-3 text-warning" />
            <p className="text-xs text-warning">Pending</p>
          </div>
          <p className="mt-1 font-heading text-lg font-bold text-foreground">{pending}</p>
        </div>
      </div>
    </div>
  );
}
