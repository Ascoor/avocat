const FilterGroup = ({ title, children, divider = false }) => (
  <section className={divider ? 'border-t border-[hsl(var(--color-border))] pt-4' : ''}>
    {title ? <h3 className="mb-3 text-sm font-semibold text-foreground">{title}</h3> : null}
    <div className="space-y-3">{children}</div>
  </section>
);

export default FilterGroup;
