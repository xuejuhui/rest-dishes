import React, { useState, Fragment } from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const styles = {
  input: {}
};
// fix it later style
const IngredientInput = props => {
  const { addUserDishesIngredient, dish, classes } = props;
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientLocation, setIngredientLocation] = useState("");
  const [inputShow, setinputShow] = useState(false);
  const handleShowInput = () => setinputShow(!inputShow);
  return (
    <div className={classes.input}>
      <Dialog
        open={inputShow}
        onClose={handleShowInput}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">ADD Dish</DialogTitle>
        <DialogContent>
          <DialogContentText>Add a dish to the page</DialogContentText>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Dish Name</InputLabel>
            <Input
              id="dishName"
              name="dishName"
              autoFocus
              onChange={e => setIngredientName(e.target.value)}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Description</InputLabel>
            <Input
              id="description"
              name="description"
              autoFocus
              onChange={e => setIngredientLocation(e.target.value)}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onMouseOver={handleShowInput}
            onClick={() =>
              addUserDishesIngredient(dish, {
                ingredientName,
                ingredientLocation
              })
            }
          >
            Add Ingredient
          </Button>
        </DialogActions>
      </Dialog>
      <Button
        onMouseOver={handleShowInput}
        onClick={() =>
          addUserDishesIngredient(dish, {
            ingredientName,
            ingredientLocation
          })
        }
      >
        Add Ingredient
      </Button>
    </div>
  );
};

export default withStyles(styles)(IngredientInput);
