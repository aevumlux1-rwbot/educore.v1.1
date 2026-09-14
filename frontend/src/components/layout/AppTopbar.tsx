import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CommandSearch } from '@/components/search/CommandSearch';

interface AppTopbarProps {
  sidebarCollapsed: boolean;
  pageTitle?: string;
}

export function AppTopbar({ sidebarCollapsed, pageTitle }: AppTopbarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 right-0 z-30 flex h-[var(--topbar-height)] items-center justify-between border-b border-border bg-background/80 glass px-6 transition-all duration-300',
          sidebarCollapsed
            ? 'left-[var(--sidebar-collapsed-width)]'
            : 'left-[var(--sidebar-width)]',
          'max-md:left-0'
        )}
      >
        <div className="flex items-center gap-4">
          {pageTitle && (
            <h1 className="font-heading text-lg font-semibold text-foreground">{pageTitle}</h1>
          )}
        </div>

        <div className="hidden md:flex max-w-md flex-1 mx-8">
          <button
            onClick={() => setSearchOpen(true)}
            className="relative w-full text-left group"
          >
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <div className="w-full rounded-xl border border-border bg-muted/40 py-2 pl-10 pr-4 text-sm text-muted-foreground group-hover:border-primary/30 group-hover:bg-muted/70 transition-all">
              Pesquisar na plataforma…
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex h-5 items-center gap-1 rounded border border-border bg-card px-1.5 text-[10px] font-medium text-muted-foreground">⌘K</kbd>
            </div>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => setSearchOpen(true)} className="relative flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground hover:bg-muted transition-colors active:scale-90 md:hidden">
            <Search className="h-[18px] w-[18px]" />
          </button>
          <button
            onClick={() => navigate('/app/notifications')}
            className="relative flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground hover:bg-muted transition-colors active:scale-90"
          >
            <Bell className="h-[18px] w-[18px]" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
          </button>
          <button
            onClick={() => navigate('/app/settings')}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted text-foreground transition-colors hover:bg-accent active:scale-90"
          >
            <User className="h-[18px] w-[18px]" />
          </button>
        </div>
      </header>

      <CommandSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
