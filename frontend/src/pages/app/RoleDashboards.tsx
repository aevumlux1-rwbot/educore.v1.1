import { Users, BookOpen, TrendingUp, Wallet, AlertTriangle, CheckCircle, Clock, Calendar, FileText, MessageCircle, GraduationCap, ClipboardList } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { SectionHeader } from '@/components/ui/section-header';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { AlertCard } from '@/components/dashboard/AlertCard';
import { QuickActionCard } from '@/components/dashboard/QuickActionCard';
import { cn } from '@/lib/utils';

/* ─── STUDENT DASHBOARD ─── */
export function StudentDashboard() {
  const navigate = useNavigate();
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">My Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">Welcome back, John. Here's your academic overview.</p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatsCard label="GPA" value="3.6" icon={TrendingUp} variant="primary" />
        <StatsCard label="Attendance" value="87%" icon={CheckCircle} />
        <StatsCard label="Subjects" value="6" icon={BookOpen} />
        <StatsCard label="Pending Fees" value="$2,880" icon={Wallet} />
      </div>

      <AlertCard title="Biology needs attention" description="Your progress in Biology is at 45%. Consider reviewing recent materials." variant="warning" action="View Subject" />

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5">
          <SectionHeader title="Upcoming Evaluations" action={<button onClick={() => navigate('/app/academic')} className="text-xs font-medium text-primary hover:underline">View All</button>} />
          <div className="mt-3 space-y-2">
            {[
              { title: 'Midterm Exam — Physics', date: 'Mon 22 Jun', weight: '40%' },
              { title: 'Lab Practical — Chemistry', date: 'Wed 25 Jun', weight: '15%' },
            ].map((e, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl border border-warning/20 bg-warning/5 p-3">
                <Calendar className="h-4 w-4 text-warning shrink-0" />
                <div className="flex-1"><p className="text-sm font-medium text-foreground">{e.title}</p><p className="text-xs text-muted-foreground">{e.date} · Weight: {e.weight}</p></div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <SectionHeader title="Recent Grades" action={<button onClick={() => navigate('/app/academic')} className="text-xs font-medium text-primary hover:underline">All Grades</button>} />
          <div className="mt-3 space-y-2">
            {[
              { subject: 'Mathematics II', grade: '18/20', eval: 'Midterm' },
              { subject: 'Physics', grade: '15/20', eval: 'Lab Report #4' },
              { subject: 'Chemistry', grade: '17/20', eval: 'Practical' },
            ].map((g, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl border border-border px-4 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10"><span className="font-heading text-xs font-bold text-primary">{g.grade.split('/')[0]}</span></div>
                <div className="flex-1"><p className="text-sm font-medium text-foreground">{g.subject}</p><p className="text-xs text-muted-foreground">{g.eval}</p></div>
                <span className="text-xs text-muted-foreground">/{g.grade.split('/')[1]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card p-5">
        <SectionHeader title="Financial Status" action={<button onClick={() => navigate('/app/finance')} className="text-xs font-medium text-primary hover:underline">View Details</button>} />
        <div className="mt-3 flex items-center gap-6">
          <div><p className="text-xs text-muted-foreground">Total Due</p><p className="font-heading text-lg font-bold text-foreground">$2,880</p></div>
          <div className="h-8 w-px bg-border" />
          <div><p className="text-xs text-muted-foreground">Overdue</p><p className="font-heading text-lg font-bold text-destructive">$25</p></div>
          <div className="h-8 w-px bg-border" />
          <div><p className="text-xs text-muted-foreground">Next Due</p><p className="font-heading text-lg font-bold text-warning">Jun 30</p></div>
        </div>
      </div>
    </PageContainer>
  );
}

/* ─── TEACHER DASHBOARD ─── */
export function TeacherDashboard() {
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Teacher Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">Welcome back, Dr. Smith. Here's your day at a glance.</p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatsCard label="Today's Classes" value="4" icon={Calendar} variant="primary" />
        <StatsCard label="Students" value="128" icon={Users} />
        <StatsCard label="Pending Grades" value="12" icon={ClipboardList} trend="3 urgent" />
        <StatsCard label="Unread Messages" value="5" icon={MessageCircle} />
      </div>

      <AlertCard title="12 grades pending review" description="Midterm grades for Mathematics II need to be published by Friday." variant="warning" action="Grade Now" />

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5">
          <SectionHeader title="Today's Schedule" />
          <div className="mt-3 space-y-2">
            {[
              { time: '08:00', class: 'Mathematics II — 11B', room: 'Room 201', current: false },
              { time: '09:30', class: 'Mathematics II — 11A', room: 'Room 203', current: true },
              { time: '11:00', class: 'Statistics — 12A', room: 'Room 105', current: false },
              { time: '14:00', class: 'Mathematics I — 10B', room: 'Room 201', current: false },
            ].map((s, i) => (
              <div key={i} className={cn('flex items-center gap-3 rounded-xl border px-4 py-3', s.current ? 'border-primary/30 bg-primary/5' : 'border-border')}>
                <span className="font-heading text-xs font-bold text-muted-foreground w-12">{s.time}</span>
                <div className="flex-1"><p className="text-sm font-medium text-foreground">{s.class}</p><p className="text-xs text-muted-foreground">{s.room}</p></div>
                {s.current && <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">NOW</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <SectionHeader title="Student Performance" subtitle="At-risk students" />
          <div className="mt-3 space-y-2">
            {[
              { name: 'Emily Davis', grade: 'C+', subject: 'Mathematics II', trend: '↓' },
              { name: 'Michael Brown', grade: 'D', subject: 'Statistics', trend: '↓' },
              { name: 'Anna Lee', grade: 'C', subject: 'Mathematics I', trend: '→' },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl border border-warning/20 bg-warning/5 px-4 py-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-warning/10 text-xs font-bold text-warning">{s.name[0]}</div>
                <div className="flex-1"><p className="text-sm font-medium text-foreground">{s.name}</p><p className="text-xs text-muted-foreground">{s.subject}</p></div>
                <span className="text-xs font-bold text-warning">{s.grade} {s.trend}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <SectionHeader title="Quick Actions" />
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <QuickActionCard icon={ClipboardList} label="Grade Students" />
          <QuickActionCard icon={FileText} label="Publish Content" />
          <QuickActionCard icon={MessageCircle} label="Messages" />
          <QuickActionCard icon={Calendar} label="Schedule" />
        </div>
      </div>
    </PageContainer>
  );
}

/* ─── GUARDIAN DASHBOARD ─── */
export function GuardianDashboard() {
  const navigate = useNavigate();
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Guardian Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">Monitoring John Smith's academic progress.</p>
      </div>

      {/* Child selector */}
      <div className="mb-6 rounded-2xl border border-border bg-card p-4 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 font-heading text-base font-bold text-primary">JS</div>
        <div className="flex-1">
          <p className="font-heading text-sm font-semibold text-foreground">John Smith</p>
          <p className="text-xs text-muted-foreground">Grade 11B · Student ID: STU-2024-0847</p>
        </div>
        <button className="rounded-lg bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">Switch Child</button>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatsCard label="GPA" value="3.6" icon={TrendingUp} variant="primary" />
        <StatsCard label="Attendance" value="87%" icon={CheckCircle} />
        <StatsCard label="Subjects" value="6" icon={BookOpen} />
        <StatsCard label="Pending Fees" value="$2,880" icon={Wallet} />
      </div>

      <AlertCard title="Attention: Biology" description="John's Biology progress is at 45%. This may require additional support." variant="warning" action="View Details" />

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5">
          <SectionHeader title="Latest Academic Updates" action={<button onClick={() => navigate('/app/academic')} className="text-xs font-medium text-primary hover:underline">View All</button>} />
          <div className="mt-3 space-y-2">
            {[
              { title: 'Mathematics II — Midterm: 18/20', time: '2h ago', type: 'grade' },
              { title: 'Physics Lab Report: 15/20', time: '1d ago', type: 'grade' },
              { title: 'Biology quiz: 12/20', time: '2d ago', type: 'alert' },
            ].map((u, i) => (
              <div key={i} className={cn('flex items-center gap-3 rounded-xl border px-4 py-3', u.type === 'alert' ? 'border-warning/20 bg-warning/5' : 'border-border')}>
                <GraduationCap className={cn('h-4 w-4 shrink-0', u.type === 'alert' ? 'text-warning' : 'text-primary')} />
                <div className="flex-1"><p className="text-sm font-medium text-foreground">{u.title}</p><p className="text-xs text-muted-foreground">{u.time}</p></div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <SectionHeader title="Pending Payments" action={<button onClick={() => navigate('/app/finance')} className="text-xs font-medium text-primary hover:underline">View All</button>} />
          <div className="mt-3 space-y-2">
            {[
              { concept: 'Lab Fee — Chemistry', amount: '$150', due: 'Jun 30', status: 'due_soon' },
              { concept: 'Tuition Fee — Term 2', amount: '$2,400', due: 'Jul 15', status: 'pending' },
              { concept: 'Library Fine', amount: '$25', due: 'Jun 1', status: 'overdue' },
            ].map((p, i) => (
              <div key={i} className={cn('flex items-center gap-3 rounded-xl border px-4 py-3', p.status === 'overdue' ? 'border-destructive/20 bg-destructive/5' : p.status === 'due_soon' ? 'border-warning/20 bg-warning/5' : 'border-border')}>
                <Wallet className={cn('h-4 w-4 shrink-0', p.status === 'overdue' ? 'text-destructive' : p.status === 'due_soon' ? 'text-warning' : 'text-muted-foreground')} />
                <div className="flex-1"><p className="text-sm font-medium text-foreground">{p.concept}</p><p className="text-xs text-muted-foreground">Due {p.due}</p></div>
                <span className="font-heading text-sm font-bold text-foreground">{p.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <SectionHeader title="Quick Actions" />
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <QuickActionCard icon={Wallet} label="Make Payment" />
          <QuickActionCard icon={MessageCircle} label="Contact Teacher" />
          <QuickActionCard icon={GraduationCap} label="View Grades" />
          <QuickActionCard icon={Calendar} label="Schedule" />
        </div>
      </div>
    </PageContainer>
  );
}

/* ─── FINANCE ADMIN DASHBOARD ─── */
export function FinanceAdminDashboard() {
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Finance Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">COREOS — Financial operations overview.</p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatsCard label="Total Pending" value="$48,500" icon={Clock} variant="primary" />
        <StatsCard label="Validated" value="$32,200" icon={CheckCircle} trend="+8% this month" trendUp />
        <StatsCard label="Overdue" value="$3,800" icon={AlertTriangle} />
        <StatsCard label="Today's Payments" value="12" icon={Wallet} />
      </div>

      <div className="mb-6 space-y-2">
        <AlertCard title="$3,800 overdue across 15 students" description="Overdue items require immediate follow-up." variant="destructive" action="Review" />
        <AlertCard title="8 payments pending validation" description="Batch validation available for today's submissions." variant="info" action="Validate" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5">
          <SectionHeader title="Recent Payments" subtitle="Awaiting validation" />
          <div className="mt-3 space-y-2">
            {[
              { student: 'John Smith', amount: '$2,400', concept: 'Tuition Term 2', time: '2h ago' },
              { student: 'Emily Davis', amount: '$150', concept: 'Lab Fee', time: '3h ago' },
              { student: 'Michael Brown', amount: '$350', concept: 'Registration', time: '5h ago' },
            ].map((p, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl border border-border px-4 py-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-bold text-foreground">{p.student[0]}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{p.student} — {p.concept}</p>
                  <p className="text-xs text-muted-foreground">{p.time}</p>
                </div>
                <span className="font-heading text-sm font-bold text-foreground">{p.amount}</span>
                <button className="rounded-lg bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground hover:bg-primary/90">Validate</button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <SectionHeader title="Overdue Items" subtitle="Requires action" />
          <div className="mt-3 space-y-2">
            {[
              { student: 'Sarah Johnson', amount: '$1,200', concept: 'Tuition Term 1', days: 45 },
              { student: 'Tom Wilson', amount: '$2,400', concept: 'Tuition Term 2', days: 12 },
              { student: 'Anna Lee', amount: '$200', concept: 'Activity Fee', days: 30 },
            ].map((o, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive/10 text-xs font-bold text-destructive">{o.student[0]}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{o.student} — {o.concept}</p>
                  <p className="text-xs text-destructive">{o.days} days overdue</p>
                </div>
                <span className="font-heading text-sm font-bold text-foreground">{o.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <SectionHeader title="Quick Actions" />
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <QuickActionCard icon={CheckCircle} label="Batch Validate" />
          <QuickActionCard icon={FileText} label="Generate Report" />
          <QuickActionCard icon={AlertTriangle} label="Overdue List" />
          <QuickActionCard icon={Wallet} label="Payment Log" />
        </div>
      </div>
    </PageContainer>
  );
}
