import { useEffect, useState } from 'react';
import {
  deleteSession,
} from '@shared/services/api/sessions';
import SessionModal from './Modals/SessionModal';
import GlobalConfirmDeleteModal from '@shared/components/common/GlobalConfirmDeleteModal';
import { useAlert } from '@shared/contexts/AlertContext';
import SessionDetailsModal from './Modals/SessionDetailsModal';
import { useLanguage } from '@shared/contexts/LanguageContext';
import { LexicraftIcon } from '@shared/icons/lexicraft';

const LegalCaseSessions = ({
  legCaseId,
  openAddSignal = 0,
  sessions = [],
  loading = false,
  error = '',
  onRefresh,
}) => {
  const { triggerAlert } = useAlert();
  const { t } = useLanguage();
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
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
  const sessionsToDisplay = paginateData(sessions);

  useEffect(() => {
    if (openAddSignal > 0) {
      handleAddSession();
    }
  }, [openAddSignal]);

  const handleAddSession = () => {
    setIsEditMode(false);
    setModalData(null);
    setShowModal(true);
  };

  const handleEditSession = (session) => {
    setIsEditMode(true);
    setModalData(session);
    setShowModal(true);
  };

  const handleDeleteClick = (session) => {
    setSessionToDelete(session);
  };

  const handleConfirmDelete = async () => {
    try {
      if (sessionToDelete) {
        await deleteSession(sessionToDelete.id);
        triggerAlert('success', t('legalCaseDetails.sessions.alerts.deleteSuccess'));
        setSessionToDelete(null);
        onRefresh?.();
      }
    } catch (error) {
      triggerAlert('error', t('legalCaseDetails.sessions.alerts.deleteError'));
    }
  };

  const handleSubmitSession = (newSessionData) => {
    setShowModal(false);
    onRefresh?.();
    triggerAlert(
      'success',
      isEditMode
        ? t('legalCaseDetails.sessions.alerts.updateSuccess')
        : t('legalCaseDetails.sessions.alerts.addSuccess'),
    );
  };

  const handleRowClick = (session) => {
    setSelectedSession(session);
  };

  const totalPages = Math.ceil(sessions.length / rowsPerPage) || 1;
  const isEmpty = !loading && sessions.length === 0;

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-muted/40 p-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            {t('legalCaseDetails.sessions.title')}
          </h3>
          <p className="text-sm text-muted-foreground">
            {t('legalCaseDetails.sessions.subtitle')}
          </p>
        </div>
        <button
          onClick={handleAddSession}
          className="pressable inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          <LexicraftIcon name="calendar" size={18} />
          {t('legalCaseDetails.actions.addSession')}
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
                <LexicraftIcon name="calendar" size={20} />
              </div>
              <div>{t('legalCaseDetails.sessions.empty')}</div>
              <button
                onClick={handleAddSession}
                className="pressable mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
              >
                <LexicraftIcon name="calendar" size={16} />
                {t('legalCaseDetails.actions.addSession')}
              </button>
            </div>
          ) : (
            <>
              <div className="hidden md:block overflow-x-auto rounded-2xl border border-border">
                <table className="min-w-full text-sm">
                  <thead className="sticky top-0 bg-muted text-muted-foreground">
                    <tr>
                      <th className="px-3 py-3 text-start">{t('legalCaseDetails.sessions.table.date')}</th>
                      <th className="px-3 py-3 text-start">{t('legalCaseDetails.sessions.table.lawyer')}</th>
                      <th className="px-3 py-3 text-start">{t('legalCaseDetails.sessions.table.roll')}</th>
                      <th className="px-3 py-3 text-start">{t('legalCaseDetails.sessions.table.court')}</th>
                      <th className="px-3 py-3 text-start">{t('legalCaseDetails.sessions.table.orders')}</th>
                      <th className="px-3 py-3 text-start">{t('legalCaseDetails.sessions.table.result')}</th>
                      <th className="px-3 py-3 text-start">{t('legalCaseDetails.sessions.table.status')}</th>
                      <th className="px-3 py-3 text-center">{t('legalCaseDetails.table.actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessionsToDisplay.map((session) => (
                      <tr
                        key={session.id}
                        className="border-t border-border hover:bg-muted/40 transition"
                        onClick={() => handleRowClick(session)}
                      >
                        <td className="px-3 py-3">{session.session_date}</td>
                        <td className="px-3 py-3">{session.lawyer?.name || '-'}</td>
                        <td className="px-3 py-3">{session.session_roll || '-'}</td>
                        <td className="px-3 py-3">{session.court?.name || '-'}</td>
                        <td className="px-3 py-3">{session.orders || '-'}</td>
                        <td className="px-3 py-3">{session.result || '-'}</td>
                        <td className="px-3 py-3">{session.status || '-'}</td>
                        <td className="px-3 py-3">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditSession(session);
                              }}
                              className="pressable inline-flex h-9 w-9 items-center justify-center rounded-full border border-border"
                              aria-label={t('legalCaseDetails.actions.edit')}
                            >
                              <LexicraftIcon name="tool" size={18} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteClick(session);
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
                {sessionsToDisplay.map((session) => (
                  <div
                    key={session.id}
                    className="rounded-2xl border border-border p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-sm font-semibold text-foreground">
                          {session.session_date}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {session.court?.name || '-'} · {session.lawyer?.name || '-'}
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">{session.status || '-'}</span>
                    </div>
                    <div className="mt-3 text-xs text-muted-foreground">
                      {t('legalCaseDetails.sessions.table.orders')}: {session.orders || '-'}
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        onClick={() => handleEditSession(session)}
                        className="pressable inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-border px-3 py-2 text-xs"
                      >
                        <LexicraftIcon name="tool" size={16} />
                        {t('legalCaseDetails.actions.edit')}
                      </button>
                      <button
                        onClick={() => handleDeleteClick(session)}
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

      {selectedSession && (
        <SessionDetailsModal
          isOpen={!!selectedSession}
          onClose={() => setSelectedSession(null)}
          session={selectedSession}
        />
      )}
      {showModal && (
        <SessionModal
          isOpen={showModal}
          fetchSessions={onRefresh}
          legalCaseId={legCaseId}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmitSession}
          initialData={modalData}
          isEdit={isEditMode}
        />
      )}
      {sessionToDelete && (
        <GlobalConfirmDeleteModal
          isOpen={!!sessionToDelete}
          onClose={() => setSessionToDelete(null)}
          onConfirm={handleConfirmDelete}
          itemName={sessionToDelete.session_date || t('legalCaseDetails.sessions.title')}
        />
      )}
    </div>
  );
};

export default LegalCaseSessions;
