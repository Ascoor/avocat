import { useState, useEffect } from 'react';
import { FaRegFile } from 'react-icons/fa';
import useAuth from '../auth/AuthUser';
import {
  createLegCase,
  getLegcaseTypes,
  updateLegCase,
} from '../../services/api/legalCases';

const AddEditLegCase = ({
  onClose,
  fetchLegCases,
  isEditing,
  editingLegCase,
}) => {
  const { getUser } = useAuth();
  const [caseData, setCaseData] = useState({
    slug: '',
    title: '',
    description: '',
    case_type_id: '',
    case_sub_type_id: '',
    client_capacity: '',
    litigants_name: '',
    litigants_phone: '',
    litigants_lawyer_name: '',
    litigants_lawyer_phone: '',
    created_by: getUser().id,
  });

  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [caseTypes, setCaseTypes] = useState([]);
  const [caseSubTypes, setCaseSubTypes] = useState([]);

  useEffect(() => {
    fetchCaseTypes();
  }, []);
  useEffect(() => {
    if (isEditing && editingLegCase) {
      setCaseData(editingLegCase);
      updateSubTypes(editingLegCase.case_type_id);
    } else {
      resetForm();
    }
  }, [isEditing, editingLegCase]);

  const fetchCaseTypes = async () => {
    try {
      const response = await getLegcaseTypes();
      setCaseTypes(response.data);
    } catch (error) {
      console.error('Error fetching case types:', error);
      setAlertMessage('خطأ في تحميل أنواع القضايا.');
      setShowAlert(true);
    }
  };

  const resetForm = () => {
    setCaseData({
      slug: '',
      title: '',
      description: '',
      case_type_id: '',
      case_sub_type_id: '',
      client_capacity: '',
      litigants_name: '',
      litigants_phone: '',
      litigants_lawyer_name: '',
      litigants_lawyer_phone: '',
      created_by: getUser().id,
    });
    setCaseSubTypes([]);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCaseData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCaseTypeChange = (event) => {
    const newCaseTypeId = event.target.value;

    setCaseData((prevData) => ({
      ...prevData,
      case_type_id: newCaseTypeId,
      case_sub_type_id: '',
    }));

    updateSubTypes(newCaseTypeId);
  };

  const updateSubTypes = (caseTypeId) => {
    const selectedCaseType = caseTypes.find(
      (type) => type.id.toString() === caseTypeId,
    );
    if (selectedCaseType) {
      setCaseSubTypes(selectedCaseType.case_sub_types);
    } else {
      setCaseSubTypes([]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      if (isEditing) {
        await updateLegCase(editingLegCase.id, {
          ...caseData,
          updated_by: getUser().id,
        });
      } else {
        await createLegCase(caseData);
      }
      onClose();
      fetchLegCases();
    } catch (error) {
      setAlertMessage('خطأ: ' + error.message);
      setShowAlert(true);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg w-full max-w-xl p-6">
        <div className="flex justify-between items-center p-4 border-b">
          <h5 className="text-lg font-medium">
            {isEditing ? 'تعديل بيانات القضية' : 'إضافة قضية'}
          </h5>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 dark:text-gray-200"
          >
            &times;
          </button>
        </div>
        <form noValidate validated={validated} onSubmit={handleSubmit}>
          {showAlert && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              <span className="block">{alertMessage}</span>
              <button
                onClick={() => setShowAlert(false)}
                className="absolute top-0 bottom-0 right-0 px-4 py-3"
              >
                &times;
              </button>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <LabelInput
              icon={FaRegFile}
              label="رقم الملف"
              name="slug"
              value={caseData.slug}
              onChange={handleInputChange}
              required
            />
            <SelectInput
              label="صفة الإدعاء"
              name="client_capacity"
              value={caseData.client_capacity}
              onChange={handleInputChange}
              options={clientCapacityOptions()}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <SelectInput
              label="نوع القضية"
              name="case_type_id"
              value={caseData.case_type_id}
              onChange={handleCaseTypeChange}
              options={caseTypes.map((type) => ({
                id: type.id,
                name: type.name,
              }))}
              required
            />
            <SelectInput
              label="نوع القضية الفرعي"
              name="case_sub_type_id"
              value={caseData.case_sub_type_id}
              onChange={handleInputChange}
              options={caseSubTypes.map((subType) => ({
                id: subType.id,
                name: subType.name,
              }))}
              required
            />
          </div>
          <div className="grid grid-cols-1 mt-3">
            <LabelInput
              label="موضوع الدعوى"
              name="title"
              value={caseData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="grid grid-cols-1 mt-3">
            <LabelInput
              label="الوصف"
              name="description"
              value={caseData.description}
              onChange={handleInputChange}
              required
              as="textarea"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <LabelInput
              label="الخصم"
              name="litigants_name"
              value={caseData.litigants_name}
              onChange={handleInputChange}
            />
            <LabelInput
              label="رقم هاتف الخصم"
              name="litigants_phone"
              value={caseData.litigants_phone}
              onChange={handleInputChange}
              type="tel"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <LabelInput
              label="وكيل الخصم"
              name="litigants_lawyer_name"
              value={caseData.litigants_lawyer_name}
              onChange={handleInputChange}
            />
            <LabelInput
              label="رقم هاتف وكيل الخصم"
              name="litigants_lawyer_phone"
              value={caseData.litigants_lawyer_phone}
              onChange={handleInputChange}
              type="tel"
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded"
          >
            {isEditing ? 'تحديث' : 'حفظ'}
          </button>
        </form>
      </div>
    </div>
  );
};

const LabelInput = ({ icon: Icon, label, as = 'input', ...props }) => (
  <div className="flex flex-col mb-3">
    <label className="block text-sm font-medium">{label}</label>
    <div className="relative mt-1">
      {Icon && <Icon className="absolute left-3 top-2 text-gray-500" />}
      {as === 'input' ? (
        <input
          {...props}
          className="block w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 pl-10 bg-white dark:bg-gray-700 text-black dark:text-white"
        />
      ) : (
        <textarea
          {...props}
          className="block w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 pl-10 bg-white dark:bg-gray-700 text-black dark:text-white"
        />
      )}
    </div>
  </div>
);

const SelectInput = ({ label, options, ...props }) => (
  <div className="flex flex-col mb-3">
    <label className="block text-sm font-medium">{label}</label>
    <select
      {...props}
      className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 text-black dark:text-white"
    >
      <option value="">اختر {label}</option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  </div>
);

const clientCapacityOptions = () => [
  { id: 'مدعى عليه', name: 'مدعى عليه' },
  { id: 'مجنى عليه', name: 'مجنى عليه' },
  { id: 'مدعى', name: 'مدعى' },
  { id: 'متهم', name: 'متهم' },
];

export default AddEditLegCase;
