import { motion } from 'framer-motion';
import { FileText, Calendar, Users, Briefcase, Settings, LucideIcon } from 'lucide-react';

interface ReportPageHeaderProps {
  icon: string;
  title: string;
  subtitle: string;
  isRtl: boolean;
  actions?: React.ReactNode;
}

const iconMap: Record<string, LucideIcon> = {
  FileText, Calendar, Users, Briefcase, Settings,
};

const ReportPageHeader = ({ icon, title, subtitle, isRtl, actions }: ReportPageHeaderProps) => {
  const Icon = iconMap[icon] || FileText;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl border border-border bg-card/70 backdrop-blur-sm p-5"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className={`flex items-center justify-between gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
        <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/15">
            <Icon className="h-5 w-5 text-accent" />
          </div>
          <div className={isRtl ? 'text-right' : 'text-left'}>
            <h2 className="text-lg font-bold text-foreground">{title}</h2>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
        </div>
        {actions && <div className={`flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>{actions}</div>}
      </div>
    </motion.div>
  );
};

export default ReportPageHeader;
