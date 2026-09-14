import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { ROLE_LABELS } from '@/types/roles';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const TABS = [
  { id: 'profile', label: 'Perfil' },
  { id: 'notifications', label: 'Notificações' },
  { id: 'appearance', label: 'Aparência' },
  { id: 'security', label: 'Segurança' },
];

export default function SettingsPage() {
  const [tab, setTab] = useState('profile');
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();
  const initials = (user?.name ?? '??').split(' ').map(n => n[0]).slice(0, 2).join('');

  const handleLogout = () => {
    logout();
    toast.success('Sessão terminada.');
    navigate('/login');
  };

  return (
    <PageContainer>
      <div className="mb-5">
        <h1 className="font-heading text-2xl font-bold text-foreground">Definições</h1>
        <p className="mt-1 text-sm text-muted-foreground">Gerir a sua conta e preferências.</p>
      </div>

      <div className="mb-5 max-w-xs">
        <Select value={tab} onValueChange={setTab}>
          <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
          <SelectContent>
            {TABS.map(t => <SelectItem key={t.id} value={t.id}>{t.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {tab === 'profile' && user && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 font-heading text-lg font-bold text-primary">{initials}</div>
              <div className="min-w-0">
                <h2 className="font-heading text-base font-bold text-foreground">{user.name}</h2>
                <p className="text-xs text-muted-foreground">{role && ROLE_LABELS[role]}</p>
                <p className="text-[11px] text-muted-foreground truncate">{user.email}</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
            <h3 className="font-heading text-sm font-semibold text-foreground">Informação pessoal</h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                { label: 'Nome', value: user.name },
                { label: 'ID', value: user.id },
                { label: 'Email', value: user.email },
                { label: 'Instituição', value: user.institution ?? '—' },
              ].map(f => (
                <div key={f.label}>
                  <label className="text-[11px] text-muted-foreground">{f.label}</label>
                  <p className="mt-0.5 rounded-lg border border-border bg-muted/40 px-3 py-2 text-sm text-foreground">{f.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'notifications' && (
        <div className="rounded-2xl border border-border bg-card p-5 space-y-2">
          {[
            { label: 'Académico', desc: 'Notas, horário, conteúdos' },
            { label: 'Financeiro', desc: 'Lembretes, recibos, atrasos' },
            { label: 'Mensagens', desc: 'Novas mensagens' },
            { label: 'Avisos institucionais', desc: 'Eventos e comunicados' },
          ].map((n, i) => (
            <NotifToggle key={n.label} label={n.label} desc={n.desc} defaultOn={i !== 3} />
          ))}
        </div>
      )}

      {tab === 'appearance' && (
        <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
          <h3 className="font-heading text-sm font-semibold text-foreground">Tema</h3>
          <div className="max-w-xs">
            <Select defaultValue="light">
              <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Claro</SelectItem>
                <SelectItem value="dark">Escuro</SelectItem>
                <SelectItem value="system">Sistema</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {tab === 'security' && (
        <div className="space-y-3">
          <div className="rounded-2xl border border-border bg-card p-5 space-y-2">
            <h3 className="font-heading text-sm font-semibold text-foreground">Palavra-passe</h3>
            <p className="text-xs text-muted-foreground">Última alteração há 30 dias.</p>
            <button onClick={() => { toast.success('Email enviado para alterar a palavra-passe.'); navigate('/forgot-password'); }} className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">Alterar</button>
          </div>
          <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-5">
            <div className="flex items-center gap-3">
              <LogOut className="h-4 w-4 text-destructive" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">Terminar sessão</p>
                <p className="text-xs text-muted-foreground">Sair desta conta</p>
              </div>
              <button onClick={handleLogout} className="rounded-xl border border-destructive/30 px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors">Sair</button>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
}

function NotifToggle({ label, desc, defaultOn }: { label: string; desc: string; defaultOn: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      <button onClick={() => { setOn(v => !v); toast.success(on ? `${label} desactivado` : `${label} activado`); }} className={cn('h-5 w-9 rounded-full relative transition-colors', on ? 'bg-primary' : 'bg-muted')}>
        <div className={cn('absolute top-0.5 h-4 w-4 rounded-full bg-primary-foreground transition-all', on ? 'right-0.5' : 'left-0.5')} />
      </button>
    </div>
  );
}
