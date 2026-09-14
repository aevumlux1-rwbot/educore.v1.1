import { type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatBlockProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  subtitle?: string;
  className?: string;
}

export function StatBlock({ label, value, icon: Icon, subtitle, className }: StatBlockProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      {Icon && (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      )}
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-heading text-lg font-bold text-foreground">{value}</p>
        {subtitle && <p className="text-[10px] text-muted-foreground">{subtitle}</p>}
      </div>
    </div>
  );
}
