import { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '@shared/contexts/LanguageContext';
import { useAlert } from '@shared/contexts/AlertContext';
import { createFinanceTransaction, getLedgerTransactions } from '@shared/services/api/finance';
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

const initialForm = {
  amount: '',
  kind: 'expense',
  case_id: '',
  category_id: '',
  note: '',
};

const FinanceLedgerPage = () => {
  const { t } = useLanguage();
  const { triggerAlert } = useAlert();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [filters, setFilters] = useState(initialFilters);
  const [form, setForm] = useState(initialForm);

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

  const metrics = useMemo(() => {
    const totals = items.reduce(
      (acc, item) => {
        const kind = item.kind || 'expense';
        const amount = Number(item.amount || item.total_amount || 0);
        if (kind === 'revenue') acc.revenue += amount;
        else if (kind === 'payment') acc.payment += amount;
        else acc.expense += amount;
        return acc;
      },
      { expense: 0, revenue: 0, payment: 0 },
    );

    return [
      { key: 'expense', label: t('finance.terms.expense'), value: totals.expense },
      { key: 'revenue', label: t('finance.terms.revenue'), value: totals.revenue },
      { key: 'payment', label: t('finance.terms.payment'), value: totals.payment },
      { key: 'count', label: t('finance.ledger.kpi.transactions'), value: items.length },
    ];
  }, [items, t]);

  const submitTransaction = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await createFinanceTransaction({
        amount: Number(form.amount),
        kind: form.kind,
        case_id: form.case_id || undefined,
        category_id: form.category_id || undefined,
        note: form.note || undefined,
      });
      setForm(initialForm);
      await loadLedger();
      triggerAlert('success', t('finance.messages.created'));
    } catch {
      triggerAlert('error', t('finance.messages.createError'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="space-y-4 p-4 sm:p-6">
      <SectionHeader
        listName={t('finance.ledger.title')}
        subtitle={t('finance.ledger.subtitle')}
        showBack={false}
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <article key={metric.key} className="rounded-xl border border-border/70 bg-card p-4 shadow-sm">
            <p className="text-xs text-muted-foreground">{metric.label}</p>
            <p className="mt-2 text-2xl font-bold">{Number(metric.value).toLocaleString()}</p>
          </article>
        ))}
      </div>

      <FinanceFilters
        filters={filters}
        onChange={(key, value) => setFilters((prev) => ({ ...prev, [key]: value }))}
        onSearch={loadLedger}
        onReset={() => {
          setFilters(initialFilters);
          setTimeout(loadLedger, 0);
        }}
      />

      <form onSubmit={submitTransaction} className="grid gap-3 rounded-xl border border-border/70 bg-card p-4 md:grid-cols-2 lg:grid-cols-5">
        <input
          className="h-11 rounded-md border bg-background px-3 text-sm"
          value={form.amount}
          onChange={(event) => setForm((prev) => ({ ...prev, amount: event.target.value }))}
          placeholder={t('finance.form.amount')}
          type="number"
          min="0"
          step="0.01"
          required
        />
        <select
          className="h-11 rounded-md border bg-background px-3 text-sm"
          value={form.kind}
          onChange={(event) => setForm((prev) => ({ ...prev, kind: event.target.value }))}
        >
          <option value="expense">{t('finance.terms.expense')}</option>
          <option value="revenue">{t('finance.terms.revenue')}</option>
          <option value="payment">{t('finance.terms.payment')}</option>
        </select>
        <input
          className="h-11 rounded-md border bg-background px-3 text-sm"
          value={form.case_id}
          onChange={(event) => setForm((prev) => ({ ...prev, case_id: event.target.value }))}
          placeholder={t('finance.form.caseId')}
        />
        <input
          className="h-11 rounded-md border bg-background px-3 text-sm"
          value={form.category_id}
          onChange={(event) => setForm((prev) => ({ ...prev, category_id: event.target.value }))}
          placeholder={t('finance.form.categoryId')}
        />
        <button
          type="submit"
          className="h-11 rounded-md bg-primary px-3 text-sm font-semibold text-primary-foreground disabled:opacity-70"
          disabled={submitting}
        >
          {t('finance.actions.createTransaction')}
        </button>
        <textarea
          className="rounded-md border bg-background p-3 text-sm md:col-span-2 lg:col-span-5"
          value={form.note}
          onChange={(event) => setForm((prev) => ({ ...prev, note: event.target.value }))}
          placeholder={t('finance.form.note')}
          rows={2}
        />
      </form>

      <LedgerTable items={items} loading={loading} />
    </section>
  );
};

export default FinanceLedgerPage;
