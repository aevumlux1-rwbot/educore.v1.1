import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, BookOpen, UserCheck, Wallet, Plus, FileText, ClipboardList, UserPlus, TrendingUp, AlertTriangle, Bell } from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { SectionHeader } from '@/components/ui/section-header';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { EventCard } from '@/components/dashboard/EventCard';
import { AlertCard } from '@/components/dashboard/AlertCard';
import { QuickActionCard } from '@/components/dashboard/QuickActionCard';
import { FeedPreviewCard } from '@/components/dashboard/FeedPreviewCard';
import { FinanceSummaryCard } from '@/components/dashboard/FinanceSummaryCard';
import { LoadingState } from '@/components/states/LoadingState';
import campusHero from '@/assets/campus-hero.jpg';

const stats = [
  { label: 'Students', value: '2,635', icon: Users, variant: 'primary' as const, trend: '+12% this term', trendUp: true },
  { label: 'Teachers', value: '29', icon: UserCheck, variant: 'accent' as const },
  { label: 'Faculty', value: '60', icon: BookOpen, variant: 'default' as const },
];

const events = [
  { date: 'Monday 22nd Jun, 2025', title: 'Model test of 11th class' },
  { date: 'Friday 15th Aug, 2025', title: 'Final project presentation' },
  { date: 'Tuesday 15th Aug, 2025', title: 'Final exam — Intro to Psychology' },
  { date: 'Friday 3rd Sep, 2025', title: 'Practical assessment in Chemistry' },
];

const alerts = [
  { title: '3 payments overdue', description: 'Students with overdue tuition fees require attention.', variant: 'destructive' as const, action: 'Review', link: '/app/finance' },
  { title: 'Term report pending', description: 'Academic reports for Term 2 are due in 5 days.', variant: 'warning' as const, action: 'View', link: '/app/academic' },
];

const feedItems = [
  { category: 'Academic', title: 'New grades published for Mathematics II', time: '2h ago', variant: 'academic' as const, link: '/app/academic' },
  { category: 'Finance', title: 'Tuition batch payment validated', time: '4h ago', variant: 'finance' as const, link: '/app/finance' },
  { category: 'Notice', title: 'Annual Day celebration on September 15', time: '1d ago', variant: 'institutional' as const, link: '/app/feed' },
];

const quickActions = [
  { icon: UserPlus, label: 'Add Student', path: '/app/academic' },
  { icon: ClipboardList, label: 'New Evaluation', path: '/app/academic' },
  { icon: FileText, label: 'Reports', path: '/app/finance' },
  { icon: Plus, label: 'New Content', path: '/app/knowledge' },
];

const teachers = [
  { name: 'Alex John', role: 'Physics Teacher' },
  { name: 'Maria Smith', role: 'Mathematics Tutor' },
  { name: 'James Lee', role: 'Chemistry Instructor' },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <PageContainer>
        <div className="space-y-6">
          <div className="h-40 rounded-2xl bg-muted animate-pulse md:h-48" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-5 animate-pulse space-y-3">
                <div className="h-3 w-1/3 rounded bg-muted" />
                <div className="h-6 w-1/2 rounded bg-muted" />
              </div>
            ))}
          </div>
          <LoadingState variant="list" cards={2} />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="relative mb-6 overflow-hidden rounded-2xl">
        <img src={campusHero} alt="Campus" className="h-40 w-full object-cover md:h-48" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 to-transparent" />
        <div className="absolute bottom-4 left-5 md:bottom-6 md:left-8">
          <h1 className="font-heading text-xl font-bold text-primary-foreground md:text-2xl">Welcome back</h1>
          <p className="mt-0.5 text-sm text-primary-foreground/80">Colégio Deus Connosco — Everything at a glance</p>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((s) => <StatsCard key={s.label} {...s} />)}
      </div>

      {alerts.length > 0 && (
        <div className="mb-6 space-y-2">
          {alerts.map((a, i) => (
            <AlertCard key={i} {...a} onAction={() => a.link && navigate(a.link)} />
          ))}
        </div>
      )}

      <div className="mb-6">
        <SectionHeader title="Quick Actions" />
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {quickActions.map((qa) => (
            <QuickActionCard key={qa.label} icon={qa.icon} label={qa.label} onClick={() => navigate(qa.path)} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-border bg-card p-5">
            <SectionHeader title="Growth" subtitle="Academy growth over time" action={
              <span className="rounded-lg bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">Monthly</span>
            } />
            <div className="mt-6 flex items-center justify-center">
              <div className="relative h-40 w-40">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
                  <circle cx="60" cy="60" r="50" fill="none" stroke="hsl(var(--primary))" strokeWidth="10" strokeLinecap="round" strokeDasharray={`${62 * 3.14} ${100 * 3.14}`} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-heading text-2xl font-bold text-foreground">62%</span>
                </div>
              </div>
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">Academy growth</p>
          </div>

          <div className="rounded-2xl bg-surface-dark p-5">
            <SectionHeader title="Top Teachers"
              className="[&_h2]:text-surface-dark-foreground [&_p]:text-surface-dark-foreground/60"
              action={
                <div className="flex gap-1.5">
                  <button className="rounded-lg bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">All Time</button>
                  <button className="rounded-lg bg-surface-dark px-3 py-1 text-xs font-medium text-surface-dark-foreground/60 border border-surface-dark-foreground/10 hover:border-surface-dark-foreground/20 transition-colors">This year</button>
                </div>
              }
            />
            <div className="mt-4 space-y-3">
              {teachers.map((t) => (
                <div key={t.name} className="flex items-center justify-between rounded-xl px-1 py-2 transition-colors hover:bg-surface-dark-foreground/5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-dark-foreground/10 text-sm font-semibold text-surface-dark-foreground">{t.name[0]}</div>
                    <div>
                      <p className="text-sm font-medium text-surface-dark-foreground">{t.name}</p>
                      <p className="text-xs text-surface-dark-foreground/50">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <SectionHeader title="Recent Activity" action={
              <button onClick={() => navigate('/app/feed')} className="text-xs font-medium text-primary hover:underline">View Feed</button>
            } />
            <div className="mt-3 space-y-0.5">
              {feedItems.map((f, i) => <FeedPreviewCard key={i} {...f} />)}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <FinanceSummaryCard totalDue="$48,500" paid="$32,200" overdue="$3,800" pending="$12,500" />

          <div className="rounded-2xl border border-border bg-card p-5">
            <SectionHeader title="Upcoming Events" subtitle="Scheduled events & tests" action={
              <button onClick={() => navigate('/app/academic')} className="rounded-lg border border-border px-3 py-1 text-xs font-medium text-foreground hover:bg-muted transition-colors">View All</button>
            } />
            <div className="mt-4 space-y-2.5">
              {events.map((e, i) => <EventCard key={i} date={e.date} title={e.title} />)}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card p-5">
        <div className="flex flex-wrap items-center gap-6">
          <div>
            <h3 className="font-heading text-xl font-bold text-foreground">12 Days left</h3>
            <p className="mt-1 text-sm text-muted-foreground">Celebrating our 16th anniversary.</p>
          </div>
          <div className="flex flex-wrap gap-1">
            {Array.from({ length: 28 }).map((_, i) => (
              <div key={i} className={`h-3 w-3 rounded-full transition-colors ${i < 16 ? 'bg-primary' : 'bg-primary/20'}`} />
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
