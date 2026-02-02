import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

const SectionTabs = ({ tabs, value, onChange, className }) => {
  const { isRTL } = useLanguage();

  return (
    <div
      className={cn(
        "w-full overflow-x-auto rounded-2xl border border-border/70 bg-[hsl(var(--card)/0.65)] p-1 shadow-sm backdrop-blur",
        className,
      )}
    >
      <div className={cn("flex gap-1 whitespace-nowrap", isRTL && "flex-row-reverse")}>
        {tabs.map((tab) => {
          const active = value === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onChange(tab.key)}
              className={cn(
                "relative inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition",
                active ? "text-[hsl(var(--primary))]" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {/* animated active pill */}
              {active && (
                <motion.span
                  layoutId="active-tab-pill"
                  className="absolute inset-0 rounded-xl bg-[hsl(var(--muted))]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              <span className="relative text-lg">{tab.icon}</span>
              <span className="relative">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SectionTabs;
