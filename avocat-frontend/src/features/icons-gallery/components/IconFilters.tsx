import React from "react";

type IconFiltersProps = {
  search: string;
  onSearch: (value: string) => void;
  categories: { value: string; label: string }[];
  selectedCategory: string;
  onCategory: (value: string) => void;
  size: number;
  onSize: (value: number) => void;
  searchPlaceholder: string;
  categoryLabel: string;
  sizeLabel: string;
  allLabel: string;
};

const IconFilters = ({
  search,
  onSearch,
  categories,
  selectedCategory,
  onCategory,
  size,
  onSize,
  searchPlaceholder,
  categoryLabel,
  sizeLabel,
  allLabel,
}: IconFiltersProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card/70 p-4 shadow-sm">
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-muted-foreground">{searchPlaceholder}</label>
        <input
          value={search}
          onChange={(event) => onSearch(event.target.value)}
          placeholder={searchPlaceholder}
          className="rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:border-primary"
        />
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-muted-foreground">{categoryLabel}</label>
          <select
            value={selectedCategory}
            onChange={(event) => onCategory(event.target.value)}
            className="rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground"
          >
            <option value="all">{allLabel}</option>
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-muted-foreground">{sizeLabel}</label>
          <select
            value={size}
            onChange={(event) => onSize(Number(event.target.value))}
            className="rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground"
          >
            {[16, 20, 24, 28, 32, 48].map((option) => (
              <option key={option} value={option}>
                {option}px
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default IconFilters;
