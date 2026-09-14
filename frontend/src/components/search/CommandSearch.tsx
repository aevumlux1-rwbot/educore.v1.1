import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, GraduationCap, Wallet, BookOpen, MessageCircle, Newspaper, Bell, Settings, Users, LayoutDashboard, ClipboardList, Calendar, CheckCircle, FileText, BarChart3, AlertTriangle, FolderOpen, UserCheck, Shield, Receipt, Banknote, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import type { UserRole } from '@/types/roles';

type SearchEntry = { label: string; path: string; icon: LucideIcon; category: string };

const ROLE_ITEMS: Record<UserRole, SearchEntry[]> = {
  student: [
    { label: 'Painel', path: '/app/student/dashboard', icon: LayoutDashboard, category: 'Navegação' },
    { label: 'Notas', path: '/app/student/grades', icon: ClipboardList, category: 'Navegação' },
    { label: 'Assiduidade', path: '/app/student/attendance', icon: CheckCircle, category: 'Navegação' },
    { label: 'Horário', path: '/app/student/schedule', icon: Calendar, category: 'Navegação' },
    { label: 'Agenda', path: '/app/student/agenda', icon: Calendar, category: 'Navegação' },
    { label: 'Conteúdos', path: '/app/student/knowledge', icon: BookOpen, category: 'Navegação' },
    { label: 'Finanças', path: '/app/student/finance', icon: Wallet, category: 'Navegação' },
    { label: 'Chat', path: '/app/student/chat', icon: MessageCircle, category: 'Navegação' },
    { label: 'Actualizações', path: '/app/student/feed', icon: Newspaper, category: 'Navegação' },
    { label: 'Notificações', path: '/app/student/notifications', icon: Bell, category: 'Navegação' },
    { label: 'Definições', path: '/app/settings', icon: Settings, category: 'Navegação' },
    { label: 'Matemática', path: '/app/student/knowledge?subject=Matem%C3%A1tica', icon: BookOpen, category: 'Disciplinas' },
    { label: 'Física', path: '/app/student/knowledge?subject=F%C3%ADsica', icon: BookOpen, category: 'Disciplinas' },
    { label: 'Química', path: '/app/student/knowledge?subject=Qu%C3%ADmica', icon: BookOpen, category: 'Disciplinas' },
    { label: 'Biologia', path: '/app/student/knowledge?subject=Biologia', icon: BookOpen, category: 'Disciplinas' },
    { label: 'Propinas', path: '/app/student/finance', icon: Wallet, category: 'Pagamentos' },
  ],
  guardian: [
    { label: 'Painel', path: '/app/guardian/dashboard', icon: LayoutDashboard, category: 'Navegação' },
    { label: 'Educandos', path: '/app/guardian/students', icon: Users, category: 'Navegação' },
    { label: 'Desempenho', path: '/app/guardian/performance', icon: BarChart3, category: 'Navegação' },
    { label: 'Assiduidade', path: '/app/guardian/attendance', icon: CheckCircle, category: 'Navegação' },
    { label: 'Horário', path: '/app/guardian/schedule', icon: Calendar, category: 'Navegação' },
    { label: 'Finanças', path: '/app/guardian/finance', icon: Wallet, category: 'Navegação' },
    { label: 'Pagamentos', path: '/app/guardian/payments', icon: Receipt, category: 'Navegação' },
    { label: 'Documentos', path: '/app/guardian/documents', icon: FolderOpen, category: 'Navegação' },
    { label: 'Chat', path: '/app/guardian/chat', icon: MessageCircle, category: 'Navegação' },
    { label: 'Notificações', path: '/app/guardian/notifications', icon: Bell, category: 'Navegação' },
    { label: 'Definições', path: '/app/settings', icon: Settings, category: 'Navegação' },
  ],
  teacher: [
    { label: 'Painel', path: '/app/teacher/dashboard', icon: LayoutDashboard, category: 'Navegação' },
    { label: 'Lançamento de Notas', path: '/app/teacher/gradebook', icon: ClipboardList, category: 'Navegação' },
    { label: 'Turmas', path: '/app/teacher/classes', icon: Users, category: 'Navegação' },
    { label: 'Presenças', path: '/app/teacher/attendance', icon: CheckCircle, category: 'Navegação' },
    { label: 'Avaliações', path: '/app/teacher/assessments', icon: ClipboardList, category: 'Navegação' },
    { label: 'Horário', path: '/app/teacher/schedule', icon: Calendar, category: 'Navegação' },
    { label: 'Conteúdos', path: '/app/teacher/knowledge', icon: FolderOpen, category: 'Navegação' },
    { label: 'Chat', path: '/app/teacher/chat', icon: MessageCircle, category: 'Navegação' },
    { label: 'Notificações', path: '/app/teacher/notifications', icon: Bell, category: 'Navegação' },
    { label: 'Definições', path: '/app/settings', icon: Settings, category: 'Navegação' },
  ],
  pedagogy: [
    { label: 'Painel', path: '/app/pedagogy/dashboard', icon: LayoutDashboard, category: 'Navegação' },
    { label: 'Analítica', path: '/app/pedagogy/analytics', icon: BarChart3, category: 'Navegação' },
    { label: 'Turmas', path: '/app/pedagogy/classes', icon: Users, category: 'Navegação' },
    { label: 'Professores', path: '/app/pedagogy/teachers', icon: UserCheck, category: 'Navegação' },
    { label: 'Assiduidade', path: '/app/pedagogy/attendance', icon: CheckCircle, category: 'Navegação' },
    { label: 'Horário', path: '/app/pedagogy/schedule', icon: Calendar, category: 'Navegação' },
    { label: 'Risco', path: '/app/pedagogy/risk', icon: AlertTriangle, category: 'Navegação' },
    { label: 'Relatórios', path: '/app/pedagogy/reports', icon: FileText, category: 'Navegação' },
    { label: 'Definições', path: '/app/settings', icon: Settings, category: 'Navegação' },
  ],
  executive: [
    { label: 'Painel', path: '/app/executive/dashboard', icon: LayoutDashboard, category: 'Navegação' },
    { label: 'Finanças', path: '/app/executive/finance', icon: Wallet, category: 'Navegação' },
    { label: 'Académico', path: '/app/executive/academic', icon: GraduationCap, category: 'Navegação' },
    { label: 'Matrículas', path: '/app/executive/enrollment', icon: Users, category: 'Navegação' },
    { label: 'Relatórios', path: '/app/executive/reports', icon: FileText, category: 'Navegação' },
    { label: 'Auditoria', path: '/app/executive/audit', icon: Shield, category: 'Navegação' },
    { label: 'Definições', path: '/app/settings', icon: Settings, category: 'Navegação' },
  ],
  secretary: [
    { label: 'Painel', path: '/app/secretary/dashboard', icon: LayoutDashboard, category: 'Navegação' },
    { label: 'Admissões', path: '/app/secretary/admissions', icon: UserCheck, category: 'Navegação' },
    { label: 'Matrículas', path: '/app/secretary/enrollments', icon: ClipboardList, category: 'Navegação' },
    { label: 'Alunos', path: '/app/secretary/students', icon: Users, category: 'Navegação' },
    { label: 'Documentos', path: '/app/secretary/documents', icon: FolderOpen, category: 'Navegação' },
    { label: 'Turmas', path: '/app/secretary/classes', icon: BookOpen, category: 'Navegação' },
    { label: 'Horário', path: '/app/secretary/schedule', icon: Calendar, category: 'Navegação' },
    { label: 'Regularidade', path: '/app/secretary/regularity', icon: CheckCircle, category: 'Navegação' },
    { label: 'Definições', path: '/app/settings', icon: Settings, category: 'Navegação' },
  ],
  finance: [
    { label: 'Painel', path: '/app/finance/dashboard', icon: LayoutDashboard, category: 'Navegação' },
    { label: 'Pagamentos', path: '/app/finance/payments', icon: Wallet, category: 'Navegação' },
    { label: 'Validação', path: '/app/finance/validation', icon: CheckCircle, category: 'Navegação' },
    { label: 'Obrigações', path: '/app/finance/obligations', icon: FileText, category: 'Navegação' },
    { label: 'Contas', path: '/app/finance/accounts', icon: Users, category: 'Navegação' },
    { label: 'Recibos', path: '/app/finance/receipts', icon: Receipt, category: 'Navegação' },
    { label: 'Multas', path: '/app/finance/penalties', icon: AlertTriangle, category: 'Navegação' },
    { label: 'Tesouraria', path: '/app/finance/treasury', icon: Banknote, category: 'Navegação' },
    { label: 'Relatórios', path: '/app/finance/reports', icon: BarChart3, category: 'Navegação' },
    { label: 'Definições', path: '/app/settings', icon: Settings, category: 'Navegação' },
  ],
};

interface CommandSearchProps {
  open: boolean;
  onClose: () => void;
}

export function CommandSearch({ open, onClose }: CommandSearchProps) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { role } = useAuth();

  const items = useMemo<SearchEntry[]>(() => (role ? ROLE_ITEMS[role] : []), [role]);

  const filtered = query
    ? items.filter(item => item.label.toLowerCase().includes(query.toLowerCase()))
    : items;

  const grouped = filtered.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, SearchEntry[]>);

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
