import React, { Fragment } from "react";
const DisplayDishes = ({ cartWithProduct, handleEditCart }) => {
  return (
    <Fragment>
      {Object.values(cartWithProduct).map(dish => {
        console.log(dish);
        return (
          <div key={dish.dish._id}>
            <h5>{dish.dish.dishName}</h5>
            <input
              name={dish.dish._id}
              type="number"
              defaultValue={dish.qty}
              onChange={handleEditCart(dish)}
            />
          </div>
        );
      })}
      <h3>
        Total{"  "}
        {Object.values(cartWithProduct).reduce((acc, cur) => acc + cur.qty, 0)}
      </h3>
    </Fragment>
  );
};

export default DisplayDishes;
