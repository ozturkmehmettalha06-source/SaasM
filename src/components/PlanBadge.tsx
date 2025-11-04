import { cva, type VariantProps } from 'class-variance-authority';

const planBadge = cva('rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide', {
  variants: {
    plan: {
      free: 'bg-slate-800 text-slate-200',
      basic: 'bg-indigo-500/20 text-indigo-200 ring-1 ring-indigo-500/40',
      pro: 'bg-emerald-500 text-emerald-900',
      enterprise: 'bg-amber-400 text-amber-900'
    }
  },
  defaultVariants: {
    plan: 'free'
  }
});

interface PlanBadgeProps extends VariantProps<typeof planBadge> {
  plan?: 'free' | 'basic' | 'pro' | 'enterprise' | null;
}

export function PlanBadge({ plan = 'free' }: PlanBadgeProps) {
  return <span className={planBadge({ plan: plan ?? 'free' })}>{plan ?? 'free'}</span>;
}
