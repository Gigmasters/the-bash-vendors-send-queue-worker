env?=qa
image_name:=xogroup/the-bash-vendors-send-queue-worker
repository:=xogroup/the-bash-vendors-send-queue-worker
docker_compose_file_path:=docker/the-bash-vendors-send-queue-worker

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
	docker-compose -f $(docker_compose_file_path)/pg.yml up

docker-compose-run:
	docker-compose -f $(docker_compose_file_path)/development.yml up

docker-compose-stop:
	docker-compose -f $(docker_compose_file_path)/development.yml down
.PHONY: docker-compose-stop

docker-compose-test:
	docker-compose -f $(docker_compose_file_path)/test.yml run --rm server-test
	result=$?
	docker-compose -f $(docker_compose_file_path)/test.yml stop
	docker-compose -f $(docker_compose_file_path)/test.yml rm -v -f
.PHONY: docker-compose-test

