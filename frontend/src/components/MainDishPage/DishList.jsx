import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import puppy from "../../utils/puppy";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  }
});

const DishList = props => {
  const { classes, dish, handleOpenCard } = props;
  let randomPic = puppy[Math.floor(Math.random() * (puppy.length - 1 - 0) + 0)];
  return (
    <List className={classes.root}>
      <ListItem
        alignItems="flex-start"
        button
        onClick={handleOpenCard(dish._id)}
      >
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
};

export default withStyles(styles)(DishList);
