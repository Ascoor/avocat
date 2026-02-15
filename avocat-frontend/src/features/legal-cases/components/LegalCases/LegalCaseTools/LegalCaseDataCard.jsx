// =========================
// LegalCaseTools/LegalCaseDataCard.jsx
// =========================
import React from 'react';

export default function LegalCaseDataCard({ legalCase, kpiData = [], onOpenTab, isRTL }) {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div className={isRTL ? 'text-right' : 'text-left'}>
          <h2 className="text-lg font-bold text-[hsl(var(--color-text))]">
            {legalCase?.title || '-'}
          </h2>
          <p className="text-sm text-[hsl(var(--color-muted))]">
            {legalCase?.slug || legalCase?.id || '-'}
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {kpiData.map(({ key, label, value, Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => onOpenTab?.(key)}
            className={[
              'pressable w-full rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface))] p-4',
              'transition hover:shadow-sm',
              isRTL ? 'text-right' : 'text-left',
            ].join(' ')}
          >
            <div
              className={[
                'flex items-center justify-between gap-3',
                isRTL ? 'flex-row-reverse' : 'flex-row',
              ].join(' ')}
            >
              <div>
                <div className="text-sm text-[hsl(var(--color-muted))]">{label}</div>
                <div className="mt-1 text-2xl font-bold text-[hsl(var(--color-text))]">
                  {value}
                </div>
              </div>
              {Icon ? <Icon className="h-5 w-5 opacity-80" /> : null}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
