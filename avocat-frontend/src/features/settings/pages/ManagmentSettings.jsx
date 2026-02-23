import { useState } from 'react';
import { useAuth } from '@shared/contexts/AuthContext';
import { useLanguage } from '@shared/contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@shared/ui/tabs';
import LookupManager from '@shared/components/LookupManager/LookupManager';
import {
  courtSettingEntities,
  courtSettingFieldsByEntity,
  lookupEntities,
  lookupFields,
} from '@shared/components/LookupManager/config';

const ManagementSettings = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [currentEntity, setCurrentEntity] = useState(lookupEntities[0].value);
  const [currentCourtEntity, setCurrentCourtEntity] = useState(courtSettingEntities[0].value);
  const officeId = user?.officeId ?? user?.office_id;

  return (
    <section className="space-y-6 p-4 sm:p-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">{t('settings.lookups.title')}</h1>
        <p className="text-sm text-muted-foreground">{t('settings.lookups.subtitle')}</p>
      </div>

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

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">{t('settings.lookups.courtsSectionTitle')}</h2>
        <p className="text-sm text-muted-foreground">{t('settings.lookups.courtsSectionSubtitle')}</p>
      </div>

      <Tabs
        value={currentCourtEntity}
        onValueChange={setCurrentCourtEntity}
        className="space-y-4"
      >
        <TabsList className="h-auto w-full justify-start gap-2 overflow-x-auto">
          {courtSettingEntities.map((entity) => (
            <TabsTrigger key={entity.value} value={entity.value}>
              {t(entity.titleKey)}
            </TabsTrigger>
          ))}
        </TabsList>

        {courtSettingEntities.map((entity) => (
          <TabsContent key={entity.value} value={entity.value}>
            <LookupManager
              officeId={officeId}
              entity={entity.value}
              titleKey={entity.titleKey}
              fields={courtSettingFieldsByEntity[entity.value]}
            />
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default ManagementSettings;
