import { DetailSheet } from '@/components/shared/DetailSheet';
import { StatusBadge } from '@/components/ui/status-badge';
import { Calendar, Clock, MapPin, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { AssessmentCalendarItem } from '@/data/mockData';

interface AssessmentDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assessment: AssessmentCalendarItem | null;
  knowledgeBase?: string;
}

export function AssessmentDetailModal({ open, onOpenChange, assessment, knowledgeBase = '/app/student/knowledge' }: AssessmentDetailModalProps) {
  return (
    <DetailSheet
      open={open}
      onOpenChange={onOpenChange}
      title={assessment?.title ?? ''}
      description={assessment ? `${assessment.subjectName} · ${assessment.turma}` : ''}
      footer={assessment && (
        <div className="grid grid-cols-2 gap-2">
          <Link to={`${knowledgeBase}?subject=${encodeURIComponent(assessment.subjectName)}`} onClick={() => onOpenChange(false)} className="rounded-xl border border-border py-2 text-center text-xs font-medium text-foreground hover:bg-muted">Abrir Conteúdos</Link>
          <Link to={`/app/student/subjects/${assessment.subjectId}`} onClick={() => onOpenChange(false)} className="rounded-xl bg-primary py-2 text-center text-xs font-semibold text-primary-foreground hover:bg-primary/90">Ver Disciplina</Link>
        </div>
      )}
    >
      {assessment && (
        <div className="space-y-3 text-sm">
          <div className="flex flex-wrap gap-1.5">
            <StatusBadge label={assessment.tipo} variant={assessment.tipo === 'ACP' ? 'destructive' : assessment.tipo === 'ACS2' ? 'info' : 'muted'} />
            <StatusBadge label={assessment.status === 'futura' ? 'Futura' : assessment.status === 'hoje' ? 'Hoje' : assessment.status === 'concluida' ? 'Concluída' : 'Adiada'} variant={assessment.status === 'concluida' ? 'success' : assessment.status === 'hoje' ? 'warning' : 'primary'} />
          </div>
          <div className="rounded-xl bg-muted/40 p-3 space-y-1.5 text-xs">
            <div className="flex items-center gap-2"><Calendar className="h-3.5 w-3.5 text-muted-foreground" /><span className="text-foreground">{new Date(assessment.date).toLocaleDateString('pt-PT', { weekday: 'long', day: 'numeric', month: 'long' })}</span></div>
            <div className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-muted-foreground" /><span className="text-foreground">{assessment.time}</span></div>
            <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-muted-foreground" /><span className="text-foreground">{assessment.room}</span></div>
            <div className="flex items-center gap-2"><User className="h-3.5 w-3.5 text-muted-foreground" /><span className="text-foreground">{assessment.teacher}</span></div>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Matéria prevista</p>
            <p className="text-sm text-foreground">{assessment.materia}</p>
          </div>
          <div className="rounded-xl border border-border p-3">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Recomendação de estudo</p>
            <p className="text-sm text-foreground">Reveja os materiais publicados em <strong>Conteúdos</strong> e os exercícios de preparação. Tempo estimado: 60–90 min.</p>
          </div>
        </div>
      )}
    </DetailSheet>
  );
}