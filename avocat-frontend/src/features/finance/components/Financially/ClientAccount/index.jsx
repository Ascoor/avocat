import { useState } from 'react';
import { useLanguage } from '@shared/contexts/LanguageContext';

const ClientAccounttIndex = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useLanguage();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  };

  const handleAddInvoiceClick = () => {};

  return (
    <div className="search-form-container">
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder={t('finance.searchPlaceholder')}
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button type="submit" className="search-button">
          {t('common.search')}
        </button>
      </form>
      <button className="add-invoice-button" onClick={handleAddInvoiceClick}>
        {t('finance.addInvoice')}
      </button>
    </div>
  );
};

export default ClientAccounttIndex;
