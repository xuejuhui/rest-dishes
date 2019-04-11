import React from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import puppy from "../utils/puppy";

const styles = theme => ({
  main: { overflow: "auto", maxHeight: 500, width: "50vw" },
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  }
});
const DishesList = props => {
  const { classes, dishes } = props;
  console.log(dishes);
  return (
    <div className={classes.main}>
      {Object.values(dishes).map(dish => {
        let randomPic =
          puppy[Math.floor(Math.random() * (puppy.length - 1 - 0) + 0)];
        return (
          <List className={classes.root} key={dish._id}>
            <ListItem alignItems="flex-start" button>
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={randomPic} />
              </ListItemAvatar>
              <ListItemText
                primary={dish.dishName}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      className={classes.inline}
                      color="textPrimary"
                    />
                    {dish.description}
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>
        );
      })}
    </div>
  );
};
export default withStyles(styles)(DishesList);
