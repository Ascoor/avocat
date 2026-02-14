import ReportFilters from '@features/reports/components/Filters/ReportFilters';
import ReportResults from '@features/reports/components/Results/ReportResults';
import { useReportsQuery } from '@features/reports/hooks/useReportsQuery';

const ReportTabPage = ({ tabKey }) => {
  const { schema, queryState, options, rows, meta, loading, error, hasSearched, submitFilters, resetFilters, changePage, retry } = useReportsQuery(tabKey);

  return (
    <div className="space-y-4">
      <ReportFilters schema={schema} values={queryState} options={options} onSubmit={submitFilters} onReset={resetFilters} />
      <ReportResults tabKey={tabKey} rows={rows} meta={meta} loading={loading} error={error} hasSearched={hasSearched} onRetry={retry} onPageChange={changePage} />
    </div>
  );
};

export default ReportTabPage;
