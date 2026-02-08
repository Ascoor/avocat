import React, { useState, useEffect, useCallback } from 'react';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
 
import AddEditUnclient from './AddEditUnclient';
import TableComponent from '@shared/components/common/TableComponent';
import api from '@shared/services/api/axiosConfig';
import GlobalConfirmDeleteModal from '@shared/components/common/GlobalConfirmDeleteModal';

function UnClientList() {
  const [unclients, setUnunclients] = useState([]);
  const [selectedUnclient, setSelectedUnclient] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [unclientToDelete, setUnclientToDelete] = useState(null);
  const fetchUnunclients = useCallback(async () => {
    try {
      const response = await api.get('/unclients');
      setUnunclients(response.data.unclients || []);
    } catch (error) {
      console.error('Error fetching unclients:', error);
    }
  }, []);

  useEffect(() => {
    fetchUnunclients();
  }, [fetchUnunclients]);

  const handleDelete = async () => {
    if (!unclientToDelete) return;

    try {
      await api.delete(`/unclients/${unclientToDelete.id}`);
      fetchUnunclients();
      setDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting unclient:', error);
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const unclient = unclients.find((c) => c.id === id);
      const newStatus = unclient.status === 'active' ? 'inactive' : 'active';
      await api.put(`/unclients/${id}`, {
        status: newStatus,
      });
      fetchUnunclients();
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

  const openAddEditModal = (unclient = null) => {
    setSelectedUnclient(unclient);
    setModalOpen(true);
  };

  const headers = [
    { key: 'slug', text: 'الرمز' },
    { key: 'name', text: 'الاسم' },
    { key: 'identity_number', text: 'رقم الهوية' },
    { key: 'address', text: 'العنوان' },
    { key: 'phone_number', text: 'رقم الهاتف' },
    { key: 'status', text: 'الحالة' },
  ];

  const customRenderers = {
    status: (unclient) =>
      unclient.status === 'active' ? (
        <span
          onClick={() => handleToggleStatus(unclient.id)}
          className="flex items-center text-green-600 cursor-pointer"
        >
          <AiFillCheckCircle className="mr-1" /> نشط
        </span>
      ) : (
        <span
          onClick={() => handleToggleStatus(unclient.id)}
          className="flex items-center text-red-600 cursor-pointer"
        >
          <AiFillCloseCircle className="mr-1" /> غير نشط
        </span>
      ),
  };

  const renderAddButton = () => (
    <button
      onClick={() => openAddEditModal()}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md transition duration-300"
    >
      إضافة عميل بدون وكالة
    </button>
  );

  const openDeleteModal = (unclient) => {
    setUnclientToDelete(unclient);
    setDeleteModalOpen(true);
  };

  return (
    <div className="p-6 mt-12 xl:max-w-7xl xl:mx-auto w-full " dir="rtl">
      {}
      
      {isModalOpen && (
        <AddEditUnclient
          unclient={selectedUnclient}
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSaved={fetchUnunclients}
        />
      )}

      {}
      {isDeleteModalOpen && (
        <GlobalConfirmDeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDelete}
          itemName={unclientToDelete?.name || 'هذا العميل'}
        />
      )}

      {}
      <TableComponent
        data={unclients}
        headers={headers}
        onEdit={(id) =>
          openAddEditModal(unclients.find((unclient) => unclient.id === id))
        }
        onDelete={(id) =>
          openDeleteModal(unclients.find((unclient) => unclient.id === id))
        }
        sectionName="unclients"
        customRenderers={customRenderers}
        renderAddButton={renderAddButton}
      />
    </div>
  );
}

export default UnClientList;
