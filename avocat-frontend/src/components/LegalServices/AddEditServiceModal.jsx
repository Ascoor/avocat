import { useState, useEffect, useCallback } from 'react';
import GlobalModal from '../common/GlobalModal';
import {
  createService,
  updateService,
  getServiceTypes,
} from '../../services/api/services';
import { getClients, getUnClients } from '../../services/api/clients';
import useAuth from '../auth/AuthUser';
import { useAlert } from '@/contexts/AlertContext';

const AddEditServiceModal = ({
  show,
  handleClose,
  service,
  isEditing,
  isViewing,
  onSaved,
}) => {
  const { user } = useAuth();
  const { triggerAlert } = useAlert();

  const [formData, setFormData] = useState({
    slug: '',
    service_type_id: '',
    description: '',
    service_place_name: '',
    service_year: '',
    client_id: '',
    unclient_id: '',
    created_by: user?.id || '',
    updated_by: user?.id || '',
    status: 'جاري التنفيذ',
  });

  const [serviceTypes, setServiceTypes] = useState([]);
  const [clients, setClients] = useState([]);
  const [unclients, setUnclients] = useState([]);
  const [selectedUserType, setSelectedUserType] = useState('client');
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const [serviceTypesRes, clientsRes, unclientsRes] = await Promise.all([
        getServiceTypes(),
        getClients(),
        getUnClients(),
      ]);
      setServiceTypes(serviceTypesRes.data);
      setClients(clientsRes.data.clients);
      setUnclients(unclientsRes.data.unclients);
    } catch (error) {
      triggerAlert('error', 'خطاء في جلب البيانات');
    }
  }, []);

  useEffect(() => {
    if (show) {
      fetchData();
      if ((isEditing || isViewing) && service) {
        setFormData({
          slug: service.slug || '',
          service_type_id: service.service_type_id || '',
          description: service.description || '',
          service_place_name: service.service_place_name || '',
          service_year: service.service_year || '',
          status: service.status || '',
          updated_by: user?.id || '',
          client_id: service.clients?.[0]?.id || '',
          unclient_id: service.unclients?.[0]?.id || '',
        });

        setSelectedUserType(
          service.clients?.length > 0 ? 'client' : 'unclient',
        );
      }
    }
  }, [show, fetchData, isEditing, isViewing, service, user]);

  const handleUserTypeChange = (e) => {
    const userType = e.target.value;
    setSelectedUserType(userType);
    setFormData((prev) => ({
      ...prev,
      client_id: userType === 'client' ? '' : null,
      unclient_id: userType === 'unclient' ? '' : null,
    }));
  };

  const handleChange = (e) => {
    if (!isViewing) {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isViewing) return;
    setLoading(true);

    try {
      const payload = {
        ...formData,
        client_id: selectedUserType === 'client' ? formData.client_id : null,
        unclient_id:
          selectedUserType === 'unclient' ? formData.unclient_id : null,
      };

      if (isEditing) {
        await updateService(service.id, payload);
        triggerAlert('success', 'تم تعديل الخدمة بنجاح!');
      } else {
        await createService(payload);
        triggerAlert('success', 'تم اضافة الخدمة بنجاح!');
      }

      onSaved();
      handleClose();
    } catch (err) {
      triggerAlert('error', 'خطاء في حفظ الخدمة');
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <GlobalModal
      isOpen={show}
      onClose={handleClose}
      title={
        isViewing ? 'عرض الخدمة' : isEditing ? 'تعديل الخدمة' : 'إضافة خدمة'
      }
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 ">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            رقم الخدمة
          </label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            readOnly={isViewing}
            className="w-full border rounded-md p-2 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            الوصف
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            readOnly={isViewing}
            className="w-full border rounded-md p-2 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            نوع الخدمة
          </label>
          <select
            name="service_type_id"
            value={formData.service_type_id}
            onChange={handleChange}
            readOnly={isViewing}
            className="w-full border rounded-md p-2 dark:bg-gray-700 dark:text-white"
            required
          >
            <option value="">اختر نوع الخدمة</option>
            {serviceTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            مكان الخدمة
          </label>
          <input
            type="text"
            name="service_place_name"
            value={formData.service_place_name}
            onChange={handleChange}
            readOnly={isViewing}
            className="w-full border rounded-md p-2 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            سنة الخدمة
          </label>
          <input
            type="text"
            name="service_year"
            value={formData.service_year}
            onChange={handleChange}
            readOnly={isViewing}
            className="w-full border rounded-md p-2 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            نوع المستخدم
          </label>
          <select
            value={selectedUserType}
            onChange={handleUserTypeChange}
            readOnly={isViewing}
            className="w-full border rounded-md p-2 dark:bg-gray-700 dark:text-white"
          >
            <option value="client">عميل مسجل</option>
            <option value="unclient">عميل غير مسجل</option>
          </select>
        </div>
        {selectedUserType === 'client' && (
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              اختر العميل
            </label>
            <select
              name="client_id"
              value={formData.client_id}
              onChange={handleChange}
              readOnly={isViewing}
              className="w-full border rounded-md p-2 dark:bg-gray-700 dark:text-white"
            >
              <option value="">اختر العميل</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>
        )}
        {selectedUserType === 'unclient' && (
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              اختر العميل غير المسجل
            </label>
            <select
              name="unclient_id"
              value={formData.unclient_id}
              onChange={handleChange}
              readOnly={isViewing}
              className="w-full border rounded-md p-2 dark:bg-gray-700 dark:text-white"
            >
              <option value="">اختر العميل</option>
              {unclients.map((unclient) => (
                <option key={unclient.id} value={unclient.id}>
                  {unclient.name}
                </option>
              ))}
            </select>
          </div>
        )}
        {(isEditing || isViewing) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              حالة الخدمة
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              disabled={isViewing}
              className="w-full px-4 py-3 rounded-lg border bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
              required
            >
              <option value="جاري التنفيذ">جاري التنفيذ</option>
              <option value="قيد التنفيذ">قيد التنفيذ</option>
              <option value="منتهية">منتهية</option>
              <option value="متداولة">متداولة</option>
              <option value="استيفاء">استيفاء</option>
            </select>
          </div>
        )}

        {!isViewing && (
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {loading ? 'جاري الحفظ...' : isEditing ? 'تحديث' : 'إضافة'}
          </button>
        )}
      </form>
    </GlobalModal>
  );
};

export default AddEditServiceModal;
