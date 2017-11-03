import express from 'express';
import graphQLHTTP from 'express-graphql';
import sqlite from 'sqlite';
import { schema, rootValue } from './data/schema';
import buildLoaders from './data/loaders';

const GRAPHQL_PORT = 8080;

sqlite.open('consultancy.db', { cached: true })
  .then(() => sqlite.run('PRAGMA foreign_keys=on'))
  .then(() => sqlite.migrate())
  .then(() => {
    const graphQLApp = express();
    const db = {
      get: (...args) => sqlite.get(...args),
      all: (...args) => sqlite.all(...args),
      run: (...args) => sqlite.run(...args)
    };
    const loaders = buildLoaders(db);

    graphQLApp.use('/', graphQLHTTP({
      graphiql: true,
      pretty: true,
      schema,
      rootValue,
      context: {
        db,
        loaders
      }
    }));

    graphQLApp.listen(GRAPHQL_PORT, () => {
      console.log(
        `GraphQL server is now running on http://localhost:${GRAPHQL_PORT}`
      );
    });
  })
  .catch(e => console.error(e));
