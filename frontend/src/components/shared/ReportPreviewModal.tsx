import { toast } from 'sonner';
import { type ReactNode } from 'react';
import { Printer, Download, FileSpreadsheet } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface ReportPreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  period?: string;
  children: ReactNode;
  withExcel?: boolean;
}

export function ReportPreviewModal({ open, onOpenChange, title, period, children, withExcel }: ReportPreviewModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="font-heading text-base">{title}</DialogTitle>
          {period && <DialogDescription className="text-xs">{period}</DialogDescription>}
        </DialogHeader>
        <div className="px-6 pb-4 max-h-[60vh] overflow-y-auto">
          <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
            <div className="border-b border-border pb-3 text-center">
              <p className="font-heading text-sm font-bold text-foreground">Colégio Deus Connosco</p>
              <p className="text-[10px] text-muted-foreground">{title} · {period}</p>
            </div>
            {children}
          </div>
        </div>
        <div className="border-t border-border bg-muted/20 p-3 grid gap-2" style={{ gridTemplateColumns: withExcel ? '1fr 1fr 1fr' : '1fr 1fr' }}>
          <button onClick={() => window.print()} className="flex items-center justify-center gap-1.5 rounded-xl border border-border bg-card py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors"><Printer className="h-3.5 w-3.5" />Imprimir</button>
          <button onClick={() => toast.success('Relatório exportado em PDF (demo).')} className="flex items-center justify-center gap-1.5 rounded-xl bg-primary py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"><Download className="h-3.5 w-3.5" />PDF</button>
          {withExcel && <button onClick={() => toast.success('Relatório exportado em Excel (demo).')} className="flex items-center justify-center gap-1.5 rounded-xl border border-border bg-card py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors"><FileSpreadsheet className="h-3.5 w-3.5" />Excel</button>}
        </div>
      </DialogContent>
    </Dialog>
  );
}