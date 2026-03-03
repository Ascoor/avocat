// purgecss.config.js
export default {
    content: [
      "./src/**/*.{html,js,jsx,ts,tsx}"  // فحص كل المكونات داخل مجلد src فقط
    ],
    css: [],  // لا حاجة لتحديد ملفات CSS هنا
    safelist: [],  // الفئات التي تريد تأكيد عدم حذفها
  }