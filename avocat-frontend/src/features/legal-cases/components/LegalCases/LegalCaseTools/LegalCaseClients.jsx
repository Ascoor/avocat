import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import {
  addLegalCaseClients,
  removeLegalCaseClient,
} from '@shared/services/api/legalCases';
import { getClients } from '@shared/services/api/clients';
import { useAlert } from '@shared/contexts/AlertContext';
import GlobalConfirmDeleteModal from '@shared/components/common/GlobalConfirmDeleteModal';
import { useLanguage } from '@shared/contexts/LanguageContext';
import { LexicraftIcon } from '@shared/icons/lexicraft';
import TableComponent from '@shared/components/common/TableComponent';
import SectionHeader from './SectionHeader';

const AddClientToCaseForm = forwardRef(function AddClientToCaseForm(
  { legCaseId, clients, legcaseClients, fetchLegcaseClients },
  ref,
) {
  const { triggerAlert } = useAlert();
  const { t, isRTL } = useLanguage();
  const [rows, setRows] = useState([{ key: Date.now(), client_id: '' }]);
  const [formError, setFormError] = useState('');
  const linkedIds = useMemo(
    () => new Set((legcaseClients || []).map((client) => String(client.id))),
    [legcaseClients],
  );

  const addNewRow = useCallback(() => {
    setFormError('');
    setRows((prev) => [...prev, { key: Date.now() + Math.random(), client_id: '' }]);
  }, []);

  useImperativeHandle(ref, () => ({ addNewRow }), [addNewRow]);

  const updateRow = useCallback((index, value) => {
    setRows((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], client_id: value };
      return next;
    });
  }, []);

  const removeRow = useCallback((index) => {
    setRows((prev) => (prev.length === 1 ? prev : prev.filter((_, i) => i !== index)));
  }, []);

  const saveClients = useCallback(async () => {
    const pickedIds = rows.map((row) => String(row.client_id)).filter(Boolean);
    const uniqueIds = [...new Set(pickedIds)];

    if (!uniqueIds.length) {
      const message = t('legalCaseDetails.clients.errors.missingClient');
      setFormError(message);
      triggerAlert('error', message);
      return;
    }

    const duplicated = uniqueIds.find((id) => linkedIds.has(id));
    if (duplicated) {
      const message = t('legalCaseDetails.clients.alerts.duplicate');
      setFormError(message);
      triggerAlert('error', message);
      return;
    }

    try {
      await addLegalCaseClients(legCaseId, uniqueIds.map((id) => Number(id)));
      triggerAlert('success', t('legalCaseDetails.clients.alerts.addSuccess'));
      setRows([{ key: Date.now(), client_id: '' }]);
      setFormError('');
      fetchLegcaseClients?.();
    } catch (error) {
      triggerAlert('error', t('legalCaseDetails.clients.alerts.addError'));
    }
  }, [fetchLegcaseClients, legCaseId, linkedIds, rows, t, triggerAlert]);

  return (
    <section className="space-y-3 rounded-2xl border border-border bg-muted/20 p-4" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className={isRTL ? 'text-right' : 'text-left'}>
        <h4 className="text-sm font-semibold text-foreground">
          {t('legalCaseDetails.clients.form.title')}
        </h4>
        <p className="text-xs text-muted-foreground">
          {t('legalCaseDetails.clients.form.subtitle')}
        </p>
      </div>

      {rows.map((row, index) => (
        <div key={row.key} className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="relative flex-1">
            <LexicraftIcon
              name="search"
              size={14}
              className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-muted-foreground ${
                isRTL ? 'right-3' : 'left-3'
              }`}
            />
            <select
              value={row.client_id}
              onChange={(event) => updateRow(index, event.target.value)}
              className={`w-full rounded-xl border border-border bg-background py-2 text-sm ${
                isRTL ? 'pr-9 pl-3 text-right' : 'pl-9 pr-3 text-left'
              }`}
            >
              <option value="">{t('legalCaseDetails.clients.form.searchPlaceholder')}</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={() => removeRow(index)}
            className="pressable inline-flex items-center gap-1 rounded-full border border-destructive/30 px-3 py-2 text-xs font-semibold text-destructive"
          >
            <LexicraftIcon name="trash" size={12} />
            {t('legalCaseDetails.clients.form.removeRow')}
          </button>
        </div>
      ))}

      {formError ? (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
          {formError}
        </div>
      ) : null}

      <div className={`flex gap-2 ${isRTL ? 'justify-start' : 'justify-end'}`}>
        <button
          type="button"
          onClick={addNewRow}
          className="pressable rounded-full border border-border px-3 py-2 text-xs font-semibold"
        >
          {t('legalCaseDetails.clients.form.addRow')}
        </button>
        <button
          type="button"
          onClick={saveClients}
          className="pressable rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
        >
          {t('legalCaseDetails.clients.form.submit')}
        </button>
      </div>
    </section>
  );
});

export default function LegalCaseClients({
  legCaseId,
  fetchLegcaseClients,
  legcaseClients = [],
}) {
  const { triggerAlert } = useAlert();
  const { t, isRTL } = useLanguage();
  const addFormRef = useRef(null);

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

  return (
    <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      <SectionHeader
        icon="users"
        title={t('legalCaseDetails.clients.title')}
        subtitle={t('legalCaseDetails.clients.subtitle')}
        addLabel={t('legalCaseDetails.actions.addClient')}
        onAdd={() => addFormRef.current?.addNewRow?.()}
      />

      <AddClientToCaseForm
        ref={addFormRef}
        legCaseId={legCaseId}
        clients={clients}
        legcaseClients={legcaseClients}
        fetchLegcaseClients={fetchLegcaseClients}
      />

      <TableComponent
        data={legcaseClients}
        headers={headers}
        isRTL={isRTL}
        itemsPerPage={5}
        loading={loading}
        error={Boolean(error)}
        errorLabel={error || t('legalCaseDetails.clients.errors.fetch')}
        onRetry={fetchData}
        searchPlaceholder={t('legalCaseDetails.clients.searchPlaceholder')}
        emptyLabel={t('legalCaseDetails.clients.empty')}
        retryLabel={t('legalCaseDetails.actions.retry')}
        onDelete={(id, row) => openDeleteModal(id, row?.name || '')}
        permissions={{ view: false, update: false, delete: true, create: false }}
        deleteLabel={t('legalCaseDetails.actions.delete')}
        prevLabel={t('legalCaseDetails.pagination.prev')}
        nextLabel={t('legalCaseDetails.pagination.next')}
        pageLabel={t('legalCaseDetails.pagination.page')}
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
