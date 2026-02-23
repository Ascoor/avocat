import { useState } from 'react';
import { useAuth } from '@shared/contexts/AuthContext';
import { useLanguage } from '@shared/contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@shared/ui/tabs';
import LookupManager from '@shared/components/LookupManager/LookupManager';
import CaseSettingsPanel from '../components/CaseSettingsPanel';
import {
  lookupEntities,
  lookupFields,
} from '@shared/components/LookupManager/config';

const ManagementSettings = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [currentEntity, setCurrentEntity] = useState(lookupEntities[0].value);
  const officeId = user?.officeId ?? user?.office_id;

  return (
    <section className="space-y-4 p-4 sm:p-6">
      <h1 className="text-2xl font-bold">{t('settings.lookups.title')}</h1>
      <p className="text-sm text-muted-foreground">
        {t('settings.lookups.subtitle')}
      </p>


      <CaseSettingsPanel officeId={officeId} />

      <Tabs value={currentEntity} onValueChange={setCurrentEntity} className="space-y-4">
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
              fields={lookupFields}
            />
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default ManagementSettings;
