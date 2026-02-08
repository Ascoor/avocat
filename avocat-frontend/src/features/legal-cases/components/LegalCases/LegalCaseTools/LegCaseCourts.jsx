import { useState, useEffect } from 'react';
import {
  addLegalCaseCourts,
  getCourts,
  removeLegalCaseCourt,
} from '@shared/services/api/legalCases';
import { useAlert } from '@shared/contexts/AlertContext';
import GlobalConfirmDeleteModal from '@shared/components/common/GlobalConfirmDeleteModal';
import CourtModal from './Modals/CourtModal';
import CourtList from './Modals/CourtList';
import { useLanguage } from '@shared/contexts/LanguageContext';
import { LexicraftIcon } from '@shared/icons/lexicraft';

const LegalCaseCourts = ({ legCase, fetchLegCase }) => {
  const { triggerAlert } = useAlert();
  const { t } = useLanguage();
  const [courtLevels, setCourtLevels] = useState([]);
  const [courts, setCourts] = useState([]);
  const [filteredCourts, setFilteredCourts] = useState([]);
  const [legCaseNewCourts, setLegCaseNewCourts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const years = Array.from({ length: 51 }, (_, i) => 2000 + i);

  useEffect(() => {
    const fetchCourtData = async () => {
      setLoading(true);
      setError('');
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
        setError(t('legalCaseDetails.courts.errors.fetch'));
      } finally {
        setLoading(false);
      }
    };

    fetchCourtData();
  }, [t]);

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
        (court) => court.court_level_id === parseInt(value, 10),
      );
      setFilteredCourts(filtered);
    }

    setLegCaseNewCourts(updated);
  };

  const saveCourts = async () => {
    if (!legCaseNewCourts.length) {
      triggerAlert('error', t('legalCaseDetails.courts.errors.missing'));
      return;
    }

    const invalidCourt = legCaseNewCourts.find(
      (court) => !court.case_number || !court.case_year || !court.court_id,
    );
    if (invalidCourt) {
      triggerAlert('error', t('legalCaseDetails.courts.errors.required'));
      return;
    }

    try {
      await addLegalCaseCourts(legCase.id, legCaseNewCourts);
      triggerAlert('success', t('legalCaseDetails.courts.alerts.addSuccess'));
      setLegCaseNewCourts([]);
      fetchLegCase();
    } catch (error) {
      triggerAlert('error', t('legalCaseDetails.courts.alerts.addError'));
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
      triggerAlert('success', t('legalCaseDetails.courts.alerts.deleteSuccess', { name: selectedCourt.name }));
      fetchLegCase();
    } catch (error) {
      triggerAlert('error', t('legalCaseDetails.courts.alerts.deleteError'));
    } finally {
      setIsModalOpen(false);
      setSelectedCourt(null);
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            {t('legalCaseDetails.courts.title')}
          </h3>
          <p className="text-sm text-muted-foreground">
            {t('legalCaseDetails.courts.subtitle')}
          </p>
        </div>
        <button
          onClick={addNewCourt}
          className="pressable inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          <LexicraftIcon name="court" size={18} />
          {t('legalCaseDetails.courts.actions.addCourt')}
        </button>
      </header>

      {error && (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="h-14 rounded-2xl skeleton-shimmer" />
          ))}
        </div>
      ) : (
        <>
          <CourtModal
            legCaseNewCourts={legCaseNewCourts}
            updateCourtField={updateCourtField}
            removeNewCourt={removeNewCourt}
            courtLevels={courtLevels}
            filteredCourts={filteredCourts}
            years={years}
          />

          {legCaseNewCourts.length > 0 && (
            <div className="flex justify-end">
              <button
                onClick={saveCourts}
                className="pressable inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
              >
                <LexicraftIcon name="document" size={18} />
                {t('common.save')}
              </button>
            </div>
          )}

          <CourtList courts={legCase.courts} handleDelete={handleDelete} />
        </>
      )}

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
