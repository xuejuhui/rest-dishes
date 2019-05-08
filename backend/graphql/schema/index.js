const { gql } = require("apollo-server-express");

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
    user: User
    dish: Dish
  }
  type OrderInput {
    id: ID!
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

module.exports = typeDefs;
