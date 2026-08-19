# Production Deployment

This branch contains a Docker-based production stack for a single Linux server (for example an Oracle Cloud Always Free VM).

## Services

- `web`: React/Vite production build
- `api`: Laravel API
- `search`: FastAPI search service
- `pg`: PostgreSQL 16
- `cache`: Redis 7
- `caddy`: HTTPS reverse proxy with automatic TLS certificates

Only ports 80 and 443 are exposed publicly. PostgreSQL, Redis, Laravel, FastAPI, and the frontend container communicate over the private Docker network.

## 1. Server prerequisites

Install Git, Docker Engine, and the Docker Compose plugin. Open inbound TCP ports 80 and 443 and UDP 443 in the cloud firewall/security list.

## 2. DNS

Create DNS A records that point to the server public IP:

- `APP_DOMAIN` -> frontend
- `API_DOMAIN` -> Laravel API
- `SEARCH_DOMAIN` -> FastAPI search service

Example:

```text
avocat.example.com
api.avocat.example.com
search.avocat.example.com
```

## 3. Production environment

```bash
cp .env.production.example .env.production
nano .env.production
```

Replace all example domains and set a strong `DB_PASSWORD`.

Generate a Laravel application key after the images are built:

```bash
docker compose --env-file .env.production -f docker-compose.prod.yml build api
docker compose --env-file .env.production -f docker-compose.prod.yml run --rm api php artisan key:generate --show
```

Copy the returned key into `APP_KEY=` in `.env.production`.

Never commit `.env.production`.

## 4. Build and start

```bash
docker compose --env-file .env.production -f docker-compose.prod.yml up -d --build
```

Check status:

```bash
docker compose --env-file .env.production -f docker-compose.prod.yml ps
```

Check logs:

```bash
docker compose --env-file .env.production -f docker-compose.prod.yml logs -f --tail=100
```

Caddy will request HTTPS certificates automatically after DNS resolves to the server and ports 80/443 are reachable.

## 5. Updating the application

```bash
git pull
docker compose --env-file .env.production -f docker-compose.prod.yml up -d --build
```

The Laravel container startup script waits for PostgreSQL and runs migrations automatically.

## 6. Backups

Back up PostgreSQL regularly. Example:

```bash
docker compose --env-file .env.production -f docker-compose.prod.yml exec -T pg \
  pg_dump -U "$DB_USERNAME" "$DB_DATABASE" > avocat-$(date +%F).sql
```

Keep backups outside the VM as well as on the server.
