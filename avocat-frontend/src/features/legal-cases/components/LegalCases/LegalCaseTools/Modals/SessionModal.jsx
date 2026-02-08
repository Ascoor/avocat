import { useEffect, useState } from 'react';
import {
  createSession,
  updateSession,
  getLegalSessionTypes,
} from '@shared/services/api/sessions';
import { getCourts } from '@shared/services/api/legalCases';
import { getLawyers } from '@shared/services/api/lawyers';
import useAuth from '@features/auth/components/AuthUser';
import { useAlert } from '@shared/contexts/AlertContext';
import { useLanguage } from '@shared/contexts/LanguageContext';

const SessionForm = ({
  isEdit,
  formData,
  onChange,
  courts,
  legalSessionTypes,
  lawyers,
  onSubmit,
  onClose,
  formError,
  t,
}) => (
  <form onSubmit={onSubmit} className="space-y-5">
    {formError && (
      <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
        {formError}
      </div>
    )}

    {!isEdit && (
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold text-muted-foreground">
            {t('legalCaseDetails.sessions.form.court')} <span className="text-destructive">*</span>
          </label>
          <select
            name="court_id"
            value={formData.court_id}
            onChange={onChange}
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
            required
          >
            <option value="">{t('legalCaseDetails.sessions.form.courtPlaceholder')}</option>
            {courts.map((court) => (
              <option key={court.id} value={court.id}>
                {court.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-muted-foreground">
            {t('legalCaseDetails.sessions.form.type')} <span className="text-destructive">*</span>
          </label>
          <select
            name="legal_session_type_id"
            value={formData.legal_session_type_id}
            onChange={onChange}
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
            required
          >
            <option value="">{t('legalCaseDetails.sessions.form.typePlaceholder')}</option>
            {legalSessionTypes.map((legalSessionType) => (
              <option
                key={legalSessionType.id}
                value={legalSessionType.id}
              >
                {legalSessionType.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-muted-foreground">
            {t('legalCaseDetails.sessions.form.department')}
          </label>
          <input
            name="court_department"
            type="text"
            value={formData.court_department}
            onChange={onChange}
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-muted-foreground">
            {t('legalCaseDetails.sessions.form.roll')}
          </label>
          <input
            name="session_roll"
            type="text"
            value={formData.session_roll}
            onChange={onChange}
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-muted-foreground">
            {t('legalCaseDetails.sessions.form.date')} <span className="text-destructive">*</span>
          </label>
          <input
            name="session_date"
            type="date"
            value={formData.session_date}
            onChange={onChange}
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-muted-foreground">
            {t('legalCaseDetails.sessions.form.lawyer')} <span className="text-destructive">*</span>
          </label>
          <select
            name="lawyer_id"
            value={formData.lawyer_id}
            onChange={onChange}
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
            required
          >
            <option value="">{t('legalCaseDetails.sessions.form.lawyerPlaceholder')}</option>
            {lawyers.map((lawyer) => (
              <option key={lawyer.id} value={lawyer.id}>
                {lawyer.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-muted-foreground">
            {t('legalCaseDetails.sessions.form.orders')} <span className="text-destructive">*</span>
          </label>
          <input
            name="orders"
            type="text"
            value={formData.orders}
            onChange={onChange}
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-muted-foreground">
            {t('legalCaseDetails.sessions.form.notes')}
          </label>
          <input
            name="notes"
            type="text"
            value={formData.notes}
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
            {t('legalCaseDetails.sessions.form.result')}
          </label>
          <input
            name="result"
            type="text"
            value={formData.result}
            onChange={onChange}
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-muted-foreground">
            {t('legalCaseDetails.sessions.form.judgment')}
          </label>
          <textarea
            name="Judgment_operative"
            value={formData.Judgment_operative}
            onChange={onChange}
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
            rows="3"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-muted-foreground">
            {t('legalCaseDetails.sessions.form.status')} <span className="text-destructive">*</span>
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={onChange}
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
            required
          >
            <option value="جارى التنفيذ">{t('legalCaseDetails.sessions.form.statusInProgress')}</option>
            <option value="تمت">{t('legalCaseDetails.sessions.form.statusDone')}</option>
            <option value="لم ينفذ">{t('legalCaseDetails.sessions.form.statusNotDone')}</option>
          </select>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="block text-xs font-semibold text-muted-foreground">
              {t('legalCaseDetails.sessions.form.costReceipts')}
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
              {t('legalCaseDetails.sessions.form.costFees')}
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
              {t('legalCaseDetails.sessions.form.costOther')}
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

    <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
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

const SessionModal = ({
  isOpen,
  onClose,
  onSubmit,
  fetchSessions,
  legalCaseId,
  initialData = {},
  isEdit = false,
}) => {
  const { triggerAlert } = useAlert();
  const { t } = useLanguage();
  const { user } = useAuth();
  const [courts, setCourts] = useState([]);
  const [legalSessionTypes, setLegalSessionTypes] = useState([]);
  const [lawyers, setLawyers] = useState([]);
  const [formError, setFormError] = useState('');

  const [formData, setFormData] = useState({
    session_date: '',
    session_roll: '',
    cost1: 0,
    cost2: 0,
    cost3: 0,
    court_id: '',
    legal_session_type_id: '',
    lawyer_id: '',
    court_department: '',
    result: '',
    orders: '',
    notes: '',
    status: 'جارى التنفيذ',
    leg_case_id: legalCaseId,
    created_by: user.id,
    Judgment_operative: '',
  });

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [courtResponse, legalSessionTypeResponse, lawyersResponse] =
          await Promise.all([
            getCourts(),
            getLegalSessionTypes(),
            getLawyers(),
          ]);

        setCourts(courtResponse.data);
        setLegalSessionTypes(legalSessionTypeResponse.data);
        setLawyers(lawyersResponse.data);
      } catch (error) {
        triggerAlert('error', t('legalCaseDetails.sessions.errors.loadForm'));
      }
    };
    fetchDropdownData();
  }, [legalCaseId, t, triggerAlert]);

  useEffect(() => {
    if (isEdit && initialData) {
      setFormData({
        ...initialData,
        session_date: initialData.session_date || '',
        session_roll: initialData.session_roll || '',
        cost1: initialData.cost1 || 0,
        cost2: initialData.cost2 || 0,
        cost3: initialData.cost3 || 0,
        court_id: initialData.court_id || '',
        legal_session_type_id: initialData.legal_session_type_id || '',
        lawyer_id: initialData.lawyer_id || '',
        court_department: initialData.court_department || '',
        result: initialData.result || '',
        orders: initialData.orders || '',
        notes: initialData.notes || '',
        status: initialData.status || 'جارى التنفيذ',
        leg_case_id: legalCaseId,
        created_by: user.id,
        Judgment_operative: initialData.Judgment_operative || '',
      });
    }
  }, [isEdit, initialData, legalCaseId, user.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    try {
      if (isEdit) {
        await updateSession(initialData.id, formData);
        triggerAlert('success', t('legalCaseDetails.sessions.alerts.updateSuccess'));
      } else {
        await createSession(formData);
        triggerAlert('success', t('legalCaseDetails.sessions.alerts.addSuccess'));
      }
      onSubmit(formData);
      onClose();
      fetchSessions();
    } catch (error) {
      const message = t('legalCaseDetails.sessions.alerts.saveError');
      setFormError(message);
      triggerAlert('error', message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-2xl rounded-2xl border border-border bg-card p-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h2 className="text-lg font-semibold">
            {isEdit ? t('legalCaseDetails.sessions.form.editTitle') : t('legalCaseDetails.sessions.form.addTitle')}
          </h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
            aria-label={t('common.close')}
          >
            &#x2715;
          </button>
        </div>

        <SessionForm
          isEdit={isEdit}
          formData={formData}
          onChange={handleChange}
          courts={courts}
          legalSessionTypes={legalSessionTypes}
          lawyers={lawyers}
          onSubmit={handleSubmit}
          onClose={onClose}
          formError={formError}
          t={t}
        />
      </div>
    </div>
  );
};

export default SessionModal;
