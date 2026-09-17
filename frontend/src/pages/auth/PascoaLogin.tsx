import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Building2, GraduationCap, Landmark, UserRoundCheck, Users, Wallet } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTenant } from '@/contexts/TenantContext';
import type { UserRole } from '@/types/roles';
import { ROLE_HOME } from '@/types/roles';

const HERO = '/tenants/colegio-pascoa/pascoa-hero.jpg';

const ROLE_META: Record<UserRole, { label: string; description: string; icon: LucideIcon }> = {
  student: { label: 'Aluno', description: 'Notas, horário e percurso académico', icon: GraduationCap },
  guardian: { label: 'Encarregado', description: 'Acompanhamento dos educandos', icon: Users },
  teacher: { label: 'Professor', description: 'Turmas, avaliações e conteúdos', icon: BookOpen },
  pedagogy: { label: 'Pedagogia', description: 'Coordenação académica', icon: Landmark },
  executive: { label: 'Direcção', description: 'Visão institucional', icon: Building2 },
  secretary: { label: 'Secretaria', description: 'Matrículas e documentos', icon: UserRoundCheck },
  finance: { label: 'Finanças', description: 'Tesouraria e pagamentos', icon: Wallet },
};

export default function PascoaLogin() {
  const { activeTenant } = useTenant();
  const { login, isAuthenticated, role } = useAuth();
  const navigate = useNavigate();
  const roles = useMemo(() => activeTenant.enabledRoles.filter((item) => ROLE_META[item]), [activeTenant.enabledRoles]);
  const [selectedRole, setSelectedRole] = useState<UserRole>(roles[0] ?? 'student');
  const [pendingRole, setPendingRole] = useState<UserRole | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!roles.includes(selectedRole) && roles[0]) setSelectedRole(roles[0]);
  }, [roles, selectedRole]);

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
    <div className="min-h-screen bg-[#fffdf7] text-[#143e34]">
      <div className="grid min-h-screen lg:grid-cols-[0.88fr_1.12fr]">
        <aside className="relative hidden min-h-screen overflow-hidden bg-[#075c43] lg:flex lg:flex-col">
          <img src={HERO} alt="Comunidade escolar do Colégio Páscoa" className="absolute inset-0 h-full w-full object-cover opacity-55" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#064a38]/35 via-[#064a38]/82 to-[#063d30]" />
          <div className="absolute -right-20 top-[-30px] h-[115%] w-32 rotate-[7deg] rounded-full bg-[#009f68]/90" />
          <div className="absolute -right-4 top-[-20px] h-[112%] w-7 rotate-[7deg] rounded-full bg-[#f8ac00]" />
          <div className="relative z-10 flex flex-1 flex-col p-10 xl:p-14">
            <Link to="/" className="inline-flex w-fit items-center gap-2 text-sm font-bold text-white/75 transition hover:text-white"><ArrowLeft className="h-4 w-4" /> Voltar ao site</Link>
            <div className="mt-auto max-w-xl pb-7">
              <div className="inline-flex rounded-[2rem] bg-white p-3 shadow-2xl"><img src={activeTenant.branding.logo} alt="Logótipo do Colégio Páscoa" className="h-24 w-24 rounded-full object-contain" /></div>
              <p className="mt-8 text-[11px] font-black uppercase tracking-[0.24em] text-[#ffd15a]">Portal escolar</p>
              <h1 className="mt-4 text-5xl font-black leading-[0.93] tracking-[-0.055em] text-white xl:text-7xl">A escola continua aqui.</h1>
              <p className="mt-6 max-w-lg text-base leading-7 text-white/72">Escolha a sua função e continue para o ambiente adequado do Colégio Páscoa.</p>
              <p className="mt-8 text-xs font-bold text-white/48">Powered by EduCore</p>
            </div>
          </div>
        </aside>

        <main className="flex min-h-screen items-center justify-center px-5 py-8 sm:px-8 lg:px-10 xl:px-14">
          <div className="w-full max-w-[780px]">
            <div className="mb-9 flex items-center justify-between lg:hidden">
              <Link to="/" className="flex items-center gap-3"><img src={activeTenant.branding.logo} alt="Colégio Páscoa" className="h-14 w-14 rounded-full object-contain" /><div><p className="text-sm font-black text-[#08784f]">Colégio Páscoa</p><p className="text-xs text-[#768a84]">Educar para Transformar</p></div></Link>
              <Link to="/" className="text-xs font-bold text-[#637a73]">Site</Link>
            </div>

            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#e30620]">Acesso ao portal</p>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.045em] text-[#0d4b3d] sm:text-5xl">Escolha o seu perfil.</h2>
            <p className="mt-3 text-sm leading-6 text-[#687d76] sm:text-base">Cada função abre a navegação e as operações adequadas ao seu contexto.</p>

            <form onSubmit={submit} className="mt-8">
              <div className="grid gap-3 sm:grid-cols-2">
                {roles.map((item) => {
                  const meta = ROLE_META[item];
                  const Icon = meta.icon;
                  const selected = selectedRole === item;
                  return (
                    <button key={item} type="button" onClick={() => setSelectedRole(item)} className={`group flex min-h-[82px] items-center gap-4 rounded-2xl border p-4 text-left transition-all ${selected ? 'border-[#08784f] bg-[#08784f] text-white shadow-[0_12px_35px_rgba(8,120,79,.18)]' : 'border-[#153f34]/10 bg-white hover:-translate-y-0.5 hover:border-[#08784f]/30 hover:shadow-md'}`}>
                      <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${selected ? 'bg-white/12' : item === 'finance' || item === 'executive' ? 'bg-[#fff1f2] text-[#d5071e]' : 'bg-[#eff8f3] text-[#08784f]'}`}><Icon className="h-5 w-5" /></span>
                      <span><span className={`block text-sm font-black ${selected ? 'text-white' : 'text-[#15483a]'}`}>{meta.label}</span><span className={`mt-1 block text-xs leading-5 ${selected ? 'text-white/66' : 'text-[#778983]'}`}>{meta.description}</span></span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <label className="block"><span className="mb-2 block text-[10px] font-black uppercase tracking-[0.14em] text-[#71837d]">Email</span><input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" className="h-12 w-full rounded-xl border border-[#153f34]/12 bg-white px-4 text-sm outline-none transition focus:border-[#08784f]/40 focus:ring-2 focus:ring-[#08784f]/10" /></label>
                <label className="block"><span className="mb-2 block text-[10px] font-black uppercase tracking-[0.14em] text-[#71837d]">Palavra-passe</span><input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Palavra-passe" className="h-12 w-full rounded-xl border border-[#153f34]/12 bg-white px-4 text-sm outline-none transition focus:border-[#08784f]/40 focus:ring-2 focus:ring-[#08784f]/10" /></label>
              </div>

              <div className="mt-6 flex flex-col gap-4 border-t border-[#153f34]/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-sm text-xs leading-5 text-[#7a8c86]">Nesta apresentação, pode seleccionar o perfil e continuar sem credenciais reais.</p>
                <button disabled={!!pendingRole} className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#e30620] px-6 text-sm font-black text-white shadow-[0_12px_32px_rgba(227,6,32,.16)] transition hover:-translate-y-0.5 hover:bg-[#c90019] disabled:opacity-60">{pendingRole ? 'A entrar…' : `Entrar como ${ROLE_META[selectedRole].label}`} {!pendingRole && <ArrowRight className="h-4 w-4" />}</button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
