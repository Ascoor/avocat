import React from 'react';
import { LexicraftIcon } from '@shared/icons/lexicraft';

const QaSectionCard = ({
  title,
  description,
  iconName = 'tool',
  actions,
  children,
  tone = 'default',
}) => {
  const toneClasses =
    tone === 'success'
      ? 'border-emerald-200/60 bg-emerald-50/40'
      : tone === 'danger'
        ? 'border-destructive/30 bg-destructive/5'
        : 'border-border bg-card';

  return (
    <section className={`rounded-2xl border ${toneClasses} p-5 shadow-sm`}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <LexicraftIcon name={iconName} size={20} />
          </span>
          <div>
            <h3 className="text-base font-semibold text-foreground">{title}</h3>
            {description && (
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </div>
      {children && <div className="mt-4 space-y-4">{children}</div>}
    </section>
  );
};

export default QaSectionCard;
