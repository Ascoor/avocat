const toneByStatus = {
  completed: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700',
  pending: 'border-amber-500/30 bg-amber-500/10 text-amber-700',
  cancelled: 'border-rose-500/30 bg-rose-500/10 text-rose-700',
  open: 'border-blue-500/30 bg-blue-500/10 text-blue-700',
  closed: 'border-slate-500/30 bg-slate-500/10 text-slate-700',
  in_progress: 'border-violet-500/30 bg-violet-500/10 text-violet-700',
};

const ReportStatusBadge = ({ status }) => {
  const normalized = String(status || '').toLowerCase();
  const tone = toneByStatus[normalized] || 'border-border/70 bg-[hsl(var(--muted))] text-foreground';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${tone}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status || '-'}
    </span>
  );
};

export default ReportStatusBadge;
