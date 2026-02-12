import { useEffect, useState, useCallback, useMemo } from 'react';
import LegalAdModal from './Modals/LegalAdModal';
import { deleteLegalAd } from '@shared/services/api/legalCases';
import GlobalConfirmDeleteModal from '@shared/components/common/GlobalConfirmDeleteModal';
import { useAlert } from '@shared/contexts/AlertContext';
import { useLanguage } from '@shared/contexts/LanguageContext';
import TableComponent from '@shared/components/common/TableComponent';
import SectionHeader from './SectionHeader';

const LegalCaseAds = ({
  legCaseId,
  legalAds = [],
  loading = false,
  error = '',
  onRefresh,
}) => {
  const { triggerAlert } = useAlert();
  const { t, isRTL } = useLanguage();

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('');
  const [selectedAd, setSelectedAd] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [adToDelete, setAdToDelete] = useState(null);
  const [localAds, setLocalAds] = useState(legalAds);

  useEffect(() => {
    setLocalAds(legalAds);
  }, [legalAds]);

  const handleAddAd = useCallback(() => {
    setModalMode('add');
    setSelectedAd(null);
    setShowModal(true);
  }, []);

  const handleEditAd = useCallback((ad) => {
    setModalMode('edit');
    setSelectedAd(ad);
    setShowModal(true);
  }, []);

  const handleDeleteAd = useCallback((ad) => {
    setAdToDelete(ad);
    setConfirmDelete(true);
  }, []);

  const confirmDeleteAd = useCallback(async () => {
    try {
      if (adToDelete) {
        await deleteLegalAd(adToDelete.id);
        setLocalAds((prev) => prev.filter((ad) => ad.id !== adToDelete.id));
        setAdToDelete(null);
        setConfirmDelete(false);
        triggerAlert('success', t('legalCaseDetails.ads.alerts.deleteSuccess'));
        onRefresh?.();
      }
    } catch (e) {
      triggerAlert('error', t('legalCaseDetails.ads.alerts.deleteError'));
    }
  }, [adToDelete, onRefresh, triggerAlert, t]);

  const handleModalClose = useCallback(() => {
    setShowModal(false);
    setSelectedAd(null);
    setModalMode('');
  }, []);

  const handleAdSubmit = useCallback(
    (data) => {
      setLocalAds((prev) => {
        if (modalMode === 'add') return [...prev, data];
        if (modalMode === 'edit') return prev.map((ad) => (ad.id === data.id ? data : ad));
        return prev;
      });
      handleModalClose();
      onRefresh?.();
    },
    [modalMode, handleModalClose, onRefresh],
  );

  const headers = useMemo(
    () => [
      {
        key: 'legal_ad_type',
        text: t('legalCaseDetails.ads.table.type'),
        sortable: true,
        searchable: true,
        getValue: (row) => row?.legal_ad_type?.name || '-',
        sortValue: (row) => row?.legal_ad_type?.name || '',
        searchValue: (row) => row?.legal_ad_type?.name || '',
        mobileLabel: t('legalCaseDetails.ads.table.type'),
      },
      {
        key: 'send_date',
        text: t('legalCaseDetails.ads.table.sendDate'),
        sortable: true,
        searchable: false,
        getValue: (row) => row?.send_date || '-',
        mobileLabel: t('legalCaseDetails.ads.table.sendDate'),
      },
      {
        key: 'receive_date',
        text: t('legalCaseDetails.ads.table.receiveDate'),
        sortable: true,
        searchable: false,
        getValue: (row) => row?.receive_date || t('legalCaseDetails.ads.pendingReceive'),
        mobileLabel: t('legalCaseDetails.ads.table.receiveDate'),
      },
      {
        key: 'lawyer_send',
        text: t('legalCaseDetails.ads.table.sender'),
        sortable: true,
        searchable: true,
        getValue: (row) => row?.lawyer_send?.name || t('legalCaseDetails.ads.notAvailable'),
        sortValue: (row) => row?.lawyer_send?.name || '',
        searchValue: (row) => row?.lawyer_send?.name || '',
        mobileLabel: t('legalCaseDetails.ads.table.sender'),
      },
      {
        key: 'lawyer_receive',
        text: t('legalCaseDetails.ads.table.receiver'),
        sortable: true,
        searchable: true,
        getValue: (row) => row?.lawyer_receive?.name || t('legalCaseDetails.ads.notAvailable'),
        sortValue: (row) => row?.lawyer_receive?.name || '',
        searchValue: (row) => row?.lawyer_receive?.name || '',
        mobileLabel: t('legalCaseDetails.ads.table.receiver'),
      },
      {
        key: 'description',
        text: t('legalCaseDetails.ads.table.description'),
        sortable: false,
        searchable: true,
        getValue: (row) => row?.description || '-',
        mobileLabel: t('legalCaseDetails.ads.table.description'),
      },
      {
        key: 'status',
        text: t('legalCaseDetails.ads.table.status'),
        sortable: true,
        searchable: true,
        getValue: (row) => row?.status || '-',
        mobileLabel: t('legalCaseDetails.ads.table.status'),
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
      description: (row) => (
        <span className="line-clamp-2 text-sm text-foreground">
          {row?.description || '-'}
        </span>
      ),
    }),
    [],
  );

  return (
    <div className="space-y-6">
      <SectionHeader
        icon="briefcase"
        title={t('legalCaseDetails.ads.title')}
        subtitle={t('legalCaseDetails.ads.subtitle')}
        addLabel={t('legalCaseDetails.actions.addAd')}
        onAdd={handleAddAd}
      />

      <TableComponent
             title={t('legalCaseDetails.ads.title', { defaultValue: '' }) || undefined}
        data={localAds}
        headers={headers}
        customRenderers={customRenderers}
        isRTL={isRTL}
        itemsPerPage={10}
        loading={loading}
        error={Boolean(error)}
        errorLabel={error || t('legalCaseDetails.ads.errors.fetch')}
        onRetry={() => onRefresh?.()}
        searchPlaceholder={t('legalCaseDetails.ads.searchPlaceholder')}
        emptyLabel={t('legalCaseDetails.ads.empty')}
        retryLabel={t('legalCaseDetails.actions.retry')}
        onAdd={undefined}
        renderAddButton={undefined}
        onEdit={(id) => {
          const ad = localAds.find((x) => String(x.id) === String(id));
          if (ad) handleEditAd(ad);
        }}
        onDelete={(id) => {
          const ad = localAds.find((x) => String(x.id) === String(id));
          if (ad) handleDeleteAd(ad);
        }}
        permissions={{ view: false, update: true, delete: true, create: true }}
        prevLabel={t('legalCaseDetails.pagination.prev')}
        nextLabel={t('legalCaseDetails.pagination.next')}
        pageLabel={t('legalCaseDetails.pagination.page')}
      />

      {showModal && (
        <LegalAdModal
          isOpen={showModal}
          onClose={handleModalClose}
          legCaseId={legCaseId}
          initialData={selectedAd}
          isEdit={modalMode === 'edit'}
          fetchLegalAds={onRefresh}
          onSubmit={handleAdSubmit}
        />
      )}

      {confirmDelete && (
        <GlobalConfirmDeleteModal
          isOpen={confirmDelete}
          onClose={() => setConfirmDelete(false)}
          onConfirm={confirmDeleteAd}
          itemName={`  ${adToDelete?.legal_ad_type?.name || ''}؟`}
        />
      )}
    </div>
  );
};

export default LegalCaseAds;
