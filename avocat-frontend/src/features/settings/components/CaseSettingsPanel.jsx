import { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '@shared/contexts/LanguageContext';
import { useAlert } from '@shared/contexts/AlertContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@shared/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@shared/ui/card';
import LookupManager from '@shared/components/LookupManager/LookupManager';
import { getLookups } from '@shared/services/api/lookups';

const caseTypeFields = [
  { name: 'name', labelKey: 'settings.lookups.fields.name' },
  { name: 'sort_order', labelKey: 'settings.lookups.fields.sortOrder', type: 'number' },
  { name: 'is_active', labelKey: 'settings.lookups.fields.active', type: 'checkbox' },
];

const CaseSettingsPanel = ({ officeId }) => {
  const { t } = useLanguage();
  const { triggerAlert } = useAlert();
  const [tab, setTab] = useState('case_types');
  const [caseTypes, setCaseTypes] = useState([]);
  const [selectedCaseTypeId, setSelectedCaseTypeId] = useState('');

  const loadCaseTypes = async () => {
    try {
      const list = await getLookups({ entity: 'case_types', officeId });
      setCaseTypes(list);
      if (!selectedCaseTypeId && list.length > 0) {
        setSelectedCaseTypeId(String(list[0].id));
      }
    } catch {
      triggerAlert('error', t('settings.lookups.messages.loadError'));
    }
  };

  useEffect(() => {
    loadCaseTypes();
  }, [officeId]);

  const subtypeParams = useMemo(
    () => (selectedCaseTypeId ? { case_type_id: selectedCaseTypeId } : {}),
    [selectedCaseTypeId],
  );

  return (
    <Tabs value={tab} onValueChange={setTab} className="space-y-4">
      <TabsList className="h-auto w-full justify-start gap-2 overflow-x-auto">
        <TabsTrigger value="case_types">{t('settings.lookups.entities.caseTypes')}</TabsTrigger>
        <TabsTrigger value="case_sub_types">{t('settings.lookups.entities.caseSubTypes')}</TabsTrigger>
      </TabsList>

      <TabsContent value="case_types">
        <LookupManager
          officeId={officeId}
          entity="case_types"
          titleKey="settings.lookups.entities.caseTypes"
          fields={caseTypeFields}
        />
      </TabsContent>

      <TabsContent value="case_sub_types" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>{t('settings.lookups.caseSubTypes.filterTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <select
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={selectedCaseTypeId}
              onChange={(event) => setSelectedCaseTypeId(event.target.value)}
            >
              <option value="">{t('settings.lookups.caseSubTypes.selectCaseType')}</option>
              {caseTypes.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </CardContent>
        </Card>

        <LookupManager
          officeId={officeId}
          entity="case_sub_types"
          titleKey="settings.lookups.entities.caseSubTypes"
          fields={caseTypeFields}
          listParams={subtypeParams}
          disabled={!selectedCaseTypeId}
          disabledMessageKey="settings.lookups.caseSubTypes.selectCaseType"
          preparePayload={(payload) => ({ ...payload, case_type_id: Number(selectedCaseTypeId) })}
        />
      </TabsContent>
    </Tabs>
  );
};

export default CaseSettingsPanel;
