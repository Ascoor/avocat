import React from "react";
import { useTheme } from "@/contexts/ThemeContext";

const Topbar = () => {
  const { toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-surface/70 backdrop-blur supports-[backdrop-filter]:bg-surface/55">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-border shadow-soft">
            <span className="text-primary font-extrabold">A</span>
          </div>
          <div className="leading-tight">
            <div className="font-bold">Avocat</div>
            <div className="text-sm text-muted">لوحة التحكم</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-xl border border-border bg-card px-3 py-2 text-sm font-semibold shadow-soft transition hover:shadow-base"
          >
            تبديل الوضع
          </button>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
