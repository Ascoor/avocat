import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppIcon } from '@shared/ui/icons';

const ReportsTabs = ({ tabs }) => (
  <nav className="flex flex-wrap justify-start gap-2" dir="rtl">
    {tabs.map((tab) => (
      <NavLink
        key={tab.key}
        to={tab.to}
        className={({ isActive }) =>
          `inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 ${
            isActive
              ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.15)] text-[hsl(var(--primary))] shadow-md shadow-[hsl(var(--primary)/0.1)]'
              : 'border-border/70 bg-[hsl(var(--card)/0.65)] text-foreground hover:shadow-sm'
          }`
        }
      >
        <AppIcon name={tab.icon} size={16} />
        <span>{tab.label}</span>
      </NavLink>
    ))}
  </nav>
);

export default ReportsTabs;
