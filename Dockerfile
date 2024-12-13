FROM node:16.11.1

WORKDIR /usr/src/todo-app

COPY package*.json ./
RUN npm install

COPY public public/
COPY src src/
COPY dbinit.js ./
COPY index.js ./

WORKDIR client

COPY client/package*.json ./
RUN npm install

COPY client/public public/
COPY client/src src/
RUN npx update-browserslist-db@latest
RUN npm run build

WORKDIR ../

EXPOSE 8080


