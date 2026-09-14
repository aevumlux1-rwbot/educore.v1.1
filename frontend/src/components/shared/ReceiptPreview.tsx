import { toast } from 'sonner';
import { Printer, Download } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ReceiptPreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  receipt: {
    number?: string;
    studentName: string;
    conceito: string;
    amount: number;
    metodo?: string;
    referencia?: string;
    date?: string;
  };
}

export function ReceiptPreview({ open, onOpenChange, receipt }: ReceiptPreviewProps) {
  const number = receipt.number ?? `RC-${Math.floor(Math.random() * 90000 + 10000)}`;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="font-heading text-base">Recibo de Pagamento</DialogTitle>
        </DialogHeader>
        <div className="px-6 pb-4">
          <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
            <div className="text-center border-b border-border pb-3">
              <p className="font-heading text-base font-bold text-foreground">Colégio Deus Connosco</p>
              <p className="text-[10px] text-muted-foreground">Campoane · Boane · Maputo · +258 84 344 4400</p>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Recibo</span>
              <span className="font-mono font-semibold text-foreground">{number}</span>
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between"><span className="text-muted-foreground">Aluno</span><span className="font-medium text-foreground">{receipt.studentName}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Conceito</span><span className="font-medium text-foreground text-right">{receipt.conceito}</span></div>
              {receipt.metodo && <div className="flex justify-between"><span className="text-muted-foreground">Método</span><span className="font-medium text-foreground">{receipt.metodo}</span></div>}
              {receipt.referencia && <div className="flex justify-between"><span className="text-muted-foreground">Referência</span><span className="font-mono text-foreground">{receipt.referencia}</span></div>}
              <div className="flex justify-between"><span className="text-muted-foreground">Data</span><span className="font-medium text-foreground">{receipt.date ? new Date(receipt.date).toLocaleDateString('pt-PT') : new Date().toLocaleDateString('pt-PT')}</span></div>
            </div>
            <div className="rounded-xl bg-primary/5 border border-primary/10 p-3 text-center">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Total</p>
              <p className="font-heading text-2xl font-bold text-primary">{receipt.amount.toLocaleString('pt-PT')} MT</p>
            </div>
            <p className="text-center text-[10px] text-muted-foreground italic">Documento emitido electronicamente — validação institucional confirmada.</p>
          </div>
        </div>
        <div className="border-t border-border bg-muted/20 p-3 grid grid-cols-2 gap-2">
          <button onClick={() => window.print()} className="flex items-center justify-center gap-1.5 rounded-xl border border-border bg-card py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors"><Printer className="h-3.5 w-3.5" />Imprimir</button>
          <button onClick={() => toast.success('Recibo descarregado em PDF (demo).')} className="flex items-center justify-center gap-1.5 rounded-xl bg-primary py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"><Download className="h-3.5 w-3.5" />Baixar PDF</button>
        </div>
      </DialogContent>
    </Dialog>
  );
}