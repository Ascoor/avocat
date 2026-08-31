# Oracle Cloud automation

This branch is prepared for a state-safe infrastructure + application deployment flow:

1. `infra/oracle/` defines the OCI network and Compute VM with Terraform.
2. OCI Resource Manager owns Terraform **apply/state**.
3. `.github/workflows/oracle-infra.yml` validates/plans Terraform against OCI.
4. `.github/workflows/oracle-deploy.yml` deploys the application to the created VM.
5. `deploy/oracle/bootstrap.sh` installs Docker automatically when the VM is not already prepared.

## A. GitHub OCI API identity

Use a dedicated OCI deployment user where possible and grant only the permissions needed for the target compartment. Add an API signing public key to that user. Do not commit credentials.

Add these GitHub Actions secrets:

- `OCI_TENANCY_OCID`
- `OCI_USER_OCID`
- `OCI_FINGERPRINT`
- `OCI_PRIVATE_KEY` — complete PEM private API signing key
- `OCI_REGION` — for example `me-jeddah-1`
- `OCI_COMPARTMENT_OCID`
- `OCI_SSH_PUBLIC_KEY`
- `OCI_SSH_ALLOWED_CIDR` — trusted public IP in `/32` form whenever possible

The GitHub infrastructure workflow supplies the OCI API authentication through `OCI_*` environment variables. The Terraform provider itself only specifies `region`, which keeps the same Terraform configuration compatible with OCI Resource Manager.

## B. Validate from GitHub

Run the GitHub Actions workflow **Oracle Infrastructure Check** manually. It runs `terraform init`, format validation, `terraform validate`, and `terraform plan`. It does not apply changes.

## C. OCI Resource Manager

Create a Resource Manager stack from source control and select:

- Repository: `Ascoor/avocat`
- Branch: `deploy/oracle-cloud`
- Terraform working directory: `infra/oracle`

Set these required Terraform variables in Resource Manager:

- `region`
- `compartment_ocid`
- `ssh_public_key`
- `ssh_allowed_cidr`

Optional variables already have defaults, including `VM.Standard.A1.Flex`, 2 OCPUs, 8 GB RAM, and 50 GB boot volume.

Resource Manager supplies the managed OCI provider credentials. Do not upload the OCI API private key to the stack. Run **Plan**, review it, and then **Apply**. Resource Manager persists Terraform state so later changes remain safe and idempotent.

After Apply, note the Terraform output `public_ip`.

## D. DNS

Point the production domain `A` record to the Terraform `public_ip`. Caddy will request and renew HTTPS automatically after DNS resolves.

## E. Application deployment secrets

Create a GitHub environment named `production` and add:

- `ORACLE_HOST` — Terraform `public_ip`
- `ORACLE_USER` — normally `ubuntu`
- `ORACLE_SSH_PRIVATE_KEY` — private key matching `OCI_SSH_PUBLIC_KEY`
- `ORACLE_APP_URL` — e.g. `https://avocat.example.com`
- `ORACLE_ENV_FILE` — complete multiline contents based on `.env.oracle.example`

`ORACLE_ENV_FILE` must contain a real Laravel `APP_KEY`, a strong PostgreSQL password, the production domain/URLs, and mail settings if mail is enabled.

## F. SSH and GitHub-hosted runners

A `/32` value for `ssh_allowed_cidr` is safest for direct administration from one trusted public IP. GitHub-hosted runners do not originate from that IP, so the SSH-based deploy workflow cannot reach the VM while SSH is restricted only to your `/32`.

For the first infrastructure creation, keep SSH restricted to your own `/32`. Before enabling unattended GitHub deployment, choose one of these deliberately: a hardened public SSH rule, an approved set of runner CIDRs, a self-hosted runner, or a private/bastion-based deployment path.

## G. Automatic deployment

When network access permits the GitHub runner to SSH to the VM, the deploy workflow performs:

- SSH host setup
- Docker bootstrap if needed
- checkout/reset to the deployment branch
- installation of the secret `.env.oracle` on the VM
- `docker compose ... up -d --build --remove-orphans`
- container status check
- image cleanup
- HTTPS smoke test

The database, Redis, Laravel API and FastAPI search service are not exposed directly to the Internet. Public traffic enters through Caddy on ports 80/443.

## H. First production checklist

1. Rotate any credentials that have ever been committed to Git history.
2. Keep SSH restricted to a trusted CIDR for the initial build.
3. Add the eight OCI GitHub secrets and run **Oracle Infrastructure Check**.
4. Create the Resource Manager stack and run Plan/Apply.
5. Note the returned public IP and point DNS to it.
6. Add the GitHub `production` environment secrets.
7. Choose and configure the intended CI-to-VM SSH/network path before enabling automatic deployments.
8. Run the first application deployment and verify `/`, `/api/...`, and `/search-api/` through HTTPS.
9. Configure automated PostgreSQL and uploaded-file backups before treating the VM as production.
