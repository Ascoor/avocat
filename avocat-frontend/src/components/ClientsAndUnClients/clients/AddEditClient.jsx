import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import GlobalModal from '../../common/GlobalModal';
import api from '../../../services/api/axiosConfig';
import { useAlert } from '@/contexts/AlertContext';

const AddEditClient = ({ client = {}, isOpen, onClose, onSaved }) => {
  const [formData, setFormData] = useState({
    slug: client?.slug ?? '',
    name: client?.name ?? '',
    gender: client?.gender ?? '',
    identity_number: client?.identity_number ?? '',
    date_of_birth: client?.date_of_birth
      ? moment(client.date_of_birth).toDate()
      : new Date(),
    address: client?.address ?? '',
    religion: client?.religion ?? '',
    nationality: client?.nationality ?? '',
    work: client?.work ?? '',
    email: client?.email ?? '',
    phone_number: client?.phone_number ?? '',
    emergency_number: client?.emergency_number ?? '',
  });

  const { triggerAlert } = useAlert();
  useEffect(() => {
    setFormData({
      ...client,
      date_of_birth: client?.date_of_birth
        ? moment(client.date_of_birth).toDate()
        : new Date(),
    });
  }, [client]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleDateChange = (date) =>
    setFormData({ ...formData, date_of_birth: date });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const clientData = {
      ...formData,
      date_of_birth: formData.date_of_birth
        ? moment(formData.date_of_birth).format('YYYY-MM-DD')
        : null,
    };

    try {
      if (client.id) {
        await api.put(`/clients/${client.id}`, clientData);
      } else {
        await api.post('/clients', clientData);
      }
      onSaved();
      triggerAlert('success', 'تم حفظ العميل بنجاح');
      onClose();
    } catch (error) {
      triggerAlert('error', 'حدث خطاء');
    }
  };

  return (
    <GlobalModal
      isOpen={isOpen}
      onClose={onClose}
      title={client?.id ? 'تعديل العميل' : 'إضافة عميل'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { name: 'name', label: 'الاسم الكامل', type: 'text' },
          { name: 'slug', label: 'نوع العميل', type: 'text' },
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
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 border rounded-lg bg-gray-50 dark:bg-gray-200 "
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

export default AddEditClient;
