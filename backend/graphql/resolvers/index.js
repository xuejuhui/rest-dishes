// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => "Hello world! how are you ",
    user: (parent, args, { db }) => {
      return db.User.findById({ _id: args.id })
        .populate({ path: "dishes", match: { isDeleted: false } })
        .then(res => {
          return res;
        });
      // return users[args.id];
    },
    users: (_, {}, { db }) => {
      return db.User.find()
        .populate({ path: "dishes", match: { isDeleted: false } })
        .then(res => {
          return res;
        });
    },
    orders: (_, {}, { db }) => {
      return db.Order.find()
        .populate({ path: "user" })
        .populate({ path: "dish" })
        .then(res => {
          console.log(res);
          return res;
        });
    }
  },
  Mutation: {
    createOrder: async (parent, { dishId }, { db }) => {
      const order = {
        dishId,
        user_id: "5cc8ab3915986b68a1a31710"
      };
      const newOrder = new db.Order({ dish: dishId, user: order.user_id });
      const orderResponse = await newOrder.save();
      order.id = orderResponse._id;
      return order;
    }
  },
  User: {
    email: parent => {
      return parent.email;
    }
  }
};

module.exports = resolvers;
