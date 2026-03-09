import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '@shared/contexts/AuthContext';
import { useLanguage } from '@shared/contexts/LanguageContext';
import { useAlert } from '@shared/contexts/AlertContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@shared/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@shared/ui/card';
import { Button } from '@shared/ui/button';
import LookupManager from '@shared/components/LookupManager/LookupManager';
import CaseSettingsPanel from '../components/CaseSettingsPanel';
import {
  courtSettingEntities,
  courtSettingFieldsByEntity,
  lookupEntities,
  lookupFields,
} from '@shared/components/LookupManager/config';
import { getLookups } from '@shared/services/api/lookups';
import { getOfficePreferences, updateOfficePreferences } from '@shared/services/api/officePreferences';

const ManagementSettings = () => {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const { triggerAlert } = useAlert();
  const [activeSectionTab, setActiveSectionTab] = useState('office_preferences');
  const [activeLookupTab, setActiveLookupTab] = useState(lookupEntities[0].value);
  const [activeCourtTab, setActiveCourtTab] = useState(courtSettingEntities[0].value);
  const officeId = user?.officeId ?? user?.office_id;

  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrencyId, setSelectedCurrencyId] = useState('');
  const [savingCurrency, setSavingCurrency] = useState(false);

  useEffect(() => {
    if (!officeId) return;

    const loadCurrencySettings = async () => {
      try {
        const [currencyOptions, preferences] = await Promise.all([
          getLookups({ entity: 'currencies', officeId }),
          getOfficePreferences(officeId),
        ]);

        setCurrencies(currencyOptions);

        if (preferences?.default_currency_id) {
          setSelectedCurrencyId(String(preferences.default_currency_id));
          return;
        }

        const fallback = currencyOptions.find((item) => item.code === 'SAR') ?? currencyOptions[0];
        setSelectedCurrencyId(fallback?.id ? String(fallback.id) : '');
      } catch {
        triggerAlert('error', 'تعذر تحميل إعدادات العملة.');
      }
    };

    loadCurrencySettings();
  }, [officeId, triggerAlert]);

  const selectedCurrency = useMemo(
    () => currencies.find((item) => String(item.id) === String(selectedCurrencyId)),
    [currencies, selectedCurrencyId],
  );

  const saveDefaultCurrency = async () => {
    if (!officeId || !selectedCurrencyId) return;

    setSavingCurrency(true);
    try {
      await updateOfficePreferences(officeId, {
        default_currency_id: Number(selectedCurrencyId),
      });

      localStorage.setItem('office.defaultCurrencyCode', selectedCurrency?.code ?? 'SAR');
      triggerAlert('success', 'تم حفظ العملة الافتراضية بنجاح.');
    } catch {
      triggerAlert('error', 'تعذر حفظ إعدادات العملة.');
    } finally {
      setSavingCurrency(false);
    }
  };

  return (
    <section className="space-y-6 p-4 sm:p-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">{t('settings.lookups.title')}</h1>
        <p className="text-sm text-muted-foreground">{t('settings.lookups.subtitle')}</p>
      </div>

      <Tabs value={activeSectionTab} onValueChange={setActiveSectionTab} className="space-y-4">
        <TabsList className="flex h-auto w-full flex-nowrap justify-start gap-2 overflow-x-auto">
          <TabsTrigger value="office_preferences">إعدادات المكتب العامة</TabsTrigger>
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

        <TabsContent value="office_preferences">
          <Card>
            <CardHeader>
              <CardTitle>العملة الافتراضية للمكتب</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                اختر العملة الرسمية التي سيتم استخدامها افتراضيًا في الشاشات المالية داخل النظام.
              </p>

              <div className="max-w-md">
                <label className="mb-1 block text-sm font-medium">العملة</label>
                <select
                  value={selectedCurrencyId}
                  onChange={(event) => setSelectedCurrencyId(event.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">اختر العملة</option>
                  {currencies.map((currency) => {
                    const localizedName = language === 'en'
                      ? currency.name_en || currency.name
                      : currency.name_ar || currency.name;

                    return (
                      <option key={currency.id} value={currency.id}>
                        {currency.code} ({currency.symbol}) - {localizedName}
                      </option>
                    );
                  })}
                </select>
              </div>

              <Button onClick={saveDefaultCurrency} disabled={savingCurrency || !selectedCurrencyId}>
                {savingCurrency ? t('common.loading') : 'حفظ العملة الافتراضية'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

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

          <Tabs value={activeLookupTab} onValueChange={setActiveLookupTab} className="space-y-4">
            <TabsList className="flex h-auto w-full flex-nowrap justify-start gap-2 overflow-x-auto">
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
            value={activeCourtTab}
            onValueChange={setActiveCourtTab}
            className="space-y-4"
          >
            <TabsList className="flex h-auto w-full flex-nowrap justify-start gap-2 overflow-x-auto">
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
