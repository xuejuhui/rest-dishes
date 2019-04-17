import React, { useState } from "react";
import Button from "@material-ui/core/Button";

const IngredientInput = props => {
  const { addUserDishesIngredient, dish } = props;
  const [ingredient, setIngredient] = useState("");
  return (
    <div>
      <input type="text" onChange={e => setIngredient(e.target.value)} />
      <Button onClick={() => addUserDishesIngredient(dish, ingredient)}>
        Hi
      </Button>
    </div>
  );
};

export default IngredientInput;
