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

const textPlaceholderKeyByField = {
  client_name: 'reports.filters.placeholders.clientName',
  file_number: 'reports.filters.placeholders.fileNumber',
};

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
            placeholder={t('reports.filters.chooseOption')}
            emptyOptionLabel={t('reports.filters.allOption')}
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
            placeholder={t(textPlaceholderKeyByField[name] || 'reports.filters.placeholders.default')}
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
            <button
              type="button"
              onClick={() => setDraft(onReset())}
              className="h-10 w-full rounded-lg border border-[hsl(var(--color-border))] px-4 text-sm font-medium text-foreground sm:w-auto"
            >
              {t('reports.filters.resetButton')}
            </button>
            <button type="submit" className="h-10 w-full rounded-lg bg-[hsl(var(--color-primary))] px-4 text-sm font-semibold text-[hsl(var(--color-primary-foreground))] sm:w-auto">
              {t('reports.filters.searchButton')}
            </button>
          </>
        )}
      >
        {(schema.groups || []).map((group, index) => {
          const fieldNames = group.fields.filter(
            (fieldName) => !(hasDateRange && (fieldName === 'from_date' || fieldName === 'to_date')),
          );

          return (
            <FilterGroup
              key={group.titleKey}
              title={t(group.titleKey)}
              divider={index > 0}
              count={fieldNames.length + (hasDateRange && group.fields.includes('from_date') ? 2 : 0)}
            >
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
                  datePlaceholder={t('reports.filters.datePlaceholder')}
                  dir={direction}
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
