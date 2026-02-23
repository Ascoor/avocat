import { Card, CardContent } from '@shared/ui/card';
import { useLanguage } from '@shared/contexts/LanguageContext';

const FinanceSummaryCards = ({ summary }) => {
  const { t } = useLanguage();
  const cards = [
    { key: 'expenses_total', label: t('finance.summary.expenses') },
    { key: 'revenues_total', label: t('finance.summary.revenues') },
    { key: 'paid_total', label: t('finance.summary.paid') },
    { key: 'outstanding_total', label: t('finance.summary.outstanding') },
  ];

  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.key}>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">{card.label}</p>
            <p className="mt-1 text-2xl font-bold">{summary?.[card.key] ?? 0}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FinanceSummaryCards;
