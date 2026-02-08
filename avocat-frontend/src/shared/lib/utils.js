import { clsx } from "clsx"; // استيراد مكتبة clsx
import { twMerge } from "tailwind-merge"; // استيراد مكتبة tailwind-merge

// دالة cn: دمج القيم المختلفة لـ className بشكل ذكي
export function cn(...inputs) {
  return twMerge(clsx(inputs)); // دمج clsx مع twMerge للحصول على نتيجة نهائية محسّنة
}
