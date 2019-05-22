# Dockerfile
FROM node:10

# Install Redis and run on default port 6379
RUN apt-get update \
  && apt-get install -y telnet redis-server

WORKDIR /var/www/app

COPY . .
RUN npm install && npm run build

EXPOSE 4000
CMD redis-server --daemonize yes && npm start