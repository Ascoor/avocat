import React from 'react';
import { NavLink, Navigate, Outlet, useLocation } from 'react-router-dom';
import { useLanguage } from '@shared/contexts/LanguageContext';
import { LexicraftIcon } from '@shared/icons/lexicraft';

const tabs = [
  { key: 'sessions', to: '/dashboard/reports/sessions', icon: 'calendar' },
  { key: 'procedures', to: '/dashboard/reports/procedures', icon: 'document' },
  { key: 'clients', to: '/dashboard/reports/clients', icon: 'client' },
  { key: 'cases', to: '/dashboard/reports/cases', icon: 'briefcase' },
  { key: 'services', to: '/dashboard/reports/services', icon: 'scales' },
];

const ReportsIndex = () => {
  const { t, isRTL } = useLanguage();
  const location = useLocation();

  if (location.pathname === '/dashboard/reports') {
    return <Navigate to="/dashboard/reports/sessions" replace />;
  }

  return (
    <div className="space-y-4" dir={isRTL ? 'rtl' : 'ltr'}>
      <header className="rounded-2xl border border-border/70 bg-[hsl(var(--card)/0.75)] p-5 shadow-sm backdrop-blur">
        <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))]">
            <LexicraftIcon name="briefcase" size={20} />
          </span>
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <h1 className="text-xl font-bold">{t('reports.title')}</h1>
            <p className="text-sm text-muted-foreground">{t('reports.subtitle')}</p>
          </div>
        </div>
      </header>

      <nav className={`flex flex-wrap gap-2 ${isRTL ? 'justify-end' : 'justify-start'}`}>
        {tabs.map((tab) => (
          <NavLink
            key={tab.key}
            to={tab.to}
            className={({ isActive }) =>
              `inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm font-semibold transition ${
                isActive
                  ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.12)] text-[hsl(var(--primary))]'
                  : 'border-border/70 bg-[hsl(var(--card)/0.6)] text-foreground'
              } ${isRTL ? 'flex-row-reverse' : ''}`
            }
          >
            <LexicraftIcon name={tab.icon} size={16} />
            {t(`reports.tabs.${tab.key}`)}
          </NavLink>
        ))}
      </nav>

      <Outlet />
    </div>
  );
};

export default ReportsIndex;
