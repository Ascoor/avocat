terraform {
  required_version = ">= 1.6.0"

  required_providers {
    oci = {
      source  = "oracle/oci"
      version = ">= 7.0.0"
    }
  }
}

# Keep the provider free of API-key fields so the same configuration works in
# both environments:
# - GitHub Actions authenticates through OCI_* environment variables.
# - OCI Resource Manager supplies its managed provider credentials.
provider "oci" {
  region = var.region
}
