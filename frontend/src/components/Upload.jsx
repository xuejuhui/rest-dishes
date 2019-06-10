import React, { Component } from "react";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import withStyles from "@material-ui/core/styles/withStyles";
import ImagePreview from "components/ImagePreview";
import Button from "@material-ui/core/Button";

const styles = theme => {
  return {
    main: {
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      position: "relative",
      overflow: "hidden",
      display: "inline-block"
    },
    btn: {
      borderWidth: "2px",
      borderStyle: "solid",
      borderColor: "black",
      color: "gray",
      backgroundColor: "white",
      borderRadius: 8
    },
    input: {
      fontSize: "100px",
      position: "absolute",
      left: 0,
      top: 0,
      opacity: 0
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
          <Button className={classes.btn}>Upload</Button>
          <Input
            className={classes.input}
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
