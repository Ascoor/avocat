import React from 'react';

const toneByStatus = {
  completed: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700',
  pending: 'border-amber-500/30 bg-amber-500/10 text-amber-700',
  cancelled: 'border-rose-500/30 bg-rose-500/10 text-rose-700',
};

const ReportStatusBadge = ({ status }) => {
  const normalized = String(status || '').toLowerCase();
  const tone = toneByStatus[normalized] || 'border-border/70 bg-[hsl(var(--muted))] text-foreground';

  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${tone}`}>
      {status || '-'}
    </span>
  );
};

export default ReportStatusBadge;
