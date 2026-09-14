import type { ComponentType, LazyExoticComponent } from 'react';
import type { UserRole } from '@/types/roles';

export interface AppRoute {
  path: string;
  element: ComponentType | LazyExoticComponent<ComponentType>;
  roles?: UserRole[];
  children?: AppRoute[];
  index?: boolean;
  label?: string;
}

export interface RouteModule {
  basePath: string;
  routes: AppRoute[];
  roles: UserRole[];
}
