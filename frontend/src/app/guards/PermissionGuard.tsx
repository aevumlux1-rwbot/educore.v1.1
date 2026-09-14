import { Navigate, Outlet } from 'react-router-dom';

interface PermissionGuardProps {
  /** Permission key to check, e.g. 'finance:treasury' */
  permission: string;
}

/**
 * PermissionGuard – fine-grained access control for sensitive sub-routes.
 * Replace `hasPermission` with real permission check.
 */
export function PermissionGuard({ permission }: PermissionGuardProps) {
  // TODO: replace with real permission check
  const hasPermission = (_p: string) => true;

  if (!hasPermission(permission)) {
    return <Navigate to="/app" replace />;
  }

  return <Outlet />;
}
