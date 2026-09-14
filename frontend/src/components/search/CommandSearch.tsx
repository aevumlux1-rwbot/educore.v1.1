import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, GraduationCap, Wallet, BookOpen, MessageCircle, Newspaper, Bell, Settings, Users, LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';

const searchItems = [
  { label: 'Dashboard', path: '/app', icon: LayoutDashboard, category: 'Navigation' },
  { label: 'Academic', path: '/app/academic', icon: GraduationCap, category: 'Navigation' },
  { label: 'Finance', path: '/app/finance', icon: Wallet, category: 'Navigation' },
  { label: 'Knowledge Space', path: '/app/knowledge', icon: BookOpen, category: 'Navigation' },
  { label: 'Chat', path: '/app/chat', icon: MessageCircle, category: 'Navigation' },
  { label: 'Feed', path: '/app/feed', icon: Newspaper, category: 'Navigation' },
  { label: 'Notifications', path: '/app/notifications', icon: Bell, category: 'Navigation' },
  { label: 'Settings', path: '/app/settings', icon: Settings, category: 'Navigation' },
  { label: 'Mathematics II', path: '/app/academic', icon: BookOpen, category: 'Subjects' },
  { label: 'Physics', path: '/app/academic', icon: BookOpen, category: 'Subjects' },
  { label: 'Chemistry', path: '/app/academic', icon: BookOpen, category: 'Subjects' },
  { label: 'Tuition Fee — Term 2', path: '/app/finance', icon: Wallet, category: 'Payments' },
  { label: 'Lab Fee — Chemistry', path: '/app/finance', icon: Wallet, category: 'Payments' },
  { label: 'Dr. Maria Smith', path: '/app/chat', icon: Users, category: 'People' },
  { label: 'Prof. Alex John', path: '/app/chat', icon: Users, category: 'People' },
];

interface CommandSearchProps {
  open: boolean;
  onClose: () => void;
}

export function CommandSearch({ open, onClose }: CommandSearchProps) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const filtered = query
    ? searchItems.filter(item => item.label.toLowerCase().includes(query.toLowerCase()))
    : searchItems;

  const grouped = filtered.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof searchItems>);

  const handleSelect = useCallback((path: string) => {
    navigate(path);
    onClose();
    setQuery('');
  }, [navigate, onClose]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (open) onClose();
        else onClose(); // toggle handled by parent
      }
      if (e.key === 'Escape' && open) onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]" onClick={onClose}>
      <div className="fixed inset-0 bg-foreground/20 glass" />
      <div
        className="relative z-10 w-full max-w-lg rounded-2xl border border-border bg-card shadow-lg animate-scale-in overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <input
            type="text"
            placeholder="Search anything..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-border bg-muted px-1.5 text-[10px] font-medium text-muted-foreground">ESC</kbd>
        </div>
        <div className="max-h-[50vh] overflow-y-auto p-2 scrollbar-thin">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category} className="mb-2">
              <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{category}</p>
              {items.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label + item.path}
                    onClick={() => handleSelect(item.path)}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                  >
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground">No results found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
