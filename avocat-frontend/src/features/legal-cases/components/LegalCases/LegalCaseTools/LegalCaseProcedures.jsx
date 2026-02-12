import { useEffect, useMemo, useState, useCallback } from 'react';
import { deleteProcedure } from '@shared/services/api/procedures';
import ProcedureModal from './Modals/ProcedureModal';
import GlobalConfirmDeleteModal from '@shared/components/common/GlobalConfirmDeleteModal';
import { useAlert } from '@shared/contexts/AlertContext';
import { useLanguage } from '@shared/contexts/LanguageContext';
import TableComponent from '@shared/components/common/TableComponent';
import SectionHeader from './SectionHeader';

const LegalCaseProcedures = ({
  legCaseId,
  openAddSignal = 0,
  procedures = [],
  loading = false,
  error = '',
  onRefresh,
}) => {
  const { triggerAlert } = useAlert();
  const { t, isRTL } = useLanguage();

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [procedureToDelete, setProcedureToDelete] = useState(null);

  useEffect(() => {
    if (openAddSignal > 0) handleAddProcedure();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openAddSignal]);

  const handleAddProcedure = useCallback(() => {
    setIsEditMode(false);
    setModalData({});
    setShowModal(true);
  }, []);

  const handleEditProcedure = useCallback((procedure) => {
    setIsEditMode(true);
    setModalData(procedure);
    setShowModal(true);
  }, []);

  const handleDeleteClick = useCallback((procedure) => {
    setProcedureToDelete(procedure);
    setShowConfirmDelete(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!procedureToDelete) return;
    try {
      await deleteProcedure(procedureToDelete.id);
      triggerAlert('success', t('legalCaseDetails.procedures.alerts.deleteSuccess'));
      onRefresh?.();
    } catch (e) {
      triggerAlert('error', t('legalCaseDetails.procedures.alerts.deleteError'));
    } finally {
      setShowConfirmDelete(false);
      setProcedureToDelete(null);
    }
  }, [onRefresh, procedureToDelete, t, triggerAlert]);

  const handleSubmitProcedure = useCallback(() => {
    setShowModal(false);
    onRefresh?.();
    triggerAlert(
      'success',
      isEditMode
        ? t('legalCaseDetails.procedures.alerts.updateSuccess')
        : t('legalCaseDetails.procedures.alerts.addSuccess'),
    );
  }, [isEditMode, onRefresh, t, triggerAlert]);

  const headers = useMemo(
    () => [
      {
        key: 'procedure_type',
        text: t('legalCaseDetails.procedures.table.procedure'),
        sortable: true,
        searchable: true,
        getValue: (row) => row?.procedure_type?.name || '-',
        sortValue: (row) => row?.procedure_type?.name || '',
        searchValue: (row) => row?.procedure_type?.name || '',
        mobileLabel: t('legalCaseDetails.procedures.table.procedure'),
      },
      {
        key: 'lawyer',
        text: t('legalCaseDetails.procedures.table.lawyer'),
        sortable: true,
        searchable: true,
        getValue: (row) => row?.lawyer?.name || '-',
        sortValue: (row) => row?.lawyer?.name || '',
        searchValue: (row) => row?.lawyer?.name || '',
        mobileLabel: t('legalCaseDetails.procedures.table.lawyer'),
      },
      {
        key: 'date_end',
        text: t('legalCaseDetails.procedures.table.endDate'),
        sortable: true,
        searchable: false,
        getValue: (row) => row?.date_end || '-',
        mobileLabel: t('legalCaseDetails.procedures.table.endDate'),
      },
      {
        key: 'job',
        text: t('legalCaseDetails.procedures.table.request'),
        sortable: false,
        searchable: true,
        getValue: (row) => row?.job || '-',
        mobileLabel: t('legalCaseDetails.procedures.table.request'),
      },
      {
        key: 'result',
        text: t('legalCaseDetails.procedures.table.result'),
        sortable: false,
        searchable: true,
        getValue: (row) => row?.result || '-',
        mobileLabel: t('legalCaseDetails.procedures.table.result'),
      },
      {
        key: 'status',
        text: t('legalCaseDetails.procedures.table.status'),
        sortable: true,
        searchable: true,
        getValue: (row) => row?.status || '-',
        mobileLabel: t('legalCaseDetails.procedures.table.status'),
      },
    ],
    [t],
  );

  const customRenderers = useMemo(
    () => ({
      status: (row) => (
        <span className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface))] px-3 py-1 text-xs font-semibold">
          <span className="h-2 w-2 rounded-full bg-[hsl(var(--color-primary))]" />
          {row?.status || '-'}
        </span>
      ),
      job: (row) => (
        <span className="line-clamp-2 text-sm text-foreground">
          {row?.job || '-'}
        </span>
      ),
      result: (row) => (
        <span className="line-clamp-2 text-sm text-foreground">
          {row?.result || '-'}
        </span>
      ),
    }),
    [],
  );

  return (
    <div className="space-y-6">
      <SectionHeader
        icon="document"
        title={t('legalCaseDetails.procedures.title')}
        subtitle={t('legalCaseDetails.procedures.subtitle')}
        addLabel={t('legalCaseDetails.actions.addProcedure')}
        onAdd={handleAddProcedure}
      />

      <TableComponent
             title={t('legalCaseDetails.procedures.title', { defaultValue: '' }) || undefined}
        data={procedures}
        headers={headers}
        customRenderers={customRenderers}
        isRTL={isRTL}
        itemsPerPage={8}
        loading={loading}
        error={Boolean(error)}
        errorLabel={error || t('legalCaseDetails.procedures.errors.fetch')}
        onRetry={() => onRefresh?.()}
        searchPlaceholder={t('legalCaseDetails.procedures.searchPlaceholder')}
        emptyLabel={t('legalCaseDetails.procedures.empty')}
        retryLabel={t('legalCaseDetails.actions.retry')}
        onAdd={undefined}
        renderAddButton={undefined}
        onEdit={(id) => {
          const p = procedures.find((x) => String(x.id) === String(id));
          if (p) handleEditProcedure(p);
        }}
        onDelete={(id) => {
          const p = procedures.find((x) => String(x.id) === String(id));
          if (p) handleDeleteClick(p);
        }}
        permissions={{ view: false, update: true, delete: true, create: true }}
        prevLabel={t('legalCaseDetails.pagination.prev')}
        nextLabel={t('legalCaseDetails.pagination.next')}
        pageLabel={t('legalCaseDetails.pagination.page')}
      />

      {showModal && (
        <ProcedureModal
          legalCaseId={legCaseId}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmitProcedure}
          initialData={modalData}
          isEdit={isEditMode}
        />
      )}
      {showConfirmDelete && (
        <GlobalConfirmDeleteModal
          isOpen={showConfirmDelete}
          onClose={() => setShowConfirmDelete(false)}
          onConfirm={handleConfirmDelete}
          itemName={procedureToDelete?.procedure_type?.name || t('legalCaseDetails.procedures.title')}
        />
      )}
    </div>
  );
};

export default LegalCaseProcedures;
