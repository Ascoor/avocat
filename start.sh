#!/bin/bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
COMPOSE="$ROOT/docker-compose.yml"
BACKEND_DIR="$ROOT/new-avocatapp"

usage() {
  cat <<'USAGE'
Usage: ./start.sh [up|rebuild|down|logs|init|migrate|ps]
  up       Start stack (detached)
  rebuild  Full rebuild from zero (down -v + no-cache build + up)
  down     Stop stack and remove volumes
  logs     Follow logs
  init     One-time Laravel setup (env + key + perms + caches + composer)
  migrate  Wait for DB then run migrate:fresh --seed
  ps       Show services status
USAGE
}

compose() { docker compose -f "$COMPOSE" "$@"; }

require() { command -v "$1" >/dev/null 2>&1 || { echo "Missing: $1"; exit 1; }; }

ensure_env_docker_file() {
  local env_docker="$BACKEND_DIR/.env.docker"
  local env_example="$BACKEND_DIR/.env.docker.example"

  if [ ! -f "$env_docker" ]; then
    echo "Preparing $env_docker with updated service hosts (pg/cache)..."
    if [ -f "$env_example" ]; then
      cp "$env_example" "$env_docker"
    else
      cat > "$env_docker" <<'ENVDOCKER'
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
ENVDOCKER
    fi
  fi
}

prepare_env_docker() {
  # Create .env if missing from .env.example (local only)
  if [ ! -f "$BACKEND_DIR/.env" ]; then
    if [ -f "$BACKEND_DIR/.env.example" ]; then
      cp "$BACKEND_DIR/.env.example" "$BACKEND_DIR/.env"
    else
      cat > "$BACKEND_DIR/.env" <<'ENVFILE'
APP_NAME=Avocat
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000
DB_CONNECTION=pgsql
DB_HOST=pg
DB_PORT=5432
DB_DATABASE=app
DB_USERNAME=app
DB_PASSWORD=app_password
ENVFILE
    fi
  fi

  # Ensure DB settings (docker network)
  sed -i 's/^DB_CONNECTION=.*/DB_CONNECTION=pgsql/' "$BACKEND_DIR/.env" || true
  sed -i 's/^DB_HOST=.*/DB_HOST=pg/' "$BACKEND_DIR/.env" || true
  sed -i 's/^DB_PORT=.*/DB_PORT=5432/' "$BACKEND_DIR/.env" || true
  sed -i 's/^DB_DATABASE=.*/DB_DATABASE=app/' "$BACKEND_DIR/.env" || true
  sed -i 's/^DB_USERNAME=.*/DB_USERNAME=app/' "$BACKEND_DIR/.env" || true
  sed -i 's/^DB_PASSWORD=.*/DB_PASSWORD=app_password/' "$BACKEND_DIR/.env" || true
}

wait_db() {
  echo "Waiting for Postgres (pg:5432)..."
  for i in $(seq 1 180); do
    php -r '$fp=@fsockopen("pg",5432,$e,$s,1); if($fp){fclose($fp); exit(0);} exit(1);' && break
    sleep 1
  done
  echo "Postgres is up ✅"
}

case "${1:-up}" in
  up)
    require docker
    echo "Starting stack with services: pg, cache, api, web..."
    ensure_env_docker_file
    compose up -d
    echo "Stack is up ✅"
    echo "Backend:  http://localhost:8000"
    echo "Frontend: http://localhost:8088"
    ;;
  rebuild)
    require docker
    echo "Rebuilding stack (pg, cache, api, web)..."
    ensure_env_docker_file
    compose down -v --remove-orphans
    compose build --no-cache
    compose up -d
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
    ensure_env_docker_file
    prepare_env_docker
    compose up -d
    # install composer deps into mounted volume
    compose exec api sh -lc "composer install || true"
    # generate key if missing + clear caches
    compose exec api sh -lc "php artisan key:generate || true; php artisan config:clear || true; php artisan cache:clear || true"
    # fix permissions
    compose exec api sh -lc "chown -R www-data:www-data storage bootstrap/cache && chmod -R 775 storage bootstrap/cache || true"
    echo "Init done ✅"
    ;;
  migrate)
    require docker
    echo "Running migrations on api with pg..."
    compose exec api sh -lc '
      '"$(declare -f wait_db)"'
      wait_db
      php artisan config:clear || true
      php artisan cache:clear || true
      php artisan migrate:fresh --seed
    '
    echo "Migrations done ✅"
    ;;
  *)
    usage
    exit 1
    ;;
esac
