import { Outlet, useLocation } from 'react-router-dom';
import TenantLandingEntry from '@/pages/public/TenantLandingEntry';

export function PublicLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {location.pathname === '/' ? <TenantLandingEntry /> : <Outlet />}
    </div>
  );
}
