import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ROLE_HOME } from '@/types/roles';

export function AppRedirect() {
  const { isAuthenticated, role } = useAuth();
  if (!isAuthenticated || !role) return <Navigate to="/login" replace />;
  return <Navigate to={ROLE_HOME[role]} replace />;
}
