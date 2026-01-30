import React, { useEffect, useState } from 'react';
import {
  createLegalAd,
  updateLegalAd,
  getLawyers,
  getCourts,
  getLegalAdTypes,
} from '../../../../services/api/legalCases';
import useAuth from '../../../auth/AuthUser';
import { useAlert } from '@/contexts/AlertContext';
import { motion } from 'framer-motion';

const LegalAdModal = ({
  isOpen,
  onClose,
  legCaseId,
  fetchLegalAds,
  initialData = {},
  isEdit = false,
}) => {
  const { triggerAlert } = useAlert();
  const { user } = useAuth();
  const [courts, setCourts] = useState([]);
  const [legalAdTypes, setLegalAdTypes] = useState([]);
  const [lawyers, setLawyers] = useState([]);

  const [formData, setFormData] = useState({
    description: '',
    court_id: '',
    send_date: '',
    receive_date: '',
    cost1: 0,
    cost2: 0,
    cost3: 0,
    legal_ad_type_id: '',
    lawyer_receive_id: '',
    lawyer_send_id: '',
    results: '',
    status: 'قيد التجهيز',
    leg_case_id: legCaseId,
    created_by: user.id,
    updated_by: user.id,
  });
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [courtResponse, legalAdTypeResponse, lawyersResponse] =
          await Promise.all([getCourts(), getLegalAdTypes(), getLawyers()]);

        setCourts(courtResponse.data);
        setLegalAdTypes(legalAdTypeResponse.data);
        setLawyers(lawyersResponse.data);
      } catch (error) {
        triggerAlert('error', 'حدث خطأ أثناء تحميل البيانات.');
      }
    };
    fetchDropdownData();
  }, [legCaseId, user]);

  useEffect(() => {
    if (isEdit && initialData) {
      setFormData({
        description: initialData.description,
        court_id: initialData.court_id,
        send_date: initialData.send_date,
        receive_date: initialData.receive_date,
        cost1: initialData.cost1,
        cost2: initialData.cost2,
        cost3: initialData.cost3,
        legal_ad_type_id: initialData.legal_ad_type_id,
        lawyer_receive_id: initialData.lawyer_receive_id,
        lawyer_send_id: initialData.lawyer_send_id,
        results: initialData.results,

        status: initialData.status,
        leg_case_id: initialData.leg_case_id,
        created_by: initialData.created_by,
        updated_by: user.id,
      });
    }
  }, [isEdit, initialData, legCaseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isEdit) {
        response = await updateLegalAd(initialData.id, formData);
      } else {
        response = await createLegalAd(formData);
      }

      if (response && response.status === 200) {
        triggerAlert(
          'success',
          isEdit ? 'تم تحديث الإعلان بنجاح.' : 'تم إضافة الإعلان بنجاح.',
        );
        fetchLegalAds();
        onClose();
      } else {
        triggerAlert('error', 'حدث خطأ أثناء حفظ الإعلان.');
      }
    } catch (error) {
      console.error('Error saving ad:', error);
      triggerAlert('error', 'حدث خطأ أثناء حفظ الإعلان.');
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-5xl p-8 relative transform transition-all overflow-auto max-h-[90vh]">
        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative mb-4 flex justify-center bg-gray-200 dark:bg-gray-800"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            &#x2715;
          </button>
          <h2 className="text-2xl font-bold text-center mt-2  dark:text-green-200/90 text-avocat-blue mb-6">
            {isEdit ? 'تحديث الإعلان القانوني' : 'إضافة إعلان قانوني'}
          </h2>
        </motion.header>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: 'المحكمة', name: 'court_id', options: courts },
            {
              label: 'نوع الإعلان',
              name: 'legal_ad_type_id',
              options: legalAdTypes,
            },
            {
              label: 'المحامي المرسل',
              name: 'lawyer_send_id',
              options: lawyers,
            },
          ].map(({ label, name, options }) => (
            <div key={name}>
              <label className="block  text-center mb-2 text-sm font-bold text-blue-700 dark:text-gray-200">
                {label}
              </label>
              <select
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full px-6  py-3 rounded-lg border bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
                required
              >
                <option className="text-center" value="">
                  اختر{' '}
                </option>
                {options.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <div>
            <label className="block text-center mb-2 text-sm font-bold text-blue-700 dark:text-gray-200">
              الوصف
            </label>
            <input
              name="description"
              type="text"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-4 items-center">
            <label className="text-sm  text-center mb-2   text-blue-700 font-bold  dark:text-gray-200">
              تاريخ التسليم
            </label>
            <input
              name="send_date"
              type="date"
              value={formData.send_date}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
              required
            />
            {isEdit && (
              <>
                <div>
                  <label className="block text-sm  text-center mb-2 font-bold text-blue-700 dark:text-gray-200">
                    {' '}
                    المحامي المستلم{' '}
                  </label>
                  <select
                    name="lawyer_receive_id"
                    value={formData.lawyer_receive_id}
                    onChange={handleChange}
                    className="w-full px-6 py-3  rounded-lg border bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value=""> اختر المحامي </option>
                    {lawyers.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
                <label className="text-sm font-medium  text-center mb-2 text-gray-700 dark:text-gray-200">
                  تاريخ الإستلام
                </label>
                <input
                  name="receive_date"
                  type="date"
                  value={formData.receive_date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                  required
                />
              </>
            )}
          </div>

          {isEdit && (
            <>
              <div>
                <label className="block text-sm  text-center mb-2 font-bold text-blue-700 dark:text-gray-200">
                  النتائج
                </label>
                <input
                  name="results"
                  type="text"
                  value={formData.results}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold  text-center mb-2 text-blue-700 dark:text-gray-200">
                  الحالة
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-6 py-3 rounded-lg border bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                  required
                >
                  <option value="قيد التجهيز">قيد التجهيز</option>
                  <option value="تم التسليم">تم التسليم</option>
                  <option value="تم الإستلام">تم الإستلام</option>
                </select>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'رسوم بإيصالات', name: 'cost1' },
                  { label: 'أتعاب الجلسة', name: 'cost2' },
                  { label: 'مصروفات أخرى', name: 'cost3' },
                ].map(({ label, name }) => (
                  <div key={name}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                      {label}
                    </label>
                    <input
                      name={name}
                      type="number"
                      value={formData[name]}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                    />
                  </div>
                ))}
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1"
          >
            {isEdit ? 'تحديث' : 'إضافة'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LegalAdModal;
