# Header Fix Guide

## قرارات التصميم
1. **تحويل الهيكل إلى Grid بدل صف Flex واحد** داخل `Header.jsx`:
   - `grid-cols-[1fr_auto]` على الشاشات الصغيرة.
   - `lg:grid-cols-[minmax(0,280px)_1fr_auto]` على desktop.
   - هذا يفصل مساحة العنوان عن tabs وعن profile/actions ويمنع التزاحم.

2. **حماية overflow أفقية بشكل آمن**:
   - `overflow-x-clip` على `header-shell`.
   - tabs نفسها تبقى `overflow-x:auto` كي لا نخفي محتوى مهم، بل ننقله إلى تمرير أفقي واضح.

3. **Tabs responsive**:
   - Desktop (`lg+`): inline وسط الهيدر.
   - Mobile/Tablet (`<lg`): صف tabs سفلي مخصص بتمرير أفقي + `scroll-snap` (`header-tabs-mobile`).

4. **Sticky + z-index**:
   - رفع `z-index` للهيدر إلى `45` في CSS لضمان الظهور فوق المحتوى بدون كسر stacking.

5. **RTL/LTR**:
   - الحفاظ على `flex-row-reverse` عبر `isRTL` في توزيع العناصر.
   - استخدام `padding-inline` و `inset-inline` في CSS حيث أمكن.

## Breakpoints المعتمدة
- **320/375**: grid ثنائي عمود + tabs صف سفلي scroll-snap.
- **768**: نفس سلوك mobile/tablet مع مساحات أوسع.
- **1024**: يبقى صف tabs السفلي (حتى `lg`).
- **1440**: tabs inline في المنتصف مع `max-w-[1440px]` للهيدر.

## الملفات المعدلة
- `src/shared/layout/Header.jsx`
- `src/shared/layout/HeaderTabs.jsx`
- `src/styles/dashboard-shell.css`
