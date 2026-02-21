import { useMemo } from 'react';
import { useAuth } from '@shared/contexts/AuthContext';
import { useLanguage } from '@shared/contexts/LanguageContext';
import LookupManager from '../components/OfficeSettings/LookupManager';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@shared/ui/tabs';

const lookupEntities = [
  { value: 'case_types', titleKey: 'settings.lookups.entities.caseTypes' },
  {
    value: 'case_sub_types',
    titleKey: 'settings.lookups.entities.caseSubTypes',
  },
  {
    value: 'procedure_types',
    titleKey: 'settings.lookups.entities.procedureTypes',
  },
  {
    value: 'procedure_place_types',
    titleKey: 'settings.lookups.entities.procedurePlaceTypes',
  },
  {
    value: 'legal_session_types',
    titleKey: 'settings.lookups.entities.legalSessionTypes',
  },
  {
    value: 'legal_ad_types',
    titleKey: 'settings.lookups.entities.legalAdTypes',
  },
  {
    value: 'revenue_categories',
    titleKey: 'settings.lookups.entities.revenueCategories',
  },
  {
    value: 'expense_categories',
    titleKey: 'settings.lookups.entities.expenseCategories',
  },
  {
    value: 'service_types',
    titleKey: 'settings.lookups.entities.serviceTypes',
  },
];

const ManagementSettings = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const officeId = user?.officeId ?? user?.office_id;

  const fields = useMemo(
    () => [
      { name: 'name_ar', labelKey: 'settings.lookups.fields.nameAr' },
      { name: 'name_en', labelKey: 'settings.lookups.fields.nameEn' },
      {
        name: 'sort_order',
        labelKey: 'settings.lookups.fields.sortOrder',
        type: 'number',
      },
      {
        name: 'is_active',
        labelKey: 'settings.lookups.fields.active',
        type: 'checkbox',
      },
    ],
    [],
  );

  return (
    <section className="space-y-4 p-4 sm:p-6">
      <h1 className="text-2xl font-bold">{t('settings.lookups.title')}</h1>
      <Tabs defaultValue={lookupEntities[0].value} className="space-y-4">
        <TabsList className="h-auto w-full justify-start gap-2 overflow-x-auto">
          {lookupEntities.map((entity) => (
            <TabsTrigger key={entity.value} value={entity.value}>
              {t(entity.titleKey)}
            </TabsTrigger>
          ))}
        </TabsList>

        {lookupEntities.map((entity) => (
          <TabsContent key={entity.value} value={entity.value}>
            <LookupManager
              officeId={officeId}
              entity={entity.value}
              titleKey={entity.titleKey}
              fields={fields}
              allowDeactivateWhenInUse
            />
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default ManagementSettings;
