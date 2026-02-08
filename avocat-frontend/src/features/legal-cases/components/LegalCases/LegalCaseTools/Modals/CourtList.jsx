import { useLanguage } from '@shared/contexts/LanguageContext';
import { LexicraftIcon } from '@shared/icons/lexicraft';

const CourtList = ({ courts, handleDelete }) => {
  const { t } = useLanguage();

  return (
    <div className="mt-4">
      <h4 className="text-base font-semibold text-foreground">
        {t('legalCaseDetails.courts.listTitle')}
      </h4>
      {courts.length > 0 ? (
        <div className="mt-4 hidden overflow-x-auto rounded-2xl border border-border md:block">
          <table className="w-full text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-start">{t('legalCaseDetails.courts.table.court')}</th>
                <th className="px-4 py-3 text-start">{t('legalCaseDetails.courts.table.year')}</th>
                <th className="px-4 py-3 text-start">{t('legalCaseDetails.courts.table.caseNumber')}</th>
                <th className="px-4 py-3 text-center">{t('legalCaseDetails.table.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {courts.map((court) => (
                <tr key={court.id} className="border-t border-border hover:bg-muted/40">
                  <td className="px-4 py-3">{court.name}</td>
                  <td className="px-4 py-3">{court.pivot.case_year}</td>
                  <td className="px-4 py-3">{court.pivot.case_number}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleDelete(court.id, court.name)}
                      className="pressable inline-flex items-center justify-center rounded-full border border-destructive/40 px-3 py-1 text-xs text-destructive"
                    >
                      <LexicraftIcon name="shield" size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-4 rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <LexicraftIcon name="court" size={20} />
          </div>
          {t('legalCaseDetails.courts.empty')}
        </div>
      )}

      {courts.length > 0 && (
        <div className="mt-4 space-y-3 md:hidden">
          {courts.map((court) => (
            <div key={court.id} className="rounded-2xl border border-border p-4">
              <div className="text-sm font-semibold text-foreground">{court.name}</div>
              <div className="text-xs text-muted-foreground">
                {court.pivot.case_year} · {court.pivot.case_number}
              </div>
              <div className="mt-3">
                <button
                  onClick={() => handleDelete(court.id, court.name)}
                  className="pressable inline-flex items-center gap-2 rounded-full border border-destructive/40 px-3 py-1 text-xs text-destructive"
                >
                  <LexicraftIcon name="shield" size={14} />
                  {t('legalCaseDetails.actions.delete')}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourtList;
