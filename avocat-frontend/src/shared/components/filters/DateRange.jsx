import DateInput from '@shared/components/filters/DateInput';
import FormField from '@shared/components/filters/FormField';
import { isDateRangeValid } from '@shared/utils/dateFilters';

const DateRange = ({
  fromLabel,
  toLabel,
  fromValue,
  toValue,
  onChange,
  helperText,
  invalidRangeText,
  clearText,
}) => {
  const validRange = isDateRangeValid(fromValue, toValue);

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <FormField label={fromLabel} hint={helperText}>
          <DateInput value={fromValue} max={toValue || undefined} onChange={(value) => onChange?.({ from_date: value, to_date: toValue || '' })} />
        </FormField>
        <FormField label={toLabel} hint={helperText} error={validRange ? '' : invalidRangeText}>
          <DateInput value={toValue} min={fromValue || undefined} onChange={(value) => onChange?.({ from_date: fromValue || '', to_date: value })} />
        </FormField>
      </div>
      <button
        type="button"
        onClick={() => onChange?.({ from_date: '', to_date: '' })}
        className="text-xs font-medium text-muted-foreground underline underline-offset-4"
      >
        {clearText}
      </button>
    </div>
  );
};

export default DateRange;
