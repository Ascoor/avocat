import ReportFilters from '@features/reports/components/Filters/ReportFilters';
import ReportResults from '@features/reports/components/Results/ReportResults';
import { useReportsQuery } from '@features/reports/hooks/useReportsQuery';

const ReportTabPage = ({ tabKey }) => {
  const { schema, filters, options, rows, loading, error, lastUpdatedAt, submitFilters, resetFilters, retry } = useReportsQuery(tabKey);

  return (
    <div className="space-y-4">
      <ReportFilters
        tabKey={tabKey}
        schema={schema}
        values={filters}
        options={options}
        onSubmit={submitFilters}
        onReset={resetFilters}
        isLoading={loading}
      />
      <ReportResults tabKey={tabKey} rows={rows} loading={loading} error={error} onRetry={retry} lastUpdatedAt={lastUpdatedAt} />
    </div>
  );
};

export default ReportTabPage;
