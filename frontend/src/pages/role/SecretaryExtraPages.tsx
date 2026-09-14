import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { PageContainer } from '@/components/layout/PageContainer';
import { SectionHeader } from '@/components/ui/section-header';
import { StatusBadge } from '@/components/ui/status-badge';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { DetailSheet } from '@/components/shared/DetailSheet';
import { ReportPreviewModal } from '@/components/shared/ReportPreviewModal';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { admissions, students, classGroups, guardians, payments } from '@/data/mockData';
import type { Admission } from '@/data/mockData';
import { ArrowLeft, Check, X, FileText, Search, Bell, Plus, Printer, Download } from 'lucide-react';

/* ─── DETALHE DE ADMISSÃO ─── */
export function SecretaryAdmissionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [adm, setAdm] = useState<Admission | undefined>(admissions.find(a => a.id === id));
  const [comment, setComment] = useState('');

  if (!adm) return <PageContainer><p className="text-sm text-muted-foreground">Admissão não encontrada.</p></PageContainer>;

  const decide = (status: 'aprovado' | 'rejeitado') => {
    setAdm({ ...adm, status, notes: comment || adm.notes });
    toast.success(status === 'aprovado' ? 'Admissão aprovada.' : 'Admissão rejeitada.');
  };

  return (
    <PageContainer>
      <button onClick={() => navigate('/app/secretary/admissions')} className="mb-4 flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"><ArrowLeft className="h-3.5 w-3.5" /> Admissões</button>

      <div className="mb-5 rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-transparent p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="font-heading text-xl font-bold text-foreground">{adm.candidateName}</h1>
            <p className="text-xs text-muted-foreground">{adm.desiredClass} · Submetido {new Date(adm.submittedAt).toLocaleDateString('pt-PT')}</p>
          </div>
          <StatusBadge label={adm.status === 'aprovado' ? 'Aprovado' : adm.status === 'rejeitado' ? 'Rejeitado' : 'Pendente'} variant={adm.status === 'aprovado' ? 'success' : adm.status === 'rejeitado' ? 'destructive' : 'warning'} dot />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 mb-4">
        <div className="rounded-2xl border border-border bg-card p-4 space-y-1.5 text-xs">
          <SectionHeader title="Candidato" />
          <div className="flex justify-between"><span className="text-muted-foreground">Data Nasc.</span><span className="text-foreground">{new Date(adm.birthDate).toLocaleDateString('pt-PT')}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Escola Anterior</span><span className="text-foreground text-right">{adm.previousSchool}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Classe Pretendida</span><span className="text-foreground">{adm.desiredClass}</span></div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 space-y-1.5 text-xs">
          <SectionHeader title="Encarregado" />
          <div className="flex justify-between"><span className="text-muted-foreground">Nome</span><span className="text-foreground">{adm.guardianName}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Telefone</span><span className="text-foreground">{adm.guardianPhone}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Email</span><span className="text-foreground">{adm.guardianEmail}</span></div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 mb-4">
        <SectionHeader title="Documentos" />
        <div className="mt-3 space-y-1.5">
          {adm.documents.map((d, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
              <span className="text-xs text-foreground">{d.name}</span>
              {d.received ? <StatusBadge label="Recebido" variant="success" dot /> : <button onClick={() => toast.success(`Documento solicitado ao encarregado.`)} className="rounded-md bg-warning/10 px-2 py-0.5 text-[10px] font-semibold text-warning hover:bg-warning/20">Solicitar</button>}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 mb-4">
        <label className="block text-xs font-medium text-foreground mb-1">Observações</label>
        <textarea value={comment} onChange={e => setComment(e.target.value)} rows={3} placeholder="Justifique a decisão ou comente…" className="w-full rounded-xl border border-input bg-background p-2 text-sm" />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button onClick={() => decide('rejeitado')} className="rounded-xl border border-destructive/40 bg-destructive/5 py-2.5 text-xs font-semibold text-destructive hover:bg-destructive/10 flex items-center justify-center gap-1.5"><X className="h-3.5 w-3.5" />Rejeitar</button>
        <button onClick={() => decide('aprovado')} className="rounded-xl bg-success py-2.5 text-xs font-semibold text-success-foreground hover:bg-success/90 flex items-center justify-center gap-1.5"><Check className="h-3.5 w-3.5" />Aprovar</button>
      </div>
    </PageContainer>
  );
}

/* ─── FICHA DE ALUNO ─── */
export function SecretaryStudentDetail() {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const s = students.find(x => x.id === studentId);
  const [docModal, setDocModal] = useState<string | null>(null);

  if (!s) return <PageContainer><p className="text-sm text-muted-foreground">Aluno não encontrado.</p></PageContainer>;

  const sPayments = payments.filter(p => p.studentId === s.id);
  const guardian = guardians.find(g => g.students.includes(s.id));

  return (
    <PageContainer>
      <button onClick={() => navigate('/app/secretary/students')} className="mb-4 flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"><ArrowLeft className="h-3.5 w-3.5" /> Alunos</button>

      <div className="mb-5 rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-transparent p-5 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 font-heading text-lg font-bold text-primary">{s.avatar}</div>
        <div className="flex-1">
          <h1 className="font-heading text-xl font-bold text-foreground">{s.name}</h1>
          <p className="text-xs text-muted-foreground">{s.id} · {s.classe}ª {s.turma} · {s.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 mb-4">
        <div className="rounded-2xl border border-border bg-card p-4 space-y-1.5 text-xs">
          <SectionHeader title="Dados Pessoais" />
          <div className="flex justify-between"><span className="text-muted-foreground">ID</span><span className="text-foreground">{s.id}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Turma</span><span className="text-foreground">{s.classe}ª {s.turma}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Email</span><span className="text-foreground">{s.email}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Estado</span><StatusBadge label={s.estado === 'excelente' ? 'Excelente' : s.estado === 'em_risco' ? 'Em Risco' : 'Activo'} variant={s.estado === 'excelente' ? 'success' : s.estado === 'em_risco' ? 'warning' : 'primary'} /></div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 space-y-1.5 text-xs">
          <SectionHeader title="Encarregado" />
          {guardian ? (<>
            <div className="flex justify-between"><span className="text-muted-foreground">Nome</span><span className="text-foreground">{guardian.name}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Telefone</span><span className="text-foreground">{guardian.phone}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Email</span><span className="text-foreground">{guardian.email}</span></div>
          </>) : <p className="text-muted-foreground">Sem encarregado registado.</p>}
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 space-y-1.5 text-xs">
          <SectionHeader title="Resumo Financeiro" />
          {sPayments.slice(0, 4).map(p => (
            <div key={p.id} className="flex justify-between">
              <span className="text-muted-foreground truncate">{p.conceito}</span>
              <span className="text-foreground font-semibold">{p.amount.toLocaleString('pt-PT')} MT</span>
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 space-y-1.5 text-xs">
          <SectionHeader title="Estado Académico" />
          <div className="flex justify-between"><span className="text-muted-foreground">Média</span><span className="text-foreground font-bold">{s.media}/20</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Assiduidade</span><span className="text-foreground font-bold">{s.taxaAssiduidade}%</span></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <button onClick={() => toast.success('Dados actualizados (demo).')} className="rounded-xl border border-border bg-card py-2.5 text-xs font-medium text-foreground hover:bg-muted">Editar Dados</button>
        <button onClick={() => setDocModal('Declaração de Matrícula')} className="rounded-xl border border-border bg-card py-2.5 text-xs font-medium text-foreground hover:bg-muted">Gerar Documento</button>
        <button onClick={() => navigate('/app/secretary/documents')} className="rounded-xl border border-border bg-card py-2.5 text-xs font-medium text-foreground hover:bg-muted">Ver Documentos</button>
        <button onClick={() => toast.success('Histórico aberto (demo).')} className="rounded-xl bg-primary py-2.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90">Ver Histórico</button>
      </div>

      <ReportPreviewModal open={!!docModal} onOpenChange={(o) => !o && setDocModal(null)} title={docModal ?? ''} period={`${s.name} · ${new Date().toLocaleDateString('pt-PT')}`}>
        <p className="text-xs text-foreground leading-relaxed">A Direcção do Colégio Deus Connosco declara que <strong>{s.name}</strong>, portador(a) do ID <strong>{s.id}</strong>, está matriculado(a) na turma <strong>{s.classe}ª {s.turma}</strong> no ano lectivo 2025/2026, com aproveitamento médio de <strong>{s.media}/20</strong> e taxa de assiduidade de <strong>{s.taxaAssiduidade}%</strong>.</p>
        <p className="text-[10px] text-muted-foreground mt-3">Documento emitido para os devidos efeitos legais.</p>
      </ReportPreviewModal>
    </PageContainer>
  );
}

/* ─── PESQUISA + GERADOR DE DOCUMENTOS ─── */
export function SecretaryDocumentBuilder() {
  const navigate = useNavigate();
  const [docType, setDocType] = useState('declaracao-matricula');
  const [studentId, setStudentId] = useState(students[0].id);
  const [search, setSearch] = useState('');
  const [preview, setPreview] = useState(false);

  const docOptions = [
    { id: 'declaracao-matricula', label: 'Declaração de Matrícula' },
    { id: 'declaracao-frequencia', label: 'Declaração de Frequência' },
    { id: 'certificado', label: 'Certificado' },
    { id: 'transferencia', label: 'Pedido de Transferência' },
    { id: 'pedido-admin', label: 'Pedido Administrativo' },
  ];

  const filtered = students.filter(s => search === '' || s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase()));
  const s = students.find(x => x.id === studentId)!;
  const docLabel = docOptions.find(d => d.id === docType)?.label ?? '';

  return (
    <PageContainer>
      <button onClick={() => navigate('/app/secretary/documents')} className="mb-4 flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"><ArrowLeft className="h-3.5 w-3.5" /> Documentos</button>

      <div className="mb-5">
        <h1 className="font-heading text-2xl font-bold text-foreground">Gerador de Documentos</h1>
        <p className="mt-1 text-sm text-muted-foreground">Seleccione tipo de documento e aluno.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 mb-4">
        <div className="rounded-2xl border border-border bg-card p-4">
          <label className="block text-xs font-medium text-foreground mb-1">Tipo de documento</label>
          <Select value={docType} onValueChange={setDocType}>
            <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
            <SelectContent>{docOptions.map(o => <SelectItem key={o.id} value={o.id}>{o.label}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4">
          <label className="block text-xs font-medium text-foreground mb-1">Pesquisar aluno</label>
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Nome ou ID…" className="rounded-xl" />
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 mb-4">
        <SectionHeader title="Selecionar aluno" />
        <div className="mt-3 max-h-56 overflow-y-auto space-y-1">
          {filtered.map(st => (
            <button key={st.id} onClick={() => setStudentId(st.id)} className={cn('w-full text-left flex items-center justify-between rounded-lg px-3 py-2', studentId === st.id ? 'bg-primary/10 text-foreground' : 'hover:bg-muted/50 text-foreground')}>
              <span className="text-xs font-medium">{st.name}</span>
              <span className="text-[10px] text-muted-foreground">{st.id} · {st.classe}ª {st.turma}</span>
            </button>
          ))}
        </div>
      </div>

      <button onClick={() => setPreview(true)} className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Gerar {docLabel}</button>

      <ReportPreviewModal open={preview} onOpenChange={setPreview} title={docLabel} period={`${s.name} · ${new Date().toLocaleDateString('pt-PT')}`}>
        <p className="text-xs text-foreground leading-relaxed">Pela presente <strong>{docLabel}</strong>, a Direcção do Colégio Deus Connosco certifica que <strong>{s.name}</strong> ({s.id}) está regularmente matriculado(a) na turma <strong>{s.classe}ª {s.turma}</strong> no presente ano lectivo, com média actual de <strong>{s.media}/20</strong>.</p>
        <p className="text-[10px] text-muted-foreground mt-3 italic">Documento emitido em {new Date().toLocaleDateString('pt-PT', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}.</p>
      </ReportPreviewModal>
    </PageContainer>
  );
}

/* ─── NOTIFICAÇÕES ─── */
export function SecretaryNotifications() {
  const navigate = useNavigate();
  const [items, setItems] = useState([
    { title: 'Nova admissão submetida', message: 'Ana Manhiça aguarda análise.', type: 'info', time: '1h atrás', read: false, route: '/app/secretary/admissions' },
    { title: 'Documento solicitado', message: 'Encarregado pede declaração de frequência.', type: 'info', time: '3h atrás', read: false, route: '/app/secretary/documents' },
    { title: 'Matrícula a expirar', message: '2 matrículas vencem na próxima semana.', type: 'alerta', time: '2d atrás', read: true, route: '/app/secretary/enrollments' },
  ]);

  const handle = (i: number) => {
    setItems(prev => prev.map((x, k) => k === i ? { ...x, read: true } : x));
    navigate(items[i].route);
  };

  return (
    <PageContainer>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Notificações</h1>
          <p className="mt-1 text-sm text-muted-foreground">{items.filter(i => !i.read).length} por ler.</p>
        </div>
        <button onClick={() => { setItems(prev => prev.map(x => ({ ...x, read: true }))); toast.success('Tudo marcado como lido.'); }} className="text-xs font-medium text-primary hover:underline">Marcar tudo como lido</button>
      </div>
      <div className="space-y-1.5">
        {items.map((n, i) => (
          <button key={i} onClick={() => handle(i)} className={cn('w-full text-left flex items-start gap-3 rounded-xl border px-4 py-3 hover:shadow-sm transition-all active:scale-[0.997]', n.read ? 'border-border bg-card' : 'border-primary/20 bg-primary/[0.02]')}>
            <Bell className={cn('h-4 w-4 mt-0.5 shrink-0', n.read ? 'text-muted-foreground' : 'text-primary')} />
            <div className="flex-1 min-w-0">
              <p className={cn('text-sm', n.read ? 'text-foreground' : 'font-medium text-foreground')}>{n.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{n.message}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{n.time}</p>
            </div>
            {!n.read && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />}
          </button>
        ))}
      </div>
    </PageContainer>
  );
}