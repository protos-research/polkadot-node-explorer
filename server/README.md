
## Infrastructure Overview
- Uses `docker-compose` to manage multiple containers on a single machine
- Redis for data storage
- Node.js server using `apollo-server` framework to create a GraphQL endpoint
- Uses the [GraphQl subscription](https://graphql.github.io/graphql-spec/June2018/#sec-Subscription) support to abstract and manage real time communications over web socket transport
- Uses TypeScript for type annotation


## Development 
You can choose to either develop fully in a Docker environment or running the Redis container and Node.js server on your host machine

To develop using a Docker environment: 
- `npm run docker-build` to build docker image
- `npm run docker` to start docker container
- `tsc -w ` to watch for typescript file changes and automatically rebuild.
- The Docker container is setup to use a bound volume so that the source code on your host machine will be linked to work directory of the container.

To develop on your local machine: 
- run `npm run dev-redis` in one terminal to start the Redis image in a Docker container while exposing the default Redis port
- run `npm run dev-server` in a second terminal to watch typescript and start the Node.js server

## Deployment
- It's designed to be deployed on a single machine. For example, on EC2 managed by Elastic Beanstalk.

```
docker build -t polkadot-explorer-server .
docker run -p 4000:4000 polkadot-explorer-server  
```

## GeoIP 
- uses MaxMind GeoIP lite for offline resolution 
- supplements the service with keycdn.com or ipstack.com

## Data Source
- we are getting the data from the (PolkadotJS API)[https://polkadot.js.org/api/METHODS_RPC.html#system]