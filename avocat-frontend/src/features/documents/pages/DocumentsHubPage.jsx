import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Search, UploadCloud, FileText } from 'lucide-react';
import api from '@shared/api/axiosConfig';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@shared/ui/tabs';
import { useLanguage } from '@shared/contexts/LanguageContext';

const DocumentsHubPage = () => {
  const { t, language } = useLanguage();
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState('');
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const [name, setName] = useState('');
  const [file, setFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const selectedTab = useMemo(() => tabs.find((tab) => String(tab.id) === activeTab), [tabs, activeTab]);

  const categories = useMemo(() => {
    const values = Array.from(new Set(tabs.map((tab) => tab.tab_type).filter(Boolean)));
    return ['all', ...values];
  }, [tabs]);

  const toLabel = (tab) => (language === 'ar' ? tab.name_ar : tab.name_en);

  const loadTabs = async () => {
    const { data } = await api.get('/document-tabs');
    const list = Array.isArray(data) ? data : [];
    setTabs(list);
    if (list.length > 0 && !activeTab) {
      setActiveTab(String(list[0].id));
    }
  };

  useEffect(() => {
    loadTabs().catch(() => setError(t('documents.messages.loadTabsError')));
  }, [t]);

  useEffect(() => {
    if (!activeTab) return;

    const loadRows = async () => {
      setLoading(true);
      setError('');
      try {
        const { data } = await api.get('/documents', { params: { document_tab_id: activeTab } });
        setRows(Array.isArray(data) ? data : []);
      } catch {
        setError(t('documents.messages.loadDocumentsError'));
        setRows([]);
      } finally {
        setLoading(false);
      }
    };

    loadRows();
  }, [activeTab, t]);

  const uploadDocument = async (event) => {
    event.preventDefault();
    if (!file || !selectedTab) return;

    const formData = new FormData();
    formData.append('name', name || file.name);
    formData.append('file', file);
    formData.append('document_tab_id', String(selectedTab.id));

    await api.post('/documents', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    setName('');
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';

    const { data } = await api.get('/documents', { params: { document_tab_id: selectedTab.id } });
    setRows(Array.isArray(data) ? data : []);
  };

  const filteredTabs = tabs.filter((tab) => category === 'all' || tab.tab_type === category);

  const visibleRows = rows.filter((row) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return String(row.name || '').toLowerCase().includes(q) || String(row.file_path || '').toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <section className="rounded-2xl border border-border bg-card p-4 shadow-sm">
        <h1 className="text-xl font-bold sm:text-2xl">{t('documents.title')}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t('documents.subtitle')}</p>
      </section>

      <section className="grid gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm md:grid-cols-2 lg:grid-cols-3">
        <label className="relative lg:col-span-2">
          <Search className="pointer-events-none absolute inset-y-0 start-3 my-auto h-4 w-4 text-muted-foreground" />
          <input
            className="h-11 w-full rounded-md border bg-background ps-9 pe-3 text-sm"
            placeholder={t('documents.searchPlaceholder')}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>

        <select
          className="h-11 rounded-md border bg-background px-3 text-sm"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item === 'all' ? t('documents.categories.all') : t(`documents.categories.${item}`)}
            </option>
          ))}
        </select>
      </section>

      <section className="rounded-2xl border border-border bg-card p-4 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold">{t('documents.upload.title')}</h2>
        <form className="grid gap-3 md:grid-cols-2" onSubmit={(event) => uploadDocument(event).catch(() => setError(t('documents.messages.uploadError')))}>
          <input
            className="h-11 rounded-md border bg-background px-3 text-sm"
            placeholder={t('documents.upload.namePlaceholder')}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <button type="submit" className="h-11 rounded-md bg-primary px-3 text-sm font-semibold text-primary-foreground" disabled={!selectedTab || !file}>
            {t('documents.upload.action')}
          </button>

          <div
            role="button"
            tabIndex={0}
            className={`md:col-span-2 flex min-h-32 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed p-4 text-center transition ${
              isDragOver ? 'border-primary bg-primary/5' : 'border-border'
            }`}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(event) => {
              event.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={(event) => {
              event.preventDefault();
              setIsDragOver(false);
              const droppedFile = event.dataTransfer.files?.[0];
              if (droppedFile) setFile(droppedFile);
            }}
          >
            <div className="space-y-2">
              <UploadCloud className="mx-auto h-6 w-6 text-primary" />
              <p className="text-sm font-medium">{t('documents.upload.dropzone')}</p>
              <p className="text-xs text-muted-foreground">{file ? file.name : t('documents.upload.supported')}</p>
            </div>
            <input
              ref={fileInputRef}
              className="hidden"
              type="file"
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
            />
          </div>
        </form>
      </section>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="h-auto w-full justify-start gap-2 overflow-x-auto">
          {filteredTabs.map((tab) => (
            <TabsTrigger key={tab.id} value={String(tab.id)}>{toLabel(tab)}</TabsTrigger>
          ))}
        </TabsList>

        {filteredTabs.map((tab) => (
          <TabsContent key={tab.id} value={String(tab.id)}>
            {loading ? (
              <div className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">{t('common.loading')}</div>
            ) : error ? (
              <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-destructive">{error}</div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {visibleRows.map((row, index) => (
                  <article key={row.id || index} className="rounded-xl border border-border/70 bg-card p-4 shadow-sm">
                    <FileText className="mb-2 h-5 w-5 text-primary" />
                    <h3 className="truncate font-semibold">{row.name}</h3>
                    <p className="mt-1 truncate text-xs text-muted-foreground">{row.file_path}</p>
                  </article>
                ))}
                {visibleRows.length === 0 && (
                  <div className="col-span-full rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
                    {t('documents.empty')}
                  </div>
                )}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default DocumentsHubPage;
