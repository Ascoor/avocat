import React from "react";

type CollectionTabsProps = {
  active: string;
  onChange: (value: string) => void;
  lexicraftLabel: string;
  collectionsLabel: string;
};

const CollectionTabs = ({ active, onChange, lexicraftLabel, collectionsLabel }: CollectionTabsProps) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-semibold text-muted-foreground">{collectionsLabel}</p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onChange("lexicraft")}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            active === "lexicraft"
              ? "bg-primary text-primary-foreground"
              : "border border-border text-foreground hover:bg-muted"
          }`}
        >
          {lexicraftLabel}
        </button>
      </div>
    </div>
  );
};

export default CollectionTabs;
