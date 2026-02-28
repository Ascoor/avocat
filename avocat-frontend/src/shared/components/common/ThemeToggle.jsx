import React from "react";

import UnifiedThemeToggle from "@shared/ui/theme-toggle";

const sizeClassMap = {
  sm: "h-8 w-8",
  md: "h-9 w-9",
  lg: "h-10 w-10",
};

export default function ThemeToggle({ size = "md", className = "", tone }) {
  const iconSizeClass = sizeClassMap[size] ?? sizeClassMap.md;
  return <UnifiedThemeToggle tone={tone} className={`${iconSizeClass} ${className}`.trim()} />;
}
