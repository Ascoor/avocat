#!/bin/sh
set -eu

cd /usr/src/app

if [ ! -d node_modules ]; then
  npm install
fi

npm run dev -- --host 0.0.0.0 --port="${VITE_PORT:-8080}"
