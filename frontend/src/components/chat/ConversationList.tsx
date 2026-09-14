import { cn } from '@/lib/utils';

export interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread?: number;
  avatar?: string;
  context?: string;
}

interface ConversationListProps {
  conversations: Conversation[];
  activeId?: string;
  onSelect: (id: string) => void;
}

export function ConversationList({ conversations, activeId, onSelect }: ConversationListProps) {
  return (
    <div className="space-y-0.5">
      {conversations.map((c) => (
        <button
          key={c.id}
          onClick={() => onSelect(c.id)}
          className={cn(
            'flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition-colors',
            activeId === c.id ? 'bg-primary/10' : 'hover:bg-muted/50'
          )}
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted font-heading text-xs font-bold text-foreground">
            {c.name[0]}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-foreground truncate">{c.name}</p>
              <span className="shrink-0 text-[10px] text-muted-foreground">{c.time}</span>
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground truncate">{c.lastMessage}</p>
            {c.context && (
              <span className="mt-1 inline-block rounded-md bg-primary/5 px-1.5 py-0.5 text-[10px] font-medium text-primary">{c.context}</span>
            )}
          </div>
          {c.unread && c.unread > 0 && (
            <span className="mt-1 flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
              {c.unread}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
