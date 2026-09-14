import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { PageContainer } from '@/components/layout/PageContainer';
import { SectionHeader } from '@/components/ui/section-header';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { StatusBadge } from '@/components/ui/status-badge';
import { DetailSheet } from '@/components/shared/DetailSheet';
import { classGroups, students, assessmentsCalendar, knowledgeItems } from '@/data/mockData';
import { ArrowLeft, Users, TrendingUp, CheckCircle, Calendar, ClipboardList, BookOpen, MessageCircle, Plus, Save, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

export function TeacherClassDetail() {
  const { classId } = useParams();
  const navigate = useNavigate();
  const cls = classGroups.find(c => c.id === classId);
  const [activeStudent, setActiveStudent] = useState<typeof students[number] | null>(null);

  if (!cls) return <PageContainer><p className="text-sm text-muted-foreground">Turma não encontrada.</p></PageContainer>;

  const classStudents = students.filter(s => `${s.classe}ª ${s.turma}` === cls.name);
  const next = assessmentsCalendar.filter(a => a.turma === cls.name && a.status !== 'concluida');
  const materials = knowledgeItems.slice(0, 4);

  return (
    <PageContainer>
      <button onClick={() => navigate('/app/teacher/classes')} className="mb-4 flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"><ArrowLeft className="h-3.5 w-3.5" /> Turmas</button>

      <div className="mb-5 rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-transparent p-5">
        <h1 className="font-heading text-2xl font-bold text-foreground">{cls.name}</h1>
        <p className="text-sm text-muted-foreground">Dir. Turma: {cls.directorTurma} · {cls.studentCount} alunos</p>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatsCard label="Alunos" value={cls.studentCount} icon={Users} variant="primary" />
        <StatsCard label="Média Turma" value="13.2" icon={TrendingUp} />
        <StatsCard label="Assiduidade" value="86%" icon={CheckCircle} />
        <StatsCard label="Próximas Avaliações" value={next.length} icon={Calendar} />
      </div>

      <div className="mb-5 grid grid-cols-2 gap-2 sm:grid-cols-5">
        <button onClick={() => navigate('/app/teacher/gradebook')} className="rounded-xl border border-border bg-card py-2.5 text-xs font-medium text-foreground hover:bg-muted flex items-center justify-center gap-1.5"><BookOpen className="h-3.5 w-3.5" />Notas</button>
        <button onClick={() => navigate('/app/teacher/attendance')} className="rounded-xl border border-border bg-card py-2.5 text-xs font-medium text-foreground hover:bg-muted flex items-center justify-center gap-1.5"><CheckCircle className="h-3.5 w-3.5" />Presenças</button>
        <button onClick={() => navigate('/app/teacher/assessments')} className="rounded-xl border border-border bg-card py-2.5 text-xs font-medium text-foreground hover:bg-muted flex items-center justify-center gap-1.5"><ClipboardList className="h-3.5 w-3.5" />Avaliação</button>
        <button onClick={() => navigate('/app/teacher/knowledge')} className="rounded-xl border border-border bg-card py-2.5 text-xs font-medium text-foreground hover:bg-muted flex items-center justify-center gap-1.5"><Plus className="h-3.5 w-3.5" />Material</button>
        <button onClick={() => navigate('/app/teacher/chat')} className="rounded-xl bg-primary py-2.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-1.5"><MessageCircle className="h-3.5 w-3.5" />Mensagem</button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-4">
          <SectionHeader title={`Alunos (${classStudents.length})`} />
          <div className="mt-3 space-y-1.5">
            {classStudents.length === 0 && <p className="text-xs text-muted-foreground">Sem alunos nesta turma na demo.</p>}
            {classStudents.map(s => (
              <button key={s.id} onClick={() => setActiveStudent(s)} className="w-full text-left flex items-center gap-3 rounded-lg border border-border px-3 py-2 hover:shadow-sm transition-all active:scale-[0.997]">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-bold text-foreground">{s.avatar}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">{s.name}</p>
                  <p className="text-[10px] text-muted-foreground">Média {s.media} · Assid. {s.taxaAssiduidade}%</p>
                </div>
                <StatusBadge label={s.estado === 'excelente' ? 'Excelente' : s.estado === 'em_risco' ? 'Risco' : 'OK'} variant={s.estado === 'excelente' ? 'success' : s.estado === 'em_risco' ? 'destructive' : 'muted'} />
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-4">
          <SectionHeader title="Próximas Avaliações" />
          <div className="mt-3 space-y-1.5">
            {next.length === 0 && <p className="text-xs text-muted-foreground">Sem avaliações marcadas.</p>}
            {next.map(a => (
              <div key={a.id} className="flex items-center gap-2 rounded-lg border border-border px-3 py-2">
                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">{a.title}</p>
                  <p className="text-[10px] text-muted-foreground">{new Date(a.date).toLocaleDateString('pt-PT', { day: 'numeric', month: 'short' })} · {a.tipo}</p>
                </div>
              </div>
            ))}
          </div>

          <SectionHeader title="Materiais Recentes" className="mt-5" />
          <div className="mt-3 space-y-1.5">
            {materials.map(m => (
              <div key={m.id} className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
                <span className="text-xs text-foreground truncate">{m.title}</span>
                <StatusBadge label={m.disciplina} variant="primary" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <DetailSheet open={!!activeStudent} onOpenChange={(o) => !o && setActiveStudent(null)} title={activeStudent?.name ?? ''} description={activeStudent ? `${activeStudent.classe}ª ${activeStudent.turma} · ${activeStudent.id}` : ''}
        footer={<button onClick={() => { toast.success('Mensagem enviada ao encarregado.'); setActiveStudent(null); }} className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-1.5"><Send className="h-4 w-4" />Enviar Mensagem</button>}>
        {activeStudent && (
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-xl bg-muted/40 p-3 text-center"><p className="text-[10px] text-muted-foreground">Média</p><p className="font-heading text-base font-bold text-foreground">{activeStudent.media}</p></div>
              <div className="rounded-xl bg-muted/40 p-3 text-center"><p className="text-[10px] text-muted-foreground">Assid.</p><p className="font-heading text-base font-bold text-foreground">{activeStudent.taxaAssiduidade}%</p></div>
              <div className="rounded-xl bg-muted/40 p-3 text-center"><p className="text-[10px] text-muted-foreground">Estado</p><p className="font-heading text-xs font-bold text-foreground capitalize">{activeStudent.estado.replace('_', ' ')}</p></div>
            </div>
            <p className="text-xs text-muted-foreground">Email: {activeStudent.email}</p>
          </div>
        )}
      </DetailSheet>
    </PageContainer>
  );
}