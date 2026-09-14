import {
  LayoutDashboard,
  GraduationCap,
  Wallet,
  BookOpen,
  MessageCircle,
  Newspaper,
  Bell,
  Users,
  ClipboardList,
  Calendar,
  CheckCircle,
  FileText,
  BarChart3,
  AlertTriangle,
  FolderOpen,
  UserCheck,
  Shield,
  Receipt,
  Banknote,
} from 'lucide-react';
import type { NavItem } from '@/types/navigation';
import type { UserRole } from '@/types/roles';

/* ─── Aluno ─── */
const studentNav: NavItem[] = [
  { label: 'Painel', path: '/app/student/dashboard', icon: LayoutDashboard },
  { label: 'Disciplinas', path: '/app/student/subjects', icon: BookOpen },
  { label: 'Notas', path: '/app/student/grades', icon: ClipboardList },
  { label: 'Avaliações', path: '/app/student/assessments-calendar', icon: Calendar },
  { label: 'Assiduidade', path: '/app/student/attendance', icon: CheckCircle },
  { label: 'Horário', path: '/app/student/schedule', icon: Calendar },
  { label: 'Conteúdos', path: '/app/student/knowledge', icon: BookOpen },
  { label: 'Finanças', path: '/app/student/finance', icon: Wallet },
  { label: 'Chat', path: '/app/student/chat', icon: MessageCircle },
  { label: 'Actualizações', path: '/app/student/feed', icon: Newspaper },
  { label: 'Notificações', path: '/app/student/notifications', icon: Bell },
];

/* ─── Encarregado ─── */
const guardianNav: NavItem[] = [
  { label: 'Painel', path: '/app/guardian/dashboard', icon: LayoutDashboard },
  { label: 'Educandos', path: '/app/guardian/students', icon: Users },
  { label: 'Desempenho', path: '/app/guardian/performance', icon: BarChart3 },
  { label: 'Avaliações', path: '/app/guardian/assessments-calendar', icon: Calendar },
  { label: 'Assiduidade', path: '/app/guardian/attendance', icon: CheckCircle },
  { label: 'Horário', path: '/app/guardian/schedule', icon: Calendar },
  { label: 'Finanças', path: '/app/guardian/finance', icon: Wallet },
  { label: 'Pagamentos', path: '/app/guardian/payments', icon: Receipt },
  { label: 'Chat', path: '/app/guardian/chat', icon: MessageCircle },
  { label: 'Notificações', path: '/app/guardian/notifications', icon: Bell },
];

/* ─── Professor ─── */
const teacherNav: NavItem[] = [
  { label: 'Painel', path: '/app/teacher/dashboard', icon: LayoutDashboard },
  { label: 'Horário', path: '/app/teacher/schedule', icon: Calendar },
  { label: 'Turmas', path: '/app/teacher/classes', icon: Users },
  { label: 'Presenças', path: '/app/teacher/attendance', icon: CheckCircle },
  { label: 'Avaliações', path: '/app/teacher/assessments', icon: ClipboardList },
  { label: 'Lançamento', path: '/app/teacher/gradebook', icon: BookOpen },
  { label: 'Conteúdos', path: '/app/teacher/knowledge', icon: FolderOpen },
  { label: 'Chat', path: '/app/teacher/chat', icon: MessageCircle },
  { label: 'Notificações', path: '/app/teacher/notifications', icon: Bell },
];

/* ─── Pedagogia ─── */
const pedagogyNav: NavItem[] = [
  { label: 'Painel', path: '/app/pedagogy/dashboard', icon: LayoutDashboard },
  { label: 'Aprovações', path: '/app/pedagogy/approvals', icon: CheckCircle },
  { label: 'Calendário', path: '/app/pedagogy/assessments-calendar', icon: Calendar },
  { label: 'Analítica', path: '/app/pedagogy/analytics', icon: BarChart3 },
  { label: 'Turmas', path: '/app/pedagogy/classes', icon: Users },
  { label: 'Professores', path: '/app/pedagogy/teachers', icon: UserCheck },
  { label: 'Assiduidade', path: '/app/pedagogy/attendance', icon: CheckCircle },
  { label: 'Horário', path: '/app/pedagogy/schedule', icon: Calendar },
  { label: 'Risco', path: '/app/pedagogy/risk', icon: AlertTriangle },
  { label: 'Relatórios', path: '/app/pedagogy/reports', icon: FileText },
];

/* ─── Direcção ─── */
const executiveNav: NavItem[] = [
  { label: 'Painel', path: '/app/executive/dashboard', icon: LayoutDashboard },
  { label: 'Aprovações', path: '/app/executive/approvals', icon: CheckCircle },
  { label: 'Finanças', path: '/app/executive/finance', icon: Wallet },
  { label: 'Académico', path: '/app/executive/academic', icon: GraduationCap },
  { label: 'Matrículas', path: '/app/executive/enrollment', icon: Users },
  { label: 'Relatórios', path: '/app/executive/reports', icon: FileText },
  { label: 'Auditoria', path: '/app/executive/audit', icon: Shield },
];

/* ─── Secretaria ─── */
const secretaryNav: NavItem[] = [
  { label: 'Painel', path: '/app/secretary/dashboard', icon: LayoutDashboard },
  { label: 'Admissões', path: '/app/secretary/admissions', icon: UserCheck },
  { label: 'Matrículas', path: '/app/secretary/enrollments', icon: ClipboardList },
  { label: 'Alunos', path: '/app/secretary/students', icon: Users },
  { label: 'Documentos', path: '/app/secretary/documents', icon: FolderOpen },
  { label: 'Turmas', path: '/app/secretary/classes', icon: BookOpen },
  { label: 'Horário', path: '/app/secretary/schedule', icon: Calendar },
  { label: 'Regularidade', path: '/app/secretary/regularity', icon: CheckCircle },
];

/* ─── Finanças ─── */
const financeNav: NavItem[] = [
  { label: 'Painel', path: '/app/finance/dashboard', icon: LayoutDashboard },
  { label: 'Pagamentos', path: '/app/finance/payments', icon: Wallet },
  { label: 'Validação', path: '/app/finance/validation', icon: CheckCircle },
  { label: 'Facturas', path: '/app/finance/invoices', icon: FileText },
  { label: 'Devedores', path: '/app/finance/debtors', icon: AlertTriangle },
  { label: 'Obrigações', path: '/app/finance/obligations', icon: FileText },
  { label: 'Contas', path: '/app/finance/accounts', icon: Users },
  { label: 'Recibos', path: '/app/finance/receipts', icon: Receipt },
  { label: 'Multas', path: '/app/finance/penalties', icon: AlertTriangle },
  { label: 'Tesouraria', path: '/app/finance/treasury', icon: Banknote },
  { label: 'Relatórios', path: '/app/finance/reports', icon: BarChart3 },
];

export const ROLE_NAVIGATION: Record<UserRole, NavItem[]> = {
  student: studentNav,
  guardian: guardianNav,
  teacher: teacherNav,
  pedagogy: pedagogyNav,
  executive: executiveNav,
  secretary: secretaryNav,
  finance: financeNav,
};

/* ─── Navegação inferior (mobile) ─── */
const studentBottom: NavItem[] = [
  { label: 'Início', path: '/app/student/dashboard', icon: LayoutDashboard },
  { label: 'Notas', path: '/app/student/grades', icon: ClipboardList },
  { label: 'Finanças', path: '/app/student/finance', icon: Wallet },
  { label: 'Chat', path: '/app/student/chat', icon: MessageCircle },
];

const guardianBottom: NavItem[] = [
  { label: 'Início', path: '/app/guardian/dashboard', icon: LayoutDashboard },
  { label: 'Educandos', path: '/app/guardian/students', icon: Users },
  { label: 'Pagamentos', path: '/app/guardian/payments', icon: Wallet },
  { label: 'Chat', path: '/app/guardian/chat', icon: MessageCircle },
];

const teacherBottom: NavItem[] = [
  { label: 'Início', path: '/app/teacher/dashboard', icon: LayoutDashboard },
  { label: 'Turmas', path: '/app/teacher/classes', icon: Users },
  { label: 'Notas', path: '/app/teacher/gradebook', icon: BookOpen },
  { label: 'Chat', path: '/app/teacher/chat', icon: MessageCircle },
];

const staffBottom: NavItem[] = [
  { label: 'Início', path: '/app/pedagogy/dashboard', icon: LayoutDashboard },
  { label: 'Analítica', path: '/app/pedagogy/analytics', icon: BarChart3 },
  { label: 'Turmas', path: '/app/pedagogy/classes', icon: Users },
  { label: 'Relatórios', path: '/app/pedagogy/reports', icon: FileText },
];

const executiveBottom: NavItem[] = [
  { label: 'Início', path: '/app/executive/dashboard', icon: LayoutDashboard },
  { label: 'Finanças', path: '/app/executive/finance', icon: Wallet },
  { label: 'Relatórios', path: '/app/executive/reports', icon: FileText },
  { label: 'Auditoria', path: '/app/executive/audit', icon: Shield },
];

const secretaryBottom: NavItem[] = [
  { label: 'Início', path: '/app/secretary/dashboard', icon: LayoutDashboard },
  { label: 'Alunos', path: '/app/secretary/students', icon: Users },
  { label: 'Admissões', path: '/app/secretary/admissions', icon: UserCheck },
  { label: 'Documentos', path: '/app/secretary/documents', icon: FolderOpen },
];

const financeBottom: NavItem[] = [
  { label: 'Início', path: '/app/finance/dashboard', icon: LayoutDashboard },
  { label: 'Pagamentos', path: '/app/finance/payments', icon: Wallet },
  { label: 'Validação', path: '/app/finance/validation', icon: CheckCircle },
  { label: 'Relatórios', path: '/app/finance/reports', icon: BarChart3 },
];

export const ROLE_BOTTOM_NAV: Record<UserRole, NavItem[]> = {
  student: studentBottom,
  guardian: guardianBottom,
  teacher: teacherBottom,
  pedagogy: staffBottom,
  executive: executiveBottom,
  secretary: secretaryBottom,
  finance: financeBottom,
};
