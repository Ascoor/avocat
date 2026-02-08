import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { getServices, deleteService } from '@shared/services/api/services';
import SectionHeader from '@shared/components/common/SectionHeader';
import { ServiceSection } from '@assets/icons/index';
import TableComponent from '@shared/components/common/TableComponent';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import GlobalConfirmDeleteModal from '@shared/components/common/GlobalConfirmDeleteModal';
import { useAlert } from '@shared/contexts/AlertContext';

const AddEditServiceModal = lazy(
  () => import('../components/LegalServices/AddEditServiceModal'),
);

const LegalServiceList = () => {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const { triggerAlert } = useAlert();
  const [isViewing, setIsViewing] = useState(false);

  const fetchServices = useCallback(async () => {
    try {
      const response = await getServices();
      setServices(response.data.services);
    } catch (error) {
      console.error('❌ خطأ أثناء جلب الخدمات:', error);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleAddService = () => {
    setEditingService(null);
    setShowModal(true);
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setShowModal(true);
  };
  const handleDeleteService = (service) => {
    setServiceToDelete(service);
    setConfirmDelete(true);
  };

  const openViewModal = (service) => {
    setEditingService(service);
    setIsViewing(true);
    setShowModal(true);
  };

  const confirmDeleteService = async () => {
    if (!serviceToDelete || !serviceToDelete.id) {
      triggerAlert('error', 'لم يتم تحديد الخدمة للحذف');
      return;
    }

    try {
      await deleteService(serviceToDelete.id);
      triggerAlert('success', `تم حذف الخدمة   بنجاح`);

      setServices((prev) => prev.filter((s) => s.id !== serviceToDelete.id));
    } catch (error) {
      triggerAlert('error', 'حدث خطأ أثناء حذف الخدمة');
    } finally {
      setConfirmDelete(false);
      setServiceToDelete(null);
    }
  };

  const tableHeaders = [
    { key: 'slug', text: 'رقم الخدمة' },
    { key: 'service_type', text: 'نوع الخدمة' },
    { key: 'service_place_name', text: 'مكان الخدمة' },
    { key: 'description', text: 'الوصف' },
    { key: 'status', text: 'الحالة' },
  ];

  const statusColors = {
    'جارى التنفيذ': 'text-yellow-500',
    'قيد التنفيذ': 'text-orange-500',
    منتهية: 'text-green-600',
    متداولة: 'text-blue-500',
    استيفاء: 'text-purple-500',
  };

  const statusIcons = {
    'جارى التنفيذ': <AiFillCheckCircle className="mr-1" />,
    'قيد التنفيذ': <AiFillCheckCircle className="mr-1" />,
    منتهية: <AiFillCheckCircle className="mr-1" />,
    متداولة: <AiFillCheckCircle className="mr-1" />,
    استيفاء: <AiFillCheckCircle className="mr-1" />,
  };

  const customRenderers = {
    service_type: (service) =>
      service.service_type?.name ? (
        <span className="text-avocat-indigo-light dark:text-avocat-orange font-medium">
          {service.service_type.name}
        </span>
      ) : (
        <span className="text-gray-400 italic">غير محدد</span>
      ),

    status: (service) => {
      const statusText = service.status || 'غير محدد';
      const textColor = statusColors[statusText] || 'text-gray-400';
      const statusIcon = statusIcons[statusText] || null;

      return (
        <span className={`flex items-center ${textColor}`}>
          {statusIcon} {statusText}
        </span>
      );
    },
  };

  return (
    <div className="p-6 mt-12 xl:max-w-7xl xl:mx-auto w-full">
      <SectionHeader listName="الخدمات" icon={ServiceSection} />

      {}
      {showModal && (
        <Suspense
          fallback={
            <div className="text-center text-gray-500">جار التحميل...</div>
          }
        >
          <AddEditServiceModal
            show={showModal}
            handleClose={() => {
              setShowModal(false);
              setIsViewing(false);
              fetchServices();
            }}
            service={editingService || null}
            isEditing={!!editingService && !isViewing}
            isViewing={isViewing}
            onSaved={fetchServices}
          />
        </Suspense>
      )}

      {}
      {confirmDelete && (
        <GlobalConfirmDeleteModal
          isOpen={confirmDelete}
          onClose={() => setConfirmDelete(false)}
          onConfirm={confirmDeleteService}
          itemName={
            serviceToDelete?.service_type?.name ||
            serviceToDelete?.slug ||
            'الخدمة'
          }
        />
      )}

      {}
      <TableComponent
        data={services}
        headers={tableHeaders}
        onEdit={(id) => {
          setIsViewing(false);
          handleEditService(services.find((service) => service.id === id));
        }}
        onDelete={handleDeleteService}
        onView={(id) =>
          openViewModal(services.find((service) => service.id === id))
        }
        customRenderers={customRenderers}
        renderAddButton={() => (
          <button
            onClick={handleAddService}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow-md transition duration-300"
          >
            إضافة خدمة
          </button>
        )}
      />
    </div>
  );
};

export default LegalServiceList;
