import React from 'react';
import { useNavigate } from 'react-router-dom';

const KpiCard = ({ count, icon, label, route }) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => route && navigate(route)}
      className="group flex h-full min-h-[132px] w-full items-center justify-between rounded-2xl border border-border bg-card p-5 text-start shadow-custom-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-custom-md"
    >
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
        <p className="text-3xl font-bold text-foreground">{count}</p>
      </div>
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-surface-raised p-3 shadow-custom-sm transition-colors group-hover:border-primary/30 group-hover:bg-primary/10">
        <img src={icon} alt={label} className="h-8 w-8 object-contain" />
      </span>
    </button>
  );
};

export default KpiCard;
