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

  return (
    <div className={cn('flex min-w-0 items-center', className)}>
      <img
        src={asset}
        alt="Colégio Deus Connosco"
        className={cn(
          'block shrink-0 object-contain',
          variant === 'compact' ? 'h-8 w-8' : 'h-10 w-auto max-w-full',
          imageClassName
        )}
      />
    </div>
  );
}
