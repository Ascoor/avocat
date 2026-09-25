# Avocat production deployment (OCI 1 GB VM)

This directory prepares the repository for a lightweight native deployment on Ubuntu 24.04. Docker is intentionally not required on the 1 GB OCI E2.1.Micro target.

## Runtime layout

- Nginx: public ports 80/443
- React/Vite: built once; Nginx serves `avocat-frontend/dist`
- Laravel 11: PHP 8.3-FPM via Unix socket
- FastAPI: systemd + Uvicorn on `127.0.0.1:9100`
- PostgreSQL: localhost only
- Redis: localhost only

Do not expose PostgreSQL 5432, Redis 6379, PHP-FPM, or Uvicorn to the Internet.

## Production secrets

The files in `deploy/env/` are templates only. Copy values to server-side files and replace placeholders. Do not commit real passwords, APP_KEY values, API keys, or certificates.

The frontend environment is public by design: all `VITE_*` variables are compiled into browser JavaScript. Therefore no JWT secret or other secret belongs in the frontend environment.

## Server paths

Repository: `/var/www/avocat`

Laravel public directory: `/var/www/avocat/avocat-backend/public`

Frontend build: `/var/www/avocat/avocat-frontend/dist`

Search API: `/var/www/avocat/search-api`

## Deployment order

1. Clone the `production-ready` branch to `/var/www/avocat`.
2. Copy `deploy/env/backend.production.example` to `avocat-backend/.env` and set server-only secrets. Copy `deploy/env/frontend.production.example` to `avocat-frontend/.env.production`; the API uses same-origin `/api/v1` and court search uses `/search-api/search`.
3. Run Composer in `avocat-backend` with production dependencies only.
4. Generate Laravel APP_KEY, configure PostgreSQL, run migrations, then cache config/routes/views.
5. Build the frontend with the production Vite environment. Node is only needed for the build; it is not a production daemon.
6. Create `search-api/.venv`, install requirements, and install the systemd unit from `deploy/systemd/`.
7. Install the Nginx site from `deploy/nginx/avocat.conf`, test with `nginx -t`, then reload.
8. Apply the low-memory PHP-FPM/PostgreSQL/Redis snippets after backing up their distribution configs.
9. Add the domain, then issue TLS and redirect HTTP to HTTPS.

## Low-memory target

The supplied snippets are conservative starting points for the current 1 GB VM. Keep the existing swap enabled. Measure memory after PostgreSQL/Redis/FastAPI are started and tune further if needed.


## Verified application routing

- Laravel's `routes/api.php` is registered by Laravel under `/api` and the file adds `v1`, so frontend requests correctly target `/api/v1/*`.
- Both Axios clients append `/api/v1` to `VITE_API_BASE_URL`. For this single-host deployment the production value is intentionally empty.
- Court-search frontend calls use `VITE_SEARCH_API_URL` and Nginx maps `/search-api/search` to FastAPI `/search`.
- The legacy Railway and old `avocat.ask-ar.net/avocatapp` hard-coded runtime URLs were removed from the production branch.
- FastAPI imports `httpx`, so it is explicitly included in `requirements.txt`.
- Laravel database/session/cache/queue tables exist in migrations. The office-settings functional-index migration was adjusted to valid PostgreSQL expression-index syntax.
- CORS should be restricted to the final production origin via `FRONTEND_URLS` and `FASTAPI_ALLOWED_ORIGINS`; replace the placeholder after the final domain is chosen.

## Pre-deploy validation

Before switching live traffic, run the Laravel migrations against the new PostgreSQL database, run the backend test suite, build the Vite frontend with `.env.production`, and smoke-test login plus court search. Do not run `migrate:fresh` on a database containing production data.
