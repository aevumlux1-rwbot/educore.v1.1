import { type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuickActionCardProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  className?: string;
}

export function QuickActionCard({ icon: Icon, label, onClick, className }: QuickActionCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 text-center transition-all hover:shadow-md hover:border-primary/20 hover:-translate-y-0.5 active:scale-[0.98]',
        className
      )}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <span className="text-xs font-medium text-foreground">{label}</span>
    </button>
  );
}
