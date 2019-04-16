import React, { Component } from "react";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import withStyles from "@material-ui/core/styles/withStyles";
import ImagePreview from "./ImagePreview";

const styles = theme => {
  return {
    main: {
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3
    }
  };
};

class Upload extends Component {
  render() {
    const { fileImage, handleFileSelected, classes } = this.props;
    return (
      <div className={classes.main}>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="email">Dish Photo</InputLabel>
          <Input
            type="file"
            name="dishPhoto"
            id="dishPhoto"
            autoFocus
            onChange={handleFileSelected}
          />
        </FormControl>
        <ImagePreview fileImage={fileImage} />
      </div>
    );
  }
}

export default withStyles(styles)(Upload);
