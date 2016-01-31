#!/usr/bin/env sh




digitalOceanUrl="https://api.digitalocean.com"
digitalOceanVersion="v2"
digitalOceanDropletUrl="$digitalOceanUrl/$digitalOceanVersion/droplets"
digitalOceanCloudInit=$(cat provision/cloud-init-script.sh | gzip -f | base64)

digitalOceanToken=$(cat security/digital-ocean-token)
sshId=$(cat security/ssh-id)



function digitalOceanDropletConfig ( ) {

cat <<EOF
{
	"name":      "rpgen-tests",
	"user_data": "$digitalOceanCloudInit",
	"region":    "lon1",
	"size":      "512mb",
	"image":     "ubuntu-15-10-x64",
	"ssh_keys":  ["$sshId"]
}
EOF

}





curl -X POST "https://api.digitalocean.com/v2/droplets" \
	-d "$(digitalOceanDropletConfig)"                   \
	-H "Authorization: Bearer $digitalOceanToken"       \
	-H "Content-Type: application/json"                 \
| jq .
