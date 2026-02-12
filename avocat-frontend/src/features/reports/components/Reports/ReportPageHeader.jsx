import React from 'react';
import { LexicraftIcon } from '@shared/icons/lexicraft';
import { useLanguage } from '@shared/contexts/LanguageContext';

const ReportPageHeader = ({ title, subtitle, icon }) => {
  const { isRTL } = useLanguage();

  return (
    <header className="rounded-2xl border border-border/70 bg-[hsl(var(--card)/0.78)] p-5 shadow-sm backdrop-blur">
      <div className={`flex items-center justify-between gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))]">
            <LexicraftIcon name={icon} size={22} />
          </span>
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <h1 className="text-xl font-bold text-foreground">{title}</h1>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ReportPageHeader;
