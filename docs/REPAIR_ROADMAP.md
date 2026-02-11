# Avocat Project — Repair & Development Roadmap (Backend + Frontend)

مرجع ثابت لخطة الإصلاح والتطوير:  
يوضح **ما تم إنجازه** + **ما ينتظر التنفيذ** + **متطلبات كل مرحلة**.

---

## 🎯 الهدف العام

- ضمان **Legacy Parity** وعدم كسر التوافق مع النظام القديم ✅  
- توحيد **API Contracts + Pagination/Filtering** لتحسين الأداء ⏳  
- تثبيت **Server-State Management** في الواجهة باستخدام TanStack Query ⏳  
- تحسين الأداء العام (Assets/Bundle/UX) ⏳  

---

# ✅ Project Root Checklist

> الحالة:
- ✅ منتهي  
- ⏳ قيد التنفيذ / منتظر  
- ⚠️ يحتاج تشغيل في بيئة كاملة (vendor/CI)

---

## A) Backend Stability — سد فجوات الخدمات والروتس (Legacy Binding Parity)

### A1 — Inventory + Gap Analysis
- ✅ تقرير parity + gap analysis:
  - `docs/legacy-parity-report.md`
  - `docs/LEGACY_PARITY_REPORT.md`

---

### A2 — استكمال الخدمات الناقصة (TODO Stubs)

- ✅ `ClientService` (CRUD + list)
- ✅ `EventService::createEvent`
- ✅ `ExpenseService::createExpense`
- ✅ `NotificationService::createNotification`

---

### A3 — استكمال Controller Actions المرتبطة بالروتس

- ✅ CourtSearch:
  - `getDegrees`
  - `getCourts`
  - `getCaseTypes`

- ✅ CaseStatus:
  - `index`
  - `fetchDegrees`
  - `getCourtOptions`
  - `getCaseTypeOptions`
  - `getCaseYearOptions`
  - `getCaseDetails` (مع 501 semantics)

- ✅ LegalSession filters:
  - `getByCourtId`
  - `getByLawyerId`

---

### A4 — Route Parity + Compatibility

- ✅ إصلاح bindings في `routes/api.php`
- ✅ إضافة alias endpoint: `legal_ads`
- ✅ auth flows untouched

---

### A5 — Safety Tests (Binding Protection)

- ✅ `ApiRouteActionBindingsTest`
- ⚠️ `php artisan test` لم يعمل داخل البيئة الحالية (missing vendor/autoload)

#### المطلوب:
- ⏳ تشغيل الاختبارات داخل بيئة Laravel كاملة أو CI

---

### ✅ DoD المرحلة A
- لا يوجد route بيرجع runtime binding error
- جميع non-auth endpoints مربوطة بشكل صحيح
- CI يشغل tests بنجاح

---

---

## B) Legacy Model Behavior Parity (منطق البيانات)

### B1 — Invoice/Payment Parity

- ✅ إعادة `Invoice::updateStatus`
- ✅ Payment save hook لتحديث status تلقائيًا

---

### B2 — LegCase Soft Hide/Restore

- ✅ منطق hide/restore مطابق للقديم
- ✅ default filtering لـ `is_deleted`

---

### B3 — CourtLevel Cascading Delete

- ✅ حذف المحاكم المرتبطة قبل حذف CourtLevel

---

### B4 — Schema/Behavior Parity Tests

- ✅ `LegacyParitySchemaTest`
- ⚠️ لم يتم تشغيله في البيئة الحالية بسبب missing vendor

#### المطلوب:
- ⏳ تشغيل الاختبار داخل CI/Dev environment

---

### ✅ DoD المرحلة B
- behaviors الأساسية مطابقة للقديم
- schema parity tests شغالة في CI

---

---

## C) API Contract Modernization (أهم خطوة مشتركة)

> المرحلة دي هي الجسر الحقيقي بين الباك والفرونت.

### C1 — Unified Response Envelope

- ⏳ توحيد شكل الاستجابة لكل list endpoints:

```json
{
  "items": [],
  "meta": {
    "total": 0,
    "page": 1,
    "limit": 20
  }
}
