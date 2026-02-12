import React from 'react';
import { LexicraftIcon } from '@shared/icons/lexicraft'; // Assuming you're using this for icons
import { formatDate } from '@shared/i18n/formatters'; // Assuming you have a formatter for dates

// LegalCaseDataCard Component
const LegalCaseDataCard = ({ legalCase, kpiData }) => {
  return (
    <div className="flex flex-col space-y-4 rounded-2xl border bg-[hsl(var(--color-surface))] p-5 shadow-md hover:shadow-lg transition duration-200">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-[hsl(var(--color-text))]">
            {legalCase?.title || 'Untitled Case'}
          </h3>
          <p className="text-sm text-[hsl(var(--color-muted))]">
            Case Number: {legalCase?.caseNumber || 'N/A'}
          </p>
        </div>
        <div className="inline-flex items-center justify-center rounded-xl bg-[hsl(var(--color-primary))]/10 text-[hsl(var(--color-primary))]">
          <LexicraftIcon name="briefcase" size={20} />
        </div>
      </div>

      {/* Case Status */}
      <div className="mt-2 flex items-center space-x-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold text-[hsl(var(--color-primary))] bg-[hsl(var(--color-surface))]/50">
          <LexicraftIcon name="status" size={14} />
          {legalCase?.status || 'Unknown'}
        </span>
      </div>

      {/* Case Description */}
      {legalCase?.description && (
        <div className="mt-3 text-sm text-[hsl(var(--color-muted))]">
          <p>{legalCase?.description}</p>
        </div>
      )}

      {/* KPI Data Section */}
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {kpiData.map((item) => (
          <div
            key={item.key}
            className="flex flex-col items-center justify-center rounded-2xl border bg-[hsl(var(--color-surface))] p-3 shadow-md"
          >
            <div className="text-xs font-medium text-[hsl(var(--color-muted))]">{item.label}</div>
            <div className="mt-2 text-lg font-semibold text-[hsl(var(--color-text))]">
              {item.value || '-'}
            </div>
            <div className="mt-1">
              <LexicraftIcon name={item.icon} size={18} />
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons (optional) */}
      <div className="mt-5 flex justify-between space-x-3">
        <button
          onClick={() => console.log('Edit Case')}
          className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--color-primary))] bg-[hsl(var(--color-primary))]/10 text-sm font-medium text-[hsl(var(--color-primary))] px-4 py-2 hover:bg-[hsl(var(--color-primary))]/20 transition"
        >
          <LexicraftIcon name="edit" size={16} />
          Edit Case
        </button>
        <button
          onClick={() => console.log('View Details')}
          className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--color-muted))] bg-[hsl(var(--color-muted))]/10 text-sm font-medium text-[hsl(var(--color-muted))] px-4 py-2 hover:bg-[hsl(var(--color-muted))]/20 transition"
        >
          <LexicraftIcon name="eye" size={16} />
          View Details
        </button>
      </div>
    </div>
  );
};

export default LegalCaseDataCard;
