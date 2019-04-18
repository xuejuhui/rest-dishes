import React, { useState } from "react";
import Button from "@material-ui/core/Button";

const IngredientInput = props => {
  const { addUserDishesIngredient, dish } = props;
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientLocation, setIngredientLocation] = useState("");
  return (
    <div>
      <input type="text" onChange={e => setIngredientName(e.target.value)} />
      <input
        type="text"
        onChange={e => setIngredientLocation(e.target.value)}
      />
      <Button
        onClick={() =>
          addUserDishesIngredient(dish, { ingredientName, ingredientLocation })
        }
      >
        Hi
      </Button>
    </div>
  );
};

export default IngredientInput;
