import { inputClass } from '@shared/components/filters/TextInput';

const PLACEHOLDER_VALUE = '__placeholder__';

const SelectInput = ({
  value,
  onChange,
  options = [],
  loading = false,
  placeholder,
  emptyOptionLabel,
}) => (
  <select
    value={value === '' ? PLACEHOLDER_VALUE : (value || PLACEHOLDER_VALUE)}
    onChange={(event) => onChange?.(event.target.value === PLACEHOLDER_VALUE ? '' : event.target.value)}
    className={inputClass}
    disabled={loading}
  >
    <option value={PLACEHOLDER_VALUE} disabled>
      {loading ? '...' : placeholder}
    </option>
    <option value="">{emptyOptionLabel}</option>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

export default SelectInput;
