import { useEffect, useState } from 'react';
import { useLanguage } from '@shared/contexts/LanguageContext';
import { useAlert } from '@shared/contexts/AlertContext';
import { getLedgerTransactions } from '@shared/services/api/finance';
import SectionHeader from '@shared/components/common/SectionHeader';
import FinanceFilters from '@shared/components/Finance/FinanceFilters';
import LedgerTable from '@shared/components/Finance/LedgerTable';

const initialFilters = {
  from_date: '',
  to_date: '',
  kind: '',
  case_id: '',
  service_id: '',
  category_id: '',
};

const FinanceLedgerPage = () => {
  const { t } = useLanguage();
  const { triggerAlert } = useAlert();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState(initialFilters);

  const loadLedger = async () => {
    setLoading(true);
    try {
      const list = await getLedgerTransactions(filters);
      setItems(Array.isArray(list) ? list : []);
    } catch {
      triggerAlert('error', t('finance.messages.loadLedgerError'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLedger();
  }, []);

  return (
    <section className="space-y-4 p-4 sm:p-6">
      <SectionHeader
        listName={t('finance.ledger.title')}
        subtitle={t('finance.ledger.subtitle')}
        showBack={false}
      />
      <FinanceFilters
        filters={filters}
        onChange={(key, value) => setFilters((prev) => ({ ...prev, [key]: value }))}
        onSearch={loadLedger}
        onReset={() => {
          setFilters(initialFilters);
          setTimeout(loadLedger, 0);
        }}
      />
      <LedgerTable items={items} loading={loading} />
    </section>
  );
};

export default FinanceLedgerPage;
