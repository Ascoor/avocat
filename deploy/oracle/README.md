# Oracle Cloud deployment

This stack runs React, Laravel, FastAPI, PostgreSQL, Redis, and Caddy on one
Oracle Compute VM. Only ports 22, 80, and 443 are public. Caddy obtains and
renews the TLS certificate automatically.

## 1. Create the VM

- Use Ubuntu 24.04 LTS (22.04 is also supported).
- Ampere A1 works because all selected images are multi-architecture.
- Allocate at least 2 OCPUs and 8 GB RAM for comfortable image builds.
- In the subnet Security List or NSG allow TCP 22, TCP 80, TCP 443, and UDP 443.
- Reserve the public IP if the hostname must remain stable.

## 2. Point DNS

Create an `A` record for `APP_DOMAIN` that points to the VM public IP. Wait for
it to resolve before starting Caddy.

## 3. Install Docker

```bash
sudo apt-get update
sudo apt-get install -y ca-certificates curl git
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list >/dev/null
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo usermod -aG docker "$USER"
```

Log out and back in once so group membership takes effect.

## 4. Configure and start

```bash
git clone --branch deploy/oracle-cloud https://github.com/Ascoor/avocat.git
cd avocat
cp .env.oracle.example .env.oracle
nano .env.oracle
docker compose --env-file .env.oracle -f docker-compose.oracle.yml up -d --build
```

For a new installation, generate `APP_KEY` first:

```bash
docker compose --env-file .env.oracle -f docker-compose.oracle.yml run --rm api php artisan key:generate --show
```

Put the displayed value in `.env.oracle`. When moving an existing installation,
reuse its production key so encrypted data remains readable.

## 5. Verify

```bash
docker compose --env-file .env.oracle -f docker-compose.oracle.yml ps
docker compose --env-file .env.oracle -f docker-compose.oracle.yml logs --tail=100 gateway api search-api
curl -I "https://${APP_DOMAIN}"
curl -I "https://${APP_DOMAIN}/search-api/"
```

## Update

```bash
git pull --ff-only
docker compose --env-file .env.oracle -f docker-compose.oracle.yml up -d --build
docker image prune -f
```

## Back up PostgreSQL

```bash
mkdir -p backups
docker compose --env-file .env.oracle -f docker-compose.oracle.yml exec -T database \
  pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB" | gzip > "backups/avocat-$(date +%F-%H%M).sql.gz"
```

Keep `.env.oracle` and backups outside Git. Back up the `laravel_storage` volume
too because it contains uploaded documents.
