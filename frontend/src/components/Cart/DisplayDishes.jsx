import React, { Fragment } from "react";
const DisplayDishes = ({
  cartWithProduct,
  handlePostOrder,
  handleCartValue,
  handleEditCart
}) => {
  return (
    <Fragment>
      {cartWithProduct
        ? Object.values(cartWithProduct).map(dish => {
            return (
              <div key={dish.dish._id}>
                <h5>{dish.dish.dishName}</h5>
                <input
                  name={dish.dish._id}
                  type="number"
                  defaultValue={dish.qty}
                  onChange={handleCartValue(dish.dish)}
                />
              </div>
            );
          })
        : ""}
      <h3>
        Total{"  "}
        {cartWithProduct
          ? Object.values(cartWithProduct).reduce(
              (acc, cur) => acc + cur.qty,
              0
            )
          : ""}
        <button onClick={handlePostOrder}>Omg You better work</button>
        <button onClick={handleEditCart}>Omg </button>
      </h3>
    </Fragment>
  );
};

export default DisplayDishes;
