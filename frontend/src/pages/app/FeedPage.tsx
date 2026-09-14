import { useState } from 'react';
import { Newspaper, GraduationCap, Wallet, Megaphone, Calendar, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { CategoryPill } from '@/components/knowledge/CategoryPill';
import { EmptyState } from '@/components/states/EmptyState';
import { cn } from '@/lib/utils';

interface FeedItem {
  icon: any;
  category: string;
  title: string;
  description: string;
  time: string;
  variant: 'academic' | 'finance' | 'institutional';
  actionLabel?: string;
  link?: string;
}

const variantStyles = {
  academic: 'bg-primary/10 text-primary',
  finance: 'bg-warning/10 text-warning',
  institutional: 'bg-info/10 text-info',
};

const variantBorder = {
  academic: 'border-primary/10',
  finance: 'border-warning/10',
  institutional: 'border-info/10',
};

const feedItems: FeedItem[] = [
  { icon: GraduationCap, category: 'Academic', title: 'New grades published', description: 'Midterm grades for Mathematics II have been released. Check your academic dashboard.', time: '2 hours ago', variant: 'academic', actionLabel: 'View Grades', link: '/app/academic' },
  { icon: Wallet, category: 'Finance', title: 'Payment confirmed', description: 'Your tuition payment of $2,400 for Term 1 has been validated and a receipt is available.', time: '4 hours ago', variant: 'finance', actionLabel: 'View Receipt', link: '/app/finance' },
  { icon: Megaphone, category: 'Notice', title: 'Annual Day celebration', description: 'We are pleased to announce the Annual Day celebration on September 15, 2025. All students and faculty are invited.', time: '1 day ago', variant: 'institutional' },
  { icon: GraduationCap, category: 'Academic', title: 'New content available', description: 'Prof. Alex John uploaded new study materials for Physics — Newton\'s Laws Explained.', time: '1 day ago', variant: 'academic', actionLabel: 'View Content', link: '/app/knowledge' },
  { icon: Calendar, category: 'Academic', title: 'Schedule update', description: 'Biology class on Thursday has been rescheduled to 3:00 PM in Room 302.', time: '2 days ago', variant: 'academic' },
  { icon: Wallet, category: 'Finance', title: 'Payment reminder', description: 'Lab Fee for Chemistry ($150) is due on June 30, 2025. Please make timely payment.', time: '3 days ago', variant: 'finance', actionLabel: 'Pay Now', link: '/app/finance' },
  { icon: Megaphone, category: 'Notice', title: 'Library hours extended', description: 'The library will now remain open until 9:00 PM on weekdays during exam season.', time: '4 days ago', variant: 'institutional' },
];

const filters = ['All', 'Academic', 'Finance', 'Institutional'];

export default function FeedPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const navigate = useNavigate();

  const filtered = activeFilter === 'All'
    ? feedItems
    : feedItems.filter(f => f.category.toLowerCase() === activeFilter.toLowerCase() || (activeFilter === 'Institutional' && f.category === 'Notice'));

  const today = filtered.filter(f => f.time.includes('hour'));
  const earlier = filtered.filter(f => !f.time.includes('hour'));

  const renderGroup = (items: FeedItem[], label: string) => {
    if (items.length === 0) return null;
    return (
      <div>
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
        <div className="space-y-2.5">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                onClick={() => item.link && navigate(item.link)}
                className={cn(
                  'rounded-2xl border bg-card p-4 transition-all hover:shadow-sm',
                  item.link ? 'cursor-pointer active:scale-[0.995]' : '',
                  variantBorder[item.variant]
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-xl', variantStyles[item.variant])}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className={cn('text-[10px] font-semibold uppercase tracking-wider', variantStyles[item.variant].split(' ')[1])}>{item.category}</span>
                        <h3 className="mt-0.5 text-sm font-semibold text-foreground">{item.title}</h3>
                      </div>
                      <span className="shrink-0 text-[10px] text-muted-foreground whitespace-nowrap">{item.time}</span>
                    </div>
                    <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                    {item.actionLabel && (
                      <span className="mt-2.5 inline-flex items-center gap-0.5 text-xs font-medium text-primary">
                        {item.actionLabel} <ChevronRight className="h-3 w-3" />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Feed</h1>
        <p className="mt-1 text-sm text-muted-foreground">What's happening in your academic life right now.</p>
      </div>

      <div className="mb-6 flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {filters.map(f => (
          <CategoryPill key={f} label={f} active={activeFilter === f} onClick={() => setActiveFilter(f)} />
        ))}
      </div>

      <div className="space-y-6">
        {renderGroup(today, 'Today')}
        {renderGroup(earlier, 'Earlier')}
        {filtered.length === 0 && (
          <EmptyState icon={Newspaper} title="No updates" description="No items match the selected filter." />
        )}
      </div>
    </PageContainer>
  );
}
