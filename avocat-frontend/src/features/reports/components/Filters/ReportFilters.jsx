import React from 'react';
import { LexicraftIcon } from '@shared/icons/lexicraft';
import { useLanguage } from '@shared/contexts/LanguageContext';

const baseInputClass =
  'w-full rounded-2xl border border-border/70 bg-[hsl(var(--card)/0.72)] px-3 py-2.5 text-sm text-foreground shadow-sm backdrop-blur outline-none transition focus:ring-2 focus:ring-[hsl(var(--ring))]';

const ReportFilters = ({
  filters,
  selectFilters = [],
  statusOptions = [],
  onChange,
  onApply,
  onReset,
  searchPlaceholder,
}) => {
  const { t, isRTL } = useLanguage();

  return (
    <section className="rounded-2xl border border-border/70 bg-[hsl(var(--card)/0.75)] p-4 shadow-sm backdrop-blur">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        <div className="relative">
          <LexicraftIcon
            name="search"
            size={16}
            className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`}
          />
          <input
            value={filters.searchTerm || ''}
            onChange={(event) => onChange({ searchTerm: event.target.value })}
            placeholder={searchPlaceholder || t('common.search')}
            className={`${baseInputClass} ${isRTL ? 'pr-10 text-right' : 'pl-10 text-left'}`}
          />
        </div>

        {selectFilters.map((filter) => (
          <select
            key={filter.key}
            value={filters[filter.key] || ''}
            onChange={(event) => onChange({ [filter.key]: event.target.value })}
            className={baseInputClass}
          >
            <option value="">{filter.placeholder}</option>
            {filter.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ))}

        <div className="relative">
          <LexicraftIcon
            name="calendar"
            size={16}
            className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`}
          />
          <input
            type="date"
            value={filters.startDate || ''}
            onChange={(event) => onChange({ startDate: event.target.value })}
            className={`${baseInputClass} ${isRTL ? 'pr-10 text-right' : 'pl-10 text-left'}`}
          />
        </div>

        <div className="relative">
          <LexicraftIcon
            name="calendar"
            size={16}
            className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`}
          />
          <input
            type="date"
            value={filters.endDate || ''}
            onChange={(event) => onChange({ endDate: event.target.value })}
            className={`${baseInputClass} ${isRTL ? 'pr-10 text-right' : 'pl-10 text-left'}`}
          />
        </div>

        {statusOptions.length > 0 && (
          <select
            value={filters.status || ''}
            onChange={(event) => onChange({ status: event.target.value })}
            className={baseInputClass}
          >
            <option value="">{t('reports.filters.allStatuses')}</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className={`mt-4 flex gap-2 ${isRTL ? 'justify-start' : 'justify-end'}`}>
        <button
          type="button"
          onClick={onReset}
          className="w-full rounded-2xl border border-border/70 px-4 py-2 text-sm font-semibold text-foreground md:w-auto"
        >
          {t('common.reset')}
        </button>
        <button
          type="button"
          onClick={onApply}
          className="w-full rounded-2xl bg-[hsl(var(--primary))] px-4 py-2 text-sm font-semibold text-[hsl(var(--primary-foreground))] md:w-auto"
        >
          {t('common.applyFilters')}
        </button>
      </div>
    </section>
  );
};

export default ReportFilters;
