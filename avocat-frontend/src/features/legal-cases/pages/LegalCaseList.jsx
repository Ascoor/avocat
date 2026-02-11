import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '@shared/components/common/SectionHeader';
import TableComponent from '@shared/components/common/TableComponent';
import { AiFillCheckCircle, AiFillEye } from 'react-icons/ai';
import { LegCaseIcon } from '@assets/icons';
import { getLegCases } from '@shared/services/api/legalCases';
import api from '@shared/services/api/axiosConfig';
import { useSecurity } from '@shared/security/SecurityContext';
import { canCrud } from '@shared/security/permissions';
import ForbiddenState from '@shared/security/ForbiddenState';

const AddEditLegCase = lazy(() => import('../components/LegalCases/AddEditLegCase'));

const LegalCasesIndex = () => {
  const { permissions } = useSecurity();
  const acl = canCrud(permissions, 'legalCases');
  const [legCases, setLegCases] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingLegCase, setEditingLegCase] = useState(null);

  const fetchLegCases = useCallback(async () => {
    try {
      const res = await getLegCases({ page: 1, sort: JSON.stringify({ createdAt: -1 }) });
      setLegCases(res.data);
    } catch (error) {
      console.error('Error fetching legal cases:', error);
    }
  }, []);

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
    { key: 'actions', text: 'عرض' },
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
    actions: (legCase) => (
      <div className="flex space-x-2">
        <Link to={`show/${legCase.id}`} className="text-orange-400 hover:text-orange-800" title="عرض">
          <AiFillEye size={20} />
        </Link>
      </div>
    ),
  };

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
        data={legCases}
        headers={headers}
        onEdit={acl.update ? ((id) => handleAddEditModal(legCases.find((legCase) => legCase.id === id))) : undefined}
        onDelete={acl.delete ? handleDeleteCase : undefined}
        customRenderers={customRenderers}
        renderAddButton={acl.create ? (() => <button onClick={() => handleAddEditModal()} className="bg-gradient-green-button hover:bg-gradient-green-dark-button text-white px-4 py-2 rounded-lg transition">+ إضافة قضية جديدة</button>) : undefined}
        permissions={acl}
      />
    </div>
  );
};

export default LegalCasesIndex;
