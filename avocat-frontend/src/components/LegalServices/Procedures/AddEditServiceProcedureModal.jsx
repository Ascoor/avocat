import React, { useState, useEffect } from 'react';
import {
  createServiceProcedure,
  updateServiceProcedure,
  getServiceTypes,
} from '../../../services/api/services';
import GlobalModal from '../../common/GlobalModal';
import useAuth from '../../auth/AuthUser';
import { useAlert } from '@/contexts/AlertContext';
import { getLawyers } from '../../../services/api/lawyers';
import { getProcedurePlaceTypes } from '../../../services/api/procedures';

const AddEditServiceProcedureModal = ({
  show,
  handleClose,
  procedure,
  isEditing,
  onSaved,
  serviceId,
}) => {
  const { user } = useAuth();
  const { triggerAlert } = useAlert();

  const [formData, setFormData] = useState({
    title: '',
    lawyer_id: '',
    job: '',
    date_start: '',
    date_end: '',
    note: '',
    procedure_place_type_id: '',
    service_type_id: '',
    created_by: user?.id || '',
    updated_by: user?.id || '',
    ...(isEditing && {
      result: '',
      cost1: '',
      cost2: '',
      cost3: '',
      status: 'جارى التنفيذ',
    }),
  });

  const [lawyers, setLawyers] = useState([]);
  const [procedurePlaceTypes, setProcedurePlaceTypes] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show) {
      fetchReferences();
      if (isEditing && procedure) {
        setFormData((prev) => ({
          ...prev,
          title: procedure.title || '',
          lawyer_id: procedure.lawyer_id || '',
          job: procedure.job || '',
          date_start: procedure.date_start || '',
          date_end: procedure.date_end || '',
          note: procedure.note || '',
          procedure_place_type_id: procedure.procedure_place_type_id || '',
          service_type_id: procedure.service_type_id || '',
          ...(isEditing && {
            result: procedure.result || '',
            cost1: procedure.cost1 || '',
            cost2: procedure.cost2 || '',
            cost3: procedure.cost3 || '',
            status: procedure.status || 'جارى التنفيذ',
          }),
          updated_by: user?.id || '',
        }));
      }
    }
  }, [show, isEditing, procedure, user]);

  const fetchReferences = async () => {
    try {
      const [lawyersRes, placesRes, serviceTypesRes] = await Promise.all([
        getLawyers(),
        getProcedurePlaceTypes(),
        getServiceTypes(),
      ]);
      setLawyers(lawyersRes.data);
      setProcedurePlaceTypes(placesRes.data);
      setServiceTypes(serviceTypesRes.data);
    } catch (error) {
      triggerAlert('error', 'حدث خطأ أثناء جلب البيانات.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        service_id: serviceId,
      };

      if (isEditing) {
        await updateServiceProcedure(procedure.id, payload);
        triggerAlert('success', 'تم تعديل الإجراء بنجاح!');
      } else {
        await createServiceProcedure(payload);
        triggerAlert('success', 'تم إضافة الإجراء بنجاح!');
      }

      onSaved();
      handleClose();
    } catch (err) {
      triggerAlert('error', 'حدث خطأ أثناء حفظ الإجراء.');
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <GlobalModal
      isOpen={show}
      onClose={handleClose}
      title={isEditing ? 'تعديل إجراء الخدمة' : 'إضافة إجراء خدمة'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            عنوان الإجراء
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border rounded-md p-2 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            المحامي
          </label>
          <select
            name="lawyer_id"
            value={formData.lawyer_id}
            onChange={handleChange}
            required
            className="w-full border rounded-md p-2 dark:bg-gray-700 dark:text-white"
          >
            <option value="">اختر المحامي</option>
            {lawyers.map((lawyer) => (
              <option key={lawyer.id} value={lawyer.id}>
                {lawyer.name}
              </option>
            ))}
          </select>
        </div>

        {}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              تاريخ البدء
            </label>
            <input
              type="date"
              name="date_start"
              value={formData.date_start}
              onChange={handleChange}
              required
              className="w-full border rounded-md p-2 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              تاريخ الانتهاء
            </label>
            <input
              type="date"
              name="date_end"
              value={formData.date_end}
              onChange={handleChange}
              required
              className="w-full border rounded-md p-2 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        {}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            المهمة
          </label>
          <input
            type="text"
            name="job"
            value={formData.job}
            onChange={handleChange}
            required
            className="w-full border rounded-md p-2 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            الملاحظات
          </label>
          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            className="w-full border rounded-md p-2 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {}
        {isEditing && (
          <>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">
                النتيجة
              </label>
              <input
                type="text"
                name="result"
                value={formData.result}
                onChange={handleChange}
                className="w-full border rounded-md p-2 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </>
        )}

        {}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          {loading
            ? isEditing
              ? 'جاري التحديث...'
              : 'جاري الحفظ...'
            : isEditing
              ? 'تحديث'
              : 'إضافة'}
        </button>
      </form>
    </GlobalModal>
  );
};

export default AddEditServiceProcedureModal;
