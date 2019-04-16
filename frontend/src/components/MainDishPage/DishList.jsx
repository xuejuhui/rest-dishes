import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline",
    overflow: "hidden"
  },
  title: { overflow: "wrap" }
});

const DishList = props => {
  const { classes, dish, handleOpenCard } = props;

  return (
    <List className={classes.root}>
      <ListItem
        alignItems="flex-start"
        button
        onClick={handleOpenCard(dish._id)}
      >
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={dish.url[0]} />
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
