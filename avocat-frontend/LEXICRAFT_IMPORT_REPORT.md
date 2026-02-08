# Lexicraft Icons Import Report

## Fetch Summary
- Repo: https://github.com/AscarTec/lexicraft-icons
- Status: **تعذر السحب** بسبب قيود الشبكة (HTTP 403 من CONNECT tunnel).
- Vendor path: `avocat-frontend/_vendor/lexicraft-icons/`

## Tree (Current Vendor State)
```
_vendor/lexicraft-icons/
└── README.md
```

## Content Type (Expected)
- لم نتمكن من الوصول إلى المصدر الأصلي لتحديد النوع بدقة (SVG/raw/components).

## Icons Location
- غير متوفر في البيئة الحالية. بمجرد السحب، حدّد مجلدات الأيقونات داخل `_vendor/lexicraft-icons`.

## Metadata Availability
- لا توجد بيانات وصفية متاحة من المصدر في البيئة الحالية.
- تم إنشاء manifest يدوي minimal داخل المشروع:
  `src/shared/icons/lexicraft/manifest.ts`
  مع تصنيفات: Court / Documents / Security / Finance / People / Tools / General.

## Follow-up Instructions
1) عند توفر الاتصال، اسحب المصدر إلى `_vendor/lexicraft-icons`.
2) راجع بنية المجلدات وحدد مكان الأيقونات.
3) حدّث `manifest.ts` بالأسماء والتصنيفات الحقيقية.
4) حدّث `LEXICRAFT_SOURCE_LOCK.md` بقيمة commit hash.
