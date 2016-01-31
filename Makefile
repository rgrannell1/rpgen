
NODE           = node
DOCKER         = docker
CONTAINER_NAME = rpgen

ESLINT         = ./node_modules/.bin/eslint
ESLINT_FLAGS   = --config config/eslint.json





docker-test-numbers-build:
	$(DOCKER) build --tag=$(CONTAINER_NAME)-test-numbers -f dockerfiles/test-numbers .

docker-test-numbers-cleanbuild:
	$(DOCKER) buildl --no-cache=true --tag=$(CONTAINER_NAME)-test-numbers -f dockerfiles/test-numbers .

docker-test-numbers-run:
	$(DOCKER) run $(CONTAINER_NAME)-test-numbers

docker-test-install-build:
	$(DOCKER) build --tag=$(CONTAINER_NAME)-test-install -f dockerfiles/test-install .

docker-test-install-cleanbuild:
	$(DOCKER) build --no-cache=true --tag=$(CONTAINER_NAME)-test-install -f dockerfiles/test-install .

docker-test-install-run:
	$(DOCKER) run $(CONTAINER_NAME)

display-rng:
	$(NODE) test/rand-image.js | display -

eslint:
	$(ESLINT) $(ESLINT_FLAGS) rpgen

dieharder:
	bash test/test-random-numbers.sh
