import React, { useEffect, useState } from 'react';
import {
  createSession,
  updateSession,
  getLegalSessionTypes,
} from '../../../../services/api/sessions';
import { getCourts } from '../../../../services/api/legalCases';
import { getLawyers } from '../../../../services/api/lawyers';
import useAuth from '../../../auth/AuthUser';
import { useAlert } from '@/contexts/AlertContext';

const SessionModal = ({
  isOpen,
  onClose,
  onSubmit,
  fetchSessions,
  legalCaseId,
  initialData = {},
  isEdit = false,
}) => {
  const { triggerAlert } = useAlert();
  const { user } = useAuth();
  const [courts, setCourts] = useState([]);
  const [legalSessionTypes, setLegalSessionTypes] = useState([]);
  const [lawyers, setLawyers] = useState([]);

  const [formData, setFormData] = useState({
    session_date: '',
    session_roll: '',
    cost1: 0,
    cost2: 0,
    cost3: 0,
    court_id: '',
    legal_session_type_id: '',
    lawyer_id: '',
    court_department: '',
    result: '',
    orders: '',
    notes: '',
    status: 'جارى التنفيذ',
    leg_case_id: legalCaseId,
    created_by: user.id,
    Judgment_operative: '',
  });

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [courtResponse, legalSessionTypeResponse, lawyersResponse] =
          await Promise.all([
            getCourts(),
            getLegalSessionTypes(),
            getLawyers(),
          ]);

        setCourts(courtResponse.data);
        setLegalSessionTypes(legalSessionTypeResponse.data);
        setLawyers(lawyersResponse.data);
      } catch (error) {
        triggerAlert('error', 'حدث خطأ أثناء تحميل البيانات.');
      }
    };
    fetchDropdownData();
  }, [legalCaseId]);

  useEffect(() => {
    if (isEdit && initialData) {
      setFormData({
        ...initialData,
        session_date: initialData.session_date || '',
        session_roll: initialData.session_roll || '',
        cost1: initialData.cost1 || 0,
        cost2: initialData.cost2 || 0,
        cost3: initialData.cost3 || 0,
        court_id: initialData.court_id || '',
        legal_session_type_id: initialData.legal_session_type_id || '',
        lawyer_id: initialData.lawyer_id || '',
        court_department: initialData.court_department || '',
        result: initialData.result || '',
        orders: initialData.orders || '',
        notes: initialData.notes || '',
        status: initialData.status || 'جارى التنفيذ',
        leg_case_id: legalCaseId,
        created_by: user.id,
        Judgment_operative: initialData.Judgment_operative || '',
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
        await updateSession(initialData.id, formData);
        triggerAlert('success', 'تم تحديث الجلسة بنجاح.');
      } else {
        await createSession(formData);
        triggerAlert('success', 'تم إضافة الجلسة بنجاح.');
      }
      onSubmit(formData);
      onClose();
      fetchSessions();
    } catch (error) {
      triggerAlert('error', 'حدث خطأ أثناء حفظ الجلسة.');
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
          {isEdit ? 'تحديث الجلسة' : 'إضافة إجراء جديد'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {}
            {!isEdit && (
              <>
                {}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    المحكمة
                  </label>
                  <select
                    name="court_id"
                    value={formData.court_id}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                    required
                  >
                    <option value="">اختر المحكمة</option>
                    {courts.map((court) => (
                      <option key={court.id} value={court.id}>
                        {court.name}
                      </option>
                    ))}
                  </select>
                </div>

                {}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    نوع الجلسة
                  </label>
                  <select
                    name="legal_session_type_id"
                    value={formData.legal_session_type_id}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                    required
                  >
                    <option value="">اختر نوع الجلسة</option>
                    {legalSessionTypes.map((legalSessionType) => (
                      <option
                        key={legalSessionType.id}
                        value={legalSessionType.id}
                      >
                        {legalSessionType.name}
                      </option>
                    ))}
                  </select>
                </div>

                {}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    دائرة المحكمة
                  </label>
                  <input
                    name="court_department"
                    type="text"
                    value={formData.court_department}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                  />
                </div>

                {}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    رول القضية
                  </label>
                  <input
                    name="session_roll"
                    type="text"
                    value={formData.session_roll}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                  />
                </div>

                {}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    تاريخ الجلسة
                  </label>
                  <input
                    name="session_date"
                    type="date"
                    value={formData.session_date}
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
                    الطلبات
                  </label>
                  <input
                    name="orders"
                    type="text"
                    value={formData.orders}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                    required
                  />
                </div>

                {}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    ملاحظات
                  </label>
                  <input
                    name="notes"
                    type="text"
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                  />
                </div>
              </>
            )}

            {}
            {isEdit && (
              <>
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    نص القرار أو الحكم
                  </label>
                  <textarea
                    name="Judgment_operative"
                    value={formData.Judgment_operative}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                    rows="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    حالة الجلسة
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                    required
                  >
                    <option value="جارى التنفيذ">جارى التنفيذ</option>
                    <option value="تمت">تمت</option>
                    <option value="لم ينفذ">لم ينفذ</option>
                  </select>
                </div>

                {}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                      رسوم بإيصالات
                    </label>
                    <input
                      name="cost1"
                      type="number"
                      value={formData.cost1}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                      أتعاب الجلسة
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
              </>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {isEdit ? 'تحديث' : 'إضافة'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SessionModal;
