import { type LucideIcon } from 'lucide-react';
import { type UserRole } from './roles';

export interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
  roles?: UserRole[];
  badge?: string | number;
  children?: NavItem[];
}

export interface BreadcrumbItem {
  label: string;
  path?: string;
}
