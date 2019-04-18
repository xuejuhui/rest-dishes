import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const styles = {
  input: { width: "20vw" }
};
// fix it later style
const IngredientInput = props => {
  const { addUserDishesIngredient, dish, classes } = props;
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientLocation, setIngredientLocation] = useState("");
  const [inputShow, setinputShow] = useState(false);
  const handleShowInput = () => setinputShow(!inputShow);
  const handleAddIngredient = () => {
    addUserDishesIngredient(dish, {
      ingredientName,
      ingredientLocation
    });
    handleShowInput();
  };
  return (
    <div className={classes.input}>
      <Dialog
        open={inputShow}
        onClose={handleShowInput}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">ADD Ingredient</DialogTitle>
        <DialogContent>
          <FormControl margin="normal">
            <InputLabel htmlFor="Ingredient Name">Ingredient Name</InputLabel>
            <Input
              id="ingredientName"
              name="ingredientName"
              autoFocus
              onChange={e => setIngredientName(e.target.value)}
            />
          </FormControl>
          <FormControl margin="normal">
            <InputLabel htmlFor="Location">Location</InputLabel>
            <Input
              id="location"
              name="location"
              autoFocus
              onChange={e => setIngredientLocation(e.target.value)}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleShowInput}>Cancel</Button>
          <Button onClick={handleAddIngredient}>Add Ingredient</Button>
        </DialogActions>
      </Dialog>
      <Button onMouseOver={handleShowInput} onClick={handleAddIngredient}>
        Add Ingredient
      </Button>
    </div>
  );
};

export default withStyles(styles)(IngredientInput);
