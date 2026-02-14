#!/bin/bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
COMPOSE="$ROOT/docker-compose.yml"
BACKEND_DIR="$ROOT/avocat-backend"

usage() {
  cat <<'USAGE'
Usage: ./start.sh [up|rebuild|down|logs|init|migrate|ps|aliases]
Core workflow (root script):
  up       Start stack (detached) using the NEW backend (avocat-backend)
  rebuild  Full rebuild from zero (down -v + no-cache build + up)
  down     Stop stack and remove volumes

Extras:
  logs     Follow logs
  init     One-time Laravel setup (env + key + perms + caches + composer)
  migrate  Wait for DB then run migrate:fresh --seed
  ps       Show services status
  aliases  Print helpful aliases (or source the script to enable them)
USAGE
}

compose() { docker compose -f "$COMPOSE" "$@"; }

require() { command -v "$1" >/dev/null 2>&1 || { echo "Missing: $1"; exit 1; }; }

ensure_env_files() {
  local backend_env="$ROOT/backend.env"
  local database_env="$ROOT/database.env"
  local frontend_env="$ROOT/frontend.env"

  if [ ! -f "$backend_env" ]; then
    cat > "$backend_env" <<'ENVBACKEND'
APP_NAME=Avocat
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8000

LOG_CHANNEL=stack
LOG_LEVEL=debug

DB_CONNECTION=pgsql
DB_HOST=pg
DB_PORT=5432
DB_DATABASE=app
DB_USERNAME=app
DB_PASSWORD=app_password

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

REDIS_HOST=cache
REDIS_PASSWORD=null
REDIS_PORT=6379
ENVBACKEND
  fi

  if [ ! -f "$database_env" ]; then
    cat > "$database_env" <<'ENVDATABASE'
POSTGRES_DB=app
POSTGRES_USER=app
POSTGRES_PASSWORD=app_password
ENVDATABASE
  fi

  if [ ! -f "$frontend_env" ]; then
    cat > "$frontend_env" <<'ENVFRONTEND'
VITE_API_URL=http://localhost:8000
VITE_APP_ENV=local
ENVFRONTEND
  fi
}

enable_aliases() {
  alias build-backend='docker compose -f "'$COMPOSE'" build api'
  alias build-frontend='docker compose -f "'$COMPOSE'" build web'
  alias start-stack='docker compose -f "'$COMPOSE'" up -d'
  alias stop-stack='docker compose -f "'$COMPOSE'" down'
}

wait_db() {
  echo "Waiting for Postgres (pg:5432)..."
  for i in $(seq 1 180); do
    php -r '$fp=@fsockopen("pg",5432,$e,$s,1); if($fp){fclose($fp); exit(0);} exit(1);' && break
    sleep 1
  done
  echo "Postgres is up ✅"
}

verify_pgsql_driver() {
  echo "Checking PHP drivers inside api..."
  compose exec api php -m | grep -iE "PDO|pdo_pgsql|pgsql" || {
    echo "❌ pdo_pgsql not found inside api. Rebuild image is required."
    exit 1
  }
  echo "✅ pdo_pgsql is installed."
}

if [[ "${BASH_SOURCE[0]}" != "$0" ]]; then
  enable_aliases
  return 0
fi

case "${1:-up}" in
  up)
    require docker
    echo "Starting stack with services: pg, cache, api, web..."
    echo "Using backend.env, frontend.env, and database.env for environment config."
    ensure_env_files
    compose up -d
    echo "Stack is up ✅"
    echo "Backend:  http://localhost:8000"
    echo "Frontend: http://localhost:8080"
    ;;
  rebuild|build)
    require docker
    echo "Rebuilding stack (pg, cache, api, web) from zero..."
    ensure_env_files

    # Stop + remove volumes/orphans
    compose down -v --remove-orphans

    # Remove old images to avoid stale builds (important!)
    docker image rm -f 39-api 2>/dev/null || true
    docker image prune -f >/dev/null 2>&1 || true

    # Build api explicitly without cache, then start
    compose build --no-cache --pull api
    compose up -d

    # Verify pgsql driver exists
    verify_pgsql_driver

    echo "Rebuild complete ✅"
    ;;
  down)
    require docker
    echo "Stopping stack (pg, cache, api, web)..."
    compose down -v
    echo "Stack stopped ✅"
    ;;
  logs)
    require docker
    echo "Following logs for services: pg, cache, api, web..."
    compose logs -f
    ;;
  ps)
    require docker
    echo "Checking status for services: pg, cache, api, web..."
    compose ps
    ;;
  init)
    require docker
    echo "Initializing backend service (api) with pg + cache..."
    ensure_env_files
    compose up -d
    # install composer deps into mounted volume
    compose exec api sh -lc "composer install || true"
    # generate key if missing + clear caches
    compose exec api sh -lc "php artisan key:generate --force || true; php artisan config:clear || true"
    # fix permissions
    compose exec api sh -lc "chown -R www-data:www-data storage bootstrap/cache && chmod -R 775 storage bootstrap/cache || true"
    echo "Init done ✅"
    ;;
  migrate)
    require docker
    echo "Running migrations on api with pg..."
    verify_pgsql_driver
    compose exec api sh -lc '
      '"$(declare -f wait_db)"'
      wait_db
      php artisan migrate:fresh --seed
    '
    echo "Migrations done ✅"
    ;;
  aliases)
    cat <<'ALIASES'
To enable aliases in your shell:
  source ./start.sh

Aliases provided:
  build-backend  -> docker compose -f ./docker-compose.yml build api
  build-frontend -> docker compose -f ./docker-compose.yml build web
  start-stack    -> docker compose -f ./docker-compose.yml up -d
  stop-stack     -> docker compose -f ./docker-compose.yml down
ALIASES
    ;;
  *)
    usage
    exit 1
    ;;
esac
