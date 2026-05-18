import React, { useEffect, useState } from 'react';
import { FaFilter, FaPlus, FaRegEdit, FaStamp, FaTimes, FaTrashAlt } from 'react-icons/fa';
import api from '@shared/api/axiosConfig';
import { useLanguage } from '@shared/contexts/LanguageContext';
import useAuth from '@features/auth/components/AuthUser';
import { cn } from '@shared/lib/utils';

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

const inputClassName = 'w-full rounded-xl border border-border/70 bg-background/70 px-3 py-2 text-sm shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30';

const PowerOfAttorneyPage = ({ embedded = false }) => {
  const { t } = useLanguage();
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
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const pt = (key) => t(`powerOfAttorneyPage.${key}`);

  const resetForm = () => {
    setForm(DEFAULT_FORM);
    setEditingId(null);
  };

  const openCreateModal = () => {
    resetForm();
    setIsFormModalOpen(true);
  };

  const closeModal = () => {
    setIsFormModalOpen(false);
    resetForm();
  };

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
      setError(pt('loadError'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLookups().catch(() => setError(pt('loadError')));
  }, [t]);

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

      closeModal();
      await loadPowerOfAttorneys(meta.current_page);
    } catch {
      setError(pt('saveError'));
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
    setIsFormModalOpen(true);
  };

  const deleteRow = async (id) => {
    try {
      await api.delete(`/power-of-attorneys/${id}`);
      await loadPowerOfAttorneys(meta.current_page);
    } catch {
      setError(pt('deleteError'));
    }
  };

  const onFilter = (event) => {
    event.preventDefault();
    loadPowerOfAttorneys(1);
  };

  return (
    <div
      className={cn(
        embedded ? 'space-y-4 p-2 sm:p-3' : 'space-y-6 bg-gradient-to-b from-background via-background to-primary/5 p-4',
      )}
    >
      {!embedded ? (
        <section className="relative overflow-hidden rounded-2xl border border-primary/20 bg-card/90 p-5 shadow-lg backdrop-blur-sm">
          <div className="absolute -top-10 -end-10 h-36 w-36 rounded-full bg-primary/10 blur-2xl" />
          <div className="relative flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary shadow-inner">
                <FaStamp className="text-lg" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">{pt('title')}</h1>
                <p className="text-sm text-muted-foreground">{pt('subtitle')}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={openCreateModal}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:opacity-95"
            >
              <FaPlus />
              {pt('addButton')}
            </button>
          </div>
        </section>
      ) : (
        <div className="flex flex-wrap items-center justify-end gap-2 border-b border-border/50 pb-3">
          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:opacity-95"
          >
            <FaPlus />
            {pt('addButton')}
          </button>
        </div>
      )}

      <section className="rounded-2xl border border-border/70 bg-card/90 p-4 shadow-sm backdrop-blur-sm">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
          <FaFilter className="text-primary" />
          {pt('filterTitle')}
        </div>
        <form className="grid gap-2 md:grid-cols-6" onSubmit={onFilter}>
          <input
            className={inputClassName}
            placeholder={pt('clientName')}
            value={filters.client_name}
            onChange={(e) => setFilters((prev) => ({ ...prev, client_name: e.target.value }))}
          />
          <input
            className={inputClassName}
            placeholder={pt('lawyerName')}
            value={filters.lawyer_name}
            onChange={(e) => setFilters((prev) => ({ ...prev, lawyer_name: e.target.value }))}
          />
          <select
            className={inputClassName}
            value={filters.status}
            onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}
          >
            <option value="">{pt('allStatuses')}</option>
            <option value="active">{pt('statusActive')}</option>
            <option value="expired">{pt('statusExpired')}</option>
          </select>
          <input
            className={inputClassName}
            type="date"
            value={filters.from_date}
            onChange={(e) => setFilters((prev) => ({ ...prev, from_date: e.target.value }))}
          />
          <input
            className={inputClassName}
            type="date"
            value={filters.to_date}
            onChange={(e) => setFilters((prev) => ({ ...prev, to_date: e.target.value }))}
          />
          <button
            type="submit"
            className="rounded-xl bg-primary/90 px-3 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary"
          >
            {pt('applyFilter')}
          </button>
        </form>
      </section>

      <section className="rounded-2xl border border-border/70 bg-card/90 p-4 shadow-sm backdrop-blur-sm">
        {loading ? (
          <p className="text-sm text-muted-foreground">{pt('loading')}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="p-2 text-start">#</th>
                  <th className="p-2 text-start">{pt('poaNumber')}</th>
                  <th className="p-2 text-start">{pt('client')}</th>
                  <th className="p-2 text-start">{pt('lawyer')}</th>
                  <th className="p-2 text-start">{pt('date')}</th>
                  <th className="p-2 text-start">{pt('status')}</th>
                  <th className="p-2 text-start">{pt('actions')}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={row.id} className="border-t border-border/60 transition hover:bg-muted/30">
                    <td className="p-2">{(meta.current_page - 1) * meta.per_page + index + 1}</td>
                    <td className="p-2 font-medium">{row.attorney_num}</td>
                    <td className="p-2">{row.client?.name || '-'}</td>
                    <td className="p-2">{row.lawyer?.name || row.lawyer_insert || '-'}</td>
                    <td className="p-2">{row.attorney_date || '-'}</td>
                    <td className="p-2">{row.status}</td>
                    <td className="p-2">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 rounded-lg border border-border px-2 py-1 hover:bg-muted"
                          onClick={() => editRow(row)}
                        >
                          <FaRegEdit />
                          {pt('edit')}
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 rounded-lg border border-destructive/30 px-2 py-1 text-destructive hover:bg-destructive/10"
                          onClick={() => deleteRow(row.id)}
                        >
                          <FaTrashAlt />
                          {pt('delete')}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-3 flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between">
              <span>
                {pt('total')}: {meta.total}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="rounded-lg border border-border px-2 py-1"
                  disabled={meta.current_page <= 1}
                  onClick={() => loadPowerOfAttorneys(meta.current_page - 1)}
                >
                  {pt('previous')}
                </button>
                <span>
                  {meta.current_page} / {meta.last_page}
                </span>
                <button
                  type="button"
                  className="rounded-lg border border-border px-2 py-1"
                  disabled={meta.current_page >= meta.last_page}
                  onClick={() => loadPowerOfAttorneys(meta.current_page + 1)}
                >
                  {pt('next')}
                </button>
              </div>
            </div>
          </div>
        )}
        {error && (
          <div className="mt-3 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-destructive">
            {error}
          </div>
        )}
      </section>

      {isFormModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-border bg-card p-4 shadow-2xl">
            <div className="mb-4 flex items-center justify-between border-b border-border/60 pb-3">
              <h2 className="text-lg font-semibold">{editingId ? pt('editTitle') : pt('addTitle')}</h2>
              <button
                type="button"
                className="rounded-lg border border-border p-2 hover:bg-muted"
                onClick={closeModal}
              >
                <FaTimes />
              </button>
            </div>

            <form className="grid gap-2 md:grid-cols-3" onSubmit={submitForm}>
              <input
                className={inputClassName}
                placeholder="POA-001"
                value={form.attorney_num}
                onChange={(e) => setForm((prev) => ({ ...prev, attorney_num: e.target.value }))}
                required
              />
              <input
                className={inputClassName}
                type="date"
                value={form.attorney_date}
                onChange={(e) => setForm((prev) => ({ ...prev, attorney_date: e.target.value }))}
                required
              />
              <input
                className={inputClassName}
                placeholder={pt('chartNumber')}
                value={form.attorney_chart}
                onChange={(e) => setForm((prev) => ({ ...prev, attorney_chart: e.target.value }))}
              />
              <input
                className={inputClassName}
                placeholder={pt('place')}
                value={form.attorney_place}
                onChange={(e) => setForm((prev) => ({ ...prev, attorney_place: e.target.value }))}
              />
              <input
                className={inputClassName}
                placeholder={pt('titleField')}
                value={form.title}
                onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
              />
              <input
                className={inputClassName}
                placeholder={pt('manualLawyer')}
                value={form.lawyer_insert}
                onChange={(e) => setForm((prev) => ({ ...prev, lawyer_insert: e.target.value }))}
              />
              <select
                className={inputClassName}
                value={form.client_id}
                onChange={(e) => setForm((prev) => ({ ...prev, client_id: e.target.value }))}
                required
              >
                <option value="">{pt('selectClient')}</option>
                {clients.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <select
                className={inputClassName}
                value={form.lawyer_id}
                onChange={(e) => setForm((prev) => ({ ...prev, lawyer_id: e.target.value }))}
              >
                <option value="">{pt('selectLawyer')}</option>
                {lawyers.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <select
                className={inputClassName}
                value={form.attorney_type_id}
                onChange={(e) => setForm((prev) => ({ ...prev, attorney_type_id: e.target.value }))}
                required
              >
                <option value="">{pt('attorneyType')}</option>
                {attorneyTypes.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <select
                className={inputClassName}
                value={form.status}
                onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}
              >
                <option value="active">{pt('statusActive')}</option>
                <option value="expired">{pt('statusExpired')}</option>
              </select>
              <input
                className={inputClassName}
                type="date"
                value={form.expires_at}
                onChange={(e) => setForm((prev) => ({ ...prev, expires_at: e.target.value }))}
              />
              <select
                multiple
                className={`${inputClassName} min-h-24`}
                value={form.leg_case_ids.map(String)}
                onChange={(e) => {
                  const selected = Array.from(e.target.selectedOptions).map((option) =>
                    Number(option.value),
                  );
                  setForm((prev) => ({ ...prev, leg_case_ids: selected }));
                }}
              >
                {cases.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title || item.slug || `#${item.id}`}
                  </option>
                ))}
              </select>
              <textarea
                className="md:col-span-3 w-full rounded-xl border border-border/70 bg-background/70 p-3 text-sm shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder={pt('description')}
                value={form.description}
                onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
              />
              <div className="flex justify-end gap-2 pt-2 md:col-span-3">
                <button type="button" className="rounded-xl border border-border px-4 py-2" onClick={closeModal}>
                  {pt('cancel')}
                </button>
                <button type="submit" className="rounded-xl bg-primary px-4 py-2 text-primary-foreground shadow">
                  {pt('save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PowerOfAttorneyPage;
