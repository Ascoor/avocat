import React from 'react';

const toneMap = {
  neutral: 'bg-muted text-muted-foreground border-border',
  info: 'bg-primary/10 text-primary border-primary/20',
  success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border-emerald-500/20',
  warning: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20',
};

const DashboardSectionHeader = ({
  icon,
  title,
  description,
  align = 'start',
  badge,
  tone = 'neutral',
}) => {
  const alignmentClass =
    align === 'center' ? 'text-center items-center' : 'text-start items-start';

  return (
    <div className={`flex flex-col gap-2 ${alignmentClass}`}>
      <div className="flex items-center gap-3">
        {icon ? (
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-raised text-lg shadow-custom-sm">
            {icon}
          </span>
        ) : null}
        <h2 className="text-xl font-semibold tracking-tight text-foreground">{title}</h2>
      </div>
      {description ? (
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p>
      ) : null}
      {badge ? (
        <span
          className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${toneMap[tone] ?? toneMap.neutral}`}
        >
          {badge}
        </span>
      ) : null}
    </div>
  );
};

export default DashboardSectionHeader;
