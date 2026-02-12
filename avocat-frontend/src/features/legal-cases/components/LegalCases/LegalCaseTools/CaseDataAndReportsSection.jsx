import { motion } from 'framer-motion';
import { useLanguage } from '@shared/contexts/LanguageContext';
import { LexicraftIcon } from '@shared/icons/lexicraft';

const readText = (value, fallback = '-') => {
  if (value === null || value === undefined || value === '') return fallback;
  return String(value);
};

const Table = ({ title, columns, rows, emptyLabel }) => (
  <div className="rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface-2))]/20 p-4">
    <h4 className="mb-3 text-sm font-semibold text-[hsl(var(--color-text))]">{title}</h4>
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-[hsl(var(--color-border))] text-left text-[hsl(var(--color-muted))]">
            {columns.map((column) => (
              <th key={column.key} className="px-3 py-2 font-medium">{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {!rows.length ? (
            <tr>
              <td className="px-3 py-4 text-[hsl(var(--color-muted))]" colSpan={columns.length}>
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
  clients = [],
  onOpenTab,
}) {
  const { t } = useLanguage();

  const clientsRows = clients.map((client) => ({
    id: `client-${client.id}`,
    name: client?.name || '-',
    role: client?.pivot?.client_capacity || client?.role || '-',
    phone: client?.phone_number || '-',
    email: client?.email || '-',
  }));

  return (
    <div className="space-y-5">
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface-2))]/20 p-4"
      >
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <p className="text-xs text-[hsl(var(--color-muted))]">Case Number</p>
            <p className="text-lg font-bold text-[hsl(var(--color-text))]">{legCase?.slug || '-'}</p>
          </div>
          <div>
            <p className="text-xs text-[hsl(var(--color-muted))]">Case Status</p>
            <p className="text-lg font-bold text-[hsl(var(--color-text))]">{legCase?.status || '-'}</p>
          </div>
          <div>
            <p className="text-xs text-[hsl(var(--color-muted))]">Court</p>
            <p className="text-lg font-bold text-[hsl(var(--color-text))]">
              {legCase?.courts?.map((court) => court?.name).filter(Boolean).join(', ') || '-'}
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface))] p-3">
          <p className="text-xs text-[hsl(var(--color-muted))]">Case Description</p>
          <p className="mt-1 text-sm text-[hsl(var(--color-text))]">{legCase?.description || '-'}</p>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => onOpenTab?.('procedures')}
            className="inline-flex items-center gap-1 rounded-full border border-[hsl(var(--color-border))] px-3 py-2 text-xs font-semibold"
          >
            <LexicraftIcon name="tool" size={13} />
            {t('legalCaseDetails.actions.addProcedure')}
          </button>
          <button
            type="button"
            onClick={() => onOpenTab?.('sessions')}
            className="inline-flex items-center gap-1 rounded-full bg-[hsl(var(--color-primary))] px-3 py-2 text-xs font-semibold text-[hsl(var(--color-primary-fg))]"
          >
            <LexicraftIcon name="calendar" size={13} />
            {t('legalCaseDetails.actions.addSession')}
          </button>
        </div>
      </motion.section>

      <Table
        title="Clients"
        emptyLabel="No clients found"
        rows={clientsRows}
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
