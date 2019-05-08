const { ApolloServer, gql } = require("apollo-server-express");
const db = require("./models/index");

const typeDefs = gql`
  type Query {
    hello: String
    user(id: ID!): User
    users: [User!]
    orders: [Order!]!
  }
  type Mutation {
    createOrder(dishId: ID!): OrderInput
  }
  type Order {
    id: ID!
    user_id: User
    dishId: Dish
  }
  type OrderInput {
    user_id: ID!
    dishId: ID!
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

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => "Hello world! how are you ",
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
    },
    orders: () => {
      return db.Order.find()
        .populate({ path: "user_id" })
        .populate({ path: "dishId" })
        .then(res => {
          console.log(res);
          return res;
        });
    }
  },
  Mutation: {
    createOrder: async (parent, { dishId }) => {
      const order = {
        dishId,
        userId: "5cc8ab3915986b68a1a31710"
      };
      const newOrder = new db.Order({ dishId, user_id: order.userId });
      const orderResponse = await newOrder.save();
      console.log(orderResponse);
      return orderResponse;
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
    return req.user;
  }
});

module.exports = server;
