import { NavLink } from 'react-router-dom';
import { LexicraftIcon } from '@shared/icons/lexicraft';

const ReportsTabs = ({ tabs }) => (
  <nav className="flex flex-wrap justify-start gap-2" dir="rtl">
    {tabs.map((tab) => (
      <NavLink
        key={tab.key}
        to={tab.to}
        className={({ isActive }) =>
          `inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
            isActive
              ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.15)] text-[hsl(var(--primary))]'
              : 'border-border/70 bg-[hsl(var(--card)/0.65)] text-foreground'
          }`
        }
      >
        <LexicraftIcon name={tab.icon} size={16} />
        <span>{tab.label}</span>
      </NavLink>
    ))}
  </nav>
);

export default ReportsTabs;
