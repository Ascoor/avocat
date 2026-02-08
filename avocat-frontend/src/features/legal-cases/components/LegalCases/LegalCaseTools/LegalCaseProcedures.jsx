import { useEffect, useState } from 'react';
import {
  deleteProcedure,
} from '@shared/services/api/procedures';
import ProcedureModal from './Modals/ProcedureModal';
import GlobalConfirmDeleteModal from '@shared/components/common/GlobalConfirmDeleteModal';
import { useAlert } from '@shared/contexts/AlertContext';
import { useLanguage } from '@shared/contexts/LanguageContext';
import { LexicraftIcon } from '@shared/icons/lexicraft';

const LegalCaseProcedures = ({
  legCaseId,
  openAddSignal = 0,
  procedures = [],
  loading = false,
  error = '',
  onRefresh,
}) => {
  const { triggerAlert } = useAlert();
  const { t } = useLanguage();
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [procedureToDelete, setProcedureToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginateData = (data) => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return data.slice(startIndex, endIndex);
  };
  const proceduresToDisplay = paginateData(procedures);

  useEffect(() => {
    if (openAddSignal > 0) {
      handleAddProcedure();
    }
  }, [openAddSignal]);

  const handleAddProcedure = () => {
    setIsEditMode(false);
    setModalData({});
    setShowModal(true);
  };

  const handleEditProcedure = (procedure) => {
    setIsEditMode(true);
    setModalData(procedure);
    setShowModal(true);
  };

  const handleDeleteClick = (procedure) => {
    setProcedureToDelete(procedure);
    setShowConfirmDelete(true);
  };

  const handleConfirmDelete = async () => {
    if (procedureToDelete) {
      try {
        await deleteProcedure(procedureToDelete.id);
        triggerAlert('success', t('legalCaseDetails.procedures.alerts.deleteSuccess'));
        onRefresh?.();
      } catch (error) {
        triggerAlert('error', t('legalCaseDetails.procedures.alerts.deleteError'));
      } finally {
        setShowConfirmDelete(false);
        setProcedureToDelete(null);
      }
    }
  };

  const totalPages = Math.ceil(procedures.length / rowsPerPage) || 1;
  const isEmpty = !loading && procedures.length === 0;

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-muted/40 p-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            {t('legalCaseDetails.procedures.title')}
          </h3>
          <p className="text-sm text-muted-foreground">
            {t('legalCaseDetails.procedures.subtitle')}
          </p>
        </div>
        <button
          onClick={handleAddProcedure}
          className="pressable inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          <LexicraftIcon name="document" size={18} />
          {t('legalCaseDetails.actions.addProcedure')}
        </button>
      </header>

      {error && (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span>{error}</span>
            <button
              onClick={() => onRefresh?.()}
              className="pressable inline-flex items-center gap-2 rounded-full border border-destructive/30 bg-background px-3 py-1 text-xs font-semibold text-destructive"
            >
              <LexicraftIcon name="arrow-forward" size={14} isDirectional />
              {t('legalCaseDetails.actions.retry')}
            </button>
          </div>
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
                <LexicraftIcon name="tool" size={20} />
              </div>
              <div>{t('legalCaseDetails.procedures.empty')}</div>
              <button
                onClick={handleAddProcedure}
                className="pressable mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
              >
                <LexicraftIcon name="document" size={16} />
                {t('legalCaseDetails.actions.addProcedure')}
              </button>
            </div>
          ) : (
            <>
              <div className="hidden md:block overflow-x-auto rounded-2xl border border-border">
                <table className="min-w-full text-sm">
                  <thead className="sticky top-0 bg-muted text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 text-start">{t('legalCaseDetails.procedures.table.procedure')}</th>
                      <th className="px-4 py-3 text-start">{t('legalCaseDetails.procedures.table.lawyer')}</th>
                      <th className="px-4 py-3 text-start">{t('legalCaseDetails.procedures.table.endDate')}</th>
                      <th className="px-4 py-3 text-start">{t('legalCaseDetails.procedures.table.request')}</th>
                      <th className="px-4 py-3 text-start">{t('legalCaseDetails.procedures.table.result')}</th>
                      <th className="px-4 py-3 text-start">{t('legalCaseDetails.procedures.table.status')}</th>
                      <th className="px-4 py-3 text-center">{t('legalCaseDetails.table.actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {proceduresToDisplay.map((procedure) => (
                      <tr
                        key={procedure.id}
                        className="border-t border-border hover:bg-muted/40 transition"
                      >
                        <td className="px-4 py-3">{procedure.procedure_type?.name || '-'}</td>
                        <td className="px-4 py-3">{procedure.lawyer?.name || '-'}</td>
                        <td className="px-4 py-3">{procedure.date_end}</td>
                        <td className="px-4 py-3">{procedure.job}</td>
                        <td className="px-4 py-3">{procedure.result}</td>
                        <td className="px-4 py-3">{procedure.status}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditProcedure(procedure);
                              }}
                              className="pressable inline-flex h-9 w-9 items-center justify-center rounded-full border border-border"
                              aria-label={t('legalCaseDetails.actions.edit')}
                            >
                              <LexicraftIcon name="tool" size={18} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteClick(procedure);
                              }}
                              className="pressable inline-flex h-9 w-9 items-center justify-center rounded-full border border-destructive/40 text-destructive"
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
                {proceduresToDisplay.map((procedure) => (
                  <div
                    key={procedure.id}
                    className="rounded-2xl border border-border p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-sm font-semibold text-foreground">
                          {procedure.procedure_type?.name || '-'}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {procedure.lawyer?.name || '-'} · {procedure.date_end}
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">{procedure.status}</span>
                    </div>
                    <div className="mt-3 text-xs text-muted-foreground">
                      {t('legalCaseDetails.procedures.table.request')}: {procedure.job || '-'}
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        onClick={() => handleEditProcedure(procedure)}
                        className="pressable inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-border px-3 py-2 text-xs"
                      >
                        <LexicraftIcon name="tool" size={16} />
                        {t('legalCaseDetails.actions.edit')}
                      </button>
                      <button
                        onClick={() => handleDeleteClick(procedure)}
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
        <ProcedureModal
          legalCaseId={legCaseId}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={onRefresh}
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
