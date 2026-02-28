import React, { useEffect, useMemo, useState } from 'react';
import { Edit3, FilePlus2, FolderOpen, Layers3, Plus, Search } from 'lucide-react';

import api from '@shared/api/axiosConfig';
import { useLanguage } from '@shared/contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@shared/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@shared/ui/dialog';

const TAB_TYPES = [
  { value: 'power_of_attorney', labelAr: 'توكيلات', labelEn: 'Power of Attorney' },
  { value: 'leg_case', labelAr: 'قضايا', labelEn: 'Legal Case' },
  { value: 'service', labelAr: 'خدمات', labelEn: 'Service' },
  { value: 'client', labelAr: 'عملاء', labelEn: 'Client' },
  { value: 'general', labelAr: 'عام', labelEn: 'General' },
];

const emptyForm = {
  nameAr: '',
  nameEn: '',
  type: 'general',
};

const DocumentsHubPage = () => {
  const { language } = useLanguage();
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState('');
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');

  const [name, setName] = useState('');
  const [file, setFile] = useState(null);

  const [tabModalOpen, setTabModalOpen] = useState(false);
  const [tabModalMode, setTabModalMode] = useState('create');
  const [editingTabId, setEditingTabId] = useState(null);
  const [tabForm, setTabForm] = useState(emptyForm);

  const selectedTab = useMemo(() => tabs.find((tab) => String(tab.id) === activeTab), [tabs, activeTab]);

  const filteredRows = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return rows;
    return rows.filter((row) =>
      [row.name, row.file_path].some((value) => String(value || '').toLowerCase().includes(normalized)),
    );
  }, [rows, query]);

  const tabTypeLabel = (typeValue) => {
    const selectedType = TAB_TYPES.find((type) => type.value === typeValue);
    if (!selectedType) return typeValue;
    return language === 'ar' ? selectedType.labelAr : selectedType.labelEn;
  };

  const loadTabs = async () => {
    const { data } = await api.get('/document-tabs');
    const normalizedTabs = Array.isArray(data) ? data : [];
    setTabs(normalizedTabs);
    if (normalizedTabs.length > 0 && !activeTab) {
      setActiveTab(String(normalizedTabs[0].id));
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

  const openCreateTabModal = () => {
    setTabModalMode('create');
    setEditingTabId(null);
    setTabForm(emptyForm);
    setTabModalOpen(true);
  };

  const openEditTabModal = (tab) => {
    setTabModalMode('edit');
    setEditingTabId(tab.id);
    setTabForm({
      nameAr: tab.name_ar || '',
      nameEn: tab.name_en || '',
      type: tab.tab_type || 'general',
    });
    setTabModalOpen(true);
  };

  const saveTab = async () => {
    if (!tabForm.nameAr.trim() || !tabForm.nameEn.trim()) return;

    if (tabModalMode === 'create') {
      const { data } = await api.post('/document-tabs', {
        name_ar: tabForm.nameAr.trim(),
        name_en: tabForm.nameEn.trim(),
        tab_type: tabForm.type,
      });
      setTabs((prev) => [...prev, data]);
      setActiveTab(String(data.id));
    } else {
      const { data } = await api.put(`/document-tabs/${editingTabId}`, {
        name_ar: tabForm.nameAr.trim(),
        name_en: tabForm.nameEn.trim(),
        tab_type: tabForm.type,
      });
      setTabs((prev) => prev.map((tab) => (tab.id === editingTabId ? data : tab)));
    }

    setTabModalOpen(false);
    setTabForm(emptyForm);
    setEditingTabId(null);
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
      <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <h1 className="mb-2 text-xl font-bold">{language === 'ar' ? 'قسم الوثائق' : 'Documents Center'}</h1>
        <p className="text-sm text-muted-foreground">
          {language === 'ar'
            ? 'إدارة منظمة لتبويبات الوثائق وربطها بالتوكيلات والقضايا والعملاء بطريقة عملية.'
            : 'Structured document operations for powers of attorney, cases, clients, and legal services.'}
        </p>
      </section>

      <section className="grid gap-3 md:grid-cols-3">
        <article className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <p className="mb-1 text-sm text-muted-foreground">{language === 'ar' ? 'إجمالي التبويبات' : 'Total tabs'}</p>
          <p className="text-2xl font-bold">{tabs.length}</p>
        </article>
        <article className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <p className="mb-1 text-sm text-muted-foreground">{language === 'ar' ? 'مستندات التبويب الحالي' : 'Current tab documents'}</p>
          <p className="text-2xl font-bold">{rows.length}</p>
        </article>
        <article className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <p className="mb-1 text-sm text-muted-foreground">{language === 'ar' ? 'نوع التبويب' : 'Tab type'}</p>
          <p className="text-lg font-semibold">{selectedTab ? tabTypeLabel(selectedTab.tab_type) : '-'}</p>
        </article>
      </section>

      <section className="rounded-2xl border border-border bg-card p-4 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">{language === 'ar' ? 'إدارة تبويبات الوثائق' : 'Document tab management'}</h2>
            <p className="text-sm text-muted-foreground">
              {language === 'ar'
                ? 'أنشئ تبويبًا أو عدّل بيانات تبويب حالي من نافذة كارت مخصصة.'
                : 'Create or edit tabs using a dedicated card-style modal.'}
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-primary-foreground"
            onClick={openCreateTabModal}
          >
            <Plus className="h-4 w-4" />
            {language === 'ar' ? 'إضافة تبويب' : 'Add tab'}
          </button>
        </div>

        <div className="grid gap-2 md:grid-cols-2">
          {tabs.map((tab) => (
            <div key={tab.id} className="rounded-xl border border-border/80 bg-background/60 p-3">
              <div className="mb-1 flex items-center justify-between gap-2">
                <p className="font-semibold">{toLabel(tab)}</p>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs"
                  onClick={() => openEditTabModal(tab)}
                >
                  <Edit3 className="h-3.5 w-3.5" />
                  {language === 'ar' ? 'تعديل' : 'Edit'}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">{tabTypeLabel(tab.tab_type)}</p>
            </div>
          ))}
          {tabs.length === 0 && (
            <div className="rounded-xl border border-dashed p-4 text-sm text-muted-foreground">
              {language === 'ar' ? 'لا توجد تبويبات بعد.' : 'No tabs yet.'}
            </div>
          )}
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

      <section className="rounded-2xl border border-border bg-card p-4 shadow-sm">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold">{language === 'ar' ? 'الوثائق حسب التبويب' : 'Documents by tab'}</h2>
          <div className="relative w-full max-w-xs">
            <Search className="pointer-events-none absolute inset-y-0 left-2 my-auto h-4 w-4 text-muted-foreground" />
            <input
              className="w-full rounded-md border p-2 ps-8"
              placeholder={language === 'ar' ? 'بحث بالاسم أو المسار...' : 'Search by name or path...'}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
        </div>

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
                      {filteredRows.map((row, index) => (
                        <tr key={row.id || index} className="border-t align-top">
                          <td className="p-2">{index + 1}</td>
                          <td className="p-2">{row.name}</td>
                          <td className="p-2">{row.file_path}</td>
                        </tr>
                      ))}
                      {filteredRows.length === 0 && (
                        <tr>
                          <td className="p-4 text-center text-muted-foreground" colSpan={3}>{language === 'ar' ? 'لا توجد بيانات مطابقة.' : 'No matching records.'}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </section>

      <Dialog open={tabModalOpen} onOpenChange={setTabModalOpen}>
        <DialogContent className="max-w-xl rounded-2xl border border-border bg-card">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Layers3 className="h-5 w-5" />
              {tabModalMode === 'create'
                ? language === 'ar'
                  ? 'إضافة تبويب وثائق'
                  : 'Create document tab'
                : language === 'ar'
                  ? 'تعديل تبويب الوثائق'
                  : 'Edit document tab'}
            </DialogTitle>
            <DialogDescription>
              {language === 'ar'
                ? 'نموذج كارت لإدارة التبويبات بشكل واضح ومنفصل عن باقي الشاشة.'
                : 'Card-based modal form to keep tab setup focused and organized.'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3 md:grid-cols-2">
            <label className="space-y-1 text-sm">
              <span>{language === 'ar' ? 'اسم التبويب (عربي)' : 'Tab name (AR)'}</span>
              <input
                className="w-full rounded-md border p-2"
                value={tabForm.nameAr}
                onChange={(event) => setTabForm((prev) => ({ ...prev, nameAr: event.target.value }))}
              />
            </label>
            <label className="space-y-1 text-sm">
              <span>{language === 'ar' ? 'اسم التبويب (إنجليزي)' : 'Tab name (EN)'}</span>
              <input
                className="w-full rounded-md border p-2"
                value={tabForm.nameEn}
                onChange={(event) => setTabForm((prev) => ({ ...prev, nameEn: event.target.value }))}
              />
            </label>
            <label className="space-y-1 text-sm md:col-span-2">
              <span>{language === 'ar' ? 'نوع التبويب' : 'Tab type'}</span>
              <select
                className="w-full rounded-md border p-2"
                value={tabForm.type}
                onChange={(event) => setTabForm((prev) => ({ ...prev, type: event.target.value }))}
              >
                {TAB_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {language === 'ar' ? type.labelAr : type.labelEn}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <DialogFooter>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-primary-foreground"
              onClick={() => saveTab().catch(() => setError(language === 'ar' ? 'تعذر حفظ التبويب.' : 'Failed to save tab.'))}
            >
              {tabModalMode === 'create' ? <FilePlus2 className="h-4 w-4" /> : <FolderOpen className="h-4 w-4" />}
              {tabModalMode === 'create'
                ? language === 'ar'
                  ? 'حفظ وإضافة'
                  : 'Save and create'
                : language === 'ar'
                  ? 'حفظ التعديل'
                  : 'Save changes'}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DocumentsHubPage;
