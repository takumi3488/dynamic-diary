FROM ubuntu:bionic

ARG DOCKER_COMPOSE_VERSION

# Dockerインストール
RUN apt-get update && apt-get -y install ca-certificates curl docker.io && \
   rm -rf /var/lib/apt/lists/*

# Docker Compose V2インストール
WORKDIR /usr/local/libexec/docker/cli-plugins
RUN curl -L https://github.com/docker/compose/releases/download/v${DOCKER_COMPOSE_VERSION}/docker-compose-linux-x86_64 -o docker-compose && chmod +x docker-compose

ENTRYPOINT ["docker", "compose"]
