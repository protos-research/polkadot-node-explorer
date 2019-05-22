up: 
	docker-compose up

# Starts the shell, useful for debugging the docker environment or developping through docker
debug:
	docker-compose run app bash

build: 
	docker build -t polkadot-explorer-server .

dev: 
	docker run -p 4000:4000 polkadot-explorer-server  