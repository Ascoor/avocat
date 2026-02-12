import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  addLegalCaseClients,
  removeLegalCaseClient,
} from '@shared/services/api/legalCases';
import { getClients } from '@shared/services/api/clients';
import { useAlert } from '@shared/contexts/AlertContext';
import GlobalConfirmDeleteModal from '@shared/components/common/GlobalConfirmDeleteModal';
import { useLanguage } from '@shared/contexts/LanguageContext';
import { LexicraftIcon } from '@shared/icons/lexicraft';

// ✅ TableComponent
import TableComponent from '@shared/components/common/TableComponent';

const AddClientToCaseForm = ({
  legCaseId,
  clients,
  legcaseClients,
  fetchLegcaseClients,
}) => {
  // ... نفس كودك بدون تغيير
};

export default function LegalCaseClients({
  legCaseId,
  fetchLegcaseClients,
  legcaseClients = [],
}) {
  const { triggerAlert } = useAlert();
  const { t, isRTL } = useLanguage();

  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState({ id: null, name: '' });

  const openDeleteModal = useCallback((clientId, clientName) => {
    setClientToDelete({ id: clientId, name: clientName });
    setIsDeleteModalOpen(true);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false);
    setClientToDelete({ id: null, name: '' });
  }, []);

  const addNewClient = () => {
    setFormError('');
    setLegCaseNewClients((prevClients) => [
      ...prevClients,
      { client_id: '', name: '' },
    ]);
  };
  const handleDeleteClient = useCallback(async () => {
    if (!clientToDelete.id) return;

    try {
      await removeLegalCaseClient(legCaseId, clientToDelete.id);
      triggerAlert('success', t('legalCaseDetails.clients.alerts.deleteSuccess'));
      fetchLegcaseClients?.();
    } catch (e) {
      triggerAlert('error', t('legalCaseDetails.clients.alerts.deleteError'));
    } finally {
      closeDeleteModal();
    }
  }, [clientToDelete.id, closeDeleteModal, fetchLegcaseClients, legCaseId, t, triggerAlert]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const clientsResponse = await getClients();
      const fetchedClients = clientsResponse?.data?.clients;
      setClients(Array.isArray(fetchedClients) ? fetchedClients : []);
    } catch (e) {
      const msg = t('legalCaseDetails.clients.errors.fetch');
      setError(msg);
      triggerAlert('error', msg);
      setClients([]);
    } finally {
      setLoading(false);
    }
  }, [t, triggerAlert]);

  useEffect(() => {
    fetchData();
  }, [fetchData, legCaseId]);

  // ✅ headers للـ TableComponent
  const headers = useMemo(
    () => [
      {
        key: 'slug',
        text: t('legalCaseDetails.clients.table.slug'),
        sortable: true,
        searchable: true,
        getValue: (row) => row?.slug || '-',
        mobileLabel: t('legalCaseDetails.clients.table.slug'),
      },
      {
        key: 'name',
        text: t('legalCaseDetails.clients.table.name'),
        sortable: true,
        searchable: true,
        getValue: (row) => row?.name || '-',
        mobileLabel: t('legalCaseDetails.clients.table.name'),
      },
      {
        key: 'phone_number',
        text: t('legalCaseDetails.clients.table.phone'),
        sortable: false,
        searchable: true,
        getValue: (row) => row?.phone_number || t('legalCaseDetails.clients.notAvailable'),
        mobileLabel: t('legalCaseDetails.clients.table.phone'),
      },
    ],
    [t],
  );

  // (اختياري) custom render
  const customRenderers = useMemo(
    () => ({
      phone_number: (row) =>
        row?.phone_number ? (
          <span className="font-semibold">{row.phone_number}</span>
        ) : (
          <span className="text-muted-foreground">
            {t('legalCaseDetails.clients.notAvailable')}
          </span>
        ),
    }),
    [t],
  );

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
        <button
          onClick={addNewClient}
          className="pressable inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          <LexicraftIcon name="client" size={18} />
          {t('legalCaseDetails.clients.actions.addClient')}
        </button>
      </header>

      <AddClientToCaseForm
        legCaseId={legCaseId}
        clients={clients}
        legcaseClients={legcaseClients}
        fetchLegcaseClients={fetchLegcaseClients}
      />

      {/* ✅ TableComponent بدل الجدول اليدوي */}
      <TableComponent
        title={t('legalCaseDetails.clients.title', { defaultValue: '' }) || undefined}
        data={legcaseClients}
        headers={headers}
        customRenderers={customRenderers}
        isRTL={isRTL}
        itemsPerPage={5}
        loading={loading}
        error={Boolean(error)}
        errorLabel={error || t('legalCaseDetails.clients.errors.fetch')}
        onRetry={fetchData}
        searchPlaceholder={t('common.search')}
        emptyLabel={t('legalCaseDetails.clients.empty')}
        retryLabel={t('legalCaseDetails.actions.retry')}

        // ✅ أزرار الأكشن: هنا محتاجين Delete فقط
        onDelete={(id, row) => openDeleteModal(id, row?.name || '')}
        permissions={{ view: false, update: false, delete: true, create: false }}

        // ✅ لو حابب تمنع زر الإضافة الداخلي (إنت عندك فورم إضافة فوق)
        onAdd={undefined}
        renderAddButton={undefined}

        // ✅ labels
        deleteLabel={t('legalCaseDetails.actions.delete')}
        prevLabel={t('legalCaseDetails.pagination.prev')}
        nextLabel={t('legalCaseDetails.pagination.next')}
        pageLabel={t('legalCaseDetails.pagination.page', { defaultValue: t('legalCaseDetails.pagination.page') })}
      />

      <GlobalConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteClient}
        itemName={clientToDelete.name}
      />
    </div>
  );
}
