import React from "react";
import SectionHeader from "@/components/shared/SectionHeader";
import TableCard from "@/components/shared/TableCard";

const CourtsPage = () => {
  return (
    <div className="animate-[fadeIn_.35s_ease-out]">
      <SectionHeader
        title="المحاكم"
        subtitle="قائمة المحاكم المعتمدة وجدولة الجلسات"
        actions={
          <button className="rounded-xl border border-border bg-card px-4 py-2 text-sm font-semibold shadow-soft transition hover:shadow-base">
            إضافة محكمة
          </button>
        }
      />

      <TableCard>
        <table className="w-full table-auto">
          <thead className="bg-surface text-sm font-semibold text-text">
            <tr className="border-b border-border">
              <th className="px-4 py-3 text-center">المحكمة</th>
              <th className="px-4 py-3 text-center">المدينة</th>
              <th className="px-4 py-3 text-center">الحالة</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border transition hover:bg-surface/70">
              <td className="px-4 py-3 text-center">محكمة شمال الجيزة</td>
              <td className="px-4 py-3 text-center">الجيزة</td>
              <td className="px-4 py-3 text-center">
                <span className="inline-flex items-center rounded-full bg-warning/15 px-3 py-1 text-sm font-semibold text-text">
                  قيد المراجعة
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </TableCard>
    </div>
  );
};

export default CourtsPage;
