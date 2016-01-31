#!/bin/bash



cd ~
logPath=install.log
testPath=install.log

touch "$logPath"
touch "$testPath"





# install docker.

wget -qO- https://get.docker.com/ | sh >> "$logPath"

# install git, make.

sudo apt-get install --assume-yes \
	git                           \
	build-essential >> "$logPath"

git clone https://github.com/rgrannell1/pguests.git >> "$logPath"
cd pguests




make docker-test-numbers-build docker-test-numbers-run >> "$testPath"
