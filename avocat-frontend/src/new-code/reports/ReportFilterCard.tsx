import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, RotateCcw, AlertTriangle } from 'lucide-react';
import { FilterField, ReportFilters, ReportLabels } from '@/types/reports';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReportFilterCardProps {
  filters: FilterField[];
  onSearch: (filters: ReportFilters) => void;
  onReset: () => void;
  isRtl: boolean;
  lang: 'en' | 'ar';
  labels: ReportLabels;
  isLoading?: boolean;
  resultCount?: number | null;
}

const ReportFilterCard = ({ filters, onSearch, onReset, isRtl, lang, labels, isLoading, resultCount }: ReportFilterCardProps) => {
  const [values, setValues] = useState<ReportFilters>({});
  const [showNoFilters, setShowNoFilters] = useState(false);

  const handleChange = (key: string, value: string) => {
    setValues(prev => ({ ...prev, [key]: value }));
    setShowNoFilters(false);
  };

  const handleDateChange = (key: string, date: Date | undefined) => {
    setValues(prev => ({ ...prev, [key]: date ? format(date, 'yyyy-MM-dd') : '' }));
    setShowNoFilters(false);
  };

  const handleSearch = () => {
    const hasValue = Object.values(values).some(v => v && v.trim() !== '');
    if (!hasValue) {
      setShowNoFilters(true);
      return;
    }
    setShowNoFilters(false);
    onSearch(values);
  };

  const handleReset = () => {
    setValues({});
    setShowNoFilters(false);
    onReset();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="rounded-xl border border-border bg-card/70 backdrop-blur-sm p-5 space-y-4"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filters.map(filter => (
          <div key={filter.key} className="space-y-1.5">
            <label className={`text-xs font-medium text-muted-foreground ${isRtl ? 'text-right block' : 'text-left block'}`}>
              {lang === 'ar' ? filter.labelAr : filter.label}
            </label>
            {filter.type === 'text' && (
              <Input
                value={values[filter.key] || ''}
                onChange={e => handleChange(filter.key, e.target.value)}
                placeholder={lang === 'ar' ? filter.placeholderAr : filter.placeholder}
                className="h-9 text-sm"
              />
            )}
            {filter.type === 'select' && (
              <Select value={values[filter.key] || ''} onValueChange={v => handleChange(filter.key, v)}>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder={lang === 'ar' ? filter.labelAr : filter.label} />
                </SelectTrigger>
                <SelectContent>
                  {filter.options?.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {lang === 'ar' ? opt.labelAr : opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            {filter.type === 'date-range' && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'h-9 w-full justify-start text-sm font-normal',
                      !values[filter.key] && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="h-3.5 w-3.5 opacity-50" />
                    {values[filter.key] || (lang === 'ar' ? filter.labelAr : filter.label)}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={values[filter.key] ? new Date(values[filter.key]) : undefined}
                    onSelect={date => handleDateChange(filter.key, date)}
                    initialFocus
                    className={cn('p-3 pointer-events-auto')}
                  />
                </PopoverContent>
              </Popover>
            )}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {showNoFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2"
          >
            <AlertTriangle className="h-4 w-4 shrink-0" />
            {labels.noFilters}
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`flex items-center gap-3 pt-1 ${isRtl ? 'flex-row-reverse' : ''}`}>
        <Button onClick={handleSearch} disabled={isLoading} className="gap-2" size="sm">
          <Search className="h-3.5 w-3.5" />
          {labels.search}
        </Button>
        <Button onClick={handleReset} variant="outline" size="sm" className="gap-2">
          <RotateCcw className="h-3.5 w-3.5" />
          {labels.reset}
        </Button>
        {resultCount !== null && resultCount !== undefined && (
          <span className="text-sm text-muted-foreground">
            {resultCount} {labels.resultsCount}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default ReportFilterCard;
