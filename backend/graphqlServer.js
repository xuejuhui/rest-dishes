const { ApolloServer } = require("apollo-server-express");
const schema = require("./graphql/schema/index.js");
const resolvers = require("./graphql/resolvers/index.js");
const db = require("./models/index");

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: ({ req }) => {
    return { user: req.user, db };
  }
});

module.exports = server;
