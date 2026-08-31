variable "tenancy_ocid" { type = string; sensitive = true }
variable "user_ocid" { type = string; sensitive = true }
variable "fingerprint" { type = string; sensitive = true }
variable "private_key_path" { type = string; default = "~/.oci/oci_api_key.pem" }
variable "region" { type = string }
variable "compartment_ocid" { type = string }
variable "ssh_public_key" { type = string; sensitive = true }
variable "ssh_allowed_cidr" {
  type        = string
  description = "CIDR allowed to SSH to the VM, e.g. 203.0.113.10/32. Do not use 0.0.0.0/0 for production."
}
variable "instance_shape" { type = string; default = "VM.Standard.A1.Flex" }
variable "ocpus" { type = number; default = 2 }
variable "memory_in_gbs" { type = number; default = 8 }
variable "boot_volume_size_in_gbs" { type = number; default = 50 }
variable "vcn_cidr" { type = string; default = "10.42.0.0/16" }
variable "subnet_cidr" { type = string; default = "10.42.10.0/24" }
variable "display_name" { type = string; default = "avocat-prod" }
