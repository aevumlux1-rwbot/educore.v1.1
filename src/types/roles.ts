export type UserRole =
  | 'student'
  | 'guardian'
  | 'teacher'
  | 'pedagogy'
  | 'executive'
  | 'secretary'
  | 'finance';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  institution: string;
}

export const ROLE_LABELS: Record<UserRole, string> = {
  student: 'Aluno',
  guardian: 'Encarregado',
  teacher: 'Professor',
  pedagogy: 'Pedagogia',
  executive: 'Direcção',
  secretary: 'Secretaria',
  finance: 'Finanças',
};

export const ROLE_HOME: Record<UserRole, string> = {
  student: '/app/student/dashboard',
  guardian: '/app/guardian/dashboard',
  teacher: '/app/teacher/dashboard',
  pedagogy: '/app/pedagogy/dashboard',
  executive: '/app/executive/dashboard',
  secretary: '/app/secretary/dashboard',
  finance: '/app/finance/dashboard',
};

export const ROLE_NOTIFICATIONS: Record<UserRole, string> = {
  student: '/app/student/notifications',
  guardian: '/app/guardian/notifications',
  teacher: '/app/teacher/notifications',
  pedagogy: '/app/pedagogy/notifications',
  executive: '/app/executive/notifications',
  secretary: '/app/secretary/notifications',
  finance: '/app/finance/notifications',
};
