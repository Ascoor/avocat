import { motion } from 'framer-motion';
import { Inbox, AlertCircle, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { ReportColumn, ReportLabels } from '@/types/reports';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import ReportStatusBadge from './ReportStatusBadge';
import { useState } from 'react';

interface ReportResultsProps {
  columns: ReportColumn[];
  data: any[] | null;
  isRtl: boolean;
  lang: 'en' | 'ar';
  labels: ReportLabels;
  isLoading: boolean;
  error: string | null;
  onRetry?: () => void;
}

const PAGE_SIZE = 10;

const ReportResults = ({ columns, data, isRtl, lang, labels, isLoading, error, onRetry }: ReportResultsProps) => {
  const [page, setPage] = useState(1);

  if (isLoading) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl border border-border bg-card/70 backdrop-blur-sm p-5 space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full rounded-lg" />
        ))}
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl border border-border bg-card/70 p-8 flex flex-col items-center text-center">
        <AlertCircle className="h-10 w-10 text-destructive mb-3" />
        <p className="text-muted-foreground mb-4">{labels.errorMessage}</p>
        {onRetry && (
          <Button onClick={onRetry} variant="outline" size="sm" className="gap-2">
            <RefreshCw className="h-3.5 w-3.5" /> {labels.retry}
          </Button>
        )}
      </motion.div>
    );
  }

  if (!data) return null;

  if (data.length === 0) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl border border-border bg-card/70 p-8 flex flex-col items-center text-center">
        <Inbox className="h-10 w-10 text-muted-foreground mb-3" />
        <p className="text-muted-foreground">{labels.noResults}</p>
      </motion.div>
    );
  }

  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  const paginatedData = data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const getCellValue = (row: any, col: ReportColumn) => {
    const val = row[col.key];
    if (col.render) return col.render(val, row, lang);
    if (col.key === 'status') return <ReportStatusBadge status={val} lang={lang} />;
    // Handle bilingual fields
    if (lang === 'ar') {
      const arKey = col.key + 'Ar';
      if (row[arKey]) return row[arKey];
    }
    return val;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="rounded-xl border border-border bg-card/70 backdrop-blur-sm overflow-hidden"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              {columns.map(col => (
                <th key={col.key} className="px-4 py-3 text-start font-semibold text-foreground whitespace-nowrap">
                  {lang === 'ar' ? col.labelAr : col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, i) => (
              <tr key={row.id || i} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                {columns.map(col => (
                  <td key={col.key} className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                    {getCellValue(row, col)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className={`flex items-center justify-between px-4 py-3 border-t border-border ${isRtl ? 'flex-row-reverse' : ''}`}>
          <span className="text-xs text-muted-foreground">
            {labels.showing} {(page - 1) * PAGE_SIZE + 1}-{Math.min(page * PAGE_SIZE, data.length)} {labels.of} {data.length}
          </span>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-7 w-7" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
              {isRtl ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
            </Button>
            <span className="text-xs text-muted-foreground px-2">{page}/{totalPages}</span>
            <Button variant="ghost" size="icon" className="h-7 w-7" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>
              {isRtl ? <ChevronLeft className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ReportResults;
