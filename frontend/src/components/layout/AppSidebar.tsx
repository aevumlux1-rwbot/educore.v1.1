import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  GraduationCap,
  Wallet,
  BookOpen,
  MessageCircle,
  Newspaper,
  Bell,
  Settings,
  ChevronLeft,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { NavItem } from '@/types/navigation';
import { SchoolBrand } from '@/components/brand/SchoolBrand';

const mainNav: NavItem[] = [
  { label: 'Home', path: '/app', icon: LayoutDashboard },
  { label: 'Academic', path: '/app/academic', icon: GraduationCap },
  { label: 'Finance', path: '/app/finance', icon: Wallet },
  { label: 'Knowledge', path: '/app/knowledge', icon: BookOpen },
  { label: 'Chat', path: '/app/chat', icon: MessageCircle },
  { label: 'Feed', path: '/app/feed', icon: Newspaper },
  { label: 'Notifications', path: '/app/notifications', icon: Bell },
];

const bottomNav: NavItem[] = [
  { label: 'Settings', path: '/app/settings', icon: Settings },
];

interface AppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function AppSidebar({ collapsed, onToggle }: AppSidebarProps) {
  const location = useLocation();

  const isActive = (path: string) =>
    path === '/app'
      ? location.pathname === '/app'
      : location.pathname.startsWith(path);

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen border-r border-sidebar-border bg-sidebar flex flex-col transition-all duration-300 ease-in-out',
        collapsed ? 'w-[var(--sidebar-collapsed-width)]' : 'w-[var(--sidebar-width)]'
      )}
    >
      <div className={cn(
        'flex h-[var(--topbar-height)] items-center border-b border-sidebar-border',
        collapsed ? 'justify-center px-2' : 'px-3'
      )}>
        <div className={cn(
          'flex items-center justify-center rounded-lg bg-white',
          collapsed ? 'h-9 w-9 p-1' : 'h-11 w-full px-2 py-1'
        )}>
          {collapsed ? (
            <SchoolBrand variant="compact" imageClassName="h-7 w-7" />
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full">
              <SchoolBrand imageClassName="mx-auto h-9 max-w-[12rem]" />
            </motion.div>
          )}
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto scrollbar-thin px-2 py-3 space-y-1">
        {mainNav.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150',
                active
                  ? 'bg-sidebar-accent text-sidebar-primary'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
              )}
            >
              <item.icon className={cn('h-[18px] w-[18px] shrink-0', active && 'text-sidebar-primary')} />
              {!collapsed && <span>{item.label}</span>}
              {!collapsed && item.badge && (
                <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-sidebar-primary px-1.5 text-[10px] font-semibold text-sidebar-primary-foreground">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border px-2 py-3 space-y-1">
        {bottomNav.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                active
                  ? 'bg-sidebar-accent text-sidebar-primary'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
              )}
            >
              <item.icon className="h-[18px] w-[18px] shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}

        <button
          onClick={onToggle}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
        >
          <ChevronLeft
            className={cn(
              'h-[18px] w-[18px] shrink-0 transition-transform duration-300',
              collapsed && 'rotate-180'
            )}
          />
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
