import React, { useEffect, useMemo, useState } from 'react';
import api from '@shared/api/axiosConfig';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@shared/ui/tabs';
import { useLanguage } from '@shared/contexts/LanguageContext';

const TAB_TYPES = [
  { value: 'power_of_attorney', label: 'Power of Attorney' },
  { value: 'leg_case', label: 'Legal Case' },
  { value: 'service', label: 'Service' },
  { value: 'client', label: 'Client' },
  { value: 'general', label: 'General' },
];

const DocumentsHubPage = () => {
  const { language } = useLanguage();
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState('');
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [newTabLabelAr, setNewTabLabelAr] = useState('');
  const [newTabLabelEn, setNewTabLabelEn] = useState('');
  const [newTabType, setNewTabType] = useState('general');

  const [name, setName] = useState('');
  const [file, setFile] = useState(null);

  const selectedTab = useMemo(() => tabs.find((tab) => String(tab.id) === activeTab), [tabs, activeTab]);

  const loadTabs = async () => {
    const { data } = await api.get('/document-tabs');
    setTabs(Array.isArray(data) ? data : []);
    if (Array.isArray(data) && data.length > 0 && !activeTab) {
      setActiveTab(String(data[0].id));
    }
  };

  useEffect(() => {
    loadTabs().catch(() => setError(language === 'ar' ? 'تعذر تحميل التبويبات.' : 'Failed to load tabs.'));
  }, []);

  useEffect(() => {
    if (!activeTab) return;

    const loadRows = async () => {
      setLoading(true);
      setError('');
      try {
        const { data } = await api.get('/documents', { params: { document_tab_id: activeTab } });
        setRows(Array.isArray(data) ? data : []);
      } catch {
        setError(language === 'ar' ? 'تعذر تحميل الوثائق.' : 'Failed to load documents.');
        setRows([]);
      } finally {
        setLoading(false);
      }
    };

    loadRows();
  }, [activeTab, language]);

  const addTab = async () => {
    if (!newTabLabelAr.trim() || !newTabLabelEn.trim()) return;
    const { data } = await api.post('/document-tabs', {
      name_ar: newTabLabelAr.trim(),
      name_en: newTabLabelEn.trim(),
      tab_type: newTabType,
    });

    setTabs((prev) => [...prev, data]);
    setActiveTab(String(data.id));
    setNewTabLabelAr('');
    setNewTabLabelEn('');
    setNewTabType('general');
  };

  const uploadDocument = async (event) => {
    event.preventDefault();
    if (!file || !selectedTab) return;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('file', file);
    formData.append('document_tab_id', String(selectedTab.id));

    await api.post('/documents', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    setName('');
    setFile(null);

    const { data } = await api.get('/documents', { params: { document_tab_id: selectedTab.id } });
    setRows(Array.isArray(data) ? data : []);
  };

  const toLabel = (tab) => (language === 'ar' ? tab.name_ar : tab.name_en);

  return (
    <div className="space-y-6 p-4">
      <section className="rounded-2xl border border-border bg-card p-4 shadow-sm">
        <h1 className="mb-2 text-xl font-bold">{language === 'ar' ? 'قسم الوثائق' : 'Documents Center'}</h1>
      </section>

      <section className="rounded-2xl border border-border bg-card p-4 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold">{language === 'ar' ? 'إضافة تبويب' : 'Create tab'}</h2>
        <div className="grid gap-2 md:grid-cols-4">
          <input className="rounded-md border p-2" placeholder="اسم التبويب (عربي)" value={newTabLabelAr} onChange={(e) => setNewTabLabelAr(e.target.value)} />
          <input className="rounded-md border p-2" placeholder="Tab name (EN)" value={newTabLabelEn} onChange={(e) => setNewTabLabelEn(e.target.value)} />
          <select className="rounded-md border p-2" value={newTabType} onChange={(e) => setNewTabType(e.target.value)}>
            {TAB_TYPES.map((type) => <option key={type.value} value={type.value}>{type.label}</option>)}
          </select>
          <button type="button" className="rounded-md bg-primary px-3 py-2 text-primary-foreground" onClick={() => addTab().catch(() => setError(language === 'ar' ? 'تعذر إضافة التبويب.' : 'Failed to create tab.'))}>
            {language === 'ar' ? 'إضافة' : 'Create'}
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-4 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold">{language === 'ar' ? 'رفع مستند' : 'Upload document'}</h2>
        <form className="grid gap-2 md:grid-cols-4" onSubmit={(event) => uploadDocument(event).catch(() => setError(language === 'ar' ? 'فشل رفع المستند.' : 'Upload failed.'))}>
          <input className="rounded-md border p-2" placeholder={language === 'ar' ? 'اسم المستند' : 'Document name'} value={name} onChange={(e) => setName(e.target.value)} required />
          <input className="rounded-md border p-2" type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} required />
          <div className="rounded-md border p-2 text-sm text-muted-foreground">{selectedTab ? `${language === 'ar' ? 'التبويب الحالي' : 'Current tab'}: ${toLabel(selectedTab)}` : ''}</div>
          <button type="submit" className="rounded-md bg-primary px-3 py-2 text-primary-foreground" disabled={!selectedTab}>
            {language === 'ar' ? 'رفع' : 'Upload'}
          </button>
        </form>
      </section>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="h-auto w-full justify-start gap-2 overflow-x-auto">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={String(tab.id)}>{toLabel(tab)}</TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.id} value={String(tab.id)}>
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
                      <th className="p-2 text-start">{language === 'ar' ? 'الاسم' : 'Name'}</th>
                      <th className="p-2 text-start">{language === 'ar' ? 'المسار' : 'File path'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, index) => (
                      <tr key={row.id || index} className="border-t align-top">
                        <td className="p-2">{index + 1}</td>
                        <td className="p-2">{row.name}</td>
                        <td className="p-2">{row.file_path}</td>
                      </tr>
                    ))}
                    {rows.length === 0 && (
                      <tr>
                        <td className="p-4 text-center text-muted-foreground" colSpan={3}>{language === 'ar' ? 'لا توجد بيانات.' : 'No data found.'}</td>
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
