import { cn } from '@/lib/utils';

interface LoadingStateProps {
  className?: string;
  cards?: number;
  variant?: 'cards' | 'list' | 'detail';
}

export function LoadingState({ className, cards = 3, variant = 'cards' }: LoadingStateProps) {
  if (variant === 'list') {
    return (
      <div className={cn('space-y-2', className)}>
        {Array.from({ length: cards }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 rounded-xl border border-border bg-card px-4 py-3.5 animate-pulse">
            <div className="h-10 w-10 rounded-xl bg-muted" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-2/3 rounded bg-muted" />
              <div className="h-2.5 w-1/3 rounded bg-muted" />
            </div>
            <div className="h-4 w-16 rounded bg-muted" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'detail') {
    return (
      <div className={cn('space-y-6 animate-pulse', className)}>
        <div className="h-6 w-1/3 rounded bg-muted" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-4 space-y-3">
              <div className="h-8 w-8 rounded-lg bg-muted" />
              <div className="h-5 w-1/2 rounded bg-muted" />
              <div className="h-3 w-2/3 rounded bg-muted" />
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
          <div className="h-4 w-1/4 rounded bg-muted" />
          <div className="h-2 w-full rounded-full bg-muted" />
          <div className="h-3 w-1/3 rounded bg-muted" />
        </div>
      </div>
    );
  }

  return (
    <div className={cn('grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3', className)}>
      {Array.from({ length: cards }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-border bg-card p-5 space-y-3 animate-pulse">
          <div className="flex items-start justify-between">
            <div className="space-y-2 flex-1">
              <div className="h-3 w-2/3 rounded bg-muted" />
              <div className="h-2.5 w-1/2 rounded bg-muted" />
            </div>
            <div className="h-6 w-10 rounded-lg bg-muted" />
          </div>
          <div className="h-1.5 w-full rounded-full bg-muted" />
          <div className="h-2.5 w-1/3 rounded bg-muted" />
        </div>
      ))}
    </div>
  );
}
