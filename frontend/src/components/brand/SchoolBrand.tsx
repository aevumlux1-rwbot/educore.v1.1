import { cn } from '@/lib/utils';
import schoolLogo from '@/assets/brand/colegio-deus-connosco-logo.png';
import schoolMark from '@/assets/brand/colegio-deus-connosco-mark.png';

interface SchoolBrandProps {
  variant?: 'full' | 'compact';
  className?: string;
  imageClassName?: string;
}

export function SchoolBrand({
  variant = 'full',
  className,
  imageClassName,
}: SchoolBrandProps) {
  const asset = variant === 'compact' ? schoolMark : schoolLogo;

  if (variant === 'compact') {
    return (
      <div className={cn('flex min-w-0 items-center', className)}>
        <img
          src={asset}
          alt="Colégio Deus Connosco"
          className={cn('block h-10 w-10 shrink-0 object-contain', imageClassName)}
        />
      </div>
    );
  }

  return (
    <div className={cn('flex min-w-0 items-center gap-3', className)}>
      <img
        src={asset}
        alt="Símbolo do Colégio Deus Connosco"
        className={cn('block h-14 w-14 shrink-0 object-contain', imageClassName)}
      />
      <div className="hidden min-w-0 leading-none sm:block">
        <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-primary/70">Colégio</span>
        <span className="mt-1 block whitespace-nowrap font-heading text-[15px] font-bold tracking-[-0.02em] text-primary">
          Deus Connosco
        </span>
      </div>
    </div>
  );
}
