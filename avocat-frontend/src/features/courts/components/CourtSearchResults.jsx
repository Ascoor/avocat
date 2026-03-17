import React from 'react';
import { cn } from '@shared/lib/utils';

const CourtSearchResults = ({ data }) => {
  if (!data) return null;

  return (
    <div className="mt-6 card-premium p-6 transition-all">
      <h3 className="text-2xl font-bold text-primary text-center mb-4">
        📜 نتيجة البحث
      </h3>

      {data.message ? (
        <p className="text-center text-destructive">
          {data.message}
        </p>
      ) : (
        <>
          {/* تفاصيل القضية */}
          <div className="bg-muted/50 p-4 rounded-xl border border-border mb-6">
            <h4 className="text-lg font-semibold text-primary mb-2">
              ⚖️ تفاصيل القضية:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-foreground">
              <p><strong>رقم الدعوى:</strong> {data.caseNumber || 'غير متوفر'}</p>
              <p><strong>السنة:</strong> {data.caseYear || 'غير متوفرة'}</p>
              <p><strong>نوع الدعوى:</strong> {data.caseTypeName || 'غير متوفرة'}</p>
              <p><strong>تاريخ القيد:</strong> {data.caseRecordDate || 'غير متوفر'}</p>
              <p><strong>المدعي:</strong> {data.person1 || 'غير متوفر'}</p>
              <p><strong>المدعى عليه:</strong> {data.person2 || 'غير متوفر'}</p>
              <p className="md:col-span-2"><strong>الموضوع:</strong> {data.subject || 'غير متوفر'}</p>
              <p><strong>آخر جلسة:</strong> {data.lastSessionDate || 'غير متوفرة'}</p>
              <p><strong>قرار آخر جلسة:</strong> {data.lastSessionDecision || 'غير متوفر'}</p>
            </div>
          </div>

          {/* جدول الجلسات */}
          <h4 className="text-xl font-bold text-primary mb-4 text-center">
            📅 جدول الجلسات:
          </h4>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm text-center text-foreground">
              <thead className="bg-primary text-primary-foreground">
                <tr>
                  <th className="px-4 py-3 border-b border-border/30">📆 تاريخ الجلسة</th>
                  <th className="px-4 py-3 border-b border-border/30">📜 قرار الجلسة</th>
                  <th className="px-4 py-3 border-b border-border/30">⏭️ تاريخ الجلسة القادمة</th>
                </tr>
              </thead>
              <tbody>
                {data.sessionsDetails?.length > 0 ? (
                  data.sessionsDetails.map((session, index) => (
                    <tr
                      key={index}
                      className="border-b border-border hover:bg-muted/40 transition-colors"
                    >
                      <td className="px-4 py-3">{session.sessionDate || '-'}</td>
                      <td className="px-4 py-3">{session.sessionDecision || 'لا يوجد قرار'}</td>
                      <td className="px-4 py-3">{session.nextSessionDate || 'غير متوفرة'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center text-muted-foreground py-3">
                      ⚠️ لا توجد جلسات متاحة
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default CourtSearchResults;