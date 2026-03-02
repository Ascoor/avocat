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
import PermissionGuard from '@shared/security/PermissionGuard';
import { permissionMap } from '@shared/security/permission-map';
import { canAccessCase, canAccessOffice } from '@shared/security/abac';
import { useLanguage } from '@shared/contexts/LanguageContext';

const AddEditLegCase = lazy(() => import('../components/LegalCases/AddEditLegCase'));
const extractLegCasesPayload = (response) => {
  const body = response?.data;

  if (Array.isArray(body)) return body;
  if (Array.isArray(body?.data)) return body.data;
  if (Array.isArray(body?.data?.data)) return body.data.data;

  return [];
};

const LegalCasesIndex = () => {
  const { permissions, user, roles } = useSecurity();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const acl = canCrud(permissions, 'legalCases'); 
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingLegCase, setEditingLegCase] = useState(null);
  const [legCases, setLegCases] = useState([]);
  const [meta, setMeta] = useState(null);
   
  const accessUser = useMemo(() => ({
    id: user?.id || '',
    officeId: user?.officeId ?? user?.office_id,
    roleNames: roles.map((role) => role.name),
    lawyerId: user?.lawyerId ?? user?.lawyer_id,
    teamLawyerIds: user?.teamLawyerIds ?? user?.team_lawyer_ids,
  }), [user, roles]);

  const visibleCases = useMemo(
    () => legCases.filter((legCase) => canAccessCase(accessUser, {
      officeId: legCase.office_id ?? legCase.officeId,
      assignedLawyerId: legCase.assigned_lawyer_id ?? legCase.lawyer_id ?? legCase.assignedLawyerId,
      teamLawyerIds: legCase.team_lawyer_ids ?? legCase.teamLawyerIds,
    }) && canAccessOffice(accessUser, legCase.office_id ?? legCase.officeId)),
    [legCases, accessUser],
  );
  const fetchLegCases = useCallback(async () => {
    try { 
      const cached = sessionStorage.getItem('legcases_list_cache'); 
  
  const allCases = [];
  let cursor = null;
  let pageCount = 0;

  do {
    const res = await getLegCases({ cursor: cursor || undefined });

    const chunk = extractLegCasesPayload(res);
    allCases.push(...chunk);
    cursor = res?.data?.next_cursor ?? null;
    pageCount += 1;
  } while (cursor && pageCount < 100);

  setLegCases(allCases);
  sessionStorage.setItem('legcases_list_cache', JSON.stringify(allCases));
} catch (fetchError) {
  console.error('Error fetching legal cases:', fetchError); 
} finally { 
}
}, [t]);

useEffect(() => { fetchLegCases(); }, [fetchLegCases]);

  const handleAddEditModal = (legCase = null) => {
    setEditingLegCase(legCase);
    setIsEditing(Boolean(legCase));
    setShowModal(true);
  };

  const handleDeleteCase = async (id) => {
    if (!window.confirm('هل أنت متأكد من حذف هذه القضية؟')) return;
    try {
      await api.delete(`/legal-cases/${id}`);
      fetchLegCases();
    } catch (error) {
      console.error('Error deleting legal case:', error);
    }
  };

  const headers = [
    { key: 'slug', text: 'رقم الملف' },
    { key: 'clients', text: 'الموكل' },
    { key: 'client_capacity', text: 'صفة الموكل' },
    { key: 'title', text: 'الموضوع' },
    { key: 'case_sub_type', text: 'نوع القضية' },
    { key: 'status', text: 'الحالة' },
  ];

  const statusColors = {
    'جارى التنفيذ': 'text-yellow-500',
    'قيد التنفيذ': 'text-orange-500',
    منتهية: 'text-green-600',
    متداولة: 'text-blue-500',
    استيفاء: 'text-purple-500',
  };

  const customRenderers = {
    case_sub_type: (legCase) => legCase.case_sub_type?.name || 'غير محدد',
    clients: (legCase) => {
      if (!legCase.clients || legCase.clients.length === 0) return <span className="text-gray-800">لا يوجد موكل</span>;
      const firstClient = legCase.clients[0]?.name;
      const remainingCount = legCase.clients.length - 1;
      return <div className="flex flex-col items-center">{firstClient}{remainingCount > 0 && <span className="text-red-600 text-xs mt-1">و {remainingCount} آخرين</span>}</div>;
    },
    status: (legCase) => {
      const statusText = legCase.status || 'غير محدد';
      return <span className={`flex items-center ${statusColors[statusText] || 'text-gray-400'}`}><AiFillCheckCircle className="mr-1" /> {statusText}</span>;
    },
  };

  const actionColumns = useMemo(() => [
    {
      key: 'view',
      header: t('common.view'),
      icon: 'view',
      width: 84,
      onClick: (_row, id) => navigate(`show/${id}`),
      isVisible: () => acl.view,
      tooltip: t('common.view'),
    },
    {
      key: 'edit',
      header: t('common.edit'),
      icon: 'edit',
      width: 84,
      onClick: (row) => handleAddEditModal(row),
      isVisible: () => acl.update,
      tooltip: t('common.edit'),
    },
    {
      key: 'delete',
      header: t('common.delete'),
      icon: 'trash',
      width: 84,
      danger: true,
      onClick: (_row, id) => handleDeleteCase(id),
      isVisible: () => acl.delete,
      tooltip: t('common.delete'),
    },
  ], [acl.delete, acl.update, acl.view, navigate, t]);

  if (!acl.view) return <ForbiddenState moduleLabel="Legal Cases" />;

  return (
    <div className="p-6 mt-12 w-full">
      <SectionHeader listName="القضايا" icon={LegCaseIcon} />
      {showModal && (
        <Suspense fallback={<div className="text-center text-gray-500">جار التحميل...</div>}>
          <AddEditLegCase isEditing={isEditing} editingLegCase={editingLegCase} onClose={() => setShowModal(false)} fetchLegCases={fetchLegCases} />
        </Suspense>
      )}

      <TableComponent
        data={visibleCases}
        headers={headers}
        actionColumns={actionColumns}
        customRenderers={customRenderers}
        renderAddButton={acl.create ? (() => (
          <PermissionGuard permissions={permissionMap.legalCases.create} fallback={null}>
            <button onClick={() => handleAddEditModal()} className="bg-gradient-green-button hover:bg-gradient-green-dark-button text-white px-4 py-2 rounded-lg transition">+ إضافة قضية جديدة</button>
          </PermissionGuard>
        )) : undefined}
        permissions={acl}
      />
    </div>
  );
};

export default LegalCasesIndex;
