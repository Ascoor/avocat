import { useEffect, useMemo, useState } from 'react';

const inputClass =
  'h-11 w-full rounded-xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface))] px-3 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-[hsl(var(--color-primary)/0.3)]';

const FieldWrapper = ({ label, helper, children }) => (
  <label className="space-y-1.5 text-right">
    <span className="block text-sm font-medium text-foreground">{label}</span>
    {children}
    {helper ? <span className="block text-xs text-muted-foreground">{helper}</span> : null}
  </label>
);

const ReportFilters = ({ schema, values, options, onSubmit, onReset }) => {
  const [draft, setDraft] = useState(values);

  useEffect(() => setDraft(values), [values]);

  const fieldsByName = useMemo(() => schema.fields || {}, [schema.fields]);

  const renderField = (name) => {
    const field = fieldsByName[name];
    if (!field) return <div key={name} />;

    if (field.type === 'select') {
      return (
        <FieldWrapper key={name} label={field.label}>
          <select
            value={draft[name] || ''}
            onChange={(e) => setDraft((prev) => ({ ...prev, [name]: e.target.value }))}
            className={inputClass}
          >
            <option value="">الكل</option>
            {(options[name] || []).map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </FieldWrapper>
      );
    }

    return (
      <FieldWrapper key={name} label={field.label} helper={field.type === 'date' ? 'التنسيق: يوم/شهر/سنة' : ''}>
        <input
          type={field.type === 'date' ? 'date' : 'text'}
          value={draft[name] || ''}
          onChange={(e) => setDraft((prev) => ({ ...prev, [name]: e.target.value }))}
          className={inputClass}
        />
      </FieldWrapper>
    );
  };

  return (
    <form
      dir="rtl"
      className="space-y-5 rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface))] p-4 md:p-5"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(draft);
      }}
    >
      <div className="space-y-4">
        {(schema.groups || []).map((group, index) => (
          <section key={group.title} className={index > 0 ? 'border-t border-border/60 pt-4' : ''}>
            <h3 className="mb-3 text-xs font-semibold text-muted-foreground">{group.title}</h3>
            <div className="flex flex-wrap gap-2">
              {group.fields.map((fieldName) => (
                <span key={fieldName} className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
                  {fieldsByName[fieldName]?.label}
                </span>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {(schema.layout || []).flat().map((fieldName) => renderField(fieldName))}
      </div>

      <div className="flex items-center justify-start gap-2 md:justify-end">
        <button type="submit" className="rounded-xl bg-[hsl(var(--color-primary))] px-4 py-2 text-sm font-semibold text-[hsl(var(--color-primary-foreground))]">
          بحث
        </button>
        <button
          type="button"
          onClick={() => setDraft(onReset())}
          className="rounded-xl border border-[hsl(var(--color-border))] px-4 py-2 text-sm font-semibold text-foreground"
        >
          إعادة تعيين
        </button>
      </div>
    </form>
  );
};

export default ReportFilters;
