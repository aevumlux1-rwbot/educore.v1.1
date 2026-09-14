import { FileText, Video, BookOpen, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

type ContentType = 'document' | 'video' | 'exercise' | 'link';

interface ContentCardProps {
  title: string;
  subject: string;
  type: ContentType;
  date: string;
  author?: string;
  module?: string;
}

const typeIcons: Record<ContentType, any> = {
  document: FileText,
  video: Video,
  exercise: BookOpen,
  link: ExternalLink,
};

const typeLabels: Record<ContentType, string> = {
  document: 'Document',
  video: 'Video',
  exercise: 'Exercise',
  link: 'Link',
};

const typePills: Record<ContentType, string> = {
  document: 'bg-info/10 text-info',
  video: 'bg-destructive/10 text-destructive',
  exercise: 'bg-success/10 text-success',
  link: 'bg-warning/10 text-warning',
};

export function ContentCard({ title, subject, type, date, author, module: moduleName }: ContentCardProps) {
  const Icon = typeIcons[type];
  return (
    <div className="rounded-2xl border border-border bg-card p-4 transition-all hover:shadow-md hover:border-primary/20 cursor-pointer">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted">
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-foreground truncate">{title}</h4>
          <p className="mt-0.5 text-xs text-muted-foreground">{subject}{moduleName ? ` · ${moduleName}` : ''} · {date}</p>
          {author && <p className="text-xs text-muted-foreground">by {author}</p>}
        </div>
        <span className={cn('shrink-0 rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase', typePills[type])}>
          {typeLabels[type]}
        </span>
      </div>
    </div>
  );
}
