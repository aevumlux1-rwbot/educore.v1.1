import { useState, useEffect } from 'react';
import { Search, BookOpen, TrendingUp, Calendar, CheckCircle, AlertTriangle, Clock, Target } from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { SectionHeader } from '@/components/ui/section-header';
import { SubjectCard } from '@/components/academic/SubjectCard';
import { GradeCard } from '@/components/academic/GradeCard';
import { ScheduleCard } from '@/components/academic/ScheduleCard';
import { CategoryPill } from '@/components/knowledge/CategoryPill';
import { EmptyState } from '@/components/states/EmptyState';
import { LoadingState } from '@/components/states/LoadingState';
import { cn } from '@/lib/utils';

const tabs = ['Overview', 'Subjects', 'Grades', 'Attendance', 'Schedule', 'Evaluations'];

const subjects = [
  { name: 'Mathematics II', teacher: 'Dr. Maria Smith', grade: 'A', gradeColor: 'success' as const, progress: 78, nextClass: 'Tomorrow 9:00 AM', credits: 4, semester: 'Term 2', hoursPerWeek: 4 },
  { name: 'Physics', teacher: 'Prof. Alex John', grade: 'B+', gradeColor: 'primary' as const, progress: 65, nextClass: 'Today 2:00 PM', credits: 4, semester: 'Term 2', hoursPerWeek: 5 },
  { name: 'Chemistry', teacher: 'James Lee', grade: 'A-', gradeColor: 'success' as const, progress: 82, credits: 3, semester: 'Term 2', hoursPerWeek: 4 },
  { name: 'English Literature', teacher: 'Sarah Wilson', grade: 'B', gradeColor: 'primary' as const, progress: 60, nextClass: 'Wed 10:00 AM', credits: 3, semester: 'Term 2', hoursPerWeek: 3 },
  { name: 'Biology', teacher: 'Dr. Rachel Green', grade: 'C+', gradeColor: 'warning' as const, progress: 45, credits: 3, semester: 'Term 2', hoursPerWeek: 4 },
  { name: 'Computer Science', teacher: 'Prof. David Chen', grade: 'A+', gradeColor: 'success' as const, progress: 92, credits: 4, semester: 'Term 2', hoursPerWeek: 5 },
];

const recentGrades = [
  { subject: 'Mathematics II', evaluation: 'Midterm Exam', grade: '18', maxGrade: '20', date: 'Jun 15', status: 'published' as const },
  { subject: 'Physics', evaluation: 'Lab Report #4', grade: '15', maxGrade: '20', date: 'Jun 12', status: 'published' as const },
  { subject: 'Chemistry', evaluation: 'Practical Exam', grade: '17', maxGrade: '20', date: 'Jun 8', status: 'reviewed' as const },
  { subject: 'Biology', evaluation: 'Quiz 3', grade: '12', maxGrade: '20', date: 'Jun 10', status: 'pending' as const },
  { subject: 'English Literature', evaluation: 'Essay — Hamlet', grade: '14', maxGrade: '20', date: 'Jun 5', status: 'published' as const },
  { subject: 'Computer Science', evaluation: 'Project Phase 1', grade: '19', maxGrade: '20', date: 'Jun 3', status: 'published' as const },
];

const scheduleItems = [
  { time: '08:00', subject: 'Mathematics II', room: 'Room 201', teacher: 'Dr. Smith', current: false },
  { time: '09:30', subject: 'Physics Lab', room: 'Lab 3', teacher: 'Prof. John', current: true },
  { time: '11:00', subject: 'English Literature', room: 'Room 105', teacher: 'S. Wilson', current: false },
  { time: '14:00', subject: 'Computer Science', room: 'Lab 1', teacher: 'Prof. Chen', current: false },
  { time: '15:30', subject: 'Biology', room: 'Room 302', teacher: 'Dr. Green', current: false },
];

const evaluations = [
  { subject: 'Physics', title: 'Midterm Exam', date: 'Mon 22 Jun 2025', time: '09:00', room: 'Room 201', type: 'exam' as const, status: 'upcoming' as const, weight: '40%' },
  { subject: 'Computer Science', title: 'Final Project Submission', date: 'Fri 15 Aug 2025', time: '23:59', room: 'Online', type: 'project' as const, status: 'upcoming' as const, weight: '30%' },
  { subject: 'Chemistry', title: 'Lab Practical #5', date: 'Wed 25 Jun 2025', time: '14:00', room: 'Lab 2', type: 'practical' as const, status: 'upcoming' as const, weight: '15%' },
  { subject: 'Mathematics II', title: 'Midterm Exam', date: 'Jun 15, 2025', time: '09:00', room: 'Room 201', type: 'exam' as const, status: 'completed' as const, weight: '40%', grade: '18/20' },
  { subject: 'Chemistry', title: 'Practical Exam', date: 'Jun 8, 2025', time: '14:00', room: 'Lab 2', type: 'practical' as const, status: 'completed' as const, weight: '25%', grade: '17/20' },
];

const attendanceData = { present: 87, absent: 8, late: 5, total: 120, totalSessions: 138 };

const attendanceBySubject = [
  { subject: 'Mathematics II', present: 22, total: 24, rate: 92 },
  { subject: 'Physics', present: 20, total: 23, rate: 87 },
  { subject: 'Chemistry', present: 18, total: 22, rate: 82 },
  { subject: 'English Literature', present: 16, total: 20, rate: 80 },
  { subject: 'Biology', present: 15, total: 24, rate: 63 },
  { subject: 'Computer Science', present: 24, total: 25, rate: 96 },
];

export default function AcademicPage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, [activeTab]);

  const atRiskSubjects = subjects.filter(s => s.gradeColor === 'warning');
  const avgProgress = Math.round(subjects.reduce((sum, s) => sum + s.progress, 0) / subjects.length);

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Academic</h1>
        <p className="mt-1 text-sm text-muted-foreground">Your academic overview, subjects, grades, and schedule.</p>
      </div>

      <div className="mb-6 flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {tabs.map((tab) => (
          <CategoryPill key={tab} label={tab} active={activeTab === tab} onClick={() => setActiveTab(tab)} />
        ))}
      </div>

      {loading ? (
        <LoadingState variant={activeTab === 'Subjects' ? 'cards' : 'detail'} cards={activeTab === 'Subjects' ? 6 : 3} />
      ) : (
        <>
          {activeTab === 'Overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-2xl border border-border bg-card p-4 text-center transition-all hover:shadow-sm">
                  <BookOpen className="mx-auto h-5 w-5 text-primary" />
                  <p className="mt-2 font-heading text-xl font-bold text-foreground">{subjects.length}</p>
                  <p className="text-xs text-muted-foreground">Subjects</p>
                </div>
                <div className="rounded-2xl border border-border bg-card p-4 text-center transition-all hover:shadow-sm">
                  <TrendingUp className="mx-auto h-5 w-5 text-success" />
                  <p className="mt-2 font-heading text-xl font-bold text-foreground">3.6</p>
                  <p className="text-xs text-muted-foreground">GPA</p>
                </div>
                <div className="rounded-2xl border border-border bg-card p-4 text-center transition-all hover:shadow-sm">
                  <CheckCircle className="mx-auto h-5 w-5 text-info" />
                  <p className="mt-2 font-heading text-xl font-bold text-foreground">{attendanceData.present}%</p>
                  <p className="text-xs text-muted-foreground">Attendance</p>
                </div>
                <div className="rounded-2xl border border-border bg-card p-4 text-center transition-all hover:shadow-sm">
                  <Calendar className="mx-auto h-5 w-5 text-warning" />
                  <p className="mt-2 font-heading text-xl font-bold text-foreground">{evaluations.filter(e => e.status === 'upcoming').length}</p>
                  <p className="text-xs text-muted-foreground">Upcoming Exams</p>
                </div>
              </div>

              {atRiskSubjects.length > 0 && (
                <div className="flex items-start gap-3 rounded-xl border border-warning/30 bg-warning/5 p-4">
                  <AlertTriangle className="h-4 w-4 text-warning mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Attention needed</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {atRiskSubjects.map(s => s.name).join(', ')} {atRiskSubjects.length === 1 ? 'is' : 'are'} below target. Current progress: {atRiskSubjects.map(s => `${s.progress}%`).join(', ')}.
                    </p>
                  </div>
                </div>
              )}

              <div className="rounded-2xl border border-border bg-card p-5">
                <SectionHeader title="Academic Progress" subtitle={`Average: ${avgProgress}%`} />
                <div className="mt-4 h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: `${avgProgress}%` }} />
                </div>
                <div className="mt-3 flex gap-4 text-xs text-muted-foreground">
                  <span>{subjects.filter(s => s.gradeColor === 'success').length} excelling</span>
                  <span>·</span>
                  <span>{subjects.filter(s => s.gradeColor === 'primary').length} on track</span>
                  <span>·</span>
                  <span>{atRiskSubjects.length} needs attention</span>
                </div>
              </div>

              <div>
                <SectionHeader title="My Subjects" action={<button onClick={() => setActiveTab('Subjects')} className="text-xs font-medium text-primary hover:underline">View All</button>} />
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {subjects.slice(0, 3).map((s) => <SubjectCard key={s.name} {...s} />)}
                </div>
              </div>

              <div>
                <SectionHeader title="Recent Grades" action={<button onClick={() => setActiveTab('Grades')} className="text-xs font-medium text-primary hover:underline">All Grades</button>} />
                <div className="mt-3 space-y-2">
                  {recentGrades.slice(0, 3).map((g, i) => <GradeCard key={i} {...g} />)}
                </div>
              </div>

              <ScheduleCard day="Today — Monday" items={scheduleItems.slice(0, 4)} />

              <div>
                <SectionHeader title="Upcoming Evaluations" action={<button onClick={() => setActiveTab('Evaluations')} className="text-xs font-medium text-primary hover:underline">View All</button>} />
                <div className="mt-3 space-y-2">
                  {evaluations.filter(e => e.status === 'upcoming').slice(0, 2).map((e, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-xl border border-warning/30 bg-warning/5 p-4 transition-all hover:shadow-sm">
                      <Target className="h-4 w-4 text-warning shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{e.title} — {e.subject}</p>
                        <p className="text-xs text-muted-foreground">{e.date} · {e.time} · {e.room} · Weight: {e.weight}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Subjects' && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {subjects.map((s) => <SubjectCard key={s.name} {...s} />)}
            </div>
          )}

          {activeTab === 'Grades' && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-card p-5">
                <SectionHeader title="Grade Distribution" />
                <div className="mt-4 grid grid-cols-5 gap-2">
                  {['A+/A', 'A-/B+', 'B/B-', 'C+/C', 'Below C'].map((label, i) => {
                    const counts = [2, 1, 1, 1, 0];
                    const colors = ['bg-success', 'bg-success/70', 'bg-primary', 'bg-warning', 'bg-destructive'];
                    return (
                      <div key={label} className="text-center">
                        <div className="mx-auto h-20 w-full max-w-[40px] rounded-lg bg-muted overflow-hidden flex flex-col justify-end">
                          <div className={cn('rounded-lg transition-all duration-500', colors[i])} style={{ height: `${(counts[i] / 3) * 100}%`, minHeight: counts[i] > 0 ? '8px' : 0 }} />
                        </div>
                        <p className="mt-1.5 text-[10px] font-medium text-muted-foreground">{label}</p>
                        <p className="text-xs font-bold text-foreground">{counts[i]}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="space-y-2">
                {recentGrades.map((g, i) => <GradeCard key={i} {...g} />)}
              </div>
            </div>
          )}

          {activeTab === 'Attendance' && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-card p-5">
                <SectionHeader title="Overall Attendance" />
                <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
                  <div className="relative h-36 w-36">
                    <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="50" fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
                      <circle cx="60" cy="60" r="50" fill="none" stroke="hsl(var(--success))" strokeWidth="10" strokeLinecap="round" strokeDasharray={`${attendanceData.present * 3.14} ${100 * 3.14}`} />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-heading text-2xl font-bold text-foreground">{attendanceData.present}%</span>
                      <span className="text-xs text-muted-foreground">Present</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-6 text-center">
                    <div><p className="font-heading text-lg font-bold text-success">{attendanceData.present}%</p><p className="text-xs text-muted-foreground">Present</p></div>
                    <div><p className="font-heading text-lg font-bold text-destructive">{attendanceData.absent}%</p><p className="text-xs text-muted-foreground">Absent</p></div>
                    <div><p className="font-heading text-lg font-bold text-warning">{attendanceData.late}%</p><p className="text-xs text-muted-foreground">Late</p></div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5">
                <SectionHeader title="By Subject" />
                <div className="mt-4 space-y-3">
                  {attendanceBySubject.map(s => (
                    <div key={s.subject}>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-medium text-foreground">{s.subject}</span>
                        <span className={cn('font-bold', s.rate >= 80 ? 'text-success' : s.rate >= 70 ? 'text-warning' : 'text-destructive')}>{s.rate}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                        <div className={cn('h-full rounded-full transition-all duration-700', s.rate >= 80 ? 'bg-success' : s.rate >= 70 ? 'bg-warning' : 'bg-destructive')} style={{ width: `${s.rate}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Schedule' && <ScheduleCard day="Today — Monday" items={scheduleItems} />}

          {activeTab === 'Evaluations' && (
            <div className="space-y-6">
              <div>
                <SectionHeader title="Upcoming" subtitle={`${evaluations.filter(e => e.status === 'upcoming').length} evaluations`} />
                <div className="mt-3 space-y-2">
                  {evaluations.filter(e => e.status === 'upcoming').map((e, i) => (
                    <div key={i} className="rounded-xl border border-warning/20 bg-warning/5 p-4 transition-all hover:shadow-sm">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning/10">
                            <Target className="h-4 w-4 text-warning" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">{e.title}</p>
                            <p className="mt-0.5 text-xs text-muted-foreground">{e.subject} · {e.type}</p>
                            <p className="mt-1 text-xs text-muted-foreground">{e.date} · {e.time} · {e.room}</p>
                          </div>
                        </div>
                        <span className="shrink-0 rounded-md bg-warning/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-warning">Weight: {e.weight}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <SectionHeader title="Completed" />
                <div className="mt-3 space-y-2">
                  {evaluations.filter(e => e.status === 'completed').map((e, i) => (
                    <div key={i} className="rounded-xl border border-border bg-card p-4 transition-all hover:shadow-sm">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10">
                            <CheckCircle className="h-4 w-4 text-success" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">{e.title}</p>
                            <p className="mt-0.5 text-xs text-muted-foreground">{e.subject} · {e.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-heading text-sm font-bold text-success">{e.grade}</span>
                          <p className="text-[10px] text-muted-foreground">Weight: {e.weight}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </PageContainer>
  );
}
