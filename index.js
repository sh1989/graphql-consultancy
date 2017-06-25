import express from 'express';
import graphQLHTTP from 'express-graphql';
import path from 'path';
const { schema, rootValue } = require('./data/schema');

const GRAPHQL_PORT = 8080;
const graphQLApp = express();
graphQLApp.use('/', graphQLHTTP({
  graphiql: true,
  pretty: true,
  schema,
  rootValue
}));
const graphQLServer = graphQLApp.listen(GRAPHQL_PORT, () => {
  console.log(
    `GraphQL server is now running on http://localhost:${GRAPHQL_PORT}`
  );
});
