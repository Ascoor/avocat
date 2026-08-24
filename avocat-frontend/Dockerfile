# المرحلة الأولى: البناء (Build)
FROM node:20-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG VITE_API_BASE_URL=""
ARG VITE_SEARCH_API_URL="/search-api/search"
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_SEARCH_API_URL=$VITE_SEARCH_API_URL
RUN npm run build

# المرحلة الثانية: التشغيل (Production)
FROM node:20-alpine
WORKDIR /app
# تثبيت خادم بسيط للملفات الساكنة
RUN npm install -g serve
# نسخ الملفات التي تم بناؤها فقط من المرحلة الأولى
COPY --from=build-stage /app/dist ./dist
COPY --from=build-stage /app/serve.json ./dist/serve.json

# Railway ستقوم بتمرير المنفذ عبر متغير PORT
EXPOSE 8080

# تشغيل الخادم وتوجيه كل الطلبات لـ index.html (مهم لـ React Router)
CMD ["sh", "-c", "serve -s dist -l ${PORT:-8080}"]
