import { useLanguage } from '@shared/contexts/LanguageContext';
import { LexicraftIcon } from '@shared/icons/lexicraft';

const CourtModal = ({
  legCaseNewCourts,
  updateCourtField,
  removeNewCourt,
  courtLevels,
  filteredCourts,
  years,
}) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-4">
      {legCaseNewCourts.map((court, index) => (
        <div
          key={court.key || `court-`}
          className="rounded-2xl border border-border bg-card p-4 shadow-sm"
        >
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-muted-foreground">
                {t('legalCaseDetails.courts.form.caseNumber')} <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                placeholder={t('legalCaseDetails.courts.form.caseNumberPlaceholder')}
                value={court.case_number}
                onChange={(e) =>
                  updateCourtField(index, 'case_number', e.target.value)
                }
                className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">
                {t('legalCaseDetails.courts.form.year')} <span className="text-destructive">*</span>
              </label>
              <select
                value={court.case_year}
                onChange={(e) =>
                  updateCourtField(index, 'case_year', e.target.value)
                }
                className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
              >
                <option value="">{t('legalCaseDetails.courts.form.yearPlaceholder')}</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">
                {t('legalCaseDetails.courts.form.level')} <span className="text-destructive">*</span>
              </label>
              <select
                value={court.court_level_id}
                onChange={(e) =>
                  updateCourtField(index, 'court_level_id', e.target.value)
                }
                className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
              >
                <option value="">{t('legalCaseDetails.courts.form.levelPlaceholder')}</option>
                {courtLevels.map((level) => (
                  <option key={level.id} value={level.id}>
                    {level.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">
                {t('legalCaseDetails.courts.form.court')} <span className="text-destructive">*</span>
              </label>
              <select
                value={court.court_id}
                onChange={(e) =>
                  updateCourtField(index, 'court_id', e.target.value)
                }
                className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
              >
                <option value="">{t('legalCaseDetails.courts.form.courtPlaceholder')}</option>
                {filteredCourts.map((filteredCourt) => (
                  <option key={filteredCourt.id} value={filteredCourt.id}>
                    {filteredCourt.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => removeNewCourt(index)}
              className="pressable inline-flex items-center gap-2 rounded-full border border-destructive/40 px-3 py-1 text-xs text-destructive"
            >
              <LexicraftIcon name="lock" size={14} />
              {t('legalCaseDetails.courts.form.remove')}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourtModal;
