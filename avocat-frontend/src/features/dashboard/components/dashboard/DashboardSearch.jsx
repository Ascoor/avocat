import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BadgeCheck,
  BadgeX,
  BriefcaseBusiness,
  Phone,
  Scale,
  UserRound,
  UserRoundSearch,
} from 'lucide-react';
import ServicesModal from './SearchModals/ServicesModal';
import LegCasesModal from './SearchModals/LegCasesModal';
import AuthSpinner from '@shared/components/common/Spinners/AuthSpinner';

const containerVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: 'easeOut',
      when: 'beforeChildren',
      staggerChildren: 0.06,
    },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const DashboardSearch = ({ loading, error, filteredClients }) => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [activeTab, setActiveTab] = useState('legCases');

  useEffect(() => {
    setSelectedClient(null);
    setActiveTab('legCases');
  }, [filteredClients]);

  const handleClientClick = (client) => {
    setSelectedClient(client);
  };

  return (
    <section className="w-full max-w-5xl mx-auto rounded-2xl border border-slate-200/80 bg-white/95 p-4 shadow-xl shadow-slate-200/60 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80 dark:shadow-none sm:p-6">
      {loading && <AuthSpinner />}

      {error && (
        <p className="mb-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-700/60 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </p>
      )}

      {filteredClients?.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center dark:border-slate-700 dark:bg-slate-800/60">
          <UserRoundSearch className="mb-3 h-10 w-10 text-blue-500 dark:text-blue-400" />
          <p className="text-sm font-medium text-slate-500 dark:text-slate-300">
            لم يتم العثور على نتائج.
          </p>
        </div>
      )}

      {filteredClients?.length > 0 && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md dark:border-slate-700 dark:bg-slate-900"
        >
          <div className="hidden md:block">
            <table className="w-full border-collapse">
              <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <tr className="text-center text-sm font-semibold">
                  <th className="px-4 py-3">
                    <span className="inline-flex items-center gap-2">
                      <BriefcaseBusiness className="h-4 w-4" /> رقم الموكل
                    </span>
                  </th>
                  <th className="px-4 py-3">
                    <span className="inline-flex items-center gap-2">
                      <UserRound className="h-4 w-4" /> الاسم
                    </span>
                  </th>
                  <th className="px-4 py-3">
                    <span className="inline-flex items-center gap-2">
                      <Phone className="h-4 w-4" /> رقم الجوال
                    </span>
                  </th>
                  <th className="px-4 py-3">
                    <span className="inline-flex items-center gap-2">
                      <Scale className="h-4 w-4" /> الحالة
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {filteredClients.map((client) => (
                  <motion.tr
                    variants={rowVariants}
                    key={client.id}
                    onClick={() => handleClientClick(client)}
                    className={`cursor-pointer text-center transition-all duration-300 ${
                      selectedClient?.id === client.id
                        ? 'bg-blue-50 dark:bg-blue-900/40'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/80'
                    }`}
                  >
                    <td className="px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
                      {client.slug}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-800 dark:text-slate-300">
                      {client.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
                      {client.phone_number || '—'}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${
                          client.status === 'active'
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300'
                            : 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300'
                        }`}
                      >
                        {client.status === 'active' ? (
                          <BadgeCheck className="h-3.5 w-3.5" />
                        ) : (
                          <BadgeX className="h-3.5 w-3.5" />
                        )}
                        {client.status === 'active' ? 'نشط' : 'غير نشط'}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 p-3 md:hidden">
            {filteredClients.map((client) => (
              <motion.button
                variants={rowVariants}
                key={client.id}
                type="button"
                onClick={() => handleClientClick(client)}
                className={`w-full rounded-xl border p-4 text-right shadow-sm transition-all duration-300 ${
                  selectedClient?.id === client.id
                    ? 'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/30'
                    : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800'
                }`}
              >
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    {client.name}
                  </p>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold ${
                      client.status === 'active'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300'
                        : 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300'
                    }`}
                  >
                    {client.status === 'active' ? (
                      <BadgeCheck className="h-3.5 w-3.5" />
                    ) : (
                      <BadgeX className="h-3.5 w-3.5" />
                    )}
                    {client.status === 'active' ? 'نشط' : 'غير نشط'}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2 text-xs text-slate-600 dark:text-slate-400">
                  <p className="inline-flex items-center gap-2">
                    <BriefcaseBusiness className="h-3.5 w-3.5" /> رقم الموكل: {client.slug}
                  </p>
                  <p className="inline-flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5" /> رقم الجوال: {client.phone_number || '—'}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {selectedClient && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800/80 sm:p-5"
        >
          <div className="mb-5 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => setActiveTab('legCases')}
              className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                activeTab === 'legCases'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                  : 'bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              القضايا
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('services')}
              className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                activeTab === 'services'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                  : 'bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              الخدمات
            </button>
          </div>

          <LegCasesModal selectedClient={selectedClient} activeTab={activeTab} />
          <ServicesModal selectedClient={selectedClient} activeTab={activeTab} />
        </motion.div>
      )}
    </section>
  );
};

export default DashboardSearch;
