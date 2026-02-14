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
  datePlaceholder,
  dir = 'rtl',
}) => {
  const validRange = isDateRangeValid(fromValue, toValue);
  const hasDateValues = Boolean(fromValue || toValue);

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <FormField label={fromLabel}>
          <DateInput
            value={fromValue}
            max={toValue || undefined}
            placeholder={datePlaceholder}
            dir={dir}
            onChange={(value) => onChange?.({ from_date: value, to_date: toValue || '' })}
          />
        </FormField>
        <FormField label={toLabel} error={validRange ? '' : invalidRangeText}>
          <DateInput
            value={toValue}
            min={fromValue || undefined}
            placeholder={datePlaceholder}
            dir={dir}
            onChange={(value) => onChange?.({ from_date: fromValue || '', to_date: value })}
          />
        </FormField>
      </div>
      {helperText ? <p className="text-xs text-muted-foreground">{helperText}</p> : null}
      {hasDateValues ? (
        <button
          type="button"
          onClick={() => onChange?.({ from_date: '', to_date: '' })}
          className="text-xs font-medium text-muted-foreground underline underline-offset-4"
        >
          {clearText}
        </button>
      ) : null}
    </div>
  );
};

export default DateRange;
