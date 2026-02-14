const FilterShell = ({ title, subtitle, children, actions, dir = 'rtl' }) => (
  <section
    dir={dir}
    className="space-y-5 rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface))] p-4 shadow-sm md:p-5"
  >
    {(title || subtitle) && (
      <header className="space-y-1 text-right">
        {title ? <h2 className="text-base font-semibold text-foreground md:text-lg">{title}</h2> : null}
        {subtitle ? <p className="text-sm text-muted-foreground">{subtitle}</p> : null}
      </header>
    )}

    <div className="space-y-4">{children}</div>

    {actions ? <footer className="flex flex-wrap items-center justify-start gap-2 md:justify-end">{actions}</footer> : null}
  </section>
);

export default FilterShell;
