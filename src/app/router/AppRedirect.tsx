import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export function AppRedirect() {
  const { getRedirectPath } = useAuth();
  return <Navigate to={getRedirectPath()} replace />;
}
