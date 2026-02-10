# RBAC Discovery Scope

## Project Locations
- Legacy backend: `/workspace/avocat/avocatapp`
- New backend (Laravel 11): `/workspace/avocat/new-avocatapp`

## Framework / Runtime Versions (from composer.json)
- Legacy: Laravel `^8.75`, PHP `^7.4|^8.1`.【F:avocatapp/composer.json†L11-L20】
- New: Laravel `^11.31`, PHP `^8.2`.【F:new-avocatapp/composer.json†L10-L16】

## Authentication Mechanism (from config/auth.php)
- Legacy: `web` guard uses session; `api` guard uses Passport (`driver => passport`).【F:avocatapp/config/auth.php†L15-L45】
- New: `api` guard uses Sanctum (`driver => sanctum`).【F:new-avocatapp/config/auth.php†L17-L55】
