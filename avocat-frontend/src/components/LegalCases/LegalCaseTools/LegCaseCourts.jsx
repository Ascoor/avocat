import { useState, useEffect } from 'react';
import { BiPlusCircle } from 'react-icons/bi';
import {
  addLegalCaseCourts,
  getCourts,
  removeLegalCaseCourt,
} from '../../../services/api/legalCases';
import { useAlert } from '@/contexts/AlertContext';
import GlobalConfirmDeleteModal from '../../common/GlobalConfirmDeleteModal';
import CourtModal from './Modals/CourtModal';
import CourtList from './Modals/CourtList';

const LegalCaseCourts = ({ legCase, fetchLegCase }) => {
  const [courtLevels, setCourtLevels] = useState([]);
  const [courts, setCourts] = useState([]);
  const [filteredCourts, setFilteredCourts] = useState([]);
  const [legCaseNewCourts, setLegCaseNewCourts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const years = Array.from({ length: 51 }, (_, i) => 2000 + i);
  const { triggerAlert } = useAlert();

  useEffect(() => {
    const fetchCourtData = async () => {
      try {
        const response = await getCourts();
        const fetchedCourts = response.data;
        setCourts(fetchedCourts);

        const uniqueLevels = fetchedCourts
          .map((court) => court.court_level)
          .filter(
            (level, index, self) =>
              level && self.findIndex((l) => l.id === level.id) === index,
          );

        setCourtLevels(uniqueLevels);
      } catch (error) {
        console.error('Error fetching courts:', error);
      }
    };

    fetchCourtData();
  }, []);

  const addNewCourt = () => {
    setLegCaseNewCourts((prev) => [
      ...prev,
      { case_number: '', case_year: '', court_level_id: '', court_id: '' },
    ]);
  };

  const removeNewCourt = (index) => {
    setLegCaseNewCourts((prev) => prev.filter((_, i) => i !== index));
  };

  const updateCourtField = (index, field, value) => {
    const updated = [...legCaseNewCourts];
    updated[index][field] = value;

    if (field === 'court_level_id') {
      updated[index].court_id = '';
      const filtered = courts.filter(
        (court) => court.court_level_id === parseInt(value),
      );
      setFilteredCourts(filtered);
    }

    setLegCaseNewCourts(updated);
  };

  const saveCourts = async () => {
    if (!legCaseNewCourts.length) {
      triggerAlert('error', 'Please add at least one court before saving.');
      return;
    }

    const invalidCourt = legCaseNewCourts.find(
      (court) => !court.case_number || !court.case_year || !court.court_id,
    );
    if (invalidCourt) {
      triggerAlert(
        'error',
        'جميع الحقول مطلوبة لكل محكمة. يرجى استكمال الحقول المفقودة.',
      );
      return;
    }

    try {
      await addLegalCaseCourts(legCase.id, legCaseNewCourts);
      triggerAlert('success', 'تمت إضافة المحاكم بنجاح!');
      setLegCaseNewCourts([]);
      fetchLegCase();
    } catch (error) {
      console.error('Error saving courts:', error.response || error.message);
      triggerAlert('error', 'حدث خطأ أثناء حفظ المحاكم. حاول مرة أخرى.');
    }
  };

  const handleDelete = (courtId, courtName) => {
    setSelectedCourt({ id: courtId, name: courtName });
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedCourt) return;

    try {
      await removeLegalCaseCourt(legCase.id, selectedCourt.id);
      triggerAlert('success', `تم حذف ${selectedCourt.name} بنجاح!`);
      fetchLegCase();
    } catch (error) {
      console.error('Failed to remove court:', error);
      triggerAlert('error', 'فشل في حذف المحكمة. حاول مرة أخرى.');
    } finally {
      setIsModalOpen(false);
      setSelectedCourt(null);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg transition duration-300">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
        المحاكم المرتبطة
      </h2>

      <div className="flex justify-center mb-6">
        <button
          onClick={addNewCourt}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 shadow-lg transition"
        >
          <BiPlusCircle size={24} />
          إضافة محكمة
        </button>
      </div>

      <CourtModal
        legCaseNewCourts={legCaseNewCourts}
        updateCourtField={updateCourtField}
        removeNewCourt={removeNewCourt}
        courtLevels={courtLevels}
        filteredCourts={filteredCourts}
        years={years}
      />

      {legCaseNewCourts.length > 0 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={saveCourts}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 shadow-lg transition"
          >
            حفظ
          </button>
        </div>
      )}

      <CourtList courts={legCase.courts} handleDelete={handleDelete} />

      <GlobalConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={selectedCourt ? selectedCourt.name : ''}
      />
    </div>
  );
};

export default LegalCaseCourts;
