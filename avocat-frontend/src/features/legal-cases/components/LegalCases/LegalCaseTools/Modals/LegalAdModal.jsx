import { useEffect, useState } from 'react';
import {
  createLegalAd,
  updateLegalAd,
  getLawyers,
  getCourts,
  getLegalAdTypes,
} from '@shared/services/api/legalCases';
import useAuth from '@features/auth/components/AuthUser';
import { useAlert } from '@shared/contexts/AlertContext';
import { useLanguage } from '@shared/contexts/LanguageContext';

const LegalAdForm = ({
  formData,
  onChange,
  courts,
  legalAdTypes,
  lawyers,
  isEdit,
  onSubmit,
  onClose,
  formError,
  t,
}) => (
  <form onSubmit={onSubmit} className="space-y-4">
    {formError && (
      <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
        {formError}
      </div>
    )}

    <div className="grid gap-4 md:grid-cols-2">
      <div>
        <label className="block text-xs font-semibold text-muted-foreground">
          {t('legalCaseDetails.ads.form.court')} <span className="text-destructive">*</span>
        </label>
        <select
          name="court_id"
          value={formData.court_id}
          onChange={onChange}
          className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
          required
        >
          <option value="">{t('legalCaseDetails.ads.form.courtPlaceholder')}</option>
          {courts.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs font-semibold text-muted-foreground">
          {t('legalCaseDetails.ads.form.type')} <span className="text-destructive">*</span>
        </label>
        <select
          name="legal_ad_type_id"
          value={formData.legal_ad_type_id}
          onChange={onChange}
          className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
          required
        >
          <option value="">{t('legalCaseDetails.ads.form.typePlaceholder')}</option>
          {legalAdTypes.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs font-semibold text-muted-foreground">
          {t('legalCaseDetails.ads.form.sender')} <span className="text-destructive">*</span>
        </label>
        <select
          name="lawyer_send_id"
          value={formData.lawyer_send_id}
          onChange={onChange}
          className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
          required
        >
          <option value="">{t('legalCaseDetails.ads.form.senderPlaceholder')}</option>
          {lawyers.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs font-semibold text-muted-foreground">
          {t('legalCaseDetails.ads.form.description')} <span className="text-destructive">*</span>
        </label>
        <input
          name="description"
          type="text"
          value={formData.description}
          onChange={onChange}
          className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
          required
        />
      </div>
    </div>

    <div>
      <label className="block text-xs font-semibold text-muted-foreground">
        {t('legalCaseDetails.ads.form.sendDate')} <span className="text-destructive">*</span>
      </label>
      <input
        name="send_date"
        type="date"
        value={formData.send_date}
        onChange={onChange}
        className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
        required
      />
    </div>

    {isEdit && (
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold text-muted-foreground">
            {t('legalCaseDetails.ads.form.receiver')} <span className="text-destructive">*</span>
          </label>
          <select
            name="lawyer_receive_id"
            value={formData.lawyer_receive_id}
            onChange={onChange}
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
            required
          >
            <option value="">{t('legalCaseDetails.ads.form.receiverPlaceholder')}</option>
            {lawyers.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-muted-foreground">
            {t('legalCaseDetails.ads.form.receiveDate')}
          </label>
          <input
            name="receive_date"
            type="date"
            value={formData.receive_date}
            onChange={onChange}
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
          />
        </div>
      </div>
    )}

    {isEdit && (
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-muted-foreground">
            {t('legalCaseDetails.ads.form.results')}
          </label>
          <input
            name="results"
            type="text"
            value={formData.results}
            onChange={onChange}
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-muted-foreground">
            {t('legalCaseDetails.ads.form.status')} <span className="text-destructive">*</span>
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={onChange}
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
            required
          >
            <option value="قيد التجهيز">{t('legalCaseDetails.ads.form.statusPreparing')}</option>
            <option value="تم التسليم">{t('legalCaseDetails.ads.form.statusSent')}</option>
            <option value="تم الإستلام">{t('legalCaseDetails.ads.form.statusReceived')}</option>
          </select>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="block text-xs font-semibold text-muted-foreground">
              {t('legalCaseDetails.ads.form.costReceipts')}
            </label>
            <input
              name="cost1"
              type="number"
              value={formData.cost1}
              onChange={onChange}
              className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground">
              {t('legalCaseDetails.ads.form.costFees')}
            </label>
            <input
              name="cost2"
              type="number"
              value={formData.cost2}
              onChange={onChange}
              className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground">
              {t('legalCaseDetails.ads.form.costOther')}
            </label>
            <input
              name="cost3"
              type="number"
              value={formData.cost3}
              onChange={onChange}
              className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
            />
          </div>
        </div>
      </div>
    )}

    <div className="flex flex-wrap items-center justify-end gap-3">
      <button
        type="button"
        onClick={onClose}
        className="pressable rounded-full border border-border px-4 py-2 text-sm"
      >
        {t('common.cancel')}
      </button>
      <button
        type="submit"
        className="pressable rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground"
      >
        {isEdit ? t('legalCaseDetails.actions.saveChanges') : t('legalCaseDetails.actions.save')}
      </button>
    </div>
  </form>
);

const LegalAdModal = ({
  isOpen,
  onClose,
  legCaseId,
  fetchLegalAds,
  initialData = {},
  isEdit = false,
  onSubmit,
}) => {
  const { triggerAlert } = useAlert();
  const { t } = useLanguage();
  const { user } = useAuth();
  const [courts, setCourts] = useState([]);
  const [legalAdTypes, setLegalAdTypes] = useState([]);
  const [lawyers, setLawyers] = useState([]);
  const [formError, setFormError] = useState('');

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
        triggerAlert('error', t('legalCaseDetails.ads.errors.loadForm'));
      }
    };
    fetchDropdownData();
  }, [legCaseId, user, t, triggerAlert]);

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
  }, [isEdit, initialData, legCaseId, user.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
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
          isEdit
            ? t('legalCaseDetails.ads.alerts.updateSuccess')
            : t('legalCaseDetails.ads.alerts.addSuccess'),
        );
        fetchLegalAds();
        onSubmit?.(response.data);
        onClose();
      } else {
        const message = t('legalCaseDetails.ads.alerts.saveError');
        setFormError(message);
        triggerAlert('error', message);
      }
    } catch (error) {
      const message = t('legalCaseDetails.ads.alerts.saveError');
      setFormError(message);
      triggerAlert('error', message);
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-3xl rounded-2xl border border-border bg-card p-6 shadow-xl max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h2 className="text-lg font-semibold">
            {isEdit ? t('legalCaseDetails.ads.form.editTitle') : t('legalCaseDetails.ads.form.addTitle')}
          </h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
            aria-label={t('common.close')}
          >
            &#x2715;
          </button>
        </div>

        <LegalAdForm
          formData={formData}
          onChange={handleChange}
          courts={courts}
          legalAdTypes={legalAdTypes}
          lawyers={lawyers}
          isEdit={isEdit}
          onSubmit={handleSubmit}
          onClose={onClose}
          formError={formError}
          t={t}
        />
      </div>
    </div>
  );
};

export default LegalAdModal;
