import React from "react";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";

const styles = theme => ({
  main: { position: "fixed", zIndex: 2, right: 0, bottom: 0 },
  fab: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});
const Button = props => {
  const { classes, handleOpenForm } = props;
  return (
    <div className={classes.main}>
      <Fab
        color="primary"
        aria-label="Add"
        className={classes.fab}
        onClick={handleOpenForm}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default withStyles(styles)(Button);
