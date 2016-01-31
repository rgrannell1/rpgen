#!/usr/bin/env node





const fs = require('fs')





const fileData = {
	initScript: fs.readFileSync('./provision/cloud-init-script.sh').toString( ),
	sshId:      fs.readFileSync('./security/ssh-id').toString( )
}




const vm = {
	"name":      "rpgen-tests",
	"user_data": fileData.initScript,
	"region":    "lon1",
	"size":      "512mb",
	"image":     "ubuntu-15-10-x64",
	"ssh_keys":  [fileData.sshId]
}




process.stdout.write(JSON.stringify(vm))
