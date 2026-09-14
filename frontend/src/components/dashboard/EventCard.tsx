import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { MoreVertical } from 'lucide-react';

interface EventCardProps {
  date: string;
  title: string;
  className?: string;
}

export function EventCard({ date, title, className }: EventCardProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:bg-muted/30',
        className
      )}
    >
      <div className="space-y-0.5">
        <p className="text-xs text-muted-foreground">{date}</p>
        <p className="text-sm font-medium text-foreground">{title}</p>
      </div>
      <button className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted transition-colors">
        <MoreVertical className="h-4 w-4" />
      </button>
    </div>
  );
}
