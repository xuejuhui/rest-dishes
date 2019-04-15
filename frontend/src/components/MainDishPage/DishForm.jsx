import React from "react";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import { addUserDishes } from "../../actions/dishActions";
import Upload from "../Upload";
import axios from "axios";
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
    description: "",
    dishPhoto: {},
    fileImage: null,
    upload: false
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = async e => {
    e.preventDefault();
    const { addUserDishes, handleOpenForm } = this.props;
    const fd = new FormData();
    // fd.append("dishPhoto", this.state.dishPhoto, this.state.dishPhoto.name);
    // fd.append("dishName", this.state.dishName);
    // fd.append(this.state);

    for (let key in this.state) {
      fd.append(`${key}`, this.state[key]);
    }
    for (var pair of fd.entries()) {
      console.log(pair);
    }
    // const res = await axios.post(
    //   "http://localhost:5000/api/dishes/uploadfile",
    //   fd
    // );
    // console.log(res);
    // addUserDishes(this.state, res.data.originalname);
    addUserDishes(fd);
    handleOpenForm();
  };
  handleFileSelected = e => {
    const files = e.target.files;
    this.setState({
      dishPhoto: files[0],
      fileImage: URL.createObjectURL(files[0])
    });
  };
  render() {
    const { classes, handleOpenForm, openForm } = this.props;
    return (
      <div className={classes.main}>
        <Dialog
          open={openForm}
          onClose={handleOpenForm}
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
          </DialogContent>
          <Upload
            handleFileSelected={this.handleFileSelected}
            fileImage={this.state.fileImage}
          />
          <DialogActions>
            <Button onClick={this.handleSubmit} color="primary">
              TAP
            </Button>
            <Button onClick={handleOpenForm} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default connect(
  null,
  { addUserDishes }
)(withStyles(styles)(DishForm));
