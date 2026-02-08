import React, { useMemo, useState } from "react";
import IconCard from "@features/icons-gallery/components/IconCard";
import IconFilters from "@features/icons-gallery/components/IconFilters";
import CollectionTabs from "@features/icons-gallery/components/CollectionTabs";
import { lexicraftManifest } from "@shared/icons/lexicraft/manifest";
import { useLanguage } from "@shared/contexts/LanguageContext";
import { useTheme } from "@shared/contexts/ThemeContext";

const IconsGalleryPage = () => {
  const { t, direction } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [size, setSize] = useState(24);
  const [collection, setCollection] = useState("lexicraft");
  const [copiedName, setCopiedName] = useState<string | null>(null);

  const categories = useMemo(() => {
    const unique = new Set(lexicraftManifest.map((icon) => icon.category));
    return Array.from(unique).map((value) => ({
      value,
      label: t(`iconsGallery.categories.${value}`, { fallback: value }),
    }));
  }, [t]);

  const filteredIcons = useMemo(() => {
    const query = search.trim().toLowerCase();
    return lexicraftManifest.filter((icon) => {
      const matchesCategory = category === "all" || icon.category === category;
      const matchesQuery =
        query.length === 0 ||
        icon.name.toLowerCase().includes(query) ||
        icon.tags.some((tag) => tag.toLowerCase().includes(query));
      return matchesCategory && matchesQuery;
    });
  }, [search, category]);

  const handleCopy = async (name: string) => {
    const snippet = `<LexicraftIcon name=\"${name}\" size={${size}} />`;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(snippet);
      }
      setCopiedName(name);
      window.setTimeout(() => setCopiedName((current) => (current === name ? null : current)), 1400);
    } catch {
      setCopiedName(name);
      window.setTimeout(() => setCopiedName((current) => (current === name ? null : current)), 1400);
    }
  };

  return (
    <div className="flex flex-col gap-8" dir={direction}>
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          {t("iconsGallery.label")}
        </p>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-foreground">{t("iconsGallery.title")}</h1>
            <p className="text-sm text-muted-foreground">{t("iconsGallery.subtitle")}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground">{t("iconsGallery.theme")}</span>
            <button
              type="button"
              onClick={() => setTheme("light")}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                theme === "light" ? "bg-primary text-primary-foreground" : "border border-border text-foreground"
              }`}
            >
              {t("iconsGallery.light")}
            </button>
            <button
              type="button"
              onClick={() => setTheme("dark")}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                theme === "dark" ? "bg-primary text-primary-foreground" : "border border-border text-foreground"
              }`}
            >
              {t("iconsGallery.dark")}
            </button>
          </div>
        </div>
      </header>

      <CollectionTabs
        active={collection}
        onChange={setCollection}
        lexicraftLabel={t("iconsGallery.lexicraft")}
        collectionsLabel={t("iconsGallery.collections")}
      />

      <IconFilters
        search={search}
        onSearch={setSearch}
        categories={categories}
        selectedCategory={category}
        onCategory={setCategory}
        size={size}
        onSize={setSize}
        searchPlaceholder={t("iconsGallery.searchPlaceholder")}
        categoryLabel={t("iconsGallery.category")}
        sizeLabel={t("iconsGallery.size")}
        allLabel={t("iconsGallery.all")}
      />

      {filteredIcons.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card/40 p-8 text-center text-sm text-muted-foreground">
          {t("iconsGallery.noResults")}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
          {filteredIcons.map((icon) => (
            <IconCard
              key={icon.name}
              icon={icon}
              size={size}
              dir={direction}
              onCopy={handleCopy}
              isCopied={copiedName === icon.name}
              label={t("iconsGallery.iconLabel", { values: { name: icon.name } })}
              copyLabel={t("iconsGallery.copy")}
              copiedLabel={t("iconsGallery.copied")}
              categoryLabel={t(`iconsGallery.categories.${icon.category}`, { fallback: icon.category })}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default IconsGalleryPage;
