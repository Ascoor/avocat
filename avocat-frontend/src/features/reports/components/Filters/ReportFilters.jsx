import { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '@shared/contexts/LanguageContext';

const inputClass =
  'h-11 w-full rounded-xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface))] px-3 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-[hsl(var(--color-primary)/0.3)]';

const FILTER_LAYOUT = {
  cases: {
    rows: ['file_number', 'client_name', ['from_date', 'to_date'], ['case_type_id', 'case_status']],
  },
  services: {
    rows: ['file_number', 'client_name', ['from_date', 'to_date'], ['case_type_id', 'service_status']],
  },
  procedures: {
    rows: ['file_number', 'client_name', ['lawyer_id'], ['from_date', 'to_date'], ['procedure_type_id', 'procedure_status']],
  },
  sessions: {
    rows: ['file_number', 'client_name', ['lawyer_id'], ['from_date', 'to_date'], ['session_type_id', 'session_status']],
  },
  clients: {
    rows: ['client_name', ['from_date', 'to_date'], ['client_type', 'client_status']],
  },
};

const formatDatePreview = (value, language) => {
  if (!value) return '';
  const parsedDate = new Date(`${value}T00:00:00`);
  if (Number.isNaN(parsedDate.getTime())) return '';
  return new Intl.DateTimeFormat(language === 'ar' ? 'ar-EG' : 'en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(parsedDate);
};

const FieldWrapper = ({ label, isRTL, children }) => (
  <label className="space-y-1.5">
    <span className={`block text-sm font-medium text-foreground ${isRTL ? 'text-right' : 'text-left'}`}>{label}</span>
    {children}
  </label>
);

const ReportFilters = ({ tabKey, schema, values, options, onSubmit, onReset }) => {
  const { language, isRTL } = useLanguage();
  const [draft, setDraft] = useState(values);

  useEffect(() => {
    setDraft(values);
  }, [values]);

  const fieldMap = useMemo(() => schema.reduce((acc, field) => ({ ...acc, [field.name]: field }), {}), [schema]);

  const handleFieldChange = (name, value) => {
    setDraft((prev) => ({ ...prev, [name]: value }));
  };

  const renderInput = (fieldName) => {
    const field = fieldMap[fieldName];
    if (!field) return null;

    if (field.type === 'select') {
      return (
        <FieldWrapper key={field.name} label={field.label} isRTL={isRTL}>
          <select
            value={draft[field.name] || ''}
            onChange={(event) => handleFieldChange(field.name, event.target.value)}
            className={`${inputClass} ${isRTL ? 'text-right' : 'text-left'}`}
          >
            <option value="">{language === 'ar' ? 'الكل' : 'All'}</option>
            {(options[field.name] || []).map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </FieldWrapper>
      );
    }

    if (field.type === 'date') {
      const preview = formatDatePreview(draft[field.name], language);
      return (
        <FieldWrapper key={field.name} label={field.label} isRTL={isRTL}>
          <input
            type="date"
            value={draft[field.name] || ''}
            onChange={(event) => handleFieldChange(field.name, event.target.value)}
            className={`${inputClass} ${isRTL ? 'text-right' : 'text-left'}`}
          />
          <p className={`text-xs text-muted-foreground ${isRTL ? 'text-right' : 'text-left'}`}>
            {preview ? `${language === 'ar' ? 'التاريخ' : 'Date'}: ${preview}` : ' '}
          </p>
        </FieldWrapper>
      );
    }

    return (
      <FieldWrapper key={field.name} label={field.label} isRTL={isRTL}>
        <input
          value={draft[field.name] || ''}
          onChange={(event) => handleFieldChange(field.name, event.target.value)}
          className={`${inputClass} ${isRTL ? 'text-right' : 'text-left'}`}
        />
      </FieldWrapper>
    );
  };

  const layoutRows = FILTER_LAYOUT[tabKey]?.rows || [];

  return (
    <form
      className="space-y-4 rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface))] p-4 md:p-5"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(draft);
      }}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className={`flex items-center justify-between border-b border-[hsl(var(--color-border))] pb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <h3 className="text-sm font-semibold text-foreground">{language === 'ar' ? 'تصفية التقارير' : 'Report filters'}</h3>
      </div>

      <div className="space-y-3 md:space-y-4">
        {layoutRows.map((row, index) => {
          if (Array.isArray(row) && row[0] === 'from_date' && row[1] === 'to_date') {
            return (
              <div key={`row-${index}`} className="space-y-2 rounded-xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface))] p-3">
                <p className={`text-sm font-medium text-foreground ${isRTL ? 'text-right' : 'text-left'}`}>{language === 'ar' ? 'الفترة' : 'Date range'}</p>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">{row.map((name) => renderInput(name))}</div>
              </div>
            );
          }

          const fields = Array.isArray(row) ? row : [row];
          const colClass = fields.length > 1 ? 'grid grid-cols-1 gap-3 md:grid-cols-2' : 'grid grid-cols-1 gap-3';
          return (
            <div key={`row-${index}`} className={colClass}>
              {fields.map((name) => renderInput(name))}
            </div>
          );
        })}
      </div>

      <div className={`flex flex-wrap gap-2 ${isRTL ? 'justify-start' : 'justify-end'}`}>
        <button type="submit" className="rounded-xl bg-[hsl(var(--color-primary))] px-4 py-2 text-sm font-semibold text-[hsl(var(--color-primary-foreground))]">
          {language === 'ar' ? 'بحث' : 'Search'}
        </button>
        <button
          type="button"
          onClick={() => {
            const clean = onReset();
            setDraft(clean);
          }}
          className="rounded-xl border border-[hsl(var(--color-border))] px-4 py-2 text-sm font-semibold text-foreground"
        >
          {language === 'ar' ? 'إعادة تعيين' : 'Reset'}
        </button>
      </div>
    </form>
  );
};

export default ReportFilters;
