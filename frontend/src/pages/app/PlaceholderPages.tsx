import { Link } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { Settings, BookOpen, Wallet, GraduationCap, MessageCircle, Newspaper, Bell } from 'lucide-react';

export function MenuPage() {
  const links = [
    { label: 'Dashboard', path: '/app', icon: BookOpen },
    { label: 'Academic', path: '/app/academic', icon: GraduationCap },
    { label: 'Finance', path: '/app/finance', icon: Wallet },
    { label: 'Knowledge Space', path: '/app/knowledge', icon: BookOpen },
    { label: 'Chat', path: '/app/chat', icon: MessageCircle },
    { label: 'Feed', path: '/app/feed', icon: Newspaper },
    { label: 'Notifications', path: '/app/notifications', icon: Bell },
    { label: 'Settings', path: '/app/settings', icon: Settings },
  ];

  return (
    <PageContainer>
      <h1 className="mb-6 font-heading text-2xl font-bold text-foreground">Menu</h1>
      <div className="space-y-1">
        {links.map(l => {
          const Icon = l.icon;
          return (
            <Link key={l.path} to={l.path} className="flex items-center gap-3 rounded-xl px-4 py-3 text-foreground hover:bg-muted transition-colors">
              <Icon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{l.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-card p-5">
        <h3 className="font-heading text-sm font-semibold text-foreground mb-3">Role Dashboards</h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Student', path: '/app/student' },
            { label: 'Teacher', path: '/app/teacher' },
            { label: 'Guardian', path: '/app/guardian' },
            { label: 'Finance Admin', path: '/app/admin' },
          ].map(r => (
            <Link key={r.path} to={r.path} className="rounded-xl border border-border px-3 py-2.5 text-center text-xs font-medium text-foreground hover:bg-muted transition-colors">
              {r.label} View
            </Link>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
