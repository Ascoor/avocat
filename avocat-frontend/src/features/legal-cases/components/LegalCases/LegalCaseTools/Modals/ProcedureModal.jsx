import { useState, useEffect } from 'react';
import {
  createProcedure,
  updateProcedure,
  getProcedureTypes,
  getProcedurePlaceTypes,
} from '@shared/services/api/procedures';
import { getLawyers } from '@shared/services/api/lawyers';
import useAuth from '@features/auth/components/AuthUser';
import { useAlert } from '@shared/contexts/AlertContext';
import { useLanguage } from '@shared/contexts/LanguageContext';
import { LexicraftIcon } from '@shared/icons/lexicraft';

const ProcedureForm = ({
  formData,
  onChange,
  procedureTypes,
  procedurePlaceTypes,
  lawyers,
  isEdit,
  formError,
  onSubmit,
  onClose,
  t,
}) => (
  <form
    onSubmit={onSubmit}
    className="space-y-5 max-h-[70vh] overflow-y-auto pr-2"
  >
    {formError && (
      <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
        {formError}
      </div>
    )}

    <div>
      <label className="block text-xs font-semibold text-muted-foreground">
        {t('legalCaseDetails.procedures.form.type')} <span className="text-destructive">*</span>
      </label>
      <select
        name="procedure_type_id"
        value={formData.procedure_type_id}
        onChange={onChange}
        className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-[hsl(var(--ring))]"
        required
      >
        <option value="">{t('legalCaseDetails.procedures.form.typePlaceholder')}</option>
        {procedureTypes.map((type) => (
          <option key={type.id} value={type.id}>
            {type.name}
          </option>
        ))}
      </select>
    </div>

    <div>
      <label className="block text-xs font-semibold text-muted-foreground">
        {t('legalCaseDetails.procedures.form.placeType')} <span className="text-destructive">*</span>
      </label>
      <select
        name="procedure_place_type_id"
        value={formData.procedure_place_type_id}
        onChange={onChange}
        className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-[hsl(var(--ring))]"
        required
      >
        <option value="">{t('legalCaseDetails.procedures.form.placeTypePlaceholder')}</option>
        {procedurePlaceTypes.map((placeType) => (
          <option key={placeType.id} value={placeType.id}>
            {placeType.name}
          </option>
        ))}
      </select>
    </div>

    <div>
      <label className="block text-xs font-semibold text-muted-foreground">
        {t('legalCaseDetails.procedures.form.placeName')}
      </label>
      <input
        name="procedure_place_name"
        type="text"
        value={formData.procedure_place_name}
        onChange={onChange}
        className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-[hsl(var(--ring))]"
      />
    </div>

    <div className="grid gap-4 md:grid-cols-2">
      <div>
        <label className="block text-xs font-semibold text-muted-foreground">
          {t('legalCaseDetails.procedures.form.startDate')} <span className="text-destructive">*</span>
        </label>
        <input
          name="date_start"
          type="date"
          value={formData.date_start}
          onChange={onChange}
          className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-[hsl(var(--ring))]"
          required
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-muted-foreground">
          {t('legalCaseDetails.procedures.form.endDate')} <span className="text-destructive">*</span>
        </label>
        <input
          name="date_end"
          type="date"
          value={formData.date_end}
          onChange={onChange}
          className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-[hsl(var(--ring))]"
          required
        />
      </div>
    </div>

    <div>
      <label className="block text-xs font-semibold text-muted-foreground">
        {t('legalCaseDetails.procedures.form.lawyer')} <span className="text-destructive">*</span>
      </label>
      <select
        name="lawyer_id"
        value={formData.lawyer_id}
        onChange={onChange}
        className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-[hsl(var(--ring))]"
        required
      >
        <option value="">{t('legalCaseDetails.procedures.form.lawyerPlaceholder')}</option>
        {lawyers.map((lawyer) => (
          <option key={lawyer.id} value={lawyer.id}>
            {lawyer.name}
          </option>
        ))}
      </select>
    </div>

    <div>
      <label className="block text-xs font-semibold text-muted-foreground">
        {t('legalCaseDetails.procedures.form.request')} <span className="text-destructive">*</span>
      </label>
      <input
        name="job"
        type="text"
        value={formData.job}
        onChange={onChange}
        className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-[hsl(var(--ring))]"
        required
      />
    </div>

    <div>
      <label className="block text-xs font-semibold text-muted-foreground">
        {t('legalCaseDetails.procedures.form.result')}
      </label>
      <input
        name="result"
        type="text"
        value={formData.result}
        onChange={onChange}
        className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-[hsl(var(--ring))]"
      />
    </div>

    {isEdit && (
      <div>
        <label className="block text-xs font-semibold text-muted-foreground">
          {t('legalCaseDetails.procedures.form.status')} <span className="text-destructive">*</span>
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={onChange}
          className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-[hsl(var(--ring))]"
          required
        >
          <option value="جاري التنفيذ">{t('legalCaseDetails.procedures.form.statusInProgress')}</option>
          <option value="تمت">{t('legalCaseDetails.procedures.form.statusDone')}</option>
          <option value="لم ينفذ">{t('legalCaseDetails.procedures.form.statusNotDone')}</option>
        </select>
      </div>
    )}

    <div className="grid gap-4 md:grid-cols-3">
      <div>
        <label className="block text-xs font-semibold text-muted-foreground">
          {t('legalCaseDetails.procedures.form.costReceipts')}
        </label>
        <input
          name="cost"
          type="number"
          value={formData.cost}
          onChange={onChange}
          className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-[hsl(var(--ring))]"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-muted-foreground">
          {t('legalCaseDetails.procedures.form.costFees')}
        </label>
        <input
          name="cost2"
          type="number"
          value={formData.cost2}
          onChange={onChange}
          className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-[hsl(var(--ring))]"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-muted-foreground">
          {t('legalCaseDetails.procedures.form.costOther')}
        </label>
        <input
          name="cost3"
          type="number"
          value={formData.cost3}
          onChange={onChange}
          className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-[hsl(var(--ring))]"
        />
      </div>
    </div>

    <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
      <button
        type="button"
        onClick={onClose}
        className="pressable inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm"
      >
        <LexicraftIcon name="arrow-forward" size={16} isDirectional />
        {t('common.cancel')}
      </button>
      <button
        type="submit"
        className="pressable inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground"
      >
        <LexicraftIcon name="document" size={16} />
        {isEdit ? t('legalCaseDetails.actions.saveChanges') : t('legalCaseDetails.actions.save')}
      </button>
    </div>
  </form>
);

const ProcedureModal = ({
  isOpen,
  onClose,
  onSubmit,
  legalCaseId,
  initialData = {},
  isEdit = false,
}) => {
  const { triggerAlert } = useAlert();
  const { t } = useLanguage();
  const { user } = useAuth();
  const [procedureTypes, setProcedureTypes] = useState([]);
  const [procedurePlaceTypes, setProcedurePlaceTypes] = useState([]);
  const [lawyers, setLawyers] = useState([]);
  const [formError, setFormError] = useState('');

  const [formData, setFormData] = useState({
    job: '',
    date_start: '',
    date_end: '',
    cost: 0,
    cost2: 0,
    cost3: 0,
    procedure_type_id: '',
    lawyer_id: '',
    procedure_place_type_id: '',
    procedure_place_name: '',
    result: '',
    status: 'جاري التنفيذ',
    leg_case_id: legalCaseId,
    created_by: user.id,
  });

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [typesResponse, placesResponse, lawyersResponse] =
          await Promise.all([
            getProcedureTypes(),
            getProcedurePlaceTypes(),
            getLawyers(),
          ]);
        setProcedureTypes(typesResponse.data);
        setProcedurePlaceTypes(placesResponse.data);
        setLawyers(lawyersResponse.data);
      } catch (error) {
        triggerAlert('error', t('legalCaseDetails.procedures.errors.loadForm'));
      }
    };
    fetchDropdownData();
  }, [t, triggerAlert]);

  useEffect(() => {
    if (isEdit && initialData) {
      setFormData({
        job: initialData.job || '',
        date_start: initialData.date_start || '',
        date_end: initialData.date_end || '',
        cost: initialData.cost ?? 0,
        cost2: initialData.cost2 ?? 0,
        cost3: initialData.cost3 ?? 0,
        procedure_type_id: initialData.procedure_type_id || '',
        lawyer_id: initialData.lawyer_id || '',
        procedure_place_type_id: initialData.procedure_place_type_id || '',
        procedure_place_name: initialData.procedure_place_name || '',
        result: initialData.result || '',
        status: initialData.status || 'جاري التنفيذ',
        leg_case_id: legalCaseId,
        updated_by: user.id,
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
        await updateProcedure(initialData.id, formData);
        triggerAlert('success', t('legalCaseDetails.procedures.alerts.updateSuccess'));
      } else {
        await createProcedure(formData);
        triggerAlert('success', t('legalCaseDetails.procedures.alerts.addSuccess'));
      }
      onSubmit(formData);
      onClose();
    } catch (error) {
      const message = t('legalCaseDetails.procedures.alerts.saveError');
      setFormError(message);
      triggerAlert('error', message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="modal-surface modal-motion w-full max-w-2xl rounded-2xl p-6 shadow-xl">
        <div className="flex items-start justify-between border-b border-border pb-3">
          <div className="flex items-start gap-3">
            <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <LexicraftIcon name="document" size={20} />
            </span>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                {isEdit ? t('legalCaseDetails.procedures.form.editTitle') : t('legalCaseDetails.procedures.form.addTitle')}
              </h2>
              <p className="text-sm text-muted-foreground">
                {t('legalCaseDetails.procedures.form.subtitle')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
            aria-label={t('common.close')}
          >
            &#x2715;
          </button>
        </div>

        <ProcedureForm
          formData={formData}
          onChange={handleChange}
          procedureTypes={procedureTypes}
          procedurePlaceTypes={procedurePlaceTypes}
          lawyers={lawyers}
          isEdit={isEdit}
          formError={formError}
          onSubmit={handleSubmit}
          onClose={onClose}
          t={t}
        />
      </div>
    </div>
  );
};

export default ProcedureModal;
