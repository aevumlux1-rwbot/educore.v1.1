import { type LucideIcon, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AlertCardProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  variant?: 'warning' | 'destructive' | 'info' | 'success';
  action?: string;
  onAction?: () => void;
  className?: string;
}

const variantStyles = {
  warning: 'border-warning/30 bg-warning/5',
  destructive: 'border-destructive/30 bg-destructive/5',
  info: 'border-info/30 bg-info/5',
  success: 'border-success/30 bg-success/5',
};

const iconStyles = {
  warning: 'text-warning',
  destructive: 'text-destructive',
  info: 'text-info',
  success: 'text-success',
};

export function AlertCard({ icon: Icon = AlertTriangle, title, description, variant = 'warning', action, onAction, className }: AlertCardProps) {
  return (
    <div className={cn('flex items-start gap-3 rounded-xl border p-4', variantStyles[variant], className)}>
      <div className={cn('mt-0.5 shrink-0', iconStyles[variant])}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
      </div>
      {action && onAction && (
        <button type="button" onClick={onAction} className="shrink-0 text-xs font-medium text-primary hover:underline active:scale-95 transition-transform">
          {action}
        </button>
      )}
    </div>
  );
}
