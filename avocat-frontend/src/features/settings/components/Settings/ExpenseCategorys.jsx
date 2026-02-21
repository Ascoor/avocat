import LookupManager from '../OfficeSettings/LookupManager';
import { useAuth } from '@shared/contexts/AuthContext';

const ExpenseCategorys = () => {
  const { user } = useAuth();
  const officeId = user?.officeId ?? user?.office_id;

  return (
    <LookupManager
      officeId={officeId}
      entity="expense_categories"
      titleKey="settings.lookups.entities.expenseCategories"
    />
  );
};

export default ExpenseCategorys;
