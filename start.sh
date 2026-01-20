#!/bin/bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
COMPOSE="$ROOT/docker-compose.yml"
BACKEND_DIR="$ROOT/avocatapp"

usage() {
  cat <<'USAGE'
Usage: ./start.sh [up|rebuild|down|logs|init|migrate|ps]
  up       Start stack (detached)
  rebuild  Rebuild images then start
  down     Stop stack and remove volumes
  logs     Follow logs
  init     One-time Laravel setup (env + key + perms + caches + composer)
  migrate  Wait for DB then run migrate:fresh --seed
  ps       Show services status
USAGE
}

compose() { docker compose -f "$COMPOSE" "$@"; }

require() { command -v "$1" >/dev/null 2>&1 || { echo "Missing: $1"; exit 1; }; }

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
APP_URL=http://localhost:8080
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=avocat
DB_USERNAME=avocat
DB_PASSWORD=avocat_pass
ENVFILE
    fi
  fi

  # Ensure DB settings (docker network)
  sed -i 's/^DB_CONNECTION=.*/DB_CONNECTION=mysql/' "$BACKEND_DIR/.env" || true
  sed -i 's/^DB_HOST=.*/DB_HOST=db/' "$BACKEND_DIR/.env" || true
  sed -i 's/^DB_PORT=.*/DB_PORT=3306/' "$BACKEND_DIR/.env" || true
  sed -i 's/^DB_DATABASE=.*/DB_DATABASE=avocat/' "$BACKEND_DIR/.env" || true
  sed -i 's/^DB_USERNAME=.*/DB_USERNAME=avocat/' "$BACKEND_DIR/.env" || true
  sed -i 's/^DB_PASSWORD=.*/DB_PASSWORD=avocat_pass/' "$BACKEND_DIR/.env" || true
}

wait_db() {
  echo "Waiting for MySQL (db:3306)..."
  for i in $(seq 1 180); do
    php -r '$fp=@fsockopen("db",3306,$e,$s,1); if($fp){fclose($fp); exit(0);} exit(1);' && break
    sleep 1
  done
  echo "MySQL is up ✅"
}

case "${1:-up}" in
  up)
    require docker
    compose up -d
    echo "Backend:  http://localhost:8080"
    echo "Frontend: http://localhost:5173"
    echo "Search:   http://localhost:8001/docs"
    ;;
  rebuild)
    require docker
    compose up -d --build
    ;;
  down)
    require docker
    compose down -v
    ;;
  logs)
    require docker
    compose logs -f
    ;;
  ps)
    require docker
    compose ps
    ;;
  init)
    require docker
    prepare_env_docker
    compose up -d
    # install composer deps into mounted volume
    compose exec backend sh -lc "composer install || true"
    # generate key if missing + clear caches
    compose exec backend sh -lc "php artisan key:generate || true; php artisan config:clear || true; php artisan cache:clear || true"
    # fix permissions
    compose exec backend sh -lc "chown -R www-data:www-data storage bootstrap/cache && chmod -R 775 storage bootstrap/cache || true"
    echo "Init done ✅"
    ;;
  migrate)
    require docker
    compose exec backend sh -lc '
      '"$(declare -f wait_db)"'
      wait_db
      php artisan config:clear || true
      php artisan cache:clear || true
      php artisan migrate:fresh --seed
    '
    ;;
  *)
    usage
    exit 1
    ;;
esac
