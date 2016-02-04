#!/bin/bash





DEBIAN_FRONTEND=noninteractive





cd ~





function install-docker {

	sudo apt-get -y install docker.io

	ln -sf /usr/bin/docker.io /usr/local/bin/docker
	update-rc.d docker defaults

	sudo service docker start

}

function install-others {

	sudo apt-get install --assume-yes \
		git                           \
		build-essential

}




# a rigourous way of ensuring the network is available...
sleep 60



sudo apt-get install linux-image-extra-`uname -r`





install-docker
install-others





if [[ -d "rpgen" ]]
then
	rm -rf rpgen
fi

git clone https://github.com/rgrannell1/rpgen.git
cd rpgen




make docker-test-numbers-build docker-test-numbers-run
