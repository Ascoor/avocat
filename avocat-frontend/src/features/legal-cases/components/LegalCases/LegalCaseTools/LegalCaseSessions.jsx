import { useEffect, useMemo, useState, useCallback } from 'react';
import { deleteSession } from '@shared/services/api/sessions';
import SessionModal from './Modals/SessionModal';
import GlobalConfirmDeleteModal from '@shared/components/common/GlobalConfirmDeleteModal';
import { useAlert } from '@shared/contexts/AlertContext';
import SessionDetailsModal from './Modals/SessionDetailsModal';
import { useLanguage } from '@shared/contexts/LanguageContext';
import SectionHeader from './SectionHeader';

// ✅ استخدم مكون الجدول الموحد
import TableComponent from '@shared/components/common/TableComponent';

const LegalCaseSessions = ({
  legCaseId,
  openAddSignal = 0,
  sessions = [],
  loading = false,
  error = '',
  onRefresh,
}) => {
  const { triggerAlert } = useAlert();
  const { t, isRTL } = useLanguage();

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const [sessionToDelete, setSessionToDelete] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);

  useEffect(() => {
    if (openAddSignal > 0) handleAddSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openAddSignal]);

  const handleAddSession = useCallback(() => {
    setIsEditMode(false);
    setModalData(null);
    setShowModal(true);
  }, []);

  const handleEditSession = useCallback((session) => {
    setIsEditMode(true);
    setModalData(session);
    setShowModal(true);
  }, []);

  const handleDeleteClick = useCallback((session) => {
    setSessionToDelete(session);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    try {
      if (!sessionToDelete) return;
      await deleteSession(sessionToDelete.id);
      triggerAlert('success', t('legalCaseDetails.sessions.alerts.deleteSuccess'));
      setSessionToDelete(null);
      onRefresh?.();
    } catch (e) {
      triggerAlert('error', t('legalCaseDetails.sessions.alerts.deleteError'));
    }
  }, [onRefresh, sessionToDelete, t, triggerAlert]);

  const handleSubmitSession = useCallback(() => {
    setShowModal(false);
    onRefresh?.();
    triggerAlert(
      'success',
      isEditMode
        ? t('legalCaseDetails.sessions.alerts.updateSuccess')
        : t('legalCaseDetails.sessions.alerts.addSuccess'),
    );
  }, [isEditMode, onRefresh, t, triggerAlert]);

  const headers = useMemo(
    () => [
      {
        key: 'session_date',
        text: t('legalCaseDetails.sessions.table.date'),
        sortable: true,
        searchable: true,
        // sorting/search use raw
        getValue: (row) => row?.session_date || '-',
        mobileLabel: t('legalCaseDetails.sessions.table.date'),
      },
      {
        key: 'lawyer',
        text: t('legalCaseDetails.sessions.table.lawyer'),
        sortable: true,
        searchable: true,
        getValue: (row) => row?.lawyer?.name || '-',
        sortValue: (row) => row?.lawyer?.name || '',
        searchValue: (row) => row?.lawyer?.name || '',
        mobileLabel: t('legalCaseDetails.sessions.table.lawyer'),
      },
      {
        key: 'session_roll',
        text: t('legalCaseDetails.sessions.table.roll'),
        sortable: true,
        searchable: true,
        getValue: (row) => row?.session_roll || '-',
        mobileLabel: t('legalCaseDetails.sessions.table.roll'),
      },
      {
        key: 'court',
        text: t('legalCaseDetails.sessions.table.court'),
        sortable: true,
        searchable: true,
        getValue: (row) => row?.court?.name || '-',
        sortValue: (row) => row?.court?.name || '',
        searchValue: (row) => row?.court?.name || '',
        mobileLabel: t('legalCaseDetails.sessions.table.court'),
      },
      {
        key: 'orders',
        text: t('legalCaseDetails.sessions.table.orders'),
        sortable: false,
        searchable: true,
        getValue: (row) => row?.orders || '-',
        mobileLabel: t('legalCaseDetails.sessions.table.orders'),
      },
      {
        key: 'result',
        text: t('legalCaseDetails.sessions.table.result'),
        sortable: false,
        searchable: true,
        getValue: (row) => row?.result || '-',
        mobileLabel: t('legalCaseDetails.sessions.table.result'),
      },
      {
        key: 'status',
        text: t('legalCaseDetails.sessions.table.status'),
        sortable: true,
        searchable: true,
        getValue: (row) => row?.status || '-',
        mobileLabel: t('legalCaseDetails.sessions.table.status'),
      },
    ],
    [t],
  );

  // custom render to keep nice formatting (optional)
  const customRenderers = useMemo(
    () => ({
      status: (row) => (
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold">
          <span className="h-2 w-2 rounded-full bg-primary" />
          {row?.status || '-'}
        </span>
      ),
      orders: (row) => (
        <span className="line-clamp-2 text-sm text-foreground">
          {row?.orders || '-'}
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
        icon="calendar"
        title={t('legalCaseDetails.sessions.title')}
        subtitle={t('legalCaseDetails.sessions.subtitle')}
        addLabel={t('legalCaseDetails.actions.addSession')}
        onAdd={handleAddSession}
      />

      {/* ✅ TableComponent يتعامل مع: loading/error/empty/pagination/search/sort/mobile */}
      <TableComponent
        title={t('legalCaseDetails.sessions.title', { defaultValue: '' }) || undefined}
        data={sessions}
        headers={headers}
        customRenderers={customRenderers}
        isRTL={isRTL}
        itemsPerPage={8}
        loading={loading}
        error={Boolean(error)}
        errorLabel={error || t('legalCaseDetails.sessions.errors.fetch')}
        onRetry={() => onRefresh?.()}
        searchPlaceholder={t('legalCaseDetails.sessions.searchPlaceholder')}
        emptyLabel={t('legalCaseDetails.sessions.empty')}
        retryLabel={t('legalCaseDetails.actions.retry')}
        addLabel={t('legalCaseDetails.actions.addSession')}
        // نخلي زر الإضافة في الهيدر فقط، لذلك نمنع زر الإضافة الداخلي:
        onAdd={undefined}
        renderAddButton={undefined}
        // ✅ نستخدم أزرار الأكشن (عرض/تعديل/حذف) من مكون الجدول
        onView={(id) => {
          const s = sessions.find((x) => String(x.id) === String(id));
          if (s) setSelectedSession(s);
        }}
        onEdit={(id) => {
          const s = sessions.find((x) => String(x.id) === String(id));
          if (s) handleEditSession(s);
        }}
        onDelete={(id) => {
          const s = sessions.find((x) => String(x.id) === String(id));
          if (s) handleDeleteClick(s);
        }}
        // لو عندك Permissions أو ACL، مررها هنا. وإلا اتركها لتظهر الأكشنز.
        permissions={{ view: true, update: true, delete: true, create: true }}
        prevLabel={t('legalCaseDetails.pagination.prev')}
        nextLabel={t('legalCaseDetails.pagination.next')}
        pageLabel={t('legalCaseDetails.pagination.page')}
      />

      {/* تفاصيل الجلسة */}
      {selectedSession && (
        <SessionDetailsModal
          isOpen={!!selectedSession}
          onClose={() => setSelectedSession(null)}
          session={selectedSession}
        />
      )}

      {/* Add/Edit modal */}
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

      {/* Confirm delete */}
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
