import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import type { UserRole } from '@/types/roles';
import { ROLE_HOME } from '@/types/roles';

interface RoleGuardProps {
  allowed: UserRole[];
}

export function RoleGuard({ allowed }: RoleGuardProps) {
  const { role } = useAuth();

  if (!role || !allowed.includes(role)) {
    const home = role ? ROLE_HOME[role] : '/login';
    return <Navigate to={home} replace />;
  }

  return <Outlet />;
}
