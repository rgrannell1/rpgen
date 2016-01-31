#!/usr/bin/env sh




digitalOceanUrl="https://api.digitalocean.com"
digitalOceanVersion="v2"
digitalOceanDropletUrl="$digitalOceanUrl/$digitalOceanVersion/droplets"

digitalOceanToken=$(cat security/digital-ocean-token)
sshId=$(cat security/ssh-id)

vmConfig=$(node provision/vm-config.js)





curl -X POST "https://api.digitalocean.com/v2/droplets" \
	-d "$vmConfig"                                      \
	-H "Authorization: Bearer $digitalOceanToken"       \
	-H "Content-Type: application/json"                 \
| jq .
