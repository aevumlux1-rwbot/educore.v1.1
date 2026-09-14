import { useState } from 'react';
import { Search, Send, ArrowLeft, MessageCircle, Phone, MoreVertical } from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { ConversationList, type Conversation } from '@/components/chat/ConversationList';
import { MessageBubble } from '@/components/chat/MessageBubble';
import { EmptyState } from '@/components/states/EmptyState';
import { cn } from '@/lib/utils';

const conversations: Conversation[] = [
  { id: '1', name: 'Dr. Maria Smith', lastMessage: 'The homework deadline is extended to Friday.', time: '2m ago', unread: 2, context: 'Mathematics II · Teacher' },
  { id: '2', name: 'Prof. Alex John', lastMessage: 'Please review the lab safety guidelines before class.', time: '1h ago', context: 'Physics · Teacher' },
  { id: '3', name: 'Academic Support', lastMessage: 'Your counseling session is confirmed for Thursday.', time: '3h ago', context: 'Student Services' },
  { id: '4', name: 'Sarah Wilson', lastMessage: 'The essay topics are now available on the knowledge space.', time: '1d ago', context: 'English Literature · Teacher' },
  { id: '5', name: 'Class Group — 11B', lastMessage: 'Alex: Does anyone have notes from yesterday?', time: '1d ago', unread: 5, context: 'Class Group' },
  { id: '6', name: 'Finance Office', lastMessage: 'Your payment has been received. Receipt attached.', time: '2d ago', context: 'Administrative' },
];

const messagesMap: Record<string, Array<{ content: string; time: string; sender: string; isOwn: boolean }>> = {
  '1': [
    { content: 'Good morning! I wanted to let you know the homework deadline has been extended.', time: '10:15 AM', sender: 'Dr. Maria Smith', isOwn: false },
    { content: 'The new deadline is Friday, June 20th.', time: '10:15 AM', sender: 'Dr. Maria Smith', isOwn: false },
    { content: 'Thank you for the extension! I had a few questions about problem 5.', time: '10:22 AM', sender: 'You', isOwn: true },
    { content: 'Of course. Problem 5 requires you to apply the chain rule twice. Start with the outer function.', time: '10:25 AM', sender: 'Dr. Maria Smith', isOwn: false },
    { content: 'Got it, I\'ll try that approach. Thank you!', time: '10:28 AM', sender: 'You', isOwn: true },
  ],
  '2': [
    { content: 'Please make sure to review the lab safety guidelines before tomorrow\'s class.', time: '9:00 AM', sender: 'Prof. Alex John', isOwn: false },
    { content: 'Also, bring your lab coat and goggles.', time: '9:01 AM', sender: 'Prof. Alex John', isOwn: false },
    { content: 'Will do! Is the new equipment ready for the optics experiment?', time: '9:15 AM', sender: 'You', isOwn: true },
    { content: 'Yes, everything is set up in Lab 3.', time: '9:20 AM', sender: 'Prof. Alex John', isOwn: false },
  ],
};

const contextColors: Record<string, string> = {
  Teacher: 'text-primary',
  'Student Services': 'text-info',
  'Class Group': 'text-warning',
  Administrative: 'text-muted-foreground',
};

function getContextColor(context?: string) {
  if (!context) return 'text-muted-foreground';
  for (const [key, val] of Object.entries(contextColors)) {
    if (context.includes(key)) return val;
  }
  return 'text-muted-foreground';
}

export default function ChatPage() {
  const [activeConversation, setActiveConversation] = useState('1');
  const [showList, setShowList] = useState(true);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const activeConvo = conversations.find(c => c.id === activeConversation);
  const messages = messagesMap[activeConversation] || [];

  const filteredConversations = searchQuery
    ? conversations.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.context?.toLowerCase().includes(searchQuery.toLowerCase()))
    : conversations;

  return (
    <PageContainer className="!p-0 h-[calc(100vh-var(--topbar-height)-var(--bottom-nav-height))] md:h-[calc(100vh-var(--topbar-height))]">
      <div className="flex h-full rounded-2xl border border-border overflow-hidden bg-card">
        {/* Conversation list */}
        <div className={cn(
          'w-full md:w-80 md:shrink-0 border-r border-border bg-card flex flex-col',
          !showList && 'hidden md:flex'
        )}>
          <div className="p-4 border-b border-border">
            <h2 className="font-heading text-lg font-bold text-foreground">Messages</h2>
            <p className="text-xs text-muted-foreground">{conversations.filter(c => c.unread).length} unread conversations</p>
            <div className="mt-3 relative">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-border bg-muted/50 py-2 pl-9 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2 scrollbar-thin">
            {filteredConversations.length > 0 ? (
              <ConversationList conversations={filteredConversations} activeId={activeConversation} onSelect={(id) => { setActiveConversation(id); setShowList(false); }} />
            ) : (
              <EmptyState icon={MessageCircle} title="No conversations" description="No conversations match your search." className="py-8" />
            )}
          </div>
        </div>

        {/* Message area */}
        <div className={cn(
          'flex-1 flex flex-col bg-background/50',
          showList && 'hidden md:flex'
        )}>
          <div className="flex items-center gap-3 border-b border-border px-4 py-3 bg-card">
            <button onClick={() => setShowList(true)} className="md:hidden text-muted-foreground hover:text-foreground transition-colors active:scale-90">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 font-heading text-xs font-bold text-primary">
              {activeConvo?.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">{activeConvo?.name}</p>
              {activeConvo?.context && (
                <p className={cn('text-[10px] font-medium', getContextColor(activeConvo.context))}>
                  {activeConvo.context}
                </p>
              )}
            </div>
            <div className="flex items-center gap-1">
              <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                <Phone className="h-3.5 w-3.5" />
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                <MoreVertical className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
            {messages.length > 0 ? (
              <>
                <div className="flex justify-center">
                  <span className="rounded-full bg-muted px-3 py-1 text-[10px] text-muted-foreground">Today</span>
                </div>
                {messages.map((m, i) => <MessageBubble key={i} {...m} />)}
              </>
            ) : (
              <EmptyState icon={MessageCircle} title="No messages yet" description="Start the conversation by sending a message." className="h-full" />
            )}
          </div>

          <div className="border-t border-border p-3 bg-card">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder={`Message ${activeConvo?.name ?? ''}...`}
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && messageInput.trim() && setMessageInput('')}
                className="flex-1 rounded-xl border border-border bg-muted/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
              />
              <button
                className={cn(
                  'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors active:scale-95',
                  messageInput.trim() ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-muted text-muted-foreground'
                )}
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
