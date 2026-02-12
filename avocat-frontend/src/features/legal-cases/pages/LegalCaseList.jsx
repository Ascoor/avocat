import { useState, useEffect, useCallback, lazy, Suspense, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionHeader from '@shared/components/common/SectionHeader';
import TableComponent from '@shared/components/common/TableComponent';
import { AiFillCheckCircle } from 'react-icons/ai';
import { LegCaseIcon } from '@assets/icons';
import { getLegCases } from '@shared/services/api/legalCases';
import api from '@shared/services/api/axiosConfig';
import { useSecurity } from '@shared/security/SecurityContext';
import { canCrud } from '@shared/security/permissions';
import ForbiddenState from '@shared/security/ForbiddenState';
import { useLanguage } from '@shared/contexts/LanguageContext';

const AddEditLegCase = lazy(() => import('../components/LegalCases/AddEditLegCase'));

const LegalCasesIndex = () => {
  const navigate = useNavigate();
  const { isRTL } = useLanguage();
  const { permissions } = useSecurity();
  const acl = canCrud(permissions, 'legalCases');

  const [legCases, setLegCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingLegCase, setEditingLegCase] = useState(null);

  const fetchLegCases = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getLegCases({ page: 1, sort: JSON.stringify({ createdAt: -1 }) });
      setLegCases(Array.isArray(res?.data) ? res.data : []);
    } catch (fetchError) {
      console.error('Error fetching legal cases:', fetchError);
      setLegCases([]);
      setError('تعذر تحميل القضايا. حاول مرة أخرى.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLegCases();
  }, [fetchLegCases]);

  const handleAddEditModal = useCallback((legCase = null) => {
    setEditingLegCase(legCase);
    setIsEditing(Boolean(legCase));
    setShowModal(true);
  }, []);

  const handleDeleteCase = useCallback(
    async (id) => {
      if (!window.confirm('هل أنت متأكد من حذف هذه القضية؟')) return;
      try {
        await api.delete(`/legal-cases/${id}`);
        fetchLegCases();
      } catch (deleteError) {
        console.error('Error deleting legal case:', deleteError);
      }
    },
    [fetchLegCases],
  );

  const headers = useMemo(
    () => [
      { key: 'slug', text: 'رقم الملف', align: 'start' },
      {
        key: 'clients',
        text: 'الموكل',
        align: 'start',
        getValue: (legCase) => legCase?.clients?.[0]?.name || 'لا يوجد موكل',
      },
      { key: 'client_capacity', text: 'صفة الموكل', align: 'start' },
      { key: 'title', text: 'الموضوع', align: 'start' },
      {
        key: 'case_sub_type',
        text: 'نوع القضية',
        align: 'start',
        getValue: (legCase) => legCase?.case_sub_type?.name || 'غير محدد',
      },
      { key: 'status', text: 'الحالة', align: 'start' },
    ],
    [],
  );

  const statusColors = {
    'جارى التنفيذ': 'text-yellow-600',
    'قيد التنفيذ': 'text-orange-500',
    منتهية: 'text-emerald-600',
    متداولة: 'text-blue-500',
    استيفاء: 'text-purple-500',
  };

  const customRenderers = useMemo(
    () => ({
      clients: (legCase) => {
        if (!legCase.clients || legCase.clients.length === 0) {
          return <span className="text-muted-foreground">لا يوجد موكل</span>;
        }
        const firstClient = legCase.clients[0]?.name;
        const remainingCount = legCase.clients.length - 1;

        return (
          <div className={`flex flex-col ${isRTL ? 'items-end text-right' : 'items-start text-left'}`}>
            <span className="text-foreground">{firstClient}</span>
            {remainingCount > 0 && (
              <span className="mt-1 text-xs font-semibold text-primary">و {remainingCount} آخرين</span>
            )}
          </div>
        );
      },
      status: (legCase) => {
        const statusText = legCase.status || 'غير محدد';
        return (
          <span className={`inline-flex items-center gap-1.5 ${statusColors[statusText] || 'text-muted-foreground'}`}>
            <AiFillCheckCircle className="shrink-0" />
            <span>{statusText}</span>
          </span>
        );
      },
    }),
    [isRTL],
  );

  if (!acl.view) return <ForbiddenState moduleLabel="Legal Cases" />;

  return (
    <div className="mt-12 w-full p-6">
      <SectionHeader listName="القضايا" icon={LegCaseIcon} />

      {showModal && (
        <Suspense fallback={<div className="text-center text-gray-500">جار التحميل...</div>}>
          <AddEditLegCase
            isEditing={isEditing}
            editingLegCase={editingLegCase}
            onClose={() => setShowModal(false)}
            fetchLegCases={fetchLegCases}
          />
        </Suspense>
      )}

      <TableComponent
        title="قائمة القضايا"
        data={legCases}
        headers={headers}
        customRenderers={customRenderers}
        loading={loading}
        error={Boolean(error)}
        errorLabel={error}
        onRetry={fetchLegCases}
        isRTL={isRTL}
        actionsMode="separate"
        onView={(id) => navigate(`/dashboard/legcases/show/${id}`)}
        onEdit={acl.update ? ((id) => handleAddEditModal(legCases.find((legCase) => legCase.id === id))) : undefined}
        onDelete={acl.delete ? handleDeleteCase : undefined}
        renderAddButton={
          acl.create
            ? () => (
                <button
                  onClick={() => handleAddEditModal()}
                  className="pressable rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
                >
                  + إضافة قضية جديدة
                </button>
              )
            : undefined
        }
        searchPlaceholder="ابحث في القضايا..."
        emptyLabel="لا توجد قضايا حتى الآن"
        permissions={acl}
      />
    </div>
  );
};

export default LegalCasesIndex;
