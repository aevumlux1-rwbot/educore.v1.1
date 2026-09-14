import { toast } from 'sonner';
import { Printer, Download } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { StatusBadge } from '@/components/ui/status-badge';
import type { Invoice } from '@/data/mockData';

interface InvoicePreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoice: Invoice;
}

const statusMap = {
  emitida: { label: 'Emitida', variant: 'info' as const },
  paga: { label: 'Paga', variant: 'success' as const },
  vencida: { label: 'Vencida', variant: 'destructive' as const },
  cancelada: { label: 'Cancelada', variant: 'muted' as const },
};

export function InvoicePreview({ open, onOpenChange, invoice }: InvoicePreviewProps) {
  const s = statusMap[invoice.status];
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="font-heading text-base flex items-center justify-between gap-2">
            <span>Factura {invoice.number}</span>
            <StatusBadge label={s.label} variant={s.variant} />
          </DialogTitle>
        </DialogHeader>
        <div className="px-6 pb-4">
          <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
            <div className="border-b border-border pb-3">
              <p className="font-heading text-base font-bold text-foreground">Colégio Deus Connosco</p>
              <p className="text-[10px] text-muted-foreground">NUIT 400 123 456 · Campoane, Boane · Maputo</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Cliente</p>
                <p className="font-medium text-foreground">{invoice.guardianName}</p>
                <p className="text-muted-foreground">Aluno: {invoice.studentName}</p>
                <p className="text-muted-foreground">Turma: {invoice.turma}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Emissão</p>
                <p className="font-medium text-foreground">{new Date(invoice.issueDate).toLocaleDateString('pt-PT')}</p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-2">Vencimento</p>
                <p className="font-medium text-foreground">{new Date(invoice.dueDate).toLocaleDateString('pt-PT')}</p>
              </div>
            </div>
            <div>
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border text-left text-muted-foreground">
                    <th className="py-1.5 font-medium">Descrição</th>
                    <th className="py-1.5 font-medium text-right">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((it, i) => (
                    <tr key={i} className="border-b border-border/50">
                      <td className="py-1.5 text-foreground">{it.description}</td>
                      <td className="py-1.5 text-right font-medium text-foreground">{it.amount.toLocaleString('pt-PT')} MT</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="font-medium text-foreground">{invoice.subtotal.toLocaleString('pt-PT')} MT</span></div>
              {invoice.discount > 0 && <div className="flex justify-between"><span className="text-muted-foreground">Desconto</span><span className="text-success">-{invoice.discount.toLocaleString('pt-PT')} MT</span></div>}
              {invoice.penalty > 0 && <div className="flex justify-between"><span className="text-muted-foreground">Multa</span><span className="text-destructive">+{invoice.penalty.toLocaleString('pt-PT')} MT</span></div>}
              <div className="flex justify-between border-t border-border pt-2 mt-1"><span className="font-semibold text-foreground">Total</span><span className="font-heading text-base font-bold text-primary">{invoice.total.toLocaleString('pt-PT')} MT</span></div>
            </div>
          </div>
        </div>
        <div className="border-t border-border bg-muted/20 p-3 grid grid-cols-2 gap-2">
          <button onClick={() => window.print()} className="flex items-center justify-center gap-1.5 rounded-xl border border-border bg-card py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors"><Printer className="h-3.5 w-3.5" />Imprimir</button>
          <button onClick={() => toast.success('Factura descarregada em PDF (demo).')} className="flex items-center justify-center gap-1.5 rounded-xl bg-primary py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"><Download className="h-3.5 w-3.5" />Baixar PDF</button>
        </div>
      </DialogContent>
    </Dialog>
  );
}