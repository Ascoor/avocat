import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ServicesModal from './SearchModals/ServicesModal';
import LegCasesModal from './SearchModals/LegCasesModal';
import AuthSpinner from '@shared/components/common/Spinners/AuthSpinner';
import DashboardSectionHeader from './ui/DashboardSectionHeader';

const DashboardSearch = ({ loading, error, filteredClients }) => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [activeTab, setActiveTab] = useState('legCases');

  const hasClients = (filteredClients?.length ?? 0) > 0;

  useEffect(() => {
    setSelectedClient(null);
    setActiveTab('legCases');
  }, [filteredClients]);

  return (
    <div className="mx-auto w-full max-w-3xl space-y-4 rounded-2xl border border-border bg-card p-6 shadow-custom-sm">
      <DashboardSectionHeader
        icon="🔎"
        title="نتائج البحث"
        description="اختر موكلًا لعرض القضايا والخدمات المرتبطة به."
      />

      {loading ? (
        <div className="flex justify-center py-8">
          <AuthSpinner />
        </div>
      ) : null}

      {!loading && error ? (
        <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      {!loading && !error && !hasClients ? (
        <div className="rounded-xl border border-dashed border-border bg-surface-raised px-4 py-8 text-center text-sm text-muted-foreground">
          لم يتم العثور على نتائج.
        </div>
      ) : null}

      {!loading && !error && hasClients ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="space-y-4"
        >
          <div className="overflow-hidden rounded-xl border border-border">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-surface-raised text-foreground">
                <tr className="text-center">
                  <th className="px-4 py-3 font-semibold">رقم الموكل</th>
                  <th className="px-4 py-3 font-semibold">الاسم</th>
                  <th className="px-4 py-3 font-semibold">رقم الجوال</th>
                  <th className="px-4 py-3 font-semibold">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-card">
                {filteredClients.map((client) => (
                  <tr
                    key={client.id}
                    onClick={() => setSelectedClient(client)}
                    className={`cursor-pointer text-center transition-colors ${
                      selectedClient?.id === client.id
                        ? 'bg-primary/10'
                        : 'hover:bg-surface-raised'
                    }`}
                  >
                    <td className="px-4 py-3 font-semibold text-foreground">{client.slug}</td>
                    <td className="px-4 py-3 text-foreground">{client.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{client.phone_number || '—'}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                          client.status === 'active'
                            ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                            : 'bg-red-500/10 text-red-700 dark:text-red-300'
                        }`}
                      >
                        {client.status === 'active' ? 'نشط' : 'غير نشط'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {selectedClient ? (
            <div className="space-y-4 rounded-xl border border-border bg-surface-raised p-4">
              <div className="flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('legCases')}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    activeTab === 'legCases'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card text-foreground hover:bg-muted'
                  }`}
                >
                  القضايا
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('services')}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    activeTab === 'services'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card text-foreground hover:bg-muted'
                  }`}
                >
                  الخدمات
                </button>
              </div>

              <LegCasesModal selectedClient={selectedClient} activeTab={activeTab} />
              <ServicesModal selectedClient={selectedClient} activeTab={activeTab} />
            </div>
          ) : null}
        </motion.div>
      ) : null}
    </div>
  );
};

export default DashboardSearch;
