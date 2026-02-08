import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useAlert } from '@shared/contexts/AlertContext';
import api from '@shared/services/api/axiosConfig';
import GlobalModal from '@shared/components/common/GlobalModal';
import { LexicraftIcon } from '@shared/icons/lexicraft';

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
      subtitle="نموذج موحد للعملاء بدون وكالة."
      titleIcon={<LexicraftIcon name="users" size={20} />}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
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
          <div key={name} className="space-y-2">
            <label className="block text-xs font-semibold text-muted-foreground">
              {label}
            </label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleInputChange}
              required
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-[hsl(var(--ring))]"
            />
          </div>
        ))}

        <div className="space-y-2">
          <label className="block text-xs font-semibold text-muted-foreground">
            تاريخ الميلاد
          </label>
          <DatePicker
            selected={formData.date_of_birth}
            onChange={handleDateChange}
            className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-[hsl(var(--ring))]"
          />
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="pressable inline-flex items-center gap-2 rounded-xl border border-border bg-muted px-4 py-2 text-sm font-semibold text-foreground transition hover:opacity-90"
          >
            <LexicraftIcon name="arrow-forward" size={16} isDirectional />
            إلغاء
          </button>
          <button
            type="submit"
            className="pressable inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
          >
            <LexicraftIcon name="document" size={16} />
            حفظ
          </button>
        </div>
      </form>
    </GlobalModal>
  );
};

export default AddEditUnclient;
