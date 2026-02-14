const FilterShell = ({ title, subtitle, children, actions, dir = 'rtl' }) => (
  <section
    dir={dir}
    className="space-y-4 rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface))] p-3 shadow-sm md:p-4"
  >
    {(title || subtitle) && (
      <header className="space-y-0.5 text-right">
        {title ? <h2 className="text-sm font-semibold text-foreground">{title}</h2> : null}
        {subtitle ? <p className="text-xs text-muted-foreground">{subtitle}</p> : null}
      </header>
    )}

    <div className="space-y-3">{children}</div>

    {actions ? <footer className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-end">{actions}</footer> : null}
  </section>
);

export default FilterShell;
