import React, { Fragment } from "react";

const Secret = props => {
  console.log(props);
  return (
    <div>
      <h3>{props.userName}</h3>
      {props.dishes.map(dish => {
        return (
          <Fragment>
            <h4>{dish.dishName}</h4>
            <p>{dish.description}</p>
          </Fragment>
        );
      })}
    </div>
  );
};

export default Secret;
