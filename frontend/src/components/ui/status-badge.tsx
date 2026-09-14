import { cn } from '@/lib/utils';

type BadgeVariant = 'success' | 'warning' | 'destructive' | 'info' | 'muted' | 'primary';

interface StatusBadgeProps {
  label: string;
  variant?: BadgeVariant;
  className?: string;
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  destructive: 'bg-destructive/10 text-destructive',
  info: 'bg-info/10 text-info',
  muted: 'bg-muted text-muted-foreground',
  primary: 'bg-primary/10 text-primary',
};

export function StatusBadge({ label, variant = 'muted', className, dot }: StatusBadgeProps) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-semibold', variantStyles[variant], className)}>
      {dot && <span className={cn('h-1.5 w-1.5 rounded-full', variant === 'success' ? 'bg-success' : variant === 'warning' ? 'bg-warning' : variant === 'destructive' ? 'bg-destructive' : variant === 'info' ? 'bg-info' : variant === 'primary' ? 'bg-primary' : 'bg-muted-foreground')} />}
      {label}
    </span>
  );
}
