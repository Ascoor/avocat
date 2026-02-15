import React, { useEffect, useState } from 'react';
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
import CasesTreeList from './tree/CasesTreeList';
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

  useEffect(() => {
    setSelectedClient(null);
  }, [filteredClients]);

  const handleClientClick = (client) => {
    setSelectedClient(client);
  };

  return (
    <section className="mx-auto w-full max-w-6xl rounded-2xl border border-slate-200/80 bg-white/95 p-4 shadow-xl shadow-slate-200/60 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80 dark:shadow-none sm:p-6">
      {loading && <AuthSpinner />}

      {error && (
        <p className="mb-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-700/60 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </p>
      )}

      {filteredClients?.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center dark:border-slate-700 dark:bg-slate-800/60">
          <UserRoundSearch className="mb-3 h-10 w-10 text-blue-500 dark:text-blue-400" />
          <p className="text-sm font-medium text-slate-500 dark:text-slate-300">لم يتم العثور على نتائج.</p>
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
                    <td className="px-4 py-3 text-sm text-slate-800 dark:text-slate-300">{client.name}</td>
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
        </motion.div>
      )}

      <CasesTreeList selectedClient={selectedClient} clientsPool={filteredClients} expansionMode="single" />
    </section>
  );
};

export default DashboardSearch;
