import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClients } from '../../../store/clientsSlice';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import { ClientSectionIcon } from '../../../assets/icons/index';
import SectionHeader from '../../common/SectionHeader';
import AddEditClient from './AddEditClient';
import TableComponent from '../../common/TableComponent';
import api from '../../../services/api/axiosConfig';

function ClientList() {
  const [selectedClient, setSelectedClient] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();
  const { clients, loading, error } = useSelector((state) => state.clients);
  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/clients/${id}`);
      fetchClients();
    } catch (error) {
      triggerAlert: 'error', 'حدث خطاء';
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const updatedClients = clients.map((client) =>
        client.id === id
          ? {
              ...client,
              status: client.status === 'active' ? 'inactive' : 'active',
            }
          : client,
      );

      dispatch({
        type: 'clients/updateClientStatusInStore',
        payload: { id, status: updatedClients.find((c) => c.id === id).status },
      });
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

  const openAddEditModal = (client = null) => {
    setSelectedClient(client);
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
    status: (client) =>
      client.status === 'active' ? (
        <span
          onClick={() => handleToggleStatus(client.id)}
          className="flex items-center text-green-600 cursor-pointer"
        >
          <AiFillCheckCircle className="mr-1" /> نشط
        </span>
      ) : (
        <span
          onClick={() => handleToggleStatus(client.id)}
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
      إضافة عميل
    </button>
  );

  return (
    <div className="p-6 mt-12 xl:max-w-7xl xl:mx-auto w-full">
      {}
      <SectionHeader
        buttonName="عميل"
        listName="عملاء"
        icon={ClientSectionIcon}
      />

      {}
      {isModalOpen && (
        <AddEditClient
          client={selectedClient}
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSaved={fetchClients}
        />
      )}

      {}
      <TableComponent
        data={clients}
        headers={headers}
        onEdit={(id) =>
          openAddEditModal(clients.find((client) => client.id === id))
        }
        onDelete={handleDelete}
        sectionName="clients"
        customRenderers={customRenderers}
        renderAddButton={renderAddButton}
      />
    </div>
  );
}

export default ClientList;
