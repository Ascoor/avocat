import { inputClass } from '@shared/components/filters/TextInput';
import { normalizeISODate } from '@shared/utils/dateFilters';

const DateInput = ({ value, onChange, max, min, placeholder, dir = 'rtl' }) => (
  <input
    type="date"
    value={normalizeISODate(value)}
    max={max}
    min={min}
    placeholder={placeholder}
    aria-label={placeholder}
    title={placeholder}
    dir={dir}
    onChange={(event) => onChange?.(normalizeISODate(event.target.value))}
    className={inputClass}
  />
);

export default DateInput;
