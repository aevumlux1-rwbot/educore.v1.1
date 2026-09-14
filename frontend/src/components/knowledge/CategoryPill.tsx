import { cn } from '@/lib/utils';

interface CategoryPillProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export function CategoryPill({ label, active, onClick }: CategoryPillProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition-all active:scale-95',
        active
          ? 'bg-primary text-primary-foreground shadow-sm'
          : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
      )}
    >
      {label}
    </button>
  );
}
