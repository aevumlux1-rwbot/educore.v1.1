import { cn } from '@/lib/utils';

interface SubjectCardProps {
  name: string;
  teacher: string;
  grade: string;
  gradeColor?: 'success' | 'warning' | 'destructive' | 'primary';
  progress: number;
  nextClass?: string;
}

const gradeColors = {
  success: 'text-success bg-success/10',
  warning: 'text-warning bg-warning/10',
  destructive: 'text-destructive bg-destructive/10',
  primary: 'text-primary bg-primary/10',
};

export function SubjectCard({ name, teacher, grade, gradeColor = 'primary', progress, nextClass }: SubjectCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 transition-all hover:shadow-md hover:border-primary/20">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-heading text-sm font-semibold text-foreground">{name}</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">{teacher}</p>
        </div>
        <span className={cn('rounded-lg px-2.5 py-1 text-xs font-bold', gradeColors[gradeColor])}>
          {grade}
        </span>
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium text-foreground">{progress}%</span>
        </div>
        <div className="mt-1.5 h-1.5 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      {nextClass && (
        <p className="mt-3 text-xs text-muted-foreground">
          Next: <span className="font-medium text-foreground">{nextClass}</span>
        </p>
      )}
    </div>
  );
}
