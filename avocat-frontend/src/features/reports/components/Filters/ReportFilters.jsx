import { useEffect, useMemo, useState } from 'react';
import {
  DateRange,
  FilterGrid,
  FilterGroup,
  FilterShell,
  FormField,
  SelectInput,
  TextInput,
} from '@shared/components/filters';
import { useLanguage } from '@shared/contexts/LanguageContext';
import { isDateRangeValid } from '@shared/utils/dateFilters';

const ReportFilters = ({ schema, values, options, onSubmit, onReset }) => {
  const [draft, setDraft] = useState(values);
  const { direction, t } = useLanguage();

  useEffect(() => setDraft(values), [values]);

  const fieldsByName = useMemo(() => schema.fields || {}, [schema.fields]);

  const renderField = (name) => {
    const field = fieldsByName[name];
    if (!field) return null;

    const label = t(field.labelKey);

    if (field.type === 'select') {
      return (
        <FormField key={name} label={label}>
          <SelectInput
            value={draft[name] || ''}
            onChange={(value) => setDraft((prev) => ({ ...prev, [name]: value }))}
            options={options[name] || []}
            emptyOptionLabel={t('reports.filters.emptyOption')}
          />
        </FormField>
      );
    }

    if (field.type === 'text') {
      return (
        <FormField key={name} label={label}>
          <TextInput
            value={draft[name] || ''}
            onChange={(value) => setDraft((prev) => ({ ...prev, [name]: value }))}
            placeholder={t('reports.filters.textPlaceholder')}
          />
        </FormField>
      );
    }

    return null;
  };

  const hasDateRange = Boolean(fieldsByName.from_date && fieldsByName.to_date);

  return (
    <form
      dir={direction}
      onSubmit={(event) => {
        event.preventDefault();
        if (!isDateRangeValid(draft.from_date, draft.to_date)) return;
        onSubmit(draft);
      }}
    >
      <FilterShell
        dir={direction}
        title={t('reports.filters.title')}
        subtitle={t('reports.filters.subtitle')}
        actions={(
          <>
            <button type="submit" className="rounded-xl bg-[hsl(var(--color-primary))] px-4 py-2 text-sm font-semibold text-[hsl(var(--color-primary-foreground))]">
              {t('reports.filters.searchButton')}
            </button>
            <button
              type="button"
              onClick={() => setDraft(onReset())}
              className="rounded-xl border border-[hsl(var(--color-border))] px-4 py-2 text-sm font-semibold text-foreground"
            >
              {t('reports.filters.resetButton')}
            </button>
          </>
        )}
      >
        {(schema.groups || []).map((group, index) => {
          const fieldNames = group.fields.filter(
            (fieldName) => !(hasDateRange && (fieldName === 'from_date' || fieldName === 'to_date')),
          );

          return (
            <FilterGroup key={group.titleKey} title={t(group.titleKey)} divider={index > 0}>
              {fieldNames.length ? (
                <FilterGrid columns={{ base: 1, md: 2, lg: 3 }}>
                  {fieldNames.map((fieldName) => renderField(fieldName))}
                </FilterGrid>
              ) : null}

              {hasDateRange && group.fields.includes('from_date') ? (
                <DateRange
                  fromLabel={t(fieldsByName.from_date.labelKey)}
                  toLabel={t(fieldsByName.to_date.labelKey)}
                  fromValue={draft.from_date || ''}
                  toValue={draft.to_date || ''}
                  onChange={({ from_date, to_date }) => setDraft((prev) => ({ ...prev, from_date, to_date }))}
                  helperText={t('reports.filters.dateFormat')}
                  invalidRangeText={t('reports.filters.invalidDateRange')}
                  clearText={t('reports.filters.clearDateRange')}
                />
              ) : null}
            </FilterGroup>
          );
        })}
      </FilterShell>
    </form>
  );
};

export default ReportFilters;
