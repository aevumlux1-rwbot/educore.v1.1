import { useTenant } from '@/contexts/TenantContext';
import LoginPage from '@/pages/auth/LoginPage';
import GenericTenantLogin from '@/pages/auth/GenericTenantLogin';
import PascoaLogin from '@/pages/auth/PascoaLogin';

export default function TenantLoginEntry() {
  const { activeTenant } = useTenant();

  if (activeTenant.slug === 'colegio-deus-connosco') {
    return <LoginPage />;
  }

  if (activeTenant.slug === 'colegio-pascoa') {
    return <PascoaLogin />;
  }

  return <GenericTenantLogin />;
}
