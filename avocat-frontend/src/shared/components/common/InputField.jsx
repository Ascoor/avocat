import React from 'react';

const sharedInputClassName =
  'mt-2 block w-full rounded-xl border border-transparent bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none';

const InputField = ({
  label,
  name,
  value,
  onChange,
  options = [],
  readOnly,
  placeholder,
  type = 'text',
  error,
  icon,
}) => {
  const describedBy = error ? `${name}-error` : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-semibold text-foreground/90">
        {label}
      </label>

      <div className="field-shell flex items-center gap-2 px-0">
        {icon ? <span className="ps-4 text-muted-foreground">{icon}</span> : null}

        {type === 'select' ? (
          <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            disabled={readOnly}
            aria-invalid={Boolean(error)}
            aria-describedby={describedBy}
            className={sharedInputClassName}
          >
            <option value="">{placeholder}</option>
            {options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={name}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            placeholder={placeholder}
            aria-invalid={Boolean(error)}
            aria-describedby={describedBy}
            className={sharedInputClassName}
          />
        )}
      </div>

      {error && (
        <span id={describedBy} className="mt-1 text-sm font-medium text-destructive">
          {error}
        </span>
      )}
    </div>
  );
};

export default InputField;
