SHELL=/bin/bash

NODEAPP_IMAGE=nodeapp
MONGODB_IMAGE=mongodb

MONGODB_DOCKERFILE_PATH=./docker-mongodb
 
all: build up 
 
.PHONY: build up down clean
 
build:  
	docker build -t SDproject/${NODEAPP_IMAGE}:latest .
	cd ${MONGODB_DOCKERFILE_PATH}; docker build -t SDproject/${MONGODB_IMAGE}:latest .
 
up: 
	docker compose up | grep ${NODEAPP_IMAGE}

down:
	docker compose down
 
clean: 
	docker compose down --rmi all
