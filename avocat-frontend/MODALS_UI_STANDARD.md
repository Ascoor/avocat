# Modals UI Standard

## الهيكل
- **Header**: عنوان + أيقونة + وصف مختصر (subtitle).
- **Body**: شبكة حقول مرنة Responsive.
- **Footer**: أزرار Cancel/Save ثابتة في الأسفل.

## Styling
- استخدام tokens (`bg-card`, `border-border`, `text-foreground`).
- حواف دائرية `rounded-2xl` وظلال خفيفة.
- حقول بإطارات واضحة مع focus ring.

## Icons
- استخدام Lexicraft icons في العنوان وأزرار الحفظ/الإلغاء.

## Motion
- انتقالات خفيفة عند الدخول/الخروج باستخدام `.modal-motion`.
- احترام `prefers-reduced-motion`.

## حالات الخطأ
- عرض رسالة خطأ أعلى النموذج بوضوح.

## أمثلة مطبقة
- Add/Edit Client
- Add/Edit Unclient
- Add/Edit Legal Case
- Procedure Modal
