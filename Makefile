SHELL=/bin/bash

NODEAPP_IMAGE=nodeapp
NGINX_IMAGE=nginx
MONGODB_IMAGE=mongodb

MONGODB_DOCKERFILE_PATH=./docker-mongodb
NGINX_DOCKERFILE_PATH=./nginx
 
all: build up 
 
.PHONY: build up down clean
 
build:  
	docker build -t SDproject/${NODEAPP_IMAGE}:latest --build-arg dbinit=true .
	cd ${MONGODB_DOCKERFILE_PATH}; docker build -t SDproject/${MONGODB_IMAGE}:latest .
	cd ../
	cd ${NGINX_DOCKERFILE_PATH}; docker build -t SDproject/${NGINX_IMAGE}:latest .
 
up: 
	docker compose up | grep ${NODEAPP_IMAGE}

down:
	docker compose down
 
clean: 
	docker compose down --rmi all
