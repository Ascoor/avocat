import { useState } from 'react';

const ClientAccounttIndex = () => {
  const [searchQuery, setSearchQuery] = useState('');

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
          placeholder="Search Invoices or Clients..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <button className="add-invoice-button" onClick={handleAddInvoiceClick}>
        Add Invoice
      </button>
    </div>
  );
};

export default ClientAccounttIndex;
