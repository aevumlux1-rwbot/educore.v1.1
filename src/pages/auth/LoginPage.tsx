import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  BriefcaseBusiness,
  Calculator,
  Eye,
  EyeOff,
  GraduationCap,
  Landmark,
  ShieldCheck,
  UserRoundCheck,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { SchoolBrand } from '@/components/brand/SchoolBrand';
import { useAuth } from '@/contexts/AuthContext';
import { ROLE_HOME, ROLE_LABELS, type UserRole } from '@/types/roles';
import { cn } from '@/lib/utils';

const PROFILE_META: Record<UserRole, { icon: LucideIcon; description: string }> = {
  student: { icon: GraduationCap, description: 'Notas, horário e finanças' },
  guardian: { icon: Users, description: 'Acompanhar os educandos' },
  teacher: { icon: BookOpen, description: 'Turmas, avaliações e conteúdos' },
  pedagogy: { icon: UserRoundCheck, description: 'Coordenação académica' },
  executive: { icon: Landmark, description: 'Visão institucional' },
  secretary: { icon: BriefcaseBusiness, description: 'Matrículas e documentos' },
  finance: { icon: Calculator, description: 'Tesouraria e pagamentos' },
};

const ROLES = Object.keys(PROFILE_META) as UserRole[];

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('demo');
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { login, isAuthenticated, role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && role) navigate(ROLE_HOME[role], { replace: true });
  }, [isAuthenticated, role, navigate]);

  const selected = useMemo(() => PROFILE_META[selectedRole], [selectedRole]);
  const SelectedIcon = selected.icon;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    login(email, password, selectedRole, remember);
    navigate(ROLE_HOME[selectedRole], { replace: true });
  };

  return (
    <div className="min-h-screen bg-background px-4 py-8 sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-5xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl border border-border bg-card shadow-xl lg:grid-cols-[0.9fr_1.1fr]">
          <section className="flex flex-col justify-between bg-primary p-7 text-primary-foreground sm:p-9">
            <div>
              <SchoolBrand imageClassName="max-h-14 brightness-0 invert" />
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/70">
                Plataforma digital institucional
              </p>
              <h1 className="mt-3 font-heading text-3xl font-bold leading-tight sm:text-4xl">
                Colégio Deus Connosco
              </h1>
              <p className="mt-4 max-w-md text-sm leading-6 text-primary-foreground/80">
                Demonstração navegável com experiências específicas para alunos, famílias, docentes e equipas administrativas.
              </p>
            </div>

            <div className="mt-10 rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold">Modo de apresentação</p>
                  <p className="mt-1 text-xs leading-5 text-primary-foreground/75">
                    Seleccione um perfil e entre. Os dados e acções desta versão são simulados localmente para demonstração.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="p-6 sm:p-8 lg:p-9">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Acesso</p>
              <h2 className="mt-1 font-heading text-2xl font-bold text-foreground">Escolha o perfil</h2>
              <p className="mt-1 text-sm text-muted-foreground">Cada perfil abre a sua própria área e navegação.</p>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {ROLES.map((item) => {
                const meta = PROFILE_META[item];
                const Icon = meta.icon;
                const active = item === selectedRole;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setSelectedRole(item)}
                    className={cn(
                      'rounded-xl border p-3 text-left transition-colors',
                      active
                        ? 'border-primary bg-primary/5 ring-2 ring-ring/20'
                        : 'border-border bg-background hover:border-primary/30 hover:bg-muted/40'
                    )}
                  >
                    <div className={cn('flex h-8 w-8 items-center justify-center rounded-lg', active ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground')}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <p className="mt-2 text-xs font-semibold text-foreground">{ROLE_LABELS[item]}</p>
                    <p className="mt-0.5 line-clamp-2 text-[10px] leading-4 text-muted-foreground">{meta.description}</p>
                  </button>
                );
              })}
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-foreground">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="nome@example.edu"
                  className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-ring/20"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-foreground">Palavra-passe</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 pr-10 text-sm text-foreground outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-ring/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? 'Ocultar palavra-passe' : 'Mostrar palavra-passe'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="mt-1 text-[10px] text-muted-foreground">Nesta demonstração, qualquer palavra-passe é aceite.</p>
              </div>

              <label className="flex items-center gap-2 text-xs text-muted-foreground">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(event) => setRemember(event.target.checked)}
                  className="h-4 w-4 rounded border-input accent-primary"
                />
                Manter sessão de demonstração
              </label>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <SelectedIcon className="h-4 w-4" />
                Entrar como {ROLE_LABELS[selectedRole]}
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
