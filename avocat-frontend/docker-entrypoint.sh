#!/bin/sh

# طباعة المنفذ للتأكد في السجلات (اختياري)
echo "Starting Avocat on Port: $PORT"

# تشغيل Vite وتمرير المنفذ له بشكل ديناميكي
# استخدام exec يضمن استجابة الحاوية للأوامر بشكل صحيح
exec npm run dev -- --host 0.0.0.0 --port ${PORT:-8080}
