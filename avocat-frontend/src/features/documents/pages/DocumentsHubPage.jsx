import React, { useEffect, useMemo, useState } from 'react';
import api from '@shared/api/axiosConfig';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@shared/ui/tabs';
import { useLanguage } from '@shared/contexts/LanguageContext';

const DOCUMENT_SOURCES = {
  documents: '/document-center/documents',
  power_of_attorneys: '/document-center/power-of-attorneys',
  cases: '/document-center/cases',
  services: '/document-center/services',
};

const DEFAULT_TABS = [
  { key: 'documents', labelAr: 'المستندات', labelEn: 'Documents', source: 'documents' },
  { key: 'power_of_attorneys', labelAr: 'التوكيلات', labelEn: 'Power of Attorneys', source: 'power_of_attorneys' },
  { key: 'cases', labelAr: 'القضايا', labelEn: 'Cases', source: 'cases' },
  { key: 'services', labelAr: 'الخدمات', labelEn: 'Services', source: 'services' },
];

const LOCAL_STORAGE_KEY = 'documents.customTabs.v1';

const DocumentsHubPage = () => {
  const { language } = useLanguage();
  const [tabs, setTabs] = useState(DEFAULT_TABS);
  const [activeTab, setActiveTab] = useState(DEFAULT_TABS[0].key);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [newTabLabelAr, setNewTabLabelAr] = useState('');
  const [newTabLabelEn, setNewTabLabelEn] = useState('');
  const [newTabSource, setNewTabSource] = useState('documents');

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setTabs(parsed);
          setActiveTab(parsed[0].key);
        }
      } catch {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tabs));
  }, [tabs]);

  const selectedTab = useMemo(() => tabs.find((tab) => tab.key === activeTab) ?? tabs[0], [tabs, activeTab]);

  useEffect(() => {
    const loadRows = async () => {
      if (!selectedTab) return;
      const endpoint = DOCUMENT_SOURCES[selectedTab.source] ?? DOCUMENT_SOURCES.documents;
      setLoading(true);
      setError('');
      try {
        const { data } = await api.get(endpoint);
        setRows(Array.isArray(data) ? data : []);
      } catch {
        setError(language === 'ar' ? 'تعذر تحميل البيانات.' : 'Failed to load data.');
        setRows([]);
      } finally {
        setLoading(false);
      }
    };

    loadRows();
  }, [selectedTab, language]);

  const addTab = () => {
    if (!newTabLabelAr.trim()) return;
    const key = `custom_${Date.now()}`;
    const nextTab = {
      key,
      labelAr: newTabLabelAr.trim(),
      labelEn: newTabLabelEn.trim() || newTabLabelAr.trim(),
      source: newTabSource,
    };
    setTabs((prev) => [...prev, nextTab]);
    setActiveTab(key);
    setNewTabLabelAr('');
    setNewTabLabelEn('');
    setNewTabSource('documents');
  };

  const renameTab = (tabKey, value) => {
    setTabs((prev) => prev.map((tab) => (tab.key === tabKey ? { ...tab, labelAr: value } : tab)));
  };

  const deleteTab = (tabKey) => {
    const next = tabs.filter((tab) => tab.key !== tabKey);
    setTabs(next.length ? next : DEFAULT_TABS);
    if (activeTab === tabKey) {
      setActiveTab((next[0] || DEFAULT_TABS[0]).key);
    }
  };

  const toLabel = (tab) => (language === 'ar' ? tab.labelAr : tab.labelEn);

  return (
    <div className="space-y-6 p-4">
      <section className="rounded-2xl border border-border bg-card p-4 shadow-sm">
        <h1 className="mb-2 text-xl font-bold">{language === 'ar' ? 'قسم الوثائق' : 'Documents Center'}</h1>
        <p className="text-sm text-muted-foreground">
          {language === 'ar'
            ? 'يمكنك إضافة وتعديل تبويبات الوثائق وربط كل تبويب بنوع البيانات المناسب.'
            : 'Add, edit and map document tabs to dynamic data sources.'}
        </p>
      </section>

      <section className="rounded-2xl border border-border bg-card p-4 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold">{language === 'ar' ? 'إدارة التبويبات' : 'Tabs manager'}</h2>
        <div className="mb-4 grid gap-2 md:grid-cols-4">
          <input className="rounded-md border p-2" placeholder="اسم التبويب (عربي)" value={newTabLabelAr} onChange={(e) => setNewTabLabelAr(e.target.value)} />
          <input className="rounded-md border p-2" placeholder="Tab name (EN)" value={newTabLabelEn} onChange={(e) => setNewTabLabelEn(e.target.value)} />
          <select className="rounded-md border p-2" value={newTabSource} onChange={(e) => setNewTabSource(e.target.value)}>
            {Object.keys(DOCUMENT_SOURCES).map((source) => <option key={source} value={source}>{source}</option>)}
          </select>
          <button type="button" className="rounded-md bg-primary px-3 py-2 text-primary-foreground" onClick={addTab}>
            {language === 'ar' ? 'إضافة تبويب' : 'Add tab'}
          </button>
        </div>

        <div className="space-y-2">
          {tabs.map((tab) => (
            <div key={tab.key} className="flex items-center gap-2">
              <input className="w-full rounded-md border p-2" value={tab.labelAr} onChange={(e) => renameTab(tab.key, e.target.value)} />
              {!DEFAULT_TABS.some((t) => t.key === tab.key) && (
                <button type="button" className="rounded-md border px-3 py-2" onClick={() => deleteTab(tab.key)}>
                  {language === 'ar' ? 'حذف' : 'Delete'}
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="h-auto w-full justify-start gap-2 overflow-x-auto">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.key} value={tab.key}>{toLabel(tab)}</TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.key} value={tab.key}>
            {loading ? (
              <div className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">{language === 'ar' ? 'جاري التحميل...' : 'Loading...'}</div>
            ) : error ? (
              <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-destructive">{error}</div>
            ) : (
              <div className="overflow-x-auto rounded-xl border">
                <table className="w-full min-w-[640px] text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="p-2 text-start">#</th>
                      <th className="p-2 text-start">{language === 'ar' ? 'البيانات' : 'Data'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, index) => (
                      <tr key={row.id || index} className="border-t align-top">
                        <td className="p-2">{index + 1}</td>
                        <td className="p-2"><pre className="whitespace-pre-wrap text-xs">{JSON.stringify(row, null, 2)}</pre></td>
                      </tr>
                    ))}
                    {rows.length === 0 && (
                      <tr>
                        <td className="p-4 text-center text-muted-foreground" colSpan={2}>{language === 'ar' ? 'لا توجد بيانات.' : 'No data found.'}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default DocumentsHubPage;
