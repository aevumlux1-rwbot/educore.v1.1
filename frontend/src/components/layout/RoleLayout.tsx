import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, LogOut, Search, Bell, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { ROLE_NAVIGATION, ROLE_BOTTOM_NAV } from '@/shared/navigation/roleNavigation';
import { ROLE_LABELS, ROLE_NOTIFICATIONS } from '@/types/roles';
import { CommandSearch } from '@/components/search/CommandSearch';
import { Brand } from '@/components/shared/Brand';

export function RoleLayout() {
  const { role, user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  if (!role) return null;

  const navItems = ROLE_NAVIGATION[role];
  const bottomItems = ROLE_BOTTOM_NAV[role];
  const roleLabel = ROLE_LABELS[role];

  const isActive = (path: string) => location.pathname === path || (path !== navItems[0]?.path && location.pathname.startsWith(path));

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-screen border-r border-sidebar-border bg-sidebar flex-col transition-all duration-300 ease-in-out hidden md:flex',
          collapsed ? 'w-[var(--sidebar-collapsed-width)]' : 'w-[var(--sidebar-width)]'
        )}
      >
        {/* Logo */}
        <div className="flex h-[var(--topbar-height)] items-center gap-3 border-b border-sidebar-border px-4">
          {collapsed ? (
            <Brand variant="mark" size="sm" />
          ) : (
            <Brand size="sm" subtitle={roleLabel} />
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 py-4 space-y-0.5">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                  active
                    ? 'bg-sidebar-accent text-sidebar-primary shadow-sm'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground'
                )}
              >
                {active && <span className="absolute left-0 top-1/2 h-5 -translate-y-1/2 w-[3px] rounded-r-full bg-sidebar-primary" />}
                <item.icon className={cn('h-[18px] w-[18px] shrink-0 transition-transform group-hover:scale-110', active && 'text-sidebar-primary')} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="border-t border-sidebar-border px-2 py-3 space-y-1">
          <Link
            to="/app/settings"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
          >
            <User className="h-[18px] w-[18px] shrink-0" />
            {!collapsed && <span>Definições</span>}
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <LogOut className="h-[18px] w-[18px] shrink-0" />
            {!collapsed && <span>Sair</span>}
          </button>
          <button
            onClick={() => setCollapsed((v) => !v)}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
          >
            <ChevronLeft className={cn('h-[18px] w-[18px] shrink-0 transition-transform duration-300', collapsed && 'rotate-180')} />
            {!collapsed && <span>Recolher</span>}
          </button>
        </div>
      </aside>

      {/* Topbar */}
      <header
        className={cn(
          'fixed top-0 right-0 z-30 flex h-[var(--topbar-height)] items-center justify-between border-b border-border/60 bg-background/85 glass px-4 md:px-6 transition-all duration-300',
          collapsed ? 'md:left-[var(--sidebar-collapsed-width)]' : 'md:left-[var(--sidebar-width)]',
          'left-0'
        )}
      >
        <div className="flex items-center gap-3">
          <div className="md:hidden">
            <Brand variant="mark" size="sm" />
          </div>
          {user && (
            <div className="hidden sm:block leading-tight">
              <p className="text-sm font-semibold text-foreground">{user.name}</p>
              <p className="text-[10px] text-muted-foreground">{roleLabel}</p>
            </div>
          )}
        </div>

        <div className="hidden md:flex max-w-md flex-1 mx-8">
          <button onClick={() => setSearchOpen(true)} className="relative w-full text-left group">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <div className="w-full rounded-xl border border-border bg-muted/40 py-2 pl-10 pr-4 text-sm text-muted-foreground group-hover:border-primary/30 group-hover:bg-muted/70 transition-all">
              Pesquisar na plataforma…
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex h-5 items-center gap-1 rounded-md border border-border bg-card px-1.5 text-[10px] font-medium text-muted-foreground">⌘K</kbd>
            </div>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => setSearchOpen(true)} className="flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground hover:bg-muted transition-colors md:hidden">
            <Search className="h-[18px] w-[18px]" />
          </button>
          <button
            onClick={() => navigate(ROLE_NOTIFICATIONS[role] ?? `/app/${role}/notifications`)}
            className="relative flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground hover:bg-muted transition-colors"
          >
            <Bell className="h-[18px] w-[18px]" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
          </button>
          <button onClick={() => navigate('/app/settings')} className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted text-foreground transition-colors hover:bg-accent">
            <User className="h-[18px] w-[18px]" />
          </button>
        </div>
      </header>

      {/* Main */}
      <main
        className={cn(
          'pt-[var(--topbar-height)] pb-[var(--bottom-nav-height)] md:pb-0 transition-all duration-300',
          collapsed ? 'md:pl-[var(--sidebar-collapsed-width)]' : 'md:pl-[var(--sidebar-width)]'
        )}
      >
        <div className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 glass md:hidden">
        <div className="flex h-[var(--bottom-nav-height)] items-end justify-around px-2 pb-[env(safe-area-inset-bottom)]">
          {bottomItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn('flex flex-col items-center gap-0.5 py-2 px-3 text-[10px] font-medium transition-colors', active ? 'text-primary' : 'text-muted-foreground')}
              >
                <item.icon className={cn('h-5 w-5', active && 'text-primary')} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <CommandSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
