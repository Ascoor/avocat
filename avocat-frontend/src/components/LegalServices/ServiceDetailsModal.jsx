import { useState, useEffect } from 'react';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import arEG from 'date-fns/locale/ar-EG';
import { useSpring, animated } from '@react-spring/web';
import useAuth from '../../auth/AuthUser';

const ServiceProcedureModal = ({
  show,
  onHide,
  lawyers,
  procedure,
  isEditing,
  serviceId,
  addServiceProcedure,
  editServiceProcedure,
}) => {
  registerLocale('ar_eg', arEG);
  setDefaultLocale('ar_eg');

  const { getUser } = useAuth();

  const handleDateChange = (field, date) => {
    if (date) {
      const formattedDate = date.toISOString().split('T')[0];
      setFormData({
        ...formData,
        [field]: formattedDate,
      });
    } else {
      setFormData({
        ...formData,
        [field]: null,
      });
    }
  };

  const initialFormData = {
    title: '',
    job: '',
    lawyer_id: '',
    date_start: null,
    date_end: null,
    cost: 0,
    cost2: 0,
    result: '',
    place: '',
    created_by: getUser().id,
    updated_by: getUser().id,
    service_id: serviceId,
  };

  if (!isEditing) {
    initialFormData.status = '';
  }

  const modalAnimation = useSpring({
    opacity: show ? 1 : 0,
    transform: show ? 'translateY(0%)' : 'translateY(-100%)',
  });

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (isEditing && procedure) {
      setFormData({
        ...initialFormData,
        title: procedure.title || '',
        job: procedure.job || '',
        lawyer_id: procedure.lawyer_id || '',
        date_start: procedure.date_start || '',
        date_end: procedure.date_end || '',
        cost: procedure.cost || 0,
        cost2: procedure.cost2 || 0,
        result: procedure.result || '',
        place: procedure.place || '',
      });
    } else {
      setFormData(initialFormData);
    }
  }, [isEditing, procedure]);

  const handleFieldChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await editServiceProcedure(procedure.id, formData);
      } else {
        await addServiceProcedure(formData);
      }
      resetForm();
    } catch (error) {
      console.error('Error saving/updating procedure:', error);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  return (
    <animated.div style={modalAnimation}>
      <div
        className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity ${
          show ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">
              {isEditing ? 'تعديل الإجراء' : 'إضافة إجراء جديد'}
            </h2>
            <button
              onClick={onHide}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              ×
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormGroup label="نوع الإجراء">
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleFieldChange('title', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </FormGroup>

            <FormGroup label="الوظيفة">
              <input
                type="text"
                value={formData.job}
                onChange={(e) => handleFieldChange('job', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </FormGroup>

            <FormGroup label="المحامي">
              <select
                value={formData.lawyer_id}
                onChange={(e) => handleFieldChange('lawyer_id', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">اختر المحامي</option>
                {lawyers.map((lawyer) => (
                  <option key={lawyer.id} value={lawyer.id}>
                    {lawyer.name}
                  </option>
                ))}
              </select>
            </FormGroup>

            <FormGroup label="تاريخ البداية">
              <DatePicker
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                dateFormat="yyyy-MM-dd"
                selected={
                  formData.date_start ? new Date(formData.date_start) : null
                }
                onChange={(date) => handleDateChange('date_start', date)}
                required
              />
            </FormGroup>

            <FormGroup label="تاريخ الانتهاء">
              <DatePicker
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                dateFormat="yyyy-MM-dd"
                selected={
                  formData.date_end ? new Date(formData.date_end) : null
                }
                onChange={(date) => handleDateChange('date_end', date)}
                required
              />
            </FormGroup>

            <FormGroup label="التكلفة">
              <input
                type="number"
                value={formData.cost}
                onChange={(e) => handleFieldChange('cost', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </FormGroup>

            <FormGroup label="التكلفة 2">
              <input
                type="number"
                value={formData.cost2}
                onChange={(e) => handleFieldChange('cost2', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </FormGroup>

            <FormGroup label="النتيجة">
              <input
                type="text"
                value={formData.result}
                onChange={(e) => handleFieldChange('result', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </FormGroup>

            <FormGroup label="الجهة">
              <input
                type="text"
                value={formData.place}
                onChange={(e) => handleFieldChange('place', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </FormGroup>

            {!isEditing && (
              <FormGroup label="الحالة">
                <select
                  value={formData.status}
                  onChange={(e) => handleFieldChange('status', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="قيد التجهيز">قيد التجهيز</option>
                  <option value="لم ينفذ">لم ينفذ</option>
                  <option value="منتهي">منتهي</option>
                </select>
              </FormGroup>
            )}

            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {isEditing ? 'تحديث' : 'حفظ'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </animated.div>
  );
};

const FormGroup = ({ label, children }) => (
  <div className="mb-4">
    <label className="block mb-2 text-sm font-medium text-gray-700">
      {label}:
    </label>
    {children}
  </div>
);

export default ServiceProcedureModal;
