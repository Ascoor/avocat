import { useEffect, useState, useCallback } from 'react';
import LegalAdModal from './Modals/LegalAdModal';
import {
  getLegalAdsByLegCaseId,
  deleteLegalAd,
} from '@shared/services/api/legalCases';
import GlobalConfirmDeleteModal from '@shared/components/common/GlobalConfirmDeleteModal';
import { useAlert } from '@shared/contexts/AlertContext';
import { useLanguage } from '@shared/contexts/LanguageContext';
import { LexicraftIcon } from '@shared/icons/lexicraft';

const LegalCaseAds = ({ legCaseId }) => {
  const { triggerAlert } = useAlert();
  const { t } = useLanguage();
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('');
  const [selectedAd, setSelectedAd] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [adToDelete, setAdToDelete] = useState(null);
  const [legalAds, setLegalAds] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginateData = (data) => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const fetchLegalAds = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      if (!legCaseId) throw new Error('Missing case id');

      const response = await getLegalAdsByLegCaseId(legCaseId);

      if (response?.data && Array.isArray(response.data)) {
        setLegalAds(response.data);
      } else {
        throw new Error('Invalid data');
      }
    } catch (err) {
      setError(t('legalCaseDetails.ads.errors.fetch'));
      triggerAlert('error', t('legalCaseDetails.ads.errors.fetch'));
    } finally {
      setLoading(false);
    }
  }, [legCaseId, t, triggerAlert]);

  useEffect(() => {
    fetchLegalAds();
  }, [fetchLegalAds]);

  const handleAddAd = () => {
    setModalMode('add');
    setSelectedAd(null);
    setShowModal(true);
  };

  const handleEditAd = (ad) => {
    setModalMode('edit');
    setSelectedAd(ad);
    setShowModal(true);
  };

  const handleDeleteAd = (ad) => {
    setAdToDelete(ad);
    setConfirmDelete(true);
  };

  const confirmDeleteAd = useCallback(async () => {
    try {
      if (adToDelete) {
        await deleteLegalAd(adToDelete.id);
        setLegalAds((prevAds) =>
          prevAds.filter((ad) => ad.id !== adToDelete.id),
        );

        setAdToDelete(null);

        setConfirmDelete(false);
        triggerAlert('success', t('legalCaseDetails.ads.alerts.deleteSuccess'));
      }
    } catch (error) {
      triggerAlert('error', t('legalCaseDetails.ads.alerts.deleteError'));
    }
  }, [adToDelete, triggerAlert, t]);

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedAd(null);
    setModalMode('');
  };

  const handleAdSubmit = (data) => {
    setLegalAds((prevAds) => {
      if (modalMode === 'add') {
        return [...prevAds, data];
      } else if (modalMode === 'edit') {
        return prevAds.map((ad) => (ad.id === data.id ? data : ad));
      }
      return prevAds;
    });
    handleModalClose();
  };

  const legalAdsToDisplay = paginateData(legalAds);
  const totalPages = Math.ceil(legalAds.length / rowsPerPage) || 1;
  const isEmpty = !loading && legalAds.length === 0;

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-muted/40 p-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            {t('legalCaseDetails.ads.title')}
          </h3>
          <p className="text-sm text-muted-foreground">
            {t('legalCaseDetails.ads.subtitle')}
          </p>
        </div>
        <button
          onClick={handleAddAd}
          className="pressable inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          <LexicraftIcon name="document" size={18} />
          {t('legalCaseDetails.actions.addAd')}
        </button>
      </header>

      {error && (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-16 rounded-2xl skeleton-shimmer" />
          ))}
        </div>
      ) : (
        <>
          {isEmpty ? (
            <div className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
              <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <LexicraftIcon name="document" size={20} />
              </div>
              <div>{t('legalCaseDetails.ads.empty')}</div>
              <button
                onClick={handleAddAd}
                className="pressable mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
              >
                <LexicraftIcon name="document" size={16} />
                {t('legalCaseDetails.actions.addAd')}
              </button>
            </div>
          ) : (
            <>
              <div className="hidden md:block overflow-x-auto rounded-2xl border border-border">
                <table className="min-w-full text-sm">
                  <thead className="sticky top-0 bg-muted text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 text-start">{t('legalCaseDetails.ads.table.type')}</th>
                      <th className="px-4 py-3 text-start">{t('legalCaseDetails.ads.table.sendDate')}</th>
                      <th className="px-4 py-3 text-start">{t('legalCaseDetails.ads.table.receiveDate')}</th>
                      <th className="px-4 py-3 text-start">{t('legalCaseDetails.ads.table.sender')}</th>
                      <th className="px-4 py-3 text-start">{t('legalCaseDetails.ads.table.receiver')}</th>
                      <th className="px-4 py-3 text-start">{t('legalCaseDetails.ads.table.description')}</th>
                      <th className="px-4 py-3 text-start">{t('legalCaseDetails.ads.table.status')}</th>
                      <th className="px-4 py-3 text-center">{t('legalCaseDetails.table.actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {legalAdsToDisplay.map((ad) => (
                      <tr
                        key={ad.id}
                        className="border-t border-border hover:bg-muted/40 transition"
                      >
                        <td className="px-4 py-3">{ad.legal_ad_type?.name}</td>
                        <td className="px-4 py-3">{ad.send_date}</td>
                        <td className="px-4 py-3">
                          {ad.receive_date || t('legalCaseDetails.ads.pendingReceive')}
                        </td>
                        <td className="px-4 py-3">
                          {ad.lawyer_send?.name || t('legalCaseDetails.ads.notAvailable')}
                        </td>
                        <td className="px-4 py-3">
                          {ad.lawyer_receive?.name || t('legalCaseDetails.ads.notAvailable')}
                        </td>
                        <td className="px-4 py-3">{ad.description}</td>
                        <td className="px-4 py-3">{ad.status}</td>
                        <td className="px-4 py-3">
                          <div className="flex justify-center gap-2">
                            <button
                              className="pressable inline-flex h-9 w-9 items-center justify-center rounded-full border border-border"
                              onClick={() => handleEditAd(ad)}
                              aria-label={t('legalCaseDetails.actions.edit')}
                            >
                              <LexicraftIcon name="tool" size={18} />
                            </button>
                            <button
                              className="pressable inline-flex h-9 w-9 items-center justify-center rounded-full border border-destructive/40 text-destructive"
                              onClick={() => handleDeleteAd(ad)}
                              aria-label={t('legalCaseDetails.actions.delete')}
                            >
                              <LexicraftIcon name="shield" size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="space-y-3 md:hidden">
                {legalAdsToDisplay.map((ad) => (
                  <div key={ad.id} className="rounded-2xl border border-border p-4 shadow-sm">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-sm font-semibold text-foreground">
                          {ad.legal_ad_type?.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {ad.send_date} · {ad.status}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 text-xs text-muted-foreground">
                      {ad.description}
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        onClick={() => handleEditAd(ad)}
                        className="pressable inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-border px-3 py-2 text-xs"
                      >
                        <LexicraftIcon name="tool" size={16} />
                        {t('legalCaseDetails.actions.edit')}
                      </button>
                      <button
                        onClick={() => handleDeleteAd(ad)}
                        className="pressable inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-destructive/40 px-3 py-2 text-xs text-destructive"
                      >
                        <LexicraftIcon name="shield" size={16} />
                        {t('legalCaseDetails.actions.delete')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {totalPages > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="pressable rounded-full border border-border px-4 py-2 text-sm disabled:opacity-50"
              >
                {t('legalCaseDetails.pagination.prev')}
              </button>
              <span className="text-sm text-muted-foreground">
                {t('legalCaseDetails.pagination.page', { current: currentPage, total: totalPages })}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="pressable rounded-full border border-border px-4 py-2 text-sm disabled:opacity-50"
              >
                {t('legalCaseDetails.pagination.next')}
              </button>
            </div>
          )}
        </>
      )}

      {showModal && (
        <LegalAdModal
          isOpen={showModal}
          onClose={handleModalClose}
          legCaseId={legCaseId}
          initialData={selectedAd}
          isEdit={modalMode === 'edit'}
          fetchLegalAds={fetchLegalAds}
          onSubmit={handleAdSubmit}
        />
      )}

      {confirmDelete && (
        <GlobalConfirmDeleteModal
          isOpen={confirmDelete}
          fetchLegalAds
          onClose={() => setConfirmDelete(false)}
          onConfirm={confirmDeleteAd}
          itemName={`  ${adToDelete?.legal_ad_type?.name || ''}؟`}
        />
      )}
    </div>
  );
};

export default LegalCaseAds;
