import { useTenant } from '@/contexts/TenantContext';
import LandingPage from '@/pages/public/LandingPage';
import PascoaLanding from '@/pages/public/PascoaLanding';
import GenericTenantLanding from '@/pages/public/GenericTenantLanding';

export default function TenantLandingEntry() {
  const { activeTenant } = useTenant();

  if (activeTenant.slug === 'colegio-deus-connosco') {
    return <LandingPage />;
  }

  if (activeTenant.slug === 'colegio-pascoa') {
    return <PascoaLanding />;
  }

  return <GenericTenantLanding />;
}
