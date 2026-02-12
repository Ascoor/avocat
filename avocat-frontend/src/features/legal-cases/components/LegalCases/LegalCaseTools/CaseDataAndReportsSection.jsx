import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@shared/contexts/LanguageContext';
import { LexicraftIcon } from '@shared/icons/lexicraft';
import { formatDate } from '@shared/i18n/formatters';

const readText = (value, fallback = '-') => {
  if (value === null || value === undefined || value === '') return fallback;
  return String(value);
};

const withinRange = (value, from, to) => {
  if (!value) return false;
  const input = new Date(value);
  if (Number.isNaN(input.getTime())) return false;
  if (from) {
    const min = new Date(from);
    if (!Number.isNaN(min.getTime()) && input < min) return false;
  }
  if (to) {
    const max = new Date(to);
    if (!Number.isNaN(max.getTime()) && input > max) return false;
  }
  return true;
};

const Table = ({ title, columns, rows, emptyLabel, onOpen }) => (
  <div className="rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface-2))]/20 p-4">
    <h4 className="mb-3 text-sm font-semibold text-[hsl(var(--color-text))]">{title}</h4>
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-[hsl(var(--color-border))] text-left text-[hsl(var(--color-muted))]">
            {columns.map((column) => (
              <th key={column.key} className="px-3 py-2 font-medium">{column.label}</th>
            ))}
            {onOpen ? <th className="px-3 py-2 font-medium">Details</th> : null}
          </tr>
        </thead>
        <tbody>
          {!rows.length ? (
            <tr>
              <td className="px-3 py-4 text-[hsl(var(--color-muted))]" colSpan={columns.length + (onOpen ? 1 : 0)}>
                {emptyLabel}
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={row.id} className="border-b border-[hsl(var(--color-border))]/70 last:border-b-0">
                {columns.map((column) => (
                  <td key={column.key} className="px-3 py-2 text-[hsl(var(--color-text))]">
                    {readText(row[column.key])}
                  </td>
                ))}
                {onOpen ? (
                  <td className="px-3 py-2">
                    <button
                      type="button"
                      className="text-xs font-semibold text-[hsl(var(--color-primary))]"
                      onClick={() => onOpen()}
                    >
                      View
                    </button>
                  </td>
                ) : null}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default function CaseDataAndReportsSection({
  legCase,
  sessions = [],
  procedures = [],
  ads = [],
  clients = [],
  onOpenTab,
}) {
  const { t, language } = useLanguage();
  const [filters, setFilters] = useState({
    caseNumber: '',
    procedureType: '',
    caseStatus: '',
    sessionFrom: '',
    sessionTo: '',
    clientName: '',
    serviceType: '',
    serviceStatus: '',
    serviceClientName: '',
    serviceFrom: '',
    serviceTo: '',
  });

  const totalReportsCount = sessions.length + procedures.length + ads.length;

  const filteredSessions = useMemo(
    () =>
      sessions
        .filter((session) => {
          if (filters.caseNumber && !`${legCase?.slug || ''}`.toLowerCase().includes(filters.caseNumber.toLowerCase())) return false;
          if (filters.caseStatus && `${legCase?.status || ''}` !== filters.caseStatus) return false;
          if (filters.procedureType && !`${session?.session_type?.name || ''}`.toLowerCase().includes(filters.procedureType.toLowerCase())) return false;
          return withinRange(session?.session_date, filters.sessionFrom, filters.sessionTo);
        })
        .map((session) => ({
          id: `session-${session.id}`,
          court: session?.court?.name || '-',
          date: session?.session_date ? formatDate(session.session_date, language) : '-',
          time: session?.session_time || '-',
          status: session?.status || '-',
          notes: session?.notes || session?.orders || '-',
        })),
    [filters, language, legCase?.slug, legCase?.status, sessions],
  );

  const filteredProcedures = useMemo(
    () =>
      procedures
        .filter((procedure) => {
          if (filters.caseNumber && !`${legCase?.slug || ''}`.toLowerCase().includes(filters.caseNumber.toLowerCase())) return false;
          if (filters.caseStatus && `${legCase?.status || ''}` !== filters.caseStatus) return false;
          if (filters.procedureType && !`${procedure?.procedure_type?.name || ''}`.toLowerCase().includes(filters.procedureType.toLowerCase())) return false;
          return withinRange(procedure?.date_start || procedure?.created_at, filters.sessionFrom, filters.sessionTo);
        })
        .map((procedure) => ({
          id: `procedure-${procedure.id}`,
          caseNumber: legCase?.slug || '-',
          procedureType: procedure?.procedure_type?.name || '-',
          caseStatus: legCase?.status || '-',
          startDate: procedure?.date_start ? formatDate(procedure.date_start, language) : '-',
          endDate: procedure?.date_end ? formatDate(procedure.date_end, language) : '-',
        })),
    [filters, language, legCase?.slug, legCase?.status, procedures],
  );

  const filteredServices = useMemo(
    () =>
      ads
        .filter((ad) => {
          if (filters.serviceType && !`${ad?.ad_type?.name || ad?.type || ''}`.toLowerCase().includes(filters.serviceType.toLowerCase())) return false;
          if (filters.serviceStatus && `${ad?.status || ''}` !== filters.serviceStatus) return false;
          if (filters.serviceClientName && !`${ad?.client?.name || ''}`.toLowerCase().includes(filters.serviceClientName.toLowerCase())) return false;
          return withinRange(ad?.date || ad?.created_at, filters.serviceFrom, filters.serviceTo);
        })
        .map((ad) => ({
          id: `ad-${ad.id}`,
          serviceType: ad?.ad_type?.name || ad?.type || '-',
          serviceStatus: ad?.status || '-',
          clientName: ad?.client?.name || '-',
          serviceStartDate: ad?.date ? formatDate(ad.date, language) : '-',
        })),
    [ads, filters, language],
  );

  const filteredClients = useMemo(
    () =>
      clients
        .filter((client) => {
          if (!filters.clientName) return true;
          return `${client?.name || ''}`.toLowerCase().includes(filters.clientName.toLowerCase());
        })
        .map((client) => ({
          id: `client-${client.id}`,
          name: client?.name || '-',
          role: client?.pivot?.client_capacity || client?.role || '-',
          phone: client?.phone_number || '-',
          email: client?.email || '-',
        })),
    [clients, filters.clientName],
  );

  const caseRow = [
    {
      id: `case-${legCase?.id || 'single'}`,
      caseName: legCase?.title || '-',
      caseNumber: legCase?.slug || '-',
      caseStatus: legCase?.status || '-',
      court: legCase?.courts?.map((court) => court?.name).filter(Boolean).join(', ') || '-',
      caseDescription: legCase?.description || '-',
    },
  ].filter((row) => {
    if (filters.caseNumber && !row.caseNumber.toLowerCase().includes(filters.caseNumber.toLowerCase())) return false;
    if (filters.caseStatus && row.caseStatus !== filters.caseStatus) return false;
    return true;
  });

  return (
    <div className="space-y-5">
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-4 rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface-2))]/20 p-4 md:grid-cols-3"
      >
        <div>
          <p className="text-xs text-[hsl(var(--color-muted))]">Case Number</p>
          <p className="text-lg font-bold text-[hsl(var(--color-text))]">{legCase?.slug || '-'}</p>
        </div>
        <div>
          <p className="text-xs text-[hsl(var(--color-muted))]">Total Reports</p>
          <p className="text-lg font-bold text-[hsl(var(--color-text))]">{totalReportsCount}</p>
        </div>
        <div className="flex items-end justify-end gap-2">
          <button type="button" onClick={() => onOpenTab?.('procedures')} className="inline-flex items-center gap-1 rounded-full border border-[hsl(var(--color-border))] px-3 py-2 text-xs font-semibold">
            <LexicraftIcon name="tool" size={13} />
            {t('legalCaseDetails.actions.addProcedure')}
          </button>
          <button type="button" onClick={() => onOpenTab?.('sessions')} className="inline-flex items-center gap-1 rounded-full bg-[hsl(var(--color-primary))] px-3 py-2 text-xs font-semibold text-[hsl(var(--color-primary-fg))]">
            <LexicraftIcon name="calendar" size={13} />
            {t('legalCaseDetails.actions.addSession')}
          </button>
        </div>
      </motion.section>

      <section className="rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface))] p-4">
        <h3 className="mb-3 text-sm font-semibold">Advanced Search & Filters</h3>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {[
            ['caseNumber', 'Case Number', 'text'],
            ['procedureType', 'Procedure Type', 'text'],
            ['caseStatus', 'Case Status', 'text'],
            ['clientName', 'Client Name', 'text'],
            ['serviceType', 'Service Type', 'text'],
            ['serviceStatus', 'Service Status', 'text'],
            ['serviceClientName', 'Service Client Name', 'text'],
            ['sessionFrom', 'Session Date From', 'date'],
            ['sessionTo', 'Session Date To', 'date'],
            ['serviceFrom', 'Service Start Date From', 'date'],
            ['serviceTo', 'Service Start Date To', 'date'],
          ].map(([key, label, type]) => (
            <label key={key} className="space-y-1 text-xs text-[hsl(var(--color-muted))]">
              <span>{label}</span>
              <input
                type={type}
                value={filters[key]}
                onChange={(event) => setFilters((prev) => ({ ...prev, [key]: event.target.value }))}
                className="w-full rounded-xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface-2))]/40 px-3 py-2 text-sm text-[hsl(var(--color-text))]"
              />
            </label>
          ))}
        </div>
        <div className="mt-3 flex justify-end">
          <button
            type="button"
            onClick={() =>
              setFilters({
                caseNumber: '',
                procedureType: '',
                caseStatus: '',
                sessionFrom: '',
                sessionTo: '',
                clientName: '',
                serviceType: '',
                serviceStatus: '',
                serviceClientName: '',
                serviceFrom: '',
                serviceTo: '',
              })
            }
            className="rounded-full border border-[hsl(var(--color-border))] px-3 py-1.5 text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      </section>

      <Table
        title="Case Reports"
        emptyLabel="No case reports found"
        rows={caseRow}
        onOpen={() => onOpenTab?.('overview')}
        columns={[
          { key: 'caseName', label: 'Case Name' },
          { key: 'caseNumber', label: 'Case Number' },
          { key: 'caseStatus', label: 'Case Status' },
          { key: 'court', label: 'Court' },
          { key: 'caseDescription', label: 'Case Description' },
        ]}
      />

      <Table
        title="Session Reports"
        emptyLabel="No session reports found"
        rows={filteredSessions}
        onOpen={() => onOpenTab?.('sessions')}
        columns={[
          { key: 'court', label: 'Court' },
          { key: 'date', label: 'Date' },
          { key: 'time', label: 'Time' },
          { key: 'status', label: 'Status' },
          { key: 'notes', label: 'Notes' },
        ]}
      />

      <Table
        title="Procedure Reports"
        emptyLabel="No procedure reports found"
        rows={filteredProcedures}
        onOpen={() => onOpenTab?.('procedures')}
        columns={[
          { key: 'caseNumber', label: 'Case Number' },
          { key: 'procedureType', label: 'Procedure Type' },
          { key: 'caseStatus', label: 'Case Status' },
          { key: 'startDate', label: 'Start Date' },
          { key: 'endDate', label: 'End Date' },
        ]}
      />

      <Table
        title="Service Reports"
        emptyLabel="No service reports found"
        rows={filteredServices}
        onOpen={() => onOpenTab?.('ads')}
        columns={[
          { key: 'serviceType', label: 'Service Type' },
          { key: 'serviceStatus', label: 'Service Status' },
          { key: 'clientName', label: 'Client Name' },
          { key: 'serviceStartDate', label: 'Service Start Date' },
        ]}
      />

      <Table
        title="Clients"
        emptyLabel="No clients found"
        rows={filteredClients}
        onOpen={() => onOpenTab?.('clients')}
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'role', label: 'Role' },
          { key: 'phone', label: 'Phone' },
          { key: 'email', label: 'Email' },
        ]}
      />
    </div>
  );
}
