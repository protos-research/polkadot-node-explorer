
## Application Design Overview
- lightweight routing using `react-enroute`
- Utilizes pre-rendering with `react-snap` and tag management (React-helmet)
- Minimalist theme for based on `material-ui` 
- Uses `apollo-client` to manage [GraphQL](https://graphql.org/) queries
- Styling using css-in-js

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

### Deployment 
S3 Hosting

```
aws s3api create-bucket --bucket polkadot-explorer --region us-east-2 --acl public-read
aws s3 website s3://polkadot-explorer --index-document index.html --error-document 404.html
aws s3 sync ./build s3://polkadot-explorer --delete --acl public-read
```