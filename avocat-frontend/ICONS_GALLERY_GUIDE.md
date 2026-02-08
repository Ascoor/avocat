# Icons Gallery Guide

## استخدام LexicraftIcon
مثال سريع داخل أي صفحة React:

```tsx
import { LexicraftIcon } from "@shared/icons/lexicraft";

<LexicraftIcon name="gavel" size={24} />
```

### Props
- `name`: اسم الأيقونة (من manifest).
- `size`: الحجم بالبكسل.
- `className`: إضافة أصناف CSS إضافية.
- `title` / `ariaLabel`: خصائص الوصول.
- `dir`: اتجاه العرض (`ltr` أو `rtl`).
- `isDirectional`: لتحديد الأيقونات الاتجاهية يدويًا.

## تحديث/إضافة أيقونات Lexicraft
1) اسحب المصدر إلى:
   `avocat-frontend/_vendor/lexicraft-icons`
2) راجع الأيقونات المتاحة وحدد الأسماء الفعلية.
3) أضف/عدّل مكونات الأيقونات داخل:
   `src/shared/icons/lexicraft/icons.tsx`
4) حدّث manifest:
   `src/shared/icons/lexicraft/manifest.ts`
5) حدّث سجل المصدر:
   `LEXICRAFT_SOURCE_LOCK.md`

## قواعد التسمية
- استخدم أسماء قصيرة بصيغة kebab-case مثل: `arrow-forward`.
- حافظ على تناسق الأسماء مع المصدر.

## الأيقونات الاتجاهية و RTL
- أيقونات اتجاهية يجب أن تضع `isDirectional: true` داخل `manifest.ts`.
- عند عرض الأيقونات في RTL يتم تطبيق صنف CSS: `rtl-mirror`
  الذي يعكس الأيقونة أفقيًا.

## معرض الأيقونات
- المسار داخل التطبيق: `/dashboard/tools/icons`
- يدعم البحث، الفلاتر، اختيار الحجم، ومعاينة النمط (Light/Dark).
