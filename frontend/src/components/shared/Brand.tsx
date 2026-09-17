import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useTenant } from '@/contexts/TenantContext';

interface BrandProps {
  variant?: 'full' | 'mark' | 'stack';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  className?: string;
  subtitle?: string;
  tone?: 'default' | 'onPrimary';
}

const sizeMap = {
  sm: { mark: 'h-8 w-8', logo: 'h-9 w-9', name: 'text-sm', sub: 'text-[10px]' },
  md: { mark: 'h-10 w-10', logo: 'h-11 w-11', name: 'text-base', sub: 'text-[11px]' },
  lg: { mark: 'h-14 w-14', logo: 'h-16 w-16', name: 'text-lg', sub: 'text-xs' },
};

export function Brand({ variant = 'full', size = 'md', to, className, subtitle, tone = 'default' }: BrandProps) {
  const { activeTenant } = useTenant();
  const { branding } = activeTenant;
  const s = sizeMap[size];
  const textTone = tone === 'onPrimary' ? 'text-primary-foreground' : 'text-primary';
  const asset = variant === 'mark' ? branding.mark ?? branding.logo : branding.logo ?? branding.mark;
  const initials = branding.shortName.slice(0, 2).toUpperCase();

  const visual = asset ? (
    <img src={asset} alt={branding.displayName} className={cn('shrink-0 object-contain', variant === 'mark' ? s.mark : s.logo)} />
  ) : (
    <span className={cn('flex shrink-0 items-center justify-center rounded-xl bg-primary/10 font-heading text-xs font-black text-primary', variant === 'mark' ? s.mark : s.logo)}>{initials}</span>
  );

  const content = (
    <div className={cn('flex items-center gap-3', className)}>
      {variant === 'mark' ? visual : (
        <>
          {visual}
          <div className="min-w-0 leading-tight">
            <p className={cn('font-heading font-bold tracking-[-0.02em]', s.name, textTone)}>{branding.displayName}</p>
            {subtitle && (
              <p className={cn(s.sub, 'mt-0.5 truncate font-semibold', tone === 'onPrimary' ? 'text-primary-foreground/75' : 'text-muted-foreground')}>
                {subtitle}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
  if (to) return <Link to={to} className="inline-flex">{content}</Link>;
  return content;
}
