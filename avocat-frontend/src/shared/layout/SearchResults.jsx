import React from 'react';
import {
  AlertCircle,
  CalendarClock,
  FileSearch,
  Gavel,
  Hash,
  Scale,
  UserRound,
  UsersRound,
} from 'lucide-react';

const notAvailable = 'غير متوفر';

const caseDetailsItems = (data) => [
  { label: 'رقم الدعوى', value: data.caseNumber, icon: Hash },
  { label: 'السنة', value: data.caseYear, icon: CalendarClock },
  { label: 'نوع الدعوى', value: data.caseTypeName, icon: Scale },
  { label: 'تاريخ القيد', value: data.caseRecordDate, icon: CalendarClock },
  { label: 'المدعي', value: data.person1, icon: UserRound },
  { label: 'المدعى عليه', value: data.person2, icon: UsersRound },
  { label: 'الموضوع', value: data.subject, icon: FileSearch, full: true },
  { label: 'آخر جلسة', value: data.lastSessionDate, icon: CalendarClock },
  { label: 'قرار آخر جلسة', value: data.lastSessionDecision, icon: Gavel },
];

const SearchResults = ({ data }) => {
  if (!data) return null;

  if (data.message) {
    return (
      <div className="mt-6 rounded-3xl border border-red-300/70 bg-red-50/95 p-5 text-center shadow-lg shadow-red-500/10 dark:border-red-900 dark:bg-red-950/60 animate-in fade-in duration-500">
        <p className="inline-flex items-center gap-2 text-sm font-semibold text-red-700 dark:text-red-300 md:text-base">
          <AlertCircle className="h-4 w-4" />
          {data.message}
        </p>
      </div>
    );
  }

  return (
    <section className="mt-6 space-y-5 rounded-3xl border border-indigo-100 bg-white/95 p-4 shadow-xl shadow-indigo-900/10 backdrop-blur-sm transition-all duration-500 dark:border-indigo-800/60 dark:bg-slate-900/85 md:p-6 animate-in fade-in slide-in-from-bottom-3">
      <header className="rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 p-4 text-white shadow-lg shadow-indigo-900/25 md:p-5">
        <h3 className="flex items-center justify-center gap-2 text-base font-extrabold md:text-2xl">
          <FileSearch className="h-5 w-5 animate-pulse md:h-6 md:w-6" />
          نتيجة البحث
        </h3>
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {caseDetailsItems(data).map((item) => {
          const Icon = item.icon;
          return (
            <article
              key={item.label}
              className={`rounded-2xl border border-slate-200/70 bg-slate-50/80 p-3 transition duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-800/60 ${item.full ? 'sm:col-span-2 xl:col-span-3' : ''}`}
            >
              <p className="mb-1 flex items-center gap-2 text-xs font-bold text-indigo-700 dark:text-indigo-300 md:text-sm">
                <Icon className="h-4 w-4" />
                {item.label}
              </p>
              <p className="break-words text-sm font-semibold text-slate-700 dark:text-slate-100 md:text-base">
                {item.value || notAvailable}
              </p>
            </article>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
        <h4 className="flex items-center justify-center gap-2 bg-slate-100 px-3 py-3 text-sm font-extrabold text-indigo-700 dark:bg-slate-800 dark:text-indigo-300 md:text-lg">
          <CalendarClock className="h-5 w-5" />
          جدول الجلسات
        </h4>

        {data.sessionsDetails?.length > 0 ? (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[620px] text-right text-sm">
                <thead className="bg-indigo-600 text-white">
                  <tr>
                    <th className="px-4 py-3">تاريخ الجلسة</th>
                    <th className="px-4 py-3">قرار الجلسة</th>
                    <th className="px-4 py-3">تاريخ الجلسة القادمة</th>
                  </tr>
                </thead>
                <tbody>
                  {data.sessionsDetails.map((session, index) => (
                    <tr
                      key={`${session.sessionDate || 'session'}-${index}`}
                      className="border-t border-slate-200 bg-white/85 transition hover:bg-indigo-50 dark:border-slate-700 dark:bg-slate-900/80 dark:hover:bg-slate-800"
                    >
                      <td className="px-4 py-3">{session.sessionDate || '-'}</td>
                      <td className="px-4 py-3">{session.sessionDecision || 'لا يوجد قرار'}</td>
                      <td className="px-4 py-3">{session.nextSessionDate || 'غير متوفرة'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-3 p-3 md:hidden">
              {data.sessionsDetails.map((session, index) => (
                <article key={`mobile-${index}`} className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                  <p className="text-xs font-bold text-indigo-700 dark:text-indigo-300">تاريخ الجلسة</p>
                  <p className="mb-2 text-sm">{session.sessionDate || '-'}</p>
                  <p className="text-xs font-bold text-indigo-700 dark:text-indigo-300">قرار الجلسة</p>
                  <p className="mb-2 text-sm">{session.sessionDecision || 'لا يوجد قرار'}</p>
                  <p className="text-xs font-bold text-indigo-700 dark:text-indigo-300">تاريخ الجلسة القادمة</p>
                  <p className="text-sm">{session.nextSessionDate || 'غير متوفرة'}</p>
                </article>
              ))}
            </div>
          </>
        ) : (
          <p className="p-4 text-center text-sm font-medium text-slate-500 dark:text-slate-300">
            لا توجد جلسات متاحة.
          </p>
        )}
      </div>
    </section>
  );
};

export default SearchResults;
