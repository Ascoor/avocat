import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import ReportPageHeader from '@features/reports/components/Reports/ReportPageHeader';
import ReportsTabs from '@features/reports/components/Tabs/ReportsTabs';
import { REPORT_TABS } from '@features/reports/hooks/useReportsQuery';

const ReportsIndex = () => {
  const location = useLocation();

  if (location.pathname === '/dashboard/reports') {
    return <Navigate to="/dashboard/reports/cases" replace />;
  }

  return (
    <section className="space-y-4" dir="rtl">
      <ReportPageHeader icon="reports" title="التقارير" />
      <ReportsTabs tabs={REPORT_TABS} />

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default ReportsIndex;
