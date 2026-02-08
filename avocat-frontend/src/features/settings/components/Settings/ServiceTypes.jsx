import { useState, useEffect, useCallback } from 'react';
import { useAlert } from '@shared/contexts/AlertContext';
import {
  getServiceTypes,
  createServiceType,
  updateServiceType,
  deleteServiceType,
} from '@shared/services/api/services';
import { FaEdit, FaTrash } from 'react-icons/fa';
import SectionHeader from '@shared/components/common/SectionHeader';
import { ServiceIcon } from '@assets/icons';
import { useLanguage } from '@shared/contexts/LanguageContext';

const ServiceTypes = () => {
  const [serviceTypes, setServiceTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingServiceType, setEditingServiceType] = useState(null);
  const { triggerAlert } = useAlert();
  const { t } = useLanguage();
  const itemsPerPage = 10;

  const fetchServiceTypes = useCallback(async () => {
    try {
      const response = await getServiceTypes();
      setServiceTypes(response.data || []);
    } catch (error) {
      console.error('Error fetching service types:', error);
      triggerAlert('error', t('settings.serviceTypes.alerts.fetchError'));
    }
  }, [triggerAlert, t]);

  useEffect(() => {
    fetchServiceTypes();
  }, [fetchServiceTypes]);

  const handleSaveServiceType = async (formData) => {
    try {
      if (editingServiceType) {
        await updateServiceType(editingServiceType.id, formData);
        triggerAlert('success', t('settings.serviceTypes.alerts.updateSuccess'));
      } else {
        await createServiceType(formData);
        triggerAlert('success', t('settings.serviceTypes.alerts.addSuccess'));
      }
      fetchServiceTypes();
      setShowModal(false);
    } catch (error) {
      console.error('Error saving service type:', error);
      triggerAlert('error', t('settings.serviceTypes.alerts.saveError'));
    }
  };

  const handleDeleteServiceType = async (serviceTypeId) => {
    if (window.confirm(t('settings.serviceTypes.alerts.deleteConfirm'))) {
      try {
        await deleteServiceType(serviceTypeId);
        fetchServiceTypes();
        triggerAlert('success', t('settings.serviceTypes.alerts.deleteSuccess'));
      } catch (error) {
        console.error('Error deleting service type:', error);
        triggerAlert('error', t('settings.serviceTypes.alerts.deleteError'));
      }
    }
  };

  const handleShowModal = (serviceType = null) => {
    setEditingServiceType(serviceType);
    setShowModal(true);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = serviceTypes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(serviceTypes.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="p-6 mt-12 xl:max-w-7xl xl:mx-auto w-full bg-gray-50 dark:bg-gray-900">
      <SectionHeader listName={t('settings.serviceTypes.title')} icon={ServiceIcon} />

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => handleShowModal()}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow-md transition"
        >
          {t('settings.serviceTypes.addButton')}
        </button>
      </div>

      {}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
              {editingServiceType ? t('settings.serviceTypes.editTitle') : t('settings.serviceTypes.addTitle')}
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const data = Object.fromEntries(formData.entries());
                handleSaveServiceType(data);
              }}
            >
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-800 dark:text-gray-300"
                >
                  {t('settings.serviceTypes.nameLabel')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={editingServiceType?.name || ''}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  required
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded"
                >
                  {t('common.cancel')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                >
                  {editingServiceType ? t('settings.serviceTypes.saveChanges') : t('settings.serviceTypes.addAction')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {}
      <div className="overflow-x-auto mt-6 shadow rounded-lg bg-gray-100 dark:bg-gray-800">
        <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100">
                {t('settings.serviceTypes.nameColumn')}
              </th>
              <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100">
                {t('settings.serviceTypes.actionsColumn')}
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((serviceType) => (
              <tr
                key={serviceType.id}
                className="bg-white text-center dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100">
                  {serviceType.name}
                </td>
                <td className="px-4 py-2 border   border-gray-300 dark:border-gray-600">
                  <div className="flex items-center justify-center gap-6">
                    <button
                      onClick={() => handleShowModal(serviceType)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteServiceType(serviceType.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
        >
          {t('settings.serviceTypes.prev')}
        </button>
        <span className="text-gray-800 dark:text-gray-100">
          {t('settings.serviceTypes.pageStatus', { current: currentPage, total: totalPages })}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
        >
          {t('settings.serviceTypes.next')}
        </button>
      </div>
    </div>
  );
};

export default ServiceTypes;
