#!/bin/bash



cd ~
logPath=install.log
testPath=install.log

touch "$logPath"
touch "$testPath"





function install-docker {

	# install docker.
	wget -qO- https://get.docker.com/ | sh

}

function install-others {

	sudo apt-get install --assume-yes \
		git                           \
		build-essential >> "$logPath"

}




# a rigourous way of ensuring the network is available...
sleep 60




install-docker >> "$logPath"
install-others >> "$logPath"





# install git, make.

git clone https://github.com/rgrannell1/rpgen.git >> "$logPath"
cd rpgen




make docker-test-numbers-build docker-test-numbers-run >> "$testPath"
