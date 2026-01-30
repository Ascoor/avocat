import { useState, useEffect } from 'react';
import { BiMinusCircle, BiPlusCircle } from 'react-icons/bi';
import {
  addLegalCaseClients,
  removeLegalCaseClient,
} from '../../../services/api/legalCases';
import { getClients } from '../../../services/api/clients';
import { useAlert } from '@/contexts/AlertContext';
import GlobalConfirmDeleteModal from '../../common/GlobalConfirmDeleteModal';

export default function LegalCaseClients({
  legCaseId,
  fetchLegcaseClients,
  legcaseClients,
}) {
  const { triggerAlert } = useAlert();
  const [clientsData, setClientsData] = useState([]);
  const [clients, setClients] = useState([]);
  const [legCaseNewClients, setLegCaseNewClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredClients, setFilteredClients] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 5;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState({ id: null, name: '' });

  const openDeleteModal = (clientId, clientName) => {
    setClientToDelete({ id: clientId, name: clientName });
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setClientToDelete({ id: null, name: '' });
  };

  const handleDeleteClient = async () => {
    if (!clientToDelete.id) return;

    try {
      await removeLegalCaseClient(legCaseId, clientToDelete.id);
      triggerAlert('success', 'تم حذف الموكل بنجاح.');
      fetchLegcaseClients();
    } catch (error) {
      triggerAlert('error', 'حدث خطأ أثناء حذف الموكل.');
    } finally {
      closeDeleteModal();
    }
  };

  const fetchData = async () => {
    try {
      const clientsResponse = await getClients();
      const fetchedClients = clientsResponse.data.clients;
      setClientsData(Array.isArray(fetchedClients) ? fetchedClients : []);
      setClients(Array.isArray(fetchedClients) ? fetchedClients : []);
    } catch (error) {
      triggerAlert('error', 'حدث خطأ أثناء جلب بيانات العملاء.');
      setClients([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [legCaseId]);

  useEffect(() => {
    if (searchQuery && Array.isArray(clients)) {
      const results = clients
        .filter((client) =>
          client.name.toLowerCase().includes(searchQuery.toLowerCase()),
        )
        .slice(0, 5);
      setFilteredClients(results);
    } else {
      setFilteredClients([]);
    }
  }, [searchQuery, clients]);

  const handleAddNewClient = () => {
    setLegCaseNewClients((prevClients) => [
      ...prevClients,
      { client_id: '', name: '' },
    ]);
  };

  const handleRemoveNewClient = (index) => {
    setLegCaseNewClients((prevClients) =>
      prevClients.filter((_, i) => i !== index),
    );
  };

  const handleNewClientChange = (e, index) => {
    const updatedClients = [...legCaseNewClients];
    updatedClients[index].name = e.target.value;
    setLegCaseNewClients(updatedClients);
    setSearchQuery(e.target.value);
    setActiveIndex(index);
  };

  const handleSelectClient = (client, index) => {
    if (
      legcaseClients.some((existingClient) => existingClient.id === client.id)
    ) {
      triggerAlert('error', 'هذا الموكل مضاف بالفعل.');
      return;
    }
    const updatedClients = [...legCaseNewClients];
    updatedClients[index] = { client_id: client.id, name: client.name };
    setLegCaseNewClients(updatedClients);
    setSearchQuery('');
    setActiveIndex(null);
  };

  const handleAddLegCaseClients = async () => {
    const validClients = legCaseNewClients.filter((client) => client.client_id);

    if (validClients.length === 0) {
      triggerAlert('error', 'يجب اختيار موكل قبل الإضافة.');
      return;
    }

    try {
      await addLegalCaseClients(legCaseId, validClients);
      triggerAlert('success', 'تمت إضافة الموكلين بنجاح.');
      setLegCaseNewClients([]);
      fetchLegcaseClients();
    } catch (error) {
      triggerAlert('error', 'حدث خطأ أثناء إضافة الموكلين.');
    }
  };

  const handleRemoveClient = async (clientId) => {
    try {
      await removeLegalCaseClient(legCaseId, clientId);
      triggerAlert('success', 'تم حذف الموكل بنجاح.');
      fetchLegcaseClients();
    } catch (error) {
      triggerAlert('error', 'حدث خطأ أثناء حذف الموكل.');
    }
  };

  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = legcaseClients.slice(
    indexOfFirstClient,
    indexOfLastClient,
  );
  const totalPages = Math.ceil(legcaseClients.length / clientsPerPage);

  return (
    <div className="container mx-auto p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold text-avocat-indigo-dark dark:text-avocat-orange mb-6 text-center">
        بيانات الموكل
      </h3>

      {}
      <div className="mb-6">
        <button
          onClick={handleAddNewClient}
          className="flex items-center bg-blue-600   hover:bg-blue-700   text-white px-4 py-2 rounded shadow-md transition duration-300"
        >
          إضافة موكل <BiPlusCircle className="ml-2" />
        </button>

        {legCaseNewClients.map((client, index) => (
          <div key={index} className="mt-4">
            <input
              type="text"
              value={client.name}
              onChange={(e) => handleNewClientChange(e, index)}
              placeholder="ابحث عن الموكل"
              className="w-full p-2 border rounded-lg focus:ring focus:ring-violet-400 dark:bg-gray-100 dark:text-gray-800"
            />
            {activeIndex === index && filteredClients.length > 0 && (
              <ul className="mt-2 bg-white dark:bg-gradient-night dark:text-white border rounded-lg shadow-lg">
                {filteredClients.map((filteredClient) => (
                  <li
                    key={filteredClient.id}
                    onClick={() => handleSelectClient(filteredClient, index)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                  >
                    {filteredClient.name}
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={() => handleRemoveNewClient(index)}
              className="mt-2 flex items-center text-red-500 hover:text-red-600"
            >
              <BiMinusCircle className="mr-1" /> إزالة
            </button>
          </div>
        ))}

        {legCaseNewClients.length > 0 && (
          <button
            onClick={handleAddLegCaseClients}
            className="mt-4   bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 shadow-lg transition duration-300"
          >
            إضافة الموكلين
          </button>
        )}
      </div>

      {}
      <div className="overflow-auto mt-4">
        <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300 border-collapse">
          <thead className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
            <tr>
              <th className="px-4 py-2">رقم المكتب</th>
              <th className="px-4 py-2">اسم الموكل</th>
              <th className="px-4 py-2">رقم الهاتف</th>
              <th className="px-4 py-2 text-center">إجراء</th>
            </tr>
          </thead>
          <tbody>
            {currentClients.map((client) => (
              <tr
                key={client.id}
                className="hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <td className="px-4 py-2 font-semibold">{client.slug}</td>
                <td className="px-4 py-2">{client.name}</td>
                <td className="px-4 py-2">
                  {client.phone_number || 'غير متوفر'}
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => openDeleteModal(client.id, client.name)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow-md transition duration-300"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
            >
              السابق
            </button>

            <span className="mx-4">
              صفحة {currentPage} من {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
            >
              التالي
            </button>
          </div>
        )}
      </div>
      <GlobalConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteClient}
        itemName={clientToDelete.name}
      />
    </div>
  );
}
