import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => {
  return {
    imageWrapper: {
      width: "100px",
      height: "100px",
      position: "relative",
      overflow: "hidden",
      borderRadius: "50%"
    },
    img: {
      height: "100%",
      width: "auto",
      maxWidth: 300,
      maxHeight: 225
    }
  };
};

const ImagePreview = props => {
  const { fileImage, classes } = props;
  return (
    <div className={classes.imageWrapper}>
      {fileImage ? (
        <img src={fileImage} alt="preview" className={classes.img} />
      ) : (
        ""
      )}
    </div>
  );
};
export default withStyles(styles)(ImagePreview);
