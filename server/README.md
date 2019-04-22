
## Infrastructure Overview
- Uses `docker-compose` to manage multiple containers on a single machine
- Redis for data storage
- Node.js server using `apollo-server` framework to create a GraphQL endpoint
- Uses the [GraphQl subscription](https://graphql.github.io/graphql-spec/June2018/#sec-Subscription) support to abstract and manage real time communications over web socket transport
- Uses TypeScript for type annotation


## Development 
You can choose to either develop fully in a Docker environment or running the Redis container and Node.js server on your host machine

To develop in the docker environment: 
- run `make docker-shell` to run the Bash shell in a Docker container
- The Docker container is setup to use a bound volume so that the source code on your host machine will be linked to work directory of the container.

To develop on your local machine only: 
- run `npm run dev-redis` in one terminal to start the Redis image in a Docker container while exposing the default Redis port
- run `npm run dev-server` in a second terminal to watch typescript and start the Node.js server

## Deployment
- It's designed to be deployed on a single machine. For example, on EC2 managed by Elastic Beanstalk.
- simply run `make up` to start the server