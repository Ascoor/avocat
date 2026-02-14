import { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '@shared/contexts/LanguageContext';

const inputClass =
  'h-11 w-full rounded-xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface))] px-3 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-[hsl(var(--color-primary)/0.3)]';

const SORT_BY_OPTIONS = [
  { value: 'created_at', label: 'تاريخ الإنشاء' },
  { value: 'file_no', label: 'رقم الملف' },
  { value: 'status', label: 'الحالة' },
];

const FieldWrapper = ({ label, isRTL, children }) => (
  <label className="space-y-1.5">
    <span className={`block text-sm font-medium text-foreground ${isRTL ? 'text-right' : 'text-left'}`}>{label}</span>
    {children}
  </label>
);

const ReportFilters = ({ schema, values, options, onSubmit, onReset }) => {
  const { language, isRTL } = useLanguage();
  const [draft, setDraft] = useState(values);

  useEffect(() => setDraft(values), [values]);

  const fieldMap = useMemo(() => schema.reduce((acc, field) => ({ ...acc, [field.name]: field }), {}), [schema]);

  const renderInput = (name) => {
    const field = fieldMap[name];
    if (!field) return null;

    if (field.type === 'select') {
      return (
        <FieldWrapper key={name} label={field.label} isRTL={isRTL}>
          <select value={draft.filters[name] || ''} onChange={(e) => setDraft((prev) => ({ ...prev, filters: { ...prev.filters, [name]: e.target.value } }))} className={inputClass}>
            <option value="">{language === 'ar' ? 'الكل' : 'All'}</option>
            {(options[name] || []).map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </FieldWrapper>
      );
    }

    return (
      <FieldWrapper key={name} label={field.label} isRTL={isRTL}>
        <input
          type={field.type === 'date' ? 'date' : 'text'}
          value={draft.filters[name] || ''}
          onChange={(e) => setDraft((prev) => ({ ...prev, filters: { ...prev.filters, [name]: e.target.value } }))}
          className={inputClass}
        />
      </FieldWrapper>
    );
  };

  return (
    <form
      className="space-y-4 rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface))] p-4 md:p-5"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(draft);
      }}
    >
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">{schema.map((field) => renderInput(field.name))}</div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <FieldWrapper label={language === 'ar' ? 'بحث عام' : 'Search'} isRTL={isRTL}>
          <input value={draft.q || ''} onChange={(e) => setDraft((prev) => ({ ...prev, q: e.target.value }))} className={inputClass} />
        </FieldWrapper>
        <FieldWrapper label={language === 'ar' ? 'ترتيب حسب' : 'Sort by'} isRTL={isRTL}>
          <select value={draft.sort.sort_by} onChange={(e) => setDraft((prev) => ({ ...prev, sort: { ...prev.sort, sort_by: e.target.value } }))} className={inputClass}>
            {SORT_BY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </FieldWrapper>
        <FieldWrapper label={language === 'ar' ? 'الاتجاه' : 'Direction'} isRTL={isRTL}>
          <select value={draft.sort.sort_dir} onChange={(e) => setDraft((prev) => ({ ...prev, sort: { ...prev.sort, sort_dir: e.target.value } }))} className={inputClass}>
            <option value="desc">{language === 'ar' ? 'تنازلي' : 'Desc'}</option>
            <option value="asc">{language === 'ar' ? 'تصاعدي' : 'Asc'}</option>
          </select>
        </FieldWrapper>
      </div>
      <div className="flex gap-2">
        <button type="submit" className="rounded-xl bg-[hsl(var(--color-primary))] px-4 py-2 text-sm font-semibold text-[hsl(var(--color-primary-foreground))]">{language === 'ar' ? 'بحث' : 'Search'}</button>
        <button type="button" onClick={() => setDraft(onReset())} className="rounded-xl border border-[hsl(var(--color-border))] px-4 py-2 text-sm font-semibold text-foreground">{language === 'ar' ? 'إعادة تعيين' : 'Reset'}</button>
      </div>
    </form>
  );
};

export default ReportFilters;
