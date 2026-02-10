# Backend Bootstrap Failure

## Commands attempted
1. `composer --version`
2. `composer install --no-interaction --prefer-dist`
3. `composer config -g repo.packagist composer https://repo.packagist.org`
4. `composer install --no-interaction --prefer-dist`

## Failure summary
- Composer could not download dependencies from GitHub due to network restrictions.
- Representative error: `CONNECT tunnel failed, response 403` and `ssh: connect to host github.com port 22: Network is unreachable`.

## What is required to proceed
- Run `composer install --no-interaction --prefer-dist` in `new-avocatapp/` from an environment that can access GitHub (HTTPS or SSH).
- Alternatively, provide a pre-built `vendor/` directory for the project.
