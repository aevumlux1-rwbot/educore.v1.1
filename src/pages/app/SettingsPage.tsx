import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, LogOut, Palette, Shield, UserRound } from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { useAuth } from '@/contexts/AuthContext';
import { ROLE_LABELS } from '@/types/roles';
import { cn } from '@/lib/utils';

const tabs = [
  { id: 'profile', label: 'Perfil', icon: UserRound },
  { id: 'notifications', label: 'Notificações', icon: Bell },
  { id: 'appearance', label: 'Aparência', icon: Palette },
  { id: 'security', label: 'Segurança', icon: Shield },
] as const;

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]['id']>('profile');
  const [notifications, setNotifications] = useState({ academic: true, finance: true, messages: true, institutional: true });
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();
  const initials = (user?.name ?? 'CD').split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase();

  const signOut = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Definições</h1>
        <p className="mt-1 text-sm text-muted-foreground">Conta, preferências e sessão de demonstração.</p>
      </div>

      <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'inline-flex shrink-0 items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition-colors',
                activeTab === tab.id ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-card text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className="h-3.5 w-3.5" />{tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === 'profile' && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 font-heading text-xl font-bold text-primary">{initials}</div>
              <div className="min-w-0">
                <h2 className="truncate font-heading text-lg font-bold text-foreground">{user?.name ?? 'Utilizador de demonstração'}</h2>
                <p className="text-sm text-muted-foreground">{role ? ROLE_LABELS[role] : 'Perfil'} · Colégio Deus Connosco</p>
                <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-heading text-sm font-semibold text-foreground">Informação da sessão</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-muted/50 p-3"><p className="text-[10px] uppercase tracking-wider text-muted-foreground">ID demo</p><p className="mt-1 text-sm font-medium text-foreground">{user?.id ?? '—'}</p></div>
              <div className="rounded-xl bg-muted/50 p-3"><p className="text-[10px] uppercase tracking-wider text-muted-foreground">Perfil</p><p className="mt-1 text-sm font-medium text-foreground">{role ? ROLE_LABELS[role] : '—'}</p></div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="font-heading text-sm font-semibold text-foreground">Preferências de notificação</h3>
          <div className="mt-4 divide-y divide-border">
            {[
              { key: 'academic', label: 'Actualizações académicas', description: 'Notas, horários e conteúdos' },
              { key: 'finance', label: 'Alertas financeiros', description: 'Pagamentos, recibos e vencimentos' },
              { key: 'messages', label: 'Mensagens', description: 'Chat e comunicação institucional' },
              { key: 'institutional', label: 'Avisos institucionais', description: 'Eventos e comunicados' },
            ].map((item) => {
              const key = item.key as keyof typeof notifications;
              return (
                <div key={item.key} className="flex items-center justify-between gap-4 py-3">
                  <div><p className="text-sm font-medium text-foreground">{item.label}</p><p className="text-xs text-muted-foreground">{item.description}</p></div>
                  <button type="button" onClick={() => setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))} className={cn('relative h-6 w-11 rounded-full transition-colors', notifications[key] ? 'bg-primary' : 'bg-muted')}>
                    <span className={cn('absolute top-1 h-4 w-4 rounded-full bg-white transition-transform', notifications[key] ? 'translate-x-6' : 'translate-x-1')} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'appearance' && (
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="font-heading text-sm font-semibold text-foreground">Aparência</h3>
          <p className="mt-2 text-sm text-muted-foreground">A interface mantém os tokens claro/escuro existentes. A escolha de tema persistente será ligada ao perfil quando existir backend real.</p>
          <div className="mt-4 flex gap-2">
            <span className="rounded-xl border border-primary bg-primary/10 px-4 py-2 text-xs font-semibold text-primary">Sistema</span>
            <span className="rounded-xl border border-border px-4 py-2 text-xs text-muted-foreground">Claro</span>
            <span className="rounded-xl border border-border px-4 py-2 text-xs text-muted-foreground">Escuro</span>
          </div>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-info/20 bg-info/5 p-5">
            <p className="text-sm font-semibold text-foreground">Ambiente de demonstração</p>
            <p className="mt-1 text-xs text-muted-foreground">A autenticação desta apresentação é local e simulada. Não representa o mecanismo de segurança da futura versão de produção.</p>
          </div>
          <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-5">
            <div className="flex flex-wrap items-center gap-3">
              <LogOut className="h-5 w-5 text-destructive" />
              <div className="flex-1"><p className="text-sm font-semibold text-foreground">Terminar sessão</p><p className="text-xs text-muted-foreground">Volta ao selector dos sete perfis de apresentação.</p></div>
              <button type="button" onClick={signOut} className="rounded-xl border border-destructive/30 px-4 py-2 text-xs font-semibold text-destructive hover:bg-destructive/10">Sair</button>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
}
