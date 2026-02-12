import { motion } from 'framer-motion';
import { LexicraftIcon } from '@shared/icons/lexicraft';
import { useLanguage } from '@shared/contexts/LanguageContext';

const ReportPageHeader = ({ title, subtitle, icon, actions }) => {
  const { isRTL } = useLanguage();

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="rounded-2xl border border-border/70 bg-[hsl(var(--card)/0.78)] p-5 shadow-sm backdrop-blur"
    >
      <div className={`flex items-center justify-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className={`flex items-center gap-3 flex-row-center' : ''}`}>
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))]">
            <LexicraftIcon name={icon} size={22} />
          </span>
          <div  >
            <h1 className="text-xl font-bold text-foreground">{title}</h1>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
        </div>
        {actions ? <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>{actions}</div> : null}
      </div>
    </motion.header>
  );
};

export default ReportPageHeader;
