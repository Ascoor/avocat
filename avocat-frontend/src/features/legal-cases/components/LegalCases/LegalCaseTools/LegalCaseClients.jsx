import { useState, useEffect } from 'react';
import {
  addLegalCaseClients,
  removeLegalCaseClient,
} from '@shared/services/api/legalCases';
import { getClients } from '@shared/services/api/clients';
import { useAlert } from '@shared/contexts/AlertContext';
import GlobalConfirmDeleteModal from '@shared/components/common/GlobalConfirmDeleteModal';
import { useLanguage } from '@shared/contexts/LanguageContext';
import { LexicraftIcon } from '@shared/icons/lexicraft';

const AddClientToCaseForm = ({
  legCaseId,
  clients,
  legcaseClients,
  fetchLegcaseClients,
}) => {
  const { triggerAlert } = useAlert();
  const { t } = useLanguage();
  const [legCaseNewClients, setLegCaseNewClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredClients, setFilteredClients] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (searchQuery && Array.isArray(clients)) {
      const results = clients
        .filter((client) =>
          client.name.toLowerCase().includes(searchQuery.toLowerCase()),
        )
        .slice(0, 5);
      setFilteredClients(results);
    } else {
      setFilteredClients([]);
    }
  }, [searchQuery, clients]);

  const handleAddNewClient = () => {
    setFormError('');
    setLegCaseNewClients((prevClients) => [
      ...prevClients,
      { client_id: '', name: '' },
    ]);
  };

  const handleRemoveNewClient = (index) => {
    setLegCaseNewClients((prevClients) =>
      prevClients.filter((_, i) => i !== index),
    );
  };

  const handleNewClientChange = (e, index) => {
    const updatedClients = [...legCaseNewClients];
    updatedClients[index].name = e.target.value;
    setLegCaseNewClients(updatedClients);
    setSearchQuery(e.target.value);
    setActiveIndex(index);
  };

  const handleSelectClient = (client, index) => {
    if (
      legcaseClients.some((existingClient) => existingClient.id === client.id)
    ) {
      triggerAlert('error', t('legalCaseDetails.clients.alerts.duplicate'));
      return;
    }
    const updatedClients = [...legCaseNewClients];
    updatedClients[index] = { client_id: client.id, name: client.name };
    setLegCaseNewClients(updatedClients);
    setSearchQuery('');
    setActiveIndex(null);
  };

  const handleAddLegCaseClients = async () => {
    const validClients = legCaseNewClients.filter((client) => client.client_id);

    if (validClients.length === 0) {
      const errorMessage = t('legalCaseDetails.clients.errors.missingClient');
      setFormError(errorMessage);
      triggerAlert('error', errorMessage);
      return;
    }

    try {
      await addLegalCaseClients(legCaseId, validClients);
      triggerAlert('success', t('legalCaseDetails.clients.alerts.addSuccess'));
      setLegCaseNewClients([]);
      fetchLegcaseClients();
    } catch (error) {
      triggerAlert('error', t('legalCaseDetails.clients.alerts.addError'));
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-muted/30 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h4 className="text-sm font-semibold text-foreground">
            {t('legalCaseDetails.clients.form.title')}
          </h4>
          <p className="text-xs text-muted-foreground">
            {t('legalCaseDetails.clients.form.subtitle')}
          </p>
        </div>
        <button
          onClick={handleAddNewClient}
          className="pressable inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
        >
          <LexicraftIcon name="user" size={16} />
          {t('legalCaseDetails.clients.form.addRow')}
        </button>
      </div>

      <div className="mt-4 space-y-4">
        {legCaseNewClients.map((client, index) => (
          <div key={index} className="rounded-2xl border border-border bg-card p-4">
            <label className="text-xs font-semibold text-muted-foreground">
              {t('legalCaseDetails.clients.form.clientLabel')} <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              value={client.name}
              onChange={(e) => handleNewClientChange(e, index)}
              placeholder={t('legalCaseDetails.clients.form.searchPlaceholder')}
              className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground"
            />
            {activeIndex === index && filteredClients.length > 0 && (
              <ul className="mt-2 max-h-40 overflow-auto rounded-xl border border-border bg-background text-sm">
                {filteredClients.map((filteredClient) => (
                  <li
                    key={filteredClient.id}
                    onClick={() => handleSelectClient(filteredClient, index)}
                    className="cursor-pointer px-3 py-2 hover:bg-muted"
                  >
                    {filteredClient.name}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-3 flex items-center justify-end">
              <button
                onClick={() => handleRemoveNewClient(index)}
                className="pressable inline-flex items-center gap-2 rounded-full border border-destructive/40 px-3 py-1 text-xs text-destructive"
              >
                <LexicraftIcon name="lock" size={14} />
                {t('legalCaseDetails.clients.form.removeRow')}
              </button>
            </div>
          </div>
        ))}
      </div>

      {formError && (
        <div className="mt-3 text-xs text-destructive">{formError}</div>
      )}

      {legCaseNewClients.length > 0 && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleAddLegCaseClients}
            className="pressable inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
          >
            <LexicraftIcon name="users" size={16} />
            {t('legalCaseDetails.clients.form.submit')}
          </button>
        </div>
      )}
    </div>
  );
};

export default function LegalCaseClients({
  legCaseId,
  fetchLegcaseClients,
  legcaseClients,
}) {
  const { triggerAlert } = useAlert();
  const { t } = useLanguage();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 5;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState({ id: null, name: '' });

  const openDeleteModal = (clientId, clientName) => {
    setClientToDelete({ id: clientId, name: clientName });
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setClientToDelete({ id: null, name: '' });
  };

  const handleDeleteClient = async () => {
    if (!clientToDelete.id) return;

    try {
      await removeLegalCaseClient(legCaseId, clientToDelete.id);
      triggerAlert('success', t('legalCaseDetails.clients.alerts.deleteSuccess'));
      fetchLegcaseClients();
    } catch (error) {
      triggerAlert('error', t('legalCaseDetails.clients.alerts.deleteError'));
    } finally {
      closeDeleteModal();
    }
  };

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const clientsResponse = await getClients();
      const fetchedClients = clientsResponse.data.clients;
      const safeClients = Array.isArray(fetchedClients) ? fetchedClients : [];
      setClients(safeClients);
    } catch (error) {
      setError(t('legalCaseDetails.clients.errors.fetch'));
      triggerAlert('error', t('legalCaseDetails.clients.errors.fetch'));
      setClients([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [legCaseId]);

  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = legcaseClients.slice(
    indexOfFirstClient,
    indexOfLastClient,
  );
  const totalPages = Math.ceil(legcaseClients.length / clientsPerPage) || 1;

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            {t('legalCaseDetails.clients.title')}
          </h3>
          <p className="text-sm text-muted-foreground">
            {t('legalCaseDetails.clients.subtitle')}
          </p>
        </div>
      </header>

      <AddClientToCaseForm
        legCaseId={legCaseId}
        clients={clients}
        legcaseClients={legcaseClients}
        fetchLegcaseClients={fetchLegcaseClients}
      />

      {error && (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-12 rounded-2xl skeleton-shimmer" />
          ))}
        </div>
      ) : legcaseClients.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <LexicraftIcon name="users" size={20} />
          </div>
          {t('legalCaseDetails.clients.empty')}
        </div>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 text-start">{t('legalCaseDetails.clients.table.slug')}</th>
                  <th className="px-4 py-3 text-start">{t('legalCaseDetails.clients.table.name')}</th>
                  <th className="px-4 py-3 text-start">{t('legalCaseDetails.clients.table.phone')}</th>
                  <th className="px-4 py-3 text-center">{t('legalCaseDetails.table.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {currentClients.map((client) => (
                  <tr key={client.id} className="border-t border-border hover:bg-muted/40">
                    <td className="px-4 py-3 font-semibold">{client.slug}</td>
                    <td className="px-4 py-3">{client.name}</td>
                    <td className="px-4 py-3">
                      {client.phone_number || t('legalCaseDetails.clients.notAvailable')}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => openDeleteModal(client.id, client.name)}
                        className="pressable inline-flex items-center justify-center rounded-full border border-destructive/40 px-3 py-1 text-xs text-destructive"
                      >
                        <LexicraftIcon name="shield" size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 md:hidden">
            {currentClients.map((client) => (
              <div key={client.id} className="rounded-2xl border border-border p-4">
                <div className="text-sm font-semibold text-foreground">{client.name}</div>
                <div className="text-xs text-muted-foreground">
                  {client.slug} · {client.phone_number || t('legalCaseDetails.clients.notAvailable')}
                </div>
                <div className="mt-3">
                  <button
                    onClick={() => openDeleteModal(client.id, client.name)}
                    className="pressable inline-flex items-center gap-2 rounded-full border border-destructive/40 px-3 py-1 text-xs text-destructive"
                  >
                    <LexicraftIcon name="shield" size={14} />
                    {t('legalCaseDetails.actions.delete')}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="pressable rounded-full border border-border px-4 py-2 text-sm disabled:opacity-50"
              >
                {t('legalCaseDetails.pagination.prev')}
              </button>
              <span className="text-sm text-muted-foreground">
                {t('legalCaseDetails.pagination.page', { current: currentPage, total: totalPages })}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="pressable rounded-full border border-border px-4 py-2 text-sm disabled:opacity-50"
              >
                {t('legalCaseDetails.pagination.next')}
              </button>
            </div>
          )}
        </>
      )}

      <GlobalConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteClient}
        itemName={clientToDelete.name}
      />
    </div>
  );
}
