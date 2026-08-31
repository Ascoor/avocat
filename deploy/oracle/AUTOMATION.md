# Oracle Cloud automation

This branch is prepared for a state-safe infrastructure + application deployment flow:

1. `infra/oracle/` defines the OCI network and Compute VM with Terraform.
2. OCI Resource Manager should own Terraform **apply/state**.
3. `.github/workflows/oracle-infra.yml` validates/plans Terraform against OCI.
4. `.github/workflows/oracle-deploy.yml` deploys the application to the created VM on every push to `deploy/oracle-cloud`.
5. `deploy/oracle/bootstrap.sh` installs Docker automatically when the VM is not already prepared.

## A. OCI API identity

Create a dedicated OCI user/group for deployment. Give it only the permissions needed for the target compartment (Compute, VCN/networking and Resource Manager as appropriate). Add an API signing public key to that user. Do not use the tenancy administrator key for CI.

Add these GitHub Actions secrets:

- `OCI_TENANCY_OCID`
- `OCI_USER_OCID`
- `OCI_FINGERPRINT`
- `OCI_PRIVATE_KEY` — the PEM private API signing key
- `OCI_REGION` — for example `eu-frankfurt-1`
- `OCI_COMPARTMENT_OCID`
- `OCI_SSH_PUBLIC_KEY`
- `OCI_SSH_ALLOWED_CIDR` — your trusted public IP in `/32` form whenever possible

Never commit any of those values.

## B. OCI Resource Manager

Create a Resource Manager stack from source control and select:

- Repository: `Ascoor/avocat`
- Branch: `deploy/oracle-cloud`
- Terraform working directory: `infra/oracle`

Set the required Terraform variables in Resource Manager, then run **Plan** and **Apply** there. Resource Manager persists Terraform state, so later changes remain safe and idempotent.

After Apply, note the Terraform output `public_ip`.

## C. DNS

Point the production domain `A` record to the Terraform `public_ip`. Caddy will request and renew HTTPS automatically after DNS resolves.

## D. Application deployment secrets

Create a GitHub environment named `production` and add:

- `ORACLE_HOST` — Terraform `public_ip`
- `ORACLE_USER` — normally `ubuntu`
- `ORACLE_SSH_PRIVATE_KEY` — private key matching `OCI_SSH_PUBLIC_KEY`
- `ORACLE_APP_URL` — e.g. `https://avocat.example.com`
- `ORACLE_ENV_FILE` — complete multiline contents based on `.env.oracle.example`

`ORACLE_ENV_FILE` must contain a real Laravel `APP_KEY`, a strong PostgreSQL password, the production domain/URLs, and mail settings if mail is enabled.

## E. Automatic deployment

Every push to `deploy/oracle-cloud` triggers `.github/workflows/oracle-deploy.yml` and performs:

- SSH host setup
- Docker bootstrap if needed
- checkout/reset to the exact deployment branch
- installation of the secret `.env.oracle` on the VM
- `docker compose ... up -d --build --remove-orphans`
- container status check
- image cleanup
- HTTPS smoke test

The database, Redis, Laravel API and FastAPI search service are not exposed directly to the Internet. Public traffic enters through Caddy on ports 80/443.

## F. First production checklist

Before the first deploy:

1. Rotate any credentials that have ever been committed to Git history.
2. Configure OCI network policies and keep SSH restricted to a trusted CIDR.
3. Create the Resource Manager stack and Apply it.
4. Point DNS to the returned public IP.
5. Add the GitHub `production` environment secrets listed above.
6. Run the `Deploy to Oracle VM` workflow manually once, or push a deployment commit.
7. Verify `/`, `/api/...`, and `/search-api/` through HTTPS.
8. Configure automated PostgreSQL and uploaded-file backups before treating the VM as production.
