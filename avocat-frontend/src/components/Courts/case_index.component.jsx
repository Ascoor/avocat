import { useEffect, useState } from 'react';
import { JudgeIcon } from '../../assets/icons';
import api from '../../services/api/axiosConfig';

const CaseType = () => {
  const [procedureTypes, setProcedureTypes] = useState([]);
  const [caseTypes, setCaseTypes] = useState([]);
  const [caseSubTypes, setCaseSubTypes] = useState([]);
  const [legalAdTypes, setLegalAdTypes] = useState([]);

  const [showAddProcedureTypeModal, setShowAddProcedureTypeModal] =
    useState(false);
  const [showAddCaseTypeModal, setShowAddCaseTypeModal] = useState(false);
  const [showAddCaseSubTypeModal, setShowAddCaseSubTypeModal] = useState(false);
  const [showAddLegalAdModal, setShowAddLegalAdModal] = useState(false);

  const [newProcedureTypeName, setNewProcedureTypeName] = useState('');
  const [newCaseTypeName, setNewCaseTypeName] = useState('');
  const [newCaseSubTypeName, setNewCaseSubTypeName] = useState('');
  const [newCaseTypeId, setNewCaseTypeId] = useState('');
  const [newAdType, setNewAdType] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [
        procedureTypesResponse,
        caseTypesResponse,
        caseSubTypesResponse,
        legalAdTypesResponse,
      ] = await Promise.all([
        api.get('/procedure_types/'),
        api.get('/case_types/'),
        api.get('/case_sub_types/'),
        api.get('/legal_ad_types/'),
      ]);

      setProcedureTypes(procedureTypesResponse.data);
      setCaseTypes(caseTypesResponse.data);
      setCaseSubTypes(caseSubTypesResponse.data);
      setLegalAdTypes(legalAdTypesResponse.data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const handleAddProcedureType = async () => {
    try {
      await api.post('/procedure_types/', {
        name: newProcedureTypeName,
      });
      setShowAddProcedureTypeModal(false);
      setNewProcedureTypeName('');
      fetchData();
    } catch {
      console.error('Error adding Procedure Type');
    }
  };

  const handleAddCaseType = async () => {
    try {
      await api.post('/case_types/', {
        name: newCaseTypeName,
      });
      setShowAddCaseTypeModal(false);
      setNewCaseTypeName('');
      fetchData();
    } catch {
      console.error('Error adding Case Type');
    }
  };

  const handleAddCaseSubType = async () => {
    try {
      await api.post('/case_sub_types/', {
        case_type_id: newCaseTypeId,
        name: newCaseSubTypeName,
      });
      setShowAddCaseSubTypeModal(false);
      setNewCaseSubTypeName('');
      setNewCaseTypeId('');
      fetchData();
    } catch {
      console.error('Error adding Case Sub Type');
    }
  };

  const handleAddAdType = async () => {
    try {
      await api.post('/legal_ad_types', {
        name: newAdType,
      });
      setShowAddLegalAdModal(false);
      setNewAdType('');
      fetchData();
    } catch {
      console.error('Error adding Ad Type');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-center space-x-4">
        <img src={JudgeIcon} alt="Icon" className="w-12 h-12" />
        <h2 className="text-2xl font-bold">إعدادات القضايا</h2>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded shadow p-4">
          <h3 className="font-bold text-lg mb-4">أنواع القضايا</h3>
          <ul className="list-disc pl-6">
            {caseTypes.map((caseType) => (
              <li
                key={caseType.id}
                className="flex justify-between items-center"
              >
                {caseType.name}
                <button className="text-red-600 hover:underline">حذف</button>
              </li>
            ))}
          </ul>
          <button
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            onClick={() => setShowAddCaseTypeModal(true)}
          >
            إضافة نوع قضية
          </button>
        </div>

        <div className="bg-white rounded shadow p-4">
          <h3 className="font-bold text-lg mb-4">أنواع الإجراءات</h3>
          <ul className="list-disc pl-6">
            {procedureTypes.map((type) => (
              <li key={type.id} className="flex justify-between items-center">
                {type.name}
                <button className="text-red-600 hover:underline">حذف</button>
              </li>
            ))}
          </ul>
          <button
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            onClick={() => setShowAddProcedureTypeModal(true)}
          >
            إضافة نوع إجراء
          </button>
        </div>
      </div>

      {}
    </div>
  );
};

export default CaseType;
