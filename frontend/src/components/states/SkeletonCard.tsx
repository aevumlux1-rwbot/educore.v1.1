import { cn } from '@/lib/utils';

interface SkeletonCardProps {
  className?: string;
  lines?: number;
}

export function SkeletonCard({ className, lines = 3 }: SkeletonCardProps) {
  return (
    <div className={cn('rounded-2xl border border-border bg-card p-5 space-y-3', className)}>
      <div className="h-3 w-1/3 rounded-md bg-muted animate-pulse" />
      <div className="h-6 w-1/2 rounded-md bg-muted animate-pulse" />
      {Array.from({ length: lines - 2 }).map((_, i) => (
        <div key={i} className="h-3 w-full rounded-md bg-muted animate-pulse" />
      ))}
    </div>
  );
}
