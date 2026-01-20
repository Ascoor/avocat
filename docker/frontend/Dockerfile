FROM node:20-alpine
WORKDIR /app

COPY avocat-frontend/package*.json /app/
RUN npm ci || npm install

COPY avocat-frontend/ /app/

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
