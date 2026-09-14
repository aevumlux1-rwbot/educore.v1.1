import { cn } from '@/lib/utils';

interface GradeCardProps {
  subject: string;
  evaluation: string;
  grade: string;
  maxGrade: string;
  date: string;
  status: 'published' | 'pending' | 'reviewed';
}

const statusStyles = {
  published: 'bg-success/10 text-success',
  pending: 'bg-warning/10 text-warning',
  reviewed: 'bg-info/10 text-info',
};

export function GradeCard({ subject, evaluation, grade, maxGrade, date, status }: GradeCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:bg-muted/30">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
        <span className="font-heading text-sm font-bold text-primary">{grade}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{subject}</p>
        <p className="text-xs text-muted-foreground">{evaluation} · {date}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">/{maxGrade}</span>
        <span className={cn('rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase', statusStyles[status])}>
          {status}
        </span>
      </div>
    </div>
  );
}
