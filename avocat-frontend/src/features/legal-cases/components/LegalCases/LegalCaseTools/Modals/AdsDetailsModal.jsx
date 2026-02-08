import { useLanguage } from '@shared/contexts/LanguageContext';
import { LexicraftIcon } from '@shared/icons/lexicraft';

const AdsDetailsModal = ({ isOpen, onClose, adDetails }) => {
  const { t } = useLanguage();
  if (!isOpen || !adDetails) return null;

  const notAvailable = t('legalCaseDetails.ads.details.notAvailable');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-2xl rounded-2xl border border-border bg-card shadow-xl">
        <div className="flex items-center justify-between border-b border-border p-4">
          <h3 className="text-lg font-semibold">
            {t('legalCaseDetails.ads.details.title')}
          </h3>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
            aria-label={t('common.close')}
          >
            <LexicraftIcon name="lock" size={20} />
          </button>
        </div>
        <div className="p-4 space-y-4 text-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground">
                {t('legalCaseDetails.ads.details.type')}
              </label>
              <p>{adDetails.legalAdType?.name || notAvailable}</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground">
                {t('legalCaseDetails.ads.details.court')}
              </label>
              <p>{adDetails.court?.name || notAvailable}</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground">
                {t('legalCaseDetails.ads.details.sender')}
              </label>
              <p>{adDetails.lawyerSend?.name || notAvailable}</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground">
                {t('legalCaseDetails.ads.details.receiver')}
              </label>
              <p>{adDetails.lawyerReceive?.name || notAvailable}</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground">
                {t('legalCaseDetails.ads.details.sendDate')}
              </label>
              <p>{adDetails.send_date || notAvailable}</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground">
                {t('legalCaseDetails.ads.details.receiveDate')}
              </label>
              <p>{adDetails.receive_date || notAvailable}</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted-foreground">
              {t('legalCaseDetails.ads.details.status')}
            </label>
            <p className="mt-2 rounded-xl border border-border bg-muted px-3 py-2 text-center">
              {adDetails.status || notAvailable}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground">
                {t('legalCaseDetails.ads.details.costOne')}
              </label>
              <p>{adDetails.cost || notAvailable}</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground">
                {t('legalCaseDetails.ads.details.costTwo')}
              </label>
              <p>{adDetails.cost2 || notAvailable}</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted-foreground">
              {t('legalCaseDetails.ads.details.description')}
            </label>
            <p>{adDetails.description || notAvailable}</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted-foreground">
              {t('legalCaseDetails.ads.details.results')}
            </label>
            <p>{adDetails.results || notAvailable}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdsDetailsModal;
