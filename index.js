import express from 'express';
import graphQLHTTP from 'express-graphql';
import sqlite from 'sqlite';
const { schema, rootValue } = require('./data/schema');

const GRAPHQL_PORT = 8080;

sqlite.open('consultancy.db', { cached: true })
  .then(() => sqlite.run('PRAGMA foreign_keys=on'))
  .then(() => sqlite.migrate())
  .then(() => {
    const graphQLApp = express();
    graphQLApp.use('/', graphQLHTTP({
      graphiql: true,
      pretty: true,
      schema,
      rootValue,
      context: {
        db: {
          get: (...args) => sqlite.get(...args),
          all: (...args) => sqlite.all(...args),
          run: (...args) => sqlite.run(...args)
        }
      }
    }));

    graphQLApp.listen(GRAPHQL_PORT, () => {
      console.log(
        `GraphQL server is now running on http://localhost:${GRAPHQL_PORT}`
      );
    });
  })
  .catch(e => console.error(e));
