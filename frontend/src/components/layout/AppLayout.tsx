import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { AppTopbar } from '@/components/layout/AppTopbar';
import { BottomNav } from '@/components/layout/BottomNav';
import { cn } from '@/lib/utils';

export function AppLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <AppSidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed((v) => !v)}
        />
      </div>

      {/* Topbar */}
      <AppTopbar sidebarCollapsed={sidebarCollapsed} />

      {/* Main content */}
      <main
        className={cn(
          'pt-[var(--topbar-height)] pb-[var(--bottom-nav-height)] md:pb-0 transition-all duration-300',
          sidebarCollapsed
            ? 'md:pl-[var(--sidebar-collapsed-width)]'
            : 'md:pl-[var(--sidebar-width)]'
        )}
      >
        <div className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>

      {/* Mobile bottom nav */}
      <BottomNav />
    </div>
  );
}
