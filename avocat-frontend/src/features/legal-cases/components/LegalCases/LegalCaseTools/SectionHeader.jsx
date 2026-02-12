import { LexicraftIcon } from '@shared/icons/lexicraft';
import { useLanguage } from '@shared/contexts/LanguageContext';

export default function SectionHeader({
  title,
  subtitle,
  icon,
  addLabel,
  onAdd,
}) {
  const { isRTL } = useLanguage();

  return (
    <header
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-muted/40 p-4 ${
        isRTL ? 'flex-row-reverse text-right' : 'text-left'
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <LexicraftIcon name={icon} size={18} />
        </span>
        <div>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>

      {onAdd && addLabel ? (
        <button
          type="button"
          onClick={onAdd}
          className="pressable inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          <LexicraftIcon name={icon} size={16} />
          {addLabel}
        </button>
      ) : null}
    </header>
  );
}
