import React, { Fragment } from "react";
const DisplayDishes = ({ cartWithProduct, handleEditCart }) => {
  return (
    <Fragment>
      {Object.values(cartWithProduct).map(dish => {
        return (
          <div key={dish._id}>
            <h5>{dish.dishName}</h5>
            <input
              name={dish._id}
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
