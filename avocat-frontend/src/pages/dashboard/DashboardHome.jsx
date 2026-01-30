import React from "react";
import SectionHeader from "@/components/shared/SectionHeader";
import TableCard from "@/components/shared/TableCard";

const DashboardHome = () => {
  return (
    <div className="animate-[fadeIn_.35s_ease-out]">
      <SectionHeader
        title="لوحة التحكم"
        subtitle="نظرة سريعة على الأداء والأحداث القادمة"
        actions={
          <button className="rounded-xl border border-border bg-card px-4 py-2 text-sm font-semibold shadow-soft transition hover:shadow-base">
            تصدير التقرير
          </button>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "إجمالي القضايا", value: "128" },
          { label: "قضايا قيد المتابعة", value: "42" },
          { label: "جلسات هذا الأسبوع", value: "9" },
        ].map((card) => (
          <div key={card.label} className="rounded-xl border border-border bg-card p-4 shadow-soft">
            <div className="text-sm text-muted">{card.label}</div>
            <div className="mt-2 text-2xl font-extrabold text-text">{card.value}</div>
          </div>
        ))}
      </div>

      <TableCard>
        <table className="w-full table-auto">
          <thead className="bg-surface text-sm font-semibold text-text">
            <tr className="border-b border-border">
              <th className="px-4 py-3 text-center">اليوم</th>
              <th className="px-4 py-3 text-center">الحدث</th>
              <th className="px-4 py-3 text-center">المكان</th>
              <th className="px-4 py-3 text-center">الحالة</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border transition hover:bg-surface/70">
              <td className="px-4 py-3 text-center">الثلاثاء</td>
              <td className="px-4 py-3 text-center">جلسة مرافعة</td>
              <td className="px-4 py-3 text-center">محكمة القاهرة</td>
              <td className="px-4 py-3 text-center">
                <span className="inline-flex items-center rounded-full bg-success/15 px-3 py-1 text-sm font-semibold text-text">
                  مؤكدة
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </TableCard>
    </div>
  );
};

export default DashboardHome;
