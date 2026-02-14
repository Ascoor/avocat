import { inputClass } from '@shared/components/filters/TextInput';

const SelectInput = ({
  value,
  onChange,
  options = [],
  loading = false,
  emptyOptionLabel,
}) => (
  <select
    value={value || ''}
    onChange={(event) => onChange?.(event.target.value)}
    className={inputClass}
    disabled={loading}
  >
    <option value="">{loading ? '...' : emptyOptionLabel}</option>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

export default SelectInput;
