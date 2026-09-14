import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { UserProfile, UserRole } from '@/types/roles';
import { ROLE_HOME } from '@/types/roles';

interface AuthContextValue {
  user: UserProfile | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole, remember?: boolean) => void;
  logout: () => void;
  getRedirectPath: () => string;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const STORAGE_KEY = 'colegio-deus-connosco.demo-auth';

const DEMO_USERS: Record<UserRole, UserProfile> = {
  student: {
    id: 'ALU-001',
    name: 'Amélia Mondlane',
    email: 'aluno@example.edu',
    role: 'student',
    institution: 'Colégio Deus Connosco',
  },
  guardian: {
    id: 'ENC-001',
    name: 'José Mondlane',
    email: 'encarregado@example.edu',
    role: 'guardian',
    institution: 'Colégio Deus Connosco',
  },
  teacher: {
    id: 'PROF-001',
    name: 'Prof. António Magaia',
    email: 'professor@example.edu',
    role: 'teacher',
    institution: 'Colégio Deus Connosco',
  },
  pedagogy: {
    id: 'PED-001',
    name: 'Prof.ª Ana Costa',
    email: 'pedagogia@example.edu',
    role: 'pedagogy',
    institution: 'Colégio Deus Connosco',
  },
  executive: {
    id: 'DIR-001',
    name: 'Dr. Manuel Sitoe',
    email: 'direccao@example.edu',
    role: 'executive',
    institution: 'Colégio Deus Connosco',
  },
  secretary: {
    id: 'SEC-001',
    name: 'Laura Tembe',
    email: 'secretaria@example.edu',
    role: 'secretary',
    institution: 'Colégio Deus Connosco',
  },
  finance: {
    id: 'FIN-001',
    name: 'Carlos Mendes',
    email: 'financas@example.edu',
    role: 'finance',
    institution: 'Colégio Deus Connosco',
  },
};

function readStoredAuth(): { user: UserProfile | null; role: UserRole | null } {
  if (typeof window === 'undefined') return { user: null, role: null };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { user: null, role: null };
    const parsed = JSON.parse(raw) as { user?: UserProfile; role?: UserRole };
    if (parsed.user && parsed.role) return { user: parsed.user, role: parsed.role };
  } catch {
    // Ignore corrupted demo state.
  }
  return { user: null, role: null };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const initial = useMemo(readStoredAuth, []);
  const [user, setUser] = useState<UserProfile | null>(initial.user);
  const [role, setRole] = useState<UserRole | null>(initial.role);

  const login = useCallback((email: string, _password: string, selectedRole: UserRole, remember = true) => {
    const base = DEMO_USERS[selectedRole];
    const nextUser = { ...base, email: email.trim() || base.email };
    setUser(nextUser);
    setRole(selectedRole);

    try {
      if (remember) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: nextUser, role: selectedRole }));
      } else {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // Demo still works in memory when storage is unavailable.
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setRole(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // No-op.
    }
  }, []);

  const getRedirectPath = useCallback(() => (role ? ROLE_HOME[role] : '/login'), [role]);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    role,
    isAuthenticated: Boolean(user && role),
    login,
    logout,
    getRedirectPath,
  }), [user, role, login, logout, getRedirectPath]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
