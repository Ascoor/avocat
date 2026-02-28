import React, { useEffect, useMemo, useState } from 'react';
import api from '@shared/api/axiosConfig';
import { useLanguage } from '@shared/contexts/LanguageContext';
import useAuth from '@features/auth/components/AuthUser';

const DEFAULT_FORM = {
  attorney_num: '',
  attorney_date: '',
  attorney_chart: '',
  attorney_place: '',
  title: '',
  description: '',
  client_id: '',
  lawyer_id: '',
  lawyer_insert: '',
  attorney_type_id: '',
  status: 'active',
  expires_at: '',
  leg_case_ids: [],
};

const PowerOfAttorneyPage = () => {
  const { language } = useLanguage();
  const { getUser } = useAuth();
  const [rows, setRows] = useState([]);
  const [meta, setMeta] = useState({ current_page: 1, last_page: 1, total: 0, per_page: 10 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [clients, setClients] = useState([]);
  const [lawyers, setLawyers] = useState([]);
  const [cases, setCases] = useState([]);
  const [attorneyTypes, setAttorneyTypes] = useState([]);

  const [filters, setFilters] = useState({ client_name: '', lawyer_name: '', status: '', from_date: '', to_date: '' });
  const [form, setForm] = useState(DEFAULT_FORM);
  const [editingId, setEditingId] = useState(null);

  const t = useMemo(() => ({
    title: language === 'ar' ? 'إدارة التوكيلات' : 'Power of Attorneys Management',
    loadError: language === 'ar' ? 'تعذر تحميل البيانات.' : 'Failed to load data.',
    saveError: language === 'ar' ? 'تعذر حفظ التوكيل.' : 'Failed to save record.',
    deleteError: language === 'ar' ? 'تعذر حذف التوكيل.' : 'Failed to delete record.',
  }), [language]);

  const loadLookups = async () => {
    const [clientsRes, lawyersRes, casesRes, typesRes] = await Promise.all([
      api.get('/clients'),
      api.get('/lawyers'),
      api.get('/legal-cases'),
      api.get('/lookups/attorney_types').catch(() => ({ data: [] })),
    ]);

    setClients(clientsRes?.data?.clients ?? clientsRes?.data?.data ?? clientsRes?.data ?? []);
    setLawyers(lawyersRes?.data?.lawyers ?? lawyersRes?.data?.data ?? lawyersRes?.data ?? []);
    setCases(casesRes?.data?.data ?? casesRes?.data?.leg_cases ?? casesRes?.data ?? []);
    setAttorneyTypes(typesRes?.data?.data ?? typesRes?.data ?? []);
  };

  const loadPowerOfAttorneys = async (page = 1) => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get('/power-of-attorneys', {
        params: {
          page,
          per_page: meta.per_page,
          ...filters,
        },
      });

      setRows(data?.data ?? []);
      setMeta({
        current_page: data?.current_page ?? page,
        last_page: data?.last_page ?? 1,
        total: data?.total ?? 0,
        per_page: data?.per_page ?? meta.per_page,
      });
    } catch {
      setError(t.loadError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLookups().catch(() => setError(t.loadError));
  }, [t.loadError]);

  useEffect(() => {
    loadPowerOfAttorneys(1);
  }, []);

  const submitForm = async (event) => {
    event.preventDefault();
    try {
      const userId = getUser()?.id;
      const payload = {
        ...form,
        client_id: form.client_id || null,
        lawyer_id: form.lawyer_id || null,
        attorney_type_id: form.attorney_type_id || null,
        expires_at: form.expires_at || null,
        created_by: userId,
        updated_by: editingId ? userId : null,
      };

      if (editingId) {
        await api.put(`/power-of-attorneys/${editingId}`, payload);
      } else {
        await api.post('/power-of-attorneys', payload);
      }

      setForm(DEFAULT_FORM);
      setEditingId(null);
      await loadPowerOfAttorneys(meta.current_page);
    } catch {
      setError(t.saveError);
    }
  };

  const editRow = (row) => {
    setEditingId(row.id);
    setForm({
      attorney_num: row.attorney_num ?? '',
      attorney_date: row.attorney_date ? String(row.attorney_date).slice(0, 10) : '',
      attorney_chart: row.attorney_chart ?? '',
      attorney_place: row.attorney_place ?? '',
      title: row.title ?? '',
      description: row.description ?? '',
      client_id: row.client_id ? String(row.client_id) : '',
      lawyer_id: row.lawyer_id ? String(row.lawyer_id) : '',
      lawyer_insert: row.lawyer_insert ?? '',
      attorney_type_id: row.attorney_type_id ? String(row.attorney_type_id) : '',
      status: row.status ?? 'active',
      expires_at: row.expires_at ? String(row.expires_at).slice(0, 10) : '',
      leg_case_ids: (row.leg_cases ?? []).map((item) => item.id),
    });
  };

  const deleteRow = async (id) => {
    try {
      await api.delete(`/power-of-attorneys/${id}`);
      await loadPowerOfAttorneys(meta.current_page);
    } catch {
      setError(t.deleteError);
    }
  };

  const onFilter = (event) => {
    event.preventDefault();
    loadPowerOfAttorneys(1);
  };

  return (
    <div className="space-y-6 p-4">
      <section className="rounded-2xl border border-border bg-card p-4 shadow-sm">
        <h1 className="text-xl font-bold">{t.title}</h1>
      </section>

      <section className="rounded-2xl border border-border bg-card p-4 shadow-sm">
        <form className="grid gap-2 md:grid-cols-6" onSubmit={onFilter}>
          <input className="rounded-md border p-2" placeholder={language === 'ar' ? 'اسم العميل' : 'Client name'} value={filters.client_name} onChange={(e) => setFilters((prev) => ({ ...prev, client_name: e.target.value }))} />
          <input className="rounded-md border p-2" placeholder={language === 'ar' ? 'اسم المحامي' : 'Lawyer name'} value={filters.lawyer_name} onChange={(e) => setFilters((prev) => ({ ...prev, lawyer_name: e.target.value }))} />
          <select className="rounded-md border p-2" value={filters.status} onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}>
            <option value="">{language === 'ar' ? 'كل الحالات' : 'All statuses'}</option>
            <option value="active">{language === 'ar' ? 'ساري' : 'Active'}</option>
            <option value="expired">{language === 'ar' ? 'منتهي' : 'Expired'}</option>
          </select>
          <input className="rounded-md border p-2" type="date" value={filters.from_date} onChange={(e) => setFilters((prev) => ({ ...prev, from_date: e.target.value }))} />
          <input className="rounded-md border p-2" type="date" value={filters.to_date} onChange={(e) => setFilters((prev) => ({ ...prev, to_date: e.target.value }))} />
          <button type="submit" className="rounded-md bg-primary px-3 py-2 text-primary-foreground">{language === 'ar' ? 'تصفية' : 'Filter'}</button>
        </form>
      </section>

      <section className="rounded-2xl border border-border bg-card p-4 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold">{editingId ? (language === 'ar' ? 'تعديل توكيل' : 'Edit POA') : (language === 'ar' ? 'إضافة توكيل' : 'Add POA')}</h2>
        <form className="grid gap-2 md:grid-cols-4" onSubmit={submitForm}>
          <input className="rounded-md border p-2" placeholder="POA-001" value={form.attorney_num} onChange={(e) => setForm((prev) => ({ ...prev, attorney_num: e.target.value }))} required />
          <input className="rounded-md border p-2" type="date" value={form.attorney_date} onChange={(e) => setForm((prev) => ({ ...prev, attorney_date: e.target.value }))} required />
          <input className="rounded-md border p-2" placeholder={language === 'ar' ? 'السجل' : 'Chart'} value={form.attorney_chart} onChange={(e) => setForm((prev) => ({ ...prev, attorney_chart: e.target.value }))} required />
          <input className="rounded-md border p-2" placeholder={language === 'ar' ? 'المكان' : 'Place'} value={form.attorney_place} onChange={(e) => setForm((prev) => ({ ...prev, attorney_place: e.target.value }))} required />
          <input className="rounded-md border p-2" placeholder={language === 'ar' ? 'العنوان' : 'Title'} value={form.title} onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))} required />
          <input className="rounded-md border p-2" placeholder={language === 'ar' ? 'بيانات المحامي' : 'Lawyer details'} value={form.lawyer_insert} onChange={(e) => setForm((prev) => ({ ...prev, lawyer_insert: e.target.value }))} required />
          <select className="rounded-md border p-2" value={form.client_id} onChange={(e) => setForm((prev) => ({ ...prev, client_id: e.target.value }))} required>
            <option value="">{language === 'ar' ? 'اختر موكل' : 'Select client'}</option>
            {clients.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>
          <select className="rounded-md border p-2" value={form.lawyer_id} onChange={(e) => setForm((prev) => ({ ...prev, lawyer_id: e.target.value }))}>
            <option value="">{language === 'ar' ? 'اختر محامي' : 'Select lawyer'}</option>
            {lawyers.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>
          <select className="rounded-md border p-2" value={form.attorney_type_id} onChange={(e) => setForm((prev) => ({ ...prev, attorney_type_id: e.target.value }))} required>
            <option value="">{language === 'ar' ? 'نوع التوكيل' : 'Attorney type'}</option>
            {attorneyTypes.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>
          <select className="rounded-md border p-2" value={form.status} onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}>
            <option value="active">{language === 'ar' ? 'ساري' : 'Active'}</option>
            <option value="expired">{language === 'ar' ? 'منتهي' : 'Expired'}</option>
          </select>
          <input className="rounded-md border p-2" type="date" value={form.expires_at} onChange={(e) => setForm((prev) => ({ ...prev, expires_at: e.target.value }))} />
          <select multiple className="rounded-md border p-2 md:col-span-2" value={form.leg_case_ids.map(String)} onChange={(e) => {
            const selected = Array.from(e.target.selectedOptions).map((option) => Number(option.value));
            setForm((prev) => ({ ...prev, leg_case_ids: selected }));
          }}>
            {cases.map((item) => <option key={item.id} value={item.id}>{item.title || item.slug || `#${item.id}`}</option>)}
          </select>
          <textarea className="rounded-md border p-2 md:col-span-2" placeholder={language === 'ar' ? 'الوصف' : 'Description'} value={form.description} onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))} />
          <button type="submit" className="rounded-md bg-primary px-3 py-2 text-primary-foreground">{language === 'ar' ? 'حفظ' : 'Save'}</button>
          {editingId && (
            <button type="button" className="rounded-md border px-3 py-2" onClick={() => { setEditingId(null); setForm(DEFAULT_FORM); }}>
              {language === 'ar' ? 'إلغاء' : 'Cancel'}
            </button>
          )}
        </form>
      </section>

      <section className="rounded-2xl border border-border bg-card p-4 shadow-sm">
        {loading ? <p>{language === 'ar' ? 'جاري التحميل...' : 'Loading...'}</p> : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="p-2 text-start">#</th>
                  <th className="p-2 text-start">{language === 'ar' ? 'رقم التوكيل' : 'POA Number'}</th>
                  <th className="p-2 text-start">{language === 'ar' ? 'العميل' : 'Client'}</th>
                  <th className="p-2 text-start">{language === 'ar' ? 'المحامي' : 'Lawyer'}</th>
                  <th className="p-2 text-start">{language === 'ar' ? 'التاريخ' : 'Date'}</th>
                  <th className="p-2 text-start">{language === 'ar' ? 'الحالة' : 'Status'}</th>
                  <th className="p-2 text-start">{language === 'ar' ? 'إجراءات' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={row.id} className="border-t">
                    <td className="p-2">{(meta.current_page - 1) * meta.per_page + index + 1}</td>
                    <td className="p-2">{row.attorney_num}</td>
                    <td className="p-2">{row.client?.name || '-'}</td>
                    <td className="p-2">{row.lawyer?.name || row.lawyer_insert || '-'}</td>
                    <td className="p-2">{row.attorney_date}</td>
                    <td className="p-2">{row.status}</td>
                    <td className="p-2">
                      <div className="flex gap-2">
                        <button type="button" className="rounded border px-2 py-1" onClick={() => editRow(row)}>{language === 'ar' ? 'تعديل' : 'Edit'}</button>
                        <button type="button" className="rounded border px-2 py-1" onClick={() => deleteRow(row.id)}>{language === 'ar' ? 'حذف' : 'Delete'}</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span>{language === 'ar' ? 'الإجمالي' : 'Total'}: {meta.total}</span>
              <div className="flex items-center gap-2">
                <button type="button" className="rounded border px-2 py-1" disabled={meta.current_page <= 1} onClick={() => loadPowerOfAttorneys(meta.current_page - 1)}>{language === 'ar' ? 'السابق' : 'Previous'}</button>
                <span>{meta.current_page} / {meta.last_page}</span>
                <button type="button" className="rounded border px-2 py-1" disabled={meta.current_page >= meta.last_page} onClick={() => loadPowerOfAttorneys(meta.current_page + 1)}>{language === 'ar' ? 'التالي' : 'Next'}</button>
              </div>
            </div>
          </div>
        )}
        {error && <div className="mt-3 rounded border border-destructive/30 bg-destructive/10 p-3 text-destructive">{error}</div>}
      </section>
    </div>
  );
};

export default PowerOfAttorneyPage;
