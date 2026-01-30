import React from "react";
import  Sidebar  from "./Sidebar";
import MobileDrawer from "./MobileDrawer";
import  Header  from "./Header";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSidebar } from "@/contexts/SidebarContext";
import { cn } from "@/lib/utils";
import { shellContainer, shellSectionSpacing } from "./layout-classes";

const COLLAPSED_WIDTH = 72;
const EXPANDED_WIDTH = 272;

const AppShell = ({
  children,
  title,
  className,
  layoutVariant = "default",
  showSidebarToggle = true,
}) => {
  const { direction } = useLanguage();
  const { isCollapsed } = useSidebar();

  const sidebarWidth = isCollapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH;
  const contentPadding = layoutVariant === "wide" ? "lg:px-12" : "lg:px-20";

  return (
    <div
      dir={direction}
      className={cn("min-h-screen bg-background text-foreground", className)}
    >
      {/* == Top bar (clone of old <Navbar />) == */}
      <Header title={title} showSidebarToggle={showSidebarToggle} />

      {/* == Main row: Sidebar + Content (clone of old <div className="flex">) == */}
      <div className="flex">
        {/* Sidebar column */}
        <div
          className={cn(
            "hidden md:block",
            "transition-[width] duration-300 ease-comfort"
          )}
          style={{ width: `${sidebarWidth}px` }}
        >
          <Sidebar />
        </div>

        {/* Content column */}
        <main
          className={cn(
            "flex-1 overflow-x-hidden",
            shellSectionSpacing,
            contentPadding
          )}
        >
          <div
            className={cn(
              "container mx-auto p-6",
              shellContainer,
              "flex flex-col gap-6"
            )}
          >
            {children}
          </div>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      <MobileDrawer />
    </div>
  );
};

export default AppShell;

const DashboardLayout = ({
  children,
  className,
  title,
}) => {
  return (
    <div className={cn("flex flex-col gap-8", className)}>
      
      {/* العنوان (اختياري) */}
      {title && (
        <h1 className="text-3xl font-bold text-foreground mb-4">
          {title}
        </h1>
      )}

      {/* المحتوى */}
      {children}
    </div>
  );
};

export { DashboardLayout };
