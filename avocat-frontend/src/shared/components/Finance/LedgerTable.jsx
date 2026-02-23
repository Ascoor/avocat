import { useLanguage } from '@shared/contexts/LanguageContext';

const LedgerTable = ({ items = [], loading = false }) => {
  const { t, language, isRTL } = useLanguage();

  return (
    <div className="overflow-x-auto rounded-xl border border-border/60">
      <table className="w-full text-sm" dir={isRTL ? 'rtl' : 'ltr'}>
        <thead className="bg-muted/40">
          <tr>
            <th className="p-3 text-start">{t('finance.ledger.columns.date')}</th>
            <th className="p-3 text-start">{t('finance.ledger.columns.kind')}</th>
            <th className="p-3 text-start">{t('finance.ledger.columns.case')}</th>
            <th className="p-3 text-start">{t('finance.ledger.columns.category')}</th>
            <th className="p-3 text-start">{t('finance.ledger.columns.amount')}</th>
            <th className="p-3 text-start">{t('finance.ledger.columns.note')}</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan={6} className="p-4 text-center text-muted-foreground">{t('common.loading')}</td>
            </tr>
          )}
          {!loading && items.length === 0 && (
            <tr>
              <td colSpan={6} className="p-4 text-center text-muted-foreground">{t('finance.empty')}</td>
            </tr>
          )}
          {items.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="p-3">{item.transaction_date || item.expense_date || '-'}</td>
              <td className="p-3">{t(`finance.terms.${item.kind || 'expense'}`)}</td>
              <td className="p-3">{item.case_slug || item.leg_case?.slug || '-'}</td>
              <td className="p-3">
                {(language === 'ar' ? item.category_name_ar : item.category_name_en) ||
                  item.expense_category?.name ||
                  '-'}
              </td>
              <td className="p-3">{item.amount || item.total_amount || '-'}</td>
              <td className="p-3">{item.note || item.description || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LedgerTable;
