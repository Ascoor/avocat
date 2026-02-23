import { useState } from 'react';
import { useLanguage } from '@shared/contexts/LanguageContext';
import { useAlert } from '@shared/contexts/AlertContext';
import { Button } from '@shared/ui/button';
import { Input } from '@shared/ui/input';
import SectionHeader from '@shared/components/common/SectionHeader';
import FinanceSummaryCards from '@shared/components/Finance/FinanceSummaryCards';
import LedgerTable from '@shared/components/Finance/LedgerTable';
import { getCaseFinanceSummary } from '@shared/services/api/finance';

const CaseFinanceSummaryPage = () => {
  const { t } = useLanguage();
  const { triggerAlert } = useAlert();
  const [caseId, setCaseId] = useState('');
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadSummary = async () => {
    if (!caseId) return;
    setLoading(true);
    try {
      const payload = await getCaseFinanceSummary(caseId);
      setSummary(payload);
    } catch {
      triggerAlert('error', t('finance.messages.loadSummaryError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-4 p-4 sm:p-6">
      <SectionHeader
        listName={t('finance.summary.title')}
        subtitle={t('finance.summary.subtitle')}
        showBack={false}
      />
      <div className="flex flex-wrap gap-2">
        <Input
          placeholder={t('finance.summary.caseIdPlaceholder')}
          value={caseId}
          onChange={(event) => setCaseId(event.target.value)}
          className="max-w-sm"
        />
        <Button onClick={loadSummary}>{t('finance.actions.search')}</Button>
      </div>

      <FinanceSummaryCards summary={summary} />
      <LedgerTable items={summary?.recent_transactions ?? []} loading={loading} />
    </section>
  );
};

export default CaseFinanceSummaryPage;
