import { useState } from 'react';
import { useLanguage } from '@shared/contexts/LanguageContext';
import { useAlert } from '@shared/contexts/AlertContext';
import { Input } from '@shared/ui/input';
import { Button } from '@shared/ui/button';
import { createFinanceTransaction } from '@shared/services/api/finance';

const initialState = {
  kind: 'expense',
  amount: '',
  transaction_date: '',
  case_id: '',
  service_id: '',
  legal_session_id: '',
  legal_ad_id: '',
  procedure_id: '',
  category_id: '',
  note: '',
};

const TransactionForm = () => {
  const { t } = useLanguage();
  const { triggerAlert } = useAlert();
  const [formState, setFormState] = useState(initialState);
  const [saving, setSaving] = useState(false);

  const onChange = (key, value) => setFormState((prev) => ({ ...prev, [key]: value }));

  const onSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      await createFinanceTransaction(formState);
      triggerAlert('success', t('finance.messages.created'));
      setFormState(initialState);
    } catch {
      triggerAlert('error', t('finance.messages.createError'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="grid gap-3 rounded-xl border border-border/60 p-4 md:grid-cols-2" onSubmit={onSubmit}>
      <select
        className="h-11 rounded-lg border border-border bg-background px-3 text-sm"
        value={formState.kind}
        onChange={(event) => onChange('kind', event.target.value)}
      >
        <option value="expense">{t('finance.terms.expense')}</option>
        <option value="revenue">{t('finance.terms.revenue')}</option>
      </select>
      <Input
        type="number"
        placeholder={t('finance.form.amount')}
        value={formState.amount}
        onChange={(event) => onChange('amount', event.target.value)}
        required
      />
      <Input
        type="date"
        value={formState.transaction_date}
        onChange={(event) => onChange('transaction_date', event.target.value)}
        required
      />
      <Input placeholder={t('finance.form.categoryId')} value={formState.category_id} onChange={(event) => onChange('category_id', event.target.value)} />
      <Input placeholder={t('finance.form.caseId')} value={formState.case_id} onChange={(event) => onChange('case_id', event.target.value)} />
      <Input placeholder={t('finance.form.serviceId')} value={formState.service_id} onChange={(event) => onChange('service_id', event.target.value)} />
      <Input placeholder={t('finance.form.sessionId')} value={formState.legal_session_id} onChange={(event) => onChange('legal_session_id', event.target.value)} />
      <Input placeholder={t('finance.form.adId')} value={formState.legal_ad_id} onChange={(event) => onChange('legal_ad_id', event.target.value)} />
      <Input placeholder={t('finance.form.procedureId')} value={formState.procedure_id} onChange={(event) => onChange('procedure_id', event.target.value)} />
      <Input placeholder={t('finance.form.note')} value={formState.note} onChange={(event) => onChange('note', event.target.value)} />
      <div className="md:col-span-2">
        <Button disabled={saving} type="submit">
          {saving ? t('common.saving') : t('finance.actions.createTransaction')}
        </Button>
      </div>
    </form>
  );
};

export default TransactionForm;
