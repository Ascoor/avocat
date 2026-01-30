import type { ReactNode } from "react";

import LegalIcon from "./LegalIcon";
import { getIconDesign, type IconKey } from "@/config/iconography";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  icon?: ReactNode;
  iconKey?: IconKey;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

const PageHeader = ({ icon, iconKey, title, subtitle, actions }: PageHeaderProps) => {
  const design = getIconDesign(iconKey);
  const resolvedIcon = icon ?? (iconKey ? <LegalIcon iconKey={iconKey} width={28} height={28} /> : null);
  const badgeStyle = {
    background: design.badgeGradient,
    boxShadow: design.shadow,
  } as const;

  return (
    <div className="rounded-2xl border border-border/60 bg-gradient-to-r from-primary/8 via-background/80 to-background/90 p-4 shadow-card backdrop-blur-sm transition-colors sm:p-6 dark:from-primary/15 dark:via-background/70">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          {resolvedIcon ? (
            <span
              className={cn(
                "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl transition-all",
                design.badgeClass ?? "text-white",
              )}
              style={badgeStyle}
            >
              {resolvedIcon}
            </span>
          ) : null}
          <div className="min-w-0">
            <h1 className="truncate text-2xl font-bold text-foreground">{title}</h1>
            {subtitle ? <p className="text-sm text-muted-foreground">{subtitle}</p> : null}
          </div>
        </div>
        {actions ? <div className="flex flex-wrap gap-2 sm:flex-nowrap sm:gap-3">{actions}</div> : null}
      </div>
    </div>
  );
};

export default PageHeader;
