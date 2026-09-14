import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Bell, ChevronLeft, LogOut, Menu, Settings, UserRound, X } from 'lucide-react';
import { SchoolBrand } from '@/components/brand/SchoolBrand';
import { useAuth } from '@/contexts/AuthContext';
import { ROLE_BOTTOM_NAV, ROLE_NAVIGATION } from '@/shared/navigation/roleNavigation';
import { ROLE_LABELS, ROLE_NOTIFICATIONS } from '@/types/roles';
import { cn } from '@/lib/utils';

export function RoleLayout() {
  const { role, user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  if (!role) return null;

  const navItems = ROLE_NAVIGATION[role];
  const bottomItems = ROLE_BOTTOM_NAV[role];
  const roleLabel = ROLE_LABELS[role];

  const isActive = (path: string) =>
    location.pathname === path || (path !== navItems[0]?.path && location.pathname.startsWith(path));

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const navContent = (
    <>
      <div className="flex h-16 items-center border-b border-sidebar-border px-4">
        {collapsed ? (
          <SchoolBrand variant="compact" className="mx-auto" />
        ) : (
          <div className="min-w-0">
            <SchoolBrand imageClassName="max-h-9" />
            <p className="mt-0.5 truncate pl-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-sidebar-foreground/65">
              {roleLabel}
            </p>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.path);
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                title={collapsed ? item.label : undefined}
                className={cn(
                  'relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                  active
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground'
                )}
              >
                {active && <span className="absolute left-0 top-2 bottom-2 w-0.5 rounded-r-full bg-sidebar-primary" />}
                <Icon className={cn('h-[18px] w-[18px] shrink-0', active && 'text-sidebar-primary')} />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <Link
          to="/app/settings"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent/60"
        >
          <Settings className="h-[18px] w-[18px] shrink-0" />
          {!collapsed && <span>Definições</span>}
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="h-[18px] w-[18px] shrink-0" />
          {!collapsed && <span>Sair / trocar perfil</span>}
        </button>
        <button
          type="button"
          onClick={() => setCollapsed((value) => !value)}
          className="mt-1 hidden w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent/60 md:flex"
        >
          <ChevronLeft className={cn('h-[18px] w-[18px] shrink-0 transition-transform', collapsed && 'rotate-180')} />
          {!collapsed && <span>Recolher</span>}
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-background">
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-sidebar-border bg-sidebar md:flex transition-[width] duration-200',
          collapsed ? 'w-20' : 'w-64'
        )}
      >
        {navContent}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label="Fechar menu"
            className="absolute inset-0 bg-foreground/25"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative flex h-full w-[82%] max-w-xs flex-col border-r border-sidebar-border bg-sidebar shadow-xl">
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-lg text-sidebar-foreground hover:bg-sidebar-accent"
              aria-label="Fechar menu"
            >
              <X className="h-5 w-5" />
            </button>
            {navContent}
          </aside>
        </div>
      )}

      <header
        className={cn(
          'fixed left-0 right-0 top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background px-4 transition-[left] duration-200 md:px-6',
          collapsed ? 'md:left-20' : 'md:left-64'
        )}
      >
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border text-foreground md:hidden"
            aria-label="Abrir menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="md:hidden">
            <SchoolBrand variant="compact" />
          </div>
          <div className="hidden min-w-0 sm:block">
            <p className="truncate text-sm font-semibold text-foreground">{user?.name}</p>
            <p className="text-[11px] text-muted-foreground">{roleLabel} · modo demonstração</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={ROLE_NOTIFICATIONS[role]}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Notificações"
          >
            <Bell className="h-[18px] w-[18px]" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
          </Link>
          <Link
            to="/app/settings"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-foreground hover:bg-accent"
            aria-label="Perfil"
          >
            <UserRound className="h-[18px] w-[18px]" />
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="hidden rounded-lg border border-border px-3 py-2 text-xs font-semibold text-foreground hover:bg-muted sm:inline-flex"
          >
            Trocar perfil
          </button>
        </div>
      </header>

      <main
        className={cn(
          'min-h-screen pt-16 pb-20 transition-[padding] duration-200 md:pb-0',
          collapsed ? 'md:pl-20' : 'md:pl-64'
        )}
      >
        <div className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background md:hidden">
        <div className="grid h-16 grid-cols-4 px-1 pb-[env(safe-area-inset-bottom)]">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex flex-col items-center justify-center gap-0.5 px-1 text-[10px] font-medium',
                  active ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="max-w-full truncate">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
