import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Building2, GraduationCap, Landmark, UserRoundCheck, Users, Wallet } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTenant } from '@/contexts/TenantContext';
import { SchoolBrand } from '@/components/brand/SchoolBrand';
import type { UserRole } from '@/types/roles';
import { ROLE_HOME } from '@/types/roles';

const ROLE_META: Record<UserRole, { label: string; description: string; icon: LucideIcon }> = {
  student: { label: 'Aluno', description: 'Notas, horário e percurso académico', icon: GraduationCap },
  guardian: { label: 'Encarregado', description: 'Acompanhamento dos educandos', icon: Users },
  teacher: { label: 'Professor', description: 'Turmas, avaliações e conteúdos', icon: BookOpen },
  pedagogy: { label: 'Pedagogia', description: 'Coordenação académica', icon: Landmark },
  executive: { label: 'Direcção', description: 'Visão institucional', icon: Building2 },
  secretary: { label: 'Secretaria', description: 'Matrículas e documentos', icon: UserRoundCheck },
  finance: { label: 'Finanças', description: 'Tesouraria e pagamentos', icon: Wallet },
};

export default function GenericTenantLogin() {
  const { activeTenant } = useTenant();
  const { login, isAuthenticated, role } = useAuth();
  const navigate = useNavigate();
  const availableRoles = useMemo(() => activeTenant.enabledRoles.filter((item) => ROLE_META[item]), [activeTenant.enabledRoles]);
  const [selectedRole, setSelectedRole] = useState<UserRole>(availableRoles[0] ?? 'student');
  const [pendingRole, setPendingRole] = useState<UserRole | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!availableRoles.includes(selectedRole) && availableRoles[0]) setSelectedRole(availableRoles[0]);
  }, [availableRoles, selectedRole]);

  useEffect(() => {
    if (pendingRole && isAuthenticated && role === pendingRole) {
      navigate(ROLE_HOME[pendingRole], { replace: true });
      setPendingRole(null);
    }
  }, [pendingRole, isAuthenticated, role, navigate]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setPendingRole(selectedRole);
    login(email, password, selectedRole, true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="grid min-h-screen lg:grid-cols-[0.86fr,1.14fr]">
        <aside className="relative hidden overflow-hidden bg-primary text-primary-foreground lg:flex lg:flex-col">
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `radial-gradient(circle at 20% 20%, hsl(${activeTenant.branding.accentHsl}) 0, transparent 30%), radial-gradient(circle at 80% 76%, white 0, transparent 20%)` }} />
          <div className="relative z-10 flex flex-1 flex-col p-10 xl:p-14">
            <Link to="/" className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary-foreground/70 hover:text-primary-foreground"><ArrowLeft className="h-4 w-4" /> Voltar ao site</Link>
            <div className="mt-auto max-w-xl pb-8">
              <SchoolBrand variant="compact" imageClassName="h-20 w-20 rounded-2xl bg-white p-2" />
              <p className="mt-8 text-xs font-extrabold uppercase tracking-[0.24em]" style={{ color: `hsl(${activeTenant.branding.accentHsl})` }}>Portal escolar</p>
              <h1 className="mt-4 font-heading text-5xl font-black leading-[0.96] tracking-[-0.045em] xl:text-6xl">{activeTenant.branding.displayName}</h1>
              <p className="mt-5 text-base leading-7 text-primary-foreground/72">Aceda ao contexto adequado à sua função na instituição.</p>
              <p className="mt-8 text-xs font-semibold text-primary-foreground/55">Powered by EduCore</p>
            </div>
          </div>
        </aside>

        <main className="flex items-center justify-center px-5 py-8 sm:px-8 lg:px-12">
          <div className="w-full max-w-3xl">
            <div className="mb-8 flex items-center justify-between lg:hidden"><SchoolBrand /><Link to="/" className="text-xs font-semibold text-muted-foreground">Site</Link></div>
            <p className="text-xs font-extrabold uppercase tracking-[0.22em]" style={{ color: `hsl(${activeTenant.branding.accentHsl})` }}>Acesso ao portal</p>
            <h2 className="mt-3 font-heading text-4xl font-black tracking-[-0.04em] text-primary">Escolha o seu perfil</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Os perfis e módulos disponíveis são definidos pela configuração desta instituição.</p>

            <form onSubmit={submit} className="mt-7">
              <div className="grid gap-3 sm:grid-cols-2">
                {availableRoles.map((item) => {
                  const meta = ROLE_META[item];
                  const Icon = meta.icon;
                  const selected = selectedRole === item;
                  return <button key={item} type="button" onClick={() => setSelectedRole(item)} className={`flex min-h-[78px] items-center gap-3 rounded-2xl border p-4 text-left transition ${selected ? 'border-primary bg-primary text-primary-foreground shadow-md' : 'border-border bg-card hover:border-primary/30'}`}><span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${selected ? 'bg-white/10' : 'bg-secondary'}`}><Icon className={`h-4 w-4 ${selected ? 'text-primary-foreground' : 'text-primary'}`} /></span><span><span className="block text-sm font-bold">{meta.label}</span><span className={`mt-1 block text-xs ${selected ? 'text-primary-foreground/65' : 'text-muted-foreground'}`}>{meta.description}</span></span></button>;
                })}
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="h-12 rounded-xl border border-input bg-card px-4 text-sm outline-none focus:ring-2 focus:ring-ring/20" />
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Palavra-passe" className="h-12 rounded-xl border border-input bg-card px-4 text-sm outline-none focus:ring-2 focus:ring-ring/20" />
              </div>

              <div className="mt-6 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs leading-5 text-muted-foreground">MVP actual: autenticação ainda usa o adapter de apresentação; a configuração de tenant já é partilhada.</p>
                <button disabled={!!pendingRole} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-extrabold text-primary-foreground disabled:opacity-60">{pendingRole ? 'A entrar…' : `Entrar como ${ROLE_META[selectedRole].label}`} {!pendingRole && <ArrowRight className="h-4 w-4" />}</button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
