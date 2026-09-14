import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import type { UserRole } from '@/types/roles';
import { ROLE_HOME } from '@/types/roles';

export function RoleGuard({ allowed }: { allowed: UserRole[] }) {
  const { role } = useAuth();

  if (!role || !allowed.includes(role)) {
    return <Navigate to={role ? ROLE_HOME[role] : '/login'} replace />;
  }

  return <Outlet />;
}
