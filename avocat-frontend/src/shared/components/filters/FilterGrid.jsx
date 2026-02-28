const baseClassMap = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
};

const mdClassMap = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
};

const lgClassMap = {
  1: 'lg:grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
};

const FilterGrid = ({ columns = { base: 1, md: 2, lg: 3 }, children }) => {
  const base = baseClassMap[columns.base || 1] || baseClassMap[1];
  const md = mdClassMap[columns.md || 2] || mdClassMap[2];
  const lg = lgClassMap[columns.lg || 3] || lgClassMap[3];

  return <div className={`grid gap-3 ${base} ${md} ${lg}`}>{children}</div>;
};

export default FilterGrid;
