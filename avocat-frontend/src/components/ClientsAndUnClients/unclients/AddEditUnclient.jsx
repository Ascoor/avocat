import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useAlert } from '@/contexts/AlertContext';
import api from '../../../services/api/axiosConfig';
import GlobalModal from '../../common/GlobalModal';

const AddEditUnclient = ({ unclient = {}, isOpen, onClose, onSaved }) => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    identity_number: '',
    date_of_birth: '',
    address: '',
    religion: '',
    work: '',
    email: '',
    phone_number: '',
    emergency_number: '',
    slug: '',
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const isEditMode = unclient?.id ? true : false;

  const { triggerAlert } = useAlert();
  useEffect(() => {
    if (isEditMode) {
      setFormData({
        ...unclient,
        date_of_birth: unclient.date_of_birth
          ? new Date(unclient.date_of_birth)
          : '',
      });
    } else {
      resetForm();
    }
  }, [unclient]);

  const resetForm = () => {
    setFormData({
      name: '',
      gender: '',
      identity_number: '',
      date_of_birth: '',
      address: '',
      religion: '',
      work: '',
      email: '',
      phone_number: '',
      emergency_number: '',
      slug: '',
    });
    setValidationErrors({});
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date_of_birth: date });
  };

  const formatDateForBackend = (date) => {
    return date ? date.toISOString().split('T')[0] : '';
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = 'الاسم مطلوب';
    if (!formData.slug) errors.slug = 'رقم العميل مطلوب';
    if (formData.phone_number && formData.phone_number.length !== 11)
      errors.phone_number = 'يجب أن يكون رقم الهاتف مكونًا من 11 رقمًا';
    if (formData.identity_number && formData.identity_number.length !== 14)
      errors.identity_number = 'رقم الهوية يجب أن يكون مكونًا من 14 رقمًا';

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    const formattedData = {
      ...formData,
      date_of_birth: formatDateForBackend(formData.date_of_birth),
    };

    try {
      const response = isEditMode
        ? await api.put(`/unclients/${unclient.id}`, formattedData)
        : await api.post('/unclients', formattedData);

      onSaved();

      triggerAlert('success', 'تم حفظ العميل بنجاح');
      onClose();
      resetForm();
    } catch (error) {
      if (error.response?.status === 422) {
        setValidationErrors(error.response.data.errors || {});
      } else {
        triggerAlert('error', 'حدث خطاء');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GlobalModal
      isOpen={isOpen}
      onClose={onClose}
      title={unclient?.id ? 'تعديل العميل' : 'إضافة عميل'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { name: 'name', label: 'الاسم الكامل', type: 'text' },
          { name: 'slug', label: 'رقم العميل', type: 'text' },
          { name: 'identity_number', label: 'رقم الهوية', type: 'text' },
          { name: 'address', label: 'العنوان', type: 'text' },
          { name: 'religion', label: 'الديانة', type: 'text' },
          { name: 'nationality', label: 'الجنسية', type: 'text' },
          { name: 'work', label: 'الوظيفة', type: 'text' },
          { name: 'email', label: 'البريد الإلكتروني', type: 'email' },
          { name: 'phone_number', label: 'رقم الهاتف', type: 'text' },
          { name: 'emergency_number', label: 'رقم الطوارئ', type: 'text' },
        ].map(({ name, label, type }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {label}
            </label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleInputChange}
              required
              className="w-full mt-1 p-3 border rounded-lg bg-gray-50 dark:bg-gray-200"
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            تاريخ الميلاد
          </label>
          <DatePicker
            selected={formData.date_of_birth}
            onChange={handleDateChange}
            className="w-full mt-1 p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-gray-100"
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-gray-500 text-white rounded-lg"
          >
            إلغاء
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            حفظ
          </button>
        </div>
      </form>
    </GlobalModal>
  );
};

export default AddEditUnclient;
