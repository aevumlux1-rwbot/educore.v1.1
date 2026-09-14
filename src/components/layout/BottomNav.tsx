import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  GraduationCap,
  Wallet,
  MessageCircle,
  Menu,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const items = [
  { label: 'Home', path: '/app', icon: LayoutDashboard },
  { label: 'Academic', path: '/app/academic', icon: GraduationCap },
  { label: 'Finance', path: '/app/finance', icon: Wallet },
  { label: 'Chat', path: '/app/chat', icon: MessageCircle },
  { label: 'More', path: '/app/menu', icon: Menu },
];

export function BottomNav() {
  const location = useLocation();

  const isActive = (path: string) =>
    path === '/app'
      ? location.pathname === '/app'
      : location.pathname.startsWith(path);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 md:hidden">
      <div className="flex h-[var(--bottom-nav-height)] items-end justify-around px-2 pb-[env(safe-area-inset-bottom)]">
        {items.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex flex-col items-center gap-0.5 py-2 px-3 text-[10px] font-medium transition-colors',
                active ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <item.icon className={cn('h-5 w-5', active && 'text-primary')} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
