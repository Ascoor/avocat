const inputClass =
  'h-10 w-full rounded-lg border border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface))] px-3 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-[hsl(var(--color-primary)/0.3)]';

const TextInput = ({ placeholder, value, onChange }) => (
  <input
    type="text"
    value={value || ''}
    onChange={(event) => onChange?.(event.target.value)}
    placeholder={placeholder}
    className={inputClass}
  />
);

export { inputClass };
export default TextInput;
