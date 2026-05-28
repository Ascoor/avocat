#!/bin/bash
set -Eeuo pipefail

log() {
  echo "$1"
}

normalize_port() {
  local raw_port="${PORT:-${APP_PORT:-8000}}"
  local numeric_port
  numeric_port="$(echo "$raw_port" | tr -dc '0-9')"

  if [ -z "$numeric_port" ]; then
    numeric_port="8000"
  fi

  echo "$numeric_port"
}

ensure_app_key() {
  if [ -n "${APP_KEY:-}" ]; then
    return 0
  fi

  log "🔑 APP_KEY is missing, generating an ephemeral runtime key..."
  local generated_key
  generated_key="$(php artisan key:generate --show --no-ansi 2>/dev/null || true)"

  if [ -z "$generated_key" ]; then
    generated_key="$(php -r 'echo "base64:".base64_encode(random_bytes(32));')"
  fi

  export APP_KEY="$generated_key"
}

wait_for_database() {
  if [ -z "${DB_HOST:-}" ] || [ -z "${DB_PORT:-}" ]; then
    log "⚠️ DB_HOST/DB_PORT not set; skipping database bootstrap."
    return 1
  fi

  local clean_db_host
  clean_db_host="$(echo "$DB_HOST" | tr -d '\r')"

  log "⏳ Waiting for Database at ${clean_db_host}:${DB_PORT}..."
  until nc -z -w 5 "$clean_db_host" "$DB_PORT"; do
    log "Waiting for database connection..."
    sleep 3
  done

  return 0
}

run_database_bootstrap() {
  wait_for_database || return 0

  log "📂 Running Migrations..."
  until php artisan migrate --force; do
    log "⚠️ Migrations failed; retrying in 5 seconds..."
    sleep 5
  done

  log "🧹 Clearing application cache..."
  php artisan cache:clear || true
}

log "🚀 Starting Deployment Script..."

CLEAN_PORT="$(normalize_port)"

# Use deploy-safe defaults only when the platform did not provide explicit values.
export APP_ENV="${APP_ENV:-production}"
export APP_DEBUG="${APP_DEBUG:-false}"
export CACHE_STORE="${CACHE_STORE:-file}"
export SESSION_DRIVER="${SESSION_DRIVER:-file}"
export QUEUE_CONNECTION="${QUEUE_CONNECTION:-sync}"

ensure_app_key

# Clear only config cache before boot; cache:clear can require a database-backed cache store.
log "🧹 Clearing config cache..."
php artisan config:clear || true

# Do not block the HTTP listener on database/migration work. BackApps/Railway health
# checks can fail if the process waits on MySQL before binding the exposed port.
run_database_bootstrap &

log "🌐 Starting Server on port ${CLEAN_PORT}..."
exec php -S "0.0.0.0:${CLEAN_PORT}" -t public public/docker-router.php
