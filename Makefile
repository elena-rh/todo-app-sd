SHELL=/bin/bash

REPO=elenarughi2
NODEAPP_IMAGE=sd_nodeapp
NGINX_IMAGE=sd_nginx
MONGODB_IMAGE=sd_mongodb

MONGODB_DOCKERFILE_PATH=./docker-mongodb
NGINX_DOCKERFILE_PATH=./nginx
 
all: build up 
 
.PHONY: build up down clean
 
build:  
	docker build -t ${REPO}/${NODEAPP_IMAGE}:latest --build-arg dbinit=true .
	cd ${MONGODB_DOCKERFILE_PATH}; docker build -t ${REPO}/${MONGODB_IMAGE}:latest .
	cd ../
	cd ${NGINX_DOCKERFILE_PATH}; docker build -t ${REPO}/${NGINX_IMAGE}:latest .
 
up: 
	docker compose up | grep 'nodeapp'

down:
	docker compose down
 
clean: 
	docker compose down --rmi all
