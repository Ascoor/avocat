import React from "react";
import SectionHeader from "@/components/shared/SectionHeader";
import TableCard from "@/components/shared/TableCard";

const CasesPage = () => {
  return (
    <div className="animate-[fadeIn_.35s_ease-out]">
      <SectionHeader
        title="القضايا"
        subtitle="إدارة القضايا وعرض الحالة والتفاصيل"
        actions={
          <button className="rounded-xl bg-primary px-4 py-2 font-semibold text-white shadow-base transition hover:opacity-95">
            إضافة قضية جديدة
          </button>
        }
      />

      <TableCard>
        <table className="w-full table-auto">
          <thead className="bg-surface text-sm font-semibold text-text">
            <tr className="border-b border-border">
              <th className="px-4 py-3 text-center">رقم</th>
              <th className="px-4 py-3 text-center">الاسم</th>
              <th className="px-4 py-3 text-center">النوع</th>
              <th className="px-4 py-3 text-center">الحالة</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border transition hover:bg-surface/70">
              <td className="px-4 py-3 text-center">341</td>
              <td className="px-4 py-3 text-center">إبراهيم صالح عبدالوهاب</td>
              <td className="px-4 py-3 text-center">جنح مستأنف</td>
              <td className="px-4 py-3 text-center">
                <span className="inline-flex items-center rounded-full bg-warning/15 px-3 py-1 text-sm font-semibold text-text">
                  متداولة
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </TableCard>
    </div>
  );
};

export default CasesPage;
