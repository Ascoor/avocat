import { useLanguage } from '@shared/contexts/LanguageContext';

const SessionDetailsModal = ({ isOpen, onClose, session }) => {
  const { t } = useLanguage();
  if (!isOpen || !session) return null;

  const notAvailable = t('legalCaseDetails.sessions.details.notAvailable');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div
        id="modal-overlay"
        onClick={(e) => e.target.id === 'modal-overlay' && onClose()}
        className="fixed inset-0"
      >
        <section className="relative mx-auto w-full max-w-2xl rounded-2xl border border-border bg-card p-6 shadow-xl max-h-[90vh] overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-4 end-4 text-muted-foreground hover:text-foreground"
            aria-label={t('common.close')}
          >
            &#x2715;
          </button>

          <h2 className="text-lg font-semibold text-center">
            {t('legalCaseDetails.sessions.details.title')}
          </h2>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground">
                {t('legalCaseDetails.sessions.details.date')}
              </label>
              <input
                type="text"
                value={session.session_date || notAvailable}
                readOnly
                className="w-full mt-2 rounded-xl border border-border bg-muted px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground">
                {t('legalCaseDetails.sessions.details.lawyer')}
              </label>
              <input
                type="text"
                value={session.lawyer?.name || notAvailable}
                readOnly
                className="w-full mt-2 rounded-xl border border-border bg-muted px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground">
                {t('legalCaseDetails.sessions.details.roll')}
              </label>
              <input
                type="text"
                value={session.session_roll || notAvailable}
                readOnly
                className="w-full mt-2 rounded-xl border border-border bg-muted px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground">
                {t('legalCaseDetails.sessions.details.court')}
              </label>
              <input
                type="text"
                value={session.court?.name || notAvailable}
                readOnly
                className="w-full mt-2 rounded-xl border border-border bg-muted px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground">
                {t('legalCaseDetails.sessions.details.type')}
              </label>
              <input
                type="text"
                value={session.legal_session_type?.name || notAvailable}
                readOnly
                className="w-full mt-2 rounded-xl border border-border bg-muted px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground">
                {t('legalCaseDetails.sessions.details.status')}
              </label>
              <div className="w-full mt-2 rounded-xl border border-border bg-muted px-3 py-2 text-sm">
                {session.status || t('legalCaseDetails.sessions.details.empty')}
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-muted-foreground">
                {t('legalCaseDetails.sessions.details.orders')}
              </label>
              <textarea
                value={session.orders || notAvailable}
                readOnly
                className="w-full mt-2 rounded-xl border border-border bg-muted px-3 py-2 text-sm"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-muted-foreground">
                {t('legalCaseDetails.sessions.details.result')}
              </label>
              <textarea
                value={session.result || notAvailable}
                readOnly
                className="w-full mt-2 rounded-xl border border-border bg-muted px-3 py-2 text-sm"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-muted-foreground">
                {t('legalCaseDetails.sessions.details.notes')}
              </label>
              <textarea
                value={session.notes || notAvailable}
                readOnly
                className="w-full mt-2 rounded-xl border border-border bg-muted px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground">
                {t('legalCaseDetails.sessions.details.costReceipts')}
              </label>
              <input
                type="text"
                value={session.cost1 || t('legalCaseDetails.sessions.details.empty')}
                readOnly
                className="w-full mt-2 rounded-xl border border-border bg-muted px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground">
                {t('legalCaseDetails.sessions.details.costFees')}
              </label>
              <input
                type="text"
                value={session.cost2 || t('legalCaseDetails.sessions.details.empty')}
                readOnly
                className="w-full mt-2 rounded-xl border border-border bg-muted px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground">
                {t('legalCaseDetails.sessions.details.costOther')}
              </label>
              <input
                type="text"
                value={session.cost3 || t('legalCaseDetails.sessions.details.empty')}
                readOnly
                className="w-full mt-2 rounded-xl border border-border bg-muted px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground">
                {t('legalCaseDetails.sessions.details.createdBy')}
              </label>
              <input
                type="text"
                value={session.created_by?.name || notAvailable}
                readOnly
                className="w-full mt-2 rounded-xl border border-border bg-muted px-3 py-2 text-sm"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SessionDetailsModal;
