import React, { Fragment } from "react";

const Secret = props => {
  return (
    <div>
      <h3>{props.userName}</h3>
      {Object.values(props.dishes).map(dish => {
        return (
          <Fragment key={dish._id}>
            <h4>{dish.dishName}</h4>
            <p>{dish.description}</p>
            <button onClick={() => props.deleteUserDish(dish._id)}>D</button>
          </Fragment>
        );
      })}
    </div>
  );
};

export default Secret;
