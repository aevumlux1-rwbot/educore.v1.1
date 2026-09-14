import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { PageContainer } from '@/components/layout/PageContainer';
import { SectionHeader } from '@/components/ui/section-header';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { StatusBadge } from '@/components/ui/status-badge';
import { AlertCard } from '@/components/dashboard/AlertCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DetailSheet } from '@/components/shared/DetailSheet';
import { students, classGroups, admissions } from '@/data/mockData';
import { Users, UserCheck, ClipboardList, FolderOpen, FileText, Download, Plus, Search, ChevronRight } from 'lucide-react';

export function SecretaryDashboard() {
  const navigate = useNavigate();
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Painel da Secretaria</h1>
        <p className="mt-1 text-sm text-muted-foreground">Admissões, matrículas e gestão de alunos.</p>
      </div>
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatsCard label="Alunos" value="176" icon={Users} variant="primary" />
        <StatsCard label="Admissões Pendentes" value="14" icon={UserCheck} />
        <StatsCard label="Matrículas Activas" value="176" icon={ClipboardList} />
        <StatsCard label="Documentos" value="342" icon={FolderOpen} />
      </div>
      <AlertCard title="14 admissões pendentes de análise" description="Novos processos de admissão requerem avaliação." variant="info" action="Analisar" onAction={() => navigate('/app/secretary/admissions')} className="mb-6" />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5">
          <SectionHeader title="Admissões Recentes" />
          <div className="mt-3 space-y-2">
            {[
              { name: 'Ana Manhiça', classe: '10ª', data: '10 Abr 2026', status: 'pendente' },
              { name: 'Bruno Nhanala', classe: '11ª', data: '9 Abr 2026', status: 'aprovado' },
              { name: 'Célia Dzimba', classe: '10ª', data: '8 Abr 2026', status: 'pendente' },
            ].map((a, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl border border-border px-4 py-3">
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{a.name}</p>
                  <p className="text-xs text-muted-foreground">{a.classe} Classe · {a.data}</p>
                </div>
                <StatusBadge label={a.status === 'aprovado' ? 'Aprovado' : 'Pendente'} variant={a.status === 'aprovado' ? 'success' : 'warning'} />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <SectionHeader title="Turmas" />
          <div className="mt-3 space-y-2">
            {classGroups.slice(0, 4).map(c => (
              <div key={c.id} className="flex items-center justify-between rounded-xl border border-border px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-foreground">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.directorTurma}</p>
                </div>
                <StatusBadge label={`${c.studentCount} alunos`} variant="muted" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export function SecretaryAdmissions() {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Admissões</h1>
        <p className="mt-1 text-sm text-muted-foreground">Processar novas admissões de alunos.</p>
      </div>
      <div className="space-y-1.5">
        {admissions.map((a) => (
          <button key={a.id} onClick={() => navigate(`/app/secretary/admissions/${a.id}`)} className="w-full text-left flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:shadow-sm transition-all active:scale-[0.997]">
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{a.candidateName}</p>
              <p className="text-xs text-muted-foreground">{a.desiredClass} · Enc. {a.guardianName} · {new Date(a.submittedAt).toLocaleDateString('pt-PT')}</p>
            </div>
            <StatusBadge label={a.status === 'aprovado' ? 'Aprovado' : a.status === 'rejeitado' ? 'Rejeitado' : 'Pendente'} variant={a.status === 'aprovado' ? 'success' : a.status === 'rejeitado' ? 'destructive' : 'warning'} />
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        ))}
      </div>
    </PageContainer>
  );
}

export function SecretaryEnrollments() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ studentName: '', classe: '10ª', turma: 'A', guardian: '' });
  const [list, setList] = useState(students);
  const create = () => {
    if (!form.studentName) { toast.error('Indique o nome do aluno.'); return; }
    setList(prev => [{ id: `ALU-${Date.now().toString().slice(-3)}`, name: form.studentName, email: '', classe: form.classe.replace('ª',''), turma: form.turma, avatar: form.studentName.slice(0,2).toUpperCase(), media: 0, taxaAssiduidade: 100, estado: 'activo' as const }, ...prev]);
    toast.success('Matrícula criada.');
    setOpen(false);
    setForm({ studentName: '', classe: '10ª', turma: 'A', guardian: '' });
  };
  return (
    <PageContainer>
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Matrículas</h1>
        <p className="mt-1 text-sm text-muted-foreground">Gestão de matrículas activas.</p>
        </div>
        <button onClick={() => setOpen(true)} className="flex items-center gap-1.5 rounded-xl bg-primary px-3 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90"><Plus className="h-3.5 w-3.5" />Nova</button>
      </div>
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatsCard label="Activas" value={list.length} icon={ClipboardList} variant="primary" />
        <StatsCard label="Novas (mês)" value="3" icon={UserCheck} />
        <StatsCard label="Canceladas" value="1" icon={Users} />
      </div>
      <div className="space-y-1.5">
        {list.map(s => (
          <div key={s.id} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-bold">{s.avatar}</div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{s.name}</p>
              <p className="text-xs text-muted-foreground">{s.classe}ª {s.turma} · {s.id}</p>
            </div>
            <StatusBadge label="Activa" variant="success" />
          </div>
        ))}
      </div>
      <DetailSheet open={open} onOpenChange={setOpen} title="Nova Matrícula" description="Registar novo aluno"
        footer={<button onClick={create} className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Criar Matrícula</button>}>
        <div className="space-y-3 text-sm">
          <div><label className="block text-xs font-medium mb-1">Nome do aluno</label><input value={form.studentName} onChange={e => setForm({...form, studentName: e.target.value})} className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm" /></div>
          <div className="grid grid-cols-2 gap-2">
            <div><label className="block text-xs font-medium mb-1">Classe</label><select value={form.classe} onChange={e => setForm({...form, classe: e.target.value})} className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"><option>10ª</option><option>11ª</option><option>12ª</option></select></div>
            <div><label className="block text-xs font-medium mb-1">Turma</label><select value={form.turma} onChange={e => setForm({...form, turma: e.target.value})} className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"><option>A</option><option>B</option></select></div>
          </div>
          <div><label className="block text-xs font-medium mb-1">Encarregado</label><input value={form.guardian} onChange={e => setForm({...form, guardian: e.target.value})} className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm" /></div>
          <div className="rounded-xl border border-dashed border-border p-3 text-center text-xs text-muted-foreground">Documentos: anexar (demo)</div>
        </div>
      </DetailSheet>
    </PageContainer>
  );
}

export function SecretaryStudents() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [classFilter, setClassFilter] = useState('all');
  const filtered = students.filter(s =>
    (search === '' || s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase())) &&
    (classFilter === 'all' || `${s.classe}ª ${s.turma}` === classFilter)
  );
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Alunos</h1>
        <p className="mt-1 text-sm text-muted-foreground">Directório e registos de alunos.</p>
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        <div className="flex-1 min-w-[200px] max-w-md relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Pesquisar nome, ID ou email…" className="rounded-xl pl-9" />
        </div>
        <div className="w-40">
          <Select value={classFilter} onValueChange={setClassFilter}>
            <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
            <SelectContent><SelectItem value="all">Todas as turmas</SelectItem>{classGroups.map(c => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}</SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-1.5">
        {filtered.length === 0 && <p className="text-center text-xs text-muted-foreground py-6">Sem resultados.</p>}
        {filtered.map(s => (
          <button key={s.id} onClick={() => navigate(`/app/secretary/students/${s.id}`)} className="w-full text-left flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:shadow-sm transition-all active:scale-[0.997]">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{s.avatar}</div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{s.name}</p>
              <p className="text-xs text-muted-foreground">{s.classe}ª {s.turma} · {s.id} · {s.email}</p>
            </div>
            <StatusBadge label={s.estado === 'excelente' ? 'Excelente' : s.estado === 'em_risco' ? 'Em Risco' : 'Activo'} variant={s.estado === 'excelente' ? 'success' : s.estado === 'em_risco' ? 'warning' : 'muted'} />
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        ))}
      </div>
    </PageContainer>
  );
}

export function SecretaryDocuments() {
  const navigate = useNavigate();
  const docs = [
    { name: 'Certificado de Matrícula', count: 176, type: 'certificado' },
    { name: 'Pauta de Notas', count: 12, type: 'pauta' },
    { name: 'Declaração de Frequência', count: 45, type: 'declaracao' },
    { name: 'Ficha de Transferência', count: 3, type: 'transferencia' },
  ];

  return (
    <PageContainer>
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Documentos</h1>
        <p className="mt-1 text-sm text-muted-foreground">Geração e gestão de documentos.</p>
        </div>
        <button onClick={() => navigate('/app/secretary/documents/new')} className="flex items-center gap-1.5 rounded-xl bg-primary px-3 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90"><Plus className="h-3.5 w-3.5" />Novo</button>
      </div>
      <div className="space-y-2">
        {docs.map((d, i) => (
          <button key={i} onClick={() => navigate('/app/secretary/documents/new')} className="w-full text-left flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:shadow-sm transition-all active:scale-[0.997]">
            <FolderOpen className="h-4 w-4 text-muted-foreground shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{d.name}</p>
              <p className="text-xs text-muted-foreground">{d.count} documentos emitidos</p>
            </div>
            <span className="rounded-lg bg-muted px-2.5 py-1 text-xs font-medium text-foreground">
              <Download className="h-3 w-3 inline mr-1" />Gerar
            </span>
          </button>
        ))}
      </div>
    </PageContainer>
  );
}

export function SecretaryClasses() {
  const navigate = useNavigate();
  const [active, setActive] = useState<typeof classGroups[number] | null>(null);
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Turmas</h1>
        <p className="mt-1 text-sm text-muted-foreground">Configuração e gestão de turmas.</p>
      </div>
      <div className="space-y-2">
        {classGroups.map(c => (
          <button key={c.id} onClick={() => setActive(c)} className="w-full text-left flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 hover:shadow-sm transition-all active:scale-[0.997]">
            <div>
              <p className="text-sm font-medium text-foreground">{c.name}</p>
              <p className="text-xs text-muted-foreground">Dir. Turma: {c.directorTurma} · {c.studentCount} alunos</p>
            </div>
            <StatusBadge label={c.classe + 'ª Classe'} variant="primary" />
          </button>
        ))}
      </div>
      <DetailSheet open={!!active} onOpenChange={(o) => !o && setActive(null)} title={active?.name ?? ''} description={active ? `Director: ${active.directorTurma}` : ''}
        footer={<button onClick={() => { setActive(null); navigate('/app/secretary/schedule'); }} className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Ver horário</button>}>
        {active && <p className="text-sm text-foreground">{active.studentCount} alunos · 9 disciplinas curriculares</p>}
      </DetailSheet>
    </PageContainer>
  );
}

export function SecretarySchedule() {
  const [active, setActive] = useState<typeof classGroups[number] | null>(null);
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Horário</h1>
        <p className="mt-1 text-sm text-muted-foreground">Gestão de horários académicos.</p>
      </div>
      <div className="space-y-2">
        {classGroups.map(c => (
          <button key={c.id} onClick={() => setActive(c)} className="w-full text-left flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 hover:shadow-sm transition-all active:scale-[0.997]">
            <div>
              <p className="text-sm font-medium text-foreground">{c.name}</p>
              <p className="text-xs text-muted-foreground">{c.studentCount} alunos · Período: 07:30–12:30</p>
            </div>
            <StatusBadge label="Ver Horário" variant="primary" />
          </button>
        ))}
      </div>
      <DetailSheet open={!!active} onOpenChange={(o) => !o && setActive(null)} title={`Horário · ${active?.name ?? ''}`} description="Semana actual">
        {active && (
          <div className="space-y-1.5 text-sm">
            {['Segunda','Terça','Quarta','Quinta','Sexta'].map(d => (
              <div key={d} className="rounded-lg border border-border p-2.5"><p className="text-xs font-semibold text-foreground">{d}</p><p className="text-[11px] text-muted-foreground">07:30 Mat · 08:15 Por · 09:15 Fis · 10:30 Bio · 11:30 Ing</p></div>
            ))}
          </div>
        )}
      </DetailSheet>
    </PageContainer>
  );
}

export function SecretaryRegularity() {
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">Regularidade</h1>
        <p className="mt-1 text-sm text-muted-foreground">Conformidade e regularidade dos alunos.</p>
      </div>
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatsCard label="Regulares" value={students.filter(s => s.estado !== 'em_risco').length} icon={Users} variant="primary" />
        <StatsCard label="Irregulares" value={students.filter(s => s.estado === 'em_risco').length} icon={UserCheck} />
        <StatsCard label="Total" value={students.length} icon={ClipboardList} />
      </div>
      <div className="space-y-1.5">
        {students.map(s => (
          <div key={s.id} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-bold">{s.avatar}</div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{s.name}</p>
              <p className="text-xs text-muted-foreground">{s.classe}ª {s.turma} · Média: {s.media} · Assiduidade: {s.taxaAssiduidade}%</p>
            </div>
            <StatusBadge label={s.estado === 'em_risco' ? 'Irregular' : 'Regular'} variant={s.estado === 'em_risco' ? 'destructive' : 'success'} />
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
