import { useLanguage } from '@shared/contexts/LanguageContext';
import SectionHeader from '@shared/components/common/SectionHeader';
import TransactionForm from '@shared/components/Finance/TransactionForm';

const CreateTransactionPage = () => {
  const { t } = useLanguage();

  return (
    <section className="space-y-4 p-4 sm:p-6">
      <SectionHeader
        listName={t('finance.create.title')}
        subtitle={t('finance.create.subtitle')}
        showBack={false}
      />
      <TransactionForm />
    </section>
  );
};

export default CreateTransactionPage;
