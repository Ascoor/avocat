const FilterGroup = ({ title, children, divider = false, count, action }) => (
  <section className={divider ? 'border-t border-[hsl(var(--color-border))] pt-3' : ''}>
    {(title || action) ? (
      <div className="mb-2 flex items-center justify-between gap-2 border-b border-[hsl(var(--color-border))] pb-1">
        {title ? (
          <h3 className="text-xs font-semibold text-foreground">
            {title}
            {typeof count === 'number' ? <span className="ms-1 text-muted-foreground">({count})</span> : null}
          </h3>
        ) : <span />}
        {action}
      </div>
    ) : null}
    <div className="space-y-2">{children}</div>
  </section>
);

export default FilterGroup;
