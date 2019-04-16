import React, { Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => {
  return {
    img: {
      width: "50%",
      borderRadius: "50%",
      maxWidth: 300,
      maxHeight: 225
    }
  };
};

const ImagePreview = props => {
  const { fileImage, classes } = props;
  return (
    <Fragment>
      {fileImage ? (
        <img src={fileImage} alt="preview" className={classes.img} />
      ) : (
        ""
      )}
    </Fragment>
  );
};
export default withStyles(styles)(ImagePreview);
