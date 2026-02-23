import { useState } from 'react';
import { useAuth } from '@shared/contexts/AuthContext';
import { useLanguage } from '@shared/contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@shared/ui/tabs';
import LookupManager from '@shared/components/LookupManager/LookupManager';
import CaseSettingsPanel from '../components/CaseSettingsPanel';
import {
  courtSettingEntities,
  courtSettingFieldsByEntity,
  lookupEntities,
  lookupFields,
} from '@shared/components/LookupManager/config';

const ManagementSettings = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState('case_settings');
  const [currentEntity, setCurrentEntity] = useState(lookupEntities[0].value);
  const [currentCourtEntity, setCurrentCourtEntity] = useState(courtSettingEntities[0].value);
  const officeId = user?.officeId ?? user?.office_id;

  return (
    <section className="space-y-6 p-4 sm:p-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">{t('settings.lookups.title')}</h1>
        <p className="text-sm text-muted-foreground">{t('settings.lookups.subtitle')}</p>
      </div>

      <Tabs value={activeSection} onValueChange={setActiveSection} className="space-y-4">
        <TabsList className="h-auto w-full justify-start gap-2 overflow-x-auto">
          <TabsTrigger value="case_settings">
            {t('settings.lookups.sectionTabs.caseSettings')}
          </TabsTrigger>
          <TabsTrigger value="shared_lookups">
            {t('settings.lookups.sectionTabs.sharedLookups')}
          </TabsTrigger>
          <TabsTrigger value="courts_settings">
            {t('settings.lookups.sectionTabs.courts')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="case_settings">
          <CaseSettingsPanel officeId={officeId} />
        </TabsContent>

        <TabsContent value="shared_lookups" className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">{t('settings.lookups.sectionTabs.sharedLookups')}</h2>
            <p className="text-sm text-muted-foreground">
              {t('settings.lookups.sharedLookupsSubtitle')}
            </p>
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
        </TabsContent>

        <TabsContent value="courts_settings" className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">{t('settings.lookups.courtsSectionTitle')}</h2>
            <p className="text-sm text-muted-foreground">
              {t('settings.lookups.courtsSectionSubtitle')}
            </p>
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
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default ManagementSettings;
