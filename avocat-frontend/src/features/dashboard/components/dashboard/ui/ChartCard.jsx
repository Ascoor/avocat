import React from 'react';

const badgeTone = {
  info: 'bg-primary/10 text-primary border-primary/25',
  success: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20',
  warning: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20',
  neutral: 'bg-muted text-muted-foreground border-border',
};

const ChartCard = ({ title, subtitle, badge, tone = 'neutral', children }) => (
  <section className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-custom-sm transition-shadow duration-200 hover:shadow-custom-md">
    <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        <p className="text-sm leading-6 text-muted-foreground">{subtitle}</p>
      </div>
      {badge ? (
        <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${badgeTone[tone] ?? badgeTone.neutral}`}>
          {badge}
        </span>
      ) : null}
    </div>
    <div className="relative min-h-[280px] flex-1">{children}</div>
  </section>
);

export default ChartCard;
