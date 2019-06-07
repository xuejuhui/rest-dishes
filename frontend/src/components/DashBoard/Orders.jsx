import React, { Fragment } from "react";

const Orders = ({ orders }) => {
  console.log(Object.values(orders));
  return (
    <Fragment>
      {Object.values(orders).map(order => {
        return (
          <div key={order._id}>
            <p>{order.date}</p>
            <p>{order.user_id.email}</p>
            {order.dishes.map(dish => {
              return (
                <div key={dish._id}>
                  <p>{dish.dish.dishName}</p>
                  <p>{dish.qty}</p>
                </div>
              );
            })}
          </div>
        );
      })}
    </Fragment>
  );
};

export default Orders;
