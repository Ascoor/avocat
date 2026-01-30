import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface KpiCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: {
    value: number;
    period: string;
  };
  className?: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  change, 
  className 
}) => {
  const isPositive = change && change.value >= 0;

  return (
    <motion.div
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2, ease: 'easeOut' }
      }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className={cn(
        'relative overflow-hidden transition-all duration-300',
        'hover:shadow-glow',
        'border-border/50 bg-card/60 backdrop-blur',
        className
      )}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15">
            <Icon className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground mb-1">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </div>
          {change && (
            <p className="text-xs text-muted-foreground">
              <span className={cn('font-medium', isPositive ? 'text-success' : 'text-destructive')}>
                {isPositive ? '+' : ''}{change.value}%
              </span>
              {' '}
              {change.period}
            </p>
          )}
        </CardContent>

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      </Card>
    </motion.div>
  );
};

export default KpiCard;