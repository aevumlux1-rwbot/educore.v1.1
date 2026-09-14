import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  CheckCircle,
  Calendar,
  Wallet,
  MessageCircle,
  Bell,
  Users,
  BarChart3,
  UserCheck,
  FileText,
  AlertTriangle,
  Shield,
  Receipt,
  Banknote,
  GraduationCap,
  FolderOpen,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { UserRole } from '@/types/roles';

export interface RoleNavItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

export const ROLE_NAVIGATION: Record<UserRole, RoleNavItem[]> = {
  student: [
    { label: 'Painel', path: '/app/student/dashboard', icon: LayoutDashboard },
    { label: 'Disciplinas', path: '/app/student/subjects', icon: BookOpen },
    { label: 'Notas', path: '/app/student/grades', icon: ClipboardList },
    { label: 'Assiduidade', path: '/app/student/attendance', icon: CheckCircle },
    { label: 'Horário', path: '/app/student/schedule', icon: Calendar },
    { label: 'Finanças', path: '/app/student/finance', icon: Wallet },
    { label: 'Chat', path: '/app/student/chat', icon: MessageCircle },
    { label: 'Notificações', path: '/app/student/notifications', icon: Bell },
  ],
  guardian: [
    { label: 'Painel', path: '/app/guardian/dashboard', icon: LayoutDashboard },
    { label: 'Educandos', path: '/app/guardian/students', icon: Users },
    { label: 'Desempenho', path: '/app/guardian/performance', icon: BarChart3 },
    { label: 'Assiduidade', path: '/app/guardian/attendance', icon: CheckCircle },
    { label: 'Pagamentos', path: '/app/guardian/payments', icon: Wallet },
    { label: 'Chat', path: '/app/guardian/chat', icon: MessageCircle },
    { label: 'Notificações', path: '/app/guardian/notifications', icon: Bell },
  ],
  teacher: [
    { label: 'Painel', path: '/app/teacher/dashboard', icon: LayoutDashboard },
    { label: 'Horário', path: '/app/teacher/schedule', icon: Calendar },
    { label: 'Turmas', path: '/app/teacher/classes', icon: Users },
    { label: 'Presenças', path: '/app/teacher/attendance', icon: CheckCircle },
    { label: 'Lançamento', path: '/app/teacher/gradebook', icon: ClipboardList },
    { label: 'Conteúdos', path: '/app/teacher/content', icon: FolderOpen },
    { label: 'Chat', path: '/app/teacher/chat', icon: MessageCircle },
    { label: 'Notificações', path: '/app/teacher/notifications', icon: Bell },
  ],
  pedagogy: [
    { label: 'Painel', path: '/app/pedagogy/dashboard', icon: LayoutDashboard },
    { label: 'Aprovações', path: '/app/pedagogy/approvals', icon: CheckCircle },
    { label: 'Analítica', path: '/app/pedagogy/analytics', icon: BarChart3 },
    { label: 'Turmas', path: '/app/pedagogy/classes', icon: Users },
    { label: 'Professores', path: '/app/pedagogy/teachers', icon: UserCheck },
    { label: 'Risco', path: '/app/pedagogy/risk', icon: AlertTriangle },
    { label: 'Relatórios', path: '/app/pedagogy/reports', icon: FileText },
    { label: 'Notificações', path: '/app/pedagogy/notifications', icon: Bell },
  ],
  executive: [
    { label: 'Painel', path: '/app/executive/dashboard', icon: LayoutDashboard },
    { label: 'Aprovações', path: '/app/executive/approvals', icon: CheckCircle },
    { label: 'Finanças', path: '/app/executive/finance', icon: Wallet },
    { label: 'Académico', path: '/app/executive/academic', icon: GraduationCap },
    { label: 'Matrículas', path: '/app/executive/enrollment', icon: Users },
    { label: 'Relatórios', path: '/app/executive/reports', icon: FileText },
    { label: 'Auditoria', path: '/app/executive/audit', icon: Shield },
    { label: 'Notificações', path: '/app/executive/notifications', icon: Bell },
  ],
  secretary: [
    { label: 'Painel', path: '/app/secretary/dashboard', icon: LayoutDashboard },
    { label: 'Admissões', path: '/app/secretary/admissions', icon: UserCheck },
    { label: 'Matrículas', path: '/app/secretary/enrollments', icon: ClipboardList },
    { label: 'Alunos', path: '/app/secretary/students', icon: Users },
    { label: 'Documentos', path: '/app/secretary/documents', icon: FolderOpen },
    { label: 'Turmas', path: '/app/secretary/classes', icon: BookOpen },
    { label: 'Notificações', path: '/app/secretary/notifications', icon: Bell },
  ],
  finance: [
    { label: 'Painel', path: '/app/finance/dashboard', icon: LayoutDashboard },
    { label: 'Pagamentos', path: '/app/finance/payments', icon: Wallet },
    { label: 'Validação', path: '/app/finance/validation', icon: CheckCircle },
    { label: 'Facturas', path: '/app/finance/invoices', icon: FileText },
    { label: 'Devedores', path: '/app/finance/debtors', icon: AlertTriangle },
    { label: 'Recibos', path: '/app/finance/receipts', icon: Receipt },
    { label: 'Tesouraria', path: '/app/finance/treasury', icon: Banknote },
    { label: 'Relatórios', path: '/app/finance/reports', icon: BarChart3 },
    { label: 'Notificações', path: '/app/finance/notifications', icon: Bell },
  ],
};

export const ROLE_BOTTOM_NAV: Record<UserRole, RoleNavItem[]> = {
  student: ROLE_NAVIGATION.student.slice(0, 4),
  guardian: ROLE_NAVIGATION.guardian.slice(0, 4),
  teacher: ROLE_NAVIGATION.teacher.slice(0, 4),
  pedagogy: ROLE_NAVIGATION.pedagogy.slice(0, 4),
  executive: ROLE_NAVIGATION.executive.slice(0, 4),
  secretary: ROLE_NAVIGATION.secretary.slice(0, 4),
  finance: ROLE_NAVIGATION.finance.slice(0, 4),
};
