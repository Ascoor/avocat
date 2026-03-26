import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { REPORT_TABS } from '@features/reports/hooks/useReportsQuery';
import { fetchReportsOverview } from '@features/reports/services/reportsApi';
import { useLanguage } from '@shared/contexts/LanguageContext';

const getItemLabel = (tabKey, row) => {
  if (tabKey === 'cases') return row?.title || row?.slug || '-';
  if (tabKey === 'services') return row?.description || row?.slug || '-';
  if (tabKey === 'procedures') return row?.job || row?.procedure_type?.name || '-';
  if (tabKey === 'sessions') return row?.session_roll || row?.session_type?.name || '-';
  return row?.name || '-';
};

const ReportsOverview = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { direction } = useLanguage();

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError('');

    fetchReportsOverview()
      .then((result) => {
        if (mounted) setData(result);
      })
      .catch((err) => {
        if (mounted) setError(err?.message || 'تعذر تحميل ملخص التقارير');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return <div className="rounded-2xl border border-border/70 bg-[hsl(var(--card)/0.7)] p-4 text-sm">جاري تحميل الملخص...</div>;
  }

  if (error) {
    return <div className="rounded-2xl border border-destructive/40 bg-destructive/5 p-4 text-sm">{error}</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3" dir={direction}>
      {REPORT_TABS.map((tab) => {
        const rows = data?.[tab.key] || [];
        return (
          <article key={tab.key} className="rounded-2xl border border-border/70 bg-[hsl(var(--card)/0.72)] p-4">
            <header className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-bold">{tab.label}</h3>
              <Link to={tab.to} className="text-xs font-semibold text-primary hover:underline">
                عرض الكل
              </Link>
            </header>

            {rows.length ? (
              <ul className="space-y-2">
                {rows.map((row) => (
                  <li key={row.id} className="rounded-lg border border-border/60 px-3 py-2 text-xs">
                    <p className="font-semibold">{getItemLabel(tab.key, row)}</p>
                    <p className="text-muted-foreground">{row?.status || 'بدون حالة'}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-muted-foreground">لا توجد بيانات.</p>
            )}
          </article>
        );
      })}
    </div>
  );
};

export default ReportsOverview;
