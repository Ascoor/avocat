import { LexicraftIcon } from '@shared/icons/lexicraft';

const ReportPageHeader = ({ icon = 'reports', title = 'التقارير' }) => (
  <header className="rounded-2xl border border-border/70 bg-[hsl(var(--card)/0.8)] px-6 py-5 text-center shadow-sm backdrop-blur">
    <div className="mx-auto flex w-fit items-center justify-center gap-3" dir="rtl">
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))]">
        <LexicraftIcon name={icon} size={20} />
      </span>
      <h1 className="text-2xl font-bold text-foreground">{title}</h1>
    </div>
  </header>
);

export default ReportPageHeader;
