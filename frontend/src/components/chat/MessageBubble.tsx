import { cn } from '@/lib/utils';

interface MessageBubbleProps {
  content: string;
  time: string;
  sender: string;
  isOwn?: boolean;
}

export function MessageBubble({ content, time, sender, isOwn }: MessageBubbleProps) {
  return (
    <div className={cn('flex', isOwn ? 'justify-end' : 'justify-start')}>
      <div className={cn('max-w-[75%] space-y-1', isOwn ? 'items-end' : 'items-start')}>
        {!isOwn && <p className="text-[10px] font-medium text-muted-foreground px-1">{sender}</p>}
        <div className={cn(
          'rounded-2xl px-4 py-2.5 text-sm',
          isOwn
            ? 'bg-primary text-primary-foreground rounded-br-md'
            : 'bg-muted text-foreground rounded-bl-md'
        )}>
          {content}
        </div>
        <p className={cn('text-[10px] text-muted-foreground px-1', isOwn && 'text-right')}>{time}</p>
      </div>
    </div>
  );
}
