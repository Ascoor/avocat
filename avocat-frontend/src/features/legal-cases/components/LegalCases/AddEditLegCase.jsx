import { useState, useEffect } from 'react';
import useAuth from '@features/auth/components/AuthUser';
import {
  createLegCase,
  getLegcaseTypes,
  updateLegCase,
} from '@shared/services/api/legalCases';
import { useLanguage } from '@shared/contexts/LanguageContext';
import { LexicraftIcon } from '@shared/icons/lexicraft';

const LabelInput = ({ iconName, label, required, as = 'input', ...props }) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs font-semibold text-muted-foreground">
      {label} {required && <span className="text-destructive">*</span>}
    </label>
    <div className="relative">
      {iconName && (
        <span className="absolute inset-y-0 start-3 flex items-center text-muted-foreground">
          <LexicraftIcon name={iconName} size={16} />
        </span>
      )}
      {as === 'input' ? (
        <input
          {...props}
          className="block w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-[hsl(var(--ring))] ps-10"
        />
      ) : (
        <textarea
          {...props}
          className="block w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-[hsl(var(--ring))] ps-10"
        />
      )}
    </div>
  </div>
);

const SelectInput = ({ label, options, required, ...props }) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs font-semibold text-muted-foreground">
      {label} {required && <span className="text-destructive">*</span>}
    </label>
    <select
      {...props}
      className="block w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-[hsl(var(--ring))]"
    >
      <option value="">{label}</option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  </div>
);

const clientCapacityOptions = (t) => [
  {
    id: 'مدعى عليه',
    name: t('legalCaseDetails.editForm.clientCapacity.defendant'),
  },
  {
    id: 'مجنى عليه',
    name: t('legalCaseDetails.editForm.clientCapacity.victim'),
  },
  { id: 'مدعى', name: t('legalCaseDetails.editForm.clientCapacity.claimant') },
  { id: 'متهم', name: t('legalCaseDetails.editForm.clientCapacity.accused') },
];

const LegalCaseEditForm = ({
  caseData,
  setCaseData,
  caseTypes,
  caseSubTypes,
  onCaseTypeChange,
  onSubmit,
  showAlert,
  alertMessage,
  onDismissAlert,
  onCancel,
  isEditing,
  t,
}) => (
  <form noValidate onSubmit={onSubmit} className="space-y-4">
    {showAlert && (
      <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
        <div>{alertMessage}</div>
        <button
          type="button"
          onClick={onDismissAlert}
          className="mt-2 text-xs underline"
        >
          {t('common.close')}
        </button>
      </div>
    )}
    <div className="grid gap-4 md:grid-cols-2">
      <LabelInput
        iconName="document"
        label={t('legalCaseDetails.editForm.slug')}
        name="slug"
        value={caseData.slug}
        onChange={(event) =>
          setCaseData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value,
          }))
        }
        required
      />
      <SelectInput
        label={t('legalCaseDetails.editForm.clientCapacity.label')}
        name="client_capacity"
        value={caseData.client_capacity}
        onChange={(event) =>
          setCaseData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value,
          }))
        }
        options={clientCapacityOptions(t)}
        required
      />
    </div>
    <div className="grid gap-4 md:grid-cols-2">
      <SelectInput
        label={t('legalCaseDetails.editForm.caseType')}
        name="case_type_id"
        value={caseData.case_type_id}
        onChange={onCaseTypeChange}
        options={caseTypes.map((type) => ({
          id: type.id,
          name: type.name,
        }))}
        required
      />
      <SelectInput
        label={t('legalCaseDetails.editForm.caseSubType')}
        name="sub_type_id"
        value={caseData.sub_type_id}
        onChange={(event) =>
          setCaseData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value,
          }))
        }
        options={caseSubTypes.map((subType) => ({
          id: subType.id,
          name: subType.name,
        }))}
        required
      />
    </div>
    <LabelInput
      label={t('legalCaseDetails.editForm.title')}
      name="title"
      value={caseData.title}
      onChange={(event) =>
        setCaseData((prevData) => ({
          ...prevData,
          [event.target.name]: event.target.value,
        }))
      }
      required
      iconName="briefcase"
    />
    <LabelInput
      label={t('legalCaseDetails.editForm.description')}
      name="description"
      value={caseData.description}
      onChange={(event) =>
        setCaseData((prevData) => ({
          ...prevData,
          [event.target.name]: event.target.value,
        }))
      }
      required
      as="textarea"
      rows={3}
      iconName="document"
    />
    <div className="grid gap-4 md:grid-cols-2">
      <LabelInput
        label={t('legalCaseDetails.editForm.litigantName')}
        name="litigants_name"
        value={caseData.litigants_name}
        onChange={(event) =>
          setCaseData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value,
          }))
        }
      />
      <LabelInput
        label={t('legalCaseDetails.editForm.litigantPhone')}
        name="litigants_phone"
        value={caseData.litigants_phone}
        onChange={(event) =>
          setCaseData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value,
          }))
        }
        type="tel"
      />
    </div>
    <div className="grid gap-4 md:grid-cols-2">
      <LabelInput
        label={t('legalCaseDetails.editForm.lawyerName')}
        name="litigants_lawyer_name"
        value={caseData.litigants_lawyer_name}
        onChange={(event) =>
          setCaseData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value,
          }))
        }
      />
      <LabelInput
        label={t('legalCaseDetails.editForm.lawyerPhone')}
        name="litigants_lawyer_phone"
        value={caseData.litigants_lawyer_phone}
        onChange={(event) =>
          setCaseData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value,
          }))
        }
        type="tel"
      />
    </div>

    <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
      <button
        type="button"
        onClick={onCancel}
        className="pressable inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold"
      >
        <LexicraftIcon name="arrow-forward" size={16} isDirectional />
        {t('common.cancel')}
      </button>
      <button
        type="submit"
        className="pressable inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground"
      >
        <LexicraftIcon name="document" size={16} />
        {isEditing
          ? t('legalCaseDetails.actions.saveChanges')
          : t('legalCaseDetails.actions.save')}
      </button>
    </div>
  </form>
);

const AddEditLegCase = ({
  onClose,
  fetchLegCases,
  isEditing,
  editingLegCase,
}) => {
  const { getUser } = useAuth();
  const { t } = useLanguage();
  const [caseData, setCaseData] = useState({
    slug: '',
    title: '',
    description: '',
    case_type_id: '',
    sub_type_id: '',
    client_capacity: '',
    litigants_name: '',
    litigants_phone: '',
    litigants_lawyer_name: '',
    litigants_lawyer_phone: '',
    created_by: getUser().id,
  });

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [caseTypes, setCaseTypes] = useState([]);
  const [caseSubTypes, setCaseSubTypes] = useState([]);

  useEffect(() => {
    fetchCaseTypes();
  }, []);

  useEffect(() => {
    if (isEditing && editingLegCase) {
      setCaseData(editingLegCase);
      updateSubTypes(editingLegCase.case_type_id);
    } else {
      resetForm();
    }
  }, [isEditing, editingLegCase]);

  const fetchCaseTypes = async () => {
    try {
      const response = await getLegcaseTypes();
      setCaseTypes(response.data);
    } catch (error) {
      setAlertMessage(t('legalCaseDetails.editForm.errors.loadTypes'));
      setShowAlert(true);
    }
  };

  const resetForm = () => {
    setCaseData({
      slug: '',
      title: '',
      description: '',
      case_type_id: '',
      sub_type_id: '',
      client_capacity: '',
      litigants_name: '',
      litigants_phone: '',
      litigants_lawyer_name: '',
      litigants_lawyer_phone: '',
      created_by: getUser().id,
    });
    setCaseSubTypes([]);
  };

  const handleCaseTypeChange = (event) => {
    const newCaseTypeId = event.target.value;

    setCaseData((prevData) => ({
      ...prevData,
      case_type_id: newCaseTypeId,
      sub_type_id: '',
    }));

    updateSubTypes(newCaseTypeId);
  };

  const updateSubTypes = (caseTypeId) => {
    const selectedCaseType = caseTypes.find(
      (type) => type.id.toString() === caseTypeId,
    );
    if (selectedCaseType) {
      setCaseSubTypes(selectedCaseType.sub_types);
    } else {
      setCaseSubTypes([]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.stopPropagation();
      return;
    }

    try {
      if (isEditing) {
        await updateLegCase(editingLegCase.id, {
          ...caseData,
          updated_by: getUser().id,
        });
      } else {
        await createLegCase(caseData);
      }
      onClose();
      fetchLegCases();
    } catch (error) {
      setAlertMessage(
        t('legalCaseDetails.editForm.errors.saveFailed', {
          message: error.message,
        }),
      );
      setShowAlert(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="modal-surface modal-motion w-full max-w-2xl rounded-2xl p-6 shadow-xl">
        <div className="flex items-start justify-between border-b border-border pb-3">
          <div className="flex items-start gap-3">
            <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <LexicraftIcon name="briefcase" size={20} />
            </span>
            <div>
              <h5 className="text-lg font-semibold text-foreground">
                {isEditing
                  ? t('legalCaseDetails.editForm.editTitle')
                  : t('legalCaseDetails.editForm.addTitle')}
              </h5>
              <p className="text-sm text-muted-foreground">
                {t('legalCaseDetails.editForm.subtitle')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
            aria-label={t('common.close')}
          >
            &times;
          </button>
        </div>
        <LegalCaseEditForm
          caseData={caseData}
          setCaseData={setCaseData}
          caseTypes={caseTypes}
          caseSubTypes={caseSubTypes}
          onCaseTypeChange={handleCaseTypeChange}
          onSubmit={handleSubmit}
          showAlert={showAlert}
          alertMessage={alertMessage}
          onDismissAlert={() => setShowAlert(false)}
          onCancel={onClose}
          isEditing={isEditing}
          t={t}
        />
      </div>
    </div>
  );
};

export default AddEditLegCase;
