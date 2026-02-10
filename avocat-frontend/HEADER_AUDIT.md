# Header Audit

## الملفات الفعلية المستخدمة في Dashboard Header
- `src/shared/layout/AppShell.jsx` يحقن `<Header />` على مستوى الشيل لكل صفحات الداشبورد.
- `src/shared/layout/Header.jsx` هو الهيدر الفعلي المستخدم.
- `src/shared/layout/HeaderTabs.jsx` هو مصدر Tabs في الهيدر.
- `src/styles/dashboard-shell.css` يحتوي قواعد `header-shell` و`header-tabs` المؤثرة على السلوك المرئي.

## أين يتم وضع Tabs الآن؟
1. داخل `Header.jsx`:
   - Desktop: `lg:flex` في منتصف الهيدر.
   - Tablet-only: صف ثاني كان `hidden md:block lg:hidden`.
   - Mobile أقل من `md`: لا تظهر tabs إطلاقًا.
2. مصدر العناصر: `HeaderTabs.jsx` يقوم بعمل flatten لـ `sidebarGroups` بالكامل، وبالتالي عدد tabs كبير جدًا.

### لقطة كود (Header placement)
```jsx
<div className="hidden lg:flex flex-1 px-4">
  <HeaderTabs className={cn("w-full", isRTL ? "justify-end" : "justify-start")} />
</div>

<div className="lg:hidden hidden md:block px-4 sm:px-6 pb-2">
  <HeaderTabs />
</div>
```

## Root Cause للـ overflow
1. **الصف الرئيسي للهيدر كان `flex` بدون wrap** مع ثلاث مناطق متزاحمة (title + tabs + actions/profile) داخل ارتفاع ثابت `h-16`.
2. **تبويبات كثيرة جدًا** لأن `HeaderTabs` يسطّح كامل sidebar groups بما فيها child menus.
3. **عدم وجود استراتيجية mobile واضحة للتبويبات** (مخفية تمامًا تحت md، ومزدحمة حول md/lg).
4. **`white-space: nowrap` داخل tabs** مفيد للتمرير، لكنه لا يكفي وحده إذا كان container الرئيسي نفسه لا يوزع المساحة بشكل متجاوب.

### لقطة كود (tabs behavior)
```css
.header-tabs {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  overflow-x: auto;
  white-space: nowrap;
  padding: 0.25rem 0.25rem;
}
```

### لقطة كود (single-row pressure)
```jsx
<div className="mx-auto flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
  {/* left */}
  {/* middle tabs */}
  {/* right actions/profile */}
</div>
```
