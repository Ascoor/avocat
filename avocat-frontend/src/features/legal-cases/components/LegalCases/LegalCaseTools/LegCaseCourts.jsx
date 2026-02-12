import { useCallback, useState, useEffect } from 'react';
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
import SectionHeader from './SectionHeader';

const LegalCaseCourts = ({ legCase, fetchLegCase }) => {
  const { triggerAlert } = useAlert();
  const { t, isRTL } = useLanguage();
  const [courtLevels, setCourtLevels] = useState([]);
  const [courts, setCourts] = useState([]);
  const [filteredCourts, setFilteredCourts] = useState([]);
  const [legCaseNewCourts, setLegCaseNewCourts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const years = Array.from({ length: 51 }, (_, i) => 2000 + i);

  const fetchCourtData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getCourts();
      const fetchedCourts = Array.isArray(response.data) ? response.data : [];
      setCourts(fetchedCourts);

      const uniqueLevels = fetchedCourts
        .map((court) => court.court_level)
        .filter(
          (level, index, self) =>
            level && self.findIndex((l) => l.id === level.id) === index,
        );

      setCourtLevels(uniqueLevels);
    } catch (fetchError) {
      setError(t('legalCaseDetails.courts.errors.fetch'));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchCourtData();
  }, [fetchCourtData]);

  const addNewCourt = useCallback(() => {
    setLegCaseNewCourts((prev) => [
      ...prev,
      {
        key: Date.now() + Math.random(),
        case_number: '',
        case_year: '',
        court_level_id: '',
        court_id: '',
      },
    ]);
  }, []);

  const removeNewCourt = useCallback((index) => {
    setLegCaseNewCourts((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const updateCourtField = useCallback(
    (index, field, value) => {
      setLegCaseNewCourts((prev) => {
        const updated = [...prev];
        updated[index][field] = value;

        if (field === 'court_level_id') {
          updated[index].court_id = '';
          const filtered = courts.filter(
            (court) => court.court_level_id === parseInt(value, 10),
          );
          setFilteredCourts(filtered);
        }

        return updated;
      });
    },
    [courts],
  );

  const saveCourts = useCallback(async () => {
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
    } catch (saveError) {
      triggerAlert('error', t('legalCaseDetails.courts.alerts.addError'));
    }
  }, [fetchLegCase, legCase.id, legCaseNewCourts, t, triggerAlert]);

  const handleDelete = useCallback((courtId, courtName) => {
    setSelectedCourt({ id: courtId, name: courtName });
    setIsModalOpen(true);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!selectedCourt) return;

    try {
      await removeLegalCaseCourt(legCase.id, selectedCourt.id);
      triggerAlert(
        'success',
        t('legalCaseDetails.courts.alerts.deleteSuccess', { name: selectedCourt.name }),
      );
      fetchLegCase();
    } catch (deleteError) {
      triggerAlert('error', t('legalCaseDetails.courts.alerts.deleteError'));
    } finally {
      setIsModalOpen(false);
      setSelectedCourt(null);
    }
  }, [fetchLegCase, legCase.id, selectedCourt, t, triggerAlert]);

  return (
    <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      <SectionHeader
        icon="court"
        title={t('legalCaseDetails.courts.title')}
        subtitle={t('legalCaseDetails.courts.subtitle')}
        addLabel={t('legalCaseDetails.actions.addCourt')}
        onAdd={addNewCourt}
      />

      {error ? (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span>{error}</span>
            <button
              type="button"
              onClick={fetchCourtData}
              className="pressable inline-flex items-center gap-2 rounded-full border border-destructive/30 bg-background px-3 py-1 text-xs font-semibold text-destructive"
            >
              <LexicraftIcon name="arrow-forward" size={14} isDirectional dir={isRTL ? 'rtl' : 'ltr'} />
              {t('legalCaseDetails.actions.retry')}
            </button>
          </div>
        </div>
      ) : null}

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={`court-skeleton-${index}`} className="h-14 rounded-2xl skeleton-shimmer" />
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

          {legCaseNewCourts.length > 0 ? (
            <div className={isRTL ? 'flex justify-start' : 'flex justify-end'}>
              <button
                type="button"
                onClick={saveCourts}
                className="pressable inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
              >
                <LexicraftIcon name="document" size={18} />
                {t('common.save')}
              </button>
            </div>
          ) : null}

          <CourtList courts={legCase.courts || []} handleDelete={handleDelete} />
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
