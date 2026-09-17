import { cn } from '@/lib/utils';
import { useTenant } from '@/contexts/TenantContext';

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
  const { activeTenant } = useTenant();
  const { branding } = activeTenant;
  const asset = variant === 'compact' ? branding.mark ?? branding.logo : branding.logo ?? branding.mark;
  const initials = branding.shortName.slice(0, 2).toUpperCase();

  const visual = asset ? (
    <img
      src={asset}
      alt={branding.displayName}
      className={cn('block shrink-0 object-contain', variant === 'compact' ? 'h-10 w-10' : 'h-14 w-14', imageClassName)}
    />
  ) : (
    <span className={cn('flex shrink-0 items-center justify-center rounded-xl bg-primary/10 font-heading font-black text-primary', variant === 'compact' ? 'h-10 w-10 text-xs' : 'h-14 w-14 text-sm', imageClassName)}>
      {initials}
    </span>
  );

  if (variant === 'compact') {
    return <div className={cn('flex min-w-0 items-center', className)}>{visual}</div>;
  }

  return (
    <div className={cn('flex min-w-0 items-center gap-3', className)}>
      {visual}
      <div className="hidden min-w-0 leading-none sm:block">
        {branding.descriptor && <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-primary/70">{branding.descriptor}</span>}
        <span className="mt-1 block whitespace-nowrap font-heading text-[15px] font-bold tracking-[-0.02em] text-primary">
          {branding.shortName}
        </span>
      </div>
    </div>
  );
}
