FROM node:14.20.0-slim

RUN apt-get update -qq && \
    apt-get install -y \
    build-essential

USER root

ARG ENV

ENV ROOT_APP_DIR=/the-bash-vendors-send-queue-worker

ADD . $ROOT_APP_DIR
WORKDIR $ROOT_APP_DIR

RUN npm install --production

CMD ["node", "index.js"]
