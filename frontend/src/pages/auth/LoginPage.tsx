import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Building2,
  Eye,
  EyeOff,
  GraduationCap,
  Landmark,
  UserRoundCheck,
  Users,
  Wallet,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import type { UserRole } from '@/types/roles';
import { ROLE_HOME } from '@/types/roles';
import { SchoolBrand } from '@/components/brand/SchoolBrand';
import campusMain from '@/assets/school/campus-main.jpg';

const ACCESS_ROLES: { role: UserRole; label: string; description: string; icon: LucideIcon }[] = [
  { role: 'student', label: 'Aluno', description: 'Notas, horário e percurso académico', icon: GraduationCap },
  { role: 'guardian', label: 'Encarregado', description: 'Acompanhamento dos educandos', icon: Users },
  { role: 'teacher', label: 'Professor', description: 'Turmas, avaliações e conteúdos', icon: BookOpen },
  { role: 'pedagogy', label: 'Pedagogia', description: 'Coordenação académica', icon: Landmark },
  { role: 'executive', label: 'Direcção', description: 'Visão institucional', icon: Building2 },
  { role: 'secretary', label: 'Secretaria', description: 'Matrículas e documentos', icon: UserRoundCheck },
  { role: 'finance', label: 'Finanças', description: 'Tesouraria e pagamentos', icon: Wallet },
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

  useEffect(() => {
    if (pendingRole && isAuthenticated && role === pendingRole) {
      navigate(ROLE_HOME[pendingRole], { replace: true });
      setPendingRole(null);
    }
  }, [pendingRole, isAuthenticated, role, navigate]);

  const current = ACCESS_ROLES.find((item) => item.role === selectedRole)!;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setPendingRole(selectedRole);
    login(email, password, selectedRole, remember);
  };

  return (
    <div className="min-h-screen bg-[#fbf8f2] text-foreground">
      <div className="grid min-h-screen lg:grid-cols-[0.92fr,1.08fr]">
        <aside className="relative hidden min-h-screen overflow-hidden bg-primary text-white lg:flex lg:flex-col">
          <img
            src={campusMain}
            alt="Campus do Colégio Deus Connosco"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-55 saturate-[0.88]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/72 via-primary/86 to-primary" />
          <div className="pointer-events-none absolute -right-12 bottom-0 h-[48%] w-20 rotate-[9deg] bg-[hsl(var(--brand-orange))]/90" />

          <div className="relative z-10 flex flex-1 flex-col px-10 py-9 xl:px-14 xl:py-11">
            <Link
              to="/"
              className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-white/72 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" /> Voltar ao site
            </Link>

            <div className="mt-auto max-w-xl pb-8">
              <div className="inline-flex rounded-[1.7rem] bg-white p-4 shadow-2xl">
                <SchoolBrand variant="compact" imageClassName="h-24 w-24" />
              </div>
              <p className="mt-9 text-[11px] font-bold uppercase tracking-[0.27em] text-orange-300">Portal escolar</p>
              <h1 className="mt-5 font-display text-6xl leading-[0.93] tracking-[-0.045em] xl:text-7xl">
                O mesmo colégio. Um acesso adequado a cada função.
              </h1>
              <p className="mt-7 max-w-lg text-base leading-7 text-white/72">
                Escolha como pretende entrar e continue para a área correspondente do Colégio Deus Connosco.
              </p>
            </div>
          </div>
        </aside>

        <main className="flex min-h-screen items-center justify-center px-5 py-8 sm:px-8 lg:px-10 xl:px-16">
          <div className="w-full max-w-[760px]">
            <div className="flex items-center justify-between gap-4 lg:hidden">
              <Link to="/" aria-label="Voltar ao Colégio Deus Connosco">
                <SchoolBrand imageClassName="h-[58px] w-[58px]" />
              </Link>
              <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <ArrowLeft className="h-4 w-4" /> Site
              </Link>
            </div>

            <div className="mt-10 lg:mt-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[hsl(var(--brand-orange))]">Acesso ao portal</p>
              <h2 className="mt-4 font-display text-4xl leading-tight tracking-[-0.035em] text-primary sm:text-5xl">
                Escolha o seu perfil.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                O portal apresenta navegação e informação diferentes conforme a função selecionada.
              </p>
            </div>

            <form className="mt-8" onSubmit={handleSubmit} noValidate>
              <fieldset>
                <legend className="sr-only">Perfil de acesso</legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {ACCESS_ROLES.map((item) => {
                    const Icon = item.icon;
                    const selected = item.role === selectedRole;
                    return (
                      <button
                        key={item.role}
                        type="button"
                        onClick={() => setSelectedRole(item.role)}
                        aria-pressed={selected}
                        className={`group flex min-h-[82px] items-center gap-4 rounded-2xl border p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                          selected
                            ? 'border-primary bg-primary text-white shadow-lg shadow-primary/10'
                            : 'border-border bg-white hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-md'
                        }`}
                      >
                        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${selected ? 'bg-white/12' : 'bg-secondary'}`}>
                          <Icon className={`h-5 w-5 ${selected ? 'text-orange-300' : 'text-primary'}`} />
                        </span>
                        <span className="min-w-0">
                          <span className={`block text-sm font-bold ${selected ? 'text-white' : 'text-primary'}`}>{item.label}</span>
                          <span className={`mt-1 block text-xs leading-5 ${selected ? 'text-white/68' : 'text-muted-foreground'}`}>{item.description}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Email"
                    autoComplete="email"
                    className="h-12 w-full rounded-xl border border-input bg-white px-4 text-sm text-foreground placeholder:text-muted-foreground/55 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-ring/25"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">Palavra-passe</label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Palavra-passe"
                      autoComplete="current-password"
                      className="h-12 w-full rounded-xl border border-input bg-white px-4 pr-11 text-sm text-foreground placeholder:text-muted-foreground/55 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-ring/25"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      aria-label={showPassword ? 'Ocultar palavra-passe' : 'Mostrar palavra-passe'}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-3 text-xs sm:flex-row sm:items-center sm:justify-between">
                <label className="flex cursor-pointer select-none items-center gap-2 text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(event) => setRemember(event.target.checked)}
                    className="rounded border-input accent-primary"
                  />
                  Manter sessão iniciada
                </label>
                <Link to="/forgot-password" className="font-semibold text-primary hover:underline">Esqueci-me da palavra-passe</Link>
              </div>

              <div className="mt-7 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-sm text-xs leading-5 text-muted-foreground">
                  Nesta versão, pode selecionar o perfil e continuar sem introduzir credenciais reais.
                </p>
                <button
                  type="submit"
                  disabled={pendingRole !== null}
                  className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-primary/10 transition hover:-translate-y-0.5 hover:bg-primary/95 disabled:cursor-wait disabled:opacity-70"
                >
                  {pendingRole ? 'A entrar…' : `Entrar como ${current.label}`}
                  {!pendingRole && <ArrowRight className="h-4 w-4" />}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
