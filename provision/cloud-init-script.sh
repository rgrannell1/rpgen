#!/usr/bin/env sh




# install docker.

wget -qO- https://get.docker.com/ | sh

# install git, make.

sudo apt-get install --assume-yes \
	git                           \
	build-essential

git clone https://github.com/rgrannell1/pguests.git
cd pguests




make docker-test-numbers-build docker-test-numbers-run
