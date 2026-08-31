output "instance_id" {
  value = oci_core_instance.avocat.id
}

output "public_ip" {
  value = oci_core_instance.avocat.public_ip
}

output "ssh_command" {
  value = "ssh ubuntu@${oci_core_instance.avocat.public_ip}"
}

output "application_url" {
  value = "https://${oci_core_instance.avocat.public_ip}"
  description = "Temporary IP URL. Point APP_DOMAIN DNS to public_ip for valid TLS via Caddy."
}
