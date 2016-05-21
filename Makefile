
NODE           = node
DOCKER         = docker
CONTAINER_NAME = rpgen

ESLINT         = ./node_modules/.bin/eslint
ESLINT_FLAGS   = --config config/eslint.json




TEST_NUMBERS_CONTAINER=$(CONTAINER_NAME)-test-numbers
TEST_INSTALL_CONTAINER=$(CONTAINER_NAME)-test-install




docker-test-numbers-build:
	$(DOCKER) build --tag=$(TEST_NUMBERS_CONTAINER) -f dockerfiles/test-numbers .

docker-test-numbers-cleanbuild:
	$(DOCKER) build --no-cache=true --tag=$(TEST_NUMBERS_CONTAINER) -f dockerfiles/test-numbers .

docker-test-numbers-run:
	$(DOCKER) run $(TEST_NUMBERS_CONTAINER)

docker-test-install-build:
	$(DOCKER) build --tag=$(TEST_INSTALL_CONTAINER) -f dockerfiles/test-install .

docker-test-install-cleanbuild:
	$(DOCKER) build --no-cache=true --tag=$(TEST_INSTALL_CONTAINER) -f dockerfiles/test-install .

docker-test-install-run:
	$(DOCKER) run $(TEST_INSTALL_CONTAINER)

display-rng:
	$(NODE) test/rand-image.js | display -

eslint:
	$(ESLINT) $(ESLINT_FLAGS) rpgen

dieharder:
	bash test/test-random-numbers.sh


install: snap
	cd snapcraft && snap install rpgen* && cd ..

snap: FORCE
	cd snapcraft && snapcraft clean && snapcraft snap && cd ..

FORCE:
