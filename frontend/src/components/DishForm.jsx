import React from "react";
import { connect } from "react-redux";
import { addUserDishes } from "../actions/dishActions";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => {
  return {
    main: {
      width: "auto",
      display: "block", // Fix IE 11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: "auto",
        marginRight: "auto"
      }
    }
  };
};

class DishForm extends React.Component {
  state = {
    dishName: "",
    description: ""
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.addUserDishes(this.state);
  };
  render() {
    console.log(this.props);
    const { classes } = this.props;
    return (
      <div className={classes.main}>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="email">Dish Name</InputLabel>
          <Input
            id="dishName"
            name="dishName"
            autoFocus
            onChange={this.handleChange}
          />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="email">Description</InputLabel>
          <Input
            id="description"
            name="description"
            autoFocus
            onChange={this.handleChange}
          />
        </FormControl>
        <button onClick={this.handleSubmit}>TAP</button>
      </div>
    );
  }
}

export default connect(
  null,
  { addUserDishes }
)(withStyles(styles)(DishForm));
