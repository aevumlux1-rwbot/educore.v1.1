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
  { label: 'Início', path: '/app', icon: LayoutDashboard },
  { label: 'Académico', path: '/app/academic', icon: GraduationCap },
  { label: 'Finanças', path: '/app/finance', icon: Wallet },
  { label: 'Chat', path: '/app/chat', icon: MessageCircle },
  { label: 'Mais', path: '/app/menu', icon: Menu },
];

export function BottomNav() {
  const location = useLocation();

  const isActive = (path: string) =>
    path === '/app'
      ? location.pathname === '/app'
      : location.pathname.startsWith(path);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 glass md:hidden">
      <div className="flex h-[var(--bottom-nav-height)] items-stretch justify-around px-1 pb-[env(safe-area-inset-bottom)]">
        {items.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'relative flex flex-1 flex-col items-center justify-center gap-1 py-2 text-[10px] font-medium transition-all',
                active ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {active && <span className="absolute top-0 h-[3px] w-8 rounded-b-full bg-primary" />}
              <item.icon className={cn('h-[20px] w-[20px] transition-transform', active && 'scale-110')} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
