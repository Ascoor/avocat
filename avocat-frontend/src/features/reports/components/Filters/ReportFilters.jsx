import { useEffect, useState } from 'react';

const inputClass =
  'w-full rounded-xl border border-border/70 bg-[hsl(var(--card)/0.85)] px-3 py-2.5 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-[hsl(var(--ring))]';

const formatDisplayDate = (value) => {
  if (!value) return '--/--/----';
  const [year, month, day] = value.split('-');
  if (!year || !month || !day) return '--/--/----';
  return `${day}/${month}/${year}`;
};

const TextInput = ({ field, value, onChange }) => (
  <label className="space-y-1.5" dir="rtl">
    <span className="block text-sm font-semibold text-foreground">{field.label}</span>
    <input
      value={value || ''}
      onChange={(event) => onChange(field.name, event.target.value)}
      className={`${inputClass} text-right`}
    />
  </label>
);

const SelectInput = ({ field, value, onChange, options }) => (
  <label className="space-y-1.5" dir="rtl">
    <span className="block text-sm font-semibold text-foreground">{field.label}</span>
    <select value={value || ''} onChange={(event) => onChange(field.name, event.target.value)} className={`${inputClass} text-right`}>
      <option value="">الكل</option>
      {(options || []).map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </label>
);

const DateInput = ({ field, value, onChange }) => (
  <label className="space-y-1.5" dir="rtl">
    <span className="block text-sm font-semibold text-foreground">{field.label}</span>
    <input type="date" value={value || ''} onChange={(event) => onChange(field.name, event.target.value)} className={`${inputClass} text-right`} />
    <p className="text-xs text-muted-foreground">{formatDisplayDate(value)}</p>
  </label>
);

const ReportFilters = ({ schema, values, options, onSubmit, onReset }) => {
  const [draft, setDraft] = useState(values);

  useEffect(() => {
    setDraft(values);
  }, [values]);

  const handleFieldChange = (name, value) => {
    setDraft((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      className="rounded-2xl border border-border/70 bg-[hsl(var(--card)/0.75)] p-4 shadow-sm"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(draft);
      }}
      dir="rtl"
    >
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {schema.map((field) => {
          if (field.type === 'select') {
            return <SelectInput key={field.name} field={field} value={draft[field.name]} onChange={handleFieldChange} options={options[field.name]} />;
          }
          if (field.type === 'date') {
            return <DateInput key={field.name} field={field} value={draft[field.name]} onChange={handleFieldChange} />;
          }
          return <TextInput key={field.name} field={field} value={draft[field.name]} onChange={handleFieldChange} />;
        })}
      </div>

      <div className="mt-4 flex flex-wrap justify-start gap-2">
        <button type="submit" className="rounded-xl bg-[hsl(var(--primary))] px-4 py-2 text-sm font-semibold text-[hsl(var(--primary-foreground))]">
          بحث
        </button>
        <button
          type="button"
          onClick={() => {
            const clean = onReset();
            setDraft(clean);
          }}
          className="rounded-xl border border-border/70 px-4 py-2 text-sm font-semibold text-foreground"
        >
          إعادة تعيين
        </button>
      </div>
    </form>
  );
};

export default ReportFilters;
