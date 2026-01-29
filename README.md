# avocat

## التشغيل عبر ملف الجذر
الاعتماد الآن على الباك إند الجديد **new-avocatapp** فقط ضمن Docker، ويتم تشغيل كل شيء عبر `start.sh` في جذر المشروع.

### المسار الأساسي (٣ أوامر)
- تشغيل الحزمة كاملة:
  ```bash
  ./start.sh up
  ```
- إعادة بناء كاملة من الصفر:
  ```bash
  ./start.sh rebuild
  ```
- إيقاف وإزالة الحاويات والـ volumes:
  ```bash
  ./start.sh down
  ```

### أوامر مساعدة
```bash
./start.sh init
./start.sh migrate
./start.sh logs
./start.sh ps
```

## ملفات البيئة (التطوير)
- الباك إند الجديد:
  - القالب: `new-avocatapp/.env.docker.example`
  - الملف الفعلي أثناء التشغيل (يُنشئه `start.sh` تلقائيًا): `new-avocatapp/.env.docker`
- الواجهة الأمامية:
  - القالب: `avocat-frontend/.env.example`

> **ملاحظة:** ملفات Docker الخاصة بالباك إند القديم تمت إزالتها للحد من التكرار والالتباس. تشغيل Docker يستهدف الباك إند الجديد فقط.
