import React, { useState, useEffect } from 'react';
import {
  createProcedure,
  updateProcedure,
  getProcedureTypes,
  getProcedurePlaceTypes,
} from '../../../../services/api/procedures';
import { getLawyers } from '../../../../services/api/lawyers';
import useAuth from '../../../auth/AuthUser';
import { useAlert } from '@/contexts/AlertContext';

const ProcedureModal = ({
  isOpen,
  onClose,
  onSubmit,
  legalCaseId,
  initialData = {},
  isEdit = false,
}) => {
  const { triggerAlert } = useAlert();
  const { user } = useAuth();
  const [procedureTypes, setProcedureTypes] = useState([]);
  const [procedurePlaceTypes, setProcedurePlaceTypes] = useState([]);
  const [lawyers, setLawyers] = useState([]);

  const [formData, setFormData] = useState({
    job: '',
    date_start: '',
    date_end: '',
    cost: 0,
    cost2: 0,
    cost3: 0,
    procedure_type_id: '',
    lawyer_id: '',
    procedure_place_type_id: '',
    procedure_place_name: '',
    result: '',
    status: 'جاري التنفيذ',
    leg_case_id: legalCaseId,
    created_by: user.id,
  });

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [typesResponse, placesResponse, lawyersResponse] =
          await Promise.all([
            getProcedureTypes(),
            getProcedurePlaceTypes(),
            getLawyers(),
          ]);
        setProcedureTypes(typesResponse.data);
        setProcedurePlaceTypes(placesResponse.data);
        setLawyers(lawyersResponse.data);
      } catch (error) {
        triggerAlert('error', 'حدث خطأ أثناء تحميل البيانات.');
      }
    };
    fetchDropdownData();
  }, []);
  useEffect(() => {
    if (isEdit && initialData) {
      setFormData({
        job: initialData.job || '',
        date_start: initialData.date_start || '',
        date_end: initialData.date_end || '',
        cost: initialData.cost ?? 0,
        cost2: initialData.cost2 ?? 0,
        cost3: initialData.cost3 ?? 0,
        procedure_type_id: initialData.procedure_type_id || '',
        lawyer_id: initialData.lawyer_id || '',
        procedure_place_type_id: initialData.procedure_place_type_id || '',
        procedure_place_name: initialData.procedure_place_name || '',
        result: initialData.result || '',
        status: initialData.status || 'جاري التنفيذ',
        leg_case_id: legalCaseId,
        updated_by: user.id,
      });
    }
  }, [isEdit, initialData, legalCaseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateProcedure(initialData.id, formData);
        triggerAlert('success', 'تم تحديث الإجراء بنجاح.');
      } else {
        await createProcedure(formData);
        triggerAlert('success', 'تم إضافة الإجراء بنجاح.');
      }
      onSubmit(formData);
      onClose();
    } catch (error) {
      triggerAlert('error', 'حدث خطأ أثناء حفظ الإجراء.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full sm:max-w-md md:max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 transition"
        >
          &#x2715;
        </button>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">
          {isEdit ? 'تحديث الإجراء' : 'إضافة إجراء جديد'}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 max-h-[70vh] overflow-y-auto pr-2"
        >
          {}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              نوع الإجراء
            </label>
            <select
              name="procedure_type_id"
              value={formData.procedure_type_id}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
              required
            >
              <option value="">اختر نوع الإجراء</option>
              {procedureTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          {}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              نوع الجهة
            </label>
            <select
              name="procedure_place_type_id"
              value={formData.procedure_place_type_id}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
              required
            >
              <option value="">اختر نوع الجهة</option>
              {procedurePlaceTypes.map((placeType) => (
                <option key={placeType.id} value={placeType.id}>
                  {placeType.name}
                </option>
              ))}
            </select>
          </div>

          {}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              اسم الجهة
            </label>
            <input
              name="procedure_place_name"
              type="text"
              value={formData.procedure_place_name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
            />
          </div>

          {}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              تاريخ البدء
            </label>
            <input
              name="date_start"
              type="date"
              value={formData.date_start}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
              required
            />
          </div>

          {}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              تاريخ الانتهاء
            </label>
            <input
              name="date_end"
              type="date"
              value={formData.date_end}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
              required
            />
          </div>

          {}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              المحامي
            </label>
            <select
              name="lawyer_id"
              value={formData.lawyer_id}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
              required
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
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              المطلوب
            </label>
            <input
              name="job"
              type="text"
              value={formData.job}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
              required
            />
          </div>

          {}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              النتيجة
            </label>
            <input
              name="result"
              type="text"
              value={formData.result}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
            />
          </div>
          {}
          {isEdit && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                حالة الإجراء
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                required
              >
                <option value="جاري التنفيذ">جاري التنفيذ</option>
                <option value="تمت">تمت</option>
                <option value="لم ينفذ">لم ينفذ</option>
              </select>
            </div>
          )}

          {}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                رسوم بإيصالات
              </label>
              <input
                name="cost"
                type="number"
                value={formData.cost}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                أتعاب الإجراء
              </label>
              <input
                name="cost2"
                type="number"
                value={formData.cost2}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                مصروفات أخرى
              </label>
              <input
                name="cost3"
                type="number"
                value={formData.cost3}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            {isEdit ? 'تحديث' : 'إضافة'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProcedureModal;
