FROM node:20-alpine

# تثبيت curl
RUN apk add --no-cache curl

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8080
RUN chmod +x docker-entrypoint.sh
CMD ["sh", "docker-entrypoint.sh"]