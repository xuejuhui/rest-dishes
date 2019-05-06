const { ApolloServer, gql } = require("apollo-server-express");
const db = require("./models/index");

const typeDefs = gql`
  type Query {
    hello: String
    user(id: ID!): User
    users: [User!]
  }
  type User {
    id: ID!
    email: String!
    password: String!
    dishes: [Dish]!
  }
  type Dish {
    id: ID!
    dishName: String!
    description: String!
    image: [String]!
  }
`;

let users = {
  1: {
    id: "1",
    username: "Robin Wieruch",
    email: "Robin Wieruch@other.com"
  },
  2: {
    id: "2",
    username: "Dave Davids",
    email: "Dave Davids@some.com"
  }
};
// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => "Hello world!",
    user: (parent, args) => {
      return db.User.findById({ _id: args.id })
        .populate({ path: "dishes", match: { isDeleted: false } })
        .then(res => {
          return res;
        });
      // return users[args.id];
    },
    users: () => {
      return db.User.find()
        .populate({ path: "dishes", match: { isDeleted: false } })
        .then(res => {
          return res;
        });
    }
  },
  User: {
    email: parent => {
      return parent.email;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    console.log(req.user);
  }
});

module.exports = server;
