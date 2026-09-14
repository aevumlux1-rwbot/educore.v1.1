import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface FeedPreviewCardProps {
  category: string;
  title: string;
  time: string;
  variant?: 'academic' | 'finance' | 'institutional';
  link?: string;
}

const pillStyles = {
  academic: 'bg-primary/10 text-primary',
  finance: 'bg-warning/10 text-warning',
  institutional: 'bg-info/10 text-info',
};

export function FeedPreviewCard({ category, title, time, variant = 'institutional', link }: FeedPreviewCardProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => link && navigate(link)}
      className="flex w-full items-start gap-3 rounded-lg px-2 py-2.5 text-left transition-colors hover:bg-muted/50 active:scale-[0.99]"
    >
      <div className={cn('mt-0.5 shrink-0 rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider', pillStyles[variant])}>
        {category}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{title}</p>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
    </button>
  );
}
