import React from "react";
import { LexicraftIcon } from "@shared/icons/lexicraft";
import type { LexicraftIconMeta, LexicraftIconName } from "@shared/icons/lexicraft/manifest";

type IconCardProps = {
  icon: LexicraftIconMeta & { name: LexicraftIconName };
  size: number;
  dir: "ltr" | "rtl";
  onCopy: (name: string) => void;
  isCopied: boolean;
  label: string;
  copyLabel: string;
  copiedLabel: string;
  categoryLabel: string;
};

const IconCard: React.FC<IconCardProps> = ({
  icon,
  size,
  dir,
  onCopy,
  isCopied,
  label,
  copyLabel,
  copiedLabel,
  categoryLabel,
}) => {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card/70 p-4 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-foreground">
        <LexicraftIcon
          name={icon.name}
          size={size}
          dir={dir}
          isDirectional={icon.isDirectional}
          ariaLabel={label}
        />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-semibold text-foreground">{icon.name}</p>
        <p className="text-xs text-muted-foreground">{categoryLabel}</p>
      </div>
      <div className="flex flex-wrap justify-center gap-1">
        {icon.tags.map((tag) => (
          <span key={tag} className="chip-soft">
            {tag}
          </span>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onCopy(icon.name)}
        className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-foreground transition hover:bg-muted"
      >
        {isCopied ? copiedLabel : copyLabel}
      </button>
    </div>
  );
};

export default IconCard;
