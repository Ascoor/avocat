import React, { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Sidebar = () => {
  const { isRTL } = useLanguage();
  const [open, setOpen] = useState(false);

  const items = useMemo(
    () => [
      { to: "/dashboard", label: "الرئيسية" },
      { to: "/dashboard/cases", label: "القضايا" },
      { to: "/dashboard/clients", label: "العملاء" },
      { to: "/dashboard/courts", label: "المحاكم" },
      { to: "/dashboard/settings", label: "الإعدادات" },
    ],
    [],
  );

  const toggleSideClass = isRTL ? "right-4" : "left-4";
  const panelSideClass = isRTL ? "right-0" : "left-0";
  const borderSideClass = isRTL ? "border-l" : "border-r";
  const closedTranslateClass = isRTL
    ? "translate-x-full md:translate-x-0"
    : "-translate-x-full md:translate-x-0";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`md:hidden fixed bottom-4 ${toggleSideClass} z-50 rounded-2xl bg-primary px-4 py-3 text-white shadow-base transition active:scale-[0.99]`}
      >
        القائمة
      </button>

      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 z-40 bg-black/40 transition-opacity ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />

      <aside
        className={[
          "fixed md:sticky top-0 z-50 md:z-auto h-screen w-[280px] shrink-0",
          panelSideClass,
          borderSideClass,
          "border-sidebar-border bg-sidebar-bg text-sidebar-text",
          "transition-transform duration-300",
          open ? "translate-x-0" : closedTranslateClass,
        ].join(" ")}
      >
        <div className="flex h-full flex-col">
          <div className="border-b border-sidebar-border/80 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-extrabold">Avocat</div>
                <div className="text-sm text-sidebar-muted">Dashboard</div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="md:hidden rounded-xl border border-sidebar-border px-3 py-2 text-sidebar-text"
              >
                إغلاق
              </button>
            </div>
          </div>

          <nav className="space-y-1 overflow-auto p-3">
            {items.map((it) => (
              <NavLink
                key={it.to}
                to={it.to}
                end={it.to === "/dashboard"}
                className={({ isActive }) =>
                  [
                    "flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold",
                    "transition duration-200",
                    isActive
                      ? "bg-sidebar-active/20 text-sidebar-text ring-1 ring-sidebar-active/30"
                      : "text-sidebar-muted hover:bg-sidebar-active/10 hover:text-sidebar-text",
                  ].join(" ")
                }
                onClick={() => setOpen(false)}
              >
                <span className="h-2 w-2 rounded-full bg-sidebar-active shadow-soft" />
                {it.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto border-t border-sidebar-border/80 p-4 text-sm text-sidebar-muted">
            © Avocat
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
