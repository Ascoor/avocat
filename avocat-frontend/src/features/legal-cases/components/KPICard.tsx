import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  delay?: number;
}

const KPICard = ({ icon: Icon, label, value, delay = 0 }: KPICardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="kpi-card flex items-center gap-4"
  >
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/15">
      <Icon className="h-6 w-6 text-accent" />
    </div>
    <div className="min-w-0">
      <p className="text-sm text-muted-foreground truncate">{label}</p>
      <p className="text-xl font-bold text-foreground">{value}</p>
    </div>
  </motion.div>
);

export default KPICard;