#!/usr/bin/env bash

docker tag $IMAGE_NAME ${REPOSITORY}:${TAG}
docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD
docker push ${REPOSITORY}:${TAG}
docker logout
