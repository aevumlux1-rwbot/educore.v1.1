import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { TenantProvider, useTenant } from "@/contexts/TenantContext";
import { AppRouter } from "@/app/router/appRouter";
import PlatformAdminPage from "@/pages/platform/PlatformAdminPage";
import TenantLoginEntry from "@/pages/auth/TenantLoginEntry";
import { isPathEnabledForTenant } from "@/platform/tenancy/entitlements";

const queryClient = new QueryClient();

function PoweredByEduCore() {
  return <div className="pointer-events-none fixed bottom-2 right-3 z-[70] hidden rounded-full border border-border/70 bg-background/90 px-2.5 py-1 text-[10px] font-semibold text-muted-foreground shadow-sm backdrop-blur md:block">Powered by EduCore</div>;
}

function RoutedExperience() {
  const { activeTenant } = useTenant();
  const { pathname } = useLocation();

  if (pathname.startsWith('/platform')) {
    return <PlatformAdminPage />;
  }

  if (pathname === '/login') {
    return <><TenantLoginEntry /><PoweredByEduCore /></>;
  }

  if (pathname.startsWith('/app') && !isPathEnabledForTenant(pathname, activeTenant)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-5 text-foreground">
        <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-7 text-center shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">EduCore · Tenant policy</p>
          <h1 className="mt-3 font-heading text-2xl font-bold text-primary">Módulo não disponível</h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">Este módulo não está activo para {activeTenant.branding.displayName}.</p>
          <a href="/app" className="mt-6 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground">Voltar ao portal</a>
        </div>
      </div>
    );
  }

  return <><AppRouter /><PoweredByEduCore /></>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <TenantProvider>
          <AuthProvider>
            <RoutedExperience />
          </AuthProvider>
        </TenantProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
