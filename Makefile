
NODE           = node
DOCKER         = docker
CONTAINER_NAME = rpgen

ESLINT         = ./node_modules/.bin/eslint
ESLINT_FLAGS   = --config config/eslint.json





docker-build:
	$(DOCKER) build --tag=$(CONTAINER_NAME) .

docker-cleanbuild:
	$(DOCKER) build --no-cache=true --tag=$(CONTAINER_NAME) .

docker-run:
	$(DOCKER) run $(CONTAINER_NAME)

display-rng:
	$(NODE) test/rand-image.js | display -

eslint:
	$(ESLINT) $(ESLINT_FLAGS) lib
