## Project Status
Currently the frontend application is completed. 

The server is retrieving network data from the (PolkadotJS API)[https://polkadot.js.org/api/METHODS_RPC.html#system]. The original intent was to implement a LibP2P based node crawler to get a statistical snapshot of the nodes in the Polkadot network.


## Infrastructure Overview
- Redis for data storage
- Node.js GraphQL server using `apollo-server` and `apollo-shield`
- Uses [GraphQl subscription](https://graphql.github.io/graphql-spec/June2018/#sec-Subscription) support manage real time communications over web socket transport
- Currently retrieves the network info via the PolkadotJS API
- Uses MaxMind GeoIP lite for offline resolution 
- Client application is built as a single page application using `react` and `apollo-client`

## Development 
To develop using a Docker environment: 
- It's designed to be deployed on a single machine. For example, on EC2 managed by Elastic Beanstalk.
- We've also provided a `docker-compose.yml` as an example to use in development.  
- Ensure that the environment variable `POLKADOT_HOST` in `server/src/constants/index.ts` has a working endpoint. By default it's set to use `wss://poc3-rpc.polkadot.io`

Start the server
```
cd server
npm run docker-build
npm run docker  
```

Start the client
```
cd client
npm start
```

## Deployment
The client is a single page application and can be deployed on any static site hosting service such as: 
- AWS S3 Hosting + Cloudfront, Firebase Hosting, Netlify etc. 

The server is setup as a single Docker container and can be hosted using any Cloud platform that supports Docker 
- AWS Elastic Beanstalk, Heroku or Google App Engine.
