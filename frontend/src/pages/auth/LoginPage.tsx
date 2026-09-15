import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import type { UserRole } from '@/types/roles';
import { ROLE_HOME } from '@/types/roles';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Brand } from '@/components/shared/Brand';

const DEMO_ROLES: { role: UserRole; label: string; description: string; icon: string }[] = [
  { role: 'student', label: 'Aluno', description: 'Notas, horário e finanças', icon: '🎓' },
  { role: 'guardian', label: 'Encarregado', description: 'Acompanhar os educandos', icon: '👨‍👩‍👧' },
  { role: 'teacher', label: 'Professor', description: 'Turmas, avaliações e conteúdos', icon: '📚' },
  { role: 'pedagogy', label: 'Pedagogia', description: 'Coordenação académica', icon: '📊' },
  { role: 'executive', label: 'Direcção', description: 'Visão institucional', icon: '🏛️' },
  { role: 'secretary', label: 'Secretaria', description: 'Matrículas e documentos', icon: '📋' },
  { role: 'finance', label: 'Finanças', description: 'Tesouraria e pagamentos', icon: '💰' },
];

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [pendingRole, setPendingRole] = useState<UserRole | null>(null);
  const { login, isAuthenticated, role } = useAuth();
  const navigate = useNavigate();

  // Important for the presentation flow: opening /login must always show the
  // access-role chooser, even when a previous demo session exists. We only
  // enter a dashboard after the visitor explicitly submits a chosen role.
  useEffect(() => {
    if (pendingRole && isAuthenticated && role === pendingRole) {
      navigate(ROLE_HOME[pendingRole], { replace: true });
      setPendingRole(null);
    }
  }, [pendingRole, isAuthenticated, role, navigate]);

  const current = DEMO_ROLES.find(r => r.role === selectedRole)!;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPendingRole(selectedRole);
    login(email, password, selectedRole, remember);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-8">
      <div className="absolute inset-0 -z-10" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, hsl(var(--primary-soft)) 0%, transparent 60%)' }} />
      <div className="absolute -right-32 -top-32 -z-10 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />

      <div className="w-full max-w-md animate-fade-in">
        <div className="mb-6 flex flex-col items-center text-center">
          <Brand size="lg" variant="mark" />
          <h1 className="mt-4 font-heading text-2xl font-bold text-foreground">Bem-vindo</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Portal do <span className="font-semibold text-foreground">Colégio Deus Connosco</span>
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card/80 p-6 shadow-xl backdrop-blur-sm">
          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            <div>
              <label className="mb-1.5 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <span>Perfil de acesso</span>
                <span className="inline-flex items-center gap-1 text-[10px] font-medium normal-case tracking-normal text-primary">
                  <Sparkles className="h-3 w-3" /> Demonstração
                </span>
              </label>
              <Select value={selectedRole} onValueChange={(v) => setSelectedRole(v as UserRole)}>
                <SelectTrigger className="h-14 rounded-xl border-input bg-background transition-colors hover:border-primary/40">
                  <SelectValue>
                    <div className="flex items-center gap-3 text-left">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-base">{current.icon}</span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold leading-tight text-foreground">{current.label}</p>
                        <p className="text-[11px] leading-tight text-muted-foreground">{current.description}</p>
                      </div>
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {DEMO_ROLES.map(r => (
                    <SelectItem key={r.role} value={r.role} className="rounded-lg py-2">
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-muted text-sm">{r.icon}</span>
                        <div>
                          <p className="text-sm font-medium leading-tight text-foreground">{r.label}</p>
                          <p className="text-[11px] leading-tight text-muted-foreground">{r.description}</p>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Opcional para a demonstração"
                autoComplete="email"
                className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-ring/30"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Palavra-passe</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Opcional para a demonstração"
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 pr-10 text-sm focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-ring/30"
                />
                <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground" aria-label={showPassword ? 'Ocultar palavra-passe' : 'Mostrar palavra-passe'}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <p className="rounded-xl bg-secondary px-3.5 py-3 text-xs leading-5 text-muted-foreground">
              Para esta versão de apresentação, escolha primeiro o perfil de acesso. Não são necessárias credenciais reais.
            </p>

            <div className="flex items-center justify-between text-xs">
              <label className="flex cursor-pointer select-none items-center gap-2 text-muted-foreground">
                <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} className="rounded border-input accent-primary" />
                Manter sessão iniciada
              </label>
              <Link to="/forgot-password" className="font-semibold text-primary hover:underline">Esqueci-me</Link>
            </div>

            <button
              type="submit"
              disabled={pendingRole !== null}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary-deep active:scale-[0.98] disabled:cursor-wait disabled:opacity-70"
            >
              {pendingRole ? 'A entrar…' : `Entrar como ${current.label}`}
            </button>
          </form>
        </div>

        <p className="mt-5 text-center text-[11px] text-muted-foreground">
          Ambiente de demonstração · dados simulados
        </p>
      </div>
    </div>
  );
}
