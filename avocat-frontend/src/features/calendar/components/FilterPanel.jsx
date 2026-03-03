const FilterPanel = ({
  locale,
  search,
  onSearchChange,
  categories,
  selectedCategories,
  onToggleCategory,
  onToggleLocale,
}) => {
  return (
    <div className="rounded-xl bg-white p-4 shadow-md dark:bg-gray-800">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {locale === 'ar' ? 'فلاتر التقويم' : 'Calendar Filters'}
        </h2>
        <button
          type="button"
          onClick={onToggleLocale}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500"
        >
          {locale === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
        </button>
      </div>

      <input
        type="text"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder={locale === 'ar' ? 'ابحث عن حدث قانوني...' : 'Search legal events...'}
        className="mb-4 w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
      />

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const active = selectedCategories.includes(category.key);
          return (
            <button
              key={category.key}
              type="button"
              onClick={() => onToggleCategory(category.key)}
              className={`rounded-full px-3 py-1 text-sm transition ${
                active
                  ? 'text-white'
                  : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200'
              }`}
              style={
                active
                  ? {
                      backgroundColor: category.color,
                    }
                  : undefined
              }
            >
              {category.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FilterPanel;
