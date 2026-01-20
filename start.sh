#!/bin/bash
# ==========================================================
# Avocat Full-Stack Orchestrator (Docker-first)
# Laravel + Nginx + Vite + FastAPI(Uvicorn) + MySQL
# ==========================================================

set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"
COMPOSE_FILE="$PROJECT_ROOT/docker-compose.yml"

BACKEND_DIR="$PROJECT_ROOT/avocatapp"
BACKEND_ENV_DOCKER="$BACKEND_DIR/.env.docker"
BACKEND_ENV_EXAMPLE="$BACKEND_DIR/.env.example"

print_section() { echo -e "\n\e[1;36m$1\e[0m"; }

require_command() {
  local cmd="$1"
  if ! command -v "$cmd" >/dev/null 2>&1; then
    echo "❌ Missing required command: $cmd"
    exit 1
  fi
}

usage() {
  cat <<'USAGE'
Usage: ./start.sh [up|down|logs|rebuild]
  up      - Start stack (detached)
  down    - Stop stack and remove volumes
  logs    - Follow logs
  rebuild - Rebuild images then start
USAGE
}

prepare_backend_env() {
  # لا ننشئ .env الحقيقي — فقط ملف docker
  if [ ! -d "$BACKEND_DIR" ]; then
    echo "⚠️  Backend folder not found: $BACKEND_DIR"
    return
  fi

  if [ -f "$BACKEND_ENV_DOCKER" ]; then
    return
  fi

  print_section "🧩 Preparing Laravel .env.docker"
  require_command openssl

  if [ -f "$BACKEND_ENV_EXAMPLE" ]; then
    cp "$BACKEND_ENV_EXAMPLE" "$BACKEND_ENV_DOCKER"
  else
    cat > "$BACKEND_ENV_DOCKER" <<'ENVEOF'
APP_NAME=Avocat
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8080
ENVEOF
  fi

  local generated_key="base64:$(openssl rand -base64 32)"
  if grep -qE '^APP_KEY=' "$BACKEND_ENV_DOCKER"; then
    sed -i "s|^APP_KEY=.*$|APP_KEY=$generated_key|" "$BACKEND_ENV_DOCKER"
  else
    echo "APP_KEY=$generated_key" >> "$BACKEND_ENV_DOCKER"
  fi

  # Docker DB settings
  cat <<'ENVEOF' >> "$BACKEND_ENV_DOCKER"

DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=avocat
DB_USERNAME=avocat
DB_PASSWORD=avocat_pass
ENVEOF
}

docker_up() {
  local build_flag="$1"
  local compose_cmd=(docker compose -f "$COMPOSE_FILE")

  print_section "🐳 Starting Docker stack"
  if [ "$build_flag" = "--build" ]; then
    "${compose_cmd[@]}" up -d --build
  else
    "${compose_cmd[@]}" up -d
  fi

  print_section "✅ URLs"
  echo "Backend (Laravel via Nginx): http://localhost:8080"
  echo "Frontend (Vite dev):        http://localhost:5173"
  echo "Search API (FastAPI):       http://localhost:8001/docs"
  echo "MySQL:                      localhost:3306"
}

case "${1:-up}" in
  up)
    require_command docker
    prepare_backend_env
    docker_up ""
    ;;
  rebuild)
    require_command docker
    prepare_backend_env
    docker_up "--build"
    ;;
  down)
    require_command docker
    print_section "🛑 Stopping containers"
    docker compose -f "$COMPOSE_FILE" down -v
    ;;
  logs)
    require_command docker
    print_section "📜 Logs"
    docker compose -f "$COMPOSE_FILE" logs -f
    ;;
  *)
    usage
    exit 1
    ;;
esac
