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

push:
	REPOSITORY=${repository} \
	TAG=${git_hash} \
	IMAGE_NAME=${image_name} \
	sh ./docker/scripts/push.sh
.PHONY: push

docker-compose-pg:
	docker-compose -f docker/the-bash-vendors-send-queue-worker/pg.yml up

docker-compose-run:
	docker-compose -f docker/the-bash-vendors-send-queue-worker/development.yml up

docker-compose-stop:
	docker-compose -f docker/the-bash-vendors-send-queue-worker/development.yml down
.PHONY: docker-compose-stop
