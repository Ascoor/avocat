import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppIcon } from '@shared/ui/icons';
import { useLanguage } from '@shared/contexts/LanguageContext';

const ReportsTabs = ({ tabs }) => {
  const { direction } = useLanguage();

  return (
    <nav
      dir={direction}
      className="flex min-w-0 flex-wrap justify-start gap-2 sm:flex-nowrap sm:overflow-x-auto sm:overflow-y-visible sm:py-0.5 sm:[scrollbar-width:thin]"
    >
      {tabs.map((tab) => (
        <NavLink
          key={tab.key}
          to={tab.to}
          className={({ isActive }) =>
            `inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
              isActive
                ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.15)] text-[hsl(var(--primary))] shadow-md shadow-[hsl(var(--primary)/0.1)]'
                : 'border-border/70 bg-[hsl(var(--card)/0.65)] text-foreground hover:shadow-sm'
            }`
          }
        >
          <AppIcon name={tab.icon} size={16} />
          <span className="whitespace-nowrap">{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default ReportsTabs;
