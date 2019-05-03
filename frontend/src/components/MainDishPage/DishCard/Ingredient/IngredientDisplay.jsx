import React from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const ingredientStyles = {
  ingredient: {
    width: "8rem",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "rgba(173,216,230,1)",
    borderRadius: "5px",
    marginTop: "10px",
    textAlign: "center",
    background: "transparent"
  }
};

const IngredientDisplay = props => {
  const { classes, ingredient } = props;
  return (
    <div className={classes.ingredient}>
      <Typography component="p">{ingredient.name}</Typography>
    </div>
  );
};

export default withStyles(ingredientStyles)(IngredientDisplay);
