import { Input } from '@shared/ui/input';
import { Button } from '@shared/ui/button';
import { useLanguage } from '@shared/contexts/LanguageContext';

const FinanceFilters = ({ filters, onChange, onSearch, onReset }) => {
  const { t } = useLanguage();

  return (
    <div className="grid gap-3 rounded-xl border border-border/60 p-4 md:grid-cols-3 lg:grid-cols-6">
      <Input
        type="date"
        value={filters.from_date}
        onChange={(event) => onChange('from_date', event.target.value)}
      />
      <Input
        type="date"
        value={filters.to_date}
        onChange={(event) => onChange('to_date', event.target.value)}
      />
      <select
        className="h-11 rounded-lg border border-border bg-background px-3 text-sm"
        value={filters.kind}
        onChange={(event) => onChange('kind', event.target.value)}
      >
        <option value="">{t('finance.filters.kindAll')}</option>
        <option value="expense">{t('finance.terms.expense')}</option>
        <option value="revenue">{t('finance.terms.revenue')}</option>
        <option value="payment">{t('finance.terms.payment')}</option>
      </select>
      <Input
        placeholder={t('finance.filters.caseId')}
        value={filters.case_id}
        onChange={(event) => onChange('case_id', event.target.value)}
      />
      <Input
        placeholder={t('finance.filters.serviceId')}
        value={filters.service_id}
        onChange={(event) => onChange('service_id', event.target.value)}
      />
      <Input
        placeholder={t('finance.filters.categoryId')}
        value={filters.category_id}
        onChange={(event) => onChange('category_id', event.target.value)}
      />
      <div className="md:col-span-3 lg:col-span-6 flex gap-2">
        <Button onClick={onSearch}>{t('finance.actions.search')}</Button>
        <Button variant="outline" onClick={onReset}>{t('finance.actions.reset')}</Button>
      </div>
    </div>
  );
};

export default FinanceFilters;
