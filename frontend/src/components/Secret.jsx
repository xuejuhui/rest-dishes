import React, { Fragment } from "react";

const Secret = props => {
  console.log(props);
  return (
    <div>
      <h3>{props.userName}</h3>
      <button onClick={props.addUserDishes}>Add</button>
      {props.dishes.map(dish => {
        return (
          <Fragment key={dish._id}>
            <h4>{dish.dishName}</h4>
            <p>{dish.description}</p>
          </Fragment>
        );
      })}
    </div>
  );
};

export default Secret;
