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

### تفعيل الأوامر المختصرة (Aliases)
لتمكين الأوامر المختصرة في نفس الطرفية:
```bash
source ./start.sh
```
سيتم تفعيل Aliases مثل:
- `build-backend`
- `build-frontend`
- `start-stack`
- `stop-stack`

## ملفات البيئة (التطوير)
تم توحيد إعدادات البيئة عبر ملفات مستقلة لكل خدمة في الجذر:
- `backend.env` → إعدادات الباك إند (Laravel).
- `frontend.env` → إعدادات الواجهة الأمامية.
- `database.env` → إعدادات PostgreSQL.

يتم ربط ملف `backend.env` تلقائيًا بـ `new-avocatapp/.env.docker` داخل الحاوية عند التشغيل.

> **ملاحظة:** تمت إزالة الملفات القديمة مثل `.env.docker.example` لضمان عدم تكرار الإعدادات.

## تشغيل Docker يدويًا
يمكن تشغيل الخدمات مباشرة عبر `docker compose`:
```bash
docker compose up -d
```

## ملاحظات مهمة
- الشبكات في `docker-compose.yml` تفصل بين backend/frontend/database لتسهيل الاتصال المنظم.
- تم تحديث صورة الباك إند الجديدة وربطها بـ `docker-entrypoint.sh` لضمان التشغيل التلقائي.
- يُفضل استخدام الأوامر الموجودة في `start.sh` لضمان إعداد البيئة تلقائيًا.
