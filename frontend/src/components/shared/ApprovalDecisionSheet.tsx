import { useState } from 'react';
import { toast } from 'sonner';
import { Check, X, MessageSquare } from 'lucide-react';
import { DetailSheet } from '@/components/shared/DetailSheet';
import { StatusBadge } from '@/components/ui/status-badge';
import type { Approval } from '@/data/mockData';

interface ApprovalDecisionSheetProps {
  approval: Approval | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDecide: (id: string, decision: 'aprovado' | 'rejeitado', comment: string) => void;
}

export function ApprovalDecisionSheet({ approval, open, onOpenChange, onDecide }: ApprovalDecisionSheetProps) {
  const [comment, setComment] = useState('');

  const decide = (d: 'aprovado' | 'rejeitado') => {
    if (!approval) return;
    onDecide(approval.id, d, comment);
    toast.success(d === 'aprovado' ? 'Solicitação aprovada.' : 'Solicitação rejeitada.');
    setComment('');
  };

  return (
    <DetailSheet
      open={open}
      onOpenChange={onOpenChange}
      title={approval?.title ?? ''}
      description={approval ? `${approval.origin} · ${approval.submittedAt}` : ''}
      footer={approval && (
        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => decide('rejeitado')} className="flex items-center justify-center gap-1.5 rounded-xl border border-destructive/40 bg-destructive/5 py-2.5 text-xs font-semibold text-destructive hover:bg-destructive/10 transition-colors"><X className="h-3.5 w-3.5" />Rejeitar</button>
          <button onClick={() => decide('aprovado')} className="flex items-center justify-center gap-1.5 rounded-xl bg-success py-2.5 text-xs font-semibold text-success-foreground hover:bg-success/90 transition-colors"><Check className="h-3.5 w-3.5" />Aprovar</button>
        </div>
      )}
    >
      {approval && (
        <div className="space-y-3 text-sm">
          <div className="flex flex-wrap gap-1.5">
            <StatusBadge label={`Prioridade ${approval.priority}`} variant={approval.priority === 'alta' ? 'destructive' : approval.priority === 'media' ? 'warning' : 'muted'} />
            {approval.disciplina && <StatusBadge label={approval.disciplina} variant="primary" />}
            {approval.turma && <StatusBadge label={approval.turma} variant="info" />}
            {approval.impact && <StatusBadge label={`Impacto ${approval.impact}`} variant="warning" />}
          </div>
          <div className="rounded-xl bg-muted/40 p-3">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Detalhe</p>
            <p className="text-sm text-foreground">{approval.details}</p>
          </div>
          {approval.recommendation && (
            <div className="rounded-xl border border-info/20 bg-info/5 p-3">
              <p className="text-[10px] uppercase tracking-wider text-info mb-1">Recomendação</p>
              <p className="text-sm text-foreground">{approval.recommendation}</p>
            </div>
          )}
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1"><MessageSquare className="h-3 w-3" /> Comentário (opcional)</label>
            <textarea value={comment} onChange={e => setComment(e.target.value)} rows={3} placeholder="Justifique a decisão…" className="w-full rounded-xl border border-input bg-background p-2 text-sm" />
          </div>
        </div>
      )}
    </DetailSheet>
  );
}