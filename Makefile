env?=qa
image_name:=xogroup/the-bash-vendors-send-queue-worker
repository:=xogroup/the-bash-vendors-send-queue-worker

ifeq ($(env), production)
  k8_cluster=prod
else
  k8_cluster=preprod
endif

git_hash=$(shell git rev-parse HEAD)

build:
	docker build -f ./docker/Dockerfile -t $(image_name) --build-arg ENV=$ENV .

test:
	NODE_ENV=test npm run test
.PHONY: test

code-climate-report:
	npm run report

test-coverage:
	./node_modules/.bin/nyc --reporter=text make test
.PHONY: test-coverage

push:
	REPOSITORY=${repository} \
	TAG=${git_hash} \
	IMAGE_NAME=${image_name} \
	sh ./docker/scripts/push.sh
.PHONY: push
