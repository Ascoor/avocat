import React from 'react';
import { AppIcon, IconBadge } from '@shared/ui/icons';
import { useLanguage } from '@shared/contexts/LanguageContext';

const ReportPageHeader = ({ icon = 'report', title = 'التقارير' }) => {
  const { direction } = useLanguage();

  return (
    <header className="rounded-2xl border border-border/70 bg-[hsl(var(--card)/0.8)] px-6 py-5 text-center shadow-sm backdrop-blur">
      <div className="mx-auto flex w-fit items-center justify-center gap-3" dir={direction}>
        <IconBadge tone="primary" size="lg">
          <AppIcon name={icon} size={20} tone="primary" />
        </IconBadge>
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
      </div>
    </header>
  );
};

export default ReportPageHeader;
