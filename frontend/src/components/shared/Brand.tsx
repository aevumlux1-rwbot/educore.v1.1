import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import logo from '@/assets/brand/colegio-deus-connosco-logo.png';
import mark from '@/assets/brand/colegio-deus-connosco-mark.png';

interface BrandProps {
  variant?: 'full' | 'mark' | 'stack';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  className?: string;
  subtitle?: string;
  tone?: 'default' | 'onPrimary';
}

const sizeMap = {
  sm: { mark: 'h-8 w-8', logo: 'h-8 max-w-[150px]', sub: 'text-[10px]' },
  md: { mark: 'h-10 w-10', logo: 'h-10 max-w-[190px]', sub: 'text-[11px]' },
  lg: { mark: 'h-14 w-14', logo: 'h-14 max-w-[240px]', sub: 'text-xs' },
};

export function Brand({ variant = 'full', size = 'md', to, className, subtitle, tone = 'default' }: BrandProps) {
  const s = sizeMap[size];
  const content = (
    <div className={cn('flex items-center gap-2.5', className)}>
      {variant === 'mark' ? (
        <div className={cn('shrink-0 overflow-hidden rounded-xl bg-white p-1 shadow-sm ring-1 ring-border', s.mark)}>
          <img src={mark} alt="Colégio Deus Connosco" className="h-full w-full object-contain" />
        </div>
      ) : (
        <img src={logo} alt="Colégio Deus Connosco" className={cn('w-auto object-contain', s.logo)} />
      )}
      {variant !== 'mark' && subtitle && (
        <div className="min-w-0 leading-tight">
          <p className={cn(s.sub, 'truncate font-semibold', tone === 'onPrimary' ? 'text-primary-foreground/75' : 'text-muted-foreground')}>
            {subtitle}
          </p>
        </div>
      )}
    </div>
  );
  if (to) return <Link to={to} className="inline-flex">{content}</Link>;
  return content;
}
