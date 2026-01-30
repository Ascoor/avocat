import React from "react";
import SectionHeader from "@/components/shared/SectionHeader";

const SettingsPage = () => {
  return (
    <div className="animate-[fadeIn_.35s_ease-out]">
      <SectionHeader
        title="الإعدادات"
        subtitle="تحكم في تفضيلات النظام والملفات التنظيمية"
        actions={
          <button className="rounded-xl bg-primary px-4 py-2 font-semibold text-white shadow-base transition hover:opacity-95">
            حفظ التغييرات
          </button>
        }
      />

      <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <div className="text-sm font-semibold text-text">لغة الواجهة</div>
            <div className="mt-2 text-sm text-muted">العربية (RTL)</div>
          </div>
          <div>
            <div className="text-sm font-semibold text-text">التنبيهات</div>
            <div className="mt-2 text-sm text-muted">إشعارات البريد والتنبيهات الفورية</div>
          </div>
          <div>
            <div className="text-sm font-semibold text-text">أمان الحساب</div>
            <div className="mt-2 text-sm text-muted">تفعيل المصادقة الثنائية</div>
          </div>
          <div>
            <div className="text-sm font-semibold text-text">النسخ الاحتياطي</div>
            <div className="mt-2 text-sm text-muted">آخر نسخة: اليوم</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
