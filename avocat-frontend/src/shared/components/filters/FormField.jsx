const FormField = ({ label, hint, error, required = false, children }) => (
  <label className="space-y-1 text-right">
    {label ? (
      <span className="block text-xs font-medium text-foreground">
        {label}
        {required ? <span className="me-1 text-destructive">*</span> : null}
      </span>
    ) : null}
    {children}
    {hint ? <span className="block text-xs text-muted-foreground">{hint}</span> : null}
    {error ? <span className="block text-xs text-destructive">{error}</span> : null}
  </label>
);

export default FormField;
