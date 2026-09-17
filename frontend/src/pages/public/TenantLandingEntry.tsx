import { useTenant } from '@/contexts/TenantContext';
import LandingPage from '@/pages/public/LandingPage';
import GenericTenantLanding from '@/pages/public/GenericTenantLanding';

export default function TenantLandingEntry() {
  const { activeTenant } = useTenant();

  if (activeTenant.slug === 'colegio-deus-connosco') {
    return <LandingPage />;
  }

  return <GenericTenantLanding />;
}
