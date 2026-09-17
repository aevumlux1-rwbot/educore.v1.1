import { useTenant } from '@/contexts/TenantContext';
import LoginPage from '@/pages/auth/LoginPage';
import GenericTenantLogin from '@/pages/auth/GenericTenantLogin';

export default function TenantLoginEntry() {
  const { activeTenant } = useTenant();
  return activeTenant.slug === 'colegio-deus-connosco' ? <LoginPage /> : <GenericTenantLogin />;
}
