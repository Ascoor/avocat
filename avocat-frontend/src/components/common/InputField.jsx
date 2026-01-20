import React from 'react';

const InputField = ({
  label,
  name,
  value,
  onChange,
  options,
  readOnly,
  placeholder,
  type,
  error,
  icon,
}) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
        {label}
      </label>
      {type === 'select' ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          disabled={readOnly}
          className="mt-1 block w-full px-4 py-2 border rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-600"
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
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          placeholder={placeholder}
          className="mt-1 block w-full px-4 py-2 border rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-600"
          icon={icon}
        />
      )}
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
};

export default InputField;
