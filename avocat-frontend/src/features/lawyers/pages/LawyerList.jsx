import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import {
  getLawyers,
  createLawyer,
  updateLawyer,
  deleteLawyer,
} from '@shared/services/api/lawyers';
import { FaEdit, FaTrash } from 'react-icons/fa';
import SectionHeader from '@shared/components/common/SectionHeader';
import TableComponent from '@shared/components/common/TableComponent';
import GlobalModal from '@shared/components/common/GlobalModal';

const LawyerAddEdit = lazy(() => import('../components/Lawyers/lawyerAddEdit'));

const Lawyers = () => {
  const [lawyers, setLawyers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingLawyer, setEditingLawyer] = useState(null);

  const fetchLawyers = useCallback(async () => {
    try {
      const response = await getLawyers();
      setLawyers(response.data);
    } catch (error) {
      console.error('❌ Error fetching lawyers:', error);
    }
  }, []);

  useEffect(() => {
    fetchLawyers();
  }, [fetchLawyers]);

  const handleLawyerSubmit = async (formData) => {
    try {
      if (editingLawyer) {
        await updateLawyer(editingLawyer.id, formData);
      } else {
        await createLawyer(formData);
      }
      fetchLawyers();
      setShowModal(false);
    } catch (error) {
      console.error('❌ Error saving lawyer data:', error);
    }
  };

  const handleDeleteLawyer = async (lawyerId) => {
    try {
      await deleteLawyer(lawyerId);
      fetchLawyers();
    } catch (error) {
      console.error('❌ Error deleting lawyer:', error);
    }
  };

  const handleShowEditModal = (lawyer) => {
    setEditingLawyer(lawyer);
    setShowModal(true);
  };

  const headers = [
    { key: 'name', text: 'الاسم' },
    { key: 'birthdate', text: 'تاريخ الميلاد' },
    { key: 'identity_number', text: 'رقم الهوية' },
    { key: 'law_reg_num', text: 'رقم تسجيل المحاماة' },
    { key: 'lawyer_class', text: 'فئة المحامي' },
    { key: 'email', text: 'البريد الإلكتروني' },
    { key: 'phone_number', text: 'رقم الهاتف' },
  ];

  const customRenderers = {
    actions: (lawyer) => (
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleShowEditModal(lawyer)}
          className="text-blue-500 hover:text-blue-700 transition-all duration-200"
        >
          <FaEdit />
        </button>
        <button
          onClick={() => handleDeleteLawyer(lawyer.id)}
          className="text-red-500 hover:text-red-700 transition-all duration-200"
        >
          <FaTrash />
        </button>
      </div>
    ),
  };

  return (
    <div className="p-6 mt-12 xl:max-w-7xl xl:mx-auto w-full">
      <SectionHeader
        sectionKey="lawyers"
        showBack={false}
        onPrimaryAction={() => {
          setEditingLawyer(null);
          setShowModal(true);
        }}
      />

      <TableComponent
        data={lawyers}
        headers={headers}
        customRenderers={customRenderers}
        onEdit={handleShowEditModal}
        onDelete={handleDeleteLawyer}
        sectionName="lawyers"
        onAdd={() => {
          setEditingLawyer(null);
          setShowModal(true);
        }}
        addLabel="إضافة محامي"
      />

      {}
      {showModal && (
        <GlobalModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={editingLawyer ? 'تعديل محامي' : 'إضافة محامي'}
        >
          <Suspense fallback={<p>جاري التحميل...</p>}>
            <LawyerAddEdit
              onSubmit={handleLawyerSubmit}
              initialValues={editingLawyer}
            />
          </Suspense>
        </GlobalModal>
      )}
    </div>
  );
};

export default Lawyers;
